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
    title: `${post.title} — Gia Đình 222`,
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
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Back */}
      <Link href="/" className="back-btn mb-8 inline-flex">
        ← Trang chủ
      </Link>

      {/* Article card */}
      <div className="card p-6 sm:p-8 mt-4">
        <header className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-sky-900 leading-tight mb-3">
            {post.title}
          </h1>
          {formattedDate && (
            <time className="inline-flex items-center gap-1.5 text-sky-500 text-sm font-medium bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
              📅 {formattedDate}
            </time>
          )}
          {post.description && (
            <p className="mt-4 text-sky-700 text-base leading-relaxed border-l-3 border-sky-300 pl-4 bg-sky-50 rounded-r-lg py-2 pr-3">
              {post.description}
            </p>
          )}
        </header>

        <hr className="border-sky-100 mb-6" />

        {/* Content — no properties shown */}
        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: post.contentHtml || '' }}
        />

        <hr className="border-sky-100 mt-12 mb-6" />

        <div className="flex justify-center">
          <Link href="/" className="back-btn">
            ← Xem tất cả bài viết
          </Link>
        </div>
      </div>
    </div>
  )
}
