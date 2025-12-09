import type { Metadata } from 'next'
import { defaultRobots, getCanonicalUrl } from '@/lib/seo/canonical'
import { sanitizeJsonLd } from '@/lib/sanitize-jsonld'
import { getCSRFTokenForRender } from '@/lib/csrf'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Contact - Aitoonic',
  description: 'Contact Aitoonic for submissions, advertising, and partnerships.',
  robots: defaultRobots,
  alternates: { canonical: getCanonicalUrl('contact') },
  openGraph: { title: 'Contact - Aitoonic', description: 'Reach the Aitoonic team.', type: 'website' },
  twitter: { card: 'summary_large_image' }
}

export default function ContactPage() {
  // Generate CSRF token for the form
  const csrfToken = getCSRFTokenForRender();
  
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-foreground mb-6">Contact</h1>
      <p className="text-muted-foreground mb-6">Get in touch with the Aitoonic team using the form below or through our contact details:</p>
      
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-4">Send us a message</h2>
          <ContactForm csrfToken={csrfToken} />
        </div>
        
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-4">Contact Information</h2>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Deepak Chauhan</li>
            <li>LinkedIn: <a className="text-primary hover:underline" href="https://www.linkedin.com/in/deepakchauhan333/" target="_blank" rel="noopener noreferrer">Profile</a></li>
            <li>Email: <a className="text-primary hover:underline" href="mailto:dc556316@gmail.com">dc556316@gmail.com</a></li>
          </ul>
        </div>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={sanitizeJsonLd({ '@context': 'https://schema.org', '@type': 'WebPage', name: 'Contact - Aitoonic', about: { '@type': 'Organization', name: 'Aitoonic', email: 'dc556316@gmail.com' } })}
      />
    </div>
  )
}
