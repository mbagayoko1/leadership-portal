// Browser speech recognition, shared by the AI Coach and the Voice studio.
// Available in Chrome and Edge (and some Safari versions); null elsewhere.
export function getRecognitionCtor() {
  if (typeof window === "undefined") return null;
  return window.SpeechRecognition || window.webkitSpeechRecognition || null;
}

// Transcribes continuously until stop() is called, restarting when the
// browser ends recognition after a silence. onText receives the full text so
// far (final parts plus the current guess).
export function listen(lang, onText) {
  const Ctor = getRecognitionCtor();
  if (!Ctor) return null;
  let finalText = "", stopped = false, rec = null;
  const start = () => {
    rec = new Ctor();
    rec.lang = lang === "fr" ? "fr-FR" : "en-GB";
    rec.continuous = true;
    rec.interimResults = true;
    rec.onresult = e => {
      let interim = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const r = e.results[i];
        if (r.isFinal) finalText += r[0].transcript + " ";
        else interim += r[0].transcript;
      }
      onText((finalText + interim).trim());
    };
    rec.onend = () => { if (!stopped) { try { start(); } catch (e) { /* the page is closing */ } } };
    rec.onerror = e => { if (e.error === "not-allowed" || e.error === "service-not-allowed") stopped = true; };
    try { rec.start(); } catch (e) { /* already started */ }
  };
  start();
  return {
    stop() { stopped = true; try { rec && rec.stop(); } catch (e) { /* already stopped */ } return finalText.trim(); },
    text: () => finalText.trim()
  };
}
