function applyReplacements(text, matches) {
  const sorted = [...matches]
    .filter((m) => Array.isArray(m.replacements) && m.replacements.length)
    .sort((a, b) => b.offset - a.offset);

  let result = text;
  for (const match of sorted) {
    const start = match.offset;
    const end = match.offset + match.length;
    const replacement = match.replacements[0]?.value;
    if (replacement == null) continue;
    result = result.slice(0, start) + replacement + result.slice(end);
  }
  return result;
}

function summarizeMatches(matches) {
  return matches.slice(0, 6).map((match) => ({
    message: match.message || "Possible issue",
    shortMessage: match.shortMessage || "",
    offset: match.offset,
    length: match.length,
    replacements: (match.replacements || []).slice(0, 3).map((r) => r.value),
  }));
}

export default async (req) => {
  const cors = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST,OPTIONS",
  };

  if (req.method === "OPTIONS") {
    return new Response("", { status: 204, headers: cors });
  }

  if (req.method !== "POST") {
    return Response.json({ error: "method-not-allowed" }, { status: 405, headers: cors });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const text = String(body.text || "").trim();
    const word = String(body.word || "").trim();
    if (!text) {
      return Response.json({ error: "missing-text" }, { status: 400, headers: cors });
    }
    if (text.length > 500) {
      return Response.json({ error: "too-long" }, { status: 400, headers: cors });
    }

    const params = new URLSearchParams();
    params.set("text", text);
    params.set("language", "en-US");
    params.set("enabledOnly", "false");

    const ltRes = await fetch("https://api.languagetool.org/v2/check", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });

    if (!ltRes.ok) {
      return Response.json(
        { error: "checker-unavailable", detail: `status ${ltRes.status}` },
        { status: 502, headers: cors }
      );
    }

    const data = await ltRes.json();
    const matches = Array.isArray(data.matches) ? data.matches : [];
    const corrected = applyReplacements(text, matches);
    const notes = summarizeMatches(matches);
    const unchanged = corrected.trim() === text.trim();

    let tip = "";
    if (word && !new RegExp(`\\b${word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i").test(text)) {
      tip = `這句好像還沒用到單字「${word}」。`;
    }

    return Response.json(
      {
        original: text,
        corrected,
        unchanged,
        notes,
        tip,
      },
      { headers: cors }
    );
  } catch (error) {
    return Response.json(
      { error: "server-error", detail: String(error?.message || error) },
      { status: 500, headers: cors }
    );
  }
};

export const config = {
  path: "/api/check-sentence",
};
