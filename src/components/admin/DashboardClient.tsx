"use client";

import Link from "next/link";
import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { PostMeta } from "@/lib/types";

export function DashboardShell() { return <Suspense fallback={<div className="bg-grid min-h-screen" />}><DashboardClient /></Suspense>; }

function DashboardClient() {
  const searchParams = useSearchParams(); const router = useRouter(); const key = searchParams.get("key") || "";
  const [posts, setPosts] = useState<PostMeta[]>([]); const [loading, setLoading] = useState(true); const [error, setError] = useState("");
  useEffect(() => {
    const authed = sessionStorage.getItem("neovoid_admin") === "1";
    if (!key) { router.replace("/"); return; } if (!authed) { router.replace(`/admin?key=${encodeURIComponent(key)}`); return; }
    async function load() { setLoading(true); const res = await fetch("/api/posts"); try { if (!res.ok) { setError("Failed to load posts"); return; } setPosts(await res.json()); setError(""); } finally { setLoading(false); } }
    load();
  }, [key, router]);

  return (
    <main className="bg-grid min-h-screen px-5 py-10 md:px-8 md:py-14">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-5 border-b border-white/10 pb-7">
          <div><p className="eyebrow"><span className="status-dot" /> Neovoid console</p><h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-100">Content dashboard</h1><p className="mt-2 text-sm text-slate-500">Manage your field notes.</p></div>
          <Link href={`/admin/editor?key=${encodeURIComponent(key)}`} className="primary-btn">+ New post</Link>
        </div>
        <div className="mt-8 overflow-hidden rounded-xl border border-white/10 bg-black/10">
          <div className="hidden grid-cols-[1fr_130px_220px_150px] gap-4 border-b border-white/10 px-5 py-3 font-mono text-[9px] uppercase tracking-widest text-slate-600 md:grid"><div>Title</div><div>Date</div><div>Tags</div><div className="text-right">Actions</div></div>
          {error && <div className="px-5 py-4 text-sm text-rose-300">{error}</div>}{loading && <div className="px-5 py-5 text-sm text-slate-500">Loading posts…</div>}{!loading && posts.length === 0 && <div className="px-5 py-8 text-sm text-slate-500">No posts yet.</div>}
          {posts.map((post) => <div key={post.slug} className="grid gap-4 border-b border-white/5 px-5 py-4 md:grid-cols-[1fr_130px_220px_150px] md:items-center"><div className="font-medium text-slate-200">{post.title}</div><div className="font-mono text-[10px] text-slate-600">{new Date(post.date).toLocaleDateString()}</div><div className="flex flex-wrap gap-1">{post.tags?.map((t) => <span key={t} className="chip">{t}</span>)}</div><div className="flex justify-start gap-2 md:justify-end"><Link href={`/admin/editor?key=${encodeURIComponent(key)}&slug=${post.slug}`} className="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-slate-300 hover:border-cyan-400/40 hover:text-cyan-200">Edit</Link><DeleteButton slug={post.slug} onDone={() => setPosts((prev) => prev.filter((p) => p.slug !== post.slug))} /></div></div>)}
        </div>
      </div>
    </main>
  );
}

function DeleteButton({ slug, onDone }: { slug: string; onDone: () => void }) {
  const searchParams = useSearchParams(); const key = searchParams.get("key") || ""; const [confirm, setConfirm] = useState(false); const [loading, setLoading] = useState(false);
  async function handleDelete() { setLoading(true); const password = sessionStorage.getItem("neovoid_admin_pass") ?? ""; const res = await fetch("/api/admin/deletePost", { method: "POST", headers: { "Content-Type": "application/json", "x-admin-key": key, "x-admin-password": password }, body: JSON.stringify({ slug }) }); setLoading(false); if (res.ok) { onDone(); setConfirm(false); } }
  return confirm ? <button onClick={handleDelete} disabled={loading} className="rounded-lg border border-rose-400/40 px-3 py-1.5 text-xs text-rose-300 hover:bg-rose-400/10">{loading ? "Deleting…" : "Confirm"}</button> : <button onClick={() => setConfirm(true)} className="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-slate-500 hover:border-rose-400/40 hover:text-rose-300">Delete</button>;
}
