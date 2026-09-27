"use client"

import { useState } from "react"
import { FiCalendar } from "react-icons/fi"

// Cal.com's booking page pulls in ~1MB of scripts, so only load it once someone asks for it.
export default function CalEmbed({ calLink }: { calLink: string }) {
  const [open, setOpen] = useState(false)

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="w-full h-64 flex flex-col items-center justify-center gap-3 text-fg/60 hover:text-fg transition-colors"
      >
        <span className="w-14 h-14 rounded-2xl bg-violet-100 text-accent flex items-center justify-center">
          <FiCalendar size={26} aria-hidden />
        </span>
        <span className="rounded-full bg-fg text-white px-6 py-3 text-sm font-medium">Pick a time</span>
        <span className="text-xs">Opens my Cal.com calendar</span>
      </button>
    )
  }

  return (
    <iframe
      src={`https://cal.com/${calLink}?theme=light&layout=month_view`}
      title="Book a call with Nakshatra"
      className="w-full h-[700px] bg-white"
    />
  )
}
