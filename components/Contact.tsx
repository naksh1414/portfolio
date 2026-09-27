import ContactForm from "@/components/ContactForm"
import { CONTACT_EMAIL, GITHUB_URL, LINKEDIN_URL } from "@/lib/site"
import { FiMail } from "react-icons/fi"
import { FaGithub, FaLinkedinIn } from "react-icons/fa"

const CHANNELS = [
  { label: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}`, Icon: FiMail },
  { label: "LinkedIn", href: LINKEDIN_URL, Icon: FaLinkedinIn },
  { label: "GitHub", href: GITHUB_URL, Icon: FaGithub },
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
                  <c.Icon size={16} aria-hidden />
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
