import type { Metadata } from "next"
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google"
import Nav from "@/components/Nav"
import Footer from "@/components/Footer"
import "./globals.css"

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-plex-mono",
  weight: ["400", "600", "700"],
})
const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-plex-sans",
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
