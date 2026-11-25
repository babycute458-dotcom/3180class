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
  micWatchdog: null,
  micStarting: false,
  pendingHeard: null,
  intentionalAbort: false,
  micStream: null,
  micPermissionReady: false,
  micChain: Promise.resolve(),
  lastMicEndAt: 0,
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

const APP_VERSION = 'v11'
const MIC_COOLDOWN_MS = 700
const MIC_RETRY_GAP_MS = 1100
const MIC_LISTEN_TIMEOUT_MS = 16000
const MIC_DISPOSE_TIMEOUT_MS = 1000

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

function enqueueMic(task) {
  const run = state.micChain.catch(() => {}).then(task)
  state.micChain = run.catch(() => {})
  return run
}

function clearMicWatchdog() {
  if (state.micWatchdog) {
    window.clearTimeout(state.micWatchdog)
    state.micWatchdog = null
  }
}

function armMicWatchdog(session) {
  clearMicWatchdog()
  state.micWatchdog = window.setTimeout(() => {
    if (session !== state.listenSession) return
    state.intentionalAbort = true
    const rec = state.recognition
    state.recognition = null
    state.listening = false
    state.micStarting = false
    state.pendingHeard = null
    state.listenSession += 1
    try {
      // stop() is gentler than abort() for the next start
      if (rec) {
        if (typeof rec.stop === 'function') rec.stop()
        else rec.abort?.()
      }
    } catch {
      // ignore
    }
    state.lastMicEndAt = Date.now()
    state.micBusy = false
    state.feedback = { type: 'warn', message: '麦克风超时了，请再点一次「说英文」。' }
    render('patch')
  }, MIC_LISTEN_TIMEOUT_MS)
}

function stripRecognitionHandlers(rec) {
  if (!rec) return
  try {
    rec.onresult = null
    rec.onerror = null
    rec.onend = null
    rec.onaudiostart = null
    rec.onsoundstart = null
    rec.onspeechstart = null
    rec.onnomatch = null
  } catch {
    // ignore
  }
}

function disposeRecognition(rec, { force = false } = {}) {
  if (!rec) return Promise.resolve()

  return new Promise((resolve) => {
    let settled = false
    const finish = () => {
      if (settled) return
      settled = true
      state.lastMicEndAt = Date.now()
      stripRecognitionHandlers(rec)
      resolve()
    }

    const timer = window.setTimeout(finish, MIC_DISPOSE_TIMEOUT_MS)
    try {
      stripRecognitionHandlers(rec)
      rec.onend = () => {
        window.clearTimeout(timer)
        finish()
      }
      state.intentionalAbort = true
      if (force) {
        // Prefer stop first; abort only if stop throws.
        try {
          rec.stop()
        } catch {
          try {
            rec.abort?.()
          } catch {
            window.clearTimeout(timer)
            finish()
          }
        }
      } else {
        try {
          rec.stop()
        } catch {
          window.clearTimeout(timer)
          finish()
        }
      }
    } catch {
      window.clearTimeout(timer)
      finish()
    }
  })
}

async function warmMicPermission() {
  // Request once, then release — do NOT hold the stream while SpeechRecognition runs
  // (holding it can mute recognition on some Chrome/Android builds).
  if (state.micPermissionReady) return
  if (!navigator.mediaDevices?.getUserMedia) {
    state.micPermissionReady = true
    return
  }
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: false,
  })
  try {
    stream.getTracks().forEach((t) => t.stop())
  } catch {
    // ignore
  }
  state.micPermissionReady = true
}

function releaseMicStream() {
  if (!state.micStream) return
  try {
    state.micStream.getTracks().forEach((t) => t.stop())
  } catch {
    // ignore
  }
  state.micStream = null
}

async function waitUntilMicSettled(minGap = MIC_COOLDOWN_MS) {
  const elapsed = Date.now() - (state.lastMicEndAt || 0)
  const need = Math.max(0, minGap - elapsed)
  if (need > 0) await sleep(need)
  state.micBusy = false
}

