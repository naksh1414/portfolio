import { GITHUB_URL } from "@/lib/site"
import RevealSection from "@/components/RevealSection"

export default function BuildingNow() {
  return (
    <section id="building" className="px-6 py-24 max-w-2xl">
      <RevealSection>
        <h2 className="font-mono text-accent text-sm mb-4">building now</h2>
        <p className="font-display text-3xl md:text-4xl leading-tight">
          Building something new. Can&apos;t share details yet.
        </p>
        <p className="mt-4 text-fg/70">
          Follow along on{" "}
          <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="text-accent underline">
            GitHub
          </a>{" "}
          for when it surfaces.
        </p>
      </RevealSection>
    </section>
  )
}
