const STEPS = [
  { title: "Understand", detail: "Pin down the real problem and the load it must survive." },
  { title: "Design", detail: "Sketch services, data flow, and failure modes first." },
  { title: "Build", detail: "Ship typed, tested code in small, reviewable pieces." },
  { title: "Ship", detail: "Containerize, deploy with CI/CD, zero downtime." },
  { title: "Scale", detail: "Measure, tune, and cache until it holds under peak." },
]

export default function Process() {
  return (
    <section id="process" className="glass rounded-[28px] px-6 py-10 md:px-12">
      <p className="eyebrow">My process</p>
      <h2 className="mt-2 text-2xl md:text-3xl font-semibold tracking-tight">How I Work</h2>
      <ol className="mt-8 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {STEPS.map((step, i) => (
          <li key={step.title} className="card rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <span className="w-8 h-8 rounded-lg bg-violet-100 text-accent flex items-center justify-center text-xs font-bold">
                {step.title.charAt(0)}
              </span>
              <span className="text-2xl font-light text-fg/20">{String(i + 1).padStart(2, "0")}</span>
            </div>
            <h3 className="mt-4 font-semibold text-sm">{step.title}</h3>
            <p className="mt-1.5 text-xs text-fg/55 leading-relaxed">{step.detail}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
