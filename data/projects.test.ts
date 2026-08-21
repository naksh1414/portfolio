import { describe, it, expect } from "vitest"
import { projects } from "./projects"

describe("projects data", () => {
  it("has at least the five flagship resume projects", () => {
    expect(projects.length).toBeGreaterThanOrEqual(5)
  })

  it("every project has a complete manifest entry", () => {
    for (const project of projects) {
      expect(project.name.length).toBeGreaterThan(0)
      expect(project.status.length).toBeGreaterThan(0)
      expect(project.problem.length).toBeGreaterThan(0)
      expect(project.approach.length).toBeGreaterThan(0)
      expect(project.result.length).toBeGreaterThan(0)
      expect(project.stack.length).toBeGreaterThan(0)
    }
  })
})
