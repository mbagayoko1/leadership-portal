// "Practise with" links for the language modules' concepts: specific videos
// from each module's themed library, with their published titles. Shared by
// en.js and fr.js.
import EN_VIDEOS from "../englishVideos.js";
import FR_VIDEOS from "../frenchVideos.js";
import { CONCEPT_VIDEOS, watchUrl } from "../englishLibrary.js";
import { FR_CONCEPT_VIDEOS } from "../frenchLibrary.js";

const TITLE = Object.fromEntries([...Object.values(EN_VIDEOS), ...Object.values(FR_VIDEOS)].flat().map(v => [v.id, v.t]));
const IDS = { eng: CONCEPT_VIDEOS, fra: FR_CONCEPT_VIDEOS };
export const LINKED_MODULES = Object.keys(IDS);
export const conceptLinks = (id, i) => ((IDS[id] || [])[i] || []).map(v => ({ t: TITLE[v], u: watchUrl(v) }));
