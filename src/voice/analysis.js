// Delivery analysis for the Voice studio. Pure functions: they take audio
// samples (a Float32Array from one channel) or text and return numbers, so
// they run the same in the browser and in the tests (test/voice.test.mjs).
// Everything here runs on the device; no audio is sent anywhere.

const FRAME_MS = 25;          // envelope resolution
const WORD_GAP_S = 0.25;      // gaps shorter than this are between words, not pauses
const MIN_PAUSE_S = 0.5;      // shortest gap counted as a pause
const ABS_FLOOR = 0.003;      // about -50 dBFS: quieter than this is silence

function percentile(sorted, p) {
  if (!sorted.length) return 0;
  const i = Math.min(sorted.length - 1, Math.max(0, Math.round(p * (sorted.length - 1))));
  return sorted[i];
}
const sortNum = a => Array.from(a).sort((x, y) => x - y);
const round = (x, d = 1) => (x == null || !isFinite(x)) ? null : Math.round(x * 10 ** d) / 10 ** d;

// Root-mean-square loudness per frame.
export function rmsEnvelope(samples, sampleRate, frameMs = FRAME_MS) {
  const size = Math.max(1, Math.round(sampleRate * frameMs / 1000));
  const n = Math.floor(samples.length / size);
  const rms = new Float32Array(n);
  for (let f = 0; f < n; f++) {
    let s = 0;
    for (let i = f * size, end = i + size; i < end; i++) s += samples[i] * samples[i];
    rms[f] = Math.sqrt(s / size);
  }
  return { rms, frameSec: size / sampleRate };
}

// Which frames contain voice. The threshold adapts to the recording: about
// 22 dB below the loud frames (soft syllables stay in), raised above the room noise when there is a clear gap
// between the two.
export function voicedMask(rms) {
  const sorted = sortNum(rms);
  const peak = percentile(sorted, 0.95);
  const noise = percentile(sorted, 0.1);
  // Treat the quietest frames as room noise only when they are quiet in
  // absolute terms (below about -34 dBFS); otherwise they are soft speech.
  const contrast = noise < peak * 0.5 && noise < 0.02;
  const threshold = Math.max(ABS_FLOOR, peak * 0.08, contrast ? noise * 2 : 0);
  const mask = new Uint8Array(rms.length);
  for (let i = 0; i < rms.length; i++) mask[i] = rms[i] > threshold ? 1 : 0;
  return mask;
}

// Pauses between the first and last voiced frame.
export function findPauses(mask, frameSec) {
  let first = -1, last = -1;
  for (let i = 0; i < mask.length; i++) if (mask[i]) { if (first < 0) first = i; last = i; }
  if (first < 0) return { pauses: [], spanSec: 0, voicedSec: 0 };
  const pauses = [];
  let voiced = 0, gap = 0;
  for (let i = first; i <= last; i++) {
    if (mask[i]) {
      voiced++;
      if (gap) {
        const s = gap * frameSec;
        if (s >= MIN_PAUSE_S) pauses.push(round(s, 2));
        else if (s < WORD_GAP_S) voiced += gap; // short gaps are part of speech
        gap = 0;
      }
    } else gap++;
  }
  return { pauses, spanSec: round((last - first + 1) * frameSec, 2), voicedSec: round(voiced * frameSec, 2) };
}

// How even the voice is: spread of loudness (in decibels) across voiced frames.
export function volumeSpreadDb(rms, mask) {
  const db = [];
  for (let i = 0; i < rms.length; i++) if (mask[i] && rms[i] > 0) db.push(20 * Math.log10(rms[i]));
  if (db.length < 4) return null;
  const mean = db.reduce((a, b) => a + b, 0) / db.length;
  const sd = Math.sqrt(db.reduce((a, b) => a + (b - mean) ** 2, 0) / db.length);
  return round(sd, 1);
}

