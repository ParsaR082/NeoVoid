import { SiteNav } from "@/components/ui/SiteNav";
import { getTeam } from "@/lib/fetchers";

export const revalidate = 60;
export const metadata = { title: "Team — Neovoid" };

export default async function TeamPage() {
  const members = await getTeam();
  return (
    <main className="bg-grid min-h-screen">
      <SiteNav />
      <div className="shell page">
        <header className="max-w-2xl">
          <p className="eyebrow"><span className="status-dot" /> The people</p>
          <h1 className="display">Small team.<br /><span className="text-cyan-300">Big curiosity.</span></h1>
          <p className="lede">Neovoid is intentionally small. Different strengths, shared standards, and a habit of asking better questions.</p>
        </header>
        <section className="mt-14 space-y-3">
          {members.length === 0 && <div className="card text-sm text-slate-500">Team profiles are coming online.</div>}
          {members.map((member, index) => (
            <article key={member.id} className="card grid gap-5 md:grid-cols-[64px_1fr_auto] md:items-center">
              <div className="grid h-14 w-14 place-items-center rounded-xl border border-white/10 bg-white/[.03] font-mono text-lg text-cyan-300">{member.name[0]}</div>
              <div><div className="flex flex-wrap items-center gap-3"><h2 className="text-lg font-semibold text-slate-100">{member.name}</h2><span className="chip">{member.role}</span></div>{member.bio && <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">{member.bio}</p>}</div>
              <div className="font-mono text-[10px] text-slate-600">MEMBER / {String(index + 1).padStart(2, "0")}</div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
