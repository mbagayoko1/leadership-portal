// Themes, eight-week path and concept links for the "Polish Your English"
// video library. The videos themselves are generated into englishVideos.js by
// scripts/pull-accurate-english.mjs; this file only describes and orders them.
// Text is [English, French]. Video titles stay as published on YouTube.

export const watchUrl = id => "https://www.youtube.com/watch?v=" + id;

export const THEMES = [
  { k: "learning", t: ["Start here: accent coaching and learning strategies", "Pour commencer : conseils d'accent et stratégies d'apprentissage"],
    d: ["Why English pronunciation differs from other languages, tips for specific first languages, and how professionals and actors practise.", "Pourquoi la prononciation anglaise diffère des autres langues, des conseils selon la langue maternelle, et la façon dont professionnels et acteurs s'entraînent."] },
  { k: "sounds", t: ["Vowel and consonant sounds", "Voyelles et consonnes"],
    d: ["The vowels and consonants that most often cause misunderstanding, including the American t and r.", "Les voyelles et consonnes qui causent le plus de malentendus, dont le t et le r américains."] },
  { k: "rhythm", t: ["Word stress, rhythm, linking and intonation", "Accent tonique, rythme, enchaînement et intonation"],
    d: ["The music of English: which syllables to stress, how words join, and how intonation sounds confident.", "La musique de l'anglais : quelles syllabes accentuer, comment les mots s'enchaînent, et une intonation qui inspire confiance."] },
  { k: "words", t: ["Difficult and confusing words", "Mots difficiles et mots faciles à confondre"],
    d: ["Words people often mispronounce, dropped syllables, numbers, place names, and pairs that are easy to confuse.", "Mots souvent mal prononcés, syllabes avalées, nombres, noms de lieux et paires faciles à confondre."] },
  { k: "grammar", t: ["Grammar and punctuation", "Grammaire et ponctuation"],
    d: ["Articles, plurals, prepositions, commas and the errors readers notice in professional writing.", "Articles, pluriels, prépositions, virgules et les erreurs que remarquent les lecteurs d'écrits professionnels."] },
  { k: "professional", t: ["Professional communication", "Communication professionnelle"],
    d: ["Sounding confident and professional: interviews, apologies to clients, voice, and better word choices.", "Paraître sûr de soi et professionnel : entretiens, excuses aux clients, voix et meilleurs choix de mots."] },
  { k: "business", t: ["Business expressions", "Expressions du monde professionnel"],
    d: ["Expressions, idioms and phrasal verbs used in meetings, emails and negotiations.", "Expressions, tournures idiomatiques et verbes à particule employés en réunion, par courriel et en négociation."] },
  { k: "advanced", t: ["Advanced words", "Vocabulaire avancé"],
    d: ["Precise words to replace \"very\" + adjective, the 100 advanced words series, and one-word lessons.", "Des mots précis pour remplacer « very » + adjectif, la série des 100 mots avancés et des leçons sur un seul mot."] },
  { k: "news", t: ["Vocabulary from the news", "Vocabulaire de l'actualité"],
    d: ["Advanced words and expressions taught from news articles and headlines.", "Mots et expressions avancés enseignés à partir d'articles et de titres de presse."] },
  { k: "idioms", t: ["Idioms, phrasal verbs and everyday expressions", "Expressions idiomatiques, verbes à particule et expressions courantes"],
    d: ["Natural expressions native speakers use. Before using an idiom at work, ask whether an international audience will understand it.", "Les expressions naturelles des locuteurs natifs. Avant d'employer une expression idiomatique au travail, demandez-vous si un public international la comprendra."] },
  { k: "listening", t: ["Understanding native speakers", "Comprendre les locuteurs natifs"],
    d: ["Techniques for following fast, natural speech, including jokes.", "Des techniques pour suivre un anglais rapide et naturel, y compris l'humour."] },
  { k: "conversations", t: ["Conversations with native speakers", "Conversations avec des locuteurs natifs"],
    d: ["Longer practice: real conversations analysed for vocabulary, idioms and accent.", "Pour s'entraîner plus longuement : de vraies conversations analysées pour le vocabulaire, les expressions et l'accent."] },
  { k: "informal", t: ["Slang and proverbs", "Argot et proverbes"],
    d: ["Informal language to understand rather than use at work.", "Une langue familière à comprendre plutôt qu'à employer au travail."] }
];

