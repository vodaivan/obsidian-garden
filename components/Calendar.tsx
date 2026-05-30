'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Post { slug: string; title: string; date: string; description: string; topic: string; firstImage: string }
interface Props {
  postsByDate: Record<string, string>   // date → slug
  allPosts: Post[]
}

const MONTHS_VI = ['Tháng 1','Tháng 2','Tháng 3','Tháng 4','Tháng 5','Tháng 6',
  'Tháng 7','Tháng 8','Tháng 9','Tháng 10','Tháng 11','Tháng 12']
const DAYS_VI = ['T2','T3','T4','T5','T6','T7','CN']

function mondayIdx(jsDay: number) { return (jsDay + 6) % 7 }

export default function Calendar({ postsByDate, allPosts }: Props) {
  const today = new Date()
  const [current, setCurrent] = useState({ year: today.getFullYear(), month: today.getMonth() })
  const [collapsed, setCollapsed] = useState(false)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)

  const firstDay  = new Date(current.year, current.month, 1)
  const lastDay   = new Date(current.year, current.month + 1, 0)
  const startPad  = mondayIdx(firstDay.getDay())
  const totalDays = lastDay.getDate()

  const cells: (number | null)[] = [
    ...Array(startPad).fill(null),
    ...Array.from({ length: totalDays }, (_, i) => i + 1),
  ]
  while (cells.length % 7 !== 0) cells.push(null)

  const dateKey = (d: number) =>
    `${current.year}-${String(current.month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`

  const isSunday = (d: number) => mondayIdx(new Date(current.year, current.month, d).getDay()) === 6
  const isToday  = (d: number) =>
    d === today.getDate() && current.month === today.getMonth() && current.year === today.getFullYear()
  const isCurrentMonth = current.year === today.getFullYear() && current.month === today.getMonth()

  const prev = () => setCurrent(c => c.month === 0 ? {year:c.year-1,month:11} : {year:c.year,month:c.month-1})
  const next = () => setCurrent(c => c.month === 11 ? {year:c.year+1,month:0} : {year:c.year,month:c.month+1})

  const postsOnDate = selectedDate
    ? allPosts.filter(p => p.date === selectedDate)
    : []

  return (
    <div>
      {/* Collapse toggle */}
      <button
        className={`collapse-btn mb-3 ${collapsed ? '' : 'open'}`}
        onClick={() => setCollapsed(v => !v)}
      >
        <span className="flex items-center gap-2">
          <span>📅</span>
          <span>Lịch bài viết</span>
          {selectedDate && !collapsed && (
            <span className="text-xs font-normal text-slate-400 ml-1">{selectedDate}</span>
          )}
        </span>
        <span className="arrow">▼</span>
      </button>

      {!collapsed && (
        <div className="card p-4">
          {/* Header row */}
          <div className="flex items-center justify-between mb-3">
            <button className="cal-nav-btn" onClick={prev}>‹</button>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-slate-700">
                {MONTHS_VI[current.month]} {current.year}
              </span>
              {!isCurrentMonth && (
                <button className="today-btn" onClick={() => {
                  setCurrent({ year: today.getFullYear(), month: today.getMonth() })
                  setSelectedDate(null)
                }}>Today</button>
              )}
            </div>
            <button className="cal-nav-btn" onClick={next}>›</button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 mb-1">
            {DAYS_VI.map((d, i) => (
              <div key={d} className={`text-center text-xs font-semibold py-1 ${i===6?'text-red-400':'text-slate-400'}`}>
                {d}
              </div>
            ))}
          </div>

          {/* Days */}
          <div className="grid grid-cols-7 gap-y-0.5">
            {cells.map((day, i) => {
              if (!day) return <div key={i} />
              const key  = dateKey(day)
              const slug = postsByDate[key]
              const hasPost  = Boolean(slug)
              const isSelected = key === selectedDate
              return (
                <div key={i} className="flex justify-center">
                  <div
                    className={[
                      'calendar-day',
                      hasPost ? 'has-post' : '',
                      isToday(day) ? 'today' : '',
                      isSunday(day) && !hasPost ? 'sunday' : '',
                      isSelected ? 'selected-day' : '',
                    ].filter(Boolean).join(' ')}
                    onClick={() => {
                      if (!hasPost) return
                      setSelectedDate(prev => prev === key ? null : key)
                    }}
                    title={hasPost ? `Xem bài ${key}` : ''}
                  >
                    {day}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Today button */}
          {isCurrentMonth && (
            <div className="mt-3 flex justify-center">
              <button className="today-btn" onClick={() => {
                const t = today
                const key = `${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,'0')}-${String(t.getDate()).padStart(2,'0')}`
                setSelectedDate(key)
              }}>
                📍 Hôm nay
              </button>
            </div>
          )}

          {/* Posts on selected date */}
          {selectedDate && postsOnDate.length > 0 && (
            <div className="mt-4 pt-4 border-t border-slate-100">
              <div className="text-xs font-semibold text-slate-500 mb-2">
                Bài viết ngày {selectedDate}
              </div>
              {postsOnDate.map(p => (
                <Link key={p.slug} href={`/post/${p.slug}`} className="post-item py-2">
                  <div className="flex-1 min-w-0">
                    <div className="post-title text-sm">{p.title}</div>
                    {p.description && <div className="post-desc text-xs">{p.description}</div>}
                  </div>
                  <span className="post-arrow text-sm">→</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
