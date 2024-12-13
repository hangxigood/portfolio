'use client'
import { useState } from 'react'
import Link from 'next/link'

interface Post {
  id: string
  title: string
  date: string
  content: string
  tags: string[]
}

interface BlogListProps {
  posts: Post[]
}

export default function BlogList({ posts }: BlogListProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  const allTags = Array.from(new Set(
    posts.flatMap(post => post.tags || [])
  )).sort()

  const filteredPosts = selectedTag
    ? posts.filter(post => post.tags?.includes(selectedTag))
    : posts

  return (
    <>
      <div className="space-y-8">
        {filteredPosts.map((post) => (
          <article key={post.id}>
            <div className="flex items-center justify-between">
                <Link 
                href={`/blog/${post.id}`}
                className="block text-xl font-semibold mb-2 hover:underline"
                >
                {post.title}
                </Link>
                <time className="text-gray-500">
                {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })}
                </time>
            </div>
            <p className="text-gray-600 mb-2">{post.content.slice(0, 110)}...</p>
            <div className="flex gap-2 mb-4">
            {post.tags?.map((tag: string) => (
                <Link
                key={tag}
                href={`/blog?tag=${tag}`}
                className="text-sm text-gray-500 hover:underline"
                >
                #{tag}
                </Link>
                ))}
            </div>
          </article>
        ))}
      </div>
    </>
  )
}