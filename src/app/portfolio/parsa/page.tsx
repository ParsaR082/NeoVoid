import { getProjects } from "@/lib/fetchers";

export const revalidate = 30;

const staticProjects = [
  {
    id: "school-grade-management",
    title: "School Grade Management System",
    summary:
      "Complete Next.js web app covering front-end, back-end, and database with clean, user-friendly design tailored to real school needs.",
    tech: ["Next.js", "TypeScript", "PostgreSQL"],
    status: "shipped",
    links: {},
  },
  {
    id: "task-manager-oauth",
    title: "Task Manager with Google OAuth",
    summary:
      "Task management system with Google OAuth, built for speed and simplicity across front-end and back-end.",
    tech: ["Next.js", "OAuth", "API Routes"],
    status: "shipped",
    links: {},
  },
  {
    id: "social-analytics-dashboard",
    title: "Social Media Analytics Dashboard",
    summary:
      "Full-stack Next.js dashboard for social performance with smooth UX and clean data visualization.",
    tech: ["Next.js", "Tailwind", "Charts"],
    status: "prototype",
    links: {},
  },
  {
    id: "bugfix-refactors",
    title: "Bug Fixing & Improvement Projects",
    summary:
      "Client engagements focused on bug fixing, performance improvements, feature upgrades, and refactoring for stability.",
    tech: ["Node.js", "Next.js", "Perf"],
    status: "shipped",
    links: {},
  },
];

const skills = {
  "Front-end": ["Next.js", "React", "Tailwind CSS", "TypeScript"],
  "Back-end": [
    "Node.js",
    "API development",
    "System design",
    "Authentication & sessions",
    "Next.js API routes",
  ],
  Databases: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Supabase"],
  "DevOps & Tools": [
    "Git / GitHub",
    "Docker",
    "Linux",
    "Server management & deployment",
  ],
};

export default async function ParsaPortfolio() {
  const dynamicProjects = await getProjects();
  const projects = dynamicProjects.length ? dynamicProjects : staticProjects;

  return (
    <div className="bg-grid min-h-screen">
      <div className="mx-auto max-w-5xl px-6 py-16 space-y-10">
        <header className="space-y-4">
          <p className="text-sm uppercase tracking-[0.2em] text-cyan-300/80">
            Portfolio — Parsa
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-slate-50">
                Parsa · Founder
              </h1>
              <p className="text-slate-400">
                Senior Computer Engineering student and full-stack developer
                specializing in Next.js. Fast learner and relentless
                problem-solver.
              </p>
            </div>
            <div className="h-20 w-20 overflow-hidden rounded-full border border-white/10 bg-white/5">
              {/* Add your portrait here (e.g., next/image) */}
            </div>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-2">
          <div className="card space-y-2">
            <h2 className="text-lg font-semibold text-slate-50">About</h2>
            <p className="text-sm text-slate-300">
              I&apos;m a senior Computer Engineering student and full-stack
              developer specializing in Next.js. I learn extremely fast, and I
              don&apos;t stop until every bug is fixed. Building NeoVoid to
              deliver larger, more creative, and impactful products—full-stack
              is the long-term path I&apos;m committed to mastering.
            </p>
          </div>
          <div className="card space-y-2">
            <h2 className="text-lg font-semibold text-slate-50">Goals</h2>
            <p className="text-sm text-slate-300">
              Grow NeoVoid, take on advanced projects, and push toward complex,
              scalable systems. Build a strong, creative team while honing
              full-stack depth.
            </p>
          </div>
        </section>

        <section className="card space-y-4">
          <h2 className="text-lg font-semibold text-slate-50">Skills</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {Object.entries(skills).map(([category, items]) => (
              <div key={category} className="space-y-2">
                <p className="text-sm font-medium text-cyan-200">{category}</p>
                <div className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <span key={item} className="chip text-xs">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="pill" aria-hidden />
            <h2 className="text-lg font-semibold text-slate-50">Projects</h2>
          </div>
          {projects.length === 0 && (
            <div className="card text-slate-400">
              No projects yet. Seed Upstash Redis keys to populate this page.
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
        </section>
      </div>
    </div>
  );
}
