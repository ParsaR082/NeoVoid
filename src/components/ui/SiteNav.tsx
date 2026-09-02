import Link from "next/link";

const navItems = [
  { href: "/portfolio", label: "Work" },
  { href: "/blog", label: "Notes" },
  { href: "/team", label: "Team" },
  { href: "/about", label: "About" },
];

export function SiteNav() {
  return (
    <header className="site-nav">
      <div className="shell nav-inner">
        <Link href="/" className="brand" aria-label="Neovoid home">
          <span className="brand-mark">NV</span>
          <span className="brand-name">NEOVOID</span>
        </Link>
        <nav className="nav-links" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="nav-link">
              {item.label}
            </Link>
          ))}
          <Link href="/contact" className="nav-cta">
            Start a signal <span aria-hidden>↗</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
