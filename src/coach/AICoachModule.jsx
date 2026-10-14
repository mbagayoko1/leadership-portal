import React, { useState, useEffect, useRef, useContext } from "react";
import { createPortal } from "react-dom";
import { aiComplete, aiStream, aiErrorKind } from "./aiClient.js";
import { storeGet, storeSet, storeDelete, storeListKeys } from "../storage.js";
import { COMPANION_INSTR, PORTAL_RULES, LIVE_LINK_RULE, stripNav, navTargets, speechMeta, speechNote, deliverySummary } from "./companion.js";

/*
  AI Coach module (bilingual English / French)
  UNFPA WCARO Leadership and Communication Development Portal, Cohort 1 2026

  Drop-in usage inside the portal (e.g. as a new tab):
    <AICoachModule currentUser={currentUser} modules={CURRICULUM} language="fr" />

  currentUser: { username, name, role }   role: participant | mentor | admin | observer
  modules:     optional array of 12 module titles, either plain strings or
               { en: "...", fr: "..." } objects (defaults below)
  language:    optional starting language, "en" or "fr". The user can switch
               at any time with the EN / FR toggle; the choice is remembered.
  onLanguageChange: optional. When given, the host owns the language: the
               module follows `language`, hides its own EN / FR toggle and
               reports switches through this callback.
  embedded:    optional. Drops the outer padding and background so the module
               sits inside a host page.
  portalMap:   optional text describing the host portal's content and the
               participant's progress, with link targets in [square brackets].
               Added to coaching prompts (see companion.js).
  onNavigate / navLabel: optional. navLabel(target) returns a button label,
               or null for an unknown target; onNavigate(target) opens it.
  aiReady / onConnect: optional. aiReady=false means no AI connection is set
               up yet; onConnect(kind) asks the host to show its connection
               form (kind "auth" means the current key was rejected).

  Voice conversation (Web Speech API, no extra services)
    The "Voice" switch in the header turns on hands-free conversation: replies
    are read aloud, then the microphone listens and sends your words when you
    pause. The Speak button also works for plain dictation when voice is off.
    Listening works in Chrome and Edge (desktop, Android) and Safari (iOS, Mac);
    reading aloud works in all modern browsers. Needs microphone permission.

  Live call
    "Start live call" (Coach tab) and "Live call" (in a session or practice
    scene) open a full-screen voice call: always-on microphone, automatic
    turn-taking on pauses, streamed replies spoken sentence by sentence, and
    interruption by voice or by tapping the circle. The transcript is saved
    into the session or scene, so Wrap up and practice feedback still work.

  Storage
    coach:<username>      private (shared=false): conversations, practice, goals, check-ins, language
    coachplan:<username>  shared (shared=true), only when the participant opts in:
                          goals, progress and practice scores for the mentor view.

  Code conventions (same as the portal): ASCII-only source (French accents are
  written as \u escapes inside JS strings), JSX assigned to a const before
  return, function() callbacks in .map, no IIFEs, all components at top level.
*/

/* Portal design tokens (see tailwind.config.js): ink navy, steel blue,
   UNFPA orange, warm paper greys, verdigris. */
const C = {
  orange: "#E85D1F",
  orangeSoft: "#FDF3EC",
  blue: "#2F5077",
  blueSoft: "#F0F5F9",
  dark: "#1E2A44",
  ink: "#2E2A24",
  muted: "#7C766A",
  line: "#E5E1D8",
  bg: "#FAF9F7",
  card: "#FFFFFF",
  green: "#2E8B6E",
  greenSoft: "#EEF7F2",
  red: "#C2453A"
};

const FONT_D = "Newsreader, Georgia, serif";
const FONT_H = "'Public Sans', system-ui, sans-serif";
const FONT_B = "'Public Sans', system-ui, -apple-system, 'Segoe UI', sans-serif";

const INPUT = {
  fontFamily: FONT_B,
  fontSize: 14,
  padding: "9px 12px",
  border: "1px solid " + C.line,
  borderRadius: 8,
  outline: "none",
  width: "100%",
  color: C.ink,
  background: "#fff"
};

/* ---------------- interface text ---------------- */

const T = {
  en: {
    title: "AI Coach",
    hello: function (n) { return "Hello " + n + ". Think things through with a coach, rehearse the conversations that matter, and track how you are growing."; },
    footer: "AI coaching supports, and does not replace, your sessions with your mentor. Avoid entering confidential programme data or personal information about colleagues.",
    language: "Language",
    tabCoach: "Coach",
    tabPractice: "Practice studio",
    tabPlan: "Growth plan",
    tabProgress: "Progress",
    tabMentor: "Mentor view",
    loading: "Loading your coaching space...",
    saving: "Saving...",
    saved: "All changes saved",
    notSaved: "Changes not saved",
    send: "Send",
    enterHint: "Enter to send, Shift+Enter for a new line.",
    yourMessage: "Your message",
    waiting: "Waiting for a reply",
    liveCall: "Live call",
    startLiveCall: "Start live call",
    liveInProgress: "Live call in progress. The conversation appears here when you end the call.",
    liveTip1: "Talk naturally. The coach answers when you pause.",
    liveTip2: "Cut in at any time by speaking, or tap the circle.",
    liveTip3: "Headphones work best, so the coach does not hear itself.",
    startCall: "Start call",
    cancel: "Cancel",
    phaseListening: "Listening",
    phaseHeard: "Listening. Pause when you are done",
    phaseThinking: "Thinking...",
    phaseSpeaking: "Speaking. Talk or tap to interrupt",
    phaseSpeakingTap: "Speaking. Tap to interrupt",
    phaseMuted: "Microphone muted",
    mute: "Mute",
    unmute: "Unmute",
    endCall: "End call",
    captionsOn: "Captions on",
    captionsOff: "Captions off",
    bargeOn: "Voice interrupt on",
    bargeOff: "Voice interrupt off",
    bargeHint: "If the coach keeps stopping itself, use headphones or turn voice interrupt off and tap to interrupt.",
    you: "You",
    liveUnsupported: "Live calls need a browser that can listen, such as Chrome, Edge or Safari.",
    liveError: "The coach could not answer. Try again, keep talking, or end the call.",
    err_not_connected: "The AI Coach is not connected yet. Paste your Anthropic API key at the top of this tab, then try again.",
    err_auth: "Your API key was not accepted. It may have been deleted or mistyped. Connect a new key, then try again.",
    err_billing: "Your Anthropic account has run out of credit. Add credit in the Anthropic Console, then try again.",
    err_busy: "Claude is busy right now. Wait a few seconds, then try again.",
    err_network: "Claude could not be reached. Check your internet connection, then try again.",
    err_refusal: "The coach could not respond to that. Try rephrasing it.",
    tryAgain: "Try again",
    connectAi: "Connect the AI Coach",
    orbLabel: "Tap to interrupt or to send what you said",
    keysHint: "Space: interrupt or send. Esc: end call.",
    voiceOn: "Voice on",
    voiceOff: "Voice off",
    voiceLabel: "Voice conversation",
    voiceUnsupported: "Voice is not available in this browser. Use Chrome or Edge on a computer or Android, or Safari on iPhone and Mac.",
    micStart: "Speak",
    micStop: "Stop",
    listening: "Listening. Speak naturally; your message is sent when you pause.",
    dictating: "Listening. Your words appear in the box; select Send when ready.",
    speakingNow: "Speaking...",
    stopVoice: "Stop",
    tapToTalk: "Voice conversation is on. Select Speak and talk; replies are read aloud.",
    ttsOnly: "Replies are read aloud, but this browser cannot listen. Type your messages.",
    listen: "Listen",
    speechStat: function (s) {
      const f = Object.keys(s.fillers).reduce(function (n, k) { return n + s.fillers[k]; }, 0);
      return "Spoken: " + s.words + " words" + (s.secs >= 4 ? ", about " + Math.round(s.words / s.secs * 60) + " words/min" : "") + ", " + f + " possible filler" + (f === 1 ? "" : "s");
    },
    listenFeedback: "Listen to feedback",
    stopListening: "Stop reading",
    voiceDenied: "Microphone access is blocked. Allow the microphone for this page in your browser settings, then select Speak again.",
    voiceError: "Voice input stopped. Select Speak to try again.",

    newSession: "New session",
    yourSessions: "Your sessions",
    noSessions: "Your coaching conversations will appear here.",
    startTitle: "Start a coaching session",
    startSub: "Choose what you need today. Your conversations are private to you and are not shared with your mentor.",
    moduleFocus: "Curriculum module in focus",
    startSession: "Start session",
    sessionTitle: function (m) { return m + " session"; },
    sessionOn: function (m, mod) { return m + " session on " + mod; },
    wrapUp: "Wrap up",
    summarising: "Summarising...",
    wrapHint: "Available after two of your messages",
    del: "Delete",
    replyPh: "Type your reply to the coach",
    coachLabel: "Coach",
    takeaways: "Session takeaways",
    nextSteps: "Next steps",
    addToPlan: "Add to my growth plan",
    addedToPlan: "Added to your plan",
    errCoach: "The coach did not respond. Check your connection and send again.",
    errWrap: "The summary could not be created. Try Wrap up again.",

    practiceTitle: "Practise a real conversation",
    practiceSub: "Pick a scenario. The AI plays the other person; when you finish, you get scored feedback on clarity, structure, audience focus, presence and concision.",
    customTitle: "Your own scenario",
    customDesc: "Rehearse a real conversation you have coming up.",
    phTitle: "Title, e.g. Presenting the annual report to the steering committee",
    phWho: "Who will you speak with? e.g. a sceptical steering committee chair",
    phSituation: "The situation, in two or three sentences",
    phAim: "What do you want to achieve?",
    startScene: "Start scene",
    customDefault: "Custom scenario",
    customSkill: "Communication",
    recentPractice: "Recent practice",
    noPractice: "Your scores will appear here after your first scene.",
    endFeedback: "End and get feedback",
    assessing: "Assessing...",
    linesHint: "Available after two of your lines",
    leaveScene: "Leave scene",
    sceneEnded: "Scene ended",
    linePh: "Say your line as you would in real life",
    errStart: "The scene could not start. Go back and try again.",
    errReply: "No reply came back. Send your line again.",
    errFeedback: "Feedback could not be generated. Try End and get feedback again.",
    outOf10: "out of 10",
    worked: "What worked",
    workOn: "To work on",
    stronger: "A stronger way to say it",
    youSaid: "You said: ",
    tryIt: "Try: ",
    nextDrill: "Next drill: ",
    retry: "Try this scenario again",
    another: "Choose another scenario",

    shareTitle: "Share my plan with my mentor",
    shareSub: "Your mentor sees your goals, progress and practice scores. Coaching conversations and reflections stay private.",
    shared: "Shared",
    notShared: "Not shared",
    addGoalTitle: "Add a goal",
    addGoalSub: "Phrase it as an outcome you can observe, e.g. Chair regional coordination meetings that end with clear decisions.",
    goalPh: "Goal",
    category: "Category",
    targetDate: "Target date",
    addGoalBtn: "Add goal",
    suggestTitle: "Suggest goals from my activity",
    suggestSub: "The coach reads your session takeaways and practice feedback and proposes three goals with action steps.",
    suggestBtn: "Suggest goals",
    thinking: "Thinking...",
    errSuggest: "Suggestions could not be generated. Try again.",
    addToPlanSmall: "Add to plan",
    planTitle: "My growth plan",
    goalsDone: function (d, n) { return d + " of " + n + " goals completed"; },
    noGoals: "No goals yet. Add one above, or wrap up a coaching session and add its takeaways.",
    remove: "Remove",
    progress: "Progress",
    setProgress: "Set progress",
    target: function (d) { return ", target " + d; },
    completed: ", completed",
    addAction: "Add an action step",
    add: "Add",
    markDone: "Mark done: ",
    removeAction: "Remove action",

    statSessions: "Coaching sessions",
    statPractice: "Practice scenes",
    statGoals: "Goals completed",
    statAvg: "Average practice score",
    skillTitle: "Communication skill profile",
    skillSub: function (n) { return "Average across " + n + " practice scenes, out of 10."; },
    skillEmpty: "Complete a practice scene to see your profile.",
    trend: function (n) { return "Last " + n + " scenes, oldest to newest"; },
    noteTitle: "Progress note from your coach",
    noteSub: "A short reading of your goals, scores and check-ins.",
    written: function (d) { return "Written " + d; },
    writing: "Writing...",
    updateNote: "Update progress note",
    writeNote: "Write my progress note",
    errNote: "The progress note could not be written. Try again.",
    checkinTitle: "Weekly check-in",
    checkinSub: "Two minutes to notice what is changing. Private to you.",
    wentWellPh: "What went well this week?",
    challengePh: "What was hard, or what would you do differently?",
    confidenceQ: "How confident do you feel as a leader and communicator this week?",
    confidenceGroup: "Confidence from 1 to 5",
    saveCheckin: "Save check-in",
    pastCheckins: "Past check-ins",
    noCheckins: "Your check-ins will appear here.",
    confidence: function (n) { return "Confidence " + n + "/5"; },
    wentWell: "Went well: ",
    hard: "Hard: ",

    mentorTitle: "Participants who shared their plan",
    mentorSub: "Goals, progress and practice scores only. Conversations and reflections remain private.",
    refresh: "Refresh",
    loadingShort: "Loading...",
    errMentor: "Shared plans could not be loaded. Select Refresh to try again.",
    noShared: "No participant has shared a plan yet. Participants can turn on sharing in their Growth plan tab.",
    updated: function (d) { return "Updated " + d; },
    nSessions: function (n) { return n + " coaching sessions"; },
    nScenes: function (n) { return n + " practice scenes"; },
    goals: "Goals",
    participant: "Participant",
    noGoalsShort: "No goals yet.",
    practiceAvg: function (v) { return "Practice average " + v + "/10"; }
  },

  fr: {
    title: "Coach IA",
    hello: function (n) { return "Bonjour " + n + ". R\u00e9fl\u00e9chissez avec un coach, r\u00e9p\u00e9tez les conversations qui comptent et suivez votre progression."; },
    footer: "Le coaching IA compl\u00e8te vos s\u00e9ances avec votre mentor, sans les remplacer. \u00c9vitez de saisir des donn\u00e9es confidentielles du programme ou des informations personnelles sur vos coll\u00e8gues.",
    language: "Langue",
    tabCoach: "Coaching",
    tabPractice: "Studio de pratique",
    tabPlan: "Plan de d\u00e9veloppement",
    tabProgress: "Progression",
    tabMentor: "Vue mentor",
    loading: "Chargement de votre espace de coaching...",
    saving: "Enregistrement...",
    saved: "Modifications enregistr\u00e9es",
    notSaved: "Modifications non enregistr\u00e9es",
    send: "Envoyer",
    enterHint: "Entr\u00e9e pour envoyer, Maj+Entr\u00e9e pour aller \u00e0 la ligne.",
    yourMessage: "Votre message",
    waiting: "En attente de r\u00e9ponse",
    liveCall: "Appel en direct",
    startLiveCall: "D\u00e9marrer un appel en direct",
    liveInProgress: "Appel en direct en cours. La conversation s'affichera ici \u00e0 la fin de l'appel.",
    liveTip1: "Parlez naturellement. Le coach r\u00e9pond d\u00e8s que vous marquez une pause.",
    liveTip2: "Intervenez \u00e0 tout moment en parlant, ou touchez le cercle.",
    liveTip3: "Utilisez de pr\u00e9f\u00e9rence des \u00e9couteurs, pour que le coach ne s'entende pas lui-m\u00eame.",
    startCall: "D\u00e9marrer l'appel",
    cancel: "Annuler",
    phaseListening: "\u00c0 l'\u00e9coute",
    phaseHeard: "\u00c0 l'\u00e9coute. Marquez une pause quand vous avez termin\u00e9",
    phaseThinking: "R\u00e9flexion...",
    phaseSpeaking: "R\u00e9ponse en cours. Parlez ou touchez pour interrompre",
    phaseSpeakingTap: "R\u00e9ponse en cours. Touchez pour interrompre",
    phaseMuted: "Microphone coup\u00e9",
    mute: "Couper le micro",
    unmute: "R\u00e9activer le micro",
    endCall: "Raccrocher",
    captionsOn: "Sous-titres activ\u00e9s",
    captionsOff: "Sous-titres d\u00e9sactiv\u00e9s",
    bargeOn: "Interruption vocale activ\u00e9e",
    bargeOff: "Interruption vocale d\u00e9sactiv\u00e9e",
    bargeHint: "Si le coach s'interrompt tout seul, utilisez des \u00e9couteurs ou d\u00e9sactivez l'interruption vocale et touchez pour interrompre.",
    you: "Vous",
    liveUnsupported: "Les appels en direct n\u00e9cessitent un navigateur capable d'\u00e9couter, comme Chrome, Edge ou Safari.",
    liveError: "Le coach n'a pas pu r\u00e9pondre. R\u00e9essayez, continuez \u00e0 parler ou raccrochez.",
    err_not_connected: "Le Coach IA n'est pas encore connect\u00e9. Collez votre cl\u00e9 API Anthropic en haut de cet onglet, puis r\u00e9essayez.",
    err_auth: "Votre cl\u00e9 API n'a pas \u00e9t\u00e9 accept\u00e9e. Elle a peut-\u00eatre \u00e9t\u00e9 supprim\u00e9e ou mal saisie. Connectez une nouvelle cl\u00e9, puis r\u00e9essayez.",
    err_billing: "Votre compte Anthropic n'a plus de cr\u00e9dit. Ajoutez du cr\u00e9dit dans la console Anthropic, puis r\u00e9essayez.",
    err_busy: "Claude est tr\u00e8s sollicit\u00e9 en ce moment. Patientez quelques secondes, puis r\u00e9essayez.",
    err_network: "Impossible de joindre Claude. V\u00e9rifiez votre connexion Internet, puis r\u00e9essayez.",
    err_refusal: "Le coach n'a pas pu r\u00e9pondre \u00e0 cela. Essayez de le reformuler.",
    tryAgain: "R\u00e9essayer",
    connectAi: "Connecter le Coach IA",
    orbLabel: "Touchez pour interrompre ou pour envoyer ce que vous avez dit",
    keysHint: "Espace : interrompre ou envoyer. \u00c9chap : raccrocher.",
    voiceOn: "Voix activ\u00e9e",
    voiceOff: "Voix d\u00e9sactiv\u00e9e",
    voiceLabel: "Conversation vocale",
    voiceUnsupported: "La voix n'est pas disponible dans ce navigateur. Utilisez Chrome ou Edge sur ordinateur ou Android, ou Safari sur iPhone et Mac.",
    micStart: "Parler",
    micStop: "Arr\u00eater",
    listening: "\u00c0 l'\u00e9coute. Parlez naturellement ; votre message est envoy\u00e9 d\u00e8s que vous marquez une pause.",
    dictating: "\u00c0 l'\u00e9coute. Vos paroles s'affichent dans la zone de texte ; cliquez sur Envoyer quand vous \u00eates pr\u00eat.",
    speakingNow: "Lecture en cours...",
    stopVoice: "Arr\u00eater",
    tapToTalk: "La conversation vocale est activ\u00e9e. Cliquez sur Parler et exprimez-vous ; les r\u00e9ponses sont lues \u00e0 voix haute.",
    ttsOnly: "Les r\u00e9ponses sont lues \u00e0 voix haute, mais ce navigateur ne peut pas vous \u00e9couter. Tapez vos messages.",
    listen: "\u00c9couter",
    speechStat: function (s) {
      const f = Object.keys(s.fillers).reduce(function (n, k) { return n + s.fillers[k]; }, 0);
      return "\u00c0 l'oral : " + s.words + " mots" + (s.secs >= 4 ? ", environ " + Math.round(s.words / s.secs * 60) + " mots/min" : "") + ", " + f + " tic" + (f > 1 ? "s" : "") + " de langage possible" + (f > 1 ? "s" : "");
    },
    listenFeedback: "\u00c9couter le retour",
    stopListening: "Arr\u00eater la lecture",
    voiceDenied: "L'acc\u00e8s au microphone est bloqu\u00e9. Autorisez le microphone pour cette page dans les param\u00e8tres du navigateur, puis cliquez de nouveau sur Parler.",
    voiceError: "La saisie vocale s'est arr\u00eat\u00e9e. Cliquez sur Parler pour r\u00e9essayer.",

    newSession: "Nouvelle s\u00e9ance",
    yourSessions: "Vos s\u00e9ances",
    noSessions: "Vos conversations de coaching appara\u00eetront ici.",
    startTitle: "Commencer une s\u00e9ance de coaching",
    startSub: "Choisissez ce dont vous avez besoin aujourd'hui. Vos conversations sont priv\u00e9es et ne sont pas partag\u00e9es avec votre mentor.",
    moduleFocus: "Module du programme concern\u00e9",
    startSession: "Commencer la s\u00e9ance",
    sessionTitle: function (m) { return "S\u00e9ance : " + m; },
    sessionOn: function (m, mod) { return m + ", " + mod; },
    wrapUp: "Conclure",
    summarising: "Synth\u00e8se en cours...",
    wrapHint: "Disponible apr\u00e8s deux de vos messages",
    del: "Supprimer",
    replyPh: "\u00c9crivez votre r\u00e9ponse au coach",
    coachLabel: "Coach",
    takeaways: "\u00c0 retenir de la s\u00e9ance",
    nextSteps: "Prochaines \u00e9tapes",
    addToPlan: "Ajouter \u00e0 mon plan de d\u00e9veloppement",
    addedToPlan: "Ajout\u00e9 \u00e0 votre plan",
    errCoach: "Le coach n'a pas r\u00e9pondu. V\u00e9rifiez votre connexion et renvoyez votre message.",
    errWrap: "La synth\u00e8se n'a pas pu \u00eatre cr\u00e9\u00e9e. Cliquez de nouveau sur Conclure.",

    practiceTitle: "Entra\u00eenez-vous \u00e0 une vraie conversation",
    practiceSub: "Choisissez un sc\u00e9nario. L'IA joue votre interlocuteur ; \u00e0 la fin, vous recevez un retour not\u00e9 sur la clart\u00e9, la structure, l'adaptation au public, la pr\u00e9sence et la concision.",
    customTitle: "Votre propre sc\u00e9nario",
    customDesc: "R\u00e9p\u00e9tez une vraie conversation \u00e0 venir.",
    phTitle: "Titre, ex. Pr\u00e9senter le rapport annuel au comit\u00e9 de pilotage",
    phWho: "Avec qui allez-vous parler ? ex. un pr\u00e9sident de comit\u00e9 de pilotage sceptique",
    phSituation: "La situation, en deux ou trois phrases",
    phAim: "Que voulez-vous obtenir ?",
    startScene: "Commencer la sc\u00e8ne",
    customDefault: "Sc\u00e9nario personnalis\u00e9",
    customSkill: "Communication",
    recentPractice: "Pratique r\u00e9cente",
    noPractice: "Vos scores appara\u00eetront ici apr\u00e8s votre premi\u00e8re sc\u00e8ne.",
    endFeedback: "Terminer et obtenir un retour",
    assessing: "\u00c9valuation...",
    linesHint: "Disponible apr\u00e8s deux de vos r\u00e9pliques",
    leaveScene: "Quitter la sc\u00e8ne",
    sceneEnded: "Sc\u00e8ne termin\u00e9e",
    linePh: "Dites votre r\u00e9plique comme en situation r\u00e9elle",
    errStart: "La sc\u00e8ne n'a pas pu d\u00e9marrer. Revenez en arri\u00e8re et r\u00e9essayez.",
    errReply: "Aucune r\u00e9ponse re\u00e7ue. Renvoyez votre r\u00e9plique.",
    errFeedback: "Le retour n'a pas pu \u00eatre g\u00e9n\u00e9r\u00e9. Cliquez de nouveau sur Terminer et obtenir un retour.",
    outOf10: "sur 10",
    worked: "Ce qui a fonctionn\u00e9",
    workOn: "\u00c0 travailler",
    stronger: "Une formulation plus percutante",
    youSaid: "Vous avez dit : ",
    tryIt: "Essayez : ",
    nextDrill: "Prochain exercice : ",
    retry: "Refaire ce sc\u00e9nario",
    another: "Choisir un autre sc\u00e9nario",

    shareTitle: "Partager mon plan avec mon mentor",
    shareSub: "Votre mentor voit vos objectifs, votre progression et vos scores de pratique. Les conversations de coaching et vos r\u00e9flexions restent priv\u00e9es.",
    shared: "Partag\u00e9",
    notShared: "Non partag\u00e9",
    addGoalTitle: "Ajouter un objectif",
    addGoalSub: "Formulez-le comme un r\u00e9sultat observable, ex. Pr\u00e9sider des r\u00e9unions de coordination r\u00e9gionale qui aboutissent \u00e0 des d\u00e9cisions claires.",
    goalPh: "Objectif",
    category: "Cat\u00e9gorie",
    targetDate: "Date cible",
    addGoalBtn: "Ajouter l'objectif",
    suggestTitle: "Proposer des objectifs \u00e0 partir de mon activit\u00e9",
    suggestSub: "Le coach analyse les enseignements de vos s\u00e9ances et les retours de pratique, puis propose trois objectifs avec des actions.",
    suggestBtn: "Proposer des objectifs",
    thinking: "R\u00e9flexion...",
    errSuggest: "Les propositions n'ont pas pu \u00eatre g\u00e9n\u00e9r\u00e9es. R\u00e9essayez.",
    addToPlanSmall: "Ajouter au plan",
    planTitle: "Mon plan de d\u00e9veloppement",
    goalsDone: function (d, n) { return d + " objectif(s) atteint(s) sur " + n; },
    noGoals: "Aucun objectif pour l'instant. Ajoutez-en un ci-dessus, ou concluez une s\u00e9ance de coaching et ajoutez ses enseignements.",
    remove: "Retirer",
    progress: "Progression",
    setProgress: "D\u00e9finir la progression",
    target: function (d) { return ", \u00e9ch\u00e9ance " + d; },
    completed: ", atteint",
    addAction: "Ajouter une action",
    add: "Ajouter",
    markDone: "Marquer comme fait : ",
    removeAction: "Retirer l'action",

    statSessions: "S\u00e9ances de coaching",
    statPractice: "Sc\u00e8nes de pratique",
    statGoals: "Objectifs atteints",
    statAvg: "Score moyen de pratique",
    skillTitle: "Profil de comp\u00e9tences en communication",
    skillSub: function (n) { return "Moyenne sur " + n + " sc\u00e8nes de pratique, sur 10."; },
    skillEmpty: "Terminez une sc\u00e8ne de pratique pour voir votre profil.",
    trend: function (n) { return n + " derni\u00e8res sc\u00e8nes, de la plus ancienne \u00e0 la plus r\u00e9cente"; },
    noteTitle: "Note de progression de votre coach",
    noteSub: "Une br\u00e8ve lecture de vos objectifs, scores et bilans.",
    written: function (d) { return "R\u00e9dig\u00e9e le " + d; },
    writing: "R\u00e9daction...",
    updateNote: "Mettre \u00e0 jour la note",
    writeNote: "R\u00e9diger ma note de progression",
    errNote: "La note de progression n'a pas pu \u00eatre r\u00e9dig\u00e9e. R\u00e9essayez.",
    checkinTitle: "Bilan hebdomadaire",
    checkinSub: "Deux minutes pour remarquer ce qui \u00e9volue. Priv\u00e9.",
    wentWellPh: "Qu'est-ce qui s'est bien pass\u00e9 cette semaine ?",
    challengePh: "Qu'est-ce qui a \u00e9t\u00e9 difficile, ou que feriez-vous autrement ?",
    confidenceQ: "Quel est votre niveau de confiance en tant que leader et communicant cette semaine ?",
    confidenceGroup: "Confiance de 1 \u00e0 5",
    saveCheckin: "Enregistrer le bilan",
    pastCheckins: "Bilans pr\u00e9c\u00e9dents",
    noCheckins: "Vos bilans appara\u00eetront ici.",
    confidence: function (n) { return "Confiance " + n + "/5"; },
    wentWell: "R\u00e9ussi : ",
    hard: "Difficile : ",

    mentorTitle: "Participants ayant partag\u00e9 leur plan",
    mentorSub: "Objectifs, progression et scores de pratique uniquement. Les conversations et r\u00e9flexions restent priv\u00e9es.",
    refresh: "Actualiser",
    loadingShort: "Chargement...",
    errMentor: "Les plans partag\u00e9s n'ont pas pu \u00eatre charg\u00e9s. Cliquez sur Actualiser pour r\u00e9essayer.",
    noShared: "Aucun participant n'a encore partag\u00e9 son plan. Les participants peuvent activer le partage dans l'onglet Plan de d\u00e9veloppement.",
    updated: function (d) { return "Mis \u00e0 jour le " + d; },
    nSessions: function (n) { return n + " s\u00e9ances de coaching"; },
    nScenes: function (n) { return n + " sc\u00e8nes de pratique"; },
    goals: "Objectifs",
    participant: "Participant",
    noGoalsShort: "Aucun objectif pour l'instant.",
    practiceAvg: function (v) { return "Moyenne de pratique " + v + "/10"; }
  }
};

