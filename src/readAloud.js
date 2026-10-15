// Read-aloud through the browser's speech synthesis, shared by the speech
// library and the speech builder.
import { useState, useEffect, useRef } from "react";

// Sentences, keeping closing quotes/brackets with their sentence.
const sentences = p => (p.match(/[^.!?…]+[.!?…]+["”»)']*\s*|[^.!?…]+$/g) || [p]).map(s => s.trim()).filter(Boolean);

// Reads paragraphs aloud one sentence at a time (long utterances get cut off
// in some browsers) and reports which paragraph is being read. `playing` is
// set straight away, since some browsers never fire the utterance events.
export function useReadAloud(lang) {
  const supported = typeof window !== "undefined" && "speechSynthesis" in window;
  const [para, setPara] = useState(-1);
  const runRef = useRef(0);
  const stop = () => { runRef.current++; if (supported) window.speechSynthesis.cancel(); setPara(-1); };
  useEffect(() => () => { runRef.current++; if (supported) window.speechSynthesis.cancel(); }, [supported]);
  function play(list) {
    stop();
    const run = ++runRef.current;
    const code = lang === "fr" ? "fr-FR" : "en-GB";
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find(v => v.lang === code) || voices.find(v => v.lang.slice(0, 2) === lang);
    const queue = [];
    list.forEach((p, i) => sentences(p).forEach(s => queue.push([i, s])));
    const mine = () => runRef.current === run;
    queue.forEach(([i, s], k) => {
      const u = new SpeechSynthesisUtterance(s);
      u.lang = code; if (voice) u.voice = voice; u.rate = 0.95;
      u.onstart = () => { if (mine()) setPara(i); };
      if (k === queue.length - 1) u.onend = () => { if (mine()) setPara(-1); };
      u.onerror = e => { if (mine() && e.error !== "interrupted" && e.error !== "canceled") stop(); };
      window.speechSynthesis.speak(u);
    });
    setPara(0);
  }
  return { supported, para, playing: para >= 0, play, stop };
}
