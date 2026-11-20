// Voice studio (Personal Development → Voice studio, or #voice/<drill>): a
// guided warm-up and six drills. Takes are recorded and analysed in the
// browser (src/voice/analysis.js); only the numbers and the date are saved.
// The audio stays in memory for playback and is never uploaded.
import { useState, useEffect, useRef } from "react";
import { Mic, Square, RotateCcw, Play, Pause, SkipForward, CheckCircle2, Sparkles, AlertTriangle, Shuffle } from "lucide-react";
import { loadJSON, saveJSON } from "./storage.js";
import { speechMeta } from "./coach/companion.js";
import { useReadAloud } from "./readAloud.js";
import { listen, getRecognitionCtor } from "./voice/speech.js";
import { analyseTake } from "./voice/analysis.js";
import { DRILLS, WARMUP, TARGETS, TIPS, scoreTake } from "./voice/drills.js";

const L = (o, lang) => (o && (o[lang] || o.en)) || "";
const canRecord = () => typeof navigator !== "undefined" && !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) && typeof window.MediaRecorder !== "undefined";
const fmtTime = s => Math.floor(s / 60) + ":" + String(Math.floor(s % 60)).padStart(2, "0");
const STATUS_CLS = { good: "bg-green-50 text-green-800 border-green-200", near: "bg-amber-50 text-amber-900 border-amber-200", work: "bg-orange-50 text-orange-800 border-orange-200" };
const pick = (list, not) => { const opts = list.filter(x => x !== not); return opts[Math.floor(Math.random() * opts.length)] || list[0]; };

