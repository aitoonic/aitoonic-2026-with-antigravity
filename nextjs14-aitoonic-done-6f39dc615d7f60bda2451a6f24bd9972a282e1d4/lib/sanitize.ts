import createDOMPurify from 'dompurify'

// Create a DOMPurify instance only in the browser
let DOMPurify: ReturnType<typeof createDOMPurify> | null = null
if (typeof window !== 'undefined') {
  // dompurify v3 default export is a factory function
  // Cast to avoid Trusted Types typings conflicts across libs in some TS setups
  const make = (createDOMPurify as unknown as (win: unknown) => ReturnType<typeof createDOMPurify>)
  DOMPurify = make(window as unknown as Window)
}

/**
 * Sanitizes HTML content to prevent XSS attacks
 * @param html The HTML content to sanitize
 * @returns Sanitized HTML content
 */
export function sanitizeHtml(html: string | null | undefined): string {
  if (!html) return '';

  // On the server (no window), we can't instantiate DOMPurify without JSDOM.
  // Provide a conservative fallback: strip tags.
  if (!DOMPurify) {
    try {
      return String(html).replace(/<[^>]*>/g, '')
    } catch {
      return ''
    }
  }

  const sanitized = DOMPurify.sanitize(html, {
    // Allow only safe tags and attributes
    ALLOWED_TAGS: [
      'a', 'b', 'br', 'code', 'div', 'em', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'i', 'li', 'ol', 'p', 'pre', 'span', 'strong', 'table', 'tbody', 'td',
      'th', 'thead', 'tr', 'ul'
    ],
    ALLOWED_ATTR: [
      'href', 'target', 'rel', 'class', 'id', 'style'
    ],
    // Ensure all URLs are properly sanitized
    FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover'],
    // Prevent any script execution
    FORBID_TAGS: ['script', 'iframe', 'object', 'embed', 'form', 'input', 'button'],
    // We cannot set attribute values via config; we'll post-process safely below
    ADD_ATTR: ['target', 'rel']
  });

  // Post-process in browser: ensure rel is set when target="_blank"
  if (typeof window !== 'undefined') {
    try {
      const container = document.createElement('div')
      container.innerHTML = sanitized
      const links = container.querySelectorAll('a[target="_blank"]')
      links.forEach((a) => {
        const currentRel = a.getAttribute('rel') || ''
        if (!/\bnoopener\b/.test(currentRel) || !/\bnoreferrer\b/.test(currentRel)) {
          const parts = new Set(currentRel.split(/\s+/).filter(Boolean))
          parts.add('noopener')
          parts.add('noreferrer')
          a.setAttribute('rel', Array.from(parts).join(' '))
        }
      })
      return container.innerHTML
    } catch {
      // fall back to sanitized string
    }
  }

  return sanitized
}