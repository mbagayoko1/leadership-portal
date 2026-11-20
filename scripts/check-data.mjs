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
import GUIDES_EN from "../src/guides/en.js";
import GUIDES_FR from "../src/guides/fr.js";
import { GUIDE_IDS } from "../src/guides/ids.js";
import EN_VIDEOS from "../src/englishVideos.js";
import { THEMES as EN_THEMES, PLAN as EN_PLAN, CONCEPT_VIDEOS as EN_CONCEPT_VIDEOS } from "../src/englishLibrary.js";
import WORDBANK from "../src/guides/wordbank.js";
import SPOT from "../src/guides/englishQuiz.js";
import FR_VIDEOS from "../src/frenchVideos.js";
import { FR_THEMES, FR_PLAN, FR_CONCEPT_VIDEOS } from "../src/frenchLibrary.js";
import WORDBANK_FR from "../src/guides/wordbank-fr.js";
import SPOT_FR from "../src/guides/frenchQuiz.js";
import { buildModuleQuiz } from "../src/quiz.js";
import { STR as QUIZ_STR } from "../src/i18n.js";
import VOCAB_EN from "../src/guides/vocab-en.js";
import VOCAB_FR from "../src/guides/vocab-fr.js";
import fs from "fs";

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
  for (const d of s.downloads || []) if (!fs.existsSync(new URL("../public/" + d.file, import.meta.url))) p("download missing (run npm run pdf:money)", s.id, d.file);
}
COMPETENCIES.forEach(c => { if (!c.overview.fr) p("competency without FR", c.id); });
SPEECHES.forEach(s => { if (!s.text || !s.text.en || !s.text.fr) p("speech without EN/FR text", s.id); });
LIBRARY.forEach(g => g.items.forEach(x => { if (!x.u || !x.d || !x.d.fr) p("library item incomplete", x.t); }));

