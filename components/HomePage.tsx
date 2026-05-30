'use client'

import { useState } from 'react'
import Calendar from './Calendar'
import PostList from './PostList'
import TopicSidebar from './TopicSidebar'
import CherryBlossom from './CherryBlossom'

interface Post { slug: string; title: string; date: string; description: string; topic: string; firstImage: string }

interface Props {
  posts: Post[]
  postsByDate: Record<string, string>
}

export default function HomePage({ posts, postsByDate }: Props) {
  const [activeTopic, setActiveTopic] = useState('')

  // Đếm số bài theo topic
  const postCounts: Record<string, number> = {}
  for (const p of posts) {
    if (p.topic) postCounts[p.topic] = (postCounts[p.topic] ?? 0) + 1
  }

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-5 py-6 sm:py-8">
      {/* Hero banner với hoa anh đào */}
      <div className="hero-banner mb-6">
        <CherryBlossom />
        <div className="relative z-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-1">
            Chào mừng đến <span className="text-pink-600">Gia Đình 222</span> 🏠
          </h1>
          <p className="text-slate-500 text-sm">Những ghi chép, suy nghĩ, và bài học quý giá từ cuộc sống.</p>
        </div>
      </div>

      {/*
        Layout:
        Mobile  → stacked: Calendar → Posts → Topics
        Desktop → 3 columns: Calendar(left) | Posts(center wide) | Topics(right)
      */}
      <div className="flex flex-col lg:flex-row gap-5">

        {/* LEFT: Calendar */}
        <div className="lg:w-60 xl:w-64 shrink-0">
          <Calendar postsByDate={postsByDate} allPosts={posts} />
        </div>

        {/* CENTER: Post list */}
        <div className="flex-1 min-w-0 card p-5">
          <div className="section-label">📝 Bài viết</div>
          <PostList posts={posts} filterTopic={activeTopic} />
        </div>

        {/* RIGHT: Topics */}
        <div className="lg:w-56 xl:w-60 shrink-0">
          <TopicSidebar activeTopic={activeTopic} onSelect={setActiveTopic} postCounts={postCounts} totalPosts={posts.length} />

          {/* Stats card */}
          <div className="card p-4 mt-3 text-center">
            <div className="text-2xl font-bold text-slate-800">{posts.length}</div>
            <div className="text-xs text-slate-400 mt-0.5">bài viết đã đăng</div>
          </div>
        </div>
      </div>
    </div>
  )
}
