import Image from "next/image";
import Link from "next/link";

const members = [
  {
    id: "parsa",
    name: "Parsa",
    title: "Founder",
    blurb: "Designs and ships the Neovoid stack.",
    image: "", // add image URL here (e.g., /parsa.jpg or https://...)
  },
  {
    id: "mahdi",
    name: "Mahdi",
    title: "Co-Founder",
    blurb: "Designs and ships the Neovoid stack.",
    image: "", // add image URL here
  },
];

export default function PortfolioPage() {
  return (
    <div className="bg-grid min-h-screen">
      <div className="mx-auto max-w-5xl px-6 py-16 space-y-8">
        <header className="space-y-2">
          <p className="text-sm uppercase tracking-[0.2em] text-cyan-300/80">
            Portfolio
          </p>
          <h1 className="text-3xl font-semibold text-slate-50">
            Team Portfolios
          </h1>
          <p className="text-slate-400">
            Choose a member to view their work and experiments.
          </p>
        </header>

        <div className="grid gap-4 md:grid-cols-2">
          {members.map((member) => (
            <Link
              key={member.id}
              href={`/portfolio/${member.id}`}
              className="card group flex items-center gap-4"
            >
              <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full border border-white/10 bg-white/5">
                {member.image ? (
                  <Image
                    src={member.image}
                    alt={`${member.name} portrait`}
                    width={64}
                    height={64}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-cyan-500/40 to-purple-600/40 text-lg font-semibold text-slate-100">
                    {member.name.slice(0, 1)}
                  </div>
                )}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-slate-50">
                    {member.name}
                  </h3>
                  <span className="chip text-xs">{member.title}</span>
                </div>
                <p className="text-sm text-slate-400 group-hover:text-slate-200">
                  {member.blurb}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
