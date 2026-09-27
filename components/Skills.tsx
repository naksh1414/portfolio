import { skillCategories } from "@/data/skills"

const TINTS = [
  "bg-orange-100 text-orange-600",
  "bg-blue-100 text-blue-600",
  "bg-violet-100 text-violet-600",
  "bg-sky-100 text-sky-600",
  "bg-pink-100 text-pink-600",
]

function monogram(name: string) {
  const letters = name.replace(/[^A-Za-z]/g, "")
  return letters.charAt(0).toUpperCase() + letters.charAt(1).toLowerCase()
}

export default function Skills() {
  return (
    <section id="skills" className="glass rounded-[28px] px-6 py-10 md:px-12">
      <p className="eyebrow">Tools &amp; skills</p>
      <h2 className="mt-2 text-2xl md:text-3xl font-semibold tracking-tight">Technologies I Use</h2>
      <div className="mt-8 space-y-6">
        {skillCategories.map((category, i) => (
          <div key={category.name} className="md:grid md:grid-cols-[9rem_1fr] md:items-center gap-4">
            <h3 className="text-sm font-medium text-fg/55 mb-3 md:mb-0">{category.name}</h3>
            <ul className="grid grid-cols-3 sm:grid-cols-4 md:flex md:flex-wrap gap-3">
              {category.items.map((item) => (
                <li key={item} className="card rounded-xl md:w-28 py-4 flex flex-col items-center gap-2 hover:-translate-y-0.5 transition-transform">
                  <span className={`w-11 h-11 rounded-xl flex items-center justify-center text-sm font-bold ${TINTS[i % TINTS.length]}`}>
                    {monogram(item)}
                  </span>
                  <span className="text-xs text-fg/65 text-center leading-tight px-1">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
