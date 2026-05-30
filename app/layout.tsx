import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Gia Đình 222',
  description: 'Ghi chép và suy nghĩ của gia đình',
  icons: {
    icon: [
      { url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='8' fill='%230284c7'/><text x='50%25' y='54%25' dominant-baseline='middle' text-anchor='middle' font-size='18' font-family='Segoe UI,sans-serif'>🏠</text></svg>" }
    ],
  },
  openGraph: {
    type: 'website',
    title: 'Gia Đình 222',
    description: 'Ghi chép và suy nghĩ của gia đình',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='8' fill='%230284c7'/><text x='16' y='22' text-anchor='middle' font-size='18'>🏠</text></svg>" />
      </head>
      <body className="min-h-screen">
        <header className="site-header">
          <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
            <a href="/">
              <span>🏠</span>
              <span>Gia Đình 222</span>
            </a>
            <span className="tagline hidden sm:block">Kiến thức · Ký ức · Yêu thương</span>
          </div>
        </header>
        <main>{children}</main>
        <footer style={{borderTop:'1px solid #e2e8f0',marginTop:'2.5rem',padding:'1rem 1.5rem',textAlign:'center',fontSize:'0.78rem',color:'#94a3b8',lineHeight:'1.6'}}>
          Compiled by <span style={{color:'#64748b',fontWeight:600}}>Vo Dai Van</span>
          &nbsp;·&nbsp;
          <a href="mailto:vodaivan00@gmail.com" style={{color:'#94a3b8',textDecoration:'none'}} onMouseOver={e=>(e.currentTarget.style.color='#0ea5e9')} onMouseOut={e=>(e.currentTarget.style.color='#94a3b8')}>
            vodaivan00@gmail.com
          </a>
        </footer>
      </body>
    </html>
  )
}
