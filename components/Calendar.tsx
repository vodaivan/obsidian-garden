'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface CalendarProps {
  postsByDate: Record<string, string> // date -> slug
}

const MONTHS_VI = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
  'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12']
const DAYS_VI = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7']

export default function Calendar({ postsByDate }: CalendarProps) {
  const today = new Date()
  const [current, setCurrent] = useState({ year: today.getFullYear(), month: today.getMonth() })
  const router = useRouter()

  const firstDay = new Date(current.year, current.month, 1)
  const lastDay = new Date(current.year, current.month + 1, 0)
  const startPad = firstDay.getDay()
  const totalDays = lastDay.getDate()

  const cells: (number | null)[] = [
    ...Array(startPad).fill(null),
    ...Array.from({ length: totalDays }, (_, i) => i + 1),
  ]

  // Pad to complete last row
  while (cells.length % 7 !== 0) cells.push(null)

  const dateKey = (day: number) => {
    const m = String(current.month + 1).padStart(2, '0')
    const d = String(day).padStart(2, '0')
    return `${current.year}-${m}-${d}`
  }

  const isToday = (day: number) =>
    day === today.getDate() &&
    current.month === today.getMonth() &&
    current.year === today.getFullYear()

  const prev = () => {
    setCurrent(c => c.month === 0
      ? { year: c.year - 1, month: 11 }
      : { year: c.year, month: c.month - 1 })
  }

  const next = () => {
    setCurrent(c => c.month === 11
      ? { year: c.year + 1, month: 0 }
      : { year: c.year, month: c.month + 1 })
  }

  return (
    <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prev}
          className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-stone-100 text-stone-500 transition-colors"
        >
          ‹
        </button>
        <span className="text-sm font-medium text-stone-700">
          {MONTHS_VI[current.month]} {current.year}
        </span>
        <button
          onClick={next}
          className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-stone-100 text-stone-500 transition-colors"
        >
          ›
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 mb-2">
        {DAYS_VI.map(d => (
          <div key={d} className="text-center text-xs text-stone-400 font-medium py-1">{d}</div>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 gap-y-1">
        {cells.map((day, i) => {
          if (!day) return <div key={i} />
          const key = dateKey(day)
          const slug = postsByDate[key]
          const hasPost = Boolean(slug)
          return (
            <div key={i} className="flex justify-center">
              <div
                className={[
                  'calendar-day',
                  hasPost ? 'has-post' : '',
                  isToday(day) ? 'today' : '',
                ].join(' ')}
                onClick={() => hasPost && router.push(`/post/${slug}`)}
                title={hasPost ? `Có bài viết ngày ${key}` : ''}
              >
                {day}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
