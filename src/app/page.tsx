import Link from "next/link";
import { SiteNav } from "@/components/ui/SiteNav";

const nodes = [
  { href: "/portfolio", title: "Work", meta: "01", copy: "Products & systems", x: "50%", y: "4%" },
  { href: "/blog", title: "Notes", meta: "02", copy: "Build logs", x: "88%", y: "35%" },
  { href: "/team", title: "Team", meta: "03", copy: "People behind it", x: "76%", y: "83%" },
  { href: "/about", title: "About", meta: "04", copy: "The thinking", x: "24%", y: "83%" },
  { href: "/contact", title: "Contact", meta: "05", copy: "Open a channel", x: "12%", y: "35%" },
];

export default function Home() {
  return (
    <main className="bg-grid min-h-screen">
      <SiteNav />
      <div className="shell page">
        <section className="grid items-end gap-8 md:grid-cols-[1fr_auto]">
          <div>
            <p className="eyebrow"><span className="status-dot" /> Independent digital studio</p>
            <h1 className="display">We build in the<br /><span className="text-cyan-300">space between ideas.</span></h1>
            <p className="lede">Neovoid is a small, independent collective focused on thoughtful interfaces, useful systems, and experiments worth shipping.</p>
          </div>
          <div className="hidden pb-2 text-right md:block">
            <p className="section-label">System status</p>
            <p className="mt-2 font-mono text-xs text-slate-300">ONLINE / 2026</p>
          </div>
        </section>

        <div className="mt-10 divider" />

        <section className="hero-orbit" aria-label="Neovoid sections">
          <div className="orbit-line" />
          <div className="orbit-line two" />
          <div className="hero-core">
            <div className="text-center">
              <div className="hero-logo">N<span>V</span></div>
              <p className="mt-3 font-mono text-[9px] tracking-[.28em] text-slate-600">EXPLORE / BUILD / REPEAT</p>
            </div>
          </div>
          {nodes.map((node) => (
            <Link key={node.href} href={node.href} className="orbit-link" style={{ left: node.x, top: node.y, transform: "translate(-50%, -50%)" }}>
              <small>{node.meta}</small>
              <span className="font-medium">{node.title}</span>
              <small>{node.copy}</small>
            </Link>
          ))}
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <div className="card md:col-span-2">
            <p className="section-label">What we care about</p>
            <h2 className="mt-4 max-w-2xl text-2xl font-semibold tracking-tight text-slate-100">Less noise. Better systems. More room for curiosity.</h2>
          </div>
          <Link href="/contact" className="card group flex items-end justify-between">
            <div><p className="section-label">Have an idea?</p><p className="mt-3 text-lg font-medium text-slate-100">Open a channel</p></div>
            <span className="text-xl text-cyan-300 transition group-hover:translate-x-1">↗</span>
          </Link>
        </section>
      </div>
    </main>
  );
}
