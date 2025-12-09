import type { Metadata } from 'next'
import CategoriesClient from './CategoriesClient'
import { getCanonicalUrl, defaultRobots } from '@/lib/seo/canonical'
import { generateBreadcrumbJsonLd } from '@/lib/seo/structured-data'
import { sanitizeJsonLd } from '@/lib/sanitize-jsonld'
import { getCategoriesWithToolCount } from '@/lib/api'

// Make this route static and revalidate periodically for very fast TTFB
export const dynamic = 'force-static'
export const revalidate = 900 // 15 minutes

export const metadata: Metadata = {
  title: 'AI Tool Categories - Aitoonic',
  description: 'Browse AI tools by category. Find the perfect AI solution for chatbots, content creation, data analysis, and more.',
  keywords: 'AI categories, AI tools, artificial intelligence, machine learning categories',
  robots: defaultRobots,
  alternates: {
    canonical: getCanonicalUrl('categories')
  }
}

export default async function CategoriesPage() {
  // Fetch on the server to avoid client HTTP roundtrip
  const categoriesWithCount = await getCategoriesWithToolCount()
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', url: 'https://aitoonic.com/' },
    { name: 'Categories', url: 'https://aitoonic.com/categories/' }
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={sanitizeJsonLd(breadcrumbJsonLd)}
      />
      <CategoriesClient initialCategories={categoriesWithCount} />
    </>
  )
}
