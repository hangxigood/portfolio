import { getAllPosts } from '@/lib/posts'
import BlogList from '@/components/BlogList'

export default async function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Blog Posts</h1>
      <BlogList posts={posts} />
    </div>
  )
}