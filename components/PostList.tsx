'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'

interface Post {
  slug: string
  title: string
  date: string
  description: string
}

type SortMode = 'recent' | 'newest' | 'az' | 'za'

interface Props {
  posts: Post[]
}

const SORT_OPTIONS: { key: SortMode; label: string; icon: string }[] = [
  { key: 'recent', label: 'Gần đây', icon: '🕐' },
  { key: 'newest', label: 'Mới nhất', icon: '✨' },
  { key: 'az', label: 'A → Z', icon: '🔤' },
  { key: 'za', label: 'Z → A', icon: '🔃' },
]

export default function PostList({ posts }: Props) {
  const [sort, setSort] = useState<SortMode>('recent')

  const sorted = useMemo(() => {
    const arr = [...posts]
    if (sort === 'recent') return arr.slice(0, 10)
    if (sort === 'newest') return arr.sort((a, b) => (a.date < b.date ? 1 : -1))
    if (sort === 'az') return arr.sort((a, b) => a.title.localeCompare(b.title, 'vi'))
    if (sort === 'za') return arr.sort((a, b) => b.title.localeCompare(a.title, 'vi'))
    return arr
  }, [posts, sort])

  return (
    <div>
      {/* Sort buttons */}
      <div className="flex flex-wrap gap-2 mb-5">
        {SORT_OPTIONS.map(opt => (
          <button
            key={opt.key}
            className={`sort-btn ${sort === opt.key ? 'active' : ''}`}
            onClick={() => setSort(opt.key)}
          >
            {opt.icon} {opt.label}
          </button>
        ))}
      </div>

      {/* Post list */}
      {sorted.length === 0 ? (
        <p className="text-sky-400 text-sm py-4">Chưa có bài viết nào.</p>
      ) : (
        <div>
          {sorted.map(post => (
            <Link key={post.slug} href={`/post/${post.slug}`} className="post-item group">
              <div className="post-date-badge">{post.date}</div>
              <div className="flex-1 min-w-0">
                <div className="post-title">{post.title}</div>
                {post.description && (
                  <div className="post-desc">{post.description}</div>
                )}
              </div>
              <span className="post-arrow">→</span>
            </Link>
          ))}
        </div>
      )}

      {sort === 'recent' && posts.length > 10 && (
        <div className="mt-4 text-center">
          <button
            className="sort-btn"
            onClick={() => setSort('newest')}
          >
            Xem tất cả {posts.length} bài →
          </button>
        </div>
      )}
    </div>
  )
}
