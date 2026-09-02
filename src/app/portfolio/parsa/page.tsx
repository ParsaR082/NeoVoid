import Link from "next/link";
import { SiteNav } from "@/components/ui/SiteNav";
import { getProjects } from "@/lib/fetchers";

export const revalidate = 30;
export const metadata = { title: "Parsa — Portfolio" };

const staticProjects = [
  { id: "school-grade-management", title: "School Grade Management System", summary: "A complete web application covering front-end, back-end and database workflows for real school needs.", tech: ["Next.js", "TypeScript", "PostgreSQL"], status: "shipped", links: {} },
  { id: "task-manager-oauth", title: "Task Manager with Google OAuth", summary: "A focused task management system built around speed, authentication and simplicity.", tech: ["Next.js", "OAuth", "API Routes"], status: "shipped", links: {} },
  { id: "social-analytics-dashboard", title: "Social Media Analytics Dashboard", summary: "A full-stack dashboard exploring data visualization and smooth interaction patterns.", tech: ["Next.js", "Tailwind", "Charts"], status: "prototype", links: {} },
  { id: "bugfix-refactors", title: "Bug Fixing & Improvement Projects", summary: "Client work focused on stability, performance, refactoring and feature upgrades.", tech: ["Node.js", "Next.js", "Performance"], status: "shipped", links: {} },
];

const skills = {
  "Front-end": ["Next.js", "React", "Tailwind CSS", "TypeScript"],
  "Back-end": ["Node.js", "API development", "System design", "Authentication"],
  Databases: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Supabase"],
  "DevOps & Tools": ["Git / GitHub", "Docker", "Linux", "Deployment"],
};

export default async function ParsaPortfolio() {
  const dynamicProjects = await getProjects();
  const projects = dynamicProjects.length ? dynamicProjects : staticProjects;
  return (
    <main className="bg-grid min-h-screen">
      <SiteNav />
      <div className="shell page">
        <Link href="/portfolio" className="font-mono text-[10px] uppercase tracking-[.16em] text-slate-600 hover:text-cyan-300">← All people</Link>
        <header className="mt-12 grid gap-8 md:grid-cols-[1fr_220px] md:items-end">
          <div><p className="eyebrow"><span className="status-dot" /> Founder / Full-stack</p><h1 className="display">Parsa<span className="text-cyan-300">.</span></h1><p className="lede">Full-stack developer focused on Next.js, product systems and solving difficult problems without adding unnecessary complexity.</p></div>
          <div className="card hidden aspect-square items-end md:flex"><span className="font-mono text-[10px] uppercase tracking-widest text-slate-600">Portrait / pending</span></div>
        </header>

        <section className="mt-16 grid gap-4 md:grid-cols-2">
          <div className="card"><p className="section-label">About</p><p className="mt-5 text-sm leading-7 text-slate-400">I build full-stack products and enjoy working across interfaces, APIs, databases and deployment. Neovoid is the place where those skills can grow into larger, more creative systems.</p></div>
          <div className="card"><p className="section-label">Direction</p><p className="mt-5 text-sm leading-7 text-slate-400">Grow Neovoid, take on increasingly complex projects, and build a strong technical team around thoughtful software.</p></div>
        </section>

        <section className="mt-4 card"><p className="section-label">Stack</p><div className="mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-4">{Object.entries(skills).map(([category, items]) => <div key={category}><p className="text-sm font-medium text-slate-200">{category}</p><div className="mt-3 flex flex-wrap gap-2">{items.map((item) => <span key={item} className="chip">{item}</span>)}</div></div>)}</div></section>

        <section className="mt-16"><div className="flex items-end justify-between"><div><p className="section-label">Selected projects</p><h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-100">Things I&apos;ve shipped.</h2></div><span className="font-mono text-[10px] text-slate-600">{String(projects.length).padStart(2, "0")} PROJECTS</span></div>
          <div className="project-grid">{projects.map((item, index) => <article key={item.id} className="card project-card"><div><p className="project-number">PROJECT / {String(index + 1).padStart(2, "0")}</p><h3 className="project-title">{item.title}</h3><p className="project-copy">{item.summary}</p></div><div className="mt-6 flex flex-wrap gap-2">{item.tech?.map((t) => <span key={t} className="chip">{t}</span>)}</div></article>)}</div>
        </section>
      </div>
    </main>
  );
}
