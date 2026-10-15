// Speech builder logic (Personal Development tab): brief options, the AI
// prompt, the parser for the AI's answer, and an offline template draft for
// when the AI Coach is not connected. Quotes may only come from QUOTES, the
// verified bank shared with the speech library.
import { QUOTES, DEVICES } from "./speeches.js";

export const WPM = 130; // words per minute for spoken delivery

export const OPTIONS = {
  goal: {
    inform: { en: "Inform and explain", fr: "Informer et expliquer" },
    persuade: { en: "Persuade and win support", fr: "Convaincre et rallier" },
    inspire: { en: "Inspire and motivate", fr: "Inspirer et motiver" },
    celebrate: { en: "Celebrate an achievement", fr: "Célébrer une réussite" },
    welcome: { en: "Welcome and open an event", fr: "Accueillir et ouvrir un événement" },
    close: { en: "Close and thank", fr: "Clôturer et remercier" },
    advocate: { en: "Advocate for a cause", fr: "Plaider pour une cause" },
    commemorate: { en: "Pay tribute or commemorate", fr: "Rendre hommage ou commémorer" },
    change: { en: "Rally a team through change", fr: "Mobiliser une équipe face au changement" },
    farewell: { en: "Say farewell", fr: "Faire ses adieux" }
  },
  occasion: {
    retreat: { en: "Team retreat or planning meeting", fr: "Retraite d'équipe ou réunion de planification" },
    workshop: { en: "Workshop or training opening", fr: "Ouverture d'atelier ou de formation" },
    conference: { en: "Conference or keynote", fr: "Conférence ou discours principal" },
    launch: { en: "Launch of a report, project or campaign", fr: "Lancement d'un rapport, projet ou campagne" },
    award: { en: "Award or recognition ceremony", fr: "Cérémonie de remise de prix ou de reconnaissance" },
    partners: { en: "Partner or donor meeting", fr: "Réunion avec partenaires ou bailleurs" },
    official: { en: "Official ceremony with government", fr: "Cérémonie officielle avec le gouvernement" },
    community: { en: "Community or youth event", fr: "Événement communautaire ou jeunesse" },
    farewell: { en: "Farewell or retirement", fr: "Départ ou retraite" },
    internal: { en: "All-staff or town hall meeting", fr: "Réunion générale du personnel" }
  },
  audience: {
    colleagues: { en: "Colleagues and team members", fr: "Collègues et membres de l'équipe" },
    leadership: { en: "Senior management", fr: "Direction" },
    government: { en: "Government officials and dignitaries", fr: "Représentants du gouvernement et personnalités" },
    partners: { en: "Partners and donors", fr: "Partenaires et bailleurs" },
    community: { en: "Community members", fr: "Membres de la communauté" },
    youth: { en: "Young people and students", fr: "Jeunes et étudiants" },
    mixed: { en: "Mixed public audience", fr: "Public mixte" }
  },
  tone: {
    inspiring: { en: "Inspiring", fr: "Inspirant" },
    formal: { en: "Formal and diplomatic", fr: "Officiel et diplomatique" },
    warm: { en: "Warm and personal", fr: "Chaleureux et personnel" },
    urgent: { en: "Urgent and direct", fr: "Urgent et direct" },
    celebratory: { en: "Celebratory", fr: "Festif" },
    reflective: { en: "Reflective", fr: "Réfléchi" },
    conversational: { en: "Conversational", fr: "Conversationnel" }
  },
  structure: {
    classic: { en: "Opening, three key points, close", fr: "Ouverture, trois idées clés, conclusion" },
    problem: { en: "Problem, solution, action", fr: "Problème, solution, action" },
    time: { en: "Past, present, future", fr: "Passé, présent, avenir" },
    story: { en: "Story, lesson, call to action", fr: "Récit, leçon, appel à l'action" },
    monroe: { en: "Attention, need, solution, vision, action", fr: "Attention, besoin, solution, vision, action" }
  },
  minutes: [1, 2, 3, 5, 7, 10, 15]
};

