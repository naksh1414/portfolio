# Portfolio Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a Next.js portfolio site for Nakshatra Manglik matching the approved design spec — departure-board/dispatch-console theme, split-flap hero, manifest-row project entries, blog scaffold, working contact form.

**Architecture:** Single Next.js 15 App Router project. Static/server-rendered pages for all content sections (hero through contact), one API route for the contact form. Content lives in typed data files (`data/*.ts`) and MDX (`content/blog/*.mdx`), not a CMS. Pure logic (flap-cell splitting, form validation, MDX file loading) is factored into small testable functions in `lib/`, kept separate from the React components that call them.

**Tech Stack:** Next.js 15 (App Router) + TypeScript + Tailwind CSS + Vitest (unit tests for `lib/`) + gray-matter + next-mdx-remote + Resend (contact email) + Framer Motion (reinstated 2026-08-21 per explicit user request for a more animated feel — see Tasks 10-11).

**Spec:** `docs/superpowers/specs/2026-08-21-portfolio-design.md`

## Global Constraints

- Palette (named): `ink` `#0E1116` (bg), `board` `#171B21` (panels), `paper` `#ECE7DC` (sparing cream insets), `flap-amber` `#FFA23A` (the one interactive accent) — no second accent color
- Fonts: single superfamily IBM Plex across three roles — `IBM Plex Mono` bold/poster-scale (hero/section headers, mimics split-flap cells), `IBM Plex Sans` (body), `IBM Plex Mono` small (nav/tags/labels), all via `next/font/google`
- Signature interaction: hero name splits into per-character flap-cells that flip in on load, tagline cycles through role descriptors — CSS animation only, no JS animation library needed for this
- Projects render as manifest rows (date · name · status), not generic cards — the dispatch-board metaphor carries through, not just a hero gimmick
- Motion budget (revised 2026-08-21 per explicit user request): CSS keyframes still handle the flap-flip/tagline-cycle and hero load-in stagger (fixed-delay sequencing, no viewport detection needed). Framer Motion handles scroll-triggered `whileInView` reveals (viewport detection is a real JS concern CSS can't cleanly cover yet) and staggered list entrances (project rows, skill categories). Hover tilt on project rows and the skills marquee ticker are plain CSS/React, no library needed for those.
- Content is hand-authored (resume + resume PDF as source of truth) — never invented stats, never a guessed GitHub deep-link URL (use the profile URL `https://github.com/naksh1414` as the fallback CTA everywhere a per-repo link isn't confirmed)
- Deploy target is Vercel, but account creation / actual deploy is a manual step for the user at the end — not automated in this plan
- No CMS, no auth, no test framework beyond Vitest for `lib/` pure functions — presentational components are verified visually, not unit-tested

---

## Task 1: Project scaffold + themed layout shell

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.mjs`, `tailwind.config.ts`, `postcss.config.mjs`, `.eslintrc.json`, `.gitignore` (via `create-next-app`)
- Create: `vitest.config.ts`
- Create: `app/layout.tsx`
- Create: `app/globals.css`
- Create: `app/page.tsx`
- Create: `components/Nav.tsx`
- Create: `components/Footer.tsx`

**Interfaces:**
- Produces: `app/layout.tsx` exports default `RootLayout({ children }: { children: React.ReactNode })`; `app/globals.css` defines CSS custom properties `--bg`, `--fg`, `--accent`; Tailwind theme exposes `bg-base`, `text-fg`, `text-accent`, `border-accent`, and font families `font-display`, `font-sans`, `font-mono`. `components/Nav.tsx` exports default `Nav()`. `components/Footer.tsx` exports default `Footer()`.
- Consumes: nothing (first task)

- [ ] **Step 1: Scaffold the Next.js app**

Run in `C:\Users\naksh\Desktop\Personal\Portfolio`:

```bash
npx --yes create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias "@/*" --use-npm --no-turbopack
```

When prompted about the current directory not being empty, confirm yes (it only contains the `docs/` folder).

- [ ] **Step 2: Verify the scaffold builds**

Run: `npm run build`
Expected: build succeeds with the default Next.js starter page.

- [ ] **Step 3: Install the test runner**

```bash
npm install -D vitest
```

Create `vitest.config.ts`:

```ts
import { defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    environment: "node",
    include: ["**/*.test.ts"],
  },
})
```

Add to `package.json` `"scripts"`:

```json
"test": "vitest run"
```

- [ ] **Step 4: Define the color/font tokens in Tailwind**

Replace `tailwind.config.ts` content with:

```ts
import type { Config } from "tailwindcss"

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        base: "#0E1116",
        board: "#171B21",
        paper: "#ECE7DC",
        fg: "#f4f4f0",
        accent: "#FFA23A",
      },
      fontFamily: {
        display: ["var(--font-mono)"],
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
    },
  },
  plugins: [],
}
export default config
```

- [ ] **Step 5: Wire up fonts and metadata in the root layout**

Replace `app/layout.tsx`:

```tsx
import type { Metadata } from "next"
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google"
import Nav from "@/components/Nav"
import Footer from "@/components/Footer"
import "./globals.css"

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["600", "700"],
})
const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600"],
})

export const metadata: Metadata = {
  title: "Nakshatra Manglik — Software Engineer",
  description:
    "Software Engineer at MetaUpSpace. SIH 2024 national hackathon winner. Building AI-powered tools and infrastructure.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${mono.variable} ${sans.variable}`}>
      <body className="bg-base text-fg font-sans">
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  )
}
```

Replace `app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

html {
  scroll-behavior: smooth;
}

body {
  background-color: #0e1116;
}
```

- [ ] **Step 6: Build the nav**

Create `components/Nav.tsx`:

```tsx
const LINKS = [
  { href: "#about", label: "about" },
  { href: "#experience", label: "experience" },
  { href: "#projects", label: "projects" },
  { href: "#building", label: "building" },
  { href: "#skills", label: "skills" },
  { href: "#blog", label: "blog" },
  { href: "#contact", label: "contact" },
]

