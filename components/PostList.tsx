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

const PAGE_SIZE = 15

interface Props {
  posts: Post[]
  filterTopic?: string
}

export default function PostList({ posts, filterTopic = '' }: Props) {
  const [sort, setSort]   = useState<SortMode>('recent')
  const [page, setPage]   = useState(1)

  // Reset về trang 1 khi đổi sort hoặc filter
  function changeSort(s: SortMode) { setSort(s); setPage(1) }

  const sorted = useMemo(() => {
    let arr = filterTopic
      ? posts.filter(p => p.topic?.toLowerCase() === filterTopic.toLowerCase())
      : [...posts]
    if (sort === 'recent' || sort === 'newest')
      arr.sort((a, b) => a.date < b.date ? 1 : -1)
    if (sort === 'az') arr.sort((a, b) => a.title.localeCompare(b.title, 'vi'))
    if (sort === 'za') arr.sort((a, b) => b.title.localeCompare(a.title, 'vi'))
    return arr
  }, [posts, sort, filterTopic])

  const totalPages = Math.ceil(sorted.length / PAGE_SIZE)
  const paginated  = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  // Page numbers to show: always first, last, current ±1
  function pageNumbers(): number[] {
    const set: Record<number, true> = {}
    set[1] = true
    set[totalPages] = true
    for (let i = Math.max(1, page - 1); i <= Math.min(totalPages, page + 1); i++) set[i] = true
    return Object.keys(set).map(Number).sort((a, b) => a - b)
  }

  return (
    <div>
      {/* Sort buttons */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {SORT_OPTIONS.map(opt => (
          <button
            key={opt.key}
            className={`sort-btn ${sort === opt.key ? 'active' : ''}`}
            onClick={() => changeSort(opt.key)}
          >
            {opt.icon} {opt.label}
          </button>
        ))}
      </div>

      {/* Filter info */}
      {filterTopic && (
        <div className="mb-3 text-xs text-slate-500 bg-slate-50 rounded-lg px-3 py-2 border border-slate-200">
          Đang lọc: <span className="font-semibold text-slate-700">{filterTopic}</span>
          {' '}· {sorted.length} bài
        </div>
      )}

      {/* Post list */}
      {paginated.length === 0 ? (
        <p className="text-slate-400 text-sm py-6 text-center">
          {filterTopic ? `Chưa có bài viết nào trong chủ đề "${filterTopic}".` : 'Chưa có bài viết nào.'}
        </p>
      ) : (
        <div>
          {paginated.map(post => (
            <Link key={post.slug} href={`/post/${post.slug}`} className="post-item group">
              <div className="post-date-badge">{post.date}</div>
              <div className="flex-1 min-w-0">
                <div className="post-title">{post.title}</div>
                {post.description && <div className="post-desc">{post.description}</div>}
              </div>
              {post.firstImage ? (
                <div className="shrink-0 w-20 h-20 rounded-xl overflow-hidden border border-slate-200 shadow-md ml-2">
                  <img src={post.firstImage} alt={post.title}
                    className="w-full h-full object-cover" loading="lazy" />
                </div>
              ) : (
                <span className="post-arrow">→</span>
              )}
            </Link>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-5 flex items-center justify-between gap-2 flex-wrap">
          {/* Info */}
          <span className="text-xs text-slate-400">
            Trang {page}/{totalPages} · {sorted.length} bài
          </span>

          {/* Page buttons */}
          <div className="flex items-center gap-1 flex-wrap">
            {/* Prev */}
            <button
              className="sort-btn"
              onClick={() => { setPage(p => Math.max(1, p - 1)); window.scrollTo({top:0,behavior:'smooth'}) }}
              disabled={page === 1}
              style={{ opacity: page === 1 ? 0.4 : 1 }}
            >‹ Trước</button>

            {/* Page numbers */}
            {pageNumbers().map((n, i, arr) => (
              <span key={n} className="flex items-center gap-1">
                {i > 0 && arr[i-1] !== n - 1 && (
                  <span className="text-slate-300 text-xs px-1">…</span>
                )}
                <button
                  className={`sort-btn ${page === n ? 'active' : ''}`}
                  onClick={() => { setPage(n); window.scrollTo({top:0,behavior:'smooth'}) }}
                >
                  {n}
                </button>
              </span>
            ))}

            {/* Next */}
            <button
              className="sort-btn"
              onClick={() => { setPage(p => Math.min(totalPages, p + 1)); window.scrollTo({top:0,behavior:'smooth'}) }}
              disabled={page === totalPages}
              style={{ opacity: page === totalPages ? 0.4 : 1 }}
            >Sau ›</button>
          </div>
        </div>
      )}
    </div>
  )
}
