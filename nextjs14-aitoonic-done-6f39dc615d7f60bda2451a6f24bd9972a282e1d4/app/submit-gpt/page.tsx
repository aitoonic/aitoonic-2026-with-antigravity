import type { Metadata } from 'next'
import { defaultRobots, getCanonicalUrl } from '@/lib/seo/canonical'
import { sanitizeJsonLd } from '@/lib/sanitize-jsonld'
import { getCSRFTokenForRender } from '@/lib/csrf'
import SubmitForm from '@/components/SubmitForm'

export const metadata: Metadata = {
  title: 'Submit GPT - Aitoonic',
  description: 'Submit your GPT or AI agent to be featured on Aitoonic.',
  robots: defaultRobots,
  alternates: { canonical: getCanonicalUrl('submit-gpt') },
  openGraph: { title: 'Submit GPT - Aitoonic', description: 'Get your GPT listed on Aitoonic.', type: 'website' },
  twitter: { card: 'summary_large_image' }
}

export default function SubmitGPTPage() {
  // Get CSRF token safely without setting cookies during render
  const csrfToken = getCSRFTokenForRender();
  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold text-foreground mb-6">Submit GPT</h1>
      <p className="text-muted-foreground mb-6">Content-only page. Email us with details of your GPT/Agent.</p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 text-foreground">What we offer</h2>
        <ul className="list-disc pl-6 space-y-2 text-foreground">
          <li>Dedicated listing under AI Agents</li>
          <li>Editorial highlights and category tagging</li>
          <li>Optional featured placements</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 text-foreground">Submit your GPT</h2>
        <div className="bg-card p-4 sm:p-6 rounded-lg border border-border">
          <SubmitForm csrfToken={csrfToken} formType="gpt" />
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
          name: 'Submit GPT - Aitoonic',
          about: { '@type': 'Organization', name: 'Aitoonic', email: 'dc556316@gmail.com', sameAs: ['https://www.linkedin.com/in/deepakchauhan333/'] }
        })}
      />
    </div>
  )
}
