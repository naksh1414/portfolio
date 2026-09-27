import { describe, it, expect } from "vitest"
import { createHmac } from "node:crypto"
import { verifyCalSignature } from "./verifyCalSignature"

const secret = "test-secret"
const body = JSON.stringify({ triggerEvent: "BOOKING_CREATED" })
const sign = (b: string, s = secret) => createHmac("sha256", s).update(b).digest("hex")

describe("verifyCalSignature", () => {
  it("accepts a correctly signed body", () => {
    expect(verifyCalSignature(body, sign(body), secret)).toBe(true)
  })

  it("rejects a tampered body, wrong secret, or missing pieces", () => {
    expect(verifyCalSignature(body + " ", sign(body), secret)).toBe(false)
    expect(verifyCalSignature(body, sign(body, "other"), secret)).toBe(false)
    expect(verifyCalSignature(body, "short", secret)).toBe(false)
    expect(verifyCalSignature(body, null, secret)).toBe(false)
    expect(verifyCalSignature(body, sign(body), undefined)).toBe(false)
  })
})
