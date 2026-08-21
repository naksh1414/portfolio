import { projects } from "@/data/projects"
import ProjectCard from "@/components/ProjectCard"
import RevealSection from "@/components/RevealSection"
import { GITHUB_URL } from "@/lib/site"

export default function Projects() {
  return (
    <section id="projects" className="px-6 py-24">
      <div className="flex justify-between items-baseline mb-8">
        <h2 className="font-mono text-accent text-sm">[ MANIFEST ]</h2>
        <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="font-mono text-sm text-fg/60 hover:text-accent">
          View all on GitHub →
        </a>
      </div>
      <div>
        {projects.map((project, index) => (
          <RevealSection key={project.name} delay={index * 0.08}>
            <ProjectCard project={project} />
          </RevealSection>
        ))}
      </div>
    </section>
  )
}
