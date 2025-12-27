import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center">
      <div className="max-w-3xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-card border border-border shadow-inner mb-6">
            <svg className="w-10 h-10 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 9.75h.008v.008H9.75V9.75zm4.5 0h.008v.008h-.008V9.75zM9 16.5h6m-9 4.125A3.375 3.375 0 013.375 17.25V6.75A3.375 3.375 0 016.75 3.375h10.5A3.375 3.375 0 0120.625 6.75v10.5A3.375 3.375 0 0117.25 20.625H6.75z"/>
            </svg>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-2">Page not found</h1>
          <p className="text-muted-foreground mb-8">The page you’re looking for doesn’t exist or has moved.</p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/" className="inline-flex items-center px-5 py-3 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
              Go to Home
            </Link>
            <Link href="/ai" className="inline-flex items-center px-5 py-3 rounded-md border border-border bg-card text-foreground hover:bg-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
              Browse Tools
            </Link>
            <Link href="/about" className="inline-flex items-center px-5 py-3 rounded-md border border-border bg-card text-foreground hover:bg-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
              About Aitoonic
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
