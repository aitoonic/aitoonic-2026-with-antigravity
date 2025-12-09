import type { Metadata } from 'next'
import { defaultRobots, getCanonicalUrl } from '@/lib/seo/canonical'

export const metadata: Metadata = {
  title: 'Update AI Listing - Aitoonic',
  description: 'Request updates to your AI tool listing: pricing, features, or screenshots.',
  robots: defaultRobots,
  alternates: { canonical: getCanonicalUrl('update-ai') },
  openGraph: { title: 'Update AI Listing - Aitoonic', description: 'Email us your updates.', type: 'website' },
  twitter: { card: 'summary_large_image' }
}

export default function UpdateAIPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-foreground mb-6">Update AI Listing</h1>
      <p className="text-muted-foreground mb-6">Content-only page. Email documented changes to keep your listing accurate.</p>
      <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
        <li>Include tool name and URL</li>
        <li>Summarize the change (pricing, features, images)</li>
        <li>Attach assets if needed</li>
      </ul>
      <p className="text-muted-foreground mt-6">Email: <a className="text-primary hover:text-primary/80" href="mailto:dc556316@gmail.com">dc556316@gmail.com</a></p>
    </div>
  )
}


