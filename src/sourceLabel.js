// Quote sources are stored in English (work titles stay in their original
// language). In French mode, sourceLabel() translates the descriptive parts
// around the titles: "Widely attributed", "TED talk", "Nobel Lecture",
// "ch.", country names and so on. Order matters: longer phrases first.
const FR = [
  [/^Widely attributed \(also credited to (.+)\)$/, "Attribution courante (aussi attribuée à $1)"],
  [/Widely attributed, from his "Guru" speech/, "Attribution courante, tirée de son discours « Guru »"],
  [/Widely attributed, as advice on public speaking/, "Attribution courante, comme conseil de prise de parole"],
  [/His Inner Game formula, widely attributed/, "Sa formule de l'Inner Game, attribution courante"],
  [/, from his seminars/, ", tirée de ses séminaires"],
  [/, from his leadership teaching/, ", tirée de son enseignement sur le leadership"],
  [/, from his books on purpose/, ", tirée de ses livres sur le sens de la vie"],
  [/, from his time-management teaching/, ", tirée de son enseignement sur la gestion du temps"],
  [/, from his talks/, ", tirée de ses conférences"],
  [/, from /, ", tirée de "],
  [/Widely attributed/g, "Attribution courante"],
  [/Widely described as African/, "Souvent présenté comme africain"],
  [/\(widely quoted\)/, "(souvent cité)"],
  [/His signature line; see his book/, "Sa formule emblématique ; voir son livre"],
  [/Attributed; linked to his UNESCO speech of 1960, and the wording varies/, "Attribuée ; liée à son discours à l'UNESCO de 1960, avec des variantes"],
  [/Words of his teacher Tierno Bokar, in his memoirs/, "Paroles de son maître Tierno Bokar, dans ses mémoires"],
  [/TEDxEuston talk and book title/, "Conférence TEDxEuston et titre de livre"],
  [/TED talk title/g, "Titre de conférence TED"],
  [/TED talk/g, "Conférence TED"],
  [/Book title/g, "Titre de livre"],
  [/, after Marcus Aurelius/, ", d'après Marc Aurèle"],
  [/Nobel Lecture/g, "Conférence Nobel"],
  [/Harvard Commencement address/g, "Discours de remise des diplômes, Harvard"],
  [/ \(the question she says every guest was really asking\)/, " (la question que, selon elle, chaque invité posait en réalité)"],
  [/Cecil B\. DeMille Award speech/, "Discours du prix Cecil B. DeMille"],
  [/, quoting a poster at Facebook/, ", citant une affiche chez Facebook"],
  [/, which he calls the best coaching question in the world/, ", qu'il appelle la meilleure question de coaching au monde"],
  [/The Ten Components/, "les dix composantes"],
  [/, Habit (\d)/, ", habitude $1"],
  [/, Law of Navigation/, ", loi de la navigation"],
  [/UN Youth Assembly/, "Assemblée de la jeunesse de l'ONU"],
  [/Definition of team psychological safety/, "Définition de la sécurité psychologique d'équipe"],
  [/Launch of the Mindset Network/, "Lancement du Mindset Network"],
  [/From her telling of the hummingbird story, in the film/, "Tiré de son récit de l'histoire du colibri, dans le film"],
  [/\(Atlanta address, (\d{4})\)/, "(discours d'Atlanta, $1)"],
  [/, ch\. /g, ", chap. "],
  [/\(checked on ([^)]+)\)/, "(vérifié sur $1)"],
  [/trans\. /g, "trad. "],
  [/\(verified\)/g, "(vérifié)"],
  [/Speech to the /, "Discours à la "],
  [/\(often misattributed to Einstein\)/, "(souvent attribuée à tort à Einstein)"],
  [/letter (\w+)/, "lettre $1"],
  [/Act (\w+), Scene (\w+)/, "acte $1, scène $2"],
  [/King James Bible/, "Bible du roi Jacques"],
  [/\(chapter title\)/, "(titre de chapitre)"],
  [/\bGambia\b/, "Gambie"], [/\bLiberia\b/, "Libéria"], [/\bGuinea\b/, "Guinée"], [/\bNigeria\b/, "Nigéria"],
  [/\bCameroon\b/, "Cameroun"], [/\bWest Africa\b/, "Afrique de l'Ouest"],
  [/^Fulani,/, "Peul,"], [/^Mandigo,/, "Mandingue,"], [/^Malinke,/, "Malinké,"]
];

export function sourceLabel(source, lang) {
  if (lang !== "fr" || !source) return source;
  return FR.reduce((s, [re, to]) => s.replace(re, to), source);
}
