'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'

interface Post { slug: string; title: string; date: string; description: string; topic: string; firstImage: string }
type SortMode = 'recent' | 'newest' | 'az' | 'za'

const SORT_OPTIONS: { key: SortMode; label: string; icon: string }[] = [
  { key: 'recent',  label: 'Gần đây',  icon: '🕐' },
  { key: 'newest',  label: 'Mới nhất', icon: '✨' },
  { key: 'az',      label: 'A → Z',    icon: '🔤' },
  { key: 'za',      label: 'Z → A',    icon: '🔃' },
]

interface Props {
  posts: Post[]
  filterTopic?: string
}

export default function PostList({ posts, filterTopic = '' }: Props) {
  const [sort, setSort] = useState<SortMode>('recent')

  const filtered = useMemo(() => {
    let arr = filterTopic
      ? posts.filter(p => p.topic?.toLowerCase() === filterTopic.toLowerCase())
      : posts
    arr = [...arr]
    if (sort === 'recent')  return arr.slice(0, 15)
    if (sort === 'newest')  return arr.sort((a,b) => a.date < b.date ? 1 : -1)
    if (sort === 'az')      return arr.sort((a,b) => a.title.localeCompare(b.title, 'vi'))
    if (sort === 'za')      return arr.sort((a,b) => b.title.localeCompare(a.title, 'vi'))
    return arr
  }, [posts, sort, filterTopic])

  return (
    <div>
      {/* Sort buttons */}
      <div className="flex flex-wrap gap-1.5 mb-4">
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

      {filterTopic && (
        <div className="mb-3 text-xs text-slate-500 bg-slate-50 rounded-lg px-3 py-2 border border-slate-200">
          Đang lọc: <span className="font-semibold text-slate-700">{filterTopic}</span>
          {' '}· {filtered.length} bài
        </div>
      )}

      {filtered.length === 0 ? (
        <p className="text-slate-400 text-sm py-6 text-center">
          {filterTopic ? `Chưa có bài viết nào trong chủ đề "${filterTopic}".` : 'Chưa có bài viết nào.'}
        </p>
      ) : (
        <div>
          {filtered.map(post => (
            <Link key={post.slug} href={`/post/${post.slug}`} className="post-item group">
              <div className="post-date-badge">{post.date}</div>
              <div className="flex-1 min-w-0">
                <div className="post-title">{post.title}</div>
                {post.description && <div className="post-desc">{post.description}</div>}
              </div>
              {/* Thumbnail nếu bài có ảnh */}
              {post.firstImage ? (
                <div className="shrink-0 w-20 h-20 rounded-xl overflow-hidden border border-slate-200 shadow-md ml-2">
                  <img
                    src={post.firstImage}
                    alt={post.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              ) : (
                <span className="post-arrow">→</span>
              )}
            </Link>
          ))}
        </div>
      )}

      {sort === 'recent' && !filterTopic && posts.length > 15 && (
        <div className="mt-4 text-center">
          <button className="sort-btn" onClick={() => setSort('newest')}>
            Xem tất cả {posts.length} bài →
          </button>
        </div>
      )}
    </div>
  )
}
