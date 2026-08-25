const KEY = "class3180.vocab.v2";
const VIEWS = [
  ["book", "單字本"],
  ["cards", "閃卡"],
  ["sentence", "教室造句"],
  ["compound", "組詞造字"],
  ["quiz", "小考"],
];

const SAMPLE = [
  {
    id: "w-extraordinary",
    word: "extraordinary",
    pinyin: "/ɪkˈstrɔːrdəneri/",
    pos: "形容詞 adj.",
    meaning: "非凡的、特別的、出色的；very unusual or remarkable",
    example: "She did an extraordinary job on this project. 她在這個專案上表現得非常出色。",
    lesson: "單字清單",
    sentences: [],
    compounds: [],
    known: false,
  },
  {
    id: "w-team",
    word: "team",
    pinyin: "/tiːm/",
    pos: "名詞 n.",
    meaning: "團隊、隊伍；a group of people who work together",
    example: "Our team finished the work together. 我們的團隊一起完成了這份工作。",
    lesson: "單字清單",
    sentences: [],
    compounds: [],
    known: false,
  },
  {
    id: "w-project",
    word: "project",
    pinyin: "/ˈprɑːdʒekt/",
    pos: "名詞 n.",
    meaning: "專案、計畫；a planned piece of work（也可當動詞：預計、投射）",
    example: "This project will take three weeks. 這個專案需要三週。",
    lesson: "單字清單",
    sentences: [],
    compounds: [],
    known: false,
  },
  {
    id: "w-normal",
    word: "normal",
    pinyin: "/ˈnɔːrml/",
    pos: "形容詞 adj.",
    meaning: "正常的、普通的；usual and expected",
    example: "It is normal to feel nervous before a test. 考試前緊張是正常的。",
    lesson: "單字清單",
    sentences: [],
    compounds: [],
    known: false,
  },
  {
    id: "w-similar",
    word: "similar",
    pinyin: "/ˈsɪmələr/",
    pos: "形容詞 adj.",
    meaning: "相似的、類似的；almost the same, but not exactly",
    example: "These two answers are similar. 這兩個答案很相似。",
    lesson: "單字清單",
    sentences: [],
    compounds: [],
    known: false,
  },
  {
    id: "w-connect",
    word: "connect",
    pinyin: "/kəˈnekt/",
    pos: "動詞 v.",
    meaning: "連接、聯繫；to join two things or people together",
    example: "Please connect the cable to the computer. 請把線接到電腦上。",
    lesson: "單字清單",
    sentences: [],
    compounds: [],
    known: false,
  },
  {
    id: "w-explain",
    word: "explain",
    pinyin: "/ɪkˈspleɪn/",
    pos: "動詞 v.",
    meaning: "解釋、說明；to make something clear or easy to understand",
    example: "Can you explain this word to me? 你可以跟我解釋這個單字嗎？",
    lesson: "單字清單",
    sentences: [],
    compounds: [],
    known: false,
  },
  {
    id: "w-take-care-of",
    word: "take care of",
    pinyin: "/teɪk ˈker əv/",
    pos: "片語動詞 phr. v.",
    meaning: "照顧、處理；to look after someone or something",
    example: "I take care of my little brother after school. 放學後我會照顧弟弟。",
    lesson: "單字清單",
    sentences: [],
    compounds: [],
    known: false,
  },
  {
    id: "w-produce",
    word: "produce",
    pinyin: "/prəˈduːs/",
    pos: "動詞 v.",
    meaning: "生產、製造；to make or create something（也可當名詞：農產品）",
    example: "This factory produces phones. 這家工廠生產手機。",
    lesson: "單字清單",
    sentences: [],
    compounds: [],
    known: false,
  },
  {
    id: "w-communicate",
    word: "communicate",
    pinyin: "/kəˈmjuːnɪkeɪt/",
    pos: "動詞 v.",
    meaning: "溝通、傳達；to share information, ideas, or feelings",
    example: "We need to communicate more clearly. 我們需要更清楚地溝通。",
    lesson: "單字清單",
    sentences: [],
    compounds: [],
    known: false,
  },
  {
    id: "w-typical",
    word: "typical",
    pinyin: "/ˈtɪpɪkl/",
    pos: "形容詞 adj.",
    meaning: "典型的、有代表性的；having the usual qualities of a type",
    example: "Rain is typical in this season. 這個季節下雨是很典型的。",
    lesson: "單字清單",
    sentences: [],
    compounds: [],
    known: false,
  },
  {
    id: "w-imaginary",
    word: "imaginary",
    pinyin: "/ɪˈmædʒəneri/",
    pos: "形容詞 adj.",
    meaning: "想像的、虛構的；not real, only in the mind",
    example: "The story is about an imaginary friend. 這個故事是關於一個想像中的朋友。",
    lesson: "單字清單",
    sentences: [],
    compounds: [],
    known: false,
  },
  {
    id: "w-banal",
    word: "banal",
    pinyin: "/bəˈnɑːl/",
    pos: "形容詞 adj.",
    meaning: "陳腐的、平庸的、老套的；boring because it is too common",
    example: "The movie was banal and boring. 這部電影很老套，也很無聊。",
    lesson: "單字清單",
    sentences: [],
    compounds: [],
    known: false,
  },
  {
    id: "w-contribute",
    word: "contribute",
    pinyin: "/kənˈtrɪbjuːt/",
    pos: "動詞 v.",
    meaning: "貢獻、促成；to give something to help a person, group, or result",
    example: "Everyone can contribute to the discussion. 每個人都可以為討論做出貢獻。",
    lesson: "單字清單",
    sentences: [],
    compounds: [],
    known: false,
  },
];

