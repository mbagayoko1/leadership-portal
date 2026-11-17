// Opens every external link in src/ and reports the ones that fail.
// Run: npm run check:links   (about a minute; needs internet)
// Google Drive links are listed, not opened: they need a sign-in.
// Some sites block scripts (HTTP 403) but open in a browser; check those by hand.
import fs from "fs";
import path from "path";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const files = ["src", "src/coach"].flatMap(d => fs.readdirSync(path.join(root, d)).filter(f => /\.(js|jsx)$/.test(f)).map(f => path.join(root, d, f)));
const where = {};
for (const f of files) for (const u of fs.readFileSync(f, "utf8").match(/https?:\/\/[^\s"'`<>\\)]+/g) || []) {
  const c = u.replace(/[.,;]+$/, "");
  (where[c] = where[c] || new Set()).add(path.basename(f));
}
const urls = Object.keys(where).filter(u => !/localhost|w3\.org|generativelanguage|example\.com|\$\{|[?=]$/.test(u));
const UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130 Safari/537.36";

async function get(u) {
  const c = new AbortController(); const t = setTimeout(() => c.abort(), 20000);
  try {
    const r = await fetch(u, { redirect: "follow", signal: c.signal, headers: { "User-Agent": UA, Accept: "text/html,*/*", "Accept-Language": "en" } });
    return { status: r.status, final: r.url, body: await r.text().catch(() => "") };
  } catch (e) { return { status: 0, err: e.name }; } finally { clearTimeout(t); }
}
async function check(u) {
  if (/drive\.google|docs\.google/.test(u)) return { u, kind: "drive", status: "-" };
  const yt = u.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{6,})/);
  if (yt) { const r = await get("https://www.youtube.com/oembed?format=json&url=https://www.youtube.com/watch?v=" + yt[1]); let title = ""; try { title = JSON.parse(r.body).title; } catch (e) {} return { u, kind: "video", status: r.status, title }; }
  const r = await get(u);
  const title = ((r.body || "").match(/<title[^>]*>([^<]{0,120})/i) || [])[1] || "";
  const soft = /page not found|404|not be found|no longer available|does not exist|unavailable/i.test(title);
  const moved = r.final && new URL(r.final).host.replace(/^www\./, "") !== new URL(u).host.replace(/^www\./, "");
  return { u, kind: "page", status: r.status, err: r.err, title: title.trim(), soft, final: moved ? r.final : undefined };
}

const out = []; let i = 0;
async function worker() { while (i < urls.length) { const u = urls[i++]; out.push({ ...await check(u), files: [...where[u]].join(",") }); } }
await Promise.all(Array.from({ length: 12 }, worker));

const counts = {};
for (const o of out) { const b = o.kind === "drive" ? "drive (not opened)" : o.status === 200 && !o.soft ? (o.final ? "moved" : "ok") : o.status === 0 ? "error" : o.soft ? "soft 404" : String(o.status); counts[b] = (counts[b] || 0) + 1; }
console.log(out.length + " links", counts);
const bad = out.filter(o => o.kind !== "drive" && (o.status !== 200 || o.soft || o.final));
for (const o of bad) console.log(o.status, o.soft ? "SOFT404" : "", o.err || "", o.u, o.final ? "=> " + o.final : "", "|", o.files, "|", o.title.slice(0, 50));
process.exit(bad.some(o => o.status !== 403 && !o.final) ? 1 : 0);
