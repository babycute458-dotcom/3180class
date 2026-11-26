/** Capacitor native speech (iOS SFSpeechRecognizer). No-ops on web. */

import { Capacitor } from '@capacitor/core'

/** Spoken-answer language for Chinese→English practice (must stay English). */
export const NATIVE_STT_LANG = 'en-US'

const MAX_LISTEN_MS = 8000
const SILENCE_END_MS = 1100
const STOP_TIMEOUT_MS = 1500
const GUM_TIMEOUT_MS = 2500
const PERM_TIMEOUT_MS = 12000

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
 * Best-effort WebKit mic warm-up. NEVER hang the UI — always timed out.
 * Mic may already be granted (Settings shows Microphone on); in that case
 * getUserMedia can still deadlock on a busy AVAudioSession after TTS.
 */
async function ensureWebkitMicPermission() {
  if (!navigator?.mediaDevices?.getUserMedia) {
    return { ok: false, reason: 'no-getUserMedia' }
  }

  let timedOut = false
  const gumPromise = (async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
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
  })().catch((err) => {
    const name = err?.name || ''
    if (name === 'NotAllowedError' || name === 'PermissionDeniedError') {
      return { ok: false, reason: 'denied' }
    }
    return { ok: false, reason: name || 'getUserMedia-failed' }
  })

  const result = await Promise.race([
    gumPromise,
    new Promise((resolve) => {
      window.setTimeout(() => {
        timedOut = true
        resolve({ ok: false, reason: 'timeout' })
      }, GUM_TIMEOUT_MS)
    }),
  ])

  // If GUM later succeeds after timeout, still stop tracks.
  if (timedOut) {
    void gumPromise.then((late) => {
      if (late?.ok) {
        // tracks already stopped inside gumPromise on success
      }
    })
  }

  return result
}

/**
 * Ask for Speech Recognition + Microphone. Must not block forever.
 * onProgress?.(step) optional UI hook.
 * Returns { ok, status, detail }.
 */
export async function ensureNativeSpeechPermission(onProgress) {
  if (!isNativeApp()) {
    return { ok: false, status: 'web', detail: 'not-native' }
  }

  const overall = withTimeout(
    (async () => {
      onProgress?.('mic')
      // Mic warm-up is optional. Timeout/failure here must NOT block speech.
      // User already has Microphone ON in Settings in the common failure case.
      const mic = await ensureWebkitMicPermission()
      if (!mic.ok && mic.reason === 'denied') {
        // Hard deny — stop. Soft fail (timeout) — continue.
        return {
          ok: false,
          status: 'denied',
          detail: 'microphone-denied',
        }
      }

      onProgress?.('plugin')
      const plugin = await getPlugin()
      if (!plugin) {
        return { ok: false, status: 'unavailable', detail: 'no-plugin' }
      }

      let available = { available: false }
      try {
        available = await withTimeout(plugin.available(), 2500, { available: false })
      } catch {
        available = { available: false }
      }
      if (!available?.available) {
        return { ok: false, status: 'unavailable', detail: 'speech-unavailable' }
      }

      onProgress?.('speech')
      let status = 'prompt'
      try {
        const checked = await withTimeout(plugin.checkPermissions(), 2500, null)
        status = checked?.speechRecognition || 'prompt'
      } catch {
        // ignore
      }

      if (status === 'granted') {
        return {
          ok: true,
          status,
          detail: mic.ok ? 'mic+speech' : `speech-ok:mic-${mic.reason}`,
        }
      }

      if (status !== 'denied') {
        try {
          const requested = await withTimeout(
            plugin.requestPermissions(),
            PERM_TIMEOUT_MS,
            null,
          )
          if (requested?.speechRecognition) {
            status = requested.speechRecognition
          }
        } catch {
          // ignore
        }
        try {
          const checked = await withTimeout(plugin.checkPermissions(), 2500, null)
          status = checked?.speechRecognition || status
        } catch {
          // ignore
        }
      }

      if (status === 'granted') {
        return {
          ok: true,
          status,
          detail: mic.ok ? 'mic+speech' : `speech-ok:mic-${mic.reason}`,
        }
      }
      if (status === 'denied') {
        return { ok: false, status, detail: 'speech-denied' }
      }
      // Still prompt after timeout — allow start() to try; iOS may prompt then.
      return {
        ok: true,
        status: status || 'prompt',
        detail: `proceed-anyway:mic-${mic.reason}`,
      }
    })(),
    16000,
    { ok: false, status: 'timeout', detail: 'permission-flow-timeout' },
  )

  return overall
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

        let permStatus = 'prompt'
        try {
          const checked = await withTimeout(plugin.checkPermissions(), 2500, null)
          permStatus = checked?.speechRecognition || 'prompt'
        } catch {
          // ignore
        }
        if (permStatus !== 'granted' && permStatus !== 'denied') {
          try {
            const requested = await withTimeout(
              plugin.requestPermissions(),
              PERM_TIMEOUT_MS,
              null,
            )
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

        // plugin.start with partialResults resolves immediately when listening begins.
        await withTimeout(
          plugin.start({
            language: NATIVE_STT_LANG,
            maxResults: 3,
            prompt: '請說英文',
            partialResults: true,
            popup: false,
          }),
          5000,
          null,
        )
      } catch (err) {
        const denied = err?.name === 'NotAllowedError' || err?.message === 'not-allowed'
        const missing =
          String(err?.message || '').toLowerCase().includes('missing permission') ||
          String(err?.message || '').toLowerCase().includes('not authorized')
        finish({
          errorCode: denied || missing
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
