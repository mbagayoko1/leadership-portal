// Practice playlists for the "Polish Your English" module, from the Accurate
// English YouTube channel (American English pronunciation and fluency for
// professionals). One list feeds the module's videos (src/data.js), its
// practice guide and the "Practise with" links in the module guides, so each
// URL is written once. Titles stay exactly as published on YouTube.
export const CHANNEL = "https://www.youtube.com/@AccurateEnglish/playlists";

const pl = (t, n, id) => ({ t, n, u: "https://www.youtube.com/playlist?list=" + id });

export const AE = {
  vowels: pl("American Vowel Sounds", 9, "PL6vMAFPIKMUjYavb5uTvaE6bIl5HequEE"),
  consonants: pl("Consonant Sounds", 9, "PL6vMAFPIKMUg7dvy5yk8dMuyebWzk0B9c"),
  difficult: pl("Difficult English Words", 33, "PL6vMAFPIKMUjbnPum3SEbbr6YUAkioxGm"),
  stress: pl("Word Stress and Rhythm", 7, "PL6vMAFPIKMUi1DJkw1K2S6Op8x0frrgY9"),
  linking: pl("Linking", 7, "PL6vMAFPIKMUjwlC4FhGVN7q4JF4QIhEAg"),
  accent: pl("American Accent Lessons", 4, "PL6vMAFPIKMUiuvBidLM_rAyyjzmInHUll"),
  grammar: pl("Fix your grammar mistakes", 15, "PL6vMAFPIKMUgzavWeCoKvQXlRImrZr80f"),
  native: pl("Tips for Specific Native Languages", 5, "PL6vMAFPIKMUhJ8iya7kEEzKFJfyuY-Oyr"),
  professional: pl("Professional English", 32, "PL6vMAFPIKMUh5ddIbyKx2m3N8zaz7_p7Y"),
  advanced: pl("Advanced Vocabulary", 18, "PL6vMAFPIKMUgV3udSPPsX8DNiEojRUbZK"),
  newspaper: pl("Advanced Vocabulary from the Newspaper", 23, "PL6vMAFPIKMUiG92nDjyWwmA5bOBm_9WAW"),
  hundred: pl("100 Advanced English Words challenge", 0, "PL6vMAFPIKMUiWC236wzF0NxL0TihVyCnD"),
  idioms: pl("Learn Idioms and Common Expressions", 40, "PL6vMAFPIKMUixwlw-psFY7i5ZKlP_YxzO"),
  drake: pl("Drake and Lisa teach expressions for fluent English", 13, "PL6vMAFPIKMUih65LhitSsPqdIquxYzmj9"),
  nativeLA: pl("Native Speakers in LA - speech analysis and idioms", 45, "PL6vMAFPIKMUjcDbO8P45IEnjZ8g1SPthq"),
  actors: pl("Actors in LA practicing the American Accent", 7, "PL6vMAFPIKMUgTk2qEsUxSq5aJwDk7KZnS"),
  short: pl("short videos", 15, "PL6vMAFPIKMUg54WeGaDSffxk8OufJfvfL")
};

// The five practice areas, in teaching order.
export const AREAS = [
  ["Sounds", ["vowels", "consonants", "difficult"]],
  ["Word stress, rhythm and linking", ["stress", "linking", "accent"]],
  ["Accuracy", ["grammar", "native"]],
  ["Professional vocabulary", ["professional", "advanced", "newspaper", "hundred"]],
  ["Natural fluency", ["idioms", "drake", "nativeLA", "actors", "short"]]
];

// "9 videos" / "9 vidéos"; the challenge playlist has no fixed count.
export const count = (p, lang) => p.n ? p.n + (lang === "fr" ? " vidéos" : " videos") : (lang === "fr" ? "Playlist" : "Playlist");

// Plain-text practice guide in the format of the other resource guides
// (src/data.js DDC): headings in capitals, bullets, a URL on the line after
// its name.
export function practiceGuide() {
  const areas = AREAS.map(([name, keys], i) =>
    `${i + 1}. ${name.toUpperCase()}\n` + keys.map(k => `• ${AE[k].t} (${count(AE[k], "en")})\n  ${AE[k].u}`).join("\n")
  ).join("\n\n");
  return `POLISH YOUR ENGLISH – PRACTICE GUIDE
Cohort 1 · 2026

ABOUT THE VIDEOS
The practice videos come from Accurate English, a YouTube channel on American English pronunciation and fluency for professionals. The goal is to be understood easily and to sound confident, not to change your accent. British and international English differ in a few sounds, for example the t in "water" and the r after a vowel in "work".
• Accurate English – all playlists
  ${CHANNEL}

HOW TO USE THIS MODULE
• Learn tab: six key concepts, each linked to the lessons that practise it, with worked examples and a weekly routine.
• Word bank tab: words and expressions grouped by theme, with pronunciation, meaning, an example and the lesson that teaches it. Tick each word you have learned.
• Videos tab: an eight-week path, then all the channel's lessons grouped by theme. Tick each video you have watched.

THE CHANNEL'S PLAYLISTS
The playlists overlap, and a few contain videos from other channels; the Videos tab groups the lessons by theme instead.

${areas}

DAILY PRACTICE ROUTINE (15 minutes)

STEP 1 – LISTEN (5 min)
Watch part of one video for this week's focus and note the rule in your own words.

STEP 2 – SHADOW (5 min)
Play a short passage, pause, and repeat it aloud with the same stress and rhythm.

STEP 3 – APPLY (5 min)
Say or write three sentences from your own work using the focus.

WEEKLY CHECK
• Record the same two-minute briefing and compare it with last week's.
• Check your three most frequent errors before sending important emails.`;
}
