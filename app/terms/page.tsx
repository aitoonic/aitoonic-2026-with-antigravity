import type { Metadata } from 'next'
import { getCanonicalUrl, defaultRobots } from '@/lib/seo/canonical'
import { generateBreadcrumbJsonLd } from '@/lib/seo/structured-data'
import { sanitizeJsonLd } from '@/lib/sanitize-jsonld'

export const metadata: Metadata = {
  title: 'Terms of Service - Aitoonic',
  description: 'Read the terms and conditions for using Aitoonic, your AI tools directory platform.',
  keywords: 'terms of service, terms and conditions, user agreement, aitoonic',
  robots: defaultRobots,
  alternates: {
    canonical: getCanonicalUrl('terms')
  }
}

export default function TermsPage() {
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', url: 'https://aitoonic.com/' },
    { name: 'Terms', url: 'https://aitoonic.com/terms/' }
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
                Terms of Service
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
              <h2 className="text-2xl font-bold text-foreground mb-4">Acceptance of Terms</h2>
              <p className="text-muted-foreground">
                By accessing and using Aitoonic ("the Service"), you accept and agree to be bound
                by the terms and provision of this agreement. If you do not agree to abide by
                the above, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Description of Service</h2>
              <p className="text-muted-foreground">
                Aitoonic is an AI tools directory platform that provides information about
                various artificial intelligence tools and services. We curate, organize,
                and present information to help users discover relevant AI solutions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">User Responsibilities</h2>
              <p className="text-muted-foreground">As a user of our service, you agree to:</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Use the service only for lawful purposes</li>
                <li>Not attempt to gain unauthorized access to our systems</li>
                <li>Not interfere with the proper working of the service</li>
                <li>Not transmit any malicious code or harmful content</li>
                <li>Respect the intellectual property rights of others</li>
                <li>Provide accurate information when submitting content</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Content and Information</h2>

              <h3 className="text-xl font-semibold text-foreground mb-3">Our Content</h3>
              <p className="text-muted-foreground">
                The information on Aitoonic is provided for informational purposes only.
                While we strive for accuracy, we make no warranties about the completeness,
                reliability, or accuracy of the information presented.
              </p>

              <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">Third-Party Tools</h3>
              <p className="text-muted-foreground">
                We provide links and information about third-party AI tools. We are not
                responsible for the content, functionality, or policies of these external services.
                Your use of third-party tools is subject to their respective terms and conditions.
              </p>

              <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">User-Generated Content</h3>
              <p className="text-muted-foreground">
                If you submit content (reviews, suggestions, feedback), you grant us the right
                to use, modify, and display such content in connection with our service.
                You represent that you own or have permission to use any content you submit.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Intellectual Property</h2>
              <p className="text-muted-foreground">
                The content, organization, graphics, design, and other matters related to
                Aitoonic are protected under applicable copyrights and other proprietary laws.
                Copying, redistribution, or publication of any such content is strictly prohibited.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Disclaimers</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>
                  <strong>No Warranty:</strong> The service is provided "as is" without any warranties,
                  express or implied.
                </li>
                <li>
                  <strong>Tool Performance:</strong> We do not guarantee the performance, availability,
                  or functionality of any third-party AI tools listed on our platform.
                </li>
                <li>
                  <strong>Results:</strong> We make no claims about the results you may achieve
                  using any of the tools featured on our platform.
                </li>
                <li>
                  <strong>Availability:</strong> We reserve the right to modify, suspend, or
                  discontinue the service at any time without notice.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Limitation of Liability</h2>
              <p className="text-muted-foreground">
                In no event shall Aitoonic, its owners, or contributors be liable for any
                indirect, incidental, special, consequential, or punitive damages arising
                out of your use of the service, even if we have been advised of the
                possibility of such damages.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Privacy Policy</h2>
              <p className="text-muted-foreground">
                Your privacy is important to us. Please review our Privacy Policy,
                which also governs your use of the service, to understand our practices.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Termination</h2>
              <p className="text-muted-foreground">
                We may terminate or suspend your access to the service at our sole discretion,
                without prior notice, for conduct that we believe violates these Terms of Service
                or is harmful to other users, us, or third parties.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Governing Law</h2>
              <p className="text-muted-foreground">
                These terms shall be governed by and construed in accordance with the laws
                of [Your Jurisdiction], without regard to its conflict of law provisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Changes to Terms</h2>
              <p className="text-muted-foreground">
                We reserve the right to modify these terms at any time. Changes will be
                effective immediately upon posting. Your continued use of the service
                after changes are posted constitutes your acceptance of the modified terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Severability</h2>
              <p className="text-muted-foreground">
                If any provision of these terms is found to be unenforceable, the remaining
                provisions will continue to be valid and enforceable.
              </p>
            </section>

            <section className="bg-card p-6 rounded-lg border border-border">
              <h2 className="text-2xl font-bold text-foreground mb-4">Contact Information</h2>
              <p className="text-muted-foreground">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="mt-4 text-muted-foreground">
                <p><strong>Email:</strong> Dc556316@gmail.com</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  )
}
