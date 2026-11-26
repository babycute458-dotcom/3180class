import './style.css'
import { SENTENCES, SETS } from './sentences.js'
import { sameMeaning } from './meaning.js'
import {
  canRecordAudio,
  canUseWebSpeech,
  createRecorder,
  createWebSpeechSession,
  isAppleMobile,
  loadSttEngine,
  transcribeBlob,
} from './stt.js'
import {
  createNativeSpeechSession,
  ensureNativeSpeechPermission,
  isNativeApp,
  nativePlatformLabel,
} from './nativeSpeech.js'

const state = {
  view: 'home',
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
  engine: null, // 'webspeech' | 'whisper' | 'native'
  sttReady: false,
  sttLoading: false,
  emptyListenCount: 0,
  nativePerm: null, // { ok, status, detail } | null
}

const app = document.querySelector('#app')
const APP_VERSION = 'v21'
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

function isMatch(heard, expected, alts = []) {
  return sameMeaning(heard, expected, alts)
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
        ? '讀完了。點「說英文」開始說，說完稍等會自動辨識。'
        : '中文朗讀失敗，請看螢幕文字，再點「說英文」。',
    }
    render('patch')
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

function permissionHelpText() {
  return (
    '請刪除 App 後重裝。打開後點「說英文」時，系統會跳出「麥克風」與「語音辨識」權限，兩次都要點「允許」。' +
    '授權後可到「設定 → 隱私權與安全性 → 麥克風／語音辨識」確認已開啟對練。'
  )
}

function noteEmptyListen(message) {
  state.emptyListenCount += 1
  let tip = message
  if (state.emptyListenCount >= 2) {
    tip += isNativeApp()
      ? ` ${permissionHelpText()}`
      : ' 若一直不行：請用 App 版（非瀏覽器），並允許麥克風。'
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
    noteEmptyListen(`沒有麥克風或語音辨識權限。${permissionHelpText()}`)
    return
  }
  if (result?.errorCode === 'permission-pending') {
    noteEmptyListen(`請先在系統彈窗點「允許」。${permissionHelpText()}`)
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
    noteEmptyListen('辨識逾時，請再點「說英文」後馬上開口，說完再點「我說完了」。')
    return
  }
  if (result?.errorCode === 'start-failed' || result?.errorCode === 'native-speech-unavailable') {
    noteEmptyListen('語音辨識無法啟動，請重試或用下方打字。')
    return
  }
  noteEmptyListen('沒聽清英文，請再點「說英文」大聲說清楚，或用下方打字。')
}

function handleWebSpeechResult(result) {
  settleSpeechResult('webspeech', result)
}

