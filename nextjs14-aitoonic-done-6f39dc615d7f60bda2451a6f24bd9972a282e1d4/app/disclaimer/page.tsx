import type { Metadata } from 'next'
import { defaultRobots, getCanonicalUrl } from '@/lib/seo/canonical'

export const metadata: Metadata = {
  title: 'Affiliate Disclaimer - Aitoonic',
  description: 'Some tools we feature use affiliate links. This does not affect our reviews or rankings.',
  robots: defaultRobots,
  alternates: { canonical: getCanonicalUrl('disclaimer') },
  openGraph: { title: 'Affiliate Disclaimer - Aitoonic', description: 'Transparency about affiliate links.', type: 'website' },
  twitter: { card: 'summary_large_image' }
}

export default function DisclaimerPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-foreground mb-6">Affiliate Disclaimer</h1>
      <p className="text-muted-foreground mb-4">Some listings on Aitoonic may include affiliate links. If you click and buy, we may earn a commission at no extra cost to you.</p>
      <p className="text-muted-foreground">We only feature tools we believe are valuable. Affiliate partnerships do not influence our editorial decisions.</p>
    </div>
  )
}


