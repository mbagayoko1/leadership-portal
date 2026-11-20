// Word bank of a language module (see languagePacks.js): words, expressions,
// proverbs and quotations grouped by theme, each with a pronunciation hint, a
// definition in the interface language, an example in the target language, a
// tip, a source for quotations, a "use with care" flag, and a link to the
// lesson that teaches it. "Learned" ticks are saved in the user's progress
// (category "wb"; group keys are unique across modules).
import { useState, useEffect, useMemo } from "react";
import { Search, CheckCircle2, Circle, ExternalLink, TriangleAlert } from "lucide-react";
import { Bolded } from "./ModuleGuide.jsx";
import { watchUrl } from "./englishLibrary.js";

const fold = s => s.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
const fill = (s, o) => Object.entries(o).reduce((x, [k, v]) => x.replace("{" + k + "}", v), s);

export default function WordBank({ t, lang, done, onToggle, onTheme, pack }) {
  const k = t.lp;
  const li = lang === "fr" ? 1 : 0;
  const [data, setData] = useState(null);
  const [q, setQ] = useState("");
  const [grp, setGrp] = useState("");
  useEffect(() => {
    let live = true;
    setData(null);
    Promise.all([pack.bank(), pack.videos()])
      .then(([b, v]) => { if (live) setData({ groups: b.default, title: Object.fromEntries(Object.values(v.default).flat().map(x => [x.id, x.t])) }); })
      .catch(() => {});
    return () => { live = false; };
  }, [pack]);

  const f = fold(q.trim());
  const filtering = !!(f || grp);
  const shown = useMemo(() => !data ? [] : data.groups
    .filter(g => !grp || g.k === grp)
    .map(g => ({ ...g, list: g.e.filter(e => !f || fold([e.w, e.d[li], e.ex, e.tip ? e.tip[li] : "", e.by || ""].join(" ")).includes(f)) }))
    .filter(g => g.list.length), [data, grp, f, li]);

  if (!data) return <p className="text-sm text-gray-500" role="status">{t.mg.loading}</p>;
  const all = data.groups.flatMap(g => g.e.map(e => g.k + ":" + e.w));
  const learned = all.filter(id => done[id]).length;
  const matchCount = shown.reduce((n, g) => n + g.list.length, 0);
  const themeName = key => ((pack.themes.find(th => th.k === key) || {}).t || [])[li];

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-semibold text-gray-900 text-lg">{k.bankTitle}</h3>
        <p className="text-sm text-gray-600 mt-1">{pack.bankSub[li]}</p>
        <p className="text-xs font-semibold text-green-700 mt-2">{fill(k.learnedOf, { n: learned, m: all.length })}</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-2">
        <label className="relative flex-1">
          <span className="sr-only">{k.bankSearch}</span>
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" aria-hidden="true" />
          <input type="search" value={q} onChange={e => setQ(e.target.value)} placeholder={k.bankSearch} className="ldp-input pl-9 py-2 w-full" />
        </label>
        <label className="sm:w-72">
          <span className="sr-only">{k.allGroups}</span>
          <select value={grp} onChange={e => setGrp(e.target.value)} className="ldp-input py-2 w-full bg-white">
            <option value="">{k.allGroups}</option>
            {data.groups.map(g => <option key={g.k} value={g.k}>{g.t[li]}</option>)}
          </select>
        </label>
      </div>
      {filtering && <p className="text-xs text-gray-500" aria-live="polite">{matchCount === 1 ? k.entry1 : fill(k.entries, { n: matchCount })}</p>}
      {!shown.length && <p className="text-sm text-gray-600">{k.bankNone}</p>}

      <div className="space-y-2">
        {shown.map(g => {
          const got = g.list.filter(e => done[g.k + ":" + e.w]).length;
          return (
            <details key={g.k + (filtering ? ":f" : "")} open={filtering} className="rounded-lg border border-gray-200 bg-white">
              <summary className="cursor-pointer list-none px-4 py-3 flex items-baseline justify-between gap-3 hover:bg-gray-50 rounded-lg">
                <span className="font-semibold text-gray-900">{g.t[li]}</span>
                <span className="text-xs text-gray-500 whitespace-nowrap">{g.list.length === 1 ? k.entry1 : fill(k.entries, { n: g.list.length })}{got > 0 && <span className="text-green-700 font-semibold"> · {got} ✓</span>}</span>
              </summary>
              <div className="px-4 pb-4">
                <p className="text-sm text-gray-600">{g.i[li]}</p>
                <p className="text-xs text-gray-600 mt-1.5">
                  {g.v && g.v.length > 0 && <><span className="font-semibold text-gray-700">{g.v.length === 1 ? k.lesson : k.lessons}{t.mg.c}</span>
                    {g.v.map((id, j) => <span key={id}>{j ? ", " : ""}<a href={watchUrl(id)} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-700 hover:underline">{data.title[id]}</a></span>)}
                    <span className="text-gray-300 mx-1.5" aria-hidden="true">|</span></>}
                  <button onClick={() => onTheme(g.theme)} className="font-semibold text-blue-700 hover:underline">{k.theme}: {themeName(g.theme)}</button>
                </p>
                <dl className="mt-3 grid lg:grid-cols-2 gap-x-6 gap-y-4">
                  {g.list.map(e => {
                    const id = g.k + ":" + e.w, got1 = !!done[id];
                    return (
                      <div key={id} className={"rounded-md p-3 border " + (got1 ? "border-green-200 bg-green-50/40" : "border-gray-100")}>
                        <dt className="flex items-start justify-between gap-2">
                          <span className="font-semibold text-gray-900" lang={pack.target}>{e.w}</span>
                          <button onClick={() => onToggle(id)} aria-pressed={got1} aria-label={k.markLearned + ": " + e.w} title={got1 ? k.learned : k.markLearned} className="flex-shrink-0 rounded-full">
                            {got1 ? <CheckCircle2 className="w-5 h-5 text-green-600" aria-hidden="true" /> : <Circle className="w-5 h-5 text-gray-300 hover:text-gray-500" aria-hidden="true" />}
                          </button>
                        </dt>
                        <dd className="mt-1 space-y-1 text-sm leading-relaxed">
                          {e.say && <p className="text-xs text-gray-600"><span className="font-semibold">{k.say}{t.mg.c}</span><span className="text-gray-800">{e.say}</span></p>}
                          <p className="text-gray-800">{e.d[li]}</p>
                          <p className="text-gray-600 border-l-2 border-orange-200 pl-2.5" lang={pack.target}><Bolded text={e.ex} /></p>
                          {e.by && <p className="text-xs text-gray-600"><span className="font-semibold">{k.source}{t.mg.c}</span>{e.by}</p>}
                          {e.tip && <p className="text-xs text-gray-600"><span className="font-semibold">{k.tip}{t.mg.c}</span>{e.tip[li]}</p>}
                          {e.care && <p className="text-xs text-orange-800 flex items-start gap-1"><TriangleAlert className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" aria-hidden="true" />{k.care}</p>}
                          {e.v && <p className="text-xs"><a href={watchUrl(e.v)} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-700 hover:underline">{k.lesson}{t.mg.c}{data.title[e.v]}<ExternalLink className="w-3 h-3 inline ml-1 -mt-0.5" aria-hidden="true" /></a></p>}
                        </dd>
                      </div>
                    );
                  })}
                </dl>
              </div>
            </details>
          );
        })}
      </div>
    </div>
  );
}
