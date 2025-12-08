"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { PostMeta } from "@/lib/types";

export function EditorShell() {
  return (
    <Suspense fallback={<div className="px-6 py-16 text-slate-500">Loading...</div>}>
      <EditorClient />
    </Suspense>
  );
}

function EditorClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const key = searchParams.get("key") || "";
  const slugParam = searchParams.get("slug") || "";

  const [form, setForm] = useState({
    title: "",
    slug: "",
    summary: "",
    tags: "",
    content: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

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
      if (!slugParam) return;
      const res = await fetch(`/api/posts/${slugParam}`);
      if (!res.ok) return;
      const data = (await res.json()) as PostMeta & { content: string };
      setForm({
        title: data.title,
        slug: data.slug,
        summary: data.summary,
        tags: data.tags.join(", "),
        content: data.content ?? "",
      });
    }
    load();
  }, [key, router, slugParam]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    const payload = {
      title: form.title,
      slug: form.slug,
      summary: form.summary,
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      content: form.content,
    };
    const password = sessionStorage.getItem("neovoid_admin_pass") ?? "";
    const endpoint = slugParam ? "/api/admin/editPost" : "/api/admin/createPost";
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-key": key,
        "x-admin-password": password,
      },
      body: JSON.stringify(payload),
    });
    setLoading(false);
    if (res.ok) {
      setMessage("Saved");
      router.push(`/admin/dashboard?key=${encodeURIComponent(key)}`);
    } else {
      const data = await res.json();
      setMessage(data.error ?? "Error");
    }
  }

  return (
    <main className="bg-grid min-h-screen px-6 py-16">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-cyan-300/80">
              Admin
            </p>
            <h1 className="text-3xl font-semibold text-slate-50">
              {slugParam ? "Edit Post" : "New Post"}
            </h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Field
              label="Title"
              value={form.title}
              onChange={(v) => setForm((f) => ({ ...f, title: v }))}
            />
            <Field
              label="Slug"
              value={form.slug}
              onChange={(v) => setForm((f) => ({ ...f, slug: v }))}
              placeholder="auto-generated if blank"
            />
          </div>
          <Field
            label="Summary"
            value={form.summary}
            onChange={(v) => setForm((f) => ({ ...f, summary: v }))}
          />
          <Field
            label="Tags (comma separated)"
            value={form.tags}
            onChange={(v) => setForm((f) => ({ ...f, tags: v }))}
          />
          <div className="space-y-2">
            <label className="text-sm text-slate-300">Markdown Content</label>
            <textarea
              value={form.content}
              onChange={(e) =>
                setForm((f) => ({ ...f, content: e.target.value }))
              }
              rows={16}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-slate-100 outline-none focus:border-cyan-400/60"
            />
          </div>
          {message && <p className="text-sm text-cyan-200">{message}</p>}
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 text-sm font-semibold text-slate-50 shadow-[0_0_30px_-12px_#22d3ee] transition hover:brightness-110 disabled:opacity-60"
          >
            {loading ? "Saving..." : "Save Post"}
          </button>
        </form>
      </div>
    </main>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm text-slate-300">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-slate-100 outline-none focus:border-cyan-400/60"
      />
    </div>
  );
}
