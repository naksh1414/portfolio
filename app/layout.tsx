import type { Metadata } from "next"
import { DM_Sans } from "next/font/google"
import { SpeedInsights } from "@vercel/speed-insights/next"
import Nav from "@/components/Nav"
import Footer from "@/components/Footer"
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "@/lib/site"
import "./globals.css"

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: `%s — ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  keywords: [
    "Nakshatra Manglik",
    "Software Engineer",
    "Full Stack Developer",
    "Node.js",
    "Next.js",
    "TypeScript",
    "Microservices",
    "SIH 2024 winner",
    "MetaUpSpace",
    "Portfolio",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: { card: "summary_large_image", title: SITE_TITLE, description: SITE_DESCRIPTION },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body className="text-fg font-sans antialiased">
        <Nav />
        {children}
        <Footer />
        <SpeedInsights />
      </body>
    </html>
  )
}
