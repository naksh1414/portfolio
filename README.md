# Nakshatra Manglik — Portfolio

**Live:** [naksh-codes.vercel.app](https://naksh-codes.vercel.app)

Personal portfolio of Nakshatra Manglik, Software Engineer at MetaUpSpace and SIH 2024 national
hackathon winner. A light, frosted-glass design with a built-in booking calendar, a contact form
that lands in a Google Sheet and your inbox, and production-grade SEO, performance and security.

## Features

- **Glassmorphism UI** — hero with photo and floating stat cards, about, services, technologies,
  selected work (expandable case studies), experience, process, booking, contact. Responsive down to 360px.
- **Book a call** — Cal.com calendar embedded on the page, loaded only when the visitor clicks
  "Pick a time" (saves ~1MB for everyone else).
- **Booking notifications** — `/api/cal-webhook` verifies Cal.com's HMAC signature and emails new,
  rescheduled and cancelled bookings via Resend.
- **Contact form** — `/api/contact` validates input, blocks bots with a honeypot, rate-limits to
  5 submissions / 10 min per IP, then saves the message to SheetDB (Google Sheets) and emails it
  via Resend in parallel. The visitor sees success if either succeeds.
- **SEO** — page metadata, canonical URLs, Open Graph / Twitter cards with a generated share image,
  `sitemap.xml`, `robots.txt`, and Person JSON-LD structured data.
- **Performance** — statically prerendered pages, self-hosted DM Sans via `next/font`, AVIF/WebP
  images (42KB hero), reduced blur on mobile, Vercel Speed Insights.
- **Security** — Content-Security-Policy, HSTS, `X-Frame-Options`, `nosniff`, Referrer and
  Permissions policies (see `next.config.ts`). Secrets live only in environment variables.
- **Blog** — MDX posts from `content/blog/`, with per-post metadata and sitemap entries.

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack) · React 19 · TypeScript
- Tailwind CSS v4
- [Resend](https://resend.com) (email) · [SheetDB](https://sheetdb.io) (Google Sheets API) ·
  [Cal.com](https://cal.com) (scheduling)
- Vitest · ESLint
- Hosted on [Vercel](https://vercel.com)

## Getting started

```bash
npm install
cp .env.local.example .env.local   # then fill in the values below
npm run dev                        # http://localhost:3000
```

### Environment variables

| Variable | Required | What it's for |
| --- | --- | --- |
| `RESEND_API_KEY` | yes | Sends contact-form and booking emails. From [resend.com](https://resend.com). |
| `CONTACT_TO_EMAIL` | yes | Where those emails are delivered. |
| `SHEETDB_URL` | yes | SheetDB API URL; contact submissions are appended as rows. |
| `CAL_WEBHOOK_SECRET` | yes | Secret set on the Cal.com webhook; unsigned requests are rejected. |
| `NEXT_PUBLIC_SITE_URL` | no | Canonical domain for SEO. Defaults to `https://naksh-codes.vercel.app`. |

Set the same variables in Vercel → Project → Settings → Environment Variables.

### External setup

- **SheetDB** — the sheet's first row must be the headers `name | email | message | submitted_at`.
- **Cal.com webhook** — Settings → Developer → Webhooks: subscriber URL
  `https://naksh-codes.vercel.app/api/cal-webhook`, events *Booking Created / Rescheduled / Cancelled*,
  secret = `CAL_WEBHOOK_SECRET`. The booking link itself is `CAL_LINK` in `lib/site.ts`.
- **Resend** — the default sender `onboarding@resend.dev` only delivers to the Resend account's own
  address. To email anyone else, verify a domain in Resend and update the `from:` address in
  `app/api/contact/route.ts` and `app/api/cal-webhook/route.ts`.

## Scripts

| Command | Does |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm test` | Vitest suite (data, validation, tilt, Cal signature, rate limiter) |

## Project structure

```
app/
  page.tsx               home page + Person JSON-LD
  layout.tsx             fonts, global metadata, nav/footer, Speed Insights
  api/contact/           contact form → SheetDB + Resend
  api/cal-webhook/       Cal.com booking notifications
  blog/                  MDX blog index and posts
  sitemap.ts robots.ts opengraph-image.tsx
components/              one file per section (Hero, About, Services, Skills, Projects, ...)
data/                    projects, skills, testimonials
lib/                     site constants, form validation, MDX loader, rate limiter, signature check
content/blog/            *.mdx posts (title, date, excerpt frontmatter)
public/                  photo (nakshatra.webp) and resume.pdf
```

## Editing content

- **Personal details / links** — `lib/site.ts` (name, description, GitHub, LinkedIn, email, Cal link).
- **Projects** — `data/projects.ts`. **Skills** — `data/skills.ts`.
  **Experience** — `components/Experience.tsx`. **Services** — `components/Services.tsx`.
- **Testimonials** — add entries to `data/testimonials.ts`; the section stays hidden while empty.
- **Photo / resume** — replace `public/nakshatra.webp` and `public/resume.pdf`.
- **Blog** — drop an `.mdx` file into `content/blog/` with `title`, `date` and `excerpt` frontmatter.

## Credits

Design inspired by a
[Pinterest portfolio concept](https://in.pinterest.com/pin/16958936097815287/).
