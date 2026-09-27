import { ImageResponse } from "next/og"
import { SITE_NAME } from "@/lib/site"

export const alt = `${SITE_NAME} — Software Engineer`
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

// Social share card shown when the site is linked on LinkedIn, X, WhatsApp, etc.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #f4f1ff 0%, #e6e0ff 55%, #dfe7ff 100%)",
          color: "#0e0f1f",
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 6, color: "#7c5cff", fontWeight: 600 }}>HELLO, I&apos;M</div>
        <div style={{ fontSize: 96, fontWeight: 700, marginTop: 16, letterSpacing: -2 }}>{SITE_NAME}</div>
        <div style={{ fontSize: 56, fontWeight: 600, color: "#8b5cf6", marginTop: 8 }}>Software Engineer</div>
        <div style={{ fontSize: 30, color: "#55566a", marginTop: 32, maxWidth: 900 }}>
          AI-powered tools · Node.js &amp; Next.js · Infrastructure that holds up under load · SIH 2024 winner
        </div>
      </div>
    ),
    size
  )
}
