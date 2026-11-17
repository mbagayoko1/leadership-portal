// Voice studio content: the 10-minute warm-up, six drills, their targets and
// tips, and the link from each curriculum vocal exercise (the `ve` items in
// src/data.js) to a drill. Passages are written for this programme; tongue
// twisters are traditional. Targets are practical ranges for clear public
// speaking, not clinical norms: the studio labels every figure an estimate.

export const WARMUP = [
  { id: "jaw", secs: 60, title: { en: "Jaw and face release", fr: "Détente de la mâchoire et du visage" },
    how: { en: "Massage your jaw hinges in small circles, then let the jaw hang loose. Yawn gently twice and stretch the face wide, then small.", fr: "Massez les articulations de la mâchoire en petits cercles, puis laissez-la pendre. Bâillez doucement deux fois et étirez le visage, en grand puis en petit." } },
  { id: "breath", secs: 120, title: { en: "Breathing from the belly", fr: "Respiration abdominale" },
    how: { en: "Hand on your belly. Breathe in through the nose for 4, feel the belly push the hand out, hold for 2, breathe out on a slow \"sss\" for 8. Keep the shoulders still.", fr: "Main sur le ventre. Inspirez par le nez sur 4 temps en sentant le ventre pousser la main, bloquez 2 temps, expirez sur un « sss » lent pendant 8 temps. Gardez les épaules immobiles." } },
  { id: "trills", secs: 120, title: { en: "Lip trills", fr: "Trilles des lèvres" },
    how: { en: "Let your lips flutter like a horse (\"brrr\") on one easy note, then slide up and down. If the lips stop, press lightly on your cheeks.", fr: "Faites vibrer les lèvres comme un cheval (« brrr ») sur une note facile, puis glissez vers le haut et vers le bas. Si les lèvres s'arrêtent, appuyez légèrement sur vos joues." } },
  { id: "sirens", secs: 120, title: { en: "Sirens", fr: "Sirènes" },
    how: { en: "On \"ng\" (as in sing) or \"woo\", glide smoothly from your lowest comfortable note to your highest and back, like a siren. Stay light; never push.", fr: "Sur « ng » (comme dans parking) ou « ou », glissez doucement de votre note confortable la plus grave à la plus aiguë, puis redescendez, comme une sirène. Restez léger, sans forcer." } },
  { id: "artic", secs: 120, title: { en: "Articulation", fr: "Articulation" },
    how: { en: "Say \"red leather, yellow leather\" and \"unique New York\" five times each, slowly then faster, moving the lips and tongue fully.", fr: "Dites « les chaussettes de l'archiduchesse » et « un chasseur sachant chasser » cinq fois chacune, lentement puis plus vite, en articulant pleinement." } },
  { id: "project", secs: 60, title: { en: "Projection", fr: "Projection" },
    how: { en: "Pick a point at the back of the room. Count from one to ten, sending each number to that point with breath support, not by shouting.", fr: "Choisissez un point au fond de la salle. Comptez de un à dix en envoyant chaque nombre vers ce point grâce au souffle, sans crier." } }
];

