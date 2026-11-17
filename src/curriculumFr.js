// French text for the curriculum (src/data.js stays the English source).
// localizeCurriculum(lang) returns CUR, SM and CI with these strings swapped in,
// so every screen that shows a module title, task or question follows EN/FR.
// Book and article titles stay in their original language; only the chapter
// labels around them are translated.
import { CUR, SM, CI } from "./data.js";

export const FR_TITLES = {
  m1: "Connaissance de soi et image personnelle",
  m2: "Fondamentaux de la présence exécutive",
  m3: "Communication stratégique",
  m4: "Influencer sans autorité hiérarchique",
  m5: "Maîtrise de la prise de parole en public",
  m6: "Dialogue avec la haute direction",
  m7: "Communication de crise et adaptabilité",
  m8: "Leadership visionnaire",
  m9: "Navigation organisationnelle",
  m10: "Préparation au niveau de Représentant",
  m11: "Héritage et impact durable",
  vocal: "Entraînement vocal",
  reading: "Lectures et guides d'étude"
};

// Daily tasks (dt), vocal exercises (ve) and checkpoint (cp) of the route view.
const ROUTE = {
  m1: {
    dt: ["Matin : notez dans votre journal 3 qualités de leader (10 min)", "Midi : entraînez-vous à votre pitch d'ascenseur (5 min)", "Soir : enregistrez-vous 2 min et repérez vos mots parasites (15 min)"],
    ve: ["Respiration diaphragmatique : 5 min matin et soir", "Exercices d'articulation : « Les chaussettes de l'archiduchesse » x20", "Variation de hauteur en lisant des articles de presse (10 min)"],
    cp: "Semaine 2 : enregistrez une présentation de 5 min au « standard Rolls-Royce »"
  },
  m2: {
    dt: ["Matin : 2 min de posture d'assurance avant les réunions", "En réunion : soutenez le regard 3 à 5 s par personne", "Soir : regardez des leaders sur TED et notez 3 techniques (20 min)"],
    ve: ["Résonance : gammes bouche fermée (5 min)", "Projection : parlez pour le fond de la salle (10 min)", "Travail des pauses stratégiques"],
    cp: "Semaine 4 : présentation à l'équipe SWEDD et auto-évaluation avec la grille de présence exécutive"
  },
  m3: {
    dt: ["Matin : formulez une idée en 3 phrases", "Midi : écoute active, résumez les propos d'un collègue", "Soir : rédigez un message persuasif qui allie données et récit (20 min)"],
    ve: ["Maîtrise du débit : 150 mots par minute", "Accentuation : mettez en relief les mots clés", "Modulation : dites la même phrase de 5 façons"],
    cp: "Semaine 7 : présentation fondée sur les données à l'Unité Pop Data"
  },
  m4: {
    dt: ["Matin : cartographiez les priorités d'une partie prenante", "Au travail : posez 3 questions stratégiques plutôt que des affirmations", "Soir : courriel persuasif selon la méthode SCQA (15 min)"],
    ve: ["Autorité vocale : baissez la voix sur les messages clés", "Intonation des questions : montante ou descendante", "Le silence comme force : pause de 3 secondes"],
    cp: "Semaine 10 : animez une réunion de l'équipe spéciale régionale et recueillez un feedback à 360°"
  },
  m5: {
    dt: ["Matin : répétez 5 fois l'ouverture de votre discours", "Midi : Toastmasters ou classe de maître", "Soir : répétez en vous enregistrant (20 min)"],
    ve: ["Échauffement : trilles des lèvres, sirènes, gammes (10 min)", "Coordination des gestes avec des gestes intentionnels", "Projection de l'énergie : mode intense ou intime"],
    cp: "Semaine 14 : discours d'ouverture de 15 min lors d'un événement régional"
  },
  m6: {
    dt: ["Matin : préparez 3 messages clés pour vos échanges avec la direction", "En réunion : gestion ascendante, soyez bref et orienté solutions", "Soir : débriefez un échange avec la direction (10 min)"],
    ve: ["Exercices de concision", "Marqueurs d'assurance : bannissez les formules d'excuse", "Voix de gravité : registre plus grave, débit plus lent"],
    cp: "Semaine 17 : 3 réunions avec des dirigeants, enseignements consignés dans votre journal"
  },
  m7: {
    dt: ["Matin : étudiez un cas de crise (15 min)", "Dans la journée : respiration carrée avant les conversations difficiles", "Soir : improvisation de 2 min sur un sujet au hasard (10 min)"],
    ve: ["Voix stable sous pression", "Réponse rapide : réponses en 30 secondes", "Ton apaisant pour faire baisser la tension"],
    cp: "Semaine 20 : simulation de crise devant un jury"
  },
  m8: {
    dt: ["Matin : rédigez votre énoncé de vision (15 min)", "Midi : partagez une idée inspirante avec l'équipe", "Soir : étudiez le discours d'un leader transformationnel (20 min)"],
    ve: ["Travail de la cadence sur « I Have a Dream » de Martin Luther King", "Connexion émotionnelle : variez la voix pour transmettre la passion", "Appel à l'action : des conclusions qui mobilisent"],
    cp: "Semaine 22 : « Manifeste de leadership » présenté à la cohorte"
  },
  m9: {
    dt: ["Matin : cartographiez une relation au sein de l'organisation", "Au travail : nouez une alliance stratégique", "Soir : mettez à jour votre carte des parties prenantes (15 min)"],
    ve: ["Changement de registre : formel ou informel", "Langage diplomatique : reformulez les messages de façon positive", "Signaux d'écoute : accusés de réception verbaux"],
    cp: "Semaine 26 : feuille de route de maîtrise du système des Nations Unies présentée au mentor"
  },
  m10: {
    dt: ["Matin : revoyez une compétence de Représentant ou Représentant adjoint (10 min)", "Midi : entraînez-vous sur un scénario à fort enjeu", "Soir : mettez à jour votre dossier de préparation (15 min)"],
    ve: ["Entraînement médias : petites phrases de 15 à 30 secondes", "Agilité multilingue : formules en français et en anglais", "Style personnel : une signature verbale cohérente"],
    cp: "Semaine 30 : simulation d'entretien de Représentant devant un jury"
  },
  m11: {
    dt: ["Matin : accompagnez un collègue junior (15 min)", "Midi : documentez un enseignement tiré de l'expérience", "Soir : réfléchissez à votre progression de leader (10 min)"],
    ve: ["Voix de coach : questions puissantes", "Maîtrise du récit : histoires personnelles de 3 à 5 min", "Voix authentique : affinez votre style personnel"],
    cp: "Semaine 34 : projet final « Ma philosophie du leadership »"
  }
};

