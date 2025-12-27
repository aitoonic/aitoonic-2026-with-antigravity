import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ComparisonClient from './ComparisonClient'
import { getToolsForComparison, getTools, getCategories, getComparisonsByCategory } from '@/lib/api'
import { getCanonicalUrl, defaultRobots } from '@/lib/seo/canonical'
import { generateBreadcrumbJsonLd, generateCompareJsonLd } from '@/lib/seo/structured-data'

interface ComparisonPageProps {
  params: {
    comparison: string
  }
}

// Keep this route dynamic to avoid generating millions of params; we’ll optimize client-side
// Optimization: Switched from force-dynamic to ISR to cache results and reduce egress from bots.
export const revalidate = 3600 // Cache for 1 hour
// export const dynamic = 'force-dynamic' // Removed to allow caching

export async function generateMetadata({ params }: ComparisonPageProps): Promise<Metadata> {
  try {
    const [tool1Slug, tool2Slug] = params.comparison.split('-vs-')
    const { tool1, tool2 } = await getToolsForComparison(tool1Slug, tool2Slug)

    if (!tool1 || !tool2) {
      return {
        title: 'Tool Comparison Not Found - Aitoonic',
        description: 'The requested tool comparison could not be found.'
      }
    }

    return {
      title: `${tool1.name} vs ${tool2.name} - AI Tool Comparison | Aitoonic`,
      description: `Compare ${tool1.name} and ${tool2.name}. See detailed side-by-side comparison of features, pricing, and capabilities.`,
      keywords: `${tool1.name}, ${tool2.name}, AI tool comparison, vs, comparison`,
      openGraph: {
        title: `${tool1.name} vs ${tool2.name} - AI Tool Comparison`,
        description: `Compare ${tool1.name} and ${tool2.name}. See detailed side-by-side comparison of features, pricing, and capabilities.`,
        type: 'website'
      },
      robots: defaultRobots,
      alternates: {
        canonical: getCanonicalUrl(`compare/${params.comparison}`)
      }
    }
  } catch (error) {
    return {
      title: 'AI Tool Comparison - Aitoonic',
      description: 'Compare AI tools side by side'
    }
  }
}

export default async function ComparisonPage({ params }: ComparisonPageProps) {
  try {
    console.log('Comparison page params:', params)
    const [tool1Slug, tool2Slug] = params.comparison.split('-vs-')

    console.log('Tool slugs:', { tool1Slug, tool2Slug })

    if (!tool1Slug || !tool2Slug) {
      console.error('Invalid comparison format:', params.comparison)
      return (
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Invalid Comparison URL</h1>
              <p className="text-gray-600 mb-8">The comparison URL format is incorrect.</p>
              <Link href="/" className="text-blue-600 hover:text-blue-800">← Back to Home</Link>
            </div>
          </div>
        </div>
      )
    }

    const { tool1, tool2 } = await getToolsForComparison(tool1Slug, tool2Slug)

    console.log('Tools found:', { tool1: tool1?.name, tool2: tool2?.name })

    if (!tool1 && !tool2) {
      return (
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Tools Not Found</h1>
              <p className="text-gray-600 mb-8">Neither tool could be found: {tool1Slug} and {tool2Slug}</p>
              <Link href="/" className="text-blue-600 hover:text-blue-800">← Back to Home</Link>
            </div>
          </div>
        </div>
      )
    }

    if (!tool1) {
      return (
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Tool Not Found</h1>
              <p className="text-gray-600 mb-8">Tool '{tool1Slug}' could not be found.</p>
              <Link href="/" className="text-blue-600 hover:text-blue-800">← Back to Home</Link>
            </div>
          </div>
        </div>
      )
    }

    if (!tool2) {
      return (
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Tool Not Found</h1>
              <p className="text-gray-600 mb-8">Tool '{tool2Slug}' could not be found.</p>
              <Link href="/" className="text-blue-600 hover:text-blue-800">← Back to Home</Link>
            </div>
          </div>
        </div>
      )
    }

    // Ensure tools are from the same category
    if (tool1.category_id !== tool2.category_id) {
      return (
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Invalid Comparison</h1>
              <p className="text-gray-600 mb-8">{tool1.name} and {tool2.name} are from different categories and cannot be compared.</p>
              <Link href="/" className="text-blue-600 hover:text-blue-800">← Back to Home</Link>
            </div>
          </div>
        </div>
      )
    }

    // Get category information
    let category = null
    let similarComparisons: { slug: string, title: string, tool1: any, tool2: any }[] = []

    if (tool1.category_id) {
      try {
        const categories = await getCategories()
        category = categories.find(cat => cat.id === tool1.category_id) || null

        if (category) {
          const allComparisons = await getComparisonsByCategory(category.id)
          // Filter out current comparison (check both directions just in case)
          similarComparisons = allComparisons.filter(comp =>
            comp.slug !== params.comparison &&
            comp.slug !== `${tool2Slug}-vs-${tool1Slug}`
          )
        }
      } catch (error) {
        console.error('Error loading category or similar comparisons:', error)
      }
    }

    // Structured data
    const breadcrumbJsonLd = generateBreadcrumbJsonLd([
      { name: 'Home', url: 'https://aitoonic.com/' },
      ...(category ? [{ name: category.name, url: `https://aitoonic.com/category/${category.slug}/` }] : []),
      { name: `${tool1.name} vs ${tool2.name}`, url: `https://aitoonic.com/compare/${params.comparison}/` }
    ])
    const compareJsonLd = generateCompareJsonLd(tool1, tool2)

    return (
      <>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(compareJsonLd) }}
        />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
        <ComparisonClient
          tool1={tool1}
          tool2={tool2}
          category={category}
        />

        {similarComparisons.length > 0 && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-800">
            <h2 className="text-2xl font-bold text-white mb-8">More Similar Comparisons in This Category</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarComparisons.map((comp) => (
                <Link
                  key={comp.slug}
                  href={`/compare/${comp.slug}/`}
                  className="group block p-6 bg-gray-900 border border-gray-800 rounded-xl hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-gray-200 font-medium group-hover:text-blue-400 transition-colors text-lg">
                      {comp.tool1.name} <span className="text-gray-500 mx-2">vs</span> {comp.tool2.name}
                    </span>
                    <svg className="w-5 h-5 text-gray-600 group-hover:text-blue-500 transform group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </>
    )
  } catch (error) {
    console.error('Error loading comparison page:', error)
    return (
      <div className="min-h-screen bg-[#0B0F19] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Error Loading Comparison</h1>
            <p className="text-gray-400 mb-8">There was an error loading this comparison. Please try again later.</p>
            <Link href="/" className="text-blue-500 hover:text-blue-400">← Back to Home</Link>
          </div>
        </div>
      </div>
    )
  }
}
