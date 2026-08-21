# Portfolio Site — Design Spec

## Purpose

Personal portfolio for Nakshatra Manglik: Software Engineer at MetaUpSpace, SIH 2024
national hackathon winner, builder of AI-tooling and infra projects, currently building
early-stage products (stealth — teased, not detailed). Primary goals: credibility with
recruiters/technical peers, and a distinct visual identity that stands out from template
portfolios.

## Research basis

Reviewed award-cited developer portfolios (Brittany Chiang, Bruno Simon, Josh Comeau
style references) plus live sourcing from Dribbble ("developer portfolio" search) and
Pinterest (dark minimal developer portfolio search) on 2026-08-21. Recurring patterns in
standout sites:

- Near-black background, ONE loud accent color (red, lime, or amber) — not generic blue
- Oversized editorial display type for name/tagline — poster-like, not a cautious H1
- Monospace used sparingly for code-flavored labels/tags (nods to identity as engineer)
- Large image tiles for project showcases, not small icon grids
- One restrained interactive "wow" moment (cursor-reactive glow/spotlight in hero) rather
  than animation everywhere
- Case-study depth (problem → approach → result) beats bullet-dump project lists
- Fast load + mobile-first is non-negotiable — the #1 credibility killer when missed
- Clear singular value-prop headline, visible without scrolling
- Stale/empty sections read as abandoned — every section shipped must have real content

Anti-patterns to avoid: animating everything, slow load from heavy motion libs, unclear
value prop, burying the CTA, template-locked look with no customization.

## Visual direction

Redesigned 2026-08-21 after a frontend-design pass flagged the original dark+lime
direction as the generic "near-black + acid accent" AI-portfolio cliché. Replaced with a
direction grounded in the subject's own work: he won SIH 2024 with a bus duty-scheduling
system and built a load balancer that routes traffic — both dispatch/routing problems.
New direction: **departure-board / dispatch-console.**

- **Palette (named):** `ink` `#0E1116` (blue-black board enclosure, not pure black),
  `board` `#171B21` (panel surfaces), `paper` `#ECE7DC` (warm cream, used sparingly for
  flap-card insets), `flap-amber` `#FFA23A` (the one interactive accent — split-flap LED
  amber)
- **Type:** single superfamily, IBM Plex, used across three roles — Plex Mono Bold at
  poster scale for hero/section headers (mimics split-flap character cells), Plex Sans
  for body copy, Plex Mono small for nav/tags/labels
- **Signature interaction:** hero name renders as individual monospace flap-cells that
  mechanically flip in on load (CSS-only), then the tagline cycles through 2-3 role
  descriptors ("SOFTWARE ENGINEER" → "SIH 2024 WINNER" → "BUILDING SOMETHING NEW") like a
  real departure board
- **Metaphor carries through:** the Projects section renders as manifest rows (date ·
  name · status) rather than generic cards, so the dispatch-board concept isn't just a
  hero gimmick
- **Motion budget:** CSS animations only for the flap-flip and tagline cycling. No
  scroll-triggered reveal library — the hero flap animation is the one signature
  interaction the site needs; adding a dependency for fades elsewhere was struck during
  the final review (2026-08-21) as unrequested scope. Nothing on every card/hover by
  default.

## Content structure (sections, in order)

1. **Hero** — name as split-flap cells, one-line positioning cycling through 2-3 role
   descriptors, primary CTA (resume/contact)
2. **About** — short bio: KIET B.Tech (2022–2026), path from Trainee → SWE at
   MetaUpSpace, what he builds and cares about
3. **Experience** — MetaUpSpace timeline: Trainee (Nov 2024–Feb 2025) → Software
   Engineer (Feb 2025–present), one line each on scope/impact
4. **Projects** — manifest rows (date · name · status) for the 5 flagship resume
   projects, each expanding to problem → approach → result, tech-stack chips:
   - Bus Tech (SIH 2024 winner, DTC bus scheduling)
   - Smart Load Balancer
   - Pharmansh (WMS, 10k+ concurrent users)
   - DecentraPay (Ethereum payment gateway)
   - Trello Clone (AI-powered kanban)
5. **Building now** — stealth teaser: vague framing ("currently building something
   new"), no specifics per explicit choice
6. **Skills** — grouped by category from resume (Languages, Infrastructure, Frameworks,
   Cloud & DevOps, AI/ML Tools)
7. **Blog** — MDX-backed, empty-ready (no posts required at launch, structure only)
8. **Contact** — form (name/email/message) + footer socials (GitHub, LinkedIn, email)
   + resume PDF download

## Tech stack

- Next.js 15 (App Router), TypeScript, Tailwind CSS
- CSS-only animation for the hero split-flap interaction — no motion library (see motion
  budget above)
- MDX for blog posts (`content/blog/*.mdx`), empty at launch
- Contact form: Next.js API route → Resend for email delivery, honeypot field for spam
- Resume PDF served as static asset (`/public/resume.pdf`), linked from hero + footer
- Deploy target: Vercel

## Data source

- Resume PDF (`Resume-1.pdf`) is source of truth for experience/education/skills
- GitHub (`github.com/naksh1414`) repo descriptions are mostly empty — project copy is
  hand-written for the site, not pulled from repo metadata
- LinkedIn profile is auth-walled, inaccessible for scraping — resume already covers the
  same ground, no gap

## Testing / verification

- Lighthouse pass (performance + accessibility) before calling any page done
- Manual responsive check at mobile/tablet/desktop breakpoints
- One smoke check on the contact-form submit path (API route logic), not a full test
  framework — static-content site doesn't warrant one

## Out of scope

- CMS/admin panel for content — content is hand-authored in code/MDX
- User accounts, auth, or any backend beyond the contact-form route
- Full 3D/WebGL hero scene (considered, rejected for build-effort vs. payoff — the
  CSS-only split-flap hero covers the "wow" requirement without the maintenance cost)
