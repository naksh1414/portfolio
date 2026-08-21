"use client"

import { useState } from "react"

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
  }

  if (status === "sent") {
    return <p className="text-accent font-mono">Message sent — thanks, I&apos;ll reply soon.</p>
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md space-y-4">
      <input
        type="text"
        name="company"
        autoComplete="off"
        tabIndex={-1}
        className="hidden"
        aria-hidden="true"
      />
      <div>
        <label htmlFor="name" className="block font-mono text-xs text-fg/50 mb-1">
          Name
        </label>
        <input
          id="name"
          name="name"
          placeholder="Name"
          required
          className="w-full bg-transparent border border-white/20 px-4 py-3 focus:border-accent outline-none"
        />
        {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
      </div>
      <div>
        <label htmlFor="email" className="block font-mono text-xs text-fg/50 mb-1">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          required
          className="w-full bg-transparent border border-white/20 px-4 py-3 focus:border-accent outline-none"
        />
        {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
      </div>
      <div>
        <label htmlFor="message" className="block font-mono text-xs text-fg/50 mb-1">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          placeholder="Message"
          required
          rows={5}
          className="w-full bg-transparent border border-white/20 px-4 py-3 focus:border-accent outline-none"
        />
        {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="font-mono text-sm border border-accent text-accent px-5 py-3 hover:bg-accent hover:text-base transition-colors disabled:opacity-50"
      >
        {status === "sending" ? "Sending…" : "Send"}
      </button>
    </form>
  )
}
