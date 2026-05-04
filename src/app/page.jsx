"use client"
import { useState, useEffect, useRef, useMemo } from "react";
const CDS_COMP="/comparisons/cds/index.html";
const CPE_COMP="/comparisons/cpe/index.html";
/* Get your free key at web3forms.com (enter your email → copy the key) */
const W3F_KEY="b319f9e4-4fd2-4272-a8c6-f5a5712e25fb";

/* ========================================================================
   PROJECTS
   =========================================================================
   To ADD a new project: Copy one of the blocks below and paste it at the
   end (before the closing bracket "]"). Change the values to match your
   new project. Don't forget the comma after each "}" !

   To DELETE a project: Remove the entire block from "{" to "}," for that
   project.

   To EDIT a project: Just change the text values you want to update.

   Each project has these fields:
     id    — Short unique ID, no spaces (e.g. "myproject")
     comp  — (Optional) Path to a comparison HTML page in /public/comparisons/
     img   — Path to overview image in /public/projects/ (e.g. "/projects/my-overview.png")
     n     — Full project name shown on the project detail page
     co    — Company / context label shown below the card
     tl2   — One-line subtitle
     d     — Short description (shown on cards)
     ld    — Long description for the detail page. Use \n\n for new paragraphs.
     t     — Tags array, e.g. ["Design Systems", "Research"]
     tools — Tools array, e.g. ["Figma", "Miro"]
     y     — Year or year range, e.g. "2024–25"
     r     — Your role, e.g. "Lead Product Designer"
     c     — Card background color hex, e.g. "#1a1a1a"
   ======================================================================== */
const P = [
  { id:"cds",comp:CDS_COMP,img:"/projects/cds-overview.png",n:"Connectware Design System",co:"Connectware Design System",tl2:"Scaling design language for industrial IoT",d:"At Cybus, there was no shared design language when I joined. I got to build one from scratch — tokens, components, documentation, the whole thing.",ld:"Connectware had no design system. Every team was solving the same problems differently, so I started from first principles — type scale, spacing, color tokens, and a component library with APIs that actually make sense to developers.\n\nThe part I'm proudest of: every component has a 'context of use' section. Not just how it looks, but when you should reach for it and what breaks in production if you misuse it. Adoption went from around 40% to near-complete in two quarters. That felt good.",t:["Design Systems","Documentation"],tools:["Figma","Storybook","Notion"],y:"2024–25",r:"Design System Lead",c:"#1a1a1a" },
  { id:"cpe",comp:CPE_COMP,img:"/projects/cpe-overview.png",n:"Connectware Product Experience",co:"Connectware Product Experience",tl2:"Reshaping how industries manage IoT infrastructure",d:"I own the product design for Connectware — how industrial users monitor, configure, and manage their IoT infrastructure day to day.",ld:"When I picked this up, the interface had grown organically over three years. Lots of capable pieces, but no coherent thread tying them together. I started with contextual interviews on actual factory floors and talked to people across 12 client organizations.\n\nThe redesign brought device status, data flows, and configuration into one experience — with progressive disclosure so both plant engineers and IT admins feel at home. It's the kind of problem I really enjoy working on at Cybus.",t:["Product Design","Research"],tools:["Figma","Dovetail","Miro"],y:"2024–25",r:"Lead Product Designer",c:"#1a1a1a" },
  { id:"sds",img:"/projects/sds-overview.png",n:"Shyftplan Design System",co:"Shyftplan Design System",tl2:"Consistency across a fast-scaling workforce platform",d:"Shyftplan was shipping features fast, but the UI was drifting. I introduced a design system to bring it back together.",ld:"New features shipped weekly but patterns were diverging — buttons looked different on every page, spacing was inconsistent, and accessibility was an afterthought. I set up a structured system with foundational tokens, reusable components, and documentation people actually referred to.\n\nI worked closely with engineering to get WCAG 2.1 AA compliance across the board. Over time the system became the shared language between design and dev, which made everything move faster.",t:["Design Systems","Accessibility"],tools:["Figma","Storybook"],y:"2023–24",r:"UI/UX Designer",c:"#333336" },
  { id:"qm",img:"/projects/qm-overview.png",n:"Qualification Matrix",co:"Shyftplan Qualification Matrix",tl2:"Data-dense interface for workforce skill management",d:"A dense data problem — tracking employee qualifications, skills, and certifications so shift planners can actually see what they're working with.",ld:"In regulated industries, you can't just put anyone on any shift. Managers need to track qualifications, certifications, expiry dates — and they need to see all of it at once without drowning in it.\n\nI designed a matrix view that gives you skill coverage across teams at a glance. Progressive disclosure handles the details, and inline editing means you're not jumping between screens constantly. We validated it with operations managers, and the feedback was pretty clear — they'd been wanting something like this for a while.",t:["Product Design","Data Visualization"],tools:["Figma","Maze"],y:"2023",r:"UI/UX Designer",c:"#343434" },
  /* ADD NEW PROJECT HERE (copy a block above and paste it here) */
];
/* ========================================================================
   EXPERIENCE (CV page)
   =========================================================================
   To ADD: Copy a block and paste it in the right chronological position.
   To DELETE: Remove the entire { ... }, block for that job.
   To EDIT: Change the text values.

   Fields:
     p   — Period (e.g. "07/2024 — Present")
     ti  — Job title
     co  — Company name
     lo  — Location
     d   — Short description of the role
   ======================================================================== */
