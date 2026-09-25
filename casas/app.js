const PREF_KEY = "class3180.casas.prefs";
const SCORE_URL = "";
const LETTERS = ["A", "B", "C", "D"];
const LEVELS = [
  ["A", "A 入門", "標示、時間、簡單表格"],
  ["B", "B 初級", "便條、廣告、短訊息"],
  ["C", "C 中級", "工作信件、規定、薪資"],
  ["D", "D 進階", "短文、主旨、推論"],
];
const BANDS = [
  ["exit", "Exit 6", "236"],
  ["l6", "6", "228"],
  ["l5", "5", "217"],
  ["l4", "4", "207"],
  ["l3", "3", "197"],
  ["l2", "2", "184"],
  ["l1", "1", "159"],
];

const app = document.getElementById("app");
let timerId = 0;
const state = loadPrefs();

function loadPrefs() {
  const base = {
    screen: "home", name: "", sid: "", level: "B", count: 10, mode: "test",
    items: [], index: 0, answers: [], showAll: false, zoom: 1,
    remainMs: 60 * 60 * 1000, paused: false, deadline: 0, resultPage: 0,
  };
  try {
    const saved = JSON.parse(localStorage.getItem(PREF_KEY) || "{}");
    return Object.assign(base, {
      name: saved.name || "",
      sid: saved.sid || String(Math.floor(10000000 + Math.random() * 90000000)),
      level: saved.level || "B",
      count: saved.count || 10,
      mode: saved.mode || "test",
    });
  } catch {
    return base;
  }
}

function savePrefs() {
  localStorage.setItem(PREF_KEY, JSON.stringify({
    name: state.name, sid: state.sid, level: state.level, count: state.count, mode: state.mode,
  }));
}

