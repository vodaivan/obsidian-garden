import { getAllPosts } from '@/lib/posts'
import Calendar from '@/components/Calendar'
import Link from 'next/link'

function formatDateVi(dateStr: string) {
  if (!dateStr) return ''
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('vi-VN', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function Home() {
  const posts = getAllPosts()

  // Build date -> slug map (first post per date)
  const postsByDate: Record<string, string> = {}
  for (const p of posts) {
    if (p.date && !postsByDate[p.date]) {
      postsByDate[p.date] = p.slug
    }
  }

  const recent = posts.slice(0, 10)

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-12">
        <h1 className="font-serif text-4xl font-semibold text-stone-900 mb-3">Vườn Kiến Thức</h1>
        <p className="text-stone-500 text-lg">Những ghi chép, suy nghĩ, và bài học từ cuộc sống.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Recent Posts */}
        <div className="lg:col-span-2">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-stone-400 mb-6">
            Bài viết gần đây
          </h2>

          {recent.length === 0 ? (
            <p className="text-stone-400 text-sm">Chưa có bài viết nào.</p>
          ) : (
            <div className="space-y-0">
              {recent.map((post, i) => (
                <Link key={post.slug} href={`/post/${post.slug}`} className="group block">
                  <article className={`py-5 ${i < recent.length - 1 ? 'border-b border-stone-100' : ''}`}>
                    <div className="flex items-start gap-4">
                      {/* Date pill */}
                      <div className="shrink-0 text-right pt-0.5">
                        <span className="text-xs text-stone-400 font-mono whitespace-nowrap">
                          {post.date}
                        </span>
                      </div>
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-serif text-stone-900 font-semibold text-base leading-snug group-hover:text-stone-600 transition-colors mb-1 line-clamp-2">
                          {post.title}
                        </h3>
                        {post.description && (
                          <p className="text-stone-500 text-sm line-clamp-2 leading-relaxed">
                            {post.description}
                          </p>
                        )}
                      </div>
                      {/* Arrow */}
                      <span className="shrink-0 text-stone-300 group-hover:text-stone-500 transition-colors text-lg pt-0.5">
                        →
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar: Calendar */}
        <div className="lg:col-span-1">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-stone-400 mb-6">
            Lịch
          </h2>
          <Calendar postsByDate={postsByDate} />

          {/* Stats */}
          <div className="mt-6 bg-white border border-stone-200 rounded-2xl p-5 shadow-sm">
            <div className="text-center">
              <span className="block text-3xl font-serif font-semibold text-stone-800">{posts.length}</span>
              <span className="text-xs text-stone-400 mt-1 block">bài viết đã đăng</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
