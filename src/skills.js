// Skill modules in the Personal Development tab: meeting facilitation (from
// agenda to follow-up, including note-taking and wrap-up) and master of
// ceremonies (from briefing to closing). Tips and phrases are our own
// guidance; resources were checked live on 2026-10-14 (TED durations from the
// talk pages). Quotes: `verified` ones were checked against the source text,
// "Widely attributed" ones circulate without one fixed source.
//   stage: id (progress key), title, goal, tips, say (sample phrases)
//   templates: copyable text (EN/FR)
//   resources: t, u (optional for books), by, kind video|article|tool|book

import { MONEY } from "./money.js";

const ted = slug => "https://www.ted.com/talks/" + slug;

export const SKILLS = [
  {
    id: "facilitation",
    title: { en: "Meeting facilitation", fr: "Animation de réunions" },
    sub: {
      en: "Run meetings that produce decisions: design the agenda, open well, guide the discussion, capture notes, wrap up and follow through.",
      fr: "Animez des réunions qui aboutissent à des décisions : concevoir l'ordre du jour, bien ouvrir, guider les échanges, prendre des notes, conclure et assurer le suivi."
    },
    stages: [
      {
        id: "fac-prep",
        title: { en: "Before: purpose and agenda", fr: "Avant : objectif et ordre du jour" },
        goal: { en: "Know why the meeting exists, what it must produce and who needs to be there.", fr: "Savoir pourquoi la réunion existe, ce qu'elle doit produire et qui doit y être." },
        tips: {
          en: [
            "Write the purpose in one sentence and the outcomes as things: \"a decision on…\", \"a list of…\", \"agreement on…\". If there is no outcome, send an email instead.",
            "Phrase agenda items as questions the group must answer (\"Which two districts do we prioritise?\"), each with a time and a lead.",
            "Invite only the people needed to decide or contribute; share the notes with everyone else.",
            "Assign roles in advance: facilitator, note-taker, timekeeper and, in hybrid meetings, someone who follows the chat and remote participants.",
            "Send the agenda and pre-reads at least 48 hours ahead, with the one question you want people to think about.",
            "Plan for language and access: EN/FR interpretation, documents in both languages where possible, captions, accessible rooms and links.",
            "Check the room and technology 15 minutes early: camera, microphone, screen sharing, seating."
          ],
          fr: [
            "Écrivez l'objectif en une phrase et les résultats attendus comme des livrables : « une décision sur… », « une liste de… », « un accord sur… ». S'il n'y a pas de résultat attendu, envoyez plutôt un courriel.",
            "Formulez les points de l'ordre du jour comme des questions auxquelles le groupe doit répondre (« Quels deux districts prioriser ? »), chacun avec une durée et un responsable.",
            "N'invitez que les personnes nécessaires pour décider ou contribuer ; partagez le compte rendu avec les autres.",
            "Attribuez les rôles à l'avance : animateur, preneur de notes, gardien du temps et, en réunion hybride, une personne qui suit le chat et les participants à distance.",
            "Envoyez l'ordre du jour et les documents au moins 48 heures avant, avec la question sur laquelle vous voulez que chacun réfléchisse.",
            "Prévoyez la langue et l'accessibilité : interprétation EN/FR, documents dans les deux langues si possible, sous-titres, salles et liens accessibles.",
            "Vérifiez la salle et la technique 15 minutes avant : caméra, micro, partage d'écran, disposition."
          ]
        },
        say: {
          en: ["\"The purpose of this meeting is…; by the end we will have…\"", "\"Please read the two-page note before Thursday and come with your answer to one question: …\"", "\"Could you take the notes / keep time for us today?\""],
          fr: ["« Cette réunion a pour objectif… ; à la fin, nous aurons… »", "« Merci de lire la note de deux pages avant jeudi et de venir avec votre réponse à une question : … »", "« Pourriez-vous prendre les notes / gérer le temps aujourd'hui ? »"]
        }
      },
      {
        id: "fac-open",
        title: { en: "Opening: the first five minutes", fr: "Ouverture : les cinq premières minutes" },
        goal: { en: "Set direction, agreements and energy so the group can work.", fr: "Donner le cap, les règles et l'énergie pour que le groupe puisse travailler." },
        tips: {
          en: [
            "Start on time, even if some people are missing; it rewards those who came on time.",
            "Restate the purpose, outcomes and agenda, and check them with the group: \"Anything missing?\"",
            "Agree working norms: one voice at a time, phones down, cameras on where possible, and the Chatham House Rule if the topic is sensitive.",
            "Name the roles (note-taker, timekeeper) and say how decisions will be made: consensus, consultation then the lead decides, or a vote.",
            "Use a quick check-in so every voice is heard early: one word, or one expectation.",
            "In hybrid meetings, greet remote participants first and by name."
          ],
          fr: [
            "Commencez à l'heure, même s'il manque des personnes : cela récompense celles qui sont ponctuelles.",
            "Rappelez l'objectif, les résultats attendus et l'ordre du jour, et validez-les avec le groupe : « Manque-t-il quelque chose ? »",
            "Convenez de règles de travail : une personne parle à la fois, téléphones rangés, caméras allumées si possible, et la règle de Chatham House si le sujet est sensible.",
            "Présentez les rôles (preneur de notes, gardien du temps) et le mode de décision : consensus, consultation puis décision du responsable, ou vote.",
            "Faites un tour d'inclusion rapide pour que chacun s'exprime tôt : un mot, ou une attente.",
            "En réunion hybride, saluez d'abord les participants à distance, par leur nom."
          ]
        },
        say: {
          en: ["\"Welcome. We have 60 minutes, and by the end we want…\"", "\"On decisions: we'll discuss together, and [name] will decide before we close.\"", "\"A quick round: in one word, how are you arriving today?\""],
          fr: ["« Bienvenue. Nous avons 60 minutes et, à la fin, nous voulons… »", "« Pour les décisions : nous en discutons ensemble, et [nom] tranchera avant la fin. »", "« Un tour rapide : en un mot, dans quel état d'esprit arrivez-vous ? »"]
        }
      },
      {
        id: "fac-run",
        title: { en: "During: guide the discussion", fr: "Pendant : guider les échanges" },
        goal: { en: "Keep the conversation focused, fair and moving toward the outcomes.", fr: "Garder des échanges ciblés, équitables et orientés vers les résultats." },
        tips: {
          en: [
            "Stay neutral on content while you facilitate; if you want to give a view, say you are stepping out of the role.",
            "Paraphrase and summarise often: it shows listening and keeps the group aligned.",
            "Use structures that include every voice: a round, 1-2-4-All (alone, pairs, fours, whole group) or silent writing before discussion.",
            "Ask the most senior people to speak last on key questions so others speak freely.",
            "Keep a \"parking lot\" for useful points that are off topic, and return to it before closing.",
            "Keep time out loud: \"We have ten minutes left on this item.\"",
            "When many want to speak, keep a speaking list, and invite quieter people by name, gently."
          ],
          fr: [
            "Restez neutre sur le fond quand vous animez ; si vous voulez donner votre avis, dites que vous sortez de votre rôle.",
            "Reformulez et résumez souvent : cela montre votre écoute et garde le groupe aligné.",
            "Utilisez des formats qui donnent la parole à tous : un tour de table, 1-2-4-Tous (seul, à deux, à quatre, en plénière) ou l'écriture silencieuse avant la discussion.",
            "Demandez aux personnes les plus haut placées de parler en dernier sur les questions clés, pour libérer la parole des autres.",
            "Tenez un « parking » pour les points utiles mais hors sujet, et revenez-y avant de conclure.",
            "Gérez le temps à voix haute : « Il nous reste dix minutes sur ce point. »",
            "Quand beaucoup veulent parler, tenez une liste des intervenants et invitez les plus discrets par leur nom, avec délicatesse."
          ]
        },
        say: {
          en: ["\"Let me check I've understood: you're saying… Is that right?\"", "\"We haven't heard from the field offices yet. [Name], what's your view?\"", "\"That's important; I'll put it in the parking lot so we can finish this decision.\""],
          fr: ["« Je vérifie que j'ai bien compris : vous dites que… C'est bien cela ? »", "« Nous n'avons pas encore entendu les bureaux de terrain. [Nom], quel est votre avis ? »", "« C'est important ; je le mets au parking pour que nous terminions cette décision. »"]
        }
      },
      {
        id: "fac-hard",
        title: { en: "Difficult moments", fr: "Moments difficiles" },
        goal: { en: "Handle silence, conflict and derailment without losing the group.", fr: "Gérer silences, conflits et dérapages sans perdre le groupe." },
        tips: {
          en: [
            "Silence after a question is normal; count to seven before you rephrase.",
            "When one person dominates, thank them, summarise their point and open the floor: \"Let's hear other views.\"",
            "Name a disagreement neutrally and separate positions from interests: what does each side need?",
            "When the discussion drifts, bring it back to the agreed purpose.",
            "If emotions run high, slow down, acknowledge them and offer a short break.",
            "If the technology fails, switch to the back-up (phone line, shared document) and say clearly what happens next."
          ],
          fr: [
            "Le silence après une question est normal : comptez jusqu'à sept avant de reformuler.",
            "Quand une personne monopolise la parole, remerciez-la, résumez son point et ouvrez : « Écoutons d'autres points de vue. »",
            "Nommez un désaccord de façon neutre et distinguez positions et intérêts : de quoi chaque partie a-t-elle besoin ?",
            "Quand la discussion dérive, ramenez-la à l'objectif convenu.",
            "Si les émotions montent, ralentissez, reconnaissez-les et proposez une courte pause.",
            "Si la technique lâche, passez à la solution de secours (ligne téléphonique, document partagé) et dites clairement la suite."
          ]
        },
        say: {
          en: ["\"I'm hearing two different views. Let's set out what each one needs.\"", "\"Thank you, [name]. I'd like to hear from people who haven't spoken yet.\"", "\"Let's take five minutes and come back at 10:40.\""],
          fr: ["« J'entends deux points de vue différents. Posons ce dont chacun a besoin. »", "« Merci, [nom]. J'aimerais entendre celles et ceux qui ne se sont pas encore exprimés. »", "« Prenons cinq minutes et reprenons à 10 h 40. »"]
        }
      },
      {
        id: "fac-notes",
        title: { en: "Note-taking", fr: "Prise de notes" },
        goal: { en: "Capture decisions and actions, not a transcript.", fr: "Consigner les décisions et les actions, pas une transcription." },
        tips: {
          en: [
            "Capture decisions, actions (who, what, by when), key arguments and open questions; you don't need every word.",
            "Use the same template every time so readers know where to look: decisions first, then actions, then a short summary.",
            "Give every action an owner and a date; \"the team will follow up\" is not an action.",
            "Where possible, show the notes on screen during the meeting so errors are corrected live.",
            "Write neutrally and factually, and respect the agreed attribution rule (on the record or Chatham House).",
            "For your own notes, try the Cornell method: notes on the right, key questions on the left, a summary at the bottom.",
            "Mark sensitive information and store it according to your office's rules."
          ],
          fr: [
            "Consignez les décisions, les actions (qui, quoi, pour quand), les arguments clés et les questions ouvertes ; inutile de tout noter.",
            "Utilisez toujours le même modèle pour que les lecteurs sachent où regarder : décisions d'abord, puis actions, puis un bref résumé.",
            "Donnez à chaque action un responsable et une date ; « l'équipe assurera le suivi » n'est pas une action.",
            "Si possible, projetez les notes pendant la réunion pour corriger les erreurs en direct.",
            "Rédigez de façon neutre et factuelle, en respectant la règle d'attribution convenue (officielle ou Chatham House).",
            "Pour vos notes personnelles, essayez la méthode Cornell : notes à droite, questions clés à gauche, résumé en bas.",
            "Signalez les informations sensibles et conservez-les selon les règles de votre bureau."
          ]
        },
        say: {
          en: ["\"For the notes: the decision is… Is that wording right?\"", "\"Who owns this action, and by when?\"", "\"Can I record that as agreed, or is it still open?\""],
          fr: ["« Pour le compte rendu : la décision est… La formulation vous convient-elle ? »", "« Qui porte cette action, et pour quand ? »", "« Puis-je noter que c'est convenu, ou est-ce encore ouvert ? »"]
        }
      },
      {
        id: "fac-wrap",
        title: { en: "Wrap-up: the last ten minutes", fr: "Conclusion : les dix dernières minutes" },
        goal: { en: "Leave with shared clarity on what was decided and what happens next.", fr: "Repartir avec une compréhension commune de ce qui a été décidé et de la suite." },
        tips: {
          en: [
            "Protect the last ten minutes; don't let the final agenda item eat them.",
            "Summarise the decisions and read the actions aloud: who, what, by when.",
            "Clear the parking lot: deal with each item, assign it or schedule it.",
            "Check commitment: \"Is there anything anyone can't commit to?\"",
            "Ask for a quick evaluation: one thing that worked, one thing to change next time.",
            "Thank people for specific contributions, and end on time or early."
          ],
          fr: [
            "Protégez les dix dernières minutes ; ne laissez pas le dernier point les absorber.",
            "Résumez les décisions et lisez les actions à voix haute : qui, quoi, pour quand.",
            "Videz le parking : traitez chaque point, confiez-le à quelqu'un ou planifiez-le.",
            "Vérifiez l'engagement : « Y a-t-il quelque chose sur lequel quelqu'un ne peut pas s'engager ? »",
            "Demandez une évaluation rapide : une chose qui a bien marché, une chose à changer la prochaine fois.",
            "Remerciez pour des contributions précises, et terminez à l'heure, voire en avance."
          ]
        },
        say: {
          en: ["\"Before we close, let's confirm what we decided…\"", "\"Let me read back the actions: [name] will… by [date].\"", "\"One thing that worked today, and one thing we should change?\""],
          fr: ["« Avant de conclure, confirmons ce que nous avons décidé… »", "« Je relis les actions : [nom] va… d'ici le [date]. »", "« Une chose qui a bien marché aujourd'hui, et une chose à changer ? »"]
        }
      },
      {
        id: "fac-next",
        title: { en: "Next steps and follow-up", fr: "Prochaines étapes et suivi" },
        goal: { en: "Turn decisions into action and close the loop.", fr: "Transformer les décisions en actions et boucler la boucle." },
        tips: {
          en: [
            "Send the notes within 24 hours, with decisions and actions at the top.",
            "Keep one shared action tracker instead of scattering actions across emails.",
            "Remind owners before deadlines, not after.",
            "Open the next meeting by reviewing the previous actions: done, on track or stuck.",
            "Tell people who were not in the room what affects them.",
            "Every few months, review your regular meetings: which can be shorter, less frequent or replaced?"
          ],
          fr: [
            "Envoyez le compte rendu dans les 24 heures, décisions et actions en tête.",
            "Tenez un seul tableau de suivi partagé au lieu de disperser les actions dans les courriels.",
            "Relancez les responsables avant les échéances, pas après.",
            "Ouvrez la réunion suivante en passant en revue les actions précédentes : faites, en cours ou bloquées.",
            "Informez les personnes absentes de ce qui les concerne.",
            "Tous les quelques mois, réexaminez vos réunions régulières : lesquelles raccourcir, espacer ou remplacer ?"
          ]
        },
        say: {
          en: ["\"Attached are the notes; the three decisions and five actions are at the top.\"", "\"A quick reminder: the budget revision is due on Friday. Any blockers?\"", "\"Let's start with last week's actions: done, on track or stuck?\""],
          fr: ["« Vous trouverez le compte rendu ci-joint ; les trois décisions et cinq actions sont en tête. »", "« Petit rappel : la révision budgétaire est attendue vendredi. Des obstacles ? »", "« Commençons par les actions de la semaine dernière : faites, en cours ou bloquées ? »"]
        }
      }
    ],
    templates: [
      {
        title: { en: "Agenda template", fr: "Modèle d'ordre du jour" },
        text: {
          en: `MEETING: [title]                DATE / TIME: [ ] ([duration])
PURPOSE: [one sentence]
OUTCOMES – by the end we will have:
  1. [a decision on …]
  2. [a list of …]
ROLES: Facilitator [ ] · Note-taker [ ] · Timekeeper [ ] · Chat/remote [ ]
PRE-READ: [document] – question to consider: [ ]
LANGUAGES: [EN/FR, interpretation?]   RULE: [on the record / Chatham House]

TIME   ITEM (as a question)                        LEAD    METHOD
0:00   Welcome, purpose, check-in                  [ ]     Round
0:05   [Question 1?]                               [ ]     Discuss → decide
0:25   [Question 2?]                               [ ]     1-2-4-All
0:50   Wrap-up: decisions, actions, parking lot    Facil.
0:55   Evaluation and close`,
          fr: `RÉUNION : [titre]               DATE / HEURE : [ ] ([durée])
OBJECTIF : [une phrase]
RÉSULTATS – à la fin, nous aurons :
  1. [une décision sur …]
  2. [une liste de …]
RÔLES : Animation [ ] · Notes [ ] · Temps [ ] · Chat/distance [ ]
À LIRE : [document] – question à préparer : [ ]
LANGUES : [EN/FR, interprétation ?]   RÈGLE : [officielle / Chatham House]

HEURE  POINT (sous forme de question)              RESP.   MÉTHODE
0:00   Accueil, objectif, tour d'inclusion         [ ]     Tour de table
0:05   [Question 1 ?]                              [ ]     Discuter → décider
0:25   [Question 2 ?]                              [ ]     1-2-4-Tous
0:50   Conclusion : décisions, actions, parking    Anim.
0:55   Évaluation et clôture`
        }
      },
      {
        title: { en: "Meeting notes and action log", fr: "Compte rendu et suivi des actions" },
        text: {
          en: `NOTES – [meeting] – [date]
Present: [ ]     Apologies: [ ]     Note-taker: [ ]
Rule: [on the record / Chatham House Rule]

DECISIONS
1. [ ]
2. [ ]

ACTIONS
#   Action                         Owner      Due        Status
1   [ ]                            [ ]        [dd/mm]    Open
2   [ ]                            [ ]        [dd/mm]    Open

KEY POINTS (summary, not a transcript)
- Item 1: [ ]
- Item 2: [ ]

OPEN QUESTIONS / PARKING LOT
- [ ] → [owner / next meeting]

NEXT MEETING: [date]`,
          fr: `COMPTE RENDU – [réunion] – [date]
Présents : [ ]     Excusés : [ ]     Notes : [ ]
Règle : [officielle / règle de Chatham House]

DÉCISIONS
1. [ ]
2. [ ]

ACTIONS
#   Action                         Responsable  Échéance   Statut
1   [ ]                            [ ]          [jj/mm]    Ouverte
2   [ ]                            [ ]          [jj/mm]    Ouverte

POINTS CLÉS (résumé, pas une transcription)
- Point 1 : [ ]
- Point 2 : [ ]

QUESTIONS OUVERTES / PARKING
- [ ] → [responsable / prochaine réunion]

PROCHAINE RÉUNION : [date]`
        }
      },
      {
        title: { en: "Wrap-up script", fr: "Script de conclusion" },
        text: {
          en: `"We have ten minutes left, so let's wrap up.
1. Decisions – today we agreed: [read each]. Is that accurate?
2. Actions – [name] will [action] by [date]… Anything missing?
3. Parking lot – [item] goes to [owner / next meeting].
4. Evaluation – one thing that worked, one thing to change?
5. Next steps – notes will go out by [time tomorrow]; next meeting [date].
Thank you, especially for [specific contribution]. We'll close on time."`,
          fr: `« Il nous reste dix minutes : concluons.
1. Décisions – aujourd'hui, nous avons convenu : [lire chacune]. Est-ce exact ?
2. Actions – [nom] va [action] d'ici le [date]… Manque-t-il quelque chose ?
3. Parking – [point] est confié à [responsable / prochaine réunion].
4. Évaluation – une chose qui a bien marché, une chose à changer ?
5. Suite – le compte rendu partira d'ici [heure demain] ; prochaine réunion le [date].
Merci, en particulier pour [contribution précise]. Nous terminons à l'heure. »`
        }
      }
    ],
    quotes: [
      { text: "When a meeting, or part thereof, is held under the Chatham House Rule, participants are free to use the information received, but neither the identity nor the affiliation of the speaker(s), nor that of any other participant, may be revealed.", fr: "Lorsqu'une réunion, ou une partie de celle-ci, se tient sous la règle de Chatham House, les participants sont libres d'utiliser les informations reçues, mais ni l'identité ni l'affiliation des intervenants, ni celles de tout autre participant, ne peuvent être révélées.", by: "Chatham House", source: "The Chatham House Rule (checked on chathamhouse.org)" },
      { text: "Meetings are by definition a concession to deficient organization. For one either meets or one works. One cannot do both at the same time.", fr: "Les réunions sont par définition une concession à une organisation déficiente. Car soit on se réunit, soit on travaille. On ne peut pas faire les deux à la fois.", by: "Peter Drucker", source: "The Effective Executive, 1967" },
      { text: "The way we gather matters.", fr: "La façon dont nous nous réunissons compte.", by: "Priya Parker", source: "The Art of Gathering, 2018" },
      { text: "Seek first to understand, then to be understood.", fr: "Cherchez d'abord à comprendre, ensuite à être compris.", by: "Stephen R. Covey", source: "The 7 Habits of Highly Effective People, 1989" },
      { text: "Plans are worthless, but planning is everything.", fr: "Les plans ne valent rien, mais la planification est tout.", by: "Dwight D. Eisenhower", source: "Speech to the National Defense Executive Reserve Conference, 1957" },
      { text: "Their work was done and their undertakings were successful, while the people all said, 'We are as we are, of ourselves!'", fr: "L'œuvre était accomplie et les entreprises réussies, et le peuple disait : « Nous sommes ainsi par nous-mêmes ! »", by: "Lao Tzu", source: "Tao Te Ching, ch. 17, trans. Legge (verified)" },
      { text: "The most important thing in communication is hearing what isn't said.", fr: "Le plus important dans la communication, c'est d'entendre ce qui n'est pas dit.", by: "Peter Drucker", source: "Widely attributed" },
      { text: "If you want to go fast, go alone; if you want to go far, go together.", fr: "Seul on va plus vite, ensemble on va plus loin.", by: "Proverb", source: "Widely described as African" }
    ],
    resources: [
      { t: "David Grady: How to save the world (or at least yourself) from bad meetings", u: ted("david_grady_how_to_save_the_world_or_at_least_yourself_from_bad_meetings"), by: "TED · 7 min", kind: "video" },
      { t: "Priya Parker: 3 steps to turn everyday get-togethers into transformative gatherings", u: ted("priya_parker_3_steps_to_turn_everyday_get_togethers_into_transformative_gatherings"), by: "TED · 10 min", kind: "video" },
      { t: "How to Design an Agenda for an Effective Meeting (Roger Schwarz, 2015)", u: "https://hbr.org/2015/03/how-to-design-an-agenda-for-an-effective-meeting", by: "Harvard Business Review", kind: "article" },
      { t: "Stop the Meeting Madness (Perlow, Hadley and Eun, 2017)", u: "https://hbr.org/2017/07/stop-the-meeting-madness", by: "Harvard Business Review", kind: "article" },
      { t: "How to Run a Great Virtual Meeting (Keith Ferrazzi, 2015)", u: "https://hbr.org/2015/03/how-to-run-a-great-virtual-meeting", by: "Harvard Business Review", kind: "article" },
      { t: "What It Takes to Run a Great Hybrid Meeting (Frisch and Greene, 2021)", u: "https://hbr.org/2021/06/what-it-takes-to-run-a-great-hybrid-meeting", by: "Harvard Business Review", kind: "article" },
      { t: "Liberating Structures: 43 facilitation methods that include every voice", u: "https://www.liberatingstructures.com/ls-menu/", by: "Liberating Structures", kind: "tool" },
      { t: "1-2-4-All: engage everyone at once", u: "https://www.liberatingstructures.com/1-1-2-4-all/", by: "Liberating Structures", kind: "tool" },
      { t: "DACI: a decision-making framework", u: "https://www.atlassian.com/team-playbook/plays/daci", by: "Atlassian Team Playbook", kind: "tool" },
      { t: "Retrospective: review what worked and what to change", u: "https://www.atlassian.com/team-playbook/plays/retrospective", by: "Atlassian Team Playbook", kind: "tool" },
      { t: "Facilitating meetings (free guide)", u: "https://www.seedsforchange.org.uk/facilitationmeeting", by: "Seeds for Change", kind: "tool" },
      { t: "The Cornell note-taking system", u: "https://lsc.cornell.edu/how-to-study/taking-notes/cornell-note-taking-system/", by: "Cornell Learning Strategies Center", kind: "tool" },
      { t: "The Chatham House Rule", u: "https://www.chathamhouse.org/about-us/chatham-house-rule", by: "Chatham House", kind: "tool" },
      { t: "Facilitator's Guide to Participatory Decision-Making, 3rd ed. (Sam Kaner and colleagues, 2014)", by: "Jossey-Bass", kind: "book" },
      { t: "The Skilled Facilitator, 3rd ed. (Roger Schwarz, 2017)", by: "Jossey-Bass", kind: "book" },
      { t: "The Art of Gathering (Priya Parker, 2018)", by: "Riverhead", kind: "book" },
      { t: "Death by Meeting (Patrick Lencioni, 2004)", by: "Jossey-Bass", kind: "book" },
      { t: "Robert's Rules of Order (Henry M. Robert), free public-domain edition", u: "https://www.gutenberg.org/ebooks/9097", by: "Project Gutenberg", kind: "book" }
    ]
  },
  {
    id: "mc",
    title: { en: "Master of ceremonies", fr: "Maître de cérémonie" },
    sub: {
      en: "Host an event from first welcome to final word: brief, open, introduce speakers, keep time, handle surprises and close with energy.",
      fr: "Animez un événement du premier mot d'accueil au mot de la fin : préparer, ouvrir, présenter les orateurs, tenir le temps, gérer les imprévus et clôturer avec énergie."
    },
    stages: [
      {
        id: "mc-brief",
        title: { en: "Preparation and briefing", fr: "Préparation et briefing" },
        goal: { en: "Know the purpose, audience, programme and protocol before you write a word.", fr: "Connaître l'objectif, le public, le programme et le protocole avant d'écrire un mot." },
        tips: {
          en: [
            "Meet the organiser: purpose, audience, tone (formal, celebratory, technical), dress code and language(s).",
            "Get the final programme and build a minute-by-minute run of show with every speaker, transition, video and break.",
            "Confirm the order of protocol with the organiser or protocol office; titles and precedence vary by country and event.",
            "Collect names, titles and short bios; check pronunciation with each person or their office and write it phonetically on your cards.",
            "Write your script on cards or a tablet in large type: opening, introductions, transitions, closing, plus spare material for delays.",
            "Rehearse in the venue: microphone, lectern, path to the stage, slides, sound cues, interpretation booths.",
            "Agree time signals with speakers (5 minutes, 1 minute, stop) and a plan if a dignitary is late."
          ],
          fr: [
            "Rencontrez l'organisateur : objectif, public, ton (officiel, festif, technique), tenue et langue(s).",
            "Obtenez le programme final et construisez un déroulé minute par minute avec chaque orateur, transition, vidéo et pause.",
            "Confirmez l'ordre protocolaire avec l'organisateur ou le service du protocole ; titres et préséances varient selon les pays et les événements.",
            "Rassemblez noms, titres et courtes biographies ; vérifiez la prononciation avec chaque personne ou son cabinet et notez-la phonétiquement sur vos fiches.",
            "Écrivez votre script sur fiches ou tablette en gros caractères : ouverture, présentations, transitions, clôture, et du contenu de réserve en cas de retard.",
            "Répétez sur place : micro, pupitre, accès à la scène, diapositives, signaux sonores, cabines d'interprétation.",
            "Convenez de signaux de temps avec les orateurs (5 minutes, 1 minute, fin) et d'un plan si une personnalité est en retard."
          ]
        },
        say: {
          en: ["\"How would you like to be introduced, and could you say your name for me so I pronounce it correctly?\"", "\"If the Minister is delayed, we'll move the panel forward. Are you comfortable with that?\"", "\"I'll show you a card at five minutes and at one minute.\""],
          fr: ["« Comment souhaitez-vous être présenté(e), et pourriez-vous prononcer votre nom pour que je le dise correctement ? »", "« Si la ministre est retardée, nous avancerons le panel. Cela vous convient-il ? »", "« Je vous montrerai un carton à cinq minutes et à une minute. »"]
        }
      },
      {
        id: "mc-open",
        title: { en: "Opening the event", fr: "Ouverture de l'événement" },
        goal: { en: "Welcome everyone, set the tone and explain what will happen.", fr: "Accueillir chacun, donner le ton et expliquer le déroulement." },
        tips: {
          en: [
            "Start on time, or announce a short, specific delay: \"We will begin in five minutes.\"",
            "Open with a strong first line: a welcome, a short story, a striking fact or a question linked to the purpose. Don't test the microphone on air.",
            "Acknowledge dignitaries in the agreed protocol order; where it is local practice, close the list with \"all protocols observed\".",
            "Housekeeping: emergency exits, phones on silent, interpretation channels, Wi-Fi, photography and consent, hashtag.",
            "Present the purpose of the event and the programme in a few sentences.",
            "Introduce yourself briefly: your name and role, not your biography."
          ],
          fr: [
            "Commencez à l'heure, ou annoncez un court retard précis : « Nous commencerons dans cinq minutes. »",
            "Ouvrez par une première phrase forte : un accueil, une courte histoire, un fait marquant ou une question liée à l'objectif. Ne testez pas le micro en direct.",
            "Saluez les personnalités dans l'ordre protocolaire convenu ; selon l'usage local, terminez par « toutes considérations protocolaires respectées ».",
            "Informations pratiques : sorties de secours, téléphones en silencieux, canaux d'interprétation, Wi-Fi, photos et consentement, mot-dièse.",
            "Présentez l'objectif de l'événement et le programme en quelques phrases.",
            "Présentez-vous brièvement : votre nom et votre rôle, pas votre biographie."
          ]
        },
        say: {
          en: ["\"Excellencies, distinguished guests, colleagues: good morning, and welcome to…\"", "\"Interpretation is available: English on channel 1, French on channel 2.\"", "\"Today has one purpose: … Here is how the morning will run.\""],
          fr: ["« Excellences, distingués invités, chers collègues : bonjour et bienvenue à… »", "« L'interprétation est disponible : anglais sur le canal 1, français sur le canal 2. »", "« Cette journée a un seul objectif : … Voici comment se déroulera la matinée. »"]
        }
      },
      {
        id: "mc-intro",
        title: { en: "Introducing speakers", fr: "Présenter les orateurs" },
        goal: { en: "Give each speaker a short, warm and accurate introduction.", fr: "Offrir à chaque orateur une présentation courte, chaleureuse et exacte." },
        tips: {
          en: [
            "Keep it under a minute: why this topic, why this speaker, why now. Don't read the whole CV.",
            "Say the title and name clearly, usually last, then lead the applause and turn toward the speaker.",
            "Use the exact title they asked for; when in doubt, use the formal one.",
            "Stay at the lectern until the speaker arrives, then hand over and step aside.",
            "Afterwards, thank the speaker by name and give a one-sentence takeaway that leads into the next item.",
            "For a panel, introduce the moderator, who introduces the panellists, unless agreed otherwise."
          ],
          fr: [
            "Restez sous la minute : pourquoi ce sujet, pourquoi cet orateur, pourquoi maintenant. Ne lisez pas tout le CV.",
            "Prononcez clairement le titre et le nom, de préférence à la fin, puis lancez les applaudissements en vous tournant vers l'orateur.",
            "Utilisez exactement le titre demandé ; en cas de doute, choisissez le plus officiel.",
            "Restez au pupitre jusqu'à l'arrivée de l'orateur, puis cédez la place.",
            "Ensuite, remerciez l'orateur par son nom et donnez en une phrase l'idée à retenir, qui introduit le point suivant.",
            "Pour un panel, présentez le modérateur, qui présente les panélistes, sauf accord contraire."
          ]
        },
        say: {
          en: ["\"Our next speaker has spent fifteen years… Please welcome [title, full name].\"", "\"Thank you, [name], for reminding us that… That brings us to…\"", "\"Please join me in welcoming…\""],
          fr: ["« Notre prochaine oratrice a consacré quinze ans à… Veuillez accueillir [titre, nom complet]. »", "« Merci, [nom], de nous avoir rappelé que… Ce qui nous amène à… »", "« Je vous invite à accueillir… »"]
        }
      },
      {
        id: "mc-flow",
        title: { en: "Transitions, timing and Q&A", fr: "Transitions, temps et questions-réponses" },
        goal: { en: "Keep the programme flowing, on time and fair.", fr: "Garder un programme fluide, à l'heure et équitable." },
        tips: {
          en: [
            "Link each segment to the previous one with a short bridge, so the audience feels one story rather than a list.",
            "Track time on your run of show and adjust quietly; shorten your own parts first.",
            "Signal overruns with the agreed cards; if needed, step forward politely and thank the speaker.",
            "In Q&A, take questions in batches of two or three, balance gender, region and language, and ask people to give their name and organisation.",
            "Repeat or summarise each question so the room and the recording hear it.",
            "Announce breaks with the exact return time, and restart on time."
          ],
          fr: [
            "Reliez chaque séquence à la précédente par une courte transition, pour que le public vive une histoire et non une liste.",
            "Suivez le temps sur votre déroulé et ajustez discrètement ; raccourcissez d'abord vos propres interventions.",
            "Signalez les dépassements avec les cartons convenus ; si nécessaire, avancez poliment et remerciez l'orateur.",
            "Pour les questions, prenez-les par groupes de deux ou trois, équilibrez genre, région et langue, et demandez à chacun son nom et son organisation.",
            "Répétez ou résumez chaque question pour que la salle et l'enregistrement l'entendent.",
            "Annoncez les pauses avec l'heure exacte de reprise, et reprenez à l'heure."
          ]
        },
        say: {
          en: ["\"We have time for two more questions: one from the back and one online.\"", "\"Could you keep your question brief so more people can speak?\"", "\"We'll break for 15 minutes and resume at 11:15 sharp.\""],
          fr: ["« Nous avons le temps pour deux questions : une au fond de la salle et une en ligne. »", "« Pourriez-vous être bref pour que davantage de personnes puissent intervenir ? »", "« Nous faisons une pause de 15 minutes et reprenons à 11 h 15 précises. »"]
        }
      },
      {
        id: "mc-unexpected",
        title: { en: "When things go wrong", fr: "Quand les choses tournent mal" },
        goal: { en: "Stay calm and keep the audience with you.", fr: "Rester calme et garder le public avec vous." },
        tips: {
          en: [
            "Keep two or three minutes of spare material: a fact about the theme, a question to the audience, a short recap.",
            "If the technology fails, say what is happening and what comes next; never blame the technicians in public.",
            "If a dignitary arrives late, acknowledge them at a natural pause, following protocol.",
            "If you make a mistake, correct it simply and move on; the audience takes its cue from your calm.",
            "Know the emergency procedure and who gives the instructions.",
            "Have a back-up for a missing speaker: move a segment, open Q&A early or show a short video."
          ],
          fr: [
            "Gardez deux ou trois minutes de contenu de réserve : un fait sur le thème, une question au public, un court récapitulatif.",
            "Si la technique lâche, dites ce qui se passe et ce qui suit ; ne blâmez jamais les techniciens en public.",
            "Si une personnalité arrive en retard, saluez-la à une pause naturelle, selon le protocole.",
            "Si vous faites une erreur, corrigez-la simplement et poursuivez : le public suit votre calme.",
            "Connaissez la procédure d'urgence et qui donne les consignes.",
            "Prévoyez une solution si un orateur manque : déplacer une séquence, ouvrir plus tôt les questions ou diffuser une courte vidéo."
          ]
        },
        say: {
          en: ["\"While we fix the screen, let me ask you: …\"", "\"My apologies: Dr Diallo is the Director of… Thank you.\"", "\"We'll move the next session forward and return to this presentation after the break.\""],
          fr: ["« Pendant que nous réglons l'écran, une question pour vous : … »", "« Toutes mes excuses : le Dr Diallo est directeur de… Merci. »", "« Nous avançons la séance suivante et reviendrons à cette présentation après la pause. »"]
        }
      },
      {
        id: "mc-close",
        title: { en: "Closing the event", fr: "Clôture de l'événement" },
        goal: { en: "End with clarity, gratitude and energy.", fr: "Terminer avec clarté, gratitude et énergie." },
        tips: {
          en: [
            "Summarise two or three key messages from the day in your own words.",
            "Thank people in order: dignitaries and speakers, partners and organisers, then interpreters, technicians, logistics staff and volunteers.",
            "State the next steps and calls to action: evaluation forms, follow-up materials, commitments made.",
            "Give practical information: certificates, lunch, transport, photos.",
            "If protocol requires, invite the highest-ranking official to close formally; then end with a short, memorable last line.",
            "Finish on time; a short closing is remembered better than a long one."
          ],
          fr: [
            "Résumez deux ou trois messages clés de la journée avec vos propres mots.",
            "Remerciez dans l'ordre : personnalités et orateurs, partenaires et organisateurs, puis interprètes, techniciens, logistique et bénévoles.",
            "Annoncez les prochaines étapes et appels à l'action : formulaires d'évaluation, documents de suivi, engagements pris.",
            "Donnez les informations pratiques : attestations, déjeuner, transport, photos.",
            "Si le protocole le prévoit, invitez la plus haute autorité à clôturer officiellement ; terminez ensuite par une phrase courte et marquante.",
            "Terminez à l'heure : une clôture brève marque davantage qu'une longue."
          ]
        },
        say: {
          en: ["\"Three messages stay with me from today: …\"", "\"Our sincere thanks to… and to the interpreters and technical team who made today possible.\"", "\"I now invite [title, name] to deliver the closing remarks.\""],
          fr: ["« Je retiens trois messages de cette journée : … »", "« Nos sincères remerciements à… ainsi qu'aux interprètes et à l'équipe technique qui ont rendu cette journée possible. »", "« J'invite maintenant [titre, nom] à prononcer le discours de clôture. »"]
        }
      },
      {
        id: "mc-presence",
        title: { en: "Voice, presence and two languages", fr: "Voix, présence et bilinguisme" },
        goal: { en: "Sound and look like the calm host of the room.", fr: "Avoir la voix et l'allure d'un hôte serein." },
        tips: {
          en: [
            "Warm up your voice before you go on (humming, lip trills, a few tongue twisters) and keep water at the lectern.",
            "Speak a little slower and louder than in conversation; pause before names and key messages.",
            "Stand still at the lectern and move with purpose; plant your feet when you speak.",
            "Smile at the opening and the closing: the audience reads your face before it hears your words.",
            "At bilingual events, alternate languages by segment or say key lines in both; don't translate every sentence yourself unless agreed.",
            "Dress one level more formally than the audience."
          ],
          fr: [
            "Échauffez votre voix avant de monter sur scène (fredonnement, vibration des lèvres, quelques virelangues) et gardez de l'eau au pupitre.",
            "Parlez un peu plus lentement et plus fort qu'en conversation ; marquez une pause avant les noms et les messages clés.",
            "Restez stable au pupitre et déplacez-vous avec intention ; ancrez vos pieds quand vous parlez.",
            "Souriez à l'ouverture et à la clôture : le public lit votre visage avant d'entendre vos mots.",
            "Lors d'événements bilingues, alternez les langues par séquence ou dites les phrases clés dans les deux ; ne traduisez pas chaque phrase vous-même, sauf accord.",
            "Habillez-vous un cran plus formellement que le public."
          ]
        },
        say: {
          en: ["\"Ladies and gentlemen, mesdames et messieurs…\"", "\"[pause] It is my honour to welcome…\"", "\"Let me say that again, because it matters: …\""],
          fr: ["« Mesdames et messieurs, ladies and gentlemen… »", "« [pause] J'ai l'honneur d'accueillir… »", "« Je le répète, car c'est important : … »"]
        }
      }
    ],
    templates: [
      {
        title: { en: "Run of show", fr: "Déroulé (conducteur)" },
        text: {
          en: `RUN OF SHOW – [event] – [date] – venue [ ]
MC: [ ]   Protocol contact: [ ]   Technical lead: [ ]   Interpretation: EN/FR

TIME    SEGMENT                      WHO               MC LINE / CUE        TECH
08:30   Doors open, registration     Logistics         –                    Music
09:00   Opening and housekeeping     MC                Script p. 1          Mic 1, slide 1
09:05   Welcome remarks              [title, name]     Intro card 1         Lectern
09:15   Keynote                      [title, name]     Intro card 2         Slides
10:00   Panel                        Moderator [ ]     Intro card 3         4 mics
10:45   Break (15 min)               –                 "Back at 11:00"      Music
...
12:20   Closing remarks              [highest rank]    Invitation           –
12:30   Close                        MC                Closing script       Music

SPARE MATERIAL (2–3 min): [ ]
DELAY PLAN: if [dignitary] is late → [move segment]
EMERGENCY: [procedure, who announces]`,
          fr: `DÉROULÉ – [événement] – [date] – lieu [ ]
MC : [ ]   Contact protocole : [ ]   Régie : [ ]   Interprétation : EN/FR

HEURE   SÉQUENCE                     QUI               TEXTE MC / SIGNAL     TECHNIQUE
08:30   Ouverture des portes         Logistique        –                     Musique
09:00   Ouverture et infos pratiques MC                Script p. 1           Micro 1, diapo 1
09:05   Mot de bienvenue             [titre, nom]      Fiche 1               Pupitre
09:15   Discours principal           [titre, nom]      Fiche 2               Diapositives
10:00   Panel                        Modérateur [ ]    Fiche 3               4 micros
10:45   Pause (15 min)               –                 « Reprise à 11 h »    Musique
...
12:20   Discours de clôture          [plus haute autorité] Invitation        –
12:30   Fin                          MC                Script de clôture     Musique

RÉSERVE (2–3 min) : [ ]
PLAN EN CAS DE RETARD : si [personnalité] est en retard → [déplacer séquence]
URGENCE : [procédure, qui annonce]`
        }
      },
      {
        title: { en: "Opening script", fr: "Script d'ouverture" },
        text: {
          en: `"[Pause, smile.] Excellencies, distinguished guests, colleagues and friends: good morning.
[Acknowledge dignitaries in the agreed protocol order.]
My name is [name], [role], and I have the honour of being your master of ceremonies today.
[Strong first line: a fact, short story or question linked to the purpose.]
We are here to [purpose]. By the end of today, [what participants will leave with].
A few practical points: emergency exits are [ ]; please set your phones to silent; interpretation is on channel 1 (English) and channel 2 (French); [photography / hashtag].
Here is how the morning will run: [two or three highlights].
To open our event, it is my pleasure to invite [title, full name]."`,
          fr: `« [Pause, sourire.] Excellences, distingués invités, chers collègues et amis : bonjour.
[Saluer les personnalités dans l'ordre protocolaire convenu.]
Je m'appelle [nom], [fonction], et j'ai l'honneur d'être votre maître de cérémonie aujourd'hui.
[Première phrase forte : un fait, une courte histoire ou une question liée à l'objectif.]
Nous sommes réunis pour [objectif]. À la fin de cette journée, [ce que les participants emporteront].
Quelques informations pratiques : les sorties de secours sont [ ] ; merci de mettre vos téléphones en silencieux ; l'interprétation est sur le canal 1 (anglais) et le canal 2 (français) ; [photos / mot-dièse].
Voici le déroulement de la matinée : [deux ou trois temps forts].
Pour ouvrir notre événement, j'ai le plaisir d'inviter [titre, nom complet]. »`
        }
      },
      {
        title: { en: "Speaker introduction card", fr: "Fiche de présentation d'un orateur" },
        text: {
          en: `INTRODUCTION CARD
Name (phonetic): [ ]          Title to use: [ ]
Why this topic matters now (1 sentence): [ ]
Why this speaker (1–2 facts): [ ]
Link to this audience (1 sentence): [ ]
Closing line: "Please join me in welcoming [title, full name]."
AFTER: thank by name + one-sentence takeaway + link to the next item`,
          fr: `FICHE DE PRÉSENTATION
Nom (phonétique) : [ ]        Titre à utiliser : [ ]
Pourquoi ce sujet compte maintenant (1 phrase) : [ ]
Pourquoi cet orateur (1–2 faits) : [ ]
Lien avec ce public (1 phrase) : [ ]
Phrase finale : « Je vous invite à accueillir [titre, nom complet]. »
APRÈS : remercier par le nom + idée à retenir en une phrase + lien avec le point suivant`
        }
      },
      {
        title: { en: "Closing script", fr: "Script de clôture" },
        text: {
          en: `"Ladies and gentlemen, we come to the end of [event].
Three messages stay with me from today: [one], [two], [three].
Our sincere thanks to [dignitaries and speakers, in protocol order], to [partners and organisers], and to the interpreters, technical team, logistics staff and volunteers who made today possible.
Next steps: [evaluation form / materials / commitments and dates].
Practical information: [certificates, lunch, transport, group photo].
[If protocol requires:] I now invite [title, name] to deliver the closing remarks.
[After the closing remarks:] Thank you all. [Short, memorable last line.] Safe travels home."`,
          fr: `« Mesdames et messieurs, nous arrivons au terme de [événement].
Je retiens trois messages de cette journée : [un], [deux], [trois].
Nos sincères remerciements à [personnalités et orateurs, dans l'ordre protocolaire], à [partenaires et organisateurs], ainsi qu'aux interprètes, à l'équipe technique, à la logistique et aux bénévoles qui ont rendu cette journée possible.
Prochaines étapes : [formulaire d'évaluation / documents / engagements et dates].
Informations pratiques : [attestations, déjeuner, transport, photo de groupe].
[Si le protocole le prévoit :] J'invite maintenant [titre, nom] à prononcer le discours de clôture.
[Après le discours :] Merci à toutes et à tous. [Phrase finale courte et marquante.] Bon retour. »`
        }
      }
    ],
    quotes: [
      { text: "Remember that a person's name is to that person the sweetest and most important sound in any language.", fr: "Rappelez-vous que, pour chacun, son nom est le son le plus doux et le plus important, dans quelque langue que ce soit.", by: "Dale Carnegie", source: "How to Win Friends and Influence People, 1936" },
      { text: "Be sincere; be brief; be seated.", fr: "Soyez sincère, soyez bref, asseyez-vous.", by: "Franklin D. Roosevelt", source: "Widely attributed, as advice on public speaking" },
      { text: "It usually takes me more than three weeks to prepare a good impromptu speech.", fr: "Il me faut généralement plus de trois semaines pour préparer un bon discours improvisé.", by: "Mark Twain", source: "Widely attributed" },
      { text: "Now the general who wins a battle makes many calculations in his temple ere the battle is fought.", fr: "Le général qui gagne une bataille a fait de nombreux calculs dans son temple avant qu'elle ne soit livrée.", by: "Sun Tzu", source: "The Art of War I, trans. Giles (verified)" },
      { text: "Sincere words are not fine; fine words are not sincere.", fr: "Les paroles sincères ne sont pas belles ; les belles paroles ne sont pas sincères.", by: "Lao Tzu", source: "Tao Te Ching, ch. 81, trans. Legge (verified)" },
      { text: "Plans are worthless, but planning is everything.", fr: "Les plans ne valent rien, mais la planification est tout.", by: "Dwight D. Eisenhower", source: "Speech to the National Defense Executive Reserve Conference, 1957" }
    ],
    resources: [
      { t: "Julian Treasure: How to speak so that people want to listen", u: ted("julian_treasure_how_to_speak_so_that_people_want_to_listen"), by: "TED · 10 min", kind: "video" },
      { t: "Chris Anderson: TED's secret to great public speaking", u: ted("chris_anderson_ted_s_secret_to_great_public_speaking"), by: "TED · 8 min", kind: "video" },
      { t: "Nancy Duarte: The secret structure of great talks", u: ted("nancy_duarte_the_secret_structure_of_great_talks"), by: "TED · 18 min", kind: "video" },
      { t: "Priya Parker: 3 steps to turn everyday get-togethers into transformative gatherings (strong openings and closings)", u: ted("priya_parker_3_steps_to_turn_everyday_get_togethers_into_transformative_gatherings"), by: "TED · 10 min", kind: "video" },
      { t: "The Toastmaster role: hosting a meeting from start to finish", u: "https://www.toastmasters.org/membership/club-meeting-roles/toastmaster", by: "Toastmasters International", kind: "tool" },
      { t: "Public speaking tips", u: "https://www.toastmasters.org/resources/public-speaking-tips", by: "Toastmasters International", kind: "tool" },
      { t: "Protocol and Liaison Service (UN protocol, titles and lists)", u: "https://www.un.org/dgacm/en/content/protocol", by: "United Nations, DGACM", kind: "tool" },
      { t: "Resonate: present visual stories that transform audiences (Nancy Duarte, 2010)", u: "https://www.duarte.com/resources/books/resonate/", by: "Duarte", kind: "book" },
      { t: "TED Talks: The Official TED Guide to Public Speaking (Chris Anderson, 2016)", by: "Houghton Mifflin Harcourt", kind: "book" },
      { t: "Talk Like TED (Carmine Gallo, 2014)", by: "St. Martin's Press", kind: "book" },
      { t: "The Art of Gathering (Priya Parker, 2018)", by: "Riverhead", kind: "book" }
    ]
  },
  MONEY
];
