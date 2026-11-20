// The vocabulary glossary in the Resources tab: every module's terms in one
// alphabetical list, searchable (accents and case ignored) and filterable by
// module. Each entry shows the term in the other language, taken from the
// same position in the other vocabulary file, and links to its module guide.
import { useState, useEffect, useMemo } from "react";
import { Search, ArrowUpRight } from "lucide-react";
import { Bolded } from "./ModuleGuide.jsx";

const loaders = { en: () => import("./guides/vocab-en.js"), fr: () => import("./guides/vocab-fr.js") };
const fold = s => s.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
const headword = w => w.replace(/\s*\([^)]*\)\s*$/, "");

export default function Glossary({ t, lang, modules, onOpen }) {
  const k = t.glossary;
  const other = lang === "fr" ? "en" : "fr";
  const [vocab, setVocab] = useState(null);
  const [q, setQ] = useState("");
  const [mod, setMod] = useState("");
  useEffect(() => {
    let live = true;
    Promise.all([loaders[lang](), loaders[other]()]).then(([a, b]) => { if (live) setVocab({ cur: a.default, alt: b.default }); }).catch(() => {});
    return () => { live = false; };
  }, [lang, other]);

  const title = id => (modules.find(m => m.id === id) || {}).title || id;
  const entries = useMemo(() => {
    if (!vocab) return [];
    const list = [];
    for (const [id, terms] of Object.entries(vocab.cur)) terms.forEach((v, i) => list.push({ ...v, id, alt: ((vocab.alt[id] || [])[i] || {}).w }));
    return list.sort((a, b) => headword(a.w).localeCompare(headword(b.w), lang, { sensitivity: "base" }));
  }, [vocab, lang]);
  const shown = useMemo(() => {
    const f = fold(q.trim());
    return entries.filter(e => (!mod || e.id === mod) && (!f || fold([e.w, e.alt || "", e.d, e.ex].join(" ")).includes(f)));
  }, [entries, q, mod]);
  const groups = useMemo(() => {
    const g = [];
    for (const e of shown) {
      const letter = fold(headword(e.w))[0].toUpperCase();
      if (!g.length || g[g.length - 1].letter !== letter) g.push({ letter, items: [] });
      g[g.length - 1].items.push(e);
    }
    return g;
  }, [shown]);

  return (
    <section className="ldp-card p-5 mt-4" aria-labelledby="glossary-title">
      <h3 id="glossary-title" className="font-semibold text-gray-800">{k.title}</h3>
      <p className="text-sm text-gray-600 mt-1 mb-4">{k.sub}</p>
      <div className="flex flex-col sm:flex-row gap-2 mb-2">
        <label className="relative flex-1">
          <span className="sr-only">{k.search}</span>
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" aria-hidden="true" />
          <input type="search" value={q} onChange={e => setQ(e.target.value)} placeholder={k.search} className="ldp-input pl-9 py-2 w-full" />
        </label>
        <label className="sm:w-72">
          <span className="sr-only">{k.module}</span>
          <select value={mod} onChange={e => setMod(e.target.value)} className="ldp-input py-2 w-full bg-white">
            <option value="">{k.allModules}</option>
            {modules.filter(m => vocab && vocab.cur[m.id]).map(m => <option key={m.id} value={m.id}>{m.title}</option>)}
          </select>
        </label>
      </div>
      {!vocab ? <p className="text-sm text-gray-500" role="status">{k.loading}</p> : (
        <>
          <p className="text-xs text-gray-500 mb-3" aria-live="polite">{shown.length === 1 ? k.count1 : k.count.replace("{n}", shown.length)}</p>
          {!shown.length && <p className="text-sm text-gray-600">{k.none}</p>}
          <div className="space-y-5">
            {groups.map(g => (
              <div key={g.letter}>
                <p className="font-serif text-xl font-semibold text-orange-700 border-b border-gray-200 pb-1 mb-3" aria-hidden="true">{g.letter}</p>
                <dl className="grid lg:grid-cols-2 gap-x-6 gap-y-4">
                  {g.items.map(e => (
                    <div key={e.id + e.w}>
                      <dt className="font-semibold text-gray-900">{e.w}</dt>
                      <dd className="mt-0.5 space-y-1 text-sm leading-relaxed">
                        {e.alt && <p className="text-xs text-gray-500">{k.other}{t.mg.c}{e.alt}</p>}
                        <p className="text-gray-800">{e.d}</p>
                        <p className="text-gray-600 border-l-2 border-orange-200 pl-2.5"><Bolded text={e.ex} /></p>
                        {e.warn && <p className="text-xs text-gray-500"><span className="font-semibold">{t.mg.warn}{t.mg.c}</span>{e.warn}</p>}
                        <button onClick={() => onOpen(e.id)} className="text-xs font-semibold text-blue-700 hover:underline inline-flex items-center gap-0.5" aria-label={k.open + ": " + title(e.id)}>
                          {title(e.id)}<ArrowUpRight className="w-3 h-3" aria-hidden="true" />
                        </button>
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
