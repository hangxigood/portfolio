import MarkdownIt from 'markdown-it'
import Prism from 'prismjs'

// Import commonly used programming languages
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-sql'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-markdown'
import 'prismjs/components/prism-yaml'
import 'prismjs/components/prism-docker'
import 'prismjs/components/prism-go'
import 'prismjs/components/prism-rust'
import 'prismjs/components/prism-java'
import 'prismjs/components/prism-csharp'

// Define supported languages type
const SUPPORTED_LANGUAGES = [
  'python',
  'sql',
  'bash',
  'javascript',
  'typescript',
  'jsx',
  'tsx',
  'css',
  'json',
  'markdown',
  'yaml',
  'dockerfile',
  'go',
  'rust',
  'java',
  'csharp',
] as const

// Create type from the array
type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number]

// Create markdown-it instance with proper typing
const md: MarkdownIt = new MarkdownIt({
  html: true,
  breaks: true,
  linkify: true,
  highlight: function (str: string, lang: string): string {
    // Check if language is supported
    if (lang && SUPPORTED_LANGUAGES.includes(lang as SupportedLanguage) && Prism.languages[lang]) {
      try {
        return `<pre class="language-${lang}"><code class="language-${lang}">${
          Prism.highlight(str, Prism.languages[lang], lang)
        }</code></pre>`
      } catch {
        // Fallback if highlighting fails
        return `<pre><code>${md.utils.escapeHtml(str)}</code></pre>`
      }
    }
    // Default fallback for unknown languages
    return `<pre><code>${md.utils.escapeHtml(str)}</code></pre>`
  }
})

export function renderMarkdown(content: string): string {
  return md.render(content)
}

// Export supported languages and type for reference
export { SUPPORTED_LANGUAGES }
export type { SupportedLanguage } 