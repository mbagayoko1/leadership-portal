import { useState, useEffect, useMemo, useRef, lazy, Suspense } from "react";
import {
  CheckCircle2, Circle, Book, Mic, Users, Trophy, TrendingUp,
  Calendar, Target, LogOut, User, Settings, Plus, Trash2, Edit2,
  Eye, EyeOff, Save, FolderOpen, ChevronRight, ChevronDown,
  Shield, Play, FileText, Link, ExternalLink, Sparkles,
  UserCheck, UsersRound, Mountain, Activity, Briefcase, Handshake, Megaphone, Lightbulb,
  Compass, BookOpen, PenLine, Wallet, BarChart3, Flag, Folder, Search
} from "lucide-react";
import { RC, ROLES, TC, EF, IU, CUR, SM, CI, DS, DDC, DEFAULT_GOALS } from "./data.js";
import { loadUsers, saveUsers, loadSession, saveSession, clearSession, loadJSON, saveJSON, moveUserData, deleteUserData } from "./storage.js";
import { STR } from "./i18n.js";
import { localizeCurriculum } from "./curriculumFr.js";
import { COMPETENCIES } from "./competencies.js";
import { SPEAKERS, PD_PLAN } from "./development.js";
import { LIBRARY } from "./library.js";

const CoachPanel = lazy(() => import("./coach/CoachPanel.jsx"));
const SpeechLibrary = lazy(() => import("./SpeechLibrary.jsx"));
const SkillModule = lazy(() => import("./SkillModule.jsx"));
const SpeechBuilder = lazy(() => import("./SpeechBuilder.jsx"));

// ─── COMPONENTS ───────────────────────────────────────────────────────────────
function Av({ user, size }) {
  const s = size==="sm"?"w-8 h-8 text-xs":size==="lg"?"w-16 h-16 text-2xl":"w-10 h-10 text-sm";
  if (user.profilePicture) return <img src={user.profilePicture} alt="" className={s+" rounded-full object-cover flex-shrink-0"} />;
  const ini = user.name.split(" ").map(w=>w[0]).slice(0,2).join("").toUpperCase();
  return <div className={s+" rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold flex-shrink-0"}>{ini}</div>;
}
// Signature element: asymmetric UNFPA-orange / brass / verdigris band
function Band() {
  return (
    <div className="h-1 flex">
      <div className="basis-3/5 bg-orange-500"/>
      <div className="basis-1/5 bg-yellow-400"/>
      <div className="basis-1/5 bg-green-500"/>
    </div>
  );
}
// The three-bar mark from the band, used as the portal's logo.
function Mark() {
  return (
    <div className="flex flex-col gap-0.5 flex-shrink-0" aria-hidden="true">
      <div className="h-4 w-1 bg-orange-500 rounded-full"/>
      <div className="h-2 w-1 bg-yellow-400 rounded-full"/>
      <div className="h-1.5 w-1 bg-green-500 rounded-full"/>
    </div>
  );
}
const ROMAN = { p1:"I", p2:"II", p3:"III", p4:"IV" };
const modulesOf = cur => Object.entries(cur).flatMap(([pk,ph])=>ph.modules.map(m=>({...m,pk,phase:ph.name})));
const modNum = id => Number(id.slice(1));
const phaseName = (t,pk) => t["phase"+pk.slice(1)].replace(/^[─\s]*Phase \d+\s*:\s*/,"");
const phaseMonths = (t,ph) => ((/\(([^)]*)\)/.exec(ph.name)||[])[1]||"").replace("Months",t.route.months);

