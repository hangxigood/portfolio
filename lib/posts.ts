import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'posts')

export function getAllPosts() {
  // Get all files from the posts directory
  const fileNames = fs.readdirSync(postsDirectory)
  
  const allPostsData = fileNames
    // Filter out directories and non-markdown files
    .filter(fileName => {
      const fullPath = path.join(postsDirectory, fileName)
      return fs.statSync(fullPath).isFile() && /\.md$/.test(fileName)
    })
    .map((fileName) => {
      const id = fileName.replace(/\.md$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const matterResult = matter(fileContents)

      return {
        id,
        ...(matterResult.data as { date: string; title: string }),
        content: matterResult.content,
      }
    })

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1))
} 