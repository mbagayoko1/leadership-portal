// The "Learn" view of a module in the Study Guide: definition and outcomes,
// key concepts, vocabulary, five worked examples, a step-by-step guide with a
// copyable template, and a self-check. Content lives in src/guides/{en,fr}.js and is
// loaded on first use, so it stays out of the main bundle. Steps ticked off
// are saved with the participant's progress (category "mg", key "m3:2").
import { useState, useEffect } from "react";
import { CheckCircle2, Circle, Check, Flag } from "lucide-react";
import CopyBlock from "./CopyBlock.jsx";

import { GUIDE_IDS } from "./guides/ids.js";
export { GUIDE_IDS };

const loaders = { en: () => import("./guides/en.js"), fr: () => import("./guides/fr.js") };
const cache = {};

// Renders **term** as bold; used for the term inside vocabulary examples.
export function Bolded({ text }) {
  return text.split(/\*\*(.+?)\*\*/g).map((part, i) => i % 2 ? <strong key={i} className="font-semibold text-gray-900">{part}</strong> : part);
}

function Section({ title, id, children }) {
  return (
    <section id={id} className="ldp-card p-5 sm:p-6 scroll-mt-20">
      <h4 className="font-serif text-lg font-semibold text-gray-900 mb-3">{title}</h4>
      {children}
    </section>
  );
}

