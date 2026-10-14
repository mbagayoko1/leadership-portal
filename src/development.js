// Personal Development module. Each speaker's ideas are summarised in our
// own words from their published books and talks (not transcribed quotes),
// with links to the originals. Every video below was checked through
// YouTube's oEmbed API on 2026-10-14: the title shown is the real title
// (or, where marked, a neutral description) and the publisher is listed.
//   ideas / practice: EN and FR
//   vids: t title shown, u url, by publisher

import { EXTRA } from "./developmentExtra.js";
import { CLASSICS } from "./classics.js";

const yt = id => "https://www.youtube.com/watch?v=" + id;

const BASE = [
  {
    id: "rohn", name: "Jim Rohn", kind: "speaker",
    role: { en: "US business philosopher (1930–2009), mentor to Tony Robbins", fr: "Philosophe d'entreprise américain (1930–2009), mentor de Tony Robbins" },
    theme: { en: "Discipline and self-education", fr: "Discipline et autoformation" },
    channel: "https://www.youtube.com/@JimRohnReal",
    quote: { text: "Work harder on yourself than you do on your job.", source: "Widely attributed, from his seminars" },
    ideas: {
      en: [
        "Work harder on yourself than you do on your job: your own growth sets the ceiling on your results.",
        "Small daily disciplines are light to carry; the regret of skipping them weighs far more.",
        "Don't wish things were easier; wish you were better, then work at becoming better.",
        "The people you spend the most time with shape your standards, so choose them with care.",
        "Plan each day on paper before it starts, keep a journal, and read every day."
      ],
      fr: [
        "Travaillez davantage sur vous-même que sur votre poste : votre propre progression fixe la limite de vos résultats.",
        "Les petites disciplines quotidiennes sont légères à porter ; le regret de les avoir négligées pèse bien plus lourd.",
        "Ne souhaitez pas que les choses soient plus faciles ; souhaitez être meilleur, puis travaillez à le devenir.",
        "Les personnes que vous fréquentez le plus façonnent vos exigences : choisissez-les avec soin.",
        "Planifiez chaque journée sur papier avant qu'elle ne commence, tenez un journal et lisez chaque jour."
      ]
    },
    practice: {
      en: "End each day with five minutes of journaling: what I learned today, and what I will do better tomorrow.",
      fr: "Terminez chaque journée par cinq minutes d'écriture : ce que j'ai appris aujourd'hui, et ce que je ferai mieux demain."
    },
    vids: [
      { t: "How to Build Discipline with Action – The Do It or Die Method", u: yt("5jzQ6QCiSh4"), by: "Jim Rohn Real Seminars" },
      { t: "Talk To Yourself Like This For Just 3 Days", u: yt("Iuw62tHiEWc"), by: "Jim Rohn Real Seminars" },
      { t: "These 15 Minutes Will Put You Ahead Of 97% Of People", u: yt("WN9ln-QVc7k"), by: "Jim Rohn Real Seminars" }
    ]
  },
  {
    id: "ziglar", name: "Zig Ziglar", kind: "speaker",
    role: { en: "US sales trainer and author of See You at the Top (1926–2012)", fr: "Formateur en vente et auteur américain de See You at the Top (1926–2012)" },
    theme: { en: "Attitude and service", fr: "Attitude et service" },
    channel: "https://www.youtube.com/results?search_query=zig+ziglar+motivational+speeches",
    quote: { text: "Your attitude, not your aptitude, will determine your altitude.", source: "Widely attributed" },
    ideas: {
      en: [
        "Success comes through service: help enough other people reach their goals and your own will follow.",
        "Motivation wears off, so renew it every day, the way you renew your energy with food and rest.",
        "How far you go depends more on your attitude than on your talent.",
        "Write your goals down, give each one a date, and break it into steps you can take today.",
        "You tend to act in line with how you see yourself, so build an accurate, confident self-image."
      ],
      fr: [
        "La réussite passe par le service : aidez suffisamment d'autres personnes à atteindre leurs objectifs, et les vôtres suivront.",
        "La motivation s'estompe : renouvelez-la chaque jour, comme vous renouvelez votre énergie par l'alimentation et le repos.",
        "Jusqu'où vous irez dépend davantage de votre attitude que de votre talent.",
        "Écrivez vos objectifs, donnez une date à chacun et découpez-le en étapes réalisables dès aujourd'hui.",
        "On agit généralement selon l'image qu'on a de soi : construisez une image de vous juste et confiante."
      ]
    },
    practice: {
      en: "Each morning, write down one way you will help a colleague or partner succeed today, then do it.",
      fr: "Chaque matin, notez une façon d'aider un collègue ou un partenaire à réussir aujourd'hui, puis faites-le."
    },
    vids: [
      { t: "Zig Ziglar – Attitude Makes All The Difference", u: yt("_bkVZ1kD8Xo"), by: "Ziglar Inc." },
      { t: "Born To Win Seminar, Part 1", u: yt("5zyHsaXB-q0"), by: "Nightingale Conant" }
    ]
  },
  {
    id: "lesbrown", name: "Les Brown", kind: "speaker",
    role: { en: "US motivational speaker and former Ohio state legislator", fr: "Conférencier américain et ancien élu de l'Ohio" },
    theme: { en: "Resilience and self-belief", fr: "Résilience et confiance en soi" },
    channel: "https://www.youtube.com/@LesBrownSpeaks",
    quote: { text: "Someone's opinion of you does not have to become your reality.", source: "Widely attributed" },
    ideas: {
      en: [
        "Other people's view of your limits does not have to define what you can achieve.",
        "You have more in you than you have used so far; start before you feel ready.",
        "A purpose bigger than yourself, not talent alone, keeps you going through rejection.",
        "When a setback knocks you down, look up: as long as you can see a way forward, you can get up again.",
        "Practise relentlessly; mastery of speaking comes from rehearsal, feedback and repetition."
      ],
      fr: [
        "Le regard des autres sur vos limites n'a pas à définir ce que vous pouvez accomplir.",
        "Vous avez plus en vous que ce que vous avez utilisé jusqu'ici : commencez avant de vous sentir prêt.",
        "Une raison d'être plus grande que vous, et pas le seul talent, vous fait tenir face au refus.",
        "Quand un revers vous met à terre, levez les yeux : tant que vous voyez une issue, vous pouvez vous relever.",
        "Exercez-vous sans relâche : la maîtrise de la parole vient de la répétition, du retour et de la pratique."
      ]
    },
    practice: {
      en: "When you hear a \"no\", write down one thing you learned from it and the date of your next attempt.",
      fr: "Quand vous essuyez un « non », notez une chose que vous en avez apprise et la date de votre prochaine tentative."
    },
    vids: [
      { t: "You have something special, you have greatness in you. Have faith in yourself.", u: yt("7kyHl13ury0"), by: "Les Brown" },
      { t: "His story: how he moved past the label he was given at school (description)", u: yt("fwRVrft8JgU"), by: "Les Brown" }
    ]
  },
  {
    id: "proctor", name: "Bob Proctor", kind: "speaker",
    role: { en: "Canadian author of You Were Born Rich (1934–2022), co-founder of Proctor Gallagher Institute", fr: "Auteur canadien de You Were Born Rich (1934–2022), cofondateur du Proctor Gallagher Institute" },
    theme: { en: "Goals and habits", fr: "Objectifs et habitudes" },
    channel: "https://www.youtube.com/@BobProctorTV",
    ideas: {
      en: [
        "Your results come from your habitual ways of thinking and acting; change the habits and the results follow.",
        "Habits change through repetition, so revisit your goal and your new behaviour every day.",
        "Write your main goal on a card, in the present tense, and read it daily.",
        "Choose goals that excite you and stretch you beyond what you already know how to do."
      ],
      fr: [
        "Vos résultats découlent de vos façons habituelles de penser et d'agir : changez les habitudes, et les résultats suivront.",
        "Les habitudes changent par la répétition : revenez chaque jour sur votre objectif et votre nouveau comportement.",
        "Écrivez votre objectif principal sur une carte, au présent, et lisez-la chaque jour.",
        "Choisissez des objectifs qui vous enthousiasment et vous poussent au-delà de ce que vous savez déjà faire."
      ]
    },
    caution: {
      en: "Claims that thinking alone attracts results are not supported by research. These practices keep to goal-writing and habit change, which are.",
      fr: "L'idée que la pensée seule attire les résultats n'est pas étayée par la recherche. Ces pratiques s'en tiennent à la formulation d'objectifs et au changement d'habitudes, qui le sont."
    },
    practice: {
      en: "Write your Representative-level goal on a card. Read it each morning and note one action that moves it forward.",
      fr: "Écrivez votre objectif de niveau Représentant sur une carte. Lisez-la chaque matin et notez une action qui la fait avancer."
    },
    vids: [
      { t: "You're Living Inside a Program. Here's How to Wake Up", u: yt("f0oTsSsAwMw"), by: "Proctor Gallagher Institute" },
      { t: "The Secret to Your Best Life Has a Pattern", u: yt("XqCepnb1hBM"), by: "Proctor Gallagher Institute" }
    ]
  },
  {
    id: "robbins", name: "Tony Robbins", kind: "speaker",
    role: { en: "US author (Awaken the Giant Within) and life and business strategist", fr: "Auteur américain (Awaken the Giant Within) et stratège de vie et d'entreprise" },
    theme: { en: "Psychology and state", fr: "Psychologie et état d'esprit" },
    channel: "https://www.youtube.com/channel/UCJLMboBYME_CLEfwsduI0wQ",
    quote: { text: "Where focus goes, energy flows.", source: "Widely attributed, from his seminars" },
    ideas: {
      en: [
        "Results depend more on psychology than on strategy: most people know what to do, and the hard part is doing it.",
        "Six needs drive behaviour: certainty, variety, significance, connection, growth and contribution. Knowing which ones drive you and your stakeholders explains many decisions.",
        "Your physical state shapes your mental state: posture, breathing and movement change how you feel and how you come across.",
        "The questions you ask yourself direct your focus; ask \"What can I learn from this?\" rather than \"Why me?\".",
        "Lasting change comes from raising your standards, turning a \"should\" into a \"must\"."
      ],
      fr: [
        "Les résultats dépendent davantage de la psychologie que de la stratégie : on sait souvent quoi faire, le plus dur est de le faire.",
        "Six besoins guident nos comportements : certitude, variété, importance, lien, croissance et contribution. Savoir lesquels vous animent, vous et vos interlocuteurs, éclaire bien des décisions.",
        "L'état physique façonne l'état mental : la posture, la respiration et le mouvement changent ce que vous ressentez et l'impression que vous donnez.",
        "Les questions que vous vous posez orientent votre attention : demandez-vous « Que puis-je en apprendre ? » plutôt que « Pourquoi moi ? ».",
        "Le changement durable vient du relèvement de vos exigences : transformer un « je devrais » en « je dois »."
      ]
    },
    practice: {
      en: "Before a high-stakes meeting, take two minutes: stand tall, breathe slowly, and ask what success looks like for them and for you.",
      fr: "Avant une réunion à fort enjeu, prenez deux minutes : tenez-vous droit, respirez lentement et demandez-vous à quoi ressemble la réussite pour eux et pour vous."
    },
    vids: [
      { t: "The 6 Human Needs That Drive Every Decision You Make", u: yt("6Z7rHO80y3U"), by: "Tony Robbins" },
      { t: "Your Worst Moments Are Your Biggest Opportunities", u: yt("TsIXWUJhH1E"), by: "Tony Robbins" },
      { t: "Tony Robbins: 17 Minutes of Life-Changing Advice", u: yt("S3LGwBuz4lQ"), by: "Alpha Mentors" }
    ]
  },
  {
    id: "munroe", name: "Myles Munroe", kind: "speaker",
    role: { en: "Bahamian leadership author and minister (1954–2014), author of The Spirit of Leadership", fr: "Auteur bahaméen sur le leadership et pasteur (1954–2014), auteur de The Spirit of Leadership" },
    theme: { en: "Purpose, vision and succession", fr: "Raison d'être, vision et relève" },
    channel: "https://www.youtube.com/@MunroeGlobal",
    quote: { text: "The greatest tragedy in life is not death, but a life without a purpose.", source: "Widely attributed" },
    ideas: {
      en: [
        "Leadership potential exists in everyone; it is discovered and developed, not granted by a position.",
        "Purpose comes first: knowing why you do your work gives direction to everything else.",
        "Vision means seeing a future before it exists, and it disciplines today's choices.",
        "Leadership is only complete when it produces successors: develop the people who will carry the work after you."
      ],
      fr: [
        "Le potentiel de leadership existe en chacun ; il se découvre et se développe, il n'est pas conféré par un poste.",
        "La raison d'être vient en premier : savoir pourquoi vous faites votre travail oriente tout le reste.",
        "La vision consiste à voir un avenir avant qu'il n'existe, et elle discipline les choix d'aujourd'hui.",
        "Le leadership n'est accompli que lorsqu'il forme une relève : développez ceux qui poursuivront le travail après vous."
      ]
    },
    caution: {
      en: "His teaching is rooted in his Christian faith, and much of the channel is religious. The principles here are framed for a multi-faith workplace.",
      fr: "Son enseignement s'enracine dans sa foi chrétienne, et une grande partie de la chaîne est religieuse. Les principes présentés ici sont formulés pour un environnement de travail multiconfessionnel."
    },
    practice: {
      en: "Name one person you are preparing to take on part of your role, and give them one stretch task this month.",
      fr: "Désignez une personne que vous préparez à assumer une partie de votre rôle, et confiez-lui une mission stimulante ce mois-ci."
    },
    vids: [
      { t: "Laws and Principles For Success In Life", u: yt("3v7PPviuYMk"), by: "Munroe Global" }
    ]
  },
  {
    id: "vinh", name: "Vinh Giang", kind: "speaker",
    role: { en: "Australian communication skills teacher, entrepreneur and magician", fr: "Formateur australien en communication, entrepreneur et magicien" },
    theme: { en: "Voice and conversation", fr: "Voix et conversation" },
    channel: "https://www.youtube.com/@askvinh",
    ideas: {
      en: [
        "How you sound shapes how people judge your ideas: vary your pace, volume, pitch and pauses.",
        "Replace filler words with a short pause; silence reads as confidence.",
        "Record yourself and listen back: you cannot fix what you have not heard.",
        "Practise reading aloud with exaggerated expression to stretch your range, then bring it back to natural.",
        "You can be warm and authoritative at once, and speak as an equal to people more senior than you."
      ],
      fr: [
        "Votre façon de parler influence le jugement porté sur vos idées : variez le débit, le volume, la hauteur et les pauses.",
        "Remplacez les tics de langage par une courte pause : le silence se lit comme de l'assurance.",
        "Enregistrez-vous et réécoutez-vous : on ne corrige pas ce qu'on n'a pas entendu.",
        "Lisez à voix haute avec une expression exagérée pour élargir votre registre, puis revenez au naturel.",
        "On peut être à la fois chaleureux et ferme, et parler d'égal à égal avec des personnes plus haut placées."
      ]
    },
    practice: {
      en: "Read one paragraph aloud each day: once flat, once with deliberate changes in pace, volume and pauses. Record both, or speak it to the AI Coach for pace and filler feedback.",
      fr: "Lisez un paragraphe à voix haute chaque jour : une fois de façon monotone, une fois en variant délibérément le débit, le volume et les pauses. Enregistrez les deux, ou dites-le au Coach IA pour un retour sur le débit et les tics de langage."
    },
    vids: [
      { t: "The Guide To Talk To Anyone (Regardless of Their Seniority)", u: yt("6JFOQrSrPy4"), by: "Vinh Giang" },
      { t: "How to Sound Friendly Without Losing Authority", u: yt("5kpscm-ekFY"), by: "Vinh Giang" },
      { t: "This Boring 9 Min/Day Exercise Helps You Instantly Speak Clearer!", u: yt("hIFCxzdSGfU"), by: "Vinh Giang" },
      { t: "3 Steps To Improve Your Speech Clarity", u: yt("3B5gmNKFqSY"), by: "Vinh Giang" },
      { t: "The Ultimate 30-Day Plan To Master Your Communication Skills", u: yt("NqbOg5ECegE"), by: "Vinh Giang" }
    ]
  },
  {
    id: "sinek", name: "Simon Sinek", kind: "speaker",
    role: { en: "British-American author of Start With Why and Leaders Eat Last", fr: "Auteur britanno-américain de Start With Why et Leaders Eat Last" },
    theme: { en: "Purpose and trust", fr: "Raison d'être et confiance" },
    channel: "https://www.youtube.com/@simonsinek",
    quote: { text: "People don't buy what you do; they buy why you do it.", source: "TED talk, 2009" },
    ideas: {
      en: [
        "Start with why: people commit to a purpose before they commit to a plan.",
        "Leaders create safety: when people feel protected by their leader, they cooperate and take risks for the mission.",
        "Delegate outcomes instead of micromanaging tasks; trust builds the team's capability.",
        "Play the long game: build trust and capacity, not only this quarter's results."
      ],
      fr: [
        "Commencez par le pourquoi : on adhère à une raison d'être avant d'adhérer à un plan.",
        "Les leaders créent la sécurité : quand les gens se sentent protégés par leur leader, ils coopèrent et prennent des risques pour la mission.",
        "Déléguez des résultats plutôt que de microgérer des tâches : la confiance développe les capacités de l'équipe.",
        "Pensez à long terme : bâtissez la confiance et les capacités, pas seulement les résultats du trimestre."
      ]
    },
    practice: {
      en: "Open your next team meeting by saying why the work matters for the people UNFPA serves, before what needs to be done.",
      fr: "Ouvrez votre prochaine réunion d'équipe en expliquant pourquoi le travail compte pour les personnes que sert l'UNFPA, avant de dire ce qu'il faut faire."
    },
    vids: [
      { t: "Are You Delegating or Micro-Managing?", u: yt("MdQp-kZkE9U"), by: "Simon Sinek" },
      { t: "Don't Confuse INFORMATION with INTERACTION", u: yt("MsGAY7wjRcA"), by: "Simon Sinek" },
      { t: "Invest In These Skills for Success", u: yt("w_4JBQTPByY"), by: "Simon Sinek" }
    ]
  },
  {
    id: "covey", name: "Stephen R. Covey", kind: "speaker",
    role: { en: "US author of The 7 Habits of Highly Effective People (1932–2012)", fr: "Auteur américain de Les 7 habitudes de ceux qui réalisent tout ce qu'ils entreprennent (1932–2012)" },
    theme: { en: "Effectiveness and principles", fr: "Efficacité et principes" },
    channel: "https://www.youtube.com/@FranklinCoveyVideos",
    quote: { text: "Seek first to understand, then to be understood.", source: "The 7 Habits of Highly Effective People, 1989" },
    ideas: {
      en: [
        "Be proactive: put your energy into what you can influence, not into what you cannot.",
        "Put first things first: schedule your priorities, the \"big rocks\", before small tasks fill the week.",
        "Listen to understand before you try to be understood; it makes your own message land.",
        "Think win-win: look for agreements that work for every party."
      ],
      fr: [
        "Soyez proactif : investissez votre énergie dans ce que vous pouvez influencer, pas dans ce qui vous échappe.",
        "Donnez la priorité aux priorités : planifiez les « gros cailloux » avant que les petites tâches ne remplissent la semaine.",
        "Écoutez pour comprendre avant de chercher à être compris : votre propre message passera mieux.",
        "Pensez gagnant-gagnant : cherchez des accords qui conviennent à toutes les parties."
      ]
    },
    practice: {
      en: "Each Friday, block next week's three most important tasks in your calendar before anything else.",
      fr: "Chaque vendredi, réservez dans votre agenda les trois tâches les plus importantes de la semaine suivante, avant toute autre chose."
    },
    vids: [
      { t: "Big Rocks", u: yt("zV3gMTOEWt8"), by: "FranklinCovey" },
      { t: "The 7 Habits – Changing Culture Changes Everything", u: yt("UsZ2fy0vPp4"), by: "FranklinCovey" },
      { t: "Chris Voss: Empathy, Understanding, and Leading Through Change", u: yt("2DieIBrFSR8"), by: "FranklinCovey" }
    ]
  },
  {
    id: "maxwell", name: "John C. Maxwell", kind: "speaker",
    role: { en: "US leadership author of The 21 Irrefutable Laws of Leadership and The 5 Levels of Leadership", fr: "Auteur américain sur le leadership, The 21 Irrefutable Laws of Leadership et The 5 Levels of Leadership" },
    theme: { en: "Influence and leadership growth", fr: "Influence et croissance du leader" },
    channel: "https://www.youtube.com/@JohnCMaxwellLead",
    quote: { text: "Leadership is influence. Nothing more, nothing less.", source: "The 21 Irrefutable Laws of Leadership, 1998" },
    ideas: {
      en: [
        "Leadership is influence: a title gives you a starting point, but people follow you for trust and results.",
        "Growth is intentional: leaders grow through a daily plan, not by waiting for experience to teach them.",
        "Good leaders ask great questions; questions build ownership in the people around you.",
        "Being busy is not the same as being effective; measure yourself by results, not activity."
      ],
      fr: [
        "Le leadership, c'est l'influence : un titre donne un point de départ, mais on vous suit pour la confiance et les résultats.",
        "La croissance est intentionnelle : un leader progresse grâce à un plan quotidien, pas en attendant que l'expérience l'instruise.",
        "Les bons leaders posent de bonnes questions : elles responsabilisent ceux qui vous entourent.",
        "Être occupé n'est pas être efficace : mesurez-vous aux résultats, pas à l'activité."
      ]
    },
    practice: {
      en: "Before your next decision meeting, prepare three questions instead of three answers.",
      fr: "Avant votre prochaine réunion de décision, préparez trois questions plutôt que trois réponses."
    },
    vids: [
      { t: "Why Your Feedback Isn't Landing, and How to Fix It", u: yt("XH1wOkcctzA"), by: "Maxwell Leadership" },
      { t: "Busy Isn't the Same as Effective", u: yt("pmZAfcjcewg"), by: "Maxwell Leadership" },
      { t: "What We Focus on Expands (Fix Your Focus)", u: yt("lB_gYkYFQU4"), by: "John C. Maxwell" }
    ]
  },
  {
    id: "goldsmith", name: "Marshall Goldsmith", kind: "speaker",
    role: { en: "US executive coach, author of What Got You Here Won't Get You There", fr: "Coach de dirigeants américain, auteur de What Got You Here Won't Get You There" },
    theme: { en: "Executive coaching and behaviour change", fr: "Coaching de dirigeants et changement de comportement" },
    channel: "https://www.youtube.com/@MarshallGoldsmith",
    quote: { text: "What got you here won't get you there.", source: "Book title, 2007" },
    ideas: {
      en: [
        "The habits that got you promoted can hold you back at the next level; identify the ones to drop.",
        "Ask colleagues for ideas for the future (\"feedforward\") rather than critiques of the past.",
        "Thank people for feedback instead of defending yourself; it keeps honest input coming."
      ],
      fr: [
        "Les habitudes qui vous ont valu une promotion peuvent vous freiner au niveau suivant : repérez celles à abandonner.",
        "Demandez à vos collègues des idées pour l'avenir (le « feedforward ») plutôt que des critiques du passé.",
        "Remerciez pour un retour au lieu de vous justifier : vous continuerez à recevoir des avis sincères."
      ]
    },
    practice: {
      en: "Ask three colleagues: \"What is one thing I could do to be more effective in my role?\" Thank them, and don't argue.",
      fr: "Demandez à trois collègues : « Quelle est la chose que je pourrais faire pour être plus efficace dans mon rôle ? » Remerciez-les, sans discuter."
    },
    vids: [
      { t: "The Earned Life", u: yt("PiJb86E690c"), by: "Marshall Goldsmith" },
      { t: "You Can Be More", u: yt("C9xDsoexEUE"), by: "Marshall Goldsmith" }
    ]
  },
  {
    id: "sharma", name: "Robin Sharma", kind: "speaker",
    role: { en: "Canadian leadership author of The Monk Who Sold His Ferrari and The 5AM Club", fr: "Auteur canadien sur le leadership, Le moine qui vendit sa Ferrari et Le Club des 5 heures du matin" },
    theme: { en: "Self-leadership and routines", fr: "Leadership de soi et routines" },
    channel: "https://www.youtube.com/@sharmaleadership",
    quote: { text: "Own your morning. Elevate your life.", source: "The 5AM Club, 2018" },
    ideas: {
      en: [
        "You can lead without a title: leadership shows in how you do your work, especially when no one is watching.",
        "Win the first hour: protect early time for exercise, reflection and learning before the day's demands arrive.",
        "Hard times build capability; treat difficulty as training rather than a verdict."
      ],
      fr: [
        "On peut diriger sans titre : le leadership se voit dans la façon de travailler, surtout quand personne ne regarde.",
        "Gagnez la première heure : préservez du temps tôt le matin pour l'exercice, la réflexion et l'apprentissage, avant les sollicitations de la journée.",
        "Les périodes difficiles renforcent vos capacités : voyez l'épreuve comme un entraînement, pas comme un verdict."
      ]
    },
    practice: {
      en: "For two weeks, start each day with 20 protected minutes of reflection or learning before opening email.",
      fr: "Pendant deux semaines, commencez chaque journée par 20 minutes réservées à la réflexion ou à l'apprentissage, avant d'ouvrir vos e-mails."
    },
    vids: [
      { t: "Leadership Is What You Do When No One Is Watching", u: yt("mBTxLq973Mk"), by: "Robin Sharma" },
      { t: "The Truth About Hard Times (They Are Not What You Think)", u: yt("5QUa3sZYK1Q"), by: "Robin Sharma" },
      { t: "The #1 Thing Great Leaders Do at the Start of Every Year", u: yt("uY3KVEfju9A"), by: "Robin Sharma" }
    ]
  },
  {
    id: "melrobbins", name: "Mel Robbins", kind: "speaker",
    role: { en: "US author of The 5 Second Rule and The Let Them Theory, and podcast host", fr: "Autrice américaine de The 5 Second Rule et The Let Them Theory, animatrice de podcast" },
    theme: { en: "Action and confidence", fr: "Passer à l'action et confiance" },
    channel: "https://www.youtube.com/@melrobbins",
    ideas: {
      en: [
        "You will rarely feel ready: count down 5-4-3-2-1 and act before hesitation talks you out of it.",
        "Focus on what you control and let other people's reactions be theirs to manage.",
        "To stop being overlooked, make your contributions visible and ask clearly for what you want."
      ],
      fr: [
        "On se sent rarement prêt : comptez 5-4-3-2-1 et agissez avant que l'hésitation ne vous en dissuade.",
        "Concentrez-vous sur ce que vous maîtrisez et laissez aux autres la gestion de leurs réactions.",
        "Pour ne plus passer inaperçu, rendez vos contributions visibles et demandez clairement ce que vous voulez."
      ]
    },
    practice: {
      en: "When you hesitate to speak up in a meeting, count down from five and make your point before you reach one.",
      fr: "Quand vous hésitez à prendre la parole en réunion, comptez à rebours depuis cinq et exprimez votre point avant d'arriver à un."
    },
    vids: [
      { t: "How to Stop Being Overlooked & Start Getting What You Want", u: yt("3SdOXtuPLiU"), by: "Mel Robbins" },
      { t: "How to Reinvent Yourself and Start a New Chapter", u: yt("jez2pA6iFLA"), by: "Mel Robbins" }
    ]
  },
  {
    id: "sandberg", name: "Sheryl Sandberg", kind: "speaker",
    role: { en: "US business executive and author of Lean In", fr: "Dirigeante d'entreprise américaine et autrice de En avant toutes (Lean In)" },
    theme: { en: "Women in leadership", fr: "Les femmes et le leadership" },
    channel: "https://www.ted.com/speakers/sheryl_sandberg",
    quote: { text: "Don't leave before you leave.", source: "TED talk, 2010" },
    ideas: {
      en: [
        "Women are under-represented at the top partly because of bias, and partly because many hold back before they need to.",
        "Sit at the table: take a visible seat and speak up in meetings.",
        "Shared responsibilities at home make careers at work possible.",
        "Keep reaching for opportunities until the moment you actually need to step back."
      ],
      fr: [
        "Les femmes sont sous-représentées au sommet en partie à cause des préjugés, et en partie parce que beaucoup se retiennent trop tôt.",
        "Asseyez-vous à la table : prenez une place visible et prenez la parole en réunion.",
        "Le partage des responsabilités à la maison rend possibles les carrières au travail.",
        "Continuez à saisir les occasions jusqu'au moment où vous devez réellement lever le pied."
      ]
    },
    practice: {
      en: "In your next meeting, sit at the main table and make one contribution in the first ten minutes.",
      fr: "Lors de votre prochaine réunion, asseyez-vous à la table principale et faites une intervention dans les dix premières minutes."
    },
    vids: [
      { t: "Why we have too few women leaders", u: "https://www.ted.com/talks/sheryl_sandberg_why_we_have_too_few_women_leaders", by: "TED · 15 min" }
    ]
  },
  {
    id: "oprah", name: "Oprah Winfrey", kind: "speaker",
    role: { en: "US broadcaster, producer and philanthropist; founder of the Oprah Winfrey Leadership Academy for Girls in South Africa (2007)", fr: "Animatrice, productrice et philanthrope américaine ; fondatrice de l'Oprah Winfrey Leadership Academy for Girls en Afrique du Sud (2007)" },
    theme: { en: "Presence, purpose and service", fr: "Présence, raison d'être et service" },
    channel: "https://www.youtube.com/@Oprah",
    quote: { text: "There is no such thing as failure. Failure is just life trying to move us in another direction.", source: "Harvard Commencement address, 2013" },
    ideas: {
      en: [
        "Everyone you meet wants to know the same thing: do you see me, do you hear me, does what I say matter to you? Show them that it does.",
        "Failure is redirection: when something collapses, ask what it is trying to teach you and where it is pointing you.",
        "Keep a gratitude journal: she wrote down five things each day, and it changed what she noticed.",
        "Check your intention before you act; the why behind an action shapes what comes back from it.",
        "Use your platform to serve the people in front of you, not only to advance yourself.",
        "Interview like she does: ask open questions, listen fully and let silence do some of the work.",
        "Surround yourself with people who lift you higher.",
        "Your feelings are a guidance system: when something feels wrong, stop and look at why before you go on.",
        "Education is freedom; reading opened her way out of poverty in rural Mississippi, and she invests in girls' education in Africa.",
        "Do the best you can in this moment; it puts you in the best place for the next one."
      ],
      fr: [
        "Toute personne que vous rencontrez veut savoir la même chose : me vois-tu, m'entends-tu, ce que je dis compte-t-il pour toi ? Montrez-lui que oui.",
        "L'échec est une réorientation : quand quelque chose s'effondre, demandez-vous ce qu'il cherche à vous apprendre et où il vous mène.",
        "Tenez un journal de gratitude : elle notait cinq choses chaque jour, et cela a changé ce qu'elle remarquait.",
        "Vérifiez votre intention avant d'agir : le pourquoi d'une action façonne ce qu'elle vous renvoie.",
        "Utilisez votre position pour servir les personnes devant vous, pas seulement pour avancer vous-même.",
        "Menez vos échanges comme elle : posez des questions ouvertes, écoutez pleinement et laissez le silence travailler.",
        "Entourez-vous de personnes qui vous élèvent.",
        "Vos émotions sont un système de guidage : quand quelque chose sonne faux, arrêtez-vous pour en chercher la raison avant de continuer.",
        "L'éducation, c'est la liberté ; la lecture l'a sortie de la pauvreté dans le Mississippi rural, et elle investit dans l'éducation des filles en Afrique.",
        "Faites de votre mieux dans l'instant présent : c'est ce qui vous place au mieux pour l'instant suivant."
      ]
    },
    practice: {
      en: "In your next three conversations, close by reflecting back what you heard (\"What I'm hearing is…\") before you give your view, then note how the person responds.",
      fr: "Lors de vos trois prochaines conversations, terminez en reformulant ce que vous avez entendu (« Ce que j'entends, c'est… ») avant de donner votre avis, puis notez la réaction de la personne."
    },
    vids: [
      { t: "Oprah Winfrey Harvard Commencement speech | Harvard Commencement 2013", u: yt("GMWFieBGR7c"), by: "Harvard University" },
      { t: "Oprah Winfrey's 2008 Stanford Commencement Address", u: yt("Bpd3raj8xww"), by: "Stanford" },
      { t: "The Best Leaders All Start with This One Thing (with Simon Sinek)", u: yt("jz8j-xlcKdQ"), by: "Oprah" },
      { t: "Practical Tips for Working with Complicated People (with Ryan Leak)", u: yt("x-1Sh20c4zc"), by: "Oprah" }
    ]
  },
  {
    id: "ericthomas", name: "Eric Thomas", kind: "speaker",
    role: { en: "US motivational speaker and author, known as \"ET, the Hip Hop Preacher\"", fr: "Conférencier et auteur américain, surnommé « ET, the Hip Hop Preacher »" },
    theme: { en: "Discipline and purpose", fr: "Discipline et raison d'être" },
    channel: "https://www.youtube.com/@etthehiphoppreacher",
    ideas: {
      en: [
        "Talent is not enough; discipline is what turns potential into results.",
        "Your purpose has to be bigger than you to keep you going when it gets hard.",
        "If you stop growing, you start losing ground."
      ],
      fr: [
        "Le talent ne suffit pas : c'est la discipline qui transforme le potentiel en résultats.",
        "Votre raison d'être doit vous dépasser pour vous faire tenir quand cela devient difficile.",
        "Si vous cessez de progresser, vous commencez à reculer."
      ]
    },
    practice: {
      en: "Write down why your work matters to someone beyond yourself, and read it before the hardest task of your week.",
      fr: "Écrivez pourquoi votre travail compte pour d'autres que vous, et relisez-le avant la tâche la plus difficile de votre semaine."
    },
    vids: [
      { t: "You Don't Need More Talent. You Need Discipline", u: yt("KhOe2Xm4UfM"), by: "etthehiphoppreacher" },
      { t: "Your Purpose Is Bigger Than You", u: yt("6huHBlAUmes"), by: "etthehiphoppreacher" },
      { t: "If You Don't Grow, You'll Lose It", u: yt("JNkiBiSofuk"), by: "etthehiphoppreacher" }
    ]
  },
  {
    id: "holiday", name: "Ryan Holiday", kind: "speaker",
    role: { en: "US author of The Obstacle Is the Way, writing on Stoic philosophy (Daily Stoic)", fr: "Auteur américain de The Obstacle Is the Way, sur la philosophie stoïcienne (Daily Stoic)" },
    theme: { en: "Stoicism and composure", fr: "Stoïcisme et sang-froid" },
    channel: "https://www.youtube.com/@DailyStoic",
    quote: { text: "The obstacle is the way.", source: "Book title, 2014, after Marcus Aurelius" },
    ideas: {
      en: [
        "Separate what you control (your judgements and actions) from what you don't, and spend energy only on the first.",
        "An obstacle can be the path: ask what this difficulty makes possible.",
        "Read deliberately and take notes; a few books read deeply beat many skimmed."
      ],
      fr: [
        "Distinguez ce qui dépend de vous (vos jugements et vos actes) de ce qui n'en dépend pas, et n'investissez votre énergie que dans le premier.",
        "Un obstacle peut devenir le chemin : demandez-vous ce que cette difficulté rend possible.",
        "Lisez avec intention et prenez des notes : quelques livres lus en profondeur valent mieux que beaucoup survolés."
      ]
    },
    practice: {
      en: "When something goes wrong, write two lists: what I control, and what I don't. Act only on the first.",
      fr: "Quand quelque chose tourne mal, écrivez deux listes : ce qui dépend de moi, et ce qui n'en dépend pas. N'agissez que sur la première."
    },
    vids: [
      { t: "10 Stoic Lessons It Took Me 10 Years to Understand", u: yt("EF3R5tkxrwo"), by: "Daily Stoic" },
      { t: "7 Stoic Strategies To Deal With Jerks", u: yt("5opCN8cNkoM"), by: "Daily Stoic" },
      { t: "How to Get the Most Out of Reading (A Stoic Guide)", u: yt("wbf5H-AQxso"), by: "Daily Stoic" }
    ]
  },
  {
    id: "brene", name: "Brené Brown", kind: "research",
    role: { en: "US research professor studying courage, vulnerability and shame; author of Dare to Lead", fr: "Chercheuse américaine spécialiste du courage, de la vulnérabilité et de la honte ; autrice de Dare to Lead" },
    theme: { en: "Courage and vulnerability", fr: "Courage et vulnérabilité" },
    channel: "https://www.ted.com/speakers/brene_brown",
    quote: { text: "Vulnerability is the birthplace of innovation, creativity and change.", source: "TED talk Listening to shame, 2012" },
    ideas: {
      en: [
        "Vulnerability is not weakness: showing up when the outcome is uncertain is where trust and innovation begin.",
        "Clear is kind: vague feedback and unspoken expectations do more harm than honest, respectful clarity.",
        "Shame and fear that go unspoken drive defensive behaviour in teams; naming them reduces their power."
      ],
      fr: [
        "La vulnérabilité n'est pas une faiblesse : s'engager quand l'issue est incertaine, c'est là que naissent la confiance et l'innovation.",
        "La clarté est une forme de bienveillance : un retour flou et des attentes non dites font plus de mal qu'une franchise respectueuse.",
        "La honte et la peur non exprimées entraînent des comportements défensifs dans les équipes ; les nommer réduit leur emprise."
      ]
    },
    practice: {
      en: "In your next feedback conversation, state the expectation and the gap plainly, then ask what support would help.",
      fr: "Lors de votre prochain échange de feedback, énoncez clairement l'attente et l'écart, puis demandez quel soutien serait utile."
    },
    vids: [
      { t: "Listening to shame", u: "https://www.ted.com/talks/brene_brown_listening_to_shame", by: "TED · 20 min" },
      { t: "The power of vulnerability", u: "https://www.ted.com/talks/brene_brown_the_power_of_vulnerability", by: "TED · 20 min" }
    ]
  },
  {
    id: "dweck", name: "Carol Dweck", kind: "research",
    role: { en: "Stanford University psychologist, author of Mindset", fr: "Psychologue à l'université Stanford, autrice de Mindset (Changer d'état d'esprit)" },
    theme: { en: "Growth mindset", fr: "État d'esprit de développement" },
    channel: "https://www.ted.com/speakers/carol_dweck",
    quote: { text: "Becoming is better than being.", source: "Mindset, 2006" },
    ideas: {
      en: [
        "Abilities can be developed through effort, good strategies and help from others; believing this changes how people respond to challenges.",
        "Praise the process (effort, strategy and progress) rather than talent.",
        "\"Not yet\" is a powerful answer: a skill you lack today is one you have not learned yet."
      ],
      fr: [
        "Les capacités se développent par l'effort, de bonnes stratégies et l'aide des autres ; le croire change notre réaction face aux défis.",
        "Valorisez le processus (effort, stratégie et progrès) plutôt que le talent.",
        "« Pas encore » est une réponse puissante : une compétence qui vous manque aujourd'hui est simplement une compétence pas encore acquise."
      ]
    },
    caution: {
      en: "Later studies found growth-mindset effects to be real but often modest; they work best alongside good teaching and support.",
      fr: "Des études ultérieures ont montré que les effets de l'état d'esprit de développement sont réels mais souvent modestes ; ils sont plus forts avec un bon accompagnement."
    },
    practice: {
      en: "When you catch yourself thinking \"I'm not good at this\", add \"yet\", and name the next step to learn it.",
      fr: "Quand vous vous surprenez à penser « je ne suis pas doué pour cela », ajoutez « pas encore », et nommez la prochaine étape pour l'apprendre."
    },
    vids: [
      { t: "The power of believing that you can improve", u: "https://www.ted.com/talks/carol_dweck_the_power_of_believing_that_you_can_improve", by: "TED · 10 min" }
    ]
  },
  {
    id: "duckworth", name: "Angela Duckworth", kind: "research",
    role: { en: "University of Pennsylvania psychologist, author of Grit", fr: "Psychologue à l'université de Pennsylvanie, autrice de L'art de la niaque (Grit)" },
    theme: { en: "Grit and perseverance", fr: "Persévérance et ténacité" },
    channel: "https://www.ted.com/speakers/angela_lee_duckworth",
    quote: { text: "Enthusiasm is common. Endurance is rare.", source: "Grit, 2016" },
    ideas: {
      en: [
        "Long-term achievement depends on grit, meaning passion and perseverance for long-term goals, as well as on talent.",
        "Grit grows through deliberate practice, a sense of purpose, and hope.",
        "Stay with commitments through hard stretches, but choose goals that genuinely matter to you."
      ],
      fr: [
        "La réussite sur la durée dépend de la ténacité, c'est-à-dire la passion et la persévérance pour des objectifs à long terme, autant que du talent.",
        "La ténacité se développe par la pratique délibérée, le sens et l'espoir.",
        "Tenez vos engagements dans les moments difficiles, mais choisissez des objectifs qui comptent vraiment pour vous."
      ]
    },
    caution: {
      en: "Research suggests grit overlaps strongly with conscientiousness; treat it as one ingredient of success, not the whole story.",
      fr: "La recherche suggère que la ténacité recoupe largement le caractère consciencieux : c'est un ingrédient de la réussite, pas toute l'histoire."
    },
    practice: {
      en: "Pick one skill from your development plan and schedule three short deliberate-practice sessions a week, each with feedback.",
      fr: "Choisissez une compétence de votre plan de développement et prévoyez trois courtes séances de pratique délibérée par semaine, chacune avec un retour."
    },
    vids: [
      { t: "Grit: The power of passion and perseverance", u: "https://www.ted.com/talks/angela_lee_duckworth_grit_the_power_of_passion_and_perseverance", by: "TED · 6 min" }
    ]
  },
  {
    id: "grant", name: "Adam Grant", kind: "research",
    role: { en: "Wharton organizational psychologist, author of Give and Take and Think Again", fr: "Psychologue des organisations à Wharton, auteur de Give and Take et Think Again" },
    theme: { en: "Generosity and rethinking", fr: "Générosité et remise en question" },
    channel: "https://www.ted.com/speakers/adam_grant",
    ideas: {
      en: [
        "People who help others while protecting their own time are among the most successful; givers who never say no burn out.",
        "Rethinking is a skill: be ready to update your views when the evidence changes.",
        "Original thinkers generate many ideas before choosing; quantity is the path to quality."
      ],
      fr: [
        "Ceux qui aident les autres tout en protégeant leur temps comptent parmi les plus performants ; ceux qui ne disent jamais non s'épuisent.",
        "Se remettre en question est une compétence : soyez prêt à revoir vos positions quand les données changent.",
        "Les esprits originaux génèrent beaucoup d'idées avant de choisir : la quantité mène à la qualité."
      ]
    },
    practice: {
      en: "Before defending a position in a meeting, ask yourself what evidence would change your mind.",
      fr: "Avant de défendre une position en réunion, demandez-vous quelles données vous feraient changer d'avis."
    },
    vids: [
      { t: "The surprising habits of original thinkers", u: "https://www.ted.com/talks/adam_grant_the_surprising_habits_of_original_thinkers", by: "TED · 15 min" }
    ]
  },
  {
    id: "swaniker", name: "Fred Swaniker", kind: "africa",
    role: { en: "Ghanaian entrepreneur, founder of the African Leadership Academy and African Leadership University", fr: "Entrepreneur ghanéen, fondateur de l'African Leadership Academy et de l'African Leadership University" },
    theme: { en: "Ethical leadership for Africa", fr: "Un leadership éthique pour l'Afrique" },
    channel: "https://www.ted.com/speakers/fred_swaniker",
    ideas: {
      en: [
        "Africa's future depends on a generation of ethical, entrepreneurial leaders, so developing leaders is development work.",
        "Leaders who build institutions leave more behind than leaders who build personal power.",
        "Young leaders need not wait for permission: take responsibility for the problems in front of you."
      ],
      fr: [
        "L'avenir de l'Afrique dépend d'une génération de leaders éthiques et entreprenants : former des leaders, c'est faire du développement.",
        "Les leaders qui bâtissent des institutions laissent davantage que ceux qui bâtissent leur pouvoir personnel.",
        "Les jeunes leaders n'ont pas à attendre la permission : prenez en charge les problèmes qui se présentent à vous."
      ]
    },
    practice: {
      en: "Mentor one younger colleague this quarter, and agree on one leadership skill for them to practise.",
      fr: "Accompagnez un collègue plus jeune ce trimestre, et convenez ensemble d'une compétence de leadership à travailler."
    },
    vids: [
      { t: "The leaders who ruined Africa, and the generation who can fix it", u: "https://www.ted.com/talks/fred_swaniker_the_leaders_who_ruined_africa_and_the_generation_who_can_fix_it", by: "TED · 13 min" }
    ]
  },
  {
    id: "awuah", name: "Patrick Awuah", kind: "africa",
    role: { en: "Ghanaian educator, founder of Ashesi University", fr: "Éducateur ghanéen, fondateur de l'université Ashesi" },
    theme: { en: "Educating ethical leaders", fr: "Former des leaders éthiques" },
    channel: "https://www.ted.com/speakers/patrick_awuah",
    ideas: {
      en: [
        "Leaders need critical thinking, ethics and a sense of service, not only technical skills.",
        "Good leadership education builds the habit of asking how a decision will serve society.",
        "Institutions shape character: shared values and honour codes make integrity the norm."
      ],
      fr: [
        "Les leaders ont besoin d'esprit critique, d'éthique et du sens du service, pas seulement de compétences techniques.",
        "Une bonne formation au leadership installe le réflexe de se demander en quoi une décision sert la société.",
        "Les institutions façonnent le caractère : des valeurs partagées et des codes d'honneur font de l'intégrité la norme."
      ]
    },
    practice: {
      en: "For your next recommendation, add one line: who benefits, who bears the cost, and is that fair?",
      fr: "Pour votre prochaine recommandation, ajoutez une ligne : qui en bénéficie, qui en supporte le coût, et est-ce équitable ?"
    },
    vids: [
      { t: "How to educate leaders? Liberal arts", u: "https://www.ted.com/talks/patrick_awuah_how_to_educate_leaders_liberal_arts", by: "TED · 17 min" }
    ]
  },
  {
    id: "okonjo", name: "Ngozi Okonjo-Iweala", kind: "africa",
    role: { en: "Nigerian economist, Director-General of the World Trade Organization and former Finance Minister of Nigeria", fr: "Économiste nigériane, directrice générale de l'Organisation mondiale du commerce et ancienne ministre des Finances du Nigeria" },
    theme: { en: "Economic leadership and partnership", fr: "Leadership économique et partenariat" },
    channel: "https://www.ted.com/speakers/ngozi_okonjo_iweala",
    ideas: {
      en: [
        "Partnership with Africa works best when it invests in businesses and jobs, not only in aid.",
        "Reform takes courage and coalitions: make the case with evidence and build allies before pushing change.",
        "Present Africa's opportunities as well as its challenges; the story you tell shapes where investment goes."
      ],
      fr: [
        "Le partenariat avec l'Afrique fonctionne mieux quand il investit dans les entreprises et l'emploi, pas seulement dans l'aide.",
        "La réforme demande du courage et des coalitions : argumentez avec des données et rassemblez des alliés avant d'engager le changement.",
        "Présentez les opportunités de l'Afrique autant que ses défis : le récit oriente les investissements."
      ]
    },
    practice: {
      en: "In your next donor or government briefing, pair the problem you describe with one data point about opportunity.",
      fr: "Dans votre prochain briefing à un bailleur ou à un gouvernement, associez le problème décrit à une donnée sur les opportunités."
    },
    vids: [
      { t: "Want to help Africa? Do business here", u: "https://www.ted.com/talks/ngozi_okonjo_iweala_on_doing_business_in_africa", by: "TED · 20 min" }
    ]
  },
  {
    id: "motiversity", name: "Motiversity", kind: "channel",
    role: { en: "Motivational media channel publishing speeches by Coach Pain, Marcus Taylor, Billy Alsbrook and others", fr: "Chaîne de motivation publiant des discours de Coach Pain, Marcus Taylor, Billy Alsbrook et d'autres" },
    theme: { en: "Showing up", fr: "Être présent, chaque jour" },
    channel: "https://www.youtube.com/@motiversity",
    ideas: {
      en: [
        "Recurring theme: discipline outlasts motivation, so decide in advance and act whether or not you feel like it.",
        "Recurring theme: showing up every day compounds; small consistent actions beat occasional bursts.",
        "Recurring theme: a setback is the start of a comeback, if you treat it as training."
      ],
      fr: [
        "Thème récurrent : la discipline dure plus longtemps que la motivation ; décidez à l'avance et agissez, que vous en ayez envie ou non.",
        "Thème récurrent : se présenter chaque jour produit un effet cumulatif ; de petites actions régulières l'emportent sur des efforts ponctuels.",
        "Thème récurrent : un revers est le début d'un retour, si vous le traitez comme un entraînement."
      ]
    },
    practice: {
      en: "Choose one non-negotiable 20-minute habit, such as reading, a voice warm-up or exercise, and keep it for 30 days.",
      fr: "Choisissez une habitude non négociable de 20 minutes, comme la lecture, un échauffement vocal ou l'exercice physique, et tenez-la pendant 30 jours."
    },
    vids: [
      { t: "THE ART OF SHOWING UP – Motivational Speech Compilation", u: yt("_GiF0QI8i8w"), by: "Motiversity" },
      { t: "IT'S TIME FOR YOUR COMEBACK – Coach Pain", u: yt("eGfF8ggfiVc"), by: "Motiversity" }
    ]
  },
  {
    id: "alpha", name: "Alpha Mentors", kind: "channel",
    role: { en: "Media company founded in 2018 (formerly Alpha Leaders) producing stories that help people reach their potential", fr: "Société de médias fondée en 2018 (anciennement Alpha Leaders) produisant des récits pour aider chacun à réaliser son potentiel" },
    theme: { en: "Consistency and growth", fr: "Constance et croissance" },
    channel: "https://www.youtube.com/@AlphaMentorsYT",
    ideas: {
      en: [
        "Recurring theme: consistency and discipline turn goals into habits.",
        "Recurring theme: building a better you is daily work, not a single decision.",
        "Recurring theme: learning from people further along the path shortens your own."
      ],
      fr: [
        "Thème récurrent : la constance et la discipline transforment les objectifs en habitudes.",
        "Thème récurrent : devenir une meilleure version de soi est un travail quotidien, pas une décision unique.",
        "Thème récurrent : apprendre de ceux qui sont plus avancés raccourcit votre propre chemin."
      ]
    },
    practice: {
      en: "Each month, ask one senior colleague one question about how they grew into their role, and write down what you will apply.",
      fr: "Chaque mois, posez à un collègue expérimenté une question sur la façon dont il a grandi dans son rôle, et notez ce que vous en retiendrez."
    },
    vids: [
      { t: "CONSISTENCY & DISCIPLINE – Marcus A. Taylor", u: yt("P-KK7dagfGc"), by: "Alpha Mentors" },
      { t: "BUILD A BETTER YOU – Walter Bond", u: yt("p00cHlmo9tg"), by: "Alpha Mentors" }
    ]
  },
  {
    id: "motivationhub", name: "MotivationHub", kind: "channel",
    role: { en: "Channel of motivational speech compilations, including talks by Zig Ziglar, Jim Rohn and Alan Watts", fr: "Chaîne de compilations de discours de motivation, dont des interventions de Zig Ziglar, Jim Rohn et Alan Watts" },
    theme: { en: "Perspective and reflection", fr: "Recul et réflexion" },
    channel: "https://www.youtube.com/channel/UCR54lF_dD3f-8srmRqnTwgQ",
    ideas: {
      en: [
        "Use compilations for perspective on a hard week, then turn one idea into an action.",
        "Compilations edit speeches together; for full context, find the talk on the speaker's official channel."
      ],
      fr: [
        "Utilisez les compilations pour prendre du recul après une semaine difficile, puis transformez une idée en action.",
        "Les compilations assemblent des extraits : pour le contexte complet, retrouvez l'intervention sur la chaîne officielle de l'orateur."
      ]
    },
    practice: {
      en: "After watching, write one sentence: the idea that struck you and the one action you will take this week.",
      fr: "Après le visionnage, écrivez une phrase : l'idée qui vous a marqué et l'action que vous mènerez cette semaine."
    },
    vids: [
      { t: "Zig Ziglar's Speech Will Leave You SPEECHLESS", u: yt("JdsaBRzLnZA"), by: "MotivationHub" }
    ]
  }
];

