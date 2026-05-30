'use client'

export default function GrassFooter() {
  // 60 grass blades with varied heights and animation delays
  const blades = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    left: (i / 60) * 100 + (Math.random() * 1.8 - 0.9),
    height: 28 + Math.random() * 28,
    width: 3 + Math.random() * 3,
    delay: (Math.random() * 2).toFixed(2),
    duration: (1.8 + Math.random() * 1.4).toFixed(2),
    color: `hsl(${120 + Math.random() * 30}, ${60 + Math.random() * 20}%, ${28 + Math.random() * 18}%)`,
    bend: Math.random() > 0.5 ? 1 : -1,
  }))

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '60px',
        overflow: 'hidden',
        marginTop: '2rem',
        background: 'linear-gradient(to bottom, transparent 0%, #bbf7d0 80%, #86efac 100%)',
      }}
    >
      <style>{`
        @keyframes sway {
          0%,100% { transform: rotate(0deg); transform-origin: bottom center; }
          25%      { transform: rotate(4deg); transform-origin: bottom center; }
          75%      { transform: rotate(-4deg); transform-origin: bottom center; }
        }
        .blade { animation: sway linear infinite; }
      `}</style>

      <svg
        viewBox={`0 0 1000 60`}
        preserveAspectRatio="none"
        style={{ width: '100%', height: '100%', position: 'absolute', bottom: 0 }}
      >
        {blades.map(b => {
          const x = b.left * 10  // map 0-100% → 0-1000
          const bx = b.bend * b.width * 1.5
          return (
            <g key={b.id}>
              <style>{`
                #blade-${b.id} {
                  animation: sway ${b.duration}s ${b.delay}s ease-in-out infinite;
                  transform-origin: ${x}px 60px;
                }
              `}</style>
              <path
                id={`blade-${b.id}`}
                d={`M${x},60 Q${x + bx},${60 - b.height * 0.5} ${x + bx * 0.6},${60 - b.height}`}
                stroke={b.color}
                strokeWidth={b.width}
                fill="none"
                strokeLinecap="round"
              />
            </g>
          )
        })}
      </svg>
    </div>
  )
}
