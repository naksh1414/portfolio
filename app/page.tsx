import Hero from "@/components/Hero"
import About from "@/components/About"
import Experience from "@/components/Experience"
import Projects from "@/components/Projects"
import BuildingNow from "@/components/BuildingNow"
import Skills from "@/components/Skills"

export default function Home() {
  return (
    <main id="top" className="pt-24">
      <Hero />
      <About />
      <Experience />
      <Projects />
      <BuildingNow />
      <Skills />
    </main>
  )
}