export default function VoiceStudio({ t, lang, user, drill, onDrill }) {
  const k = t.pd.voice;
  const uname = user ? user.username : "_";
  const [data, setData] = useState({ takes: [], warmups: [] });
  const current = DRILLS.find(d => d.id === drill) || DRILLS[0];
  useEffect(() => { let on = true; loadJSON("voice_" + uname, null).then(v => { if (on && v && Array.isArray(v.takes)) setData({ takes: v.takes, warmups: v.warmups || [] }); }); return () => { on = false; }; }, [uname]);
  function save(next) { setData(next); saveJSON("voice_" + uname, next); }
  const lastOf = id => [...data.takes].reverse().find(x => x.d === id);

  return (
    <div className="space-y-4">
      <div className="ldp-card p-4 space-y-2">
        <h3 className="font-semibold text-gray-800 lg:hidden">{k.title}</h3>
        <p className="text-sm text-gray-600 lg:hidden">{k.sub}</p>
        <p className="text-xs text-gray-500">{k.privacy}</p>
        {!canRecord() && <p role="status" className="text-xs text-amber-900 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">{k.noMic}</p>}
        {canRecord() && !getRecognitionCtor() && <p role="status" className="text-xs text-amber-900 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">{k.noRecognition}</p>}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[15rem_minmax(0,1fr)] gap-4 items-start">
        <nav aria-label={k.drills} className="ldp-card p-2 lg:sticky lg:top-6">
          <ol className="flex lg:block gap-1 overflow-x-auto no-scrollbar">
            {DRILLS.map(d => {
              const last = d.id === "warmup" ? null : lastOf(d.id);
              const st = last && scoreTake(d.id, last).rows.find(r => r.focus);
              return (
                <li key={d.id} className="flex-shrink-0 lg:flex-shrink">
                  <button onClick={() => onDrill(d.id)} aria-current={d.id === current.id ? "step" : undefined}
                    className={"w-full flex items-center gap-2 text-left text-sm leading-snug px-2 py-2 rounded-lg transition-colors " + (d.id === current.id ? "bg-orange-50 font-semibold text-gray-900 shadow-[inset_3px_0_0_#E85D1F]" : "text-gray-700 hover:bg-gray-100")}>
                    <span className="whitespace-nowrap lg:whitespace-normal flex-1">{L(d.title, lang)}</span>
                    {d.id === "warmup" && data.warmups.length > 0 && <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" aria-label={k.warmupCount(data.warmups.length)} />}
                    {st && <span className={"w-2 h-2 rounded-full flex-shrink-0 " + (st.status === "good" ? "bg-green-500" : st.status === "near" ? "bg-amber-400" : "bg-orange-500")} aria-label={k.status[st.status]} />}
                  </button>
                </li>
              );
            })}
          </ol>
        </nav>

        {current.id === "warmup"
          ? <Warmup key={"warmup" + lang} k={k} lang={lang} count={data.warmups.length} onDone={() => save({ ...data, warmups: [...data.warmups, new Date().toISOString()].slice(-200) })} />
          : <Drill key={current.id + lang} k={k} lang={lang} drill={current} history={data.takes.filter(x => x.d === current.id)}
              onTake={take => save({ ...data, takes: [...data.takes, take].slice(-300) })} />}
      </div>
    </div>
  );
}

function Warmup({ k, lang, count, onDone }) {
  const [i, setI] = useState(0);
  const [left, setLeft] = useState(WARMUP[0].secs);
  const [running, setRunning] = useState(false);
  const [cues, setCues] = useState(true);
  const [finished, setFinished] = useState(false);
  const tts = useReadAloud(lang);
  const step = WARMUP[i];
  const total = WARMUP.reduce((a, s) => a + s.secs, 0);
  const elapsed = WARMUP.slice(0, i).reduce((a, s) => a + s.secs, 0) + (step.secs - left);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setLeft(s => s - 1), 1000);
    return () => clearInterval(id);
  }, [running]);
  useEffect(() => {
    if (left > 0 || !running) return;
    if (i < WARMUP.length - 1) go(i + 1);
    else { setRunning(false); setFinished(true); onDone(); if (cues && tts.supported) tts.play([k.warmupDone]); }
  }, [left]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => () => tts.stop(), []); // eslint-disable-line react-hooks/exhaustive-deps

  function go(n) {
    setI(n); setLeft(WARMUP[n].secs);
    if (cues && tts.supported) tts.play([L(WARMUP[n].title, lang) + ". " + L(WARMUP[n].how, lang)]);
  }
  function startPause() {
    if (finished) { setFinished(false); go(0); setRunning(true); return; }
    if (!running && elapsed === 0 && cues && tts.supported) tts.play([L(step.title, lang) + ". " + L(step.how, lang)]);
    setRunning(r => !r);
  }

  return (
    <article className="ldp-card overflow-hidden min-w-0">
      <header className="p-5 border-b border-gray-100">
        <p className="ldp-eyebrow">{k.stepOf(i + 1, WARMUP.length)}</p>
        <h3 className="text-2xl font-semibold text-gray-900 font-serif">{L(step.title, lang)}</h3>
        <p className="text-sm text-gray-700 mt-2 leading-relaxed">{L(step.how, lang)}</p>
      </header>
      <div className="p-5 space-y-4">
        <div className="flex items-baseline gap-3">
          <p className="font-mono text-4xl text-gray-900" aria-live="off">{fmtTime(Math.max(0, left))}</p>
          <p className="text-xs text-gray-500">{k.totalLeft(fmtTime(Math.max(0, total - elapsed)))}</p>
        </div>
        <div className="ldp-progress-bar h-1.5"><div className="ldp-progress-fill h-1.5" style={{ width: (elapsed / total * 100) + "%" }} /></div>
        {finished && <p role="status" className="text-sm text-green-800 bg-green-50 border border-green-200 rounded-lg px-3 py-2">{k.warmupDone}</p>}
        <div className="flex flex-wrap gap-2 items-center">
          <button onClick={startPause} className="ldp-btn">{running ? <><Pause className="w-4 h-4" aria-hidden="true" />{k.pause}</> : <><Play className="w-4 h-4" aria-hidden="true" />{finished ? k.again : elapsed ? k.resume : k.start}</>}</button>
          <button onClick={() => { if (i < WARMUP.length - 1) go(i + 1); }} disabled={i >= WARMUP.length - 1} className="ldp-btn-outline"><SkipForward className="w-4 h-4" aria-hidden="true" />{k.next}</button>
          {tts.supported && <label className="flex items-center gap-1.5 text-sm text-gray-600 ml-auto"><input type="checkbox" checked={cues} onChange={e => { setCues(e.target.checked); if (!e.target.checked) tts.stop(); }} />{k.cues}</label>}
        </div>
        <ol className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-xs">
          {WARMUP.map((s, n) => (
            <li key={s.id}><button onClick={() => go(n)} className={"w-full text-left px-2 py-1.5 rounded border " + (n === i ? "border-orange-300 bg-orange-50 text-gray-900" : n < i ? "border-gray-100 text-gray-400" : "border-gray-200 text-gray-600 hover:bg-gray-50")}>{n + 1}. {L(s.title, lang)} <span className="font-mono">{fmtTime(s.secs)}</span></button></li>
          ))}
        </ol>
        <p className="text-xs text-gray-500">{k.warmupCount(count)}</p>
      </div>
    </article>
  );
}

