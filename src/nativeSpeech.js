/** Capacitor native speech (iOS SFSpeechRecognizer). No-ops on web. */

import { Capacitor } from '@capacitor/core'

/** Spoken-answer language for Chinese→English practice (must stay English). */
export const NATIVE_STT_LANG = 'en-US'

const MAX_LISTEN_MS = 8000
const SILENCE_END_MS = 1100
const STOP_TIMEOUT_MS = 1500

export function isNativeApp() {
  try {
    return !!Capacitor?.isNativePlatform?.()
  } catch {
    return false
  }
}

export function nativePlatformLabel() {
  try {
    return `${Capacitor.getPlatform()} / native=${Capacitor.isNativePlatform()}`
  } catch {
    return 'unknown'
  }
}

async function getPlugin() {
  if (!isNativeApp()) return null
  const mod = await import('@capacitor-community/speech-recognition')
  return mod.SpeechRecognition
}

function withTimeout(promise, ms, fallback) {
  let timer = null
  return Promise.race([
    Promise.resolve(promise).finally(() => {
      if (timer) window.clearTimeout(timer)
    }),
    new Promise((resolve) => {
      timer = window.setTimeout(() => resolve(fallback), ms)
    }),
  ])
}

/**
 * Force the iOS microphone privacy prompt via getUserMedia.
 * Native SFSpeechRecognizer alone sometimes never surfaces Settings toggles
 * on sideloaded builds; WKWebView mic access reliably creates them.
 */
async function ensureWebkitMicPermission() {
  if (!navigator?.mediaDevices?.getUserMedia) {
    return { ok: false, reason: 'no-getUserMedia' }
  }
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
      },
      video: false,
    })
    for (const track of stream.getTracks()) {
      try {
        track.stop()
      } catch {
        // ignore
      }
    }
    return { ok: true, reason: 'granted' }
  } catch (err) {
    const name = err?.name || ''
    if (name === 'NotAllowedError' || name === 'PermissionDeniedError') {
      return { ok: false, reason: 'denied' }
    }
    return { ok: false, reason: name || 'getUserMedia-failed' }
  }
}

/**
 * Ask for Speech Recognition + Microphone. Must run inside a user gesture.
 * Returns { ok, status, detail }.
 */
export async function ensureNativeSpeechPermission() {
  if (!isNativeApp()) {
    return { ok: false, status: 'web', detail: 'not-native' }
  }

  // 1) Force Microphone into iOS Settings via WebKit.
  const mic = await ensureWebkitMicPermission()
  if (!mic.ok && mic.reason === 'denied') {
    return {
      ok: false,
      status: 'denied',
      detail: 'microphone-denied',
    }
  }

  const plugin = await getPlugin()
  if (!plugin) {
    return { ok: false, status: 'unavailable', detail: 'no-plugin' }
  }

  let available = { available: false }
  try {
    available = await withTimeout(plugin.available(), 3000, { available: false })
  } catch {
    available = { available: false }
  }
  if (!available?.available) {
    return { ok: false, status: 'unavailable', detail: 'speech-unavailable' }
  }

  // 2) Speech-recognition permission (system dialog).
  let status = 'prompt'
  try {
    const checked = await withTimeout(plugin.checkPermissions(), 3000, null)
    status = checked?.speechRecognition || 'prompt'
  } catch {
    // ignore
  }

  if (status !== 'granted') {
    try {
      // Long window — user must tap 允許 on the system alert.
      const requested = await withTimeout(plugin.requestPermissions(), 120000, null)
      status = requested?.speechRecognition || status
    } catch {
      // ignore
    }
    try {
      const checked = await withTimeout(plugin.checkPermissions(), 3000, null)
      status = checked?.speechRecognition || status
    } catch {
      // ignore
    }
  }

  if (status === 'granted') {
    return { ok: true, status, detail: mic.ok ? 'mic+speech' : `speech-only:${mic.reason}` }
  }
  if (status === 'denied') {
    return { ok: false, status, detail: 'speech-denied' }
  }
  return { ok: false, status: status || 'prompt', detail: 'speech-not-granted' }
}

/**
 * Native speech session for iOS app builds.
 * Shape: { start({onPartial}) => Promise<result>, stop(), cancel() }
 */
