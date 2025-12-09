import { Metadata } from 'next'
import HomeClient from './HomeClient'
import { getCategories, getToolsCount } from '@/lib/api'
import { getCanonicalUrl, defaultRobots } from '@/lib/seo/canonical'
import { generateHomePageJsonLd } from '@/lib/seo/structured-data'
import { sanitizeJsonLd } from '@/lib/sanitize-jsonld'

export const revalidate = 3600 // Revalidate data every hour

export async function generateMetadata(): Promise<Metadata> {
  try {
    const [categories, toolsCount] = await Promise.all([
      getCategories(),
      getToolsCount()
    ]);

    const brand = 'Aitoonic'
    const cats = categories.length
    const title = `${brand} – ${toolsCount}+ AI tools across ${cats}+ categories`
    const description = `Discover ${toolsCount}+ AI tools in ${cats}+ categories. Compare, filter, and find the best AI tools at ${brand}.`

    const homeJsonLd = generateHomePageJsonLd(categories.length, toolsCount);

    return {
      title,
      description,
      keywords: 'AI tools, artificial intelligence, machine learning, AI platforms, AI directory',
      openGraph: {
        title,
        description,
        type: 'website',
        siteName: brand,
        locale: 'en_US',
      },
      twitter: {
        card: 'summary_large_image',
        site: '@aitoonic',
      },
      robots: defaultRobots,
      alternates: {
        canonical: getCanonicalUrl()
      },
      other: {
        'json-ld': JSON.stringify(homeJsonLd)
      }
    }
  } catch (error) {
    console.error('Error generating homepage metadata:', error);
    const fallbackTitle = 'Aitoonic - Discover the Best AI Tools'
    const fallbackDescription = 'Explore and discover the best AI tools and platforms. Find the perfect AI solution for your needs.'
    return {
      title: fallbackTitle,
      description: fallbackDescription,
    }
  }
}

export default async function HomePage() {
  const [categories, toolsCount] = await Promise.all([
    getCategories(),
    getToolsCount()
  ])

  const homeJsonLd = generateHomePageJsonLd(categories.length, toolsCount)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={sanitizeJsonLd(homeJsonLd)}
      />
      {/* SSR Hero for better LCP */}
      <div className="bg-background">
        <div className="container pt-12">
          <section className="text-center mb-6">
            <h1 className="text-4xl font-extrabold text-foreground sm:text-5xl sm:tracking-tight lg:text-6xl mb-4">
              Discover the Best AI Tools
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-muted-foreground">
              Find the perfect AI solution for your needs from our curated collection
            </p>
            {/* Static trending chips for instant interactivity (no JS) */}
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              {['Image Generator', 'Chatbot', 'Resume', 'Marketing', 'Transcription', 'Logo Maker'].map((chip) => (
                <a
                  key={chip}
                  href={`/categories/?q=${encodeURIComponent(chip.toLowerCase())}`}
                  className="inline-flex items-center px-3 py-1.5 text-sm rounded-full border border-border text-foreground hover:bg-secondary"
                  aria-label={`Browse ${chip} tools`}
                >
                  {chip}
                </a>
              ))}
            </div>
          </section>
        </div>
      </div>
      <HomeClient showHero={false} />
    </>
  )
}
