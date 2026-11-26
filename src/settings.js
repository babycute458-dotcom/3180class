/** Local settings for cloud speech (Google-Translate-quality via Whisper API). */

const STORAGE_KEY = 'duilian.stt.v1'

export const STT_PRESETS = {
  groq: {
    id: 'groq',
    label: 'Groq（免費，推薦）',
    baseUrl: 'https://api.groq.com/openai/v1',
    model: 'whisper-large-v3-turbo',
    helpUrl: 'https://console.groq.com/keys',
  },
  openai: {
    id: 'openai',
    label: 'OpenAI Whisper',
    baseUrl: 'https://api.openai.com/v1',
    model: 'whisper-1',
    helpUrl: 'https://platform.openai.com/api-keys',
  },
}

const DEFAULTS = {
  provider: 'groq',
  apiKey: '',
  baseUrl: STT_PRESETS.groq.baseUrl,
  model: STT_PRESETS.groq.model,
}

export function loadSttSettings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { ...DEFAULTS }
    const parsed = JSON.parse(raw)
    const provider = STT_PRESETS[parsed.provider] ? parsed.provider : 'groq'
    const preset = STT_PRESETS[provider]
    return {
      provider,
      apiKey: String(parsed.apiKey || '').trim(),
      baseUrl: String(parsed.baseUrl || preset.baseUrl).trim() || preset.baseUrl,
      model: String(parsed.model || preset.model).trim() || preset.model,
    }
  } catch {
    return { ...DEFAULTS }
  }
}

export function saveSttSettings(next) {
  const provider = STT_PRESETS[next.provider] ? next.provider : 'groq'
  const preset = STT_PRESETS[provider]
  const data = {
    provider,
    apiKey: String(next.apiKey || '').trim(),
    baseUrl: String(next.baseUrl || preset.baseUrl).trim() || preset.baseUrl,
    model: String(next.model || preset.model).trim() || preset.model,
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  return data
}

export function hasCloudSttKey(settings = loadSttSettings()) {
  return !!settings.apiKey
}

export function applyProviderPreset(provider, current = loadSttSettings()) {
  const preset = STT_PRESETS[provider] || STT_PRESETS.groq
  return {
    ...current,
    provider: preset.id,
    baseUrl: preset.baseUrl,
    model: preset.model,
  }
}
