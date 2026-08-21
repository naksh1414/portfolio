import Hero from "@/components/Hero"
import About from "@/components/About"
import Experience from "@/components/Experience"

export default function Home() {
  return (
    <main id="top" className="pt-24">
      <Hero />
      <About />
      <Experience />
      {/* sections added in later tasks */}
    </main>
  )
}
