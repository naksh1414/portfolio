export interface ContactFormData {
  name: string
  email: string
  message: string
  honeypot: string
}

export interface ValidationResult {
  ok: boolean
  errors: Partial<Record<"name" | "email" | "message", string>>
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateContactForm(data: ContactFormData): ValidationResult {
  if (data.honeypot.trim() !== "") {
    return { ok: false, errors: {} }
  }

  const errors: ValidationResult["errors"] = {}
  if (data.name.trim().length < 2) errors.name = "Name must be at least 2 characters."
  if (!EMAIL_RE.test(data.email.trim())) errors.email = "Enter a valid email address."
  if (data.message.trim().length < 10) errors.message = "Message must be at least 10 characters."

  return { ok: Object.keys(errors).length === 0, errors }
}
