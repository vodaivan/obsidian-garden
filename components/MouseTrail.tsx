'use client'

import { useEffect } from 'react'

const COLORS = ['#38bdf8','#7dd3fc','#0ea5e9','#bae6fd','#60a5fa','#e0f2fe']

export default function MouseTrail() {
  useEffect(() => {
    const sparkles: HTMLDivElement[] = []

    function spawn(x: number, y: number) {
      const el = document.createElement('div')
      const size = 5 + Math.random() * 8
      const color = COLORS[Math.floor(Math.random() * COLORS.length)]
      const dx = (Math.random() - 0.5) * 40
      const dy = (Math.random() - 0.5) * 40 - 15

      Object.assign(el.style, {
        position: 'fixed',
        left: `${x - size / 2}px`,
        top:  `${y - size / 2}px`,
        width:  `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        background: color,
        boxShadow: `0 0 ${size}px ${color}`,
        pointerEvents: 'none',
        zIndex: '9999',
        transition: 'transform 0.6s ease-out, opacity 0.6s ease-out',
        opacity: '1',
      })

      document.body.appendChild(el)
      sparkles.push(el)

      // Trigger animation
      requestAnimationFrame(() => {
        el.style.transform = `translate(${dx}px, ${dy}px) scale(0.1)`
        el.style.opacity = '0'
      })

      setTimeout(() => {
        el.remove()
        const idx = sparkles.indexOf(el)
        if (idx > -1) sparkles.splice(idx, 1)
      }, 650)
    }

    let last = 0
    function onMove(e: MouseEvent) {
      const now = Date.now()
      if (now - last < 30) return  // throttle ~33fps
      last = now
      // Spawn 2-3 sparkles per move event
      for (let i = 0; i < 2; i++) {
        const jx = (Math.random() - 0.5) * 10
        const jy = (Math.random() - 0.5) * 10
        spawn(e.clientX + jx, e.clientY + jy)
      }
    }

    window.addEventListener('mousemove', onMove)
    return () => {
      window.removeEventListener('mousemove', onMove)
      sparkles.forEach(el => el.remove())
    }
  }, [])

  return null
}
