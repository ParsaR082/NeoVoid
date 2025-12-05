import { getTeam } from "@/lib/fetchers";

export const revalidate = 60;

export default async function TeamPage() {
  const members = await getTeam();

  return (
    <div className="bg-grid min-h-screen">
      <div className="mx-auto max-w-4xl px-6 py-16 space-y-8">
        <header className="space-y-2">
          <p className="text-sm uppercase tracking-[0.2em] text-cyan-300/80">
            Team
          </p>
          <h1 className="text-3xl font-semibold text-slate-50">
            Humans of Neovoid
          </h1>
          <p className="text-slate-400">
            Profiles coming online. For now, reach out directly.
          </p>
        </header>

        <div className="space-y-3">
          {members.length === 0 && (
            <div className="card text-slate-400">
              Coming soon. Seed KV with `team:index` and `team:member:{id}`.
            </div>
          )}

          {members.map((member) => (
            <article key={member.id} className="card space-y-2">
              <div className="flex items-center gap-2">
                <span className="pill" aria-hidden />
                <div>
                  <h3 className="text-lg font-semibold text-slate-50">
                    {member.name}
                  </h3>
                  <p className="text-sm text-cyan-200">{member.role}</p>
                </div>
              </div>
              {member.bio && (
                <p className="text-sm text-slate-400">{member.bio}</p>
              )}
              {member.links && (
                <div className="flex flex-wrap gap-3 text-sm text-cyan-300">
                  {Object.entries(member.links).map(([label, url]) => (
                    <a
                      key={label}
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      className="underline decoration-dotted underline-offset-4 hover:text-cyan-200"
                    >
                      {label}
                    </a>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
