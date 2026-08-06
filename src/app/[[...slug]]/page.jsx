import { notFound } from "next/navigation";
import Site from "../Site";
import { BL, blogSlug, viewFor } from "../content";

/* ========================================================================
   WEB ADDRESSES (URLs)
   =========================================================================
   This file turns each view of the site into a real, linkable address and
   gives each blog post its own preview card when the link is shared.

   You do not normally need to edit this file. Adding a blog post to the
   BL list in Site.jsx is enough — its address and preview card are
   created automatically.
   ======================================================================== */

/* Only these addresses exist. Anything else shows the 404 page. */
export const dynamicParams = false;
export function generateStaticParams(){
  return [{slug:[]},{slug:["blog"]},{slug:["cv"]},...BL.map(p=>({slug:["blog",blogSlug(p)]}))];
}

/* First paragraph of the post, trimmed to a sensible preview length. */
const excerpt=(bd)=>{
  const first=bd.split("\n\n").find(b=>!b.startsWith("## ")&&b.trim()!=="---")||"";
  const clean=first.replace(/\*\*/g,"").replace(/\[([^\]]+)\]\([^)]+\)/g,"$1");
  return clean.length>155?clean.slice(0,152).trimEnd()+"…":clean;
};

export function generateMetadata({params}){
  const v=viewFor(params.slug);
  if(!v)return{};
  if(v.pg==="blogPost"){
    const d=excerpt(v.bp.bd);
    return{title:`${v.bp.ti} — Akash Trivedi`,description:d,
      alternates:{canonical:`/blog/${blogSlug(v.bp)}`},
      openGraph:{title:v.bp.ti,description:d,type:"article",publishedTime:v.bp.dt,tags:v.bp.tg,url:`/blog/${blogSlug(v.bp)}`},
      twitter:{card:"summary_large_image",title:v.bp.ti,description:d}};
  }
  if(v.pg==="blog")return{title:"Blog — Akash Trivedi",description:"Writing on design systems, UX, and building software people actually use.",alternates:{canonical:"/blog"}};
  if(v.pg==="cv")return{title:"CV — Akash Trivedi",description:"Experience, skills, and background.",alternates:{canonical:"/cv"}};
  return{alternates:{canonical:"/"}};
}

export default function Route({params}){
  const v=viewFor(params.slug);
  if(!v)notFound();
  return <Site initial={v}/>;
}
