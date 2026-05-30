'use client'

import { useState } from 'react'

interface Props {
  activeTopic: string
  onSelect: (topic: string) => void
}

const TOPICS = [
  { key: 'Personal Identity',    icon: '🧠', color: 'topic-indigo' },
  { key: 'Fitness & Nutrition',  icon: '💪', color: 'topic-indigo' },
  { key: 'Mental Models',        icon: '🔭', color: 'topic-blue'   },
  { key: 'High-Order Thinking',  icon: '⚡', color: 'topic-blue'   },
  { key: 'Mindfulness',          icon: '🌿', color: 'topic-teal'   },
  { key: 'Frameworks',           icon: '🧩', color: 'topic-teal'   },
  { key: 'Network',              icon: '🤝', color: 'topic-orange' },
  { key: 'Projects',             icon: '🚀', color: 'topic-orange' },
  { key: 'Roadmap',              icon: '🗺️', color: 'topic-rose'   },
  { key: 'Wealth Building',      icon: '💰', color: 'topic-rose'   },
]

const PASSWORD = '789'

export default function TopicSidebar({ activeTopic, onSelect }: Props) {
  const [collapsed, setCollapsed]   = useState(false)
  const [unlocked, setUnlocked]     = useState(false)
  const [pw, setPw]                 = useState('')
  const [error, setError]           = useState(false)

  const submit = () => {
    if (pw === PASSWORD) { setUnlocked(true); setError(false) }
    else { setError(true); setPw('') }
  }

  return (
    <div>
      {/* Collapse toggle */}
      <button
        className={`collapse-btn mb-3 ${collapsed ? '' : 'open'}`}
        onClick={() => setCollapsed(v => !v)}
      >
        <span className="flex items-center gap-2">
          <span>🗂️</span>
          <span>Chủ đề</span>
          {activeTopic && !collapsed && (
            <span className="text-xs font-normal text-slate-400 truncate max-w-[80px]">{activeTopic}</span>
          )}
        </span>
        <span className="arrow">▼</span>
      </button>

      {!collapsed && (
        <div className="card p-4">
          {!unlocked ? (
            /* Password gate */
            <div>
              <p className="text-xs text-slate-500 mb-3 text-center">
                🔒 Nhập mật khẩu để xem danh sách chủ đề
              </p>
              <input
                type="password"
                className={`pw-input mb-2 ${error ? 'border-red-400' : ''}`}
                placeholder="Mật khẩu..."
                value={pw}
                onChange={e => { setPw(e.target.value); setError(false) }}
                onKeyDown={e => e.key === 'Enter' && submit()}
                maxLength={10}
              />
              {error && <p className="text-xs text-red-500 mb-2 text-center">Mật khẩu không đúng</p>}
              <button
                onClick={submit}
                className="w-full py-1.5 rounded-lg bg-slate-800 text-white text-sm font-medium hover:bg-slate-700 transition-colors"
              >
                Mở khoá →
              </button>
            </div>
          ) : (
            /* Topic list */
            <div className="space-y-1.5">
              {/* All button */}
              <button
                className={`topic-tag w-full ${activeTopic === '' ? 'active topic-blue' : 'hover:bg-slate-50'}`}
                style={activeTopic === '' ? {} : {border:'1.5px solid #e2e8f0',background:'white',color:'#334155'}}
                onClick={() => onSelect('')}
              >
                <span>📋</span>
                <span>Tất cả bài viết</span>
              </button>

              <div className="border-t border-slate-100 my-2" />

              {TOPICS.map(t => (
                <button
                  key={t.key}
                  className={`topic-tag w-full text-left ${t.color} ${activeTopic === t.key ? 'active' : ''}`}
                  onClick={() => onSelect(activeTopic === t.key ? '' : t.key)}
                >
                  <span>{t.icon}</span>
                  <span>{t.key}</span>
                </button>
              ))}

              <div className="border-t border-slate-100 pt-2 mt-1">
                <button
                  className="text-xs text-slate-400 hover:text-slate-600 transition-colors w-full text-center"
                  onClick={() => { setUnlocked(false); setPw(''); onSelect('') }}
                >
                  🔒 Khoá lại
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
