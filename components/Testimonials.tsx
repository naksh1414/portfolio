import { testimonials } from "@/data/testimonials"

export default function Testimonials() {
  // ponytail: section hides until data/testimonials.ts has entries
  if (testimonials.length === 0) return null

  return (
    <section id="testimonials" className="glass rounded-[28px] px-6 py-10 md:px-12">
      <p className="eyebrow">Testimonials</p>
      <h2 className="mt-2 text-2xl md:text-3xl font-semibold tracking-tight">What People Say</h2>
      <div className="mt-8 grid md:grid-cols-3 gap-4">
        {testimonials.map((t) => (
          <figure key={t.name} className="card rounded-2xl p-6 flex flex-col">
            <span aria-hidden="true" className="self-end text-3xl leading-none text-accent/40">&rdquo;</span>
            <blockquote className="text-sm text-fg/70 leading-relaxed flex-1">&ldquo;{t.quote}&rdquo;</blockquote>
            <figcaption className="flex items-center gap-3 mt-5">
              <span className="w-9 h-9 rounded-full bg-violet-100 text-accent flex items-center justify-center text-sm font-semibold">
                {t.name.charAt(0)}
              </span>
              <span>
                <span className="block text-sm font-medium">{t.name}</span>
                <span className="block text-xs text-fg/50">{t.role}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
