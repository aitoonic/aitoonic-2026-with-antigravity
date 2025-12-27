import type { Metadata } from 'next'
import { getCanonicalUrl, defaultRobots } from '@/lib/seo/canonical'
import { generateBreadcrumbJsonLd } from '@/lib/seo/structured-data'
import { sanitizeJsonLd } from '@/lib/sanitize-jsonld'
import { getCSRFTokenForRender } from '@/lib/server/security/csrf'

export const metadata: Metadata = {
  title: 'AI Agents - Aitoonic',
  description: 'Discover intelligent AI agents that can automate tasks, provide assistance, and enhance productivity across various domains.',
  keywords: 'AI agents, artificial intelligence, automation, intelligent assistants, AI bots',
  robots: defaultRobots,
  alternates: {
    canonical: getCanonicalUrl('ai-agent')
  }
}

export default function AIAgentPage() {
  // Get CSRF token safely without setting cookies during render
  const csrfToken = getCSRFTokenForRender();
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', url: 'https://aitoonic.com/' },
    { name: 'AI Agents', url: 'https://aitoonic.com/ai-agent/' }
  ])

  return (
    <>
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
                AI Agents
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Discover intelligent AI agents that can automate tasks, provide assistance,
                and enhance productivity across various domains.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Coming Soon Section */}
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <div className="mb-8">
                <div className="mx-auto w-24 h-24 bg-primary rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423L16.5 15.75l.394 1.183a2.25 2.25 0 001.423 1.423L19.5 18.75l-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                  </svg>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-foreground mb-4">
                Coming Soon
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                We're currently working on curating the best AI agents for you.
                This section will feature intelligent agents that can help automate
                your workflows and boost productivity.
              </p>

              <div className="space-y-4">
                <div className="bg-card rounded-lg p-6 border border-border text-left">
                  <h3 className="font-semibold text-foreground mb-2">What to Expect:</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Task Automation Agents
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Customer Service Bots
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Personal AI Assistants
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Specialized Industry Agents
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Get notified when AI Agents launch
            </h3>
            <form action="/api/newsletter/subscribe" method="POST" className="w-full">
              {/* CSRF token for security */}
              <input type="hidden" name="csrf_token" value={csrfToken} />
              <div className="flex gap-2">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                  pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
                  className="flex-1 px-4 py-2 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 font-medium"
                >
                  Notify Me
                </button>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                We'll send you an update when this section is ready.
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
