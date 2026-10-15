// Speech library (Personal Development tab): 30 original speeches with their
// quotes, analogies, techniques and delivery notes, plus read-aloud through
// the browser's speech synthesis. Lazy-loaded, since the texts are large.
import { useState, useEffect } from "react";
import { CheckCircle2, Circle, Volume2, Square } from "lucide-react";
import { SPEECHES, SPEECH_THEMES, DEVICES } from "./speeches.js";
import { useReadAloud } from "./readAloud.js";

const L = (o, lang) => (o && (o[lang] || o.en)) || "";
const paras = text => text.split(/\n\s*\n/).map(s => s.trim()).filter(Boolean);
const wordCount = text => (text.match(/\S+/g) || []).length;
export default function SpeechLibrary({ t, lang, done, onToggle, selected, onSelect, onCoach }) {
  const l = t.pd.lib;
  const [theme, setTheme] = useState("all");
  const list = SPEECHES.filter(s => theme === "all" || s.theme === theme);
  const sp = SPEECHES.find(s => s.id === selected) || SPEECHES[0];
  const idx = SPEECHES.indexOf(sp);
  const body = paras(L(sp.text, lang));
  const tts = useReadAloud(lang);
  const nDone = SPEECHES.filter(s => done[s.id]).length;

  // Stop reading when the speech or language changes.
  useEffect(() => { tts.stop(); }, [sp.id, lang]); // eslint-disable-line react-hooks/exhaustive-deps

  const go = id => { onSelect(id); };
  const chip = (k, label) => (
    <button key={k} onClick={() => setTheme(k)} aria-pressed={theme === k}
      className={"text-xs px-2.5 py-1 rounded-full border transition-colors " + (theme === k ? "bg-purple-700 border-purple-700 text-white" : "bg-white border-gray-200 text-gray-600 hover:border-purple-300")}>{label}</button>
  );

  return (
    <div className="space-y-4">
      <div className="ldp-card p-4 space-y-3">
        <div className="flex flex-wrap justify-between items-baseline gap-2">
          <h3 className="font-semibold text-gray-800">{l.title}</h3>
          <span className="font-mono text-xs text-orange-600">{l.practisedCount(nDone, SPEECHES.length)}</span>
        </div>
        <p className="text-sm text-gray-600">{l.sub}</p>
        <div className="flex flex-wrap gap-1.5">
          {chip("all", l.all)}
          {Object.entries(SPEECH_THEMES).map(([k, v]) => chip(k, L(v, lang)))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
        <nav className="ldp-card p-2 lg:max-h-[75vh] lg:overflow-y-auto" aria-label={l.title}>
          <ol className="space-y-1">
            {list.map(s => (
              <li key={s.id}>
                <button onClick={() => go(s.id)} aria-current={s.id === sp.id ? "true" : undefined}
                  className={"w-full text-left px-3 py-2 rounded-lg flex gap-2 items-start transition-colors " + (s.id === sp.id ? "bg-orange-50 border border-orange-300" : "border border-transparent hover:bg-gray-50")}>
                  <span className="font-mono text-[11px] text-gray-400 pt-0.5 w-6 flex-shrink-0">{s.id.slice(1)}</span>
                  <span className="flex-1 min-w-0">
                    <span className="block text-sm font-semibold text-gray-800">{L(s.title, lang)}</span>
                    <span className="block text-xs text-gray-500">{L(SPEECH_THEMES[s.theme], lang)}</span>
                  </span>
                  {done[s.id] && <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" aria-label={l.practised} />}
                </button>
              </li>
            ))}
          </ol>
        </nav>

        <article className="ldp-card overflow-hidden lg:col-span-2 fade-up" key={sp.id + lang}>
          <header className="p-5 border-b border-gray-100 space-y-1">
            <p className="ldp-eyebrow">{L(SPEECH_THEMES[sp.theme], lang)} · {l.words(wordCount(L(sp.text, lang)))}</p>
            <h3 className="text-2xl font-semibold text-gray-800 font-serif">{L(sp.title, lang)}</h3>
            <p className="text-sm text-gray-500"><span className="font-semibold text-gray-600">{l.occasion}:</span> {L(sp.occasion, lang)}</p>
          </header>
          <div className="p-5 space-y-5">
            <div className="bg-purple-50 border-l-4 border-purple-700 rounded-lg px-4 py-3">
              <p className="text-xs font-bold text-purple-800 uppercase tracking-wide mb-1">{l.key}</p>
              <p className="text-sm text-gray-800">{L(sp.key, lang)}</p>
            </div>

            <div className="flex flex-wrap gap-2 items-center">
              {tts.supported ? (
                tts.playing
                  ? <button onClick={tts.stop} className="text-sm px-3 py-1.5 rounded-lg bg-gray-800 text-white font-semibold flex items-center gap-1.5"><Square className="w-3.5 h-3.5" />{l.stop}</button>
                  : <button onClick={() => tts.play(body)} className="text-sm px-3 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-semibold flex items-center gap-1.5"><Volume2 className="w-4 h-4" />{l.read}</button>
              ) : <span className="text-xs text-gray-500">{l.noTts}</span>}
              <button onClick={() => onToggle(sp.id)} aria-pressed={!!done[sp.id]}
                className={"text-sm px-3 py-1.5 rounded-lg border flex items-center gap-1.5 " + (done[sp.id] ? "bg-green-50 border-green-300 text-green-800" : "border-gray-200 text-gray-700 hover:bg-gray-50")}>
                {done[sp.id] ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />}{done[sp.id] ? l.practised : l.markPractised}
              </button>
            </div>

            <div className="space-y-3 font-serif text-[17px] leading-relaxed text-gray-800">
              {body.map((p, i) => (
                <p key={i} className={"rounded transition-colors " + (tts.para === i ? "bg-yellow-100 -mx-2 px-2" : "")}>{p}</p>
              ))}
            </div>

            <section>
              <h4 className="text-sm font-bold text-gray-700 mb-2">{l.quotes}</h4>
              <div className="space-y-3">
                {sp.quotes.map((q, i) => (
                  <figure key={i} className="border-l-4 border-yellow-400 pl-4">
                    <blockquote className="font-serif italic text-gray-800">“{lang === "fr" ? q.fr : q.text}”</blockquote>
                    {lang === "fr" && q.fr !== q.text && <p className="text-xs text-gray-500 italic mt-0.5">“{q.text}”</p>}
                    <figcaption className="text-xs text-gray-500 mt-1">— {q.by}, {L(q.src, lang)}{lang === "fr" ? " · " + t.pd.freeTr : ""}</figcaption>
                  </figure>
                ))}
              </div>
            </section>

            <section>
              <h4 className="text-sm font-bold text-gray-700 mb-2">{l.analogies}</h4>
              <ul className="space-y-2">{sp.analogies.map((a, i) => <li key={i} className="text-sm text-gray-700 pl-3 border-l-2 border-orange-300">{L(a, lang)}</li>)}</ul>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <section>
                <h4 className="text-sm font-bold text-gray-700 mb-2">{l.devices}</h4>
                <div className="flex flex-wrap gap-1.5">{sp.devices.map(d => <span key={d} className="text-xs px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-100">{L(DEVICES[d], lang)}</span>)}</div>
              </section>
              <section>
                <h4 className="text-sm font-bold text-gray-700 mb-2">{l.delivery}</h4>
                <ul className="space-y-1">{(sp.delivery[lang] || sp.delivery.en).map((d, i) => <li key={i} className="text-xs text-gray-600 pl-3 border-l-2 border-gray-200">{d}</li>)}</ul>
              </section>
            </div>

            <div className="bg-orange-50 border-l-4 border-orange-500 rounded-lg px-4 py-3">
              <p className="text-xs font-bold text-orange-800 uppercase tracking-wide mb-1">{l.cta}</p>
              <p className="text-sm text-gray-800">{L(sp.cta, lang)}</p>
            </div>
            <div className="bg-gray-50 border border-gray-100 rounded-lg px-4 py-3">
              <p className="text-xs font-bold text-gray-600 uppercase tracking-wide mb-1">{l.reflect}</p>
              <p className="text-sm text-gray-800 italic">{L(sp.reflect, lang)}</p>
            </div>

            <div className="flex flex-wrap gap-2 justify-between items-center pt-1">
              <div className="flex gap-2">
                <button disabled={idx <= 0} onClick={() => go(SPEECHES[idx - 1].id)} className="text-sm px-3 py-1.5 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-40">{l.prev}</button>
                <button disabled={idx >= SPEECHES.length - 1} onClick={() => go(SPEECHES[idx + 1].id)} className="text-sm px-3 py-1.5 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-40">{l.next}</button>
              </div>
              <button onClick={onCoach} className="text-sm px-3 py-1.5 rounded-lg bg-purple-700 hover:bg-purple-800 text-white font-semibold">{l.rehearse}</button>
            </div>
            <p className="text-[11px] text-gray-400">{l.note}</p>
          </div>
        </article>
      </div>
    </div>
  );
}
