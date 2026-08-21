"use client"

import { useEffect, useState } from "react"

const NAME = "NAKSHATRA MANGLIK"
const TAGLINES = ["SOFTWARE ENGINEER", "SIH 2024 WINNER", "BUILDING SOMETHING NEW"]

export default function Hero() {
  const [taglineIndex, setTaglineIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineIndex((i) => (i + 1) % TAGLINES.length)
    }, 2600)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="hero" className="relative min-h-[90vh] flex flex-col justify-center px-6 overflow-hidden grain-overlay">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-board blur-3xl opacity-40" />
      </div>
      <p className="font-mono text-accent text-sm mb-4">[ NOW BOARDING ]</p>
      <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight" aria-label={NAME}>
        <span aria-hidden="true" className="flex flex-wrap">
          {NAME.split("").map((char, i) => (
            <span
              key={i}
              className="flap-cell flap-cell-name"
              style={{ animationDelay: `${i * 35}ms` }}
            >
              {char === " " ? " " : char}
            </span>
          ))}
        </span>
      </h1>
      <p key={taglineIndex} className="mt-6 font-mono text-accent text-lg flap-cell">
        {TAGLINES[taglineIndex]}
      </p>
      <p
        className="mt-4 max-w-xl text-fg/70 text-lg animate-[fade-up_0.5s_ease-out_both]"
        style={{ animationDelay: "650ms" }}
      >
        Software Engineer at MetaUpSpace, building AI-powered tools and infrastructure —
        and currently building something new.
      </p>
      <div
        className="mt-8 flex gap-4 animate-[fade-up_0.5s_ease-out_both]"
        style={{ animationDelay: "800ms" }}
      >
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noreferrer"
          className="font-mono text-sm border border-accent text-accent px-5 py-3 hover:bg-accent hover:text-base transition-colors"
        >
          Resume ↓
        </a>
        <a
          href="#contact"
          className="font-mono text-sm border border-white/20 px-5 py-3 hover:border-accent transition-colors"
        >
          Get in touch
        </a>
      </div>
    </section>
  )
}
