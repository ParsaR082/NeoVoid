import { getProjects } from "@/lib/fetchers";

export const revalidate = 30;

export default async function PortfolioPage() {
  const projects = await getProjects();

  return (
    <div className="bg-grid min-h-screen">
      <div className="mx-auto max-w-5xl px-6 py-16 space-y-8">
        <header className="space-y-2">
          <p className="text-sm uppercase tracking-[0.2em] text-cyan-300/80">
            Portfolio
          </p>
          <h1 className="text-3xl font-semibold text-slate-50">
            Builds & Ops Consoles
          </h1>
          <p className="text-slate-400">
            Selected work: edge tooling, dashboards, prototypes.
          </p>
        </header>

        <div className="grid gap-4 md:grid-cols-2">
          {projects.length === 0 && (
            <div className="card text-slate-400">
              No projects yet. Seed Vercel KV to populate the grid.
            </div>
          )}

          {projects.map((item) => (
            <article key={item.id} className="card space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="pill" aria-hidden />
                  <h3 className="text-lg font-semibold text-slate-50">
                    {item.title}
                  </h3>
                </div>
                {item.status && (
                  <span className="chip text-xs capitalize">{item.status}</span>
                )}
              </div>
              <p className="text-sm text-slate-400">{item.summary}</p>
              {item.tech && (
                <div className="flex flex-wrap gap-2 text-xs text-cyan-200">
                  {item.tech.map((t) => (
                    <span key={t} className="chip">
                      {t}
                    </span>
                  ))}
                </div>
              )}
              {item.links && (
                <div className="flex flex-wrap gap-3 text-sm text-cyan-300">
                  {Object.entries(item.links).map(([label, url]) => (
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