// Signature element: the whole programme on one line, four phases and eleven
// modules, each as wide as its number of weeks. Pass onOpen to make it navigable.
function Route({ t, cur=CUR, done={}, current, onOpen, dark }) {
  const bar=(id)=>done[id]?"bg-green-500":id===current?"bg-orange-500":dark?"bg-white/40":"bg-gray-200";
  return (
    <ol className="flex flex-col md:flex-row gap-3 md:gap-1.5" aria-label={t.route.title}>
      {Object.entries(cur).map(([pk,ph])=>{
        const weeks=ph.modules.reduce((n,m)=>n+m.weeks,0);
        return (
          <li key={pk} className="min-w-0 flex flex-col md:[flex:var(--g)_1_0%]" style={{"--g":weeks}}>
            <p className={"text-xs font-semibold leading-snug "+(dark?"text-white":"text-gray-800")}>{phaseName(t,pk)}</p>
            <p className={"text-xs leading-snug "+(dark?"text-blue-200":"text-gray-500")}>{phaseMonths(t,ph)}</p>
            <ol className="flex gap-0.5 mt-auto pt-1.5">
              {ph.modules.map(m=>{
                const label=t.moduleWord+" "+modNum(m.id)+": "+m.title+" ("+(done[m.id]?t.route.done:m.id===current?t.route.current:t.route.upcoming)+")";
                return (
                  <li key={m.id} className="[flex:var(--g)_1_0%]" style={{"--g":m.weeks}}>
                    {onOpen
                      ?<button onClick={()=>onOpen(m.id)} title={label} aria-label={label} aria-current={m.id===current?"step":undefined} className="group block w-full h-7"><span className={"block h-2.5 rounded-sm transition-all group-hover:h-4 "+bar(m.id)}/></button>
                      :<span title={label} className={"block h-2.5 rounded-sm "+bar(m.id)}/>}
                  </li>
                );
              })}
            </ol>
          </li>
        );
      })}
    </ol>
  );
}
function RouteLegend({ t }) {
  return (
    <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500 mt-1">
      {[["bg-green-500",t.route.done],["bg-orange-500",t.route.current],["bg-gray-200",t.route.upcoming]].map(([c,l])=>(
        <li key={l} className="flex items-center gap-1.5"><span className={"w-2.5 h-2.5 rounded-sm "+c}/>{l}</li>
      ))}
    </ul>
  );
}
function PageHead({ title, sub, children }) {
  return (
    <header className="flex flex-wrap items-end justify-between gap-3 mb-5">
      <div className="min-w-0">
        <h2 className="text-3xl font-semibold text-gray-900 leading-tight">{title}</h2>
        {sub&&<p className="text-sm text-gray-600 mt-1 max-w-2xl">{sub}</p>}
      </div>
      {children}
    </header>
  );
}
// One quiet row for every external resource, whatever its type.
function ResLink({ href, icon:I, title, meta, tag }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-3 py-2.5 bg-white border border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50/50 transition-colors">
      <I className="w-4 h-4 text-orange-600 flex-shrink-0" aria-hidden="true"/>
      <span className="flex-1 min-w-0"><span className="block text-sm font-semibold text-gray-800 leading-snug">{title}</span>{meta&&<span className="block text-xs text-gray-500">{meta}</span>}</span>
      {tag&&<Tg tag={tag}/>}
    </a>
  );
}
// Public reference documents, grouped, in the Resources tab.
function Library({ t, lang }) {
  return (
    <section className="ldp-card p-5 mt-4" aria-labelledby="library-title">
      <h3 id="library-title" className="font-semibold text-gray-800">{t.library.title}</h3>
      <p className="text-sm text-gray-600 mt-1 mb-4">{t.library.sub}</p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-5 items-start">
        {LIBRARY.map(g=>(
          <div key={g.id}>
            <h4 className="text-sm font-bold text-gray-700 mb-2">{g.title[lang]||g.title.en}</h4>
            <div className="space-y-2">{g.items.map(x=><ResLink key={x.u} href={x.u} icon={x.pdf?FileText:BookOpen} title={x.t} meta={x.by+". "+(x.d[lang]||x.d.en)} tag={x.pdf?"PDF":undefined}/>)}</div>
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-500 mt-4">{t.library.note}</p>
    </section>
  );
}
// One sourced line for the day, the same for everyone. Skips unsourced lines and book titles.
function DailyQuote({ t, lang }) {
  const pool=useMemo(()=>SPEAKERS.flatMap(s=>s.quotes.filter(q=>!/widely attributed|attributed|title/i.test(q.source)).map(q=>({...q,by:s.name}))),[]);
  const q=pool[Math.floor(Date.now()/86400000)%pool.length];
  if(!q) return null;
  return (
    <figure className="ldp-card p-5 border-l-4 border-l-yellow-400">
      <figcaption className="text-xs font-semibold text-gray-500 mb-1">{t.dailyQuote}</figcaption>
      <blockquote className="font-serif italic text-lg text-gray-800 leading-snug">“{lang==="fr"&&q.fr?q.fr:q.text}”</blockquote>
      <p className="text-xs text-gray-500 mt-2">{q.by}, {q.source}</p>
    </figure>
  );
}
// One icon per entry of STR[lang].compItems, in the same order.
const COMP_ICONS = [UserCheck, UsersRound, Mountain, Activity, Briefcase, Handshake, Megaphone];
function Competencies({ t, selected, onSelect }) {
  return (
    <div className="ldp-card p-4">
      <h3 className="font-semibold text-gray-800">{t.compTitle}</h3>
      <p className="text-xs text-gray-500 mt-0.5 mb-3">{t.compPick}</p>
      <ul className="space-y-1">
        {t.compItems.map((item,i)=>{
          const Icon=COMP_ICONS[i]||CheckCircle2;
          const on=selected===i;
          return (
            <li key={i}>
              <button onClick={()=>onSelect(i)} aria-pressed={on} className={"w-full text-left flex items-start gap-2.5 px-2.5 py-2 rounded-lg transition-colors "+(on?"bg-orange-50 shadow-[inset_3px_0_0_#E85D1F]":"hover:bg-gray-100")}>
                <Icon className={"w-4 h-4 mt-0.5 flex-shrink-0 "+(on?"text-orange-700":"text-gray-500")} aria-hidden="true"/>
                <span className={"text-sm leading-snug flex-1 "+(on?"font-semibold text-gray-900":"text-gray-700")}>{item}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
function CompetencyDetail({ t, lang, index }) {
  const c=COMPETENCIES[index];
  if(!c) return null;
  const Icon=COMP_ICONS[index]||CheckCircle2;
  const head=(I,label,n)=><h4 className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2"><I className="w-4 h-4 text-orange-500"/>{label}<span className="font-mono text-[10px] text-gray-400">{n}</span></h4>;
  return (
    <div className="ldp-card overflow-hidden fade-up">
      <div className="p-5 border-b border-gray-100 flex items-start gap-3">
        <Icon className="w-5 h-5 text-orange-600 flex-shrink-0 mt-1" aria-hidden="true"/>
        <div>
          <h3 className="text-xl font-semibold font-serif text-gray-900 leading-snug">{t.compItems[index]}</h3>
        </div>
      </div>
      <div className="p-5 space-y-5">
        <p className="text-sm text-gray-700 leading-relaxed">{c.overview[lang]||c.overview.en}</p>
        <div>
          <h4 className="text-sm font-bold text-gray-700 mb-2">{t.compPractice}</h4>
          <ul className="space-y-1.5">{(c.practice[lang]||c.practice.en).map((p,i)=><li key={i} className="text-sm text-gray-600 pl-3 border-l-2 border-orange-200">{p}</li>)}</ul>
        </div>
        <div>
          {head(Play,t.compVideos,c.vids.length)}
          <div className="space-y-2">{c.vids.map((v,i)=><ResLink key={i} href={v.u} icon={Play} title={v.t} meta={v.s+(v.d?" · "+v.d:"")} tag={v.g}/>)}</div>
        </div>
        <div>
          {head(Link,t.compArticles,c.arts.length)}
          <div className="space-y-2">{c.arts.map((a,i)=><ResLink key={i} href={a.u} icon={/\((PDF|image)\)$/.test(a.t)?FileText:Link} title={a.t} tag={a.s}/>)}</div>
        </div>
        <div>
          {head(Book,t.compBooks,c.books.length)}
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">{c.books.map((b,i)=>(
            <li key={i} className="p-3 rounded-lg bg-gray-50 border border-gray-100">
              <p className="text-sm font-semibold text-gray-800 font-serif italic">{b.t}</p>
              <p className="text-xs text-gray-500 mt-0.5">{b.a} · {b.y}</p>
            </li>
          ))}</ul>
        </div>
      </div>
    </div>
  );
}
function PersonalDevelopment({ t, lang, user, done, onToggle, selected, onSelect, onCoach, onConnect, view, onView, speech, onSpeech, spDone, onSpToggle, skDone, onSkToggle, skStage, onSkStage }) {
  const p=t.pd;
  const views=[["plan",p.viewPlan,Compass],["speeches",p.viewSpeeches,BookOpen],["builder",p.viewBuilder,PenLine],["data",p.viewData,BarChart3],["writing",p.viewWriting,FileText],["facilitation",p.viewFac,Users],["mc",p.viewMc,Mic],["money",p.viewMoney,Wallet]];
  const sp=SPEAKERS[selected]||SPEAKERS[0];
  const nWeeks=PD_PLAN.filter(w=>done[w.id]).length;
  const nameOf=id=>(SPEAKERS.find(s=>s.id===id)||{}).name;
  const groups=[["speaker",p.speakers],["coach",p.coaches],["research",p.research],["africa",p.africa],["classic",p.classics],["channel",p.channels]];
  const [q,setQ]=useState("");
  const norm=x=>x.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");
  const shown=s=>{const k=norm(q.trim());return !k||norm(s.name+" "+(s.theme[lang]||s.theme.en)+" "+(s.role[lang]||s.role.en)).includes(k);};
  const nShown=SPEAKERS.filter(shown).length;
  const finder=(
    <div className="relative">
      <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true"/>
      <input type="search" value={q} onChange={e=>setQ(e.target.value)} placeholder={p.findVoice} aria-label={p.findVoice} className="ldp-input py-2 pl-9"/>
    </div>
  );
  return (
    <div className="space-y-4">
      <div>
        <PageHead title={p.title} sub={p.sub}/>
        <div role="tablist" aria-label={p.title} className="ldp-subtabs">
          {views.map(([k,label,Icon])=>(
            <button key={k} role="tab" aria-selected={view===k} onClick={()=>onView(k)} className="ldp-subtab">
              <Icon className="w-4 h-4" aria-hidden="true"/>{label}
            </button>
          ))}
        </div>
      </div>
      {view==="builder"?(
        <Suspense fallback={<div className="ldp-card p-6 text-sm text-gray-500">…</div>}>
          <SpeechBuilder t={t} lang={lang} user={user} onCoach={onCoach} onConnect={onConnect}/>
        </Suspense>
      ):view==="speeches"?(
        <Suspense fallback={<div className="ldp-card p-6 text-sm text-gray-500">…</div>}>
          <SpeechLibrary t={t} lang={lang} done={spDone} onToggle={onSpToggle} selected={speech} onSelect={onSpeech} onCoach={onCoach}/>
        </Suspense>
      ):(["data","writing","facilitation","mc","money"].includes(view))?(
        <Suspense fallback={<div className="ldp-card p-6 text-sm text-gray-500">…</div>}>
          <SkillModule key={view} id={view} t={t} lang={lang} done={skDone} onToggle={onSkToggle} stage={skStage[view]} onStage={id=>onSkStage({...skStage,[view]:id})} onCoach={onCoach}/>
        </Suspense>
      ):<>
      <div className="ldp-card p-4">
        <div className="flex justify-between items-baseline mb-1"><h3 className="font-semibold text-gray-800">{p.plan}</h3><span className="font-mono text-xs text-orange-600">{p.weeksDone(nWeeks,PD_PLAN.length)}</span></div>
        <p className="text-xs text-gray-500 mb-3">{p.planSub}</p>
        <div className="ldp-progress-bar h-1.5 mb-3"><div className="ldp-progress-fill h-1.5" style={{width:(nWeeks/PD_PLAN.length*100)+"%"}}/></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {PD_PLAN.map(w=>(
            <div key={w.id} className={"rounded-lg border p-3 "+(done[w.id]?"bg-green-50 border-green-200":"bg-gray-50 border-gray-100")}>
              <button onClick={()=>onToggle(w.id)} aria-pressed={!!done[w.id]} className="flex items-center gap-2 text-left w-full">
                {done[w.id]?<CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0"/>:<Circle className="w-5 h-5 text-gray-300 flex-shrink-0"/>}
                <span className="text-sm font-semibold text-gray-800">{w.title[lang]||w.title.en}</span>
              </button>
              <ul className="mt-2 space-y-1">{(w.steps[lang]||w.steps.en).map((s,i)=><li key={i} className="text-xs text-gray-600 pl-3 border-l-2 border-orange-200">{s}</li>)}</ul>
              <p className="text-[11px] text-gray-400 mt-2">{w.speakers.map(nameOf).join(" · ")}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[16rem_minmax(0,1fr)] gap-4 items-start">
      <div className="lg:hidden space-y-2">
        {finder}
        <label htmlFor="pd-voice" className="ldp-label">{p.voices} <span className="font-mono font-normal text-gray-400">({nShown})</span></label>
        <select id="pd-voice" value={selected} onChange={e=>onSelect(+e.target.value)} className="ldp-input py-2">
          {groups.map(([kind,label])=>SPEAKERS.some((s,i)=>s.kind===kind&&(shown(s)||i===selected))&&<optgroup key={kind} label={label}>{SPEAKERS.map((s,i)=>s.kind===kind&&(shown(s)||i===selected)&&<option key={s.id} value={i}>{s.name}</option>)}</optgroup>)}
        </select>
      </div>
      <nav aria-label={p.voices} className="hidden lg:block ldp-card p-3 sticky top-6 max-h-[calc(100vh-3rem)] overflow-y-auto space-y-4">
        {finder}
        {nShown===0&&<p className="text-sm text-gray-500 px-2">{p.noVoice}</p>}
        {groups.map(([kind,label])=>SPEAKERS.some(s=>s.kind===kind&&shown(s))&&(
          <div key={kind}>
            <p className="ldp-eyebrow px-2 mb-1">{label} <span className="font-mono font-normal text-gray-400">{SPEAKERS.filter(s=>s.kind===kind&&shown(s)).length}</span></p>
            <ul>{SPEAKERS.map((s,i)=>s.kind===kind&&shown(s)&&(
              <li key={s.id}><button onClick={()=>onSelect(i)} aria-current={selected===i?"true":undefined} className={"w-full text-left px-2 py-1.5 rounded-lg transition-colors "+(selected===i?"bg-orange-50 shadow-[inset_3px_0_0_#E85D1F]":"hover:bg-gray-100")}>
                <span className={"block text-sm leading-snug "+(selected===i?"font-semibold text-gray-900":"text-gray-700")}>{s.name}</span>
                <span className="block text-xs text-gray-500 leading-snug">{s.theme[lang]||s.theme.en}</span>
              </button></li>
            ))}</ul>
          </div>
        ))}
      </nav>
      <div className="ldp-card overflow-hidden fade-up" key={sp.id}>
        <div className="p-5 border-b border-gray-100">
          <p className="ldp-eyebrow">{sp.theme[lang]||sp.theme.en}</p>
          <h3 className="text-2xl font-semibold text-gray-900 font-serif">{sp.name}</h3>
          <p className="text-sm text-gray-500">{sp.role[lang]||sp.role.en}</p>
        </div>
        <div className="p-5 space-y-5">
          {sp.quotes.length>0&&(
            <div>
              <h4 className="text-sm font-bold text-gray-700 mb-2">{p.quotes} <span className="font-mono text-xs text-gray-400">({sp.quotes.length})</span></h4>
              <div className="space-y-3">{sp.quotes.map((q,i)=>(
                <figure key={i} className={"border-l-4 border-yellow-400 pl-4 "+(i?"":"pb-1")}>
                  <blockquote className={"font-serif italic text-gray-800 leading-snug "+(i?"":"text-lg")}>“{lang==="fr"&&q.fr?q.fr:q.text}”</blockquote>
                  {lang==="fr"&&q.fr&&q.orig!=="fr"&&<p className="text-xs text-gray-500 italic mt-0.5">“{q.text}”</p>}
                  <figcaption className="text-xs text-gray-500 mt-1">— {sp.name}, {q.source}{q.orig==="fr"?(lang==="fr"?"":" · "+p.fromFr):lang==="fr"?" · "+(q.fr?p.freeTr:p.quoteNote):""}</figcaption>
                </figure>
              ))}</div>
              {sp.kind==="classic"&&sp.channel.includes("gutenberg.org")&&<p className="text-[11px] text-gray-400 mt-2">{p.classicNote}</p>}
            </div>
          )}
          <div>
            <h4 className="text-sm font-bold text-gray-700 mb-2">{p.ideas}</h4>
            <ul className="space-y-2">{(sp.ideas[lang]||sp.ideas.en).map((x,i)=><li key={i} className="text-sm text-gray-700 pl-3 border-l-2 border-orange-300 leading-relaxed">{x}</li>)}</ul>
          </div>
          {sp.caution&&<div className="text-xs text-amber-900 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2"><strong>{p.note2}:</strong> {sp.caution[lang]||sp.caution.en}</div>}
          <div className="bg-orange-50 border-l-4 border-orange-500 rounded-lg px-4 py-3">
            <p className="text-xs font-bold text-orange-800 mb-1">{p.practice}</p>
            <p className="text-sm text-gray-800">{sp.practice[lang]||sp.practice.en}</p>
          </div>
          {sp.vids.length>0&&<div>
            <h4 className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2"><Play className="w-4 h-4 text-orange-500"/>{p.watch}</h4>
            <div className="space-y-2">{sp.vids.map((v,i)=><ResLink key={i} href={v.u} icon={Play} title={v.t} meta={v.by} tag={v.u.includes("ted.com")?"TED":v.u.includes("youtube.com")?"YouTube":undefined}/>)}</div>
          </div>}
          <div className="flex flex-wrap gap-2">
            <a href={sp.channel} target="_blank" rel="noopener noreferrer" className="text-sm px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-700">{sp.channel.includes("gutenberg.org")?p.openBook:sp.channel.includes("ted.com/speakers")?p.openTed:sp.channel.includes("youtube.com")?p.openChannel:p.openSite}</a>
            <button onClick={onCoach} className="text-sm px-3 py-1.5 rounded-lg bg-purple-700 hover:bg-purple-800 text-white font-semibold">{p.practiseCoach}</button>
          </div>
        </div>
      </div>
      </div>
      <details className="ldp-card px-4 py-3 text-xs text-gray-600">
        <summary className="cursor-pointer font-semibold text-gray-700">{p.sources}</summary>
        <p className="mt-2 leading-relaxed">{p.note}</p>
      </details>
      </>}
    </div>
  );
}
function LangSwitch({ lang, setLang, light }) {
  return (
    <div className={"flex rounded-lg overflow-hidden border text-xs "+(light?"border-gray-300":"border-white/25")}>
      {[["en","EN"],["fr","FR"]].map(([l,label])=>(
        <button key={l} onClick={()=>setLang(l)} aria-pressed={lang===l} className={"px-2.5 py-1 font-semibold "+(lang===l?(light?"bg-purple-700 text-white":"bg-white text-purple-800"):(light?"text-gray-600 hover:bg-gray-100":"text-white/80 hover:bg-white/10"))}>{label}</button>
      ))}
    </div>
  );
}
function Bdg({ role, t }) { return <span className={"text-xs px-2 py-0.5 rounded-full font-semibold capitalize "+(RC[role]||"bg-gray-100 text-gray-600")}>{(t&&t.roleNames[role])||role}</span>; }
function Tg({ tag }) { return <span className={"text-xs px-1.5 py-0.5 rounded font-semibold "+(TC[tag]||"bg-gray-100 text-gray-600")}>{tag}</span>; }
function DN({ node, depth, open, setOpen, openLabel }) {
  const has = node.ch && node.ch.length > 0;
  const isOpen = open[node.id];
  const kids = has && isOpen ? node.ch.map(c => <DN key={c.id} node={c} depth={depth+1} open={open} setOpen={setOpen} openLabel={openLabel} />) : null;
  const ico = has ? (isOpen ? <ChevronDown className="w-3.5 h-3.5 text-gray-400 flex-shrink-0"/> : <ChevronRight className="w-3.5 h-3.5 text-gray-400 flex-shrink-0"/>) : <span className="w-3.5"/>;
  return (
    <div>
      <div className="flex items-center gap-2 py-1.5 rounded hover:bg-blue-50 cursor-pointer group" style={{paddingLeft:(depth*18+8)+"px"}}
        role={has?"button":undefined} tabIndex={has?0:undefined} aria-expanded={has?!!isOpen:undefined}
        onClick={()=>{ if(has) setOpen(s=>({...s,[node.id]:!s[node.id]})); }}
        onKeyDown={e=>{ if(has&&e.target===e.currentTarget&&(e.key==="Enter"||e.key===" ")){ e.preventDefault(); setOpen(s=>({...s,[node.id]:!s[node.id]})); } }}>
        {ico}
        <Folder className="w-4 h-4 text-blue-400 flex-shrink-0" aria-hidden="true"/>
        <span className="text-sm text-gray-700 flex-1">{node.label}</span>
        {/* Always visible on touch screens; revealed on hover or keyboard focus on larger screens. */}
        <a href={node.url} target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()} className="lg:opacity-0 lg:group-hover:opacity-100 focus:opacity-100 text-xs text-blue-500 pr-3 transition-opacity">{openLabel}</a>
      </div>
      {kids}
    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [lang,setLangState]=useState(()=>{ try { return localStorage.getItem("ldp_lang")||"en"; } catch(e){ return "en"; } });
  // Curriculum text in the interface language (module titles, tasks, questions).
  const L=useMemo(()=>localizeCurriculum(lang),[lang]);
  const MODULES=useMemo(()=>modulesOf(L.CUR),[L]);
  function setLang(l){ setLangState(l); try { localStorage.setItem("ldp_lang",l); } catch(e){} }
  const t = STR[lang];

  const [users,setUsers]=useState(IU);
  const [li,setLi]=useState(false);
  const [me,setMe]=useState(null);
  const [ready,setReady]=useState(false);

  useEffect(()=>{
    (async()=>{
      // Load shared user list — merge with defaults so the admin and mentor always exist
      const saved = await loadUsers();
      // The mentor account moved from James Emmanuel Wanki (james.wanki) to
      // Moussa Bagayoko (moussa.bagayoko); retire the old seeded account and
      // hand its workspace to the new one.
      const legacy = saved && Object.keys(saved).filter(k=>saved[k].username==="james.wanki");
      if (legacy && legacy.length) { legacy.forEach(k=>delete saved[k]); moveUserData("james.wanki","moussa.bagayoko"); }
      // Users are keyed by username everywhere (lookups, edit, delete). Older
      // saves keyed the seeded mentor as "moussa"; re-key so each account
      // appears once, with the saved copy taking precedence over the seed.
      const rekeyed = saved && Object.keys(saved).some(k=>saved[k].username!==k);
      const u = Object.fromEntries([...Object.values(IU), ...Object.values(saved||{})].filter(x=>x&&x.username).map(x=>[x.username,x]));
      setUsers(u);
      // Seed shared storage on first run, or rewrite it after a migration
      if (!saved || (legacy && legacy.length) || rekeyed) await saveUsers(u);
      // Restore personal session
      let sess = await loadSession();
      if (sess && sess.username==="james.wanki") { sess={username:"moussa.bagayoko"}; await saveSession(sess.username); }
      const su = sess && Object.values(u).find(x=>x.username===sess.username);
      if (su) { setMe({...su}); setLi(true); }
      setReady(true);
    })();
  },[]);
  const [lf,setLf]=useState({username:"",password:""});
  const [le,setLe]=useState("");
  const [sr,setSr]=useState(false);
  const [rf,setRf]=useState({name:"",username:"",email:"",password:"",confirm:""});
  const [re,setRe]=useState("");
  const [rok,setRok]=useState(false);
  const [tab,setTab]=useState("dashboard");
  const [prog,setProg]=useState({mod:{},rt:{},ve:{}});
  const [sm,setSm]=useState("m1");
  const [st,setSt]=useState("guide");
  const [dop,setDop]=useState(()=>Object.fromEntries(DS.map(n=>[n.id,true])));
  const [uv,setUv]=useState("list");
  const [ut,setUt]=useState(null);
  const [uf,setUf]=useState(EF());
  const [ue,setUe]=useState("");
  const [sp,setSp]=useState(false);
  const [dc,setDc]=useState(null);
  const [uq,setUq]=useState("");
  const [ur,setUr]=useState("all");
  const [mt,setMt]=useState("overview");
  const [cp,setCp]=useState(0);
  const [pdSel,setPdSel]=useState(0);
  const [pdView,setPdView]=useState("plan");
  const [spSel,setSpSel]=useState("s01");
  const [skStage,setSkStage]=useState({});
  // The coach stays mounted after its first visit so an open conversation
  // survives a trip to the module or resource it linked to.
  const [coachOpened,setCoachOpened]=useState(false);
  useEffect(()=>{ if(tab==="coach") setCoachOpened(true); },[tab]);
  // On narrow screens the tab bar scrolls sideways; keep the active tab visible.
  // A new section always starts at the top of the page.
  useEffect(()=>{ window.scrollTo(0,0); },[tab]);
  useEffect(()=>{ const tb=tabs.find(x=>x.k===tab); document.title=(li&&tb?tb.l+" · ":"")+"Leadership & Communication Mastery · UNFPA WCARO"; },[tab,lang,li]);
  const [openMods,setOpenMods]=useState({});
  // Opens a module in the Curriculum (from the Route) and scrolls to it.
  function openModule(id){ setTab("curriculum"); setOpenMods(o=>({...o,[id]:true})); setTimeout(()=>{ const el=document.getElementById("mod-"+id); if(el) el.scrollIntoView({block:"start"}); },60); }
  const navRef=useRef(null);
  useEffect(()=>{ const el=navRef.current&&navRef.current.querySelector('[aria-current="page"]'); if(el) el.scrollIntoView({block:"nearest",inline:"nearest"}); },[tab]);
  // Opens a target from an AI Coach link: tab:<name>, module:<id>,
  // competency:<id>, speaker:<id>, speech:<id> or skill:<module>.
  function coachNavigate(target){
    const [kind,id]=target.split(":");
    if(kind==="tab"){ const tabs={dashboard:"dashboard",curriculum:"curriculum",study:"study-guide",development:"development",resources:"resources",drive:"drive"}; if(tabs[id]) setTab(tabs[id]); }
    else if(kind==="module"){ setSm(id); setSt("guide"); setTab("study-guide"); }
    else if(kind==="competency"){ const i=COMPETENCIES.findIndex(c=>c.id===id); if(i>=0){ setCp(i); setTab("resources"); } }
    else if(kind==="speaker"){ const i=SPEAKERS.findIndex(s=>s.id===id); if(i>=0){ setPdSel(i); setPdView("plan"); setTab("development"); } }
    else if(kind==="skill"){ setPdView(id); setTab("development"); } // id already checked by the coach's navLabel
    else if(kind==="speech"){ setSpSel(id); setPdView("speeches"); setTab("development"); } // id already checked by the coach's navLabel
    window.scrollTo(0,0);
  }
  const [ms,setMs]=useState([]);
  const [mn,setMn]=useState({});
  const [mg,setMg]=useState(DEFAULT_GOALS);
  const [ns,setNs]=useState({participant:"",date:"",type:"1:1",notes:""});
  const [sas,setSas]=useState(false);
  const [ng,setNg]=useState("");

  // Per-user persistence: load on login, save on change.
  // loadedRef guards the save effects so they can't overwrite stored data
  // with defaults before the (async) load for the current user has applied.
  const loadedRef = useRef(null);
  const meUsername = me ? me.username : null;
  useEffect(()=>{
    if(!meUsername){ loadedRef.current=null; return; }
    loadedRef.current=null;
    let alive = true;
    (async()=>{
      const [p,s,g,n] = await Promise.all([
        loadJSON("prog_"+meUsername,{mod:{},rt:{},ve:{}}),
        loadJSON("sessions_"+meUsername,[]),
        loadJSON("goals_"+meUsername,DEFAULT_GOALS),
        loadJSON("notes_"+meUsername,{})
      ]);
      if(!alive) return;
      setProg(p); setMs(s); setMg(g); setMn(n);
      loadedRef.current=meUsername;
    })();
    return ()=>{ alive=false; };
  },[meUsername]);
  useEffect(()=>{ if(meUsername&&loadedRef.current===meUsername) saveJSON("prog_"+meUsername,prog); },[prog]);
  useEffect(()=>{ if(meUsername&&loadedRef.current===meUsername) saveJSON("sessions_"+meUsername,ms); },[ms]);
  useEffect(()=>{ if(meUsername&&loadedRef.current===meUsername) saveJSON("goals_"+meUsername,mg); },[mg]);
  useEffect(()=>{ if(meUsername&&loadedRef.current===meUsername) saveJSON("notes_"+meUsername,mn); },[mn]);

  function login() { const un=lf.username.trim().toLowerCase(); const u=Object.values(users).find(u=>u.username.toLowerCase()===un&&u.password===lf.password); if(u){setMe({...u});setLi(true);setLe("");saveSession(u.username);}else setLe(t.invalidCreds); }
  function reg() {
    setRe("");
    if(!rf.name.trim()||!rf.username.trim()||!rf.email.trim()||!rf.password.trim()){setRe(t.errAllRequired);return;}
    if(rf.password!==rf.confirm){setRe(t.errNoMatch);return;}
    if(rf.password.length<6){setRe(t.errMinChars);return;}
    const un=rf.username.trim().toLowerCase();
    if(!/^[a-z0-9._-]{3,30}$/.test(un)){setRe(t.errUsernameFormat);return;}
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(rf.email.trim())){setRe(t.errEmail);return;}
    if(Object.values(users).some(x=>x.username.toLowerCase()===un)){setRe(t.errTaken);return;}
    setUsers(p=>{const n={...p,[un]:{username:un,password:rf.password,role:"participant",name:rf.name.trim(),email:rf.email.trim(),title:"",organization:"",description:"",profilePicture:null}};saveUsers(n);return n;});
    setRok(true);
    setTimeout(()=>{setSr(false);setRok(false);setRf({name:"",username:"",email:"",password:"",confirm:""});},2000);
  }
  // Clears the signed-in user's data and screen state so nothing carries over
  // to the next person who signs in on this browser.
  function logout(){setLi(false);setMe(null);setLf({username:"",password:""});setLe("");setTab("dashboard");setCoachOpened(false);clearSession();
    setProg({mod:{},rt:{},ve:{}});setMs([]);setMg(DEFAULT_GOALS);setMn({});
    setSm("m1");setSt("guide");setCp(0);setPdSel(0);setPdView("plan");setSpSel("s01");setSkStage({});setOpenMods({});setMt("overview");setUv("list");setUt(null);}
  function tp(cat,id){setProg(p=>{const c=p[cat]||{};return {...p,[cat]:{...c,[id]:!c[id]}};})}
  function pct(){let tt=0,d=0;Object.values(L.CUR).forEach(ph=>ph.modules.forEach(m=>{tt++;if(prog.mod[m.id])d++;}));return tt?Math.round(d/tt*100):0;}
  const pts=Object.values(users).filter(u=>u.role==="participant");
  const dg=mg.filter(g=>g.done).length;
  const gp=mg.length?Math.round(dg/mg.length*100):0;
  function addS(){if(!ns.participant||!ns.date)return;setMs(p=>[...p,{...ns,id:Date.now()}]);setNs({participant:"",date:"",type:"1:1",notes:""});setSas(false);}
  function tg(id){setMg(p=>p.map(g=>g.id===id?{...g,done:!g.done}:g));}
  function ag(){if(!ng.trim())return;setMg(p=>[...p,{id:Date.now(),text:ng,done:false}]);setNg("");}
  function dg2(id){setMg(p=>p.filter(g=>g.id!==id));}
  function us(){
    setUe("");
    if(!uf.name.trim()||!uf.username.trim()||!uf.email.trim()){setUe(t.errNameReq);return;}
    if(uv==="create"&&!uf.password.trim()){setUe(t.errPwdReq);return;}
    const un=uf.username.trim().toLowerCase();
    if(!/^[a-z0-9._-]{3,30}$/.test(un)){setUe(t.errUsernameFormat);return;}
    const clash=Object.values(users).some(x=>x.username.toLowerCase()===un&&x.username!==ut);
    if(uv==="create"&&clash){setUe(t.errExists);return;}
    if(uv==="edit"&&clash){setUe(t.errTaken);return;}
    const u={...uf,username:un,name:uf.name.trim(),email:uf.email.trim()};if(!u.password&&uv==="edit")u.password=users[ut].password;
    // A renamed account keeps its progress, goals, notes and coach history.
    if(uv==="edit"&&ut!==un){ moveUserData(ut,un); if(me.username===ut) saveSession(un); }
    setUsers(p=>{const n={...p};if(uv==="edit"&&ut!==u.username)delete n[ut];n[u.username]=u;if(me.username===ut)setMe(u);saveUsers(n);return n;});
    setUv("list");setUf(EF());setUt(null);
  }
  function ud(un){if(un===me.username)return;deleteUserData(un);setUsers(p=>{const n={...p};delete n[un];saveUsers(n);return n;});setDc(null);if(uv==="detail"&&ut===un){setUv("list");setUt(null);}}
  function ui(e){const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onloadend=()=>setUf(fm=>({...fm,profilePicture:r.result}));r.readAsDataURL(f);}
  const fu=Object.values(users).filter(u=>{const q=uq.toLowerCase();return(!q||u.name.toLowerCase().includes(q)||u.username.toLowerCase().includes(q)||u.email.toLowerCase().includes(q))&&(ur==="all"||u.role===ur);});
  const all=[...L.SM,...L.CI];
  const cur=all.find(m=>m.id===sm)||L.SM[0];
  const op=pct();
  const nextMod=MODULES.find(m=>!prog.mod[m.id]);
  const nDone=MODULES.filter(m=>prog.mod[m.id]).length;
  const firstName=me?me.name.split(" ")[0]:"";
  const tabs=[{k:"dashboard",l:t.nav.dashboard,I:TrendingUp},{k:"curriculum",l:t.nav.curriculum,I:Calendar},{k:"study-guide",l:t.nav.study,I:Book},{k:"development",l:t.nav.development,I:Lightbulb},{k:"coach",l:t.nav.coach,I:Sparkles},{k:"resources",l:t.nav.resources,I:Trophy},{k:"drive",l:t.nav.drive,I:FolderOpen},...(me&&me.role==="admin"?[{k:"users",l:t.nav.users,I:Users}]:[])];

  if(!ready){ return <div className="min-h-screen bg-purple-700 flex items-center justify-center"><div className="text-center text-white"><div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"/><p className="font-semibold">{t.loading}</p></div></div>; }
  if(!li){
    return (
      <div className="min-h-screen bg-gray-50 lg:grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
        <aside className="bg-purple-700 text-white flex flex-col px-6 py-6 lg:px-14 lg:py-12">
          <div className="flex items-center gap-3"><Mark/><p className="text-sm font-semibold">UNFPA WCARO</p></div>
          <div className="mt-6 lg:mt-auto">
            <h1 className="text-3xl lg:text-5xl font-semibold leading-[1.08] max-w-xl">Leadership &amp; Communication Development Portal</h1>
            <p className="text-blue-100 mt-3 lg:mt-5 max-w-lg lg:text-lg">{t.loginIntro}</p>
          </div>
          <div className="hidden lg:block mt-10 mb-auto"><Route t={t} cur={L.CUR} dark/></div>
          <p className="hidden lg:block text-xs text-blue-200 mt-10">{t.loginSubtitle}</p>
        </aside>
        <main className="relative flex flex-col items-center justify-center px-6 py-10 lg:py-12">
          <div className="absolute top-4 right-4"><LangSwitch lang={lang} setLang={setLang} light/></div>
          <div className="w-full max-w-sm">
            <h2 className="text-3xl font-semibold text-gray-900 mb-5">{sr?t.requestAccess:t.signIn}</h2>
            {!sr?(
              <form className="space-y-4" onSubmit={e=>{e.preventDefault();login();}}>
                <div><label htmlFor="li-user" className="ldp-label">{t.username}</label><input id="li-user" type="text" autoComplete="username" value={lf.username} onChange={e=>setLf(f=>({...f,username:e.target.value}))} className="ldp-input bg-white" placeholder={t.enterUsername}/></div>
                <div><label htmlFor="li-pass" className="ldp-label">{t.password}</label><input id="li-pass" type="password" autoComplete="current-password" value={lf.password} onChange={e=>setLf(f=>({...f,password:e.target.value}))} className="ldp-input bg-white" placeholder={t.enterPassword}/></div>
                {le&&<div role="alert" className="bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-red-700 text-sm">{le}</div>}
                <button type="submit" className="ldp-btn-primary">{t.signInBtn}</button>
                <p className="text-sm text-gray-600">{t.needAccess} <button type="button" onClick={()=>{setSr(true);setRe("");setLe("");}} className="font-semibold text-orange-700 hover:underline">{t.requestAccess}</button></p>
              </form>
            ):rok?(
              <div className="space-y-3">
                <CheckCircle2 className="w-10 h-10 text-green-600"/>
                <h3 className="font-semibold text-gray-800 text-lg">{t.accountCreated}</h3>
                <p className="text-gray-600 text-sm">{t.accountCreatedDesc}</p>
                <div className="ldp-card p-3 space-y-1.5">
                  <p className="text-xs font-semibold text-gray-800">{t.accessIncludes}</p>
                  <p className="text-xs text-gray-600">{t.accessGuides}</p>
                  <p className="text-xs text-gray-600">{t.accessVideos}</p>
                  <p className="text-xs text-gray-600">{t.accessFolders}</p>
                </div>
                <p className="text-gray-500 text-xs">{t.redirecting}</p>
              </div>
            ):(
              <form className="space-y-3" onSubmit={e=>{e.preventDefault();reg();}}>
                <p className="text-xs text-gray-600">{t.regNote1}<strong>{t.regNoteBold}</strong>{t.regNote2}</p>
                {[[t.fullName,"name","text","name"],[t.username,"username","text","username"],[t.email,"email","email","email"],[t.password,"password","password","new-password"],[t.confirmPassword,"confirm","password","new-password"]].map(([lb,fd,tp2,ac])=>(
                  <div key={fd}><label htmlFor={"rg-"+fd} className="ldp-label">{lb}</label><input id={"rg-"+fd} type={tp2} autoComplete={ac} value={rf[fd]} onChange={e=>{const v=e.target.value;setRf(f=>({...f,[fd]:v}));}} className="ldp-input bg-white py-2"/></div>
                ))}
                {re&&<div role="alert" className="bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-red-700 text-sm">{re}</div>}
                <button type="submit" className="ldp-btn-primary">{t.createAccount}</button>
                <p className="text-sm text-gray-600">{t.haveAccount} <button type="button" onClick={()=>{setSr(false);setRe("");}} className="font-semibold text-orange-700 hover:underline">{t.signIn}</button></p>
              </form>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-10 text-center">{t.loginFooter}</p>
        </main>
      </div>
    );
  }

  const modal=dc?(
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full">
        <div className="flex items-center gap-3 mb-4"><div className="bg-red-100 p-2 rounded-full"><Trash2 className="w-5 h-5 text-red-600"/></div><h3 className="font-bold text-gray-800">{t.delUserTitle}</h3></div>
        <p className="text-sm text-gray-600 mb-6">{t.delPrefix} <strong>{users[dc]&&users[dc].name}</strong>{t.delSuffix}</p>
        <div className="flex gap-3"><button onClick={()=>ud(dc)} className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold text-sm">{t.del}</button><button onClick={()=>setDc(null)} className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg font-semibold text-sm">{t.cancel}</button></div>
      </div>
    </div>
  ):null;

  const groupsNav=[["programme",["dashboard","curriculum","study-guide"]],["growth",["development","coach"]],["library",["resources","drive"]],...(me.role==="admin"?[["admin",["users"]]]:[])];
  const rail=(
    <aside className="hidden lg:flex fixed inset-y-0 left-0 w-60 flex-col bg-purple-700 text-white z-40">
      <div className="flex gap-3 px-5 pt-6 pb-5">
        <Mark/>
        <div className="min-w-0">
          <p className="font-serif text-lg font-semibold leading-tight">Leadership &amp; Communication Mastery</p>
          <p className="text-xs text-blue-200 mt-1">UNFPA WCARO, Cohort 1</p>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto px-3 pb-3 space-y-5">
        {groupsNav.map(([g,keys])=>(
          <div key={g}>
            <p className="px-2 mb-1 text-xs text-blue-200">{t.navGroups[g]}</p>
            <ul className="space-y-0.5">{keys.map(k=>{const tb=tabs.find(x=>x.k===k);const on=tab===k;return (
              <li key={k}><button onClick={()=>setTab(k)} aria-current={on?"page":undefined} className={"w-full flex items-center gap-2.5 px-2 py-2 rounded-lg text-sm transition-colors "+(on?"bg-white/10 text-white font-semibold shadow-[inset_3px_0_0_#E85D1F]":"text-blue-100 hover:bg-white/5")}>
                <tb.I className="w-4 h-4 flex-shrink-0" aria-hidden="true"/>{tb.l}
                {k==="users"&&<span className="ml-auto text-xs text-blue-200">{Object.keys(users).length}</span>}
              </button></li>
            );})}</ul>
          </div>
        ))}
      </nav>
      {me.role!=="mentor"&&(
        <div className="px-5 pb-3">
          <p className="text-xs text-blue-100 mb-1.5">{t.route.progress(nDone,MODULES.length)}</p>
          <div className="h-1 bg-white/15 rounded-full overflow-hidden"><div className="h-full bg-orange-500 rounded-full transition-all" style={{width:op+"%"}}/></div>
        </div>
      )}
      <div className="border-t border-white/10 p-3 space-y-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <Av user={me} size="sm"/>
          <div className="min-w-0"><p className="text-sm font-semibold leading-tight truncate">{me.name}</p><p className="text-xs text-blue-200">{t.roleNames[me.role]||me.role}</p></div>
        </div>
        <div className="flex items-center justify-between">
          <LangSwitch lang={lang} setLang={setLang}/>
          <button onClick={logout} className="flex items-center gap-1.5 text-sm text-blue-100 hover:text-white px-2 py-1 rounded-lg hover:bg-white/10"><LogOut className="w-4 h-4" aria-hidden="true"/>{t.logout}</button>
        </div>
      </div>
    </aside>
  );

  const topbar=(
    <div className="lg:hidden bg-purple-700 text-white">
      <div className="px-4 py-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0"><Mark/><p className="font-serif text-base font-semibold leading-tight">Leadership &amp; Communication Mastery</p></div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <LangSwitch lang={lang} setLang={setLang}/>
          <button onClick={logout} aria-label={t.logout} title={t.logout} className="ldp-btn-ghost text-white"><LogOut className="w-4 h-4"/></button>
        </div>
      </div>
    </div>
  );

  const nav=(
    <div className="lg:hidden bg-white border-b sticky top-0 z-40">
    <div ref={navRef} className="flex overflow-x-auto no-scrollbar">
      {tabs.map(tb=>(
        <button key={tb.k} onClick={()=>setTab(tb.k)} aria-current={tab===tb.k?"page":undefined} className={"flex items-center gap-1.5 px-4 py-3 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors "+(tab===tb.k?"border-orange-500 text-gray-900":"border-transparent text-gray-500 hover:text-gray-700")}>
          <tb.I className="w-4 h-4" aria-hidden="true"/>{tb.l}
          {tb.k==="users"&&<span className="ml-1 text-xs text-gray-500">{Object.keys(users).length}</span>}
        </button>
      ))}
    </div>
    <div aria-hidden="true" className="pointer-events-none absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-white"/>
    </div>
  );

  // dashboard – mentor
  const mentorDash=(tab==="dashboard"&&me.role==="mentor")?(
    <div className="space-y-5">
      <div>
        <PageHead title={t.welcome+", "+firstName} sub={(me.title||t.mentorDefault)+", "+(me.organization||"UNFPA WCARO")}/>
        <div className="ldp-subtabs">
          {[["overview",t.mTabs.overview,BarChart3],["participants",t.mTabs.participants,UsersRound],["sessions",t.mTabs.sessions,Calendar],["goals",t.mTabs.goals,Target],["notes",t.mTabs.notes,FileText]].map(([k,label,Icon])=>(
            <button key={k} onClick={()=>setMt(k)} aria-pressed={mt===k} className="ldp-subtab"><Icon className="w-4 h-4" aria-hidden="true"/>{label}</button>
          ))}
        </div>
      </div>
      {mt==="overview"&&(
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
          <div className="lg:col-span-2 space-y-4">
            <DailyQuote t={t} lang={lang}/>
            <div className="ldp-card grid grid-cols-3 divide-x divide-gray-100">
              {[[pts.length,t.statParticipants],[ms.length,t.statSessions],[dg+"/"+mg.length,t.statGoalsDone]].map(([v,l])=>(
                <div key={l} className="p-4"><p className="font-mono text-3xl font-semibold text-gray-900">{v}</p><p className="text-xs text-gray-500 mt-1">{l}</p></div>
              ))}
            </div>
            <section className="ldp-card p-5">
              <h3 className="font-semibold text-gray-800 mb-3">{t.route.cohortTitle}</h3>
              <Route t={t} cur={L.CUR} onOpen={openModule}/>
            </section>
            <section className="ldp-card p-5">
              <div className="flex justify-between items-center mb-3"><h3 className="font-semibold text-gray-800">{t.recentSessions}</h3><button onClick={()=>setMt("sessions")} className="text-sm font-semibold text-orange-700 hover:underline">{t.viewAll}</button></div>
              {ms.length===0?<div className="text-sm text-gray-500"><p>{t.noSessions}</p><button onClick={()=>setMt("sessions")} className="ldp-btn-outline mt-3 text-xs py-1.5"><Plus className="w-3.5 h-3.5" aria-hidden="true"/>{t.logSession}</button></div>:<ul className="divide-y divide-gray-100">{ms.slice(-3).reverse().map(s=>(
                <li key={s.id} className="py-2"><p className="text-sm font-semibold text-gray-800">{users[s.participant]?users[s.participant].name:s.participant}</p><p className="text-xs text-gray-500">{s.date} · {t.sessionTypes[s.type]||s.type}</p></li>
              ))}</ul>}
            </section>
            <section className="ldp-card p-5">
              <div className="flex justify-between items-center mb-2"><h3 className="font-semibold text-gray-800">{t.goalProgress}</h3><button onClick={()=>setMt("goals")} className="font-mono text-sm font-semibold text-orange-700 hover:underline">{gp}%</button></div>
              <div className="ldp-progress-bar h-2"><div className="ldp-progress-fill h-2" style={{width:gp+"%"}}/></div>
            </section>
          </div>
          <Competencies t={t} selected={null} onSelect={i=>{setCp(i);setTab("resources");}}/>
        </div>
      )}
      {mt==="participants"&&(
        <div className="space-y-3">
          <h3 className="font-bold text-gray-800">{t.statParticipants} ({pts.length})</h3>
          {pts.length===0&&<div className="bg-white border rounded-xl p-8 text-center text-gray-400 text-sm">{t.noParticipants}</div>}
          {pts.map(p=>{
            const ps=ms.filter(s=>s.participant===p.username);
            return (
              <div key={p.username} className="bg-white border rounded-xl p-4 shadow-sm">
                <div className="flex items-center gap-3 mb-3"><Av user={p} size="md"/><div className="flex-1"><p className="font-semibold text-gray-800">{p.name}</p><p className="text-xs text-gray-400">@{p.username} · {p.email}</p></div><Bdg role={p.role} t={t}/></div>
                <div className="flex gap-3 text-center mb-3">
                  {[[ps.length,t.statSessions,"bg-blue-50 text-blue-600"],[ps.filter(s=>s.type==="1:1").length,t.oneOnOnes,"bg-purple-50 text-purple-600"],[ps.filter(s=>s.type==="Checkpoint").length,t.checkpoints,"bg-green-50 text-green-600"]].map(arr=>(
                    <div key={arr[1]} className={"flex-1 "+arr[2]+" rounded-lg p-2"}><p className="font-mono text-lg font-semibold">{arr[0]}</p><p className="text-xs text-gray-500">{arr[1]}</p></div>
                  ))}
                </div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">{t.coachingNotes}</label>
                <textarea value={mn[p.username]||""} onChange={e=>{const v=e.target.value;setMn(n=>({...n,[p.username]:v}));}} rows="2" placeholder={t.observations} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs focus:ring-2 focus:ring-purple-400 outline-none resize-none bg-gray-50"/>
              </div>
            );
          })}
        </div>
      )}
      {mt==="sessions"&&(
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-gray-800">{t.statSessions} ({ms.length})</h3>
            <button onClick={()=>setSas(v=>!v)} className="ldp-btn"><Plus className="w-4 h-4"/>{t.logSession}</button>
          </div>
          {sas&&(
            <div className="bg-white border-2 border-purple-200 rounded-xl p-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block text-xs font-semibold text-gray-600 mb-1">{t.participant}</label><select value={ns.participant} onChange={e=>{const v=e.target.value;setNs(s=>({...s,participant:v}));}} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 outline-none bg-white"><option value="">{t.selectOpt}</option>{pts.map(p=><option key={p.username} value={p.username}>{p.name}</option>)}</select></div>
                <div><label className="block text-xs font-semibold text-gray-600 mb-1">{t.date}</label><input type="date" value={ns.date} onChange={e=>{const v=e.target.value;setNs(s=>({...s,date:v}));}} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 outline-none"/></div>
                <div><label className="block text-xs font-semibold text-gray-600 mb-1">{t.type}</label><select value={ns.type} onChange={e=>{const v=e.target.value;setNs(s=>({...s,type:v}));}} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 outline-none bg-white">{["1:1","Group","Checkpoint","Observation","Feedback Review","Mock Assessment"].map(ty=><option key={ty} value={ty}>{t.sessionTypes[ty]||ty}</option>)}</select></div>
                <div><label className="block text-xs font-semibold text-gray-600 mb-1">{t.notes}</label><input type="text" value={ns.notes} onChange={e=>{const v=e.target.value;setNs(s=>({...s,notes:v}));}} placeholder={t.briefNotes} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 outline-none"/></div>
              </div>
              <div className="flex gap-2"><button onClick={addS} className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-1"><Save className="w-3.5 h-3.5"/>{t.save}</button><button onClick={()=>setSas(false)} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-semibold">{t.cancel}</button></div>
            </div>
          )}
          {ms.length===0?<div className="bg-white border rounded-xl p-8 text-center text-gray-400"><Calendar className="w-10 h-10 mx-auto mb-2 text-gray-200"/><p className="text-sm">{t.noSessions}</p></div>:[...ms].reverse().map(s=>(
            <div key={s.id} className="bg-white border rounded-xl p-4 flex items-start gap-3 shadow-sm">
              <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" aria-hidden="true"/>
              <div className="flex-1"><div className="flex items-center gap-2 flex-wrap"><p className="font-semibold text-gray-800 text-sm">{users[s.participant]?users[s.participant].name:s.participant}</p><span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-semibold">{t.sessionTypes[s.type]||s.type}</span><span className="text-xs text-gray-400">{s.date}</span></div>{s.notes&&<p className="text-xs text-gray-500 mt-1">{s.notes}</p>}</div>
              <button onClick={()=>{const sid=s.id;setMs(p=>p.filter(x=>x.id!==sid));}} aria-label={t.del} className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-3.5 h-3.5"/></button>
            </div>
          ))}
        </div>
      )}
      {mt==="goals"&&(
        <div className="space-y-3">
          <div className="flex justify-between items-center"><h3 className="font-bold text-gray-800">{t.goals} ({dg}/{mg.length})</h3><span className="font-mono text-sm font-semibold text-orange-600">{gp}%</span></div>
          <div className="ldp-progress-bar h-2"><div className="ldp-progress-fill h-2" style={{width:gp+"%"}}/></div>
          {mg.map(g=>(
            <div key={g.id} className={"flex items-start gap-3 bg-white border rounded-xl p-4 shadow-sm "+(g.done?"border-green-200 bg-green-50":"")}>
              <button onClick={()=>tg(g.id)} aria-pressed={!!g.done} aria-label={t.markDone+": "+g.text} className="flex-shrink-0 mt-0.5">{g.done?<CheckCircle2 className="w-5 h-5 text-green-500"/>:<Circle className="w-5 h-5 text-gray-300"/>}</button>
              <p className={"text-sm flex-1 "+(g.done?"line-through text-gray-400":"text-gray-700")}>{g.text}</p>
              <button onClick={()=>dg2(g.id)} aria-label={t.del+": "+g.text} className="p-1 text-gray-400 hover:text-red-500 transition-colors"><Trash2 className="w-3.5 h-3.5"/></button>
            </div>
          ))}
          <div className="flex gap-2"><input value={ng} onChange={e=>setNg(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")ag();}} placeholder={t.addGoal} className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 outline-none"/><button onClick={ag} aria-label={t.addGoal} className="ldp-btn"><Plus className="w-4 h-4"/></button></div>
        </div>
      )}
      {mt==="notes"&&(
        <div className="space-y-3">
          <h3 className="font-bold text-gray-800">{t.coachingNotes}</h3>
          {pts.length===0?<div className="bg-white border rounded-xl p-8 text-center text-gray-400 text-sm">{t.noParticipants}</div>:pts.map(p=>(
            <div key={p.username} className="bg-white border rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-3"><Av user={p} size="sm"/><div><p className="font-semibold text-gray-800 text-sm">{p.name}</p><p className="text-xs text-gray-400">@{p.username}</p></div><span className="ml-auto text-xs text-gray-400">{ms.filter(s=>s.participant===p.username).length} {t.sessionsWord}</span></div>
              <textarea value={mn[p.username]||""} onChange={e=>{const v=e.target.value;setMn(n=>({...n,[p.username]:v}));}} rows="5" placeholder={t.notesPlaceholderPrefix+" "+p.name.split(" ")[0]+t.notesPlaceholderBody} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-400 outline-none resize-none bg-gray-50"/>
            </div>
          ))}
        </div>
      )}
    </div>
  ):null;

  // dashboard – participant/admin
  const partDash=(tab==="dashboard"&&me.role!=="mentor")?(
    <div className="space-y-4">
      <PageHead title={t.welcome+", "+firstName} sub={[me.title||t.participantDefault,me.organization].filter(Boolean).join(", ")}/>
      <section className="ldp-card p-5">
        <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
          <h3 className="font-semibold text-gray-800">{t.route.title}</h3>
          <p className="font-mono text-xs text-gray-600">{t.route.progress(nDone,MODULES.length)}</p>
        </div>
        <Route t={t} cur={L.CUR} done={prog.mod} current={nextMod&&nextMod.id} onOpen={openModule}/>
        <RouteLegend t={t}/>
      </section>
      <DailyQuote t={t} lang={lang}/>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
        {nextMod?(
          <section className="ldp-card lg:col-span-2 overflow-hidden">
            <div className="h-1 bg-orange-500"/>
            <div className="p-5 sm:p-6">
              <p className="ldp-eyebrow">{t.next.title}</p>
              <h3 className="text-2xl font-semibold font-serif text-gray-900 leading-snug mt-0.5">{t.moduleWord} {modNum(nextMod.id)}: {nextMod.title}</h3>
              <p className="text-sm text-gray-500 mt-0.5">{phaseName(t,nextMod.pk)}, {nextMod.weeks} {t.weeksWord}</p>
              <h4 className="text-sm font-semibold text-gray-800 mt-4 mb-1.5">{t.dailyTasks}</h4>
              <ul className="space-y-1">{nextMod.dt.map((x,i)=><li key={i} className="text-sm text-gray-700 pl-3 border-l-2 border-gray-200">{x}</li>)}</ul>
              <p className="text-sm text-yellow-900 bg-yellow-50 rounded-lg px-3 py-2 mt-4"><strong>{t.checkpointLabel}</strong> {nextMod.cp}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                <button onClick={()=>{setSm(nextMod.id);setSt("guide");setTab("study-guide");}} className="ldp-btn-accent"><Book className="w-4 h-4" aria-hidden="true"/>{t.next.open}</button>
                <button onClick={()=>tp("mod",nextMod.id)} className="ldp-btn-outline"><CheckCircle2 className="w-4 h-4" aria-hidden="true"/>{t.next.complete}</button>
              </div>
            </div>
          </section>
        ):(
          <section className="ldp-card lg:col-span-2 p-6">
            <CheckCircle2 className="w-8 h-8 text-green-600 mb-2"/>
            <h3 className="text-2xl font-semibold font-serif text-gray-900">{t.next.doneTitle}</h3>
            <p className="text-sm text-gray-600 mt-1 mb-4">{t.next.doneBody}</p>
            <button onClick={()=>setTab("development")} className="ldp-btn-accent">{t.next.doneBtn}</button>
          </section>
        )}
        <div className="space-y-4">
          <section className="ldp-card p-4">
            <h3 className="font-semibold text-gray-800 mb-2">{t.tally}</h3>
            <dl className="divide-y divide-gray-100">
              {[[op+"%",t.overallProgress],[Object.values(prog.rt).filter(Boolean).length,t.readingTests],[Object.values(prog.ve).filter(Boolean).length,t.vocalSessions]].map(([v,l])=>(
                <div key={l} className="flex items-baseline justify-between gap-3 py-1.5"><dt className="text-sm text-gray-600">{l}</dt><dd className="font-mono text-lg font-semibold text-gray-900">{v}</dd></div>
              ))}
            </dl>
          </section>
          <section className="ldp-card p-2">
            <h3 className="font-semibold text-gray-800 px-2 pt-2 mb-1">{t.grow.title}</h3>
            <ul>
              {[[t.grow.plan,Compass,()=>{setPdView("plan");setTab("development");}],[t.grow.builder,PenLine,()=>{setPdView("builder");setTab("development");}],[t.grow.coach,Sparkles,()=>setTab("coach")]].map(([[a,b],I,go])=>(
                <li key={a}><button onClick={go} className="w-full flex items-start gap-2.5 text-left px-2 py-2 rounded-lg hover:bg-gray-100"><I className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" aria-hidden="true"/><span><span className="block text-sm font-semibold text-gray-800 leading-snug">{a}</span><span className="block text-xs text-gray-500">{b}</span></span></button></li>
              ))}
              <li><a href="https://drive.google.com/drive/folders/1e3nvDC36AptxDysRtO0C5dYiTqSS-H87" target="_blank" rel="noopener noreferrer" className="flex items-start gap-2.5 px-2 py-2 rounded-lg hover:bg-gray-100"><FolderOpen className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" aria-hidden="true"/><span><span className="block text-sm font-semibold text-gray-800 leading-snug">{t.grow.drive[0]}</span><span className="block text-xs text-gray-500">{t.grow.drive[1]}</span></span></a></li>
            </ul>
          </section>
        </div>
      </div>
      <section className="ldp-card p-5">
        <h3 className="font-semibold text-gray-800 mb-2">{t.challenges}</h3>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
          {t.challengeItems.map((c,i)=><div key={i} className="text-sm"><dt className="inline font-semibold text-gray-800">{c[0]}</dt> <dd className="inline text-gray-600">{c[1]}</dd></div>)}
        </dl>
      </section>
    </div>
  ):null;

  // curriculum
  const currTab=tab==="curriculum"?(
    <div>
      <PageHead title={t.nav.curriculum} sub={t.pageSubs.curriculum}/>
      <section className="ldp-card p-5 mb-6">
        <Route t={t} cur={L.CUR} done={prog.mod} current={nextMod&&nextMod.id} onOpen={openModule}/>
        <RouteLegend t={t}/>
      </section>
      <div className="space-y-8">
        {Object.entries(L.CUR).map(([pk,ph])=>(
          <section key={pk} aria-labelledby={"ph-"+pk}>
            <div className="flex flex-wrap items-baseline gap-x-3 mb-2">
              <h3 id={"ph-"+pk} className="text-xl font-semibold font-serif text-gray-900">{t.phaseLabel} {ROMAN[pk]}: {phaseName(t,pk)}</h3>
              <p className="text-sm text-gray-500">{phaseMonths(t,ph)}, {ph.modules.filter(m=>prog.mod[m.id]).length}/{ph.modules.length}</p>
            </div>
            <ul className="space-y-2">
              {ph.modules.map(mod=>{
                const open=openMods[mod.id]??(nextMod&&nextMod.id===mod.id);
                const isDone=!!prog.mod[mod.id];
                return (
                  <li key={mod.id} id={"mod-"+mod.id} className={"ldp-card scroll-mt-16 overflow-hidden "+(nextMod&&nextMod.id===mod.id?"border-orange-300":"")}>
                    <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5">
                      <button onClick={()=>tp("mod",mod.id)} aria-pressed={isDone} aria-label={t.markDone+": "+mod.title} title={t.markDone} className="p-1 flex-shrink-0">{isDone?<CheckCircle2 className="w-5 h-5 text-green-600"/>:<Circle className="w-5 h-5 text-gray-400"/>}</button>
                      <button onClick={()=>setOpenMods(o=>({...o,[mod.id]:!open}))} aria-expanded={!!open} className="flex-1 min-w-0 flex items-center gap-2 text-left py-1">
                        <span className="flex-1 min-w-0"><span className={"block font-semibold leading-snug "+(isDone?"text-gray-600":"text-gray-900")}>{t.moduleWord} {modNum(mod.id)}: {mod.title}</span><span className="block text-xs text-gray-500">{mod.weeks} {t.weeksWord}</span></span>
                        <ChevronDown className={"w-4 h-4 text-gray-400 flex-shrink-0 transition-transform "+(open?"rotate-180":"")} aria-hidden="true"/>
                      </button>
                      <button onClick={()=>{setSm(mod.id);setSt("guide");setTab("study-guide");}} className="ldp-btn-outline hidden sm:inline-flex flex-shrink-0">{t.studyGuideBtn}</button>
                    </div>
                    {open&&(
                      <div className="px-4 pb-4 sm:pl-14 border-t border-gray-100 pt-3 space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                          <div><h4 className="text-sm font-semibold text-gray-800 mb-1">{t.dailyTasks}</h4>{mod.dt.map((tk,i)=><p key={i} className="text-sm text-gray-600 pl-3 border-l-2 border-gray-200 mb-1">{tk}</p>)}</div>
                          <div><h4 className="text-sm font-semibold text-gray-800 mb-1">{t.vocalTraining}</h4>{mod.ve.map((ex,i)=>{const eid=mod.id+"_v"+i;return <label key={i} className="flex items-start gap-2 mb-1 cursor-pointer"><button onClick={()=>tp("ve",eid)} aria-pressed={!!prog.ve[eid]} aria-label={t.markDone+": "+ex} className="mt-0.5">{prog.ve[eid]?<CheckCircle2 className="w-4 h-4 text-green-600"/>:<Circle className="w-4 h-4 text-gray-400"/>}</button><span className="text-sm text-gray-600">{ex}</span></label>;})}</div>
                          <div className="md:col-span-2"><h4 className="text-sm font-semibold text-gray-800 mb-1">{t.readingsLabel}</h4>{mod.rd.map((r,i)=>{const tid=mod.id+"_r"+i;return <div key={i} className="flex items-start gap-2 mb-1">{r.x&&<button onClick={()=>tp("rt",tid)} aria-pressed={!!prog.rt[tid]} aria-label={t.markDone+": "+r.t} className="mt-0.5">{prog.rt[tid]?<CheckCircle2 className="w-4 h-4 text-green-600"/>:<Circle className="w-4 h-4 text-gray-400"/>}</button>}<span className="text-sm text-gray-600"><strong className="text-gray-800">{r.t}</strong>, {r.c}{r.x&&<span className="text-gray-500 ml-1 text-xs">{t.testTag}</span>}</span></div>;})}</div>
                        </div>
                        <p className="text-sm text-yellow-900 bg-yellow-50 rounded-lg px-3 py-2"><strong>{t.checkpointLabel}</strong> {mod.cp}</p>
                        <button onClick={()=>{setSm(mod.id);setSt("guide");setTab("study-guide");}} className="ldp-btn-outline sm:hidden">{t.studyGuideBtn}</button>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </div>
  ):null;

  // study guide
  const sgTabs=[["guide",t.sgGuide,true],["videos",t.sgVideos,(cur.vids&&cur.vids.length>0)],["articles",t.sgArticles,(cur.arts&&cur.arts.length>0)],["readings",t.sgReadings,(cur.reads&&cur.reads.length>0)],["reflect",t.sgReflect,(cur.refs&&cur.refs.length>0)]].filter(a=>a[2]);
  const studyTab=tab==="study-guide"?(
    <div>
      <PageHead title={t.nav.study} sub={t.pageSubs.study}/>
      <div className="grid grid-cols-1 lg:grid-cols-[15rem_minmax(0,1fr)] gap-5 items-start">
      <div className="lg:hidden">
        <label htmlFor="sg-mod" className="ldp-label">{t.selectModule}</label>
        <select id="sg-mod" value={sm} onChange={e=>{setSm(e.target.value);setSt("guide");}} className="ldp-input py-2 bg-white">
          {[1,2,3,4].map(n=><optgroup key={n} label={phaseName(t,"p"+n)}>{L.SM.filter(m=>m.ph===n).map(m=><option key={m.id} value={m.id}>{m.title} ({m.wk})</option>)}</optgroup>)}
          <optgroup label={t.commGroup.replace(/^[─\s]*/,"")}>{L.CI.map(m=><option key={m.id} value={m.id}>{m.title}</option>)}</optgroup>
        </select>
      </div>
      <nav aria-label={t.selectModule} className="hidden lg:block ldp-card p-3 sticky top-6 max-h-[calc(100vh-3rem)] overflow-y-auto space-y-4">
        {[...[1,2,3,4].map(n=>[phaseName(t,"p"+n),L.SM.filter(m=>m.ph===n)]),[t.commGroup.replace(/^[─\s]*/,""),L.CI]].map(([label,mods])=>(
          <div key={label}>
            <p className="ldp-eyebrow px-2 mb-1">{label}</p>
            <ul>{mods.map(m=>(
              <li key={m.id}><button onClick={()=>{setSm(m.id);setSt("guide");}} aria-current={sm===m.id?"true":undefined} className={"w-full flex items-start gap-1.5 text-left px-2 py-1.5 rounded-lg text-sm leading-snug transition-colors "+(sm===m.id?"bg-orange-50 font-semibold text-gray-900 shadow-[inset_3px_0_0_#E85D1F]":"text-gray-700 hover:bg-gray-100")}>
                <span className="flex-1">{m.title}</span>{prog.mod[m.id]&&<CheckCircle2 className="w-3.5 h-3.5 text-green-600 mt-0.5 flex-shrink-0" aria-label={t.route.done}/>}
              </button></li>
            ))}</ul>
          </div>
        ))}
      </nav>
      <div className="min-w-0 space-y-4">
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div className="min-w-0"><p className="text-sm text-gray-500">{cur.wk}</p><h3 className="text-2xl font-semibold font-serif text-gray-900 leading-snug">{cur.title}</h3></div>
        <div className="flex gap-2 flex-wrap">
          {cur.doc&&<a href={cur.doc} target="_blank" rel="noopener noreferrer" className="ldp-btn-outline"><FileText className="w-4 h-4" aria-hidden="true"/>{t.openInDrive}</a>}
          {cur.fld&&<a href={cur.fld} target="_blank" rel="noopener noreferrer" className="ldp-btn-outline"><FolderOpen className="w-4 h-4" aria-hidden="true"/>{t.folderBtn}</a>}
        </div>
      </div>
      <div className="ldp-subtabs">
        {sgTabs.map(a=>{const Icon={guide:FileText,videos:Play,articles:Link,readings:Book,reflect:Edit2}[a[0]]||FileText;return <button key={a[0]} onClick={()=>setSt(a[0])} aria-pressed={st===a[0]} className="ldp-subtab"><Icon className="w-4 h-4" aria-hidden="true"/>{a[1]}</button>;})}
      </div>
      {st==="guide"&&(
        <div className="space-y-3">
          <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
            <div className="bg-gray-50 border-b px-5 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2"><FileText className="w-4 h-4 text-blue-600"/><span className="text-sm font-semibold text-gray-700">{t.rgTitle}</span></div>
              {cur.doc&&<a href={cur.doc} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline flex items-center gap-1">{t.editInDrive}<ExternalLink className="w-3 h-3"/></a>}
            </div>
            <div className="p-6 space-y-1 max-w-3xl">
              {(()=>{
                const content=DDC[cur.id];
                if(!content){ return <div><p className="text-sm text-gray-500 italic mb-3">{t.driveOnly}</p>{cur.doc&&<a href={cur.doc} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-2 rounded-lg text-sm font-semibold"><FileText className="w-4 h-4"/>{t.openRG}</a>}</div>; }
                const lines=content.split("\n").slice(2);
                const enNote=t.rgEnglish?<p key="en-note" className="text-xs text-gray-500 italic mb-3">{t.rgEnglish}</p>:null;
                const sentence=x=>x.toLowerCase().replace(/^./,c=>c.toUpperCase()).replace(/\b(unfpa|un|ted|hbr|ccl|ceo|ep|my why|sbi)\b/gi,m=>m.toUpperCase());
                const out=[];
                lines.forEach((line,i)=>{
                  const l=line.trim();
                  if(!l) return;
                  if(/^https?:\/\//.test(l)) return; // handled with the name on the line above
                  const nx=(lines[i+1]||"").trim();
                  const url=/^https?:\/\//.test(nx)?nx:null;
                  if(/^\d+\.\s/.test(l)){ out.push(<h4 key={i} className="text-sm font-semibold text-gray-900 mt-4 mb-1">{sentence(l.replace(/^\d+\.\s*/,""))}</h4>); return; }
                  if(/^[A-Z][A-Z0-9 &–\-:'/]{3,}(\s*\([^)]*\))?$/.test(l)||/^(CHECKPOINT|WEEKLY|STEP \d)/.test(l)){ out.push(<h4 key={i} className="text-sm font-semibold text-gray-900 mt-4 mb-1">{sentence(l)}</h4>); return; }
                  const txt=l.replace(/^[•□]\s*/,"");
                  const bullet=/^[•□]/.test(l);
                  const body=url?<a href={url} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-700 hover:underline inline-flex items-start gap-1">{txt}<ExternalLink className="w-3 h-3 flex-shrink-0 mt-1" aria-hidden="true"/></a>:txt;
                  out.push(<p key={i} className={"text-sm text-gray-700 py-0.5 "+(bullet?"pl-3 border-l-2 border-gray-200 my-1":"")}>{body}</p>);
                });
                return [enNote,...out];
              })()}
            </div>
          </div>
          {/* Resource link cards */}
          {(cur.vids&&cur.vids.length>0||cur.arts&&cur.arts.length>0)&&(
            <div className="bg-white border rounded-xl p-4 shadow-sm">
              <h4 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2"><Link className="w-4 h-4 text-purple-500"/>{t.quickAccessAll}</h4>
              <div className="space-y-2">
                {cur.vids&&cur.vids.map((v,i)=><ResLink key={"v"+i} href={v.u} icon={Play} title={v.t} meta={v.d} tag={v.g}/>)}
                {cur.arts&&cur.arts.map((a,i)=><ResLink key={"a"+i} href={a.u} icon={a.s==="PDF"?FileText:Link} title={a.t} tag={a.s}/>)}
                {cur.doc&&<ResLink href={cur.doc} icon={FileText} title={t.fullResourceGuide} meta={t.driveEditable}/>}
                {cur.fld&&<ResLink href={cur.fld} icon={FolderOpen} title={t.moduleFolder} meta={t.allFilesModule}/>}
              </div>
            </div>
          )}
        </div>
      )}
      {st==="videos"&&cur.vids&&cur.vids.length>0&&(
        <div className="space-y-2">{cur.vids.map((v,i)=><ResLink key={i} href={v.u} icon={Play} title={v.t} meta={v.d} tag={v.g}/>)}</div>
      )}
      {st==="articles"&&cur.arts&&cur.arts.length>0&&(
        <div className="space-y-2">{cur.arts.map((a,i)=><ResLink key={i} href={a.u} icon={a.s==="PDF"?FileText:Link} title={a.t} tag={a.s}/>)}</div>
      )}
      {st==="readings"&&cur.reads&&cur.reads.length>0&&(
        <div className="bg-white border rounded-xl p-5 shadow-sm space-y-3">
          <h3 className="font-bold text-gray-800 flex items-center gap-2"><Book className="w-5 h-5 text-purple-500"/>{t.requiredReading}</h3>
          {cur.reads.map((r,i)=>{
            const tid=cur.id+"_r"+i;
            return <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"><button onClick={()=>tp("rt",tid)} aria-pressed={!!prog.rt[tid]} aria-label={t.markDone+": "+r} className="flex-shrink-0 mt-0.5">{prog.rt[tid]?<CheckCircle2 className="w-5 h-5 text-green-500"/>:<Circle className="w-5 h-5 text-gray-300"/>}</button><p className="text-sm text-gray-700 flex-1">{r}</p></div>;
          })}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-800"><strong>{t.afterReading}</strong> {t.uploadNoteTo} <a href="https://drive.google.com/drive/folders/1BHIxUGoLj4vO22LeoguFbe1s-PM4A6E2" target="_blank" rel="noopener noreferrer" className="underline">{t.compNotes}</a></div>
        </div>
      )}
      {st==="reflect"&&cur.refs&&cur.refs.length>0&&(
        <div className="space-y-3">
          <div className="bg-white border rounded-xl p-5 shadow-sm space-y-4">
            <h3 className="font-bold text-gray-800 flex items-center gap-2"><Book className="w-5 h-5 text-purple-500"/>{t.reflectionQuestions}</h3>
            <p className="text-xs text-gray-500">{t.reflectDesc}</p>
            {cur.refs.map((q,i)=><div key={i} className="border-l-4 border-purple-300 pl-4 py-1"><p className="text-sm font-semibold text-gray-700">{i+1}. {q}</p></div>)}
          </div>
          {cur.cp&&(
            <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-xl p-4">
              <p className="text-sm font-bold text-yellow-900 mb-1 flex items-center gap-1.5"><Flag className="w-4 h-4"/>{t.checkpointFlag}</p>
              <p className="text-sm text-yellow-800">{cur.cp}</p>
              {cur.fld&&<a href={cur.fld} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-yellow-700 mt-2 underline"><FolderOpen className="w-3.5 h-3.5"/>{t.uploadToDrive}</a>}
            </div>
          )}
        </div>
      )}
      </div>
      </div>
    </div>
  ):null;

  // resources
  const resTab=tab==="resources"?(
    <div>
      <PageHead title={t.nav.resources} sub={t.pageSubs.resources}/>
      <div className="grid grid-cols-1 lg:grid-cols-[20rem_minmax(0,1fr)] gap-4 items-start">
        <div className="lg:sticky lg:top-6"><Competencies t={t} selected={cp} onSelect={i=>{setCp(i);if(window.innerWidth<1024)setTimeout(()=>{const el=document.getElementById("comp-detail");if(el)el.scrollIntoView({block:"start"});},60);}}/></div>
        <div id="comp-detail" className="scroll-mt-16 min-w-0"><CompetencyDetail key={cp} t={t} lang={lang} index={cp}/></div>
      </div>
      <Library t={t} lang={lang}/>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 items-start">
        <section className="ldp-card p-5"><h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2"><Mic className="w-4 h-4 text-orange-600" aria-hidden="true"/>{t.vocalTitle}</h3><p className="text-sm text-gray-600 mb-3">{t.vocalDesc}</p><a href="https://drive.google.com/drive/folders/1w0UbxFFcqsKa6EeYf_J7Pp485OtF7fTT" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-orange-700 hover:underline inline-flex items-center gap-1.5"><FolderOpen className="w-4 h-4" aria-hidden="true"/>{t.dailyExercisesFolder}</a></section>
        <section className="ldp-card p-5"><h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2"><Users className="w-4 h-4 text-orange-600" aria-hidden="true"/>{t.practiceTitle}</h3><ul className="space-y-1.5 text-sm text-gray-600">{t.practiceItems.map((tx,i)=><li key={i} className="pl-3 border-l-2 border-gray-200">{tx}</li>)}</ul></section>
        <section className="ldp-card p-5"><h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2"><Flag className="w-4 h-4 text-orange-600" aria-hidden="true"/>{t.pitfallsTitle}</h3><dl className="space-y-2 text-sm">{t.pitfallItems.map((a,i)=><div key={i}><dt className="font-semibold text-gray-800">{a[0]}</dt><dd className="text-gray-600">{a[1]}</dd></div>)}</dl></section>
      </div>
    </div>
  ):null;

  // drive
  const driveTab=tab==="drive"?(
    <div>
      <PageHead title={t.driveRepo} sub={t.driveRepoDesc}>
        <a href="https://drive.google.com/drive/folders/1e3nvDC36AptxDysRtO0C5dYiTqSS-H87" target="_blank" rel="noopener noreferrer" className="ldp-btn"><FolderOpen className="w-4 h-4" aria-hidden="true"/>{t.openRoot}</a>
      </PageHead>
      <p role="note" className="text-sm text-amber-900 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mb-3">{t.driveAccess}</p>
      <p className="text-sm text-gray-600 flex items-center gap-1.5 mb-2"><Folder className="w-4 h-4 text-gray-400" aria-hidden="true"/>{t.driveRoot}</p>
      <div className="border rounded-xl overflow-hidden bg-white shadow-sm">
        <div className="p-3">{DS.map(n=><DN key={n.id} node={n} depth={0} open={dop} setOpen={setDop} openLabel={t.openLink}/>)}</div>
        <div className="border-t bg-gray-50 px-4 py-2 text-xs text-gray-400">{t.driveFooter}</div>
      </div>
    </div>
  ):null;

  // users – access denied
  const uDenied=(tab==="users"&&me.role!=="admin")?(
    <div className="text-center py-16 text-gray-500"><Shield className="w-12 h-12 mx-auto mb-3 text-gray-300"/><p className="font-semibold">{t.adminRequired}</p></div>
  ):null;

  // users – detail
  const uDetail=(tab==="users"&&me.role==="admin"&&uv==="detail"&&users[ut])?(
    <div className="space-y-4">
      <button onClick={()=>setUv("list")} className="text-sm text-blue-600 hover:underline">{t.back}</button>
      <div className="bg-white border rounded-xl p-6 shadow-sm">
        <div className="flex items-start justify-between flex-wrap gap-3">
          <div className="flex items-center gap-4"><Av user={users[ut]} size="lg"/><div><h2 className="text-xl font-bold text-gray-800">{users[ut].name}</h2>{users[ut].title&&<p className="text-purple-600 font-medium text-sm">{users[ut].title}</p>}{users[ut].organization&&<p className="text-gray-500 text-sm">{users[ut].organization}</p>}<div className="mt-1"><Bdg role={users[ut].role} t={t}/></div></div></div>
          <div className="flex gap-2">
            <button onClick={()=>{setUf({...users[ut],password:""});setUv("edit");setUe("");}} className="flex items-center gap-1.5 text-sm bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg"><Edit2 className="w-4 h-4"/>{t.edit}</button>
            {users[ut].username!==me.username&&<button onClick={()=>setDc(ut)} className="flex items-center gap-1.5 text-sm bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1.5 rounded-lg"><Trash2 className="w-4 h-4"/>{t.del}</button>}
          </div>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3">
          {[[t.username,users[ut].username],[t.email,users[ut].email],[t.organization,users[ut].organization||"—"]].map(a=><div key={a[0]} className="bg-gray-50 rounded-lg p-3"><p className="text-gray-400 text-xs mb-1">{a[0]}</p><p className="font-medium text-gray-700 text-sm">{a[1]}</p></div>)}
          <div className="bg-gray-50 rounded-lg p-3"><p className="text-gray-400 text-xs mb-1">{t.roleWord}</p><Bdg role={users[ut].role} t={t}/></div>
        </div>
        {users[ut].description&&<div className="mt-3 bg-gray-50 rounded-lg p-3 text-sm text-gray-600">{users[ut].description}</div>}
      </div>
    </div>
  ):null;

  // users – form
  const uForm=(tab==="users"&&me.role==="admin"&&(uv==="create"||uv==="edit"))?(
    <div className="space-y-4">
      <div className="flex items-center gap-3"><button onClick={()=>{setUv("list");setUe("");}} className="text-sm text-blue-600 hover:underline">{t.back}</button><h2 className="text-lg font-bold text-gray-800">{uv==="edit"?t.editUser:t.createUser}</h2></div>
      <div className="bg-white border rounded-xl p-6 shadow-sm space-y-5">
        <div className="flex items-center gap-4">
          <div className="relative">{uf.profilePicture?<img src={uf.profilePicture} alt="" className="w-20 h-20 rounded-full object-cover border-4 border-purple-100"/>:<div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center border-4 border-purple-100"><User className="w-10 h-10 text-white"/></div>}<label className="absolute bottom-0 right-0 bg-purple-600 text-white rounded-full p-1.5 cursor-pointer shadow"><Settings className="w-3.5 h-3.5"/><input type="file" accept="image/*" onChange={ui} className="hidden"/></label></div>
          <p className="text-sm font-semibold text-gray-700">{t.profilePhoto}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[[t.fFullName,"name","text"],[t.fUsername,"username","text"],[t.fEmail,"email","email"],[t.fJobTitle,"title","text"],[t.fOrg,"organization","text"]].map(a=>(
            <div key={a[1]}><label className="block text-sm font-semibold text-gray-700 mb-1">{a[0]}</label><input type={a[2]} value={uf[a[1]]||""} onChange={e=>{const v=e.target.value;setUf(f=>({...f,[a[1]]:v}));}} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 outline-none"/></div>
          ))}
          <div><label className="block text-sm font-semibold text-gray-700 mb-1">{uv==="edit"?t.fNewPassword:t.fPassword}</label><div className="relative"><input type={sp?"text":"password"} value={uf.password} onChange={e=>{const v=e.target.value;setUf(f=>({...f,password:v}));}} placeholder={uv==="edit"?t.keepCurrent:t.minChars} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 outline-none pr-10"/><button type="button" onClick={()=>setSp(v=>!v)} className="absolute right-3 top-2.5 text-gray-400">{sp?<EyeOff className="w-4 h-4"/>:<Eye className="w-4 h-4"/>}</button></div></div>
          <div><label className="block text-sm font-semibold text-gray-700 mb-1">{t.fRole}</label><select value={uf.role} onChange={e=>{const v=e.target.value;setUf(f=>({...f,role:v}));}} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 outline-none bg-white">{ROLES.map(r=><option key={r} value={r}>{t.roleNames[r]}</option>)}</select></div>
        </div>
        <div><label className="block text-sm font-semibold text-gray-700 mb-1">{t.fBio}</label><textarea value={uf.description||""} onChange={e=>{const v=e.target.value;setUf(f=>({...f,description:v}));}} rows="2" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 outline-none resize-none"/></div>
        {ue&&<div className="bg-red-50 border border-red-200 rounded-lg px-4 py-2 text-red-700 text-sm">{ue}</div>}
        <div className="flex gap-3"><button onClick={us} className="ldp-btn"><Save className="w-4 h-4"/>{uv==="edit"?t.saveChanges:t.createUserBtn}</button><button onClick={()=>{setUv("list");setUe("");}} className="bg-gray-100 text-gray-700 px-6 py-2.5 rounded-lg font-semibold text-sm">{t.cancel}</button></div>
      </div>
    </div>
  ):null;

  // users – list
  const uList=(tab==="users"&&me.role==="admin"&&uv==="list")?(
    <div className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3"><div><h2 className="text-3xl font-semibold text-gray-900 leading-tight">{t.userMgmt}</h2><p className="text-sm text-gray-600 mt-1">{Object.keys(users).length} {t.usersWord}</p></div><button onClick={()=>{setUf(EF());setUe("");setUv("create");}} className="ldp-btn"><Plus className="w-4 h-4"/>{t.addUser}</button></div>
      <div className="flex gap-3 flex-wrap"><input value={uq} onChange={e=>setUq(e.target.value)} placeholder={t.searchPlaceholder} aria-label={t.searchPlaceholder} className="flex-1 min-w-48 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 outline-none"/><select aria-label={t.fRole} value={ur} onChange={e=>setUr(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 outline-none bg-white"><option value="all">{t.allRoles}</option>{ROLES.map(r=><option key={r} value={r}>{t.roleNames[r]}</option>)}</select></div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">{ROLES.map(r=>{const c=Object.values(users).filter(u=>u.role===r).length;return <div key={r} className={"rounded-lg p-3 text-center border "+(RC[r]||"")}><div className="font-mono text-2xl font-semibold">{c}</div><div className="text-xs">{c!==1?t.roleNamesPl[r]:t.roleNames[r]}</div></div>;})}</div>
      <div className="space-y-2">
        {fu.length===0&&<div className="text-center py-10 text-gray-400 text-sm">{t.noUsersMatch}</div>}
        {fu.map(u=>(
          <div key={u.username} className="bg-white border rounded-xl p-4 flex items-center gap-4 hover:shadow-sm">
            <Av user={u} size="md"/>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap"><span className="font-semibold text-gray-800 truncate">{u.name}</span><Bdg role={u.role} t={t}/>{u.username===me.username&&<span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">{t.youTag}</span>}</div>
              <p className="text-sm text-gray-500 truncate">@{u.username} · {u.email}</p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button onClick={()=>{setUt(u.username);setUv("detail");}} aria-label={t.view+": "+u.name} title={t.view} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"><User className="w-4 h-4"/></button>
              <button onClick={()=>{setUf({...u,password:""});setUt(u.username);setUv("edit");setUe("");}} aria-label={t.edit+": "+u.name} title={t.edit} className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg"><Edit2 className="w-4 h-4"/></button>
              {u.username!==me.username&&<button onClick={()=>setDc(u.username)} aria-label={t.del+": "+u.name} title={t.del} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4"/></button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  ):null;

  return (
    <div className="min-h-screen bg-gray-50">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-white focus:text-gray-900 focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg focus:text-sm focus:font-semibold">{t.skipToContent}</a>
      {modal}
      {rail}
      <div className="lg:pl-60">
      {topbar}
      {nav}
      <main id="main" tabIndex={-1} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 outline-none">
        {mentorDash}
        {partDash}
        {currTab}
        {studyTab}
        {tab==="development"&&<PersonalDevelopment t={t} lang={lang} user={me} onConnect={()=>{setTab("coach");window.scrollTo(0,0);}} done={prog.pd||{}} onToggle={id=>tp("pd",id)} selected={pdSel} onSelect={setPdSel} onCoach={()=>{setTab("coach");window.scrollTo(0,0);}} view={pdView} onView={setPdView} speech={spSel} onSpeech={setSpSel} spDone={prog.sp||{}} onSpToggle={id=>tp("sp",id)} skDone={prog.sk||{}} onSkToggle={id=>tp("sk",id)} skStage={skStage} onSkStage={setSkStage}/>}
        {coachOpened&&(
          <div hidden={tab!=="coach"}>
            <Suspense fallback={<div className="ldp-card p-6 text-sm text-gray-500">{t.ai.loadingCoach}</div>}>
              <CoachPanel user={me} lang={lang} setLang={setLang} t={t} progress={prog} onNavigate={coachNavigate}/>
            </Suspense>
          </div>
        )}
        {resTab}
        {driveTab}
        {uDenied}
        {uDetail}
        {uForm}
        {uList}
      </main>
      </div>
    </div>
  );
}