export default function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 py-4 bg-base/80 backdrop-blur-sm border-b border-white/10">
      <a href="#top" className="font-display text-lg tracking-tight">
        Nakshatra
      </a>
      <nav className="hidden md:flex gap-6 font-mono text-sm text-fg/70">
        {LINKS.map((link) => (
          <a key={link.href} href={link.href} className="hover:text-accent transition-colors">
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  )
}
```

- [ ] **Step 7: Build the footer**

Create `components/Footer.tsx`:

```tsx
const GITHUB_URL = "https://github.com/naksh1414"
const LINKEDIN_URL = "https://www.linkedin.com/in/nakshatra-manglik/"
const EMAIL = "nakshatramanglik14@gmail.com"

export default function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 py-10 mt-24">
      <div className="flex flex-col md:flex-row justify-between gap-4 font-mono text-sm text-fg/70">
        <div className="flex gap-4">
          <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="hover:text-accent">
            GitHub
          </a>
          <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="hover:text-accent">
            LinkedIn
          </a>
          <a href={`mailto:${EMAIL}`} className="hover:text-accent">
            Email
          </a>
          <a href="/resume.pdf" target="_blank" rel="noreferrer" className="hover:text-accent">
            Resume
          </a>
        </div>
        <p>© {new Date().getFullYear()} Nakshatra Manglik</p>
      </div>
    </footer>
  )
}
```

- [ ] **Step 8: Blank out the starter page**

Replace `app/page.tsx`:

```tsx
export default function Home() {
  return (
    <main id="top" className="pt-24">
      {/* sections added in later tasks */}
    </main>
  )
}
```

- [ ] **Step 9: Verify visually**

Run `npm run dev`, then use the Chrome browser tool to navigate to `http://localhost:3000` and screenshot it.
Expected: near-black background, nav bar with "Nakshatra" + section links, footer with GitHub/LinkedIn/Email/Resume links, no console errors (check with `read_console_messages`).

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "chore: scaffold Next.js portfolio with themed layout shell"
```

---

## Task 2: Hero section with split-flap departure-board interaction

**Files:**
- Modify: `app/globals.css`
- Create: `components/Hero.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: Tailwind tokens from Task 1 (`bg-base`, `text-accent`, `font-display`, `font-mono`)
- Produces: `components/Hero.tsx` exports default `Hero()`, renders a `<section id="hero">`. `.flap-cell` CSS class (defined in `globals.css`) used by later tasks if they add more flap-style text.

No `lib/` pure function is needed here — splitting a string into characters and cycling an array index are both one-liners (YAGNI on unit tests for one-liners); the whole component is verified visually in Step 3.

- [ ] **Step 1: Add the flap-flip keyframes**

Append to `app/globals.css` (after the existing rules from Task 1):

```css
@keyframes flap-in {
  0% {
    transform: rotateX(-90deg);
    opacity: 0;
  }
  60% {
    transform: rotateX(10deg);
    opacity: 1;
  }
  100% {
    transform: rotateX(0deg);
    opacity: 1;
  }
}

.flap-cell {
  display: inline-block;
  animation: flap-in 0.4s ease-out both;
}
```

- [ ] **Step 2: Build the Hero component**

Create `components/Hero.tsx`:

```tsx
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
    <section id="hero" className="relative min-h-[90vh] flex flex-col justify-center px-6 overflow-hidden">
      <p className="font-mono text-accent text-sm mb-4">[ NOW BOARDING ]</p>
      <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight flex flex-wrap">
        {NAME.split("").map((char, i) => (
          <span key={i} className="flap-cell" style={{ animationDelay: `${i * 35}ms` }}>
            {char === " " ? " " : char}
          </span>
        ))}
      </h1>
      <p key={taglineIndex} className="mt-6 font-mono text-accent text-lg flap-cell">
        {TAGLINES[taglineIndex]}
      </p>
      <p className="mt-4 max-w-xl text-fg/70 text-lg">
        Software Engineer at MetaUpSpace, building AI-powered tools and infrastructure —
        and currently building something new.
      </p>
      <div className="mt-8 flex gap-4">
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
```

The tagline `<p>` uses `key={taglineIndex}` so React remounts it on every cycle, which re-triggers the `flap-in` CSS animation for free — no manual animation-restart logic needed.

- [ ] **Step 3: Wire it into the page**

Modify `app/page.tsx`:

```tsx
import Hero from "@/components/Hero"

export default function Home() {
  return (
    <main id="top" className="pt-24">
      <Hero />
      {/* sections added in later tasks */}
    </main>
  )
}
```

- [ ] **Step 4: Verify visually**

