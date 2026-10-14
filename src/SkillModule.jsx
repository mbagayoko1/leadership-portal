// A skill module (meeting facilitation or master of ceremonies) in the
// Personal Development tab: a stage stepper with tips and sample phrases,
// copyable templates, quotes and checked resources. Stages ticked off are
// stored with the participant's progress (category "sk").
import { useState, useRef } from "react";
import { CheckCircle2, Circle, Play, FileText, BookOpen, Wrench, Copy, Check } from "lucide-react";
import { SKILLS } from "./skills.js";
import MoneyTools from "./MoneyTools.jsx";

const L = (o, lang) => (o && (o[lang] || o.en)) || "";
const KIND_ICON = { video: Play, article: FileText, tool: Wrench, book: BookOpen };

// Copies a template. If the Clipboard API is blocked (some browsers and
// managed devices), it selects the text and falls back to execCommand, so
// the user can at least press Ctrl/Cmd+C on the selection.
function CopyBlock({ title, text, k }) {
  const [copied, setCopied] = useState(false);
  const preRef = useRef(null);
  const done = () => { setCopied(true); setTimeout(() => setCopied(false), 1800); };
  async function copy() {
    try { await navigator.clipboard.writeText(text); done(); return; } catch { /* fall through */ }
    const range = document.createRange();
    range.selectNodeContents(preRef.current);
    const sel = window.getSelection();
    sel.removeAllRanges(); sel.addRange(range);
    try { if (document.execCommand("copy")) done(); } catch { /* the text stays selected */ }
  }
  return (
    <details className="rounded-lg border border-gray-200 bg-white group">
      <summary className="cursor-pointer px-3 py-2 text-sm font-semibold text-gray-800 flex items-center gap-2">
        <FileText className="w-4 h-4 text-orange-500" />{title}
      </summary>
      <div className="px-3 pb-3">
        <div className="flex justify-end mb-1">
          <button onClick={copy} className="text-xs px-2 py-1 rounded border border-gray-200 text-gray-600 hover:bg-gray-50 flex items-center gap-1">
            {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}{copied ? k.copied : k.copy}
          </button>
        </div>
        <pre ref={preRef} className="text-xs leading-relaxed font-mono whitespace-pre-wrap bg-gray-50 border border-gray-100 rounded p-3 text-gray-800 overflow-x-auto">{text}</pre>
      </div>
    </details>
  );
}

