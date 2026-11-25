const MODEL_ID = 'Xenova/whisper-tiny.en'
const TARGET_SAMPLE_RATE = 16000
const TRANSFORMERS_CDN = 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@4.3.2'

let transformersMod = null
let transcriberPromise = null
let loadStatus = { phase: 'idle', progress: 0, message: '' }

export function getSttLoadStatus() {
  return { ...loadStatus }
}

function setLoadStatus(phase, progress, message) {
  loadStatus = { phase, progress, message }
}

async function loadTransformers() {
  if (transformersMod) return transformersMod
  setLoadStatus('download', 0, '正在加载语音引擎…')
  // Load from CDN so the GitHub Pages deploy stays small and avoids bundling ONNX.
  transformersMod = await import(/* @vite-ignore */ `${TRANSFORMERS_CDN}/dist/transformers.web.js`)
  const { env } = transformersMod
  env.allowLocalModels = false
  env.useBrowserCache = true
  // WASM files also come from the CDN package.
  env.backends.onnx.wasm.wasmPaths = `${TRANSFORMERS_CDN}/dist/`
  return transformersMod
}

async function createTranscriber(remoteHost) {
  const { pipeline, env } = await loadTransformers()
  if (remoteHost) env.remoteHost = remoteHost
  return pipeline('automatic-speech-recognition', MODEL_ID, {
    device: 'wasm',
    dtype: 'q8',
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
          const t = await createTranscriber(host)
          setLoadStatus('ready', 100, '语音模型已就绪')
          onStatus?.(getSttLoadStatus())
          return t
        } catch (err) {
          lastError = err
          setLoadStatus('download', 0, '下载失败，正在换源重试…')
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
  const candidates = [
    'audio/webm;codecs=opus',
    'audio/webm',
    'audio/mp4',
    'audio/ogg;codecs=opus',
  ]
  if (typeof MediaRecorder === 'undefined') return ''
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
    const start = Math.floor(i * ratio)
    const end = Math.min(Math.floor((i + 1) * ratio), float32.length)
    let sum = 0
    let count = 0
    for (let j = start; j < end; j += 1) {
      sum += float32[j]
      count += 1
    }
    out[i] = count ? sum / count : float32[start] || 0
  }
  return out
}

async function blobToMono16k(blob) {
  const arrayBuf = await blob.arrayBuffer()
  const ctx = new AudioContext()
  try {
    const decoded = await ctx.decodeAudioData(arrayBuf.slice(0))
    const ch0 = decoded.getChannelData(0)
    let mono = ch0
    if (decoded.numberOfChannels > 1) {
      const ch1 = decoded.getChannelData(1)
      mono = new Float32Array(ch0.length)
      for (let i = 0; i < ch0.length; i += 1) mono[i] = (ch0[i] + ch1[i]) * 0.5
    }
    return downsampleTo16k(mono, decoded.sampleRate)
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
export function createRecorder() {
  let mediaStream = null
  let recorder = null
  let chunks = []
  let startedAt = 0

  async function start() {
    chunks = []
    mediaStream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true,
      },
      video: false,
    })
    const mime = pickRecorderMime()
    recorder = mime ? new MediaRecorder(mediaStream, { mimeType: mime }) : new MediaRecorder(mediaStream)
    recorder.ondataavailable = (event) => {
      if (event.data && event.data.size > 0) chunks.push(event.data)
    }
    startedAt = Date.now()
    recorder.start(250)
  }

  function stop() {
    return new Promise((resolve, reject) => {
      if (!recorder) {
        reject(new Error('not recording'))
        return
      }
      const rec = recorder
      const stream = mediaStream
      const mime = rec.mimeType || 'audio/webm'

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
  setLoadStatus('transcribe', 0, '正在识别英文…')
  onStatus?.(getSttLoadStatus())

  const audio = await blobToMono16k(blob)
  if (!audio.length) {
    throw new Error('empty-audio')
  }

  const result = await transcriber(audio, {
    language: 'english',
    task: 'transcribe',
    return_timestamps: false,
  })

  const text = String(result?.text || '').trim()
  setLoadStatus('ready', 100, '语音模型已就绪')
  onStatus?.(getSttLoadStatus())
  return text
}
