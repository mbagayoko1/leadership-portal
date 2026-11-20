// "Practise with" links for the Polish Your English concepts: specific videos
// from the themed library (englishLibrary.js CONCEPT_VIDEOS), with their
// published titles. Shared by en.js and fr.js.
import VIDEOS from "../englishVideos.js";
import { CONCEPT_VIDEOS, watchUrl } from "../englishLibrary.js";

const TITLE = Object.fromEntries(Object.values(VIDEOS).flat().map(v => [v.id, v.t]));
export const conceptLinks = i => (CONCEPT_VIDEOS[i] || []).map(id => ({ t: TITLE[id], u: watchUrl(id) }));
