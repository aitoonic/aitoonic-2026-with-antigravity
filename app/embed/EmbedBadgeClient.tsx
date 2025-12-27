"use client"

import { useMemo, useState } from 'react'

const DARK_URL = 'https://i.ibb.co/LXcdwtmc/Aitoonic-FEATURED-Dark.webp'
const LIGHT_URL = 'https://i.ibb.co/ycLB5CbV/Aitoonic-FEATURED-White.webp'

type Mode = 'auto' | 'dark' | 'light'

type SnippetType = 'img' | 'picture'

function codeFor(mode: Mode, type: SnippetType): string {
  const site = 'https://aitoonic.com/'
  if (type === 'img') {
    const src = mode === 'dark' ? DARK_URL : LIGHT_URL
    return (
`<a href="${site}" rel="noopener" target="_blank" aria-label="Aitoonic Featured">
  <img src="${src}" alt="Aitoonic Featured" width="240" height="64" style="height:auto;display:inline-block" />
</a>`
    )
  }
  // theme-aware using prefers-color-scheme
  return (
`<a href="${site}" rel="noopener" target="_blank" aria-label="Aitoonic Featured">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcSet="${DARK_URL}" />
    <img src="${LIGHT_URL}" alt="Aitoonic Featured" width="240" height="64" style="height:auto;display:inline-block" />
  </picture>
</a>`
  )
}

export default function EmbedBadgeClient() {
  const [mode, setMode] = useState<Mode>('auto')
  const [snipType, setSnipType] = useState<SnippetType>('picture')
  const code = useMemo(() => codeFor(mode, snipType), [mode, snipType])
  const previewSrc = mode === 'dark' ? DARK_URL : mode === 'light' ? LIGHT_URL : undefined

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code)
    } catch {}
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="text-sm font-medium mb-2">Theme</div>
          <div className="flex items-center gap-2">
            <button onClick={() => setMode('auto')} className={`px-3 py-1.5 text-sm rounded border ${mode==='auto'?'bg-primary text-primary-foreground border-primary':'border-border hover:bg-accent'}`}>Auto</button>
            <button onClick={() => setMode('dark')} className={`px-3 py-1.5 text-sm rounded border ${mode==='dark'?'bg-primary text-primary-foreground border-primary':'border-border hover:bg-accent'}`}>Dark</button>
            <button onClick={() => setMode('light')} className={`px-3 py-1.5 text-sm rounded border ${mode==='light'?'bg-primary text-primary-foreground border-primary':'border-border hover:bg-accent'}`}>Light</button>
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="text-sm font-medium mb-2">Embed type</div>
          <div className="flex items-center gap-2">
            <button onClick={() => setSnipType('picture')} className={`px-3 py-1.5 text-sm rounded border ${snipType==='picture'?'bg-primary text-primary-foreground border-primary':'border-border hover:bg-accent'}`}>Theme-aware &lt;picture&gt;</button>
            <button onClick={() => setSnipType('img')} className={`px-3 py-1.5 text-sm rounded border ${snipType==='img'?'bg-primary text-primary-foreground border-primary':'border-border hover:bg-accent'}`}>&lt;img&gt; only</button>
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="text-sm font-medium mb-3">Preview</div>
        <div className="flex items-center justify-center p-6 rounded-md bg-background border border-dashed border-border">
          {mode === 'auto' ? (
            <picture>
              <source media="(prefers-color-scheme: dark)" srcSet={DARK_URL} />
              <img src={LIGHT_URL} width={240} height={64} alt="Aitoonic Featured" className="h-auto" />
            </picture>
          ) : (
            <img src={previewSrc} width={240} height={64} alt="Aitoonic Featured" className="h-auto" />
          )}
        </div>
      </div>

      {/* Code */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="text-sm font-medium">Copy embed code</div>
          <button onClick={copy} className="px-3 py-1.5 text-sm rounded border border-border hover:bg-accent">Copy</button>
        </div>
        <pre className="overflow-auto text-xs bg-muted/30 p-3 rounded-md"><code>{code}</code></pre>
        <p className="text-xs text-muted-foreground mt-3">Paste this HTML into your site where you want the badge to appear.</p>
      </div>
    </div>
  )
}
