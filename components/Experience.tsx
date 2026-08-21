import RevealSection from "@/components/RevealSection"

interface ExperienceEntry {
  role: string
  org: string
  period: string
  detail: string
}

const EXPERIENCE: ExperienceEntry[] = [
  {
    role: "Software Engineer",
    org: "MetaUpSpace",
    period: "Feb 2025 – Present",
    detail:
      "Owns core features in an AI-powered MERN/Next.js web app. Performs kernel-level performance tuning — process scheduling, I/O handling, container resource allocation — and leads backend API development plus frontend integration in a fast-paced agile environment.",
  },
  {
    role: "Trainee — Full Stack Developer",
    org: "MetaUpSpace",
    period: "Nov 2024 – Feb 2025",
    detail:
      "Built and maintained scalable MERN/Next.js features, focused on backend API development, frontend integration, and performance optimization.",
  },
]

export default function Experience() {
  return (
    <section id="experience" className="px-6 py-24 max-w-3xl">
      <h2 className="font-mono text-accent text-sm mb-8">experience</h2>
      <ol className="space-y-10">
        {EXPERIENCE.map((entry, index) => (
          <li key={entry.role + entry.period} className="border-l border-white/10 pl-6">
            <RevealSection delay={index * 0.1}>
              <p className="font-mono text-sm text-fg/50">{entry.period}</p>
              <h3 className="font-display text-2xl mt-1">
                {entry.role} · {entry.org}
              </h3>
              <p className="mt-2 text-fg/70 leading-relaxed">{entry.detail}</p>
            </RevealSection>
          </li>
        ))}
      </ol>
    </section>
  )
}
