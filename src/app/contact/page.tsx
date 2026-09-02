import { SiteNav } from "@/components/ui/SiteNav";

export const metadata = { title: "Contact — Neovoid" };

const contacts = [
  { label: "Email", value: "neovoid.team@gmail.com", href: "mailto:neovoid.team@gmail.com", icon: "@" },
  { label: "X", value: "@neovoid", href: "https://x.com", icon: "X" },
  { label: "GitHub", value: "neovoid", href: "https://github.com", icon: "⌘" },
];

export default function ContactPage() {
  return (
    <main className="bg-grid min-h-screen">
      <SiteNav />
      <div className="shell page">
        <header className="max-w-2xl">
          <p className="eyebrow"><span className="status-dot" /> Communication channel</p>
          <h1 className="display">Let&apos;s make<br /><span className="text-cyan-300">something useful.</span></h1>
          <p className="lede">Have a product idea, a technical problem, or simply want to talk? Pick a channel. No forms, no ceremony.</p>
        </header>
        <section className="mt-14 grid gap-3">
          {contacts.map((item) => (
            <a key={item.label} href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noreferrer" : undefined} className="card group flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-white/[.03] font-mono text-xs text-cyan-300">{item.icon}</span>
                <div><p className="section-label">{item.label}</p><p className="mt-1 text-base font-medium text-slate-100">{item.value}</p></div>
              </div>
              <span className="text-lg text-slate-600 transition group-hover:translate-x-1 group-hover:text-cyan-300">↗</span>
            </a>
          ))}
        </section>
      </div>
    </main>
  );
}