export const emptyBrief = (lang, user) => ({
  topic: "", title: "", goal: "inspire", occasion: "retreat", occasionNote: "",
  audience: "colleagues", audienceNote: "",
  speaker: user ? [user.name, user.title, user.organization].filter(Boolean).join(", ") : "",
  minutes: 3, tone: "inspiring", language: lang, structure: "classic",
  messages: ["", "", ""], story: "", facts: "", cta: "", acks: "", avoid: "",
  devices: ["question", "story", "three", "cta"], quote: true
});

const label = (group, key, lang) => (OPTIONS[group][key] || {})[lang] || key;
export const targetWords = b => Math.round(b.minutes * WPM);
export const wordCount = s => (String(s || "").match(/\S+/g) || []).length;

// Verified quotes the model may choose from (at most one, verbatim).
function quoteList() {
  return Object.values(QUOTES).map(q => "- \"" + q.text + "\" (" + q.by + ", " + q.src.en + ")" + (q.fr ? " | FR: \"" + q.fr + "\"" : "")).join("\n");
}

export function buildPrompt(b) {
  const lang = b.language === "fr" ? "French" : "English";
  const system = [
    "You are an experienced speechwriter for senior staff of UNFPA, the United Nations sexual and reproductive health agency, in West and Central Africa. You write speeches that are meant to be spoken: short sentences, clear signposting, rhythm, and room to breathe.",
    "Rules:",
    "1. Write the whole speech in " + lang + ".",
    "2. Aim for about " + targetWords(b) + " words (" + b.minutes + " minutes at about " + WPM + " words per minute), within 10%.",
    "3. Follow the requested structure, goal, tone and audience. Use the requested rhetorical techniques naturally.",
    "4. Use only facts, figures, names and stories given in the brief. Never invent statistics, names, events, quotations or commitments. Where a figure or example would help and none is given, insert a bracketed placeholder such as [add verified figure: maternal deaths in the region].",
    "5. Quotations: use at most one, and only one copied exactly from the VERIFIED QUOTES list below, with its attribution. If none fits, use no quotation. For a French speech, use the FR wording where one is given.",
    "6. If acknowledgements are given, open with them exactly as written and in the order given.",
    "7. Use inclusive, gender-sensitive, rights-based language in line with UN values; stay non-partisan.",
    "8. Output exactly this format, with these markers in English and nothing before or after:",
    "TITLE: <short title>",
    "KEY MESSAGE: <one sentence>",
    "---SPEECH---",
    "<the speech, paragraphs separated by a blank line>",
    "---DELIVERY---",
    "- <3 to 6 specific delivery notes: where to pause, slow down, emphasise or make eye contact>",
    "---NOTES---",
    "- <placeholders to fill in or facts to verify; write \"- None\" if there are none>",
    "",
    "VERIFIED QUOTES:",
    quoteList()
  ].join("\n");

  const lines = [
    "Speech brief",
    "Topic: " + b.topic,
    b.title ? "Working title: " + b.title : "",
    "Goal: " + label("goal", b.goal, "en"),
    "Occasion: " + label("occasion", b.occasion, "en") + (b.occasionNote ? " – " + b.occasionNote : ""),
    "Audience: " + label("audience", b.audience, "en") + (b.audienceNote ? " – " + b.audienceNote : ""),
    b.speaker ? "Speaker: " + b.speaker : "",
    "Length: " + b.minutes + " minutes (about " + targetWords(b) + " words)",
    "Tone: " + label("tone", b.tone, "en"),
    "Structure: " + label("structure", b.structure, "en"),
    "Key messages: " + (b.messages.filter(m => m.trim()).map((m, i) => (i + 1) + ". " + m.trim()).join(" ") || "(choose the strongest for this goal and audience)"),
    b.story ? "Story or example to include: " + b.story : "",
    b.facts ? "Facts and figures (verified by the speaker): " + b.facts : "",
    b.cta ? "Call to action: " + b.cta : "",
    b.acks ? "Acknowledgements, in this order: " + b.acks : "",
    b.avoid ? "Avoid: " + b.avoid : "",
    b.devices.length ? "Rhetorical techniques to use: " + b.devices.map(d => DEVICES[d].en).join(", ") : "",
    "Quotation: " + (b.quote ? "include one from the verified list if it fits" : "do not use a quotation")
  ];
  return { system, user: lines.filter(Boolean).join("\n") };
}

