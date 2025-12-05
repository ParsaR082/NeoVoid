import Link from "next/link";
import { NeonDivider } from "@/components/ui/NeonDivider";

const links = [
  {
    href: "/portfolio",
    title: "Portfolio",
    copy: "Ops consoles, edge tools, prototypes.",
  },
  {
    href: "/blog",
    title: "Blog",
    copy: "Build logs, field notes, technical rants.",
  },
  {
    href: "/team",
    title: "Team",
    copy: "The humans behind Neovoid.",
    note: "Soon",
  },
  {
    href: "/about",
    title: "About",
    copy: "Why we exist; how we think.",
  },
  {
    href: "/contact",
    title: "Contact",
    copy: "Ping us; low-friction comms.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-grid">
      <div className="mx-auto flex max-w-5xl flex-col gap-12 px-6 py-16">
        <header className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-cyan-200/80">
            <span className="pill" aria-hidden />
            Neovoid Hub
          </div>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-50 md:text-5xl">
            Neovoid
          </h1>
          <p className="max-w-2xl text-slate-400">
            A minimal, sci-fi operations hub. Fast, quiet, intentional.
          </p>
          <NeonDivider />
        </header>

        <section className="grid gap-4 md:grid-cols-2">
          {links.map((item) => (
            <Link key={item.href} href={item.href} className="card group">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-50">
                  {item.title}
                </h3>
                <span className="text-xs text-cyan-300">
                  {item.note ?? "→"}
                </span>
              </div>
              <p className="text-sm text-slate-400 transition group-hover:text-slate-200">
                {item.copy}
              </p>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