export function createNativeSpeechSession() {
  let plugin = null
  let partialHandle = null
  let stateHandle = null
  let interim = ''
  let settle = null
  let stopRequested = false
  let closed = false
  let safetyTimer = null
  let silenceTimer = null
  let starting = false

  function clearTimers() {
    if (safetyTimer) {
      window.clearTimeout(safetyTimer)
      safetyTimer = null
    }
    if (silenceTimer) {
      window.clearTimeout(silenceTimer)
      silenceTimer = null
    }
  }

  async function detachListeners() {
    try {
      await partialHandle?.remove?.()
    } catch {
      // ignore
    }
    try {
      await stateHandle?.remove?.()
    } catch {
      // ignore
    }
    partialHandle = null
    stateHandle = null
  }

  async function hardStopEngine() {
    if (!plugin) return
    await withTimeout(plugin.stop(), STOP_TIMEOUT_MS, null)
  }

  function finish(extra = {}) {
    if (!settle || closed) return
    closed = true
    clearTimers()
    const s = settle
    settle = null
    const text = String(interim || '').trim()
    const payload = {
      text,
      errorCode: extra.errorCode || null,
      stopRequested,
    }
    void detachListeners()
    void hardStopEngine()
    s.resolve(payload)
  }

  function armSilenceEnd() {
    if (closed || !interim) return
    if (silenceTimer) window.clearTimeout(silenceTimer)
    silenceTimer = window.setTimeout(() => {
      silenceTimer = null
      if (closed || !interim) return
      stopRequested = true
      void hardStopEngine().finally(() => {
        window.setTimeout(() => finish({}), 350)
      })
    }, SILENCE_END_MS)
  }

  function start({ onPartial } = {}) {
    if (starting || (settle && !closed)) {
      return Promise.resolve({ text: '', errorCode: 'busy', stopRequested: true })
    }
    starting = true
    closed = false
    stopRequested = false
    interim = ''

    const done = new Promise((resolve) => {
      settle = { resolve }
    })

    safetyTimer = window.setTimeout(() => {
      stopRequested = true
      void hardStopEngine().finally(() => finish({ errorCode: interim ? null : 'timeout' }))
    }, MAX_LISTEN_MS)

    void (async () => {
      try {
        plugin = await getPlugin()
        if (!plugin) throw new Error('native-speech-unavailable')

        const available = await withTimeout(plugin.available(), 2500, { available: false })
        if (!available?.available) throw new Error('native-speech-unavailable')

        // Permissions should already be granted via ensureNativeSpeechPermission().
        // Re-check; if not granted, fail clearly instead of listening to silence.
        let permStatus = 'prompt'
        try {
          const checked = await withTimeout(plugin.checkPermissions(), 2500, null)
          permStatus = checked?.speechRecognition || 'prompt'
        } catch {
          // ignore
        }
        if (permStatus !== 'granted') {
          try {
            const requested = await withTimeout(plugin.requestPermissions(), 60000, null)
            permStatus = requested?.speechRecognition || permStatus
          } catch {
            // ignore
          }
        }
        if (permStatus === 'denied') {
          const err = new Error('not-allowed')
          err.name = 'NotAllowedError'
          throw err
        }
        if (permStatus !== 'granted') {
          throw new Error('permission-pending')
        }

        await withTimeout(plugin.stop(), STOP_TIMEOUT_MS, null)
        try {
          await withTimeout(plugin.removeAllListeners?.() ?? Promise.resolve(), 1000, null)
        } catch {
          // ignore
        }

        if (closed) return

        partialHandle = await plugin.addListener('partialResults', (data) => {
          if (closed) return
          const matches = data?.matches || []
          const preview = matches.filter(Boolean).join(' ').trim()
          if (!preview) return
          interim = preview
          onPartial?.(preview)
          armSilenceEnd()
        })

        stateHandle = await plugin.addListener('listeningState', (data) => {
          if (closed) return
          if (data?.status === 'stopped') {
            window.setTimeout(() => finish({}), 300)
          }
        })

        if (closed) return

        await plugin.start({
          language: NATIVE_STT_LANG,
          maxResults: 3,
          prompt: '請說英文',
          partialResults: true,
          popup: false,
        })
      } catch (err) {
        const denied = err?.name === 'NotAllowedError' || err?.message === 'not-allowed'
        finish({
          errorCode: denied
            ? 'not-allowed'
            : err?.message || 'start-failed',
        })
      } finally {
        starting = false
      }
    })()

    return done
  }

  async function stop() {
    stopRequested = true
    if (closed) return
    clearTimers()
    await hardStopEngine()
    window.setTimeout(() => finish({}), 400)
  }

  async function cancel() {
    stopRequested = true
    clearTimers()
    await hardStopEngine()
    void detachListeners()
    finish({ errorCode: 'aborted' })
  }

  return { start, stop, cancel }
}
