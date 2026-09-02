"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function LoginShell() {
  return <Suspense fallback={<div className="bg-grid min-h-screen" />}><LoginClient /></Suspense>;
}

function LoginClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const key = searchParams.get("key") || "";

  useEffect(() => { if (!key) router.replace("/"); }, [key, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setError("");
    const res = await fetch("/api/admin/auth", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ key, password }) });
    if (!res.ok) { const data = await res.json(); setError(data.error ?? "Invalid credentials"); return; }
    sessionStorage.setItem("neovoid_admin", "1");
    sessionStorage.setItem("neovoid_admin_pass", password);
    router.push(`/admin/dashboard?key=${encodeURIComponent(key)}`);
  }

  if (!key) return null;
  return (
    <main className="bg-grid flex min-h-screen items-center justify-center px-5">
      <div className="w-full max-w-md">
        <div className="mb-8 flex items-center gap-3"><span className="brand-mark">NV</span><span className="brand-name">NEOVOID / ADMIN</span></div>
        <div className="card p-7">
          <p className="eyebrow"><span className="status-dot" /> Restricted area</p>
          <h1 className="mt-4 text-2xl font-semibold tracking-tight text-slate-100">Welcome back.</h1>
          <p className="mt-2 text-sm leading-6 text-slate-500">Authenticate to manage published notes.</p>
          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <label className="block space-y-2"><span className="section-label">Password</span><input autoFocus type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" required /></label>
            {error && <p className="text-sm text-rose-300">{error}</p>}
            <button type="submit" className="primary-btn w-full">Enter console <span>→</span></button>
          </form>
        </div>
        <p className="mt-5 text-center font-mono text-[9px] uppercase tracking-widest text-slate-700">Private console / Neovoid</p>
      </div>
    </main>
  );
}
