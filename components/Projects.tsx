import { projects } from "@/data/projects"
import ProjectCard from "@/components/ProjectCard"
import { GITHUB_URL } from "@/lib/site"
import { FiArrowUpRight } from "react-icons/fi"

export default function Projects() {
  return (
    <section id="projects" className="glass rounded-[28px] px-6 py-10 md:px-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Featured projects</p>
          <h2 className="mt-2 text-2xl md:text-3xl font-semibold tracking-tight">Selected Work</h2>
        </div>
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noreferrer"
          className="card shrink-0 rounded-full px-4 py-2 text-xs font-medium hover:bg-white transition"
        >
          View All Projects <FiArrowUpRight aria-hidden className="inline -mt-0.5" />
        </a>
      </div>
      <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-5 items-start">
        {projects.map((project, i) => (
          <ProjectCard key={project.name} project={project} index={i} />
        ))}
      </div>
    </section>
  )
}