export function revisePrompt(instruction, b) {
  return "Revise the speech: " + instruction + " Keep the same rules and exactly the same output format" +
    (/shorter|longer|plus court|plus long/i.test(instruction) ? "." : ", and keep it to about " + targetWords(b) + " words.");
}

// Splits the model's answer into its parts; tolerant of partial (streaming) text.
export function parseOutput(raw) {
  const text = String(raw || "");
  const pick = re => { const m = re.exec(text); return m ? m[1].trim() : ""; };
  const title = pick(/TITLE:\s*(.+)/);
  const key = pick(/KEY MESSAGE:\s*(.+)/);
  const sp = text.indexOf("---SPEECH---");
  const dl = text.indexOf("---DELIVERY---");
  const nt = text.indexOf("---NOTES---");
  const speech = sp < 0 ? "" : text.slice(sp + 12, dl < 0 ? undefined : dl).trim();
  const bullets = s => s.split("\n").map(x => x.replace(/^\s*[-•]\s*/, "").trim()).filter(x => x && !/^none\.?$/i.test(x) && !/^aucun/i.test(x));
  const delivery = dl < 0 ? [] : bullets(text.slice(dl + 14, nt < 0 ? undefined : nt));
  const notes = nt < 0 ? [] : bullets(text.slice(nt + 11));
  return { title, key, speech, delivery, notes, complete: nt >= 0 };
}

// ── Offline template draft ────────────────────────────────────────────────
const GOAL_QUOTE = { inform: "annan", persuade: "sinekWhy", inspire: "eleanor", celebrate: "far", welcome: "unfpa", close: "tutu", advocate: "malala", commemorate: "mlkOthers", change: "mlkForward", farewell: "maathai" };

