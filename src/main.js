import './style.css'
import { SENTENCES, SETS } from './sentences.js'
import { sameMeaning } from './meaning.js'

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

const state = {
  view: 'home',
  selected: new Set(['work', 'easy', 'medium', 'advanced']),
  pool: [],
  current: null,
  awaitingRetry: false,
  listening: false,
  speaking: false,
  heard: '',
  feedback: null,
  correctCount: 0,
  attemptCount: 0,
  recognition: null,
  voicesReady: false,
  listenSession: 0,
  speakSession: 0,
  micBusy: false,
  micFreePromise: Promise.resolve(),
}

const app = document.querySelector('#app')
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

const APP_VERSION = 'v8'
const MIC_COOLDOWN_MS = 350

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

function markMicFreeAfter(rec) {
  if (!rec) {
    state.micBusy = false
    return Promise.resolve()
  }

  state.micBusy = true
  const wait = new Promise((resolve) => {
    let settled = false
    const finish = () => {
      if (settled) return
      settled = true
      window.setTimeout(() => {
        state.micBusy = false
        resolve()
      }, MIC_COOLDOWN_MS)
    }

    const timer = window.setTimeout(finish, 800)
    const previousEnd = rec.onend
    rec.onend = (event) => {
      try {
        previousEnd?.(event)
      } catch {
        // ignore
      }
      window.clearTimeout(timer)
      finish()
    }
  })

  state.micFreePromise = wait.catch(() => {
    state.micBusy = false
  })
  return state.micFreePromise
}

/** Soft close after we already got a final transcript — do not abort. */
function softCloseMic() {
  state.listenSession += 1
  state.listening = false
  const rec = state.recognition
  state.recognition = null
  if (!rec) {
    state.micBusy = false
    return Promise.resolve()
  }

  try {
    rec.onresult = null
    rec.onerror = null
  } catch {
    // ignore
  }

  return markMicFreeAfter(rec)
}

/** Hard stop when user cancels or switches mode. */
function hardStopMic() {
  state.listenSession += 1
  state.listening = false
  const rec = state.recognition
  state.recognition = null
  if (!rec) {
    state.micBusy = false
    return Promise.resolve()
  }

  const free = markMicFreeAfter(rec)
  try {
    rec.onresult = null
    rec.onerror = null
    if (typeof rec.abort === 'function') rec.abort()
    else rec.stop()
  } catch {
    state.micBusy = false
  }
  return free
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

function speakChinese(text) {
  // Keep TTS in the same user-gesture turn; only soft-detach the mic.
  void hardStopMic()

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
      message: ok ? '读完了。请自己点「说英文」。' : '中文朗读失败，请看屏幕文字，再点「说英文」。',
    }
    render('patch')
  }

  utter.onend = () => finish(true)
  utter.onerror = () => finish(false)

  try {
    window.speechSynthesis.speak(utter)
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume()
    }
  } catch {
    finish(false)
  }
}

