import { getAllPosts } from '@/lib/posts'
import { notFound } from 'next/navigation'
import matter from 'gray-matter'
import fs from 'fs'
import path from 'path'
import { renderMarkdown } from '@/lib/markdown'

// Generate static params for all posts
export function generateStaticParams() {
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
  } catch (e) {
    return null
  }
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug)
  
  if (!post) {
    notFound()
  }

  const htmlContent = renderMarkdown(post.content)

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
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </article>
  )
} 