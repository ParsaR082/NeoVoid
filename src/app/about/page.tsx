import Link from "next/link";
import { SiteNav } from "@/components/ui/SiteNav";

const principles = [
  ["01", "Simplicity", "Technology should feel effortless. We remove the unnecessary so the important parts can breathe."],
  ["02", "Intentionality", "Every decision has a reason — from architecture and interaction to the smallest visual detail."],
  ["03", "Exploration", "We keep experimenting. Prototypes, tools, systems and ideas are all part of the process."],
];

export const metadata = { title: "About — Neovoid" };

export default function AboutPage() {
  return (
    <main className="bg-grid min-h-screen">
      <SiteNav />
      <div className="shell page">
        <header className="max-w-3xl">
          <p className="eyebrow"><span className="status-dot" /> About Neovoid</p>
          <h1 className="display">A quiet place<br />for <span className="text-cyan-300">good ideas.</span></h1>
          <p className="lede">Neovoid is an independent collective built around a simple belief: digital products get better when technology, design and curiosity are given equal space.</p>
        </header>

        <section className="mt-16 grid gap-4 md:grid-cols-3">
          {principles.map(([num, title, body]) => (
            <article key={num} className="card min-h-56">
              <p className="font-mono text-xs text-slate-600">{num}</p>
              <h2 className="mt-12 text-xl font-semibold text-slate-100">{title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-400">{body}</p>
            </article>
          ))}
        </section>

        <section className="mt-4 grid gap-4 md:grid-cols-[1.35fr_.65fr]">
          <div className="card">
            <p className="section-label">Our focus</p>
            <div className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {["Web applications", "Minimal UI systems", "Creative tools", "Digital experiments", "Full-stack systems", "Collaborative products"].map((item, i) => (
                <div key={item} className="flex items-center gap-3 border-b border-white/5 pb-3 text-sm text-slate-300">
                  <span className="font-mono text-[10px] text-cyan-400/70">0{i + 1}</span>{item}
                </div>
              ))}
            </div>
          </div>
          <div className="card flex flex-col justify-between">
            <div><p className="section-label">Next</p><p className="mt-5 text-2xl font-semibold tracking-tight text-slate-100">Keep building. Keep learning.</p></div>
            <Link href="/contact" className="mt-10 text-sm text-cyan-300 hover:text-cyan-200">Talk to us <span>↗</span></Link>
          </div>
        </section>
      </div>
    </main>
  );
}
