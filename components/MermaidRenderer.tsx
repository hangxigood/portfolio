'use client'

import { useEffect } from 'react'
import mermaid from 'mermaid'

export default function MermaidRenderer() {
    useEffect(() => {
        // Initialize Mermaid with configuration
        mermaid.initialize({
            startOnLoad: true,
            theme: 'default',
            securityLevel: 'loose',
        })

        // Run Mermaid to render all diagrams
        mermaid.run({
            querySelector: '.mermaid',
        }).catch((error) => {
            console.error('Mermaid rendering error:', error)
        })
    }, [])

    return null
}
