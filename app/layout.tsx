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
      </body>
    </html>
  )
}
