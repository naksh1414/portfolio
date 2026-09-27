import Image from "next/image"

const STACK = ["Node.js", "Next.js", "Docker", "Azure", "Redis"]

export default function Hero() {
  return (
    <section id="hero" className="glass rounded-[28px] px-6 py-10 md:px-12 md:py-14 grid lg:grid-cols-[1.1fr_1fr] gap-10 items-center overflow-hidden">
      <div className="animate-[fade-up_0.6s_ease-out_both]">
        <p className="eyebrow">Hello, I&apos;m</p>
        <h1 className="mt-3 text-5xl lg:text-[3.4rem] font-semibold tracking-tight leading-[1.05]">
          Nakshatra Manglik
        </h1>
        <p className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight text-gradient">
          Software Engineer
        </p>
        <p className="mt-5 max-w-md text-fg/60 leading-relaxed">
          I build AI-powered tools and infrastructure that hold up under real load —
          currently at MetaUpSpace, and building something new.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#projects"
            className="rounded-full bg-fg text-white px-6 py-3 text-sm font-medium hover:opacity-85 transition-opacity"
          >
            View My Work ↗
          </a>
          <a
            href="/resume.pdf"
            download
            className="glass rounded-full px-6 py-3 text-sm font-medium hover:bg-white transition"
          >
            Download CV ↓
          </a>
        </div>

        <p className="mt-10 text-xs text-fg/45">Ships with</p>
        <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-base font-semibold text-fg/35">
          {STACK.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
      </div>

      <div className="relative mx-auto w-full max-w-md aspect-square">
        <div className="glass absolute inset-6 rounded-[56px] overflow-hidden">
          <Image
            src="/nakshatra.webp"
            alt="Nakshatra Manglik"
            fill
            priority
            sizes="(min-width: 768px) 400px, 90vw"
            className="object-cover object-[50%_18%]"
          />
        </div>

        <div className="glass absolute top-0 right-0 rounded-2xl px-4 py-3 text-center animate-[float_6s_ease-in-out_infinite]">
          <p className="text-2xl font-semibold">10K+</p>
          <p className="text-[0.625rem] text-fg/55 leading-tight">Concurrent
            <br />users served</p>
        </div>

        <div className="glass absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center text-accent">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2z" />
          </svg>
        </div>

        <div className="glass absolute bottom-0 right-0 rounded-2xl px-4 py-3 w-44 animate-[float_7s_ease-in-out_infinite_1s]">
          <p className="text-[0.625rem] text-fg/55">SIH 2024</p>
          <p className="text-sm font-semibold">National Winner</p>
          <svg viewBox="0 0 120 30" className="mt-1 w-full text-accent" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M2 26 L20 20 L34 23 L52 14 L68 17 L86 8 L100 11 L118 3" />
          </svg>
        </div>
      </div>
    </section>
  )
}