/* ---------------- bilingual content ---------------- */

const DEFAULT_MODULES = [
  { en: "Phase 1: Self-awareness and leadership identity", fr: "Phase 1 : Connaissance de soi et identit\u00e9 de leader" },
  { en: "Phase 1: Emotional intelligence", fr: "Phase 1 : Intelligence \u00e9motionnelle" },
  { en: "Phase 1: Values, purpose and personal brand", fr: "Phase 1 : Valeurs, raison d'\u00eatre et image personnelle" },
  { en: "Phase 2: Strategic thinking", fr: "Phase 2 : Pens\u00e9e strat\u00e9gique" },
  { en: "Phase 2: Influencing without authority", fr: "Phase 2 : Influencer sans autorit\u00e9 hi\u00e9rarchique" },
  { en: "Phase 2: Leading teams and delegation", fr: "Phase 2 : Diriger une \u00e9quipe et d\u00e9l\u00e9guer" },
  { en: "Phase 3: Executive presence", fr: "Phase 3 : Pr\u00e9sence ex\u00e9cutive" },
  { en: "Phase 3: Public speaking and vocal delivery", fr: "Phase 3 : Prise de parole en public et voix" },
  { en: "Phase 3: Written and diplomatic communication", fr: "Phase 3 : Communication \u00e9crite et diplomatique" },
  { en: "Phase 4: Negotiation and stakeholder engagement", fr: "Phase 4 : N\u00e9gociation et engagement des parties prenantes" },
  { en: "Phase 4: Coaching and developing others", fr: "Phase 4 : Coacher et faire grandir les autres" },
  { en: "Phase 4: Leading change", fr: "Phase 4 : Conduire le changement" }
];

const COACH_MODES = [
  {
    id: "companion",
    label: { en: "Leadership companion", fr: "Compagnon de leadership" },
    desc: {
      en: "Find your way through the portal, plan your next step, and get live feedback on your voice and vocabulary.",
      fr: "Orientez-vous dans le portail, préparez votre prochaine étape et recevez un retour en direct sur votre voix et votre vocabulaire."
    },
    greet: {
      en: "I know the programme modules, your progress and the resources in this portal. What are you working on this week? You can also say a key message out loud, and I will give you feedback on your delivery and wording.",
      fr: "Je connais les modules du programme, votre progression et les ressources de ce portail. Sur quoi travaillez-vous cette semaine ? Vous pouvez aussi prononcer un message clé à voix haute : je vous ferai un retour sur votre expression orale et votre vocabulaire."
    },
    instr: COMPANION_INSTR
  },
  {
    id: "reflect",
    label: { en: "Reflect", fr: "R\u00e9flexion" },
    desc: { en: "Work through a challenge you are facing, step by step.", fr: "Travaillez un d\u00e9fi pas \u00e0 pas." },
    greet: {
      en: "What would you like to think through today? It can be a challenge, a decision, or something you want to get better at.",
      fr: "Sur quoi aimeriez-vous r\u00e9fl\u00e9chir aujourd'hui ? Cela peut \u00eatre un d\u00e9fi, une d\u00e9cision ou une comp\u00e9tence \u00e0 renforcer."
    },
    instr: "Use the GROW model (Goal, Reality, Options, Way forward). Move through the stages naturally, one question at a time, without naming the stages. Close by helping the person commit to one concrete next step with a date."
  },
  {
    id: "prepare",
    label: { en: "Prepare", fr: "Pr\u00e9paration" },
    desc: { en: "Get ready for a meeting, presentation or difficult conversation.", fr: "Pr\u00e9parez une r\u00e9union, une pr\u00e9sentation ou une conversation difficile." },
    greet: {
      en: "What is coming up that you want to prepare for? Tell me who you will be speaking with and what you need from the conversation.",
      fr: "Qu'est-ce qui se pr\u00e9pare ? Dites-moi avec qui vous allez parler et ce que vous attendez de cet \u00e9change."
    },
    instr: "Help the person prepare for a specific upcoming interaction. Clarify the audience, the desired outcome, the key message in one sentence, likely objections and responses, and the opening line. Offer a short rehearsal where you play the other person if useful."
  },
  {
    id: "debrief",
    label: { en: "Debrief", fr: "D\u00e9briefing" },
    desc: { en: "Learn from something that just happened.", fr: "Tirez les le\u00e7ons de ce qui vient de se passer." },
    greet: {
      en: "What happened that you would like to look back on? Start with what you intended, then what actually happened.",
      fr: "Sur quel \u00e9v\u00e9nement souhaitez-vous revenir ? Commencez par ce que vous vouliez obtenir, puis ce qui s'est r\u00e9ellement pass\u00e9."
    },
    instr: "Run an after-action review: what was intended, what actually happened, why there was a difference, and what to keep or change. Help the person extract one transferable lesson."
  },
  {
    id: "learn",
    label: { en: "Apply a module", fr: "Appliquer un module" },
    desc: { en: "Connect the current curriculum module to your real work.", fr: "Reliez le module en cours \u00e0 votre travail r\u00e9el." },
    greet: {
      en: "Let us connect this module to your work. What part of it feels most relevant, or most difficult, for you right now?",
      fr: "Relions ce module \u00e0 votre travail. Quelle partie vous semble la plus pertinente, ou la plus difficile, en ce moment ?"
    },
    instr: "Help the person apply the selected curriculum module. Briefly explain one key idea from that topic when helpful, ask how it shows up in their current work, and design a small practice experiment for the coming week."
  }
];

const SCENARIOS = [
  {
    id: "rep-brief",
    title: { en: "Briefing the Representative", fr: "Briefer le Repr\u00e9sentant" },
    role: { en: "Country Representative", fr: "Repr\u00e9sentant pays" },
    skill: { en: "Concise upward briefing", fr: "Briefing concis \u00e0 la hi\u00e9rarchie" },
    setting: {
      en: "You must brief the Country Representative on a delayed programme deliverable and recommend a way forward. You have five minutes.",
      fr: "Vous devez informer le Repr\u00e9sentant pays du retard d'un livrable du programme et recommander une solution. Vous disposez de cinq minutes."
    },
    character: "You are a busy, sharp UNFPA Country Representative with five minutes between meetings. You interrupt if the briefing is unfocused, ask what decision is needed from you, and press for a clear recommendation and the main risk.",
    opener: {
      en: "I have five minutes before my call with the Minister. What do you have for me?",
      fr: "J'ai cinq minutes avant mon appel avec le Ministre. Qu'avez-vous pour moi ?"
    }
  },
  {
    id: "gov-pushback",
    title: { en: "Pushback from a ministry", fr: "R\u00e9ticences d'un minist\u00e8re" },
    role: { en: "Ministry Director", fr: "Directeur au minist\u00e8re" },
    skill: { en: "Influence and diplomacy", fr: "Influence et diplomatie" },
    setting: {
      en: "You need a Ministry of Health to agree to share subnational data on a regional platform. The Director is cautious about data sovereignty.",
      fr: "Vous devez obtenir d'un minist\u00e8re de la Sant\u00e9 qu'il partage des donn\u00e9es infranationales sur une plateforme r\u00e9gionale. Le Directeur est prudent quant \u00e0 la souverainet\u00e9 des donn\u00e9es."
    },
    character: "You are a senior, courteous but cautious Ministry Director in a West African country. You raise concerns about data sovereignty, political sensitivity and your team's workload. You become receptive only with respect for protocol, clear benefits for the country and concrete safeguards.",
    opener: {
      en: "Thank you for coming. I must be honest with you, my team has concerns about putting our data on a regional platform.",
      fr: "Merci d'\u00eatre venu. Je dois \u00eatre franc avec vous : mon \u00e9quipe a des r\u00e9serves sur la mise en ligne de nos donn\u00e9es sur une plateforme r\u00e9gionale."
    }
  },
  {
    id: "feedback",
    title: { en: "Giving difficult feedback", fr: "Donner un retour difficile" },
    role: { en: "Team consultant", fr: "Consultant de l'\u00e9quipe" },
    skill: { en: "Constructive feedback", fr: "Feedback constructif" },
    setting: {
      en: "A consultant on your team keeps submitting reports late and with data errors. You need to address it while keeping the relationship.",
      fr: "Un consultant de votre \u00e9quipe remet r\u00e9guli\u00e8rement ses rapports en retard et avec des erreurs de donn\u00e9es. Vous devez aborder le sujet tout en pr\u00e9servant la relation."
    },
    character: "You are a capable consultant who feels overloaded and is a little defensive. At first you give reasons and excuses. You respond well to specific, respectful feedback and a clear plan, and poorly to vague criticism.",
    opener: {
      en: "You wanted to see me? Is this about the report?",
      fr: "Vous vouliez me voir ? C'est \u00e0 propos du rapport ?"
    }
  },
  {
    id: "donor-pitch",
    title: { en: "Two minutes with a donor", fr: "Deux minutes avec un bailleur" },
    role: { en: "Donor programme officer", fr: "Charg\u00e9 de programme du bailleur" },
    skill: { en: "Pitching and storytelling", fr: "Pitch et storytelling" },
    setting: {
      en: "At a reception you meet a programme officer from a bilateral donor. You have about two minutes to spark interest in your programme.",
      fr: "Lors d'une r\u00e9ception, vous rencontrez le charg\u00e9 de programme d'un bailleur bilat\u00e9ral. Vous avez environ deux minutes pour susciter son int\u00e9r\u00eat pour votre programme."
    },
    character: "You are a friendly but time-constrained donor programme officer. You care about results, value for money and visibility. Ask one probing question about evidence of impact, and lose interest if the answer is full of jargon.",
    opener: {
      en: "Nice to meet you. So what are you working on at UNFPA these days?",
      fr: "Enchant\u00e9. Alors, sur quoi travaillez-vous \u00e0 l'UNFPA en ce moment ?"
    }
  },
  {
    id: "panel-q",
    title: { en: "A hard question on a panel", fr: "Une question difficile en panel" },
    role: { en: "Panel moderator", fr: "Mod\u00e9rateur du panel" },
    skill: { en: "Composure under pressure", fr: "Sang-froid sous pression" },
    setting: {
      en: "You are a panellist at a regional forum on the demographic dividend. The moderator asks a challenging question in front of an audience.",
      fr: "Vous \u00eates pan\u00e9liste lors d'un forum r\u00e9gional sur le dividende d\u00e9mographique. Le mod\u00e9rateur vous pose une question difficile devant le public."
    },
    character: "You are an incisive panel moderator. Ask pointed follow-up questions when answers are vague or too long, and occasionally relay a sceptical question from the audience.",
    opener: {
      en: "Critics say demographic dividend work has produced more reports than results in the Sahel. How do you respond?",
      fr: "Certains estiment que le travail sur le dividende d\u00e9mographique a produit plus de rapports que de r\u00e9sultats au Sahel. Que leur r\u00e9pondez-vous ?"
    }
  },
  {
    id: "meeting-lead",
    title: { en: "Chairing a divided meeting", fr: "Pr\u00e9sider une r\u00e9union divis\u00e9e" },
    role: { en: "Aminata and Kofi", fr: "Aminata et Kofi" },
    skill: { en: "Facilitation and conflict", fr: "Facilitation et gestion des conflits" },
    setting: {
      en: "You chair a coordination meeting where two colleagues disagree about priorities for a joint work plan.",
      fr: "Vous pr\u00e9sidez une r\u00e9union de coordination o\u00f9 deux coll\u00e8gues sont en d\u00e9saccord sur les priorit\u00e9s d'un plan de travail conjoint."
    },
    character: "You play two colleagues. Aminata wants to prioritise data systems; Kofi wants to prioritise community programmes. Start each line with the speaker's name and a colon. They talk past each other unless the chair structures the discussion and finds common ground.",
    opener: {
      en: "Aminata: With respect, we cannot keep funding activities without the systems to measure them.\nKofi: And without communities there is nothing to measure.",
      fr: "Aminata : Sauf votre respect, nous ne pouvons pas continuer \u00e0 financer des activit\u00e9s sans les syst\u00e8mes pour les mesurer.\nKofi : Et sans les communaut\u00e9s, il n'y a rien \u00e0 mesurer."
    }
  }
];

