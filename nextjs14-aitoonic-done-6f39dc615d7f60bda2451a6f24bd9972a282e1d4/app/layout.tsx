import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getCanonicalUrl, defaultRobots } from '@/lib/seo/canonical'
import { OverflowDebugger } from '@/components/debug/OverflowDebugger'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://aitoonic.com'),
  title: 'Aitoonic - Discover the Best AI Tools',
  description: 'Explore and discover the best AI tools and platforms. Find the perfect AI solution for your needs.',
  keywords: 'AI tools, artificial intelligence, machine learning, AI platforms, AI directory',
  openGraph: {
    title: 'Aitoonic - Discover the Best AI Tools',
    description: 'Explore and discover the best AI tools and platforms. Find the perfect AI solution for your needs.',
    type: 'website',
    siteName: 'Aitoonic'
  },
  robots: defaultRobots,
  alternates: {
    canonical: getCanonicalUrl()
  },
  icons: {
    icon: {
      url: 'https://i.ibb.co/KjStWPgL/aitoonic-fevicon-2.webp',
      type: 'image/webp'
    }
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnects for faster third-party origins */}
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {process.env.NEXT_PUBLIC_SUPABASE_URL && (
          <link rel="preconnect" href={process.env.NEXT_PUBLIC_SUPABASE_URL} crossOrigin="anonymous" />
        )}
        {/* ✅ Google Search Console Verification */}
        <meta name="google-site-verification" content="google99751189b74dfd68" />
        {/* Prevent theme flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(() => { try { const s = localStorage.getItem('theme'); const m = window.matchMedia('(prefers-color-scheme: dark)').matches; if (s === 'dark' || (!s && m)) { document.documentElement.classList.add('dark'); } } catch(_) {} })();`,
          }}
        />
      </head>
      <body className={`${inter.className} bg-background text-foreground antialiased`}>
        <Header />
        <main>
          {/* lightweight hero gradient layer */}
          <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b from-primary/10 to-transparent dark:from-primary/20" style={{ height: '40vh' }} />
          {/* animated neon aurora background */}
          <div aria-hidden className="neon-aurora" />
          {children}
        </main>
        <Footer />
        {process.env.NODE_ENV === 'development' && <OverflowDebugger />}
      </body>
    </html>
  )
}
