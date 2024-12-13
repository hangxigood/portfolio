import Image from 'next/image'
import Link from 'next/link'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="w-48 h-48 relative rounded-full overflow-hidden">
          <Image
            src="/profile.jpg"
            alt="Hangxi Xiang"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-bold mb-4">
            Hi, I&apos;m Hangxi Xiang
          </h1>
          <p className="text-lg mb-4">
            A software developer based in Calgary.
          </p>
          
          <div className="flex gap-4 justify-center md:justify-start">
            <Link
              href="https://github.com/hangxigood"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:text-gray-600 transition-colors"
            >
              <FaGithub />
            </Link>
            <Link
              href="https://linkedin.com/in/hangxi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:text-gray-600 transition-colors"
            >
              <FaLinkedin />
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-12 space-y-4">
        <p className="text-lg">
          I used to work as an embedded systems developer, marketer, product manager, and data analyst. 
          These roles have given me great insights into both business and technology.
        </p>
        <p className="text-lg">
          Apart from work, I love cooking, reading, snorkeling, camping, and spending time with my wife and child.
        </p>
      </div>
    </div>
  )
}
