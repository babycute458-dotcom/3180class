/** Cloud speech-to-text (OpenAI-compatible Whisper) — quality similar to Google Translate. */

import { loadSttSettings } from './settings.js'

function floatTo16BitPCM(float32) {
  const out = new Int16Array(float32.length)
  for (let i = 0; i < float32.length; i += 1) {
    const s = Math.max(-1, Math.min(1, float32[i]))
    out[i] = s < 0 ? s * 0x8000 : s * 0x7fff
  }
  return out
}

/** Build a mono 16-bit WAV Blob from Float32 PCM @ sampleRate. */
export function encodeWavBlob(float32, sampleRate = 16000) {
  const pcm = floatTo16BitPCM(float32)
  const buffer = new ArrayBuffer(44 + pcm.length * 2)
  const view = new DataView(buffer)

  const writeStr = (offset, str) => {
    for (let i = 0; i < str.length; i += 1) view.setUint8(offset + i, str.charCodeAt(i))
  }

  writeStr(0, 'RIFF')
  view.setUint32(4, 36 + pcm.length * 2, true)
  writeStr(8, 'WAVE')
  writeStr(12, 'fmt ')
  view.setUint32(16, 16, true) // PCM chunk size
  view.setUint16(20, 1, true) // PCM format
  view.setUint16(22, 1, true) // mono
  view.setUint32(24, sampleRate, true)
  view.setUint32(28, sampleRate * 2, true) // byte rate
  view.setUint16(32, 2, true) // block align
  view.setUint16(34, 16, true) // bits
  writeStr(36, 'data')
  view.setUint32(40, pcm.length * 2, true)

  let offset = 44
  for (let i = 0; i < pcm.length; i += 1, offset += 2) {
    view.setInt16(offset, pcm[i], true)
  }

  return new Blob([buffer], { type: 'audio/wav' })
}

/**
 * Transcribe English speech via cloud Whisper (Groq / OpenAI).
 * @returns {Promise<string>}
 */
export async function transcribeCloudPcm(float32, { sampleRate = 16000, onStatus } = {}) {
  const settings = loadSttSettings()
  if (!settings.apiKey) {
    throw new Error('missing-api-key')
  }

  onStatus?.({ phase: 'transcribe', progress: 10, message: '正在上傳到雲端辨識（像 Google 翻譯）…' })

  const wav = encodeWavBlob(float32, sampleRate)
  const form = new FormData()
  form.append('file', wav, 'speech.wav')
  form.append('model', settings.model)
  form.append('language', 'en')
  form.append('response_format', 'json')

  const base = settings.baseUrl.replace(/\/$/, '')
  const url = `${base}/audio/transcriptions`

  const controller = new AbortController()
  const timer = window.setTimeout(() => controller.abort(), 45000)

  let response
  try {
    response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${settings.apiKey}`,
      },
      body: form,
      signal: controller.signal,
    })
  } catch (err) {
    window.clearTimeout(timer)
    if (err?.name === 'AbortError') throw new Error('cloud-timeout')
    throw new Error(err?.message || 'cloud-network-error')
  }
  window.clearTimeout(timer)

  if (!response.ok) {
    let detail = ''
    try {
      const body = await response.json()
      detail = body?.error?.message || body?.message || ''
    } catch {
      try {
        detail = await response.text()
      } catch {
        // ignore
      }
    }
    if (response.status === 401 || response.status === 403) {
      throw new Error('cloud-auth')
    }
    throw new Error(detail || `cloud-http-${response.status}`)
  }

  const data = await response.json()
  onStatus?.({ phase: 'ready', progress: 100, message: '雲端辨識完成' })
  return String(data?.text || '').trim()
}
