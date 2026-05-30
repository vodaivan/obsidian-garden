'use client'

import { useEffect } from 'react'

// Soft pink palette — lighter & more subtle
const COLORS = ['#fda4af','#fbcfe8','#fce7f3','#f9a8d4','#fecdd3','#fff0f6']

// Custom cursor SVG: a small magic wand ✨
const CURSOR_SVG = `<svg xmlns='http://www.w3.org/2000/svg' width='28' height='28' viewBox='0 0 28 28'>
  <line x1='4' y1='24' x2='20' y2='8' stroke='%23e879f9' stroke-width='2.5' stroke-linecap='round'/>
  <rect x='18' y='4' width='7' height='7' rx='1.5' fill='%23f0abfc' transform='rotate(45 21.5 7.5)'/>
  <circle cx='5' cy='5' r='1.5' fill='%23f9a8d4' opacity='0.9'/>
  <circle cx='23' cy='22' r='1.2' fill='%23fda4af' opacity='0.8'/>
  <circle cx='14' cy='3' r='1' fill='%23fbcfe8' opacity='0.7'/>
</svg>`

const CURSOR_URL = `data:image/svg+xml,${CURSOR_SVG}`

export default function MouseTrail() {
  useEffect(() => {
    // Set custom cursor
    document.body.style.cursor = `url("${CURSOR_URL}") 4 4, auto`

    const pool: HTMLDivElement[] = []
    let last = 0

    function spawn(x: number, y: number) {
      const el = document.createElement('div')
      const size = 4 + Math.random() * 7
      const color = COLORS[Math.floor(Math.random() * COLORS.length)]
      const dx = (Math.random() - 0.5) * 30
      const dy = (Math.random() - 0.5) * 30 - 10

      Object.assign(el.style, {
        position:     'fixed',
        left:         `${x - size / 2}px`,
        top:          `${y - size / 2}px`,
        width:        `${size}px`,
        height:       `${size}px`,
        borderRadius: '50%',
        background:   color,
        boxShadow:    `0 0 ${size * 1.2}px ${color}88`,
        pointerEvents:'none',
        zIndex:       '9999',
        opacity:      '0.75',
        transition:   'transform 0.55s ease-out, opacity 0.55s ease-out',
      })

      document.body.appendChild(el)
      pool.push(el)

      requestAnimationFrame(() => {
        el.style.transform = `translate(${dx}px,${dy}px) scale(0.1)`
        el.style.opacity   = '0'
      })

      setTimeout(() => {
        el.remove()
        const i = pool.indexOf(el)
        if (i > -1) pool.splice(i, 1)
      }, 580)
    }

    const OFFSET_Y = 22  // bong bóng xuất hiện bên dưới con trỏ, không che chữ

    function onMove(e: MouseEvent) {
      const now = Date.now()
      if (now - last < 35) return
      last = now
      spawn(e.clientX + (Math.random()-0.5)*6, e.clientY + OFFSET_Y)
      if (Math.random() > 0.5) {
        spawn(e.clientX + (Math.random()-0.5)*10, e.clientY + OFFSET_Y + Math.random()*8)
      }
    }

    window.addEventListener('mousemove', onMove)
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.body.style.cursor = ''
      pool.forEach(el => el.remove())
    }
  }, [])

  return null
}
