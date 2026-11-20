// Practice games for the "Polish Your English" module, built from the word
// bank (src/guides/wordbank.js) and the "which sentence is correct?" items
// (src/guides/englishQuiz.js):
//  - Quiz: ten mixed questions (meaning → word, fill the gap, stressed
//    syllable, correct sentence), run by the shared QuizRunner.
//  - Word matching: match six words to their meanings, round after round.
// Both can use every group or one group. Nothing is saved; it is practice.
import { useState, useEffect, useMemo } from "react";
import { CircleHelp, Puzzle, RotateCcw, ArrowLeft } from "lucide-react";
import { watchUrl } from "./englishLibrary.js";
import QuizRunner from "./QuizRunner.jsx";
import { shuffle, fill, bolds, blank, options, mix } from "./quiz.js";

const PAIRS = 6;

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

function buildQuiz(groups, spot, gk, li, k) {
  const chosen = groups.filter(g => !gk || g.k === gk);
  const entries = chosen.flatMap(g => g.e.map(e => ({ ...e, g: g.k })));
  const all = groups.flatMap(g => g.e.map(e => ({ ...e, g: g.k })));
  const same = e => entries.filter(x => x.g === e.g);
  const single = list => list.map(x => bolds(x.ex)).filter(x => x.length === 1).map(x => x[0]);
  const about = e => ({ explain: e.w + ": " + e.d[li] + (e.tip ? " " + e.tip[li] : ""), link: e.v && watchUrl(e.v), review: { title: e.w, text: e.d[li], lang: "en" } });
  const byType = { meaning: [], gap: [], stress: [], spot: [] };
  for (const e of entries) {
    byType.meaning.push({ label: k.meaningQ, prompt: e.d[li], answer: e.w, opts: options(e.w, same(e).map(x => x.w), all.map(x => x.w)), optsLang: "en", ...about(e) });
    const b = bolds(e.ex);
    if (b.length === 1) byType.gap.push({ label: k.gapQ, prompt: blank(e.ex), promptLang: "en", hint: e.d[li], answer: b[0], opts: options(b[0], single(same(e)), single(all)), optsLang: "en", ...about(e) });
    const st = e.say && stressOptions(e.say);
    if (st) byType.stress.push({ label: k.stressQ, prompt: fill(k.stressAsk, { w: e.w }), answer: st.correct, opts: st.opts, ...about(e) });
  }
  for (const it of spot) if (!gk || it.g === gk) byType.spot.push({ label: k.spotQ, answer: it.ok, opts: shuffle([it.ok, it.bad]), optsLang: "en", wide: true, explain: it.why[li], review: { title: it.ok, text: it.why[li], lang: "en" } });
  return mix(byType);
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
  const [mode, setMode] = useState("menu"); // menu | quiz | match
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

  const quizLabels = { ...t.quiz, back: k.back };

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
            <button onClick={() => { setRound(r => r + 1); setMode("quiz"); }} className="text-left rounded-lg border-2 border-gray-200 hover:border-orange-400 p-4 transition-colors">
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
      {mode === "quiz" && <QuizRunner key={round} k={quizLabels} t={t} build={() => buildQuiz(data.groups, data.spot, gk, li, k)} onBack={() => setMode("menu")} />}
      {mode === "match" && <Matching key={round} k={k} li={li} groups={data.groups} gk={gk} onBack={() => setMode("menu")} />}
    </div>
  );
}
