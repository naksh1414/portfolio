"use client"

import { useState } from "react"
import { FiSend } from "react-icons/fi"

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle")
  const [errors, setErrors] = useState<Record<string, string>>({})

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("sending")
    setErrors({})
    const form = e.currentTarget
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
      honeypot: (form.elements.namedItem("company") as HTMLInputElement).value,
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      const body = await res.json()

      if (body.ok) {
        setStatus("sent")
        form.reset()
      } else {
        setStatus("error")
        setErrors(body.errors ?? {})
      }
    } catch {
      setStatus("error")
      setErrors({})
    }
  }

  const field =
    "w-full bg-white/70 border border-white rounded-xl px-4 py-3 text-sm placeholder:text-fg/40 focus:border-accent/50 focus:ring-2 focus:ring-accent/15 outline-none transition"

  if (status === "sent") {
    return (
      <p className="h-full flex items-center justify-center px-6 py-12 text-center text-accent font-medium">
        Message sent — thanks, I&apos;ll reply soon.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="text"
        name="company"
        autoComplete="off"
        tabIndex={-1}
        className="hidden"
        aria-hidden="true"
      />
      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <label htmlFor="name" className="sr-only">Your Name</label>
          <input id="name" name="name" placeholder="Your Name" required className={field} />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email" className="sr-only">Your Email</label>
          <input id="email" name="email" type="email" placeholder="Your Email" required className={field} />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>
      </div>
      <div>
        <label htmlFor="message" className="sr-only">Your Message</label>
        <textarea id="message" name="message" placeholder="Your Message" required rows={6} className={`${field} resize-none`} />
        {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
      </div>
      {status === "error" && Object.keys(errors).length === 0 && (
        <p className="text-red-500 text-sm">
          Something went wrong sending that — email me directly instead.
        </p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full sm:w-auto sm:px-16 rounded-xl bg-fg text-white py-3 text-sm font-medium hover:opacity-85 transition-opacity disabled:opacity-50"
      >
        {status === "sending" ? "Sending…" : (
          <>
            Send Message <FiSend aria-hidden className="inline -mt-0.5 ml-1" />
          </>
        )}
      </button>
    </form>
  )
}
