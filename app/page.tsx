import Hero from "@/components/Hero"
import About from "@/components/About"
import Services from "@/components/Services"
import Skills from "@/components/Skills"
import Projects from "@/components/Projects"
// import BuildingNow from "@/components/BuildingNow"
import Experience from "@/components/Experience"
import Process from "@/components/Process"
import Testimonials from "@/components/Testimonials"
import Booking from "@/components/Booking"
import Contact from "@/components/Contact"
import { GITHUB_URL, LINKEDIN_URL, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site"

// Structured data so search engines can show a rich "person" result.
const PERSON_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE_NAME,
  url: SITE_URL,
  image: `${SITE_URL}/nakshatra.webp`,
  jobTitle: "Software Engineer",
  description: SITE_DESCRIPTION,
  worksFor: { "@type": "Organization", name: "MetaUpSpace" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "KIET Group of Institutions" },
  award: "Smart India Hackathon 2024 Winner",
  sameAs: [GITHUB_URL, LINKEDIN_URL],
}

export default function Home() {
  return (
    <main id="top" className="mx-auto max-w-6xl px-4 pt-28 space-y-5">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_JSON_LD).replace(/</g, "\\u003c") }}
      />
      <Hero />
      <About />
      <Services />
      <Skills />
      <Projects />
      <Experience />
      <Process />
      <Testimonials />
      <Booking />
      <Contact />
    </main>
  )
}
