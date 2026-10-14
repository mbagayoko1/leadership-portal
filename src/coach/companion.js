// "Leadership companion" for the AI Coach: the prompt text, portal link
// tokens, and speech-delivery measurements.
//
// The host page supplies a portal map (see portalContext.js) listing every
// valid link target. The model writes [[open:<target>]] tokens; the chat
// turns them into buttons, and speech output skips them.

/* ---------------- prompt ---------------- */

export const COMPANION_INSTR = [
  "You are this participant's leadership companion inside the portal. You can see the portal's content and their progress in the portal map below. In each reply, do the one thing that helps most right now:",
  "- Navigate: when a module, competency or tab in the portal fits what they need, name it and add a link to it.",
  "- Suggest: propose a concrete next step that fits their progress, goals and next checkpoint. Prefer their next unfinished module to jumping ahead, unless they have a real situation coming up that another module serves better.",
  "- Practise: invite short spoken rounds, such as a 30-second briefing, the opening line of a presentation, or an answer to a tough question from a minister or donor. After they speak, give feedback on content first, then delivery, then wording, and ask them to try again with one change.",
  "- Voice: when speech data is attached, give one specific delivery tip about pace, fillers, pauses or sentence length, with a quick drill. Use the portal's vocal targets: 140 to 160 words per minute, at least one pause every three sentences, no fillers.",
  "- Vocabulary: when their wording is vague, hedging, too informal or too technical for the audience, offer one or two stronger phrasings suited to UN, government and donor settings, and say why they land better. When it helps, give the equivalent term in the other working language (English or French).",
  "If you do not yet know what they are working on, ask. Keep each reply to one main point; they can always ask for more."
].join("\n");

// Added to every session type, so any coach conversation can link into the
// portal and read speech data correctly.
export const PORTAL_RULES = [
  "Portal links: to send the participant to part of the portal, put a link token on its own line, for example [[open:module:m3]]. The portal shows it as a button. Use only targets that appear in square brackets in the portal map, at most two per reply, and only when the destination clearly helps. You may mention well-known resources that are not in the portal, but say they are outside the portal and do not make up links or details for them.",
  "Speech data: some participant messages end with a note in parentheses that starts with \"Speech data\". The portal adds it when the participant speaks instead of typing; it is a measurement, not their words, so never quote it as something they said. Speech recognition often drops hesitations such as \"um\", so treat filler counts as a minimum. Comment on delivery only in the leadership companion session type, or when the participant asks how they sound."
].join("\n\n");

export const LIVE_LINK_RULE = "Link tokens are shown on screen after the call and are not read aloud. You may still add one when a destination in the portal clearly helps.";

/* ---------------- link tokens ---------------- */

const NAV_SRC = "\\[\\[open:([a-z]+:[A-Za-z0-9_-]+)\\]\\]";

export function stripNav(text) {
  return String(text || "")
    .replace(new RegExp("^[ \\t]*" + NAV_SRC + "[ \\t]*(\\n|$)", "gm"), "")
    .replace(new RegExp(NAV_SRC, "g"), "")
    .replace(/ {2,}/g, " ")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function navTargets(text) {
  const out = [];
  const re = new RegExp(NAV_SRC, "g");
  let m = re.exec(String(text || ""));
  while (m) {
    if (out.indexOf(m[1]) < 0) { out.push(m[1]); }
    m = re.exec(String(text || ""));
  }
  return out;
}

/* ---------------- speech delivery ---------------- */

// Conservative lists: words like "like" or "bon" are left out because they
// are usually not fillers.
const FILLERS = [
  "um", "uh", "er", "erm", "you know", "basically", "literally", "sort of", "kind of", "i mean",
  "euh", "heu", "ben", "bah", "en fait", "du coup", "voilà", "tu vois", "genre"
];

const FILLER_RES = FILLERS.map(function (f) {
  return { f: f, re: new RegExp("(^|[^\\p{L}])" + f.replace(/ /g, "\\s+") + "(?=$|[^\\p{L}])", "giu") };
});

export function speechMeta(text, seconds) {
  const clean = String(text || "").trim();
  const words = clean ? clean.split(/\s+/).length : 0;
  const secs = Math.max(0, Math.round(seconds * 10) / 10);
  const fillers = {};
  FILLER_RES.forEach(function (x) {
    const n = (clean.match(x.re) || []).length;
    if (n) { fillers[x.f] = n; }
  });
  return { words: words, secs: secs, fillers: fillers };
}

export function mergeSpeech(list) {
  const total = { words: 0, secs: 0, fillers: {}, count: 0 };
  list.forEach(function (s) {
    if (!s) { return; }
    total.count += 1;
    total.words += s.words;
    total.secs += s.secs;
    Object.keys(s.fillers).forEach(function (f) { total.fillers[f] = (total.fillers[f] || 0) + s.fillers[f]; });
  });
  total.secs = Math.round(total.secs * 10) / 10;
  return total;
}

function describe(s) {
  const pace = s.secs >= 4
    ? s.words + " words in " + s.secs + " s (about " + Math.round(s.words / s.secs * 60) + " words per minute)"
    : s.words + " words, too short to measure pace";
  const f = Object.keys(s.fillers).map(function (k) { return "\"" + k + "\" x" + s.fillers[k]; });
  return pace + "; possible fillers: " + (f.length ? f.join(", ") : "none detected");
}

export function speechNote(s) {
  if (!s || !s.words) { return ""; }
  return "\n\n(Speech data, measured by the portal from browser speech recognition: " + describe(s) + ".)";
}

export function deliverySummary(list) {
  const t = mergeSpeech(list);
  if (!t.count) { return ""; }
  return "Delivery data from " + t.count + " spoken lines, measured by browser speech recognition (hesitations such as \"um\" are often not captured): " + describe(t) + ".";
}
