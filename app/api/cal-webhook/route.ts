import { NextResponse } from "next/server"
import { Resend } from "resend"
import { verifyCalSignature } from "@/lib/verifyCalSignature"
import { CONTACT_EMAIL } from "@/lib/site"

interface CalAttendee {
  name?: string
  email?: string
  timeZone?: string
}

interface CalWebhook {
  triggerEvent?: string
  payload?: {
    title?: string
    startTime?: string
    endTime?: string
    location?: string
    additionalNotes?: string
    attendees?: CalAttendee[]
  }
}

const SUBJECTS: Record<string, string> = {
  BOOKING_CREATED: "New booking",
  BOOKING_RESCHEDULED: "Booking rescheduled",
  BOOKING_CANCELLED: "Booking cancelled",
}

export async function POST(request: Request) {
  const raw = await request.text()

  if (!verifyCalSignature(raw, request.headers.get("x-cal-signature-256"), process.env.CAL_WEBHOOK_SECRET)) {
    return NextResponse.json({ ok: false }, { status: 401 })
  }

  let event: CalWebhook
  try {
    event = JSON.parse(raw)
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  const subject = SUBJECTS[event.triggerEvent ?? ""]
  // PING (Cal's "test webhook" button) and events we don't care about: ack and stop.
  if (!subject || !event.payload) return NextResponse.json({ ok: true })

  const { title, startTime, endTime, location, additionalNotes, attendees = [] } = event.payload
  const guest = attendees[0]
  const text = [
    `${subject}: ${title ?? "Untitled"}`,
    `When: ${startTime ?? "?"} → ${endTime ?? "?"}${guest?.timeZone ? ` (guest tz: ${guest.timeZone})` : ""}`,
    `Who: ${attendees.map((a) => `${a.name ?? "?"} <${a.email ?? "?"}>`).join(", ") || "?"}`,
    location && `Where: ${location}`,
    additionalNotes && `Notes: ${additionalNotes}`,
  ]
    .filter(Boolean)
    .join("\n")

  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const { error } = await resend.emails.send({
      from: "Portfolio Bookings <onboarding@resend.dev>",
      to: process.env.CONTACT_TO_EMAIL ?? CONTACT_EMAIL,
      replyTo: guest?.email,
      subject: `${subject}: ${guest?.name ?? title ?? "Cal.com"}`,
      text,
    })
    if (error) {
      console.error("cal webhook: resend send failed", error)
      // 5xx so Cal.com retries delivery.
      return NextResponse.json({ ok: false }, { status: 502 })
    }
  } catch (err) {
    console.error("cal webhook: resend send threw", err)
    return NextResponse.json({ ok: false }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
