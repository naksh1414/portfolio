import { NextResponse } from "next/server"
import { Resend } from "resend"
import { validateContactForm, type ContactFormData } from "@/lib/validateContactForm"
import { CONTACT_EMAIL } from "@/lib/site"
import { rateLimit } from "@/lib/rateLimit"

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown"
  if (!rateLimit(ip, 5, 10 * 60 * 1000)) {
    return NextResponse.json({ ok: false, errors: {}, rateLimited: true }, { status: 429 })
  }

  const body = await request.json().catch(() => null)
  if (
    !body ||
    typeof body.name !== "string" ||
    typeof body.email !== "string" ||
    typeof body.message !== "string" ||
    typeof body.honeypot !== "string"
  ) {
    return NextResponse.json({ ok: false, errors: {} }, { status: 400 })
  }
  const data = body as ContactFormData

  const result = validateContactForm(data)

  if (!result.ok) {
    if (Object.keys(result.errors).length === 0) {
      // honeypot tripped — pretend success so the bot doesn't learn anything
      return NextResponse.json({ ok: true })
    }
    return NextResponse.json({ ok: false, errors: result.errors }, { status: 400 })
  }

  // Save to the sheet and email in parallel; the message is safe if either lands.
  const [saved, emailed] = await Promise.allSettled([saveToSheet(data), sendEmail(data)])
  if (saved.status === "rejected") console.error("sheetdb save failed", saved.reason)
  if (emailed.status === "rejected") console.error("resend send failed", emailed.reason)

  if (saved.status === "rejected" && emailed.status === "rejected") {
    return NextResponse.json({ ok: false, errors: {} }, { status: 502 })
  }
  return NextResponse.json({ ok: true })
}

async function saveToSheet(data: ContactFormData) {
  const url = process.env.SHEETDB_URL
  if (!url) throw new Error("SHEETDB_URL not set")
  // Keys must match the sheet's header row.
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      data: [{ name: data.name, email: data.email, message: data.message, submitted_at: new Date().toISOString() }],
    }),
  })
  if (!res.ok) throw new Error(`SheetDB ${res.status}: ${await res.text()}`)
}

async function sendEmail(data: ContactFormData) {
  if (!process.env.RESEND_API_KEY) throw new Error("RESEND_API_KEY not set")
  const resend = new Resend(process.env.RESEND_API_KEY)
  const { error } = await resend.emails.send({
    from: "Portfolio Contact <onboarding@resend.dev>",
    to: process.env.CONTACT_TO_EMAIL ?? CONTACT_EMAIL,
    replyTo: data.email,
    subject: `Portfolio contact from ${data.name}`,
    text: data.message,
  })
  if (error) throw new Error(JSON.stringify(error))
}
