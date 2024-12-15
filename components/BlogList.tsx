'use client'
import { useState, useEffect, useTransition } from 'react'
import Link from 'next/link'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { BlogListProps } from '@/types/blog'

export default function BlogList({ posts }: BlogListProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  useEffect(() => {
    const tagFromUrl = searchParams.get('tag')
    setSelectedTag(tagFromUrl)
  }, [searchParams])

  const filteredPosts = selectedTag
    ? posts.filter(post => post.tags?.includes(selectedTag))
    : posts

  const handleTagClick = (tag: string) => {
    startTransition(() => {
      if (selectedTag === tag) {
        router.push(pathname)
        setSelectedTag(null)
      } else {
        router.push(`${pathname}?tag=${tag}`)
        setSelectedTag(tag)
      }
    })
  }

  return (
    <div className="space-y-8">
      {filteredPosts.map((post) => (
        <article key={post.id} className={isPending ? 'opacity-70' : ''}>
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
                day: 'numeric',
                timeZone: 'UTC'
              })}
            </time>
          </div>
          <p className="text-gray-600 mb-2">{post.content.slice(0, 110)}...</p>
          <div className="flex gap-2 mb-4">
            {post.tags?.map((tag: string) => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                disabled={isPending}
                className={`text-sm ${
                  selectedTag === tag 
                    ? 'text-blue-600 font-medium' 
                    : 'text-gray-500'
                } hover:underline disabled:opacity-50`}
              >
                #{tag}
              </button>
            ))}
          </div>
        </article>
      ))}
    </div>
  )
}