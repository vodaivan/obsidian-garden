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
  contentHtml?: string
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

      // Only show notes with status: published
      if (data.status !== 'published') return null

      return {
        slug: slugify(filename),
        title: data.title || filename.replace(/\.md$/, ''),
        date: data.date ? new Date(data.date).toISOString().split('T')[0] : '',
        description: data.description || '',
        cover: data.cover || '',
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

    if (data.status !== 'published') return null

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
      contentHtml: processed.toString(),
    }
  }

  return null
}

export function getPostDates(): string[] {
  return getAllPosts().map(p => p.date).filter(Boolean)
}
