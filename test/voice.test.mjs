// Checks for the Voice studio's analysis with synthetic signals: no microphone.
// Run: npm run test:voice (part of npm run check)
const { rmsEnvelope, voicedMask, findPauses, volumeSpreadDb, pitchTrack, pitchVariety, wordAccuracy, analyseTake } = await import("../src/voice/analysis.js");
const { scoreTake, DRILLS, VE_DRILL } = await import("../src/voice/drills.js");
const { CUR } = await import("../src/data.js");

let pass = 0, fail = 0;
const ok = (name, cond, extra = "") => { cond ? pass++ : (fail++, console.log("FAIL", name, extra)); };
const SR = 48000;
const silence = s => new Float32Array(Math.round(s * SR));
const tone = (s, hz, amp = 0.3) => { const x = new Float32Array(Math.round(s * SR)); for (let i = 0; i < x.length; i++) x[i] = amp * Math.sin(2 * Math.PI * hz * i / SR); return x; };
// A glide that rises one octave at an even rate in semitones.
const glide = (s, from, to, amp = 0.3) => { const n = Math.round(s * SR), x = new Float32Array(n); let ph = 0; for (let i = 0; i < n; i++) { const f = from * Math.pow(to / from, i / n); ph += 2 * Math.PI * f / SR; x[i] = amp * Math.sin(ph); } return x; };
const join = (...parts) => { const n = parts.reduce((a, p) => a + p.length, 0), x = new Float32Array(n); let o = 0; for (const p of parts) { x.set(p, o); o += p.length; } return x; };
// Light background noise, as a real room has.
const noisy = (x, amp = 0.001) => { let seed = 7; return x.map(v => v + amp * ((seed = (seed * 16807) % 2147483647) / 2147483647 - 0.5)); };

// Silence: nothing voiced, no pauses, no pitch.
{
  const x = silence(2);
  const { rms, frameSec } = rmsEnvelope(x, SR);
  const mask = voicedMask(rms);
  ok("silence has no voiced frames", mask.every(v => v === 0));
  ok("silence has no pauses or span", findPauses(mask, frameSec).spanSec === 0);
  ok("silence has no pitch", pitchVariety(pitchTrack(x, SR)) === null);
}

// Steady 220 Hz: found at 220 Hz, almost no pitch movement, even volume.
{
  const x = noisy(tone(2, 220));
  const pv = pitchVariety(pitchTrack(x, SR));
  ok("steady tone pitch is 220 Hz", pv && Math.abs(pv.medianHz - 220) <= 3, JSON.stringify(pv));
  ok("steady tone has under 0.5 semitone range", pv && pv.rangeSt < 0.5, JSON.stringify(pv));
  const { rms } = rmsEnvelope(x, SR);
  ok("steady tone is fully voiced", voicedMask(rms).every(v => v === 1));
  ok("steady tone has under 0.5 dB volume spread", volumeSpreadDb(rms, voicedMask(rms)) < 0.5);
}

// One-octave glide: about 12 semitones end to end, so the middle 80% is about 9.6.
{
  const pv = pitchVariety(pitchTrack(noisy(glide(2, 150, 300)), SR));
  ok("glide range is 8–11 semitones", pv && pv.rangeSt > 8 && pv.rangeSt < 11, JSON.stringify(pv));
}

// Tone, 1.2 s of silence, tone: one pause of about 1.2 s.
{
  const x = noisy(join(tone(1, 200), silence(1.2), tone(1, 200)));
  const { rms, frameSec } = rmsEnvelope(x, SR);
  const p = findPauses(voicedMask(rms), frameSec);
  ok("one pause found", p.pauses.length === 1, JSON.stringify(p));
  ok("pause lasts about 1.2 s", p.pauses.length === 1 && Math.abs(p.pauses[0] - 1.2) < 0.06, JSON.stringify(p));
  ok("span is about 3.2 s", Math.abs(p.spanSec - 3.2) < 0.08, JSON.stringify(p));
}

// Gaps between words (0.15 s) are not pauses.
{
  const x = noisy(join(tone(0.4, 200), silence(0.15), tone(0.4, 200), silence(0.15), tone(0.4, 200)));
  const { rms, frameSec } = rmsEnvelope(x, SR);
  ok("short word gaps are not pauses", findPauses(voicedMask(rms), frameSec).pauses.length === 0);
}

// Volume that jumps from quiet to loud spreads well over 5 dB.
{
  const x = noisy(join(tone(1, 200, 0.05), tone(1, 200, 0.4)));
  const { rms } = rmsEnvelope(x, SR);
  const sd = volumeSpreadDb(rms, voicedMask(rms));
  ok("uneven volume spreads over 5 dB", sd > 5, sd);
}

// Word accuracy for tongue twisters.
ok("all words heard = 100", wordAccuracy("Red leather, yellow leather.", "red leather yellow leather") === 100);
ok("half heard = 50", wordAccuracy("red leather yellow leather", "red leather") === 50);
ok("accents and apostrophes ignored", wordAccuracy("Ton thé t'a-t-il ôté ta toux ?", "ton the t a t il ote ta toux") === 100);
ok("nothing heard = 0", wordAccuracy("red leather", "") === 0);

// Pace from a transcript of 75 words over a 30 s span = 150 wpm.
{
  const x = noisy(tone(30, 180));
  const speech = { words: 75, fillers: { um: 2 }, text: "" };
  const m = analyseTake(x, SR, speech, null);
  ok("pace is 150 wpm", m.wpm === 150, m.wpm);
  ok("fillers per minute is 4", m.fillersPerMin === 4, m.fillersPerMin);
  const noTranscript = analyseTake(x, SR, null, null);
  ok("no transcript means no pace", noTranscript.wpm === null && noTranscript.fillersPerMin === null);
  const empty = analyseTake(x, SR, { words: 0, fillers: {}, text: "" }, null);
  ok("an empty transcript is not zero fillers", empty.wpm === null && empty.fillersPerMin === null && empty.fillers === null);
}

// Scoring: each focus metric judged against its target.
{
  const good = scoreTake("pace", { wpm: 150, fillersPerMin: 1, pauses: 3, goodPauses: 0, volumeDb: 3, pitchRangeSt: 5, secs: 40 });
  ok("150 wpm is good for the pace drill", good.rows[0].key === "wpm" && good.rows[0].status === "good", JSON.stringify(good.rows[0]));
  const fast = scoreTake("pace", { wpm: 190, secs: 40 });
  ok("190 wpm needs work, tip says slow down", fast.rows[0].status === "work" && fast.tip.metric === "wpm" && fast.tip.dir === "high", JSON.stringify(fast.tip));
  const flat = scoreTake("pitch", { pitchRangeSt: 1.2, secs: 10 });
  ok("1.2 semitones is monotone", flat.rows[0].status === "work" && flat.tip.dir === "low");
  const none = scoreTake("fillers", { secs: 0 });
  ok("no speech gives the no-speech tip", none.tip.metric === "none");
}

// Every vocal exercise in the curriculum points to a drill that exists.
{
  const ids = new Set(DRILLS.map(d => d.id));
  const missing = [];
  for (const ph of Object.values(CUR)) for (const m of ph.modules) m.ve.forEach((_, i) => { const d = (VE_DRILL[m.id] || [])[i]; if (!ids.has(d)) missing.push(m.id + "_v" + i); });
  ok("every curriculum vocal exercise has a drill", missing.length === 0, missing.join());
}

console.log(`${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
