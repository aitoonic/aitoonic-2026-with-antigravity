import { Metadata } from 'next'
import Link from 'next/link'
import ToolCard from '@/components/ToolCard'
import { getCategories, getToolsByCategory, getToolsCount } from '@/lib/api'
import { Tool } from '@/lib/types'
import { getCanonicalUrl, defaultRobots } from '@/lib/seo/canonical'
import { sanitizeJsonLd } from '@/lib/sanitize-jsonld'
import { generateHomePageJsonLd } from '@/lib/seo/structured-data'

export const revalidate = 1800

function getPricingType(tool: Tool): 'free' | 'paid' | 'freemium' | 'unknown' {
  const pricing = tool.pricing || []
  if (!pricing.length) return 'unknown'
  const prices = pricing.map(p => (p.price || '').toString().trim())
  const hasFree = prices.some(p => p === '0' || p === '$0' || p === '$0.00' || p.toLowerCase() === 'free')
  const hasPaid = prices.some(p => p && p !== '0' && p !== '$0' && p !== '$0.00' && p.toLowerCase() !== 'free')
  if (hasFree && hasPaid) return 'freemium'
  if (hasFree) return 'free'
  if (hasPaid) return 'paid'
  return 'unknown'
}

export async function generateMetadata({ searchParams }: { searchParams?: { pricing?: string } }): Promise<Metadata> {
  const [categories, toolsCount] = await Promise.all([
    getCategories(),
    getToolsCount(),
  ])
  const brand = 'Aitoonic'
  const pricing = searchParams?.pricing
  const pricingText = pricing ? ` (${pricing} only)` : ''
  const title = `Best AI Tools Directory${pricingText} – ${brand}`
  const description = `Explore ${categories.length}+ AI categories and ${toolsCount}+ tools in the best AI tools directory by ${brand}. Filter by Free, Paid, or Freemium to find the right tool.`
  const jsonLd = generateHomePageJsonLd(categories.length, toolsCount)
  return {
    title,
    description,
    robots: defaultRobots,
    alternates: { canonical: getCanonicalUrl('ai-tools-directory') },
    openGraph: { title, description, type: 'website' },
    twitter: { card: 'summary_large_image', site: '@aitoonic' },
    other: { 'json-ld': JSON.stringify(jsonLd) },
  }
}

export default async function AIToolsDirectoryPage({ searchParams }: { searchParams?: { pricing?: 'free' | 'paid' | 'freemium' } }) {
  const pricing = searchParams?.pricing
  const categories = await getCategories()

  return (
    <div className="bg-background">
      <div className="container py-10">
        <header className="mb-8">
          <h1 className="text-3xl font-extrabold text-foreground">AI Tools Directory</h1>
          <p className="text-muted-foreground mt-2">Browse every category with the first 8 tools shown. Use filters to narrow by pricing model.</p>
          <div className="mt-4 inline-flex items-center gap-2 text-sm">
            <Link href="/ai-tools-directory" className={`px-3 py-1.5 rounded border ${!pricing ? 'bg-primary text-primary-foreground border-transparent' : 'border-border text-foreground hover:bg-accent'}`}>All</Link>
            <Link href="/ai-tools-directory?pricing=free" className={`px-3 py-1.5 rounded border ${pricing==='free' ? 'bg-primary text-primary-foreground border-transparent' : 'border-border text-foreground hover:bg-accent'}`}>Free</Link>
            <Link href="/ai-tools-directory?pricing=freemium" className={`px-3 py-1.5 rounded border ${pricing==='freemium' ? 'bg-primary text-primary-foreground border-transparent' : 'border-border text-foreground hover:bg-accent'}`}>Freemium</Link>
            <Link href="/ai-tools-directory?pricing=paid" className={`px-3 py-1.5 rounded border ${pricing==='paid' ? 'bg-primary text-primary-foreground border-transparent' : 'border-border text-foreground hover:bg-accent'}`}>Paid</Link>
          </div>
        </header>

        <main>
          {categories.map(async (category) => {
            const toolsRaw = await getToolsByCategory(category.id, 32) // fetch a buffer to allow filter
            const tools = (toolsRaw || []).filter(t => {
              if (!pricing) return true
              const type = getPricingType(t)
              return type === pricing
            }).slice(0, 8)

            if (tools.length === 0) return null

            return (
              <section key={category.id} className="mb-14">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-2xl font-bold text-foreground">{category.name}</h2>
                  <Link href={`/category/${category.slug}`} className="text-primary text-sm font-medium hover:text-primary/90 flex items-center">
                    View all
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {tools.map(tool => (
                    <ToolCard key={tool.id} tool={tool} />
                  ))}
                </div>
              </section>
            )
          })}
        </main>
      </div>
    </div>
  )
}
