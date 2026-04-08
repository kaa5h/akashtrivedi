"use client"
import { useState, useEffect, useRef, useMemo } from "react";
const CDS_COMP="/comparisons/cds/index.html";
const CPE_COMP="/comparisons/cpe/index.html";
const P = [
  { id:"cds",comp:CDS_COMP,n:"Connectware Design System",co:"Connectware Design System",tl2:"Scaling design language for industrial IoT",d:"I built and scaled a design system for an industrial IoT platform — defining tokens, components, and governance that unified product development across engineering and design.",ld:"The Connectware platform had no shared design language. I created a system from first principles — type scale, spacing, color tokens, and a component library with APIs that mirror how developers think about props.\n\nEvery component has a 'context of use' section — not just how it looks, but when to reach for it and what happens in production when it's misused. Adoption went from ~40% to near-complete within two quarters.",t:["Design Systems","Documentation"],tools:["Figma","Storybook","Notion"],y:"2024–25",r:"Design System Lead",c:"#1a1a1a" },
  { id:"cpe",comp:CPE_COMP,n:"Connectware Product Experience",co:"Connectware Product Experience",tl2:"Reshaping how industries manage IoT infrastructure",d:"I led the end-to-end product design for Connectware, shaping how industrial users monitor, configure, and manage IoT infrastructure at scale.",ld:"Connectware's interface had grown organically over three years. I led a holistic redesign starting with contextual interviews on factory floors and synthesis across 12 client organizations.\n\nThe new experience unified device status, data flow visualization, and configuration into a coherent product — with progressive disclosure that serves both plant engineers and IT administrators.",t:["Product Design","Research"],tools:["Figma","Dovetail","Miro"],y:"2024–25",r:"Lead Product Designer",c:"#1a1a1a" },
  { id:"sds",n:"Shyftplan Design System",co:"Shyftplan Design System",tl2:"Consistency across a fast-scaling workforce platform",d:"I established and evolved the design system for an AI-supported workforce management platform, ensuring consistency across a rapidly growing product surface.",ld:"Shyftplan's product was scaling fast — new features shipped weekly but visual and interaction patterns diverged. I introduced a structured design system with foundational tokens, reusable components, and clear documentation.\n\nI worked within and alongside engineering to ensure WCAG 2.1 AA compliance across the system. The system became the shared language between design and development.",t:["Design Systems","Accessibility"],tools:["Figma","Storybook"],y:"2023–24",r:"UI/UX Designer",c:"#333336" },
  { id:"qm",n:"Qualification Matrix",co:"Shyftplan Qualification Matrix",tl2:"Data-dense interface for workforce skill management",d:"I designed a complex data-driven interface for managing employee qualifications, skills, and scheduling constraints within Shyftplan's workforce platform.",ld:"Shift planning in regulated industries requires tracking employee qualifications, certifications, and expiry dates — a dense data problem. I designed a matrix interface that lets managers see skill coverage across teams at a glance.\n\nThe design balances information density with clarity — progressive disclosure reveals details on demand, and inline editing reduces context-switching. Validated through usability testing with operations managers.",t:["Product Design","Data Visualization"],tools:["Figma","Maze"],y:"2023",r:"UI/UX Designer",c:"#343434" },
];
const EXP = [
  {p:"07/2024 — Present",ti:"Product Designer",co:"Cybus",lo:"Bremen · Remote",d:"Lead product design for Connectware, an industrial IoT platform. Design systems, discovery, interaction design."},
  {p:"04/2023 — 06/2024",ti:"UI/UX Designer",co:"shyftplan GmbH",lo:"Berlin · Hybrid",d:"Full cycle product design for AI-supported shift planning. UX, prototyping, WCAG 2.1 AA compliance."},
  {p:"09/2021 — 04/2023",ti:"Web Designer & Developer",co:"collectAI",lo:"Hamburg",d:"UI design for fintech. Responsive communications, landing pages, agile design system development."},
  {p:"07/2019 — 09/2021",ti:"UI Designer",co:"BIBA",lo:"Bremen",d:"UX/UI for web and mobile apps. User-centric methods, usability testing, branding."},
  {p:"01/2016 — 08/2018",ti:"Experience Designer",co:"St+Art India Foundation",lo:"New Delhi",d:"Digital experiences for Street Art Festival. Field research, content documentation."},
];
const EDU = [
  {p:"2018 — 2024",ti:"M.Sc. Media Informatics",ins:"University of Bremen",lo:"Bremen",d:"Grade: 1.5"},
  {p:"2010 — 2014",ti:"B.Sc. Computer Science",ins:"Ganpat University",lo:"Gujarat, India",d:""},
];
const SK = [
  {c:"UX / Product",items:["User Research","Journey Mapping","Interaction Design","Prototyping","Usability Testing","KPI-Aware Decisions"]},
  {c:"Systems & Scale",items:["Design Systems","Component Libraries","Design Tokens","Info Architecture","Design Ops"]},
  {c:"AI-Augmented",items:["GenAI Ideation","Research Synthesis with AI","Human-AI Workflow","Responsible AI UX"]},
  {c:"Tools",items:["Figma","FigJam","Storybook","Framer","Notion","Jira","Dovetail","Claude, Cursor"]},
];
const BL = [
  {id:"b1",ti:"What I learned building a design system for industrial software",dt:"Mar 2025",tg:["Design Systems"],rt:"6 min",bd:"When I started rebuilding the design system at Cybus, I assumed the hard part would be the components. I was wrong.\n\nThe hard part was governance. The biggest lesson: a design system isn't a library. It's a set of shared decisions."},
  {id:"b2",ti:"Progressive disclosure in complex tools",dt:"Jan 2025",tg:["UX","Interaction"],rt:"5 min",bd:"The more capable a tool is, the harder it is to use — unless you actively hide most of its capability.\n\nAt Cybus, we redesigned machine onboarding using layered progressive disclosure. Commissioning dropped from 45 to under 10 minutes."},
  {id:"b3",ti:"Bridging the IT/OT gap through design",dt:"Nov 2024",tg:["Research","IoT"],rt:"8 min",bd:"IT and OT speak different languages. Our product sits exactly in the gap.\n\nI ran 12 interviews and designed a shared visual language. Both sides said: 'I finally understand what they're talking about.'"},
  {id:"b4",ti:"Figma variables for our design token pipeline",dt:"Sep 2024",tg:["Design Systems"],rt:"4 min",bd:"Three sources of truth became one. Figma variables → JSON → CSS custom properties.\n\nAdjusting our neutral scale went from design decision to deployed code in 45 minutes."},
  {id:"b5",ti:"Designing in Germany as an Indian expat",dt:"Jun 2024",tg:["Personal"],rt:"7 min",bd:"German design culture values thoroughness over speed. The first time I showed a rough concept, the feedback was: 'This isn't ready to discuss.'\n\nThe best work happens when you can hold both approaches."},
];
function ScaledIframe({src,title}){
  const ref=useRef(null);
  const [s,setS]=useState(0.35);
  const [off,setOff]=useState({x:0,y:0});
  useEffect(()=>{
    const measure=()=>{if(!ref.current)return;const w=ref.current.clientWidth;const h=ref.current.clientHeight;const sc=Math.min(w/1440,h/900);setS(sc);setOff({x:(w-1440*sc)/2,y:(h-900*sc)/2})};
    measure();window.addEventListener("resize",measure);return()=>window.removeEventListener("resize",measure);
  },[]);
  return <div ref={ref} style={{position:"absolute",inset:0,overflow:"hidden"}}><iframe src={src} title={title} style={{width:1440,height:900,border:"none",pointerEvents:"none",transformOrigin:"top left",transform:`translate(${off.x}px,${off.y}px) scale(${s})`,display:"block"}}/></div>;
}
function V({top,left,right,bottom}){return <div style={{position:"absolute",width:5,height:5,background:"var(--bg)",border:"0.5px solid var(--vertex)",...(top!=null?{top:top-2.5}:{}),...(bottom!=null?{bottom:bottom-2.5}:{}),...(left!=null?{left:left-2.5}:{}),...(right!=null?{right:right-2.5}:{}),zIndex:10,pointerEvents:"none"}}/>}
export default function Page(){
  const [m,setM]=useState(false),[lang,setLang]=useState("EN"),[pg,setPg]=useState("home"),[proj,setProj]=useState(null),[bp,setBp]=useState(null),[fd,setFd]=useState(false),[sv,setSv]=useState(100),[ne,setNe]=useState(false),[htab,setHtab]=useState(0),[nh,setNh]=useState(false);
  const hex2rgb=(h)=>{const v=parseInt(h.slice(1),16);return[(v>>16)&255,(v>>8)&255,v&255]};
  const rgb2hex=(r,g,b)=>"#"+[r,g,b].map(v=>Math.round(v).toString(16).padStart(2,"0")).join("");
  const lerp=(a,b,t)=>a+(b-a)*t;
  const lerpHex=(a,b,t)=>{const [ar,ag,ab]=hex2rgb(a),[br,bg,bb]=hex2rgb(b);return rgb2hex(lerp(ar,br,t),lerp(ag,bg,t),lerp(ab,bb,t))};
  const ANCH=[
    {p:0,bg:"#FFFFFF",fg:"#111111",f2:"#444444",f3:"#777777",f4:"#AAAAAA",tl:"#2A8A8A",cd:"#F0F0F0",hg:"#F5F5F5"},
    {p:14.28,bg:"#E5DBCE",fg:"#3A2A1E",f2:"#5A4A3E",f3:"#8A7A6E",f4:"#B0A498",tl:"#4A7A4A",cd:"#DDD2C4",hg:"#DFD5C8"},
    {p:28.57,bg:"#E0EAEF",fg:"#1A2535",f2:"#3A4A5A",f3:"#6A7A8A",f4:"#98A8B4",tl:"#2A6A90",cd:"#D4DEE5",hg:"#D8E2E8"},
    {p:42.85,bg:"#FEE8D6",fg:"#C03E10",f2:"#884020",f3:"#A07058",f4:"#C0A090",tl:"#C03E10",cd:"#F4D8C0",hg:"#F8DCC6"},
    {p:57.14,bg:"#C03E10",fg:"#FEE8D6",f2:"#FCCAB0",f3:"#E8A080",f4:"#B06840",tl:"#FEE8D6",cd:"#A83510",hg:"#B43A12"},
    {p:71.42,bg:"#2E1E30",fg:"#F0A0BE",f2:"#D080A0",f3:"#A06080",f4:"#704860",tl:"#F0A0BE",cd:"#3E2A40",hg:"#362438"},
    {p:85.71,bg:"#141E28",fg:"#90B8E0",f2:"#6A90B8",f3:"#486880",f4:"#304858",tl:"#90B8E0",cd:"#1C2834",hg:"#18222E"},
    {p:100,bg:"#0A0A0A",fg:"#F0F0F0",f2:"#B0B0B0",f3:"#787878",f4:"#484848",tl:"#A8DADC",cd:"#181818",hg:"#111111"},
  ];
  const interpPal=(v)=>{let lo=ANCH[0],hi=ANCH[ANCH.length-1];for(let i=0;i<ANCH.length-1;i++){if(v>=ANCH[i].p&&v<=ANCH[i+1].p){lo=ANCH[i];hi=ANCH[i+1];break}}const t=hi.p===lo.p?0:(v-lo.p)/(hi.p-lo.p);const l=(k)=>lerpHex(lo[k],hi[k],t);const bg=l("bg"),fg=l("fg");const lum=(parseInt(bg.slice(1,3),16)*299+parseInt(bg.slice(3,5),16)*587+parseInt(bg.slice(5,7),16)*114)/1000;return{bg,fg,f2:l("f2"),f3:l("f3"),f4:l("f4"),tl:l("tl"),cd:l("cd"),hg:l("hg"),isLight:lum>140,bd:lum>140?"rgba(0,0,0,0.08)":"rgba(255,255,255,0.08)",nb:lum>140?"rgba(0,0,0,0.06)":"rgba(255,255,255,0.12)",hb:lum>140?"rgba(0,0,0,0.04)":"rgba(255,255,255,0.05)",la:lum>140?"rgba(0,0,0,0.06)":"rgba(255,255,255,0.08)",ht:lum>140?"rgba(0,0,0,0.1)":"rgba(255,255,255,0.1)",vt:lum>140?"rgba(0,0,0,0.15)":"rgba(255,255,255,0.2)",tb:lum>140?"rgba(0,0,0,0.08)":"rgba(255,255,255,0.1)",thb:lum>140?"rgba(0,0,0,0.12)":"rgba(255,255,255,0.15)"}};
  const cp=interpPal(sv);const isLight=cp.isLight;
  const TABS=[
    {l:"For anyone",t:"Akash Trivedi is a Product Designer at Cybus, focused on B2B SaaS, IoT platforms, and AI-driven UX. I create digital products that simplify complexity, improve usability, and bring clarity to enterprise experiences."},
    {l:"Product & Systems",t:"I design systems and interfaces that make complex products feel structured, intuitive, and refined. My work brings together product thinking, research, and interface design to create clarity at scale."},
    {l:"Open to Collaborate",t:"I'm open to volunteering my design skills for products in the health and mental health space. If you're building something that supports wellbeing and could use a product designer, I'd love to contribute."},
    {l:"Culture",t:"Much of my creative inspiration comes from the visual language of everyday life — streets, signs, letterforms, walls, and movement. I'm particularly drawn to street photography, typography, and graffiti culture."},
    {l:"Motion",t:"When I'm away from the screen, I'm usually riding through unfamiliar places, going for a run, or trying to stay honest with a daily sun salutation practice."},
  ];
  const switchTab=(i)=>{setHtab(i)};
  const tr=useRef(null),tbr=useRef(null),[ind,setInd]=useState({x:0,w:0});
  const ui=(el)=>{if(!el||!tbr.current)return;const p=tbr.current.getBoundingClientRect(),r=el.getBoundingClientRect();setInd({x:r.left-p.left,w:r.width})};
  const on=()=>{setNe(true);clearTimeout(tr.current)};
  const off=()=>{clearTimeout(tr.current);tr.current=setTimeout(()=>setNe(false),100)};
  const sa=(fn)=>{fn()};
  useEffect(()=>()=>clearTimeout(tr.current),[]);
  useEffect(()=>{if(!tbr.current||!m)return;requestAnimationFrame(()=>{const a=tbr.current?.querySelector('.fl.a');if(a)ui(a)});},[pg,m]);
  useEffect(()=>{setM(true)},[]);
  const nav=(t,p=null,b=null)=>{setFd(true);setTimeout(()=>{setPg(t);setProj(p);setBp(b);window.scrollTo(0,0);setTimeout(()=>setFd(false),50)},280)};
  const sp=()=>{if(pg!=="home"){nav("home");return}document.getElementById("projects")?.scrollIntoView({behavior:"smooth"})};
  const np=()=>{if(!proj)return;const i=P.findIndex(p=>p.id===proj.id);nav("project",P[(i+1)%P.length])};
  const GF={A:[2,5,7,5,5],B:[6,5,6,5,6],C:[3,4,4,4,3],D:[6,5,5,5,6],E:[7,4,7,4,7],G:[3,4,5,5,3],H:[5,5,7,5,5],I:[7,2,2,2,7],J:[1,1,1,5,2],K:[5,6,4,6,5],L:[4,4,4,4,7],M:[5,7,7,5,5],N:[5,7,5,5,5],P:[6,5,6,4,4],R:[6,5,6,5,5],S:[3,4,2,1,6],T:[7,2,2,2,2],U:[5,5,5,5,7],V:[5,5,5,2,2],Y:[5,5,2,2,2]};
  const PHRASES=[
    [["AKASH"],["TRIVEDI"]],
    [["BRD"]],
    [["GARAM"],["CHAA"]],
    [["GHAR NI"],["YAAD"]],
    [["SURAJ"]],
    [["MATCHING"],["SHAAK"]],
    [["UNDHIYU"]],
    [["SEV"],["USAL"]],
    [["RAKHHAD"],["PATTI"]],
    [["TRAPAT"]],
    [["JEEVAN NI"],["MAALIPA"]],
  ];
  const [phi,setPhi]=useState(0);
  useEffect(()=>{const iv=setInterval(()=>{setPhi(p=>{let n;do{n=Math.floor(Math.random()*PHRASES.length)}while(n===p);return n})},5000);return()=>clearInterval(iv)},[]);
  const GAP=4;
  const gridRef=useRef(null);
  const [dims,setDims]=useState({c:40,r:20});
  useEffect(()=>{
    const measure=()=>{if(!gridRef.current)return;const el=gridRef.current;const pad=parseFloat(getComputedStyle(el).paddingLeft)||12;const w=el.clientWidth-pad*2,h=el.clientHeight-pad*2;const cols=Math.min(45,Math.max(20,Math.floor((w+GAP)/(18+GAP))));const cellW=(w-(cols-1)*GAP)/cols;const cellH=cellW/1.7;const rows=Math.floor((h+GAP)/(cellH+GAP));setDims({c:cols,r:Math.max(8,rows)})};
    measure();window.addEventListener("resize",measure);return()=>window.removeEventListener("resize",measure);
  },[]);
  const {c:GC,r:GR}=dims;
  const renderWord=(g,word,sx,sy)=>{let cx=sx;for(const ch of word){if(ch===" "){cx+=2;continue}const l=GF[ch];if(l)for(let r=0;r<5;r++)for(let c=0;c<3;c++)if((l[r]>>(2-c))&1&&sy+r<GR&&cx+c<GC)g[sy+r][cx+c]=true;cx+=4}};
  const nameMap=useMemo(()=>{const g=Array.from({length:GR},()=>Array(GC).fill(false));const ph=PHRASES[phi];const lines=ph.length;const ny1=Math.max(1,Math.floor(GR*(lines===1?0.35:0.2)));const ny2=lines>1?Math.max(ny1+7,Math.floor(GR*0.5)):0;renderWord(g,ph[0][0],2,ny1);if(lines>1)renderWord(g,ph[1][0],2,ny2);return g},[GR,GC,phi]);
  const grid=useMemo(()=>nameMap.map(r=>r.map(c=>c?1:0)),[nameMap]);
  const [tg,setTg]=useState(null);
  useEffect(()=>{setTg(grid.map(r=>[...r]))},[grid]);
  const flip=(r,c)=>{if(!tg||r>=GR||c>=GC||nameMap[r][c])return;setTg(prev=>{if(!prev)return prev;const n=prev.map(rw=>[...rw]);n[r][c]=1;return n});setTimeout(()=>{setTg(prev=>{if(!prev)return prev;const u=prev.map(rw=>[...rw]);if(u[r])u[r][c]=0;return u})},5000)};
  useEffect(()=>{if(!tg)return;const spawn=()=>{let r,c,tries=0;do{r=Math.floor(Math.random()*GR);c=Math.floor(Math.random()*GC);tries++}while((nameMap[r]?.[c]||tg[r]?.[c])&&tries<20);if(tries>=20)return;setTg(prev=>{if(!prev)return prev;const n=prev.map(rw=>[...rw]);if(n[r])n[r][c]=1;return n});const dur=2000+Math.random()*3000;setTimeout(()=>{setTg(prev=>{if(!prev)return prev;const n=prev.map(rw=>[...rw]);if(n[r])n[r][c]=0;return n})},dur)};const iv=setInterval(spawn,700);return()=>clearInterval(iv)},[tg!==null,nameMap,GR,GC]);
  return(
    <div className={`r${isLight?" light":""}`} style={{"--bg":cp.bg,"--fg":cp.fg,"--f2":cp.f2,"--f3":cp.f3,"--f4":cp.f4,"--tl":cp.tl,"--cd":cp.cd,"--bd":cp.bd,"--hg":cp.hg,"--nb":cp.nb,"--hb":cp.hb,"--la":cp.la,"--ht":cp.ht,"--vertex":cp.vt,"--tb":cp.tb,"--thb":cp.thb}}>
      <style>{`

.r{min-height:100vh;background:var(--bg);color:var(--fg);font-family:'Geist',sans-serif;overflow-x:hidden}
*{margin:0;padding:0;box-sizing:border-box}
::selection{background:rgba(168,218,220,0.2);color:var(--fg)}
@keyframes fi{from{opacity:0}to{opacity:1}}@keyframes su{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
.pt{transition:opacity .28s,transform .28s;opacity:1;transform:translateY(0)}.pt.out{opacity:0;transform:translateY(8px)}
.fn{position:fixed;bottom:32px;left:50%;transform:translateX(-50%);z-index:400;display:flex;flex-direction:column;backdrop-filter:blur(48px) saturate(1.8) brightness(1.1);-webkit-backdrop-filter:blur(48px) saturate(1.8) brightness(1.1);border:.5px solid var(--nb);border-radius:16px;padding:6px;box-shadow:0 0 0 .5px rgba(128,128,128,0.08),0 2px 8px rgba(0,0,0,0.12),0 12px 40px rgba(0,0,0,0.15);transition:all .5s;min-width:260px}
.r:not(.light) .fn{background:linear-gradient(180deg,rgba(255,255,255,0.08)0%,rgba(255,255,255,0.03)100%)}.r.light .fn{background:rgba(255,255,255,0.5)}
.fp{display:grid;grid-template-rows:0fr;transition:grid-template-rows .45s cubic-bezier(.4,0,.2,1)}.fp.o{grid-template-rows:1fr}.fpi{overflow:hidden;min-height:0}.fpc{padding:8px 8px 10px;display:flex;align-items:center;justify-content:space-between;gap:12px;opacity:0;transform:translateY(6px);transition:opacity .25s,transform .3s cubic-bezier(.4,0,.2,1)}.fp.o .fpc{opacity:1;transform:translateY(0);transition:opacity .3s .15s,transform .35s cubic-bezier(.4,0,.2,1) .12s}
.fpd{height:.5px;background:var(--bd);margin:0 4px;opacity:0;transition:opacity .2s}.fp.o .fpd{opacity:1;transition:opacity .2s .1s}
.cg{display:flex;gap:0;background:var(--hb);border-radius:6px;padding:2px;flex-shrink:0}.cb{font-size:11px;font-weight:500;color:var(--f2);background:none;border:none;cursor:pointer;padding:4px 10px;border-radius:5px;transition:color .15s,background .15s;white-space:nowrap}.cb:hover{color:var(--fg)}.cb.a{color:var(--fg);background:var(--la)}
.tg{display:flex;align-items:center;flex-shrink:0}
.pal-track{position:relative;width:clamp(120px,20vw,200px);height:24px;display:flex;align-items:center;background:var(--hb);border-radius:12px;padding:0 12px;border:.5px solid var(--bd)}
.pal-dots{position:absolute;left:12px;right:12px;top:50%;transform:translateY(-50%);display:flex;align-items:center;justify-content:space-between;pointer-events:none;z-index:1}
.pal-anchor{width:5px;height:5px;border-radius:50%;background:var(--f3);transition:background .3s,transform .3s}
.pal-anchor.act{background:var(--fg);transform:scale(1.4)}
.pal-slider{-webkit-appearance:none;appearance:none;width:100%;height:100%;background:transparent;outline:none;position:relative;z-index:2;cursor:pointer;margin:0}
.pal-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:14px;height:14px;border-radius:50%;background:var(--fg);cursor:pointer;box-shadow:0 0 0 3px var(--bg),0 0 0 3.5px var(--bd);transition:transform .2s cubic-bezier(.16,1,.3,1)}
.pal-slider::-webkit-slider-thumb:hover{transform:scale(1.3)}
.pal-slider::-moz-range-thumb{width:14px;height:14px;border-radius:50%;background:var(--fg);border:none;cursor:pointer;box-shadow:0 0 0 3px var(--bg),0 0 0 3.5px var(--bd)}
.ft{display:flex;align-items:center;position:relative;width:100%}.fb{position:absolute;top:0;left:0;height:100%;background:var(--hb);border-radius:8px;transition:transform .4s cubic-bezier(.4,0,.2,1),width .4s cubic-bezier(.4,0,.2,1);pointer-events:none;z-index:0}
.fl{position:relative;z-index:1;font-size:12px;color:var(--f2);text-decoration:none;cursor:pointer;padding:6px 14px;border-radius:8px;transition:color .25s;flex:1;text-align:center}.fl:hover{color:var(--fg)}.fl.a{color:var(--fg)}
.fs{width:.5px;height:16px;background:var(--bd);margin:0 2px;position:relative;z-index:1;flex-shrink:0}
.tb{position:relative;z-index:1;width:28px;height:28px;border:none;border-radius:50%;background:none;cursor:pointer;display:flex;align-items:center;justify-content:center;color:var(--f3);font-size:16px;font-weight:300;transition:color .25s,transform .35s cubic-bezier(.16,1,.3,1);flex-shrink:0}.tb:hover{color:var(--fg)}.tb.o{transform:rotate(45deg)}
.pd{padding-left:clamp(16px,3.2vw,32px);padding-right:clamp(16px,3.2vw,32px)}
.hr{height:100vh;display:flex;flex-direction:column;background:var(--hg);transition:background .35s;position:relative;overflow:hidden;padding:0}
.tgr{flex:1;display:grid;gap:4px;min-height:0;overflow:hidden;padding:clamp(8px,1.5vw,16px)}
.hr-bot{flex-shrink:0;height:280px;padding:16px clamp(16px,3.2vw,32px) 80px;display:flex;flex-direction:column;justify-content:flex-start;position:relative}
.tgc{width:100%;height:100%;border-radius:9999px;position:relative;cursor:pointer;transition:background .45s cubic-bezier(.4,0,.2,1),transform .15s ease,box-shadow .3s ease,border-color .3s;border:1px solid rgba(128,128,128,0.2)}
.tgc.off{background:rgba(255,255,255,0.06)}
.tgc.on{background:#3B82F6;border-color:rgba(59,130,246,0.5)}
.r.light .tgc.off{background:rgba(0,0,0,0.08);border-color:rgba(0,0,0,0.12)}
.r.light .tgc.on{background:#3B82F6;border-color:rgba(59,130,246,0.5)}
.tgc::after{content:'';position:absolute;top:2px;bottom:2px;left:2px;width:calc(50% - 3px);border-radius:9999px;background:white;transition:left .4s cubic-bezier(.34,1.56,.64,1);box-shadow:0 1px 3px rgba(0,0,0,0.15)}
.tgc.off::after{left:2px}
.tgc.on::after{left:calc(50% + 1px)}
.r:not(.light) .tgc.off::after{background:rgba(255,255,255,0.3)}
.tgc:hover{transform:scale(1.15)}
.tgc.on:hover{box-shadow:0 0 8px rgba(59,130,246,0.4)}
.tgc.nm{cursor:default}
@keyframes namePulse{0%,100%{opacity:1}50%{opacity:0.7}}
.tgc.nm{animation:namePulse 3s ease-in-out infinite}
.hr-bot{flex-shrink:0;padding-top:clamp(12px,2vw,24px)}
.htabs{display:flex;flex-wrap:wrap;gap:clamp(12px,2vw,24px);margin-bottom:clamp(12px,1.5vw,20px)}
.htab{font-size:clamp(12px,1.2vw,14px);font-weight:400;color:var(--f3);cursor:pointer;background:none;border:none;font-family:inherit;padding:0;position:relative;transition:color .3s}.htab:hover{color:var(--fg)}
.htab.a{color:var(--fg);font-weight:500}
.htxt{max-width:50%;display:grid}
.htxt-item{grid-area:1/1;transition:opacity .3s,transform .3s cubic-bezier(.4,0,.2,1)}
.htxt-item.hide{opacity:0;transform:translateY(4px);pointer-events:none}
.htxt-item.show{opacity:1;transform:translateY(0)}
.htxt-item p{font-size:clamp(18px,2.5vw,24px);font-weight:400;color:var(--fg);line-height:1.45;letter-spacing:-.015em;margin:0}
.hn{font-weight:500;position:relative;display:inline;border-bottom:1.5px solid var(--f3);padding-bottom:1px;transition:border-color .3s;cursor:default}.hn:hover{border-color:var(--fg)}
.hn-link{color:var(--fg);text-decoration:none;border-bottom:1.5px solid var(--f3);padding-bottom:1px;transition:border-color .3s,color .3s}.hn-link:hover{border-color:var(--tl);color:var(--tl)}
.hni{position:absolute;right:clamp(32px,5vw,64px);bottom:80px;width:140px;height:140px;opacity:0;transition:opacity .2s ease;pointer-events:none;z-index:2}.hni.s{opacity:1}
.hni img{width:100%;height:100%;object-fit:contain;display:block;background:none;box-shadow:none}




.wh{display:flex;align-items:baseline;justify-content:space-between;padding:14px 0}.wl{font-size:11px;letter-spacing:.06em;text-transform:uppercase;color:var(--f3);font-weight:500}
.pg{display:grid;grid-template-columns:1fr 1fr;gap:clamp(32px,4vw,56px) clamp(16px,2vw,28px);padding-top:8px;padding-bottom:clamp(40px,6vw,72px)}.pe{cursor:pointer}.pc{width:100%;aspect-ratio:4/3;border-radius:10px;display:flex;align-items:center;justify-content:center;border:.5px solid var(--bd);transition:border-color .3s;overflow:hidden;position:relative}.pcv{width:100%;height:100%;object-fit:cover;display:block}.pe:hover .pc{border-color:var(--ht)}.pcl{font-size:18px;font-weight:500;color:var(--f4);text-align:center;transition:color .3s}.pe:hover .pcl{color:var(--f2)}.pco{font-size:12px;font-weight:500;color:var(--fg);margin-top:14px;letter-spacing:0.01em}.ptl{font-size:13px;color:var(--f3);line-height:1.5;margin-top:3px}.pds{font-size:13px;color:var(--f2);line-height:1.6;margin-top:14px;max-width:440px}.pts{display:flex;flex-wrap:wrap;gap:6px;margin-top:10px}.ptg{font-size:11px;font-weight:500;color:var(--f3);border:.5px solid var(--tb);border-radius:100px;padding:4px 12px;text-transform:uppercase;transition:color .2s,border-color .2s}.pe:hover .ptg{border-color:var(--thb);color:var(--f2)}
.r.light .pc{background:var(--cd)!important}.r.light .phi{background:var(--cd)!important}.r.light .pic{background:var(--cd)!important}
.pp{padding-top:clamp(16px,3.2vw,32px);padding-bottom:80px;min-height:100vh}.pb{display:inline-flex;align-items:center;gap:8px;cursor:pointer;font-size:13px;color:var(--f3);margin-bottom:clamp(32px,5vw,56px);transition:color .2s;border:none;background:none;font-family:inherit;padding:0}.pb:hover{color:var(--fg)}.pba{transition:transform .25s cubic-bezier(.16,1,.3,1);display:inline-block}.pb:hover .pba{transform:translateX(-3px)}
.ppt{font-size:clamp(32px,5vw,56px);font-weight:500;color:var(--fg);letter-spacing:-.03em;line-height:1.15;margin-bottom:24px}
.pmr{display:flex;flex-wrap:wrap;gap:24px;margin-bottom:clamp(32px,4vw,48px);padding-bottom:24px;border-bottom:.5px solid var(--bd);position:relative}.pml{font-size:10px;text-transform:uppercase;letter-spacing:.06em;color:var(--f4);margin-bottom:4px;font-weight:500}.pmv{font-size:13px;color:var(--f2)}
.phi{width:100%;aspect-ratio:16/9;border-radius:8px;margin-bottom:clamp(32px,4vw,48px);display:flex;align-items:center;justify-content:center;border:.5px solid var(--bd)}.phpl{font-size:14px;color:var(--f4);opacity:.5}
.pby{max-width:680px;margin-bottom:clamp(40px,5vw,64px)}.pbt{font-size:15px;color:var(--f2);line-height:1.75;white-space:pre-line}
.pig{display:grid;grid-template-columns:1fr 1fr;gap:clamp(8px,1vw,14px);margin-bottom:clamp(40px,5vw,64px)}.pic{aspect-ratio:4/3;border-radius:6px;display:flex;align-items:center;justify-content:center;border:.5px solid var(--bd)}.picl{font-size:12px;color:var(--f4);opacity:.4}
.np{border-top:.5px solid var(--bd);padding-top:32px;cursor:pointer;position:relative}.npl{font-size:10px;text-transform:uppercase;letter-spacing:.06em;color:var(--f4);margin-bottom:8px;font-weight:500}.npn{font-size:clamp(20px,3vw,32px);font-weight:500;color:var(--f3);letter-spacing:-.02em;transition:color .3s;display:inline-flex;align-items:center;gap:12px}.np:hover .npn{color:var(--fg)}.npa{transition:transform .3s cubic-bezier(.16,1,.3,1);display:inline-block;font-size:.7em}.np:hover .npa{transform:translateX(6px)}
.cvp{padding-top:clamp(16px,3.2vw,32px);padding-bottom:80px;min-height:100vh}.cvh{display:grid;grid-template-columns:1fr auto;gap:32px;align-items:start;margin-bottom:clamp(36px,5vw,56px)}.cvt{font-size:clamp(32px,5vw,48px);font-weight:500;color:var(--fg);letter-spacing:-.03em;margin-bottom:4px}.cvst{font-size:15px;color:var(--f2)}
.cvph{width:120px;height:120px;border-radius:8px;background:var(--cd);border:.5px solid var(--bd);display:flex;align-items:center;justify-content:center;flex-shrink:0}.cvphl{font-size:10px;color:var(--f4);text-transform:uppercase}
.cvpr{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:clamp(36px,5vw,56px);padding:20px 0;border-top:.5px solid var(--bd);border-bottom:.5px solid var(--bd);position:relative}.cvpl{font-size:10px;text-transform:uppercase;letter-spacing:.06em;color:var(--f4);margin-bottom:4px;font-weight:500}.cvpv{font-size:13px;color:var(--f2)}.cvpk{font-size:13px;color:var(--tl);text-decoration:none;cursor:pointer}
.cvs{margin-bottom:clamp(40px,5vw,60px)}.cvsl{font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:var(--tl);font-weight:500;margin-bottom:24px}.cve{display:grid;grid-template-columns:160px 1fr;gap:24px;padding:20px 0;border-top:.5px solid var(--bd);position:relative}.cve:last-child{border-bottom:.5px solid var(--bd)}.cvep{font-size:12px;color:var(--f3);padding-top:3px;font-variant-numeric:tabular-nums}.cver{font-size:15px;font-weight:500;color:var(--fg);margin-bottom:3px}.cvec{font-size:13px;color:var(--f2);margin-bottom:2px}.cved{font-size:13px;color:var(--f2);line-height:1.65}
.cvsk{margin-bottom:clamp(40px,5vw,60px)}.cvsg{display:grid;grid-template-columns:1fr 1fr;gap:24px}.cvskc{font-size:12px;font-weight:500;color:var(--fg);margin-bottom:10px}.cvski{font-size:13px;color:var(--f2);line-height:1.9}
.cva{display:flex;gap:12px;flex-wrap:wrap}.cvdl{display:inline-flex;align-items:center;gap:8px;font-size:13px;color:var(--tl);cursor:pointer;transition:background .2s;border:.5px solid var(--ht);border-radius:8px;padding:10px 18px;text-decoration:none;font-weight:500}.cvdl:hover{background:var(--hb)}.cvcb{display:inline-flex;align-items:center;gap:8px;font-size:13px;color:var(--f2);cursor:pointer;transition:background .2s;border:.5px solid var(--bd);border-radius:8px;padding:10px 18px;text-decoration:none}.cvcb:hover{background:var(--hb)}
.blp{padding-top:clamp(16px,3.2vw,32px);padding-bottom:80px;min-height:100vh}.blt{font-size:clamp(32px,5vw,48px);font-weight:500;color:var(--fg);letter-spacing:-.03em;margin-bottom:12px}.bls{font-size:15px;color:var(--f2);line-height:1.6;max-width:560px;margin-bottom:clamp(36px,5vw,56px)}
.bll{display:flex;flex-direction:column}.ble{display:flex;align-items:baseline;justify-content:space-between;padding:18px 0;border-bottom:.5px solid var(--bd);cursor:pointer;transition:background .2s;margin:0 -8px;padding-left:8px;padding-right:8px;border-radius:6px;gap:16px}.ble:first-child{border-top:.5px solid var(--bd)}.ble:hover{background:var(--hb)}
.blel{flex:1;min-width:0}.blet{font-size:16px;font-weight:500;color:var(--fg);line-height:1.4;margin-bottom:6px;transition:color .2s}.ble:hover .blet{color:var(--tl)}.bleg{display:flex;gap:6px;flex-wrap:wrap}.blegt{font-size:10px;font-weight:500;color:var(--f3);border:.5px solid var(--tb);border-radius:100px;padding:2px 10px;text-transform:uppercase}
.bler{display:flex;flex-direction:column;align-items:flex-end;gap:2px;flex-shrink:0}.bled{font-size:12px;color:var(--f3)}.blerm{font-size:11px;color:var(--f4)}
.bpp{padding-top:clamp(16px,3.2vw,32px);padding-bottom:80px;min-height:100vh}.bph{margin-bottom:clamp(28px,4vw,40px)}.bptr{display:flex;gap:8px;margin-bottom:16px}.bptg{font-size:10px;font-weight:500;color:var(--tl);border:.5px solid var(--ht);border-radius:100px;padding:3px 12px;text-transform:uppercase}.bpti{font-size:clamp(26px,4vw,42px);font-weight:500;color:var(--fg);letter-spacing:-.025em;line-height:1.2;margin-bottom:16px;max-width:720px}.bpm{display:flex;align-items:center;gap:8px;font-size:13px;color:var(--f3)}.bpmd{opacity:.4}
.bpdv{position:relative;height:.5px;background:var(--bd);margin-bottom:clamp(28px,4vw,40px)}.bpbd{max-width:640px;margin-bottom:clamp(48px,6vw,72px)}.bppr{font-size:15px;color:var(--f2);line-height:1.8;margin-bottom:24px}.bppr:last-child{margin-bottom:0}
.bpn{border-top:.5px solid var(--bd);padding-top:32px;cursor:pointer;position:relative}.bpnl{font-size:10px;text-transform:uppercase;letter-spacing:.06em;color:var(--f4);margin-bottom:8px;font-weight:500}.bpnt{font-size:clamp(17px,2.5vw,24px);font-weight:500;color:var(--f3);line-height:1.35;transition:color .3s;display:inline-flex;align-items:center;gap:10px;max-width:560px}.bpn:hover .bpnt{color:var(--fg)}.bpna{transition:transform .3s cubic-bezier(.16,1,.3,1);display:inline-block;font-size:.8em;flex-shrink:0}.bpn:hover .bpna{transform:translateX(5px)}
.ft2{display:flex;align-items:center;justify-content:space-between;padding-top:16px;padding-bottom:16px;border-top:.5px solid var(--bd)}.ftx{font-size:11px;color:var(--f4)}.ftl{font-size:12px;color:var(--f3);text-decoration:none;cursor:pointer;transition:color .2s}.ftl:hover{color:var(--tl)}
@media(max-width:1024px){.htxt{max-width:70%}.tgr{display:none}.hr{height:auto;min-height:auto;overflow:visible;padding:clamp(16px,3.2vw,32px)}.hr-bot{padding:0;min-height:auto;height:auto;position:static}.hni{display:none}.hn{border-bottom:none;padding-bottom:0}}
@media(max-width:768px){.htxt{max-width:85%}.pg{grid-template-columns:1fr 1fr}.cve{grid-template-columns:120px 1fr;gap:16px}.cvpr{grid-template-columns:repeat(2,1fr)}.tgr{gap:3px}}
@media(max-width:540px){.htxt{max-width:100%}.pg{grid-template-columns:1fr}.cve{grid-template-columns:1fr;gap:8px}.cvpr{grid-template-columns:1fr 1fr}.pig{grid-template-columns:1fr}.cvsg{grid-template-columns:1fr}.tgr{gap:2px}}
      `}</style>
      <nav className="fn" style={{animation:m?"fi .5s .4s both":"none"}} onMouseLeave={off}>
        <div className={`fp${ne?" o":""}`}><div className="fpi"><div className="fpc">
          <div className="cg"><button className={`cb${lang==="EN"?" a":""}`} onClick={()=>sa(()=>setLang("EN"))}>EN</button><button className={`cb${lang==="DE"?" a":""}`} onClick={()=>sa(()=>setLang("DE"))}>DE</button></div>
          <div className="tg"><div className="pal-track">
            <div className="pal-dots">{ANCH.map((a,i)=>{const nearest=ANCH.reduce((best,an,j)=>Math.abs(an.p-sv)<Math.abs(ANCH[best].p-sv)?j:best,0);return <div key={i} className={`pal-anchor${i===nearest?" act":""}`}/>})}</div>
            <input type="range" className="pal-slider" min="0" max="100" step="0.1" value={sv} onChange={e=>setSv(+e.target.value)} />
          </div></div>
        </div></div><div className="fpd"/></div>
        <div className="ft" ref={tbr}><div className="fb" style={{transform:`translateX(${ind.x}px)`,width:ind.w}}/>
          <a className={`fl${pg==="home"?" a":""}`} onClick={sp}>Projects</a>
          <a className={`fl${pg==="cv"?" a":""}`} onClick={()=>nav("cv")}>CV</a>
          <a className={`fl${pg==="blog"||pg==="blogPost"?" a":""}`} onClick={()=>nav("blog")}>Blog</a>
          <div className="fs"/><button className={`tb${ne?" o":""}`} onMouseEnter={on}>+</button>
        </div>
      </nav>
      <div className={`pt${fd?" out":""}`}>
        {pg==="home"&&<>
          <section className="hr">
            <div className="tgr" ref={gridRef} style={{gridTemplateColumns:`repeat(${GC},1fr)`,gridTemplateRows:`repeat(${GR},1fr)`}}>
              {tg&&tg.slice(0,GR).map((row,ri)=>row.slice(0,GC).map((cell,ci)=><div key={`${ri}-${ci}`} className={`tgc ${cell?"on":"off"}${nameMap[ri]?.[ci]?" nm":""}`} style={nameMap[ri]?.[ci]?{animationDelay:`${((ri*GC+ci)%7)*0.4}s`}:undefined} onClick={()=>flip(ri,ci)}/>))}
            </div>
            <div className="hr-bot">
              <div className="htabs">
                {TABS.map((t,i)=><button key={i} className={`htab${htab===i?" a":""}`} onClick={()=>switchTab(i)}>{t.l}</button>)}
              </div>
              <div className="htxt">
                {TABS.map((t,i)=><div key={i} className={`htxt-item${htab===i?" show":" hide"}`}>
                  <p>{i===0?<><span className="hn" onMouseEnter={()=>setNh(true)} onMouseLeave={()=>setNh(false)}>Akash Trivedi</span> is a Product Designer at <a href="https://cybus.io" target="_blank" rel="noopener noreferrer" className="hn-link">Cybus</a>, focused on B2B SaaS, IoT platforms, and AI-driven UX. I create digital products that simplify complexity, improve usability, and bring clarity to enterprise experiences.</>:t.t}</p>
                </div>)}
              </div>
              <div className={`hni${nh?" s":""}`}><img src="/videos/hover-face.gif" alt="Akash Trivedi" width={140} height={140}/></div>
            </div>
          </section>
          <section id="projects" className="pd" style={{position:"relative",borderTop:".5px solid var(--bd)"}}><V top={0} left={0}/><V top={0} right={0}/><div className="wh"><span className="wl">Selected works</span><span className="wl">{String(P.length).padStart(2,"0")} projects</span></div></section>
          <div className="pg pd">{P.map(p=><div key={p.id} className="pe" onClick={()=>nav("project",p)}><div className="pc" style={{background:p.c}}>{p.vid&&<video className="pcv" src={p.vid} autoPlay loop muted playsInline/>}{p.comp&&<ScaledIframe src={p.comp} title={p.n}/>}</div><div className="pco">{p.co}</div><div className="ptl">{p.tl2}</div><div className="pts">{p.t.map(t=><span key={t} className="ptg">{t}</span>)}</div></div>)}</div>
          <div className="ft2 pd"><span className="ftx">© 2026 Akash Trivedi</span><div style={{display:"flex",gap:20}}><a className="ftl" href="https://www.linkedin.com/in/kaa5h/" target="_blank" rel="noopener noreferrer">LinkedIn</a><a className="ftl" href="https://www.instagram.com/k445h/" target="_blank" rel="noopener noreferrer">Instagram</a></div></div>
        </>}
        {pg==="project"&&proj&&(()=>{const i=P.findIndex(p=>p.id===proj.id);const nx=P[(i+1)%P.length];return<div className="pp pd">
          <button className="pb" onClick={()=>nav("home")}><span className="pba">←</span> All projects</button>
          <h1 className="ppt">{proj.n}</h1>
          <div style={{fontSize:14,color:"var(--f2)",marginBottom:24,marginTop:-16}}>{proj.co} · {proj.tl2}</div>
          <div className="pmr"><V bottom={0} left={0}/><V bottom={0} right={0}/><div><div className="pml">Year</div><div className="pmv">{proj.y}</div></div><div><div className="pml">Role</div><div className="pmv">{proj.r}</div></div><div><div className="pml">Discipline</div><div className="pmv">{proj.t.join(", ")}</div></div><div><div className="pml">Tools</div><div className="pmv">{proj.tools.join(", ")}</div></div></div>
          <div className="phi" style={{background:proj.c}}><span className="phpl">Project hero image</span></div>
          <div className="pby"><p className="pbt">{proj.ld}</p></div>
          <div className="pig">{[1,2,3,4].map(n=><div key={n} className="pic" style={{background:proj.c}}><span className="picl">Detail {String(n).padStart(2,"0")}</span></div>)}</div>
          <div className="np" onClick={np}><div className="npl">Next project</div><div className="npn">{nx.n}<span className="npa">→</span></div></div>
        </div>})()}
        {pg==="cv"&&<div className="cvp pd">
          <button className="pb" onClick={()=>nav("home")}><span className="pba">←</span> Home</button>
          <div className="cvh"><div><h1 className="cvt">Curriculum Vitae</h1><div className="cvst">Akash Trivedi — Product Designer</div></div><div className="cvph"><span className="cvphl">Photo</span></div></div>
          <div className="cvpr" style={{position:"relative"}}><V top={0} left={0}/><V top={0} right={0}/><V bottom={0} left={0}/><V bottom={0} right={0}/><div><div className="cvpl">Experience</div><div className="cvpv">6+ years</div></div><div><div className="cvpl">Location</div><div className="cvpv">Bremen, Germany</div></div><div><div className="cvpl">LinkedIn</div><a className="cvpk">linkedin.com/in/kaa5h</a></div><div><div className="cvpl">Contact</div><a className="cvpk">hello@akashtrivedi.design</a></div></div>
          <div className="cvs"><div className="cvsl">Experience</div>{EXP.map((e,i)=><div key={i} className="cve"><div className="cvep">{e.p}</div><div><div className="cver">{e.ti}</div><div className="cvec">{e.co}, {e.lo}</div><div className="cved">{e.d}</div></div></div>)}</div>
          <div className="cvs"><div className="cvsl">Education</div>{EDU.map((e,i)=><div key={i} className="cve"><div className="cvep">{e.p}</div><div><div className="cver">{e.ti}</div><div className="cvec">{e.ins}, {e.lo}</div>{e.d&&<div className="cved">{e.d}</div>}</div></div>)}</div>
          <div className="cvsk"><div className="cvsl">Skills & Knowledge</div><div className="cvsg">{SK.map((s,i)=><div key={i}><div className="cvskc">{s.c}</div>{s.items.map((it,j)=><div key={j} className="cvski">{it}</div>)}</div>)}</div></div>
          <div className="cva"><a className="cvdl">↓ Download PDF</a><a className="cvcb">✉ Get in touch</a></div>
          <div className="ft2" style={{marginTop:"clamp(40px,5vw,64px)"}}><span className="ftx">© 2026 Akash Trivedi</span><div style={{display:"flex",gap:20}}><a className="ftl" href="https://www.linkedin.com/in/kaa5h/" target="_blank" rel="noopener noreferrer">LinkedIn</a><a className="ftl" href="https://www.instagram.com/k445h/" target="_blank" rel="noopener noreferrer">Instagram</a></div></div>
        </div>}
        {pg==="blog"&&<div className="blp pd">
          <button className="pb" onClick={()=>nav("home")}><span className="pba">←</span> Home</button>
          <h1 className="blt">Blog</h1><p className="bls">Thinking out loud about design systems, industrial software, and the space between tools and people.</p>
          <div className="bll">{BL.map(p=><div key={p.id} className="ble" onClick={()=>nav("blogPost",null,p)}><div className="blel"><div className="blet">{p.ti}</div><div className="bleg">{p.tg.map(t=><span key={t} className="blegt">{t}</span>)}</div></div><div className="bler"><span className="bled">{p.dt}</span><span className="blerm">{p.rt}</span></div></div>)}</div>
          <div className="ft2" style={{marginTop:"clamp(40px,5vw,64px)"}}><span className="ftx">© 2026 Akash Trivedi</span><div style={{display:"flex",gap:20}}><a className="ftl" href="https://www.linkedin.com/in/kaa5h/" target="_blank" rel="noopener noreferrer">LinkedIn</a><a className="ftl" href="https://www.instagram.com/k445h/" target="_blank" rel="noopener noreferrer">Instagram</a></div></div>
        </div>}
        {pg==="blogPost"&&bp&&(()=>{const i=BL.findIndex(p=>p.id===bp.id);const nx=BL[(i+1)%BL.length];return<div className="bpp pd">
          <button className="pb" onClick={()=>nav("blog")}><span className="pba">←</span> All posts</button>
          <div className="bph"><div className="bptr">{bp.tg.map(t=><span key={t} className="bptg">{t}</span>)}</div><h1 className="bpti">{bp.ti}</h1><div className="bpm"><span>{bp.dt}</span><span className="bpmd">·</span><span>{bp.rt} read</span></div></div>
          <div className="bpdv"><V top={0} left={0}/><V top={0} right={0}/></div>
          <div className="bpbd">{bp.bd.split("\n\n").map((p,i)=><p key={i} className="bppr">{p}</p>)}</div>
          <div className="bpn" onClick={()=>nav("blogPost",null,nx)}><V top={0} left={0}/><V top={0} right={0}/><div className="bpnl">Next post</div><div className="bpnt">{nx.ti}<span className="bpna">→</span></div></div>
          <div className="ft2" style={{marginTop:"clamp(40px,5vw,64px)"}}><span className="ftx">© 2026 Akash Trivedi</span><div style={{display:"flex",gap:20}}><a className="ftl" href="https://www.linkedin.com/in/kaa5h/" target="_blank" rel="noopener noreferrer">LinkedIn</a><a className="ftl" href="https://www.instagram.com/k445h/" target="_blank" rel="noopener noreferrer">Instagram</a></div></div>
        </div>})()}
      </div>
    </div>
  );
}
