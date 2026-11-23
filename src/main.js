import './style.css'
import { SENTENCES, SETS } from './sentences.js'

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
}

const app = document.querySelector('#app')

function normalize(text) {
  return text
    .toLowerCase()
    .replace(/[’']/g, "'")
    .replace(/[^a-z0-9'\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function tokenize(text) {
  return normalize(text).split(' ').filter(Boolean)
}

function levenshtein(a, b) {
  const m = a.length
  const n = b.length
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0))
  for (let i = 0; i <= m; i++) dp[i][0] = i
  for (let j = 0; j <= n; j++) dp[0][j] = j
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost)
    }
  }
  return dp[m][n]
}

function isMatch(heard, expected) {
  const a = normalize(heard)
  const b = normalize(expected)
  if (!a) return false
  if (a === b) return true

  // Allow common speech variants
  const variants = [
    b,
    b.replace(/\bgonna\b/g, 'going to'),
    b.replace(/\bgotta\b/g, 'got to'),
    b.replace(/\bfavourite\b/g, 'favorite'),
    b.replace(/\bfavorite\b/g, 'favourite'),
    b.replace(/\bcolor\b/g, 'colour'),
    b.replace(/\bcolour\b/g, 'color'),
  ]
  if (variants.some((v) => a === normalize(v))) return true

  const ta = tokenize(a)
  const tb = tokenize(b)
  if (ta.join(' ') === tb.join(' ')) return true

  const dist = levenshtein(ta.join(' '), tb.join(' '))
  const maxLen = Math.max(ta.join(' ').length, tb.join(' ').length)
  if (maxLen <= 12) return dist <= 1
  if (maxLen <= 28) return dist <= 2
  return dist / maxLen <= 0.12
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

function stopSpeaking() {
  if (window.speechSynthesis) {
    window.speechSynthesis.cancel()
  }
  state.speaking = false
}

function speakChinese(text) {
  if (!window.speechSynthesis) return
  stopSpeaking()
  const utter = new SpeechSynthesisUtterance(text)
  utter.lang = 'zh-CN'
  const voices = window.speechSynthesis.getVoices()
  const zh =
    voices.find((v) => v.lang === 'zh-CN') ||
    voices.find((v) => v.lang?.startsWith('zh')) ||
    null
  if (zh) utter.voice = zh
  utter.rate = 0.95
  state.speaking = true
  utter.onend = () => {
    state.speaking = false
    render()
  }
  utter.onerror = () => {
    state.speaking = false
    render()
  }
  window.speechSynthesis.speak(utter)
  render()
}

function stopListening() {
  if (state.recognition) {
    try {
      state.recognition.onresult = null
      state.recognition.onerror = null
      state.recognition.onend = null
      state.recognition.stop()
    } catch {
      // ignore
    }
  }
  state.listening = false
}

function startListening() {
  if (!SpeechRecognition) {
    state.feedback = {
      type: 'warn',
      message: '这个浏览器不支持语音识别，请用下方输入框练习，或换 Chrome / Edge。',
    }
    render()
    return
  }

  stopListening()
  stopSpeaking()

  const recognition = new SpeechRecognition()
  recognition.lang = 'en-US'
  recognition.interimResults = true
  recognition.continuous = false
  recognition.maxAlternatives = 3

  state.recognition = recognition
  state.listening = true
  state.heard = ''
  state.feedback = { type: 'info', message: '正在听你说英文…' }
  render()

  recognition.onresult = (event) => {
    let interim = ''
    let finalText = ''
    for (let i = event.resultIndex; i < event.results.length; i++) {
      const transcript = event.results[i][0].transcript
      if (event.results[i].isFinal) finalText += transcript
      else interim += transcript
    }
    state.heard = (finalText || interim).trim()
    render()
    if (finalText) {
      evaluateAnswer(finalText.trim())
    }
  }

  recognition.onerror = (event) => {
    state.listening = false
    if (event.error === 'no-speech') {
      state.feedback = { type: 'warn', message: '没听到声音，请再试一次。' }
    } else if (event.error === 'not-allowed') {
      state.feedback = { type: 'warn', message: '请允许麦克风权限后再试。' }
    } else {
      state.feedback = { type: 'warn', message: `识别出错：${event.error}` }
    }
    render()
  }

  recognition.onend = () => {
    state.listening = false
    render()
  }

  try {
    recognition.start()
  } catch {
    state.listening = false
    state.feedback = { type: 'warn', message: '无法启动麦克风，请稍后再试。' }
    render()
  }
}

function evaluateAnswer(heard) {
  stopListening()
  state.attemptCount += 1
  state.heard = heard

  const expected = state.current.en
  if (isMatch(heard, expected)) {
    state.awaitingRetry = false
    state.correctCount += 1
    state.feedback = { type: 'good', message: '正确！' }
    render()
    window.setTimeout(() => {
      nextSentence(true)
    }, 750)
    return
  }

  state.awaitingRetry = true
  state.feedback = {
    type: 'bad',
    message: '不太对，请再讲一次：',
    answer: expected,
  }
  render()
}

function rebuildPool() {
  state.pool = SENTENCES.filter((s) => state.selected.has(s.set))
}

function nextSentence(fromCorrect = false) {
  stopListening()
  stopSpeaking()
  const next = pickRandom(state.current?.id)
  if (!next) {
    state.feedback = { type: 'warn', message: '请至少选择一个题库。' }
    render()
    return
  }
  state.current = next
  state.awaitingRetry = false
  state.heard = ''
  state.feedback = fromCorrect
    ? { type: 'info', message: '下一题' }
    : { type: 'info', message: '听中文，然后用英文回答' }
  render()
  window.setTimeout(() => speakChinese(next.zh), 180)
}

function startPractice() {
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
            : `<p class="hint">提示：第一次点「开始说」时，浏览器会请求麦克风权限。</p>`
        }
      </section>
    </div>
  `
}

function renderPractice() {
  const s = state.current
  const fb = state.feedback
  let pill = ''
  if (fb?.type === 'good') pill = `<span class="pill good">${escapeHtml(fb.message)}</span>`
  else if (fb?.type === 'bad') pill = `<span class="pill bad">需要纠正</span>`
  else if (fb?.type === 'warn') pill = `<span class="pill warn">${escapeHtml(fb.message)}</span>`
  else if (state.listening) pill = `<span class="pill warn">正在听…</span>`
  else if (state.speaking) pill = `<span class="pill">正在读中文…</span>`
  else if (fb?.message) pill = `<span class="pill">${escapeHtml(fb.message)}</span>`

  return `
    <div class="shell">
      <div class="topbar">
        <h1>对练</h1>
        <div class="stats">
          <span>答对 <b>${state.correctCount}</b></span>
          <span>作答 <b>${state.attemptCount}</b></span>
          <button class="btn btn-ghost" data-action="home" type="button">返回</button>
        </div>
      </div>
      <section class="stage">
        <p class="prompt-label">请用英文说出</p>
        <h2 class="prompt-zh">${escapeHtml(s?.zh || '')}</h2>
        <div class="status-row">${pill}</div>
        <p class="heard">你说的：<strong>${escapeHtml(state.heard || '—')}</strong></p>
        ${
          fb?.type === 'bad'
            ? `<div class="correction">${escapeHtml(fb.message)}<span class="answer">${escapeHtml(fb.answer)}</span></div>`
            : ''
        }
        <div class="actions">
          <button class="btn btn-ghost" data-action="replay" type="button">再听中文</button>
          <button class="btn btn-mic ${state.listening ? 'listening' : ''}" data-action="mic" type="button">
            ${state.listening ? '听写中…' : state.awaitingRetry ? '再讲一次' : '开始说'}
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
        <p class="hint">说对自动进入下一题；说错会显示正确答案，请再讲一次。</p>
      </section>
    </div>
  `
}

function render() {
  app.innerHTML = state.view === 'home' ? renderHome() : renderPractice()
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
    stopListening()
    stopSpeaking()
    state.view = 'home'
    render()
  }
  if (action === 'replay' && state.current) speakChinese(state.current.zh)
  if (action === 'mic') {
    if (state.listening) stopListening()
    else startListening()
    render()
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
