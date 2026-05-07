import React from 'react'

/**
 * Lightweight, zero-dependency markdown renderer.
 * Supports: images, links, bold, italic, horizontal rules,
 * unordered lists, ordered lists, and plain paragraphs.
 * Intentionally kept simple — no external libs needed.
 */

type InlineNode =
  | { type: 'text'; value: string }
  | { type: 'bold'; children: InlineNode[] }
  | { type: 'italic'; children: InlineNode[] }
  | { type: 'link'; href: string; children: InlineNode[] }
  | { type: 'image'; src: string; alt: string }

function parseInline(raw: string): InlineNode[] {
  const nodes: InlineNode[] = []
  let i = 0

  while (i < raw.length) {
    // Image: ![alt](url)
    if (raw[i] === '!' && raw[i + 1] === '[') {
      const closeBracket = raw.indexOf(']', i + 2)
      if (closeBracket !== -1 && raw[closeBracket + 1] === '(') {
        const closeParen = raw.indexOf(')', closeBracket + 2)
        if (closeParen !== -1) {
          const alt = raw.slice(i + 2, closeBracket)
          const src = raw.slice(closeBracket + 2, closeParen)
          nodes.push({ type: 'image', src, alt })
          i = closeParen + 1
          continue
        }
      }
    }

    // Link: [text](url)
    if (raw[i] === '[') {
      const closeBracket = raw.indexOf(']', i + 1)
      if (closeBracket !== -1 && raw[closeBracket + 1] === '(') {
        const closeParen = raw.indexOf(')', closeBracket + 2)
        if (closeParen !== -1) {
          const linkText = raw.slice(i + 1, closeBracket)
          const href = raw.slice(closeBracket + 2, closeParen)
          nodes.push({ type: 'link', href, children: parseInline(linkText) })
          i = closeParen + 1
          continue
        }
      }
    }

    // Bold: **text**
    if (raw[i] === '*' && raw[i + 1] === '*') {
      const end = raw.indexOf('**', i + 2)
      if (end !== -1) {
        const inner = raw.slice(i + 2, end)
        nodes.push({ type: 'bold', children: parseInline(inner) })
        i = end + 2
        continue
      }
    }

    // Italic: *text* (single star, not double)
    if (raw[i] === '*' && raw[i + 1] !== '*') {
      const end = raw.indexOf('*', i + 1)
      if (end !== -1) {
        const inner = raw.slice(i + 1, end)
        nodes.push({ type: 'italic', children: parseInline(inner) })
        i = end + 1
        continue
      }
    }

    // Plain text — consume until next special character
    let j = i + 1
    while (j < raw.length) {
      if (
        raw[j] === '*' ||
        raw[j] === '[' ||
        raw[j] === '!'
      ) break
      j++
    }
    nodes.push({ type: 'text', value: raw.slice(i, j) })
    i = j
  }

  return nodes
}

function renderInline(nodes: InlineNode[], keyPrefix: string): React.ReactNode[] {
  return nodes.map((node, idx) => {
    const key = `${keyPrefix}-${idx}`
    switch (node.type) {
      case 'text':
        return <React.Fragment key={key}>{node.value}</React.Fragment>
      case 'bold':
        return <strong key={key}>{renderInline(node.children, key)}</strong>
      case 'italic':
        return <em key={key}>{renderInline(node.children, key)}</em>
      case 'link':
        return (
          <a
            key={key}
            href={node.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800 font-medium"
          >
            {renderInline(node.children, key)}
          </a>
        )
      case 'image':
        return (
          <img
            key={key}
            src={node.src}
            alt={node.alt}
            className="rounded-lg w-full object-cover my-2 max-h-48"
            loading="lazy"
          />
        )
    }
  })
}

type Block =
  | { type: 'hr' }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'paragraph'; raw: string }

function parseBlocks(markdown: string): Block[] {
  const lines = markdown.split('\n')
  const blocks: Block[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    // Skip blank lines
    if (line.trim() === '') {
      i++
      continue
    }

    // Horizontal rule: --- or ***
    if (/^[-*]{3,}$/.test(line.trim())) {
      blocks.push({ type: 'hr' })
      i++
      continue
    }

    // Unordered list item: - item
    if (/^\s*[-*+]\s+/.test(line)) {
      const items: string[] = []
      while (i < lines.length && /^\s*[-*+]\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*[-*+]\s+/, ''))
        i++
      }
      blocks.push({ type: 'ul', items })
      continue
    }

    // Ordered list item: 1. item
    if (/^\s*\d+\.\s+/.test(line)) {
      const items: string[] = []
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*\d+\.\s+/, ''))
        i++
      }
      blocks.push({ type: 'ol', items })
      continue
    }

    // Paragraph (catch-all)
    blocks.push({ type: 'paragraph', raw: line })
    i++
  }

  return blocks
}

export default function MarkdownRenderer({ content }: { content: string }) {
  const blocks = parseBlocks(content)

  return (
    <div className="markdown-content space-y-1.5 text-sm leading-relaxed">
      {blocks.map((block, blockIdx) => {
        const key = `block-${blockIdx}`
        switch (block.type) {
          case 'hr':
            return <hr key={key} className="border-gray-200 my-2" />

          case 'ul':
            return (
              <ul key={key} className="space-y-1 pl-1">
                {block.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="mt-0.5 text-gray-400 shrink-0">•</span>
                    <span>{renderInline(parseInline(item), `${key}-li-${idx}`)}</span>
                  </li>
                ))}
              </ul>
            )

          case 'ol':
            return (
              <ol key={key} className="space-y-1 pl-1">
                {block.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="mt-0.5 text-gray-500 shrink-0 font-medium">{idx + 1}.</span>
                    <span>{renderInline(parseInline(item), `${key}-oli-${idx}`)}</span>
                  </li>
                ))}
              </ol>
            )

          case 'paragraph': {
            const inlineNodes = parseInline(block.raw)
            // If the only node is an image, render it without a <p> wrapper
            if (
              inlineNodes.length === 1 &&
              inlineNodes[0].type === 'image'
            ) {
              return (
                <img
                  key={key}
                  src={inlineNodes[0].src}
                  alt={inlineNodes[0].alt}
                  className="rounded-lg w-full object-cover my-2 max-h-48"
                  loading="lazy"
                />
              )
            }
            return (
              <p key={key}>
                {renderInline(inlineNodes, key)}
              </p>
            )
          }
        }
      })}
    </div>
  )
}
