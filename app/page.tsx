import { getAllPosts } from '@/lib/posts'
import Calendar from '@/components/Calendar'
import PostList from '@/components/PostList'

export default function Home() {
  const posts = getAllPosts()

  const postsByDate: Record<string, string> = {}
  for (const p of posts) {
    if (p.date && !postsByDate[p.date]) {
      postsByDate[p.date] = p.slug
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Hero */}
      <div className="mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 bg-white/70 border border-sky-200 rounded-full px-4 py-1.5 mb-4 text-sky-600 text-sm font-medium shadow-sm">
          <span>📚</span> Kho lưu trữ kiến thức gia đình
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-sky-900 mb-2">
          Chào mừng đến <span className="text-sky-500">Gia Đình 222</span>
        </h1>
        <p className="text-sky-600 text-base">
          Những ghi chép, suy nghĩ, và bài học quý giá từ cuộc sống.
        </p>
      </div>

      {/* 3-column grid: posts | calendar | list-view */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* ── Main: Bài viết ── */}
        <div className="lg:col-span-7 card p-5 sm:p-6">
          <div className="section-label">📝 Danh sách bài viết</div>
          <PostList posts={posts} />
        </div>

        {/* ── Right sidebar ── */}
        <div className="lg:col-span-5 space-y-5">

          {/* Calendar */}
          <div className="card p-5">
            <div className="section-label">📅 Lịch bài viết</div>
            <Calendar postsByDate={postsByDate} />
          </div>

          {/* Stats */}
          <div className="stat-badge">
            <div className="text-3xl font-bold mb-1">{posts.length}</div>
            <div className="text-sky-100 text-sm">bài viết đã đăng</div>
          </div>

          {/* Quick info */}
          <div className="card p-5">
            <div className="section-label">💡 Về trang này</div>
            <p className="text-sky-700 text-sm leading-relaxed">
              Đây là không gian lưu giữ kiến thức, ký ức và những bài học của gia đình.
              Mỗi bài viết là một viên gạch xây dựng kho tàng chung.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
