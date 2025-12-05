export const metadata = {
  title: "About — Neovoid",
};

export default function AboutPage() {
  return (
    <div className="bg-grid min-h-screen">
      <div className="mx-auto max-w-3xl px-6 py-16 space-y-6">
        <p className="text-sm uppercase tracking-[0.2em] text-cyan-300/80">
          About
        </p>
        <h1 className="text-3xl font-semibold text-slate-50">Why Neovoid</h1>
        <div className="space-y-4 text-slate-300">
          <p>
            We build calm, fast, and intentional tools for teams who operate in
            messy systems. The Neovoid hub is our quiet orbit: a place to share
            experiments, publish field notes, and surface the work we ship.
          </p>
          <p>
            We prefer lean stacks, edge performance, and minimal surfaces. No
            ads, no noise—just signals, artifacts, and a way to reach us.
          </p>
        </div>
      </div>
    </div>
  );
}
