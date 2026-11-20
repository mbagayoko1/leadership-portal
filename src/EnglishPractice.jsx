// Practice games for the "Polish Your English" module, built from the word
// bank (src/guides/wordbank.js) and the "which sentence is correct?" items
// (src/guides/englishQuiz.js):
//  - Quiz: ten mixed questions (meaning → word, fill the gap, stressed
//    syllable, correct sentence), with feedback after each answer and a
//    review of missed items at the end.
//  - Word matching: match six words to their meanings, round after round.
// Both can use every group or one group. Nothing is saved; it is practice.
import { useState, useEffect, useMemo, useRef } from "react";
import { CircleHelp, Puzzle, Check, X, RotateCcw, ArrowLeft } from "lucide-react";
import { watchUrl } from "./englishLibrary.js";

const shuffle = a => { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
const fill = (s, o) => Object.entries(o).reduce((x, [k, v]) => x.replace("{" + k + "}", v), s);
const bolds = ex => [...ex.matchAll(/\*\*(.+?)\*\*/g)].map(m => m[1]);
const QUIZ_LENGTH = 10, PAIRS = 6;

// Correct answer plus up to three different distractors, shuffled.
function options(answer, near, far) {
  const pick = [];
  for (const x of [...shuffle(near), ...shuffle(far)]) { if (x !== answer && !pick.includes(x)) pick.push(x); if (pick.length === 3) break; }
  return shuffle([answer, ...pick]);
}

// "on-truh-pruh-NUR" → the same syllables with the stress moved, for a
// "which syllable is stressed?" question. Only simple one-word hints qualify.
function stressOptions(say) {
  if (!/^[a-zA-Z]+(-[a-zA-Z]+)+$/.test(say)) return null;
  const parts = say.split("-"), up = parts.map(p => p === p.toUpperCase());
  if (up.filter(Boolean).length !== 1) return null;
  const variant = i => parts.map((p, j) => j === i ? p.toUpperCase() : p.toLowerCase()).join("-");
  const correct = variant(up.indexOf(true));
  const others = shuffle(parts.map((_, i) => i).filter(i => !up[i])).slice(0, 3).map(variant);
  return { correct, opts: shuffle([correct, ...others]) };
}

function buildQuiz(groups, spot, gk, li) {
  const chosen = groups.filter(g => !gk || g.k === gk);
  const entries = chosen.flatMap(g => g.e.map(e => ({ ...e, g: g.k })));
  const all = groups.flatMap(g => g.e.map(e => ({ ...e, g: g.k })));
  const same = e => entries.filter(x => x.g === e.g);
  const byType = { meaning: [], gap: [], stress: [], spot: [] };
  for (const e of entries) {
    byType.meaning.push({ type: "meaning", e, prompt: e.d[li], answer: e.w, opts: options(e.w, same(e).map(x => x.w), all.map(x => x.w)) });
    const b = bolds(e.ex);
    if (b.length === 1) {
      const single = list => list.map(x => bolds(x.ex)).filter(x => x.length === 1).map(x => x[0]);
      byType.gap.push({ type: "gap", e, prompt: e.ex.replace(/\*\*(.+?)\*\*/, "_____"), hint: e.d[li], answer: b[0], opts: options(b[0], single(same(e)), single(all)) });
    }
    const s = e.say && stressOptions(e.say);
    if (s) byType.stress.push({ type: "stress", e, word: e.w, answer: s.correct, opts: s.opts });
  }
  for (const it of spot) if (!gk ? true : it.g === gk) byType.spot.push({ type: "spot", it, answer: it.ok, opts: shuffle([it.ok, it.bad]) });
  // Round-robin across question types so every quiz is varied.
  const queues = Object.values(byType).map(shuffle), out = [];
  while (out.length < QUIZ_LENGTH && queues.some(q => q.length)) for (const q of queues) if (q.length && out.length < QUIZ_LENGTH) out.push(q.shift());
  return shuffle(out);
}

function Quiz({ k, t, li, questions, onDone, onBack }) {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState(null);
  const [score, setScore] = useState(0);
  const [missed, setMissed] = useState([]);
  const nextRef = useRef(null);
  const q = questions[i];
  useEffect(() => { if (picked !== null && nextRef.current) nextRef.current.focus(); }, [picked]);
  const answer = opt => {
    if (picked !== null) return;
    setPicked(opt);
    if (opt === q.answer) setScore(s => s + 1); else setMissed(m => [...m, q]);
  };
  const next = () => { if (i + 1 < questions.length) { setI(i + 1); setPicked(null); } else onDone(score, missed); };
  const right = picked === q.answer;
  const explain = q.type === "spot" ? q.it.why[li] : q.e.w + " — " + q.e.d[li] + (q.e.tip ? " " + q.e.tip[li] : "");
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm">
        <button onClick={onBack} className="inline-flex items-center gap-1 text-blue-700 font-semibold hover:underline"><ArrowLeft className="w-4 h-4" aria-hidden="true" />{k.back}</button>
        <span className="text-gray-600">{fill(k.qOf, { n: i + 1, m: questions.length })}<span className="text-gray-300 mx-2" aria-hidden="true">|</span>{fill(k.scoreNow, { n: score })}</span>
      </div>
      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden" aria-hidden="true"><div className="h-full bg-orange-600 transition-all" style={{ width: ((i + (picked !== null ? 1 : 0)) / questions.length * 100) + "%" }} /></div>
      <div>
        <p className="text-xs font-semibold text-orange-700 mb-1">{k[q.type + "Q"]}</p>
        {q.type === "meaning" && <p className="text-base text-gray-900 font-medium">{q.prompt}</p>}
        {q.type === "gap" && <><p className="text-base text-gray-900 font-medium" lang="en">{q.prompt}</p><p className="text-xs text-gray-500 mt-1">{k.hint}{t.mg.c}{q.hint}</p></>}
        {q.type === "stress" && <p className="text-base text-gray-900 font-medium">{fill(k.stressAsk, { w: q.word })}</p>}
      </div>
      <div className={"grid gap-2 " + (q.type === "spot" ? "" : "sm:grid-cols-2")} role="group" aria-label={k[q.type + "Q"]}>
        {q.opts.map(opt => {
          const isAns = opt === q.answer, isPick = opt === picked;
          const tone = picked === null ? "border-gray-200 hover:border-orange-300 hover:bg-orange-50/40"
            : isAns ? "border-green-500 bg-green-50 text-green-900" : isPick ? "border-red-400 bg-red-50 text-red-900" : "border-gray-200 opacity-60";
          return (
            <button key={opt} onClick={() => answer(opt)} disabled={picked !== null} lang="en" className={"text-left rounded-lg border-2 px-3 py-2.5 text-sm font-medium transition-colors flex items-start gap-2 " + tone}>
              {picked !== null && isAns && <Check className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-700" aria-hidden="true" />}
              {picked !== null && isPick && !isAns && <X className="w-4 h-4 mt-0.5 flex-shrink-0 text-red-700" aria-hidden="true" />}
              <span>{opt}</span>
            </button>
          );
        })}
      </div>
      <div aria-live="polite">
        {picked !== null && (
          <div className={"rounded-lg p-3 text-sm " + (right ? "bg-green-50 text-green-900" : "bg-orange-50 text-gray-800")}>
            <p className="font-semibold">{right ? k.correct : fill(k.wrong, { a: q.answer })}</p>
            <p className="mt-1">{explain}</p>
            {q.e && q.e.v && <a href={watchUrl(q.e.v)} target="_blank" rel="noopener noreferrer" className="inline-block mt-1 text-xs font-semibold text-blue-700 hover:underline">{k.watchLesson}</a>}
          </div>
        )}
      </div>
      {picked !== null && <button ref={nextRef} onClick={next} className="ldp-btn">{i + 1 < questions.length ? k.next : k.finish}</button>}
    </div>
  );
}

function Results({ k, li, score, missed, total, onRetry, onNew, onBack }) {
  const msg = score === total ? k.perfect : score >= total * 0.7 ? k.good : k.keepGoing;
  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-gray-200 p-5 text-center">
        <p className="font-serif text-4xl font-semibold text-gray-900">{fill(k.scoreOf, { n: score, m: total })}</p>
        <p className="text-sm text-gray-600 mt-2">{msg}</p>
      </div>
      {missed.length > 0 && (
        <div>
          <h4 className="font-semibold text-gray-900 mb-2">{k.review}</h4>
          <ul className="space-y-2">
            {missed.map((q, i) => (
              <li key={i} className="text-sm border-l-2 border-orange-300 pl-3">
                {q.type === "spot"
                  ? <><p className="font-medium text-gray-900" lang="en">{q.it.ok}</p><p className="text-gray-600">{q.it.why[li]}</p></>
                  : <><p className="font-medium text-gray-900">{q.e.w}</p><p className="text-gray-600">{q.e.d[li]}</p></>}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="flex flex-wrap gap-2">
        {missed.length > 0 && <button onClick={onRetry} className="ldp-btn"><RotateCcw className="w-4 h-4" aria-hidden="true" />{k.retryMissed}</button>}
        <button onClick={onNew} className={missed.length ? "ldp-btn-outline" : "ldp-btn"}>{k.newQuiz}</button>
        <button onClick={onBack} className="ldp-btn-outline">{k.back}</button>
      </div>
    </div>
  );
}

function Matching({ k, li, groups, gk, onBack }) {
  const deal = () => {
    const pool = groups.filter(g => !gk || g.k === gk).flatMap(g => g.e.map(e => ({ id: g.k + ":" + e.w, w: e.w, d: e.d[li] })));
    const pick = shuffle(pool).slice(0, PAIRS);
    return { pairs: pick, words: shuffle(pick), defs: shuffle(pick) };
  };
  const [round, setRound] = useState(deal);
  const [sel, setSel] = useState(null);        // { side: "w" | "d", id }
  const [found, setFound] = useState({});
  const [wrong, setWrong] = useState(null);    // [wordId, defId] flashed red
  const [mistakes, setMistakes] = useState(0);
  const [status, setStatus] = useState("");
  const total = round.pairs.length, done = Object.keys(found).length;
  const restart = () => { setRound(deal()); setSel(null); setFound({}); setWrong(null); setMistakes(0); setStatus(""); };
  const choose = (side, id) => {
    if (found[id] || wrong) return;
    if (!sel || sel.side === side) { setSel({ side, id }); return; }
    const w = side === "w" ? id : sel.id, d = side === "d" ? id : sel.id;
    setSel(null);
    if (w === d) { setFound(f => ({ ...f, [w]: true })); setStatus(k.matchRight); }
    else { setMistakes(m => m + 1); setWrong([w, d]); setStatus(k.matchWrong); setTimeout(() => setWrong(null), 700); }
  };
  const tone = (side, id) => found[id] ? "border-green-500 bg-green-50 text-green-900"
    : wrong && wrong[side === "w" ? 0 : 1] === id ? "border-red-400 bg-red-50"
    : sel && sel.side === side && sel.id === id ? "border-orange-500 bg-orange-50"
    : "border-gray-200 hover:border-orange-300";
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm">
        <button onClick={onBack} className="inline-flex items-center gap-1 text-blue-700 font-semibold hover:underline"><ArrowLeft className="w-4 h-4" aria-hidden="true" />{k.back}</button>
        <span className="text-gray-600">{fill(k.pairsOf, { n: done, m: total })}<span className="text-gray-300 mx-2" aria-hidden="true">|</span>{mistakes === 1 ? k.mistake1 : fill(k.mistakes, { n: mistakes })}</span>
      </div>
      <p className="text-sm text-gray-600">{k.matchHow}</p>
      <p className="sr-only" aria-live="polite">{status}</p>
      {done === total ? (
        <div className="rounded-lg border border-green-200 bg-green-50 p-5 text-center">
          <p className="font-semibold text-green-900">{k.roundDone}</p>
          <p className="text-sm text-green-800 mt-1">{mistakes === 0 ? k.noMistakes : mistakes === 1 ? k.mistake1 : fill(k.mistakes, { n: mistakes })}</p>
          <button onClick={restart} className="ldp-btn mt-3"><RotateCcw className="w-4 h-4" aria-hidden="true" />{k.newRound}</button>
        </div>
      ) : (
        <div className="grid md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-4">
          <div role="group" aria-label={k.wordsCol} className="flex flex-wrap md:flex-col gap-2 content-start">
            {round.words.map(p => (
              <button key={p.id} onClick={() => choose("w", p.id)} disabled={!!found[p.id]} aria-pressed={!!(sel && sel.side === "w" && sel.id === p.id)} lang="en"
                className={"rounded-lg border-2 px-3 py-2 text-sm font-semibold text-left transition-colors " + tone("w", p.id)}>{p.w}</button>
            ))}
          </div>
          <div role="group" aria-label={k.meaningsCol} className="flex flex-col gap-2">
            {round.defs.map(p => (
              <button key={p.id} onClick={() => choose("d", p.id)} disabled={!!found[p.id]} aria-pressed={!!(sel && sel.side === "d" && sel.id === p.id)}
                className={"rounded-lg border-2 px-3 py-2 text-sm text-left transition-colors " + tone("d", p.id)}>{p.d}</button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function EnglishPractice({ t, lang }) {
  const k = t.eng;
  const li = lang === "fr" ? 1 : 0;
  const [data, setData] = useState(null);
  const [gk, setGk] = useState("");
  const [mode, setMode] = useState("menu"); // menu | quiz | results | match
  const [questions, setQuestions] = useState([]);
  const [result, setResult] = useState(null);
  const [round, setRound] = useState(0);
  useEffect(() => {
    let live = true;
    Promise.all([import("./guides/wordbank.js"), import("./guides/englishQuiz.js")])
      .then(([b, s]) => { if (live) setData({ groups: b.default, spot: s.default }); }).catch(() => {});
    return () => { live = false; };
  }, []);
  // A round is built in one language; switching language returns to the menu.
  useEffect(() => { setMode("menu"); }, [li]);
  const groupName = useMemo(() => data ? Object.fromEntries(data.groups.map(g => [g.k, g.t[li]])) : {}, [data, li]);
  if (!data) return <p className="text-sm text-gray-500" role="status">{t.mg.loading}</p>;

  const startQuiz = qs => { setQuestions(qs); setRound(r => r + 1); setMode("quiz"); };
  const newQuiz = () => startQuiz(buildQuiz(data.groups, data.spot, gk, li));
  const retry = () => startQuiz(shuffle(result.missed.map(q => ({ ...q, opts: shuffle(q.opts) }))));

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-semibold text-gray-900 text-lg">{k.practiceTitle}</h3>
        <p className="text-sm text-gray-600 mt-1">{k.practiceSub}</p>
      </div>
      {mode === "menu" && (
        <>
          <label className="block max-w-sm">
            <span className="text-sm font-semibold text-gray-700">{k.practiceGroup}</span>
            <select value={gk} onChange={e => setGk(e.target.value)} className="ldp-input py-2 w-full bg-white mt-1">
              <option value="">{k.allGroups}</option>
              {data.groups.map(g => <option key={g.k} value={g.k}>{groupName[g.k]}</option>)}
            </select>
          </label>
          <div className="grid sm:grid-cols-2 gap-3">
            <button onClick={newQuiz} className="text-left rounded-lg border-2 border-gray-200 hover:border-orange-400 p-4 transition-colors">
              <CircleHelp className="w-6 h-6 text-orange-700" aria-hidden="true" />
              <p className="font-semibold text-gray-900 mt-2">{k.quiz}</p>
              <p className="text-sm text-gray-600 mt-1">{k.quizDesc}</p>
            </button>
            <button onClick={() => { setRound(r => r + 1); setMode("match"); }} className="text-left rounded-lg border-2 border-gray-200 hover:border-orange-400 p-4 transition-colors">
              <Puzzle className="w-6 h-6 text-orange-700" aria-hidden="true" />
              <p className="font-semibold text-gray-900 mt-2">{k.match}</p>
              <p className="text-sm text-gray-600 mt-1">{k.matchDesc}</p>
            </button>
          </div>
        </>
      )}
      {mode === "quiz" && <Quiz key={round} k={k} t={t} li={li} questions={questions} onBack={() => setMode("menu")} onDone={(score, missed) => { setResult({ score, missed, total: questions.length }); setMode("results"); }} />}
      {mode === "results" && <Results k={k} li={li} {...result} onRetry={retry} onNew={newQuiz} onBack={() => setMode("menu")} />}
      {mode === "match" && <Matching key={round} k={k} li={li} groups={data.groups} gk={gk} onBack={() => setMode("menu")} />}
    </div>
  );
}