function esc(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function shuffle(list) {
  const arr = list.slice();
  const rand = new Uint32Array(arr.length);
  crypto.getRandomValues(rand);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = rand[i] % (i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function articles(level) {
  return (window.BANK || []).filter((item) => item.level === level);
}

function inflate(passage, limit) {
  const questions = limit ? passage.questions.slice(0, limit) : passage.questions;
  return questions.map((question) => {
    const choices = shuffle(question.choices.map((text, i) => ({ text, ok: i === question.answer })));
    return {
      passageId: passage.id,
      title: passage.title,
      by: passage.by || "",
      paragraphs: passage.paragraphs,
      right: passage.right || null,
      q: question.q,
      choices: choices.map((c) => c.text),
      answer: choices.findIndex((c) => c.ok),
      why: question.why,
      whyZh: question.whyZh,
    };
  });
}

function placeLevel(correct) {
  if (correct <= 1) return "A";
  if (correct <= 3) return "B";
  if (correct <= 5) return "C";
  return "D";
}

function clock() {
  const ms = state.paused ? state.remainMs : Math.max(0, state.deadline - Date.now());
  const s = Math.ceil(ms / 1000);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

function beginRound(items, screen) {
  state.items = items;
  state.answers = items.map(() => null);
  state.index = 0;
  state.zoom = 1;
  state.paused = false;
  state.screen = screen;
  state.showAll = false;
  state.resultPage = 0;
  if (screen === "exam") {
    state.scoreSent = false;
    state.scoreNote = "";
    state.remainMs = 60 * 60 * 1000;
    state.deadline = Date.now() + state.remainMs;
    state.finishedOn = null;
  }
  savePrefs();
  render();
}

function startLocator() {
  const items = (window.LOCATOR || []).flatMap((passage) => inflate(passage));
  beginRound(items, "locator");
}

function startRehearsal() {
  const pool = shuffle(articles(state.level));
  state.rehearsalId = pool[0]?.id || "";
  state.examIds = pool.slice(1, 3).map((item) => item.id);
  beginRound(inflate(pool[0], 3), "rehearsal");
}

function startExam() {
  const picked = articles(state.level).filter((item) => state.examIds.includes(item.id));
  const items = picked.flatMap((passage) => inflate(passage));
  beginRound(items, "exam");
}

function oneArticle(title, by, paragraphs) {
  return `<article><h2 class="passage-title">${esc(title)}</h2>${by ? `<p class="byline">By ${esc(by)}</p>` : ""}${(paragraphs || []).map((p) => `<p class="passage">${esc(p)}</p>`).join("")}</article>`;
}

function passageHtml(item) {
  const left = oneArticle(item.title, item.by, item.paragraphs);
  if (!item.right) return left;
  return `<div class="pair">${left}${oneArticle(item.right.title, item.right.by, item.right.paragraphs)}</div>`;
}

function render() {
  clearInterval(timerId);
  document.documentElement.style.setProperty("--zoom", String(state.zoom || 1));
  if (state.screen === "locator" || state.screen === "rehearsal" || state.screen === "exam") renderTest();
  else if (state.screen === "level") renderLevel();
  else if (state.screen === "ready") renderReady();
  else if (state.screen === "result") renderResult();
  else renderHome();
  bind();
}

function renderHome() {
  const articleCount = (window.BANK || []).length;
  app.innerHTML = `
    <div class="home">
      <a class="back" href="../">回單字練習</a>
      <h1>CASAS eTests Online</h1>
      <p class="lede">先做等級測驗，再做 3 題 Rehearsal，然後才進入正式考試。正式考是完整文章，不是一小段。</p>
      <section class="panel">
        <label class="field">Name
          <input id="name" type="text" maxlength="40" value="${esc(state.name)}" placeholder="Your name" />
        </label>
        <label class="field">ID
          <input id="sid" type="text" maxlength="12" value="${esc(state.sid)}" />
        </label>
        <p class="fine">題庫有 ${articleCount} 篇文章。等級測驗決定 A 到 D，正式考再從那個等級隨機抽文章。Rehearsal 的 3 題不計分。</p>
        <button class="begin" id="start" type="button">Begin locator</button>
      </section>
    </div>`;
}

function renderLevel() {
  const names = { A: "A 入門", B: "B 初級", C: "C 中級", D: "D 進階" };
  app.innerHTML = `
    <div class="gate">
      <p class="fine">Locator result</p>
      <h1>Reading level ${esc(state.level)}</h1>
      <p>${esc(names[state.level] || state.level)}。答對 ${state.locatorCorrect} / ${state.locatorTotal}。接下來先做 3 題 Rehearsal，這 3 題不計入正式分數。</p>
      <button class="begin" id="to-rehearsal" type="button">Start rehearsal</button>
    </div>`;
}

function renderReady() {
  app.innerHTML = `
    <div class="gate">
      <p class="fine">Rehearsal complete</p>
      <h1>The test will begin</h1>
      <p>Rehearsal：${state.rehearsalCorrect} / ${state.rehearsalTotal}。這 3 題不計分。正式考試會用別的文章，交卷後才看答案。</p>
      <button class="begin" id="to-exam" type="button">Begin test</button>
    </div>`;
}

function renderTest() {
  const item = state.items[state.index];
  const picked = state.answers[state.index];
  const show = false;
  const pct = Math.round(((state.index + 1) / state.items.length) * 100);
  const last = state.index === state.items.length - 1;
  const phase = state.screen === "exam" ? "Time Remaining" : state.screen === "rehearsal" ? "Rehearsal" : "Locator";
  const phaseValue = state.screen === "exam" ? clock() : `${state.index + 1} / ${state.items.length}`;
  app.innerHTML = `
    <div class="exam">
      <header class="head">
        <div class="head-cell"><span>ID</span><strong>${esc(state.sid)}</strong></div>
        <div class="head-cell"><span>Name</span><strong>${esc(state.name || "Student")}</strong></div>
        <div class="head-cell"><span>${phase}</span><strong id="clock">${phaseValue}</strong></div>
        <button class="pause" id="pause" type="button" aria-label="Pause">${state.paused ? "▶" : "❚❚"}</button>
      </header>
      <div class="stage">
        <section class="reader">
          ${passageHtml(item)}
          <div class="zoom">
            <button type="button" id="zoom-out" aria-label="Zoom out">−</button>
            <button type="button" id="zoom-in" aria-label="Zoom in">+</button>
          </div>
        </section>
        <section class="qpane">
          <div class="q-top">
            <div class="track"><span style="width:${pct}%"></span></div>
            <div class="q-count"><b>${state.index + 1}</b><span>${state.items.length}</span></div>
          </div>
          <p class="stem">${esc(item.q)}</p>
          <div class="choices-col">
            ${item.choices.map((text, i) => {
              let cls = picked === i ? "on" : "";
              if (show && i === item.answer) cls = "good";
              else if (show && picked === i && i !== item.answer) cls = "bad";
              return `<button type="button" class="choice ${cls}" data-choice="${i}">${esc(text)}</button>`;
            }).join("")}
            ${show ? `<p class="why">${esc(item.why)} ${esc(item.whyZh || "")}</p>` : ""}
          </div>
          <div class="q-nav">
            <button id="prev" type="button" ${state.index === 0 ? "disabled" : ""}>‹</button>
            ${last ? `<button class="finish" id="finish" type="button">${state.screen === "exam" ? "Finish" : "Continue"}</button>` : `<button id="next" type="button">›</button>`}
          </div>
        </section>
      </div>
    </div>`;
  if (state.screen !== "exam") return;
  timerId = setInterval(() => {
    const el = document.getElementById("clock");
    if (!el) return;
    if (!state.paused && state.deadline <= Date.now()) {
      finishTest();
      return;
    }
    el.textContent = clock();
  }, 500);
}

function finishTest() {
  const correct = state.items.filter((item, i) => state.answers[i] === item.answer).length;
  if (state.screen === "locator") {
    state.locatorCorrect = correct;
    state.locatorTotal = state.items.length;
    state.level = placeLevel(correct);
    state.screen = "level";
    savePrefs();
    render();
    return;
  }
  if (state.screen === "rehearsal") {
    state.rehearsalCorrect = correct;
    state.rehearsalTotal = state.items.length;
    state.screen = "ready";
    render();
    return;
  }
  state.finishedOn = new Date();
  state.screen = "result";
  state.resultPage = 0;
  state.scoreNote = "";
  sendScore();
  render();
}

function sendScore() {
  if (!SCORE_URL || state.scoreSent) return;
  state.scoreSent = true;
  const total = state.items.length;
  const correct = state.items.filter((item, i) => state.answers[i] === item.answer).length;
  const payload = {
    token: "3180-casas",
    name: state.name || "Student",
    sid: state.sid || "",
    level: state.level,
    correct,
    total,
    percent: total ? Math.round((correct / total) * 100) : 0,
    mode: state.mode,
    at: (state.finishedOn || new Date()).toISOString(),
  };
  fetch(SCORE_URL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload),
  }).then(() => {
    state.scoreNote = "你的分數留在這個畫面。老師也收到這次成績。";
    const note = document.getElementById("score-note");
    if (note) note.textContent = state.scoreNote;
  }).catch(() => {
    state.scoreSent = false;
    state.scoreNote = "分數已顯示。送給老師時沒有成功，請再交卷一次。";
    const note = document.getElementById("score-note");
    if (note) note.textContent = state.scoreNote;
  });
}

function practiceBand(pct) {
  if (pct >= 95) return "exit";
  if (pct >= 85) return "l6";
  if (pct >= 75) return "l5";
  if (pct >= 65) return "l4";
  if (pct >= 55) return "l3";
  if (pct >= 45) return "l2";
  return "l1";
}

function renderResult() {
  const total = state.items.length;
  const correct = state.items.filter((item, i) => state.answers[i] === item.answer).length;
  const pct = total ? Math.round((correct / total) * 100) : 0;
  const here = practiceBand(pct);
  const when = (state.finishedOn || new Date());
  const date = `${String(when.getMonth() + 1).padStart(2, "0")}/${String(when.getDate()).padStart(2, "0")}/${when.getFullYear()}`;
  if (state.resultPage === 0) {
    app.innerHTML = `
      <div class="report">
        <div class="report-head">
          <h1>CASAS eTests Online</h1>
          <p>Personal Score Report</p>
          <p>${esc(state.sid)} ${esc(state.name || "Student")}</p>
          <p class="fine">Practice only. This is not an official scale score.</p>
          <p class="fine" id="score-note">${esc(state.scoreNote || "這是你這一次的分數。")}</p>
        </div>
        <table class="score-table">
          <tr>
            <th>Modality</th><th>Test Form</th><th>Test Level</th><th>Test Date</th><th>Practice Score</th><th>Items Correct</th>
          </tr>
          <tr>
            <td>Reading</td><td>Practice</td><td>${esc(state.level)}</td><td>${date}</td><td>${pct}%</td><td>${correct} / ${total}</td>
          </tr>
        </table>
        <div class="score-visual">
          <div class="ladder">
            <h2>ESL<br>NRS Level</h2>
            ${BANDS.map(([id, label, cut]) => `<div class="band ${id} ${id === here ? "here" : ""}"><span>${label}</span><small>${cut}</small></div>`).join("")}
          </div>
          <div class="burst-wrap"><span class="point">←</span><div class="burst"><div><span>Today's Practice Score</span><b>${pct}%</b><span>${correct}/${total}</span></div></div></div>
        </div>
        <div class="pager">
          <button id="home" type="button">Levels</button>
          <button id="again" type="button">New test</button>
          <button id="next-page" type="button">→</button>
        </div>
      </div>`;
    return;
  }
  const rows = state.items.map((item, i) => ({ item, i, picked: state.answers[i] }))
    .filter((row) => state.showAll || row.picked !== row.item.answer);
  app.innerHTML = `
    <div class="report">
      <div class="report-head">
        <h1>Item Review</h1>
        <p>${esc(state.name || "Student")} · Level ${esc(state.level)}</p>
      </div>
      <div class="actions">
        <button id="toggle" type="button">${state.showAll ? "Wrong only" : "Show all"}</button>
        <button id="prev-page" type="button">← Score</button>
      </div>
      ${rows.map(({ item, i, picked }) => `
        <article class="review">
          <p class="${picked === item.answer ? "ok" : "miss"}">${picked === item.answer ? "Correct" : "Review"} · ${i + 1}</p>
          ${passageHtml(item)}
          <h3>${esc(item.q)}</h3>
          <p>Your answer: ${picked == null ? "—" : esc(item.choices[picked])}</p>
          <p>Answer: ${esc(item.choices[item.answer])}</p>
          <p class="fine">${esc(item.why)} ${esc(item.whyZh || "")}</p>
        </article>`).join("") || `<article class="review"><p>No missed items.</p></article>`}
    </div>`;
}

function bind() {
  document.getElementById("name")?.addEventListener("input", (e) => { state.name = e.target.value; savePrefs(); });
  document.getElementById("sid")?.addEventListener("input", (e) => { state.sid = e.target.value; savePrefs(); });
  app.querySelectorAll("[data-level]").forEach((btn) => btn.addEventListener("click", () => { state.level = btn.dataset.level; savePrefs(); render(); }));
  app.querySelectorAll("[data-count]").forEach((btn) => btn.addEventListener("click", () => { state.count = Number(btn.dataset.count); savePrefs(); render(); }));
  app.querySelectorAll("[data-mode]").forEach((btn) => btn.addEventListener("click", () => { state.mode = btn.dataset.mode; savePrefs(); render(); }));
  document.getElementById("start")?.addEventListener("click", startLocator);
  document.getElementById("to-rehearsal")?.addEventListener("click", startRehearsal);
  document.getElementById("to-exam")?.addEventListener("click", startExam);
  document.getElementById("pause")?.addEventListener("click", () => {
    if (state.paused) {
      state.deadline = Date.now() + state.remainMs;
      state.paused = false;
    } else {
      state.remainMs = Math.max(0, state.deadline - Date.now());
      state.paused = true;
    }
    render();
  });
  document.getElementById("zoom-in")?.addEventListener("click", () => { state.zoom = Math.min(1.6, state.zoom + 0.1); render(); });
  document.getElementById("zoom-out")?.addEventListener("click", () => { state.zoom = Math.max(0.8, state.zoom - 0.1); render(); });
  document.getElementById("prev")?.addEventListener("click", () => { state.index = Math.max(0, state.index - 1); render(); });
  document.getElementById("next")?.addEventListener("click", () => { state.index = Math.min(state.items.length - 1, state.index + 1); render(); });
  document.getElementById("finish")?.addEventListener("click", () => {
    const blank = state.answers.filter((a) => a == null).length;
    if (blank && !confirm(`還有 ${blank} 題沒答。仍要交卷嗎？`)) return;
    finishTest();
  });
  document.getElementById("again")?.addEventListener("click", startLocator);
  document.getElementById("home")?.addEventListener("click", () => { state.screen = "home"; render(); });
  document.getElementById("toggle")?.addEventListener("click", () => { state.showAll = !state.showAll; render(); });
  document.getElementById("next-page")?.addEventListener("click", () => { state.resultPage = 1; render(); });
  document.getElementById("prev-page")?.addEventListener("click", () => { state.resultPage = 0; render(); });
  app.querySelectorAll("[data-choice]").forEach((btn) => btn.addEventListener("click", () => {
    state.answers[state.index] = Number(btn.dataset.choice);
    render();
  }));
}

render();
