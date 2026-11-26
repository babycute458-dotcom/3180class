const MODEL_ID = 'Xenova/whisper-tiny.en'
const TARGET_SAMPLE_RATE = 16000
// v2 CDN build is a self-contained ESM (bundles onnxruntime). v4's transformers.web.js
// has bare imports like "onnxruntime-web/webgpu" and fails in the browser.
const TRANSFORMERS_CDN =
  'https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.2/dist/transformers.min.js'

const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition

let transformersMod = null
let transcriberPromise = null
let loadStatus = { phase: 'idle', progress: 0, message: '' }

export function getSttLoadStatus() {
  return { ...loadStatus }
}

export function canUseWebSpeech() {
  return typeof SpeechRecognitionAPI === 'function'
}

export function isAppleMobile() {
  const ua = navigator.userAgent || ''
  return /iPhone|iPad|iPod/i.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
}

function setLoadStatus(phase, progress, message) {
  loadStatus = { phase, progress, message }
}

async function loadTransformers() {
  if (transformersMod) return transformersMod
  setLoadStatus('download', 0, '正在加载语音引擎…')
  transformersMod = await import(/* @vite-ignore */ TRANSFORMERS_CDN)
  const { env } = transformersMod
  env.allowLocalModels = false
  env.useBrowserCache = true
  return transformersMod
}

async function createTranscriber(remoteHost, onStatus) {
  const { pipeline, env } = await loadTransformers()
  if (remoteHost) env.remoteHost = remoteHost
  return pipeline('automatic-speech-recognition', MODEL_ID, {
    progress_callback: (data) => {
      if (!data) return
      const progress = typeof data.progress === 'number' ? Math.round(data.progress) : loadStatus.progress
      if (data.status === 'progress') {
        setLoadStatus('download', progress, `下载语音模型… ${progress}%`)
      } else if (data.status === 'done' || data.status === 'ready') {
        setLoadStatus('download', 100, '模型下载完成，正在准备…')
      } else if (data.status === 'initiate') {
        setLoadStatus('download', progress || 0, '开始下载语音模型（约 40MB，仅首次）…')
      }
      onStatus?.(getSttLoadStatus())
    },
  })
}

/** Lazy-load Whisper tiny.en. Safe to call multiple times. */
export function loadSttEngine(onStatus) {
  if (!transcriberPromise) {
    setLoadStatus('download', 0, '首次使用需下载语音模型（约 40MB）…')
    onStatus?.(getSttLoadStatus())

    transcriberPromise = (async () => {
      const hosts = [undefined, 'https://hf-mirror.com', 'https://huggingface.co']
      let lastError
      for (const host of hosts) {
        try {
          const t = await createTranscriber(host, onStatus)
          setLoadStatus('ready', 100, '语音模型已就绪')
          onStatus?.(getSttLoadStatus())
          return t
        } catch (err) {
          lastError = err
          console.warn('[stt] model load failed', host || 'default', err)
          setLoadStatus(
            'download',
            0,
            `下载失败（${err?.message || err}），正在换源重试…`,
          )
          onStatus?.(getSttLoadStatus())
        }
      }
      transcriberPromise = null
      setLoadStatus('error', 0, '语音模型加载失败')
      onStatus?.(getSttLoadStatus())
      throw lastError || new Error('STT model load failed')
    })()
  } else {
    onStatus?.(getSttLoadStatus())
  }
  return transcriberPromise
}

function pickRecorderMime() {
  if (typeof MediaRecorder === 'undefined') return ''
  // iOS only supports mp4/aac — preferring webm first makes some WebKits pick a bad path.
  const candidates = isAppleMobile()
    ? ['audio/mp4', 'audio/aac', 'audio/wav', 'audio/webm']
    : ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4', 'audio/ogg;codecs=opus']
  return candidates.find((t) => MediaRecorder.isTypeSupported(t)) || ''
}

export function canRecordAudio() {
  return !!(navigator.mediaDevices?.getUserMedia && typeof MediaRecorder !== 'undefined')
}

