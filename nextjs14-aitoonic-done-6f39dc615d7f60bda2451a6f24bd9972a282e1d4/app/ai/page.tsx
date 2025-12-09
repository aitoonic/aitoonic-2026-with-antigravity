import type { Metadata } from 'next'
import { getTools, getToolsCount } from '@/lib/api'
import ToolCard from '@/components/ToolCard'

// Generate this page statically and revalidate periodically for sub-200ms TTFB
export const dynamic = 'force-static'
export const revalidate = 600 // 10 minutes

export const metadata: Metadata = {
  title: 'All AI Tools | Aitoonic',
  description: 'Browse all AI tools in a clean, tokenized grid with smooth motion-safe animations.',
}

export default async function AllToolsPage() {
  const [tools, total] = await Promise.all([
    getTools(),
    getToolsCount(),
  ])

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">All AI Tools</h1>
          <p className="text-muted-foreground">{total} tools available</p>
        </header>

        {tools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {tools.map((tool) => (
              <div
                key={tool.id}
                className="motion-safe:animate-in motion-safe:fade-in-50 motion-safe:zoom-in-95 motion-safe:duration-300 motion-safe:ease-out"
              >
                <ToolCard tool={tool} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">No tools found.</p>
          </div>
        )}
      </div>
    </div>
  )
}
