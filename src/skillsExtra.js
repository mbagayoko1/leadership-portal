// Two skill modules for the Personal Development tab: data storytelling for
// decision makers, and writing (briefing notes, talking points, emails, op-eds).
// Same shape as src/skills.js. Tips, phrases and templates are our own
// guidance. Links were opened on 17 November 2026.
// Quote sourcing: Orwell, Strunk, Pascal and Boileau were matched word for word
// against the published texts (orwell.ru, Wikisource). Cameron per Quote
// Investigator; Tukey, Tufte and Rosling from their books as commonly cited.

const ted = slug => "https://www.ted.com/talks/" + slug;

export const DATA_STORY = {
  id: "data",
  title: { en: "Data storytelling for decision makers", fr: "Raconter les données aux décideurs" },
  sub: {
    en: "Turn evidence into a short, honest case that a minister, donor or senior manager remembers and acts on: one message, the right chart, a human scale and a clear ask.",
    fr: "Transformez des données en un argumentaire court et honnête qu'un ministre, un bailleur ou un dirigeant retient et met en œuvre : un message, le bon graphique, une échelle humaine et une demande claire."
  },
  stages: [
    {
      id: "ds-decision",
      title: { en: "Start with the decision", fr: "Partir de la décision" },
      goal: { en: "Know who decides, what they must decide and the one message that helps them.", fr: "Savoir qui décide, ce qu'il doit décider et le message unique qui l'y aide." },
      tips: {
        en: [
          "Before you open a spreadsheet, write who the audience is and what decision or action you want from them.",
          "Write your message as one full sentence with a verb: \"Adolescent births in the three northern regions are falling twice as slowly as the national average, so the next funding round should target them.\" A topic (\"adolescent fertility\") is not a message.",
          "Ask what the decision maker already believes. A story that confirms it needs one chart; a story that contradicts it needs your strongest evidence and a respected source.",
          "Choose only the numbers that support the decision. Keep everything else in an annex for questions.",
          "If you cannot say the message in 30 seconds, you are not ready to build slides."
        ],
        fr: [
          "Avant d'ouvrir un tableur, écrivez qui est votre public et quelle décision ou action vous attendez de lui.",
          "Écrivez votre message en une phrase complète avec un verbe : « Les naissances chez les adolescentes baissent deux fois moins vite dans les trois régions du Nord que la moyenne nationale ; le prochain financement doit donc les cibler. » Un thème (« la fécondité des adolescentes ») n'est pas un message.",
          "Demandez-vous ce que le décideur croit déjà. Une histoire qui le confirme demande un graphique ; une histoire qui le contredit demande vos preuves les plus solides et une source reconnue.",
          "Ne gardez que les chiffres utiles à la décision. Mettez le reste en annexe pour les questions.",
          "Si vous ne pouvez pas dire le message en 30 secondes, vous n'êtes pas prêt à faire des diapositives."
        ]
      },
      say: {
        en: ["\"You asked whether to expand the programme. The data says yes, in three regions, for one reason.\"", "\"I'll take two minutes, show one chart, and end with a decision for you.\""],
        fr: ["« Vous vous demandiez s'il fallait étendre le programme. Les données disent oui, dans trois régions, pour une raison. »", "« Je prends deux minutes, je montre un graphique et je termine par une décision à prendre. »"]
      }
    },
    {
      id: "ds-find",
      title: { en: "Find the story in the numbers", fr: "Trouver l'histoire dans les chiffres" },
      goal: { en: "Move from a table of figures to a clear comparison, trend or surprise.", fr: "Passer d'un tableau de chiffres à une comparaison, une tendance ou une surprise claire." },
      tips: {
        en: [
          "A number means little alone. Compare it: with last year, another region, the target or the national average.",
          "Look for the gap, the change or the surprise. These are the three most common stories data can tell.",
          "Disaggregate. Averages hide the people the 2030 Agenda asks us to reach first: by age, sex, region, wealth and disability where the data allows.",
          "Check the denominator. \"Cases rose by 40%\" can mean the population grew, or the counting improved.",
          "Use official, citable sources: national surveys and censuses, DHS and MICS, UN World Population Prospects, UNFPA's World Population Dashboard.",
          "Ask a colleague who knows the data to try to break your story before a decision maker does."
        ],
        fr: [
          "Un chiffre seul dit peu de chose. Comparez-le : à l'an dernier, à une autre région, à la cible ou à la moyenne nationale.",
          "Cherchez l'écart, l'évolution ou la surprise : ce sont les trois histoires les plus fréquentes dans les données.",
          "Désagrégez. Les moyennes cachent les personnes que le Programme 2030 demande d'atteindre en premier : par âge, sexe, région, niveau de richesse et handicap quand les données le permettent.",
          "Vérifiez le dénominateur. « Les cas ont augmenté de 40 % » peut signifier que la population a crû, ou que le comptage s'est amélioré.",
          "Utilisez des sources officielles et citables : enquêtes nationales et recensements, EDS et MICS, World Population Prospects des Nations Unies, tableau de bord de la population mondiale de l'UNFPA.",
          "Demandez à un collègue qui connaît les données de tenter de démonter votre histoire avant qu'un décideur ne le fasse."
        ]
      },
      say: {
        en: ["\"Nationally the rate is improving. But look at the north: it has barely moved since 2015.\"", "\"The surprise is not the total. It's who is left out of it.\""],
        fr: ["« Au niveau national, le taux s'améliore. Mais regardez le Nord : il a à peine bougé depuis 2015. »", "« La surprise n'est pas le total. C'est qui en est exclu. »"]
      }
    },
    {
      id: "ds-chart",
      title: { en: "Choose and clean the chart", fr: "Choisir et épurer le graphique" },
      goal: { en: "Show one idea per chart, so the eye goes straight to the message.", fr: "Montrer une idée par graphique, pour que l'œil aille droit au message." },
      tips: {
        en: [
          "Match the chart to the question: a line for change over time, bars for comparing categories, a dot plot for gaps, a map only when place itself is the point.",
          "Avoid 3D effects, pie charts with many slices and two vertical axes. They are hard to read and easy to misread.",
          "Write the chart title as the message (\"Northern regions are falling behind\"), not as a label (\"Adolescent birth rate 2015–2025\").",
          "Grey everything, then colour only what matters: the region, the year or the gap you are talking about.",
          "Label lines and bars directly instead of using a legend, and remove gridlines and borders you do not need.",
          "Always show the source and the year under the chart. Start bar axes at zero.",
          "Test it: show the chart to someone for five seconds and ask what it says. If they cannot tell you, simplify."
        ],
        fr: [
          "Adaptez le graphique à la question : une courbe pour une évolution, des barres pour comparer des catégories, un graphique à points pour des écarts, une carte seulement si le lieu est le sujet.",
          "Évitez la 3D, les camemberts à nombreuses parts et les doubles axes verticaux : difficiles à lire et faciles à mal interpréter.",
          "Rédigez le titre du graphique comme un message (« Les régions du Nord décrochent ») et non comme une étiquette (« Taux de natalité des adolescentes 2015–2025 »).",
          "Mettez tout en gris, puis colorez seulement ce qui compte : la région, l'année ou l'écart dont vous parlez.",
          "Étiquetez directement les courbes et les barres au lieu d'une légende, et retirez quadrillages et bordures inutiles.",
          "Indiquez toujours la source et l'année sous le graphique. Commencez l'axe des barres à zéro.",
          "Testez : montrez le graphique cinq secondes à quelqu'un et demandez ce qu'il dit. S'il ne peut pas répondre, simplifiez."
        ]
      },
      say: {
        en: ["\"The grey lines are the other regions. Watch the orange one.\"", "\"Source: the 2023 Demographic and Health Survey.\""],
        fr: ["« Les courbes grises sont les autres régions. Regardez la courbe orange. »", "« Source : Enquête démographique et de santé de 2023. »"]
      }
    },
    {
      id: "ds-human",
      title: { en: "Make the numbers human", fr: "Donner un visage aux chiffres" },
      goal: { en: "Help people feel the size of a number and remember it.", fr: "Faire ressentir l'ampleur d'un chiffre et le rendre mémorable." },
      tips: {
        en: [
          "Translate rates into people: \"1 in 5 girls\" is easier to picture than \"20.3%\".",
          "Bring large numbers to a scale people know: per day, per school, per district, or \"enough to fill the national stadium\".",
          "Round in speech. Say \"almost half\" or \"about 3 million\", and keep the exact figure on the slide or in the note.",
          "Replace technical terms: \"children per woman\" rather than \"total fertility rate\"; \"women who want to avoid pregnancy but use no modern method\" rather than \"unmet need\", at least the first time.",
          "Pair one number with one person. A short, consented story of a midwife or a young woman makes the statistic real. Never identify someone without permission.",
          "Do not exaggerate to make an impact. Decision makers remember who was accurate."
        ],
        fr: [
          "Traduisez les taux en personnes : « 1 fille sur 5 » s'imagine plus facilement que « 20,3 % ».",
          "Ramenez les grands nombres à une échelle connue : par jour, par école, par district, ou « de quoi remplir le stade national ».",
          "Arrondissez à l'oral. Dites « près de la moitié » ou « environ 3 millions », et gardez le chiffre exact sur la diapositive ou dans la note.",
          "Remplacez les termes techniques : « enfants par femme » plutôt qu'« indice synthétique de fécondité » ; « femmes qui veulent éviter une grossesse sans utiliser de méthode moderne » plutôt que « besoins non satisfaits », au moins la première fois.",
          "Associez un chiffre à une personne. Le court récit, avec son accord, d'une sage-femme ou d'une jeune femme rend la statistique réelle. N'identifiez jamais quelqu'un sans permission.",
          "N'exagérez pas pour marquer les esprits. Les décideurs se souviennent de qui était exact."
        ]
      },
      say: {
        en: ["\"Every day in this region, about [number] girls under 18 give birth. That is [a full secondary school], every day.\"", "\"Behind this figure is [first name], a midwife in [district], who told us…\""],
        fr: ["« Chaque jour dans cette région, environ [nombre] filles de moins de 18 ans accouchent. C'est [un lycée entier], chaque jour. »", "« Derrière ce chiffre, il y a [prénom], sage-femme à [district], qui nous a dit… »"]
      }
    },
    {
      id: "ds-brief",
      title: { en: "Structure the two-minute brief", fr: "Structurer le point de deux minutes" },
      goal: { en: "Deliver context, insight, implication and the ask in the order a busy leader needs.", fr: "Présenter contexte, constat, conséquence et demande dans l'ordre utile à un dirigeant pressé." },
      tips: {
        en: [
          "Lead with the answer, then the evidence. Senior audiences decide in the first minute whether to keep listening.",
          "Use What? So what? Now what?: what the data shows, why it matters for their goals, and what you propose.",
          "One chart per point, three points at most. If you need more, you are presenting a report, not a story.",
          "End with a specific ask: a decision, a budget line, a signature, a meeting. Say who does what by when.",
          "Prepare a one-page leave-behind with the message, the chart, the source and the ask.",
          "Rehearse aloud with a timer. Two minutes is about 250 spoken words."
        ],
        fr: [
          "Commencez par la réponse, puis les preuves. Un public de haut niveau décide dans la première minute s'il continue d'écouter.",
          "Utilisez Quoi ? Et alors ? Et maintenant ? : ce que montrent les données, pourquoi c'est important pour ses objectifs, et ce que vous proposez.",
          "Un graphique par idée, trois idées au maximum. S'il en faut plus, vous présentez un rapport, pas une histoire.",
          "Terminez par une demande précise : une décision, une ligne budgétaire, une signature, une réunion. Dites qui fait quoi et pour quand.",
          "Préparez une page à laisser après la réunion : le message, le graphique, la source et la demande.",
          "Répétez à voix haute avec un chronomètre. Deux minutes, c'est environ 250 mots à l'oral."
        ]
      },
      say: {
        en: ["\"In short: the gap is closing everywhere except the north. If we act this year, we can halve it by 2030. I'm asking you to approve…\"", "\"What this means for your target is…\""],
        fr: ["« En bref : l'écart se réduit partout sauf dans le Nord. Si nous agissons cette année, nous pouvons le réduire de moitié d'ici 2030. Je vous demande d'approuver… »", "« Concrètement, pour votre objectif, cela signifie que… »"]
      }
    },
    {
      id: "ds-trust",
      title: { en: "Answer questions and keep trust", fr: "Répondre aux questions et garder la confiance" },
      goal: { en: "Handle challenges to your numbers honestly, so your next brief is believed too.", fr: "Répondre honnêtement aux objections sur vos chiffres, pour que votre prochain exposé soit cru lui aussi." },
      tips: {
        en: [
          "Know your data's limits before you present: sample size, survey year, margin of error and what was not measured.",
          "Say what the data cannot tell you. It increases trust rather than reducing it.",
          "Separate the evidence from your interpretation: \"The survey shows…; our reading is…\"",
          "If you do not know, say so and promise a precise answer by a set date. Then deliver it.",
          "When someone offers a different figure, ask for the source and compare definitions and years before you argue.",
          "Protect privacy: never show data that could identify a person or a small community, especially on sensitive topics such as gender-based violence."
        ],
        fr: [
          "Connaissez les limites de vos données avant de présenter : taille de l'échantillon, année de l'enquête, marge d'erreur et ce qui n'a pas été mesuré.",
          "Dites ce que les données ne permettent pas d'affirmer. Cela renforce la confiance au lieu de l'affaiblir.",
          "Séparez les faits de votre interprétation : « L'enquête montre… ; notre lecture est… »",
          "Si vous ne savez pas, dites-le et promettez une réponse précise à une date fixée. Puis tenez parole.",
          "Quand quelqu'un avance un autre chiffre, demandez la source et comparez définitions et années avant de débattre.",
          "Protégez la vie privée : ne montrez jamais de données permettant d'identifier une personne ou une petite communauté, surtout sur des sujets sensibles comme les violences basées sur le genre."
        ]
      },
      say: {
        en: ["\"That's a fair challenge. The survey covers 2023, so it doesn't yet show this year's campaign.\"", "\"I don't have that breakdown with me. You'll have it by Thursday.\""],
        fr: ["« La remarque est juste. L'enquête porte sur 2023 : elle ne montre pas encore la campagne de cette année. »", "« Je n'ai pas cette ventilation sous la main. Vous l'aurez jeudi. »"]
      }
    }
  ],
  templates: [
    {
      title: { en: "Data story one-pager", fr: "Fiche « histoire de données » en une page" },
      text: {
        en: `AUDIENCE: [who decides]          DECISION NEEDED: [what, by when]
MESSAGE (one sentence with a verb):
  [ ]

KEY EVIDENCE (max 3)
  1. [comparison / trend / gap] – source, year
  2. [ ]
  3. [ ]

CHART: title = the message: "[ ]"
  Type: [line / bar / dot / map]   Highlight: [what is coloured]

HUMAN SCALE: [1 in X … / per day … / one person's story, with consent]

LIMITS: [sample, year, what was not measured]

THE ASK: [who does what by when]`,
        fr: `PUBLIC : [qui décide]          DÉCISION ATTENDUE : [quoi, pour quand]
MESSAGE (une phrase avec un verbe) :
  [ ]

PREUVES CLÉS (3 au maximum)
  1. [comparaison / tendance / écart] – source, année
  2. [ ]
  3. [ ]

GRAPHIQUE : titre = le message : « [ ] »
  Type : [courbe / barres / points / carte]   Mise en relief : [ce qui est coloré]

ÉCHELLE HUMAINE : [1 sur X … / par jour … / récit d'une personne, avec son accord]

LIMITES : [échantillon, année, ce qui n'a pas été mesuré]

LA DEMANDE : [qui fait quoi, pour quand]`
      }
    },
    {
      title: { en: "Two-minute brief script", fr: "Script du point de deux minutes" },
      text: {
        en: `0:00  THE ANSWER     "[Message in one sentence.]"
0:15  WHAT?          "[The one comparison or trend], according to [source, year]."
0:45  SO WHAT?       "This matters for [their goal / budget / mandate] because …"
1:15  HUMAN SCALE    "[1 in X … / a short story]."
1:35  NOW WHAT?      "I propose … I am asking you to [decision] by [date]."
1:55  CLOSE          "Here is a one-page summary. Happy to take questions."`,
        fr: `0:00  LA RÉPONSE       « [Message en une phrase.] »
0:15  QUOI ?           « [La comparaison ou tendance], selon [source, année]. »
0:45  ET ALORS ?       « C'est important pour [son objectif / budget / mandat] parce que… »
1:15  ÉCHELLE HUMAINE  « [1 sur X… / un court récit]. »
1:35  ET MAINTENANT ?  « Je propose… Je vous demande de [décision] d'ici [date]. »
1:55  CONCLUSION       « Voici une synthèse d'une page. Je réponds volontiers à vos questions. »`
      }
    },
    {
      title: { en: "Chart checklist", fr: "Liste de contrôle du graphique" },
      text: {
        en: `[ ] One idea per chart
[ ] Title states the message, not the topic
[ ] Right chart type for the question (time = line, compare = bar)
[ ] One highlight colour; everything else grey
[ ] Direct labels, no unnecessary legend, gridlines or 3D
[ ] Bar axis starts at zero
[ ] Source and year under the chart
[ ] Readable from the back of the room / on a phone
[ ] Someone understood it in five seconds`,
        fr: `[ ] Une idée par graphique
[ ] Le titre énonce le message, pas le thème
[ ] Bon type de graphique (évolution = courbe, comparaison = barres)
[ ] Une couleur de mise en relief ; le reste en gris
[ ] Étiquettes directes, sans légende, quadrillage ni 3D inutiles
[ ] L'axe des barres commence à zéro
[ ] Source et année sous le graphique
[ ] Lisible du fond de la salle / sur un téléphone
[ ] Quelqu'un l'a compris en cinq secondes`
      }
    }
  ],
  quotes: [
    { text: "The world cannot be understood without numbers. And it cannot be understood with numbers alone.", fr: "Le monde ne peut pas se comprendre sans les chiffres. Et il ne peut pas se comprendre avec les seuls chiffres.", by: "Hans Rosling", source: "Factfulness, 2018" },
    { text: "Not everything that can be counted counts, and not everything that counts can be counted.", fr: "Tout ce qui peut être compté ne compte pas, et tout ce qui compte ne peut pas être compté.", by: "William Bruce Cameron", source: "Informal Sociology, 1963 (often misattributed to Einstein)" },
    { text: "The greatest value of a picture is when it forces us to notice what we never expected to see.", fr: "La plus grande valeur d'une image, c'est quand elle nous oblige à remarquer ce que nous ne nous attendions pas à voir.", by: "John W. Tukey", source: "Exploratory Data Analysis, 1977" },
    { text: "Above all else show the data.", fr: "Avant tout, montrez les données.", by: "Edward Tufte", source: "The Visual Display of Quantitative Information, 1983" }
  ],
  resources: [
    { t: "Hans Rosling: The best stats you've ever seen", u: ted("hans_rosling_the_best_stats_you_ve_ever_seen"), by: "TED", kind: "video" },
    { t: "Hans Rosling: Global population growth, box by box", u: ted("hans_rosling_global_population_growth_box_by_box"), by: "TED", kind: "video" },
    { t: "Alan Smith: Why you should love statistics", u: ted("alan_smith_why_you_should_love_statistics"), by: "TED", kind: "video" },
    { t: "David McCandless: The beauty of data visualization", u: ted("david_mccandless_the_beauty_of_data_visualization"), by: "TED", kind: "video" },
    { t: "How to Tell a Story with Data (Jim Stikeleather, 2013)", u: "https://hbr.org/2013/04/how-to-tell-a-story-with-data", by: "Harvard Business Review", kind: "article" },
    { t: "Storytelling with data: blog, examples and exercises", u: "https://www.storytellingwithdata.com/", by: "Cole Nussbaumer Knaflic", kind: "article" },
    { t: "Visual Vocabulary: which chart for which question", u: "https://github.com/Financial-Times/chart-doctor/tree/main/visual-vocabulary", by: "Financial Times", kind: "tool" },
    { t: "Datawrapper Docs: guides to clear charts and maps", u: "https://www.datawrapper.de/docs/", by: "Datawrapper", kind: "tool" },
    { t: "Gapminder Tools: animate trends by country", u: "https://www.gapminder.org/tools/", by: "Gapminder", kind: "tool" },
    { t: "World Population Dashboard", u: "https://www.unfpa.org/data/world-population-dashboard", by: "UNFPA", kind: "tool" },
    { t: "STATcompiler: Demographic and Health Survey indicators by country", u: "https://www.statcompiler.com/", by: "The DHS Program", kind: "tool" },
    { t: "Our World in Data: charts and sources on development", u: "https://ourworldindata.org/", by: "Our World in Data", kind: "tool" },
    { t: "Storytelling with Data (Cole Nussbaumer Knaflic, 2015)", by: "Wiley", kind: "book" },
    { t: "Factfulness (Hans Rosling with Ola Rosling and Anna Rosling Rönnlund, 2018)", by: "Flatiron Books", kind: "book" },
    { t: "The Truthful Art (Alberto Cairo, 2016)", by: "New Riders", kind: "book" },
    { t: "How Charts Lie (Alberto Cairo, 2019)", by: "W. W. Norton", kind: "book" }
  ]
};

