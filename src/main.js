import './style.css'
import { SENTENCES, SETS } from './sentences.js'
import { sameMeaning } from './meaning.js'
import { canRecordAudio, createRecorder, loadSttEngine, transcribeBlob } from './stt.js'

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
  sttReady: false,
  sttLoading: false,
}

const app = document.querySelector('#app')
const APP_VERSION = 'v13'
const TTS_RELEASE_MS = 900

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
  return (
    voices.find((v) => v.lang === 'zh-CN') ||
    voices.find((v) => v.lang === 'zh_CN') ||
    voices.find((v) => v.lang?.toLowerCase().startsWith('zh')) ||
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
  state.recorder = null
  state.listening = false
  state.micStarting = false
  state.micBusy = false
}

function speakChinese(text) {
  // Never overlap TTS with recording.
  cancelRecording()

  if (!window.speechSynthesis) {
    state.feedback = { type: 'warn', message: '这个浏览器不支持中文朗读，请看屏幕上的中文。' }
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
  utter.lang = 'zh-CN'
  const zh = pickChineseVoice()
  if (zh) utter.voice = zh
  utter.rate = 0.92
  utter.pitch = 1

  state.speaking = true
  state.feedback = { type: 'info', message: '正在读中文…' }
  render('patch')

  const finish = (ok) => {
    if (speakSession !== state.speakSession) return
    state.speaking = false
    state.feedback = {
      type: ok ? 'info' : 'warn',
      message: ok
        ? '读完了。点「说英文」开始说，说完再点「我说完了」。'
        : '中文朗读失败，请看屏幕文字，再点「说英文」。',
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
  if (status.message && (state.micStarting || state.micBusy || state.sttLoading)) {
    state.feedback = { type: 'info', message: status.message }
    render('patch')
  }
}

async function ensureStt() {
  state.sttLoading = true
  await loadSttEngine(onSttStatus)
  state.sttReady = true
  state.sttLoading = false
}

async function startListening() {
  if (!canRecordAudio()) {
    state.feedback = {
      type: 'warn',
      message: '这个浏览器不能录音，请用下方输入框，或换最新版 Chrome。',
    }
    render('patch')
    return
  }

  if (state.listening || state.micStarting || state.micBusy) return

  stopSpeaking()
  // Give TTS a moment to release the audio device.
  state.micStarting = true
  state.feedback = { type: 'info', message: '正在打开麦克风…' }
  render('patch')
  await sleep(TTS_RELEASE_MS)

  try {
    await ensureStt()
  } catch (err) {
    state.micStarting = false
    const detail = err?.message ? `（${err.message}）` : ''
    state.feedback = {
      type: 'warn',
      message: `语音模型加载失败${detail}。请检查网络后重试，或先用下方打字提交。`,
    }
    render('patch')
    return
  }

  try {
    const recorder = createRecorder()
    await recorder.start()
    state.recorder = recorder
    state.listening = true
    state.micStarting = false
    if (!state.awaitingRetry) state.heard = ''
    state.feedback = { type: 'info', message: '正在听…说完后点「我说完了」。' }
    render('patch')
  } catch (err) {
    state.micStarting = false
    state.listening = false
    state.recorder = null
    const denied = err?.name === 'NotAllowedError' || err?.name === 'SecurityError'
    state.feedback = {
      type: 'warn',
      message: denied ? '请允许麦克风权限后再试。' : '无法打开麦克风，请检查权限后重试。',
    }
    render('patch')
  }
}

async function finishListening() {
  if (!state.listening || !state.recorder) return

  state.listening = false
  state.micBusy = true
  state.feedback = { type: 'info', message: '正在识别英文…' }
  render('patch')

  const recorder = state.recorder
  state.recorder = null

  try {
    const { blob, durationMs } = await recorder.stop()
    if (durationMs < 350 || !blob || blob.size < 80) {
      state.micBusy = false
      state.feedback = { type: 'warn', message: '时间太短或没有声音，请再点「说英文」。' }
      render('patch')
      return
    }

    const text = await transcribeBlob(blob, onSttStatus)
    state.micBusy = false
    if (!text) {
      state.feedback = { type: 'warn', message: '没听清英文，请再说一次，或用下方打字。' }
      render('patch')
      return
    }
    evaluateAnswer(text)
  } catch (err) {
    state.micBusy = false
    state.feedback = {
      type: 'warn',
      message:
        err?.message === 'empty-audio'
          ? '没录到声音，请再点「说英文」。'
          : '识别失败，请再试一次，或用下方打字提交。',
    }
    render('patch')
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
      message: exact ? '正确！' : '意思对了，通过！',
    }
    render('patch')
    window.setTimeout(() => {
      nextSentence(true)
    }, 900)
    return
  }

  state.awaitingRetry = true
  const tip = alts.length ? `也可以说：${alts.slice(0, 2).join(' / ')}` : ''
  state.feedback = {
    type: 'bad',
    message: tip ? `不太对，请再点「说英文」：（${tip}）` : '不太对，请再点「说英文」：',
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
    state.feedback = { type: 'warn', message: '请至少选择一个题库。' }
    render('full')
    return
  }
  state.current = next
  state.awaitingRetry = false
  state.heard = ''
  state.feedback = {
    type: 'info',
    message: fromCorrect
      ? '下一题：先点「听中文」，再说英文'
      : '先点「听中文」，再点「说英文」；说完点「我说完了」',
  }
  render('full')
}

function unlockSpeech() {
  if (!window.speechSynthesis) return
  try {
    window.speechSynthesis.getVoices()
    const warm = new SpeechSynthesisUtterance('。')
    warm.lang = 'zh-CN'
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
  // Warm Whisper download in the background after user gesture.
  void ensureStt().catch(() => {})
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

function renderHome() {
  const total = SENTENCES.length
  const selectedCount = SENTENCES.filter((s) => state.selected.has(s.set)).length

  return `
    <div class="shell">
      <section class="hero">
        <h1 class="brand"><span>Speak Chinese → Answer English</span>对练</h1>
        <p class="lede">机器读中文，你讲英文。说错会纠正，说对就随机出下一题。已收录你笔记本里的 ${total} 句。</p>
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
          <button class="btn btn-primary" data-action="start" type="button">开始练习（${selectedCount} 句）</button>
        </div>
        ${
          !canRecordAudio()
            ? `<div class="unsupported">当前浏览器可能无法录音。建议使用最新版 Chrome；也可以在练习页用键盘输入。</div>`
            : `<p class="hint">提示：先点「听中文」，再点「说英文」开口，说完点「我说完了」。第一次会下载语音模型。</p>`
        }
      </section>
    </div>
  `
}

function statusPill() {
  const fb = state.feedback
  if (fb?.type === 'good') return { className: 'pill good', text: fb.message }
  if (fb?.type === 'bad') return { className: 'pill bad', text: '需要纠正' }
  if (fb?.type === 'warn') return { className: 'pill warn', text: fb.message }
  if (state.micBusy) return { className: 'pill warn', text: '正在识别…' }
  if (state.listening) return { className: 'pill warn', text: '正在听…' }
  if (state.speaking) return { className: 'pill', text: '正在读中文…' }
  if (fb?.message) return { className: 'pill', text: fb.message }
  return { className: 'pill', text: '先点「听中文」' }
}

function micLabel() {
  if (state.micStarting || state.sttLoading && !state.listening) return '准备中…'
  if (state.micBusy) return '识别中…'
  if (state.listening) return '我说完了'
  if (state.awaitingRetry) return '再讲一次'
  return '说英文'
}

function renderPractice() {
  const s = state.current
  const fb = state.feedback
  const pill = statusPill()

  return `
    <div class="shell" data-practice="1">
      <div class="topbar">
        <h1>对练 <small class="ver">${APP_VERSION}</small></h1>
        <div class="stats">
          <span>答对 <b data-el="correct">${state.correctCount}</b></span>
          <span>作答 <b data-el="attempts">${state.attemptCount}</b></span>
          <button class="btn btn-ghost" data-action="home" type="button">返回</button>
        </div>
      </div>
      <section class="stage">
        <p class="prompt-label">中文提示</p>
        <h2 class="prompt-zh" data-el="zh">${escapeHtml(s?.zh || '')}</h2>
        <div class="status-row" data-el="status"><span class="${pill.className}">${escapeHtml(pill.text)}</span></div>
        <p class="heard">你说的：<strong data-el="heard">${escapeHtml(state.heard || '—')}</strong></p>
        <div class="correction-slot" data-el="correction">
          ${
            fb?.type === 'bad'
              ? `<div class="correction">${escapeHtml(fb.message)}<span class="answer">${escapeHtml(fb.answer)}</span></div>`
              : ''
          }
        </div>
        <div class="actions">
          <button class="btn btn-ghost" data-action="replay" type="button" data-el="zh-btn">听中文</button>
          <button class="btn btn-mic ${state.listening ? 'listening' : ''}" data-action="mic" type="button" data-el="mic">
            ${micLabel()}
          </button>
          <button class="btn btn-ghost" data-action="skip" type="button">跳过 / 下一题</button>
        </div>
        <div class="manual">
          <label for="typed">也可以打字提交</label>
          <div class="manual-row">
            <input id="typed" type="text" autocomplete="off" placeholder="Type the English sentence" />
            <button class="btn btn-primary" data-action="submit-typed" type="button">提交</button>
          </div>
        </div>
        <p class="hint">用法：点「说英文」开始说 → 说完点「我说完了」。不依赖 Google 语音，网络不稳也能用（首次需下载模型）。</p>
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
    if (state.listening) void finishListening()
    else void startListening()
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

render()