const RUBRIC = [
  { id: "clarity", label: { en: "Clarity", fr: "Clart\u00e9" } },
  { id: "structure", label: { en: "Structure", fr: "Structure" } },
  { id: "audience", label: { en: "Audience focus", fr: "Adaptation au public" } },
  { id: "presence", label: { en: "Confidence and presence", fr: "Confiance et pr\u00e9sence" } },
  { id: "concision", label: { en: "Concision", fr: "Concision" } }
];

const CATEGORIES = [
  { id: "Leadership", label: { en: "Leadership", fr: "Leadership" } },
  { id: "Communication", label: { en: "Communication", fr: "Communication" } },
  { id: "Personal effectiveness", label: { en: "Personal effectiveness", fr: "Efficacit\u00e9 personnelle" } }
];

const EMPTY = { sessions: [], practice: [], goals: [], checkins: [], share: false, insight: null, lang: null, voice: false };

const CSS = `
.aic-root, .aic-root * { box-sizing: border-box; }
.aic-root button:focus-visible, .aic-root textarea:focus-visible, .aic-root input:focus-visible, .aic-root select:focus-visible { outline: 2px solid #2F5077; outline-offset: 2px; }
.aic-grid { display: grid; grid-template-columns: 250px minmax(0, 1fr); gap: 16px; align-items: start; }
.aic-two { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 16px; align-items: start; }
.aic-picks { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 10px; }
.aic-stats { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; }
.aic-pick { cursor: pointer; text-align: left; transition: border-color .15s, background .15s; }
.aic-pick:hover { border-color: #2F5077 !important; }
.aic-btn { transition: filter .15s; }
.aic-btn:hover:not(:disabled) { filter: brightness(0.94); }
.aic-typing span { display: inline-block; width: 7px; height: 7px; margin: 0 2px; background: #98A2B3; border-radius: 50%; animation: aicBlink 1.2s infinite both; }
.aic-typing span:nth-child(2) { animation-delay: .2s; }
.aic-typing span:nth-child(3) { animation-delay: .4s; }
@keyframes aicBlink { 0%, 80%, 100% { opacity: .25; } 40% { opacity: 1; } }
.aic-reveal { animation: aicReveal .35s ease-out; }
@keyframes aicReveal { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
@media (max-width: 820px) {
  .aic-grid, .aic-two { grid-template-columns: 1fr; }
  .aic-stats { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
.aic-live { display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: #23906A; animation: aicPulse 1.1s ease-in-out infinite; }
@keyframes aicPulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: .35; transform: scale(.7); } }
.aic-orb-listen { animation: aicBreath 2.2s ease-in-out infinite; }
.aic-orb-speak { animation: aicTalk .9s ease-in-out infinite; }
.aic-orb-think { position: absolute; inset: -10px; border-radius: 50%; border: 4px solid rgba(255,255,255,0.15); border-top-color: #E85D1F; animation: aicSpin 1s linear infinite; }
@keyframes aicBreath { 0%, 100% { box-shadow: 0 0 0 0 rgba(91,214,164,.5); } 50% { box-shadow: 0 0 0 26px rgba(91,214,164,0); } }
@keyframes aicTalk { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.06); } }
@keyframes aicSpin { to { transform: rotate(360deg); } }
.aic-live-overlay button:focus-visible { outline: 3px solid #E85D1F; outline-offset: 3px; }
@media (prefers-reduced-motion: reduce) {
  .aic-reveal, .aic-typing span, .aic-live, .aic-orb-listen, .aic-orb-speak, .aic-orb-think { animation: none; }
}
`;

/* ---------------- language helpers ---------------- */

const LangCtx = React.createContext("en");

/* Host portal integration: the map given to the model, and how to open a
   link target and label its button. All optional. */
const PortalCtx = React.createContext({ map: "", navigate: null, label: null, ready: true, connect: null });

function useLang() {
  return useContext(LangCtx);
}

function useT() {
  const lang = useLang();
  return function (key) {
    const args = Array.prototype.slice.call(arguments, 1);
    const table = T[lang] || T.en;
    const v = table[key] != null ? table[key] : T.en[key];
    if (typeof v === "function") { return v.apply(null, args); }
    return v != null ? v : key;
  };
}

function L(value, lang) {
  if (value == null) { return ""; }
  if (typeof value === "string") { return value; }
  return value[lang] || value.en || "";
}

function languageRule(lang) {
  return lang === "fr"
    ? "Write in French, using the standard international French of UN and West African professional settings. If the participant writes in English, follow their language."
    : "Write in English. If the participant writes in French, follow their language.";
}

function jsonLanguageRule(lang) {
  return lang === "fr"
    ? "Keep all JSON keys in English exactly as shown, and write every text value in French."
    : "Write every text value in English.";
}

/* ---------------- voice helpers (Web Speech API) ---------------- */

const VoiceCtx = React.createContext({ on: false, stt: false, tts: false });

function getRecognitionCtor() {
  if (typeof window === "undefined") { return null; }
  return window.SpeechRecognition || window.webkitSpeechRecognition || null;
}

function hasTTS() {
  return typeof window !== "undefined" && !!window.speechSynthesis && typeof window.SpeechSynthesisUtterance !== "undefined";
}

function stopSpeech() {
  if (hasTTS()) {
    try { window.speechSynthesis.cancel(); } catch (e) { /* ignore */ }
  }
}

function voicesFor(lang) {
  if (!hasTTS()) { return []; }
  const all = window.speechSynthesis.getVoices() || [];
  const pref = lang === "fr" ? "fr" : "en";
  const exact = lang === "fr" ? "fr-fr" : "en-gb";
  function score(v) {
    let sc = 0;
    const l = String(v.lang || "").toLowerCase().replace("_", "-");
    if (l === exact) { sc += 2; }
    if (/natural|neural|premium|enhanced|google/i.test(v.name || "")) { sc += 3; }
    if (v.localService) { sc += 1; }
    return sc;
  }
  return all
    .filter(function (v) { return String(v.lang || "").toLowerCase().indexOf(pref) === 0; })
    .sort(function (a, b) { return score(b) - score(a); });
}

function chunkText(text) {
  const parts = String(text).replace(/\s+/g, " ").trim().match(/[^.!?]+[.!?]*/g) || [];
  const out = [];
  let cur = "";
  parts.forEach(function (p) {
    const piece = p.trim();
    if (!piece) { return; }
    if (cur && (cur + " " + piece).length > 180) {
      out.push(cur);
      cur = piece;
    } else {
      cur = cur ? cur + " " + piece : piece;
    }
  });
  if (cur) { out.push(cur); }
  return out;
}

/* Reads text aloud in short chunks (avoids the Chrome cut-off on long
   utterances). With multi=true, lines like "Aminata: ..." get a distinct
   voice or pitch per speaker. Calls onDone once when finished or stopped. */
