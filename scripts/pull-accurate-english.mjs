// Pulls every video from the Accurate English playlists (src/accurateEnglish.js),
// keeps only videos published by the channel itself, leaves out partisan
// politics, sorts each video into ONE theme, and writes src/englishVideos.js.
// The channel name comes from the playlist page itself (17 requests in all).
//
//   npm run pull:english
//
// Video titles and durations are stored as published. Nothing else from the
// videos (descriptions, captions) is copied. Rerun when the channel adds
// videos; a video no rule matches is reported so you can add a rule.
import fs from "node:fs";
import { AE } from "../src/accurateEnglish.js";

const CHANNEL_NAME = "AccurateEnglish";
const OUT = new URL("../src/englishVideos.js", import.meta.url);
const HEADERS = { "User-Agent": "Mozilla/5.0", "Accept-Language": "en" };

// Left out to keep the portal politically neutral.
const EXCLUDE = /kamala|trump|presidential/i;

// Theme for specific videos whose title alone is misleading.
const OVERRIDE = {
  "lSKdLBkjWlU": "words", "LAb_r9gmrYw": "words", "PoMadUj5J6M": "advanced",
  "EJ0uPP3Jrwk": "professional", "JmIaCnBuDeI": "professional",
  "hTPUJDJqThw": "sounds", "HLY7qSva4mQ": "sounds", "GwgEY2JJXV8": "sounds", "CdOgNXwCUYE": "sounds",
  "7-nacBzEQJ0": "conversations", "BtVoMYlDy-Q": "conversations",
  "63p92Oe7lgE": "conversations", "WgNW9T75dU8": "conversations", "j9gIk9g5dyM": "conversations",
  "RHGYHDyOMks": "conversations", "Yp9gsjwAZL0": "conversations",
  "A72MZwKC0Q0": "business", "Hm4avtI1g1s": "business", "iWSJUzLnJT4": "business"
};

// First matching rule wins. Order matters.
const RULES = [
  ["learning", /Tips for Specific|for Portuguese|Chinese speakers|Russian and German|Different American Accents|British vs\. American|Teaching Actors|Teach Actors|Hollywood Actor|How she got|America's Got Talent|Accent Tips I Teach|Improve Your American Accent Fast|Techniques to improve your English|TRULY fluent|be fluent in English - 8|Fluent English in 2024|Is perfect grammar|Foreign Accent|Why English Pronunciation is Different|interview with a student/i],
  ["listening", /Understand(ing)? Native Speakers|understanding jokes|If you laugh/i],
  ["informal", /slang|proverb/i],
  ["rhythm", /stress|rhythm|intonation|linking|Connecting Words|connect English words|monotone|"THEM"|Rhythm Mistakes/i],
  ["grammar", /grammar|comma|punctuation|articles|"THE"|Add an S|Preposition/i],
  ["sounds", /vowel|"MAN"|"bit"|L sound|with R |Three common mistakes of English pronunciation|"water"/i],
  ["words", /pronounc|pronunciation (mistakes|test)|Pronunciation Mistakes|Pronunciation Test|Confusing English Words|"further"|"breath"|Swell|dessert|twenty|Numbers|States and Cities|Brands|awry|entrepreneur|Literally|WOMAN|DEBUT|foreign|Pronunciation Test|Mistakes You Should Fix/i],
  ["news", /newspaper|news|Wall Street|New York Times/i],
  ["advanced", /Advanced (English )?Words|Advanced Vocabulary|VERBS your English|these words, your English|instead of "very"|"BETTERING"|"Outstanding"|esque|MISLEADING|don't say, "I like it"/i],
  ["business", /Business|Professional English Expressions|Professional English - 16|Professional English Expressions|"Deal"/i],
  ["idioms", /idiom|expression|phrasal|"TALK"|"PICK"|Extent|make up for/i],
  ["conversations", /native speaker|Drake|Megan|Psychologist|Fireman|Buying a House|Los Angeles|in LA|Getty/i],
  ["professional", /professional|Job Interview|Confident|Siri|money and finance|Clients|vocabulary mistakes/i]
];
const THEMES = ["learning", "sounds", "rhythm", "words", "grammar", "professional", "business", "advanced", "news", "idioms", "listening", "conversations", "informal"];

const clean = t => t.replace(/\s*\|\s*Accurate English\s*$/i, "").replace(/\s*#shorts\s*/gi, " ").replace(/\s+/g, " ").trim();

async function playlist(url) {
  const h = await (await fetch(url + "&hl=en", { headers: HEADERS })).text();
  const m = h.match(/var ytInitialData = (\{.*?\});<\/script>/s);
  if (!m) throw new Error("No playlist data at " + url);
  const out = [];
  const walk = o => {
    if (!o || typeof o !== "object") return;
    const v = o.lockupViewModel;
    if (v && v.contentType === "LOCKUP_CONTENT_TYPE_VIDEO") {
      const d = (JSON.stringify(v.contentImage || {}).match(/"text":"(\d+:\d+(?::\d+)?)"/) || [])[1] || "";
      const md = v.metadata.lockupMetadataViewModel;
      const rows = ((md.metadata || {}).contentMetadataViewModel || {}).metadataRows || [];
      // Two rows = channel name, then views and age. YouTube drops the channel
      // row when the video belongs to the playlist's own channel, which for
      // these playlists is Accurate English.
      const by = rows.length >= 2 ? ((((rows[0].metadataParts || [])[0] || {}).text) || {}).content : CHANNEL_NAME;
      out.push({ id: v.contentId, t: md.title.content, d, by });
      return;
    }
    Object.values(o).forEach(walk);
  };
  walk(JSON.parse(m[1]));
  return out;
}

const videos = new Map();
for (const p of Object.values(AE)) for (const v of await playlist(p.u)) if (!videos.has(v.id)) videos.set(v.id, v);
const themes = Object.fromEntries(THEMES.map(k => [k, []]));
const left = [], unmatched = [];
for (const v of videos.values()) {
  if (!v.by) throw new Error("No channel name for " + v.id + " (" + v.t + "); YouTube may have changed its page.");
  if (v.by !== CHANNEL_NAME) { left.push(`other channel (${v.by}): ${v.t}`); continue; }
  if (EXCLUDE.test(v.t)) { left.push("politics: " + v.t); continue; }
  const theme = OVERRIDE[v.id] || (RULES.find(([, re]) => re.test(v.t)) || [])[0];
  if (!theme) { unmatched.push(v.id + " " + v.t); continue; }
  themes[theme].push({ id: v.id, t: clean(v.t), d: v.d });
}

const total = Object.values(themes).reduce((n, l) => n + l.length, 0);
fs.writeFileSync(OUT, `// Generated by scripts/pull-accurate-english.mjs on ${new Date().toISOString().slice(0, 10)}. Do not edit by hand.
// ${total} videos from the Accurate English YouTube channel, one theme each.
// Left out: ${left.length} (videos from other channels saved in the playlists, and partisan politics).
export default ${JSON.stringify(themes, null, 1).replace(/\n\s+(?=[}\]])/g, "").replace(/\{\n\s+/g, "{ ").replace(/,\n\s+"(t|d)"/g, ', "$1"')};
`);
console.log(`${total} videos in ${THEMES.length} themes → src/englishVideos.js`);
THEMES.forEach(k => console.log(`  ${k.padEnd(14)} ${themes[k].length}`));
if (left.length) console.log("Left out:\n  " + left.join("\n  "));
if (unmatched.length) { console.log("No theme (add a rule or override):\n  " + unmatched.join("\n  ")); process.exit(1); }