const EXP = [
  {p:"07/2024 — Present",ti:"Product Designer",co:"Cybus",lo:"Bremen",d:"Lead product design for Connectware, an industrial IoT platform. Design systems, discovery, interaction design."},
  {p:"04/2023 — 06/2024",ti:"UI/UX Designer",co:"shyftplan GmbH",lo:"Berlin",d:"Full cycle product design for AI-supported shift planning. UX, prototyping, WCAG 2.1 AA compliance."},
  {p:"09/2021 — 04/2023",ti:"Web Designer & Developer",co:"collectAI",lo:"Hamburg",d:"UI design for fintech. Responsive communications, landing pages, agile design system development."},
  {p:"07/2019 — 09/2021",ti:"UI Designer",co:"BIBA",lo:"Bremen",d:"UX/UI for web and mobile apps. User-centric methods, usability testing, branding."},
  {p:"01/2016 — 08/2018",ti:"Experience Designer",co:"St+Art India Foundation",lo:"New Delhi",d:"Digital experiences for Street Art Festival. Field research, content documentation."},
  /* ADD NEW EXPERIENCE HERE */
];
/* ========================================================================
   EDUCATION (CV page)
   =========================================================================
   To ADD: Copy a block and paste it in the right position.
   To DELETE: Remove the { ... }, block. To EDIT: Change the text values.

   Fields:
     p   — Period (e.g. "2018 — 2024")
     ti  — Degree name
     ins — Institution name
     lo  — Location
     d   — Extra info like grade (leave "" if empty)
   ======================================================================== */
const EDU = [
  {p:"2018 — 2024",ti:"M.Sc. Media Informatics",ins:"University of Bremen",lo:"Bremen",d:"Grade: 1.5"},
  {p:"2010 — 2014",ti:"B.Sc. Computer Science",ins:"Ganpat University",lo:"Gujarat, India",d:""},
  /* ADD NEW EDUCATION HERE */
];
/* ========================================================================
   SKILLS (CV page)
   =========================================================================
   To ADD a skill: Add a new text string inside the "items" list of the
   right category. e.g. items:["Figma","FigJam","NEW TOOL HERE"]
   To ADD a category: Copy a whole { c:"...", items:[...] }, block.
   To DELETE: Remove the text from the items list, or remove a whole block.
   ======================================================================== */
const SK = [
  {c:"UX / Product",items:["User Research","Journey Mapping","Interaction Design","Prototyping","Usability Testing","KPI-Aware Decisions"]},
  {c:"Systems & Scale",items:["Design Systems","Component Libraries","Design Tokens","Info Architecture","Design Ops"]},
  {c:"AI-Augmented",items:["GenAI Ideation","Research Synthesis with AI","Human-AI Workflow","Responsible AI UX"]},
  {c:"Tools",items:["Figma","FigJam","Storybook","Framer","Notion","Jira","Dovetail","Claude, Cursor"]},
  /* ADD NEW SKILL CATEGORY HERE */
];
/* ========================================================================
   BLOG POSTS
   =========================================================================
   To ADD a new blog post: Copy one block and paste it at the TOP of the
   list (newest posts go first). Update the id to be unique (e.g. "b6").

   To DELETE a blog post: Remove the entire { ... }, block for that post.

   To EDIT a blog post: Change the text values directly.

   Fields:
     id  — Unique ID, e.g. "b6", "b7" (just keep incrementing)
     ti  — Blog post title
     dt  — Date shown, e.g. "Apr 2025"
     tg  — Tags array, e.g. ["UX", "AI"]
     rt  — Reading time, e.g. "5 min"
     bd  — Full blog post body text. Use \n\n for new paragraphs.
   ======================================================================== */
