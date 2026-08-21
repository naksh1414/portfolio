import Link from "next/link"
import Hero from "@/components/Hero"
import About from "@/components/About"
import Experience from "@/components/Experience"
import Projects from "@/components/Projects"
import BuildingNow from "@/components/BuildingNow"
import Skills from "@/components/Skills"
import ContactForm from "@/components/ContactForm"

export default function Home() {
  return (
    <main id="top" className="pt-24">
      <Hero />
      <About />
      <Experience />
      <Projects />
      <BuildingNow />
      <Skills />
      <section id="blog" className="px-6 py-24">
        <h2 className="font-mono text-accent text-sm mb-4">blog</h2>
        <Link href="/blog" className="font-display text-2xl hover:text-accent">
          Read the blog →
        </Link>
      </section>
      <section id="contact" className="px-6 py-24">
        <h2 className="font-mono text-accent text-sm mb-8">contact</h2>
        <ContactForm />
      </section>
    </main>
  )
}
