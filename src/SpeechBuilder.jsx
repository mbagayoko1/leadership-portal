// Speech builder (Personal Development tab): a speech brief (goal, audience,
// occasion, format, content, protocol) that produces a full draft. With the
// AI Coach connected the draft is written by Claude and streamed in; without
// it, a structured template draft is built locally. Drafts can be edited,
// refined, read aloud, copied, downloaded and saved per user.
import { useState, useEffect, useRef } from "react";
import { PenLine, Sparkles, FileText, Volume2, Square, Copy, Check, Download, Save, Trash2, RotateCcw, Wand2 } from "lucide-react";
import { OPTIONS, emptyBrief, buildPrompt, revisePrompt, parseOutput, buildDraft, targetWords, wordCount } from "./speechBuilder.js";
import { DEVICES } from "./speeches.js";
import { aiMode, aiStream, aiErrorKind } from "./coach/aiClient.js";
import { useReadAloud } from "./readAloud.js";
import { loadJSON, saveJSON } from "./storage.js";

const L = (o, lang) => (o && (o[lang] || o.en)) || "";
// Work in progress survives a trip to another tab (per user, this session).
const memo = {};

function Select({ id, label, value, onChange, children }) {
  return (
    <div>
      <label htmlFor={id} className="ldp-label">{label}</label>
      <select id={id} value={value} onChange={e => onChange(e.target.value)} className="ldp-input py-2">{children}</select>
    </div>
  );
}

function Text({ id, label, value, onChange, placeholder, area, rows = 3 }) {
  const C = area ? "textarea" : "input";
  return (
    <div>
      <label htmlFor={id} className="ldp-label">{label}</label>
      <C id={id} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={area ? rows : undefined} className="ldp-input py-2" />
    </div>
  );
}

