import './style.css'
import { SENTENCES, SETS } from './sentences.js'
import {
  canRecordAudio,
  canUseWebSpeech,
  createPcmRecorder,
  createRecorder,
  createWebSpeechSession,
  isAppleMobile,
  loadSttEngine,
  transcribeBlob,
  transcribePcm,
} from './stt.js'
import { transcribeCloudPcm } from './cloudStt.js'
import {
  STT_PRESETS,
  applyProviderPreset,
  hasCloudSttKey,
  loadSttSettings,
  saveSttSettings,
} from './settings.js'
import { isNativeApp, nativePlatformLabel, releaseAudioSession } from './nativeSpeech.js'
import { sameMeaning } from './meaning.js'

const state = {
  view: 'home', // 'home' | 'practice' | 'settings'
  selected: new Set(['work', 'easy', 'medium', 'advanced']),
  pool: [],
  current: null,
  awaitingRetry: false,
  listening: false,
  speaking: false,
  micStarting: false,
  micBusy: false,
  heard: '',
  feedback: null,
  correctCount: 0,
  attemptCount: 0,
  voicesReady: false,
  speakSession: 0,
  recorder: null,
  webSpeech: null,
  webSpeechDone: null,
  engine: null, // 'webspeech' | 'whisper' | 'cloud'
  sttReady: false,
  sttLoading: false,
  emptyListenCount: 0,
  sttSettings: loadSttSettings(),
  settingsDraft: null,
  settingsMsg: null,
  roundPassed: false, // must pass before 「下一題」
  lastCompareHtml: '',
}

const app = document.querySelector('#app')
const APP_VERSION = 'v28'
const TTS_LANG = 'zh-TW'
const TTS_RELEASE_MS = 0

