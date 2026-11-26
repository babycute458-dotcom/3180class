/** Capacitor native speech (iOS SFSpeechRecognizer). No-ops on web. */

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
 */
export function createNativeSpeechSession() {
  let plugin = null
  let partialHandle = null
  let interim = ''
  let settle = null
  let stopRequested = false
  let safetyTimer = null

  function clearSafety() {
    if (safetyTimer) {
      window.clearTimeout(safetyTimer)
      safetyTimer = null
    }
  }

  async function cleanup() {
    clearSafety()
    try {
      await partialHandle?.remove?.()
    } catch {
      // ignore
    }
    partialHandle = null
    try {
      await plugin?.stop?.()
    } catch {
      // ignore
    }
  }

  function finish(extra = {}) {
    if (!settle) return
    const s = settle
    settle = null
    const text = String(interim || '').trim()
    s.resolve({
      text,
      errorCode: extra.errorCode || null,
      stopRequested,
    })
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

    interim = ''
    stopRequested = false

    const done = new Promise((resolve) => {
      settle = { resolve }
    })

    partialHandle = await plugin.addListener('partialResults', (data) => {
      const matches = data?.matches || []
      const preview = matches.filter(Boolean).join(' ').trim()
      if (preview) {
        interim = preview
        onPartial?.(preview)
      }
    })

    await plugin.start({
      language: 'en-US',
      maxResults: 3,
      prompt: '请说英文',
      partialResults: true,
      popup: false,
    })

    // iOS native recognition often auto-stops after a phrase.
    safetyTimer = window.setTimeout(() => {
      void cleanup().then(() => finish({}))
    }, 15000)

    return done
  }

  async function stop() {
    stopRequested = true
    await cleanup()
    finish({})
  }

  async function cancel() {
    stopRequested = true
    await cleanup()
    finish({ errorCode: 'aborted' })
  }

  return { start, stop, cancel }
}
