const SERVICES = [
  {
    title: "Backend & APIs",
    detail: "Node.js and Express services, microservices with RabbitMQ and Redis, built to stay up.",
    tint: "bg-orange-100 text-orange-500",
    icon: <path d="M4 6h16v4H4zM4 14h16v4H4zM8 8h.01M8 16h.01" />,
  },
  {
    title: "Full-Stack Web Apps",
    detail: "Next.js and React frontends wired end to end to the APIs behind them.",
    tint: "bg-violet-100 text-violet-500",
    icon: <path d="M3 5h18v14H3zM3 9h18M7 7h.01" />,
  },
  {
    title: "Infra & Performance",
    detail: "Load balancing, kernel-level tuning, Docker and Nginx — systems that held 10K+ users.",
    tint: "bg-blue-100 text-blue-500",
    icon: <path d="M12 20a8 8 0 1 0-8-8M12 12l4-4" />,
  },
  {
    title: "AI Integration",
    detail: "OpenAI and LangChain features that surface real insight inside the product.",
    tint: "bg-teal-100 text-teal-600",
    icon: <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z" />,
  },
]

export default function Services() {
  return (
    <section id="services" className="glass rounded-[28px] px-6 py-10 md:px-12">
      <p className="eyebrow">What I do</p>
      <h2 className="mt-2 text-2xl md:text-3xl font-semibold tracking-tight">What I Build</h2>
      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {SERVICES.map((s) => (
          <div key={s.title} className="card rounded-2xl p-5 flex flex-col hover:-translate-y-1 transition-transform">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.tint}`}>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                {s.icon}
              </svg>
            </div>
            <h3 className="mt-5 font-semibold">{s.title}</h3>
            <p className="mt-2 text-sm text-fg/55 leading-relaxed flex-1">{s.detail}</p>
            {/* <span aria-hidden="true" className="mt-4 self-end card w-8 h-8 rounded-full flex items-center justify-center text-xs">
              ↗
            </span> */}
          </div>
        ))}
      </div>
    </section>
  )
}
