// Language modules that have a video library, a word bank and practice games:
// "Polish Your English" (eng) and "Polish Your French" (fra). The screens
// (VideoLibrary, WordBank, LanguagePractice) read everything module-specific
// from here. Data files load on demand. Text is [English, French].
import { THEMES, PLAN } from "./englishLibrary.js";
import { FR_THEMES, FR_PLAN } from "./frenchLibrary.js";
import { FR_CHANNELS } from "./frenchSources.js";

export const PACKS = {
  eng: {
    target: "en",
    themes: THEMES, plan: PLAN, channels: null,
    videos: () => import("./englishVideos.js"),
    bank: () => import("./guides/wordbank.js"),
    spot: () => import("./guides/englishQuiz.js"),
    libSub: ["{n} videos from Accurate English (YouTube), grouped by theme. Mark videos as watched to track your progress.", "{n} vidéos d'Accurate English (YouTube), classées par thème. Cochez les vidéos regardées pour suivre votre progression."],
    bankSub: ["Words and expressions for professional English, grouped by theme. Pronunciation hints follow American English, as in the videos; stress is in capitals.", "Des mots et expressions pour l'anglais professionnel, classés par thème. Les indications de prononciation suivent l'anglais américain, comme les vidéos ; l'accent tonique est en majuscules."],
    leftOut: ["Not included: videos from other channels saved in the channel's playlists, and partisan politics.", "Non incluses : les vidéos d'autres chaînes enregistrées dans les playlists, et la politique partisane."]
  },
  fra: {
    target: "fr",
    themes: FR_THEMES, plan: FR_PLAN, channels: FR_CHANNELS,
    videos: () => import("./frenchVideos.js"),
    bank: () => import("./guides/wordbank-fr.js"),
    spot: () => import("./guides/frenchQuiz.js"),
    libSub: ["{n} videos from seven advanced-level French channels (Français avec Pierre, Comme une Française, Français Authentique, Nathalie FLE, innerFrench, Easy French, Wandering French), grouped by theme. Mark videos as watched to track your progress.", "{n} vidéos de sept chaînes de français de niveau avancé (Français avec Pierre, Comme une Française, Français Authentique, Nathalie FLE, innerFrench, Easy French, Wandering French), classées par thème. Cochez les vidéos regardées pour suivre votre progression."],
    bankSub: ["Advanced French for work: false friends, connectors, formal register, emails, meetings and facilitation, advanced words, expressions, proverbs and quotations. Pronunciation is given in the International Phonetic Alphabet.", "Le français avancé au travail : faux amis, connecteurs, registre soutenu, courriels, réunions et facilitation, mots avancés, expressions, proverbes et citations. La prononciation est donnée en alphabet phonétique international."],
    leftOut: ["Not included: videos from other channels saved in the playlists, and partisan politics.", "Non incluses : les vidéos d'autres chaînes enregistrées dans les playlists, et la politique partisane."]
  }
};