export default function SkillModule({ id, t, lang, done, onToggle, stage, onStage, onCoach }) {
  const k = t.pd.sk;
  const m = SKILLS.find(x => x.id === id) || SKILLS[0];
  const i = Math.max(0, m.stages.findIndex(s => s.id === stage));
  const st = m.stages[i];
  const nDone = m.stages.filter(s => done[s.id]).length;
  const kinds = ["video", "article", "tool", "book"].filter(kd => m.resources.some(r => r.kind === kd));

  return (
    <div className="space-y-4">
      <div className="ldp-card p-4 space-y-3">
        <div className="flex flex-wrap justify-between items-baseline gap-2">
          <h3 className="font-semibold text-gray-800">{L(m.title, lang)}</h3>
          <span className="font-mono text-xs text-orange-600">{k.count(nDone, m.stages.length)}</span>
        </div>
        <p className="text-sm text-gray-600">{L(m.sub, lang)}</p>
        {m.disclaimer && <p className="text-xs text-amber-900 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">{L(m.disclaimer, lang)}</p>}
        <div className="ldp-progress-bar h-1.5"><div className="ldp-progress-fill h-1.5" style={{ width: (nDone / m.stages.length * 100) + "%" }} /></div>
        <ol className="flex flex-wrap gap-1.5" aria-label={k.stages}>
          {m.stages.map((s, n) => (
            <li key={s.id}>
              <button onClick={() => onStage(s.id)} aria-current={n === i ? "step" : undefined}
                className={"text-xs px-2.5 py-1.5 rounded-lg border flex items-center gap-1.5 transition-colors " + (n === i ? "bg-purple-700 border-purple-700 text-white" : done[s.id] ? "bg-green-50 border-green-200 text-green-800" : "bg-white border-gray-200 text-gray-700 hover:border-purple-300")}>
                <span className="font-mono">{n + 1}</span>{L(s.title, lang)}
              </button>
            </li>
          ))}
        </ol>
      </div>

      <article className="ldp-card overflow-hidden fade-up" key={st.id + lang}>
        <header className="p-5 border-b border-gray-100">
          <p className="ldp-eyebrow">{k.stages} {i + 1} / {m.stages.length}</p>
          <h3 className="text-xl font-semibold text-gray-800 font-serif">{L(st.title, lang)}</h3>
          <p className="text-sm text-gray-600 mt-1"><span className="font-semibold">{k.goal}:</span> {L(st.goal, lang)}</p>
        </header>
        <div className="p-5 space-y-5">
          <section>
            <h4 className="text-sm font-bold text-gray-700 mb-2">{k.tips}</h4>
            <ul className="space-y-2">{(st.tips[lang] || st.tips.en).map((x, n) => <li key={n} className="text-sm text-gray-700 pl-3 border-l-2 border-orange-300 leading-relaxed">{x}</li>)}</ul>
          </section>
          <section className="bg-purple-50 border-l-4 border-purple-700 rounded-lg px-4 py-3">
            <h4 className="text-xs font-bold text-purple-800 uppercase tracking-wide mb-2">{m.sayLabel ? L(m.sayLabel, lang) : k.say}</h4>
            <ul className="space-y-1.5">{(st.say[lang] || st.say.en).map((x, n) => <li key={n} className="text-sm text-gray-800 font-serif italic">{x}</li>)}</ul>
          </section>
          <div className="flex flex-wrap gap-2 justify-between items-center">
            <button onClick={() => onToggle(st.id)} aria-pressed={!!done[st.id]}
              className={"text-sm px-3 py-1.5 rounded-lg border flex items-center gap-1.5 " + (done[st.id] ? "bg-green-50 border-green-300 text-green-800" : "border-gray-200 text-gray-700 hover:bg-gray-50")}>
              {done[st.id] ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />}{done[st.id] ? k.practised : k.mark}
            </button>
            <div className="flex gap-2">
              <button disabled={i <= 0} onClick={() => onStage(m.stages[i - 1].id)} className="text-sm px-3 py-1.5 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-40">{k.prev}</button>
              <button disabled={i >= m.stages.length - 1} onClick={() => onStage(m.stages[i + 1].id)} className="text-sm px-3 py-1.5 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-40">{k.next}</button>
            </div>
          </div>
          <button onClick={onCoach} className="text-sm px-3 py-1.5 rounded-lg bg-purple-700 hover:bg-purple-800 text-white font-semibold">{k.rehearse}</button>
        </div>
      </article>

      {m.id === "money" && <MoneyTools k={t.pd.mt} lang={lang} />}

      <div className="ldp-card p-4 space-y-2">
        <h4 className="text-sm font-bold text-gray-700">{k.templates}</h4>
        {m.templates.map((tp, n) => <CopyBlock key={n} title={L(tp.title, lang)} text={L(tp.text, lang)} k={k} />)}
      </div>

      <div className="ldp-card p-4">
        <h4 className="text-sm font-bold text-gray-700 mb-3">{k.quotes}</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {m.quotes.map((q, n) => (
            <figure key={n} className="border-l-4 border-yellow-400 pl-3">
              <blockquote className="font-serif italic text-gray-800 leading-snug">“{lang === "fr" ? q.fr : q.text}”</blockquote>
              {lang === "fr" && <p className="text-xs text-gray-500 italic mt-0.5">“{q.text}”</p>}
              <figcaption className="text-xs text-gray-500 mt-1">— {q.by}, {q.source}{lang === "fr" ? " · " + t.pd.freeTr : ""}</figcaption>
            </figure>
          ))}
        </div>
      </div>

      <div className="ldp-card p-4 space-y-4">
        <h4 className="text-sm font-bold text-gray-700">{k.resources}</h4>
        {kinds.map(kd => {
          const Icon = KIND_ICON[kd];
          return (
            <section key={kd}>
              <p className="ldp-eyebrow mb-2">{k.kinds[kd]}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {m.resources.filter(r => r.kind === kd).map((r, n) => {
                  const body = (
                    <>
                      <span className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0"><Icon className="w-4 h-4 text-orange-700" /></span>
                      <span className="flex-1 min-w-0"><span className="block text-sm font-semibold text-gray-800">{r.t}</span><span className="block text-xs text-gray-500">{r.by}</span></span>
                      {r.u && <span className="text-xs text-gray-400">↗</span>}
                    </>
                  );
                  return r.u
                    ? <a key={n} href={r.u} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-2.5 bg-gray-50 hover:bg-orange-50 rounded-lg transition-colors">{body}</a>
                    : <div key={n} className="flex items-center gap-3 p-2.5 bg-gray-50 rounded-lg">{body}</div>;
                })}
              </div>
            </section>
          );
        })}
        <p className="text-[11px] text-gray-400">{k.note}</p>
      </div>
    </div>
  );
}
