import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { MDXRemote } from "next-mdx-remote/rsc"
import { getAllPosts, getPostBySlug } from "@/lib/mdx"

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const post = getPostBySlug((await params).slug)
  if (!post) return {}
  const { title, excerpt, date } = post.meta
  return {
    title,
    description: excerpt,
    alternates: { canonical: `/blog/${post.meta.slug}` },
    openGraph: { type: "article", title, description: excerpt, publishedTime: date, url: `/blog/${post.meta.slug}` },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  return (
    <main className="pt-32 px-6 max-w-2xl mx-auto min-h-[60vh]">
      <p className="text-xs text-fg/50">{post.meta.date}</p>
      <h1 className="font-display text-4xl mt-2 mb-8">{post.meta.title}</h1>
      <article className="prose prose-headings:font-display">
        <MDXRemote source={post.content} />
      </article>
    </main>
  )
}
