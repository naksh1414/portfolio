import { describe, it, expect, beforeAll, afterAll } from "vitest"
import fs from "node:fs"
import path from "node:path"
import { getAllPosts, getPostBySlug } from "./mdx"

const FIXTURE_DIR = path.join(process.cwd(), "lib", "__fixtures__", "blog")
const EMPTY_DIR = path.join(process.cwd(), "lib", "__fixtures__", "empty-blog")

beforeAll(() => {
  fs.mkdirSync(FIXTURE_DIR, { recursive: true })
  fs.writeFileSync(
    path.join(FIXTURE_DIR, "hello-world.mdx"),
    `---\ntitle: Hello World\ndate: "2026-01-01"\nexcerpt: A first post\n---\n\nBody content.\n`
  )
})

afterAll(() => {
  fs.rmSync(FIXTURE_DIR, { recursive: true, force: true })
})

describe("getAllPosts", () => {
  it("returns an empty array when the blog directory does not exist", () => {
    expect(getAllPosts(EMPTY_DIR)).toEqual([])
  })

  it("returns parsed post metadata when files exist", () => {
    const posts = getAllPosts(FIXTURE_DIR)
    expect(posts).toEqual([
      { slug: "hello-world", title: "Hello World", date: "2026-01-01", excerpt: "A first post" },
    ])
  })
})

describe("getPostBySlug", () => {
  it("returns null for a missing slug", () => {
    expect(getPostBySlug("does-not-exist", FIXTURE_DIR)).toBeNull()
  })

  it("returns meta and raw content for an existing slug", () => {
    const post = getPostBySlug("hello-world", FIXTURE_DIR)
    expect(post?.meta.title).toBe("Hello World")
    expect(post?.content.trim()).toBe("Body content.")
  })
})