function speakText(text, lang, multi, onDone) {
  if (!hasTTS()) { if (onDone) { onDone(); } return; }
  stopSpeech();
  const voices = voicesFor(lang);
  const tag = lang === "fr" ? "fr-FR" : "en-GB";
  const speakers = {};
  const segs = [];
  stripNav(text).split(/\n+/).forEach(function (line) {
    let body = line.replace(/^\s*[-*]\s+/, "").replace(/[*_#`]/g, "").trim();
    if (!body) { return; }
    let idx = 0;
    if (multi) {
      const m = body.match(/^([A-Z][A-Za-z\u00C0-\u017F'-]{1,20})\s?:\s*(.+)$/);
      if (m) {
        if (speakers[m[1]] == null) { speakers[m[1]] = Object.keys(speakers).length; }
        idx = speakers[m[1]];
        body = m[2];
      }
    }
    chunkText(body).forEach(function (c) { segs.push({ text: c, idx: idx }); });
  });
  if (!segs.length) { if (onDone) { onDone(); } return; }
  let finished = false;
  function done() {
    if (finished) { return; }
    finished = true;
    if (onDone) { onDone(); }
  }
  segs.forEach(function (sg, i) {
    const u = new window.SpeechSynthesisUtterance(sg.text);
    u.lang = tag;
    if (voices.length) { u.voice = voices[sg.idx % voices.length]; }
    u.pitch = sg.idx === 0 ? 1 : (sg.idx % 2 === 1 ? 0.85 : 1.15);
    u.rate = 1;
    if (i === segs.length - 1) {
      u.onend = done;
      u.onerror = done;
    }
    window.speechSynthesis.speak(u);
  });
}

/* ---------------- general helpers ---------------- */

function uid() {
  return Math.random().toString(36).slice(2, 9) + Date.now().toString(36);
}

function safeKey(s) {
  return String(s || "guest").replace(/[^a-zA-Z0-9._-]/g, "_");
}

function fmtDate(iso, lang) {
  try {
    return new Date(iso).toLocaleDateString(lang === "fr" ? "fr-FR" : "en-GB", { day: "numeric", month: "short", year: "numeric" });
  } catch (e) {
    return iso;
  }
}

function findMode(id) {
  return COACH_MODES.find(function (m) { return m.id === id; }) || COACH_MODES[0];
}

function categoryLabel(id, lang) {
  const c = CATEGORIES.find(function (x) { return x.id === id; });
  return c ? L(c.label, lang) : id;
}

/* A failed AI request as shown to the person: what went wrong and which
   action fixes it. `fallback` is the message key for an unknown cause. */
function aiError(t, e, fallback) {
  const kind = aiErrorKind(e);
  return { kind: kind, text: kind === "other" ? t(fallback) : t("err_" + kind) };
}

function needsConnect(err) {
  return !!err && (err.kind === "not_connected" || err.kind === "auth");
}

function toApi(msgs, max) {
  let list = msgs.filter(function (m) { return !m.local; }).map(function (m) {
    return { role: m.role, content: m.content + (m.role === "user" ? speechNote(m.speech) : "") };
  });
  if (max && list.length > max) { list = list.slice(list.length - max); }
  while (list.length && list[0].role !== "user") { list = list.slice(1); }
  return list;
}

/* When hosted as a published claude.ai page, the page bootstrap sets
   window.__AIC = { sample, profiles } and the module asks Claude through the
   viewer's own account. Inside the portal (a claude.ai chat artifact) that
   object is absent and the direct API request below is used. */
function platform() {
  return typeof window !== "undefined" && window.__AIC ? window.__AIC : null;
}

async function callClaude(system, messages, opts) {
  const o = opts || {};
  const P = platform();
  if (P && P.sample) {
    const turns = [{ role: "user", content: "Standing instructions for this conversation (follow them; they are not part of the dialogue):\n\n" + system }].concat(messages);
    try {
      const res = await P.sample(turns, { modelTier: o.tier || "default", cache: false, signal: o.signal, onText: o.onText });
      return String((res && res.text) || "").trim();
    } catch (e) {
      if (e && e.code === "cancelled") {
        const ab = new Error("cancelled");
        ab.name = "AbortError";
        throw ab;
      }
      throw new Error((e && e.code) || "sample_error");
    }
  }
  return aiComplete(system, messages, o.signal);
}

function parseJSON(text) {
  const clean = text.replace(/```json|```/g, "").trim();
  const start = clean.indexOf("{");
  const end = clean.lastIndexOf("}");
  return JSON.parse(clean.slice(start, end + 1));
}

async function loadData(key, shared) {
  try {
    return await storeGet(key, shared);
  } catch (e) {
    return null;
  }
}

async function saveData(key, value, shared) {
  try {
    return await storeSet(key, value, shared);
  } catch (e) {
    return false;
  }
}

async function removeData(key, shared) {
  try { await storeDelete(key, shared); } catch (e) { /* ignore */ }
}

function goalProgress(g) {
  if (g.actions && g.actions.length) {
    const done = g.actions.filter(function (a) { return a.done; }).length;
    return Math.round((done / g.actions.length) * 100);
  }
  return g.progress || 0;
}

function skillAverages(practice) {
  const out = { overall: 0, count: 0 };
  RUBRIC.forEach(function (r) { out[r.id] = 0; });
  const valid = practice.filter(function (p) { return p.feedback && p.feedback.scores; });
  if (!valid.length) { return out; }
  valid.forEach(function (p) {
    out.overall += Number(p.feedback.overall) || 0;
    RUBRIC.forEach(function (r) { out[r.id] += Number(p.feedback.scores[r.id]) || 0; });
  });
  out.overall = Math.round((out.overall / valid.length) * 10) / 10;
  RUBRIC.forEach(function (r) { out[r.id] = Math.round((out[r.id] / valid.length) * 10) / 10; });
  out.count = valid.length;
  return out;
}

function trimForStorage(d) {
  return Object.assign({}, d, {
    sessions: d.sessions.slice(0, 30).map(function (s) {
      return Object.assign({}, s, { messages: s.messages.slice(-60) });
    }),
    practice: d.practice.slice(0, 60),
    checkins: d.checkins.slice(0, 60)
  });
}

function buildShared(user, d) {
  const last = d.checkins[0];
  return {
    name: platform() ? "" : user.name,
    username: user.username,
    updatedAt: new Date().toISOString(),
    goals: d.goals.map(function (g) {
      return { title: g.title, category: g.category, target: g.target, progress: goalProgress(g) };
    }),
    sessionCount: d.sessions.length,
    practiceCount: d.practice.length,
    skills: skillAverages(d.practice),
    lastCheckin: last ? { date: last.date, confidence: last.confidence } : null
  };
}

function resolveScenario(s, lang) {
  return {
    id: s.id,
    title: L(s.title, lang),
    role: L(s.role, lang),
    skill: L(s.skill, lang),
    setting: L(s.setting, lang),
    character: s.character,
    opener: s.opener ? L(s.opener, lang) : null
  };
}

/* ---------------- prompts ---------------- */

function coachSystem(user, modeId, moduleName, goals, lang, portal) {
  const m = findMode(modeId);
  const goalText = goals.length
    ? goals.slice(0, 6).map(function (g) { return "- " + g.title + " (" + goalProgress(g) + "% done)"; }).join("\n")
    : "None recorded yet.";
  return [
    "You are an experienced executive coach supporting a participant in the UNFPA West and Central Africa Regional Office (WCARO) Leadership and Communication Development Programme, Cohort 1 2026.",
    "Participant: " + user.name + ".",
    "Current curriculum focus: " + moduleName + ".",
    "Their development goals:\n" + goalText,
    "Session type: " + L(m.label, "en") + ". " + m.instr,
    "Language: " + languageRule(lang),
    "Style: warm, direct and concise, usually under 120 words. Ask one question at a time. Reflect back what you hear before moving on. Do not lecture or give long lists. Give advice only when asked or when it clearly helps, and keep it concrete and grounded in the UN and West and Central African working context: multilateral settings, government counterparts, protocol and hierarchy, multilingual teams, limited time.",
    "Use plain text only. No markdown headings or bold. Short lines starting with '- ' are fine when a list is truly needed.",
    "If the person shares confidential details about named colleagues, gently suggest keeping them general. If they express serious distress, respond with care and encourage them to talk to their mentor, a trusted colleague or the UN staff counsellor."
  ].concat(portal ? [PORTAL_RULES, portal] : []).join("\n\n");
}

function wrapSystem(lang) {
  return `You summarise leadership coaching sessions. Respond ONLY with valid JSON, no markdown, no other text, in exactly this shape:
{"title": "3 to 6 word session title", "summary": "2 to 3 sentences on what was explored", "insight": "the single most useful insight for the participant, in second person", "goal": "one development goal that follows from the session, phrased as an outcome", "actions": ["concrete next step", "concrete next step", "concrete next step"]}
` + jsonLanguageRule(lang);
}

function roleplaySystem(s, lang) {
  return [
    "You are playing a character in a communication practice simulation for a UNFPA WCARO staff member (the learner).",
    "Scenario: " + s.setting,
    "Your character: " + s.character,
    "Language: the whole scene takes place in " + (lang === "fr" ? "French" : "English") + ". Always speak in that language, even if the learner switches.",
    "Rules: Stay fully in character. Reply in 1 to 4 sentences, the way a real person would speak. React realistically: if the learner is clear, respectful and relevant, become more receptive; if they are vague, long-winded or dismissive, push back. Never coach or give feedback during the scene. Never say you are an AI. Plain text only."
  ].join("\n\n");
}

function feedbackSystem(lang) {
  return `You are an expert communication and leadership coach assessing a role-play by a UNFPA WCARO staff member (the learner). Assess only the learner's lines. Be specific, fair and encouraging, and refer to what they actually said. Scores are integers from 1 to 10. Respond ONLY with valid JSON, no markdown, no other text, in exactly this shape:
{"overall": 7, "headline": "one-sentence verdict", "scores": {"clarity": 7, "structure": 6, "audience": 7, "presence": 8, "concision": 6}, "strengths": ["specific strength", "specific strength"], "improvements": ["specific improvement", "specific improvement"], "rewrite": {"original": "a short line the learner actually said, quoted exactly", "better": "a stronger version of that line, in the same language as the scene"}, "nextDrill": "one specific exercise to practise next"}
If delivery data is included, the learner spoke their lines aloud: let pace and fillers inform the presence and concision scores, and make one improvement about delivery when the data shows a clear issue (target 140 to 160 words per minute, no fillers). If their wording is weak for the setting, use the rewrite to show stronger vocabulary.
` + jsonLanguageRule(lang);
}

function suggestSystem(lang) {
  return `You help UNFPA WCARO staff build a personal leadership and communication development plan. Respond ONLY with valid JSON, no markdown, no other text, in exactly this shape:
{"goals": [{"title": "goal phrased as an outcome", "category": "Leadership", "why": "one sentence linking it to the evidence", "actions": ["concrete action", "concrete action", "concrete action"]}]}
Suggest exactly 3 goals. The category value must be exactly one of these English words: Leadership, Communication, Personal effectiveness. Do not repeat goals the person already has.
` + jsonLanguageRule(lang) + " The category value stays in English.";
}

function insightSystem(lang) {
  return "You are a leadership coach writing a short progress note to a participant in the UNFPA WCARO Leadership and Communication Development Programme. Write 90 to 140 words of plain text in second person: what is improving, what deserves attention next, and one suggestion for the coming two weeks. Base it only on the data given. Be warm and specific. No headings, no lists. " + (lang === "fr" ? "Write in French, using the formal vous." : "Write in English.");
}

/* ---------------- UI primitives ---------------- */

function Btn(props) {
  const kind = props.kind || "primary";
  const kinds = {
    primary: { background: C.orange, color: "#fff", border: "1px solid " + C.orange },
    blue: { background: C.blue, color: "#fff", border: "1px solid " + C.blue },
    ghost: { background: "#fff", color: C.dark, border: "1px solid " + C.line },
    danger: { background: "#fff", color: C.red, border: "1px solid #F1C9C6" }
  };
  const base = {
    fontFamily: FONT_B,
    fontSize: props.small ? 13 : 14,
    fontWeight: 600,
    padding: props.small ? "5px 10px" : "9px 16px",
    borderRadius: 8,
    cursor: props.disabled ? "not-allowed" : "pointer",
    opacity: props.disabled ? 0.5 : 1,
    whiteSpace: "nowrap"
  };
  const el = (
    <button
      type="button"
      className="aic-btn"
      onClick={props.onClick}
      disabled={props.disabled}
      title={props.title}
      style={Object.assign({}, base, kinds[kind], props.style || {})}
    >
      {props.children}
    </button>
  );
  return el;
}

function Card(props) {
  const el = (
    <div
      className={props.className}
      style={Object.assign({ background: C.card, border: "1px solid " + C.line, borderRadius: 12, padding: 18 }, props.style || {})}
    >
      {props.children}
    </div>
  );
  return el;
}

function Heading(props) {
  const el = (
    <div style={{ marginBottom: 12 }}>
      <div style={{ fontFamily: FONT_H, fontWeight: 700, fontSize: 16, color: C.ink }}>{props.title}</div>
      {props.sub ? <div style={{ fontSize: 13, color: C.muted, marginTop: 3, lineHeight: 1.45 }}>{props.sub}</div> : null}
    </div>
  );
  return el;
}

function Bar(props) {
  const max = props.max || 100;
  const pct = Math.max(0, Math.min(100, Math.round(((Number(props.value) || 0) / max) * 100)));
  const el = (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 4, gap: 8 }}>
        <span style={{ color: C.ink }}>{props.label}</span>
        <span style={{ color: C.muted, fontWeight: 600 }}>{props.display != null ? props.display : props.value}</span>
      </div>
      <div style={{ height: 7, background: "#EDF0F3", borderRadius: 99, overflow: "hidden" }}>
        <div style={{ width: pct + "%", height: "100%", background: props.color || C.blue, borderRadius: 99, transition: "width .4s" }} />
      </div>
    </div>
  );
  return el;
}

function MicIcon(props) {
  const size = props.size || 18;
  const el = (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="9" y="2" width="6" height="12" rx="3" />
      <path d="M5 11a7 7 0 0 0 14 0" />
      <path d="M12 18v4" />
    </svg>
  );
  return el;
}

function SpeakerIcon(props) {
  const size = props.size || 14;
  const el = (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M11 5L6 9H2v6h4l5 4V5z" />
      <path d="M15.5 8.5a5 5 0 0 1 0 7" />
      <path d="M19 5a10 10 0 0 1 0 14" />
    </svg>
  );
  return el;
}

function Bubble(props) {
  const t = useT();
  const portal = useContext(PortalCtx);
  const mine = props.role === "user";
  const shown = mine ? props.text : stripNav(props.text);
  const targets = !mine && portal.navigate && portal.label
    ? navTargets(props.text).filter(function (tg) { return !!portal.label(tg); })
    : [];
  const sp = mine ? props.speech : null;
  const links = targets.length ? (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8, whiteSpace: "normal" }}>
      {targets.map(function (tg) {
        const b = (
          <button
            key={tg}
            type="button"
            onClick={function () { portal.navigate(tg); }}
            style={{ border: "1px solid " + C.orange, background: C.orangeSoft, color: C.dark, borderRadius: 99, padding: "4px 12px", fontFamily: FONT_B, fontSize: 12, fontWeight: 600, cursor: "pointer" }}
          >
            {portal.label(tg)} {"→"}
          </button>
        );
        return b;
      })}
    </div>
  ) : null;
  const el = (
    <div style={{ display: "flex", justifyContent: mine ? "flex-end" : "flex-start", marginBottom: 10 }}>
      <div
        style={{
          maxWidth: "84%",
          background: mine ? C.blue : C.bg,
          color: mine ? "#fff" : C.ink,
          border: mine ? "1px solid " + C.blue : "1px solid " + C.line,
          padding: "10px 14px",
          borderRadius: mine ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
          fontSize: 14,
          lineHeight: 1.55,
          whiteSpace: "pre-wrap",
          wordBreak: "break-word"
        }}
      >
        {props.label ? <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 3, opacity: 0.8 }}>{props.label}</div> : null}
        {shown}
        {links}
        {sp && sp.words ? <div style={{ fontSize: 11, opacity: 0.8, marginTop: 4 }}>{t("speechStat", sp)}</div> : null}
        {props.onListen ? (
          <div style={{ marginTop: 6 }}>
            <button
              type="button"
              onClick={props.onListen}
              style={{ display: "inline-flex", alignItems: "center", gap: 5, border: "none", background: "transparent", color: C.blue, fontFamily: FONT_B, fontSize: 12, fontWeight: 600, cursor: "pointer", padding: 0 }}
            >
              <SpeakerIcon />{t("listen")}
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
  return el;
}

function Typing() {
  const t = useT();
  const el = (
    <div style={{ display: "flex", marginBottom: 10 }}>
      <div className="aic-typing" style={{ background: C.bg, border: "1px solid " + C.line, padding: "12px 16px", borderRadius: 14 }} aria-label={t("waiting")}>
        <span></span><span></span><span></span>
      </div>
    </div>
  );
  return el;
}

/*
  ChatBox handles typing, dictation and hands-free voice conversation.
  Voice mode loop: new assistant message -> read aloud -> listen ->
  send automatically after a pause -> wait for reply -> read aloud ...
  Without voice mode, the microphone simply dictates into the text box.
*/
function ChatBox(props) {
  const t = useT();
  const lang = useLang();
  const voice = useContext(VoiceCtx);
  const portal = useContext(PortalCtx);
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [voiceErr, setVoiceErr] = useState("");
  const boxRef = useRef(null);
  const recRef = useRef(null);
  const silenceRef = useRef(null);
  const finalRef = useRef("");
  const autoSendRef = useRef(false);
  const speakTokenRef = useRef(0);
  const spokenRef = useRef(props.speakInitial ? 0 : props.messages.length);
  const listenRef = useRef(null);
  const speechRef = useRef({ start: 0, last: 0 });
  const live = useRef({});
  live.current = { input: input, props: props, voiceOn: voice.on, stt: voice.stt, tts: voice.tts, lang: lang };

  /* Delivery measurements for a message that was spoken rather than typed:
     the time between the first and last recognition results. */
  function takeSpeech(text) {
    const s = speechRef.current;
    speechRef.current = { start: 0, last: 0 };
    return s.start ? speechMeta(text, (s.last - s.start) / 1000) : null;
  }

  useEffect(function () {
    if (boxRef.current) { boxRef.current.scrollTop = boxRef.current.scrollHeight; }
  }, [props.messages.length, props.busy]);

  useEffect(function () {
    return function () {
      speakTokenRef.current += 1;
      clearTimeout(silenceRef.current);
      if (recRef.current) {
        autoSendRef.current = false;
        try { recRef.current.abort(); } catch (e) { /* ignore */ }
      }
      stopSpeech();
    };
  }, []);

  useEffect(function () {
    if (!voice.on) {
      speakTokenRef.current += 1;
      stopSpeech();
      setSpeaking(false);
    }
  }, [voice.on]);

  useEffect(function () {
    const msgs = props.messages;
    if (msgs.length > spokenRef.current) {
      const last = msgs[msgs.length - 1];
      spokenRef.current = msgs.length;
      if (last.role === "assistant" && live.current.voiceOn && live.current.tts) {
        speakMessage(last.content, true);
      }
    } else {
      spokenRef.current = msgs.length;
    }
  }, [props.messages.length]);

  function speakMessage(text, thenListen) {
    const token = speakTokenRef.current + 1;
    speakTokenRef.current = token;
    setSpeaking(true);
    speakText(text, live.current.lang, !!props.multiSpeaker, function () {
      if (speakTokenRef.current !== token) { return; }
      setSpeaking(false);
      const cur = live.current;
      if (thenListen && cur.voiceOn && cur.stt && !cur.props.disabled && !cur.props.busy && listenRef.current) {
        listenRef.current();
      }
    });
  }

  function stopSpeaking() {
    speakTokenRef.current += 1;
    stopSpeech();
    setSpeaking(false);
  }

  function armSilence(heard) {
    clearTimeout(silenceRef.current);
    if (!live.current.voiceOn) { return; }
    silenceRef.current = setTimeout(function () {
      autoSendRef.current = heard;
      if (recRef.current) {
        try { recRef.current.stop(); } catch (e) { /* ignore */ }
      }
    }, heard ? 1800 : 9000);
  }

  function startListening() {
    const Ctor = getRecognitionCtor();
    if (!Ctor) { setVoiceErr(t("voiceUnsupported")); return; }
    if (recRef.current) { return; }
    stopSpeaking();
    const rec = new Ctor();
    rec.lang = live.current.lang === "fr" ? "fr-FR" : "en-GB";
    rec.continuous = true;
    rec.interimResults = true;
    const base = live.current.input.trim();
    finalRef.current = base ? base + " " : "";
    autoSendRef.current = false;
    rec.onresult = function (e) {
      let interim = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const r = e.results[i];
        if (r.isFinal) {
          finalRef.current += r[0].transcript.trim() + " ";
        } else {
          interim += r[0].transcript;
        }
      }
      const now = Date.now();
      if (!speechRef.current.start) { speechRef.current.start = now; }
      speechRef.current.last = now;
      setInput((finalRef.current + interim).replace(/^\s+/, ""));
      armSilence(true);
    };
    rec.onerror = function (e) {
      if (e.error === "not-allowed" || e.error === "service-not-allowed") {
        autoSendRef.current = false;
        setVoiceErr(t("voiceDenied"));
      } else if (e.error !== "no-speech" && e.error !== "aborted") {
        setVoiceErr(t("voiceError"));
      }
    };
    rec.onend = function () {
      clearTimeout(silenceRef.current);
      recRef.current = null;
      setListening(false);
      if (autoSendRef.current) {
        autoSendRef.current = false;
        const cur = live.current;
        const txt = (cur.input || finalRef.current).trim();
        if (txt && !cur.props.busy && !cur.props.disabled) {
          setInput("");
          finalRef.current = "";
          cur.props.onSend(txt, takeSpeech(txt));
        }
      }
    };
    recRef.current = rec;
    setVoiceErr("");
    setListening(true);
    try {
      rec.start();
    } catch (err) {
      recRef.current = null;
      setListening(false);
      setVoiceErr(t("voiceError"));
      return;
    }
    armSilence(false);
  }
  listenRef.current = startListening;

  function toggleMic() {
    if (listening) {
      clearTimeout(silenceRef.current);
      autoSendRef.current = live.current.voiceOn && !!live.current.input.trim();
      if (recRef.current) {
        try { recRef.current.stop(); } catch (e) { /* ignore */ }
      }
    } else {
      startListening();
    }
  }

  function send() {
    const v = input.trim();
    if (!v || props.busy || props.disabled) { return; }
    if (recRef.current) {
      autoSendRef.current = false;
      clearTimeout(silenceRef.current);
      try { recRef.current.abort(); } catch (e) { /* ignore */ }
    }
    setInput("");
    finalRef.current = "";
    props.onSend(v, takeSpeech(v));
  }

  function onKey(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  let status = null;
  if (voiceErr) {
    status = { text: voiceErr, color: C.red, live: false };
  } else if (listening) {
    status = { text: voice.on ? t("listening") : t("dictating"), color: C.green, live: true };
  } else if (speaking) {
    status = { text: t("speakingNow"), color: C.dark, live: false, stop: true };
  } else if (voice.on) {
    status = { text: voice.stt ? t("tapToTalk") : t("ttsOnly"), color: C.muted, live: false };
  }

  const err = props.error ? (typeof props.error === "string" ? { kind: "other", text: props.error } : props.error) : null;
  const errBox = err ? (
    <div role="alert" style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginTop: 8, padding: "8px 10px", borderRadius: 8, background: "#FBF0EE", border: "1px solid #EFC7C2" }}>
      <span style={{ flex: 1, minWidth: 200, color: C.red, fontSize: 13, lineHeight: 1.45 }}>{err.text}</span>
      {needsConnect(err) && portal.connect ? (
        <Btn kind="primary" small onClick={function () { portal.connect(err.kind); }}>{t("connectAi")}</Btn>
      ) : null}
      {props.onRetry && err.kind !== "refusal" ? (
        <Btn kind="ghost" small onClick={props.onRetry} disabled={props.busy}>{t("tryAgain")}</Btn>
      ) : null}
    </div>
  ) : null;

  const statusBar = status ? (
    <div role="status" style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10, fontSize: 13, color: status.color, lineHeight: 1.45 }}>
      {status.live ? <span className="aic-live" /> : null}
      <span style={{ flex: 1 }}>{status.text}</span>
      {status.stop ? <Btn kind="ghost" small onClick={stopSpeaking}>{t("stopVoice")}</Btn> : null}
    </div>
  ) : null;

  const micButton = voice.stt ? (
    <button
      type="button"
      onClick={toggleMic}
      disabled={props.disabled || props.busy}
      aria-pressed={listening}
      aria-label={listening ? t("micStop") : t("micStart")}
      title={listening ? t("micStop") : t("micStart")}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        height: 46,
        padding: "0 14px",
        borderRadius: 10,
        border: "1px solid " + (listening ? C.green : C.line),
        background: listening ? C.green : "#fff",
        color: listening ? "#fff" : C.dark,
        fontFamily: FONT_B,
        fontWeight: 600,
        fontSize: 14,
        cursor: props.disabled || props.busy ? "not-allowed" : "pointer",
        opacity: props.disabled || props.busy ? 0.5 : 1,
        flexShrink: 0
      }}
    >
      <MicIcon />
      <span>{listening ? t("micStop") : t("micStart")}</span>
    </button>
  ) : null;

  const el = (
    <div>
      <div ref={boxRef} style={{ height: 400, overflowY: "auto", padding: 14, background: "#fff", border: "1px solid " + C.line, borderRadius: 12 }}>
        {props.messages.map(function (m, i) {
          const canListen = voice.tts && m.role === "assistant";
          const row = (
            <Bubble
              key={i}
              role={m.role}
              text={m.content}
              speech={m.speech}
              label={props.labelFor ? props.labelFor(m.role) : null}
              onListen={canListen ? function () { speakMessage(m.content, false); } : null}
            />
          );
          return row;
        })}
        {props.busy ? <Typing /> : null}
      </div>
      {errBox}
      {statusBar}
      <div style={{ display: "flex", gap: 8, marginTop: 10, alignItems: "flex-end" }}>
        {micButton}
        <textarea
          value={input}
          onChange={function (e) {
            setInput(e.target.value);
            finalRef.current = e.target.value ? e.target.value + " " : "";
            if (!e.target.value) { speechRef.current = { start: 0, last: 0 }; }
          }}
          onKeyDown={onKey}
          rows={2}
          placeholder={props.placeholder}
          disabled={props.disabled}
          aria-label={t("yourMessage")}
          style={Object.assign({}, INPUT, { resize: "vertical", minHeight: 46 })}
        />
        <Btn onClick={send} disabled={props.busy || props.disabled || !input.trim()} style={{ height: 46 }}>{t("send")}</Btn>
      </div>
      <div style={{ fontSize: 12, color: C.muted, marginTop: 6 }}>{t("enterHint")}</div>
    </div>
  );
  return el;
}

/* ---------------- Live call ---------------- */

/*
  Full-screen live voice call. Turn-taking is automatic: the microphone stays
  open for the whole call, a pause of about 1.4 s ends your turn, the reply is
  streamed and spoken sentence by sentence as it arrives, and you can cut in
  at any time by speaking (voice interrupt) or by tapping the circle.
*/

const STOP_WORDS = ["stop", "wait", "sorry", "hold", "pardon", "attends", "attendez", "arrete", "excuse", "excusez"];

function liveRules(lang) {
  return [
    "This is a live spoken conversation (a voice call). Your words are read aloud by a speech synthesiser.",
    LIVE_LINK_RULE,
    "Speak naturally in short turns: usually 1 to 3 sentences and never more than about 60 words. No lists, bullet points, headings, emojis or symbols that sound odd when read aloud.",
    "The other person's words come from speech recognition and may contain transcription errors. Interpret them sensibly, and ask briefly if something is genuinely unclear.",
    "If one of your earlier turns ends with '...', you were interrupted at that point. Do not repeat what you said; respond to what the person says next.",
    lang === "fr" ? "Speak French." : "Speak English."
  ].join("\n");
}