function beginRecognition(session, attempt = 0) {
  if (session !== state.listenSession || state.view !== 'practice') return

  const recognition = new SpeechRecognition()
  recognition.lang = 'en-US'
  recognition.interimResults = false
  recognition.continuous = false
  recognition.maxAlternatives = 1

  state.recognition = recognition
  state.listening = true
  state.micBusy = true
  state.feedback = { type: 'info', message: '请说英文…' }
  render('patch')

  let finalized = false

  recognition.onresult = (event) => {
    if (session !== state.listenSession) return
    const transcript = event.results?.[0]?.[0]?.transcript?.trim() || ''
    if (!transcript || finalized) return
    finalized = true
    state.heard = transcript
    render('patch')
    evaluateAnswer(transcript)
  }

  recognition.onerror = (event) => {
    if (session !== state.listenSession) return
    if (event.error === 'aborted') return

    // One quiet retry for flaky alternate-start failures.
    if ((event.error === 'not-allowed' ? false : true) && attempt < 1 && event.error !== 'no-speech') {
      state.listening = false
      state.recognition = null
      void markMicFreeAfter(recognition).then(() => {
        if (session !== state.listenSession) return
        beginRecognition(session, attempt + 1)
      })
      return
    }

    state.listening = false
    if (state.recognition === recognition) state.recognition = null
    if (event.error === 'no-speech') {
      state.feedback = { type: 'warn', message: '没听到声音，请再点「说英文」。' }
    } else if (event.error === 'not-allowed') {
      state.feedback = { type: 'warn', message: '请允许麦克风权限后再试。' }
    } else if (event.error === 'network') {
      state.feedback = { type: 'warn', message: '语音识别需要网络，请检查连线。' }
    } else {
      state.feedback = { type: 'warn', message: `识别失败（${event.error}），请稍等半秒再点「说英文」。` }
    }
    render('patch')
  }

  recognition.onend = () => {
    if (state.recognition === recognition) state.recognition = null
    if (session !== state.listenSession) return
    if (state.listening) {
      state.listening = false
      render('patch')
    }
  }

  try {
    recognition.start()
  } catch {
    state.listening = false
    state.recognition = null
    if (attempt < 1) {
      window.setTimeout(() => beginRecognition(session, attempt + 1), MIC_COOLDOWN_MS)
      return
    }
    state.micBusy = false
    state.feedback = { type: 'warn', message: '麦克风还没准备好，请稍等再点「说英文」。' }
    render('patch')
  }
}

function startListening() {
  if (!SpeechRecognition) {
    state.feedback = {
      type: 'warn',
      message: '这个浏览器不支持语音识别，请用下方输入框，或换 Chrome / Edge。',
    }
    render('patch')
    return
  }

  stopSpeaking()

  const session = state.listenSession + 1
  state.listenSession = session
  if (!state.awaitingRetry) state.heard = ''
  state.feedback = { type: 'info', message: '正在打开麦克风…' }
  render('patch')

  // Wait until the previous recognition fully released (fixes every-other-turn failure).
  const ready = state.recognition ? hardStopMic() : state.micFreePromise
  void Promise.resolve(ready)
    .catch(() => {})
    .then(() => {
      if (session !== state.listenSession) return
      beginRecognition(session, 0)
    })
}

function evaluateAnswer(heard) {
  // Soft close: aborting here is what made the next turn fail.
  void softCloseMic()
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
  void softCloseMic()
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
      ? '下一题：先点「听中文」，再点「说英文」'
      : '先点「听中文」，再点「说英文」',
  }
  render('full')
}

function unlockSpeech() {
  if (!window.speechSynthesis) return
  try {
    window.speechSynthesis.getVoices()
    // Warm up TTS inside a user gesture (needed on many phones).
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
          !SpeechRecognition
            ? `<div class="unsupported">当前浏览器可能不支持语音识别。建议使用 Chrome 或 Edge；也可以在练习页用键盘输入。</div>`
            : `<p class="hint">提示：练习时先点「听中文」，再自己点麦克风说英文。</p>`
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
  if (state.listening) return { className: 'pill warn', text: '正在听…' }
  if (state.speaking) return { className: 'pill', text: '正在读中文…' }
  if (fb?.message) return { className: 'pill', text: fb.message }
  return { className: 'pill', text: '先点「听中文」' }
}

function micLabel() {
  if (state.listening) return '听写中…点此停止'
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
        <p class="hint">完全手动：点「听中文」才朗读；点「说英文」才开麦克风。判分看意思：同义说法可过，意思不同不过。</p>
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
  }

  const zhBtn = root.querySelector('[data-el="zh-btn"]')
  if (zhBtn) zhBtn.disabled = !!state.speaking
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

  // Full practice re-render always starts with a blank typed answer.
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
    void hardStopMic()
    state.view = 'home'
    render('full')
  }
  if (action === 'replay' && state.current) {
    speakChinese(state.current.zh)
  }
  if (action === 'mic') {
    if (state.listening || state.micBusy) {
      void hardStopMic().then(() => {
        state.feedback = { type: 'info', message: '已停止。要说英文时再点「说英文」。' }
        render('patch')
      })
    } else {
      startListening()
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

render()