// Study-guide fields: weeks label, checkpoint, readings and reflection questions.
const GUIDE = {
  m1: { cp: "Enregistrez une présentation de 5 min au « standard Rolls-Royce ». Partagez-la avec 2 pairs.", reads: ["Presence – Amy Cuddy (chap. 1–3)", "The First 90 Days – Michael Watkins (chap. 1–2)"], refs: ["Quels sont les 3 concepts principaux des lectures de ce module ?", "Comment cela s'applique-t-il à votre objectif de devenir Représentant ?", "Une action que vous mènerez cette semaine :"] },
  m2: { cp: "Présentez à l'équipe SWEDD. Auto-évaluez-vous avec la grille de présence exécutive.", reads: ["Executive Presence – Sylvia Ann Hewlett (partie 1)", "HBR: What Makes a Leader – Goleman"], refs: ["Quels sont les 3 piliers de la présence exécutive ?", "Quel est votre pilier le plus fort ? Le plus faible ?", "Comment l'appliquerez-vous avant votre prochaine réunion avec la direction ?"] },
  m3: { cp: "Présentez un exposé fondé sur les données à l'Unité Pop Data.", reads: ["Made to Stick – Chip & Dan Heath (chap. 1–4)", "The Minto Pyramid Principle (parties 1–2)"], refs: ["Qu'est-ce que le cadre SUCCESs et comment s'applique-t-il aux messages de l'UNFPA ?", "Comment appliqueriez-vous le principe de la pyramide à une note d'information ?", "Réécrivez une donnée de votre travail sous forme d'histoire mémorable."] },
  m4: { cp: "Animez une réunion de l'équipe spéciale régionale. Demandez un feedback à 360° à 3 participants.", reads: ["Influence – Cialdini (chap. 1–4)", "Getting to Yes – Fisher & Ury (chap. 1–5)"], refs: ["Citez les 6 principes de Cialdini. Lequel utilisez-vous le plus naturellement ?", "Quelle différence entre positions et intérêts ?", "Cartographiez une partie prenante clé : intérêts, pressions, valeurs."] },
  m5: { cp: "Prononcez un discours de 15 min lors d'un événement régional. Revoyez la vidéo avec votre mentor.", reads: ["Talk Like TED – Carmine Gallo (livre entier)"], refs: ["Quelle est la règle des 18 minutes de Carmine Gallo et pourquoi fonctionne-t-elle ?", "Quelles 3 techniques TED appliquerez-vous à votre prochaine présentation ?", "Enregistrez une intervention de 5 min et notez-vous : accroche, débit, pauses, énergie, conclusion."] },
  m6: { cp: "Menez 3 réunions avec des dirigeants. Consignez enseignements et retours dans votre journal.", reads: ["The 5 Levels of Leadership – John Maxwell", "HBR Guide to Managing Up"], refs: ["Lequel des 5 niveaux de Maxwell décrit votre leadership actuel ?", "Qu'est-ce qui compte le plus pour votre supérieur ?", "Remplissez le modèle de préparation aux réunions de direction dans le Drive."] },
  m7: { cp: "Gérez une simulation de crise. Présentez votre solution à un jury.", reads: ["Thinking Fast and Slow – Kahneman (parties 1–2)", "Crucial Conversations – Patterson et al. (chap. 1–7)"], refs: ["Quelle différence entre la pensée du système 1 et du système 2 ?", "Que signifie « créer la sécurité » dans une conversation cruciale ?", "Appliquez la méthode STATE à une conversation difficile que vous évitez."] },
  m8: { cp: "Présentez votre « Manifeste de leadership » à la cohorte.", reads: ["Start With Why – Simon Sinek (livre entier)", "Leaders Eat Last – Simon Sinek (parties 1–3)"], refs: ["Expliquez le Cercle d'or avec vos mots. Quel est votre POURQUOI ?", "En quoi le discours de Martin Luther King montre-t-il la force d'une vision ?", "Rédigez votre énoncé de POURQUOI avec le modèle du Drive."] },
  m9: { cp: "Présentez à votre mentor votre feuille de route de maîtrise du système des Nations Unies.", reads: ["48 Laws of Power – Robert Greene (extraits)", "Organizational Culture & Leadership – Schein (parties 1–2)"], refs: ["Quels sont les 3 niveaux de culture selon Schein ? Donnez un exemple au WCARO.", "Comment utiliser la carte du pouvoir des parties prenantes dans votre rôle ?", "Identifiez une alliance stratégique à construire ce mois-ci."] },
  m10: { cp: "Passez une simulation d'entretien de Représentant évaluée par un jury.", reads: ["The Leadership Pipeline – Charan et al.", "Good to Great – Jim Collins (chap. 1–5)"], refs: ["Quels sont les 6 passages du leadership ? Lesquels traversez-vous maintenant ?", "À quoi ressemble le leadership de niveau 5 aux Nations Unies ?", "Remplissez l'auto-évaluation de préparation au poste de Représentant dans le Drive."] },
  m11: { cp: "Présentez votre projet final « Philosophie du leadership » à la haute direction.", reads: ["Dare to Lead – Brené Brown (livre entier)", "The Infinite Game – Simon Sinek (livre entier)"], refs: ["Qu'entend Brené Brown par « leadership de tout cœur » ?", "Quelle différence entre un état d'esprit fini et infini ?", "Rédigez votre énoncé de philosophie du leadership avec le modèle du Drive."] },
  vocal: { cp: "Déposez chaque semaine vos enregistrements vocaux dans le dossier Exercices quotidiens du Drive.", refs: ["Qu'est-ce que la respiration diaphragmatique et pourquoi est-elle importante ?", "Décrivez une technique de l'intervention de Julian Treasure que vous allez pratiquer.", "Enregistrez-vous avant et après une semaine. Qu'est-ce qui a changé ?"] },
  reading: { cp: "Déposez vos notes de compréhension dans le Drive après chaque livre terminé.", refs: ["Après chaque livre, expliquez les 3 concepts principaux en 60 secondes.", "Quel lien avec le contexte de l'Afrique de l'Ouest et du Centre ?", "Quelle est l'idée la plus marquante de ce mois-ci ?"] }
};

