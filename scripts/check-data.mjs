// Content checks: EN/FR parity, quote sources and translations, duplicate ids
// and references. Run: npm run check:data
import { STR } from "../src/i18n.js";
import { SPEAKERS, PD_PLAN } from "../src/development.js";
import { CI, SM, TC } from "../src/data.js";
import { COMPETENCIES } from "../src/competencies.js";
import { SKILLS } from "../src/skills.js";
import { MONEY } from "../src/money.js";
import { SPEECHES } from "../src/speeches.js";
import { LIBRARY } from "../src/library.js";

const problems = [];
const p = (...a) => problems.push(a.join(" "));

// Interface strings must exist in both languages.
const keys = o => Object.entries(o).flatMap(([k, v]) => v && typeof v === "object" && !Array.isArray(v) ? keys(v).map(x => k + "." + x) : [k]);
const en = keys(STR.en), fr = keys(STR.fr);
en.filter(x => !fr.includes(x)).forEach(x => p("i18n missing in FR:", x));
fr.filter(x => !en.includes(x)).forEach(x => p("i18n missing in EN:", x));

// Voices
const ids = SPEAKERS.map(s => s.id);
ids.filter((x, i) => ids.indexOf(x) !== i).forEach(x => p("duplicate voice id", x));
PD_PLAN.forEach(w => w.speakers.forEach(s => { if (!ids.includes(s)) p("plan refers to missing voice", s); }));
const seenQuote = new Map(), seenVideo = new Map();
for (const s of SPEAKERS) {
  for (const f of ["role", "theme", "practice"]) if (!s[f] || !s[f].en || !s[f].fr) p("voice", s.id, "missing", f);
  if (!s.ideas || s.ideas.en.length !== s.ideas.fr.length) p("voice", s.id, "ideas EN/FR differ");
  for (const q of s.quotes || []) {
    if (!q.text) p("empty quote", s.id);
    if (!q.source) p("quote without source", s.id, q.text.slice(0, 40));
    if (!q.fr) p("quote without FR", s.id, q.text.slice(0, 40));
    const k = q.text.toLowerCase();
    if (seenQuote.has(k)) p("duplicate quote", s.id, "and", seenQuote.get(k), q.text.slice(0, 40));
    seenQuote.set(k, s.id);
  }
  for (const v of s.vids || []) {
    if (!v.u || !v.t) p("video without url or title", s.id);
    if (seenVideo.has(v.u)) p("duplicate video", s.id, "and", seenVideo.get(v.u));
    seenVideo.set(v.u, s.id);
  }
}

// Modules
for (const m of [...CI, ...SM]) for (const g of ["vids", "arts"]) for (const x of m[g] || []) {
  if (!x.u) p("module", m.id, g, "without url", JSON.stringify(x).slice(0, 50));
  if (x.g && !TC[x.g]) p("module", m.id, "unknown tag", x.g);
}

// Skill modules, competencies, speeches, library
const skillModules = [...SKILLS, ...(SKILLS.some(s => s.id === MONEY.id) ? [] : [MONEY])];
for (const s of skillModules) {
  for (const q of s.quotes) { if (!q.source && !q.by) p("skill quote without source", s.id); if (!q.fr) p("skill quote without FR", s.id); }
  for (const r of s.resources) if (!r.u && r.kind !== "book") p("skill resource without url", s.id, r.t);
}
COMPETENCIES.forEach(c => { if (!c.overview.fr) p("competency without FR", c.id); });
SPEECHES.forEach(s => { if (!s.text || !s.text.en || !s.text.fr) p("speech without EN/FR text", s.id); });
LIBRARY.forEach(g => g.items.forEach(x => { if (!x.u || !x.d || !x.d.fr) p("library item incomplete", x.t); }));

const quotes = SPEAKERS.reduce((n, s) => n + s.quotes.length, 0);
console.log(`i18n ${en.length}/${fr.length} keys · ${SPEAKERS.length} voices · ${quotes} quotes · ${SPEECHES.length} speeches · ${LIBRARY.reduce((n, g) => n + g.items.length, 0)} library items`);
if (problems.length) { console.log(problems.length + " problems"); problems.forEach(x => console.log(" -", x)); process.exit(1); }
console.log("no problems");
