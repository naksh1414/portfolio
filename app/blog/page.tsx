import type { Metadata } from "next"
import Link from "next/link"
import { getAllPosts } from "@/lib/mdx"

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes by Nakshatra Manglik on backend engineering, infrastructure, and building AI-powered products.",
  alternates: { canonical: "/blog" },
}

export default function BlogIndexPage() {
  const posts = getAllPosts()

  return (
    <main className="pt-32 px-6 max-w-3xl mx-auto min-h-[60vh]">
      <h1 className="font-display text-4xl mb-8">Blog</h1>
      {posts.length === 0 ? (
        <p className="text-fg/60 text-sm">Nothing published yet — check back soon.</p>
      ) : (
        <ul className="space-y-6">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="group block">
                <h2 className="font-display text-2xl group-hover:text-accent">{post.title}</h2>
                <p className="text-xs text-fg/50 mt-1">{post.date}</p>
                <p className="text-fg/70 mt-2">{post.excerpt}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
