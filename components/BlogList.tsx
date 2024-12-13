'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import { BlogListProps } from '@/types/blog'

export default function BlogList({ posts }: BlogListProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [selectedTag, setSelectedTag] = useState<string | null>(searchParams.get('tag'))

  useEffect(() => {
    const tagFromUrl = searchParams.get('tag')
    setSelectedTag(tagFromUrl)
  }, [searchParams])

  const filteredPosts = selectedTag
    ? posts.filter(post => post.tags?.includes(selectedTag))
    : posts

  const handleTagClick = (tag: string) => {
    if (selectedTag === tag) {
      router.push('/blog')
      setSelectedTag(null)
    } else {
      router.push(`/blog?tag=${tag}`)
      setSelectedTag(tag)
    }
  }

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
                <button
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  className={`text-sm ${
                    selectedTag === tag 
                      ? 'text-blue-600 font-medium' 
                      : 'text-gray-500'
                  } hover:underline`}
                >
                  #{tag}
                </button>
              ))}
            </div>
          </article>
        ))}
      </div>
    </>
  )
}