// Sources for the "Polish Your French" module: the advanced-level YouTube
// channels and the playlists taken from each, plus two institutional sites.
// One list feeds the pull script (scripts/pull-french.mjs), the module's
// links (src/data.js) and its practice guide. Text is [English, French].

export const FR_CHANNELS = {
  pierre: { name: "Français avec Pierre", u: "https://www.youtube.com/@FrancaisavecPierre", d: ["Grammar, common mistakes, expressions and DELF/DALF preparation, explained in French.", "Grammaire, fautes fréquentes, expressions et préparation au DELF et au DALF, expliquées en français."] },
  cuf: { name: "Comme une Française", u: "https://www.youtube.com/channel/UC-ZFVrf5NVlmgZ0hItLT0pg", d: ["Advanced vocabulary, subtle points, emails and French social codes, with explanations in English.", "Vocabulaire avancé, subtilités, courriels et codes sociaux français, avec des explications en anglais."] },
  fa: { name: "Français Authentique", u: "https://www.youtube.com/@francaisauthentique", d: ["The French language and authentic expressions, entirely in French, for people who already understand but want to speak.", "La langue française et les expressions authentiques, entièrement en français, pour qui comprend déjà mais veut parler."] },
  nathalie: { name: "Nathalie FLE", u: "https://www.youtube.com/@NathalieFLE", d: ["For intermediate and advanced learners: pronunciation, everyday expressions and advice for speaking fluently.", "Pour les niveaux intermédiaire et avancé : prononciation, expressions courantes et conseils pour parler couramment."] },
  inner: { name: "innerFrench", u: "https://www.youtube.com/@innerFrench", d: ["Topics that matter (society, science, culture) discussed in clear, natural French.", "Des sujets de fond (société, science, culture) traités dans un français clair et naturel."] },
  easy: { name: "Easy French", u: "https://www.youtube.com/@EasyFrench", d: ["Street interviews across the French-speaking world, including a B2–C1 series and intercultural topics.", "Des interviews dans la rue à travers la francophonie, dont une série B2-C1 et des sujets interculturels."] },
  wandering: { name: "Wandering French", u: "https://www.youtube.com/channel/UCY4GGvdC-zwlD9RA2esmXmA", d: ["A teacher with over 20 years' experience: grammar, vocabulary and pronunciation, including Quebec French.", "Un enseignant de plus de 20 ans d'expérience : grammaire, vocabulaire et prononciation, y compris le français du Québec."] }
};

// Playlists taken from each channel, with the theme a video gets when its
// title does not say otherwise. Playlist titles as published.
export const FR_PLAYLISTS = [
  { c: "pierre", id: "PLcoQWyFpRIxhy9NaZreokcxWBE5uf6_H_", t: "NE FAITES PLUS LA FAUTE!", theme: "errors" },
  { c: "pierre", id: "PLcoQWyFpRIxgoKQmVzmcFzh2EII2gPPuf", t: "EXPRESSIONS FRANÇAISES", theme: "expressions" },
  { c: "pierre", id: "PLcoQWyFpRIxj6J0PAo_3SAJkCInMsoRoC", t: "FRENCH VOCABULARY AND EXPRESSIONS", theme: "vocab" },
  { c: "pierre", id: "PLcoQWyFpRIxius46L4YAXpd6a-LFFoMVs", t: "DELF, DALF, TCF et autres examens de français", theme: "exams" },
  { c: "pierre", id: "PLcoQWyFpRIxjtSHTsjYjzfdaAhtLHCsNT", t: "FRENCH TESTS AND EXAMS | DELF, DALF, TCF", theme: "exams" },
  { c: "pierre", id: "PLcoQWyFpRIxjC5pBdvcNa8pvrdKGSR3UY", t: "FRENCH DICTATIONS | IMPROVE YOUR FRENCH", theme: "writing" },
  { c: "pierre", id: "PLcoQWyFpRIxgHEEOTjhAY0HBtFvgH5BkQ", t: "LEARN FRENCH WITH FRENCH INTERVIEWS", theme: "listening" },
  { c: "pierre", id: "PLcoQWyFpRIxia__8_HhpiyvI41ZC1eEu3", t: "HOW TO LEARN FRENCH?", theme: "learning" },
  { c: "cuf", id: "PL2u4oHkid_n24MZccnGTRep1WM930HPm7", t: "Advanced French: Vocabulary, Pronunciation, Subtle Points", theme: "vocab" },
  { c: "cuf", id: "PL2u4oHkid_n0a_8nSJQvXDCpBbXEKMs94", t: "Practice your Pronunciation", theme: "pronunciation" },
  { c: "cuf", id: "PL2u4oHkid_n1xrjW9DksBgVDuA_R7irZU", t: "Never say that in French!", theme: "errors" },
  { c: "cuf", id: "PL2u4oHkid_n335nrLaF5Kuly6rbGQbFze", t: "Classic expat mistakes", theme: "errors" },
  { c: "cuf", id: "PL2u4oHkid_n3bLB19C49zcvJkeemlQcLC", t: "Email in French", theme: "writing" },
  { c: "cuf", id: "PL2u4oHkid_n0kAt6WeDWE22QkqG3BNUmF", t: "Understand French Customs & Avoid Cultural Misunderstandings", theme: "culture" },
  { c: "cuf", id: "PL2u4oHkid_n072cF4RUd3kfZxmN5b5lVK", t: "Social occasions in France", theme: "culture" },
  { c: "cuf", id: "PL2u4oHkid_n3fSjW-EI1QLc7pG0Pnc1Yp", t: "Conversation en francais", theme: "listening" },
  { c: "fa", id: "PLFjbBR3UHcAKUY_fW3Qpk4Ms6BDk5FgoV", t: "La langue française", theme: "vocab" },
  { c: "fa", id: "PLFjbBR3UHcAIBuSyB7HAQsl0rspnKZNQm", t: "Expressions Authentiques", theme: "expressions" },
  { c: "fa", id: "PLFjbBR3UHcALNiaVRW_Z4bdMedz8X34K8", t: "Grammaire Authentique", theme: "grammar" },
  { c: "fa", id: "PLFjbBR3UHcAKSU7S3yXnVyvg4XZdQ09s8", t: "7 règles pour parler français sans bloquer", theme: "learning" },
  { c: "nathalie", id: "PLT66QkzUQUhWnvOsj7ur1C5uz3g3bZyFz", t: "Bien prononcer le français", theme: "pronunciation" },
  { c: "nathalie", id: "PLT66QkzUQUhXXLoZm0nTeNflEWkXMO-eE", t: "Français familier et expressions", theme: "familiar" },
  { c: "nathalie", id: "PLT66QkzUQUhWGjfFpVh9QiRmX-8c0N666", t: "le mot du jour", theme: "vocab" },
  { c: "nathalie", id: "PLT66QkzUQUhUqAYj5T1yEWHSQxRcjHeUY", t: "Interviews en français", theme: "listening" },
  { c: "nathalie", id: "PLT66QkzUQUhWds9L8Q2QBb9m_mlzzSLW0", t: "Conseils pour apprendre le français", theme: "learning" },
  { c: "inner", id: "PLycTNLUo2y2G3mGyNAiihBqO32gDVYwj6", t: "Vidéos récentes", theme: "listening" },
  { c: "inner", id: "PLycTNLUo2y2GBG8VqxxnMwXo9_FYf6u8V", t: "Accents", theme: "pronunciation" },
  { c: "easy", id: "PLnazreCxpqRncZ__JlexKjoZvIhpLwU3i", t: "French For Advanced Learners (B2-C1)", theme: "listening" },
  { c: "easy", id: "PLnazreCxpqRkRIhyUTP9wW91O6yL4ScCS", t: "Interculturality", theme: "culture" },
  { c: "wandering", id: "PLhzHJfy2j-I4U_xRjokLe2KeTJonNe65w", t: "Grammaire française", theme: "grammar" },
  { c: "wandering", id: "PLhzHJfy2j-I7v0GtHIWV6cYavl2mPSN6V", t: "Vocabulaire français", theme: "vocab" },
  { c: "wandering", id: "PLhzHJfy2j-I5rngSOBXcuQ-UssrCuvJr9", t: "Prononciation française", theme: "pronunciation" }
];

