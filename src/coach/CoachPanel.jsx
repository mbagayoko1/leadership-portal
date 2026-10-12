import { useState } from "react";
import { APIConnectionError } from "@anthropic-ai/sdk";
import { KeyRound, CheckCircle2 } from "lucide-react";
import AICoachModule from "./AICoachModule.jsx";
import { aiMode, connectWithKey, disconnectKey } from "./aiClient.js";
import { SM, CI } from "../data.js";

const FR_TITLES = {
  m1: "Connaissance de soi et image personnelle",
  m2: "Fondamentaux de la présence exécutive",
  m3: "Communication stratégique",
  m4: "Influencer sans autorité hiérarchique",
  m5: "Maîtrise de la prise de parole en public",
  m6: "Dialogue avec la haute direction",
  m7: "Communication de crise et adaptabilité",
  m8: "Leadership visionnaire",
  m9: "Navigation organisationnelle",
  m10: "Préparation au niveau de Représentant",
  m11: "Héritage et impact durable",
  vocal: "Entraînement vocal",
  reading: "Lectures et guides d'étude"
};

// The coach's "module in focus" picker uses the portal's real curriculum.
const COACH_MODULES = [...SM, ...CI].map(m => {
  const fr = FR_TITLES[m.id] || m.title;
  return m.ph
    ? { en: "Phase " + m.ph + ": " + m.title, fr: "Phase " + m.ph + " : " + fr }
    : { en: "Communication: " + m.title, fr: "Communication : " + fr };
});

function Connection({ t, mode, onChange }) {
  const [key, setKey] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  async function connect() {
    if (!key.trim() || busy) return;
    setBusy(true);
    setErr("");
    try {
      await connectWithKey(key);
      setKey("");
      onChange();
    } catch (e) {
      setErr(e instanceof APIConnectionError ? t.netError : t.badKey);
    }
    setBusy(false);
  }

  if (mode === "proxy") return null;
  if (mode === "key") {
    return (
      <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
        <CheckCircle2 className="w-3.5 h-3.5 text-green-600"/>
        <span>{t.connectedKey}</span>
        <button onClick={()=>{disconnectKey();onChange();}} className="text-orange-700 hover:underline font-semibold">{t.remove}</button>
      </div>
    );
  }
  return (
    <div className="ldp-card p-5 mb-4 border-l-4 border-l-orange-500">
      <div className="flex items-start gap-3">
        <div className="bg-orange-100 p-2 rounded-lg flex-shrink-0"><KeyRound className="w-5 h-5 text-orange-700"/></div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-800">{t.offTitle}</h3>
          <p className="text-sm text-gray-600 mt-1">{t.offBody}</p>
          <label htmlFor="ai-key" className="block text-xs font-semibold text-gray-600 mt-4 mb-1">{t.keyLabel}</label>
          <div className="flex gap-2 flex-wrap">
            <input id="ai-key" type="password" autoComplete="off" value={key} onChange={e=>setKey(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")connect();}} placeholder="sk-ant-…" className="ldp-input flex-1 min-w-[220px]"/>
            <button onClick={connect} disabled={busy||!key.trim()} className="bg-purple-700 hover:bg-purple-800 disabled:opacity-50 text-white px-5 py-2.5 rounded-lg text-sm font-semibold">{busy?t.checking:t.connect}</button>
          </div>
          {err&&<p role="alert" className="text-sm text-red-700 mt-2">{err}</p>}
          <p className="text-xs text-gray-500 mt-2">{t.keyHelp}</p>
          <a href="https://console.anthropic.com/settings/keys" target="_blank" rel="noopener noreferrer" className="inline-block text-xs text-blue-700 hover:underline mt-1">{t.getKey}</a>
        </div>
      </div>
    </div>
  );
}

export default function CoachPanel({ user, lang, setLang, t }) {
  const [mode, setMode] = useState(aiMode);
  return (
    <div>
      <Connection t={t.ai} mode={mode} onChange={()=>setMode(aiMode())}/>
      <AICoachModule
        currentUser={{ username: user.username, name: user.name, role: user.role }}
        modules={COACH_MODULES}
        language={lang}
        onLanguageChange={setLang}
        embedded
      />
    </div>
  );
}
