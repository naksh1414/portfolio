import { describe, it, expect } from "vitest"
import { computeTilt } from "./tilt"

describe("computeTilt", () => {
  const rect = { left: 0, top: 0, width: 200, height: 100 }

  it("returns zero tilt when the cursor is at the exact center", () => {
    expect(computeTilt(100, 50, rect)).toEqual({ rotateX: 0, rotateY: 0 })
  })

  it("tilts based on cursor offset from center, capped at maxDeg", () => {
    const result = computeTilt(200, 100, rect, 6) // bottom-right corner
    expect(result.rotateX).toBeLessThan(0)
    expect(result.rotateY).toBeGreaterThan(0)
    expect(Math.abs(result.rotateX)).toBeLessThanOrEqual(6)
    expect(Math.abs(result.rotateY)).toBeLessThanOrEqual(6)
  })

  it("returns zero tilt when maxDeg is 0", () => {
    expect(computeTilt(200, 100, rect, 0)).toEqual({ rotateX: 0, rotateY: 0 })
  })
})
