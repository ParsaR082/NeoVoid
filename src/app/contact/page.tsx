export const metadata = {
  title: "Contact — Neovoid",
};

const contacts = [
  { label: "Email", value: "neovoid.team@gmail.com", href: "mailto:neovoid.team@gmail.com" },
  { label: "X", value: "@neovoid", href: "https://x.com" },
  { label: "GitHub", value: "neovoid", href: "https://github.com" },
];

export default function ContactPage() {
  return (
    <div className="bg-grid min-h-screen">
      <div className="mx-auto max-w-3xl px-6 py-16 space-y-6">
        <p className="text-sm uppercase tracking-[0.2em] text-cyan-300/80">
          Contact
        </p>
        <h1 className="text-3xl font-semibold text-slate-50">Signal Us</h1>
        <p className="text-slate-400">
          Low-friction channels. We respond quickly.
        </p>
        <div className="space-y-3">
          {contacts.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="card flex items-center justify-between text-slate-200"
            >
              <div className="flex items-center gap-3">
                <span className="pill" aria-hidden />
                <div>
                  <p className="text-sm text-slate-400">{item.label}</p>
                  <p className="text-base font-semibold">{item.value}</p>
                </div>
              </div>
              <span className="text-cyan-300 text-sm">→</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