function downsampleTo16k(float32, inputRate) {
  if (inputRate === TARGET_SAMPLE_RATE) return float32
  const ratio = inputRate / TARGET_SAMPLE_RATE
  const outLen = Math.max(1, Math.round(float32.length / ratio))
  const out = new Float32Array(outLen)
  for (let i = 0; i < outLen; i += 1) {
    const idx = i * ratio
    const i0 = Math.floor(idx)
    const i1 = Math.min(i0 + 1, float32.length - 1)
    const frac = idx - i0
    out[i] = float32[i0] * (1 - frac) + float32[i1] * frac
  }
  return out
}

function rmsLevel(float32) {
  if (!float32?.length) return 0
  let sum = 0
  const step = Math.max(1, Math.floor(float32.length / 4000))
  let n = 0
  for (let i = 0; i < float32.length; i += step) {
    const v = float32[i]
    sum += v * v
    n += 1
  }
  return n ? Math.sqrt(sum / n) : 0
}

async function blobToMono16k(blob) {
  const arrayBuf = await blob.arrayBuffer()
  const AC = window.AudioContext || window.webkitAudioContext
  const ctx = new AC()
  try {
    if (ctx.state === 'suspended') {
      try {
        await ctx.resume()
      } catch {
        // ignore
      }
    }
    const decoded = await ctx.decodeAudioData(arrayBuf.slice(0))
    const ch0 = decoded.getChannelData(0)
    let mono = ch0
    if (decoded.numberOfChannels > 1) {
      const ch1 = decoded.getChannelData(1)
      mono = new Float32Array(ch0.length)
      for (let i = 0; i < ch0.length; i += 1) mono[i] = (ch0[i] + ch1[i]) * 0.5
    }
    return { audio: downsampleTo16k(mono, decoded.sampleRate), rms: rmsLevel(mono) }
  } finally {
    try {
      await ctx.close()
    } catch {
      // ignore
    }
  }
}

/**
 * One-shot push-to-talk recorder.
 * start() begins capture; stop() returns a Blob.
 */
export function createRecorder({ timeoutMs = 5000 } = {}) {
  let mediaStream = null
  let recorder = null
  let chunks = []
  let startedAt = 0

  async function start() {
    chunks = []
    // Keep constraints minimal — fancy constraints hang more often on iOS WKWebView.
    const gum = navigator.mediaDevices.getUserMedia({ audio: true, video: false })
    const timed = new Promise((_, reject) => {
      window.setTimeout(() => reject(new Error('getUserMedia-timeout')), timeoutMs)
    })
    mediaStream = await Promise.race([gum, timed])
    // If timed out, still try to stop a late stream.
    void gum.then((late) => {
      if (late && late !== mediaStream) {
        try {
          late.getTracks().forEach((t) => t.stop())
        } catch {
          // ignore
        }
      }
    }).catch(() => {})

    const mime = pickRecorderMime()
    recorder = mime ? new MediaRecorder(mediaStream, { mimeType: mime }) : new MediaRecorder(mediaStream)
    recorder.ondataavailable = (event) => {
      if (event.data && event.data.size > 0) chunks.push(event.data)
    }
    startedAt = Date.now()
    // timeslice helps some mobile browsers flush audio chunks
    try {
      recorder.start(200)
    } catch {
      recorder.start()
    }
  }

  function stop() {
    return new Promise((resolve, reject) => {
      if (!recorder) {
        reject(new Error('not recording'))
        return
      }
      const rec = recorder
      const stream = mediaStream
      const mime = rec.mimeType || (isAppleMobile() ? 'audio/mp4' : 'audio/webm')

      const finish = () => {
        try {
          stream?.getTracks?.().forEach((t) => t.stop())
        } catch {
          // ignore
        }
        mediaStream = null
        recorder = null
        const blob = new Blob(chunks, { type: mime })
        chunks = []
        resolve({ blob, durationMs: Date.now() - startedAt })
      }

      rec.onerror = (event) => {
        try {
          stream?.getTracks?.().forEach((t) => t.stop())
        } catch {
          // ignore
        }
        reject(event.error || new Error('recorder error'))
      }

      if (rec.state === 'inactive') {
        finish()
        return
      }
      rec.onstop = finish
      try {
        if (rec.state === 'recording') rec.requestData?.()
      } catch {
        // ignore
      }
      try {
        rec.stop()
      } catch (err) {
        reject(err)
      }
    })
  }

  function cancel() {
    try {
      if (recorder && recorder.state !== 'inactive') recorder.stop()
    } catch {
      // ignore
    }
    try {
      mediaStream?.getTracks?.().forEach((t) => t.stop())
    } catch {
      // ignore
    }
    recorder = null
    mediaStream = null
    chunks = []
  }

  return { start, stop, cancel }
}

