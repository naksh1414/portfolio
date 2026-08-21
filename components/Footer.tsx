const GITHUB_URL = "https://github.com/naksh1414"
const LINKEDIN_URL = "https://www.linkedin.com/in/nakshatra-manglik/"
const EMAIL = "nakshatramanglik14@gmail.com"

export default function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 py-10 mt-24">
      <div className="flex flex-col md:flex-row justify-between gap-4 font-mono text-sm text-fg/70">
        <div className="flex gap-4">
          <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="hover:text-accent">
            GitHub
          </a>
          <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="hover:text-accent">
            LinkedIn
          </a>
          <a href={`mailto:${EMAIL}`} className="hover:text-accent">
            Email
          </a>
          <a href="/resume.pdf" target="_blank" rel="noreferrer" className="hover:text-accent">
            Resume
          </a>
        </div>
        <p>© {new Date().getFullYear()} Nakshatra Manglik</p>
      </div>
    </footer>
  )
}
