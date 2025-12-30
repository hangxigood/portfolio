# Product Requirements Document (PRD) - Portfolio & Blog

## 1. Introduction
This document outlines the requirements and specifications for the personal portfolio and blog website. The platform serves as a central hub to showcase professional work, projects, and personal thoughts through blog posts.

## 2. Goals & Objectives
- **Professional Presence**: Establish a professional online identity for Hangxi Xiang.
- **Showcase Work**: Display a portfolio of technical projects with links to code and live deployments.
- **Content Sharing**: Share knowledge, thoughts, and experiences through a blog.
- **Simplicity & Performance**: Ensure a clean, fast, and accessible user experience using modern web technologies.

## 3. Technology Stack
- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Content Management**: Markdown (File-system based)
- **Markdown Processing**: 
    - `gray-matter`: Parsing frontmatter
    - `markdown-it`: Rendering Markdown to HTML
    - `prismjs`: Syntax highlighting for code blocks
- **Icons**: `react-icons`
- **Fonts**: Geist Sans & Mono
- **Deployment**: Vercel (Implied by `vercel.app` links in projects)

## 4. Feature Requirements

### 4.1. Home Page
- **URL**: `/`
- **Components**:
    - **Header/Navigation**: Links to Home, Blog, Projects.
    - **Profile Section**: 
        - Profile Image.
        - Bio/Introduction text.
        - Social Media Links (GitHub, LinkedIn, Email, etc.).
    - **Detailed Bio**: Expandable or detailed paragraphs about background and interests.

### 4.2. Blog Section
- **URL**: `/blog`
- **Features**:
    - **Post List**: Displays a list of all blog posts sorted by date (newest first).
    - **Post Preview**: Shows title, date, and potentially tags.
    - **Individual Post View**: 
        - Renders full Markdown content.
        - Supports syntax highlighting for code blocks.
        - Displays metadata (Title, Date, Tags).
- **Data Source**: Markdown files in `posts/` directory.
- **Schema**:
    ```typescript
    interface Post {
      id: string;      // Filename without extension
      title: string;   // Frontmatter
      date: string;    // Frontmatter (YYYY-MM-DD)
      tags: string[];  // Frontmatter
      content: string; // Markdown body
    }
    ```

### 4.3. Projects Section
- **URL**: `/projects`
- **Features**:
    - **Project Grid**: Responsive grid layout displaying project cards.
    - **Project Card**:
        - Title & Description.
        - Preview Image.
        - Links: "View Code" (GitHub) and "Live Demo" (Deployment).
- **Data Source**: A single Markdown file `projects/projects.md` containing a list of projects in frontmatter.
- **Schema**:
    ```typescript
    interface Project {
      slug: string;           // Generated from index
      title: string;          // Frontmatter
      description: string;    // Frontmatter
      image: string;          // Frontmatter (path to public image)
      githubLink: string;     // Frontmatter (URL)
      deploymentLink: string; // Frontmatter (URL)
    }
    ```

### 4.4. Navigation & Layout
- **Global Navigation**: Consistent top navbar across all pages.
- **Responsive Design**: Mobile-friendly layout using Tailwind CSS.
- **Dark/Light Mode**: (To be confirmed if implemented, assumed default light or system preference based on generic styles).

## 5. Directory Structure
```
.
├── app/                    # Next.js App Router pages and layout
│   ├── blog/               # Blog route
│   ├── projects/           # Projects route
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── components/             # Reusable React components
├── lib/                    # Utility functions (data fetching)
│   ├── posts.ts            # Blog post fetching logic
│   └── projects.ts         # Project fetching logic
├── posts/                  # Blog post Markdown files (*.md)
├── projects/               # Project data (projects.md)
├── public/                 # Static assets (images, favicon)
└── styles/                 # Global styles and Tailwind config
```

## 6. Future Enhancements (Backlog)
- [ ] Add category/tag filtering for blog posts.
- [ ] Implement search functionality.
- [ ] Add "Featured Projects" section to Home page.
- [ ] SEO optimizations (Sitemap, Open Graph tags).
