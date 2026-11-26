const MODEL_ID = 'Xenova/whisper-tiny.en'
const TARGET_SAMPLE_RATE = 16000
// v2 CDN build is a self-contained ESM (bundles onnxruntime).
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
  setLoadStatus('download', 0, '正在載入語音引擎…')
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
        setLoadStatus('download', progress, `下載語音模型… ${progress}%`)
      } else if (data.status === 'done' || data.status === 'ready') {
        setLoadStatus('download', 100, '模型下載完成，正在準備…')
      } else if (data.status === 'initiate') {
        setLoadStatus('download', progress || 0, '開始下載語音模型（約 40MB，僅首次）…')
      }
      onStatus?.(getSttLoadStatus())
    },
  })
}

/** Lazy-load Whisper tiny.en. Safe to call multiple times. */
export function loadSttEngine(onStatus) {
  if (!transcriberPromise) {
    setLoadStatus('download', 0, '首次使用需下載語音模型（約 40MB）…')
    onStatus?.(getSttLoadStatus())

    transcriberPromise = (async () => {
      const hosts = [undefined, 'https://hf-mirror.com', 'https://huggingface.co']
      let lastError
      for (const host of hosts) {
        try {
          const t = await createTranscriber(host, onStatus)
          setLoadStatus('ready', 100, '語音模型已就緒')
          onStatus?.(getSttLoadStatus())
          return t
        } catch (err) {
          lastError = err
          console.warn('[stt] model load failed', host || 'default', err)
          setLoadStatus(
            'download',
            0,
            `下載失敗（${err?.message || err}），正在換源重試…`,
          )
          onStatus?.(getSttLoadStatus())
        }
      }
      transcriberPromise = null
      setLoadStatus('error', 0, '語音模型載入失敗')
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
  const candidates = isAppleMobile()
    ? ['audio/mp4', 'audio/aac', 'audio/wav', 'audio/webm']
    : ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4', 'audio/ogg;codecs=opus']
  return candidates.find((t) => MediaRecorder.isTypeSupported(t)) || ''
}

export function canRecordAudio() {
  return !!(navigator.mediaDevices?.getUserMedia && (window.AudioContext || window.webkitAudioContext))
}

function downsampleTo16k(float32, inputRate) {
  if (!float32?.length) return new Float32Array(0)
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

/** Peak-normalize so quiet/loud speech both reach Whisper cleanly. */
function normalizeAudio(float32) {
  if (!float32?.length) return float32
  let peak = 0
  for (let i = 0; i < float32.length; i += 1) {
    const a = Math.abs(float32[i])
    if (a > peak) peak = a
  }
  if (peak < 1e-8) return float32
  // Target peak ~0.9; also gently boost very quiet takes.
  const gain = Math.min(12, 0.9 / peak)
  if (gain < 1.05) return float32
  const out = new Float32Array(float32.length)
  for (let i = 0; i < float32.length; i += 1) out[i] = float32[i] * gain
  return out
}

function mergeFloatChunks(chunks) {
  let total = 0
  for (const c of chunks) total += c.length
  const out = new Float32Array(total)
  let offset = 0
  for (const c of chunks) {
    out.set(c, offset)
    offset += c.length
  }
  return out
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
 * PCM recorder via AudioContext — reliable on iOS WKWebView.
 * MediaRecorder mp4 on iPhone often decodes to near-silence / empty for Whisper.
 * Returns { audio: Float32Array@16k, durationMs, rms, sampleRate }.
 */
export function createPcmRecorder({ timeoutMs = 5000 } = {}) {
  let mediaStream = null
  let ctx = null
  let source = null
  let processor = null
  let mute = null
  let chunks = []
  let startedAt = 0
  let inputRate = TARGET_SAMPLE_RATE

  async function start() {
    chunks = []
    const gum = navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true,
      },
      video: false,
    })
    const timed = new Promise((_, reject) => {
      window.setTimeout(() => reject(new Error('getUserMedia-timeout')), timeoutMs)
    })
    mediaStream = await Promise.race([gum, timed])
    void gum
      .then((late) => {
        if (late && late !== mediaStream) {
          try {
            late.getTracks().forEach((t) => t.stop())
          } catch {
            // ignore
          }
        }
      })
      .catch(() => {})

    const AC = window.AudioContext || window.webkitAudioContext
    ctx = new AC()
    inputRate = ctx.sampleRate || 44100
    if (ctx.state === 'suspended') {
      await Promise.race([
        ctx.resume(),
        new Promise((r) => window.setTimeout(r, 800)),
      ])
    }

    source = ctx.createMediaStreamSource(mediaStream)
    // ScriptProcessor is deprecated but still the most compatible path on iOS WKWebView.
    processor = ctx.createScriptProcessor(4096, 1, 1)
    processor.onaudioprocess = (event) => {
      const input = event.inputBuffer.getChannelData(0)
      // Copy — the buffer is reused.
      chunks.push(new Float32Array(input))
    }

    // Must connect to destination or iOS may not fire onaudioprocess.
    mute = ctx.createGain()
    mute.gain.value = 0
    source.connect(processor)
    processor.connect(mute)
    mute.connect(ctx.destination)

    startedAt = Date.now()
  }

  function stop() {
    const durationMs = Date.now() - startedAt
    const rate = inputRate
    const raw = mergeFloatChunks(chunks)
    chunks = []

    try {
      processor?.disconnect()
    } catch {
      // ignore
    }
    try {
      source?.disconnect()
    } catch {
      // ignore
    }
    try {
      mute?.disconnect()
    } catch {
      // ignore
    }
    try {
      mediaStream?.getTracks?.().forEach((t) => t.stop())
    } catch {
      // ignore
    }
    mediaStream = null
    processor = null
    source = null
    mute = null
    const closing = ctx
    ctx = null
    void closing?.close?.()

    const audio = normalizeAudio(downsampleTo16k(raw, rate))
    const rms = rmsLevel(audio)
    return Promise.resolve({ audio, durationMs, rms, sampleRate: TARGET_SAMPLE_RATE })
  }

  function cancel() {
    chunks = []
    try {
      processor?.disconnect()
    } catch {
      // ignore
    }
    try {
      source?.disconnect()
    } catch {
      // ignore
    }
    try {
      mute?.disconnect()
    } catch {
      // ignore
    }
    try {
      mediaStream?.getTracks?.().forEach((t) => t.stop())
    } catch {
      // ignore
    }
    try {
      void ctx?.close?.()
    } catch {
      // ignore
    }
    mediaStream = null
    processor = null
    source = null
    mute = null
    ctx = null
  }

  return { start, stop, cancel, kind: 'pcm' }
}

/**
 * Legacy MediaRecorder path (desktop fallback).
 */
export function createRecorder({ timeoutMs = 5000 } = {}) {
  let mediaStream = null
  let recorder = null
  let chunks = []
  let startedAt = 0

  async function start() {
    chunks = []
    const gum = navigator.mediaDevices.getUserMedia({ audio: true, video: false })
    const timed = new Promise((_, reject) => {
      window.setTimeout(() => reject(new Error('getUserMedia-timeout')), timeoutMs)
    })
    mediaStream = await Promise.race([gum, timed])
    void gum
      .then((late) => {
        if (late && late !== mediaStream) {
          try {
            late.getTracks().forEach((t) => t.stop())
          } catch {
            // ignore
          }
        }
      })
      .catch(() => {})

    const mime = pickRecorderMime()
    recorder = mime ? new MediaRecorder(mediaStream, { mimeType: mime }) : new MediaRecorder(mediaStream)
    recorder.ondataavailable = (event) => {
      if (event.data && event.data.size > 0) chunks.push(event.data)
    }
    startedAt = Date.now()
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

  return { start, stop, cancel, kind: 'blob' }
}

export async function transcribePcm(audio, onStatus, meta = {}) {
  const transcriber = await loadSttEngine(onStatus)
  setLoadStatus('transcribe', 0, '正在辨識英文…')
  onStatus?.(getSttLoadStatus())

  if (!audio?.length) {
    throw new Error('empty-audio')
  }
  const rms = typeof meta.rms === 'number' ? meta.rms : rmsLevel(audio)
  // Very low bar — PCM path already normalized; only reject true digital silence.
  if (rms < 0.00005) {
    const err = new Error('silent-audio')
    err.rms = rms
    err.durationMs = meta.durationMs
    throw err
  }

  const result = await transcriber(audio, {
    language: 'english',
    task: 'transcribe',
    return_timestamps: false,
    sampling_rate: TARGET_SAMPLE_RATE,
  })

  let text = String(result?.text || '').trim()
  text = text.replace(/^[^a-zA-Z0-9]+|[^a-zA-Z0-9]+$/g, '').trim()
  if (!/[a-zA-Z]/.test(text)) text = ''

  setLoadStatus('ready', 100, '語音模型已就緒')
  onStatus?.(getSttLoadStatus())
  return { text, rms, durationMs: meta.durationMs || 0 }
}

export async function transcribeBlob(blob, onStatus) {
  const transcriber = await loadSttEngine(onStatus)
  setLoadStatus('transcribe', 0, '正在辨識英文…')
  onStatus?.(getSttLoadStatus())

  const { audio, rms } = await blobToMono16k(blob)
  const boosted = normalizeAudio(audio)
  if (!boosted.length) {
    throw new Error('empty-audio')
  }
  if (rms < 0.00005) {
    throw new Error('silent-audio')
  }

  const result = await transcriber(boosted, {
    language: 'english',
    task: 'transcribe',
    return_timestamps: false,
    sampling_rate: TARGET_SAMPLE_RATE,
  })

  let text = String(result?.text || '').trim()
  text = text.replace(/^[^a-zA-Z0-9]+|[^a-zA-Z0-9]+$/g, '').trim()
  if (!/[a-zA-Z]/.test(text)) text = ''

  setLoadStatus('ready', 100, '語音模型已就緒')
  onStatus?.(getSttLoadStatus())
  return text
}

/**
 * Web Speech session.
 * On iPhone use continuous:false (one-shot). Desktop can use push-to-talk.
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
