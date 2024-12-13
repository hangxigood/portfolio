export interface Post {
    id: string
    title: string
    date: string
    content: string
    tags: string[]
  }
  
export interface BlogListProps {
    posts: Post[]
  }