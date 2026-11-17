import{c as S,a as h}from"./index-Cnv3QfPR.js";/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const q=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}]],R=S("Square",q);/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v=[["path",{d:"M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",key:"uqj9uw"}],["path",{d:"M16 9a5 5 0 0 1 0 6",key:"1q6k2b"}],["path",{d:"M19.364 18.364a9 9 0 0 0 0-12.728",key:"ijwkga"}]],V=S("Volume2",v),E=c=>(c.match(/[^.!?…]+[.!?…]+["”»)']*\s*|[^.!?…]+$/g)||[c]).map(t=>t.trim()).filter(Boolean);function _(c){const t=typeof window<"u"&&"speechSynthesis"in window,[d,o]=h.useState(-1),s=h.useRef(0),r=()=>{s.current++,t&&window.speechSynthesis.cancel(),o(-1)};h.useEffect(()=>()=>{s.current++,t&&window.speechSynthesis.cancel()},[t]);function g(m){r();const k=++s.current,p=c==="fr"?"fr-FR":"en-GB",w=window.speechSynthesis.getVoices(),l=w.find(e=>e.lang===p)||w.find(e=>e.lang.slice(0,2)===c),a=[];m.forEach((e,u)=>E(e).forEach(f=>a.push([u,f])));const i=()=>s.current===k;a.forEach(([e,u],f)=>{const n=new SpeechSynthesisUtterance(u);n.lang=p,l&&(n.voice=l),n.rate=.95,n.onstart=()=>{i()&&o(e)},f===a.length-1&&(n.onend=()=>{i()&&o(-1)}),n.onerror=y=>{i()&&y.error!=="interrupted"&&y.error!=="canceled"&&r()},window.speechSynthesis.speak(n)}),o(0)}return{supported:t,para:d,playing:d>=0,play:g,stop:r}}export{R as S,V,_ as u};