function normWords(s) {
  return String(s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s']/g, " ")
    .split(/\s+/)
    .filter(function (w) { return w.length > 2; });
}

function isEcho(heard, ref) {
  const hw = normWords(heard);
  if (!hw.length) { return false; }
  const set = new Set(normWords(ref));
  if (!set.size) { return false; }
  let hit = 0;
  hw.forEach(function (w) { if (set.has(w)) { hit += 1; } });
  return hit / hw.length >= 0.6;
}

function hasStopWord(heard) {
  const words = normWords(heard).concat(String(heard || "").toLowerCase().split(/\s+/));
  return words.some(function (w) { return STOP_WORDS.indexOf(w.replace(/[^a-z]/g, "")) >= 0; });
}

function wordCount(s) {
  return String(s || "").split(/\s+/).filter(Boolean).length;
}

function splitSpeech(text) {
  const out = [];
  String(text || "").split(/\n+/).forEach(function (line) {
    const parts = line.match(/[^.!?\u2026]+[.!?\u2026]*["')\]]?/g) || [];
    parts.forEach(function (p) { if (p.trim()) { out.push(p.trim()); } });
  });
  return out;
}

async function streamClaude(system, messages, onDelta, signal) {
  if (platform() && platform().sample) {
    let seen = "";
    const text = await callClaude(system, messages, {
      tier: "quick",
      signal: signal,
      onText: function (ev) {
        const full = (ev && ev.text) || "";
        if (full.length > seen.length && full.indexOf(seen) === 0) {
          const d = full.slice(seen.length);
          seen = full;
          onDelta(d);
        }
      }
    });
    if (text.length > seen.length && text.indexOf(seen) === 0) { onDelta(text.slice(seen.length)); }
    return text;
  }
  return aiStream(system, messages, onDelta, signal);
}

function fmtClock(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return m + ":" + (s < 10 ? "0" : "") + s;
}

function LiveCall(props) {
  const t = useT();
  const ctxLang = useLang();
  const lang = props.lang || ctxLang;
  const [started, setStarted] = useState(false);
  const [phase, setPhase] = useState("ready");
  const [muted, setMuted] = useState(false);
  const [captions, setCaptions] = useState(true);
  const [barge, setBarge] = useState(true);
  const [userLine, setUserLine] = useState("");
  const [aiLine, setAiLine] = useState("");
  const [err, setErr] = useState("");
  const [errKind, setErrKind] = useState("");
  const portal = useContext(PortalCtx);
  const [seconds, setSeconds] = useState(0);

  const R = useRef(null);
  if (R.current === null) {
    R.current = {
      active: false, muted: false, barge: true, fatal: false, phase: "ready",
      msgs: props.messages.slice(), buffer: "", interim: "",
      rec: null, silence: null, restart: null, controller: null, token: 0,
      queue: [], pending: "", streamDone: true, speakingNow: false,
      spoken: [], generated: "", committed: true, lastAssistant: "",
      speaker: 0, speakerMap: {}, guard: null, turnStart: 0, lastHeard: 0
    };
  }
  const r = R.current;
  const propsRef = useRef(props);
  propsRef.current = props;

  function setPh(p) { r.phase = p; setPhase(p); }

  function setMsgs(list) {
    r.msgs = list;
    propsRef.current.onUpdate(list);
  }

  useEffect(function () {
    if (!started) { return undefined; }
    const id = setInterval(function () { setSeconds(function (s) { return s + 1; }); }, 1000);
    return function () { clearInterval(id); };
  }, [started]);

  useEffect(function () {
    function onKey(e) {
      if (e.key === "Escape") { e.preventDefault(); endCall(); }
      else if ((e.key === " " || e.code === "Space") && r.active) { e.preventDefault(); tapOrb(); }
    }
    window.addEventListener("keydown", onKey);
    return function () { window.removeEventListener("keydown", onKey); };
  }, []);

  useEffect(function () {
    return function () { shutdown(); };
  }, []);

  /* ----- speech output ----- */

  function playNext(tok) {
    if (tok !== r.token) { return; }
    clearTimeout(r.guard);
    if (!r.queue.length) {
      r.speakingNow = false;
      if (r.streamDone) { finishTurn(tok); }
      return;
    }
    let s = r.queue.shift();
    r.spoken.push(s);
    if (propsRef.current.multiSpeaker) {
      const m = s.match(/^([A-Z][A-Za-z\u00C0-\u017F'-]{1,20})\s?:\s*([\s\S]+)$/);
      if (m) {
        if (r.speakerMap[m[1]] == null) { r.speakerMap[m[1]] = Object.keys(r.speakerMap).length; }
        r.speaker = r.speakerMap[m[1]];
        s = m[2];
      }
    }
    const clean = stripNav(s).replace(/[*_#`]/g, "").replace(/^\s*-\s+/, "").trim();
    r.speakingNow = true;
    setPh("speaking");
    setAiLine(clean);
    if (!hasTTS() || !clean) {
      r.speakingNow = false;
      playNext(tok);
      return;
    }
    const u = new window.SpeechSynthesisUtterance(clean);
    u.lang = lang === "fr" ? "fr-FR" : "en-GB";
    const voices = voicesFor(lang);
    const idx = r.speaker || 0;
    if (voices.length) { u.voice = voices[idx % voices.length]; }
    u.pitch = idx === 0 ? 1 : (idx % 2 === 1 ? 0.85 : 1.15);
    u.rate = 1.03;
    let ended = false;
    function next() {
      if (ended) { return; }
      ended = true;
      clearTimeout(r.guard);
      if (tok !== r.token) { return; }
      r.speakingNow = false;
      playNext(tok);
    }
    u.onend = next;
    u.onerror = next;
    r.guard = setTimeout(next, 4000 + clean.length * 95);
    window.speechSynthesis.speak(u);
  }

  function enqueue(sentences, tok) {
    if (!sentences.length) { return; }
    r.queue = r.queue.concat(sentences);
    if (!r.speakingNow) { playNext(tok); }
  }

  function takeSentences(final) {
    const out = [];
    let p = r.pending;
    let m = p.match(/[.!?\u2026]+["')\]]?\s|\n/);
    while (m) {
      const end = m.index + m[0].length;
      const s = p.slice(0, end).trim();
      p = p.slice(end);
      if (s) { out.push(s); }
      m = p.match(/[.!?\u2026]+["')\]]?\s|\n/);
    }
    if (final && p.trim()) {
      out.push(p.trim());
      p = "";
    }
    r.pending = p;
    return out;
  }

  function finishTurn(tok) {
    if (tok !== r.token) { return; }
    r.lastAssistant = r.generated || r.lastAssistant;
    r.buffer = "";
    r.interim = "";
    r.turnStart = 0;
    setUserLine("");
    setPh(r.muted ? "muted" : "listening");
    if (r.rec) {
      try { r.rec.abort(); } catch (e) { /* restarts on end */ }
    } else {
      startRec();
    }
  }

  /* ----- model turn ----- */

  function commitAssistant(text) {
    if (!text) { return; }
    r.committed = true;
    setMsgs(r.msgs.concat([{ role: "assistant", content: text }]));
  }

  async function respond() {
    r.token += 1;
    const tok = r.token;
    const controller = new AbortController();
    r.controller = controller;
    r.queue = [];
    r.pending = "";
    r.generated = "";
    r.spoken = [];
    r.streamDone = false;
    r.committed = false;
    r.speakingNow = false;
    setErr("");
    setErrKind("");
    setPh("thinking");
    setAiLine("");
    const p = propsRef.current;
    const system = p.system + "\n\n" + liveRules(lang);
    const api = p.buildApi(r.msgs);
    function onDelta(txt) {
      if (tok !== r.token) { return; }
      r.generated += txt;
      r.pending += txt;
      enqueue(takeSentences(false), tok);
    }
    try {
      await streamClaude(system, api, onDelta, controller.signal);
      if (tok !== r.token) { return; }
      r.streamDone = true;
      enqueue(takeSentences(true), tok);
      commitAssistant(r.generated.trim());
      if (!r.speakingNow && r.queue.length === 0) { finishTurn(tok); }
    } catch (e) {
      if (tok !== r.token || (e && e.name === "AbortError")) { return; }
      r.streamDone = true;
      r.committed = true;
      const info = aiError(t, e, "liveError");
      setErr(info.text);
      setErrKind(info.kind);
      sayError(info.text, tok);
    }
  }

  /* Reads a failure aloud, so the person knows what happened without
     looking at the screen. Spoken in the "speaking" phase, so talking over
     it interrupts it and the microphone ignores its echo. */
  function sayError(text, tok) {
    const back = function () {
      if (tok === r.token && r.phase === "speaking") { setPh(r.muted ? "muted" : "listening"); }
    };
    if (!hasTTS()) { setPh(r.muted ? "muted" : "listening"); return; }
    r.generated = text;
    r.lastAssistant = text;
    r.spoken = [];
    r.speakingNow = true;
    setPh("speaking");
    setAiLine("");
    const u = new window.SpeechSynthesisUtterance(text);
    u.lang = lang === "fr" ? "fr-FR" : "en-GB";
    const voices = voicesFor(lang);
    if (voices.length) { u.voice = voices[0]; }
    u.onend = function () { r.speakingNow = false; back(); };
    u.onerror = u.onend;
    window.speechSynthesis.speak(u);
  }

  function retryTurn() {
    const last = r.msgs[r.msgs.length - 1];
    setErr("");
    setErrKind("");
    if (last && last.role === "user") {
      stopSpeech();
      respond();
    }
  }

  function turnSpeech(text) {
    const s = r.turnStart ? speechMeta(text, (r.lastHeard - r.turnStart) / 1000) : null;
    r.turnStart = 0;
    return s;
  }

  function commitUser(text) {
    clearTimeout(r.silence);
    r.buffer = "";
    r.interim = "";
    setUserLine(text);
    setMsgs(r.msgs.concat([{ role: "user", content: text, speech: turnSpeech(text) }]));
    if (r.rec) {
      try { r.rec.abort(); } catch (e) { /* restarts on end */ }
    }
    respond();
  }

  function cancelModel() {
    r.token += 1;
    clearTimeout(r.guard);
    if (r.controller) {
      try { r.controller.abort(); } catch (e) { /* ignore */ }
      r.controller = null;
    }
    stopSpeech();
    r.queue = [];
    r.pending = "";
    r.speakingNow = false;
    r.streamDone = true;
  }

  function popLastUserToBuffer() {
    const last = r.msgs[r.msgs.length - 1];
    if (last && last.role === "user") {
      setMsgs(r.msgs.slice(0, -1));
      r.buffer = last.content;
      if (last.speech) { r.turnStart = r.lastHeard - last.speech.secs * 1000; }
    }
  }

  function interrupt() {
    const wasCommitted = r.committed;
    const spokenText = r.spoken.join(" ").trim();
    cancelModel();
    if (!wasCommitted) {
      if (spokenText) {
        commitAssistant(spokenText + " ...");
      } else {
        r.committed = true;
        popLastUserToBuffer();
      }
    } else if (spokenText && r.generated && spokenText.length < r.generated.trim().length) {
      const last = r.msgs[r.msgs.length - 1];
      if (last && last.role === "assistant") {
        setMsgs(r.msgs.slice(0, -1).concat([Object.assign({}, last, { content: spokenText + " ..." })]));
      }
    }
    r.lastAssistant = r.generated || r.lastAssistant;
    setPh(r.muted ? "muted" : "listening");
  }

  /* ----- speech input ----- */

  function armSilence() {
    clearTimeout(r.silence);
    r.silence = setTimeout(function () {
      if (r.phase !== "listening" || !r.active) { return; }
      const text = (r.buffer + " " + r.interim).trim();
      if (text) { commitUser(text); }
    }, 1400);
  }

  function handleResult(e) {
    let finals = "";
    let interim = "";
    for (let i = e.resultIndex; i < e.results.length; i++) {
      const res = e.results[i];
      if (res.isFinal) { finals += res[0].transcript + " "; } else { interim += res[0].transcript; }
    }
    const heard = (finals + interim).trim();
    if (!heard) { return; }
    const current = r.generated || r.lastAssistant;
    if (r.phase === "speaking") {
      if (!r.barge) { return; }
      const intentional = hasStopWord(heard) || (wordCount(heard) >= 2 && !isEcho(heard, current));
      if (!intentional) { return; }
      interrupt();
    } else if (r.phase === "thinking") {
      if (isEcho(heard, r.lastAssistant)) { return; }
      cancelModel();
      r.committed = true;
      popLastUserToBuffer();
      setPh("listening");
    } else if (r.phase !== "listening") {
      return;
    }
    if (wordCount(heard) >= 3 && isEcho(heard, current)) { return; }
    const now = Date.now();
    if (!r.turnStart) { r.turnStart = now; }
    r.lastHeard = now;
    if (finals.trim()) { r.buffer = (r.buffer + " " + finals).trim(); }
    r.interim = interim;
    setUserLine((r.buffer + " " + interim).trim());
    armSilence();
  }

  function startRec() {
    if (!r.active || r.muted || r.rec || r.fatal) { return; }
    const Ctor = getRecognitionCtor();
    if (!Ctor) { setErr(t("liveUnsupported")); return; }
    const rec = new Ctor();
    rec.lang = lang === "fr" ? "fr-FR" : "en-GB";
    rec.continuous = true;
    rec.interimResults = true;
    rec.onresult = handleResult;
    rec.onerror = function (e) {
      if (e.error === "not-allowed" || e.error === "service-not-allowed") {
        r.fatal = true;
        setErr(t("voiceDenied"));
      }
    };
    rec.onend = function () {
      if (r.rec === rec) { r.rec = null; }
      clearTimeout(r.restart);
      if (r.active && !r.muted && !r.fatal) {
        r.restart = setTimeout(startRec, 150);
      }
    };
    r.rec = rec;
    try {
      rec.start();
    } catch (e) {
      r.rec = null;
      r.restart = setTimeout(startRec, 400);
    }
  }

  /* ----- controls ----- */

  function startCall() {
    setStarted(true);
    setErr("");
    r.active = true;
    r.fatal = false;
    const last = r.msgs[r.msgs.length - 1];
    r.lastAssistant = last && last.role === "assistant" ? last.content : "";
    startRec();
    if (propsRef.current.speakFirst && last && last.role === "assistant") {
      r.token += 1;
      const tok = r.token;
      r.queue = splitSpeech(last.content);
      r.generated = last.content;
      r.spoken = [];
      r.streamDone = true;
      r.committed = true;
      playNext(tok);
    } else {
      setPh("listening");
    }
  }

  function tapOrb() {
    if (!r.active) { return; }
    if (r.phase === "speaking") {
      interrupt();
    } else if (r.phase === "listening") {
      const text = (r.buffer + " " + r.interim).trim();
      if (text) { commitUser(text); }
    } else if (r.phase === "muted") {
      toggleMute();
    }
  }

  function toggleMute() {
    r.muted = !r.muted;
    setMuted(r.muted);
    if (r.muted) {
      clearTimeout(r.silence);
      clearTimeout(r.restart);
      if (r.rec) {
        const rec = r.rec;
        r.rec = null;
        try { rec.abort(); } catch (e) { /* ignore */ }
      }
      if (r.phase === "listening") { setPh("muted"); }
    } else {
      startRec();
      if (r.phase === "muted") { setPh("listening"); }
    }
  }

  function toggleBarge() {
    r.barge = !r.barge;
    setBarge(r.barge);
  }

  function shutdown() {
    const wasActive = r.active;
    r.active = false;
    const spokenText = r.spoken.join(" ").trim();
    const wasCommitted = r.committed;
    cancelModel();
    clearTimeout(r.silence);
    clearTimeout(r.restart);
    if (r.rec) {
      const rec = r.rec;
      r.rec = null;
      try { rec.abort(); } catch (e) { /* ignore */ }
    }
    if (wasActive && !wasCommitted) {
      if (spokenText) { commitAssistant(spokenText + " ..."); } else { r.committed = true; }
    }
    const pendingUser = (r.buffer + " " + r.interim).trim();
    if (wasActive && pendingUser) {
      r.buffer = "";
      r.interim = "";
      setMsgs(r.msgs.concat([{ role: "user", content: pendingUser, speech: turnSpeech(pendingUser) }]));
    }
  }

  function endCall() {
    shutdown();
    propsRef.current.onClose(r.msgs);
  }

  /* ----- view ----- */

  let phaseText = "";
  if (phase === "listening") { phaseText = userLine ? t("phaseHeard") : t("phaseListening"); }
  else if (phase === "thinking") { phaseText = t("phaseThinking"); }
  else if (phase === "speaking") { phaseText = barge ? t("phaseSpeaking") : t("phaseSpeakingTap"); }
  else if (phase === "muted") { phaseText = t("phaseMuted"); }

  const orbColor = phase === "speaking" ? C.orange : phase === "thinking" ? C.blue : phase === "muted" ? "#667085" : C.green;
  const orbClass = phase === "speaking" ? "aic-orb aic-orb-speak" : phase === "listening" ? "aic-orb aic-orb-listen" : "aic-orb";

  const ctrlBtn = {
    display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 16px", borderRadius: 99,
    border: "1px solid rgba(255,255,255,0.35)", background: "rgba(255,255,255,0.08)", color: "#fff",
    fontFamily: FONT_B, fontWeight: 600, fontSize: 14, cursor: "pointer"
  };

  const readyView = (
    <div style={{ maxWidth: 460, width: "100%", textAlign: "center" }}>
      <div style={{ width: 120, height: 120, borderRadius: "50%", margin: "0 auto 24px", background: C.orange, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <MicIcon size={46} />
      </div>
      <div style={{ fontFamily: FONT_H, fontWeight: 800, fontSize: 24, lineHeight: 1.25 }}>{props.title}</div>
      {props.subtitle ? <div style={{ fontSize: 14, opacity: 0.8, marginTop: 6 }}>{props.subtitle}</div> : null}
      <div style={{ textAlign: "left", margin: "24px 0", fontSize: 14, lineHeight: 1.6, background: "rgba(255,255,255,0.08)", borderRadius: 12, padding: "14px 18px" }}>
        <div>{t("liveTip1")}</div>
        <div style={{ marginTop: 6 }}>{t("liveTip2")}</div>
        <div style={{ marginTop: 6 }}>{t("liveTip3")}</div>
      </div>
      {err ? <div role="alert" style={{ color: "#FFD1CC", fontSize: 14, marginBottom: 14 }}>{err}</div> : null}
      <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
        <button type="button" onClick={startCall} style={Object.assign({}, ctrlBtn, { background: C.green, border: "1px solid " + C.green, padding: "12px 24px", fontSize: 15 })}>
          <MicIcon size={18} />{t("startCall")}
        </button>
        <button type="button" onClick={function () { propsRef.current.onClose(r.msgs); }} style={ctrlBtn}>{t("cancel")}</button>
      </div>
    </div>
  );

  const callView = (
    <div style={{ width: "100%", maxWidth: 680, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <button
        type="button"
        onClick={tapOrb}
        aria-label={t("orbLabel")}
        title={t("orbLabel")}
        className={orbClass}
        style={{ width: 190, height: 190, borderRadius: "50%", border: "none", background: orbColor, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", position: "relative", transition: "background .25s" }}
      >
        {phase === "thinking" ? <span className="aic-orb-think" /> : null}
        {phase === "speaking" ? <SpeakerIcon size={56} /> : <MicIcon size={56} />}
      </button>
      <div aria-live="polite" style={{ marginTop: 22, fontFamily: FONT_H, fontWeight: 700, fontSize: 18 }}>{phaseText}</div>
      {err ? <div role="alert" style={{ color: "#FFD1CC", fontSize: 14, marginTop: 10, maxWidth: 520, lineHeight: 1.5 }}>{err}</div> : null}
      {err && errKind ? (
        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginTop: 14 }}>
          {needsConnect({ kind: errKind }) && portal.connect ? (
            <button type="button" onClick={function () { const k = errKind; endCall(); portal.connect(k); }} style={Object.assign({}, ctrlBtn, { background: C.orange, border: "1px solid " + C.orange })}>{t("connectAi")}</button>
          ) : null}
          {errKind !== "refusal" ? (
            <button type="button" onClick={retryTurn} style={ctrlBtn}>{t("tryAgain")}</button>
          ) : null}
        </div>
      ) : null}
      {captions ? (
        <div style={{ marginTop: 26, minHeight: 110, width: "100%" }}>
          {aiLine && (phase === "speaking" || phase === "thinking") ? (
            <div style={{ fontSize: 20, lineHeight: 1.5, fontWeight: 500 }}>
              <span style={{ fontSize: 13, fontWeight: 700, opacity: 0.7, display: "block", marginBottom: 4 }}>{props.aiName}</span>
              {aiLine}
            </div>
          ) : null}
          {userLine && phase !== "speaking" ? (
            <div style={{ fontSize: 17, lineHeight: 1.5, opacity: 0.85, marginTop: 12 }}>
              <span style={{ fontSize: 13, fontWeight: 700, opacity: 0.7, display: "block", marginBottom: 4 }}>{t("you")}</span>
              {userLine}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );

  const controls = started ? (
    <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", padding: "18px 16px calc(22px + env(safe-area-inset-bottom, 0px))" }}>
      <button type="button" onClick={toggleMute} aria-pressed={muted} style={Object.assign({}, ctrlBtn, muted ? { background: "#fff", color: C.dark } : {})}>
        <MicIcon size={16} />{muted ? t("unmute") : t("mute")}
      </button>
      <button type="button" onClick={function () { setCaptions(!captions); }} aria-pressed={captions} style={ctrlBtn}>
        {captions ? t("captionsOn") : t("captionsOff")}
      </button>
      <button type="button" onClick={toggleBarge} aria-pressed={barge} style={ctrlBtn} title={t("bargeHint")}>
        {barge ? t("bargeOn") : t("bargeOff")}
      </button>
      <button type="button" onClick={endCall} style={Object.assign({}, ctrlBtn, { background: C.red, border: "1px solid " + C.red })}>
        {t("endCall")}
      </button>
    </div>
  ) : null;

  const overlay = (
    <div
      className="aic-root aic-live-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={props.title}
      lang={lang}
      style={{ position: "fixed", inset: 0, zIndex: 10000, background: "#1E2A44", color: "#fff", display: "flex", flexDirection: "column", fontFamily: FONT_B }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, padding: "calc(16px + env(safe-area-inset-top, 0px)) 20px 16px", borderBottom: "1px solid rgba(255,255,255,0.12)" }}>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontFamily: FONT_H, fontWeight: 700, fontSize: 15, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{props.title}</div>
          <div style={{ fontSize: 12, opacity: 0.7, marginTop: 2 }}>{t("liveCall")}, {lang.toUpperCase()}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, fontVariantNumeric: "tabular-nums" }}>
          {started ? <span className="aic-live" style={{ background: phase === "muted" ? "#98A2B3" : "#5BD6A4" }} /> : null}
          {started ? fmtClock(seconds) : null}
        </div>
      </div>
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 24, overflowY: "auto" }}>
        {started ? callView : readyView}
      </div>
      {controls}
      {started ? <div style={{ textAlign: "center", fontSize: 12, opacity: 0.6, paddingBottom: 12 }}>{t("keysHint")}</div> : null}
    </div>
  );

  if (typeof document !== "undefined" && document.body) {
    return createPortal(overlay, document.body);
  }
  return overlay;
}

/* ---------------- Coach tab ---------------- */

function CoachTab(props) {
  const t = useT();
  const lang = useLang();
  const data = props.data;
  const [activeId, setActiveId] = useState(null);
  const [mode, setMode] = useState("companion");
  const [failed, setFailed] = useState("");
  const portal = useContext(PortalCtx);
  const [moduleIdx, setModuleIdx] = useState(0);
  const [busy, setBusy] = useState(false);
  const [wrapping, setWrapping] = useState(false);
  const [error, setError] = useState("");
  const [added, setAdded] = useState(false);
  const [freshId, setFreshId] = useState(null);
  const [liveOpen, setLiveOpen] = useState(false);
  const voice = useContext(VoiceCtx);

  const session = data.sessions.find(function (s) { return s.id === activeId; }) || null;
  const userTurns = session ? session.messages.filter(function (m) { return m.role === "user"; }).length : 0;

  function patchSession(id, patch) {
    props.update(function (prev) {
      return {
        sessions: prev.sessions.map(function (s) {
          return s.id === id ? Object.assign({}, s, patch) : s;
        })
      };
    });
  }

  function startSession() {
    const m = findMode(mode);
    const s = {
      id: uid(),
      mode: mode,
      lang: lang,
      module: L(props.modules[moduleIdx], lang),
      createdAt: new Date().toISOString(),
      title: t("sessionTitle", L(m.label, lang)),
      messages: [{ role: "assistant", content: L(m.greet, lang), local: true }],
      wrap: null
    };
    props.update(function (prev) { return { sessions: [s].concat(prev.sessions) }; });
    setActiveId(s.id);
    setFreshId(s.id);
    setError("");
    setAdded(false);
  }

  // Asks the coach to answer `msgs`, whose last entry is the participant's.
  async function reply(msgs) {
    setBusy(true);
    setError("");
    setFailed("");
    try {
      const answer = await callClaude(coachSystem(props.user, session.mode, session.module, data.goals, lang, portal.map), toApi(msgs, 30), { tier: "quick" });
      patchSession(session.id, { messages: msgs.concat([{ role: "assistant", content: answer }]) });
    } catch (e) {
      setError(aiError(t, e, "errCoach"));
      setFailed("reply");
    }
    setBusy(false);
  }

  function send(text, speech) {
    if (!session) { return; }
    const msgs = session.messages.concat([{ role: "user", content: text, speech: speech || null }]);
    patchSession(session.id, { messages: msgs });
    reply(msgs);
  }

  function retry() {
    if (!session) { return; }
    if (failed === "wrap") { wrapUp(); return; }
    const last = session.messages[session.messages.length - 1];
    if (last && last.role === "user") { reply(session.messages); }
  }

  // A live call cannot answer without an AI connection: explain instead.
  function openLive() {
    setFreshId(null);
    if (!portal.ready) {
      setError({ kind: "not_connected", text: t("err_not_connected") });
      setFailed("");
      return;
    }
    setLiveOpen(true);
  }

  async function wrapUp() {
    if (!session) { return; }
    setWrapping(true);
    setError("");
    setFailed("");
    try {
      const transcript = session.messages
        .filter(function (m) { return !m.local; })
        .map(function (m) { return (m.role === "user" ? "Participant: " : "Coach: ") + m.content; })
        .join("\n\n");
      const txt = await callClaude(wrapSystem(lang), [{ role: "user", content: "Session type: " + L(findMode(session.mode).label, "en") + "\nModule: " + session.module + "\n\nTranscript:\n\n" + transcript }]);
      const w = parseJSON(txt);
      patchSession(session.id, { wrap: w, title: w.title || session.title });
    } catch (e) {
      setError(aiError(t, e, "errWrap"));
      setFailed("wrap");
    }
    setWrapping(false);
  }

  function addWrapAsGoal() {
    if (!session || !session.wrap) { return; }
    props.addGoal({
      title: session.wrap.goal || session.wrap.insight,
      category: session.mode === "prepare" || session.mode === "companion" ? "Communication" : "Leadership",
      why: session.wrap.insight,
      actions: session.wrap.actions || []
    });
    setAdded(true);
  }

  function deleteSession(id) {
    props.update(function (prev) {
      return { sessions: prev.sessions.filter(function (s) { return s.id !== id; }) };
    });
    if (id === activeId) { setActiveId(null); }
  }

  const sidebar = (
    <Card style={{ padding: 14 }}>
      <Btn onClick={function () { setActiveId(null); setAdded(false); }} style={{ width: "100%", marginBottom: 12 }}>{t("newSession")}</Btn>
      <div style={{ fontSize: 13, fontWeight: 600, color: C.muted, marginBottom: 8 }}>{t("yourSessions")}</div>
      {data.sessions.length === 0 ? <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.5 }}>{t("noSessions")}</div> : null}
      <div style={{ display: "flex", flexDirection: "column", gap: 4, maxHeight: 420, overflowY: "auto" }}>
        {data.sessions.map(function (s) {
          const active = s.id === activeId;
          const row = (
            <button
              key={s.id}
              type="button"
              className="aic-pick"
              onClick={function () { setActiveId(s.id); setFreshId(null); setError(""); setAdded(false); }}
              style={{ border: "1px solid " + (active ? C.blue : "transparent"), background: active ? C.blueSoft : "transparent", borderRadius: 8, padding: "8px 10px", fontFamily: FONT_B }}
            >
              <div style={{ fontSize: 13, fontWeight: 600, color: C.ink }}>{s.title}</div>
              <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>{L(findMode(s.mode).label, lang)}, {fmtDate(s.createdAt, lang)}</div>
            </button>
          );
          return row;
        })}
      </div>
    </Card>
  );

  const starter = (
    <Card>
      <Heading title={t("startTitle")} sub={t("startSub")} />
      <div className="aic-picks" style={{ marginBottom: 16 }}>
        {COACH_MODES.map(function (m) {
          const on = m.id === mode;
          const row = (
            <button
              key={m.id}
              type="button"
              className="aic-pick"
              onClick={function () { setMode(m.id); }}
              aria-pressed={on}
              style={{ border: "1px solid " + (on ? C.orange : C.line), background: on ? C.orangeSoft : "#fff", borderRadius: 10, padding: 14, fontFamily: FONT_B }}
            >
              <div style={{ fontFamily: FONT_H, fontWeight: 700, fontSize: 15, color: C.ink }}>{L(m.label, lang)}</div>
              <div style={{ fontSize: 13, color: C.muted, marginTop: 4, lineHeight: 1.45 }}>{L(m.desc, lang)}</div>
            </button>
          );
          return row;
        })}
      </div>
      <label style={{ fontSize: 13, fontWeight: 600, color: C.ink, display: "block", marginBottom: 6 }}>{t("moduleFocus")}</label>
      <select value={moduleIdx} onChange={function (e) { setModuleIdx(Number(e.target.value)); }} style={Object.assign({}, INPUT, { marginBottom: 16 })}>
        {props.modules.map(function (mod, i) {
          const opt = <option key={i} value={i}>{L(mod, lang)}</option>;
          return opt;
        })}
      </select>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <Btn onClick={startSession}>{t("startSession")}</Btn>
        <Btn kind="blue" onClick={function () { startSession(); openLive(); }} disabled={!voice.stt} title={voice.stt ? t("startLiveCall") : t("liveUnsupported")} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          <MicIcon size={16} />{t("startLiveCall")}
        </Btn>
      </div>
    </Card>
  );

  let main = starter;
  if (session) {
    const w = session.wrap;
    main = (
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <Card style={{ padding: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
            <div>
              <div style={{ fontFamily: FONT_H, fontWeight: 700, fontSize: 16, color: C.ink }}>{session.title}</div>
              <div style={{ fontSize: 13, color: C.muted, marginTop: 2 }}>{t("sessionOn", L(findMode(session.mode).label, lang), session.module)}</div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <Btn kind="blue" small onClick={wrapUp} disabled={wrapping || busy || userTurns < 2} title={t("wrapHint")}>
                {wrapping ? t("summarising") : t("wrapUp")}
              </Btn>
              <Btn kind="primary" small onClick={openLive} disabled={!voice.stt || busy} title={voice.stt ? t("liveCall") : t("liveUnsupported")} style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
                <MicIcon size={14} />{t("liveCall")}
              </Btn>
              <Btn kind="danger" small onClick={function () { deleteSession(session.id); }}>{t("del")}</Btn>
            </div>
          </div>
          {liveOpen ? (
            <div style={{ padding: 24, border: "1px dashed " + C.line, borderRadius: 12, fontSize: 14, color: C.muted, textAlign: "center" }}>{t("liveInProgress")}</div>
          ) : (
            <ChatBox
              key={session.id}
              speakInitial={session.id === freshId}
              messages={session.messages}
              busy={busy}
              error={error}
              onSend={send}
              onRetry={failed ? retry : null}
              placeholder={t("replyPh")}
              labelFor={function (r) { return r === "user" ? null : t("coachLabel"); }}
            />
          )}
        </Card>
        {w ? (
          <Card className="aic-reveal" style={{ borderColor: C.orange, background: C.orangeSoft }}>
            <Heading title={t("takeaways")} />
            <p style={{ fontSize: 14, color: C.ink, lineHeight: 1.6, margin: "0 0 10px" }}>{w.summary}</p>
            <p style={{ fontSize: 14, color: C.dark, fontWeight: 600, lineHeight: 1.55, margin: "0 0 12px" }}>{w.insight}</p>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.ink, marginBottom: 6 }}>{t("nextSteps")}</div>
            <ul style={{ margin: "0 0 14px", paddingLeft: 20, fontSize: 14, color: C.ink, lineHeight: 1.6 }}>
              {(w.actions || []).map(function (a, i) {
                const li = <li key={i}>{a}</li>;
                return li;
              })}
            </ul>
            <Btn onClick={addWrapAsGoal} disabled={added}>{added ? t("addedToPlan") : t("addToPlan")}</Btn>
          </Card>
        ) : null}
      </div>
    );
  }

  const liveSessionId = session ? session.id : null;
  const live = liveOpen && session ? (
    <LiveCall
      key={"live-" + session.id}
      title={session.title}
      subtitle={t("sessionOn", L(findMode(session.mode).label, lang), session.module)}
      aiName={t("coachLabel")}
      messages={session.messages}
      speakFirst={userTurns === 0}
      system={coachSystem(props.user, session.mode, session.module, data.goals, lang, portal.map)}
      buildApi={function (msgs) { return toApi(msgs, 30); }}
      onUpdate={function (list) { patchSession(liveSessionId, { messages: list }); }}
      onClose={function () { setLiveOpen(false); }}
    />
  ) : null;

  const el = (
    <div className="aic-grid">
      {sidebar}
      {main}
      {live}
    </div>
  );
  return el;
}

/* ---------------- Practice tab ---------------- */

function FeedbackCard(props) {
  const t = useT();
  const lang = useLang();
  const voice = useContext(VoiceCtx);
  const f = props.feedback;
  const [playing, setPlaying] = useState(false);

  useEffect(function () {
    return function () { stopSpeech(); };
  }, []);

  function toggleListen() {
    if (playing) {
      stopSpeech();
      setPlaying(false);
      return;
    }
    const parts = [
      f.headline,
      t("worked") + ". " + (f.strengths || []).join(". "),
      t("workOn") + ". " + (f.improvements || []).join(". "),
      f.rewrite && f.rewrite.better ? t("stronger") + ". " + f.rewrite.better : "",
      f.nextDrill ? t("nextDrill") + f.nextDrill : ""
    ];
    setPlaying(true);
    speakText(parts.filter(Boolean).join("\n"), lang, false, function () { setPlaying(false); });
  }
  const el = (
    <Card className="aic-reveal" style={{ borderColor: C.blue }}>
      <div style={{ display: "flex", gap: 18, alignItems: "center", marginBottom: 16, flexWrap: "wrap" }}>
        <div style={{ width: 84, height: 84, borderRadius: "50%", background: C.dark, color: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <div style={{ fontFamily: FONT_H, fontWeight: 800, fontSize: 30, lineHeight: 1 }}>{f.overall}</div>
          <div style={{ fontSize: 12, opacity: 0.8 }}>{t("outOf10")}</div>
        </div>
        <div style={{ flex: 1, minWidth: 200 }}>
          <div style={{ fontFamily: FONT_H, fontWeight: 700, fontSize: 17, color: C.ink }}>{props.title}</div>
          <div style={{ fontSize: 14, color: C.muted, marginTop: 4, lineHeight: 1.5 }}>{f.headline}</div>
        </div>
      </div>
      <div className="aic-two">
        <div>
          {RUBRIC.map(function (r) {
            const v = f.scores ? f.scores[r.id] : 0;
            const row = <Bar key={r.id} label={L(r.label, lang)} value={v} max={10} display={v + "/10"} color={v >= 7 ? C.green : v >= 5 ? C.blue : C.orange} />;
            return row;
          })}
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.green, marginBottom: 4 }}>{t("worked")}</div>
          <ul style={{ margin: "0 0 12px", paddingLeft: 18, fontSize: 14, lineHeight: 1.55, color: C.ink }}>
            {(f.strengths || []).map(function (s, i) {
              const li = <li key={i}>{s}</li>;
              return li;
            })}
          </ul>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.orange, marginBottom: 4 }}>{t("workOn")}</div>
          <ul style={{ margin: 0, paddingLeft: 18, fontSize: 14, lineHeight: 1.55, color: C.ink }}>
            {(f.improvements || []).map(function (s, i) {
              const li = <li key={i}>{s}</li>;
              return li;
            })}
          </ul>
        </div>
      </div>
      {f.rewrite && f.rewrite.better ? (
        <div style={{ marginTop: 16, padding: 14, background: C.bg, borderRadius: 10, borderLeft: "4px solid " + C.orange }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.ink, marginBottom: 6 }}>{t("stronger")}</div>
          <div style={{ fontSize: 14, color: C.muted, lineHeight: 1.5, marginBottom: 6 }}>{t("youSaid")}"{f.rewrite.original}"</div>
          <div style={{ fontSize: 14, color: C.dark, fontWeight: 600, lineHeight: 1.5 }}>{t("tryIt")}"{f.rewrite.better}"</div>
        </div>
      ) : null}
      {f.nextDrill ? (
        <div style={{ marginTop: 12, fontSize: 14, color: C.ink, lineHeight: 1.55 }}>
          <strong>{t("nextDrill")}</strong>{f.nextDrill}
        </div>
      ) : null}
      <div style={{ display: "flex", gap: 8, marginTop: 16, flexWrap: "wrap" }}>
        <Btn onClick={props.onRetry}>{t("retry")}</Btn>
        <Btn kind="ghost" onClick={props.onBack}>{t("another")}</Btn>
        {voice.tts ? (
          <Btn kind="ghost" onClick={toggleListen} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <SpeakerIcon />{playing ? t("stopListening") : t("listenFeedback")}
          </Btn>
        ) : null}
      </div>
    </Card>
  );
  return el;
}

function PracticeTab(props) {
  const t = useT();
  const lang = useLang();
  const data = props.data;
  const [scen, setScen] = useState(null);
  const [sceneLang, setSceneLang] = useState(lang);
  const [sceneKey, setSceneKey] = useState(0);
  const [fresh, setFresh] = useState(true);
  const [liveOpen, setLiveOpen] = useState(false);
  const voice = useContext(VoiceCtx);
  const [messages, setMessages] = useState([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [evaluating, setEvaluating] = useState(false);
  const [showCustom, setShowCustom] = useState(false);
  const [form, setForm] = useState({ title: "", who: "", situation: "", aim: "" });
  const [failed, setFailed] = useState("");
  const portal = useContext(PortalCtx);

  const learnerTurns = messages.filter(function (m) { return m.role === "user"; }).length;

  async function start(s) {
    setScen(s);
    setSceneLang(lang);
    setSceneKey(function (k) { return k + 1; });
    setFresh(true);
    setLiveOpen(false);
    setFeedback(null);
    setError("");
    if (s.opener) {
      setMessages([{ role: "assistant", content: s.opener }]);
      return;
    }
    setMessages([]);
    setBusy(true);
    setFailed("");
    try {
      const reply = await callClaude(roleplaySystem(s, lang), [{ role: "user", content: "Begin the scene. Say your first line." }], { tier: "quick" });
      setMessages([{ role: "assistant", content: reply }]);
    } catch (e) {
      setError(aiError(t, e, "errStart"));
      setFailed("start");
    }
    setBusy(false);
  }

  function practiceApi(msgs) {
    let history = msgs.map(function (m) { return { role: m.role, content: m.content }; });
    if (history.length > 30) { history = history.slice(history.length - 30); }
    while (history.length && history[0].role !== "assistant") { history = history.slice(1); }
    return [{ role: "user", content: "Begin the scene. Say your first line." }].concat(history);
  }

  // Asks the other character to answer `msgs`, whose last entry is the learner's.
  async function reply(msgs) {
    setBusy(true);
    setError("");
    setFailed("");
    try {
      const answer = await callClaude(roleplaySystem(scen, sceneLang), practiceApi(msgs), { tier: "quick" });
      setMessages(msgs.concat([{ role: "assistant", content: answer }]));
    } catch (e) {
      setError(aiError(t, e, "errReply"));
      setFailed("reply");
    }
    setBusy(false);
  }

  function send(text, speech) {
    const msgs = messages.concat([{ role: "user", content: text, speech: speech || null }]);
    setMessages(msgs);
    reply(msgs);
  }

  function retry() {
    if (failed === "start") { start(scen); return; }
    if (failed === "feedback") { evaluate(); return; }
    const last = messages[messages.length - 1];
    if (last && last.role === "user") { reply(messages); }
  }

  function openLive() {
    setFresh(false);
    if (!portal.ready) {
      setError({ kind: "not_connected", text: t("err_not_connected") });
      setFailed("");
      return;
    }
    setLiveOpen(true);
  }

  async function evaluate() {
    setEvaluating(true);
    setError("");
    setFailed("");
    try {
      const transcript = messages
        .map(function (m) { return (m.role === "user" ? "Learner: " : scen.role + ": ") + m.content; })
        .join("\n\n");
      const delivery = deliverySummary(messages.filter(function (m) { return m.role === "user"; }).map(function (m) { return m.speech; }));
      const txt = await callClaude(feedbackSystem(lang), [{
        role: "user",
        content: "Scenario: " + scen.setting + "\nSkill being practised: " + scen.skill + "\n\nTranscript:\n\n" + transcript + (delivery ? "\n\n" + delivery : "")
      }]);
      const f = parseJSON(txt);
      setFeedback(f);
      const rec = { id: uid(), scenarioId: scen.id, title: scen.title, skill: scen.skill, lang: sceneLang, date: new Date().toISOString(), feedback: f };
      props.update(function (prev) { return { practice: [rec].concat(prev.practice) }; });
    } catch (e) {
      setError(aiError(t, e, "errFeedback"));
      setFailed("feedback");
    }
    setEvaluating(false);
  }

  function back() {
    setScen(null);
    setMessages([]);
    setFeedback(null);
    setError("");
  }

  function startCustom() {
    if (!form.who.trim() || !form.situation.trim()) { return; }
    const s = {
      id: "custom",
      title: form.title.trim() || t("customDefault"),
      role: form.who.trim(),
      skill: form.aim.trim() || t("customSkill"),
      setting: form.situation.trim() + (form.aim.trim() ? " The learner wants to: " + form.aim.trim() + "." : ""),
      character: "You are " + form.who.trim() + ". Behave realistically for this person in a UN and West or Central African professional context. Raise plausible concerns and do not make it too easy.",
      opener: null
    };
    setShowCustom(false);
    start(s);
  }

  function setField(k, v) {
    setForm(function (prev) {
      const next = Object.assign({}, prev);
      next[k] = v;
      return next;
    });
  }

  if (scen) {
    const stage = (
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <Card style={{ padding: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10, flexWrap: "wrap", marginBottom: 10 }}>
            <div style={{ maxWidth: 640 }}>
              <div style={{ fontFamily: FONT_H, fontWeight: 700, fontSize: 16, color: C.ink }}>{scen.title}</div>
              <div style={{ fontSize: 13, color: C.muted, marginTop: 4, lineHeight: 1.5 }}>{scen.setting}</div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {!feedback ? (
                <Btn kind="primary" small onClick={openLive} disabled={!voice.stt || busy || evaluating || !messages.length} title={voice.stt ? t("liveCall") : t("liveUnsupported")} style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
                  <MicIcon size={14} />{t("liveCall")}
                </Btn>
              ) : null}
              {!feedback ? (
                <Btn kind="blue" small onClick={evaluate} disabled={evaluating || busy || learnerTurns < 2} title={t("linesHint")}>
                  {evaluating ? t("assessing") : t("endFeedback")}
                </Btn>
              ) : null}
              <Btn kind="ghost" small onClick={back}>{t("leaveScene")}</Btn>
            </div>
          </div>
          {liveOpen ? (
            <div style={{ padding: 24, border: "1px dashed " + C.line, borderRadius: 12, fontSize: 14, color: C.muted, textAlign: "center" }}>{t("liveInProgress")}</div>
          ) : (
            <ChatBox
              key={sceneKey}
              speakInitial={fresh}
              multiSpeaker={true}
              messages={messages}
              busy={busy}
              error={error}
              onSend={send}
              onRetry={failed ? retry : null}
              disabled={!!feedback || evaluating}
              placeholder={feedback ? t("sceneEnded") : t("linePh")}
              labelFor={function (r) { return r === "user" ? null : scen.role; }}
            />
          )}
        </Card>
        {liveOpen ? (
          <LiveCall
            key={"live-" + sceneKey}
            title={scen.title}
            subtitle={scen.role}
            aiName={scen.role}
            lang={sceneLang}
            multiSpeaker={true}
            messages={messages}
            speakFirst={learnerTurns === 0}
            system={roleplaySystem(scen, sceneLang)}
            buildApi={practiceApi}
            onUpdate={function (list) { setMessages(list); }}
            onClose={function () { setLiveOpen(false); }}
          />
        ) : null}
        {feedback ? (
          <FeedbackCard feedback={feedback} title={scen.title} onRetry={function () { start(scen); }} onBack={back} />
        ) : null}
      </div>
    );
    return stage;
  }

  const recent = data.practice.slice(0, 8);

  const el = (
    <div className="aic-grid" style={{ gridTemplateColumns: "minmax(0, 1fr) 260px" }}>
      <Card>
        <Heading title={t("practiceTitle")} sub={t("practiceSub")} />
        <div className="aic-picks">
          {SCENARIOS.map(function (raw) {
            const s = resolveScenario(raw, lang);
            const row = (
              <button
                key={s.id}
                type="button"
                className="aic-pick"
                onClick={function () { start(s); }}
                style={{ border: "1px solid " + C.line, background: "#fff", borderRadius: 10, padding: 14, fontFamily: FONT_B }}
              >
                <div style={{ fontFamily: FONT_H, fontWeight: 700, fontSize: 15, color: C.ink }}>{s.title}</div>
                <div style={{ fontSize: 13, color: C.muted, marginTop: 4, lineHeight: 1.45 }}>{s.setting}</div>
                <div style={{ display: "inline-block", marginTop: 10, fontSize: 12, fontWeight: 600, color: C.dark, background: C.blueSoft, borderRadius: 99, padding: "3px 10px" }}>{s.skill}</div>
              </button>
            );
            return row;
          })}
          <button
            type="button"
            className="aic-pick"
            onClick={function () { setShowCustom(!showCustom); }}
            style={{ border: "1px dashed " + C.orange, background: C.orangeSoft, borderRadius: 10, padding: 14, fontFamily: FONT_B }}
          >
            <div style={{ fontFamily: FONT_H, fontWeight: 700, fontSize: 15, color: C.ink }}>{t("customTitle")}</div>
            <div style={{ fontSize: 13, color: C.muted, marginTop: 4, lineHeight: 1.45 }}>{t("customDesc")}</div>
          </button>
        </div>
        {showCustom ? (
          <div className="aic-reveal" style={{ marginTop: 16, padding: 16, border: "1px solid " + C.line, borderRadius: 10, background: C.bg }}>
            <div style={{ display: "grid", gap: 10 }}>
              <input style={INPUT} placeholder={t("phTitle")} value={form.title} onChange={function (e) { setField("title", e.target.value); }} />
              <input style={INPUT} placeholder={t("phWho")} value={form.who} onChange={function (e) { setField("who", e.target.value); }} />
              <textarea style={Object.assign({}, INPUT, { minHeight: 70 })} placeholder={t("phSituation")} value={form.situation} onChange={function (e) { setField("situation", e.target.value); }} />
              <input style={INPUT} placeholder={t("phAim")} value={form.aim} onChange={function (e) { setField("aim", e.target.value); }} />
              <div><Btn onClick={startCustom} disabled={!form.who.trim() || !form.situation.trim()}>{t("startScene")}</Btn></div>
            </div>
          </div>
        ) : null}
      </Card>
      <Card style={{ padding: 14 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: C.muted, marginBottom: 8 }}>{t("recentPractice")}</div>
        {recent.length === 0 ? <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.5 }}>{t("noPractice")}</div> : null}
        {recent.map(function (p) {
          const row = (
            <div key={p.id} style={{ display: "flex", justifyContent: "space-between", gap: 8, padding: "8px 0", borderBottom: "1px solid " + C.line }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: C.ink }}>{p.title}</div>
                <div style={{ fontSize: 12, color: C.muted }}>{fmtDate(p.date, lang)}{p.lang ? ", " + p.lang.toUpperCase() : ""}</div>
              </div>
              <div style={{ fontFamily: FONT_H, fontWeight: 800, fontSize: 18, color: C.dark }}>{p.feedback ? p.feedback.overall : "-"}</div>
            </div>
          );
          return row;
        })}
      </Card>
    </div>
  );
  return el;
}

/* ---------------- Growth plan tab ---------------- */

function GoalItem(props) {
  const t = useT();
  const lang = useLang();
  const g = props.goal;
  const [actionText, setActionText] = useState("");
  const pct = goalProgress(g);
  const hasActions = g.actions && g.actions.length > 0;

  function addAction() {
    const v = actionText.trim();
    if (!v) { return; }
    props.onChange(Object.assign({}, g, { actions: (g.actions || []).concat([{ id: uid(), text: v, done: false }]) }));
    setActionText("");
  }

  function toggle(id) {
    props.onChange(Object.assign({}, g, {
      actions: g.actions.map(function (a) { return a.id === id ? Object.assign({}, a, { done: !a.done }) : a; })
    }));
  }

  function removeAction(id) {
    props.onChange(Object.assign({}, g, { actions: g.actions.filter(function (a) { return a.id !== id; }) }));
  }

  const el = (
    <div style={{ border: "1px solid " + (pct === 100 ? C.green : C.line), borderRadius: 10, padding: 14, background: pct === 100 ? C.greenSoft : "#fff" }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "flex-start" }}>
        <div>
          <div style={{ fontFamily: FONT_H, fontWeight: 700, fontSize: 15, color: C.ink, lineHeight: 1.4 }}>{g.title}</div>
          <div style={{ fontSize: 12, color: C.muted, marginTop: 3 }}>
            {categoryLabel(g.category, lang)}{g.target ? t("target", fmtDate(g.target, lang)) : ""}{pct === 100 ? t("completed") : ""}
          </div>
          {g.why ? <div style={{ fontSize: 13, color: C.muted, marginTop: 6, lineHeight: 1.5 }}>{g.why}</div> : null}
        </div>
        <Btn kind="danger" small onClick={props.onDelete}>{t("remove")}</Btn>
      </div>
      <div style={{ marginTop: 12 }}>
        <Bar label={t("progress")} value={pct} display={pct + "%"} color={pct === 100 ? C.green : C.orange} />
      </div>
      {!hasActions ? (
        <input
          type="range"
          min={0}
          max={100}
          step={10}
          value={g.progress || 0}
          aria-label={t("setProgress")}
          onChange={function (e) { props.onChange(Object.assign({}, g, { progress: Number(e.target.value) })); }}
          style={{ width: "100%", accentColor: C.orange, marginBottom: 8 }}
        />
      ) : null}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {(g.actions || []).map(function (a) {
          const row = (
            <div key={a.id} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 14 }}>
              <input type="checkbox" checked={a.done} onChange={function () { toggle(a.id); }} style={{ marginTop: 3, accentColor: C.green }} aria-label={t("markDone") + a.text} />
              <span style={{ flex: 1, color: a.done ? C.muted : C.ink, textDecoration: a.done ? "line-through" : "none", lineHeight: 1.45 }}>{a.text}</span>
              <button type="button" onClick={function () { removeAction(a.id); }} aria-label={t("removeAction")} style={{ border: "none", background: "transparent", color: C.muted, cursor: "pointer", fontSize: 16, lineHeight: 1 }}>x</button>
            </div>
          );
          return row;
        })}
      </div>
      <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
        <input
          style={Object.assign({}, INPUT, { padding: "6px 10px", fontSize: 13 })}
          placeholder={t("addAction")}
          value={actionText}
          onChange={function (e) { setActionText(e.target.value); }}
          onKeyDown={function (e) { if (e.key === "Enter") { addAction(); } }}
        />
        <Btn kind="ghost" small onClick={addAction} disabled={!actionText.trim()}>{t("add")}</Btn>
      </div>
    </div>
  );
  return el;
}

function PlanTab(props) {
  const t = useT();
  const lang = useLang();
  const data = props.data;
  const [form, setForm] = useState({ title: "", category: CATEGORIES[0].id, target: "" });
  const [suggestions, setSuggestions] = useState([]);
  const [suggesting, setSuggesting] = useState(false);
  const [error, setError] = useState("");

  function setField(k, v) {
    setForm(function (prev) {
      const next = Object.assign({}, prev);
      next[k] = v;
      return next;
    });
  }

  function addFromForm() {
    if (!form.title.trim()) { return; }
    props.addGoal({ title: form.title.trim(), category: form.category, target: form.target, actions: [] });
    setForm({ title: "", category: form.category, target: "" });
  }

  function changeGoal(g) {
    props.update(function (prev) {
      return { goals: prev.goals.map(function (x) { return x.id === g.id ? g : x; }) };
    });
  }

  function deleteGoal(id) {
    props.update(function (prev) {
      return { goals: prev.goals.filter(function (x) { return x.id !== id; }) };
    });
  }

  async function suggest() {
    setSuggesting(true);
    setError("");
    try {
      const wraps = data.sessions
        .filter(function (s) { return s.wrap; })
        .slice(0, 6)
        .map(function (s) { return "- " + s.wrap.insight; })
        .join("\n");
      const improvements = data.practice
        .slice(0, 6)
        .map(function (p) { return "- " + p.skill + ": " + ((p.feedback && p.feedback.improvements) || []).join("; "); })
        .join("\n");
      const current = data.goals.map(function (g) { return "- " + g.title; }).join("\n");
      const content = [
        "Participant role: staff member at UNFPA WCARO.",
        "Curriculum modules: " + props.modules.map(function (m) { return L(m, lang); }).join("; "),
        "Insights from coaching sessions:\n" + (wraps || "None yet."),
        "Improvement areas from practice feedback:\n" + (improvements || "None yet."),
        "Existing goals:\n" + (current || "None yet.")
      ].join("\n\n");
      const txt = await callClaude(suggestSystem(lang), [{ role: "user", content: content }]);
      const out = parseJSON(txt);
      setSuggestions(out.goals || []);
    } catch (e) {
      setError(aiError(t, e, "errSuggest").text);
    }
    setSuggesting(false);
  }

  function acceptSuggestion(i) {
    const s = suggestions[i];
    const valid = CATEGORIES.some(function (c) { return c.id === s.category; });
    props.addGoal({ title: s.title, category: valid ? s.category : "Leadership", why: s.why, actions: s.actions || [] });
    setSuggestions(suggestions.filter(function (x, j) { return j !== i; }));
  }

  const canShare = props.user.role === "participant";
  const doneCount = data.goals.filter(function (g) { return goalProgress(g) === 100; }).length;

  const el = (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {canShare ? (
        <Card style={{ padding: 14, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <div style={{ maxWidth: 620 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: C.ink }}>{t("shareTitle")}</div>
            <div style={{ fontSize: 13, color: C.muted, marginTop: 2, lineHeight: 1.45 }}>{t("shareSub")}</div>
          </div>
          <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 600, color: data.share ? C.green : C.muted, cursor: "pointer" }}>
            <input type="checkbox" checked={!!data.share} onChange={function (e) { props.setShare(e.target.checked); }} style={{ width: 18, height: 18, accentColor: C.green }} />
            {data.share ? t("shared") : t("notShared")}
          </label>
        </Card>
      ) : null}

      <div className="aic-two">
        <Card>
          <Heading title={t("addGoalTitle")} sub={t("addGoalSub")} />
          <div style={{ display: "grid", gap: 10 }}>
            <input style={INPUT} placeholder={t("goalPh")} value={form.title} onChange={function (e) { setField("title", e.target.value); }} />
            <div style={{ display: "flex", gap: 10 }}>
              <select style={INPUT} value={form.category} onChange={function (e) { setField("category", e.target.value); }} aria-label={t("category")}>
                {CATEGORIES.map(function (c) {
                  const opt = <option key={c.id} value={c.id}>{L(c.label, lang)}</option>;
                  return opt;
                })}
              </select>
              <input type="date" style={INPUT} value={form.target} onChange={function (e) { setField("target", e.target.value); }} aria-label={t("targetDate")} />
            </div>
            <div><Btn onClick={addFromForm} disabled={!form.title.trim()}>{t("addGoalBtn")}</Btn></div>
          </div>
        </Card>
        <Card>
          <Heading title={t("suggestTitle")} sub={t("suggestSub")} />
          <Btn kind="blue" onClick={suggest} disabled={suggesting}>{suggesting ? t("thinking") : t("suggestBtn")}</Btn>
          {error ? <div role="alert" style={{ color: C.red, fontSize: 13, marginTop: 8 }}>{error}</div> : null}
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 12 }}>
            {suggestions.map(function (s, i) {
              const row = (
                <div key={i} className="aic-reveal" style={{ border: "1px solid " + C.line, borderRadius: 10, padding: 12, background: C.bg }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: C.ink }}>{s.title}</div>
                  <div style={{ fontSize: 12, color: C.muted, margin: "3px 0 6px" }}>{categoryLabel(s.category, lang)}</div>
                  <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.45, marginBottom: 8 }}>{s.why}</div>
                  <Btn small onClick={function () { acceptSuggestion(i); }}>{t("addToPlanSmall")}</Btn>
                </div>
              );
              return row;
            })}
          </div>
        </Card>
      </div>

      <Card>
        <Heading title={t("planTitle")} sub={data.goals.length ? t("goalsDone", doneCount, data.goals.length) : t("noGoals")} />
        <div className="aic-two">
          {data.goals.map(function (g) {
            const item = <GoalItem key={g.id} goal={g} onChange={changeGoal} onDelete={function () { deleteGoal(g.id); }} />;
            return item;
          })}
        </div>
      </Card>
    </div>
  );
  return el;
}

/* ---------------- Progress tab ---------------- */

function Stat(props) {
  const el = (
    <Card style={{ padding: 14 }}>
      <div style={{ fontFamily: FONT_H, fontWeight: 800, fontSize: 26, color: props.color || C.dark, lineHeight: 1.1 }}>{props.value}</div>
      <div style={{ fontSize: 13, color: C.muted, marginTop: 4 }}>{props.label}</div>
    </Card>
  );
  return el;
}

function ProgressTab(props) {
  const t = useT();
  const lang = useLang();
  const data = props.data;
  const [wentWell, setWentWell] = useState("");
  const [challenge, setChallenge] = useState("");
  const [confidence, setConfidence] = useState(3);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const skills = skillAverages(data.practice);
  const done = data.goals.filter(function (g) { return goalProgress(g) === 100; }).length;
  const trend = data.practice.slice(0, 10).reverse();

  function saveCheckin() {
    if (!wentWell.trim() && !challenge.trim()) { return; }
    const c = { id: uid(), date: new Date().toISOString(), wentWell: wentWell.trim(), challenge: challenge.trim(), confidence: confidence };
    props.update(function (prev) { return { checkins: [c].concat(prev.checkins) }; });
    setWentWell("");
    setChallenge("");
    setConfidence(3);
  }

  async function makeInsight() {
    setBusy(true);
    setError("");
    try {
      const payload = {
        goals: data.goals.map(function (g) { return { title: g.title, progress: goalProgress(g) }; }),
        practiceAverages: skills,
        recentPractice: data.practice.slice(0, 5).map(function (p) { return { scenario: p.title, overall: p.feedback ? p.feedback.overall : null, improvements: p.feedback ? p.feedback.improvements : [] }; }),
        recentCheckins: data.checkins.slice(0, 4).map(function (c) { return { wentWell: c.wentWell, challenge: c.challenge, confidence: c.confidence }; }),
        sessionTakeaways: data.sessions.filter(function (s) { return s.wrap; }).slice(0, 4).map(function (s) { return s.wrap.insight; })
      };
      const txt = await callClaude(insightSystem(lang), [{ role: "user", content: JSON.stringify(payload) }]);
      props.update(function () { return { insight: { text: txt, date: new Date().toISOString() } }; });
    } catch (e) {
      setError(aiError(t, e, "errNote").text);
    }
    setBusy(false);
  }

  const el = (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div className="aic-stats">
        <Stat value={data.sessions.length} label={t("statSessions")} />
        <Stat value={data.practice.length} label={t("statPractice")} />
        <Stat value={done + "/" + data.goals.length} label={t("statGoals")} color={C.green} />
        <Stat value={skills.count ? skills.overall : "-"} label={t("statAvg")} color={C.orange} />
      </div>

      <div className="aic-two">
        <Card>
          <Heading title={t("skillTitle")} sub={skills.count ? t("skillSub", skills.count) : t("skillEmpty")} />
          {RUBRIC.map(function (r) {
            const row = <Bar key={r.id} label={L(r.label, lang)} value={skills[r.id]} max={10} display={skills.count ? skills[r.id] : "-"} />;
            return row;
          })}
          {trend.length > 1 ? (
            <div style={{ marginTop: 14 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: C.ink, marginBottom: 8 }}>{t("trend", trend.length)}</div>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 90, borderBottom: "1px solid " + C.line }}>
                {trend.map(function (p) {
                  const v = p.feedback ? Number(p.feedback.overall) || 0 : 0;
                  const col = (
                    <div key={p.id} title={p.title + ": " + v + "/10"} style={{ flex: 1, height: (v * 10) + "%", background: C.blue, borderRadius: "4px 4px 0 0", minWidth: 8 }} />
                  );
                  return col;
                })}
              </div>
            </div>
          ) : null}
        </Card>

        <Card>
          <Heading title={t("noteTitle")} sub={t("noteSub")} />
          {data.insight ? (
            <div style={{ fontSize: 14, color: C.ink, lineHeight: 1.65, whiteSpace: "pre-wrap", marginBottom: 12 }}>
              {data.insight.text}
              <div style={{ fontSize: 12, color: C.muted, marginTop: 8 }}>{t("written", fmtDate(data.insight.date, lang))}</div>
            </div>
          ) : null}
          <Btn kind="blue" onClick={makeInsight} disabled={busy}>{busy ? t("writing") : data.insight ? t("updateNote") : t("writeNote")}</Btn>
          {error ? <div role="alert" style={{ color: C.red, fontSize: 13, marginTop: 8 }}>{error}</div> : null}
        </Card>
      </div>

      <div className="aic-two">
        <Card>
          <Heading title={t("checkinTitle")} sub={t("checkinSub")} />
          <div style={{ display: "grid", gap: 10 }}>
            <textarea style={Object.assign({}, INPUT, { minHeight: 64 })} placeholder={t("wentWellPh")} value={wentWell} onChange={function (e) { setWentWell(e.target.value); }} />
            <textarea style={Object.assign({}, INPUT, { minHeight: 64 })} placeholder={t("challengePh")} value={challenge} onChange={function (e) { setChallenge(e.target.value); }} />
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: C.ink, marginBottom: 6 }}>{t("confidenceQ")}</div>
              <div style={{ display: "flex", gap: 6 }} role="group" aria-label={t("confidenceGroup")}>
                {[1, 2, 3, 4, 5].map(function (n) {
                  const on = n === confidence;
                  const b = (
                    <button key={n} type="button" aria-pressed={on} onClick={function () { setConfidence(n); }} style={{ width: 40, height: 40, borderRadius: 8, border: "1px solid " + (on ? C.orange : C.line), background: on ? C.orange : "#fff", color: on ? "#fff" : C.ink, fontWeight: 700, cursor: "pointer", fontFamily: FONT_B }}>{n}</button>
                  );
                  return b;
                })}
              </div>
            </div>
            <div><Btn onClick={saveCheckin} disabled={!wentWell.trim() && !challenge.trim()}>{t("saveCheckin")}</Btn></div>
          </div>
        </Card>
        <Card>
          <Heading title={t("pastCheckins")} />
          {data.checkins.length === 0 ? <div style={{ fontSize: 13, color: C.muted }}>{t("noCheckins")}</div> : null}
          <div style={{ display: "flex", flexDirection: "column", gap: 10, maxHeight: 360, overflowY: "auto" }}>
            {data.checkins.slice(0, 12).map(function (c) {
              const row = (
                <div key={c.id} style={{ borderBottom: "1px solid " + C.line, paddingBottom: 10 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: C.muted, marginBottom: 4 }}>
                    <span>{fmtDate(c.date, lang)}</span>
                    <span>{t("confidence", c.confidence)}</span>
                  </div>
                  {c.wentWell ? <div style={{ fontSize: 13, color: C.ink, lineHeight: 1.5 }}><strong>{t("wentWell")}</strong>{c.wentWell}</div> : null}
                  {c.challenge ? <div style={{ fontSize: 13, color: C.ink, lineHeight: 1.5, marginTop: 2 }}><strong>{t("hard")}</strong>{c.challenge}</div> : null}
                </div>
              );
              return row;
            })}
          </div>
        </Card>
      </div>
    </div>
  );
  return el;
}

