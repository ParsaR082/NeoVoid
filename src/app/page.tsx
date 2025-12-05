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
  const radius = 240;
  const positioned = links.map((item, index) => {
    const angle = (index / links.length) * 2 * Math.PI;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    return { ...item, x, y };
  });

  return (
    <main className="min-h-screen bg-grid">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 py-16">
        <header className="space-y-4 text-center md:text-left">
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

        <section className="relative mx-auto grid h-[28rem] w-full max-w-4xl place-items-center">
          <div className="relative flex h-64 w-64 items-center justify-center rounded-full border border-white/10 bg-white/5 shadow-[0_0_80px_-30px_#22d3ee]">
            <div className="text-6xl font-black tracking-[0.4em] text-slate-100">
              N<span className="text-cyan-300">V</span>
            </div>
            <div className="absolute inset-2 rounded-full border border-cyan-400/30 blur-[1px]" />
          </div>

          <div className="absolute inset-0 hidden md:block">
            {positioned.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                className="orbit-node group flex h-24 w-24 items-center justify-center rounded-full border border-white/10 bg-white/10 text-center text-sm font-semibold text-slate-100 shadow-[0_0_30px_-18px_#22d3ee] backdrop-blur transition-transform duration-200 hover:-translate-y-2 hover:scale-105 hover:border-cyan-400/60 hover:bg-white/20 hover:shadow-[0_0_50px_-20px_#22d3ee]"
                style={{
                  // CSS custom props consumed by orbit-node class
                  ["--x" as string]: `${item.x}px`,
                  ["--y" as string]: `${item.y}px`,
                  ["--delay" as string]: `${i * 0.25}s`,
                }}
              >
                <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_10px_#22d3ee]" />
                <span className="leading-tight">{item.title}</span>
              </Link>
            ))}
          </div>

          <div className="mt-8 flex w-full flex-wrap justify-center gap-3 md:hidden">
            {links.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="card flex-1 min-w-[140px] text-center text-sm font-semibold text-slate-100"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
