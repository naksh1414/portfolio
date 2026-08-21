import type { Project } from "@/data/projects"

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <details className="group border-b border-white/10 py-4">
      <summary className="flex flex-wrap items-baseline gap-4 cursor-pointer list-none font-mono text-sm">
        <span className="text-fg/50 w-20">{project.date}</span>
        <span className="font-display text-lg flex-1">{project.name}</span>
        <span className="text-accent">{project.status}</span>
        <span className="text-fg/40 group-open:rotate-90 transition-transform">▸</span>
      </summary>
      <div className="mt-4 pl-0 md:pl-20 space-y-3 text-sm text-fg/70 leading-relaxed">
        <div>
          <p className="font-mono text-accent text-xs mb-1">problem</p>
          <p>{project.problem}</p>
        </div>
        <div>
          <p className="font-mono text-accent text-xs mb-1">approach</p>
          <p>{project.approach}</p>
        </div>
        <div>
          <p className="font-mono text-accent text-xs mb-1">result</p>
          <p>{project.result}</p>
        </div>
        <ul className="flex flex-wrap gap-2 pt-1">
          {project.stack.map((tech) => (
            <li key={tech} className="font-mono text-xs border border-white/10 px-2 py-1 text-fg/60">
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </details>
  )
}
