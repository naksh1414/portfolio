import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"

const DEFAULT_BLOG_DIR = path.join(process.cwd(), "content/blog")

export interface PostMeta {
  slug: string
  title: string
  date: string
  excerpt: string
}

export function getAllPosts(dir: string = DEFAULT_BLOG_DIR): PostMeta[] {
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf-8")
      const { data } = matter(raw)
      return {
        slug: file.replace(/\.mdx$/, ""),
        title: String(data.title),
        date: String(data.date),
        excerpt: String(data.excerpt),
      }
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getPostBySlug(
  slug: string,
  dir: string = DEFAULT_BLOG_DIR
): { meta: PostMeta; content: string } | null {
  const filePath = path.join(dir, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, "utf-8")
  const { data, content } = matter(raw)
  return {
    meta: {
      slug,
      title: String(data.title),
      date: String(data.date),
      excerpt: String(data.excerpt),
    },
    content,
  }
}