`npm run dev`, screenshot via Chrome tool on page load, then reload and screenshot again a beat later.
Expected: name characters flip in like a departure board on load; the tagline line below cycles through the three role descriptors every ~2.6s with the same flip animation; resume link opens (404 is expected until Task 8 adds the PDF — confirm the link path is `/resume.pdf`, don't fix the 404 here).

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add split-flap departure-board hero"
```

---

## Task 3: About + Experience sections

**Files:**
- Create: `components/About.tsx`
- Create: `components/Experience.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: Tailwind tokens from Task 1
- Produces: `components/About.tsx` exports default `About()` rendering `<section id="about">`. `components/Experience.tsx` exports default `Experience()` rendering `<section id="experience">`.

- [ ] **Step 1: Build the About section**

Create `components/About.tsx`:

```tsx
export default function About() {
  return (
    <section id="about" className="px-6 py-24 max-w-3xl">
      <h2 className="font-mono text-accent text-sm mb-4">about</h2>
      <p className="font-display text-3xl md:text-4xl leading-tight">
        B.Tech student at KIET Group of Institutions (2022–2026, CGPA 8.0/10), currently
        Software Engineer at MetaUpSpace.
      </p>
      <p className="mt-6 text-fg/70 text-lg leading-relaxed">
        Started as a Trainee Full-Stack Developer in November 2024 and was promoted to a
        full-time Software Engineer role within four months. Builds AI-powered web apps and
        infrastructure tooling, and won SIH 2024 — India&apos;s largest national hackathon.
        Outside of work: building something new.
      </p>
    </section>
  )
}
```

- [ ] **Step 2: Build the Experience section**

Create `components/Experience.tsx`:

```tsx
interface ExperienceEntry {
  role: string
  org: string
  period: string
  detail: string
}

const EXPERIENCE: ExperienceEntry[] = [
  {
    role: "Software Engineer",
    org: "MetaUpSpace",
    period: "Feb 2025 – Present",
    detail:
      "Owns core features in an AI-powered MERN/Next.js web app. Performs kernel-level performance tuning — process scheduling, I/O handling, container resource allocation — and leads backend API development plus frontend integration in a fast-paced agile environment.",
  },
  {
    role: "Trainee — Full Stack Developer",
    org: "MetaUpSpace",
    period: "Nov 2024 – Feb 2025",
    detail:
      "Built and maintained scalable MERN/Next.js features, focused on backend API development, frontend integration, and performance optimization.",
  },
]

export default function Experience() {
  return (
    <section id="experience" className="px-6 py-24 max-w-3xl">
      <h2 className="font-mono text-accent text-sm mb-8">experience</h2>
      <ol className="space-y-10">
        {EXPERIENCE.map((entry) => (
          <li key={entry.role + entry.period} className="border-l border-white/10 pl-6">
            <p className="font-mono text-sm text-fg/50">{entry.period}</p>
            <h3 className="font-display text-2xl mt-1">
              {entry.role} · {entry.org}
            </h3>
            <p className="mt-2 text-fg/70 leading-relaxed">{entry.detail}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
```

- [ ] **Step 3: Wire both into the page**

Modify `app/page.tsx`:

```tsx
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
```

- [ ] **Step 4: Verify visually**

`npm run dev`, screenshot via Chrome tool scrolled to the about/experience sections.
Expected: both render with correct copy, timeline shows newest role first.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add about and experience sections"
```

---

## Task 4: Projects section (manifest rows)

**Files:**
- Create: `data/projects.ts`
- Test: `data/projects.test.ts`
- Create: `components/ProjectCard.tsx`
- Create: `components/Projects.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: Tailwind tokens from Task 1
- Produces: `data/projects.ts` exports `interface Project { name: string; date: string; status: string; problem: string; approach: string; result: string; stack: string[] }` and `export const projects: Project[]`. `components/ProjectCard.tsx` exports default `ProjectCard({ project }: { project: Project })`. `components/Projects.tsx` exports default `Projects()` rendering `<section id="projects">`.

Each row uses the native `<details>`/`<summary>` element for expand/collapse — no click-state, no JS needed for the interaction.

- [ ] **Step 1: Write the failing test for project data completeness**

Create `data/projects.test.ts`:

```ts
import { describe, it, expect } from "vitest"
import { projects } from "./projects"

describe("projects data", () => {
  it("has at least the five flagship resume projects", () => {
    expect(projects.length).toBeGreaterThanOrEqual(5)
  })

  it("every project has a complete manifest entry", () => {
    for (const project of projects) {
      expect(project.name.length).toBeGreaterThan(0)
      expect(project.status.length).toBeGreaterThan(0)
      expect(project.problem.length).toBeGreaterThan(0)
      expect(project.approach.length).toBeGreaterThan(0)
      expect(project.result.length).toBeGreaterThan(0)
      expect(project.stack.length).toBeGreaterThan(0)
    }
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm run test`
Expected: FAIL — `data/projects.ts` does not exist yet.

- [ ] **Step 3: Write the project data**

Create `data/projects.ts`:

```ts
export interface Project {
  name: string
  date: string
  status: string
  problem: string
  approach: string
  result: string
  stack: string[]
}

export const projects: Project[] = [
  {
    name: "Bus Tech",
    date: "Dec 2024",
    status: "WON SIH 2024",
    problem:
      "Delhi Transport Corporation needed automated duty scheduling and route management for its bus fleet — manual rostering wasted driver and conductor hours and had no live route visualization.",
    approach:
      "Built a Node.js/Next.js microservices system with intelligent duty allocation and rotation for drivers and conductors, plus a self-hosted tile server as a zero-dependency Google Maps alternative for real-time route visualization.",
    result: "Won SIH 2024, India's largest national hackathon.",
    stack: ["Java", "Node.js", "Next.js", "TypeScript", "Docker", "RabbitMQ", "Redis", "Microservices"],
  },
  {
    name: "Smart Load Balancer",
    date: "Nov 2024",
    status: "SHIPPED",
    problem:
      "Microservices need traffic routed reliably under high concurrency, with no single point of failure and zero-downtime deploys.",
    approach:
      "Engineered a Node.js/Nginx load balancer implementing Round Robin, Least Connections, and IP Hash routing with adaptive health checks, plus kernel-level TCP tuning and connection pooling.",
    result: "Automatic failover with maximized throughput and reduced packet loss under high-concurrency workloads.",
    stack: ["Node.js", "TypeScript", "Nginx", "Docker", "Redis", "Microservices"],
  },
  {
    name: "Pharmansh",
    date: "Nov 2024",
    status: "LIVE · 10K+ USERS",
    problem:
      "A pharmacy's warehouse operation needed to survive 10,000+ concurrent users during peak events without downtime, while tracking inventory end-to-end.",
    approach:
      "Architected performance optimizations across a Node.js/Next.js/Azure stack and delivered a full inbound-to-outbound warehouse management system with automated inventory tracking, batch/expiry tracking, and demand-forecasting reorder logic.",
    result: "Sustained 10,000+ concurrent users with zero downtime and minimized stock wastage.",
    stack: ["Node.js", "Next.js", "TypeScript", "Docker", "Azure", "Cosmos DB", "Nginx"],
  },
  {
    name: "DecentraPay",
    date: "Oct 2024",
    status: "SHIPPED",
    problem:
      "Peer-to-peer ETH payments needed a trustless flow with no centralized intermediary and no room for contract-level exploits.",
    approach:
      "Wrote a custom Solidity smart contract with owner-gated transfer logic and zero-address/balance validation, wired to a React + Vite frontend via Web3.js for wallet connection.",
    result: "A working decentralized payment gateway with tamper-resistant, owner-only-controlled on-chain transfers.",
    stack: ["React.js", "Vite", "Solidity", "Web3.js", "Ethereum", "JavaScript"],
  },
  {
    name: "Trello Clone",
    date: "Aug 2024",
    status: "SHIPPED",
    problem:
      "Teams needed a Trello-style board that also surfaced workload insight automatically, not just task tracking.",
    approach:
      "Built drag-and-drop kanban boards on Next.js + Appwrite with real-time persistence, integrated the OpenAI API to auto-generate task summaries, and used Zustand for typed, end-to-end state management.",
    result: "A full-featured kanban app where AI-generated summaries surface workload insight directly in the UI.",
    stack: ["Next.js", "TypeScript", "Appwrite", "OpenAI API", "Zustand", "Tailwind CSS"],
  },
]
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm run test`
Expected: PASS (both tests)

- [ ] **Step 5: Build the ProjectCard manifest row**

Create `components/ProjectCard.tsx`:

```tsx
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
```

- [ ] **Step 6: Build the Projects section**

Create `components/Projects.tsx`:

```tsx
import { projects } from "@/data/projects"
import ProjectCard from "@/components/ProjectCard"

const GITHUB_URL = "https://github.com/naksh1414"

export default function Projects() {
  return (
    <section id="projects" className="px-6 py-24">
      <div className="flex justify-between items-baseline mb-8">
        <h2 className="font-mono text-accent text-sm">[ MANIFEST ]</h2>
        <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="font-mono text-sm text-fg/60 hover:text-accent">
          View all on GitHub →
        </a>
      </div>
      <div>
        {projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 7: Wire it into the page**

Modify `app/page.tsx` to add `import Projects from "@/components/Projects"` and render `<Projects />` after `<Experience />`.

- [ ] **Step 8: Verify visually**

`npm run dev`, screenshot via Chrome tool scrolled to the projects section, then click one row's summary to expand it.
Expected: 5 manifest rows (date · name · status), each expands on click to reveal problem/approach/result/stack, stays readable at mobile width (resize window or use Chrome tool's responsive check).

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat: add projects section as manifest rows"
```

---

## Task 5: Building Now teaser + Skills grid

**Files:**
- Create: `components/BuildingNow.tsx`
- Create: `data/skills.ts`
- Test: `data/skills.test.ts`
- Create: `components/Skills.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: Tailwind tokens from Task 1
- Produces: `data/skills.ts` exports `interface SkillCategory { name: string; items: string[] }` and `export const skillCategories: SkillCategory[]`. `components/BuildingNow.tsx` exports default `BuildingNow()` rendering `<section id="building">`. `components/Skills.tsx` exports default `Skills()` rendering `<section id="skills">`.

- [ ] **Step 1: Build the Building Now teaser**

Create `components/BuildingNow.tsx`:

```tsx
const GITHUB_URL = "https://github.com/naksh1414"

export default function BuildingNow() {
  return (
    <section id="building" className="px-6 py-24 max-w-2xl">
      <h2 className="font-mono text-accent text-sm mb-4">building now</h2>
      <p className="font-display text-3xl md:text-4xl leading-tight">
        Building something new. Can&apos;t share details yet.
      </p>
      <p className="mt-4 text-fg/70">
        Follow along on{" "}
        <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="text-accent hover:underline">
          GitHub
        </a>{" "}
        for when it surfaces.
      </p>
    </section>
  )
}
```

- [ ] **Step 2: Write the failing test for skills data**

Create `data/skills.test.ts`:

```ts
import { describe, it, expect } from "vitest"
import { skillCategories } from "./skills"

describe("skillCategories", () => {
  it("has the five categories from the resume", () => {
    const names = skillCategories.map((c) => c.name)
    expect(names).toEqual(["Languages", "Infrastructure", "Frameworks", "Cloud & DevOps", "AI / ML Tools"])
  })

  it("every category has at least one skill", () => {
    for (const category of skillCategories) {
      expect(category.items.length).toBeGreaterThan(0)
    }
  })
})
```

- [ ] **Step 3: Run the test to verify it fails**

Run: `npm run test`
Expected: FAIL — `data/skills.ts` does not exist yet.

- [ ] **Step 4: Write the skills data**

Create `data/skills.ts`:

```ts
export interface SkillCategory {
  name: string
  items: string[]
}

export const skillCategories: SkillCategory[] = [
  { name: "Languages", items: ["Java", "C", "TypeScript", "JavaScript", "SQL", "NoSQL"] },
  { name: "Infrastructure", items: ["Docker", "Nginx", "Linux", "Redis", "RabbitMQ", "Microservices"] },
  { name: "Frameworks", items: ["Node.js", "Express.js", "Next.js", "React.js", "Redux"] },
  { name: "Cloud & DevOps", items: ["Azure", "Cosmos DB", "CI/CD", "GitHub", "GitLab", "Jira"] },
  { name: "AI / ML Tools", items: ["TensorFlow", "PyTorch", "OpenAI API", "LangChain", "Hugging Face Transformers"] },
]
```

- [ ] **Step 5: Run the test to verify it passes**

Run: `npm run test`
Expected: PASS (both tests)

- [ ] **Step 6: Build the Skills section**

Create `components/Skills.tsx`:

```tsx
import { skillCategories } from "@/data/skills"

export default function Skills() {
  return (
    <section id="skills" className="px-6 py-24">
      <h2 className="font-mono text-accent text-sm mb-8">skills</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {skillCategories.map((category) => (
          <div key={category.name}>
            <h3 className="font-display text-lg mb-3">{category.name}</h3>
            <ul className="flex flex-wrap gap-2">
              {category.items.map((item) => (
                <li key={item} className="font-mono text-xs border border-white/10 px-2 py-1 text-fg/60">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 7: Wire both into the page**

Modify `app/page.tsx` to add both imports and render `<BuildingNow />` then `<Skills />` after `<Projects />`.

- [ ] **Step 8: Verify visually**

`npm run dev`, screenshot via Chrome tool scrolled through both sections.
Expected: teaser copy renders, skills grid shows 5 categories in a 3-column layout on desktop.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat: add building-now teaser and skills grid"
```

---

## Task 6: Blog scaffold (MDX, empty-ready)

**Files:**
- Create: `lib/mdx.ts`
- Test: `lib/mdx.test.ts`
- Create: `content/blog/.gitkeep`
- Create: `app/blog/page.tsx`
- Create: `app/blog/[slug]/page.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: Tailwind tokens from Task 1
- Produces: `lib/mdx.ts` exports `interface PostMeta { slug: string; title: string; date: string; excerpt: string }`, `getAllPosts(dir?: string): PostMeta[]`, `getPostBySlug(slug: string, dir?: string): { meta: PostMeta; content: string } | null`

- [ ] **Step 1: Install MDX dependencies**

```bash
npm install gray-matter next-mdx-remote
```

- [ ] **Step 2: Write the failing tests for the MDX loader**

Create `lib/mdx.test.ts`:

```ts
import { describe, it, expect, beforeAll, afterAll } from "vitest"
import fs from "node:fs"
import path from "node:path"
import { getAllPosts, getPostBySlug } from "./mdx"

const FIXTURE_DIR = path.join(process.cwd(), "lib", "__fixtures__", "blog")
const EMPTY_DIR = path.join(process.cwd(), "lib", "__fixtures__", "empty-blog")

beforeAll(() => {
  fs.mkdirSync(FIXTURE_DIR, { recursive: true })
  fs.writeFileSync(
    path.join(FIXTURE_DIR, "hello-world.mdx"),
    `---\ntitle: Hello World\ndate: "2026-01-01"\nexcerpt: A first post\n---\n\nBody content.\n`
  )
})

afterAll(() => {
  fs.rmSync(FIXTURE_DIR, { recursive: true, force: true })
})

describe("getAllPosts", () => {
  it("returns an empty array when the blog directory does not exist", () => {
    expect(getAllPosts(EMPTY_DIR)).toEqual([])
  })

  it("returns parsed post metadata when files exist", () => {
    const posts = getAllPosts(FIXTURE_DIR)
    expect(posts).toEqual([
      { slug: "hello-world", title: "Hello World", date: "2026-01-01", excerpt: "A first post" },
    ])
  })
})

describe("getPostBySlug", () => {
  it("returns null for a missing slug", () => {
    expect(getPostBySlug("does-not-exist", FIXTURE_DIR)).toBeNull()
  })

  it("returns meta and raw content for an existing slug", () => {
    const post = getPostBySlug("hello-world", FIXTURE_DIR)
    expect(post?.meta.title).toBe("Hello World")
    expect(post?.content.trim()).toBe("Body content.")
  })
})
```

- [ ] **Step 3: Run the tests to verify they fail**

Run: `npm run test`
Expected: FAIL — `lib/mdx.ts` does not exist yet.

- [ ] **Step 4: Implement the MDX loader**

Create `lib/mdx.ts`:

```ts
import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"

const DEFAULT_BLOG_DIR = path.join(process.cwd(), "content/blog")

export interface PostMeta {
  slug: string
  title: string
  date: string
  excerpt: string
}

export function getAllPosts(dir: string = DEFAULT_BLOG_DIR): PostMeta[] {
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf-8")
      const { data } = matter(raw)
      return {
        slug: file.replace(/\.mdx$/, ""),
        title: String(data.title),
        date: String(data.date),
        excerpt: String(data.excerpt),
      }
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getPostBySlug(
  slug: string,
  dir: string = DEFAULT_BLOG_DIR
): { meta: PostMeta; content: string } | null {
  const filePath = path.join(dir, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, "utf-8")
  const { data, content } = matter(raw)
  return {
    meta: {
      slug,
      title: String(data.title),
      date: String(data.date),
      excerpt: String(data.excerpt),
    },
    content,
  }
}
```

- [ ] **Step 5: Run the tests to verify they pass**

Run: `npm run test`
Expected: PASS (4 tests)

- [ ] **Step 6: Create the empty content directory and blog pages**

Create `content/blog/.gitkeep` (empty file, keeps the directory tracked in git).

Create `app/blog/page.tsx`:

```tsx
import Link from "next/link"
import { getAllPosts } from "@/lib/mdx"

export default function BlogIndexPage() {
  const posts = getAllPosts()

  return (
    <main className="pt-32 px-6 max-w-3xl mx-auto min-h-[60vh]">
      <h1 className="font-display text-4xl mb-8">Blog</h1>
      {posts.length === 0 ? (
        <p className="text-fg/60 font-mono text-sm">Nothing published yet — check back soon.</p>
      ) : (
        <ul className="space-y-6">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="group block">
                <h2 className="font-display text-2xl group-hover:text-accent">{post.title}</h2>
                <p className="font-mono text-xs text-fg/50 mt-1">{post.date}</p>
                <p className="text-fg/70 mt-2">{post.excerpt}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
```

Create `app/blog/[slug]/page.tsx`:

```tsx
import { notFound } from "next/navigation"
import { MDXRemote } from "next-mdx-remote/rsc"
import { getPostBySlug } from "@/lib/mdx"

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  return (
    <main className="pt-32 px-6 max-w-2xl mx-auto min-h-[60vh]">
      <p className="font-mono text-xs text-fg/50">{post.meta.date}</p>
      <h1 className="font-display text-4xl mt-2 mb-8">{post.meta.title}</h1>
      <article className="prose prose-invert prose-headings:font-display">
        <MDXRemote source={post.content} />
      </article>
    </main>
  )
}
```

- [ ] **Step 7: Link the blog from the homepage nav anchor**

The nav already links to `#blog` (Task 1). Add a lightweight teaser section to `app/page.tsx` linking to `/blog`:

```tsx
import Link from "next/link"
```

Add before the closing `</main>`:

```tsx
<section id="blog" className="px-6 py-24">
  <h2 className="font-mono text-accent text-sm mb-4">blog</h2>
  <Link href="/blog" className="font-display text-2xl hover:text-accent">
    Read the blog →
  </Link>
</section>
```

- [ ] **Step 8: Verify visually**

`npm run dev`, navigate to `http://localhost:3000/blog` via Chrome tool, screenshot.
Expected: empty state message ("Nothing published yet"), no errors in console.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat: add MDX blog scaffold with empty-ready index"
```

---

## Task 7: Contact form (validation + API route)

**Files:**
- Create: `lib/validateContactForm.ts`
- Test: `lib/validateContactForm.test.ts`
- Create: `components/ContactForm.tsx`
- Create: `app/api/contact/route.ts`
- Modify: `app/page.tsx`
- Create: `.env.local.example`

**Interfaces:**
- Consumes: Tailwind tokens from Task 1
- Produces: `lib/validateContactForm.ts` exports `interface ContactFormData { name: string; email: string; message: string; honeypot: string }`, `interface ValidationResult { ok: boolean; errors: Partial<Record<"name" | "email" | "message", string>> }`, `validateContactForm(data: ContactFormData): ValidationResult`

- [ ] **Step 1: Write the failing tests for validation**

Create `lib/validateContactForm.test.ts`:

```ts
import { describe, it, expect } from "vitest"
import { validateContactForm, type ContactFormData } from "./validateContactForm"

function makeData(overrides: Partial<ContactFormData> = {}): ContactFormData {
  return {
    name: "Jane Doe",
    email: "jane@example.com",
    message: "Hey, I'd love to work with you on a project.",
    honeypot: "",
    ...overrides,
  }
}

describe("validateContactForm", () => {
  it("passes with valid data", () => {
    expect(validateContactForm(makeData())).toEqual({ ok: true, errors: {} })
  })

  it("rejects a name shorter than 2 characters", () => {
    const result = validateContactForm(makeData({ name: "J" }))
    expect(result.ok).toBe(false)
    expect(result.errors.name).toBeDefined()
  })

  it("rejects an invalid email", () => {
    const result = validateContactForm(makeData({ email: "not-an-email" }))
    expect(result.ok).toBe(false)
    expect(result.errors.email).toBeDefined()
  })

  it("rejects a message shorter than 10 characters", () => {
    const result = validateContactForm(makeData({ message: "hi" }))
    expect(result.ok).toBe(false)
    expect(result.errors.message).toBeDefined()
  })

  it("silently rejects when the honeypot is filled, with no field errors", () => {
    const result = validateContactForm(makeData({ honeypot: "bot-filled-this" }))
    expect(result.ok).toBe(false)
    expect(result.errors).toEqual({})
  })
})
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npm run test`
Expected: FAIL — `lib/validateContactForm.ts` does not exist yet.

- [ ] **Step 3: Implement validation**

Create `lib/validateContactForm.ts`:

```ts
export interface ContactFormData {
  name: string
  email: string
  message: string
  honeypot: string
}

export interface ValidationResult {
  ok: boolean
  errors: Partial<Record<"name" | "email" | "message", string>>
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateContactForm(data: ContactFormData): ValidationResult {
  if (data.honeypot.trim() !== "") {
    return { ok: false, errors: {} }
  }

  const errors: ValidationResult["errors"] = {}
  if (data.name.trim().length < 2) errors.name = "Name must be at least 2 characters."
  if (!EMAIL_RE.test(data.email.trim())) errors.email = "Enter a valid email address."
  if (data.message.trim().length < 10) errors.message = "Message must be at least 10 characters."

  return { ok: Object.keys(errors).length === 0, errors }
}
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npm run test`
Expected: PASS (5 tests)

- [ ] **Step 5: Build the API route**

```bash
npm install resend
```

Create `.env.local.example`:

```
RESEND_API_KEY=your-resend-api-key-here
CONTACT_TO_EMAIL=nakshatramanglik14@gmail.com
```

Create `app/api/contact/route.ts`:

```ts
import { NextResponse } from "next/server"
import { Resend } from "resend"
import { validateContactForm, type ContactFormData } from "@/lib/validateContactForm"

export async function POST(request: Request) {
  const data = (await request.json()) as ContactFormData
  const result = validateContactForm(data)

  if (!result.ok) {
    if (Object.keys(result.errors).length === 0) {
      // honeypot tripped — pretend success so the bot doesn't learn anything
      return NextResponse.json({ ok: true })
    }
    return NextResponse.json({ ok: false, errors: result.errors }, { status: 400 })
  }

  const resend = new Resend(process.env.RESEND_API_KEY)
  await resend.emails.send({
    from: "Portfolio Contact <onboarding@resend.dev>",
    to: process.env.CONTACT_TO_EMAIL ?? "nakshatramanglik14@gmail.com",
    replyTo: data.email,
    subject: `Portfolio contact from ${data.name}`,
    text: data.message,
  })

  return NextResponse.json({ ok: true })
}
```

- [ ] **Step 6: Build the ContactForm client component**

Create `components/ContactForm.tsx`:

```tsx
"use client"

import { useState } from "react"

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle")
  const [errors, setErrors] = useState<Record<string, string>>({})

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("sending")
    setErrors({})
    const form = e.currentTarget
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
      honeypot: (form.elements.namedItem("company") as HTMLInputElement).value,
    }

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    const body = await res.json()

    if (body.ok) {
      setStatus("sent")
      form.reset()
    } else {
      setStatus("error")
      setErrors(body.errors ?? {})
    }
  }

  if (status === "sent") {
    return <p className="text-accent font-mono">Message sent — thanks, I&apos;ll reply soon.</p>
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md space-y-4">
      <input
        type="text"
        name="company"
        autoComplete="off"
        tabIndex={-1}
        className="hidden"
        aria-hidden="true"
      />
      <div>
        <input
          name="name"
          placeholder="Name"
          required
          className="w-full bg-transparent border border-white/20 px-4 py-3 focus:border-accent outline-none"
        />
        {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
      </div>
      <div>
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="w-full bg-transparent border border-white/20 px-4 py-3 focus:border-accent outline-none"
        />
        {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
      </div>
      <div>
        <textarea
          name="message"
          placeholder="Message"
          required
          rows={5}
          className="w-full bg-transparent border border-white/20 px-4 py-3 focus:border-accent outline-none"
        />
        {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="font-mono text-sm border border-accent text-accent px-5 py-3 hover:bg-accent hover:text-base transition-colors disabled:opacity-50"
      >
        {status === "sending" ? "Sending…" : "Send"}
      </button>
    </form>
  )
}
```

- [ ] **Step 7: Wire it into the page**

Modify `app/page.tsx` to add `import ContactForm from "@/components/ContactForm"` and, before `</main>`:

```tsx
<section id="contact" className="px-6 py-24">
  <h2 className="font-mono text-accent text-sm mb-8">contact</h2>
  <ContactForm />
</section>
```

- [ ] **Step 8: Verify visually**

`npm run dev`, navigate to the contact section via Chrome tool, screenshot the form, then submit it with valid test data and screenshot the success state. Note: without a real `RESEND_API_KEY` in `.env.local` the send will fail server-side — confirm the form still shows a client-side success or error state correctly, and flag to the user that they must add their own Resend API key to `.env.local` (copied from `.env.local.example`) before real emails send.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat: add contact form with validation and honeypot-protected API route"
```

---

## Task 8: Resume PDF wiring

**Files:**
- Create: `public/resume.pdf` (copy of the user's resume)

**Interfaces:**
- Consumes: `/resume.pdf` is already linked from `components/Hero.tsx` (Task 2) and `components/Footer.tsx` (Task 1)
- Produces: nothing new consumed by later tasks

- [ ] **Step 1: Copy the resume into the public directory**

```bash
mkdir -p public
cp "/c/Users/naksh/Downloads/Resume-1.pdf" "public/resume.pdf"
```

(If running in PowerShell instead: `Copy-Item "C:\Users\naksh\Downloads\Resume-1.pdf" -Destination "public\resume.pdf"`.)

- [ ] **Step 2: Verify the links work**

`npm run dev`, use the Chrome tool to click the "Resume ↓" link in the hero and the "Resume" link in the footer.
Expected: both open `http://localhost:3000/resume.pdf` and render the actual PDF, no 404.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "chore: wire up resume PDF download"
```

---

## Task 9: Final verification — Lighthouse + responsive pass

**Files:**
- None created; this task verifies the whole site and fixes anything it finds in the files from Tasks 1-8.

**Interfaces:**
- Consumes: the full site from Tasks 1-8
- Produces: nothing new

- [ ] **Step 1: Production build**

Run: `npm run build && npm run start`
Expected: build succeeds with no type errors; server starts on `http://localhost:3000`.

- [ ] **Step 2: Run Lighthouse**

```bash
npx --yes lighthouse http://localhost:3000 --output=json --output-path=./lighthouse-report.json --chrome-flags="--headless"
```

If the CLI can't find Chrome, open `http://localhost:3000` in the Chrome tool instead and run Lighthouse from Chrome DevTools manually.

Expected: Performance and Accessibility scores both 90+. If either is below 90, read `lighthouse-report.json` for the specific failing audits and fix them (common culprits: unoptimized font loading, missing `alt` text, color contrast — check the accent-on-black text isn't used for body copy).

- [ ] **Step 3: Responsive check**

Using the Chrome tool, resize the browser window (or use `resize_window`) to three widths — 390px (mobile), 768px (tablet), 1440px (desktop) — and screenshot the full page at each via scrolling.
Expected: no horizontal scroll, nav collapses sensibly on mobile (the `md:flex` nav links are hidden below `768px` per Task 1 — confirm this doesn't leave mobile users without navigation; if it does, add a simple mobile menu here), project grid drops to one column on mobile, contact form stays readable.

- [ ] **Step 4: Console check**

Use `read_console_messages` on the running dev/prod server across the main page and `/blog`.
Expected: no errors or warnings.

- [ ] **Step 5: Commit any fixes made during this task**

```bash
git add -A
git commit -m "fix: address lighthouse and responsive issues from final verification"
```

(Skip this commit if no fixes were needed.)

---

## Task 10: Motion infrastructure + scroll reveals

**Added 2026-08-21** after the user reviewed the shipped site and asked for a bolder,
more animated pass. Reinstates Framer Motion (struck earlier in the final review as
unrequested scope — now explicitly requested).

**Files:**
- Create: `components/RevealSection.tsx`
- Modify: `components/About.tsx`, `components/Experience.tsx`, `components/BuildingNow.tsx`, `components/Skills.tsx`, `components/Projects.tsx`, `app/page.tsx`, `components/Nav.tsx`, `components/Hero.tsx`, `app/globals.css`

**Interfaces:**
- Consumes: nothing new from earlier tasks
- Produces: `components/RevealSection.tsx` exports default `RevealSection({ children, className, delay }: { children: React.ReactNode; className?: string; delay?: number })` — a `motion.div` that fades/slides up once when scrolled into view. Later polish (Task 11) does not depend on this.

- [ ] **Step 1: Install Framer Motion**

```bash
npm install framer-motion
```

- [ ] **Step 2: Build the reveal wrapper**

Create `components/RevealSection.tsx`:

```tsx
"use client"

import { motion } from "framer-motion"

export default function RevealSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}
```

- [ ] **Step 3: Wrap section content (not the `<section>` tag itself — keep `id` on the outer `<section>` so nav anchors still work)**

For `components/About.tsx`, `components/BuildingNow.tsx`: wrap the existing inner JSX (everything currently inside the `<section>`) in `<RevealSection>`, e.g.:

```tsx
import RevealSection from "@/components/RevealSection"

export default function About() {
  return (
    <section id="about" className="px-6 py-24 max-w-3xl">
      <RevealSection>
        <h2 className="font-mono text-accent text-sm mb-4">about</h2>
        {/* ...rest of existing content unchanged... */}
      </RevealSection>
    </section>
  )
}
```

Apply the same pattern to `BuildingNow.tsx` (wrap its heading+paragraphs).

- [ ] **Step 4: Stagger the Experience list**

In `components/Experience.tsx`, wrap each `<li>`'s content in `<RevealSection delay={index * 0.1}>` (the `.map()` callback needs an `index` param now):

```tsx
<ol className="space-y-10">
  {EXPERIENCE.map((entry, index) => (
    <li key={entry.role + entry.period} className="border-l border-white/10 pl-6">
      <RevealSection delay={index * 0.1}>
        <p className="font-mono text-sm text-fg/50">{entry.period}</p>
        <h3 className="font-display text-2xl mt-1">
          {entry.role} · {entry.org}
        </h3>
        <p className="mt-2 text-fg/70 leading-relaxed">{entry.detail}</p>
      </RevealSection>
    </li>
  ))}
</ol>
```

- [ ] **Step 5: Stagger the Projects manifest rows**

In `components/Projects.tsx`, wrap each `<ProjectCard>` in `<RevealSection delay={index * 0.08}>` (the `.map()` callback needs an `index` param):

```tsx
<div>
  {projects.map((project, index) => (
    <RevealSection key={project.name} delay={index * 0.08}>
      <ProjectCard project={project} />
    </RevealSection>
  ))}
</div>
```

- [ ] **Step 6: Stagger the Skills categories**

In `components/Skills.tsx`, wrap each category block in `<RevealSection delay={index * 0.08}>` (the `.map()` callback needs an `index` param):

```tsx
<div className="grid md:grid-cols-3 gap-8">
  {skillCategories.map((category, index) => (
    <RevealSection key={category.name} delay={index * 0.08}>
      <h3 className="font-display text-lg mb-3">{category.name}</h3>
      {/* item list — Task 11 replaces this with a marquee, leave as-is for now */}
      <ul className="flex flex-wrap gap-2">
        {category.items.map((item) => (
          <li key={item} className="font-mono text-xs border border-white/10 px-2 py-1 text-fg/60">
            {item}
          </li>
        ))}
      </ul>
    </RevealSection>
  ))}
</div>
```

- [ ] **Step 7: Reveal the contact section**

In `app/page.tsx`, wrap the contact section's heading+form in `<RevealSection>`:

```tsx
<section id="contact" className="px-6 py-24">
  <RevealSection>
    <h2 className="font-mono text-accent text-sm mb-8">contact</h2>
    <ContactForm />
  </RevealSection>
</section>
```

- [ ] **Step 8: Nav fade-in on load**

Add to `app/globals.css` (after the existing `flap-in`/`flap-cell` rules):

```css
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

In `components/Nav.tsx`, add `animate-[fade-in_0.5s_ease-out]` to the `<header>`'s existing className.

- [ ] **Step 9: Delay the hero's subtext and CTAs so they land after the name finishes flapping in**

Add to `app/globals.css`:

```css
@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

In `components/Hero.tsx`, leave the badge/name/tagline untouched (they already animate via `flap-cell`). Add to the supporting-text `<p>` and the CTA `<div>`:

```tsx
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
  {/* existing Resume/Get in touch links unchanged */}
</div>
```

- [ ] **Step 10: Verify**

`npm run build` must succeed. If Chrome browser automation tools are available, load the dev server, reload the page, and confirm: the nav fades in, the hero's subtext/CTAs land after the name finishes flapping, and scrolling down reveals each section (About, Experience entries one-by-one, Projects rows one-by-one, Building Now, Skills categories one-by-one, Contact) with a fade/slide-up rather than appearing instantly. If Chrome tools are NOT available, say so explicitly and rely on build success + code review — don't fabricate a visual check.

- [ ] **Step 11: Commit**

```bash
git add -A
git commit -m "feat: add scroll-triggered reveals and load-in stagger via Framer Motion"
```

---

## Task 11: Interactive polish (hover tilt, marquee ticker, hero depth)

**Files:**
- Create: `lib/tilt.ts`
- Test: `lib/tilt.test.ts`
- Modify: `components/ProjectCard.tsx`, `components/Skills.tsx`, `components/Hero.tsx`, `app/globals.css`

**Interfaces:**
- Consumes: Task 10's `RevealSection` (already wraps `ProjectCard` and each Skills category — this task changes what's *inside* those wrappers, not the wrapping itself)
- Produces: `lib/tilt.ts` exports `computeTilt(mouseX: number, mouseY: number, rect: { left: number; top: number; width: number; height: number }, maxDeg?: number): { rotateX: number; rotateY: number }`

- [ ] **Step 1: Write the failing test for the tilt math**

Create `lib/tilt.test.ts`:

```ts
import { describe, it, expect } from "vitest"
import { computeTilt } from "./tilt"

describe("computeTilt", () => {
  const rect = { left: 0, top: 0, width: 200, height: 100 }

  it("returns zero tilt when the cursor is at the exact center", () => {
    expect(computeTilt(100, 50, rect)).toEqual({ rotateX: 0, rotateY: 0 })
  })

  it("tilts based on cursor offset from center, capped at maxDeg", () => {
    const result = computeTilt(200, 100, rect, 6) // bottom-right corner
    expect(result.rotateX).toBeLessThan(0)
    expect(result.rotateY).toBeGreaterThan(0)
    expect(Math.abs(result.rotateX)).toBeLessThanOrEqual(6)
    expect(Math.abs(result.rotateY)).toBeLessThanOrEqual(6)
  })

  it("returns zero tilt when maxDeg is 0", () => {
    expect(computeTilt(200, 100, rect, 0)).toEqual({ rotateX: 0, rotateY: 0 })
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm run test`
Expected: FAIL — `lib/tilt.ts` does not exist yet.

- [ ] **Step 3: Implement the tilt math**

Create `lib/tilt.ts`:

```ts
interface Rect {
  left: number
  top: number
  width: number
  height: number
}

export function computeTilt(
  mouseX: number,
  mouseY: number,
  rect: Rect,
  maxDeg: number = 6
): { rotateX: number; rotateY: number } {
  const px = (mouseX - rect.left) / rect.width - 0.5
  const py = (mouseY - rect.top) / rect.height - 0.5
  return {
    rotateX: -py * 2 * maxDeg,
    rotateY: px * 2 * maxDeg,
  }
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm run test`
Expected: PASS (3 tests)

- [ ] **Step 5: Add subtle hover tilt to project manifest rows**

Modify `components/ProjectCard.tsx` — add `"use client"` at the top (required for the mouse handlers/state), and wire in the tilt:

```tsx
"use client"

import { useRef, useState } from "react"
import type { Project } from "@/data/projects"
import { computeTilt } from "@/lib/tilt"

export default function ProjectCard({ project }: { project: Project }) {
  const ref = useRef<HTMLDetailsElement>(null)
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 })

  function handleMouseMove(e: React.MouseEvent<HTMLDetailsElement>) {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    setTilt(computeTilt(e.clientX, e.clientY, rect, 3))
  }

  function handleMouseLeave() {
    setTilt({ rotateX: 0, rotateY: 0 })
  }

  return (
    <details
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group border-b border-white/10 py-4 transition-transform duration-150 ease-out"
      style={{ transform: `perspective(800px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)` }}
    >
      {/* existing <summary> and content unchanged */}
    </details>
  )
}
```

Keep the existing `<summary>`/`<div>` content exactly as it is today — only the outer `<details>` element's opening tag and the `"use client"`/imports/state change.

- [ ] **Step 6: Convert the skills item lists into an infinite marquee ticker per category**

Add to `app/globals.css`:

```css
@keyframes marquee {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}
```

Modify `components/Skills.tsx`'s item-list rendering (inside the `RevealSection` from Task 10, replacing the plain `<ul>`):

```tsx
<div className="overflow-hidden">
  <div className="flex gap-2 w-max animate-[marquee_20s_linear_infinite] hover:[animation-play-state:paused]">
    {[...category.items, ...category.items].map((item, i) => (
      <span
        key={`${item}-${i}`}
        className="font-mono text-xs border border-white/10 px-2 py-1 text-fg/60 shrink-0"
      >
        {item}
      </span>
    ))}
  </div>
</div>
```

The list is duplicated exactly once (`[...items, ...items]`) so `translateX(-50%)` loops seamlessly — the second copy lines up exactly where the first started.

- [ ] **Step 7: Give the hero background more depth (grain + layered static glow)**

Add to `app/globals.css`:

```css
.grain-overlay::before {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0.05;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}
```

In `components/Hero.tsx`, add `grain-overlay` to the `<section id="hero">`'s className (it already has `relative overflow-hidden`, which this depends on), and add a layered glow directly after the opening `<section>` tag, before the existing badge `<p>`:

```tsx
<div className="pointer-events-none absolute inset-0 overflow-hidden">
  <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />
  <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-board blur-3xl opacity-40" />
</div>
```

- [ ] **Step 8: Verify**

`npm run test` must show all tests passing (including the 3 new tilt tests). `npm run build` must succeed. If Chrome browser automation tools are available, hover over a few project rows to confirm the tilt follows the cursor subtly and resets on mouse-leave, confirm the skills tickers scroll continuously and pause on hover, and confirm the hero background reads as textured/layered rather than flat. If Chrome tools are NOT available, say so explicitly — don't fabricate a visual check.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat: add project hover-tilt, skills marquee ticker, and hero depth"
```

---

## Manual follow-up for the user (not part of this plan's automation)

- Create a Resend account, verify a sending domain, and put the real `RESEND_API_KEY` in `.env.local`
- Create a Vercel account/project and deploy (`vercel` CLI or Vercel dashboard import from git)
- Point a custom domain at the Vercel deployment if desired
- Write and drop real posts into `content/blog/*.mdx` whenever ready — the blog already handles going from empty to populated with no code changes
- Before or when writing the first real blog post: install `@tailwindcss/typography` (`npm i -D @tailwindcss/typography`, add `@plugin "@tailwindcss/typography";` to `app/globals.css`) — the `prose`/`prose-invert` classes on the post page are currently inert without it (confirmed by the user, deferred on purpose, not forgotten)
