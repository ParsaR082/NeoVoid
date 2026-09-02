import Link from "next/link";
import { SiteNav } from "@/components/ui/SiteNav";

export const metadata = { title: "Mahdi — Portfolio" };

export default function MahdiPortfolio() {
  return (
    <main className="bg-grid min-h-screen">
      <SiteNav />
      <div className="shell page">
        <Link href="/portfolio" className="font-mono text-[10px] uppercase tracking-[.16em] text-slate-600 hover:text-cyan-300">← All people</Link>
        <header className="mt-12 max-w-3xl">
          <p className="eyebrow"><span className="status-dot" /> Co-founder</p>
          <h1 className="display">Mahdi<span className="text-cyan-300">.</span></h1>
          <p className="lede">A co-founder at Neovoid. This profile is intentionally lightweight while the team portfolio is being built out.</p>
        </header>
        <section className="mt-14 card max-w-3xl"><p className="section-label">Profile status</p><p className="mt-5 text-sm leading-7 text-slate-400">More work, projects and links will appear here as the public portfolio comes online.</p></section>
      </div>
    </main>
  );
}
