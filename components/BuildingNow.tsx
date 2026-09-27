import { GITHUB_URL } from "@/lib/site"
import { FiArrowUpRight } from "react-icons/fi"

export default function BuildingNow() {
  return (
    <section id="building" className="glass rounded-[28px] px-6 py-6 md:px-12 flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <span className="relative flex w-3 h-3">
          <span className="absolute inset-0 rounded-full bg-accent/60 animate-ping" />
          <span className="relative w-3 h-3 rounded-full bg-accent" />
        </span>
        <div>
          <p className="eyebrow">Building now</p>
          <p className="mt-1 font-semibold">
            Something new. <span className="text-fg/45 font-normal">Can&apos;t share details yet.</span>
          </p>
        </div>
      </div>
      <a
        href={GITHUB_URL}
        target="_blank"
        rel="noreferrer"
        className="card rounded-full px-4 py-2 text-xs font-medium hover:bg-white transition"
      >
        Follow on GitHub <FiArrowUpRight aria-hidden className="inline -mt-0.5" />
      </a>
    </section>
  )
}