export const WRITING = {
  id: "writing",
  title: { en: "Writing that gets read", fr: "Écrire pour être lu" },
  sub: {
    en: "Briefing notes, talking points, action emails and op-eds that busy readers understand at first reading, in English and French.",
    fr: "Notes d'information, éléments de langage, courriels d'action et tribunes qu'un lecteur pressé comprend dès la première lecture, en français et en anglais."
  },
  stages: [
    {
      id: "wr-reader",
      title: { en: "Reader first, bottom line up front", fr: "Le lecteur d'abord, l'essentiel en premier" },
      goal: { en: "Know who reads, what they must do, and put that first.", fr: "Savoir qui lit, ce qu'il doit faire, et le placer en tête." },
      tips: {
        en: [
          "Before writing, answer three questions: who will read this, what do they already know, and what must they do after reading?",
          "Put the bottom line up front (BLUF): the conclusion or request in the first two lines. Most senior readers stop there.",
          "Write the main point, then the reasons, then the details. Background goes last or in an annex.",
          "One document, one purpose. If you are asking for two decisions, consider two notes.",
          "Write the way you would explain it to a respected colleague over coffee, then tidy it up."
        ],
        fr: [
          "Avant d'écrire, répondez à trois questions : qui va lire, que sait-il déjà, et que doit-il faire après la lecture ?",
          "Placez l'essentiel en premier : la conclusion ou la demande dans les deux premières lignes. La plupart des dirigeants s'arrêtent là.",
          "Écrivez l'idée principale, puis les raisons, puis les détails. Le contexte va à la fin ou en annexe.",
          "Un document, un objectif. Si vous demandez deux décisions, envisagez deux notes.",
          "Écrivez comme si vous l'expliquiez à un collègue respecté autour d'un café, puis mettez en forme."
        ]
      },
      say: {
        en: ["\"Decision needed by Friday: approve the revised workplan so funds can be released.\"", "\"In short: we recommend option B, for three reasons.\""],
        fr: ["« Décision requise d'ici vendredi : approuver le plan de travail révisé pour débloquer les fonds. »", "« En bref : nous recommandons l'option B, pour trois raisons. »"]
      }
    },
    {
      id: "wr-brief",
      title: { en: "Briefing notes for senior leaders", fr: "Notes d'information pour la direction" },
      goal: { en: "Give a leader what they need for a meeting or decision in two pages or less.", fr: "Donner à un dirigeant ce qu'il lui faut pour une réunion ou une décision, en deux pages au maximum." },
      tips: {
        en: [
          "Use a fixed structure so readers know where to look: purpose, key messages, background, issues and options, recommendation, annexes.",
          "Key messages are the lines your principal can say aloud. Write them as full sentences, not headings.",
          "For each option, state the benefit, the risk and the cost in one line each. Recommend one, and say why.",
          "For meetings, add who is attending, what they want, and the likely difficult question with a suggested answer.",
          "Check every figure against its source and add the date. A wrong number discredits the whole note.",
          "Respect the format and length your office uses. Two pages read in full beat six pages skimmed."
        ],
        fr: [
          "Utilisez une structure fixe pour que le lecteur sache où regarder : objet, messages clés, contexte, enjeux et options, recommandation, annexes.",
          "Les messages clés sont les phrases que votre responsable peut dire à voix haute. Rédigez-les en phrases complètes, pas en titres.",
          "Pour chaque option, indiquez en une ligne l'avantage, le risque et le coût. Recommandez-en une et dites pourquoi.",
          "Pour une réunion, ajoutez qui sera présent, ce que chacun veut, et la question difficile probable avec une réponse suggérée.",
          "Vérifiez chaque chiffre à sa source et ajoutez la date. Un chiffre faux discrédite toute la note.",
          "Respectez le format et la longueur en usage dans votre bureau. Deux pages lues en entier valent mieux que six pages survolées."
        ]
      },
      say: {
        en: ["\"Key message 1: UNFPA welcomes the Ministry's new strategy and is ready to support its rollout in the three priority regions.\"", "\"Likely question: why not nationwide? Suggested answer: …\""],
        fr: ["« Message clé 1 : l'UNFPA salue la nouvelle stratégie du ministère et se tient prêt à appuyer son déploiement dans les trois régions prioritaires. »", "« Question probable : pourquoi pas à l'échelle nationale ? Réponse suggérée : … »"]
      }
    },
    {
      id: "wr-points",
      title: { en: "Talking points and key messages", fr: "Éléments de langage et messages clés" },
      goal: { en: "Write points that sound natural spoken aloud and stay consistent across speakers.", fr: "Rédiger des points qui sonnent naturels à l'oral et restent cohérents d'un orateur à l'autre." },
      tips: {
        en: [
          "Three key messages, each with one proof point: a fact, an example or a story.",
          "Write for the ear: short sentences, one idea each, words people use in conversation.",
          "Read every point aloud. If you run out of breath, split the sentence.",
          "Add a short opening line and a closing line that repeats the main message.",
          "Prepare answers to the three hardest questions, and a line for what you cannot discuss.",
          "In bilingual settings, write both versions yourself or have them checked. A literal translation often sounds wrong when spoken."
        ],
        fr: [
          "Trois messages clés, chacun appuyé par une preuve : un fait, un exemple ou un récit.",
          "Écrivez pour l'oreille : phrases courtes, une idée chacune, des mots de la conversation courante.",
          "Lisez chaque point à voix haute. Si vous manquez de souffle, coupez la phrase.",
          "Ajoutez une phrase d'ouverture et une phrase de conclusion qui reprend le message principal.",
          "Préparez des réponses aux trois questions les plus difficiles, et une formule pour ce que vous ne pouvez pas aborder.",
          "En contexte bilingue, rédigez vous-même les deux versions ou faites-les relire. Une traduction littérale sonne souvent faux à l'oral."
        ]
      },
      say: {
        en: ["\"If you remember one thing today, let it be this: …\"", "\"That's a matter for the government to decide. What I can tell you is what the evidence shows: …\""],
        fr: ["« Si vous ne retenez qu'une chose aujourd'hui, retenez ceci : … »", "« Cette décision revient au gouvernement. Ce que je peux vous dire, c'est ce que montrent les données : … »"]
      }
    },
    {
      id: "wr-email",
      title: { en: "Emails that get action", fr: "Des courriels qui font agir" },
      goal: { en: "Get a clear answer or action from a busy person in one exchange.", fr: "Obtenir d'une personne occupée une réponse ou une action claire en un seul échange." },
      tips: {
        en: [
          "Make the subject line do the work: say what you need and by when, e.g. \"DECISION by 14 Nov: venue for regional workshop\".",
          "Put the request in the first sentence, then the reason, then the details.",
          "One email, one ask. If there are several, number them so the reader can answer by number.",
          "Offer options with a default: \"Unless I hear otherwise by Thursday, I will proceed with option A.\"",
          "Keep it short enough to read on a phone without scrolling. Attach detail rather than pasting it.",
          "Write the subject and greeting in the reader's working language when you can, and keep the tone courteous: emails are often forwarded."
        ],
        fr: [
          "Faites travailler l'objet : dites ce dont vous avez besoin et pour quand, par exemple « DÉCISION avant le 14 nov. : lieu de l'atelier régional ».",
          "Placez la demande dans la première phrase, puis la raison, puis les détails.",
          "Un courriel, une demande. S'il y en a plusieurs, numérotez-les pour que le lecteur réponde par numéro.",
          "Proposez des options avec un choix par défaut : « Sauf avis contraire d'ici jeudi, je retiens l'option A. »",
          "Restez assez court pour être lu sur un téléphone sans faire défiler. Joignez les détails plutôt que de les coller.",
          "Rédigez l'objet et la salutation dans la langue de travail du destinataire si possible, et restez courtois : les courriels sont souvent transférés."
        ]
      },
      say: {
        en: ["\"Could you confirm by Wednesday whether we can use your budget line for the venue?\"", "\"No reply needed unless you disagree.\""],
        fr: ["« Pourriez-vous confirmer d'ici mercredi si nous pouvons utiliser votre ligne budgétaire pour la salle ? »", "« Pas de réponse nécessaire, sauf désaccord. »"]
      }
    },
    {
      id: "wr-oped",
      title: { en: "Op-eds and public writing", fr: "Tribunes et écrits publics" },
      goal: { en: "Make one argument, publicly, in a voice people trust.", fr: "Défendre un argument en public, d'une voix à laquelle on fait confiance." },
      tips: {
        en: [
          "Hook the piece to something in the news or a coming date, such as World Population Day.",
          "Argue one clear point in the first paragraph. An op-ed is an argument, not a report.",
          "Support it with two or three pieces of evidence and one human example.",
          "Name the strongest counter-argument and answer it fairly.",
          "End with what should happen next, and who should do it.",
          "Keep to the outlet's length, often 600 to 800 words. Write plainly, without acronyms.",
          "UN staff usually need clearance before publishing, in a personal or official capacity. Check your office's rules and involve communications colleagues early."
        ],
        fr: [
          "Rattachez le texte à l'actualité ou à une date à venir, comme la Journée mondiale de la population.",
          "Défendez une idée claire dès le premier paragraphe. Une tribune est un argument, pas un rapport.",
          "Appuyez-la sur deux ou trois éléments de preuve et un exemple humain.",
          "Nommez l'objection la plus forte et répondez-y loyalement.",
          "Terminez par ce qui doit se passer ensuite, et par qui.",
          "Respectez la longueur demandée par le média, souvent 600 à 800 mots. Écrivez simplement, sans sigles.",
          "Le personnel des Nations Unies doit généralement obtenir une autorisation avant de publier, à titre personnel ou officiel. Vérifiez les règles de votre bureau et associez tôt vos collègues de la communication."
        ]
      },
      say: {
        en: ["\"Every year on 11 July we count people. This year, let's count the choices they don't have.\"", "\"Some will say the cost is too high. The cost of waiting is higher: …\""],
        fr: ["« Chaque 11 juillet, nous comptons les gens. Cette année, comptons les choix qui leur manquent. »", "« Certains diront que le coût est trop élevé. Le coût de l'attente l'est davantage : … »"]
      }
    },
    {
      id: "wr-edit",
      title: { en: "Edit, cut and check", fr: "Relire, couper et vérifier" },
      goal: { en: "Make the text shorter, clearer and correct before anyone else reads it.", fr: "Rendre le texte plus court, plus clair et exact avant que quiconque ne le lise." },
      tips: {
        en: [
          "Let the draft rest, even for ten minutes, then reread it as the reader.",
          "Cut every word that does not add meaning. Most first drafts can lose a quarter of their length.",
          "Prefer the active voice and concrete verbs: \"The Ministry approved the plan\", not \"Approval of the plan was given\".",
          "Spell out acronyms the first time, or remove them.",
          "Use gender-inclusive language and check names, titles and protocol order.",
          "Follow the UN Editorial Manual for UN documents, and UNTERM for official terms in English and French.",
          "Read the final version aloud. Your ear catches what your eye misses."
        ],
        fr: [
          "Laissez reposer le brouillon, même dix minutes, puis relisez-le comme le destinataire.",
          "Supprimez chaque mot qui n'ajoute pas de sens. La plupart des premiers jets peuvent perdre un quart de leur longueur.",
          "Préférez la voix active et des verbes concrets : « Le ministère a approuvé le plan », plutôt que « L'approbation du plan a été donnée ».",
          "Développez les sigles à leur première occurrence, ou supprimez-les.",
          "Utilisez un langage inclusif et vérifiez les noms, titres et l'ordre protocolaire.",
          "Suivez le Manuel de rédaction des Nations Unies pour les documents officiels, et UNTERM pour la terminologie officielle en français et en anglais.",
          "Lisez la version finale à voix haute. L'oreille repère ce que l'œil laisse passer."
        ]
      },
      say: {
        en: ["\"Can you read this in two minutes and tell me the one thing it asks you to do?\"", "\"I cut it from three pages to one. Here's what moved to the annex.\""],
        fr: ["« Pouvez-vous lire ceci en deux minutes et me dire la seule chose qu'on vous demande ? »", "« Je l'ai réduit de trois pages à une. Voici ce qui est passé en annexe. »"]
      }
    }
  ],
  templates: [
    {
      title: { en: "Briefing note", fr: "Note d'information" },
      text: {
        en: `BRIEFING NOTE FOR: [name, title]            DATE: [ ]
SUBJECT: [meeting / decision]                PREPARED BY: [ ]

1. PURPOSE (one line)
   [To brief you for … / To seek your decision on …]

2. KEY MESSAGES (what you can say)
   • [full sentence]
   • [full sentence]
   • [full sentence]

3. BACKGROUND (3–5 lines, facts with sources and dates)

4. ISSUES AND OPTIONS
   Option A: [benefit] / [risk] / [cost]
   Option B: [benefit] / [risk] / [cost]

5. RECOMMENDATION
   [Option and why, in two lines]

6. FOR MEETINGS: participants and what they want; likely hard question and suggested answer

ANNEXES: [data, bios, previous correspondence]`,
        fr: `NOTE D'INFORMATION À L'ATTENTION DE : [nom, fonction]     DATE : [ ]
OBJET : [réunion / décision]                PRÉPARÉE PAR : [ ]

1. OBJET (une ligne)
   [Vous informer en vue de… / Solliciter votre décision sur…]

2. MESSAGES CLÉS (ce que vous pouvez dire)
   • [phrase complète]
   • [phrase complète]
   • [phrase complète]

3. CONTEXTE (3 à 5 lignes, faits avec sources et dates)

4. ENJEUX ET OPTIONS
   Option A : [avantage] / [risque] / [coût]
   Option B : [avantage] / [risque] / [coût]

5. RECOMMANDATION
   [Option retenue et pourquoi, en deux lignes]

6. POUR LES RÉUNIONS : participants et leurs attentes ; question difficile probable et réponse suggérée

ANNEXES : [données, biographies, correspondance antérieure]`
      }
    },
    {
      title: { en: "Talking points", fr: "Éléments de langage" },
      text: {
        en: `OCCASION: [ ]     SPEAKER: [ ]     TIME: [x min]

OPENING: [one line: thanks, why we are here]

MESSAGE 1: [ ]
  Proof: [fact / example / story]
MESSAGE 2: [ ]
  Proof: [ ]
MESSAGE 3: [ ]
  Proof: [ ]

CLOSING: [repeat the main message + the ask]

HARD QUESTIONS
  Q: [ ]  A: [ ]
  Q: [ ]  A: [ ]
DO NOT DISCUSS: [topic] → "That is a matter for …"`,
        fr: `OCCASION : [ ]     ORATEUR : [ ]     DURÉE : [x min]

OUVERTURE : [une ligne : remerciements, pourquoi nous sommes là]

MESSAGE 1 : [ ]
  Preuve : [fait / exemple / récit]
MESSAGE 2 : [ ]
  Preuve : [ ]
MESSAGE 3 : [ ]
  Preuve : [ ]

CONCLUSION : [reprendre le message principal + la demande]

QUESTIONS DIFFICILES
  Q : [ ]  R : [ ]
  Q : [ ]  R : [ ]
À NE PAS ABORDER : [sujet] → « Cette question relève de… »`
      }
    },
    {
      title: { en: "Action email", fr: "Courriel d'action" },
      text: {
        en: `SUBJECT: [ACTION / DECISION / FYI] by [date]: [topic in 5 words]

Dear [name],

[The request in one sentence, with the deadline.]

[Why it matters, in one or two sentences.]

[Options, numbered, with your recommendation:]
  1. [ ]
  2. [ ]
Unless I hear otherwise by [date], I will proceed with [option].

[Details or attachment: …]

Thank you,
[name]`,
        fr: `OBJET : [ACTION / DÉCISION / POUR INFO] avant le [date] : [sujet en 5 mots]

Madame, Monsieur / Cher [nom],

[La demande en une phrase, avec l'échéance.]

[Pourquoi c'est important, en une ou deux phrases.]

[Options, numérotées, avec votre recommandation :]
  1. [ ]
  2. [ ]
Sauf avis contraire d'ici le [date], je retiendrai [option].

[Détails ou pièce jointe : …]

Bien cordialement,
[nom]`
      }
    },
    {
      title: { en: "Op-ed outline", fr: "Plan de tribune" },
      text: {
        en: `NEWS HOOK: [event / date / new data]
HEADLINE IDEA: [ ]

PARA 1 – THE ARGUMENT: [one clear claim]
PARA 2 – WHY NOW: [the hook, the stakes]
PARA 3–4 – EVIDENCE: [2–3 facts with sources] + [one human example]
PARA 5 – THE OBJECTION: "Some will say … But …"
PARA 6 – WHAT SHOULD HAPPEN: [who does what]
CLOSING LINE: [echo the opening image or argument]

AUTHOR LINE: [name, title]      LENGTH: [600–800 words]
CLEARANCE: [who must approve, by when]`,
        fr: `ACCROCHE D'ACTUALITÉ : [événement / date / nouvelles données]
IDÉE DE TITRE : [ ]

PARA 1 – L'ARGUMENT : [une affirmation claire]
PARA 2 – POURQUOI MAINTENANT : [l'accroche, les enjeux]
PARA 3–4 – PREUVES : [2 ou 3 faits sourcés] + [un exemple humain]
PARA 5 – L'OBJECTION : « Certains diront que… Pourtant… »
PARA 6 – CE QUI DOIT SE PASSER : [qui fait quoi]
PHRASE FINALE : [reprendre l'image ou l'argument d'ouverture]

SIGNATURE : [nom, fonction]      LONGUEUR : [600 à 800 mots]
AUTORISATION : [qui doit approuver, pour quand]`
      }
    }
  ],
  quotes: [
    { text: "Never use a long word where a short one will do.", fr: "N'utilisez jamais un mot long quand un mot court suffit.", by: "George Orwell", source: "Politics and the English Language, 1946" },
    { text: "If it is possible to cut a word out, always cut it out.", fr: "S'il est possible de supprimer un mot, supprimez-le toujours.", by: "George Orwell", source: "Politics and the English Language, 1946" },
    { text: "Vigorous writing is concise.", fr: "Une écriture vigoureuse est concise.", by: "William Strunk Jr.", source: "The Elements of Style, 1918" },
    { text: "I have made this letter longer only because I have not had the leisure to make it shorter.", fr: "Je n'ai fait celle-ci plus longue que parce que je n'ai pas eu le loisir de la faire plus courte.", by: "Blaise Pascal", source: "Les Provinciales, letter XVI, 1656 (French original; English translation ours)" },
    { text: "What is well conceived is clearly said, and the words to say it come easily.", fr: "Ce que l'on conçoit bien s'énonce clairement, et les mots pour le dire arrivent aisément.", by: "Nicolas Boileau", source: "L'Art poétique, 1674 (French original; English translation ours)" }
  ],
  resources: [
    { t: "How to Write Email with Military Precision (Kabir Sehgal, 2016)", u: "https://hbr.org/2016/11/how-to-write-email-with-military-precision", by: "Harvard Business Review", kind: "article" },
    { t: "Politics and the English Language (George Orwell, 1946)", u: "https://www.orwell.ru/library/essays/politics/english/e_polit", by: "Orwell.ru", kind: "article" },
    { t: "Plain language guide series", u: "https://digital.gov/guides/plain-language/", by: "Digital.gov", kind: "tool" },
    { t: "United Nations Editorial Manual Online", u: "https://www.un.org/dgacm/en/content/editorial-manual", by: "United Nations", kind: "tool" },
    { t: "UNTERM: official UN terminology in six languages", u: "https://unterm.un.org/", by: "United Nations", kind: "tool" },
    { t: "Gender-inclusive language guidelines", u: "https://www.un.org/en/gender-inclusive-language/", by: "United Nations", kind: "tool" },
    { t: "The OpEd Project: resources for writing op-eds", u: "https://www.theopedproject.org/", by: "The OpEd Project", kind: "tool" },
    { t: "The Elements of Style (William Strunk Jr., 1918), free public-domain text", u: "https://en.wikisource.org/wiki/The_Elements_of_Style", by: "Wikisource", kind: "book" },
    { t: "The Pyramid Principle (Barbara Minto)", by: "Pearson", kind: "book" },
    { t: "Smart Brevity (Jim VandeHei, Mike Allen and Roy Schwartz, 2022)", by: "Workman", kind: "book" },
    { t: "On Writing Well (William Zinsser)", by: "Harper Perennial", kind: "book" }
  ]
};
