import Link from 'next/link'

export default function Navigation() {
  return (
    <nav className="p-4 shadow-sm">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <Link href="/" className="font-bold text-xl">
          Hangxi&apos;s Portfolio
        </Link>
        <div className="space-x-6">
          <Link href="/" className="hover:text-gray-600">Home</Link>
          <Link href="/blog" className="hover:text-gray-600">Blog</Link>
        </div>
      </div>
    </nav>
  )
} 