const state = {
  view: "book",
  words: loadWords(),
  query: "",
  showForm: false,
  editingId: null,
  form: emptyForm(),
  cardIndex: 0,
  flipped: false,
  sentenceIndex: 0,
  sentenceDraft: "",
  compoundIndex: 0,
  compoundChar: "",
  compoundDraft: "",
  quiz: null,
  score: { right: 0, total: 0 },
};

function emptyForm() {
  return { word: "", pinyin: "", pos: "", meaning: "", example: "", lesson: "" };
}

function loadWords() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return SAMPLE.map((w) => ({ ...w }));
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : SAMPLE.map((w) => ({ ...w }));
  } catch {
    return SAMPLE.map((w) => ({ ...w }));
  }
}

function saveWords() {
  localStorage.setItem(KEY, JSON.stringify(state.words));
}

function uniqueChars(word) {
  return [...new Set([...(word || "")].filter((ch) => /[\u4e00-\u9fff]/.test(ch)))];
}

function newId() {
  return crypto.randomUUID();
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function render() {
  renderNav();
  const main = document.getElementById("main");
  if (state.view === "book") main.innerHTML = bookHtml();
  if (state.view === "cards") main.innerHTML = cardsHtml();
  if (state.view === "sentence") main.innerHTML = sentenceHtml();
  if (state.view === "compound") main.innerHTML = compoundHtml();
  if (state.view === "quiz") main.innerHTML = quizHtml();
  bindViewEvents();
}

function renderNav() {
  document.getElementById("nav").innerHTML = VIEWS.map(
    ([id, label]) =>
      `<button data-view="${id}" class="${state.view === id ? "active" : ""}">${label}</button>`
  ).join("");
}

function filteredWords() {
  const q = state.query.trim().toLowerCase();
  if (!q) return state.words;
  return state.words.filter((w) =>
    [w.word, w.pinyin, w.meaning, w.lesson, w.pos].join(" ").toLowerCase().includes(q)
  );
}

function bookHtml() {
  const words = filteredWords();
  const form = state.form;
  return `
    <header class="top">
      <div>
        <h2>單字本</h2>
        <p>把課堂上學到的單字記下來，之後用閃卡、造句、組詞來練。</p>
      </div>
      <div class="row" style="margin-top:0;padding-top:0">
        <input class="search" id="searchInput" placeholder="搜尋單字、意思、課堂…" value="${escapeHtml(state.query)}" />
        <button class="primary" id="addBtn">新增單字</button>
      </div>
    </header>
    ${
      state.showForm
        ? `<section class="panel">
            <h3>${state.editingId ? "編輯單字" : "新增課堂單字"}</h3>
            <form id="wordForm">
              <div class="fields">
                <label>單字 *<input name="word" value="${escapeHtml(form.word)}" required placeholder="例如：練習"></label>
                <label>拼音 / 發音<input name="pinyin" value="${escapeHtml(form.pinyin)}" placeholder="liànxí"></label>
                <label>詞性<input name="pos" value="${escapeHtml(form.pos)}" placeholder="名詞 / 動詞 / 形容詞"></label>
                <label>課堂 / 週次<input name="lesson" value="${escapeHtml(form.lesson)}" placeholder="第 3 週、Unit 2"></label>
                <label class="full">意思 *<input name="meaning" value="${escapeHtml(form.meaning)}" required></label>
                <label class="full">課堂例句<textarea name="example">${escapeHtml(form.example)}</textarea></label>
              </div>
              <div class="row">
                <button class="primary" type="submit">儲存</button>
                <button class="ghost" type="button" id="cancelForm">取消</button>
              </div>
            </form>
          </section>`
        : ""
    }
    ${
      words.length === 0
        ? `<div class="panel empty"><p>還沒有單字。先把今天課堂上學到的詞加進來吧。</p></div>`
        : `<div class="grid">${words
            .map(
              (word) => `<article class="card">
                <div class="row" style="margin-top:0;padding-top:0">
                  ${word.lesson ? `<span class="chip">${escapeHtml(word.lesson)}</span>` : ""}
                  ${word.pos ? `<span class="chip pine">${escapeHtml(word.pos)}</span>` : ""}
                </div>
                <div class="word">${escapeHtml(word.word)}</div>
                <div class="meta">${escapeHtml(word.pinyin)}</div>
                <p>${escapeHtml(word.meaning)}</p>
                ${word.example ? `<p class="hint">例句：${escapeHtml(word.example)}</p>` : ""}
                <div class="meta">造句 ${(word.sentences || []).length} · 組詞 ${(word.compounds || []).length}</div>
                <div class="row">
                  <button class="ghost" data-edit="${word.id}">編輯</button>
                  <button class="danger" data-remove="${word.id}">刪除</button>
                </div>
              </article>`
            )
            .join("")}</div>`
    }
  `;
}

function currentWord(indexKey) {
  if (!state.words.length) return null;
  if (state[indexKey] >= state.words.length) state[indexKey] = 0;
  return state.words[state[indexKey]];
}

function emptyPractice() {
  return `<div class="panel empty"><p>單字本還是空的。先到「單字本」加入課堂單字，再回來練習。</p></div>`;
}

function cardsHtml() {
  const word = currentWord("cardIndex");
  if (!word) return emptyPractice();
  return `
    <header class="top">
      <div>
        <h2>閃卡</h2>
        <p>點卡片翻面。認得就按「會了」，不熟就按「再練」。</p>
      </div>
      <p class="meta">${state.cardIndex + 1} / ${state.words.length}</p>
    </header>
    <section class="panel flash" id="flashCard">
      ${
        state.flipped
          ? `<p class="hint">意思</p><p class="practice-word" style="font-size:32px">${escapeHtml(word.meaning)}</p>${
              word.example ? `<p class="hint">${escapeHtml(word.example)}</p>` : ""
            }`
          : `<div class="word">${escapeHtml(word.word)}</div><p class="meta">${escapeHtml(word.pinyin)}</p><p class="hint">點一下看意思</p>`
      }
    </section>
    <div class="row">
      <button class="ghost" data-card="prev">上一張</button>
      <button class="danger" data-card="again">再練</button>
      <button class="secondary" data-card="known">會了</button>
      <button class="primary" data-card="next">下一張</button>
    </div>
  `;
}

function sentenceHtml() {
  const word = currentWord("sentenceIndex");
  if (!word) return emptyPractice();
  const name = Classroom.displayName();
  const roomReady = Boolean(Classroom.roomId);
  return `
    <header class="top">
      <div>
        <h2>教室造句</h2>
        <p>姐姐、同學可以同時寫。每人的句子都會留下來，不會互相覆蓋。</p>
      </div>
      <select id="sentenceSelect">${state.words
        .map(
          (w, i) =>
            `<option value="${i}" ${i === state.sentenceIndex ? "selected" : ""}>${escapeHtml(w.word)}</option>`
        )
        .join("")}</select>
    </header>
    ${classroomSetupHtml(name, roomReady)}
    <section class="panel">
      <p class="practice-word">${escapeHtml(word.word)}</p>
      <p class="meta">${escapeHtml(word.pinyin)} · ${escapeHtml(word.meaning)}</p>
      ${word.example ? `<p class="hint">課堂例句：${escapeHtml(word.example)}</p>` : ""}
      <form id="sentenceForm">
        <label class="full">我的句子
          <textarea id="sentenceDraft" placeholder="請用「${escapeHtml(word.word)}」造一個句子">${escapeHtml(state.sentenceDraft)}</textarea>
        </label>
        <div class="row">
          <button class="ghost" type="button" data-sent="prev">上一個</button>
          <button class="primary" type="submit"${name && roomReady ? "" : " disabled"}>送到教室</button>
          <button class="secondary" type="button" data-sent="next">下一個單字</button>
        </div>
      </form>
      ${Classroom.status ? `<p class="share-status">${escapeHtml(Classroom.status)}</p>` : ""}
    </section>
    <section class="panel">
      <h3>大家的句子</h3>
      <p class="hint">每人最新一句會放最上面，以前寫過的也會留著。</p>
      <div id="sentenceWall">${wallHtml(word.id)}</div>
    </section>
  `;
}

function classroomSetupHtml(name, roomReady) {
  const online = Classroom.onlineNames();
  return `
    <section class="panel">
      <form id="nameForm" class="name-row">
        <label>你的名字
          <input id="displayNameInput" value="${escapeHtml(name)}" placeholder="例如：姐姐、小華" maxlength="20" required>
        </label>
        <button class="secondary" type="submit">記住我</button>
      </form>
      ${
        roomReady
          ? `<p class="hint">教室連結（傳給姐姐或同學）：</p>
             <div class="link-box" id="roomLink">${escapeHtml(Classroom.shareLink())}</div>
             <div class="row">
               <button class="primary" type="button" id="copyRoomLink">複製連結</button>
             </div>
             <div class="presence" id="presenceList">${presenceHtml(online)}</div>`
          : `<p class="hint">還沒有教室。建立一間，再把連結傳出去就可以一起寫。</p>
             <div class="row">
               <button class="primary" type="button" id="createRoomBtn">建立教室</button>
             </div>
             <form id="joinRoomForm" class="name-row">
               <label>或貼上教室連結 / 代碼
                 <input id="joinRoomInput" placeholder="貼上連結或 room 代碼">
               </label>
               <button class="ghost" type="submit">加入</button>
             </form>`
      }
    </section>
  `;
}

function presenceHtml(online) {
  if (!online.length) return `<span>教室裡暫時還沒有人在線上</span>`;
  return online.map((n) => `<span>${escapeHtml(n)} 在線上</span>`).join("");
}

function wallHtml(wordId) {
  const groups = Classroom.groupedFor(wordId);
  if (!groups.length) {
    return `<p class="hint">這個單字還沒有人造句。當第一個寫的人吧。</p>`;
  }
  const me = Classroom.displayName();
  return groups
    .map(([author, items]) => {
      const latest = items[items.length - 1];
      const older = items.slice(0, -1).reverse();
      return `<article class="author-card ${author === me ? "mine" : ""}">
        <div class="author-head">
          <span class="author-name">${escapeHtml(author)}${author === me ? "（你）" : ""}</span>
          <span class="meta">${timeAgo(latest.at)} · 共 ${items.length} 句</span>
        </div>
        <p class="latest">${escapeHtml(latest.text)}</p>
        ${
          older.length
            ? `<div class="history">${older
                .map((item) => `<p>${escapeHtml(item.text)} <span class="meta">${timeAgo(item.at)}</span></p>`)
                .join("")}</div>`
            : ""
        }
      </article>`;
    })
    .join("");
}

function timeAgo(at) {
  const delta = Date.now() - at;
  if (delta < 60000) return "剛剛";
  if (delta < 3600000) return `${Math.floor(delta / 60000)} 分鐘前`;
  if (delta < 86400000) return `${Math.floor(delta / 3600000)} 小時前`;
  return new Date(at).toLocaleString("zh-Hant");
}

function paintClassroomLive() {
  const word = currentWord("sentenceIndex");
  const wall = document.getElementById("sentenceWall");
  if (word && wall) wall.innerHTML = wallHtml(word.id);
  const presence = document.getElementById("presenceList");
  if (presence) presence.innerHTML = presenceHtml(Classroom.onlineNames());
  const status = document.querySelector(".share-status");
  if (Classroom.status) {
    if (status) status.textContent = Classroom.status;
  }
}

function compoundHtml() {
  const word = currentWord("compoundIndex");
  if (!word) return emptyPractice();
  const chars = uniqueChars(word.word);
  if (!state.compoundChar && chars[0]) state.compoundChar = chars[0];
  return `
    <header class="top">
      <div>
        <h2>組詞造字</h2>
        <p>選一個字，再組出別的詞。例如從「練」可以組出「練習、鍛鍊、熟練」。</p>
      </div>
      <select id="compoundSelect">${state.words
        .map(
          (w, i) =>
            `<option value="${i}" ${i === state.compoundIndex ? "selected" : ""}>${escapeHtml(w.word)}</option>`
        )
        .join("")}</select>
    </header>
    <section class="panel">
      <p class="practice-word">${escapeHtml(word.word)}</p>
      <p class="hint">點下面的字，開始組詞</p>
      <div class="chars">
        ${
          chars.length
            ? chars
                .map(
                  (ch) =>
                    `<button class="char-btn ${state.compoundChar === ch ? "on" : ""}" data-char="${escapeHtml(ch)}" type="button">${escapeHtml(ch)}</button>`
                )
                .join("")
            : `<p class="hint">這個單字沒有漢字，可以直接在下面輸入相關詞。</p>`
        }
      </div>
      <form id="compoundForm">
        <label>用「${escapeHtml(state.compoundChar || "這個字")}」組一個詞
          <input id="compoundDraft" value="${escapeHtml(state.compoundDraft)}" placeholder="${escapeHtml(state.compoundChar || "")}…">
        </label>
        <button class="primary" type="submit">加入組詞</button>
      </form>
      ${
        (word.compounds || []).length
          ? `<div class="saved-list">${word.compounds
              .map((c) => `<span>${escapeHtml(c.char)} → ${escapeHtml(c.word)}</span>`)
              .join("")}</div>`
          : ""
      }
    </section>
  `;
}

function ensureQuiz() {
  if (state.words.length < 2) {
    state.quiz = null;
    return;
  }
  if (state.quiz) return;
  makeQuestion();
}

function makeQuestion() {
  const answer = state.words[Math.floor(Math.random() * state.words.length)];
  const others = state.words
    .filter((w) => w.id !== answer.id)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);
  const choices = [...others, answer].sort(() => Math.random() - 0.5);
  state.quiz = { answer, choices, picked: "" };
}