function normalize(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/[’']/g, "'")
    .replace(/[^a-z0-9'\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * Pass when meaning matches (exact, listed alts, or same-meaning paraphrase).
 * Completely wrong words / wrong meaning still fail. ASR text is always shown.
 */
function isMatch(heard, expected, alts = []) {
  const h = normalize(heard)
  if (!h) return false
  const candidates = [expected, ...(alts || [])].map(normalize).filter(Boolean)
  if (candidates.includes(h)) return true
  return sameMeaning(heard, expected, alts)
}

/** Highlight which heard words match the target sentence. */
function buildHeardCompareHtml(heard, expected, passed) {
  const raw = String(heard || '').trim()
  if (!raw) return '—'
  if (passed) {
    return `<span class="w ok">${escapeHtml(raw)}</span>`
  }
  const expectedSet = new Set(normalize(expected).split(' ').filter(Boolean))
  // Keep original spacing tokens for display when possible.
  const parts = raw.split(/(\s+)/)
  return parts
    .map((part) => {
      if (/^\s+$/.test(part)) return part
      const key = normalize(part)
      if (!key) return escapeHtml(part)
      const ok = expectedSet.has(key)
      return `<span class="w ${ok ? 'ok' : 'bad'}" title="${ok ? '正確' : '與此句不符'}">${escapeHtml(part)}</span>`
    })
    .join('')
}

function pickRandom(excludeId) {
  if (!state.pool.length) return null
  if (state.pool.length === 1) return state.pool[0]
  let next = state.pool[Math.floor(Math.random() * state.pool.length)]
  let guard = 0
  while (next.id === excludeId && guard < 12) {
    next = state.pool[Math.floor(Math.random() * state.pool.length)]
    guard += 1
  }
  return next
}

function pickChineseVoice() {
  const voices = window.speechSynthesis?.getVoices?.() || []
  const lower = (v) => String(v.lang || '').toLowerCase().replace('_', '-')
  return (
    voices.find((v) => lower(v) === 'zh-tw') ||
    voices.find((v) => lower(v) === 'zh-hant-tw') ||
    voices.find((v) => /zh-.*(tw|hant)/.test(lower(v))) ||
    voices.find((v) => lower(v).startsWith('zh')) ||
    null
  )
}

function clearTypedInput() {
  const input = document.querySelector('#typed')
  if (input) input.value = ''
}

function sleep(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms))
}

function stopSpeaking() {
  state.speakSession += 1
  if (window.speechSynthesis) {
    try {
      window.speechSynthesis.cancel()
    } catch {
      // ignore
    }
  }
  state.speaking = false
}

function cancelRecording() {
  try {
    state.recorder?.cancel?.()
  } catch {
    // ignore
  }
  try {
    state.webSpeech?.cancel?.()
  } catch {
    // ignore
  }
  state.recorder = null
  state.webSpeech = null
  state.webSpeechDone = null
  state.engine = null
  state.listening = false
  state.micStarting = false
  state.micBusy = false
}

function speakChinese(text) {
  // Never overlap TTS with recording.
  cancelRecording()

  if (!window.speechSynthesis) {
    state.feedback = { type: 'warn', message: '這個瀏覽器不支援中文朗讀，請看螢幕上的中文。' }
    render('patch')
    return
  }

  state.speakSession += 1
  const speakSession = state.speakSession
  try {
    window.speechSynthesis.cancel()
  } catch {
    // ignore
  }

  const utter = new SpeechSynthesisUtterance(text)
  utter.lang = TTS_LANG
  const zh = pickChineseVoice()
  if (zh) utter.voice = zh
  utter.rate = 0.92
  utter.pitch = 1

  state.speaking = true
  state.feedback = { type: 'info', message: '正在讀中文…' }
  render('patch')

  const finish = (ok) => {
    if (speakSession !== state.speakSession) return
    state.speaking = false
    state.feedback = {
      type: ok ? 'info' : 'warn',
      message: ok
        ? '讀完了。稍等半秒再點「說英文」，說完點「我說完了」。'
        : '中文朗讀失敗，請看螢幕文字，再點「說英文」。',
    }
    render('patch')
    if (ok && isNativeApp()) {
      void releaseAudioSession()
    }
  }

  utter.onend = () => finish(true)
  utter.onerror = () => finish(false)

  try {
    window.speechSynthesis.speak(utter)
    if (window.speechSynthesis.paused) window.speechSynthesis.resume()
  } catch {
    finish(false)
  }
}

function onSttStatus(status) {
  if (!status) return
  if (status.phase === 'ready') {
    state.sttReady = true
    state.sttLoading = false
  } else if (status.phase === 'error') {
    state.sttLoading = false
  } else if (status.phase === 'download' || status.phase === 'transcribe') {
    state.sttLoading = true
  }
  // Only hijack the status line when the user is actively waiting on mic/STT.
  if (status.message && (state.micStarting || state.micBusy)) {
    state.feedback = { type: 'info', message: status.message }
    render('patch')
  } else if (status.phase === 'ready' && state.view === 'practice' && !state.listening && !state.micBusy) {
    render('patch')
  }
}

async function ensureStt() {
  state.sttLoading = true
  await loadSttEngine(onSttStatus)
  state.sttReady = true
  state.sttLoading = false
}

function noteEmptyListen(message) {
  state.emptyListenCount += 1
  let tip = message
  if (state.emptyListenCount >= 2) {
    tip += isNativeApp()
      ? ' 也可直接在下方打字提交。請確認「設定 → 對練 → 麥克風」已開啟；說英文前先等中文讀完。'
      : ' 若一直不行：請允許麥克風，或改用下方打字。'
  }
  state.feedback = { type: 'warn', message: tip }
  render('patch')
}

function settleSpeechResult(expectedEngine, result) {
  if (state.engine !== expectedEngine) return
  state.listening = false
  state.micBusy = false
  state.micStarting = false
  state.webSpeech = null
  state.webSpeechDone = null
  state.engine = null
  const text = String(result?.text || '').trim()
  if (text) {
    state.emptyListenCount = 0
    evaluateAnswer(text)
    return
  }
  if (result?.errorCode === 'not-allowed') {
    noteEmptyListen('請允許麥克風權限後再試，或用下方打字。')
    return
  }
  if (result?.errorCode === 'aborted') {
    state.feedback = { type: 'warn', message: '已取消，可再點「說英文」。' }
    render('patch')
    return
  }
  if (result?.errorCode === 'no-speech') {
    noteEmptyListen('沒聽到聲音，請再點「說英文」後馬上開口。')
    return
  }
  if (result?.errorCode === 'timeout') {
    noteEmptyListen('辨識逾時，請再點「說英文」，說完再點「我說完了」。')
    return
  }
  noteEmptyListen('沒聽清英文，請再點「說英文」大聲說清楚，或用下方打字。')
}

function handleWebSpeechResult(result) {
  settleSpeechResult('webspeech', result)
}

/**
 * iOS App path: PCM AudioContext capture + Whisper.
 * Avoids MediaRecorder/mp4 (often silent after decode on iPhone WKWebView).
 * getUserMedia must start in the same turn as the tap — no awaits before it.
 */
function startNativeWhisperListening() {
  if (!canRecordAudio()) {
    state.micStarting = false
    state.feedback = {
      type: 'warn',
      message: '此裝置無法錄音，請用下方打字提交。',
    }
    render('patch')
    return
  }

  void releaseAudioSession()

  const recorder = createPcmRecorder({ timeoutMs: 4000 })
  // Start getUserMedia immediately (user-gesture).
  const started = recorder.start()

  state.recorder = recorder
  state.engine = 'whisper'
  state.listening = true
  state.micStarting = false
  state.micBusy = false
  if (!state.awaitingRetry) state.heard = ''
  state.feedback = {
    type: 'info',
    message: '正在錄音…說完英文就點「我說完了」（短句也可以）。',
  }
  render('patch')

  void started
    .then(() => {
      void ensureStt().catch(() => {})
    })
    .catch((err) => {
      state.recorder = null
      state.engine = null
      state.listening = false
      state.micStarting = false
      state.micBusy = false
      const denied = err?.name === 'NotAllowedError' || err?.name === 'SecurityError'
      const timeout = err?.message === 'getUserMedia-timeout'
      state.feedback = {
        type: 'warn',
        message: denied
          ? '請允許麥克風權限後再試，或用下方打字。'
          : timeout
            ? '麥克風開啟逾時。請先等中文讀完再點「說英文」，或直接打字。'
            : '無法打開麥克風，請重試或用下方打字。',
      }
      render('patch')
      try {
        recorder.cancel()
      } catch {
        // ignore
      }
    })
}

function startWebSpeechListening() {
  // iPhone: one-shot is far more reliable than continuous + manual stop.
  const continuous = !isAppleMobile()
  const session = createWebSpeechSession({ continuous })
  const done = session.start({
    onPartial: (preview) => {
      if (!state.listening && state.engine !== 'webspeech') return
      if (preview) {
        state.heard = preview
        render('patch')
      }
    },
  })
  state.webSpeech = session
  state.webSpeechDone = done
  state.engine = 'webspeech'
  state.listening = true
  state.micStarting = false
  if (!state.awaitingRetry) state.heard = ''
  state.feedback = {
    type: 'info',
    message: continuous
      ? '正在聽…說完後點「我說完了」。'
      : '請現在說英文…說完稍等，會自動辨識。',
  }
  render('patch')

  // One-shot: auto-finish when the browser ends recognition.
  if (!continuous) {
    void done.then((result) => {
      if (state.engine !== 'webspeech') return
      handleWebSpeechResult(result)
    })
  }
}

async function startWhisperListening() {
  if (!canRecordAudio()) {
    throw new Error('recorder-unavailable')
  }
  // Prefer PCM on Apple; MediaRecorder mp4 often becomes "silence" after decode.
  const recorder = isAppleMobile()
    ? createPcmRecorder({ timeoutMs: 5000 })
    : createRecorder({ timeoutMs: 5000 })
  const started = recorder.start()
  state.recorder = recorder
  state.engine = 'whisper'
  state.listening = true
  state.micStarting = false
  if (!state.awaitingRetry) state.heard = ''
  state.feedback = { type: 'info', message: '正在錄音…說完後點「我說完了」。' }
  render('patch')
  await started
  void ensureStt().catch(() => {})
}

function startListening() {
  if (state.listening || state.micStarting || state.micBusy) return

  // Keep this fully synchronous until recognition.start()/getUserMedia() —
  // any await before that breaks iPhone mic permission / speech start.
  stopSpeaking()
  state.micStarting = true
  state.feedback = { type: 'info', message: '正在打開麥克風…' }
  render('patch')

  try {
    // Capacitor iOS App: PCM + Whisper (no SFSpeechRecognizer / MediaRecorder).
    if (isNativeApp()) {
      startNativeWhisperListening()
      return
    }
    // On iPhone Safari, Web Speech is flaky — prefer PCM+Whisper too.
    if (isAppleMobile() && canRecordAudio()) {
      void startWhisperListening().catch((err) => {
        state.micStarting = false
        state.listening = false
        state.micBusy = false
        state.recorder = null
        state.engine = null
        const denied = err?.name === 'NotAllowedError' || err?.name === 'SecurityError'
        state.feedback = {
          type: 'warn',
          message: denied
            ? '請允許麥克風權限後再試。'
            : '無法打開麥克風，請重試或用下方打字。',
        }
        render('patch')
      })
      return
    }
    if (canUseWebSpeech()) {
      startWebSpeechListening()
      return
    }
  } catch (err) {
    console.warn('[mic] speech start failed, falling back', err)
  }

  void startWhisperListening().catch((err) => {
    state.micStarting = false
    state.listening = false
    state.micBusy = false
    state.recorder = null
    state.webSpeech = null
    state.engine = null
    const denied = err?.name === 'NotAllowedError' || err?.name === 'SecurityError'
    const timeout = err?.message === 'getUserMedia-timeout'
    state.feedback = {
      type: 'warn',
      message: denied
        ? '請允許麥克風權限後再試。'
        : timeout
          ? '麥克風開啟逾時，請重試或用下方打字。'
          : '無法打開麥克風，請檢查權限後重試，或用下方打字。',
    }
    render('patch')
  })
}

async function finishListening() {
  if (!state.listening) return

  const engine = state.engine
  state.listening = false
  state.micBusy = true
  state.feedback = { type: 'info', message: '正在辨識英文…' }
  render('patch')

  if ((engine === 'webspeech' || engine === 'native') && state.webSpeech) {
    const session = state.webSpeech
    const done = state.webSpeechDone
    try {
      void session.stop?.()
      const result = await Promise.race([
        done || Promise.resolve({ text: '', errorCode: 'timeout', stopRequested: true }),
        sleep(5000).then(() => ({ text: state.heard || '', errorCode: 'timeout', stopRequested: true })),
      ])
      settleSpeechResult(engine, result)
    } catch {
      state.micBusy = false
      state.engine = null
      state.webSpeech = null
      state.webSpeechDone = null
      noteEmptyListen('辨識失敗，請再試一次，或用下方打字。')
    }
    return
  }

  if (!state.recorder) {
    state.micBusy = false
    return
  }

  const recorder = state.recorder
  state.recorder = null
  state.engine = null

  try {
    const stopped = await recorder.stop()

    // PCM path (iOS App / iPhone) — prefer cloud STT (Google-Translate quality).
    if (recorder.kind === 'pcm' || stopped.audio) {
      const { audio, durationMs, rms } = stopped
      if (!audio?.length) {
        state.micBusy = false
        noteEmptyListen('沒錄到音訊，請再點「說英文」。')
        return
      }

      let text = ''
      state.sttSettings = loadSttSettings()
      if (hasCloudSttKey(state.sttSettings)) {
        state.feedback = { type: 'info', message: '正在雲端辨識（類似 Google 翻譯）…' }
        render('patch')
        try {
          text = await transcribeCloudPcm(audio, {
            sampleRate: stopped.sampleRate || 16000,
            onStatus: onSttStatus,
          })
        } catch (err) {
          state.micBusy = false
          if (err?.message === 'cloud-auth') {
            noteEmptyListen('API 金鑰無效。請到「語音設定」重新貼上。')
          } else if (err?.message === 'cloud-timeout') {
            noteEmptyListen('雲端辨識逾時，請檢查網路後再試，或用下方打字。')
          } else {
            noteEmptyListen(`雲端辨識失敗（${err?.message || 'error'}）。請再試或打字。`)
          }
          return
        }
      } else {
        // Offline tiny model — weaker than Google Translate; nudge user to set key.
        try {
          const local = await transcribePcm(audio, onSttStatus, { rms, durationMs })
          text = local.text
        } catch (err) {
          state.micBusy = false
          if (err?.message === 'silent-audio') {
            noteEmptyListen('幾乎沒錄到聲音。也可到「語音設定」改用雲端辨識（更準）。')
          } else {
            noteEmptyListen('本機辨識失敗。請到「語音設定」貼上免費 Groq 金鑰（像 Google 翻譯一樣準）。')
          }
          return
        }
      }

      state.micBusy = false
      if (!text) {
        noteEmptyListen(
          hasCloudSttKey(state.sttSettings)
            ? '雲端沒辨識出英文，請再說一次或打字。'
            : '沒辨識出英文。建議到「語音設定」啟用雲端辨識（免費），會準很多。',
        )
        return
      }
      state.emptyListenCount = 0
      evaluateAnswer(text)
      return
    }

    // Legacy MediaRecorder blob path
    const { blob, durationMs } = stopped
    if (!blob || blob.size < 40) {
      state.micBusy = false
      noteEmptyListen('沒錄到聲音，請再點「說英文」。')
      return
    }

    const text = await transcribeBlob(blob, onSttStatus)
    state.micBusy = false
    if (!text) {
      noteEmptyListen('沒聽清英文，請再說一次，或用下方打字。')
      return
    }
    state.emptyListenCount = 0
    evaluateAnswer(text)
  } catch (err) {
    state.micBusy = false
    if (err?.message === 'silent-audio') {
      noteEmptyListen(
        `麥克風幾乎沒錄到聲音（音量 ${err.rms?.toFixed?.(5) || '0'}）。請確認麥克風已開，或用下方打字。`,
      )
    } else if (err?.message === 'empty-audio') {
      noteEmptyListen('沒錄到聲音，請再點「說英文」。')
    } else {
      noteEmptyListen(`辨識失敗（${err?.message || 'unknown'}），請再試或打字提交。`)
    }
  }
}

function evaluateAnswer(heard) {
  cancelRecording()
  state.attemptCount += 1
  state.heard = heard
  clearTypedInput()

  const expected = state.current.en
  const alts = state.current.alts || []
  const passed = isMatch(heard, expected, alts)
  state.lastCompareHtml = buildHeardCompareHtml(heard, expected, passed)

  if (passed) {
    state.awaitingRetry = false
    state.roundPassed = true
    state.correctCount += 1
    state.feedback = {
      type: 'good',
      message: '意思對了！請看下方「系統聽到的字」，再自己按「下一題」。',
    }
    render('full')
    return
  }

  state.awaitingRetry = true
  state.roundPassed = false
  state.feedback = {
    type: 'bad',
    message: '意思不對，不能下一題。紅色是系統聽到但不符的字；請再講一次或打字。',
    answer: expected,
  }
  render('full')
}

function rebuildPool() {
  state.pool = SENTENCES.filter((s) => state.selected.has(s.set))
}

function advanceToNewSentence({ force = false } = {}) {
  if (!force && state.view === 'practice' && state.current && !state.roundPassed) {
    state.feedback = {
      type: 'warn',
      message: '這一題還沒答對，不能跳下一題。請看「系統聽到的字」後再講一次。',
    }
    render('patch')
    return
  }

  stopSpeaking()
  cancelRecording()
  clearTypedInput()
  const next = pickRandom(state.current?.id)
  if (!next) {
    state.feedback = { type: 'warn', message: '請至少選擇一個題庫。' }
    render('full')
    return
  }
  state.current = next
  state.awaitingRetry = false
  state.roundPassed = false
  state.heard = ''
  state.lastCompareHtml = ''
  state.feedback = {
    type: 'info',
    message: '先點「聽中文」，再點「說英文」；說完點「我說完了」。答對後請自己按「下一題」。',
  }
  render('full')
}

function nextSentence(_fromCorrect = false) {
  advanceToNewSentence({ force: true })
}

function goNextIfPassed() {
  if (!state.roundPassed) {
    state.feedback = {
      type: 'warn',
      message: '請先講對（或打字提交正確整句），才能下一題。',
    }
    render('patch')
    return
  }
  advanceToNewSentence({ force: true })
}

function unlockSpeech() {
  if (!window.speechSynthesis) return
  try {
    window.speechSynthesis.getVoices()
    const warm = new SpeechSynthesisUtterance('。')
    warm.lang = TTS_LANG
    warm.volume = 0
    const zh = pickChineseVoice()
    if (zh) warm.voice = zh
    window.speechSynthesis.speak(warm)
    window.speechSynthesis.cancel()
  } catch {
    // ignore
  }
}

function startPractice() {
  unlockSpeech()
  state.sttSettings = loadSttSettings()
  // Cloud STT needs no local model. Only preload offline Whisper when no API key.
  if (!hasCloudSttKey(state.sttSettings) && (isNativeApp() || !canUseWebSpeech())) {
    state.feedback = {
      type: 'info',
      message: '尚未設定雲端辨識。可到「語音設定」貼上免費金鑰（較準），或等本機模型載入…',
    }
    void ensureStt().catch(() => {})
  }
  rebuildPool()
  if (!state.pool.length) return
  state.view = 'practice'
  state.correctCount = 0
  state.attemptCount = 0
  state.current = null
  state.roundPassed = false
  state.heard = ''
  state.lastCompareHtml = ''
  advanceToNewSentence({ force: true })
}

function openSettings() {
  stopSpeaking()
  cancelRecording()
  state.sttSettings = loadSttSettings()
  state.settingsDraft = { ...state.sttSettings }
  state.settingsMsg = null
  state.view = 'settings'
  render('full')
}

function saveSettingsFromForm() {
  const draft = state.settingsDraft || loadSttSettings()
  const keyInput = document.querySelector('#api-key')
  const provider = document.querySelector('#stt-provider')?.value || draft.provider
  const withProvider = applyProviderPreset(provider, draft)
  withProvider.apiKey = keyInput?.value?.trim() || ''
  state.sttSettings = saveSttSettings(withProvider)
  state.settingsDraft = { ...state.sttSettings }
  state.settingsMsg = {
    type: 'good',
    text: state.sttSettings.apiKey
      ? '已儲存。語音會走雲端辨識（類似 Google 翻譯）。'
      : '已儲存（尚未填金鑰，仍可用打字或本機辨識）。',
  }
  render('full')
}

function toggleSet(id) {
  if (state.selected.has(id)) {
    if (state.selected.size === 1) return
    state.selected.delete(id)
  } else {
    state.selected.add(id)
  }
  render()
}

function escapeHtml(str) {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function isStandaloneApp() {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    window.navigator.standalone === true
  )
}

function renderHome() {
  const total = SENTENCES.length
  const selectedCount = SENTENCES.filter((s) => state.selected.has(s.set)).length
  const showInstall = isAppleMobile() && !isStandaloneApp() && !isNativeApp()
  const cloudReady = hasCloudSttKey(state.sttSettings)

  return `
    <div class="shell">
      <section class="hero">
        <h1 class="brand"><span>Speak Chinese → Answer English</span>對練 <small class="ver">${APP_VERSION}</small></h1>
        <p class="lede">機器讀中文（台灣），你講英文。意思對就算過關（同義說法可）；答對後請自己按「下一題」。已收錄你筆記本裡的 ${total} 句。</p>
        ${
          cloudReady
            ? `<p class="hint">語音：雲端辨識已開啟（類似 Google 翻譯等級）。</p>`
            : `<div class="install-card">
                <strong>啟用「像 Google 翻譯」的語音辨識</strong>
                <p>Google 翻譯用的是雲端辨識。請先點「語音設定」，免費申請 Groq 金鑰並貼上（約 2 分鐘），辨識會準很多。</p>
              </div>`
        }
        ${
          showInstall
            ? `<div class="install-card">
                <strong>沒有 Mac 也能裝 App（不上架）</strong>
                <p>用 Windows + Sideloadly 安裝 iPhone App。步驟見 <b>APP-INSTALL.md</b>。</p>
              </div>`
            : ''
        }
        <div class="set-grid">
          ${SETS.map(
            (set) => `
              <button class="set-chip ${state.selected.has(set.id) ? 'active' : ''}" data-set="${set.id}" type="button">
                <strong>${escapeHtml(set.label)}</strong>
                <small>${set.count} 句</small>
              </button>
            `,
          ).join('')}
        </div>
        <div class="cta-row">
          <button class="btn btn-primary" data-action="start" type="button">開始練習（${selectedCount} 句）</button>
          <button class="btn btn-ghost" data-action="settings" type="button">語音設定</button>
        </div>
        ${
          !canRecordAudio() && !canUseWebSpeech()
            ? `<div class="unsupported">目前瀏覽器可能無法錄音。建議使用 Safari / Chrome；也可以在練習頁用鍵盤輸入。</div>`
            : `<p class="hint">提示：先點「聽中文」，再點「說英文」。短句也可以，說完點「我說完了」。</p>`
        }
      </section>
    </div>
  `
}

function renderSettings() {
  const draft = state.settingsDraft || loadSttSettings()
  const msg = state.settingsMsg
  return `
    <div class="shell">
      <div class="topbar">
        <h1>語音設定 <small class="ver">${APP_VERSION}</small></h1>
        <div class="stats">
          <button class="btn btn-ghost" data-action="home" type="button">返回</button>
        </div>
      </div>
      <section class="stage settings-stage">
        <p class="prompt-label">雲端語音辨識（類似 Google 翻譯）</p>
        <p class="hint">別的 App 能準，是因為用雲端辨識。這裡用免費的 Groq Whisper（與 Google 翻譯同級的雲端模型）。金鑰只存在你手機上。</p>
        ${
          msg
            ? `<div class="settings-msg ${msg.type === 'good' ? 'good' : 'warn'}">${escapeHtml(msg.text)}</div>`
            : ''
        }
        <label class="field-label" for="stt-provider">服務</label>
        <select id="stt-provider" class="field-input">
          ${Object.values(STT_PRESETS)
            .map(
              (p) =>
                `<option value="${p.id}" ${draft.provider === p.id ? 'selected' : ''}>${escapeHtml(p.label)}</option>`,
            )
            .join('')}
        </select>
        <label class="field-label" for="api-key">API 金鑰</label>
        <input id="api-key" class="field-input" type="password" autocomplete="off" placeholder="貼上 gsk_… 或 sk-…" value="${escapeHtml(draft.apiKey)}" />
        <ol class="setup-steps">
          <li>打開 <a href="${escapeHtml(STT_PRESETS[draft.provider]?.helpUrl || STT_PRESETS.groq.helpUrl)}" target="_blank" rel="noopener">申請金鑰頁面</a>（Groq 免費）</li>
          <li>註冊／登入後建立 API Key</li>
          <li>複製金鑰，貼到上方欄位</li>
          <li>點「儲存」</li>
        </ol>
        <div class="cta-row">
          <button class="btn btn-primary" data-action="save-settings" type="button">儲存</button>
          <button class="btn btn-ghost" data-action="start" type="button">開始練習</button>
        </div>
      </section>
    </div>
  `
}

function statusPill() {
  const fb = state.feedback
  if (fb?.type === 'good') return { className: 'pill good', text: fb.message }
  if (fb?.type === 'bad') return { className: 'pill bad', text: '需要糾正' }
  if (fb?.type === 'warn') return { className: 'pill warn', text: fb.message }
  if (state.micBusy) return { className: 'pill warn', text: '正在辨識…' }
  if (state.listening) return { className: 'pill warn', text: '正在聽…' }
  if (state.speaking) return { className: 'pill', text: '正在讀中文…' }
  if (fb?.message) return { className: 'pill', text: fb.message }
  return { className: 'pill', text: '先點「聽中文」' }
}

function micLabel() {
  if (state.micStarting) return '準備中…'
  if (state.micBusy) return '辨識中…'
  if (state.listening) return '我說完了'
  if (state.roundPassed) return '已過關'
  if (state.awaitingRetry) return '再講一次'
  return '說英文'
}

function nextButtonLabel() {
  return state.roundPassed ? '下一題' : '下一題（需先答對）'
}

function renderPractice() {
  const s = state.current
  const fb = state.feedback
  const pill = statusPill()
  const heardHtml = state.lastCompareHtml || escapeHtml(state.heard || '—')

  return `
    <div class="shell" data-practice="1">
      <div class="topbar">
        <h1>對練 <small class="ver">${APP_VERSION}</small></h1>
        <div class="stats">
          <span>答對 <b data-el="correct">${state.correctCount}</b></span>
          <span>作答 <b data-el="attempts">${state.attemptCount}</b></span>
          <button class="btn btn-ghost" data-action="settings" type="button">語音</button>
          <button class="btn btn-ghost" data-action="home" type="button">返回</button>
        </div>
      </div>
      <section class="stage">
        <p class="prompt-label">中文提示（台灣）</p>
        <h2 class="prompt-zh" data-el="zh">${escapeHtml(s?.zh || '')}</h2>
        <div class="status-row" data-el="status"><span class="${pill.className}">${escapeHtml(pill.text)}</span></div>
        <div class="heard-block">
          <p class="heard-label">系統聽到的字（請核對）</p>
          <p class="heard" data-el="heard">${heardHtml}</p>
        </div>
        <div class="correction-slot" data-el="correction">
          ${
            fb?.type === 'bad'
              ? `<div class="correction">${escapeHtml(fb.message)}<span class="answer">正確句子：${escapeHtml(fb.answer)}</span></div>`
              : fb?.type === 'good'
                ? `<div class="correction good-box">正確句子：<span class="answer">${escapeHtml(s?.en || '')}</span></div>`
                : ''
          }
        </div>
        <div class="actions">
          <button class="btn btn-ghost" data-action="replay" type="button" data-el="zh-btn">聽中文</button>
          <button class="btn btn-mic ${state.listening ? 'listening' : ''}" data-action="mic" type="button" data-el="mic" ${state.roundPassed ? 'disabled' : ''}>
            ${micLabel()}
          </button>
          <button class="btn ${state.roundPassed ? 'btn-primary' : 'btn-ghost'}" data-action="next" type="button" data-el="next" ${state.roundPassed ? '' : 'disabled'}>
            ${nextButtonLabel()}
          </button>
        </div>
        <div class="manual">
          <label for="typed">也可以打字提交（須與正確句子一致）</label>
          <div class="manual-row">
            <input id="typed" type="text" autocomplete="off" placeholder="Type the English sentence" ${state.roundPassed ? 'disabled' : ''} />
            <button class="btn btn-primary" data-action="submit-typed" type="button" ${state.roundPassed ? 'disabled' : ''}>提交</button>
          </div>
        </div>
        <p class="hint">規則：意思對就算過關（例如 When / What time 同義）；答對後不會自動跳題，請自己按「下一題」。紅字＝聽到但不對。</p>
        ${
          isNativeApp()
            ? `<p class="hint debug-perm">系統：${escapeHtml(nativePlatformLabel())} · ${
                hasCloudSttKey(state.sttSettings) ? 'Cloud STT' : '本機備援'
              } v27</p>`
            : ''
        }
      </section>
    </div>
  `
}

function patchPractice() {
  const root = app.querySelector('[data-practice]')
  if (!root) {
    render('full')
    return
  }

  const setText = (sel, value) => {
    const el = root.querySelector(sel)
    if (el && el.textContent !== value) el.textContent = value
  }

  setText('[data-el="correct"]', String(state.correctCount))
  setText('[data-el="attempts"]', String(state.attemptCount))
  setText('[data-el="zh"]', state.current?.zh || '')

  const heardEl = root.querySelector('[data-el="heard"]')
  if (heardEl) {
    const html = state.lastCompareHtml || escapeHtml(state.heard || '—')
    if (heardEl.innerHTML !== html) heardEl.innerHTML = html
  }

  const pill = statusPill()
  const status = root.querySelector('[data-el="status"]')
  if (status) {
    const current = status.querySelector('.pill')
    if (!current || current.className !== pill.className || current.textContent !== pill.text) {
      status.innerHTML = `<span class="${pill.className}">${escapeHtml(pill.text)}</span>`
    }
  }

  const correction = root.querySelector('[data-el="correction"]')
  if (correction) {
    const fb = state.feedback
    const s = state.current
    const html =
      fb?.type === 'bad'
        ? `<div class="correction">${escapeHtml(fb.message)}<span class="answer">正確句子：${escapeHtml(fb.answer)}</span></div>`
        : fb?.type === 'good'
          ? `<div class="correction good-box">正確句子：<span class="answer">${escapeHtml(s?.en || '')}</span></div>`
          : ''
    if (correction.innerHTML !== html) correction.innerHTML = html
  }

  const mic = root.querySelector('[data-el="mic"]')
  if (mic) {
    const label = micLabel()
    if (mic.textContent.trim() !== label) mic.textContent = label
    mic.classList.toggle('listening', state.listening)
    mic.disabled = !!(state.micStarting || state.micBusy || state.roundPassed)
  }

  const nextBtn = root.querySelector('[data-el="next"]')
  if (nextBtn) {
    const label = nextButtonLabel()
    if (nextBtn.textContent.trim() !== label) nextBtn.textContent = label
    nextBtn.disabled = !state.roundPassed
    nextBtn.classList.toggle('btn-primary', state.roundPassed)
    nextBtn.classList.toggle('btn-ghost', !state.roundPassed)
  }

  const zhBtn = root.querySelector('[data-el="zh-btn"]')
  if (zhBtn) zhBtn.disabled = !!(state.speaking || state.listening || state.micBusy)

  const typed = root.querySelector('#typed')
  const submit = root.querySelector('[data-action="submit-typed"]')
  if (typed) typed.disabled = !!state.roundPassed
  if (submit) submit.disabled = !!state.roundPassed
}

function render(mode = 'full') {
  if (state.view === 'home') {
    app.innerHTML = renderHome()
    return
  }
  if (state.view === 'settings') {
    app.innerHTML = renderSettings()
    return
  }

  if (mode === 'patch' && app.querySelector('[data-practice]')) {
    patchPractice()
    return
  }

  app.innerHTML = renderPractice()
  clearTypedInput()
}

app.addEventListener('change', (event) => {
  if (event.target?.id === 'stt-provider' && state.view === 'settings') {
    const provider = event.target.value
    const key = document.querySelector('#api-key')?.value || ''
    state.settingsDraft = applyProviderPreset(provider, {
      ...(state.settingsDraft || loadSttSettings()),
      apiKey: key,
    })
    render('full')
  }
})

app.addEventListener('click', (event) => {
  const target = event.target.closest('[data-action], [data-set]')
  if (!target) return

  if (target.dataset.set) {
    toggleSet(target.dataset.set)
    return
  }

  const action = target.dataset.action
  if (action === 'start') startPractice()
  if (action === 'settings') openSettings()
  if (action === 'save-settings') saveSettingsFromForm()
  if (action === 'home') {
    stopSpeaking()
    cancelRecording()
    state.sttSettings = loadSttSettings()
    state.view = 'home'
    render('full')
  }
  if (action === 'replay' && state.current) {
    if (state.listening || state.micBusy) return
    speakChinese(state.current.zh)
  }
  if (action === 'mic') {
    if (state.micBusy || state.micStarting || state.roundPassed) return
    if (state.listening) {
      void finishListening()
    } else {
      void startListening()
    }
  }
  if (action === 'next' || action === 'skip') goNextIfPassed()
  if (action === 'submit-typed') {
    if (state.roundPassed) return
    const input = document.querySelector('#typed')
    const value = input?.value?.trim() || ''
    if (value) evaluateAnswer(value)
  }
})

app.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && event.target?.id === 'typed') {
    const value = event.target.value.trim()
    if (value) evaluateAnswer(value)
  }
})

if (window.speechSynthesis) {
  window.speechSynthesis.onvoiceschanged = () => {
    state.voicesReady = true
  }
  window.speechSynthesis.getVoices()
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {})
  })
}

render()