// One focus a week, matching the module's checkpoint (re-record after eight weeks).
export const PLAN = [
  { f: ["Baseline and mindset", "Point de départ et état d'esprit"], task: ["Record a two-minute work briefing and note three things that make you harder to follow.", "Enregistrez un point de situation de deux minutes et notez trois choses qui vous rendent plus difficile à suivre."], v: ["qbaXa_TAekk", "ee1vJOKIQsA"] },
  { f: ["Vowel sounds", "Les voyelles"], task: ["Find five words from your work that contain the vowels you confuse, and practise them in pairs.", "Trouvez cinq mots de votre travail contenant les voyelles que vous confondez, et travaillez-les par paires."], v: ["-4FrdWmL0lk", "4Ks-AmhahJ0", "kvCIiuDfMdk"] },
  { f: ["Consonants and difficult words", "Les consonnes et les mots difficiles"], task: ["List the ten work words you find hardest to say, and check each one in the word bank.", "Listez les dix mots de travail les plus difficiles à dire pour vous, et vérifiez-les dans la banque de mots."], v: ["aWG1s-9qMNg", "CdOgNXwCUYE", "lSKdLBkjWlU"] },
  { f: ["Word stress and rhythm", "Accent tonique et rythme"], task: ["Mark the stressed syllables and key words in your next presentation, then rehearse it aloud.", "Marquez les syllabes accentuées et les mots clés de votre prochaine présentation, puis répétez-la à voix haute."], v: ["KbecjkaghwI", "jlbErxr6VIU", "BCbZ_BGT2m4"] },
  { f: ["Linking and intonation", "Enchaînement et intonation"], task: ["Shadow a short passage daily, then say three of your own work sentences the same way.", "Pratiquez le shadowing sur un court passage chaque jour, puis dites trois de vos phrases de travail de la même façon."], v: ["hYiA_BBkDE8", "6fcdSQEon7E", "15BmeupFpxg"] },
  { f: ["Grammar accuracy", "Correction grammaticale"], task: ["Reread five of your recent emails and find your three most frequent errors.", "Relisez cinq de vos courriels récents et repérez vos trois erreurs les plus fréquentes."], v: ["xCBz-O8nHrc", "p_2IoQa_f-8", "ZgIWzKIpFBQ"] },
  { f: ["Professional vocabulary", "Vocabulaire professionnel"], task: ["Replace every \"very\" + adjective in your next report with a precise word.", "Remplacez chaque « very » + adjectif de votre prochain rapport par un mot précis."], v: ["vNU8Fu-44Jk", "IFjJ9c5A938", "j1u9YNQQ3as"] },
  { f: ["Natural expressions and your comparison", "Expressions naturelles et comparaison"], task: ["Use two new expressions in a meeting, then re-record your week-one briefing and compare.", "Employez deux nouvelles expressions en réunion, puis réenregistrez votre point de la semaine 1 et comparez."], v: ["JqJGKt_D1no", "hnm4-CAKFks"] }
];

// The specific videos each key concept in the module guide points to.
export const CONCEPT_VIDEOS = [
  ["qbaXa_TAekk", "dP3CUzmVCQ8"],
  ["-4FrdWmL0lk", "4Ks-AmhahJ0", "aWG1s-9qMNg"],
  ["KbecjkaghwI", "jlbErxr6VIU", "BCbZ_BGT2m4"],
  ["hYiA_BBkDE8", "6fcdSQEon7E"],
  ["xCBz-O8nHrc", "p_2IoQa_f-8", "ZgIWzKIpFBQ"],
  ["j1u9YNQQ3as", "vNU8Fu-44Jk"]
];