// Every entry ends up with a `quotes` array (the original single `quote`
// first) and its extra lessons appended; classic voices follow the moderns.
export const SPEAKERS = [
  ...BASE.map(({ quote, ...s }) => {
    const x = EXTRA[s.id] || {};
    return {
      ...s,
      quotes: [...(quote ? [quote] : []), ...(x.quotes || [])],
      ideas: x.ideas ? { en: [...s.ideas.en, ...x.ideas.en], fr: [...s.ideas.fr, ...x.ideas.fr] } : s.ideas
    };
  }),
  ...CLASSICS
];

// Four-week plan that combines the speakers' practices. Weeks are checked
// off and stored with the participant's progress (category "pd").
export const PD_PLAN = [
  {
    id: "w1", speakers: ["munroe", "sinek", "proctor", "ziglar"],
    title: { en: "Week 1 – Purpose and goals", fr: "Semaine 1 – Raison d'être et objectifs" },
    steps: {
      en: ["Write a one-sentence purpose statement for your work", "Write your main goal on a card and read it every morning", "Each day, help one colleague or partner succeed"],
      fr: ["Rédigez en une phrase la raison d'être de votre travail", "Écrivez votre objectif principal sur une carte et lisez-la chaque matin", "Chaque jour, aidez un collègue ou un partenaire à réussir"]
    }
  },
  {
    id: "w2", speakers: ["rohn", "covey", "sharma", "motiversity"],
    title: { en: "Week 2 – Daily discipline", fr: "Semaine 2 – Discipline quotidienne" },
    steps: {
      en: ["Plan each day on paper before it starts", "Journal for five minutes every evening", "Keep one non-negotiable 20-minute habit"],
      fr: ["Planifiez chaque journée sur papier avant qu'elle ne commence", "Écrivez cinq minutes chaque soir", "Tenez une habitude non négociable de 20 minutes"]
    }
  },
  {
    id: "w3", speakers: ["vinh", "robbins", "melrobbins"],
    title: { en: "Week 3 – Voice and presence", fr: "Semaine 3 – Voix et présence" },
    steps: {
      en: ["Do a daily read-aloud with deliberate pace, volume and pauses", "Record one practice briefing and listen back", "Before key meetings, reset your posture and breathing for two minutes"],
      fr: ["Lisez à voix haute chaque jour en variant délibérément le débit, le volume et les pauses", "Enregistrez un briefing d'entraînement et réécoutez-le", "Avant les réunions importantes, ajustez posture et respiration pendant deux minutes"]
    }
  },
  {
    id: "w4", speakers: ["lesbrown", "dweck", "goldsmith", "munroe"],
    title: { en: "Week 4 – Resilience and legacy", fr: "Semaine 4 – Résilience et héritage" },
    steps: {
      en: ["Turn one recent setback into a written lesson and a next attempt", "Name the person you are preparing as a successor and give them a stretch task", "Share one thing you learned this month with your mentor"],
      fr: ["Transformez un revers récent en leçon écrite et en nouvelle tentative", "Désignez la personne que vous préparez à vous succéder et confiez-lui une mission stimulante", "Partagez avec votre mentor une chose apprise ce mois-ci"]
    }
  }
];