/* ---------------- Mentor tab ---------------- */

function MentorTab() {
  const t = useT();
  const lang = useLang();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    setError("");
    try {
      const keys = await storeListKeys("coachplan:", true);
      const out = [];
      for (let i = 0; i < keys.length; i++) {
        const k = typeof keys[i] === "string" ? keys[i] : keys[i].key;
        const p = await loadData(k, true);
        if (p) { out.push(p); }
      }
      out.sort(function (a, b) { return String(b.updatedAt).localeCompare(String(a.updatedAt)); });
      const P = platform();
      if (P && P.profiles && out.length) {
        try {
          const ps = await P.profiles(out.map(function (p) { return p.username; }));
          out.forEach(function (p) {
            const pr = ps && ps[p.username];
            if (pr && pr.name) { p.name = pr.name; }
          });
        } catch (e) { /* keep stored names */ }
      }
      out.forEach(function (p) { if (!p.name) { p.name = t("participant"); } });
      setPlans(out);
    } catch (e) {
      setError(t("errMentor"));
    }
    setLoading(false);
  }

  useEffect(function () { load(); }, []);

  const el = (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Card style={{ padding: 14, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
        <div>
          <div style={{ fontFamily: FONT_H, fontWeight: 700, fontSize: 16, color: C.ink }}>{t("mentorTitle")}</div>
          <div style={{ fontSize: 13, color: C.muted, marginTop: 2 }}>{t("mentorSub")}</div>
        </div>
        <Btn kind="ghost" small onClick={load} disabled={loading}>{loading ? t("loadingShort") : t("refresh")}</Btn>
      </Card>
      {error ? <div role="alert" style={{ color: C.red, fontSize: 13 }}>{error}</div> : null}
      {!loading && plans.length === 0 && !error ? (
        <Card><div style={{ fontSize: 14, color: C.muted }}>{t("noShared")}</div></Card>
      ) : null}
      <div className="aic-two">
        {plans.map(function (p) {
          const s = p.skills || {};
          const card = (
            <Card key={p.username}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 10, marginBottom: 12 }}>
                <div>
                  <div style={{ fontFamily: FONT_H, fontWeight: 700, fontSize: 16, color: C.ink }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>{t("updated", fmtDate(p.updatedAt, lang))}</div>
                </div>
                <div style={{ textAlign: "right", fontSize: 12, color: C.muted, lineHeight: 1.6 }}>
                  <div>{t("nSessions", p.sessionCount)}</div>
                  <div>{t("nScenes", p.practiceCount)}</div>
                  {p.lastCheckin ? <div>{t("confidence", p.lastCheckin.confidence)}</div> : null}
                </div>
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, color: C.ink, marginBottom: 8 }}>{t("goals")}</div>
              {(p.goals || []).length === 0 ? <div style={{ fontSize: 13, color: C.muted, marginBottom: 10 }}>{t("noGoalsShort")}</div> : null}
              {(p.goals || []).map(function (g, i) {
                const row = <Bar key={i} label={g.title} value={g.progress} display={g.progress + "%"} color={g.progress === 100 ? C.green : C.orange} />;
                return row;
              })}
              {s.count ? (
                <div style={{ marginTop: 12 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: C.ink, marginBottom: 8 }}>{t("practiceAvg", s.overall)}</div>
                  {RUBRIC.map(function (r) {
                    const row = <Bar key={r.id} label={L(r.label, lang)} value={s[r.id]} max={10} display={s[r.id]} />;
                    return row;
                  })}
                </div>
              ) : null}
            </Card>
          );
          return card;
        })}
      </div>
    </div>
  );
  return el;
}

