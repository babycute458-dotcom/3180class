/** Capacitor native speech (iOS SFSpeechRecognizer). No-ops on web. */

/** Spoken-answer language for Chinese→English practice (must stay English). */
export const NATIVE_STT_LANG = 'en-US'

const MAX_LISTEN_MS = 8000
const SILENCE_END_MS = 1100
const STOP_TIMEOUT_MS = 1500

export function isNativeApp() {
  try {
    return !!window.Capacitor?.isNativePlatform?.()
  } catch {
    return false
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
 * Native speech session for iOS app builds.
 * Shape: { start({onPartial}) => Promise<result>, stop(), cancel() }
 *
 * iOS SFSpeechAudioBufferRecognitionRequest does NOT auto-finalize until
 * endAudio()/stop(). We therefore:
 *  - end on silence after partial text
 *  - hard-cap total listen time
 *  - never await plugin.stop without a timeout (prevents UI deadlocks)
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
    // Detach in background; never block settle on plugin calls.
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
        // Brief wait for a last partial after endAudio, then settle.
        window.setTimeout(() => finish({}), 350)
      })
    }, SILENCE_END_MS)
  }

  /**
   * Returns a promise that resolves to { text, errorCode, stopRequested }.
   * Safe to call stop()/cancel() while this is pending.
   */
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

    // Watchdog from the first moment — before any plugin await.
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

        try {
          const perm = await withTimeout(plugin.requestPermissions(), 5000, null)
          if (perm?.speechRecognition === 'denied') {
            const err = new Error('not-allowed')
            err.name = 'NotAllowedError'
            throw err
          }
        } catch (err) {
          if (err?.name === 'NotAllowedError') throw err
        }

        // Clear any leftover session; never hang here.
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
            // Engine stopped (isFinal or our stop). Collect last partial briefly.
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
          errorCode: denied ? 'not-allowed' : err?.message || 'start-failed',
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
