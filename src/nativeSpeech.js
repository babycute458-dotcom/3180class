/** Capacitor native speech (iOS SFSpeechRecognizer). No-ops on web. */

/** Spoken-answer language for mid-to-English practice (must stay English). */
export const NATIVE_STT_LANG = 'en-US'

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

/**
 * Native speech session for iOS app builds.
 * Shape: { start({onPartial}) => Promise<result>, stop(), cancel() }
 *
 * Relies on listeningState + partialResults. After the engine stops we wait
 * briefly for a final partial, then resolve — so the UI never sits on
 * 「識別中」 forever.
 */
export function createNativeSpeechSession() {
  let plugin = null
  let partialHandle = null
  let stateHandle = null
  let interim = ''
  let settle = null
  let stopRequested = false
  let safetyTimer = null
  let finalizeTimer = null
  let closed = false

  function clearTimers() {
    if (safetyTimer) {
      window.clearTimeout(safetyTimer)
      safetyTimer = null
    }
    if (finalizeTimer) {
      window.clearTimeout(finalizeTimer)
      finalizeTimer = null
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
    try {
      await plugin?.stop?.()
    } catch {
      // ignore
    }
  }

  function finish(extra = {}) {
    if (!settle || closed) return
    closed = true
    clearTimers()
    const s = settle
    settle = null
    const text = String(interim || '').trim()
    void detachListeners().then(() => {
      s.resolve({
        text,
        errorCode: extra.errorCode || null,
        stopRequested,
      })
    })
  }

  function scheduleFinalize(extra = {}, delayMs = 450) {
    if (closed) return
    if (finalizeTimer) window.clearTimeout(finalizeTimer)
    finalizeTimer = window.setTimeout(() => {
      finalizeTimer = null
      void hardStopEngine().finally(() => finish(extra))
    }, delayMs)
  }

  async function start({ onPartial } = {}) {
    plugin = await getPlugin()
    if (!plugin) throw new Error('native-speech-unavailable')

    const available = await plugin.available()
    if (!available?.available) throw new Error('native-speech-unavailable')

    try {
      const perm = await plugin.requestPermissions()
      if (perm?.speechRecognition === 'denied') {
        const err = new Error('not-allowed')
        err.name = 'NotAllowedError'
        throw err
      }
    } catch (err) {
      if (err?.name === 'NotAllowedError') throw err
      // Older plugin builds may not implement requestPermissions the same way.
    }

    // Ensure any leftover engine is stopped before a new start.
    try {
      await plugin.stop()
    } catch {
      // ignore
    }
    try {
      await plugin.removeAllListeners?.()
    } catch {
      // ignore
    }

    interim = ''
    stopRequested = false
    closed = false

    const done = new Promise((resolve) => {
      settle = { resolve }
    })

    partialHandle = await plugin.addListener('partialResults', (data) => {
      if (closed) return
      const matches = data?.matches || []
      const preview = matches.filter(Boolean).join(' ').trim()
      if (preview) {
        interim = preview
        onPartial?.(preview)
      }
    })

    stateHandle = await plugin.addListener('listeningState', (data) => {
      if (closed) return
      if (data?.status === 'stopped') {
        // endAudio / isFinal — wait briefly for the last partial, then settle.
        scheduleFinalize({}, 500)
      }
    })

    await plugin.start({
      language: NATIVE_STT_LANG,
      maxResults: 3,
      prompt: '請說英文',
      partialResults: true,
      popup: false,
    })

    // Hard ceiling so the UI never hangs.
    safetyTimer = window.setTimeout(() => {
      void hardStopEngine().finally(() => finish({}))
    }, 12000)

    return done
  }

  async function stop() {
    stopRequested = true
    if (closed) return
    await hardStopEngine()
    // Final transcript often arrives just after endAudio.
    scheduleFinalize({}, 700)
  }

  async function cancel() {
    stopRequested = true
    clearTimers()
    await hardStopEngine()
    await detachListeners()
    finish({ errorCode: 'aborted' })
  }

  return { start, stop, cancel }
}
