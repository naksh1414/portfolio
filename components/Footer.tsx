import Link from "next/link"
import { GITHUB_URL, LINKEDIN_URL } from "@/lib/site"

export default function Footer() {
  return (
    <footer className="mx-auto max-w-6xl px-4 py-5">
      <div className="glass rounded-2xl px-6 py-5 flex flex-wrap items-center justify-between gap-4 text-xs text-fg/50">
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-white text-fg border font-semibold text-xs">
            N
          </span>
          <span>© {new Date().getFullYear()} Nakshatra Manglik</span>
        </div>
        <nav className="flex gap-5">
          <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="hover:text-fg transition-colors">GitHub</a>
          <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="hover:text-fg transition-colors">LinkedIn</a>
          <a href="/resume.pdf" target="_blank" rel="noreferrer" className="hover:text-fg transition-colors">Resume</a>
          <Link href="/blog" className="hover:text-fg transition-colors">Blog</Link>
        </nav>
      </div>
    </footer>
  )
}
