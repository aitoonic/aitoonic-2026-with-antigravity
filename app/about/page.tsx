import type { Metadata } from 'next'
import { getCanonicalUrl, defaultRobots } from '@/lib/seo/canonical'
import { generateAboutPageJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo/structured-data'
import { sanitizeJsonLd } from '@/lib/sanitize-jsonld'

export const metadata: Metadata = {
  title: 'About Us - Aitoonic',
  description: 'Learn about Aitoonic, your trusted directory for discovering the best AI tools and platforms to enhance productivity and business growth.',
  keywords: 'about aitoonic, AI tools directory, artificial intelligence platform',
  robots: defaultRobots,
  alternates: {
    canonical: getCanonicalUrl('about')
  }
}

export default function AboutPage() {
  const aboutJsonLd = generateAboutPageJsonLd()
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', url: 'https://aitoonic.com/' },
    { name: 'About', url: 'https://aitoonic.com/about/' }
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={sanitizeJsonLd(aboutJsonLd)}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={sanitizeJsonLd(breadcrumbJsonLd)}
      />
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card/60 backdrop-blur border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              About Aitoonic
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Your trusted directory for discovering the best AI tools and platforms 
              to enhance productivity and business growth.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-12">
          {/* Mission */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">Our Mission</h2>
            <div className="prose prose-lg prose-invert max-w-none">
              <p>
                At Aitoonic, we believe artificial intelligence has the power to transform how we work, 
                create, and solve problems. Our mission is to democratize access to AI by creating a 
                comprehensive, curated directory of the best AI tools available today.
              </p>
              <p>
                We understand that navigating the rapidly evolving AI landscape can be overwhelming. 
                That's why we've made it our goal to simplify discovery, making it easy for individuals 
                and businesses to find the perfect AI solution for their specific needs.
              </p>
            </div>
          </section>

          {/* What We Do */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">What We Do</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-card p-6 rounded-lg border border-border">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Curated Discovery</h3>
                <p className="text-muted-foreground">
                  We carefully research, test, and curate AI tools across various categories 
                  to ensure you only see the best and most relevant options.
                </p>
              </div>
              
              <div className="bg-card p-6 rounded-lg border border-border">
                <div className="w-12 h-12 bg-green-400/10 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Quality Assurance</h3>
                <p className="text-muted-foreground">
                  Every tool in our directory is evaluated for quality, reliability, and practical value 
                  to ensure you invest your time in tools that deliver results.
                </p>
              </div>
              
              <div className="bg-card p-6 rounded-lg border border-border">
                <div className="w-12 h-12 bg-purple-400/10 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Organized Categories</h3>
                <p className="text-muted-foreground">
                  Tools are organized into intuitive categories and tagged appropriately, 
                  making it easy to find solutions for specific use cases and industries.
                </p>
              </div>
              
              <div className="bg-card p-6 rounded-lg border border-border">
                <div className="w-12 h-12 bg-orange-400/10 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Stay Current</h3>
                <p className="text-muted-foreground">
                  The AI landscape moves fast. We continuously update our directory with 
                  the latest tools and remove outdated or discontinued services.
                </p>
              </div>
            </div>
          </section>

          {/* Values */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">Our Values</h2>
            <div className="prose prose-lg prose-invert max-w-none">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Accessibility</h3>
                  <p className="text-muted-foreground">
                    We believe everyone should have access to AI tools, regardless of their technical background. 
                    Our platform is designed to be user-friendly and informative for all skill levels.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Transparency</h3>
                  <p className="text-muted-foreground">
                    We provide honest, unbiased information about each tool's capabilities, limitations, 
                    and pricing to help you make informed decisions.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Innovation</h3>
                  <p className="text-muted-foreground">
                    We're passionate about the potential of AI and committed to showcasing 
                    innovative tools that push the boundaries of what's possible.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Contact */}
          <section className="bg-card p-8 rounded-lg border border-border">
            <h2 className="text-3xl font-bold text-foreground mb-6">Get in Touch</h2>
            <div className="prose prose-lg prose-invert max-w-none">
              <p>
                Have a suggestion for a tool we should feature? Found an issue with our site? 
                We'd love to hear from you! Your feedback helps us improve and grow our community.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-4">
                <a
                  href="mailto:hello@aitoonic.com"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  Contact Us
                </a>
                <a
                  href="/ai-tools-directory/"
                  className="inline-flex items-center px-6 py-3 border border-border text-base font-medium rounded-md text-foreground bg-card hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  Suggest a Tool
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
    </>
  )
}