// Institutional resources outside YouTube.
export const FR_SITES = [
  { t: "TV5MONDE – Apprendre le français", u: "https://apprendre.tv5monde.com/fr", s: "Tool" },
  { t: "RFI – Le français facile (Journal en français facile)", u: "https://francaisfacile.rfi.fr/fr/", s: "Tool" }
];

// Reading list for the module (Readings tab).
export const FR_READS = [
  "Mamadou et Bineta sont devenus grands – André Davesne (classic reader from West African schools)",
  "Le Petit Prince – Antoine de Saint-Exupéry",
  "Exercices de style – Raymond Queneau (one story told in 99 styles and registers)",
  "Le Bon Usage – Maurice Grevisse (grammar reference)",
  "Bescherelle : La conjugaison pour tous (conjugation reference)"
];

// Plain-text practice guide in the format of the other resource guides
// (src/data.js DDC): headings in capitals, bullets, a URL on the line after
// its name.
export function frenchPracticeGuide() {
  const channels = Object.values(FR_CHANNELS).map(c => `• ${c.name}: ${c.d[0]}\n  ${c.u}`).join("\n");
  const sites = FR_SITES.map(s => `• ${s.t}\n  ${s.u}`).join("\n");
  return `POLISH YOUR FRENCH – PRACTICE GUIDE
Cohort 1 · 2026

ABOUT THE MODULE
For professionals who already speak French and want it to be precise, correct and suited to formal work: notes, emails to authorities, meetings and presentations. The goal is to be understood easily and taken seriously, whatever your accent.

HOW TO USE THIS MODULE
• Learn tab: six key concepts, each linked to the lessons that practise it, with worked examples and a weekly routine.
• Quiz tab: ten questions on the module's concepts, vocabulary and examples.
• Word bank tab: false friends, connectors, formal register, email formulas, meetings and facilitation, advanced words, expressions, proverbs and quotations. Tick each entry you have learned.
• Practice tab: a quiz and a matching game built from the word bank.
• Videos tab: an eight-week path, then the lessons of seven channels grouped by theme. Tick each video you have watched.

THE CHANNELS
${channels}

OTHER RESOURCES
${sites}

DAILY PRACTICE ROUTINE (15 minutes)

STEP 1 – LISTEN (5 min)
Watch part of one video for this week's focus and note the rule in your own words.

STEP 2 – SHADOW (5 min)
Play a short passage, pause, and repeat it aloud with the same rhythm, liaisons and intonation.

STEP 3 – APPLY (5 min)
Say or write three sentences from your own work using the focus.

WEEKLY CHECK
• Record the same two-minute briefing in French and compare it with last week's.
• Before sending an important email in French, check its opening, register and closing formula.`;
}