// focus: the metrics the drill is about, in order. maxSecs: recording auto-stops.
export const DRILLS = [
  {
    id: "pace", focus: ["wpm"], maxSecs: 120,
    title: { en: "Pace", fr: "Débit" },
    goal: { en: "Read the passage aloud at about 150 words per minute: slow enough to follow, fast enough to keep energy.", fr: "Lisez le passage à voix haute à environ 150 mots par minute : assez lent pour être suivi, assez rapide pour garder l'énergie." },
    text: {
      en: "Every day, decisions are made about schools, clinics and jobs for young people. Many of those decisions are made in rooms where young people are not present. Our task is to bring their reality into those rooms, clearly and calmly. That means knowing the facts, choosing the few that matter, and saying them in a way that a busy minister will remember on the drive home. It also means listening. The best case is not the loudest one; it is the one that answers the question the decision maker is really asking. When we speak with care, we are heard with care.",
      fr: "Chaque jour, des décisions sont prises sur les écoles, les centres de santé et l'emploi des jeunes. Beaucoup de ces décisions sont prises dans des salles où les jeunes ne sont pas présents. Notre tâche est de faire entrer leur réalité dans ces salles, avec clarté et calme. Cela veut dire connaître les faits, choisir ceux qui comptent, et les dire de façon qu'un ministre pressé s'en souvienne sur le chemin du retour. Cela veut dire aussi écouter. Le meilleur argument n'est pas le plus bruyant ; c'est celui qui répond à la question que le décideur se pose vraiment. Quand nous parlons avec soin, on nous écoute avec soin."
    }
  },
  {
    id: "pauses", focus: ["goodPauses"], maxSecs: 120,
    title: { en: "Pauses", fr: "Pauses" },
    goal: { en: "Pause for two to three seconds at each slash. A pause gives weight to what comes before it and attention to what comes after.", fr: "Faites une pause de deux à trois secondes à chaque barre oblique. Une pause donne du poids à ce qui précède et de l'attention à ce qui suit." },
    text: {
      en: "Ten years ago, one in three girls in this district was married before eighteen. / Today, it is one in five. / That change did not happen by chance. / It happened because teachers, parents and religious leaders decided, together, that it must. / Our work now is to reach the girls the average still hides.",
      fr: "Il y a dix ans, une fille sur trois dans ce district était mariée avant dix-huit ans. / Aujourd'hui, c'est une sur cinq. / Ce changement n'est pas le fruit du hasard. / Il est arrivé parce que des enseignants, des parents et des leaders religieux ont décidé, ensemble, qu'il le fallait. / Notre travail consiste maintenant à atteindre les filles que la moyenne cache encore."
    }
  },
  {
    id: "articulation", focus: ["accuracy"], maxSecs: 45,
    title: { en: "Articulation", fr: "Articulation" },
    goal: { en: "Say the tongue twister three times, clearly, then a little faster. The studio checks how many words it could recognise.", fr: "Dites la phrase trois fois, clairement, puis un peu plus vite. Le studio vérifie combien de mots il a pu reconnaître." },
    twisters: {
      en: ["Red leather, yellow leather.", "Unique New York, unique New York, you know you need unique New York.", "She sells seashells by the seashore.", "The sixth sick sheikh's sixth sheep's sick."],
      fr: ["Les chaussettes de l'archiduchesse sont-elles sèches ? Archi-sèches !", "Un chasseur sachant chasser doit savoir chasser sans son chien.", "Ton thé t'a-t-il ôté ta toux ?", "Si six scies scient six cyprès, six cent six scies scient six cent six cyprès."]
    }
  },
  {
    id: "projection", focus: ["volumeDb"], maxSecs: 90,
    title: { en: "Projection and steadiness", fr: "Projection et stabilité" },
    goal: { en: "Read to someone at the back of a large room. Keep the volume even to the end of every sentence, supported by your breath.", fr: "Lisez pour quelqu'un au fond d'une grande salle. Gardez un volume égal jusqu'à la fin de chaque phrase, porté par le souffle." },
    text: {
      en: "Good morning, everyone, and welcome. Thank you for travelling from across the region to be here. Over the next two days we will share what has worked, admit what has not, and agree on what we will do differently. Please speak openly. Every voice in this room has something the others need to hear.",
      fr: "Bonjour à toutes et à tous, et bienvenue. Merci d'être venus de toute la région. Pendant ces deux jours, nous partagerons ce qui a fonctionné, reconnaîtrons ce qui n'a pas marché, et conviendrons de ce que nous ferons autrement. Exprimez-vous librement. Chaque voix dans cette salle a quelque chose que les autres ont besoin d'entendre."
    }
  },
  {
    id: "pitch", focus: ["pitchRangeSt"], maxSecs: 60,
    title: { en: "Pitch variety", fr: "Variété de l'intonation" },
    goal: { en: "Say the sentence five ways: as a question, with surprise, firmly, warmly and with excitement. Let your voice move.", fr: "Dites la phrase de cinq façons : comme une question, avec surprise, fermement, chaleureusement et avec enthousiasme. Laissez votre voix bouger." },
    text: { en: "We can do this together.", fr: "Nous pouvons y arriver ensemble." }
  },
  {
    id: "fillers", focus: ["fillersPerMin", "wpm"], maxSecs: 60,
    title: { en: "Fewer fillers", fr: "Moins de mots parasites" },
    goal: { en: "Speak for one minute on the topic, without notes. When you need time to think, pause instead of saying \"um\".", fr: "Parlez une minute sur le sujet, sans notes. Quand vous avez besoin de réfléchir, faites une pause au lieu de dire « euh »." },
    topics: {
      en: ["A leader who influenced you, and how.", "One thing your team does better than anyone.", "Why young people should be in the room when budgets are decided.", "A mistake that taught you something.", "What you would change first if you led your office.", "The best meeting you ever attended.", "How you prepare for a difficult conversation.", "A number from your work that everyone should know."],
      fr: ["Un leader qui vous a marqué, et comment.", "Une chose que votre équipe fait mieux que quiconque.", "Pourquoi les jeunes doivent être présents quand on décide des budgets.", "Une erreur qui vous a appris quelque chose.", "Ce que vous changeriez en premier si vous dirigiez votre bureau.", "La meilleure réunion à laquelle vous ayez participé.", "Comment vous préparez une conversation difficile.", "Un chiffre de votre travail que tout le monde devrait connaître."]
    }
  }
];

// good: inside [lo, hi]; near: inside the wider range; otherwise work.
export const TARGETS = {
  wpm: { good: [130, 165], near: [115, 180], unit: "wpm" },
  fillersPerMin: { good: [0, 2], near: [0, 4], unit: "/min" },
  goodPauses: { good: [3, 99], near: [1, 99], unit: "" },
  volumeDb: { good: [0, 4], near: [0, 6], unit: "dB" },
  pitchRangeSt: { good: [4, 12], near: [2.5, 15], unit: "st" },
  accuracy: { good: [90, 100], near: [75, 100], unit: "%" }
};