const TPL = {
  en: {
    greet: {
      colleagues: "Dear colleagues, good morning.", leadership: "Good morning, and thank you for this time.",
      government: "Excellencies, distinguished guests, ladies and gentlemen, good morning.", partners: "Distinguished partners, colleagues and friends, good morning.",
      community: "Dear friends, good morning, and thank you for welcoming us.", youth: "Good morning, everyone. It is a real pleasure to be with you.",
      mixed: "Ladies and gentlemen, good morning, and welcome."
    },
    hook: {
      classic: "Let me begin with a simple question: why does {topic} matter to every one of us in this room?",
      problem: "We are here because of a problem we can no longer ignore: {topic}.",
      time: "Think back a few years. Where did we stand on {topic}? And where do we want to stand a few years from now?",
      story: "Let me start with a story. [Tell a short, true story of one person affected by {topic}.]",
      monroe: "Imagine, for a moment, a future in which {topic} is no longer a challenge but a success we can point to."
    },
    purpose: {
      inform: "Today I want to explain {topic}: what it is, why it matters, and what it means for our work.",
      persuade: "Today I want to make the case that {topic} deserves our support, and our commitment.",
      inspire: "Today I want to remind us why {topic} matters, and what each of us can do about it.",
      celebrate: "Today we are here to celebrate {topic}, and the people who made it possible.",
      welcome: "It is my pleasure to welcome you to this event on {topic}.",
      close: "As we close our work on {topic}, I want to look back on what we achieved and look ahead to what comes next.",
      advocate: "Today I speak on behalf of those most affected by {topic}, because their voices must be heard.",
      commemorate: "Today we pause to honour {topic}, and to carry its meaning forward.",
      change: "We are going through a period of change around {topic}, and I want to speak plainly about it.",
      farewell: "As I prepare to leave, I want to say a few words about {topic}, and about all of you."
    },
    ord: ["First,", "Second,", "Third,"],
    single: "My message is simple:",
    elaborate: "[Add one example, fact or short story that shows this.]",
    noMessages: "[Add your two or three key messages here, each with one example or fact.]",
    storyIntro: "Let me share an example.",
    factsIntro: "The evidence is clear.",
    quoteIntro: by => "As " + by + " put it:",
    cta: "So here is what I ask of you: {cta}.",
    ctaGeneric: "So I ask each of you: what is one thing you will do, starting this week?",
    close: {
      inform: "Thank you. I look forward to your questions.", persuade: "The case is clear. Now the choice is ours. Thank you.",
      inspire: "The work ahead is not small, but neither are we. Thank you.", celebrate: "Congratulations, and thank you for everything you have given.",
      welcome: "Once again, welcome. I wish us all a productive and inspiring time together.", close: "Thank you for your commitment. Let us carry this work forward together.",
      advocate: "Their future depends on what we decide. Let us decide well. Thank you.", commemorate: "Let us honour this memory not only with words, but with action. Thank you.",
      change: "Change is hard, but we will not face it alone. We will face it together. Thank you.", farewell: "Thank you for the journey. I leave with gratitude, and with great confidence in you."
    },
    delivery: [
      "Pause for two seconds after your opening question or line.",
      "Slow down and lower your voice for the story or example.",
      "Say each key message on its own, with a short pause after it.",
      "Look up and make eye contact for the call to action and the last sentence."
    ],
    notes: "Template draft: replace the [bracketed] parts with your own examples and verified facts, or connect the AI Coach for a complete, tailored speech."
  },
  fr: {
    greet: {
      colleagues: "Chers collègues, bonjour.", leadership: "Bonjour, et merci pour ce temps qui m'est accordé.",
      government: "Excellences, distingués invités, mesdames et messieurs, bonjour.", partners: "Chers partenaires, chers collègues et amis, bonjour.",
      community: "Chers amis, bonjour, et merci de nous accueillir.", youth: "Bonjour à toutes et à tous. C'est un vrai plaisir d'être avec vous.",
      mixed: "Mesdames et messieurs, bonjour et bienvenue."
    },
    hook: {
      classic: "Permettez-moi de commencer par une question simple : pourquoi ce sujet, {topic}, nous concerne-t-il toutes et tous dans cette salle ?",
      problem: "Nous sommes ici à cause d'un problème que nous ne pouvons plus ignorer : {topic}.",
      time: "Revenons quelques années en arrière. Où en étions-nous sur {topic} ? Et où voulons-nous être dans quelques années ?",
      story: "Permettez-moi de commencer par une histoire. [Racontez une histoire courte et vraie d'une personne concernée par {topic}.]",
      monroe: "Imaginez un instant un avenir où {topic} n'est plus un défi, mais une réussite dont nous sommes fiers."
    },
    purpose: {
      inform: "Aujourd'hui, je souhaite vous expliquer {topic} : de quoi il s'agit, pourquoi c'est important et ce que cela signifie pour notre travail.",
      persuade: "Aujourd'hui, je souhaite vous convaincre que {topic} mérite notre soutien et notre engagement.",
      inspire: "Aujourd'hui, je souhaite nous rappeler pourquoi {topic} compte, et ce que chacun de nous peut faire.",
      celebrate: "Nous sommes réunis aujourd'hui pour célébrer {topic}, et celles et ceux qui l'ont rendu possible.",
      welcome: "J'ai le plaisir de vous souhaiter la bienvenue à cet événement consacré à {topic}.",
      close: "Au moment de conclure nos travaux sur {topic}, je souhaite revenir sur ce que nous avons accompli et regarder vers la suite.",
      advocate: "Aujourd'hui, je parle au nom des personnes les plus touchées par {topic}, car leur voix doit être entendue.",
      commemorate: "Aujourd'hui, nous prenons un moment pour honorer {topic} et en porter le sens.",
      change: "Nous traversons une période de changement concernant {topic}, et je veux en parler franchement.",
      farewell: "Au moment de partir, je souhaite dire quelques mots sur {topic}, et sur vous toutes et tous."
    },
    ord: ["Premièrement,", "Deuxièmement,", "Troisièmement,"],
    single: "Mon message est simple :",
    elaborate: "[Ajoutez un exemple, un fait ou une courte histoire qui l'illustre.]",
    noMessages: "[Ajoutez ici vos deux ou trois messages clés, chacun avec un exemple ou un fait.]",
    storyIntro: "Permettez-moi de partager un exemple.",
    factsIntro: "Les faits sont clairs.",
    quoteIntro: by => "Comme l'a dit " + by + " :",
    cta: "Voici donc ce que je vous demande : {cta}.",
    ctaGeneric: "Je vous pose donc la question : quelle action allez-vous mener, dès cette semaine ?",
    close: {
      inform: "Merci. Je serai heureux de répondre à vos questions.", persuade: "Les arguments sont clairs. Le choix nous appartient. Merci.",
      inspire: "La tâche est grande, mais nous le sommes aussi. Merci.", celebrate: "Félicitations, et merci pour tout ce que vous avez donné.",
      welcome: "Encore une fois, bienvenue. Je nous souhaite des échanges riches et inspirants.", close: "Merci pour votre engagement. Poursuivons ce travail ensemble.",
      advocate: "Leur avenir dépend de nos décisions. Décidons bien. Merci.", commemorate: "Honorons cette mémoire non seulement par des mots, mais par des actes. Merci.",
      change: "Le changement est difficile, mais nous ne l'affronterons pas seuls. Nous l'affronterons ensemble. Merci.", farewell: "Merci pour ce chemin parcouru. Je pars avec gratitude, et une grande confiance en vous."
    },
    delivery: [
      "Marquez une pause de deux secondes après votre question ou votre phrase d'ouverture.",
      "Ralentissez et baissez la voix pour l'histoire ou l'exemple.",
      "Énoncez chaque message clé séparément, suivi d'une courte pause.",
      "Levez les yeux et regardez le public pour l'appel à l'action et la dernière phrase."
    ],
    notes: "Brouillon modèle : remplacez les parties [entre crochets] par vos exemples et des faits vérifiés, ou connectez le Coach IA pour un discours complet et sur mesure."
  }
};

