'use client'

import { useEffect, useRef } from 'react'

interface Petal {
  x: number; y: number; size: number
  speedY: number; speedX: number
  rotation: number; rotSpeed: number
  opacity: number; color: string
}

const BLUES = ['#38bdf8','#0ea5e9','#7dd3fc','#bae6fd','#0284c7','#60a5fa']

function drawFlower(c: CanvasRenderingContext2D, p: Petal) {
  c.save()
  c.globalAlpha = p.opacity
  c.translate(p.x, p.y)
  c.rotate(p.rotation)
  c.fillStyle = p.color
  for (let i = 0; i < 5; i++) {
    c.save()
    c.rotate((i * Math.PI * 2) / 5)
    c.beginPath()
    c.ellipse(0, -p.size * 0.65, p.size * 0.35, p.size * 0.65, 0, 0, Math.PI * 2)
    c.fill()
    c.restore()
  }
  c.fillStyle = '#fff'
  c.globalAlpha = p.opacity * 0.8
  c.beginPath()
  c.arc(0, 0, p.size * 0.2, 0, Math.PI * 2)
  c.fill()
  c.restore()
}

export default function BluePetals() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const maybeCtx = canvas.getContext('2d')
    if (!maybeCtx) return
    const c: CanvasRenderingContext2D = maybeCtx

    let w = canvas.offsetWidth
    let h = canvas.offsetHeight
    canvas.width = w
    canvas.height = h

    const petals: Petal[] = []

    function makePetal(): Petal {
      return {
        x: Math.random() * w,
        y: -20,
        size: 4 + Math.random() * 7,
        speedY: 0.6 + Math.random() * 1.2,
        speedX: (Math.random() - 0.5) * 0.8,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.06,
        opacity: 0.5 + Math.random() * 0.5,
        color: BLUES[Math.floor(Math.random() * BLUES.length)],
      }
    }

    for (let i = 0; i < 22; i++) {
      const p = makePetal()
      p.y = Math.random() * h
      petals.push(p)
    }

    let raf: number

    function animate() {
      c.clearRect(0, 0, w, h)
      for (let i = petals.length - 1; i >= 0; i--) {
        const p = petals[i]
        p.y += p.speedY
        p.x += p.speedX + Math.sin(p.y * 0.02) * 0.4
        p.rotation += p.rotSpeed
        drawFlower(c, p)
        if (p.y > h + 20) petals.splice(i, 1, makePetal())
      }
      raf = requestAnimationFrame(animate)
    }

    animate()

    const ro = new ResizeObserver(() => {
      w = canvas.offsetWidth
      h = canvas.offsetHeight
      canvas.width = w
      canvas.height = h
    })
    ro.observe(canvas)

    return () => { cancelAnimationFrame(raf); ro.disconnect() }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full rounded-2xl pointer-events-none"
    />
  )
}
