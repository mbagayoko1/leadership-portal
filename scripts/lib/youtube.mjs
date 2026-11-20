// Shared helpers for the video-library pull scripts (pull-accurate-english,
// pull-french). Reads a YouTube playlist page (first 100 videos) and returns
// each video's id, title, duration and channel name, without opening the
// video pages (YouTube rate-limits those).
import fs from "node:fs";

const HEADERS = { "User-Agent": "Mozilla/5.0", "Accept-Language": "en" };

// `owner` is the playlist's own channel: YouTube omits the channel row for
// its videos, and shows it for videos saved from other channels.
export async function playlistVideos(url, owner) {
  const h = await (await fetch(url + (url.includes("?") ? "&" : "?") + "hl=en", { headers: HEADERS })).text();
  const m = h.match(/var ytInitialData = (\{.*?\});<\/script>/s);
  if (!m) throw new Error("No playlist data at " + url);
  const out = [];
  const walk = o => {
    if (!o || typeof o !== "object") return;
    const v = o.lockupViewModel;
    if (v && v.contentType === "LOCKUP_CONTENT_TYPE_VIDEO") {
      const d = (JSON.stringify(v.contentImage || {}).match(/"text":"(\d+:\d+(?::\d+)?)"/) || [])[1] || "";
      const md = v.metadata.lockupMetadataViewModel;
      const rows = ((md.metadata || {}).contentMetadataViewModel || {}).metadataRows || [];
      const by = rows.length >= 2 ? ((((rows[0].metadataParts || [])[0] || {}).text) || {}).content : owner;
      out.push({ id: v.contentId, t: md.title.content, d, by });
      return;
    }
    Object.values(o).forEach(walk);
  };
  walk(JSON.parse(m[1]));
  return out;
}

export const playlistUrl = id => "https://www.youtube.com/playlist?list=" + id;

// Writes `export default { theme: [videos] }` with one video per line.
export function writeLibrary(file, header, themes) {
  const body = JSON.stringify(themes, null, 1).replace(/\n\s+(?=[}\]])/g, "").replace(/\{\n\s+/g, "{ ").replace(/,\n\s+"(t|d|c)"/g, ', "$1"');
  fs.writeFileSync(file, header + "\nexport default " + body + ";\n");
}