/* ---------------- Language switch ---------------- */

function LangSwitch(props) {
  const el = (
    <div role="group" aria-label={props.label} style={{ display: "inline-flex", border: "1px solid rgba(255,255,255,0.45)", borderRadius: 8, overflow: "hidden" }}>
      {["en", "fr"].map(function (code) {
        const on = code === props.value;
        const b = (
          <button
            key={code}
            type="button"
            aria-pressed={on}
            onClick={function () { props.onChange(code); }}
            style={{ border: "none", padding: "6px 12px", fontFamily: FONT_H, fontWeight: 700, fontSize: 13, cursor: "pointer", background: on ? "#fff" : "transparent", color: on ? C.dark : "#fff" }}
          >
            {code.toUpperCase()}
          </button>
        );
        return b;
      })}
    </div>
  );
  return el;
}

function VoiceToggle(props) {
  const t = useT();
  const available = props.stt || props.tts;
  const on = props.on && available;
  const el = (
    <button
      type="button"
      aria-pressed={on}
      disabled={!available}
      onClick={props.onToggle}
      title={available ? t("voiceLabel") : t("voiceUnsupported")}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        border: "1px solid " + (on ? C.orange : "rgba(255,255,255,0.45)"),
        background: on ? C.orange : "transparent",
        color: "#fff",
        borderRadius: 8,
        padding: "6px 12px",
        fontFamily: FONT_H,
        fontWeight: 700,
        fontSize: 13,
        cursor: available ? "pointer" : "not-allowed",
        opacity: available ? 1 : 0.5
      }}
    >
      <MicIcon size={15} />
      {on ? t("voiceOn") : t("voiceOff")}
    </button>
  );
  return el;
}

