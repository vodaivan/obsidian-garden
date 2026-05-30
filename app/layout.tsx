import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Family Knowledge System',
  description: 'Ghi chép và suy nghĩ của tôi',
  openGraph: {
    type: 'website',
    title: 'Family Knowledge System',
    description: 'Ghi chép và suy nghĩ của tôi',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className="min-h-screen bg-stone-50">
        <header className="border-b border-stone-200 bg-stone-50/80 backdrop-blur-sm sticky top-0 z-10">
          <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
            <a href="/" className="text-stone-800 font-serif text-lg font-semibold tracking-tight hover:text-stone-600 transition-colors">
              Vườn Kiến Thức
            </a>
            <span className="text-stone-400 text-sm">Ghi chép & Suy nghĩ</span>
          </div>
        </header>
        <main>{children}</main>
        <footer className="border-t border-stone-200 mt-20">
          <div className="max-w-4xl mx-auto px-6 py-8 text-center text-stone-400 text-sm">
            Viết bằng tình yêu và sự tò mò
          </div>
        </footer>
      </body>
    </html>
  )
}