// Module guides: every listed module in both languages, with the same
// number of outcomes, concepts, worked examples (five each), steps and
// reflections.
for (const id of GUIDE_IDS) {
  const e = GUIDES_EN[id], f = GUIDES_FR[id];
  if (!e || !f) { p("module guide missing", id, !e ? "EN" : "FR"); continue; }
  for (const g of [e, f]) {
    if (!g.def || !g.template) p("module guide incomplete", id);
    if (!g.examples || g.examples.length !== 5) p("guide", id, "should have 5 worked examples");
    for (const x of g.examples || []) if (!x.t || !x.scene || !x.first || !x.better || !(x.changes || []).length) p("guide example incomplete", id, x.t || "?");
    for (const c of g.concepts) if (!c.n || !c.d || !c.why || !c.miss) p("guide concept incomplete", id, c.n || "?");
    for (const c of g.concepts) for (const x of c.pw || []) if (!x || !x.t || !/^https:\/\//.test(x.u || "")) p("guide concept practice link broken", id, c.n);
    for (const s of g.steps) if (!s.do || !s.how || !s.time || !s.done) p("guide step incomplete", id, s.do || "?");
  }
  for (const k of ["outcomes", "concepts", "steps", "reflect"]) if (e[k].length !== f[k].length) p("guide", id, k, "EN/FR differ");
  if (e.examples.length !== f.examples.length) p("guide", id, "examples EN/FR differ");
  else e.examples.forEach((x, i) => { if (x.changes.length !== f.examples[i].changes.length) p("guide", id, "example", i + 1, "changes EN/FR differ"); });
  e.concepts.forEach((c, i) => { if (!!c.src !== !!(f.concepts[i] && f.concepts[i].src)) p("guide", id, "concept", i + 1, "origin in one language only"); });
  e.concepts.forEach((c, i) => { const fp = (f.concepts[i] || {}).pw || []; if ((c.pw || []).map(x => x && x.u).join() !== fp.map(x => x && x.u).join()) p("guide", id, "concept", i + 1, "practice links differ EN/FR"); });
}
// Vocabulary: eight complete terms per module in both languages, with the
// term in **bold** in its example.
for (const id of GUIDE_IDS) {
  const e = VOCAB_EN[id] || [], f = VOCAB_FR[id] || [];
  if (e.length !== 8 || f.length !== 8) p("vocabulary", id, "should have 8 terms in EN and FR, has", e.length, "/", f.length);
  for (const v of [...e, ...f]) {
    if (!v.w || !v.d || !v.ex) p("vocabulary entry incomplete", id, v.w || "?");
    else if (!/\*\*.+?\*\*/.test(v.ex)) p("vocabulary example without **term**", id, v.w);
  }
}
const vocabTerms = Object.values(VOCAB_EN).flat().map(v => v.w.toLowerCase());
vocabTerms.filter((x, i) => vocabTerms.indexOf(x) !== i).forEach(x => p("duplicate vocabulary term", x));

Object.keys(GUIDES_EN).filter(x => !GUIDE_IDS.includes(x)).forEach(x => p("module guide not listed in GUIDE_IDS", x));

// Module quizzes: every guide module yields ten valid questions in each
// language (answer among the options, options unique, at least two).
for (const [lang, guides] of [["en", GUIDES_EN], ["fr", GUIDES_FR]]) for (const id of GUIDE_IDS) {
  const qs = buildModuleQuiz(guides[id], guides, QUIZ_STR[lang].quiz);
  if (qs.length !== 10) p("module quiz", id, lang, "has", qs.length, "questions");
  for (const q of qs) if (!q.label || !q.opts.includes(q.answer) || new Set(q.opts).size !== q.opts.length || q.opts.length < 2) p("module quiz", id, lang, "bad question", q.prompt);
}

// Language modules (eng, fra): every video referenced by the eight-week
// path, the concept links and the word bank exists in the generated library;
// every theme has videos; word-bank entries are complete in both languages;
// word-bank group keys are unique across modules (they key "learned" ticks).
{
  const LANG = { eng: { videos: EN_VIDEOS, themes: EN_THEMES, plan: EN_PLAN, concepts: EN_CONCEPT_VIDEOS, bank: WORDBANK, spot: SPOT },
                 fra: { videos: FR_VIDEOS, themes: FR_THEMES, plan: FR_PLAN, concepts: FR_CONCEPT_VIDEOS, bank: WORDBANK_FR, spot: SPOT_FR } };
  const groupKeys = new Set();
  for (const [mod, L] of Object.entries(LANG)) {
    const all = Object.values(L.videos).flat();
    const ids = new Set(all.map(v => v.id));
    if (ids.size !== all.length) p(mod, "library: a video appears in two themes");
    for (const th of L.themes) if (!(L.videos[th.k] || []).length) p(mod, "library: empty theme", th.k);
    Object.keys(L.videos).filter(x => !L.themes.some(th => th.k === x)).forEach(x => p(mod, "library: theme without a name", x));
    const need = (id, where) => { if (!ids.has(id)) p(mod, "library: unknown video", id, "in", where); };
    L.plan.forEach((w, i) => { w.v.forEach(id => need(id, "week " + (i + 1))); if (!w.f[1] || !w.task[1]) p(mod, "eight-week path: week", i + 1, "without French"); });
    L.concepts.forEach((l, i) => l.forEach(id => need(id, "concept " + (i + 1))));
    const seen = new Set();
    for (const g of L.bank) {
      if (groupKeys.has(g.k)) p("word bank group key used twice:", g.k); groupKeys.add(g.k);
      if (!L.themes.some(th => th.k === g.theme)) p(mod, "word bank group", g.k, "has unknown theme", g.theme);
      if (!g.t || !g.t[0] || !g.t[1] || !g.i || !g.i[1]) p(mod, "word bank group", g.k, "without both languages");
      (g.v || []).forEach(id => need(id, "word bank group " + g.k));
      for (const e of g.e) {
        const key = g.k + ":" + e.w;
        if (seen.has(key)) p(mod, "word bank: duplicate", key); seen.add(key);
        if (!e.w || !e.d || !e.d[0] || !e.d[1] || !e.ex) p(mod, "word bank entry incomplete", key);
        else if (!/\*\*.+?\*\*/.test(e.ex)) p(mod, "word bank example without **term**", key);
        if (e.tip && (!e.tip[0] || !e.tip[1])) p(mod, "word bank tip without both languages", key);
        if (e.v) need(e.v, key);
      }
    }
    for (const it of L.spot) {
      if (!it.ok || !it.bad || it.ok === it.bad || !it.why || !it.why[0] || !it.why[1]) p(mod, "quiz item incomplete", it.ok || "?");
      if (it.g && !L.bank.some(g => g.k === it.g)) p(mod, "quiz item has unknown group", it.g);
    }
  }
}

const quotes = SPEAKERS.reduce((n, s) => n + s.quotes.length, 0);
console.log(`i18n ${en.length}/${fr.length} keys · ${SPEAKERS.length} voices · ${quotes} quotes · ${SPEECHES.length} speeches · ${LIBRARY.reduce((n, g) => n + g.items.length, 0)} library items`);
if (problems.length) { console.log(problems.length + " problems"); problems.forEach(x => console.log(" -", x)); process.exit(1); }
console.log("no problems");
