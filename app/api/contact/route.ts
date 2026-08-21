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
