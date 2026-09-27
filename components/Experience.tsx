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
    <section id="experience" className="glass rounded-[28px] px-6 py-10 md:px-12">
      <p className="eyebrow">Career</p>
      <h2 className="mt-2 text-2xl md:text-3xl font-semibold tracking-tight">Where I&apos;ve Worked</h2>
      <ol className="mt-8 grid md:grid-cols-2 gap-4">
        {EXPERIENCE.map((entry) => (
          <li key={entry.role + entry.period} className="card rounded-2xl p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="font-semibold">{entry.role}</h3>
                <p className="text-sm text-accent mt-0.5">{entry.org}</p>
              </div>
              <span className="shrink-0 rounded-full bg-white/70 px-3 py-1 text-[0.6875rem] text-fg/55">
                {entry.period}
              </span>
            </div>
            <p className="mt-4 text-sm text-fg/60 leading-relaxed">{entry.detail}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
