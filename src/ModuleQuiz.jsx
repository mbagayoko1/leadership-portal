// Module quiz: ten questions built from a module's guide (src/guides), in
// the interface language, mixed across six kinds:
//   concept   definition → concept name
//   mistake   "common mistake" line → concept name
//   vocab     definition → vocabulary term
//   gap       vocabulary example with the term blanked (meaning as a hint)
//   example   worked example: first attempt or stronger version?
//   origin    concept → its named source (distractors from other modules)
// Distractors come from the same module, so they are plausible. The best
// score is saved in the user's progress (category "mq") by App.
import { useState, useEffect } from "react";
import { ListChecks } from "lucide-react";
import QuizRunner from "./QuizRunner.jsx";
import { loadGuides } from "./ModuleGuide.jsx";
import { fill, buildModuleQuiz } from "./quiz.js";

export default function ModuleQuiz({ id, t, lang, best, onScore }) {
  const k = t.quiz;
  const [guides, setGuides] = useState(null);
  const [failed, setFailed] = useState(false);
  const [round, setRound] = useState(0); // 0 = start screen
  useEffect(() => {
    let live = true;
    setFailed(false);
    loadGuides(lang).then(g => { if (live) setGuides(g); }).catch(() => { if (live) setFailed(true); });
    return () => { live = false; };
  }, [lang]);
  // A quiz is built in one language for one module; changing either restarts.
  useEffect(() => { setRound(0); }, [lang, id]);

  if (failed) return <p className="text-sm text-gray-600" role="alert">{t.mg.failed}</p>;
  if (!guides) return <p className="text-sm text-gray-500" role="status">{t.mg.loading}</p>;
  const g = guides[id];
  if (!g) return null;
  if (round > 0) return <QuizRunner key={round} k={k} t={t} build={() => buildModuleQuiz(g, guides, k)} onScore={onScore} onBack={() => setRound(0)} />;
  return (
    <div className="space-y-4 max-w-2xl">
      <div>
        <h3 className="font-semibold text-gray-900 text-lg flex items-center gap-2"><ListChecks className="w-5 h-5 text-orange-700" aria-hidden="true" />{k.title}</h3>
        <p className="text-sm text-gray-600 mt-1">{k.sub}</p>
      </div>
      <p className={"text-sm " + (best ? "font-semibold text-green-700" : "text-gray-500")}>{best ? fill(k.best, { n: best.s, m: best.n }) : k.notTaken}</p>
      <button onClick={() => setRound(r => r + 1)} className="ldp-btn">{k.start}</button>
    </div>
  );
}
