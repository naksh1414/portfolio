import ContactForm from "@/components/ContactForm"
import { CONTACT_EMAIL, GITHUB_URL, LINKEDIN_URL } from "@/lib/site"

const CHANNELS = [
  { label: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}`, icon: <path d="M3 6h18v12H3zM3 7l9 6 9-6" /> },
  { label: "LinkedIn", href: LINKEDIN_URL, icon: <path d="M5 9v10M5 5v.01M10 19v-6a3 3 0 0 1 6 0v6M10 9v10M16 13v6h3v-6a4 4 0 0 0-4-4" /> },
  { label: "GitHub", href: GITHUB_URL, icon: <path d="M9 19c-4 1.5-4-2-6-2.5M15 21v-3.5a3 3 0 0 0-1-2.5c3 0 6-1.5 6-6a4.5 4.5 0 0 0-1.3-3.3 4 4 0 0 0-.1-3.2s-1-.3-3.4 1.3a11.6 11.6 0 0 0-6.2 0C6.6 2.2 5.6 2.5 5.6 2.5a4 4 0 0 0-.1 3.2A4.5 4.5 0 0 0 4.2 9c0 4.5 3 6 6 6a3 3 0 0 0-1 2.5V21" /> },
]

export default function Contact() {
  return (
    <section id="contact" className="glass rounded-[28px] px-6 py-10 md:px-12 grid lg:grid-cols-[1fr_1.4fr] gap-10">
      <div>
        <p className="eyebrow">Let&apos;s connect</p>
        <h2 className="mt-3 text-2xl md:text-3xl font-semibold tracking-tight leading-snug">
          Have a project in mind?
          <br />
          Let&apos;s build something reliable together.
        </h2>
        <ul className="mt-8 space-y-4">
          {CHANNELS.map((c) => (
            <li key={c.label}>
              <a
                href={c.href}
                target={c.href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noreferrer"
                className="flex items-center gap-3 text-sm text-fg/70 hover:text-fg transition-colors"
              >
                <span className="card w-9 h-9 rounded-full flex items-center justify-center">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    {c.icon}
                  </svg>
                </span>
                <span className="min-w-0 break-all">{c.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="card rounded-2xl p-5 md:p-6">
        <ContactForm />
      </div>
    </section>
  )
}
