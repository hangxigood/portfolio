import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export default function BlogPage() {
  const posts = getAllPosts()
  
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Blog Posts</h1>
      <div className="space-y-8">
        {posts.map((post) => (
          <article key={post.id}>
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <time className="text-gray-500">{formatDate(post.date)}</time>
            <Link 
              href={`/blog/${post.id}`}
              className="block mt-2 text-blue-500 hover:underline"
            >
              Read more →
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
} 