import { getAllPosts, getPostBySlug } from '@/lib/posts'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)
  if (!post) return {}
  return {
    title: `${post.title} — Vườn Kiến Thức`,
    description: post.description,
  }
}

export default async function PostPage({ params }: Props) {
  const post = await getPostBySlug(params.slug)
  if (!post) notFound()

  const formattedDate = post.date
    ? new Date(post.date + 'T00:00:00').toLocaleDateString('vi-VN', {
        day: 'numeric', month: 'long', year: 'numeric'
      })
    : ''

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      {/* Back */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-stone-400 hover:text-stone-600 text-sm mb-10 transition-colors"
      >
        ← Quay lại
      </Link>

      {/* Article header */}
      <header className="mb-10">
        <h1 className="font-serif text-3xl font-semibold text-stone-900 leading-tight mb-3">
          {post.title}
        </h1>
        {formattedDate && (
          <time className="text-stone-400 text-sm">{formattedDate}</time>
        )}
        {post.description && (
          <p className="mt-3 text-stone-500 text-base leading-relaxed border-l-2 border-stone-200 pl-4">
            {post.description}
          </p>
        )}
      </header>

      <hr className="border-stone-200 mb-10" />

      {/* Content — no properties shown */}
      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: post.contentHtml || '' }}
      />

      <hr className="border-stone-200 mt-16 mb-8" />

      {/* Footer nav */}
      <div className="flex justify-center">
        <Link
          href="/"
          className="text-stone-400 hover:text-stone-600 text-sm transition-colors"
        >
          ← Xem tất cả bài viết
        </Link>
      </div>
    </div>
  )
}
