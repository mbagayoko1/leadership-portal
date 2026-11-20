// Runs a quiz: one question at a time with feedback, then a score and a
// review of missed items, with "retry the ones I missed" and "new quiz".
// `build` returns a fresh list of questions (see quiz.js for their shape);
// `onScore(score, total)` is called when a full quiz ends (not on retries).
import { useState, useEffect, useRef } from "react";
import { Check, X, RotateCcw, ArrowLeft } from "lucide-react";
import { shuffle, fill } from "./quiz.js";

function Question({ k, t, q, i, total, score, picked, onPick, onNext, onBack }) {
  const nextRef = useRef(null);
  useEffect(() => { if (picked !== null && nextRef.current) nextRef.current.focus(); }, [picked]);
  const right = picked === q.answer;
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3 text-sm">
        <button onClick={onBack} className="inline-flex items-center gap-1 text-blue-700 font-semibold hover:underline"><ArrowLeft className="w-4 h-4" aria-hidden="true" />{k.back}</button>
        <span className="text-gray-600 text-right">{fill(k.qOf, { n: i + 1, m: total })}<span className="text-gray-300 mx-2" aria-hidden="true">|</span>{fill(k.scoreNow, { n: score })}</span>
      </div>
      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden" aria-hidden="true"><div className="h-full bg-orange-600 transition-all" style={{ width: ((i + (picked !== null ? 1 : 0)) / total * 100) + "%" }} /></div>
      <div>
        <p className="text-xs font-semibold text-orange-700 mb-1">{q.label}</p>
        {q.prompt && <p className="text-base text-gray-900 font-medium" lang={q.promptLang}>{q.prompt}</p>}
        {q.hint && <p className="text-xs text-gray-500 mt-1">{k.hint}{t.mg.c}{q.hint}</p>}
      </div>
      <div className={"grid gap-2 " + (q.wide ? "" : "sm:grid-cols-2")} role="group" aria-label={q.label}>
        {q.opts.map(opt => {
          const isAns = opt === q.answer, isPick = opt === picked;
          const tone = picked === null ? "border-gray-200 hover:border-orange-300 hover:bg-orange-50/40"
            : isAns ? "border-green-500 bg-green-50 text-green-900" : isPick ? "border-red-400 bg-red-50 text-red-900" : "border-gray-200 opacity-60";
          return (
            <button key={opt} onClick={() => onPick(opt)} disabled={picked !== null} lang={q.optsLang} className={"text-left rounded-lg border-2 px-3 py-2.5 text-sm font-medium transition-colors flex items-start gap-2 " + tone}>
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
            <p className="font-semibold">{right ? k.correct : q.wide ? k.wrongShort : fill(k.wrong, { a: q.answer })}</p>
            {q.explain && <p className="mt-1">{q.explain}</p>}
            {q.link && <a href={q.link} target="_blank" rel="noopener noreferrer" className="inline-block mt-1 text-xs font-semibold text-blue-700 hover:underline">{k.watchLesson}</a>}
          </div>
        )}
      </div>
      {picked !== null && <button ref={nextRef} onClick={onNext} className="ldp-btn">{i + 1 < total ? k.next : k.finish}</button>}
    </div>
  );
}

export default function QuizRunner({ k, t, build, onScore, onBack }) {
  const [questions, setQuestions] = useState(() => build());
  const [retrying, setRetrying] = useState(false);
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState(null);
  const [score, setScore] = useState(0);
  const [missed, setMissed] = useState([]);
  const [done, setDone] = useState(false);
  const start = (qs, retry) => { setQuestions(qs); setRetrying(retry); setI(0); setPicked(null); setScore(0); setMissed([]); setDone(false); };
  const q = questions[i];
  const pick = opt => {
    if (picked !== null) return;
    setPicked(opt);
    if (opt === q.answer) setScore(s => s + 1); else setMissed(m => [...m, q]);
  };
  const next = () => {
    if (i + 1 < questions.length) { setI(i + 1); setPicked(null); return; }
    setDone(true);
    if (!retrying && onScore) onScore(score, questions.length);
  };

  if (!questions.length) return null;
  if (!done) return <Question k={k} t={t} q={q} i={i} total={questions.length} score={score} picked={picked} onPick={pick} onNext={next} onBack={onBack} />;
  const total = questions.length;
  const msg = score === total ? k.perfect : score >= total * 0.7 ? k.good : k.keepGoing;
  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-gray-200 p-5 text-center" role="status">
        <p className="font-serif text-4xl font-semibold text-gray-900">{fill(k.scoreOf, { n: score, m: total })}</p>
        <p className="text-sm text-gray-600 mt-2">{msg}</p>
      </div>
      {missed.length > 0 && (
        <div>
          <h4 className="font-semibold text-gray-900 mb-2">{k.review}</h4>
          <ul className="space-y-2">
            {missed.map((m, j) => (
              <li key={j} className="text-sm border-l-2 border-orange-300 pl-3">
                <p className="font-medium text-gray-900" lang={m.review.lang}>{m.review.title}</p>
                <p className="text-gray-600">{m.review.text}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="flex flex-wrap gap-2">
        {missed.length > 0 && <button onClick={() => start(shuffle(missed.map(m => ({ ...m, opts: shuffle(m.opts) }))), true)} className="ldp-btn"><RotateCcw className="w-4 h-4" aria-hidden="true" />{k.retryMissed}</button>}
        <button onClick={() => start(build(), false)} className={missed.length ? "ldp-btn-outline" : "ldp-btn"}>{k.newQuiz}</button>
        <button onClick={onBack} className="ldp-btn-outline">{k.back}</button>
      </div>
    </div>
  );
}
