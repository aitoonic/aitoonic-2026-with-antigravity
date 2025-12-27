import type { Metadata } from 'next'
import { getCanonicalUrl, defaultRobots } from '@/lib/seo/canonical'
import EmbedBadgeClient from './EmbedBadgeClient'

export const dynamic = 'force-static'
export const revalidate = 86400 // daily

export const metadata: Metadata = {
  title: 'Embed Featured Badge - Aitoonic',
  description: 'Copy-paste a lightweight embed code to show the Aitoonic Featured badge on your website. Supports dark and light modes.',
  robots: defaultRobots,
  alternates: { canonical: getCanonicalUrl('embed') }
}

export default function EmbedPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold mb-2">Aitoonic Featured Badge</h1>
        <p className="text-muted-foreground mb-8">
          Choose Dark or Light and copy the embed code. The theme-aware snippet automatically switches by the visitor’s system theme.
        </p>
        <EmbedBadgeClient />
      </div>
    </div>
  )
}