async function startNativeSpeechListening() {
  state.feedback = {
    type: 'info',
    message: '請在接下來的系統彈窗點「允許」（麥克風／語音辨識）…',
  }
  render('patch')

  const perm = await ensureNativeSpeechPermission()
  state.nativePerm = perm
  if (!perm.ok) {
    state.micStarting = false
    state.listening = false
    state.micBusy = false
    state.engine = null
    const denied = perm.status === 'denied' || perm.detail?.includes('denied')
    state.feedback = {
      type: 'warn',
      message: denied
        ? `權限被拒絕。${permissionHelpText()}`
        : `尚未取得麥克風／語音辨識權限（${perm.status}/${perm.detail}）。${permissionHelpText()}`,
    }
    render('patch')
    return
  }

  const session = createNativeSpeechSession()
  let done
  try {
    done = session.start({
      onPartial: (preview) => {
        if (!preview) return
        state.heard = preview
        render('patch')
      },
    })
  } catch {
    state.micStarting = false
    state.listening = false
    state.micBusy = false
    state.engine = null
    state.feedback = {
      type: 'warn',
      message: 'App 語音辨識啟動失敗，請重試或用下方打字。',
    }
    render('patch')
    return
  }

  state.webSpeech = session
  state.webSpeechDone = done
  state.engine = 'native'
  state.listening = true
  state.micStarting = false
  state.micBusy = false
  if (!state.awaitingRetry) state.heard = ''
  state.feedback = {
    type: 'info',
    message: '請現在說英文…說完會自動辨識，或點「我說完了」。',
  }
  render('patch')

  // Hard UI watchdog — never leave the pill on「正在聽」forever.
  const watch = sleep(10000).then(() => ({
    text: state.heard || '',
    errorCode: 'timeout',
    stopRequested: true,
  }))

  try {
    const result = await Promise.race([done, watch])
    if (state.engine === 'native') {
      try {
        await session.stop?.()
      } catch {
        // ignore
      }
    }
    settleSpeechResult('native', result)
  } catch (err) {
    if (state.engine !== 'native') return
    state.micStarting = false
    state.listening = false
    state.micBusy = false
    state.webSpeech = null
    state.webSpeechDone = null
    state.engine = null
    const denied = err?.name === 'NotAllowedError' || err?.message === 'not-allowed'
    state.feedback = {
      type: 'warn',
      message: denied
        ? `沒有麥克風或語音辨識權限。${permissionHelpText()}`
        : 'App 語音辨識啟動失敗，請重試或用下方打字。',
    }
    render('patch')
  }
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
  // Invoke getUserMedia in this turn BEFORE loading the model (iOS gesture).
  const recorder = createRecorder()
  const started = recorder.start()
  state.recorder = recorder
  state.engine = 'whisper'
  state.listening = true
  state.micStarting = false
  if (!state.awaitingRetry) state.heard = ''
  state.feedback = { type: 'info', message: '正在聽…說完後點「我說完了」。' }
  render('patch')
  await started
  // Warm model while user speaks.
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
    if (isNativeApp()) {
      void startNativeSpeechListening()
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
    state.feedback = {
      type: 'warn',
      message: denied
        ? '請允許麥克風權限後再試。'
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
    const { blob, durationMs } = await recorder.stop()
    if (durationMs < 450 || !blob || blob.size < 120) {
      state.micBusy = false
      noteEmptyListen('時間太短或沒有聲音，請再點「說英文」。')
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
      noteEmptyListen('麥克風好像沒錄到聲音。請允許麥克風權限後再試。')
    } else if (err?.message === 'empty-audio') {
      noteEmptyListen('沒錄到聲音，請再點「說英文」。')
    } else {
      noteEmptyListen('辨識失敗，請再試一次，或用下方打字提交。')
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
  if (isMatch(heard, expected, alts)) {
    state.awaitingRetry = false
    state.correctCount += 1
    const exact = normalize(heard) === normalize(expected)
    state.feedback = {
      type: 'good',
      message: exact ? '正確！' : '意思對了，通過！',
    }
    render('patch')
    window.setTimeout(() => {
      nextSentence(true)
    }, 900)
    return
  }

  state.awaitingRetry = true
  const tip = alts.length ? `也可以說：${alts.slice(0, 2).join(' / ')}` : ''
  state.feedback = {
    type: 'bad',
    message: tip ? `不太對，請再點「說英文」：（${tip}）` : '不太對，請再點「說英文」：',
    answer: expected,
  }
  render('patch')
}

function rebuildPool() {
  state.pool = SENTENCES.filter((s) => state.selected.has(s.set))
}

function nextSentence(fromCorrect = false) {
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
  state.heard = ''
  state.feedback = {
    type: 'info',
    message: fromCorrect
      ? '下一題：先點「聽中文」，再說英文'
      : '先點「聽中文」，再點「說英文」；說完稍等會自動辨識',
  }
  render('full')
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
  // Only preload Whisper when Web Speech is unavailable.
  if (!canUseWebSpeech()) {
    void ensureStt().catch(() => {})
  }
  rebuildPool()
  if (!state.pool.length) return
  state.view = 'practice'
  state.correctCount = 0
  state.attemptCount = 0
  nextSentence(false)
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
  const showInstall = isAppleMobile() && !isStandaloneApp()

  return `
    <div class="shell">
      <section class="hero">
        <h1 class="brand"><span>Speak Chinese → Answer English</span>對練</h1>
        <p class="lede">機器讀中文（台灣），你講英文。說錯會糾正，說對就隨機出下一題。已收錄你筆記本裡的 ${total} 句。</p>
        ${
          showInstall
            ? `<div class="install-card">
                <strong>沒有 Mac 也能裝 App（不上架）</strong>
                <p>用 Windows + Sideloadly 安裝真正的 iPhone App（系統麥克風）。完整步驟見倉庫 <b>APP-INSTALL.md</b>。</p>
                <ol>
                  <li>今天可先在 Windows 筆電用 Chrome 打開本頁練習</li>
                  <li>再到 GitHub Actions 下載 IPA，用 Sideloadly 裝到 iPhone</li>
                </ol>
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
        </div>
        ${
          !canRecordAudio() && !canUseWebSpeech()
            ? `<div class="unsupported">目前瀏覽器可能無法錄音。建議使用 Safari / Chrome；也可以在練習頁用鍵盤輸入。</div>`
            : `<p class="hint">提示：先點「聽中文」，再點「說英文」。App 版會用系統語音辨識；練習仍是說英文答案。</p>`
        }
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
  if (state.listening) {
    // Always allow the user to end listening manually — auto-end is best-effort on iOS.
    return '我說完了'
  }
  if (state.awaitingRetry) return '再講一次'
  return '說英文'
}

function renderPractice() {
  const s = state.current
  const fb = state.feedback
  const pill = statusPill()

  return `
    <div class="shell" data-practice="1">
      <div class="topbar">
        <h1>對練 <small class="ver">${APP_VERSION}</small></h1>
        <div class="stats">
          <span>答對 <b data-el="correct">${state.correctCount}</b></span>
          <span>作答 <b data-el="attempts">${state.attemptCount}</b></span>
          <button class="btn btn-ghost" data-action="home" type="button">返回</button>
        </div>
      </div>
      <section class="stage">
        <p class="prompt-label">中文提示（台灣）</p>
        <h2 class="prompt-zh" data-el="zh">${escapeHtml(s?.zh || '')}</h2>
        <div class="status-row" data-el="status"><span class="${pill.className}">${escapeHtml(pill.text)}</span></div>
        <p class="heard">你說的：<strong data-el="heard">${escapeHtml(state.heard || '—')}</strong></p>
        <div class="correction-slot" data-el="correction">
          ${
            fb?.type === 'bad'
              ? `<div class="correction">${escapeHtml(fb.message)}<span class="answer">${escapeHtml(fb.answer)}</span></div>`
              : ''
          }
        </div>
        <div class="actions">
          <button class="btn btn-ghost" data-action="replay" type="button" data-el="zh-btn">聽中文</button>
          <button class="btn btn-mic ${state.listening ? 'listening' : ''}" data-action="mic" type="button" data-el="mic">
            ${micLabel()}
          </button>
          <button class="btn btn-ghost" data-action="skip" type="button">跳過 / 下一題</button>
        </div>
        <div class="manual">
          <label for="typed">也可以打字提交</label>
          <div class="manual-row">
            <input id="typed" type="text" autocomplete="off" placeholder="Type the English sentence" />
            <button class="btn btn-primary" data-action="submit-typed" type="button">提交</button>
          </div>
        </div>
        <p class="hint">手機 App：點「說英文」後，先在系統彈窗點「允許」，再馬上開口；說完稍等或點「我說完了」。答案請說英文。</p>
        ${
          isNativeApp()
            ? `<p class="hint debug-perm">系統：${escapeHtml(nativePlatformLabel())}${
                state.nativePerm
                  ? ` · 權限 ${escapeHtml(String(state.nativePerm.status))}/${escapeHtml(String(state.nativePerm.detail))}`
                  : ' · 權限尚未請求'
              }</p>`
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
  setText('[data-el="heard"]', state.heard || '—')

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
    const html =
      fb?.type === 'bad'
        ? `<div class="correction">${escapeHtml(fb.message)}<span class="answer">${escapeHtml(fb.answer)}</span></div>`
        : ''
    if (correction.innerHTML !== html) correction.innerHTML = html
  }

  const mic = root.querySelector('[data-el="mic"]')
  if (mic) {
    const label = micLabel()
    if (mic.textContent.trim() !== label) mic.textContent = label
    mic.classList.toggle('listening', state.listening)
    mic.disabled = !!(state.micStarting || state.micBusy)
  }

  const zhBtn = root.querySelector('[data-el="zh-btn"]')
  if (zhBtn) zhBtn.disabled = !!(state.speaking || state.listening || state.micBusy)
}

function render(mode = 'full') {
  if (state.view === 'home') {
    app.innerHTML = renderHome()
    return
  }

  if (mode === 'patch' && app.querySelector('[data-practice]')) {
    patchPractice()
    return
  }

  app.innerHTML = renderPractice()
  clearTypedInput()
}

app.addEventListener('click', (event) => {
  const target = event.target.closest('[data-action], [data-set]')
  if (!target) return

  if (target.dataset.set) {
    toggleSet(target.dataset.set)
    return
  }

  const action = target.dataset.action
  if (action === 'start') startPractice()
  if (action === 'home') {
    stopSpeaking()
    cancelRecording()
    state.view = 'home'
    render('full')
  }
  if (action === 'replay' && state.current) {
    if (state.listening || state.micBusy) return
    speakChinese(state.current.zh)
  }
  if (action === 'mic') {
    if (state.micBusy || state.micStarting) return
    if (state.listening) {
      // Manual end — critical on iOS where recognition may not auto-stop.
      void finishListening()
    } else {
      void startListening()
    }
  }
  if (action === 'skip') nextSentence(false)
  if (action === 'submit-typed') {
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
