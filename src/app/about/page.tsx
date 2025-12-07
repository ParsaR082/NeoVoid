export const metadata = {
  title: "About -- Neovoid",
};

const principles = [
  {
    title: "Simplicity",
    body: "Technology should feel effortless. We strip away the unnecessary to build focused, minimal, intuitive experiences.",
  },
  {
    title: "Intentional Design",
    body: "Every detail matters -- from architecture to visuals -- so the whole feels unified and meaningful.",
  },
  {
    title: "Constant Exploration",
    body: "We never stop experimenting. Neovoid is a space for prototypes, ideas in motion, and digital worlds that do not exist yet.",
  },
];

const focuses = [
  "Web development and digital interfaces",
  "Minimal UI/UX systems",
  "Creative tools and micro-products",
  "Concept-driven experiments",
  "Team-driven collaborative projects",
];

export default function AboutPage() {
  return (
    <div className="bg-grid min-h-screen">
      <div className="mx-auto max-w-4xl px-6 py-16 space-y-8">
        <header className="space-y-3">
          <p className="text-sm uppercase tracking-[0.2em] text-cyan-300/80">
            About
          </p>
          <h1 className="text-4xl font-semibold text-slate-50">Neovoid</h1>
          <p className="max-w-3xl text-slate-300">
            Neovoid is a small, independent collective built to craft digital experiences that are clean,
            thoughtful, and curious. We value exploration over perfection, learning over ego, and creativity over noise.
          </p>
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          {principles.map((p) => (
            <div key={p.title} className="card space-y-2">
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">
                {p.title}
              </p>
              <p className="text-sm text-slate-300">{p.body}</p>
            </div>
          ))}
        </section>

        <section className="card space-y-3">
          <h2 className="text-lg font-semibold text-slate-50">What We Do</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-sm text-slate-300">
            {focuses.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="pill" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <div className="card space-y-2">
            <h3 className="text-lg font-semibold text-slate-50">Vision</h3>
            <p className="text-sm text-slate-300">
              Grow Neovoid into a habitat that supports ideas of all sizes -- from small prototypes to long-term systems.
              Build a calm digital ecosystem where creativity, design, and technology meet naturally.
            </p>
          </div>
          <div className="card space-y-2">
            <h3 className="text-lg font-semibold text-slate-50">Next</h3>
            <p className="text-sm text-slate-300">
              More public projects, a richer team section, refined blog and docs, new tools, and creative experiments.
              The journey stays in motion.
            </p>
          </div>
        </section>

        <section className="card space-y-3">
          <h3 className="text-lg font-semibold text-slate-50">Connect</h3>
          <p className="text-sm text-slate-300">
            Curious about our work or want to collaborate? Reach out. Neovoid is about people -- those who build with us,
            and those who share the space we create.
          </p>
          <div className="flex flex-wrap gap-3 text-sm text-cyan-300">
            <a
              href="/contact"
              className="chip text-xs hover:text-cyan-100 border-cyan-300/50 bg-cyan-300/10"
            >
              Contact
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