const SECONDARY = ["wpm", "fillersPerMin", "volumeDb", "pitchRangeSt"];

function status(key, v) {
  const t = TARGETS[key];
  if (v >= t.good[0] && v <= t.good[1]) return "good";
  if (v >= t.near[0] && v <= t.near[1]) return "near";
  return "work";
}

// Judges a take for a drill: the drill's own metrics first, then the others
// that were measured, and picks one tip.
export function scoreTake(drillId, m) {
  const drill = DRILLS.find(d => d.id === drillId) || DRILLS[0];
  if (!m || !m.secs || m.secs < 1) return { rows: [], tip: { metric: "none" } };
  const keys = [...drill.focus, ...SECONDARY.filter(k => !drill.focus.includes(k))];
  const rows = keys.filter(k => m[k] != null).map(k => ({
    key: k, value: m[k], focus: drill.focus.includes(k), status: status(k, m[k]),
    dir: m[k] < TARGETS[k].good[0] ? "low" : m[k] > TARGETS[k].good[1] ? "high" : "ok"
  }));
  const pick = rows.find(r => r.focus && r.status !== "good") || rows.find(r => r.status === "work") || null;
  return { rows, tip: pick ? { metric: pick.key, dir: pick.dir } : { metric: "all", dir: "ok" } };
}

export const TIPS = {
  wpm: {
    high: { en: "Slow down. Breathe at every full stop and let the last word of each sentence land before you start the next.", fr: "Ralentissez. Respirez à chaque point et laissez le dernier mot de chaque phrase se poser avant d'enchaîner." },
    low: { en: "Pick up the pace a little. Group words into phrases and move through the small words; keep pauses for the important ones.", fr: "Accélérez un peu. Regroupez les mots en groupes de sens et passez plus vite sur les petits mots ; gardez les pauses pour les mots importants." }
  },
  fillersPerMin: {
    high: { en: "Replace each \"um\" with silence. Close your mouth while you think: a short pause sounds confident, a filler sounds unsure.", fr: "Remplacez chaque « euh » par un silence. Fermez la bouche pendant que vous réfléchissez : une courte pause paraît assurée, un mot parasite paraît hésitant." }
  },
  goodPauses: {
    low: { en: "Hold each pause longer than feels natural: count \"one, two\" in your head at every slash before you go on.", fr: "Tenez chaque pause plus longtemps que ce qui vous semble naturel : comptez « un, deux » dans votre tête à chaque barre avant de reprendre." }
  },
  volumeDb: {
    high: { en: "Keep the energy to the end of each sentence. Take a breath before you start, and aim the last word at the back wall.", fr: "Gardez l'énergie jusqu'à la fin de chaque phrase. Inspirez avant de commencer et visez le mur du fond avec le dernier mot." }
  },
  pitchRangeSt: {
    low: { en: "Let your voice move more. Lift on the word that matters most and come down at the end of statements; try exaggerating, then ease back.", fr: "Laissez votre voix bouger davantage. Montez sur le mot le plus important et redescendez en fin d'affirmation ; exagérez, puis revenez à la normale." },
    high: { en: "Your voice jumps a lot. Keep the big movements for the key words and settle the rest into a calm, conversational range.", fr: "Votre voix varie beaucoup. Gardez les grands mouvements pour les mots clés et posez le reste dans un registre calme et naturel." }
  },
  accuracy: {
    low: { en: "Slow down and finish every consonant, especially at the ends of words. Get it right slowly before you get it fast.", fr: "Ralentissez et terminez chaque consonne, surtout en fin de mot. Réussissez lentement avant d'aller vite." }
  },
  all: { ok: { en: "Well done: every measure is in range. Try the drill again a little faster, or move to the next one.", fr: "Bravo : chaque mesure est dans la cible. Recommencez un peu plus vite, ou passez à l'exercice suivant." } },
  none: { ok: { en: "No speech was detected. Check the microphone is allowed and close enough, then try again.", fr: "Aucune parole détectée. Vérifiez que le micro est autorisé et assez proche, puis réessayez." } }
};

// Each curriculum vocal exercise (src/data.js, module.ve[i]) → drill or "warmup".
export const VE_DRILL = {
  m1: ["warmup", "articulation", "pitch"],
  m2: ["warmup", "projection", "pauses"],
  m3: ["pace", "pitch", "pitch"],
  m4: ["pitch", "pitch", "pauses"],
  m5: ["warmup", "projection", "projection"],
  m6: ["fillers", "fillers", "pace"],
  m7: ["projection", "fillers", "pace"],
  m8: ["pauses", "pitch", "projection"],
  m9: ["pitch", "fillers", "fillers"],
  m10: ["fillers", "articulation", "pitch"],
  m11: ["pitch", "pauses", "pitch"]
};
// The warm-up counts as a drill target for links.
DRILLS.unshift({ id: "warmup", focus: [], title: { en: "10-minute warm-up", fr: "Échauffement de 10 minutes" } });
