import type { Metadata } from 'next'
import { defaultRobots, getCanonicalUrl } from '@/lib/seo/canonical'
import { sanitizeJsonLd } from '@/lib/sanitize-jsonld'

export const metadata: Metadata = {
  title: 'Guest Posts - Aitoonic',
  description: 'Contribute high-quality guest posts about AI tools, workflows, and case studies.',
  robots: defaultRobots,
  alternates: { canonical: getCanonicalUrl('guest-posts') },
  openGraph: { title: 'Guest Posts - Aitoonic', description: 'Pitch your guest article to Aitoonic.', type: 'website' },
  twitter: { card: 'summary_large_image' }
}

export default function GuestPostsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-foreground mb-6">Guest Posts</h1>
      <p className="text-muted-foreground mb-6">We accept well-researched, original contributions. Content-only; email your pitch.</p>
      <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
        <li>Topics: AI tools, implementation guides, case studies</li>
        <li>Length: 1,000–2,000 words</li>
        <li>No AI content without human review and source citations</li>
      </ul>
      <p className="text-muted-foreground mt-6">Pitch: <a className="text-primary hover:text-primary/80" href="mailto:dc556316@gmail.com">dc556316@gmail.com</a></p>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={sanitizeJsonLd({ '@context': 'https://schema.org', '@type': 'WebPage', name: 'Guest Posts - Aitoonic' })}
      />
    </div>
  )
}


