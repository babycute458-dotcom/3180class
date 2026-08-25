import { getStore } from "@netlify/blobs";
import { randomUUID } from "node:crypto";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET,POST,PUT,OPTIONS",
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...cors,
    },
  });
}

function emptyRoom() {
  return { sentences: [], presence: {} };
}

function roomIdFromUrl(url) {
  const parts = url.pathname.replace(/\/+$/, "").split("/").filter(Boolean);
  // /api/room or /.netlify/functions/classroom
  const idx = parts.findIndex((p) => p === "room" || p === "classroom");
  if (idx >= 0 && parts[idx + 1]) return parts[idx + 1];
  return url.searchParams.get("id") || "";
}

function mergeRoom(remote, extras = []) {
  const byId = new Map();
  for (const item of remote.sentences || []) byId.set(item.id, item);
  for (const item of extras) byId.set(item.id, item);
  return {
    sentences: [...byId.values()].sort((a, b) => (a.at || 0) - (b.at || 0)),
    presence: remote.presence && typeof remote.presence === "object" ? remote.presence : {},
  };
}

export default async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("", { status: 204, headers: cors });
  }

  const url = new URL(req.url);
  const store = getStore("classrooms");

  try {
    if (req.method === "POST") {
      const id = randomUUID();
      const room = emptyRoom();
      await store.setJSON(id, room);
      return json({ id, ...room }, 201);
    }

    const id = roomIdFromUrl(url);
    if (!id) return json({ error: "missing-room-id" }, 400);

    if (req.method === "GET") {
      const room = await store.get(id, { type: "json" });
      if (!room) return json({ error: "not-found" }, 404);
      return json({
        sentences: Array.isArray(room.sentences) ? room.sentences : [],
        presence: room.presence && typeof room.presence === "object" ? room.presence : {},
      });
    }

    if (req.method === "PUT") {
      const body = await req.json().catch(() => ({}));
      const current = (await store.get(id, { type: "json" })) || emptyRoom();
      const incoming = {
        sentences: Array.isArray(body.sentences) ? body.sentences : [],
        presence: body.presence && typeof body.presence === "object" ? body.presence : {},
      };
      const next = mergeRoom(
        {
          sentences: current.sentences || [],
          presence: { ...(current.presence || {}), ...incoming.presence },
        },
        incoming.sentences
      );
      await store.setJSON(id, next);
      return json(next);
    }

    return json({ error: "method-not-allowed" }, 405);
  } catch (error) {
    return json({ error: "server-error", detail: String(error?.message || error) }, 500);
  }
};

export const config = {
  path: ["/api/room", "/api/room/*"],
};
