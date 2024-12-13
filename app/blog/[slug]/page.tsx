import { getAllPosts } from '@/lib/posts'
import { notFound } from 'next/navigation'
import matter from 'gray-matter'
import fs from 'fs'
import path from 'path'

// Add this export - it tells Next.js which paths to generate at build time
export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.id,
  }))
}

// Get individual post content
function getPost(slug: string) {
  try {
    const fullPath = path.join(process.cwd(), 'posts', `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    
    return {
      data,
      content,
    }
  } catch {
    return null
  }
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug)
  
  if (!post) {
    notFound()
  }

  return (
    <article className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-4">{post.data.title}</h1>
      <time className="text-gray-500 block mb-8">
        {new Date(post.data.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}
      </time>
      <div 
        className="prose dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  )
} 