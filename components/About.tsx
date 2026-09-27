const STATS = [
  { value: "2+", label: "Years Experience" },
  { value: "5+", label: "Shipped Projects" },
  { value: "10K+", label: "Peak Concurrent Users" },
]

export default function About() {
  return (
    <section id="about" className="glass rounded-[28px] px-6 py-10 md:px-12 grid lg:grid-cols-2 gap-10 items-center">
      <div>
        <p className="eyebrow">About me</p>
        <h2 className="mt-3 text-2xl md:text-3xl font-semibold tracking-tight leading-snug">
          Software that holds up
          <br />
          under load, not just in demos
        </h2>
        <dl className="card mt-8 rounded-2xl grid grid-cols-3 divide-x divide-fg/5">
          {STATS.map((stat) => (
            <div key={stat.label} className="px-4 py-5 flex flex-col-reverse">
              <dt className="mt-1 text-[0.6875rem] text-fg/50">{stat.label}</dt>
              <dd className="text-xl md:text-2xl font-semibold">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div>
        <p className="text-fg/65 leading-relaxed">
          B.Tech graduate from KIET Group of Institutions, Ghaziabad (2022–2026, CGPA 8.0), now a
          full-time Software Engineer at MetaUpSpace. Started as a Trainee Full-Stack Developer in November 2024 and was
          promoted within four months. I build AI-powered web apps and infrastructure tooling,
          and won SIH 2024 — India&apos;s largest national hackathon.
        </p>
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noreferrer"
          className="card mt-6 inline-block rounded-full px-5 py-2.5 text-sm font-medium hover:bg-white transition"
        >
          More About Me ↗
        </a>
      </div>
    </section>
  )
}
