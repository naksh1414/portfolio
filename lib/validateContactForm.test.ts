import { describe, it, expect } from "vitest"
import { validateContactForm, type ContactFormData } from "./validateContactForm"

function makeData(overrides: Partial<ContactFormData> = {}): ContactFormData {
  return {
    name: "Jane Doe",
    email: "jane@example.com",
    message: "Hey, I'd love to work with you on a project.",
    honeypot: "",
    ...overrides,
  }
}

describe("validateContactForm", () => {
  it("passes with valid data", () => {
    expect(validateContactForm(makeData())).toEqual({ ok: true, errors: {} })
  })

  it("rejects a name shorter than 2 characters", () => {
    const result = validateContactForm(makeData({ name: "J" }))
    expect(result.ok).toBe(false)
    expect(result.errors.name).toBeDefined()
  })

  it("rejects an invalid email", () => {
    const result = validateContactForm(makeData({ email: "not-an-email" }))
    expect(result.ok).toBe(false)
    expect(result.errors.email).toBeDefined()
  })

  it("rejects a message shorter than 10 characters", () => {
    const result = validateContactForm(makeData({ message: "hi" }))
    expect(result.ok).toBe(false)
    expect(result.errors.message).toBeDefined()
  })

  it("silently rejects when the honeypot is filled, with no field errors", () => {
    const result = validateContactForm(makeData({ honeypot: "bot-filled-this" }))
    expect(result.ok).toBe(false)
    expect(result.errors).toEqual({})
  })
})
