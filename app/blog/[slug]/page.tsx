import { getAllPosts } from '@/lib/posts'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import matter from 'gray-matter'
import fs from 'fs'
import path from 'path'
import { renderMarkdown } from '@/lib/markdown'

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

  const htmlContent = renderMarkdown(post.content)

  return (
    <article className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-4">{post.data.title}</h1>
      <div className="flex gap-2 mb-4">
      {post.data.tags?.map((tag: string) => (
        <Link
          key={tag}
          href={`/blog?tag=${tag}`}
          className="text-sm text-gray-500 hover:underline"
        >
          #{tag}
        </Link>
        ))}
      </div>
      <time className="text-gray-500 block mb-8">
        {new Date(post.data.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          timeZone: 'UTC'
        })}
      </time>
      <div 
        className="prose dark:prose-invert max-w-none prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800 prose-pre:p-4 prose-pre:rounded-lg"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </article>
  )
} 