// Chapter labels next to the book titles in the route view.
const CHAPTERS = { "Full book": "livre entier", "Full article": "article entier", "Full guide": "guide entier", "All levels": "tous les niveaux", "Selected laws": "lois choisies" };
const chapterFr = c => CHAPTERS[c] || c.replace(/^Ch /, "chap. ").replace(/^Part /, "partie ").replace(/^partie (\d+-\d+)$/, "parties $1");
const weeksFr = wk => wk === "Ongoing" ? "En continu" : wk.replace(/^Weeks? /, "Semaines ");

const FR = (() => {
  const cur = Object.fromEntries(Object.entries(CUR).map(([pk, ph]) => [pk, {
    ...ph,
    modules: ph.modules.map(m => ({ ...m, title: FR_TITLES[m.id] || m.title, ...(ROUTE[m.id] || {}), rd: m.rd.map(r => ({ ...r, c: chapterFr(r.c) })) }))
  }]));
  const guide = m => ({ ...m, title: FR_TITLES[m.id] || m.title, wk: weeksFr(m.wk), ...(GUIDE[m.id] || {}) });
  return { CUR: cur, SM: SM.map(guide), CI: CI.map(guide) };
})();

export function localizeCurriculum(lang) {
  return lang === "fr" ? FR : { CUR, SM, CI };
}