function Drill({ k, lang, drill, history, onTake }) {
  const twisters = drill.twisters ? drill.twisters[lang] || drill.twisters.en : null;
  const topics = drill.topics ? drill.topics[lang] || drill.topics.en : null;
  const [twister, setTwister] = useState(twisters ? twisters[0] : null);
  const [topic, setTopic] = useState(topics ? pick(topics) : null);
  const [phase, setPhase] = useState("idle"); // idle | recording | analysing | done
  const [secs, setSecs] = useState(0);
  const [level, setLevel] = useState(0);
  const [heard, setHeard] = useState("");
  const [result, setResult] = useState(null);
  const [audioUrl, setAudioUrl] = useState("");
  const [err, setErr] = useState("");
  const [ai, setAi] = useState(null);
  const [aiTip, setAiTip] = useState({ busy: false, text: "", err: "" });
  const R = useRef({});
  const heardRef = useRef("");

  useEffect(() => { let on = true; import("./coach/aiClient.js").then(m => { if (on) setAi(m); }).catch(() => {}); return () => { on = false; }; }, []);
  useEffect(() => () => { cleanup(); if (R.current.url) URL.revokeObjectURL(R.current.url); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const passage = twister || (drill.text ? L(drill.text, lang) : "");
  const expected = twister ? [twister, twister, twister].join(" ") : null;

  function cleanup() {
    const r = R.current;
    if (r.raf) cancelAnimationFrame(r.raf);
    if (r.timer) clearInterval(r.timer);
    if (r.listener) { try { r.listener.stop(); } catch (e) { /* stopped */ } }
    if (r.stream) r.stream.getTracks().forEach(tr => tr.stop());
    if (r.ctx && r.ctx.state !== "closed") r.ctx.close().catch(() => {});
    R.current = { url: r.url };
  }

  async function start() {
    setErr(""); setResult(null); setAiTip({ busy: false, text: "", err: "" }); setHeard(""); heardRef.current = "";
    if (!canRecord()) { setErr(k.noMic); return; }
    let stream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: false } });
    } catch (e) {
      setErr(e && (e.name === "NotAllowedError" || e.name === "SecurityError") ? k.micDenied : k.micMissing);
      return;
    }
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 2048;
    ctx.createMediaStreamSource(stream).connect(analyser);
    const buf = new Float32Array(analyser.fftSize);
    let lastPaint = 0;
    const meter = ts => {
      analyser.getFloatTimeDomainData(buf);
      if (ts - lastPaint > 80) {
        let s = 0; for (let i = 0; i < buf.length; i++) s += buf[i] * buf[i];
        setLevel(Math.min(1, Math.sqrt(s / buf.length) * 6));
        lastPaint = ts;
      }
      R.current.raf = requestAnimationFrame(meter);
    };
    const chunks = [];
    const rec = new MediaRecorder(stream);
    rec.ondataavailable = e => { if (e.data && e.data.size) chunks.push(e.data); };
    rec.onstop = () => finish(new Blob(chunks, { type: rec.mimeType || "audio/webm" }));
    const t0 = Date.now();
    R.current = { url: R.current.url, stream, ctx, rec, t0,
      raf: requestAnimationFrame(meter),
      timer: setInterval(() => {
        const s = (Date.now() - t0) / 1000;
        setSecs(s);
        if (s >= drill.maxSecs) stop();
      }, 250),
      listener: listen(lang, text => { heardRef.current = text; setHeard(text); })
    };
    rec.start();
    setSecs(0); setPhase("recording");
  }

  function stop() {
    const r = R.current;
    if (!r.rec || r.rec.state === "inactive") return;
    r.secs = (Date.now() - r.t0) / 1000;
    if (r.listener) { const finalText = r.listener.stop(); if (finalText.length >= heardRef.current.length) heardRef.current = finalText; }
    r.rec.stop();
    setPhase("analysing");
  }

  async function finish(blob) {
    const secsRec = R.current.secs || 0;
    cleanup();
    if (R.current.url) URL.revokeObjectURL(R.current.url);
    const url = URL.createObjectURL(blob);
    R.current.url = url;
    setAudioUrl(url);
    try {
      const ab = await blob.arrayBuffer();
      const dctx = new (window.AudioContext || window.webkitAudioContext)();
      const audio = await dctx.decodeAudioData(ab);
      dctx.close().catch(() => {});
      await new Promise(res => setTimeout(res, 30)); // let "Analysing…" paint
      const text = heardRef.current;
      const speech = getRecognitionCtor() ? { ...speechMeta(text, secsRec), text } : null;
      const m = analyseTake(audio.getChannelData(0), audio.sampleRate, speech, expected);
      const take = { id: Date.now().toString(36), d: drill.id, at: new Date().toISOString(), secs: m.secs, wpm: m.wpm, fillersPerMin: m.fillersPerMin, goodPauses: m.goodPauses, pauses: m.pauses, volumeDb: m.volumeDb, pitchRangeSt: m.pitchRangeSt, accuracy: m.accuracy };
      setResult({ m, score: scoreTake(drill.id, m), text });
      if (m.secs >= 1) onTake(take);
    } catch (e) {
      setErr(k.analyseFailed);
    }
    setPhase("done");
  }

  async function askAi() {
    if (!ai || !result) return;
    setAiTip({ busy: true, text: "", err: "" });
    const rows = result.score.rows.map(r => k.metric[r.key] + ": " + r.value + " (" + k.target[r.key] + ")").join("; ");
    const system = "You are a warm, precise voice and public-speaking coach for professionals in a UN leadership programme. Give one specific, practical tip with a 30-second drill, in at most 70 words, in " + (lang === "fr" ? "French" : "English") + ". The figures are estimates from browser speech recognition and audio analysis; do not over-interpret them.";
    const msg = "Drill: " + L(drill.title, "en") + ". Goal: " + L(drill.goal, "en") + "\nMeasures: " + rows + "\nWhat the browser transcribed: " + (result.text || "(no transcript)").slice(0, 1500);
    try {
      const text = await ai.aiComplete(system, [{ role: "user", content: msg }]);
      setAiTip({ busy: false, text, err: "" });
    } catch (e) {
      const kind = ai.aiErrorKind(e);
      setAiTip({ busy: false, text: "", err: k.aiErr[kind] || k.aiErr.other });
    }
  }

  const tip = result && TIPS[result.score.tip.metric] && (TIPS[result.score.tip.metric][result.score.tip.dir] || TIPS[result.score.tip.metric].ok);
  const recent = [...history].reverse().slice(0, 6);
  const focusKey = drill.focus[0];

  return (
    <article className="ldp-card overflow-hidden min-w-0">
      <header className="p-5 border-b border-gray-100">
        <h3 className="text-2xl font-semibold text-gray-900 font-serif">{L(drill.title, lang)}</h3>
        <p className="text-sm text-gray-600 mt-1">{L(drill.goal, lang)}</p>
        <p className="text-xs text-gray-500 mt-2">{k.targetLabel}: {drill.focus.map(f => k.metric[f] + " " + k.target[f]).join(" · ")}</p>
      </header>
      <div className="p-5 space-y-5">
        <section>
          <div className="flex flex-wrap justify-between items-center gap-2 mb-2">
            <h4 className="text-sm font-bold text-gray-700">{topic ? k.topic : k.readThis}</h4>
            {twisters && <button onClick={() => setTwister(pick(twisters, twister))} disabled={phase === "recording"} className="ldp-btn-outline text-xs py-1"><Shuffle className="w-3.5 h-3.5" aria-hidden="true" />{k.newTwister}</button>}
            {topics && <button onClick={() => setTopic(pick(topics, topic))} disabled={phase === "recording"} className="ldp-btn-outline text-xs py-1"><Shuffle className="w-3.5 h-3.5" aria-hidden="true" />{k.newTopic}</button>}
          </div>
          <p className={"font-serif text-gray-900 leading-relaxed bg-gray-50 border border-gray-100 rounded-lg px-4 py-3 " + (twister || topic || drill.id === "pitch" ? "text-xl" : "text-lg")}>{topic || passage}</p>
        </section>

        <section className="space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            {phase === "recording"
              ? <button onClick={stop} className="ldp-btn-accent"><Square className="w-4 h-4" aria-hidden="true" />{k.stop}</button>
              : <button onClick={start} disabled={phase === "analysing"} className="ldp-btn-accent">{phase === "done" ? <RotateCcw className="w-4 h-4" aria-hidden="true" /> : <Mic className="w-4 h-4" aria-hidden="true" />}{phase === "done" ? k.again : k.record}</button>}
            {phase === "recording" && <>
              <span className="font-mono text-sm text-gray-700">{fmtTime(secs)} / {fmtTime(drill.maxSecs)}</span>
              <span className="flex-1 min-w-[6rem] max-w-xs h-2 rounded-full bg-gray-100 overflow-hidden" role="meter" aria-label={k.level} aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(level * 100)}>
                <span className="block h-full bg-orange-500 transition-[width] duration-75" style={{ width: Math.round(level * 100) + "%" }} />
              </span>
            </>}
            {phase === "analysing" && <span role="status" className="text-sm text-gray-600">{k.analysing}</span>}
          </div>
          {err && <p role="alert" className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2 flex gap-2"><AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" aria-hidden="true" />{err}</p>}
          {phase === "recording" && heard && <p className="text-sm text-gray-500 italic">{heard}</p>}
        </section>

        {result && phase === "done" && (
          <section className="space-y-3" aria-live="polite">
            <h4 className="text-sm font-bold text-gray-700">{k.results}</h4>
            {result.score.rows.length > 0 && (
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {result.score.rows.map(r => (
                  <li key={r.key} className={"rounded-lg border px-3 py-2 " + STATUS_CLS[r.status]}>
                    <p className="text-xs font-semibold">{k.metric[r.key]}{r.focus ? " ★" : ""}</p>
                    <p className="font-mono text-lg">{r.value}{TARGETS[r.key].unit === "%" ? "%" : " " + TARGETS[r.key].unit}</p>
                    <p className="text-xs">{k.status[r.status]} · {k.target[r.key]}</p>
                  </li>
                ))}
              </ul>
            )}
            {tip && <div className="bg-purple-50 border-l-4 border-purple-700 rounded-lg px-4 py-3"><p className="text-xs font-bold text-purple-800 mb-1">{k.tip}</p><p className="text-sm text-gray-800">{L(tip, lang)}</p></div>}
            {result.m.fillers && Object.keys(result.m.fillers).length > 0 && <p className="text-xs text-gray-600">{k.fillersHeard}: {Object.entries(result.m.fillers).map(([f, n]) => "“" + f + "” ×" + n).join(", ")}</p>}
            {audioUrl && <div><p className="text-xs font-semibold text-gray-600 mb-1">{k.playback}</p><audio controls src={audioUrl} className="w-full max-w-md" /></div>}
            {result.text && <details className="text-sm"><summary className="cursor-pointer text-gray-600">{k.heard}</summary><p className="mt-1 text-gray-700 italic">{result.text}</p></details>}
            <p className="text-xs text-gray-500">{k.estimates}</p>
            {ai && ai.aiConnected && ai.aiConnected() && result.score.rows.length > 0 && (
              <div>
                <button onClick={askAi} disabled={aiTip.busy} className="ldp-btn-outline"><Sparkles className="w-4 h-4" aria-hidden="true" />{aiTip.busy ? k.aiThinking : k.aiTip}</button>
                {aiTip.text && <p className="text-sm text-gray-800 mt-2 whitespace-pre-line">{aiTip.text}</p>}
                {aiTip.err && <p role="alert" className="text-sm text-red-700 mt-2">{aiTip.err}</p>}
              </div>
            )}
          </section>
        )}

        <section>
          <h4 className="text-sm font-bold text-gray-700 mb-2">{k.history}</h4>
          {recent.length === 0 ? <p className="text-sm text-gray-500">{k.noHistory}</p> : (
            <ul className="divide-y divide-gray-100">
              {recent.map(h => {
                const row = scoreTake(drill.id, h).rows.find(r => r.key === focusKey);
                return (
                  <li key={h.id} className="py-1.5 flex items-center gap-3 text-sm">
                    <span className="text-gray-500 w-28 flex-shrink-0">{new Date(h.at).toLocaleDateString(lang === "fr" ? "fr-FR" : "en-GB", { day: "numeric", month: "short" })} {new Date(h.at).toLocaleTimeString(lang === "fr" ? "fr-FR" : "en-GB", { hour: "2-digit", minute: "2-digit" })}</span>
                    <span className="font-mono text-gray-800">{row ? row.value + (TARGETS[focusKey].unit === "%" ? "%" : " " + TARGETS[focusKey].unit) : "–"}</span>
                    {row && <span className={"text-xs px-1.5 py-0.5 rounded border " + STATUS_CLS[row.status]}>{k.status[row.status]}</span>}
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </div>
    </article>
  );
}
