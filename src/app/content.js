/* ========================================================================
   YOUR CONTENT — projects, blog posts, and the site's web addresses.
   =========================================================================
   This is the file to edit when adding or changing a project or blog post.
   It holds no layout or styling code, so it is safe to edit freely.
   The look of the site lives in Site.jsx.
   ======================================================================== */
const CDS_COMP="/comparisons/cds/index.html";
const CPE_COMP="/comparisons/cpe/index.html";

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
export const P = [
  { id:"cds",comp:CDS_COMP,img:"/projects/cds-overview.png",n:"Connectware Design System",co:"Connectware Design System",tl2:"Scaling design language for industrial IoT",d:"At Cybus, there was no shared design language when I joined. I got to build one from scratch — tokens, components, documentation, the whole thing.",ld:"Connectware had no design system. Every team was solving the same problems differently, so I started from first principles — type scale, spacing, color tokens, and a component library with APIs that actually make sense to developers.\n\nThe part I'm proudest of: every component has a 'context of use' section. Not just how it looks, but when you should reach for it and what breaks in production if you misuse it. Adoption went from around 40% to near-complete in two quarters. That felt good.",t:["Design Systems","Documentation"],tools:["Figma","Storybook","Notion"],y:"2024–25",r:"Design System Lead",c:"#1a1a1a" },
  { id:"cpe",comp:CPE_COMP,img:"/projects/cpe-overview.png",n:"Connectware Product Experience",co:"Connectware Product Experience",tl2:"Reshaping how industries manage IoT infrastructure",d:"I own the product design for Connectware — how industrial users monitor, configure, and manage their IoT infrastructure day to day.",ld:"When I picked this up, the interface had grown organically over three years. Lots of capable pieces, but no coherent thread tying them together. I started with contextual interviews on actual factory floors and talked to people across 12 client organizations.\n\nThe redesign brought device status, data flows, and configuration into one experience — with progressive disclosure so both plant engineers and IT admins feel at home. It's the kind of problem I really enjoy working on at Cybus.",t:["Product Design","Research"],tools:["Figma","Dovetail","Miro"],y:"2024–25",r:"Lead Product Designer",c:"#1a1a1a" },
  { id:"sds",img:"/projects/sds-overview.png",n:"Shyftplan Design System",co:"Shyftplan Design System",tl2:"Consistency across a fast-scaling workforce platform",d:"Shyftplan was shipping features fast, but the UI was drifting. I introduced a design system to bring it back together.",ld:"New features shipped weekly but patterns were diverging — buttons looked different on every page, spacing was inconsistent, and accessibility was an afterthought. I set up a structured system with foundational tokens, reusable components, and documentation people actually referred to.\n\nI worked closely with engineering to get WCAG 2.1 AA compliance across the board. Over time the system became the shared language between design and dev, which made everything move faster.",t:["Design Systems","Accessibility"],tools:["Figma","Storybook"],y:"2023–24",r:"UI/UX Designer",c:"#333336" },
  { id:"qm",img:"/projects/qm-overview.png",n:"Qualification Matrix",co:"Shyftplan Qualification Matrix",tl2:"Data-dense interface for workforce skill management",d:"A dense data problem — tracking employee qualifications, skills, and certifications so shift planners can actually see what they're working with.",ld:"In regulated industries, you can't just put anyone on any shift. Managers need to track qualifications, certifications, expiry dates — and they need to see all of it at once without drowning in it.\n\nI designed a matrix view that gives you skill coverage across teams at a glance. Progressive disclosure handles the details, and inline editing means you're not jumping between screens constantly. We validated it with operations managers, and the feedback was pretty clear — they'd been wanting something like this for a while.",t:["Product Design","Data Visualization"],tools:["Figma","Maze"],y:"2023",r:"UI/UX Designer",c:"#343434" },
  /* ADD NEW PROJECT HERE (copy a block above and paste it here) */
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
export const BL = [
  /* ADD NEW BLOG POST HERE (newest first) */
  {id:"b0",ti:"The Retro We Never Scheduled",dt:"Aug 2026",tg:["Ethics","Product Design"],rt:"7 min",bd:`An article has been sitting in my open tabs since April. Anna Katharina Schaffner wrote it for Psychology Today, and it's called **"Are We Programming Our Own Obsolescence?"** It's the kind of title you close the tab on, then don't.\n\nHer argument, roughly: progress is a story we tell, not a fact we observe. It rests on assumptions about what "better" means that most of us never examine, because the story feels like plain truth. She traces the attention economy turning into an outrage economy, and now into something she calls attachment hacking, where the product doesn't just take your time, it simulates caring about you. Underneath it all is a failure of incentive design. Measure success in growth and engagement, and you get systems built for growth and engagement. Everything else stays invisible, because nobody built a field for it.\n\nTristan Harris has a phrase she borrows. Coffin builders. People shipping the thing that will make them unnecessary, convinced they're doing good work.\n\nI've been designing software for six years. Writing this down mostly so I stop pretending the article didn't land.\n\n## Nobody sets out to build the bad thing\n\nThe people who built infinite scroll weren't villains. Pagination created a jarring stop and users bounced at page two. Infinite scroll tested better. It shipped. Everyone got a good review.\n\nPull-to-refresh came from a real interaction insight. Read receipts solved a real anxiety. Notification badges answered a legitimate question about what changed since you were last here.\n\nEvery one of those was defensible in the room where it was decided. The harm showed up at a scale and over a timeframe that no design review is built to see. That's what makes it hard to fix by being a better person. You can't out-ethic a system whose feedback loop only reports back on what you were already optimising for.\n\nI think about this with design systems, which I love working on. The whole value is that you decide something well once and it holds everywhere, without anyone re-arguing it every sprint. Which is exactly why it's worth being slow about the decisions going in. Consistency is a multiplier in both directions.\n\n## The efficiency story\n\nConsumer tech at least has the decency to be a bit embarrassed. Nobody puts "we exploit your dopamine response" on the pricing page.\n\nEnterprise software is more open about what it's for, because efficiency is the whole premise. Do the thing faster, with fewer errors, in fewer steps. And a lot of the time that is straightforwardly good. The tedious part of someone's job disappears and what's left is the part that needed a person in the first place. I've watched engineers get a whole afternoon back from something that used to be manual, and there's nothing complicated about that being a win.\n\nWhat Schaffner made me sit with is that "faster and with less effort" doesn't tell you where the saved effort goes. Sometimes it goes into better work. Sometimes it just goes. The story of progress as pure efficiency doesn't distinguish between those two outcomes, and I've never seen a metric that does either. That's a gap in how our whole industry talks about value, not something any one team invented.\n\n## The measurement problem is ours\n\nDesigners translate messy human situations into things a product org can act on. When someone says "we want this to be more efficient," somebody has to decide what that looks like on screen. That somebody is usually us.\n\nTask time is easy to measure. Clicks saved, errors avoided, steps removed. Whether someone finished their day feeling competent is not. So the measurable one gets the attention, not because anyone chose it over the other, but because it's the one that fits in a chart.\n\nI had "human-centered" on my process slides for years without once asking which human, or centered on what. It works as absolution. Say the words, question handled.\n\n## What's changed\n\nNot a process. I should be honest about that, because the tidy version of this post ends with three new habits and a nice bullet list, and I don't have one.\n\nWhat I have is a question. When I'm writing a spec, under the part about who this helps, I've started asking who pays for it. Most of the time the answer is nobody in particular and it takes ten seconds. Sometimes there's an answer and I don't love it, and I write it down anyway, early, while there's still room to design around it.\n\nThat's the whole thing. A line in a document.\n\nIt doesn't feel like enough. I keep waiting for the part where it becomes a framework and I can put it on a slide. But the spec is what outlives the meeting. Whatever gets written down carries forward, and whatever gets left out gets settled later with less room to think about it. So a line in a document isn't nothing either.\n\nSchaffner ends on Peter Thiel. In a New York Times interview last year, Ross Douthat asked him whether he would prefer the human race to endure. Thiel hesitated long enough that Douthat had to tell him he was hesitating, then had to ask a second time. He eventually said yes, with a qualification about transhumanism and radically solving the problem of having a body that ages and dies.\n\nI don't want to make this a dunk, because "billionaire says strange thing on podcast" is cheap and there's a lot of it about. The hesitation matters for a narrower reason.\n\nThiel isn't a commentator. He's an allocator. Founders Fund decides which companies get to exist long enough to have users. Palantir built its business selling analytical infrastructure to states and their security apparatus, which is to say it sells the ability to see people who did not ask to be seen. He wrote in 2009 that he no longer believed freedom and democracy were compatible, and he has funded accordingly ever since. He argued in Zero to One that competition is for losers and monopoly is the goal, a sensible position for an investor and a miserable one for anyone living inside the resulting market. When he wanted a publication gone, he quietly funded the litigation that ended it.\n\nNone of that is hidden or unusual. That's the part worth sitting with. Capital allocation is the highest-leverage design decision in the whole socio-technical system, and it happens years before anyone opens Figma. Someone decides which futures are fundable, and the rest of us do interaction design inside whichever one got the cheque. My "who pays" line works at the scale of a feature. His works at the scale of what gets built at all, and he's been unusually candid that he doesn't think that decision needs to route through anything as slow as a public.\n\nSo the hesitation isn't a slip. It's consistent. If people are a constraint to be engineered past rather than the reason for the engineering, pausing on that question is the honest reaction.\n\nMost designers and engineers I know would answer it instantly and mean it. That counts for something, but less than we'd like, because sincerity downstream doesn't rebalance incentives set upstream. Ten thousand reasonable decisions made inside someone else's premise still land roughly where the premise was pointing.\n\nThe thing about a retro is that it only counts if the next sprint is different.\n\n---\n\n*[Are We Programming Our Own Obsolescence?](https://www.psychologytoday.com/us/blog/the-art-of-self-improvement/202604/are-we-programming-our-own-obsolescence) by Anna Katharina Schaffner, Ph.D., Psychology Today, April 2026.*`},
  {id:"b1",ti:"What I learned building a design system for industrial software",dt:"Mar 2025",tg:["Design Systems"],rt:"6 min",bd:"When I started rebuilding the design system at Cybus, I assumed the hard part would be the components. I was wrong.\n\nThe hard part was governance. The biggest lesson: a design system isn't a library. It's a set of shared decisions."},
  {id:"b2",ti:"Progressive disclosure in complex tools",dt:"Jan 2025",tg:["UX","Interaction"],rt:"5 min",bd:"The more capable a tool is, the harder it is to use — unless you actively hide most of its capability.\n\nAt Cybus, we redesigned machine onboarding using layered progressive disclosure. Commissioning dropped from 45 to under 10 minutes."},
  {id:"b3",ti:"Everyone cares about good UX — it's just not always the priority",dt:"Nov 2024",tg:["UX","AI"],rt:"6 min",bd:"Nobody says they don't care about UX. But when shipping pressure hits, it's the first thing that gets negotiated away.\n\nI've been thinking about what it actually takes to keep UX on the table when AI features are moving fast and everyone wants to ship yesterday."},
  {id:"b4",ti:"Figma variables for our design token pipeline",dt:"Sep 2024",tg:["Design Systems"],rt:"4 min",bd:"Three sources of truth became one. Figma variables → JSON → CSS custom properties.\n\nAdjusting our neutral scale went from design decision to deployed code in 45 minutes."},
  {id:"b5",ti:"You won't fix it later — designing AI features right the first time",dt:"Jun 2024",tg:["AI","Product Design"],rt:"7 min",bd:"'We'll iterate on it' is the most dangerous sentence in product. Especially with AI features, where the first version trains user expectations.\n\nI've seen teams ship rough AI flows planning to polish later. Later never comes, and now you've set a baseline nobody asked for."},
];

/* ========================================================================
   URLS
   =========================================================================
   Each view has its own web address, so any page can be linked to:
     /                              home
     /blog                          the blog list
     /blog/some-post-title          a single blog post
     /cv                            the CV page
   A post's address comes from its title, so renaming a post changes its
   link. Old links to the renamed post will stop working.
   ======================================================================== */
export const slugify=(s)=>s.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
export const blogSlug=(p)=>slugify(p.ti);
/* view -> url */
export const pathFor=(pg,bp)=>pg==="blog"?"/blog":pg==="cv"?"/cv":pg==="blogPost"&&bp?`/blog/${blogSlug(bp)}`:"/";
/* url -> view. Returns null when the address matches nothing. */
export function viewFor(seg){
  const s=(seg||[]).filter(Boolean);
  if(s.length===0)return{pg:"home",bp:null};
  if(s.length===1&&s[0]==="cv")return{pg:"cv",bp:null};
  if(s.length===1&&s[0]==="blog")return{pg:"blog",bp:null};
  if(s.length===2&&s[0]==="blog"){const b=BL.find(p=>blogSlug(p)===s[1]);return b?{pg:"blogPost",bp:b}:null}
  return null;
}