export default function ModuleGuide({ id, t, lang, done = {}, onToggle }) {
  const k = t.mg;
  const [data, setData] = useState(cache[lang] || null);
  const [failed, setFailed] = useState(false);
  const [exIdx, setExIdx] = useState(0);
  useEffect(() => { setExIdx(0); }, [id]);
  useEffect(() => {
    if (cache[lang]) { setData(cache[lang]); return; }
    let live = true;
    setData(null); setFailed(false);
    loaders[lang]().then(m => { cache[lang] = m.default; if (live) setData(m.default); }).catch(() => { if (live) setFailed(true); });
    return () => { live = false; };
  }, [lang]);

  if (failed) return <p className="text-sm text-gray-600">{k.failed}</p>;
  if (!data) return <p className="text-sm text-gray-500" role="status">{k.loading}</p>;
  const g = data[id];
  if (!g) return null;
  const doneCount = g.steps.filter((_, i) => done[id + ":" + i]).length;
  const exI = exIdx < g.examples.length ? exIdx : 0;
  const ex = g.examples[exI];

  return (
    <div className="space-y-4 max-w-3xl">
      <Section title={k.what}>
        <p className="text-[15px] leading-relaxed text-gray-800">{g.def}</p>
        <p className="text-sm font-semibold text-gray-900 mt-4 mb-2">{k.outcomes}</p>
        <ul className="space-y-1.5">
          {g.outcomes.map((o, i) => (
            <li key={i} className="flex gap-2 text-sm text-gray-700"><Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" aria-hidden="true" />{o}</li>
          ))}
        </ul>
      </Section>

      <Section title={k.concepts}>
        <dl className="divide-y divide-gray-200">
          {g.concepts.map((c, i) => (
            <div key={i} className="py-3 first:pt-0 last:pb-0">
              <dt className="font-semibold text-gray-900">{c.n}</dt>
              <dd className="mt-1 space-y-1.5 text-sm leading-relaxed">
                <p className="text-gray-800">{c.d}</p>
                <p className="text-gray-600"><span className="font-semibold text-gray-700">{k.why}{k.c}</span>{c.why}</p>
                <p className="text-gray-600"><span className="font-semibold text-orange-700">{k.miss}{k.c}</span>{c.miss}</p>
                {c.src && <p className="text-xs text-gray-500">{k.origin}{k.c}{c.src}</p>}
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      {g.vocab && (
        <Section title={k.vocab} id="mg-vocab">
          <dl className="grid md:grid-cols-2 gap-x-6 gap-y-4">
            {g.vocab.map((v, i) => (
              <div key={i}>
                <dt className="font-semibold text-gray-900">{v.w}</dt>
                <dd className="mt-0.5 space-y-1 text-sm leading-relaxed">
                  <p className="text-gray-800">{v.d}</p>
                  <p className="text-gray-600 border-l-2 border-orange-200 pl-2.5"><span className="sr-only">{k.vocabEx}{k.c}</span><Bolded text={v.ex} /></p>
                  {v.warn && <p className="text-xs text-gray-500"><span className="font-semibold">{k.warn}{k.c}</span>{v.warn}</p>}
                </dd>
              </div>
            ))}
          </dl>
        </Section>
      )}

      <Section title={k.examples.replace("{n}", g.examples.length)}>
        <div role="group" aria-label={k.examples.replace("{n}", g.examples.length)} className="flex flex-wrap gap-2 mb-4">
          {g.examples.map((x, i) => (
            <button key={i} onClick={() => setExIdx(i)} aria-pressed={i === exI}
              className={"text-left text-sm px-3 py-1.5 rounded-lg border transition-colors " + (i === exI ? "bg-purple-700 border-purple-700 text-white" : "bg-white border-gray-200 text-gray-700 hover:border-gray-400")}>
              {x.t}
            </button>
          ))}
        </div>
        <p className="text-sm leading-relaxed text-gray-800">{ex.scene}</p>
        <div className="grid md:grid-cols-2 gap-3 mt-4">
          <div className="rounded-lg bg-gray-50 border border-gray-200 p-4">
            <p className="text-xs font-semibold text-gray-500 mb-1.5">{k.first}</p>
            <p className="text-sm leading-relaxed text-gray-700">{ex.first}</p>
          </div>
          <div className="rounded-lg bg-white border border-gray-200 border-l-4 border-l-orange-500 p-4">
            <p className="text-xs font-semibold text-orange-700 mb-1.5">{k.better}</p>
            <p className="text-sm leading-relaxed text-gray-800">{ex.better}</p>
          </div>
        </div>
        <p className="text-sm font-semibold text-gray-900 mt-4 mb-2">{k.changed}</p>
        <ul className="space-y-1.5 list-disc pl-5 text-sm text-gray-700 marker:text-gray-400">
          {ex.changes.map((c, i) => <li key={i}>{c}</li>)}
        </ul>
      </Section>

      <Section title={k.steps}>
        <p className="text-xs text-gray-500 -mt-1 mb-3" aria-live="polite">{k.progress.replace("{n}", doneCount).replace("{total}", g.steps.length)}</p>
        <ol className="space-y-3">
          {g.steps.map((s, i) => {
            const key = id + ":" + i, on = !!done[key];
            return (
              <li key={i} className="flex gap-3">
                <button onClick={() => onToggle(key)} aria-pressed={on} aria-label={(on ? k.undo : k.mark) + ": " + s.do} className="self-start mt-0.5 flex-shrink-0 rounded-full">
                  {on ? <CheckCircle2 className="w-5 h-5 text-green-600" /> : <Circle className="w-5 h-5 text-gray-300 hover:text-gray-500" />}
                </button>
                <div className="min-w-0">
                  <p className={"font-semibold " + (on ? "text-gray-500 line-through decoration-gray-300" : "text-gray-900")}><span className="font-mono text-gray-400 mr-1.5">{i + 1}.</span>{s.do}</p>
                  <p className="text-sm leading-relaxed text-gray-700 mt-0.5">{s.how}</p>
                  <p className="text-xs text-gray-500 mt-1"><span className="font-semibold">{k.time}{k.c}</span>{s.time}<span className="mx-2 text-gray-300" aria-hidden="true">|</span><span className="font-semibold">{k.done}{k.c}</span>{s.done}</p>
                </div>
              </li>
            );
          })}
        </ol>
        <div className="mt-4">
          <CopyBlock title={k.template} text={g.template} k={k} open />
        </div>
      </Section>

      <Section title={k.self}>
        <ul className="space-y-2 list-disc pl-5 text-sm text-gray-700 marker:text-gray-400">
          {g.reflect.map((r, i) => <li key={i}>{r}</li>)}
        </ul>
        {g.checkpoint && (
          <p className="mt-4 flex gap-2 text-sm text-gray-800 bg-orange-50 rounded-lg p-3"><Flag className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" aria-hidden="true" />{g.checkpoint}</p>
        )}
      </Section>
    </div>
  );
}
