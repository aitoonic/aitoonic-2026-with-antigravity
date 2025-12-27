import type { Metadata } from 'next'
import { getCanonicalUrl, defaultRobots } from '@/lib/seo/canonical'
import { generateBreadcrumbJsonLd } from '@/lib/seo/structured-data'
import { sanitizeJsonLd } from '@/lib/sanitize-jsonld'

export const metadata: Metadata = {
  title: 'Privacy Policy - Aitoonic',
  description: 'Learn about how Aitoonic collects, uses, and protects your personal information.',
  keywords: 'privacy policy, data protection, personal information, aitoonic',
  robots: defaultRobots,
  alternates: {
    canonical: getCanonicalUrl('privacy')
  }
}

export default function PrivacyPage() {
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', url: 'https://aitoonic.com/' },
    { name: 'Privacy', url: 'https://aitoonic.com/privacy/' }
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={sanitizeJsonLd(breadcrumbJsonLd)}
      />
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-card border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Privacy Policy
              </h1>
              <p className="text-lg text-muted-foreground">
                Last updated: August 19, 2025
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="prose prose-lg prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Introduction</h2>
              <p className="text-muted-foreground">
                Aitoonic ("we," "our," or "us") is committed to protecting your privacy.
                This Privacy Policy explains how we collect, use, disclose, and safeguard
                your information when you visit our website and use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Information We Collect</h2>

              <h3 className="text-xl font-semibold text-foreground mb-3">Personal Information</h3>
              <p className="text-muted-foreground">
                We may collect personal information that you voluntarily provide to us when you:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Subscribe to our newsletter</li>
                <li>Contact us through our contact forms</li>
                <li>Submit tool suggestions or feedback</li>
                <li>Create an account (if applicable)</li>
              </ul>

              <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">Usage Information</h3>
              <p className="text-muted-foreground">
                We automatically collect certain information about your device and usage patterns, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>IP address and browser information</li>
                <li>Pages visited and time spent on our site</li>
                <li>Search queries and tool interactions</li>
                <li>Referring websites and exit pages</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">How We Use Your Information</h2>
              <p className="text-muted-foreground">We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Provide, operate, and maintain our website and services</li>
                <li>Improve and personalize your experience</li>
                <li>Send you newsletters and updates (with your consent)</li>
                <li>Respond to your comments and questions</li>
                <li>Analyze usage patterns to improve our content</li>
                <li>Detect and prevent fraud or abuse</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Information Sharing</h2>
              <p className="text-muted-foreground">
                We do not sell, trade, or otherwise transfer your personal information to outside parties, except:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>With your explicit consent</li>
                <li>To trusted service providers who assist us in operating our website</li>
                <li>When required by law or to protect our rights</li>
                <li>In connection with a business transfer or acquisition</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Cookies and Tracking</h2>
              <p className="text-muted-foreground">
                We use cookies and similar tracking technologies to enhance your browsing experience.
                These help us:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Remember your preferences and settings</li>
                <li>Analyze site traffic and usage patterns</li>
                <li>Provide personalized content and recommendations</li>
              </ul>
              <p className="mt-4 text-muted-foreground">
                You can control cookie settings through your browser preferences. However,
                disabling cookies may affect some functionality of our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Data Security</h2>
              <p className="text-muted-foreground">
                We implement appropriate technical and organizational measures to protect
                your personal information against unauthorized access, alteration, disclosure,
                or destruction. However, no method of transmission over the Internet is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Your Rights</h2>
              <p className="text-muted-foreground">Depending on your location, you may have the right to:</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Access the personal information we hold about you</li>
                <li>Correct inaccurate or incomplete information</li>
                <li>Request deletion of your personal information</li>
                <li>Object to processing of your personal information</li>
                <li>Request data portability</li>
                <li>Withdraw consent for marketing communications</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Third-Party Links</h2>
              <p className="text-muted-foreground">
                Our website contains links to third-party AI tools and services.
                We are not responsible for the privacy practices of these external sites.
                We encourage you to review their privacy policies before providing any personal information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Children's Privacy</h2>
              <p className="text-muted-foreground">
                Our service is not intended for children under the age of 13.
                We do not knowingly collect personal information from children under 13.
                If we learn that we have collected such information, we will delete it promptly.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Changes to This Policy</h2>
              <p className="text-muted-foreground">
                We may update this Privacy Policy from time to time. We will notify you of
                any changes by posting the new policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section className="bg-card p-6 rounded-lg border border-border">
              <h2 className="text-2xl font-bold text-foreground mb-4">Contact Us</h2>
              <p className="text-muted-foreground">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="mt-4 text-muted-foreground">
                <p><strong>Email:</strong> dc556316@gmail.com</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  )
}
