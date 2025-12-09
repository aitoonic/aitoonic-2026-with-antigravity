import type { Metadata } from 'next'
import { defaultRobots, getCanonicalUrl } from '@/lib/seo/canonical'
import { sanitizeJsonLd } from '@/lib/sanitize-jsonld'

export const metadata: Metadata = {
  title: 'Advertise on Aitoonic',
  description: 'Partner with Aitoonic to reach AI builders and buyers. Sponsored placements, category features, and newsletter mentions.',
  robots: defaultRobots,
  alternates: { canonical: getCanonicalUrl('advertise') },
  openGraph: { title: 'Advertise on Aitoonic', description: 'Reach a targeted AI audience.', type: 'website' },
  twitter: { card: 'summary_large_image' }
}

export default function AdvertisePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-foreground mb-6">Advertise</h1>
      <p className="text-muted-foreground mb-6">Content-only page. Email us to book placements.</p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-foreground mb-3">Inventory</h2>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li>Homepage feature card</li>
          <li>Category feature card</li>
          <li>Newsletter mention</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-foreground mb-3">Performance</h2>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li>Monthly impressions: 50k+ (rolling average)</li>
          <li>Outbound clicks: 5k–10k/month</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-foreground mb-3">Contact</h2>
        <p className="text-muted-foreground">Email <a className="text-primary hover:underline" href="mailto:dc556316@gmail.com">dc556316@gmail.com</a> or message via <a className="text-primary hover:underline" href="https://www.linkedin.com/in/deepakchauhan333/" target="_blank" rel="noopener noreferrer">LinkedIn</a>.</p>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={sanitizeJsonLd({ '@context': 'https://schema.org', '@type': 'WebPage', name: 'Advertise - Aitoonic', about: { '@type': 'Organization', name: 'Aitoonic', email: 'dc556316@gmail.com' } })}
      />
    </div>
  )
}