function softCloseMic() {
  clearMicWatchdog()
  state.listenSession += 1
  state.listening = false
  state.micStarting = false
  state.pendingHeard = null
  const rec = state.recognition
  state.recognition = null
  if (!rec) {
    state.lastMicEndAt = Date.now()
    state.micBusy = false
    return Promise.resolve()
  }
  return disposeRecognition(rec, { force: false })
}

function hardStopMic({ releaseStream = false } = {}) {
  clearMicWatchdog()
  state.listenSession += 1
  state.listening = false
  state.micStarting = false
  state.pendingHeard = null
  const rec = state.recognition
  state.recognition = null
  const done = rec ? disposeRecognition(rec, { force: true }) : Promise.resolve().then(() => {
    state.lastMicEndAt = Date.now()
    state.micBusy = false
  })
  return done.then(() => {
    if (releaseStream) releaseMicStream()
  })
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
  // Stop recognition only; keep the held mic stream so the next listen works.
  void hardStopMic({ releaseStream: false })

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
    state.lastMicEndAt = Date.now()
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

  let recognition
  try {
    recognition = new SpeechRecognition()
  } catch {
    state.listening = false
    state.micBusy = false
    state.micStarting = false
    state.feedback = { type: 'warn', message: '无法创建语音识别，请用输入框或换 Chrome / Edge。' }
    render('patch')
    return
  }

  recognition.lang = 'en-US'
  recognition.interimResults = true
  recognition.continuous = false
  recognition.maxAlternatives = 3

  state.recognition = recognition
  state.listening = true
  state.micBusy = true
  state.micStarting = false
  state.pendingHeard = null
  state.intentionalAbort = false
  state.feedback = { type: 'info', message: '请说英文…（说完稍等一下）' }
  render('patch')
  armMicWatchdog(session)

  let gotFinal = false
  let errorCode = null
  let bestInterim = ''

  const finishWithTranscript = (transcript) => {
    if (gotFinal || session !== state.listenSession) return
    gotFinal = true
    clearMicWatchdog()
    state.pendingHeard = transcript
    state.heard = transcript
    state.listening = false
    render('patch')
    // continuous:false ends on its own after a final result.
    // Calling stop()/abort() here is what broke the next retry on Chrome.
  }

  recognition.onresult = (event) => {
    if (session !== state.listenSession || gotFinal) return
    let interim = ''
    let finalText = ''
    for (let i = event.resultIndex; i < event.results.length; i += 1) {
      const result = event.results[i]
      let piece = ''
      // Prefer the alternative closest to expected when scoring later; keep top transcript for display.
      piece = result?.[0]?.transcript?.trim() || ''
      if (!piece) continue
      if (result.isFinal) finalText += (finalText ? ' ' : '') + piece
      else interim += (interim ? ' ' : '') + piece
    }
    if (interim) {
      bestInterim = interim
      state.heard = interim
      render('patch')
    }
    if (finalText) finishWithTranscript(finalText)
  }

  recognition.onerror = (event) => {
    if (session !== state.listenSession) return
    errorCode = event.error || 'error'
    if (errorCode === 'aborted' && state.intentionalAbort) return
    // Keep listening UI until onend; do not zero micBusy early.
    if (errorCode !== 'no-speech') {
      state.listening = false
    }
  }

  recognition.onend = () => {
    stripRecognitionHandlers(recognition)
    if (state.recognition === recognition) state.recognition = null
    state.lastMicEndAt = Date.now()
    if (session !== state.listenSession) return

    clearMicWatchdog()
    state.listening = false
    state.micStarting = false
    state.micBusy = false

    const heard = state.pendingHeard || (!gotFinal && bestInterim ? bestInterim : null)
    state.pendingHeard = null

    if (heard) {
      evaluateAnswer(heard, { fromSpeech: true })
      return
    }

    // Soft auto-retry for flaky engine errors (not permission / no-speech).
    const retryable =
      !state.intentionalAbort &&
      attempt < 2 &&
      (errorCode === 'aborted' ||
        errorCode === 'network' ||
        errorCode === 'audio-capture')

    if (retryable) {
      state.feedback = { type: 'info', message: '麦克风重试中…' }
      render('patch')
      void waitUntilMicSettled(MIC_RETRY_GAP_MS).then(() => {
        if (session !== state.listenSession) return
        beginRecognition(session, attempt + 1)
      })
      return
    }

    if (errorCode === 'not-allowed') {
      state.feedback = { type: 'warn', message: '请允许麦克风权限后再试。' }
    } else if (errorCode === 'network') {
      state.feedback = { type: 'warn', message: '语音识别需要网络，请检查连线后再点「说英文」。' }
    } else if (errorCode === 'aborted') {
      state.feedback = { type: 'warn', message: '麦克风被中断了，请再点「说英文」。' }
    } else if (errorCode && errorCode !== 'no-speech') {
      state.feedback = { type: 'warn', message: `识别失败（${errorCode}），请再点「说英文」。` }
    } else {
      state.feedback = { type: 'warn', message: '没听到声音，请再点「说英文」。' }
    }
    render('patch')
  }

  try {
    recognition.start()
  } catch (err) {
    clearMicWatchdog()
    state.listening = false
    state.recognition = null
    stripRecognitionHandlers(recognition)
    state.lastMicEndAt = Date.now()
    if (attempt < 2) {
      state.feedback = { type: 'info', message: '麦克风重试中…' }
      render('patch')
      void waitUntilMicSettled(MIC_RETRY_GAP_MS + attempt * 250).then(() => {
        if (session !== state.listenSession) return
        beginRecognition(session, attempt + 1)
      })
      return
    }
    state.micBusy = false
    state.micStarting = false
    state.feedback = {
      type: 'warn',
      message: `麦克风还没准备好（${err?.name || 'error'}），请再点一次「说英文」。`,
    }
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

  if (state.micStarting || state.listening) return

  stopSpeaking()
  state.micStarting = true

  clearMicWatchdog()
  const prev = state.recognition
  state.recognition = null
  state.listening = false
  state.pendingHeard = null
  state.listenSession += 1
  const session = state.listenSession

  if (!state.awaitingRetry) state.heard = ''
  state.feedback = { type: 'info', message: '正在打开麦克风…' }
  render('patch')

  void enqueueMic(async () => {
    try {
      if (prev) await disposeRecognition(prev, { force: true })
      // Hold hardware mic open across retries — major Chrome stability fix.
      try {
        await warmMicPermission()
      } catch (err) {
        if (session !== state.listenSession) return
        state.micStarting = false
        state.micBusy = false
        state.feedback = {
          type: 'warn',
          message:
            err?.name === 'NotAllowedError'
              ? '请允许麦克风权限后再试。'
              : '无法打开麦克风，请检查权限后重试。',
        }
        render('patch')
        return
      }

      await waitUntilMicSettled(prev ? MIC_RETRY_GAP_MS : MIC_COOLDOWN_MS)
      if (session !== state.listenSession) {
        state.micStarting = false
        return
      }
      beginRecognition(session, 0)
    } catch {
      if (session !== state.listenSession) return
      state.micStarting = false
      state.micBusy = false
      state.listening = false
      state.feedback = { type: 'warn', message: '麦克风启动失败，请再点一次。' }
      render('patch')
    }
  })
}

function evaluateAnswer(heard, { fromSpeech = false } = {}) {
  // Speech path already stopped recognition via natural/manual stop.
  if (!fromSpeech) void softCloseMic()
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
  // Prime mic permission inside the same tap as Start.
  void warmMicPermission().catch(() => {})
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
  if (state.micStarting) return '打开中…'
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
    void hardStopMic({ releaseStream: true })
    state.view = 'home'
    render('full')
  }
  if (action === 'replay' && state.current) {
    speakChinese(state.current.zh)
  }
  if (action === 'mic') {
    if (state.listening) {
      void hardStopMic({ releaseStream: false }).then(() => {
        state.feedback = { type: 'info', message: '已停止。要说英文时再点「说英文」。' }
        render('patch')
      })
    } else if (state.micStarting) {
      // Ignore double-taps while opening — canceling here caused retry failures.
      return
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