export async function transcribeBlob(blob, onStatus) {
  const transcriber = await loadSttEngine(onStatus)
  setLoadStatus('transcribe', 0, '正在辨識英文…')
  onStatus?.(getSttLoadStatus())

  const { audio, rms } = await blobToMono16k(blob)
  if (!audio.length) {
    throw new Error('empty-audio')
  }
  if (rms < 0.0008) {
    throw new Error('silent-audio')
  }

  // xenova v2 accepts Float32Array; also pass sampling_rate explicitly.
  const result = await transcriber(audio, {
    language: 'english',
    task: 'transcribe',
    return_timestamps: false,
    sampling_rate: TARGET_SAMPLE_RATE,
  })

  let text = String(result?.text || '').trim()
  // Whisper sometimes emits only punctuation / blanks on bad audio.
  text = text.replace(/^[^a-zA-Z0-9]+|[^a-zA-Z0-9]+$/g, '').trim()
  if (!/[a-zA-Z]/.test(text)) text = ''

  setLoadStatus('ready', 100, '语音模型已就绪')
  onStatus?.(getSttLoadStatus())
  return text
}

/**
 * Web Speech session.
 * On iPhone use continuous:false (one-shot). Desktop can use push-to-talk.
 * IMPORTANT: start() must be called directly inside a user-gesture stack
 * (no await/sleep before recognition.start()).
 */
export function createWebSpeechSession({ continuous = false } = {}) {
  if (!canUseWebSpeech()) {
    throw new Error('web-speech-unavailable')
  }

  let recognition = null
  let finals = []
  let interim = ''
  let stopRequested = false
  let errorCode = null
  let settle = null

  function start({ onPartial } = {}) {
    finals = []
    interim = ''
    stopRequested = false
    errorCode = null

    recognition = new SpeechRecognitionAPI()
    recognition.lang = 'en-US'
    recognition.continuous = !!continuous
    recognition.interimResults = true
    recognition.maxAlternatives = 3

    const done = new Promise((resolve) => {
      settle = { resolve }
    })

    recognition.onresult = (event) => {
      let nextInterim = ''
      for (let i = event.resultIndex; i < event.results.length; i += 1) {
        const result = event.results[i]
        const alt0 = result?.[0]?.transcript?.trim() || ''
        if (!alt0) continue
        if (result.isFinal) finals.push(alt0)
        else nextInterim += (nextInterim ? ' ' : '') + alt0
      }
      interim = nextInterim
      const preview = [...finals, interim].filter(Boolean).join(' ').trim()
      onPartial?.(preview)
    }

    recognition.onerror = (event) => {
      errorCode = event.error || 'error'
    }

    recognition.onend = () => {
      const text = [...finals, interim].filter(Boolean).join(' ').trim()
      const payload = { text, errorCode, stopRequested }
      recognition = null
      settle?.resolve(payload)
      settle = null
    }

    // Must run in the same turn as the tap on iOS.
    recognition.start()
    return done
  }

  function stop() {
    stopRequested = true
    try {
      recognition?.stop?.()
    } catch {
      try {
        recognition?.abort?.()
      } catch {
        // ignore
      }
    }
  }

  function cancel() {
    stopRequested = true
    try {
      recognition?.abort?.()
    } catch {
      try {
        recognition?.stop?.()
      } catch {
        // ignore
      }
    }
    recognition = null
  }

  return { start, stop, cancel }
}
