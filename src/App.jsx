import { useState, useEffect, useRef, lazy, Suspense } from "react";
import {
  CheckCircle2, Circle, Book, Mic, Users, Trophy, TrendingUp,
  Calendar, Target, LogOut, User, Settings, Plus, Trash2, Edit2,
  Eye, EyeOff, Save, FolderOpen, ChevronRight, ChevronDown,
  Shield, Play, FileText, Link, ExternalLink, Sparkles,
  UserCheck, UsersRound, Mountain, Activity, Briefcase, Handshake, Megaphone
} from "lucide-react";
import { RC, ROLES, TC, EF, IU, CUR, SM, CI, DS, DDC, DEFAULT_GOALS } from "./data.js";
import { loadUsers, saveUsers, loadSession, saveSession, clearSession, loadJSON, saveJSON } from "./storage.js";
import { STR } from "./i18n.js";

const CoachPanel = lazy(() => import("./coach/CoachPanel.jsx"));

// ─── COMPONENTS ───────────────────────────────────────────────────────────────
function Av({ user, size }) {
  const s = size==="sm"?"w-8 h-8 text-xs":size==="lg"?"w-16 h-16 text-2xl":"w-10 h-10 text-sm";
  if (user.profilePicture) return <img src={user.profilePicture} alt="" className={s+" rounded-full object-cover flex-shrink-0"} />;
  const ini = user.name.split(" ").map(w=>w[0]).slice(0,2).join("").toUpperCase();
  return <div className={s+" rounded-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center text-white font-bold flex-shrink-0"}>{ini}</div>;
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
const ROMAN = { p1:"I", p2:"II", p3:"III", p4:"IV" };
// One icon per entry of STR[lang].compItems, in the same order.
const COMP_ICONS = [UserCheck, UsersRound, Mountain, Activity, Briefcase, Handshake, Megaphone];
function Competencies({ t }) {
  return (
    <div className="ldp-card overflow-hidden">
      <div className="ldp-phase-header">
        <h3 className="font-semibold">{t.compTitle}</h3>
      </div>
      <div className="p-4">
        <p className="text-sm text-gray-600 mb-3">{t.compSub}</p>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {t.compItems.map((item,i)=>{
            const Icon=COMP_ICONS[i]||CheckCircle2;
            return (
              <li key={i} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 border border-gray-100">
                <span className="w-8 h-8 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center flex-shrink-0"><Icon className="w-4 h-4 text-orange-600"/></span>
                <span className="text-sm text-gray-700 leading-snug pt-1">{item}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
function LangSwitch({ lang, setLang }) {
  return (
    <div className="flex rounded-lg overflow-hidden border border-white/25 font-mono text-[11px]">
      {["en","fr"].map(l=>(
        <button key={l} onClick={()=>setLang(l)} className={"px-2.5 py-1 uppercase tracking-wider "+(lang===l?"bg-white text-purple-800 font-semibold":"text-white/80 hover:bg-white/10")}>{l}</button>
      ))}
    </div>
  );
}
function Bdg({ role }) { return <span className={"text-xs px-2 py-0.5 rounded-full font-semibold capitalize "+(RC[role]||"bg-gray-100 text-gray-600")}>{role}</span>; }
function Tg({ tag }) { return <span className={"text-xs px-1.5 py-0.5 rounded font-semibold "+(TC[tag]||"bg-gray-100 text-gray-600")}>{tag}</span>; }
function DN({ node, depth, open, setOpen, openLabel }) {
  const has = node.ch && node.ch.length > 0;
  const isOpen = open[node.id];
  const kids = has && isOpen ? node.ch.map(c => <DN key={c.id} node={c} depth={depth+1} open={open} setOpen={setOpen} openLabel={openLabel} />) : null;
  const ico = has ? (isOpen ? <ChevronDown className="w-3.5 h-3.5 text-gray-400 flex-shrink-0"/> : <ChevronRight className="w-3.5 h-3.5 text-gray-400 flex-shrink-0"/>) : <span className="w-3.5"/>;
  return (
    <div>
      <div className="flex items-center gap-2 py-1.5 rounded hover:bg-blue-50 cursor-pointer group" style={{paddingLeft:(depth*18+8)+"px"}} onClick={()=>{ if(has) setOpen(s=>({...s,[node.id]:!s[node.id]})); }}>
        {ico}
        <span className="text-sm text-gray-700 flex-1">{node.label}</span>
        <a href={node.url} target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()} className="opacity-0 group-hover:opacity-100 text-xs text-blue-500 pr-3 transition-opacity">{openLabel}</a>
      </div>
      {kids}
    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [lang,setLangState]=useState(()=>{ try { return localStorage.getItem("ldp_lang")||"en"; } catch(e){ return "en"; } });
  function setLang(l){ setLangState(l); try { localStorage.setItem("ldp_lang",l); } catch(e){} }
  const t = STR[lang];

  const [users,setUsers]=useState(IU);
  const [li,setLi]=useState(false);
  const [me,setMe]=useState(null);
  const [ready,setReady]=useState(false);

  useEffect(()=>{
    (async()=>{
      // Load shared user list — merge with defaults so admin/james always exist
      const saved = await loadUsers();
      const u = saved ? {...IU, ...saved} : IU;
      setUsers(u);
      // If first time, seed shared storage with defaults
      if (!saved) await saveUsers(u);
      // Restore personal session
      const sess = await loadSession();
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
  const [dop,setDop]=useState({});
  const [uv,setUv]=useState("list");
  const [ut,setUt]=useState(null);
  const [uf,setUf]=useState(EF());
  const [ue,setUe]=useState("");
  const [sp,setSp]=useState(false);
  const [dc,setDc]=useState(null);
  const [uq,setUq]=useState("");
  const [ur,setUr]=useState("all");
  const [mt,setMt]=useState("overview");
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

  function login() { const u=Object.values(users).find(u=>u.username===lf.username&&u.password===lf.password); if(u){setMe({...u});setLi(true);setLe("");saveSession(u.username);}else setLe(t.invalidCreds); }
  function reg() {
    setRe("");
    if(!rf.name.trim()||!rf.username.trim()||!rf.email.trim()||!rf.password.trim()){setRe(t.errAllRequired);return;}
    if(rf.password!==rf.confirm){setRe(t.errNoMatch);return;}
    if(rf.password.length<6){setRe(t.errMinChars);return;}
    if(users[rf.username]){setRe(t.errTaken);return;}
    setUsers(p=>{const n={...p,[rf.username]:{username:rf.username,password:rf.password,role:"participant",name:rf.name,email:rf.email,title:"",organization:"",description:"",profilePicture:null}};saveUsers(n);return n;});
    setRok(true);
    setTimeout(()=>{setSr(false);setRok(false);setRf({name:"",username:"",email:"",password:"",confirm:""});},2000);
  }
  function logout(){setLi(false);setMe(null);setLf({username:"",password:""});setLe("");setTab("dashboard");clearSession();}
  function tp(cat,id){setProg(p=>({...p,[cat]:{...p[cat],[id]:!p[cat][id]}}))}
  function pct(){let tt=0,d=0;Object.values(CUR).forEach(ph=>ph.modules.forEach(m=>{tt++;if(prog.mod[m.id])d++;}));return tt?Math.round(d/tt*100):0;}
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
    if(uv==="create"&&users[uf.username]){setUe(t.errExists);return;}
    if(uv==="edit"&&uf.username!==ut&&users[uf.username]){setUe(t.errTaken);return;}
    const u={...uf};if(!u.password&&uv==="edit")u.password=users[ut].password;
    setUsers(p=>{const n={...p};if(uv==="edit"&&ut!==u.username)delete n[ut];n[u.username]=u;if(me.username===ut)setMe(u);saveUsers(n);return n;});
    setUv("list");setUf(EF());setUt(null);
  }
  function ud(un){if(un===me.username)return;setUsers(p=>{const n={...p};delete n[un];saveUsers(n);return n;});setDc(null);if(uv==="detail"&&ut===un){setUv("list");setUt(null);}}
  function ui(e){const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onloadend=()=>setUf(fm=>({...fm,profilePicture:r.result}));r.readAsDataURL(f);}
  const fu=Object.values(users).filter(u=>{const q=uq.toLowerCase();return(!q||u.name.toLowerCase().includes(q)||u.username.toLowerCase().includes(q)||u.email.toLowerCase().includes(q))&&(ur==="all"||u.role===ur);});
  const all=[...SM,...CI];
  const cur=all.find(m=>m.id===sm)||SM[0];
  const op=pct();
  const tabs=[{k:"dashboard",l:t.nav.dashboard,I:TrendingUp},{k:"curriculum",l:t.nav.curriculum,I:Calendar},{k:"study-guide",l:t.nav.study,I:Book},{k:"coach",l:t.nav.coach,I:Sparkles},{k:"resources",l:t.nav.resources,I:Trophy},{k:"drive",l:t.nav.drive,I:FolderOpen},...(me&&me.role==="admin"?[{k:"users",l:t.nav.users,I:Users}]:[])];

  if(!ready){ return <div className="min-h-screen bg-gradient-to-br from-purple-700 to-blue-700 flex items-center justify-center"><div className="text-center text-white"><div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"/><p className="font-semibold">{t.loading}</p></div></div>; }
  if(!li){
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-700 via-blue-700 to-indigo-800 flex items-center justify-center p-6 relative">
        <div className="absolute top-4 right-4"><LangSwitch lang={lang} setLang={setLang}/></div>
        <div className="w-full max-w-md space-y-4">
          <div className="text-center mb-2">
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="flex flex-col gap-1">
                <div className="h-5 w-1.5 bg-orange-500 rounded-full"/>
                <div className="h-2.5 w-1.5 bg-yellow-400 rounded-full"/>
                <div className="h-2 w-1.5 bg-green-500 rounded-full"/>
              </div>
              <div className="text-left">
                <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-orange-300 mb-0.5">UNFPA · WCARO</p>
                <h1 className="text-3xl font-semibold text-white leading-tight">Leadership &amp; Communication</h1>
                <p className="text-xl font-light text-white/80 leading-tight">Development Portal</p>
              </div>
            </div>
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-purple-300">{t.loginSubtitle}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <Band/>
            <div className="flex border-b">
              <button onClick={()=>{setSr(false);setRe("");setLe("");}} className={"flex-1 py-3 text-sm font-semibold transition-colors "+(!sr?"bg-orange-50 text-orange-700 border-b-2 border-orange-500":"text-gray-500 hover:bg-gray-50 border-b-2 border-transparent")}>{t.signIn}</button>
              <button onClick={()=>{setSr(true);setRe("");setLe("");}} className={"flex-1 py-3 text-sm font-semibold transition-colors "+(sr?"bg-orange-50 text-orange-700 border-b-2 border-orange-500":"text-gray-500 hover:bg-gray-50 border-b-2 border-transparent")}>{t.requestAccess}</button>
            </div>
            <div className="p-6">
              {!sr?(
                <div className="space-y-4">
                  <div><label className="block text-sm font-semibold text-gray-600 mb-1">{t.username}</label><input type="text" value={lf.username} onChange={e=>setLf(f=>({...f,username:e.target.value}))} onKeyDown={e=>{if(e.key==="Enter")login();}} className="ldp-input" placeholder={t.enterUsername}/></div>
                  <div><label className="block text-sm font-semibold text-gray-600 mb-1">{t.password}</label><input type="password" value={lf.password} onChange={e=>setLf(f=>({...f,password:e.target.value}))} onKeyDown={e=>{if(e.key==="Enter")login();}} className="ldp-input" placeholder={t.enterPassword}/></div>
                  {le&&<div className="bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-red-700 text-sm text-center">{le}</div>}
                  <button onClick={login} className="ldp-btn-primary">{t.signInBtn}</button>
                </div>
              ):(
                <div className="space-y-3">
                  {rok?(
                    <div className="text-center py-4 space-y-3">
                      <CheckCircle2 className="w-14 h-14 text-green-500 mx-auto"/>
                      <h3 className="font-bold text-gray-800 text-lg">{t.accountCreated}</h3>
                      <p className="text-gray-500 text-sm">{t.accountCreatedDesc}</p>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-left space-y-2">
                        <p className="text-xs font-semibold text-blue-900">{t.accessIncludes}</p>
                        <p className="text-xs text-blue-700">{t.accessGuides}</p>
                        <p className="text-xs text-blue-700">{t.accessVideos}</p>
                        <p className="text-xs text-blue-700">{t.accessFolders}</p>
                        <a href="https://drive.google.com/drive/folders/1e3nvDC36AptxDysRtO0C5dYiTqSS-H87" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-blue-700 font-semibold hover:underline"><FolderOpen className="w-3.5 h-3.5"/>{t.openDriveRepo}</a>
                      </div>
                      <p className="text-gray-400 text-xs">{t.redirecting}</p>
                    </div>
                  ):(
                    <div className="space-y-3">
                      <p className="text-xs text-gray-500 bg-blue-50 border border-blue-100 rounded-lg px-3 py-2">{t.regNote1}<strong>{t.regNoteBold}</strong>{t.regNote2}</p>
                      {[[t.fullName,"name","text"],[t.username,"username","text"],[t.email,"email","email"],[t.password,"password","password"],[t.confirmPassword,"confirm","password"]].map(arr=>{
                        const lb=arr[0],fd=arr[1],tp2=arr[2];
                        return <div key={fd}><label className="block text-xs font-semibold text-gray-700 mb-1">{lb}</label><input type={tp2} value={rf[fd]} onChange={e=>{const v=e.target.value;setRf(f=>({...f,[fd]:v}));}} onKeyDown={e=>{if(e.key==="Enter")reg();}} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 outline-none"/></div>;
                      })}
                      {re&&<div className="bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-red-700 text-sm">{re}</div>}
                      <button onClick={reg} className="ldp-btn-primary">{t.createAccount}</button>
                      <p className="text-center text-xs text-gray-400">{t.haveAccount} <button onClick={()=>{setSr(false);setRe("");}} className="text-purple-600 hover:underline font-semibold">{t.signIn}</button></p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          <p className="text-center text-purple-300 text-xs">{t.loginFooter}</p>
        </div>
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

  const topbar=(
    <div className="text-white" style={{background:"linear-gradient(135deg,#1b2540 0%,#1e2a44 60%,#2f5077 100%)"}}>
      <div className="px-6 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex flex-col gap-0.5 flex-shrink-0">
            <div className="h-4 w-1 bg-orange-500 rounded-full"/>
            <div className="h-2 w-1 bg-yellow-400 rounded-full"/>
            <div className="h-1.5 w-1 bg-green-500 rounded-full"/>
          </div>
          <div className="min-w-0">
            <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-orange-300 mb-0.5">{t.eyebrow}</p>
            <h1 className="text-xl font-semibold leading-tight truncate">Leadership &amp; Communication Mastery</h1>
            <p className="font-mono text-[9px] text-blue-300/70 mt-0.5 hidden sm:block">UNFPA WCARO · Cohort 1 · 2026</p>
          </div>
        </div>
        <div className="flex items-center gap-2.5 flex-shrink-0">
          <LangSwitch lang={lang} setLang={setLang}/>
          <div className="flex items-center gap-2 bg-white/10 border border-white/15 rounded-lg px-2.5 py-1.5">
            <Av user={me} size="sm"/>
            <div className="hidden sm:block">
              <p className="text-xs font-semibold leading-none">{me.name}</p>
              <p className="font-mono text-[9px] uppercase tracking-wider text-orange-300 mt-0.5">{me.role}</p>
            </div>
          </div>
          <button onClick={logout} className="ldp-btn-ghost text-white flex items-center gap-1.5"><LogOut className="w-4 h-4"/><span className="hidden sm:inline">{t.logout}</span></button>
        </div>
      </div>
      <Band/>
    </div>
  );

  const nav=(
    <div className="bg-white border-b flex overflow-x-auto sticky top-0 z-40">
      {tabs.map(tb=>(
        <button key={tb.k} onClick={()=>setTab(tb.k)} className={"flex items-center gap-1.5 px-5 py-3.5 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors "+(tab===tb.k?"border-orange-500 text-orange-700 bg-orange-50":"border-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-700")}>
          <tb.I className="w-4 h-4"/>{tb.l}
          {tb.k==="users"&&<span className="ml-1 bg-orange-100 text-orange-700 text-xs rounded-full px-1.5 py-0.5">{Object.keys(users).length}</span>}
        </button>
      ))}
    </div>
  );

  // dashboard – mentor
  const mentorDash=(tab==="dashboard"&&me.role==="mentor")?(
    <div className="space-y-5">
      <div className="rounded-xl overflow-hidden shadow-md">
        <div style={{background:"linear-gradient(135deg,#1e2a44 0%,#2f5077 100%)"}} className="text-white p-5">
          <div className="flex items-center gap-4">
            <div className="ring-2 ring-orange-400/60 ring-offset-2 ring-offset-transparent rounded-full flex-shrink-0"><Av user={me} size="lg"/></div>
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-orange-300 mb-0.5">{t.mentorDash}</p>
              <h2 className="text-2xl font-bold">{me.name}</h2>
              <p className="text-blue-200 text-sm">{me.title||t.mentorDefault} · {me.organization||"UNFPA WCARO"}</p>
            </div>
          </div>
          <div className="flex gap-2 mt-5 border-t border-white/15 pt-4 flex-wrap">
            {[["overview",t.mTabs.overview],["participants",t.mTabs.participants],["sessions",t.mTabs.sessions],["goals",t.mTabs.goals],["notes",t.mTabs.notes]].map(arr=>(
              <button key={arr[0]} onClick={()=>setMt(arr[0])} className={"px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors "+(mt===arr[0]?"bg-white text-purple-900":"bg-white/15 hover:bg-white/25 text-white border border-white/20")}>{arr[1]}</button>
            ))}
          </div>
        </div>
        <Band/>
      </div>
      {mt==="overview"&&(
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[[pts.length,t.statParticipants,"text-purple-700","#4c1d95"],[ms.length,t.statSessions,"text-blue-700","#1d4ed8"],[dg+"/"+mg.length,t.statGoalsDone,"text-green-700","#15803d"],[gp+"%",t.statProgress,"text-orange-600","#e85d1f"]].map(arr=>(
              <div key={arr[1]} className="ldp-stat text-center" style={{"--stat-accent":arr[3]}}><p className={"font-mono text-3xl font-semibold "+arr[2]}>{arr[0]}</p><p className="text-xs text-gray-500 mt-1">{arr[1]}</p></div>
            ))}
          </div>
          <div className="ldp-card p-4">
            <div className="flex justify-between mb-2"><p className="text-sm font-semibold text-gray-700">{t.goalProgress}</p><span className="font-mono text-sm font-semibold text-orange-600">{gp}%</span></div>
            <div className="ldp-progress-bar h-2.5"><div className="ldp-progress-fill h-2.5" style={{width:gp+"%"}}/></div>
          </div>
          <Competencies t={t}/>
          <div className="ldp-card p-4">
            <div className="flex justify-between items-center mb-3"><h4 className="font-semibold text-gray-800">{t.cohortProgramme}</h4><span className="ldp-eyebrow">Cohort 1</span></div>
            {Object.entries(CUR).map((e,ci)=>(
              <div key={e[0]} className="flex items-center gap-3 py-1.5 border-b last:border-0">
                <span className="font-mono text-[10px] font-semibold text-orange-500 w-5 flex-shrink-0">{ROMAN["p"+(ci+1)]||""}</span>
                <div className="flex-1"><p className="text-sm font-semibold text-gray-700">{e[1].name}</p><p className="text-xs text-gray-400">{e[1].modules.length} {t.modules}</p></div>
              </div>
            ))}
          </div>
          <div className="ldp-card p-4">
            <div className="flex justify-between items-center mb-3"><h4 className="font-semibold text-gray-800">{t.recentSessions}</h4><button onClick={()=>setMt("sessions")} className="text-xs text-orange-600 hover:underline">{t.viewAll}</button></div>
            {ms.length===0?<p className="text-sm text-gray-400 italic">{t.noSessions}</p>:ms.slice(-3).reverse().map(s=>(
              <div key={s.id} className="flex items-center gap-3 py-2 border-b last:border-0"><div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center"><Calendar className="w-4 h-4 text-blue-600"/></div><div><p className="text-sm font-semibold text-gray-700">{users[s.participant]?users[s.participant].name:s.participant}</p><p className="text-xs text-gray-400">{s.date} · {t.sessionTypes[s.type]||s.type}</p></div></div>
            ))}
          </div>
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
                <div className="flex items-center gap-3 mb-3"><Av user={p} size="md"/><div className="flex-1"><p className="font-semibold text-gray-800">{p.name}</p><p className="text-xs text-gray-400">@{p.username} · {p.email}</p></div><Bdg role={p.role}/></div>
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
            <button onClick={()=>setSas(v=>!v)} className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90"><Plus className="w-4 h-4"/>{t.logSession}</button>
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
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center flex-shrink-0"><Calendar className="w-4 h-4 text-white"/></div>
              <div className="flex-1"><div className="flex items-center gap-2 flex-wrap"><p className="font-semibold text-gray-800 text-sm">{users[s.participant]?users[s.participant].name:s.participant}</p><span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-semibold">{t.sessionTypes[s.type]||s.type}</span><span className="text-xs text-gray-400">{s.date}</span></div>{s.notes&&<p className="text-xs text-gray-500 mt-1">{s.notes}</p>}</div>
              <button onClick={()=>{const sid=s.id;setMs(p=>p.filter(x=>x.id!==sid));}} className="p-1.5 text-gray-300 hover:text-red-400 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-3.5 h-3.5"/></button>
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
              <button onClick={()=>tg(g.id)} className="flex-shrink-0 mt-0.5">{g.done?<CheckCircle2 className="w-5 h-5 text-green-500"/>:<Circle className="w-5 h-5 text-gray-300"/>}</button>
              <p className={"text-sm flex-1 "+(g.done?"line-through text-gray-400":"text-gray-700")}>{g.text}</p>
              <button onClick={()=>dg2(g.id)} className="p-1 text-gray-200 hover:text-red-400 transition-colors"><Trash2 className="w-3.5 h-3.5"/></button>
            </div>
          ))}
          <div className="flex gap-2"><input value={ng} onChange={e=>setNg(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")ag();}} placeholder={t.addGoal} className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 outline-none"/><button onClick={ag} className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm"><Plus className="w-4 h-4"/></button></div>
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
    <div className="space-y-5">
      <div className="rounded-xl overflow-hidden shadow-md">
        <div style={{background:"linear-gradient(135deg,#1e2a44 0%,#2f5077 100%)"}} className="text-white p-5">
          <div className="flex items-center gap-4">
            <div className="ring-2 ring-orange-400/60 ring-offset-2 ring-offset-transparent rounded-full flex-shrink-0"><Av user={me} size="lg"/></div>
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-orange-300 mb-0.5">{t.welcome}</p>
              <h2 className="text-2xl font-bold">{me.name}</h2>
              <p className="text-blue-200 text-sm">{me.title||t.participantDefault}{me.organization?" · "+me.organization:""}</p>
            </div>
          </div>
        </div>
        <Band/>
      </div>
      <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3">
        <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5"/>
        <div className="flex-1">
          <p className="font-semibold text-green-900 text-sm">{t.resourcesReady}</p>
          <p className="text-green-700 text-xs mt-0.5">{t.resourcesReadyDesc}</p>
          <div className="flex flex-wrap gap-2 mt-3">
            <a href="https://drive.google.com/drive/folders/1e3nvDC36AptxDysRtO0C5dYiTqSS-H87" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 bg-white border border-green-300 hover:bg-green-50 text-green-800 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"><FolderOpen className="w-3.5 h-3.5"/>{t.openDriveRepo}</a>
            <button onClick={()=>setTab("study-guide")} className="flex items-center gap-1.5 bg-white border border-green-300 hover:bg-green-50 text-green-800 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"><Book className="w-3.5 h-3.5"/>{t.goToStudy}</button>
          </div>
        </div>
      </div>
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg"><h3 className="font-bold text-blue-900">{t.journeyTitle}</h3><p className="text-blue-700 text-sm mt-0.5">{t.journeyDesc}</p></div>
      <div className="grid grid-cols-3 gap-4">
        <div className="ldp-stat" style={{"--stat-accent":"#e85d1f"}}><div className="flex justify-between items-start"><Target className="w-7 h-7 text-orange-500"/><span className="font-mono text-2xl font-semibold text-orange-600">{op}%</span></div><p className="text-xs text-gray-500 mt-1">{t.overallProgress}</p><div className="ldp-progress-bar h-1.5 mt-2"><div className="ldp-progress-fill h-1.5" style={{width:op+"%"}}/></div></div>
        <div className="ldp-stat" style={{"--stat-accent":"#15803d"}}><div className="flex justify-between items-start"><Book className="w-7 h-7 text-green-600"/><span className="font-mono text-2xl font-semibold text-green-700">{Object.values(prog.rt).filter(Boolean).length}</span></div><p className="text-xs text-gray-500 mt-1">{t.readingTests}</p></div>
        <div className="ldp-stat" style={{"--stat-accent":"#c08f1f"}}><div className="flex justify-between items-start"><Mic className="w-7 h-7 text-yellow-600"/><span className="font-mono text-2xl font-semibold text-yellow-700">{Object.values(prog.ve).filter(Boolean).length}</span></div><p className="text-xs text-gray-500 mt-1">{t.vocalSessions}</p></div>
      </div>
      <div className="ldp-card p-4">
        <h4 className="font-semibold text-gray-800 mb-3">{t.quickAccessStudy}</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {SM.slice(0,4).map(m=>(
            <button key={m.id} onClick={()=>{setTab("study-guide");setSm(m.id);setSt("guide");}} className="text-left p-3 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors border border-orange-100"><p className="font-mono text-[9px] uppercase tracking-wider text-orange-500">{t.phaseLabel} {m.ph}</p><p className="text-sm font-semibold text-gray-800 leading-tight mt-0.5">{m.title}</p></button>
          ))}
        </div>
      </div>
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <h4 className="font-semibold text-amber-900 mb-2 flex items-center gap-2"><Trophy className="w-4 h-4"/>{t.challenges}</h4>
        <div className="space-y-1 text-sm text-amber-800">
          {t.challengeItems.map((c,i)=><p key={i}><strong>{c[0]}</strong> {c[1]}</p>)}
        </div>
      </div>
    </div>
  ):null;

  // curriculum
  const currTab=tab==="curriculum"?(
    <div className="space-y-5">
      {Object.entries(CUR).map(e=>{
        const pk=e[0],ph=e[1];
        return (
          <div key={pk} className="ldp-card overflow-hidden">
            <div className="ldp-phase-header">
              <span className="font-mono text-2xl font-semibold text-yellow-400/80 flex-shrink-0">{ROMAN[pk]}</span>
              <div><p className="font-mono text-[9px] uppercase tracking-[0.22em] text-blue-300">{t.phaseLabel} {ROMAN[pk]}</p><h3 className="font-bold text-white">{ph.name}</h3></div>
            </div>
            <div className="p-4 space-y-3">
              {ph.modules.map((mod,idx)=>(
                <div key={mod.id} className="border rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-4 py-3 flex items-center gap-3 cursor-pointer hover:bg-gray-100" onClick={()=>tp("mod",mod.id)}>
                    {prog.mod[mod.id]?<CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0"/>:<Circle className="w-5 h-5 text-gray-300 flex-shrink-0"/>}
                    <div className="flex-1"><p className="font-semibold text-gray-800">{t.moduleWord} {idx+1}: {mod.title}</p><p className="text-xs text-gray-500">{mod.weeks} {t.weeksWord}</p></div>
                    <button onClick={ev=>{ev.stopPropagation();setSm(mod.id);setSt("guide");setTab("study-guide");}} className="text-xs bg-purple-100 hover:bg-purple-200 text-purple-700 px-2.5 py-1 rounded-lg">{t.studyGuideBtn}</button>
                  </div>
                  <div className="px-4 py-3 space-y-3 bg-white">
                    <div><p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{t.dailyTasks}</p>{mod.dt.map((tk,i)=><p key={i} className="text-sm text-gray-600 pl-3 border-l-2 border-blue-200 mb-1">{tk}</p>)}</div>
                    <div><p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{t.readingsLabel}</p>{mod.rd.map((r,i)=>{const tid=mod.id+"_r"+i;return <div key={i} className="flex items-center gap-2 mb-1">{r.x&&<button onClick={()=>tp("rt",tid)}>{prog.rt[tid]?<CheckCircle2 className="w-3.5 h-3.5 text-green-500"/>:<Circle className="w-3.5 h-3.5 text-gray-300"/>}</button>}<span className="text-sm text-gray-600"><strong>{r.t}</strong> — {r.c}{r.x&&<span className="text-blue-500 ml-1 text-xs">{t.testTag}</span>}</span></div>;})}</div>
                    <div><p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{t.vocalTraining}</p>{mod.ve.map((ex,i)=>{const eid=mod.id+"_v"+i;return <div key={i} className="flex items-center gap-2 mb-1"><button onClick={()=>tp("ve",eid)}>{prog.ve[eid]?<CheckCircle2 className="w-3.5 h-3.5 text-orange-500"/>:<Circle className="w-3.5 h-3.5 text-gray-300"/>}</button><span className="text-sm text-gray-600">{ex}</span></div>;})}</div>
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 px-3 py-2 rounded text-sm text-yellow-800"><strong>{t.checkpointLabel}</strong> {mod.cp}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  ):null;

  // study guide
  const sgTabs=[["guide",t.sgGuide,true],["videos",t.sgVideos,(cur.vids&&cur.vids.length>0)],["articles",t.sgArticles,(cur.arts&&cur.arts.length>0)],["readings",t.sgReadings,(cur.reads&&cur.reads.length>0)],["reflect",t.sgReflect,(cur.refs&&cur.refs.length>0)]].filter(a=>a[2]);
  const studyTab=tab==="study-guide"?(
    <div className="space-y-4">
      <div className="bg-white border rounded-xl p-4 shadow-sm">
        <label className="block text-sm font-semibold text-gray-700 mb-2">{t.selectModule}</label>
        <select value={sm} onChange={e=>{setSm(e.target.value);setSt("guide");}} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 outline-none bg-white">
          <optgroup label={t.phase1}>{SM.filter(m=>m.ph===1).map(m=><option key={m.id} value={m.id}>{m.title} ({m.wk})</option>)}</optgroup>
          <optgroup label={t.phase2}>{SM.filter(m=>m.ph===2).map(m=><option key={m.id} value={m.id}>{m.title} ({m.wk})</option>)}</optgroup>
          <optgroup label={t.phase3}>{SM.filter(m=>m.ph===3).map(m=><option key={m.id} value={m.id}>{m.title} ({m.wk})</option>)}</optgroup>
          <optgroup label={t.phase4}>{SM.filter(m=>m.ph===4).map(m=><option key={m.id} value={m.id}>{m.title} ({m.wk})</option>)}</optgroup>
          <optgroup label={t.commGroup}>{CI.map(m=><option key={m.id} value={m.id}>{m.title}</option>)}</optgroup>
        </select>
      </div>
      <div className="rounded-xl overflow-hidden shadow-md">
        <div style={{background:"linear-gradient(135deg,#1e2a44 0%,#2f5077 100%)"}} className="text-white p-5">
          <div className="flex items-start justify-between flex-wrap gap-3">
            <div><p className="font-mono text-[9px] uppercase tracking-[0.25em] text-orange-300 mb-1">{cur.wk}</p><h2 className="text-xl font-bold">{cur.title}</h2></div>
            <div className="flex gap-2 flex-wrap">
              {cur.doc&&<a href={cur.doc} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 bg-white/15 hover:bg-white/25 border border-white/20 px-3 py-1.5 rounded-lg text-sm font-semibold"><FileText className="w-4 h-4"/>{t.openInDrive}</a>}
              {cur.fld&&<a href={cur.fld} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 bg-white/15 hover:bg-white/25 border border-white/20 px-3 py-1.5 rounded-lg text-sm font-semibold"><FolderOpen className="w-4 h-4"/>{t.folderBtn}</a>}
            </div>
          </div>
        </div>
        <Band/>
      </div>
      <div className="flex bg-white border rounded-xl overflow-hidden shadow-sm">
        {sgTabs.map(a=><button key={a[0]} onClick={()=>setSt(a[0])} className={"flex-1 py-2.5 text-xs font-semibold border-b-2 transition-colors "+(st===a[0]?"border-orange-500 text-orange-700 bg-orange-50":"border-transparent text-gray-500 hover:bg-gray-50")}>{a[1]}</button>)}
      </div>
      {st==="guide"&&(
        <div className="space-y-3">
          <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
            <div className="bg-gray-50 border-b px-5 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2"><FileText className="w-4 h-4 text-blue-600"/><span className="text-sm font-semibold text-gray-700">{t.rgTitle}</span><span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">{t.live}</span></div>
              {cur.doc&&<a href={cur.doc} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline flex items-center gap-1">{t.editInDrive}<ExternalLink className="w-3 h-3"/></a>}
            </div>
            <div className="p-6 max-h-72 overflow-y-auto space-y-1">
              {(()=>{
                const content=DDC[cur.id];
                if(!content){ return <div><p className="text-sm text-gray-500 italic mb-3">{t.driveOnly}</p>{cur.doc&&<a href={cur.doc} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-2 rounded-lg text-sm font-semibold"><FileText className="w-4 h-4"/>{t.openRG}</a>}</div>; }
                const lines=content.split("\n");
                return lines.map((line,i)=>{
                  const um=line.match(/https?:\/\/[^\s]+/);
                  if(um){ const url=um[0]; const before=line.slice(0,line.indexOf(url)); return <div key={i} className="flex items-start gap-1 flex-wrap">{before&&<span className="text-gray-600 text-sm whitespace-pre">{before}</span>}<a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm break-all flex items-center gap-0.5">{url}<ExternalLink className="w-3 h-3 flex-shrink-0"/></a></div>; }
                  if(/^(MODULE|CURATED|WEEKLY|CHECKPOINT|STEP \d|VOCAL T|MASTER|PHASE \d|MY WHY|STAKEHOLDER|SENIOR|CRISIS|REPRESENT|FREE ART|HOW TO)/.test(line)&&line.trim()){ return <p key={i} className="font-bold text-purple-700 text-sm mt-3 mb-1 border-b border-purple-100 pb-1">{line}</p>; }
                  if(/^\d+\./.test(line)&&line.trim()){ return <p key={i} className="font-bold text-gray-800 text-sm mt-2 mb-0.5">{line}</p>; }
                  if(line.startsWith("•")){ return <p key={i} className="text-sm text-gray-700 pl-3 py-0.5">{line}</p>; }
                  if(line.startsWith("□")){ return <p key={i} className="text-sm text-gray-600 pl-3 py-0.5 font-mono">{line}</p>; }
                  if(!line.trim()){ return <div key={i} className="h-1"/>; }
                  return <p key={i} className="text-sm text-gray-700 py-0.5">{line}</p>;
                });
              })()}
            </div>
          </div>
          {/* Resource link cards */}
          {(cur.vids&&cur.vids.length>0||cur.arts&&cur.arts.length>0)&&(
            <div className="bg-white border rounded-xl p-4 shadow-sm">
              <h4 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2"><Link className="w-4 h-4 text-purple-500"/>{t.quickAccessAll}</h4>
              <div className="space-y-2">
                {cur.vids&&cur.vids.map((v,i)=>(
                  <a key={"v"+i} href={v.u} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-2.5 bg-red-50 hover:bg-red-100 rounded-lg transition-colors group">
                    <div className="w-8 h-8 rounded-full bg-red-200 flex items-center justify-center flex-shrink-0"><Play className="w-4 h-4 text-red-700"/></div>
                    <div className="flex-1 min-w-0"><p className="text-sm font-semibold text-gray-800 truncate">{v.t}</p><p className="text-xs text-gray-500">{v.d}</p></div>
                    <Tg tag={v.g}/>
                  </a>
                ))}
                {cur.arts&&cur.arts.map((a,i)=>(
                  <a key={"a"+i} href={a.u} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-2.5 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors group">
                    <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center flex-shrink-0">{a.s==="PDF"?<FileText className="w-4 h-4 text-amber-700"/>:<Link className="w-4 h-4 text-blue-700"/>}</div>
                    <div className="flex-1 min-w-0"><p className="text-sm font-semibold text-gray-800 truncate">{a.t}</p></div>
                    <Tg tag={a.s}/>
                  </a>
                ))}
                {cur.doc&&(
                  <a href={cur.doc} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-2.5 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                    <div className="w-8 h-8 rounded-full bg-green-200 flex items-center justify-center flex-shrink-0"><FileText className="w-4 h-4 text-green-700"/></div>
                    <div className="flex-1 min-w-0"><p className="text-sm font-semibold text-gray-800">{t.fullResourceGuide}</p><p className="text-xs text-gray-500">{t.driveEditable}</p></div>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">Drive</span>
                  </a>
                )}
                {cur.fld&&(
                  <a href={cur.fld} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-2.5 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                    <div className="w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center flex-shrink-0"><FolderOpen className="w-4 h-4 text-purple-700"/></div>
                    <div className="flex-1 min-w-0"><p className="text-sm font-semibold text-gray-800">{t.moduleFolder}</p><p className="text-xs text-gray-500">{t.allFilesModule}</p></div>
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-semibold">{lang==="fr"?"Dossier":"Folder"}</span>
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      )}
      {st==="videos"&&cur.vids&&cur.vids.length>0&&(
        <div className="space-y-2">
          {cur.vids.map((v,i)=>(
            <a key={i} href={v.u} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-white border rounded-xl p-4 hover:shadow-md hover:border-red-200 transition-all group">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 group-hover:bg-red-200"><Play className="w-5 h-5 text-red-600"/></div>
              <div className="flex-1 min-w-0"><p className="font-semibold text-gray-800 text-sm">{v.t}</p><p className="text-xs text-gray-400">{v.d}</p></div>
              <div className="flex items-center gap-2 flex-shrink-0"><Tg tag={v.g}/><ExternalLink className="w-4 h-4 text-gray-300 group-hover:text-red-400"/></div>
            </a>
          ))}
        </div>
      )}
      {st==="articles"&&cur.arts&&cur.arts.length>0&&(
        <div className="space-y-2">
          {cur.arts.map((a,i)=>(
            <a key={i} href={a.u} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-white border rounded-xl p-4 hover:shadow-md hover:border-blue-200 transition-all group">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">{a.s==="PDF"?<FileText className="w-5 h-5 text-amber-600"/>:<Link className="w-5 h-5 text-blue-600"/>}</div>
              <div className="flex-1 min-w-0"><p className="font-semibold text-gray-800 text-sm">{a.t}</p></div>
              <div className="flex items-center gap-2 flex-shrink-0"><Tg tag={a.s}/><ExternalLink className="w-4 h-4 text-gray-300 group-hover:text-blue-400"/></div>
            </a>
          ))}
        </div>
      )}
      {st==="readings"&&cur.reads&&cur.reads.length>0&&(
        <div className="bg-white border rounded-xl p-5 shadow-sm space-y-3">
          <h3 className="font-bold text-gray-800 flex items-center gap-2"><Book className="w-5 h-5 text-purple-500"/>{t.requiredReading}</h3>
          {cur.reads.map((r,i)=>{
            const tid=cur.id+"_r"+i;
            return <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"><button onClick={()=>tp("rt",tid)} className="flex-shrink-0 mt-0.5">{prog.rt[tid]?<CheckCircle2 className="w-5 h-5 text-green-500"/>:<Circle className="w-5 h-5 text-gray-300"/>}</button><p className="text-sm text-gray-700 flex-1">{r}</p></div>;
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
              <p className="text-sm font-bold text-yellow-900 mb-1">{t.checkpointFlag}</p>
              <p className="text-sm text-yellow-800">{cur.cp}</p>
              {cur.fld&&<a href={cur.fld} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-yellow-700 mt-2 underline"><FolderOpen className="w-3.5 h-3.5"/>{t.uploadToDrive}</a>}
            </div>
          )}
        </div>
      )}
    </div>
  ):null;

  // resources
  const resTab=tab==="resources"?(
    <div className="space-y-4">
      <Competencies t={t}/>
      <div className="bg-white border rounded-xl p-5 shadow-sm"><h3 className="font-bold text-lg mb-3 flex items-center gap-2"><Mic className="w-5 h-5 text-orange-500"/>{t.vocalTitle}</h3><p className="text-sm text-gray-600 mb-3">{t.vocalDesc}</p><a href="https://drive.google.com/drive/folders/1w0UbxFFcqsKa6EeYf_J7Pp485OtF7fTT" target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline flex items-center gap-1"><FolderOpen className="w-4 h-4"/>{t.dailyExercisesFolder}</a></div>
      <div className="bg-white border rounded-xl p-5 shadow-sm"><h3 className="font-bold text-lg mb-3 flex items-center gap-2"><Users className="w-5 h-5 text-blue-500"/>{t.practiceTitle}</h3><ul className="space-y-1.5 text-sm text-gray-600">{t.practiceItems.map((tx,i)=><li key={i}>• {tx}</li>)}</ul></div>
      <div className="bg-red-50 border border-red-100 rounded-xl p-5"><h3 className="font-bold text-lg mb-3 text-red-900">{t.pitfallsTitle}</h3><div className="space-y-2 text-sm">{t.pitfallItems.map((a,i)=><div key={i}><strong className="text-red-700">{t.pitfallWord}</strong> {a[0]} — <strong>{t.solutionWord}</strong> {a[1]}</div>)}</div></div>
    </div>
  ):null;

  // drive
  const driveTab=tab==="drive"?(
    <div className="space-y-4">
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg"><h3 className="font-bold text-blue-900">{t.driveRepo}</h3><p className="text-blue-700 text-sm mt-0.5">{t.driveRepoDesc}</p></div>
      <div className="flex justify-between items-center"><p className="text-sm text-gray-500">{t.driveRoot}</p><a href="https://drive.google.com/drive/folders/1e3nvDC36AptxDysRtO0C5dYiTqSS-H87" target="_blank" rel="noopener noreferrer" className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg">{t.openRoot}</a></div>
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
          <div className="flex items-center gap-4"><Av user={users[ut]} size="lg"/><div><h2 className="text-xl font-bold text-gray-800">{users[ut].name}</h2>{users[ut].title&&<p className="text-purple-600 font-medium text-sm">{users[ut].title}</p>}{users[ut].organization&&<p className="text-gray-500 text-sm">{users[ut].organization}</p>}<div className="mt-1"><Bdg role={users[ut].role}/></div></div></div>
          <div className="flex gap-2">
            <button onClick={()=>{setUf({...users[ut],password:""});setUv("edit");setUe("");}} className="flex items-center gap-1.5 text-sm bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg"><Edit2 className="w-4 h-4"/>{t.edit}</button>
            {users[ut].username!==me.username&&<button onClick={()=>setDc(ut)} className="flex items-center gap-1.5 text-sm bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1.5 rounded-lg"><Trash2 className="w-4 h-4"/>{t.del}</button>}
          </div>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3">
          {[[t.username,users[ut].username],[t.email,users[ut].email],[t.organization,users[ut].organization||"—"]].map(a=><div key={a[0]} className="bg-gray-50 rounded-lg p-3"><p className="text-gray-400 text-xs mb-1">{a[0]}</p><p className="font-medium text-gray-700 text-sm">{a[1]}</p></div>)}
          <div className="bg-gray-50 rounded-lg p-3"><p className="text-gray-400 text-xs mb-1">{t.roleWord}</p><Bdg role={users[ut].role}/></div>
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
          <div className="relative">{uf.profilePicture?<img src={uf.profilePicture} alt="" className="w-20 h-20 rounded-full object-cover border-4 border-purple-100"/>:<div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center border-4 border-purple-100"><User className="w-10 h-10 text-white"/></div>}<label className="absolute bottom-0 right-0 bg-purple-600 text-white rounded-full p-1.5 cursor-pointer shadow"><Settings className="w-3.5 h-3.5"/><input type="file" accept="image/*" onChange={ui} className="hidden"/></label></div>
          <p className="text-sm font-semibold text-gray-700">{t.profilePhoto}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[[t.fFullName,"name","text"],[t.fUsername,"username","text"],[t.fEmail,"email","email"],[t.fJobTitle,"title","text"],[t.fOrg,"organization","text"]].map(a=>(
            <div key={a[1]}><label className="block text-sm font-semibold text-gray-700 mb-1">{a[0]}</label><input type={a[2]} value={uf[a[1]]||""} onChange={e=>{const v=e.target.value;setUf(f=>({...f,[a[1]]:v}));}} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 outline-none"/></div>
          ))}
          <div><label className="block text-sm font-semibold text-gray-700 mb-1">{uv==="edit"?t.fNewPassword:t.fPassword}</label><div className="relative"><input type={sp?"text":"password"} value={uf.password} onChange={e=>{const v=e.target.value;setUf(f=>({...f,password:v}));}} placeholder={uv==="edit"?t.keepCurrent:t.minChars} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 outline-none pr-10"/><button type="button" onClick={()=>setSp(v=>!v)} className="absolute right-3 top-2.5 text-gray-400">{sp?<EyeOff className="w-4 h-4"/>:<Eye className="w-4 h-4"/>}</button></div></div>
          <div><label className="block text-sm font-semibold text-gray-700 mb-1">{t.fRole}</label><select value={uf.role} onChange={e=>{const v=e.target.value;setUf(f=>({...f,role:v}));}} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 outline-none bg-white">{ROLES.map(r=><option key={r} value={r}>{r}</option>)}</select></div>
        </div>
        <div><label className="block text-sm font-semibold text-gray-700 mb-1">{t.fBio}</label><textarea value={uf.description||""} onChange={e=>{const v=e.target.value;setUf(f=>({...f,description:v}));}} rows="2" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 outline-none resize-none"/></div>
        {ue&&<div className="bg-red-50 border border-red-200 rounded-lg px-4 py-2 text-red-700 text-sm">{ue}</div>}
        <div className="flex gap-3"><button onClick={us} className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold text-sm hover:opacity-90"><Save className="w-4 h-4"/>{uv==="edit"?t.saveChanges:t.createUserBtn}</button><button onClick={()=>{setUv("list");setUe("");}} className="bg-gray-100 text-gray-700 px-6 py-2.5 rounded-lg font-semibold text-sm">{t.cancel}</button></div>
      </div>
    </div>
  ):null;

  // users – list
  const uList=(tab==="users"&&me.role==="admin"&&uv==="list")?(
    <div className="space-y-4">
      <div className="flex items-center justify-between"><div><h2 className="text-xl font-bold text-gray-800">{t.userMgmt}</h2><p className="text-sm text-gray-500">{Object.keys(users).length} {t.usersWord}</p></div><button onClick={()=>{setUf(EF());setUe("");setUv("create");}} className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2.5 rounded-lg font-semibold text-sm hover:opacity-90"><Plus className="w-4 h-4"/>{t.addUser}</button></div>
      <div className="flex gap-3 flex-wrap"><input value={uq} onChange={e=>setUq(e.target.value)} placeholder={t.searchPlaceholder} className="flex-1 min-w-48 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 outline-none"/><select value={ur} onChange={e=>setUr(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 outline-none bg-white"><option value="all">{t.allRoles}</option>{ROLES.map(r=><option key={r} value={r}>{r}</option>)}</select></div>
      <div className="grid grid-cols-4 gap-3">{ROLES.map(r=>{const c=Object.values(users).filter(u=>u.role===r).length;return <div key={r} className={"rounded-lg p-3 text-center border "+(RC[r]||"")}><div className="font-mono text-2xl font-semibold">{c}</div><div className="text-xs capitalize">{r}{c!==1?"s":""}</div></div>;})}</div>
      <div className="space-y-2">
        {fu.length===0&&<div className="text-center py-10 text-gray-400 text-sm">{t.noUsersMatch}</div>}
        {fu.map(u=>(
          <div key={u.username} className="bg-white border rounded-xl p-4 flex items-center gap-4 hover:shadow-sm">
            <Av user={u} size="md"/>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap"><span className="font-semibold text-gray-800 truncate">{u.name}</span><Bdg role={u.role}/>{u.username===me.username&&<span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">{t.youTag}</span>}</div>
              <p className="text-sm text-gray-500 truncate">@{u.username} · {u.email}</p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button onClick={()=>{setUt(u.username);setUv("detail");}} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"><User className="w-4 h-4"/></button>
              <button onClick={()=>{setUf({...u,password:""});setUt(u.username);setUv("edit");setUe("");}} className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg"><Edit2 className="w-4 h-4"/></button>
              {u.username!==me.username&&<button onClick={()=>setDc(u.username)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4"/></button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  ):null;

  return (
    <div className="min-h-screen bg-gray-50">
      {modal}
      {topbar}
      {nav}
      <div className="max-w-5xl mx-auto p-6">
        {mentorDash}
        {partDash}
        {currTab}
        {studyTab}
        {tab==="coach"&&(
          <Suspense fallback={<div className="ldp-card p-6 text-sm text-gray-500">{t.ai.loadingCoach}</div>}>
            <CoachPanel user={me} lang={lang} setLang={setLang} t={t}/>
          </Suspense>
        )}
        {resTab}
        {driveTab}
        {uDenied}
        {uDetail}
        {uForm}
        {uList}
      </div>
    </div>
  );
}
