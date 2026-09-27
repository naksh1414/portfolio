"use client"

import { useRef, useState } from "react"
import type { Project } from "@/data/projects"
import { computeTilt } from "@/lib/tilt"

const PREVIEW_GRADIENTS = [
  "from-violet-200 via-indigo-100 to-white",
  "from-sky-200 via-violet-100 to-white",
  "from-fuchsia-200 via-purple-100 to-white",
  "from-indigo-200 via-sky-100 to-white",
  "from-purple-200 via-pink-100 to-white",
]

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDetailsElement>(null)
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 })

  function handleMouseMove(e: React.MouseEvent<HTMLDetailsElement>) {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    setTilt(computeTilt(e.clientX, e.clientY, rect, 3))
  }

  return (
    <details
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTilt({ rotateX: 0, rotateY: 0 })}
      className="group glass rounded-2xl overflow-hidden transition-transform duration-150 ease-out"
      style={{ transform: `perspective(800px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)` }}
    >
      <summary className="cursor-pointer list-none">
        <div className={`relative h-44 m-2 rounded-xl bg-gradient-to-br ${PREVIEW_GRADIENTS[index % PREVIEW_GRADIENTS.length]} overflow-hidden`}>
          {/* Mock app window */}
          <div className="absolute inset-x-6 top-6 bottom-0 rounded-t-lg bg-white/80 shadow-lg p-3">
            <div className="flex gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-fg/15" />
              <span className="w-1.5 h-1.5 rounded-full bg-fg/15" />
              <span className="w-1.5 h-1.5 rounded-full bg-fg/15" />
            </div>
            <p className="mt-3 text-lg font-semibold tracking-tight text-fg/80">{project.name}</p>
            <div className="mt-2 space-y-1.5">
              <div className="h-1.5 w-3/4 rounded bg-accent/25" />
              <div className="h-1.5 w-1/2 rounded bg-fg/10" />
              <div className="flex gap-1.5 pt-1">
                <div className="h-8 flex-1 rounded bg-accent/15" />
                <div className="h-8 flex-1 rounded bg-fg/5" />
                <div className="h-8 flex-1 rounded bg-fg/5" />
              </div>
            </div>
          </div>
          <span className="absolute top-3 right-3 rounded-full bg-white/90 text-accent text-[0.625rem] font-semibold px-2.5 py-1">
            {project.status}
          </span>
        </div>
        <div className="flex items-center justify-between gap-3 px-4 pb-4 pt-2">
          <div>
            <h3 className="font-semibold text-sm">{project.name}</h3>
            <p className="text-fg/50 text-xs mt-0.5">{project.stack.slice(0, 3).join(" · ")}</p>
          </div>
          <span aria-hidden="true" className="card w-8 h-8 shrink-0 rounded-full flex items-center justify-center text-xs transition-transform group-open:rotate-90">
            ↗
          </span>
        </div>
      </summary>
      <div className="mx-4 pt-4 pb-5 border-t border-fg/5 space-y-3 text-sm text-fg/60 leading-relaxed">
        <p className="text-xs text-fg/40">{project.date}</p>
        <div>
          <p className="eyebrow mb-1">Problem</p>
          <p>{project.problem}</p>
        </div>
        <div>
          <p className="eyebrow mb-1">Approach</p>
          <p>{project.approach}</p>
        </div>
        <div>
          <p className="eyebrow mb-1">Result</p>
          <p>{project.result}</p>
        </div>
        <ul className="flex flex-wrap gap-1.5 pt-1">
          {project.stack.map((tech) => (
            <li key={tech} className="rounded-full bg-white/70 text-[0.6875rem] px-2.5 py-1 text-fg/60">
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </details>
  )
}
