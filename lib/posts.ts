import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkHtml from 'remark-html'

const contentDir = path.join(process.cwd(), 'content')

export interface Post {
  slug: string
  title: string
  date: string
  description: string
  cover: string
  topic: string
  contentHtml?: string
}

/** status có thể là string 'online'/'published' hoặc array ['Online'] */
function isOnline(status: unknown): boolean {
  if (!status) return false
  if (typeof status === 'string') {
    return status.toLowerCase() === 'online' || status.toLowerCase() === 'published'
  }
  if (Array.isArray(status)) {
    return status.some(s => typeof s === 'string' &&
      (s.toLowerCase() === 'online' || s.toLowerCase() === 'published'))
  }
  return false
}

/** Đọc date từ date_created hoặc date, trả về YYYY-MM-DD */
function parseDate(raw: unknown): string {
  if (!raw) return ''
  try {
    const d = new Date(String(raw))
    if (isNaN(d.getTime())) return ''
    return d.toISOString().split('T')[0]
  } catch { return '' }
}

function slugify(filename: string): string {
  return filename
    .replace(/\.md$/, '')
    .toLowerCase()
    .replace(/[^a-z0-9À-ɏḀ-ỿ\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(contentDir)) return []

  const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.md'))

  const posts = files
    .map(filename => {
      const filePath = path.join(contentDir, filename)
      const fileContents = fs.readFileSync(filePath, 'utf8')
      const { data } = matter(fileContents)

      if (!isOnline(data.status)) return null

      return {
        slug: slugify(filename),
        title: data.title || filename.replace(/\.md$/, ''),
        date: parseDate(data.date_created ?? data.date),
        description: data.description || '',
        cover: data.cover || '',
        topic: data.topic || '',
        _filename: filename,
      }
    })
    .filter(Boolean) as (Post & { _filename: string })[]

  // Sort by date desc
  return posts
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .map(({ _filename: _, ...rest }) => rest)
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  if (!fs.existsSync(contentDir)) return null

  const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.md'))

  for (const filename of files) {
    if (slugify(filename) !== slug) continue

    const filePath = path.join(contentDir, filename)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)

    if (!isOnline(data.status)) return null

    const processed = await remark()
      .use(remarkGfm)
      .use(remarkHtml, { sanitize: false })
      .process(content)

    return {
      slug,
      title: data.title || filename.replace(/\.md$/, ''),
      date: data.date ? new Date(data.date).toISOString().split('T')[0] : '',
      description: data.description || '',
      cover: data.cover || '',
      topic: data.topic || '',
      contentHtml: processed.toString(),
    }
  }

  return null
}

export function getPostDates(): string[] {
  return getAllPosts().map(p => p.date).filter(Boolean)
}