export default function SpeechBuilder({ t, lang, user, onCoach, onConnect }) {
  const k = t.pd.sb;
  const uname = user ? user.username : "_";
  const saved0 = memo[uname] || {};
  const [b, setB] = useState(saved0.b || emptyBrief(lang, user));
  const [out, setOut] = useState(saved0.out || null);      // parsed draft
  const [raw, setRaw] = useState(saved0.raw || "");        // AI answer (for revisions)
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [copied, setCopied] = useState(false);
  const [lib, setLib] = useState([]);
  const [justSaved, setJustSaved] = useState(false);
  const abortRef = useRef(null);
  const mode = aiMode();
  const tts = useReadAloud(out ? (b.language === "fr" ? "fr" : "en") : lang);

  useEffect(() => { memo[uname] = { b, out, raw }; }, [uname, b, out, raw]);
  useEffect(() => { let on = true; loadJSON("speechdrafts_" + uname, []).then(v => { if (on) setLib(Array.isArray(v) ? v : []); }); return () => { on = false; }; }, [uname]);
  useEffect(() => () => { if (abortRef.current) abortRef.current.abort(); }, []);

  const set = (f, v) => setB(x => ({ ...x, [f]: v }));
  const setMsg = (i, v) => setB(x => ({ ...x, messages: x.messages.map((m, j) => j === i ? v : m) }));
  const toggleDevice = d => setB(x => ({ ...x, devices: x.devices.includes(d) ? x.devices.filter(y => y !== d) : [...x.devices, d] }));

  async function runAi(messages, brief = b) {
    const { system } = buildPrompt(brief);
    setErr(""); setBusy(true); tts.stop();
    const ctrl = new AbortController(); abortRef.current = ctrl;
    let acc = "";
    try {
      const full = await aiStream(system, messages, d => { acc += d; setOut({ ...parseOutput(acc), streaming: true }); }, ctrl.signal);
      setRaw(full); setOut(parseOutput(full));
    } catch (e) {
      if (e.name !== "AbortError") setErr(k.errors[aiErrorKind(e)] || k.errors.other);
      if (acc) { setRaw(acc); setOut(parseOutput(acc)); }
    }
    setBusy(false); abortRef.current = null;
  }

  function generateAi() {
    if (!b.topic.trim()) { setErr(k.needTopic); return; }
    runAi([{ role: "user", content: buildPrompt(b).user }]);
  }
  function refine(instruction, brief = b) {
    if (!raw) return;
    runAi([{ role: "user", content: buildPrompt(b).user }, { role: "assistant", content: raw }, { role: "user", content: revisePrompt(instruction, brief) }], brief);
  }
  function template() {
    if (!b.topic.trim()) { setErr(k.needTopic); return; }
    setErr(""); tts.stop(); setRaw(""); setOut(buildDraft(b));
  }
  function newBrief() { tts.stop(); setB(emptyBrief(lang, user)); setOut(null); setRaw(""); setErr(""); }

  const fullText = () => out ? [out.title, "", out.speech].join("\n") : "";
  async function copy() {
    try { await navigator.clipboard.writeText(fullText()); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch { /* clipboard blocked */ }
  }
  function download() {
    const body = [out.title, "", k.keyMessage + ": " + out.key, "", out.speech, "", k.delivery + ":", ...out.delivery.map(d => "- " + d), ...(out.notes.length ? ["", k.toCheck + ":", ...out.notes.map(n => "- " + n)] : [])].join("\n");
    const url = URL.createObjectURL(new Blob([body], { type: "text/plain;charset=utf-8" }));
    const a = document.createElement("a");
    a.href = url; a.download = (out.title || "speech").replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-|-$/g, "").slice(0, 60) + ".txt";
    a.click(); URL.revokeObjectURL(url);
  }
  function save() {
    const item = { id: Date.now(), at: new Date().toISOString(), brief: b, out: { ...out, streaming: false }, raw };
    const next = [item, ...lib].slice(0, 30);
    setLib(next); saveJSON("speechdrafts_" + uname, next);
    setJustSaved(true); setTimeout(() => setJustSaved(false), 1800);
  }
  function openSaved(it) { tts.stop(); setB(it.brief); setOut(it.out); setRaw(it.raw || ""); setErr(""); window.scrollTo({ top: 0, behavior: "smooth" }); }
  function delSaved(id) { const next = lib.filter(x => x.id !== id); setLib(next); saveJSON("speechdrafts_" + uname, next); }

  const opt = group => Object.entries(OPTIONS[group]).map(([v, o]) => <option key={v} value={v}>{L(o, lang)}</option>);
  const words = out ? wordCount(out.speech) : 0;
  const paras = out ? out.speech.split(/\n\s*\n/).filter(Boolean) : [];
  const otherLang = b.language === "fr" ? "en" : "fr";

  return (
    <div className="space-y-4">
      <div className="ldp-card p-5">
        <div className="flex items-start gap-3">
          <div className="bg-orange-100 p-2 rounded-lg flex-shrink-0"><PenLine className="w-5 h-5 text-orange-700" /></div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-800 font-serif">{k.title}</h3>
            <p className="text-sm text-gray-600">{k.sub}</p>
            <p className="text-xs text-gray-500 mt-2">{k.honesty}</p>
          </div>
          <button onClick={newBrief} className="ldp-btn-outline flex-shrink-0"><RotateCcw className="w-3.5 h-3.5" /><span className="hidden sm:inline">{k.newBrief}</span></button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 items-start">
        {/* ── Brief ── */}
        <form className="ldp-card p-5 space-y-6 lg:col-span-2" onSubmit={e => { e.preventDefault(); mode === "off" ? template() : generateAi(); }}>
          <section className="space-y-3">
            <p className="ldp-section-title"><span className="w-5 h-5 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center font-semibold">1</span>{k.s1}</p>
            <Text id="sb-topic" label={k.topic} value={b.topic} onChange={v => set("topic", v)} placeholder={k.topicPh} />
            <Text id="sb-title" label={k.workingTitle} value={b.title} onChange={v => set("title", v)} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Select id="sb-goal" label={k.goal} value={b.goal} onChange={v => set("goal", v)}>{opt("goal")}</Select>
              <Select id="sb-occ" label={k.occasion} value={b.occasion} onChange={v => set("occasion", v)}>{opt("occasion")}</Select>
            </div>
            <Text id="sb-occn" label={k.occasionNote} value={b.occasionNote} onChange={v => set("occasionNote", v)} placeholder={k.occasionNotePh} />
          </section>

          <section className="space-y-3">
            <p className="ldp-section-title"><span className="w-5 h-5 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center font-semibold">2</span>{k.s2}</p>
            <Select id="sb-aud" label={k.audience} value={b.audience} onChange={v => set("audience", v)}>{opt("audience")}</Select>
            <Text id="sb-audn" label={k.audienceNote} value={b.audienceNote} onChange={v => set("audienceNote", v)} placeholder={k.audienceNotePh} area rows={2} />
            <Text id="sb-spk" label={k.speaker} value={b.speaker} onChange={v => set("speaker", v)} />
          </section>

          <section className="space-y-3">
            <p className="ldp-section-title"><span className="w-5 h-5 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center font-semibold">3</span>{k.s3}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Select id="sb-min" label={k.minutes} value={b.minutes} onChange={v => set("minutes", +v)}>{OPTIONS.minutes.map(n => <option key={n} value={n}>{k.minutesOpt(n)}</option>)}</Select>
              <Select id="sb-tone" label={k.tone} value={b.tone} onChange={v => set("tone", v)}>{opt("tone")}</Select>
              <Select id="sb-lang" label={k.language} value={b.language} onChange={v => set("language", v)}><option value="en">English</option><option value="fr">Français</option></Select>
              <Select id="sb-str" label={k.structure} value={b.structure} onChange={v => set("structure", v)}>{opt("structure")}</Select>
            </div>
          </section>

          <section className="space-y-3">
            <p className="ldp-section-title"><span className="w-5 h-5 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center font-semibold">4</span>{k.s4}</p>
            <fieldset className="space-y-2">
              <legend className="ldp-label">{k.messages}</legend>
              {b.messages.map((m, i) => <input key={i} aria-label={k.messagePh(i + 1)} value={m} onChange={e => setMsg(i, e.target.value)} placeholder={k.messagePh(i + 1)} className="ldp-input py-2" />)}
            </fieldset>
            <Text id="sb-story" label={k.story} value={b.story} onChange={v => set("story", v)} placeholder={k.storyPh} area />
            <Text id="sb-facts" label={k.facts} value={b.facts} onChange={v => set("facts", v)} placeholder={k.factsPh} area rows={2} />
            <Text id="sb-cta" label={k.cta} value={b.cta} onChange={v => set("cta", v)} placeholder={k.ctaPh} />
          </section>

          <section className="space-y-3">
            <p className="ldp-section-title"><span className="w-5 h-5 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center font-semibold">5</span>{k.s5}</p>
            <Text id="sb-acks" label={k.acks} value={b.acks} onChange={v => set("acks", v)} placeholder={k.acksPh} area rows={3} />
            <Text id="sb-avoid" label={k.avoid} value={b.avoid} onChange={v => set("avoid", v)} placeholder={k.avoidPh} />
            <fieldset>
              <legend className="ldp-label">{k.devices}</legend>
              <div className="flex flex-wrap gap-1.5">
                {Object.keys(DEVICES).map(d => (
                  <button type="button" key={d} onClick={() => toggleDevice(d)} aria-pressed={b.devices.includes(d)} className={"ldp-chip " + (b.devices.includes(d) ? "ldp-chip-on" : "ldp-chip-off")}>{L(DEVICES[d], lang)}</button>
                ))}
              </div>
            </fieldset>
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input type="checkbox" checked={b.quote} onChange={e => set("quote", e.target.checked)} className="w-4 h-4 accent-orange-600" />{k.quote}
            </label>
          </section>

          {mode === "off" && (
            <div className="text-xs text-amber-900 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
              {k.aiOff} <button type="button" onClick={onConnect} className="font-semibold underline">{k.connectAi}</button>
            </div>
          )}
          {err && <p role="alert" className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{err}</p>}
          <div className="flex flex-wrap gap-2">
            {busy
              ? <button type="button" onClick={() => abortRef.current && abortRef.current.abort()} className="ldp-btn"><Square className="w-3.5 h-3.5" />{k.stop}</button>
              : <button type="submit" disabled={mode === "off"} className="ldp-btn-accent"><Sparkles className="w-4 h-4" />{k.generateAi}</button>}
            <button type="button" onClick={template} disabled={busy} className="ldp-btn-outline"><FileText className="w-4 h-4" />{k.template}</button>
          </div>
        </form>

        {/* ── Draft ── */}
        <div className="lg:col-span-3 space-y-4">
          {!out ? (
            <div className="ldp-card p-10 text-center">
              <PenLine className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              <p className="font-semibold text-gray-700">{k.emptyTitle}</p>
              <p className="text-sm text-gray-500 mt-1 max-w-md mx-auto">{k.emptyBody}</p>
            </div>
          ) : (
            <article className="ldp-card overflow-hidden" aria-busy={busy}>
              <header className="p-5 border-b border-gray-100 space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={"text-[11px] font-semibold px-2 py-0.5 rounded-full " + (out.template ? "bg-gray-100 text-gray-600" : "bg-purple-100 text-purple-800")}>{out.template ? k.draftTemplate : k.draftAi}</span>
                  <span className="font-mono text-[11px] text-gray-500">{k.words(words, targetWords(b))}</span>
                  {busy && <span className="text-[11px] text-orange-700 animate-pulse">{k.generating}</span>}
                </div>
                <textarea aria-label={k.workingTitle} value={out.title} onChange={e => setOut({ ...out, title: e.target.value.replace(/\n/g, " ") })}
                  rows={Math.min(3, Math.max(1, Math.ceil(out.title.length / 32)))} style={{ fieldSizing: "content" }}
                  className="w-full resize-none text-xl sm:text-2xl leading-snug font-semibold text-gray-800 font-serif bg-transparent border-0 p-0 focus:ring-0" />
                {out.key && <p className="text-sm text-gray-600"><span className="font-semibold text-purple-800">{k.keyMessage}:</span> {out.key}</p>}
              </header>

              <div className="p-5 space-y-5">
                {!busy && (
                  <div className="flex flex-wrap gap-2">
                    {tts.supported && (tts.playing
                      ? <button onClick={tts.stop} className="ldp-btn"><Square className="w-3.5 h-3.5" />{k.stopReading}</button>
                      : <button onClick={() => tts.play(paras)} className="ldp-btn"><Volume2 className="w-4 h-4" />{k.read}</button>)}
                    <button onClick={copy} className="ldp-btn-outline">{copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}{copied ? k.copied : k.copy}</button>
                    <button onClick={download} className="ldp-btn-outline"><Download className="w-4 h-4" />{k.download}</button>
                    <button onClick={save} className="ldp-btn-outline">{justSaved ? <Check className="w-4 h-4 text-green-600" /> : <Save className="w-4 h-4" />}{justSaved ? k.saved : k.save}</button>
                  </div>
                )}

                {busy || tts.playing ? (
                  <div className="space-y-3 font-serif text-[17px] leading-relaxed text-gray-800">
                    {paras.map((p, i) => <p key={i} className={"rounded transition-colors " + (tts.para === i ? "bg-yellow-100 -mx-2 px-2" : "")}>{p}</p>)}
                    {busy && !paras.length && <div className="space-y-2">{[90, 75, 85].map(w => <div key={w} className="h-4 rounded shimmer" style={{ width: w + "%" }} />)}</div>}
                  </div>
                ) : (
                  <textarea aria-label={k.speech} value={out.speech} onChange={e => setOut({ ...out, speech: e.target.value })}
                    rows={Math.min(40, Math.max(12, Math.ceil(out.speech.length / 70) + paras.length))}
                    className="w-full font-serif text-[17px] leading-relaxed text-gray-800 bg-white border border-gray-200 rounded-lg p-4 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 outline-none" />
                )}

                {!busy && raw && mode !== "off" && (
                  <div>
                    <p className="ldp-label flex items-center gap-1.5"><Wand2 className="w-3.5 h-3.5 text-purple-700" />{k.refine}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {[["shorter", "shorter, about " + Math.round(targetWords(b) * 0.7) + " words"], ["longer", "longer, about " + Math.round(targetWords(b) * 1.3) + " words, with more examples"], ["formal", "more formal and diplomatic"], ["warmer", "warmer and more personal"], ["simpler", "in simpler, plainer words for a mixed audience"], ["translate", "translated into " + (otherLang === "fr" ? "French" : "English") + ", adapted rather than literal"]].map(([key, ins]) => (
                        <button key={key} onClick={() => { const nb = key === "translate" ? { ...b, language: otherLang } : b; if (nb !== b) setB(nb); refine("make it " + ins + ".", nb); }} className="ldp-chip ldp-chip-off">{key === "translate" ? (otherLang === "fr" ? k.translate : (lang === "fr" ? "Traduire en anglais" : "Translate to English")) : k[key]}</button>
                      ))}
                    </div>
                  </div>
                )}

                {out.delivery.length > 0 && (
                  <section className="bg-purple-50 border-l-4 border-purple-700 rounded-lg px-4 py-3">
                    <h4 className="text-xs font-bold text-purple-800 uppercase tracking-wide mb-2">{k.delivery}</h4>
                    <ul className="space-y-1">{out.delivery.map((d, i) => <li key={i} className="text-sm text-gray-800">{d}</li>)}</ul>
                  </section>
                )}
                {out.notes.length > 0 && (
                  <section className="bg-amber-50 border-l-4 border-amber-400 rounded-lg px-4 py-3">
                    <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wide mb-2">{k.toCheck}</h4>
                    <ul className="space-y-1">{out.notes.map((d, i) => <li key={i} className="text-sm text-gray-800">{d}</li>)}</ul>
                  </section>
                )}
                {!busy && <button onClick={onCoach} className="ldp-btn">{k.rehearse}</button>}
              </div>
            </article>
          )}

          <div className="ldp-card p-4">
            <h4 className="text-sm font-bold text-gray-700 mb-2">{k.library} <span className="font-mono text-xs text-gray-400">({lib.length})</span></h4>
            {lib.length === 0 ? <p className="text-sm text-gray-500">{k.none}</p> : (
              <ul className="divide-y divide-gray-100">
                {lib.map(it => (
                  <li key={it.id} className="py-2 flex items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-800 truncate">{it.out.title}</p>
                      <p className="text-xs text-gray-500">{new Date(it.at).toLocaleDateString(lang === "fr" ? "fr-FR" : "en-GB", { day: "numeric", month: "short", year: "numeric" })} · {L(OPTIONS.goal[it.brief.goal], lang)} · {wordCount(it.out.speech)} {lang === "fr" ? "mots" : "words"}</p>
                    </div>
                    <button onClick={() => openSaved(it)} className="ldp-btn-outline">{k.open}</button>
                    <button onClick={() => delSaved(it.id)} aria-label={k.del + ": " + it.out.title} className="p-2 text-gray-400 hover:text-red-600 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
