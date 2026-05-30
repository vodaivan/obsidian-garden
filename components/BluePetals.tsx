'use client'

import { useEffect, useRef } from 'react'

interface Petal {
  x: number; y: number; size: number
  speedY: number; speedX: number
  rotation: number; rotSpeed: number
  opacity: number; color: string
}

const PINKS = ['#fda4af','#fb7185','#fecdd3','#f9a8d4','#fbcfe8','#fce7f3']

function drawPetal(c: CanvasRenderingContext2D, p: Petal) {
  c.save()
  c.globalAlpha = p.opacity
  c.translate(p.x, p.y)
  c.rotate(p.rotation)

  // Cánh hoa anh đào: hình bầu dục tròn, rộng hơn dài — giống cánh hoa thật
  const gradient = c.createRadialGradient(0, 0, 0, 0, 0, p.size)
  gradient.addColorStop(0, '#fff0f6')
  gradient.addColorStop(0.5, p.color)
  gradient.addColorStop(1, p.color + 'aa')
  c.fillStyle = gradient

  c.beginPath()
  // Hình oval ngang: rộng > cao, bo tròn như cánh hoa anh đào
  c.ellipse(0, 0, p.size * 1.1, p.size * 0.7, 0, 0, Math.PI * 2)
  c.fill()

  // Đường gân nhẹ giữa cánh
  c.strokeStyle = p.color + '66'
  c.lineWidth = 0.5
  c.beginPath()
  c.moveTo(-p.size * 0.8, 0)
  c.lineTo(p.size * 0.8, 0)
  c.stroke()

  c.restore()
}

export default function CherryBlossom() {
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
        x: Math.random() * w, y: -20,
        size: 4 + Math.random() * 7,
        speedY: 0.5 + Math.random() * 1.0,
        speedX: (Math.random() - 0.5) * 0.7,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.05,
        opacity: 0.45 + Math.random() * 0.45,
        color: PINKS[Math.floor(Math.random() * PINKS.length)],
      }
    }

    for (let i = 0; i < 22; i++) {
      const p = makePetal(); p.y = Math.random() * h; petals.push(p)
    }

    let raf: number
    function animate() {
      c.clearRect(0, 0, w, h)
      for (let i = petals.length - 1; i >= 0; i--) {
        const p = petals[i]
        p.y += p.speedY
        p.x += p.speedX + Math.sin(p.y * 0.018) * 0.5
        p.rotation += p.rotSpeed
        drawPetal(c, p)
        if (p.y > h + 20) petals.splice(i, 1, makePetal())
      }
      raf = requestAnimationFrame(animate)
    }
    animate()

    const ro = new ResizeObserver(() => {
      w = canvas.offsetWidth; h = canvas.offsetHeight
      canvas.width = w; canvas.height = h
    })
    ro.observe(canvas)

    return () => { cancelAnimationFrame(raf); ro.disconnect() }
  }, [])

  return (
    <canvas ref={canvasRef}
      className="absolute inset-0 w-full h-full rounded-2xl pointer-events-none" />
  )
}
