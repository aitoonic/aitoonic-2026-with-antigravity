import { Metadata } from 'next'
import ComparePageClient from './ComparePageClient'
import { getCanonicalUrl, defaultRobots } from '@/lib/seo/canonical'
import { generateBreadcrumbJsonLd } from '@/lib/seo/structured-data'

export const dynamic = 'force-static'
export const revalidate = 1800 // 30 minutes

export const metadata: Metadata = {
  title: 'Compare AI Tools - Aitoonic',
  description: 'Compare AI tools side by side to find the best fit for your needs',
  keywords: 'AI tool comparison, compare AI tools, AI software comparison, best AI tools',
  openGraph: {
    title: 'Compare AI Tools - Aitoonic',
    description: 'Compare AI tools side by side to find the best fit for your needs',
    type: 'website'
  },
  robots: defaultRobots,
  alternates: {
    canonical: getCanonicalUrl('compare')
  }
}

export default function ComparePage() {
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', url: 'https://aitoonic.com/' },
    { name: 'Compare', url: 'https://aitoonic.com/compare/' }
  ])

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ComparePageClient />
    </>
  )
}