const BL = [
  /* ADD NEW BLOG POST HERE (newest first) */
  {id:"b1",ti:"What I learned building a design system for industrial software",dt:"Mar 2025",tg:["Design Systems"],rt:"6 min",bd:"When I started rebuilding the design system at Cybus, I assumed the hard part would be the components. I was wrong.\n\nThe hard part was governance. The biggest lesson: a design system isn't a library. It's a set of shared decisions."},
  {id:"b2",ti:"Progressive disclosure in complex tools",dt:"Jan 2025",tg:["UX","Interaction"],rt:"5 min",bd:"The more capable a tool is, the harder it is to use — unless you actively hide most of its capability.\n\nAt Cybus, we redesigned machine onboarding using layered progressive disclosure. Commissioning dropped from 45 to under 10 minutes."},
  {id:"b3",ti:"Everyone cares about good UX — it's just not always the priority",dt:"Nov 2024",tg:["UX","AI"],rt:"6 min",bd:"Nobody says they don't care about UX. But when shipping pressure hits, it's the first thing that gets negotiated away.\n\nI've been thinking about what it actually takes to keep UX on the table when AI features are moving fast and everyone wants to ship yesterday."},
  {id:"b4",ti:"Figma variables for our design token pipeline",dt:"Sep 2024",tg:["Design Systems"],rt:"4 min",bd:"Three sources of truth became one. Figma variables → JSON → CSS custom properties.\n\nAdjusting our neutral scale went from design decision to deployed code in 45 minutes."},
  {id:"b5",ti:"You won't fix it later — designing AI features right the first time",dt:"Jun 2024",tg:["AI","Product Design"],rt:"7 min",bd:"'We'll iterate on it' is the most dangerous sentence in product. Especially with AI features, where the first version trains user expectations.\n\nI've seen teams ship rough AI flows planning to polish later. Later never comes, and now you've set a baseline nobody asked for."},
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
  const [reqProj,setReqProj]=useState(null),[reqForm,setReqForm]=useState({name:"",email:"",company:""}),[reqStatus,setReqStatus]=useState("idle");
  const mousePos=useRef({x:0,y:0}),gifPos=useRef({x:0,y:0}),gifRef=useRef(null),rafRef=useRef(null);
  useEffect(()=>{const onMove=(e)=>{mousePos.current={x:e.clientX,y:e.clientY}};window.addEventListener("mousemove",onMove);const animate=()=>{const gp=gifPos.current,mp=mousePos.current;gp.x+=(mp.x-gp.x)*0.08;gp.y+=(mp.y-gp.y)*0.08;if(gifRef.current){gifRef.current.style.transform=`translate3d(${gp.x-70}px,${gp.y-70}px,0)`}rafRef.current=requestAnimationFrame(animate)};rafRef.current=requestAnimationFrame(animate);return()=>{window.removeEventListener("mousemove",onMove);cancelAnimationFrame(rafRef.current)}},[]);
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
  /* ======================================================================
     HOMEPAGE INTRO TABS
     ======================================================================
     These are the tabs at the bottom of the landing hero section.
     NOTE: The FIRST tab ("For anyone") text is hardcoded separately in the
     JSX below (search for "I'm <span className="hn"" to edit it).
     For all OTHER tabs, just edit the "t" text here.

     To ADD a tab: Add a new { l:"Tab Name", t:"Tab text..." },
     To DELETE a tab: Remove the entire { ... }, block.
     To EDIT: Change the "l" (label) or "t" (text) values.
     ====================================================================== */
  const TABS=[
    {l:"For anyone",t:"I'm a Product Designer at Cybus, where I get to work on some genuinely interesting problems in industrial IoT. My days are spent making complex B2B tools feel straightforward — and more recently, figuring out what good AI-driven UX actually looks like in practice."},
    {l:"Product & Systems",t:"I spend most of my time in the messy middle — talking to users, untangling requirements, and turning that into systems and interfaces that hold up at scale. I care about the structure behind what people see, not just the surface."},
    {l:"Pro Bono",t:"I'm open to volunteering my design skills for products in the health and mental health space. If you're building something that supports wellbeing and could use a product designer, I'd love to contribute."},
    {l:"Culture",t:"Much of my creative inspiration comes from the visual language of everyday life — streets, signs, letterforms, walls, and movement. I'm particularly drawn to street photography, typography, and graffiti culture."},
    {l:"Motion",t:"When I'm away from the screen, I'm usually riding through unfamiliar places, going for a run, or trying to stay honest with a daily sun salutation practice."},
    /* ADD NEW TAB HERE */
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
  const nav=(t,p=null,b=null,skipPush=false)=>{setFd(true);setTimeout(()=>{setPg(t);setProj(p);setBp(b);window.scrollTo(0,0);if(!skipPush)window.history.pushState({pg:t,proj:p?.id||null,bp:b?.id||null},"");setTimeout(()=>setFd(false),50)},280)};
  useEffect(()=>{window.history.replaceState({pg:"home",proj:null,bp:null},"");const onPop=(e)=>{const s=e.state;if(s){const p=s.proj?P.find(x=>x.id===s.proj):null;const b=s.bp?BL.find(x=>x.id===s.bp):null;nav(s.pg,p,b,true)}else{nav("home",null,null,true)}};window.addEventListener("popstate",onPop);return()=>window.removeEventListener("popstate",onPop)},[]);
  const sp=()=>{if(pg!=="home"){nav("home");return}document.getElementById("projects")?.scrollIntoView({behavior:"smooth"})};
  const np=()=>{if(!proj)return;const i=P.findIndex(p=>p.id===proj.id);nav("project",P[(i+1)%P.length])};
  const closeReq=()=>{setReqProj(null);setReqStatus("idle");setReqForm({name:"",email:"",company:""})};
  const submitReq=async(e)=>{e.preventDefault();setReqStatus("sending");try{const res=await fetch("https://api.web3forms.com/submit",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({access_key:W3F_KEY,subject:`Case Study Request: ${reqProj.n}`,from_name:reqForm.name,email:reqForm.email,company:reqForm.company||"Not provided",project:reqProj.n,message:`${reqForm.name} (${reqForm.email})${reqForm.company?` from ${reqForm.company}`:""} requested access to the "${reqProj.n}" case study.`})});if(res.ok)setReqStatus("sent");else setReqStatus("error")}catch{setReqStatus("error")}};
  useEffect(()=>{if(!reqProj)return;const onKey=(e)=>{if(e.key==="Escape")closeReq()};document.addEventListener("keydown",onKey);document.body.style.overflow="hidden";return()=>{document.removeEventListener("keydown",onKey);document.body.style.overflow=""}},[reqProj]);
  const GF={A:[2,5,7,5,5],B:[6,5,6,5,6],C:[3,4,4,4,3],D:[6,5,5,5,6],E:[7,4,7,4,7],G:[3,4,5,5,3],H:[5,5,7,5,5],I:[7,2,2,2,7],J:[1,1,1,5,2],K:[5,6,4,6,5],L:[4,4,4,4,7],M:[5,7,7,5,5],N:[5,7,5,5,5],P:[6,5,6,4,4],R:[6,5,6,5,5],S:[3,4,2,1,6],T:[7,2,2,2,2],U:[5,5,5,5,7],V:[5,5,5,2,2],Y:[5,5,2,2,2]};
  /* ======================================================================
     HERO GRID PHRASES (the rotating text in the dot grid)
     ======================================================================
     These cycle every 5 seconds in the interactive grid on the homepage.
     Each phrase is an array of lines. One line = [["WORD"]], two lines =
     [["LINE ONE"],["LINE TWO"]].

     IMPORTANT: Only UPPERCASE letters work, and only these characters are
     supported: A B C D E G H I J K L M N P R S T U V Y and SPACE.

     To ADD: Add a new line like [["YOUR"],["WORD"]],
     To DELETE: Remove the line. To EDIT: Change the text.
     ====================================================================== */
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
    /* ADD NEW PHRASE HERE */
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
      <div ref={gifRef} className={`hni${nh?" s":""}`}><img src="/videos/hover-face.gif" alt="Akash Trivedi" width={140} height={140}/></div>
      <style>{`

.r{min-height:100vh;background:var(--bg);color:var(--fg);font-family:'Geist',sans-serif;overflow-x:hidden}
*{margin:0;padding:0;box-sizing:border-box}
::selection{background:rgba(168,218,220,0.2);color:var(--fg)}
@keyframes fi{from{opacity:0}to{opacity:1}}@keyframes su{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
.pt{transition:opacity .28s,transform .28s;opacity:1;transform:translateY(0)}.pt.out{opacity:0;transform:translateY(8px)}
.fn{position:fixed;bottom:32px;left:50%;transform:translateX(-50%);z-index:400;display:flex;flex-direction:column;backdrop-filter:blur(40px) saturate(1.8);-webkit-backdrop-filter:blur(40px) saturate(1.8);border-radius:14px;padding:5px;box-shadow:0 0 0 .5px rgba(128,128,128,0.08),0 4px 16px rgba(0,0,0,0.10),0 12px 40px rgba(0,0,0,0.14);transition:all .5s}
.r:not(.light) .fn{background:rgba(28,28,28,0.65);border:.5px solid rgba(255,255,255,0.10)}.r.light .fn{background:rgba(255,255,255,0.68);border:.5px solid rgba(0,0,0,0.06)}
.fp{display:grid;grid-template-rows:0fr;transition:grid-template-rows .45s cubic-bezier(.4,0,.2,1)}.fp.o{grid-template-rows:1fr}.fpi{overflow:hidden;min-height:0}.fpc{padding:8px 8px 10px;display:flex;align-items:center;justify-content:space-between;gap:12px;opacity:0;transform:translateY(6px);transition:opacity .25s,transform .3s cubic-bezier(.4,0,.2,1)}.fp.o .fpc{opacity:1;transform:translateY(0);transition:opacity .3s .15s,transform .35s cubic-bezier(.4,0,.2,1) .12s}
.fpd{height:.5px;background:var(--bd);margin:0 8px;opacity:0;transition:opacity .2s}.fp.o .fpd{opacity:.5;transition:opacity .2s .1s}
.cg{display:flex;gap:0;background:var(--hb);border-radius:4px;padding:2px;flex-shrink:0}.cb{font-size:11px;font-weight:500;color:var(--f2);background:none;border:none;cursor:pointer;padding:4px 10px;border-radius:3px;transition:color .15s,background .15s;white-space:nowrap}.cb:hover{color:var(--fg)}.cb.a{color:var(--fg);background:var(--la)}
.tg{display:flex;align-items:center;flex-shrink:0}
.pal-track{position:relative;width:clamp(120px,20vw,200px);height:24px;display:flex;align-items:center;background:var(--hb);border-radius:6px;padding:0 12px;border:.5px solid var(--bd)}
.pal-dots{position:absolute;left:12px;right:12px;top:50%;transform:translateY(-50%);display:flex;align-items:center;justify-content:space-between;pointer-events:none;z-index:1}
.pal-anchor{width:5px;height:5px;border-radius:50%;background:var(--f3);transition:background .3s,transform .3s}
.pal-anchor.act{background:var(--fg);transform:scale(1.4)}
.pal-slider{-webkit-appearance:none;appearance:none;width:100%;height:100%;background:transparent;outline:none;position:relative;z-index:2;cursor:pointer;margin:0}
.pal-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:14px;height:14px;border-radius:50%;background:var(--fg);cursor:pointer;box-shadow:0 0 0 3px var(--bg),0 0 0 3.5px var(--bd);transition:transform .2s cubic-bezier(.16,1,.3,1)}
.pal-slider::-webkit-slider-thumb:hover{transform:scale(1.3)}
.pal-slider::-moz-range-thumb{width:14px;height:14px;border-radius:50%;background:var(--fg);border:none;cursor:pointer;box-shadow:0 0 0 3px var(--bg),0 0 0 3.5px var(--bd)}
.ft{display:flex;align-items:center;position:relative;width:100%}.fb{position:absolute;top:0;left:0;height:100%;background:var(--hb);border-radius:9px;transition:transform .4s cubic-bezier(.4,0,.2,1),width .4s cubic-bezier(.4,0,.2,1);pointer-events:none;z-index:0}
.fl{position:relative;z-index:1;font-size:12px;color:var(--f2);text-decoration:none;cursor:pointer;padding:7px 16px;border-radius:6px;transition:color .25s;flex:1;text-align:center;white-space:nowrap;display:inline-flex;align-items:center;justify-content:center;gap:6px;letter-spacing:.01em}.fl:hover{color:var(--fg)}.fl.a{color:var(--fg)}
.fs{width:.5px;height:14px;background:var(--bd);margin:0 4px;position:relative;z-index:1;flex-shrink:0;opacity:.6}
.tb{position:relative;z-index:1;width:30px;height:30px;border:none;border-radius:50%;background:none;cursor:pointer;display:flex;align-items:center;justify-content:center;color:var(--f3);font-size:15px;font-weight:300;transition:color .25s,transform .35s cubic-bezier(.16,1,.3,1);flex-shrink:0}.tb:hover{color:var(--fg)}.tb.o{transform:rotate(45deg)}
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
.hni{position:fixed;top:0;left:0;width:140px;height:140px;opacity:0;pointer-events:none;z-index:9999;transition:opacity .25s ease,transform .05s;will-change:transform,opacity}.hni.s{opacity:1}
.hni img{width:100%;height:100%;object-fit:contain;display:block;border-radius:50%;box-shadow:0 8px 32px rgba(0,0,0,0.25),0 2px 8px rgba(0,0,0,0.15);background:var(--bg)}




.wh{display:flex;align-items:baseline;justify-content:space-between;padding:14px 0}.wl{font-size:11px;letter-spacing:.06em;text-transform:uppercase;color:var(--f3);font-weight:500}
.pg{display:grid;grid-template-columns:1fr 1fr;gap:clamp(32px,4vw,56px) clamp(16px,2vw,28px);padding-top:8px;padding-bottom:clamp(40px,6vw,72px)}.pe{}.pc{width:100%;aspect-ratio:30/19;border-radius:10px;display:flex;align-items:center;justify-content:center;border:.5px solid var(--bd);transition:border-color .3s;overflow:hidden;position:relative}.pcv{width:100%;height:100%;object-fit:cover;display:block}.pci{width:100%;height:100%;object-fit:cover;display:block;transition:transform .45s cubic-bezier(.4,0,.2,1)}.pe:hover .pci{transform:scale(1.03)}.pe:hover .pc{border-color:var(--ht)}.pcl{font-size:18px;font-weight:500;color:var(--f4);text-align:center;transition:color .3s}.pe:hover .pcl{color:var(--f2)}.pco{font-size:12px;font-weight:500;color:var(--fg);margin-top:14px;letter-spacing:0.01em}.ptl{font-size:13px;color:var(--f3);line-height:1.5;margin-top:3px}.pds{font-size:13px;color:var(--f2);line-height:1.6;margin-top:14px;max-width:440px}.pts{display:flex;flex-wrap:wrap;gap:6px;margin-top:10px}.ptg{font-size:11px;font-weight:500;color:var(--f3);border:.5px solid var(--tb);border-radius:100px;padding:4px 12px;text-transform:uppercase;transition:color .2s,border-color .2s}.pe:hover .ptg{border-color:var(--thb);color:var(--f2)}
.r.light .pc{background:var(--cd)!important}.r.light .phi{background:var(--cd)!important}.r.light .pic{background:var(--cd)!important}
.pp{padding-top:clamp(16px,3.2vw,32px);padding-bottom:80px;min-height:100vh}.pb{display:inline-flex;align-items:center;gap:8px;cursor:pointer;font-size:13px;color:var(--f3);margin-bottom:clamp(32px,5vw,56px);transition:color .2s;border:none;background:none;font-family:inherit;padding:0}.pb:hover{color:var(--fg)}.pba{transition:transform .25s cubic-bezier(.16,1,.3,1);display:inline-block}.pb:hover .pba{transform:translateX(-3px)}
.ppt{font-size:clamp(32px,5vw,56px);font-weight:500;color:var(--fg);letter-spacing:-.03em;line-height:1.15;margin-bottom:24px}
.pmr{display:flex;flex-wrap:wrap;gap:24px;margin-bottom:clamp(32px,4vw,48px);padding-bottom:24px;border-bottom:.5px solid var(--bd);position:relative}.pml{font-size:10px;text-transform:uppercase;letter-spacing:.06em;color:var(--f4);margin-bottom:4px;font-weight:500}.pmv{font-size:13px;color:var(--f2)}
.phi{width:100%;aspect-ratio:16/9;border-radius:8px;margin-bottom:clamp(32px,4vw,48px);display:flex;align-items:center;justify-content:center;border:.5px solid var(--bd)}.phpl{font-size:14px;color:var(--f4);opacity:.5}
.pby{max-width:680px;margin-bottom:clamp(40px,5vw,64px)}.pbt{font-size:15px;color:var(--f2);line-height:1.75;white-space:pre-line}
.pig{display:grid;grid-template-columns:1fr 1fr;gap:clamp(8px,1vw,14px);margin-bottom:clamp(40px,5vw,64px)}.pic{aspect-ratio:4/3;border-radius:6px;display:flex;align-items:center;justify-content:center;border:.5px solid var(--bd)}.picl{font-size:12px;color:var(--f4);opacity:.4}
.req-ov{position:absolute;inset:0;border-radius:10px;display:flex;flex-direction:column;align-items:center;justify-content:center;background:rgba(0,0,0,0.7);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);opacity:0;transition:opacity .35s ease;z-index:2;padding:24px;cursor:pointer;gap:10px}
.pe:hover .req-ov{opacity:1}
.req-label{font-size:14px;font-weight:500;color:rgba(255,255,255,0.9);letter-spacing:-.01em}
.req-sub{font-size:12px;color:rgba(255,255,255,0.5);text-align:center;max-width:260px;margin:0;line-height:1.5}
.req-link{font-size:12px;color:var(--tl);margin-top:10px;font-weight:500;transition:color .2s}.pe:hover .req-link{color:var(--fg)}
.rm-backdrop{position:fixed;inset:0;background:rgba(0,0,0,0.5);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);z-index:500;display:flex;align-items:center;justify-content:center;animation:fi .2s}
.rm{background:var(--bg);border:.5px solid var(--bd);border-radius:16px;width:min(420px,90vw);max-height:90vh;overflow-y:auto;padding:32px;position:relative;animation:su .3s}
.rm-close{position:absolute;top:16px;right:16px;width:32px;height:32px;border:none;background:var(--hb);border-radius:8px;cursor:pointer;display:flex;align-items:center;justify-content:center;color:var(--f3);font-size:18px;transition:background .2s,color .2s}.rm-close:hover{background:var(--la);color:var(--fg)}
.rm-h{margin-bottom:24px}
.rm-proj{font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:var(--tl);font-weight:500;margin-bottom:8px}
.rm-t{font-size:22px;font-weight:500;color:var(--fg);letter-spacing:-.02em;margin-bottom:8px}
.rm-s{font-size:13px;color:var(--f2);line-height:1.6;margin:0}
.rm-f{display:flex;flex-direction:column;gap:16px}
.rm-l{display:flex;flex-direction:column;gap:6px;font-size:12px;font-weight:500;color:var(--f3)}
.rm-i{font-size:14px;font-family:inherit;color:var(--fg);background:var(--hb);border:.5px solid var(--bd);border-radius:8px;padding:10px 14px;outline:none;transition:border-color .2s}.rm-i:focus{border-color:var(--tl)}.rm-i::placeholder{color:var(--f4)}
.rm-btn{font-size:14px;font-family:inherit;font-weight:500;color:var(--bg);background:var(--fg);border:none;border-radius:8px;padding:12px;cursor:pointer;transition:opacity .2s;margin-top:4px}.rm-btn:hover{opacity:.85}.rm-btn:disabled{opacity:.5;cursor:wait}
.rm-err{font-size:12px;color:#e55;margin:0;text-align:center}
.rm-done{display:flex;flex-direction:column;align-items:center;text-align:center;padding:16px 0}
.rm-done-t{font-size:20px;font-weight:500;color:var(--fg);margin:20px 0 8px}
.rm-done-s{font-size:13px;color:var(--f2);line-height:1.6;margin:0 0 24px;max-width:300px}
.rm-done-btn{font-size:13px;font-family:inherit;color:var(--f2);background:var(--hb);border:.5px solid var(--bd);border-radius:8px;padding:10px 24px;cursor:pointer;transition:background .2s}.rm-done-btn:hover{background:var(--la)}
.np{border-top:.5px solid var(--bd);padding-top:32px;cursor:pointer;position:relative}.npl{font-size:10px;text-transform:uppercase;letter-spacing:.06em;color:var(--f4);margin-bottom:8px;font-weight:500}.npn{font-size:clamp(20px,3vw,32px);font-weight:500;color:var(--f3);letter-spacing:-.02em;transition:color .3s;display:inline-flex;align-items:center;gap:12px}.np:hover .npn{color:var(--fg)}.npa{transition:transform .3s cubic-bezier(.16,1,.3,1);display:inline-block;font-size:.7em}.np:hover .npa{transform:translateX(6px)}
.cvp{padding-top:clamp(16px,3.2vw,32px);padding-bottom:80px;min-height:100vh}.cvh{display:grid;grid-template-columns:1fr auto;gap:32px;align-items:start;margin-bottom:clamp(36px,5vw,56px)}.cvt{font-size:clamp(32px,5vw,48px);font-weight:500;color:var(--fg);letter-spacing:-.03em;margin-bottom:4px}.cvst{font-size:15px;color:var(--f2)}
.cvph{width:120px;height:120px;border-radius:8px;background:var(--cd);border:.5px solid var(--bd);display:flex;align-items:center;justify-content:center;flex-shrink:0}.cvphl{font-size:10px;color:var(--f4);text-transform:uppercase}
.cvpr{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:clamp(36px,5vw,56px);padding:20px 0;border-top:.5px solid var(--bd);border-bottom:.5px solid var(--bd);position:relative}.cvpl{font-size:10px;text-transform:uppercase;letter-spacing:.06em;color:var(--f4);margin-bottom:4px;font-weight:500}.cvpv{font-size:13px;color:var(--f2)}.cvpk{font-size:13px;color:var(--tl);text-decoration:none;cursor:pointer}
.cvs{margin-bottom:clamp(40px,5vw,60px)}.cvsl{font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:var(--tl);font-weight:500;margin-bottom:24px}.cve{display:grid;grid-template-columns:160px 1fr;gap:24px;padding:20px 0;border-top:.5px solid var(--bd);position:relative}.cve:last-child{border-bottom:.5px solid var(--bd)}.cvep{font-size:12px;color:var(--f3);padding-top:3px;font-variant-numeric:tabular-nums}.cver{font-size:15px;font-weight:500;color:var(--fg);margin-bottom:3px}.cvec{font-size:13px;color:var(--f2);margin-bottom:2px}.cved{font-size:13px;color:var(--f2);line-height:1.65}
.cvsk{margin-bottom:clamp(40px,5vw,60px)}.cvsg{display:grid;grid-template-columns:1fr 1fr;gap:24px}.cvskc{font-size:12px;font-weight:500;color:var(--fg);margin-bottom:10px}.cvski{font-size:13px;color:var(--f2);line-height:1.9}
.cva{display:flex;gap:12px;flex-wrap:wrap}.cvdl{display:inline-flex;align-items:center;gap:8px;font-size:13px;color:var(--tl);cursor:pointer;transition:background .2s;border:.5px solid var(--ht);border-radius:8px;padding:10px 18px;text-decoration:none;font-weight:500}.cvdl:hover{background:var(--hb)}.cvcb{display:inline-flex;align-items:center;gap:8px;font-size:13px;color:var(--f2);cursor:pointer;transition:background .2s;border:.5px solid var(--bd);border-radius:8px;padding:10px 18px;text-decoration:none}.cvcb:hover{background:var(--hb)}
.wip-dl{cursor:not-allowed;opacity:.45;position:relative}.wip-dl:hover{background:none}
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
          <a className={`fl${pg==="home"?" a":""}`} onClick={sp}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>Projects</a>
          <a className={`fl${pg==="cv"?" a":""}`} onClick={()=>nav("cv")}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>CV</a>
          <a className={`fl${pg==="blog"||pg==="blogPost"?" a":""}`} onClick={()=>nav("blog")}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>Blog</a>
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
                  <p>{i===0?<>I'm <span className="hn" onMouseEnter={()=>setNh(true)} onMouseLeave={()=>setNh(false)}>Akash Trivedi</span>, a Product Designer at <a href="https://cybus.io" target="_blank" rel="noopener noreferrer" className="hn-link">Cybus</a>, where I get to work on some genuinely interesting problems in industrial IoT. My days are spent making complex B2B tools feel straightforward — and more recently, figuring out what good AI-driven UX actually looks like in practice.</>:t.t}</p>
                </div>)}
              </div>
            </div>
          </section>
          <section id="projects" className="pd" style={{position:"relative",borderTop:".5px solid var(--bd)"}}><V top={0} left={0}/><V top={0} right={0}/><div className="wh"><span className="wl">Selected works</span><span className="wl">{String(P.length).padStart(2,"0")} projects</span></div></section>
          <div className="pg pd">{P.map(p=><div key={p.id} className="pe" style={{cursor:"pointer"}} onClick={()=>setReqProj(p)}><div className="pc" style={{background:p.c}}>{p.img&&<img className="pci" src={p.img} alt={p.n}/>}{p.vid&&<video className="pcv" src={p.vid} autoPlay loop muted playsInline/>}{!p.img&&p.comp&&<ScaledIframe src={p.comp} title={p.n}/>}<div className="req-ov"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg><div className="req-label">Request Case Study</div><p className="req-sub">Full process, research, and design outcomes.</p></div></div><div className="pco">{p.co}</div><div className="ptl">{p.tl2}</div><div className="pts">{p.t.map(t=><span key={t} className="ptg">{t}</span>)}</div><div className="req-link">Request case study →</div></div>)}</div>
          {/* ================================================================
              FOOTER — This footer appears on multiple pages. To update
              your links or copyright, search for "ft2" in this file and
              update ALL instances (there are 4 total: home, CV, blog
              list, and blog post pages).

              To ADD a link: Copy one of the <a> tags and change the
              href and text.
              To EDIT: Change the URL in href="..." and the link text.
              To change email: Search for "akashtrivedi30@gmail.com"
              in this file and update all instances.
              ============================================================ */}
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
          <div className="cvh"><div><h1 className="cvt">Curriculum Vitae</h1><div className="cvst">Akash Trivedi — Product Designer</div></div></div>
          <div className="cvpr" style={{position:"relative"}}><V top={0} left={0}/><V top={0} right={0}/><V bottom={0} left={0}/><V bottom={0} right={0}/><div><div className="cvpl">Experience</div><div className="cvpv">6+ years</div></div><div><div className="cvpl">Location</div><div className="cvpv">Bremen, Germany</div></div></div>
          <div className="cvs"><div className="cvsl">Experience</div>{EXP.map((e,i)=><div key={i} className="cve"><div className="cvep">{e.p}</div><div><div className="cver">{e.ti}</div><div className="cvec">{e.co}, {e.lo}</div><div className="cved">{e.d}</div></div></div>)}</div>
          <div className="cvs"><div className="cvsl">Education</div>{EDU.map((e,i)=><div key={i} className="cve"><div className="cvep">{e.p}</div><div><div className="cver">{e.ti}</div><div className="cvec">{e.ins}, {e.lo}</div>{e.d&&<div className="cved">{e.d}</div>}</div></div>)}</div>
          <div className="cvsk"><div className="cvsl">Skills & Knowledge</div><div className="cvsg">{SK.map((s,i)=><div key={i}><div className="cvskc">{s.c}</div>{s.items.map((it,j)=><div key={j} className="cvski">{it}</div>)}</div>)}</div></div>
          <div className="cva"><a className="cvdl wip-dl" title="Coming soon">↓ Download PDF</a><a className="cvcb" href="mailto:akashtrivedi30@gmail.com">✉ Get in touch</a></div>
          <div className="ft2" style={{marginTop:"clamp(40px,5vw,64px)"}}><span className="ftx">© 2026 Akash Trivedi</span><div style={{display:"flex",gap:20}}><a className="ftl" href="https://www.linkedin.com/in/kaa5h/" target="_blank" rel="noopener noreferrer">LinkedIn</a><a className="ftl" href="https://www.instagram.com/k445h/" target="_blank" rel="noopener noreferrer">Instagram</a></div></div>
        </div>}
        {pg==="blog"&&<div className="blp pd">
          <button className="pb" onClick={()=>nav("home")}><span className="pba">←</span> Home</button>
          {/* EDIT BLOG PAGE HEADING AND SUBTITLE BELOW */}
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
      {reqProj&&<div className="rm-backdrop" onClick={closeReq}><div className="rm" onClick={e=>e.stopPropagation()}>
        <button className="rm-close" onClick={closeReq}>×</button>
        {reqStatus==="sent"?<div className="rm-done">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--tl)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          <div className="rm-done-t">Request sent</div>
          <p className="rm-done-s">Thanks! I'll review your request and share the case study with you shortly.</p>
          <button className="rm-done-btn" onClick={closeReq}>Close</button>
        </div>:<>
          <div className="rm-h">
            <div className="rm-proj">{reqProj.n}</div>
            <h2 className="rm-t">Request Case Study</h2>
            <p className="rm-s">I'll send you the full case study including process, research, and design outcomes.</p>
          </div>
          <form className="rm-f" onSubmit={submitReq}>
            <label className="rm-l">Name<input className="rm-i" required value={reqForm.name} onChange={e=>setReqForm(f=>({...f,name:e.target.value}))} placeholder="Your name"/></label>
            <label className="rm-l">Work email<input className="rm-i" type="email" required value={reqForm.email} onChange={e=>setReqForm(f=>({...f,email:e.target.value}))} placeholder="you@company.com"/></label>
            <label className="rm-l">Company <span style={{color:"var(--f4)",fontWeight:400}}>(optional)</span><input className="rm-i" value={reqForm.company} onChange={e=>setReqForm(f=>({...f,company:e.target.value}))} placeholder="Company name"/></label>
            <button className="rm-btn" type="submit" disabled={reqStatus==="sending"}>{reqStatus==="sending"?"Sending...":"Send Request"}</button>
            {reqStatus==="error"&&<p className="rm-err">Something went wrong. Try emailing me at akashtrivedi30@gmail.com</p>}
          </form>
        </>}
      </div></div>}
    </div>
  );
}
