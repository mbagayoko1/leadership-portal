// Shared helpers for the quizzes (module quizzes and the Polish Your English
// practice quiz). A question is a plain object:
//   { label, prompt?, promptLang?, hint?, answer, opts, optsLang?, wide?,
//     explain, link?, review: { title, text, lang? } }
// QuizRunner.jsx displays any list of these.

export const shuffle = a => { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
export const fill = (s, o) => Object.entries(o).reduce((x, [k, v]) => x.replace("{" + k + "}", v), s);
export const bolds = ex => [...ex.matchAll(/\*\*(.+?)\*\*/g)].map(m => m[1]);
export const blank = ex => ex.replace(/\*\*(.+?)\*\*/, "_____");
export const QUIZ_LENGTH = 10;

// The correct answer plus up to three different distractors, taken first
// from `near` (same group or module, so they are plausible), then `far`.
export function options(answer, near, far = []) {
  const pick = [];
  for (const x of [...shuffle(near), ...shuffle(far)]) { if (x && x !== answer && !pick.includes(x)) pick.push(x); if (pick.length === 3) break; }
  return shuffle([answer, ...pick]);
}

// Take questions from each type in turn, so every quiz is varied.
export function mix(byType, n = QUIZ_LENGTH) {
  const queues = Object.values(byType).map(shuffle), out = [];
  while (out.length < n && queues.some(q => q.length)) for (const q of queues) if (q.length && out.length < n) out.push(q.shift());
  return shuffle(out);
}

// Module quiz (see ModuleQuiz.jsx): ten questions from one module guide.
const term = w => w.replace(/\s*\([^)]*\)\s*$/, "");
// Origin distractors: one source per author, never the answer's author
// ("Barbara Minto" and "Barbara Minto, The Pyramid Principle" are one author).
const author = src => src.replace(/^(Adapted from|D'après)\s+/i, "").split(/[,(;]/)[0].trim();
function otherAuthors(answer, sources) {
  const seen = new Set([author(answer)]), out = [];
  for (const s of shuffle(sources)) if (!seen.has(author(s))) { seen.add(author(s)); out.push(s); }
  return out;
}

export function buildModuleQuiz(g, all, k) {
  const names = g.concepts.map(c => c.n);
  const vocab = g.vocab || [];
  const words = vocab.map(v => term(v.w));
  const gapForms = vocab.map(v => bolds(v.ex)).filter(b => b.length === 1).map(b => b[0]);
  const sources = [...new Set(Object.values(all).flatMap(x => x.concepts.map(c => c.src)).filter(Boolean))];
  const byType = { concept: [], vocab: [], mistake: [], gap: [], example: [], origin: [] };
  for (const c of g.concepts) {
    const review = { title: c.n, text: c.d };
    byType.concept.push({ label: k.conceptQ, prompt: c.d, answer: c.n, opts: options(c.n, names), explain: c.n + ": " + c.why, review });
    byType.mistake.push({ label: k.mistakeQ, prompt: c.miss, answer: c.n, opts: options(c.n, names), explain: c.n + ": " + c.d, review });
    if (c.src) byType.origin.push({ label: k.originQ, prompt: c.n, answer: c.src, opts: options(c.src, otherAuthors(c.src, sources)), wide: true, explain: c.n + ": " + c.src, review: { title: c.n, text: c.src } });
  }
  for (const v of vocab) {
    const w = term(v.w), review = { title: w, text: v.d };
    const explain = w + ": " + v.d + (v.warn ? " " + v.warn : "");
    byType.vocab.push({ label: k.vocabQ, prompt: v.d, answer: w, opts: options(w, words), explain, review });
    const b = bolds(v.ex);
    if (b.length === 1) byType.gap.push({ label: k.gapQ, prompt: blank(v.ex), hint: v.d, answer: b[0], opts: options(b[0], gapForms), explain, review });
  }
  for (const x of g.examples) {
    byType.example.push({ label: k.exampleQ, prompt: x.t + ". " + x.scene, answer: x.better, opts: shuffle([x.first, x.better]), wide: true, explain: x.changes.join(" "), review: { title: x.t, text: x.changes[0] } });
  }
  return mix(byType);
}
