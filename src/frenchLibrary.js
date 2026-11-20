// Themes, eight-week path and concept links for the "Polish Your French"
// video library. The videos are generated into frenchVideos.js by
// scripts/pull-french.mjs; this file only describes and orders them.
// Text is [English, French]. Video titles stay as published on YouTube.

export const FR_THEMES = [
  { k: "learning", t: ["Start here: methods and advice", "Pour commencer : méthodes et conseils"],
    d: ["How to assess your level, keep progressing at an advanced level and speak without freezing.", "Évaluer son niveau, continuer à progresser à un niveau avancé et parler sans bloquer."] },
  { k: "pronunciation", t: ["Pronunciation, liaisons and accents", "Prononciation, liaisons et accents"],
    d: ["The sounds that cause misunderstanding (u/ou, the French r, nasal vowels), liaisons and regional accents.", "Les sons qui créent des malentendus (u/ou, le r, les voyelles nasales), les liaisons et les accents régionaux."] },
  { k: "grammar", t: ["Grammar and tenses", "Grammaire et temps"],
    d: ["The subjunctive, past tenses, pronouns en and y, and the structures of spoken French.", "Le subjonctif, les temps du passé, les pronoms en et y, et les structures du français parlé."] },
  { k: "errors", t: ["Common mistakes", "Fautes fréquentes"],
    d: ["Mistakes learners and native speakers make: prepositions, verbs, spelling and expressions to avoid.", "Les fautes des apprenants et des francophones : prépositions, verbes, orthographe et formules à éviter."] },
  { k: "vocab", t: ["Advanced vocabulary", "Vocabulaire avancé"],
    d: ["Precise words, nuances and level tests, from B2 to C2.", "Des mots précis, des nuances et des tests de niveau, du B2 au C2."] },
  { k: "expressions", t: ["Idiomatic expressions", "Expressions idiomatiques"],
    d: ["Expressions native speakers use, their meaning and when to use them at work.", "Les expressions des francophones, leur sens et quand les employer au travail."] },
  { k: "writing", t: ["Professional writing", "Écrit professionnel"],
    d: ["Emails, letters, dictations and tips for writing clearly in French.", "Courriels, lettres, dictées et conseils pour écrire clairement en français."] },
  { k: "culture", t: ["Cultural codes and interculturality", "Codes culturels et interculturalité"],
    d: ["Greetings, politeness, social occasions and the misunderstandings to avoid across the French-speaking world.", "Salutations, politesse, occasions sociales et malentendus à éviter dans le monde francophone."] },
  { k: "listening", t: ["Listening: interviews and conversations", "Compréhension orale : interviews et conversations"],
    d: ["Natural French on topics that matter: interviews, conversations and street interviews at B2–C1.", "Un français naturel sur des sujets de fond : interviews, conversations et micro-trottoirs de niveau B2-C1."] },
  { k: "familiar", t: ["Informal French and slang", "Français familier et argot"],
    d: ["Informal language to understand rather than use at work.", "Une langue familière à comprendre plutôt qu'à employer au travail."] },
  { k: "exams", t: ["DELF, DALF and TCF", "DELF, DALF et TCF"],
    d: ["How the official French exams work, with practice exercises.", "Le fonctionnement des examens officiels de français, avec des exercices."] }
];

// One focus a week; the module's checkpoint is to re-record after eight weeks.
export const FR_PLAN = [
  { f: ["Baseline and level", "Point de départ et niveau"], task: ["Record a two-minute work briefing in French and take a level test.", "Enregistrez un point de situation de deux minutes en français et faites un test de niveau."], v: ["S0Wmva1l_ic", "OAwO1bdCYtM"] },
  { f: ["Register and politeness", "Registre et politesse"], task: ["Rewrite three of your recent messages in a formal register.", "Réécrivez trois de vos messages récents dans un registre soutenu."], v: ["3LG8SwY7B5w", "Rwt_gVuAcgo", "Q-QOM3opz2c"] },
  { f: ["Pronunciation and liaisons", "Prononciation et liaisons"], task: ["Mark the liaisons in your next presentation and rehearse it aloud.", "Marquez les liaisons de votre prochaine présentation et répétez-la à voix haute."], v: ["rmJdERjlEa8", "-sJmce-keso", "q5WjHCp4ueM"] },
  { f: ["The subjunctive and past tenses", "Le subjonctif et les temps du passé"], task: ["Find five sentences in your notes that need a subjunctive, and correct them.", "Trouvez dans vos notes cinq phrases qui demandent un subjonctif, et corrigez-les."], v: ["zvRj_W4bChM", "Jy9GWtqvSWE", "byn9BP3f4Jk"] },
  { f: ["False friends and common mistakes", "Faux amis et fautes fréquentes"], task: ["List the three mistakes you make most often and check them in the word bank.", "Listez vos trois fautes les plus fréquentes et vérifiez-les dans la banque de mots."], v: ["zyzP4zFq3uA", "tWY43ko_VJs", "unVsmRkramQ"] },
  { f: ["Logical connectors", "Les connecteurs logiques"], task: ["Structure your next note with at least five different connectors.", "Structurez votre prochaine note avec au moins cinq connecteurs différents."], v: ["evgNfvtVWsI", "ZLhwIjpssyM"] },
  { f: ["Professional writing", "L'écrit professionnel"], task: ["Write a formal email to a partner using the word bank's formulas.", "Rédigez un courriel formel à un partenaire avec les formules de la banque de mots."], v: ["lbfHJrlB3QA", "lKPvnJ4lXOk", "S22cA3NuUrQ"] },
  { f: ["Workplace vocabulary and your comparison", "Vocabulaire du travail et comparaison"], task: ["Use two new expressions in a meeting, then re-record your week-one briefing and compare.", "Employez deux nouvelles expressions en réunion, puis réenregistrez votre point de la semaine 1 et comparez."], v: ["otolVUVBETg", "gA5ByAj-S2k"] }
];

// The specific videos each key concept in the module guide points to.
export const FR_CONCEPT_VIDEOS = [
  ["3LG8SwY7B5w", "Rwt_gVuAcgo", "Hm3bPVgcdb8"],
  ["zyzP4zFq3uA", "ZLhwIjpssyM"],
  ["evgNfvtVWsI", "Q8ZcL-232rU"],
  ["zvRj_W4bChM", "Jy9GWtqvSWE"],
  ["rmJdERjlEa8", "-sJmce-keso", "q5WjHCp4ueM"],
  ["lbfHJrlB3QA", "lKPvnJ4lXOk", "Q-QOM3opz2c"]
];
