const LINKS = [
  { href: "#about", label: "about" },
  { href: "#experience", label: "experience" },
  { href: "#projects", label: "projects" },
  { href: "#building", label: "building" },
  { href: "#skills", label: "skills" },
  { href: "#blog", label: "blog" },
  { href: "#contact", label: "contact" },
]

export default function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 py-4 bg-base/80 backdrop-blur-sm border-b border-white/10">
      <a href="#top" className="font-display text-lg tracking-tight">
        Nakshatra
      </a>
      <nav className="hidden md:flex gap-6 font-mono text-sm text-fg/70">
        {LINKS.map((link) => (
          <a key={link.href} href={link.href} className="hover:text-accent transition-colors">
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  )
}
