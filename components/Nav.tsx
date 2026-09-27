import Link from "next/link"
import { FiArrowUpRight, FiMenu } from "react-icons/fi"

const LINKS = [
  { href: "/#top", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#services", label: "Services" },
  { href: "/#projects", label: "Work" },
  { href: "/#experience", label: "Experience" },
  { href: "/#skills", label: "Skills" },
  { href: "/#book", label: "Book a Call" },
  { href: "/#contact", label: "Contact" },
]

export default function Nav() {
  return (
    <header className="fixed top-4 inset-x-0 z-50 px-4">
      <div className="glass !bg-white/90 mx-auto max-w-6xl rounded-2xl flex items-center justify-between gap-4 pl-3 pr-2 py-2">
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-white text-fg border font-semibold text-sm">
            N
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-semibold">Nakshatra Manglik</span>
            <span className="block text-[0.6875rem] text-fg/50">Software Engineer</span>
          </span>
        </Link>

        <nav className="hidden xl:flex items-center gap-1 text-[0.8125rem] text-fg/60">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3.5 py-1.5 hover:bg-white hover:text-fg hover:shadow-sm transition"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/#contact"
            className="card hidden sm:inline-block whitespace-nowrap rounded-full px-4 py-2 text-[0.8125rem] font-medium hover:bg-white transition"
          >
            Let&apos;s Talk <FiArrowUpRight aria-hidden className="inline -mt-0.5" />
          </Link>
          {/* ponytail: native <details> menu, no JS state needed */}
          <details className="xl:hidden relative">
            <summary className="list-none cursor-pointer card rounded-full w-9 h-9 flex items-center justify-center" aria-label="Menu">
              <FiMenu size={16} aria-hidden />
            </summary>
            <nav className="card !bg-white absolute right-0 mt-2 w-48 rounded-2xl p-2 flex flex-col text-sm">
              {LINKS.map((link) => (
                <Link key={link.href} href={link.href} className="rounded-xl px-3 py-2 hover:bg-white transition">
                  {link.label}
                </Link>
              ))}
            </nav>
          </details>
        </div>
      </div>
    </header>
  )
}
