import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import ReviewSkeleton from '@/components/reviews/review-skeleton'
import ToolDetailClient from './ToolDetailClient'
import ReviewSection from '@/components/reviews/review-section'
import { getToolBySlug, getTools, getSimilarTools, getCategoryById } from '@/lib/api'
import { Tool } from '@/lib/types'
import { getCanonicalUrl, defaultRobots } from '@/lib/seo/canonical'
import { generateToolJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo/structured-data'
import { sanitizeJsonLd } from '@/lib/sanitize-jsonld'
import { sanitizeHtml } from '@/lib/sanitize'

// Cache tool pages with ISR to keep them fast
export const dynamic = 'force-static'
export const revalidate = 3600

interface ToolDetailPageProps {
  params: {
    slug: string
  }
}

// Generate static params for all tools
export async function generateStaticParams() {
  try {
    const tools = await getTools()
    return tools.map((tool) => ({
      slug: tool.slug || tool.name?.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-') || 'untitled'
    }))
  } catch (error) {
    console.error('Error generating static params for tools:', error)
    return []
  }
}

export async function generateMetadata({ params }: ToolDetailPageProps): Promise<Metadata> {
  try {
    const tool = await getToolBySlug(params.slug)

    if (!tool) {
      return {
        title: 'Tool Not Found - Aitoonic',
        description: 'The requested AI tool could not be found.'
      }
    }

    let categoryName = ''
    if (tool.category_id) {
      try {
        const category = await getCategoryById(tool.category_id)
        if (category) categoryName = category.name
      } catch (error) {
        console.error('Error loading category for metadata:', error)
      }
    }

    // Generate JSON-LD structured data
    const toolJsonLd = generateToolJsonLd(tool, categoryName);

    // Generate breadcrumb JSON-LD
    const breadcrumbItems = [
      { name: 'Home', url: 'https://aitoonic.com/' },
      { name: categoryName || 'AI Tools', url: categoryName ? `https://aitoonic.com/category/${categoryName.toLowerCase().replace(/\s+/g, '-')}/` : 'https://aitoonic.com/categories/' },
      { name: tool.name, url: `https://aitoonic.com/ai/${tool.slug}/` }
    ];

    const breadcrumbJsonLd = generateBreadcrumbJsonLd(breadcrumbItems);

    return {
      title: tool.seo_title || `${tool.name} - AI Tool | Aitoonic`,
      description: tool.seo_description || tool.description?.substring(0, 160) + '...',
      keywords: `${tool.name}, AI tool, artificial intelligence, ${categoryName}`,
      openGraph: {
        title: tool.seo_title || `${tool.name} - AI Tool | Aitoonic`,
        description: tool.seo_description || tool.description?.substring(0, 160) + '...',
        type: 'website',
        images: tool.image_url ? [{
          url: tool.image_url,
          alt: tool.image_alt || tool.name
        }] : []
      },
      robots: defaultRobots,
      alternates: {
        canonical: getCanonicalUrl(`ai/${params.slug}`)
      },
      other: {
        'og:site_name': 'Aitoonic',
        'og:locale': 'en_US',
        'twitter:card': 'summary_large_image',
        'twitter:site': '@aitoonic',
        // JSON-LD scripts
        'json-ld-tool': JSON.stringify(toolJsonLd),
        'json-ld-breadcrumb': JSON.stringify(breadcrumbJsonLd)
      },
    }
  } catch (error) {
    return {
      title: 'AI Tool - Aitoonic',
      description: 'AI tool detail page'
    }
  }
}

export default async function ToolDetailPage({ params }: ToolDetailPageProps) {
  try {
    // First try to find tool by the slug parameter
    let tool = await getToolBySlug(params.slug)

    // If not found by slug, try to find by name (fallback for tools without slug)
    if (!tool) {
      // This is a fallback - in a real app you might want to implement a search by name
      // For now, we'll just show not found
      notFound()
    }

    // Fetch category and similar tools in parallel when category_id exists
    let category = null
    let similarTools: Tool[] = []
    if (tool.category_id) {
      try {
        const [cat, sims] = await Promise.all([
          getCategoryById(tool.category_id),
          getSimilarTools(tool.category_id, tool.id, 6),
        ])
        category = cat || null
        similarTools = sims || []
      } catch (error) {
        console.error('Error loading category/similar tools:', error)
      }
    }

    // Structured data
    const categoryName = category?.name || 'AI Tools'
    const toolJsonLd = generateToolJsonLd(tool, categoryName)
    const breadcrumbJsonLd = generateBreadcrumbJsonLd([
      { name: 'Home', url: 'https://aitoonic.com/' },
      { name: category?.name || 'Categories', url: category ? `https://aitoonic.com/category/${category.slug}/` : 'https://aitoonic.com/categories/' },
      { name: tool.name, url: `https://aitoonic.com/ai/${tool.slug}/` }
    ])

    // Pre-sanitize heavy HTML on the server to reduce client JS
    const sanitizedHowToUse = tool.how_to_use ? sanitizeHtml(tool.how_to_use) : null

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={sanitizeJsonLd(toolJsonLd)}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={sanitizeJsonLd(breadcrumbJsonLd)}
        />
        <ToolDetailClient
          tool={tool}
          category={category}
          similarTools={similarTools}
          sanitizedHowToUse={sanitizedHowToUse || undefined}
        />

        <div id="reviews" className="mt-16 container mx-auto px-4 max-w-7xl scroll-mt-24">
          <Suspense fallback={<ReviewSkeleton />}>
            <ReviewSection toolId={tool.id} />
          </Suspense>
        </div>
      </>
    )
  } catch (error) {
    console.error('Error loading tool page:', error)
    notFound()
  }
}
