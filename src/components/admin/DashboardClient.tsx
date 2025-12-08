"use client";

import Link from "next/link";
import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { PostMeta } from "@/lib/types";

export function DashboardShell() {
  return (
    <Suspense fallback={<div className="px-6 py-16 text-slate-500">Loading...</div>}>
      <DashboardClient />
    </Suspense>
  );
}

function DashboardClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const key = searchParams.get("key") || "";
  const [posts, setPosts] = useState<PostMeta[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const authed = sessionStorage.getItem("neovoid_admin") === "1";
    if (!key) {
      router.replace("/");
      return;
    }
    if (!authed) {
      router.replace(`/admin?key=${encodeURIComponent(key)}`);
      return;
    }
    async function load() {
      setLoading(true);
      const res = await fetch("/api/posts");
      try {
        if (!res.ok) {
          setError("Failed to load posts");
          setLoading(false);
          return;
        }
        const data = await res.json();
        setPosts(data);
        setError("");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [key, router]);

  return (
    <main className="bg-grid min-h-screen px-6 py-16">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-cyan-300/80">
              Admin
            </p>
            <h1 className="text-3xl font-semibold text-slate-50">Dashboard</h1>
          </div>
          <Link
            href={`/admin/editor?key=${encodeURIComponent(key)}`}
            className="rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 text-sm font-semibold text-slate-50 shadow-[0_0_30px_-12px_#22d3ee] transition hover:brightness-110"
          >
            New Post
          </Link>
        </div>

        <div className="card overflow-hidden p-0">
          <div className="grid grid-cols-5 gap-4 px-4 py-3 text-xs uppercase tracking-wide text-slate-400">
            <div className="col-span-2">Title</div>
            <div>Date</div>
            <div>Tags</div>
            <div className="text-right">Actions</div>
          </div>
          <div className="divide-y divide-white/5">
            {error && (
              <div className="px-4 py-3 text-sm text-rose-300">{error}</div>
            )}
            {loading && (
              <div className="px-4 py-3 text-sm text-slate-400">Loading...</div>
            )}
            {!loading && posts.length === 0 && (
              <div className="px-4 py-3 text-sm text-slate-400">
                No posts yet.
              </div>
            )}
            {posts.map((post) => (
              <div
                key={post.slug}
                className="grid grid-cols-5 gap-4 px-4 py-3 text-sm text-slate-200"
              >
                <div className="col-span-2 font-semibold">{post.title}</div>
                <div className="text-slate-400">
                  {new Date(post.date).toLocaleDateString()}
                </div>
                <div className="flex flex-wrap gap-1 text-cyan-200 text-xs">
                  {post.tags?.map((t) => (
                    <span key={t} className="chip text-[10px]">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex justify-end gap-2 text-xs">
                  <Link
                    href={`/admin/editor?key=${encodeURIComponent(
                      key
                    )}&slug=${post.slug}`}
                    className="rounded border border-white/10 px-3 py-1 hover:border-cyan-400/60"
                  >
                    Edit
                  </Link>
                  <DeleteButton
                    slug={post.slug}
                    onDone={() =>
                      setPosts((prev) => prev.filter((p) => p.slug !== post.slug))
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

function DeleteButton({
  slug,
  onDone,
}: {
  slug: string;
  onDone: () => void;
}) {
  const searchParams = useSearchParams();
  const key = searchParams.get("key") || "";
  const [confirm, setConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    setLoading(true);
    const password = sessionStorage.getItem("neovoid_admin_pass") ?? "";
    const res = await fetch("/api/admin/deletePost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-key": key,
        "x-admin-password": password,
      },
      body: JSON.stringify({ slug }),
    });
    setLoading(false);
    if (res.ok) {
      onDone();
      setConfirm(false);
    }
  }

  return confirm ? (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="rounded border border-rose-400/60 px-3 py-1 text-rose-200 hover:bg-rose-400/10"
    >
      {loading ? "Deleting..." : "Confirm"}
    </button>
  ) : (
    <button
      onClick={() => setConfirm(true)}
      className="rounded border border-white/10 px-3 py-1 hover:border-rose-400/60 hover:text-rose-200"
    >
      Delete
    </button>
  );
}
