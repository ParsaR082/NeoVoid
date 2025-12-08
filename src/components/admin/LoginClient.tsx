"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function LoginShell() {
  return (
    <Suspense fallback={<div className="px-6 py-16 text-slate-500">Loading...</div>}>
      <LoginClient />
    </Suspense>
  );
}

function LoginClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const key = searchParams.get("key") || "";

  useEffect(() => {
    if (!key) {
      router.replace("/");
    }
  }, [key, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key, password }),
    });
    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Invalid credentials");
      return;
    }
    sessionStorage.setItem("neovoid_admin", "1");
    sessionStorage.setItem("neovoid_admin_pass", password);
    router.push(`/admin/dashboard?key=${encodeURIComponent(key)}`);
  }

  if (!key) return null;

  return (
    <main className="bg-grid min-h-screen flex items-center justify-center px-4">
      <div className="card w-full max-w-md space-y-6">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-cyan-300/80">
            Admin
          </p>
          <h1 className="text-2xl font-semibold text-slate-50">Sign In</h1>
          <p className="text-sm text-slate-400">
            Enter the admin password to continue.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block space-y-2 text-sm">
            <span className="text-slate-300">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-slate-100 outline-none focus:border-cyan-400/60"
              required
            />
          </label>
          {error && <p className="text-sm text-rose-400">{error}</p>}
          <button
            type="submit"
            className="w-full rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 text-sm font-semibold text-slate-50 shadow-[0_0_30px_-12px_#22d3ee] transition hover:brightness-110"
          >
            Continue
          </button>
        </form>
      </div>
    </main>
  );
}
