import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const projectsDirectory = path.join(process.cwd(), 'projects')

export interface Project {
  slug: string
  content: string
  title: string
  description: string
  image: string
  githubLink: string
  deploymentLink: string
}

interface ProjectData {
  title: string
  description: string
  image: string
  githubLink: string
  deploymentLink: string
}

export function getAllProjects(): Project[] {
  const fullPath = path.join(projectsDirectory, 'projects.md')
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data } = matter(fileContents)
  
  return data.projects.map((project: ProjectData, index: number) => ({
    slug: `project-${index}`,
    content: '',
    ...project
  }))
}

export function getProjectBySlug(slug: string): Project {
  const fullPath = path.join(projectsDirectory, 'projects.md')
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data } = matter(fileContents)
  const project = data.projects[Number(slug.split('-')[1])]
  
  return {
    slug,
    content: '',
    ...project
  }
}
