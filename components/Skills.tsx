import { skillCategories } from "@/data/skills"
import RevealSection from "@/components/RevealSection"

export default function Skills() {
  return (
    <section id="skills" className="px-6 py-24">
      <h2 className="font-mono text-accent text-sm mb-8">skills</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {skillCategories.map((category, index) => (
          <RevealSection key={category.name} delay={index * 0.08}>
            <h3 className="font-display text-lg mb-3">{category.name}</h3>
            <ul className="flex flex-wrap gap-2">
              {category.items.map((item) => (
                <li key={item} className="font-mono text-xs border border-white/10 px-2 py-1 text-fg/60">
                  {item}
                </li>
              ))}
            </ul>
          </RevealSection>
        ))}
      </div>
    </section>
  )
}
