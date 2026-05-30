import { getAllPosts } from '@/lib/posts'
import HomePage from '@/components/HomePage'

export default function Home() {
  const posts = getAllPosts()

  const postsByDate: Record<string, string> = {}
  for (const p of posts) {
    if (p.date && !postsByDate[p.date]) postsByDate[p.date] = p.slug
  }

  return <HomePage posts={posts} postsByDate={postsByDate} />
}
