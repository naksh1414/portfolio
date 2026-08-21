# Portfolio

Nakshatra Manglik's personal portfolio — a Next.js site with a departure-board
(split-flap) visual theme.

## Tech stack

- [Next.js](https://nextjs.org) (App Router)
- TypeScript
- Tailwind CSS v4
- Vitest for unit tests

## Setup

```bash
npm install
cp .env.local.example .env.local
```

Fill in `.env.local`:

- `RESEND_API_KEY` — get one from [resend.com](https://resend.com); the contact
  form uses it to send email. Verify a sending domain there for production use.
- `CONTACT_TO_EMAIL` — the address contact form submissions are sent to.

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run start` — run the production build
- `npm run test` — run the Vitest suite

## Content

- `data/projects.ts`, `data/skills.ts`, `components/Experience.tsx` — resume-derived
  content (projects, skills, work experience).
- `content/blog/*.mdx` — blog posts. Currently empty; drop in `.mdx` files with
  `title`, `date`, and `excerpt` frontmatter to publish a post.

## Deploy

Built for [Vercel](https://vercel.com). In production, the contact form needs
a verified Resend sending domain — the default `onboarding@resend.dev` sender
only delivers to the Resend account owner, not to third parties.