function quizHtml() {
  ensureQuiz();
  if (state.words.length < 2) {
    return `<div class="panel empty"><h2>小考</h2><p>至少先加入 2 個單字，才能開始選擇題。</p></div>`;
  }
  const q = state.quiz;
  return `
    <header class="top">
      <div>
        <h2>小考</h2>
        <p>看意思，選出正確的單字。</p>
      </div>
      <p class="score">${state.score.right}/${state.score.total}</p>
    </header>
    <section class="panel">
      <p class="hint">這個意思是？</p>
      <p class="practice-word" style="font-size:28px">${escapeHtml(q.answer.meaning)}</p>
      ${q.choices
        .map((choice) => {
          let cls = "quiz-choice";
          if (q.picked && choice.id === q.answer.id) cls += " correct";
          else if (q.picked === choice.id) cls += " wrong";
          return `<button class="${cls}" data-choice="${choice.id}">${escapeHtml(choice.word)}${
            choice.pinyin ? ` · ${escapeHtml(choice.pinyin)}` : ""
          }</button>`;
        })
        .join("")}
      ${q.picked ? `<div class="row"><button class="primary" id="nextQuiz">下一題</button></div>` : ""}
    </section>
  `;
}

function bindViewEvents() {
  document.querySelectorAll("[data-view]").forEach((btn) => {
    btn.onclick = () => {
      state.view = btn.dataset.view;
      if (state.view === "sentence") {
        Classroom.startLoop(() => paintClassroomLive());
      } else {
        Classroom.stopLoop();
      }
      render();
    };
  });

  const search = document.getElementById("searchInput");
  if (search) {
    search.oninput = () => {
      state.query = search.value;
      render();
      const again = document.getElementById("searchInput");
      if (again) {
        again.focus();
        again.setSelectionRange(again.value.length, again.value.length);
      }
    };
  }

  const addBtn = document.getElementById("addBtn");
  if (addBtn) addBtn.onclick = () => {
    state.showForm = true;
    state.editingId = null;
    state.form = emptyForm();
    render();
  };

  const cancel = document.getElementById("cancelForm");
  if (cancel) cancel.onclick = () => {
    state.showForm = false;
    state.editingId = null;
    state.form = emptyForm();
    render();
  };

  const form = document.getElementById("wordForm");
  if (form) {
    form.onsubmit = (event) => {
      event.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());
      data.word = data.word.trim();
      data.meaning = data.meaning.trim();
      if (!data.word || !data.meaning) return;
      if (state.editingId) {
        state.words = state.words.map((w) =>
          w.id === state.editingId ? { ...w, ...data } : w
        );
      } else {
        state.words.unshift({
          id: newId(),
          sentences: [],
          compounds: [],
          known: false,
          ...data,
        });
      }
      state.showForm = false;
      state.editingId = null;
      state.form = emptyForm();
      saveWords();
      render();
    };
  }

  document.querySelectorAll("[data-edit]").forEach((btn) => {
    btn.onclick = () => {
      const word = state.words.find((w) => w.id === btn.dataset.edit);
      state.editingId = word.id;
      state.form = {
        word: word.word,
        pinyin: word.pinyin || "",
        pos: word.pos || "",
        meaning: word.meaning || "",
        example: word.example || "",
        lesson: word.lesson || "",
      };
      state.showForm = true;
      render();
    };
  });

  document.querySelectorAll("[data-remove]").forEach((btn) => {
    btn.onclick = () => {
      if (!confirm("確定要刪掉這個單字嗎？")) return;
      state.words = state.words.filter((w) => w.id !== btn.dataset.remove);
      saveWords();
      render();
    };
  });

  const flash = document.getElementById("flashCard");
  if (flash) flash.onclick = () => {
    state.flipped = !state.flipped;
    render();
  };

  document.querySelectorAll("[data-card]").forEach((btn) => {
    btn.onclick = () => {
      const action = btn.dataset.card;
      const word = currentWord("cardIndex");
      if (action === "prev") state.cardIndex = (state.cardIndex - 1 + state.words.length) % state.words.length;
      if (action === "next") state.cardIndex = (state.cardIndex + 1) % state.words.length;
      if (action === "again" && word) {
        word.known = false;
        saveWords();
        state.cardIndex = (state.cardIndex + 1) % state.words.length;
      }
      if (action === "known" && word) {
        word.known = true;
        saveWords();
        state.cardIndex = (state.cardIndex + 1) % state.words.length;
      }
      state.flipped = false;
      render();
    };
  });

  const sentenceSelect = document.getElementById("sentenceSelect");
  if (sentenceSelect) {
    sentenceSelect.onchange = () => {
      state.sentenceIndex = Number(sentenceSelect.value);
      state.sentenceDraft = "";
      render();
    };
  }

  const draftBox = document.getElementById("sentenceDraft");
  if (draftBox) {
    draftBox.oninput = () => {
      state.sentenceDraft = draftBox.value;
    };
  }

  const nameForm = document.getElementById("nameForm");
  if (nameForm) {
    nameForm.onsubmit = (event) => {
      event.preventDefault();
      const value = document.getElementById("displayNameInput").value.trim();
      if (!value) return;
      Classroom.setDisplayName(value);
      render();
    };
  }

  const createRoomBtn = document.getElementById("createRoomBtn");
  if (createRoomBtn) {
    createRoomBtn.onclick = async () => {
      createRoomBtn.disabled = true;
      createRoomBtn.textContent = "建立中…";
      try {
        await Classroom.createRoom();
        Classroom.startLoop(() => paintClassroomLive());
        render();
      } catch {
        alert("教室暫時建立失敗。請重新整理頁面後再試一次。");
        createRoomBtn.disabled = false;
        createRoomBtn.textContent = "建立教室";
      }
    };
  }

  const joinRoomForm = document.getElementById("joinRoomForm");
  if (joinRoomForm) {
    joinRoomForm.onsubmit = (event) => {
      event.preventDefault();
      const raw = document.getElementById("joinRoomInput").value.trim();
      if (!raw) return;
      let id = raw;
      try {
        const url = new URL(raw);
        id = url.searchParams.get("room") || raw.split("/").filter(Boolean).pop();
      } catch {
        /* plain room id */
      }
      Classroom.joinRoom(id);
      Classroom.startLoop(() => paintClassroomLive());
      render();
    };
  }

  const copyRoomLink = document.getElementById("copyRoomLink");
  if (copyRoomLink) {
    copyRoomLink.onclick = async () => {
      try {
        await navigator.clipboard.writeText(Classroom.shareLink());
        copyRoomLink.textContent = "已複製";
        setTimeout(() => {
          copyRoomLink.textContent = "複製連結";
        }, 1500);
      } catch {
        alert("請手動複製教室連結。");
      }
    };
  }

  const sentenceForm = document.getElementById("sentenceForm");
  if (sentenceForm) {
    sentenceForm.onsubmit = async (event) => {
      event.preventDefault();
      const text = document.getElementById("sentenceDraft").value.trim();
      const name = Classroom.displayName();
      if (!text) return;
      if (!name) {
        alert("請先填你的名字，大家才知道這句是誰寫的。");
        return;
      }
      if (!Classroom.roomId) {
        alert("請先建立或加入教室。");
        return;
      }
      const word = currentWord("sentenceIndex");
      word.sentences = [...(word.sentences || []), text];
      saveWords();
      state.sentenceDraft = "";
      const entry = {
        id: newId(),
        wordId: word.id,
        word: word.word,
        author: name,
        text,
        at: Date.now(),
      };
      await Classroom.append(entry);
      render();
    };
  }

  document.querySelectorAll("[data-sent]").forEach((btn) => {
    btn.onclick = () => {
      state.sentenceDraft = "";
      if (btn.dataset.sent === "prev") {
        state.sentenceIndex = (state.sentenceIndex - 1 + state.words.length) % state.words.length;
      } else {
        state.sentenceIndex = (state.sentenceIndex + 1) % state.words.length;
      }
      render();
    };
  });

  const compoundSelect = document.getElementById("compoundSelect");
  if (compoundSelect) {
    compoundSelect.onchange = () => {
      state.compoundIndex = Number(compoundSelect.value);
      state.compoundDraft = "";
      const word = currentWord("compoundIndex");
      state.compoundChar = uniqueChars(word.word)[0] || "";
      render();
    };
  }

  document.querySelectorAll("[data-char]").forEach((btn) => {
    btn.onclick = () => {
      state.compoundChar = btn.dataset.char;
      render();
    };
  });

  const compoundForm = document.getElementById("compoundForm");
  if (compoundForm) {
    compoundForm.onsubmit = (event) => {
      event.preventDefault();
      const text = document.getElementById("compoundDraft").value.trim();
      if (!text) return;
      if (state.compoundChar && !text.includes(state.compoundChar)) {
        alert(`這個詞要包含「${state.compoundChar}」。`);
        return;
      }
      const word = currentWord("compoundIndex");
      word.compounds = [...(word.compounds || []), { char: state.compoundChar, word: text }];
      state.compoundDraft = "";
      saveWords();
      render();
    };
  }

  document.querySelectorAll("[data-choice]").forEach((btn) => {
    btn.onclick = () => {
      if (state.quiz.picked) return;
      state.quiz.picked = btn.dataset.choice;
      state.score.total += 1;
      if (btn.dataset.choice === state.quiz.answer.id) state.score.right += 1;
      render();
    };
  });

  const nextQuiz = document.getElementById("nextQuiz");
  if (nextQuiz) {
    nextQuiz.onclick = () => {
      makeQuestion();
      render();
    };
  }
}

document.getElementById("exportBtn").onclick = () => {
  const blob = new Blob([JSON.stringify(state.words, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "3180class-vocab.json";
  a.click();
  URL.revokeObjectURL(url);
};

document.getElementById("importInput").onchange = (event) => {
  const file = event.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(String(reader.result));
      if (!Array.isArray(parsed)) throw new Error("not array");
      state.words = parsed;
      saveWords();
      render();
    } catch {
      alert("這個檔案不是有效的單字 JSON。");
    }
  };
  reader.readAsText(file);
  event.target.value = "";
};

render();
if (state.view === "sentence" && Classroom.roomId) {
  Classroom.startLoop(() => paintClassroomLive());
}
