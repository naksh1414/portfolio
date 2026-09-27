import { describe, it, expect } from "vitest"
import { rateLimit } from "./rateLimit"

describe("rateLimit", () => {
  it("allows up to the limit, blocks after, and frees up once the window passes", () => {
    const key = "1.2.3.4"
    expect(rateLimit(key, 2, 1000, 0)).toBe(true)
    expect(rateLimit(key, 2, 1000, 100)).toBe(true)
    expect(rateLimit(key, 2, 1000, 200)).toBe(false)
    expect(rateLimit("other", 2, 1000, 200)).toBe(true)
    expect(rateLimit(key, 2, 1000, 1150)).toBe(true)
  })
})
