'use client'

import { useEffect, useRef } from 'react'

const PETALS = ['🌸', '🌸', '🌺', '🌸', '🌸']

export default function CherryBlossom() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = ref.current
    if (!container) return

    const created: HTMLSpanElement[] = []

    function spawnPetal() {
      if (!container) return
      const el = document.createElement('span')
      el.className = 'petal'
      el.textContent = PETALS[Math.floor(Math.random() * PETALS.length)]

      const left     = Math.random() * 100
      const duration = 4 + Math.random() * 5
      const delay    = Math.random() * 6
      const size     = 0.75 + Math.random() * 0.75

      el.style.left             = `${left}%`
      el.style.fontSize         = `${size}rem`
      el.style.animationDuration = `${duration}s`
      el.style.animationDelay   = `-${delay}s`

      container.appendChild(el)
      created.push(el)
    }

    for (let i = 0; i < 18; i++) spawnPetal()

    return () => { created.forEach(el => el.remove()) }
  }, [])

  return <div ref={ref} className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none" />
}
