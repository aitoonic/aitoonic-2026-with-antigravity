import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import CategoryDetailClient from './CategoryDetailClient'
import { getCategoryBySlug, getToolsByCategorySlug, getCategories } from '@/lib/api'
import { getCanonicalUrl, defaultRobots } from '@/lib/seo/canonical'
import { generateCategoryJsonLd, generateBreadcrumbJsonLd, generateFAQJsonLd } from '@/lib/seo/structured-data'
import { sanitizeJsonLd } from '@/lib/sanitize-jsonld'
import { generateCategoryFaq } from '@/lib/category-content'

// Generate statically and revalidate for fast TTFB
export const dynamic = 'force-static'
export const revalidate = 3600 // cache category pages for 1 hour

interface CategoryDetailPageProps {
  params: {
    slug: string
  }
}

// Generate static params for all categories
export async function generateStaticParams() {
  try {
    const categories = await getCategories()
    return categories.map((category) => ({
      slug: category.slug || category.name?.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-') || 'untitled'
    }))
  } catch (error) {
    console.error('Error generating static params for categories:', error)
    return []
  }
}

export async function generateMetadata({ params }: CategoryDetailPageProps): Promise<Metadata> {
  try {
    const category = await getCategoryBySlug(params.slug)
    
    if (!category) {
      return {
        title: 'Category Not Found - Aitoonic',
        description: 'The requested category could not be found.'
      }
    }

    // Get tools for dynamic SEO
    const tools = await getToolsByCategorySlug(params.slug);
    const toolsCount = tools ? tools.length : 0;
    const topNames = (tools || []).slice(0, 5).map(t => t.name).filter(Boolean);
    const year = new Date().getFullYear();
    const dynamicTitle = `Best ${toolsCount} ${category.name} AI Tools in ${year}`;
    const dynamicDescription = topNames.length > 0
      ? `Best ${toolsCount} ${category.name} AI Tools are: ${topNames.join(', ')}, and the newest ${category.name} tools.`
      : `Discover the best ${category.name} AI tools. Explore features, pricing, and top picks.`

    // Generate category JSON-LD
    const categoryJsonLd = generateCategoryJsonLd(category, toolsCount);
    // FAQPage JSON-LD
    const faqPairs = await generateCategoryFaq(category.name)
    const faqJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqPairs.map((p: { q: string; a: string }) => ({
        '@type': 'Question',
        name: p.q,
        acceptedAnswer: { '@type': 'Answer', text: p.a }
      }))
    }

    // Generate breadcrumb JSON-LD
    const breadcrumbItems = [
      { name: 'Home', url: 'https://aitoonic.com/' },
      { name: 'Categories', url: 'https://aitoonic.com/categories/' },
      { name: category.name, url: `https://aitoonic.com/category/${category.slug}/` }
    ];
    
    const breadcrumbJsonLd = generateBreadcrumbJsonLd(breadcrumbItems);

    return {
      title: dynamicTitle,
      description: dynamicDescription,
      keywords: `${category.name}, AI tools, artificial intelligence, ${category.slug}`,
      openGraph: {
        title: dynamicTitle,
        description: dynamicDescription,
        type: 'website'
      },
      robots: defaultRobots,
      alternates: {
        canonical: getCanonicalUrl(`category/${params.slug}`)
      },
      other: {
        'og:site_name': 'Aitoonic',
        'og:locale': 'en_US',
        'twitter:card': 'summary_large_image',
        'twitter:site': '@aitoonic',
        // JSON-LD scripts
        'json-ld-category': JSON.stringify(categoryJsonLd),
        'json-ld-breadcrumb': JSON.stringify(breadcrumbJsonLd),
        ...(toolsCount >= 3 ? { 'json-ld-faq': JSON.stringify(faqJsonLd) } : {})
      }
    }
  } catch (error) {
    return {
      title: 'Category - Aitoonic',
      description: 'AI tools category page'
    }
  }
}

export default async function CategoryDetailPage({ params }: CategoryDetailPageProps) {
  try {
    const [category, tools] = await Promise.all([
      getCategoryBySlug(params.slug),
      getToolsByCategorySlug(params.slug)
    ])

    if (!category) {
      notFound()
    }

    const count = tools?.length || 0
    const categoryJsonLd = generateCategoryJsonLd(category, count)
    const faqPairs = await generateCategoryFaq(category.name)
    const faqJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqPairs.map((p: { q: string; a: string }) => ({
        '@type': 'Question',
        name: p.q,
        acceptedAnswer: { '@type': 'Answer', text: p.a }
      }))
    }
    const breadcrumbJsonLd = generateBreadcrumbJsonLd([
      { name: 'Home', url: 'https://aitoonic.com/' },
      { name: 'Categories', url: 'https://aitoonic.com/categories/' },
      { name: category.name, url: `https://aitoonic.com/category/${category.slug}/` }
    ])

    return (
      <>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(categoryJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={sanitizeJsonLd(breadcrumbJsonLd)}
        />
        {count >= 3 && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={sanitizeJsonLd(faqJsonLd)}
          />
        )}
        <CategoryDetailClient 
          category={category} 
          initialTools={tools}
          slug={params.slug}
        />
      </>
    )
  } catch (error) {
    console.error('Error loading category page:', error)
    notFound()
  }
}
