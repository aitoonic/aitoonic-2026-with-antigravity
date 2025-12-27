import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-muted text-muted-foreground border-t border-border">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="text-2xl font-bold mb-4 text-foreground">Aitoonic</div>
            <p className="mb-4 max-w-md">
              Discover the best AI tools and platforms to enhance your productivity and business.
              From chatbots to analytics, find the perfect AI solution for your needs.
            </p>
            {/* social icons removed per request */}
          </div>

          {/* Submit & Grow - NEW SECTION */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">Submit & Grow</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/submit-ai" className="hover:text-foreground transition-colors">
                  Hub Page
                </Link>
              </li>
              <li>
                <Link href="/submit-ai-tool" className="hover:text-foreground transition-colors">
                  Free Submission
                </Link>
              </li>
              <li>
                <Link href="/featured-ai-tools" className="hover:text-foreground transition-colors">
                  Get Featured
                </Link>
              </li>
              <li>
                <Link href="/ai-tool-launch" className="hover:text-foreground transition-colors">
                  Launch Service
                </Link>
              </li>
              <li>
                <Link href="/advertise" className="hover:text-foreground transition-colors">
                  Advertise
                </Link>
              </li>
              <li>
                <Link href="/guest-post" className="hover:text-foreground transition-colors">
                  Guest Post
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-foreground transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/ai-tools-directory" className="hover:text-foreground transition-colors">
                  AI Tools
                </Link>
              </li>
              <li>
                <Link href="/ai-agent" className="hover:text-foreground transition-colors">
                  AI Agents
                </Link>
              </li>
              <li>
                <Link href="/compare" className="hover:text-foreground transition-colors">
                  Compare
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-foreground transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-foreground transition-colors">
                  Affiliate Disclaimer
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="hover:text-foreground transition-colors">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-8 border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">
              2025 Aitoonic. All rights reserved.
            </p>
            <p className="text-muted-foreground text-sm mt-2 md:mt-0">
              Discover the best AI tools for your business
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
