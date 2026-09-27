export const GITHUB_URL = "https://github.com/naksh1414"
export const LINKEDIN_URL = "https://www.linkedin.com/in/nakshatra-manglik/"
export const CONTACT_EMAIL = "nakshatramanglik14@gmail.com"
export const CAL_LINK = "nakshatra-manglik-heurb2/30min"

// Set NEXT_PUBLIC_SITE_URL to your domain; on Vercel the production domain is picked up automatically.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")
export const SITE_NAME = "Nakshatra Manglik"
export const SITE_TITLE = "Nakshatra Manglik — Software Engineer"
export const SITE_DESCRIPTION =
  "Software Engineer at MetaUpSpace and SIH 2024 national hackathon winner. I build AI-powered tools, scalable Node.js/Next.js backends, and infrastructure that holds up under real load."
