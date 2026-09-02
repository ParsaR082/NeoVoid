import Image from "next/image";
import Link from "next/link";
import { SiteNav } from "@/components/ui/SiteNav";

const members = [
  { id: "parsa", name: "Parsa", title: "Founder", blurb: "Full-stack development, product systems and the Neovoid stack.", image: "" },
  { id: "mahdi", name: "Mahdi", title: "Co-Founder", blurb: "Building the team, ideas and systems behind the studio.", image: "" },
];

export const metadata = { title: "Work — Neovoid" };

export default function PortfolioPage() {
  return (
    <main className="bg-grid min-h-screen">
      <SiteNav />
      <div className="shell page">
        <header className="max-w-2xl">
          <p className="eyebrow"><span className="status-dot" /> Selected work</p>
          <h1 className="display">Built by<br /><span className="text-cyan-300">real humans.</span></h1>
          <p className="lede">Explore the people, projects and technical experiments that make up Neovoid.</p>
        </header>
        <section className="mt-14 grid gap-4 md:grid-cols-2">
          {members.map((member, index) => (
            <Link key={member.id} href={`/portfolio/${member.id}`} className="card group min-h-72">
              <div className="flex items-start justify-between">
                <span className="font-mono text-xs text-slate-600">0{index + 1}</span>
                <span className="text-slate-600 transition group-hover:text-cyan-300">↗</span>
              </div>
              <div className="mt-16 flex items-center gap-4">
                <div className="h-14 w-14 overflow-hidden rounded-xl border border-white/10 bg-white/[.03]">
                  {member.image ? <Image src={member.image} alt={`${member.name} portrait`} width={56} height={56} className="h-full w-full object-cover" /> : <div className="grid h-full w-full place-items-center font-mono text-lg text-cyan-300">{member.name[0]}</div>}
                </div>
                <div><p className="text-xl font-semibold text-slate-100">{member.name}</p><p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-cyan-300/70">{member.title}</p></div>
              </div>
              <p className="mt-5 text-sm leading-6 text-slate-500 transition group-hover:text-slate-400">{member.blurb}</p>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