// Pitch per frame (Hz, 0 when unvoiced) by normalised autocorrelation on a
// copy downsampled to about 12 kHz. Covers 70–400 Hz, the speaking range.
export function pitchTrack(samples, sampleRate, { minHz = 70, maxHz = 400 } = {}) {
  const step = Math.max(1, Math.floor(sampleRate / 12000));
  const sr = sampleRate / step;
  const n = Math.floor(samples.length / step);
  const x = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    let s = 0;
    for (let k = 0; k < step; k++) s += samples[i * step + k];
    x[i] = s / step;
  }
  const minLag = Math.floor(sr / maxHz), maxLag = Math.ceil(sr / minHz);
  const win = Math.max(2 * maxLag, Math.round(sr * 0.04));
  const hop = Math.round(win / 2);
  const out = [];
  for (let start = 0; start + win + maxLag < n; start += hop) {
    let energy = 0;
    for (let i = start; i < start + win; i++) energy += x[i] * x[i];
    if (energy / win < ABS_FLOOR * ABS_FLOOR) { out.push(0); continue; }
    const r = new Float32Array(maxLag + 2);
    for (let lag = minLag; lag <= maxLag + 1; lag++) {
      let num = 0, e1 = 0, e2 = 0;
      for (let i = start; i < start + win; i++) {
        const a = x[i], b = x[i + lag];
        num += a * b; e1 += a * a; e2 += b * b;
      }
      r[lag] = e1 && e2 ? num / Math.sqrt(e1 * e2) : 0;
    }
    let best = -1, bestR = 0;
    for (let lag = minLag + 1; lag <= maxLag; lag++) {
      if (r[lag] > r[lag - 1] && r[lag] >= r[lag + 1] && r[lag] > bestR) { bestR = r[lag]; best = lag; }
    }
    if (best < 0 || bestR < 0.6) { out.push(0); continue; }
    // Prefer the shortest lag that is nearly as strong: avoids reading an octave low.
    for (let div = 4; div >= 2; div--) {
      const cand = Math.round(best / div);
      for (let lag = Math.max(minLag + 1, cand - 2); lag <= Math.min(maxLag, cand + 2); lag++) {
        if (r[lag] > r[lag - 1] && r[lag] >= r[lag + 1] && r[lag] > 0.9 * bestR) { best = lag; bestR = r[lag]; div = 1; break; }
      }
    }
    const a = r[best - 1], b = r[best], c = r[best + 1];
    const shift = (a - 2 * b + c) ? 0.5 * (a - c) / (a - 2 * b + c) : 0;
    out.push(sr / (best + shift));
  }
  return out;
}

// How much the pitch moves: middle 80% range in semitones around the median.
export function pitchVariety(track) {
  const hz = track.filter(f => f > 0);
  if (hz.length < 8) return null;
  const sorted = sortNum(hz);
  const median = percentile(sorted, 0.5);
  const st = sortNum(hz.map(f => 12 * Math.log2(f / median)));
  return { medianHz: round(median, 0), rangeSt: round(percentile(st, 0.9) - percentile(st, 0.1), 1) };
}

// Share of the expected words that were heard, in order (for tongue twisters).
const words = s => String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")
  .replace(/['’]/g, " ").replace(/[^\p{L}\p{N}\s]/gu, " ").split(/\s+/).filter(Boolean);
export function wordAccuracy(expected, heard) {
  const a = words(expected), b = words(heard);
  if (!a.length) return null;
  const dp = Array.from({ length: a.length + 1 }, () => new Uint16Array(b.length + 1));
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++)
      dp[i][j] = a[i - 1] === b[j - 1] ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1]);
  return Math.round(100 * Math.min(1, dp[a.length][b.length] / a.length));
}

// Everything the studio shows for one take. `speech` is speechMeta() of the
// transcript (words and fillers), or null when the browser cannot transcribe.
export function analyseTake(samples, sampleRate, speech, expected) {
  const { rms, frameSec } = rmsEnvelope(samples, sampleRate);
  const mask = voicedMask(rms);
  const p = findPauses(mask, frameSec);
  const pv = p.spanSec ? pitchVariety(pitchTrack(samples, sampleRate)) : null;
  const minutes = p.spanSec / 60;
  // A transcript with no words means recognition heard nothing (blocked or
  // unsupported), not that the speaker used no fillers.
  const heard = speech && speech.words > 0;
  const fillers = heard ? Object.values(speech.fillers || {}).reduce((a, b) => a + b, 0) : null;
  return {
    secs: p.spanSec,
    wpm: heard && p.spanSec >= 4 ? Math.round(speech.words / minutes) : null,
    fillersPerMin: fillers != null && p.spanSec >= 4 ? round(fillers / minutes, 1) : null,
    fillers: heard ? speech.fillers : null,
    pauses: p.pauses.length,
    longestPause: p.pauses.length ? Math.max(...p.pauses) : 0,
    goodPauses: p.pauses.filter(s => s >= 1.5 && s <= 3.5).length,
    volumeDb: volumeSpreadDb(rms, mask),
    pitchRangeSt: pv ? pv.rangeSt : null,
    medianHz: pv ? pv.medianHz : null,
    accuracy: expected && heard ? wordAccuracy(expected, speech.text) : null
  };
}