/* ---------------- Root ---------------- */

function CoachShell(props) {
  const t = useT();
  const lang = useLang();
  const user = props.user;
  const data = props.data;
  const [tab, setTab] = useState("coach");

  const tabs = [
    { id: "coach", label: t("tabCoach") },
    { id: "practice", label: t("tabPractice") },
    { id: "plan", label: t("tabPlan") },
    { id: "progress", label: t("tabProgress") }
  ];
  if (props.isMentor) { tabs.push({ id: "mentor", label: t("tabMentor") }); }

  let body = null;
  if (!props.loaded) {
    body = <Card><div style={{ fontSize: 14, color: C.muted }}>{t("loading")}</div></Card>;
  } else if (tab === "coach") {
    body = <CoachTab user={user} modules={props.modules} data={data} update={props.update} addGoal={props.addGoal} />;
  } else if (tab === "practice") {
    body = <PracticeTab user={user} data={data} update={props.update} />;
  } else if (tab === "plan") {
    body = <PlanTab user={user} modules={props.modules} data={data} update={props.update} addGoal={props.addGoal} setShare={props.setShare} />;
  } else if (tab === "progress") {
    body = <ProgressTab user={user} data={data} update={props.update} />;
  } else if (tab === "mentor") {
    body = <MentorTab />;
  }

  const firstName = String(user.name || "").replace(/^[A-Z]\.\s*/, "").split(" ")[0] || "";
  const saveText = props.saveState ? t(props.saveState) : "";

  const el = (
    <div className="aic-root" lang={lang} style={{ fontFamily: FONT_B, color: C.ink, background: props.embedded ? "transparent" : C.bg, padding: props.embedded ? 0 : 20, borderRadius: 14, minHeight: 600 }}>
      <style>{CSS}</style>
      <div style={{ background: C.dark, borderRadius: 14, padding: "22px 24px", color: "#fff", marginBottom: 16, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", right: -40, top: -40, width: 180, height: 180, borderRadius: "50%", border: "18px solid " + C.orange, opacity: 0.9 }} />
        <div style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, flexWrap: "wrap" }}>
          <div style={{ maxWidth: 620 }}>
            <div style={{ fontFamily: FONT_D, fontWeight: 600, fontSize: 28, lineHeight: 1.15 }}>{t("title")}</div>
            <div style={{ fontSize: 14, opacity: 0.88, marginTop: 6, lineHeight: 1.55 }}>{t("hello", firstName)}</div>
            <div style={{ fontSize: 12, opacity: 0.7, marginTop: 10 }}>{saveText}</div>
          </div>
          <div style={{ marginRight: 70, display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
            <VoiceToggle on={props.voiceOn} stt={props.voiceSupport.stt} tts={props.voiceSupport.tts} onToggle={props.toggleVoice} />
            {props.hideLangSwitch ? null : <LangSwitch value={lang} onChange={props.setLang} label={t("language")} />}
          </div>
        </div>
      </div>
      <div role="tablist" style={{ display: "flex", gap: 4, marginBottom: 16, borderBottom: "1px solid " + C.line, overflowX: "auto" }}>
        {tabs.map(function (tb) {
          const on = tb.id === tab;
          const b = (
            <button
              key={tb.id}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={function () { setTab(tb.id); }}
              style={{ border: "none", background: "transparent", padding: "10px 14px", fontFamily: FONT_H, fontWeight: 700, fontSize: 14, color: on ? C.dark : C.muted, borderBottom: "3px solid " + (on ? C.orange : "transparent"), marginBottom: -1, cursor: "pointer", whiteSpace: "nowrap" }}
            >
              {tb.label}
            </button>
          );
          return b;
        })}
      </div>
      {body}
      <div style={{ fontSize: 12, color: C.muted, marginTop: 16, lineHeight: 1.5 }}>{t("footer")}</div>
    </div>
  );
  return el;
}

export default function AICoachModule(props) {
  const user = props.currentUser || { username: "mbagayoko", name: "M. Bagayoko", role: "participant" };
  const modules = props.modules && props.modules.length ? props.modules : DEFAULT_MODULES;
  const startLang = props.language === "fr" ? "fr" : "en";
  const controlledLang = typeof props.onLanguageChange === "function";
  const userKey = "coach:" + safeKey(user.username);
  const sharedKey = "coachplan:" + safeKey(user.username);
  const isMentor = typeof props.showMentorView === "boolean" ? props.showMentorView : (user.role === "mentor" || user.role === "admin");

  const [data, setData] = useState(EMPTY);
  const [loaded, setLoaded] = useState(false);
  const [saveState, setSaveState] = useState("");
  const [voiceSupport] = useState(function () {
    return { stt: !!getRecognitionCtor(), tts: hasTTS() };
  });

  useEffect(function () {
    if (!voiceSupport.tts) { return undefined; }
    window.speechSynthesis.getVoices();
    const handler = function () { window.speechSynthesis.getVoices(); };
    window.speechSynthesis.addEventListener && window.speechSynthesis.addEventListener("voiceschanged", handler);
    return function () {
      window.speechSynthesis.removeEventListener && window.speechSynthesis.removeEventListener("voiceschanged", handler);
      stopSpeech();
    };
  }, []);

  useEffect(function () {
    let alive = true;
    setLoaded(false);
    loadData(userKey, false).then(function (d) {
      if (!alive) { return; }
      setData(Object.assign({}, EMPTY, d || {}));
      setLoaded(true);
    });
    return function () { alive = false; };
  }, [userKey]);

  useEffect(function () {
    if (!loaded) { return undefined; }
    setSaveState("saving");
    const timer = setTimeout(function () {
      saveData(userKey, trimForStorage(data), false).then(function (ok) {
        setSaveState(ok ? "saved" : "notSaved");
      });
      if (data.share) { saveData(sharedKey, buildShared(user, data), true); }
    }, 700);
    return function () { clearTimeout(timer); };
  }, [data, loaded]);

  function update(fn) {
    setData(function (prev) { return Object.assign({}, prev, fn(prev)); });
  }

  function addGoal(g) {
    const goal = {
      id: uid(),
      title: g.title,
      category: g.category || "Leadership",
      target: g.target || "",
      why: g.why || "",
      progress: 0,
      createdAt: new Date().toISOString(),
      actions: (g.actions || []).map(function (a) { return { id: uid(), text: a, done: false }; })
    };
    update(function (prev) { return { goals: [goal].concat(prev.goals) }; });
  }

  function setShare(v) {
    update(function () { return { share: v }; });
    if (!v) { removeData(sharedKey, true); }
  }

  function setLang(code) {
    stopSpeech();
    if (controlledLang) {
      props.onLanguageChange(code);
      return;
    }
    update(function () { return { lang: code }; });
  }

  function toggleVoice() {
    if (data.voice) { stopSpeech(); }
    update(function (prev) { return { voice: !prev.voice }; });
  }

  const lang = controlledLang ? startLang : (data.lang || startLang);

  useEffect(function () { stopSpeech(); }, [lang]);
  const voiceOn = !!data.voice && (voiceSupport.stt || voiceSupport.tts);
  const voiceValue = { on: voiceOn, stt: voiceSupport.stt, tts: voiceSupport.tts };
  const portalValue = {
    map: props.portalMap || "",
    navigate: props.onNavigate || null,
    label: props.navLabel || null,
    ready: props.aiReady !== false,
    connect: props.onConnect || null
  };

  const el = (
    <PortalCtx.Provider value={portalValue}>
    <LangCtx.Provider value={lang}>
      <VoiceCtx.Provider value={voiceValue}>
      <CoachShell
        user={user}
        modules={modules}
        data={data}
        loaded={loaded}
        isMentor={isMentor}
        saveState={saveState}
        update={update}
        addGoal={addGoal}
        setShare={setShare}
        setLang={setLang}
        hideLangSwitch={controlledLang}
        embedded={!!props.embedded}
        voiceOn={voiceOn}
        voiceSupport={voiceSupport}
        toggleVoice={toggleVoice}
      />
      </VoiceCtx.Provider>
    </LangCtx.Provider>
    </PortalCtx.Provider>
  );
  return el;
}
