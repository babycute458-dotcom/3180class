const Classroom = {
  // Always use the Netlify site so GitHub Pages / old links still share rooms.
  api: "https://3180class.netlify.app/api/room",
  checkApi: "https://3180class.netlify.app/api/check-sentence",
  nameKey: "class3180.displayName",
  roomKey: "class3180.roomId.v3",
  cacheKey: "class3180.classroomCache.v3",
  pollMs: 3000,
  presenceMs: 45000,
  pending: [],
  roomId: "",
  data: { sentences: [], presence: {} },
  status: "",
  timer: null,
  paused: false,

  boot() {
    const params = new URLSearchParams(location.search);
    const fromUrl = (params.get("room") || "").trim();
    this.roomId = fromUrl || localStorage.getItem(this.roomKey) || "";
    if (fromUrl) localStorage.setItem(this.roomKey, fromUrl);
    const cached = localStorage.getItem(this.cacheKey);
    if (cached) {
      try {
        this.data = JSON.parse(cached);
      } catch {
        this.data = { sentences: [], presence: {} };
      }
    }
  },

  displayName() {
    return (localStorage.getItem(this.nameKey) || "").trim();
  },

  setDisplayName(name) {
    localStorage.setItem(this.nameKey, name.trim());
  },

  shareLink() {
    if (!this.roomId) return "";
    // Prefer the clean Netlify URL when sharing.
    const url = new URL("https://3180class.netlify.app/");
    url.searchParams.set("room", this.roomId);
    return url.toString();
  },

  clearRoom(message = "") {
    this.roomId = "";
    this.data = { sentences: [], presence: {} };
    this.pending = [];
    localStorage.removeItem(this.roomKey);
    localStorage.removeItem(this.cacheKey);
    const url = new URL(location.href);
    url.searchParams.delete("room");
    history.replaceState({}, "", url);
    this.status = message;
  },

  async createRoom() {
    const res = await fetch(this.api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ sentences: [], presence: {} }),
    });
    if (!res.ok) throw new Error("create-failed");
    const data = await res.json();
    if (!data.id) throw new Error("no-id");
    this.roomId = data.id;
    localStorage.setItem(this.roomKey, data.id);
    this.data = { sentences: [], presence: {} };
    this.pending = [];
    this.status = "";
    this.cache();
    this.writeRoomToUrl();
  },

  joinRoom(id) {
    this.roomId = id.trim();
    if (!this.roomId) return;
    localStorage.setItem(this.roomKey, this.roomId);
    this.status = "";
    this.writeRoomToUrl();
  },

  writeRoomToUrl() {
    if (!this.roomId) return;
    const url = new URL(location.href);
    url.searchParams.set("room", this.roomId);
    history.replaceState({}, "", url);
  },

  roomUrl() {
    return `${this.api}/${encodeURIComponent(this.roomId)}`;
  },

  cache() {
    localStorage.setItem(this.cacheKey, JSON.stringify(this.data));
  },

  merge(remote, extras) {
    const byId = new Map();
    for (const item of remote.sentences || []) byId.set(item.id, item);
    for (const item of extras || []) byId.set(item.id, item);
    const presence = { ...(remote.presence || {}) };
    const name = this.displayName();
    if (name) presence[name] = Date.now();
    return {
      sentences: [...byId.values()].sort((a, b) => a.at - b.at),
      presence,
    };
  },

  async getRemote() {
    const res = await fetch(this.roomUrl(), {
      headers: { Accept: "application/json" },
    });
    if (res.status === 404) {
      const err = new Error("not-found");
      err.code = "not-found";
      throw err;
    }
    if (!res.ok) throw new Error("get-failed");
    const data = await res.json();
    return {
      sentences: Array.isArray(data.sentences) ? data.sentences : [],
      presence: data.presence && typeof data.presence === "object" ? data.presence : {},
    };
  },

  async putRemote(data) {
    const res = await fetch(this.roomUrl(), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("put-failed");
  },

  async refresh() {
    if (!this.roomId) return;
    try {
      const remote = await this.getRemote();
      this.data = this.merge(remote, this.pending);
      this.cache();
      this.status = "";
    } catch (error) {
      if (error?.code === "not-found") {
        this.clearRoom("這個教室已失效，請重新按「建立教室」。");
        return;
      }
      this.status = "暫時連不上教室，請確認你開的是 https://3180class.netlify.app/";
    }
  },

  async saveFeedback(sentenceId, feedback) {
    if (!this.roomId) return;
    try {
      const remote = await this.getRemote();
      const sentences = (remote.sentences || []).map((item) =>
        item.id === sentenceId ? { ...item, feedback } : item
      );
      const next = {
        sentences,
        presence: this.merge(remote, this.pending).presence,
      };
      await this.putRemote(next);
      this.data = this.merge(next, this.pending);
      this.cache();
      this.status = "";
    } catch {
      this.status = "建議已顯示，但還沒同步到教室。";
      this.data.sentences = (this.data.sentences || []).map((item) =>
        item.id === sentenceId ? { ...item, feedback } : item
      );
      this.cache();
    }
  },

  async append(entry) {
    this.pending.push(entry);
    this.data = this.merge(this.data, this.pending);
    this.cache();
    for (let i = 0; i < 8; i += 1) {
      try {
        const remote = await this.getRemote();
        const next = this.merge(remote, this.pending);
        await this.putRemote(next);
        const verify = await this.getRemote();
        const ids = new Set(verify.sentences.map((item) => item.id));
        this.pending = this.pending.filter((item) => !ids.has(item.id));
        this.data = this.merge(verify, this.pending);
        this.cache();
        if (!this.pending.length) {
          this.status = "";
          return;
        }
      } catch (error) {
        if (error?.code === "not-found") {
          this.clearRoom("這個教室已失效，請重新按「建立教室」。");
          return;
        }
        this.status = "正在重試送出…";
      }
      await new Promise((resolve) => setTimeout(resolve, 250 * (i + 1)));
    }
    this.status = "這句先留在你的裝置，教室稍後會再試同步。";
  },

  sentencesFor(wordId) {
    return this.data.sentences.filter((item) => item.wordId === wordId);
  },

  groupedFor(wordId) {
    const groups = new Map();
    for (const item of this.sentencesFor(wordId)) {
      if (!groups.has(item.author)) groups.set(item.author, []);
      groups.get(item.author).push(item);
    }
    return [...groups.entries()].sort((a, b) => {
      const lastA = a[1][a[1].length - 1].at;
      const lastB = b[1][b[1].length - 1].at;
      return lastB - lastA;
    });
  },

  onlineNames() {
    const now = Date.now();
    const names = new Set();
    const me = this.displayName();
    if (me) names.add(me);
    for (const item of this.data.sentences || []) {
      if (now - item.at < this.presenceMs) names.add(item.author);
    }
    for (const [name, at] of Object.entries(this.data.presence || {})) {
      if (now - at < this.presenceMs) names.add(name);
    }
    return [...names];
  },

  startLoop(onTick) {
    this.stopLoop();
    const tick = async () => {
      if (this.paused) return;
      await this.refresh();
      if (this.paused) return;
      onTick();
    };
    tick();
    this.timer = setInterval(tick, this.pollMs);
  },

  pause() {
    this.paused = true;
  },

  resume() {
    this.paused = false;
  },

  stopLoop() {
    if (this.timer) clearInterval(this.timer);
    this.timer = null;
    this.paused = false;
  },
};

Classroom.boot();
