'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface CalendarProps {
  postsByDate: Record<string, string>
}

const MONTHS_VI = ['Tháng 1','Tháng 2','Tháng 3','Tháng 4','Tháng 5','Tháng 6',
  'Tháng 7','Tháng 8','Tháng 9','Tháng 10','Tháng 11','Tháng 12']

// Monday first: T2 T3 T4 T5 T6 T7 CN
const DAYS_VI = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']

// getDay() returns 0=Sun,1=Mon,...,6=Sat
// We want Mon=0, Tue=1, ..., Sat=5, Sun=6
function mondayIndex(jsDay: number) {
  return (jsDay + 6) % 7
}

export default function Calendar({ postsByDate }: CalendarProps) {
  const today = new Date()
  const [current, setCurrent] = useState({ year: today.getFullYear(), month: today.getMonth() })
  const router = useRouter()

  const firstDay = new Date(current.year, current.month, 1)
  const lastDay  = new Date(current.year, current.month + 1, 0)
  const startPad = mondayIndex(firstDay.getDay())
  const totalDays = lastDay.getDate()

  const cells: (number | null)[] = [
    ...Array(startPad).fill(null),
    ...Array.from({ length: totalDays }, (_, i) => i + 1),
  ]
  while (cells.length % 7 !== 0) cells.push(null)

  const dateKey = (day: number) => {
    const m = String(current.month + 1).padStart(2, '0')
    const d = String(day).padStart(2, '0')
    return `${current.year}-${m}-${d}`
  }

  // day-of-week in Mon-first grid (0=Mon…6=Sun)
  const dayOfWeekMon = (day: number) => {
    const dow = new Date(current.year, current.month, day).getDay()
    return mondayIndex(dow)
  }

  const isToday = (day: number) =>
    day === today.getDate() &&
    current.month === today.getMonth() &&
    current.year === today.getFullYear()

  const goToday = () =>
    setCurrent({ year: today.getFullYear(), month: today.getMonth() })

  const prev = () => setCurrent(c =>
    c.month === 0 ? { year: c.year - 1, month: 11 } : { year: c.year, month: c.month - 1 })

  const next = () => setCurrent(c =>
    c.month === 11 ? { year: c.year + 1, month: 0 } : { year: c.year, month: c.month + 1 })

  const isCurrentMonth =
    current.year === today.getFullYear() && current.month === today.getMonth()

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <button className="calendar-header-btn" onClick={prev}>‹</button>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-sky-700">
            {MONTHS_VI[current.month]} {current.year}
          </span>
          {!isCurrentMonth && (
            <button className="today-btn" onClick={goToday}>Today</button>
          )}
        </div>
        <button className="calendar-header-btn" onClick={next}>›</button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 mb-1">
        {DAYS_VI.map((d, i) => (
          <div
            key={d}
            className={`text-center text-xs font-semibold py-1 ${i === 6 ? 'text-red-400' : 'text-sky-400'}`}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Days */}
      <div className="grid grid-cols-7 gap-y-0.5">
        {cells.map((day, i) => {
          if (!day) return <div key={i} />
          const key = dateKey(day)
          const slug = postsByDate[key]
          const hasPost = Boolean(slug)
          const isSun = dayOfWeekMon(day) === 6
          return (
            <div key={i} className="flex justify-center">
              <div
                className={[
                  'calendar-day',
                  hasPost ? 'has-post' : '',
                  isToday(day) ? 'today' : '',
                  isSun && !hasPost ? 'sunday' : '',
                ].filter(Boolean).join(' ')}
                onClick={() => hasPost && router.push(`/post/${slug}`)}
                title={hasPost ? `Bài viết ${key}` : ''}
              >
                {day}
              </div>
            </div>
          )
        })}
      </div>

      {/* Today button when in current month */}
      {isCurrentMonth && (
        <div className="mt-3 flex justify-center">
          <button className="today-btn" onClick={goToday}>📍 Hôm nay</button>
        </div>
      )}
    </div>
  )
}