const fill = (s, v) => s.replace(/\{(\w+)\}/g, (_, k) => v[k] || "");
const sentence = s => { const t = s.trim().replace(/[.!?]+$/, ""); return t ? t.charAt(0).toUpperCase() + t.slice(1) + "." : ""; };
const lower = s => s.trim().replace(/[.!?]+$/, "").replace(/^./, c => c.toLowerCase());

export function buildDraft(b) {
  const lang = b.language === "fr" ? "fr" : "en";
  const T = TPL[lang];
  const v = { topic: lower(b.topic), cta: lower(b.cta) };
  const out = [];
  const acks = b.acks.split(/\n|;/).map(s => s.trim()).filter(Boolean);
  out.push(acks.length ? acks.join(", ") + "," : T.greet[b.audience]);
  out.push(fill(T.hook[b.structure], v));
  out.push(fill(T.purpose[b.goal], v));
  const msgs = b.messages.map(m => m.trim()).filter(Boolean);
  if (!msgs.length) out.push(T.noMessages);
  else if (msgs.length === 1) out.push(T.single + " " + sentence(msgs[0]).replace(/^./, c => c.toLowerCase()) + " " + T.elaborate);
  else msgs.forEach((m, i) => out.push(T.ord[i] + " " + sentence(m).replace(/^./, c => c.toLowerCase()) + " " + T.elaborate));
  if (b.story.trim()) out.push(T.storyIntro + " " + sentence(b.story));
  if (b.facts.trim()) out.push(T.factsIntro + " " + sentence(b.facts));
  const q = b.quote && QUOTES[GOAL_QUOTE[b.goal]];
  if (q) out.push(T.quoteIntro(q.by) + " “" + (lang === "fr" && q.fr ? q.fr : q.text) + "”");
  out.push(b.cta.trim() ? fill(T.cta, v) : T.ctaGeneric);
  out.push(T.close[b.goal]);
  const title = b.title.trim() || sentence(b.topic).replace(/\.$/, "");
  return {
    title, key: msgs[0] ? sentence(msgs[0]) : fill(T.purpose[b.goal], v),
    speech: out.join("\n\n"), delivery: T.delivery, notes: [T.notes], complete: true, template: true
  };
}
