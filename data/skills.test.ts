import { describe, it, expect } from "vitest"
import { skillCategories } from "./skills"

describe("skillCategories", () => {
  it("has the five categories from the resume", () => {
    const names = skillCategories.map((c) => c.name)
    expect(names).toEqual(["Languages", "Infrastructure", "Frameworks", "Cloud & DevOps", "AI / ML Tools"])
  })

  it("every category has at least one skill", () => {
    for (const category of skillCategories) {
      expect(category.items.length).toBeGreaterThan(0)
    }
  })
})
