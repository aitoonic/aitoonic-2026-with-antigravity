import type { Metadata } from 'next'
import { defaultRobots, getCanonicalUrl } from '@/lib/seo/canonical'
import { sanitizeJsonLd } from '@/lib/sanitize-jsonld'
import { getCSRFTokenForRender } from '@/lib/csrf'
import SubmitForm from '@/components/SubmitForm'

export const metadata: Metadata = {
  title: 'Submit Your AI Tool - Aitoonic',
  description: 'Get your AI tool listed on Aitoonic. Reach targeted users via curated listings, category pages, and comparison features.',
  robots: defaultRobots,
  alternates: { canonical: getCanonicalUrl('submit-ai') },
  openGraph: {
    title: 'Submit Your AI Tool - Aitoonic',
    description: 'List your AI product on Aitoonic and reach a highly engaged audience.',
    type: 'website'
  },
  twitter: { card: 'summary_large_image' }
}

export default function SubmitAIPage() {
  // Get CSRF token safely without setting cookies during render
  const csrfToken = getCSRFTokenForRender();
  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold text-foreground mb-6">Submit Your AI Tool</h1>
      <p className="text-muted-foreground mb-6">Content-only page. Email us to submit your tool.</p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 text-foreground">What we offer</h2>
        <ul className="list-disc pl-6 space-y-2 text-foreground">
          <li>Curated tool listings with category placement</li>
          <li>Featured placements and compare visibility</li>
          <li>Editorial review for clarity and trust</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 text-foreground">Audience & performance</h2>
        <ul className="list-disc pl-6 space-y-2 text-foreground">
          <li>Monthly impressions: 50k+ (and growing)</li>
          <li>Outbound clicks to tools: 5k–10k/month</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 text-foreground">Submit your AI tool</h2>
        <div className="bg-card p-4 sm:p-6 rounded-lg border border-border">
          <SubmitForm csrfToken={csrfToken} formType="ai" />
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 text-foreground">Contact</h2>
        <ul className="list-disc pl-6 space-y-2 text-foreground">
          <li>Deepak Chauhan</li>
          <li>LinkedIn: <a className="text-primary hover:underline" href="https://www.linkedin.com/in/deepakchauhan333/" target="_blank" rel="noopener noreferrer">Profile</a></li>
          <li>Email: <a className="text-primary hover:underline" href="mailto:dc556316@gmail.com">dc556316@gmail.com</a></li>
        </ul>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={sanitizeJsonLd({
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Submit Your AI Tool - Aitoonic',
          about: {
            '@type': 'Organization',
            name: 'Aitoonic',
            email: 'dc556316@gmail.com',
            sameAs: ['https://www.linkedin.com/in/deepakchauhan333/']
          }
        })}
      />
    </div>
  )
}
