// Builds the Money module's downloadable toolkit (templates, quotes and
// resources) as PDF in English and French, from src/money.js, into
// public/downloads/. Run after changing the module: npm run pdf:money
// Needs Google Chrome (set CHROME_PATH if it is not in /Applications) and
// an internet connection for the web fonts.
import { createRequire } from "module";
import path from "path";
import fs from "fs";
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const require = createRequire(path.join(root, "package.json"));
const puppeteer = require("puppeteer-core");
const { MONEY } = await import(path.join(root, "src/money.js"));
const CHROME = process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

for (const lang of ["en", "fr"]) {
const out = path.join(root, "public/downloads", "money-toolkit-" + lang + ".pdf");
const T = {
  en: {
    kinds: { video: "Videos", article: "Articles", tool: "Guides and tools", book: "Books" },
    docTitle: "Money &amp; financial freedom: templates, quotes and resources",
    org: "Leadership &amp; Communication Development Programme",
    sub: "Templates, quotes and resources from the Personal Development module: a spending plan, a debt payoff plan, a family loan agreement, a net worth statement and a one-page investment plan.",
    noteLabel: "Please note:", templates: "Templates", tplLead: "Fill in the brackets by hand or copy the text into a document. Revisit each one every few months.",
    quotes: "Quotes", quotesLead: "Lines marked “verified” were checked against the published text.",
    resources: "Resources", resLead: "Links open in your browser. Books without a link are widely available in libraries and bookshops.",
    end: "Tips and phrases are practical guidance written for this programme. Links were checked on 5 November 2026. Source: Leadership &amp; Communication Development Portal, Personal Development → Money.",
    footer: "Money &amp; financial freedom · Templates, quotes and resources"
  },
  fr: {
    kinds: { video: "Vidéos", article: "Articles", tool: "Guides et outils", book: "Livres" },
    docTitle: "Argent et liberté financière : modèles, citations et ressources",
    org: "Programme de développement du leadership et de la communication",
    sub: "Modèles, citations et ressources du module de développement personnel : un plan de dépenses, un plan de remboursement des dettes, une reconnaissance de dette familiale, un bilan patrimonial et un plan d'investissement en une page.",
    noteLabel: "À noter :", templates: "Modèles", tplLead: "Complétez les crochets à la main ou copiez le texte dans un document. Revoyez chaque modèle tous les quelques mois.",
    quotes: "Citations", quotesLead: "Les citations sont données en traduction libre, suivies du texte original. La mention « vérifié » signifie que le texte original a été contrôlé dans l'ouvrage publié.",
    resources: "Ressources", resLead: "Les liens s'ouvrent dans votre navigateur. La plupart des ressources sont en anglais ; celles de la BCEAO sont en français. Les titres restent dans leur langue d'origine. Les livres sans lien sont disponibles en librairie et en bibliothèque.",
    end: "Les conseils et formulations sont des repères pratiques rédigés pour ce programme. Liens vérifiés le 5 novembre 2026. Source : Portail de développement du leadership et de la communication, Développement personnel → Argent.",
    footer: "Argent et liberté financière · Modèles, citations et ressources"
  }
}[lang];
// Source labels and publisher notes in French; titles of works stay as published.
const frSource = s => lang !== "fr" ? s : s.replace("(verified)", "(vérifié)").replace("(chapter title)", "(titre de chapitre)").replace("(widely quoted)", "(largement cité)").replace("Act I, Scene III", "acte I, scène III").replace("King James Bible", "Bible du roi Jacques");
const frBy = s => lang !== "fr" ? s : s.replace("(in French)", "(en français)").replace("Proverbs 22:7", "Proverbes 22:7").replace("Self-published", "Autoédition");

const e = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const kinds = T.kinds;
const host = u => { try { return new URL(u).host.replace(/^www\./, ""); } catch { return ""; } };

const templates = MONEY.templates.map((t, i) => `
  <section class="tpl">
    <h3><span class="n">${i + 1}</span>${e(t.title[lang])}</h3>
    <pre style="font-size:${Math.max(7.6, Math.min(8.4, 8.4 * 92 / Math.max(...t.text[lang].split("\n").map(l => l.length)))).toFixed(2)}pt">${e(t.text[lang])}</pre>
  </section>`).join("");

const quotes = MONEY.quotes.map(q => `
  <figure>
    <blockquote>${lang === "fr" ? "« " + e(q.fr.replace(/«\s*([^»]+?)\s*»/g, "“$1”")) + " »" : "“" + e(q.text.replace(/"([^"]+)"/g, "‘$1’")) + "”"}</blockquote>
    ${lang === "fr" ? `<p class="orig">“${e(q.text.replace(/"([^"]+)"/g, "‘$1’"))}”</p>` : ""}
    <figcaption>${e(frBy(q.by))}, <i>${e(frSource(q.source))}</i></figcaption>
  </figure>`).join("");

const resources = ["video", "article", "tool", "book"].map(k => {
  const items = MONEY.resources.filter(r => r.kind === k);
  if (!items.length) return "";
  return `<h3>${kinds[k]}</h3><ul class="res">${items.map(r => `
    <li>${r.u ? `<a href="${e(r.u)}">${e(r.t)}</a>` : `<span class="t">${e(r.t)}</span>`}
      <span class="by">${e(frBy(r.by))}</span>${r.u ? `<span class="url">${e(host(r.u))}</span>` : ""}</li>`).join("")}</ul>`;
}).join("");

const html = `<!doctype html><html lang="${lang}"><head><meta charset="utf-8">
<title>${T.docTitle}</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400..700;1,6..72,400..600&family=Public+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
  @page { size: A4; margin: 18mm 17mm 20mm; }
  :root { --ink:#1e2a44; --orange:#e85d1f; --brass:#c9a227; --paper:#faf8f4; --muted:#5f6472; --line:#e5e1d8; }
  * { box-sizing: border-box; }
  body { font-family: "Public Sans", Arial, sans-serif; color: #24283a; font-size: 10pt; line-height: 1.5; margin: 0; }
  h1, h2, h3 { font-family: "Newsreader", Georgia, serif; color: var(--ink); font-weight: 600; letter-spacing: -0.01em; }
  .cover { background: var(--ink); color: #fff; padding: 14mm 14mm 13mm; margin: 0 0 8mm; border-radius: 4px; }
  .cover .mark { display:inline-block; width:4px; height:28px; background: linear-gradient(var(--orange) 0 45%, transparent 45% 55%, var(--brass) 55%); margin-right:10px; vertical-align:middle; }
  .cover .org { font-size: 9pt; font-weight: 600; letter-spacing: .02em; vertical-align: middle; }
  .cover h1 { color: #fff; font-size: 30pt; line-height: 1.1; margin: 12mm 0 4mm; }
  .cover p { color: #d6dbe8; font-size: 11pt; max-width: 150mm; margin: 0; }
  .note { border-left: 3px solid var(--brass); background: #fbf6e6; color: #5a4a12; padding: 3mm 4mm; font-size: 9pt; margin: 0 0 8mm; }
  h2 { font-size: 18pt; margin: 9mm 0 1mm; padding-bottom: 2mm; border-bottom: 2px solid var(--orange); break-after: avoid; }
  h2 + p.lead { color: var(--muted); margin: 2mm 0 5mm; }
  .tpl { break-inside: avoid; margin: 0 0 6mm; }
  .tpl h3 { font-size: 12.5pt; margin: 0 0 2mm; display: flex; align-items: baseline; gap: 3mm; }
  .tpl .n { font-family: "IBM Plex Mono", monospace; font-size: 9pt; color: #fff; background: var(--orange); border-radius: 3px; padding: 0 2mm; }
  pre { font-family: "IBM Plex Mono", Menlo, monospace; font-size: 8.4pt; line-height: 1.55; background: var(--paper); border: 1px solid var(--line); border-radius: 4px; padding: 4mm 5mm; margin: 0; white-space: pre-wrap; color: #1f2333; }
  figure { margin: 0 0 4mm; padding-left: 4mm; border-left: 3px solid var(--brass); break-inside: avoid; }
  blockquote { margin: 0; font-family: "Newsreader", Georgia, serif; font-style: italic; font-size: 12pt; line-height: 1.35; color: #1f2333; }
  figcaption { font-size: 8.5pt; color: var(--muted); margin-top: 1mm; }
  p.orig { margin: 1mm 0 0; font-family: "Newsreader", Georgia, serif; font-style: italic; font-size: 9pt; color: var(--muted); }
  h3 { font-size: 12.5pt; margin: 6mm 0 2mm; break-after: avoid; }
  ul.res { list-style: none; padding: 0; margin: 0; }
  ul.res li { padding: 1.6mm 0; border-bottom: 1px solid var(--line); break-inside: avoid; }
  ul.res a, ul.res .t { color: var(--ink); font-weight: 600; text-decoration: none; }
  ul.res a::after { content: " ↗"; color: var(--orange); font-weight: 400; }
  ul.res .by { display: block; color: var(--muted); font-size: 8.5pt; }
  ul.res .url { display: block; color: #8a8f9c; font-family: "IBM Plex Mono", monospace; font-size: 7.5pt; }
  .end { margin-top: 8mm; color: var(--muted); font-size: 8.5pt; }
  .pb { break-before: page; }
</style></head><body>
<header class="cover">
  <div><span class="mark"></span><span class="org">${T.org}</span></div>
  <h1>${e(MONEY.title[lang])}</h1>
  <p>${T.sub}</p>
</header>
<p class="note"><strong>${T.noteLabel}</strong> ${e(MONEY.disclaimer[lang])}</p>

<h2>${T.templates}</h2>
<p class="lead">${T.tplLead}</p>
${templates}

<h2>${T.quotes}</h2>
<p class="lead">${T.quotesLead}</p>
${quotes}

<h2>${T.resources}</h2>
<p class="lead">${T.resLead}</p>
${resources}

<p class="end">${T.end}</p>
</body></html>`;

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true });
const page = await browser.newPage();
await page.setContent(html, { waitUntil: "networkidle0", timeout: 60000 });
await page.evaluateHandle("document.fonts.ready");
await page.pdf({
  path: out, format: "A4", printBackground: true, preferCSSPageSize: true, tagged: true, outline: true,
  displayHeaderFooter: true, headerTemplate: "<span></span>",
  footerTemplate: `<div style="width:100%;font-family:Arial,sans-serif;font-size:7.5pt;color:#8a8f9c;padding:0 17mm;display:flex;justify-content:space-between"><span>${T.footer}</span><span><span class="pageNumber"></span> / <span class="totalPages"></span></span></div>`
});
await browser.close();
console.log("written", path.relative(root, out));
}
