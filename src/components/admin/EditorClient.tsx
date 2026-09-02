"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { PostMeta } from "@/lib/types";

export function EditorShell() { return <Suspense fallback={<div className="bg-grid min-h-screen" />}><EditorClient /></Suspense>; }

function EditorClient() {
  const searchParams = useSearchParams(); const router = useRouter(); const key = searchParams.get("key") || ""; const slugParam = searchParams.get("slug") || "";
  const [form, setForm] = useState({ title:"", slug:"", summary:"", tags:"", content:"" }); const [loading,setLoading]=useState(false); const [message,setMessage]=useState("");
  useEffect(() => {
    const authed = sessionStorage.getItem("neovoid_admin") === "1"; if (!key) { router.replace("/"); return; } if (!authed) { router.replace(`/admin?key=${encodeURIComponent(key)}`); return; }
    async function load() { if (!slugParam) return; const res = await fetch(`/api/posts/${slugParam}`); if (!res.ok) return; const data=(await res.json()) as PostMeta & {content:string}; setForm({title:data.title,slug:data.slug,summary:data.summary,tags:data.tags.join(", "),content:data.content??""}); }
    load();
  }, [key,router,slugParam]);
  async function handleSubmit(e: React.FormEvent) { e.preventDefault(); setLoading(true); setMessage(""); const payload={title:form.title,slug:form.slug,summary:form.summary,tags:form.tags.split(",").map(t=>t.trim()).filter(Boolean),content:form.content}; const password=sessionStorage.getItem("neovoid_admin_pass")??""; const endpoint=slugParam?"/api/admin/editPost":"/api/admin/createPost"; const res=await fetch(endpoint,{method:"POST",headers:{"Content-Type":"application/json","x-admin-key":key,"x-admin-password":password},body:JSON.stringify(payload)}); setLoading(false); if(res.ok){setMessage("Saved");router.push(`/admin/dashboard?key=${encodeURIComponent(key)}`);}else{const data=await res.json();setMessage(data.error??"Error");} }
  return (
    <main className="bg-grid min-h-screen px-5 py-10 md:px-8 md:py-14"><div className="mx-auto max-w-5xl">
      <div className="flex items-end justify-between border-b border-white/10 pb-7"><div><p className="eyebrow"><span className="status-dot" /> Editor</p><h1 className="mt-3 text-3xl font-semibold text-slate-100">{slugParam?"Edit note":"New note"}</h1></div><button type="button" onClick={()=>router.push(`/admin/dashboard?key=${encodeURIComponent(key)}`)} className="text-xs text-slate-500 hover:text-slate-200">Cancel</button></div>
      <form onSubmit={handleSubmit} className="mt-8 space-y-5"><div className="grid gap-5 md:grid-cols-2"><Field label="Title" value={form.title} onChange={v=>setForm(f=>({...f,title:v}))}/><Field label="Slug" value={form.slug} onChange={v=>setForm(f=>({...f,slug:v}))} placeholder="auto-generated if blank"/></div><Field label="Summary" value={form.summary} onChange={v=>setForm(f=>({...f,summary:v}))}/><Field label="Tags · comma separated" value={form.tags} onChange={v=>setForm(f=>({...f,tags:v}))}/><div className="space-y-2"><label className="section-label">Markdown content</label><textarea value={form.content} onChange={e=>setForm(f=>({...f,content:e.target.value}))} rows={20} className="form-control min-h-80 resize-y font-mono text-sm leading-6"/></div><div className="flex items-center gap-4">{message&&<p className="text-sm text-cyan-300">{message}</p>}<button type="submit" disabled={loading} className="primary-btn">{loading?"Saving…":"Save note"} <span>→</span></button></div></form>
    </div></main>
  );
}
function Field({label,value,onChange,placeholder}:{label:string;value:string;onChange:(v:string)=>void;placeholder?:string}) { return <div className="space-y-2"><label className="section-label">{label}</label><input value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} className="form-control"/></div>; }
