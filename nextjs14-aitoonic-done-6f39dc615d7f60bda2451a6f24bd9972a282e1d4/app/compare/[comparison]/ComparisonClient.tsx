'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Tool, Category } from '@/lib/types'

interface ComparisonClientProps {
  tool1: Tool
  tool2: Tool
  category: Category | null
}

export default function ComparisonClient({ tool1, tool2, category }: ComparisonClientProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const renderToolHeader = (tool: Tool) => {
    const toolSlug = tool.slug || tool.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')

    return (
      <div className="flex flex-col items-center p-4">
        {/* Tool Image and Name in a row */}
        <div className="flex items-center space-x-4 w-full mb-3">
          <div className="w-12 h-12 flex-shrink-0 relative">
            {tool.image_url ? (
              <Image
                src={tool.image_url}
                alt={tool.image_alt || tool.name}
                fill
                sizes="48px"
                className="object-contain"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-muted rounded-lg">
                <span className="text-lg font-bold text-muted-foreground">
                  {tool.name.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>
          <Link href={`/ai/${toolSlug}`} className="group">
            <h2 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
              {tool.name}
            </h2>
          </Link>
        </div>

        {/* Visit Website Button */}
        {tool.url && (
          <a
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full mt-2 inline-flex justify-center items-center px-3 py-1.5 border border-border shadow-sm text-xs font-medium rounded-md text-foreground bg-card hover:bg-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Visit Website
          </a>
        )}
      </div>
    )
  }

  const renderComparisonRow = (label: string, value1: any, value2: any, isLast = false) => {
    const rowClasses = `grid grid-cols-3 gap-4 py-3 px-4 ${!isLast ? 'border-b border-border' : ''}`

    return (
      <div className={rowClasses}>
        <div className="font-medium text-muted-foreground text-sm">{label}</div>
        <div className="text-foreground text-sm">{value1 || '—'}</div>
        <div className="text-foreground text-sm">{value2 || '—'}</div>
      </div>
    )
  }

  const renderFeaturesList = (features: any[] | undefined) => {
    if (!features || features.length === 0) return '—'
    return (
      <ul className="space-y-1.5">
        {features.slice(0, 3).map((feature, index) => (
          <li key={index} className="flex items-start">
            <span className="inline-block w-1.5 h-1.5 mt-2 mr-2 rounded-full bg-primary flex-shrink-0"></span>
            <span className="text-sm text-foreground leading-tight">
              {typeof feature === 'string' ? feature : feature.title || feature.name}
            </span>
          </li>
        ))}
        {features.length > 3 && (
          <li className="text-xs text-muted-foreground mt-1">+{features.length - 3} more features</li>
        )}
      </ul>
    )
  }

  const renderPricingList = (pricing: any[] | undefined) => {
    if (!pricing || pricing.length === 0) return '—'
    return (
      <div className="space-y-1.5">
        {pricing.slice(0, 2).map((plan, index) => (
          <div key={index} className="text-sm">
            <span className="font-medium text-foreground">{plan.plan}:</span>
            <span className="ml-1.5 text-muted-foreground">{plan.price}</span>
          </div>
        ))}
        {pricing.length > 2 && (
          <div className="text-xs text-muted-foreground">+{pricing.length - 2} more plans</div>
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card/60 backdrop-blur border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <nav className="mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-foreground">
                  Home
                </Link>
              </li>
              <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              {category && (
                <>
                  <li>
                    <Link href={`/category/${category.slug}`} className="hover:text-foreground">
                      {category.name}
                    </Link>
                  </li>
                  <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </>
              )}
              <li className="text-foreground font-medium">
                {tool1.name} vs {tool2.name}
              </li>
            </ol>
          </nav>

          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-4">
              {tool1.name} vs {tool2.name}
            </h1>
            <p className="text-lg text-muted-foreground">
              Side-by-side comparison of these AI tools
            </p>
          </div>

          {/* Tool Headers - Horizontal Layout */}
          <div className="bg-card rounded-lg border border-border overflow-hidden">
            <div className="flex divide-x divide-border">
              <div className="flex-1">
                {renderToolHeader(tool1)}
              </div>
              <div className="w-px bg-border"></div>
              <div className="flex-1">
                {renderToolHeader(tool2)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
          <div className="px-5 py-4 border-b border-border bg-muted/30">
            <h2 className="text-lg font-semibold text-foreground">Detailed Comparison</h2>
            <p className="mt-1 text-sm text-muted-foreground">Side-by-side comparison of key features and specifications</p>
          </div>

          <div className="divide-y divide-border">
            {/* Comparison rows */}
            {renderComparisonRow('Description',
              <div className="text-sm text-muted-foreground leading-relaxed">{tool1.short_description || tool1.description}</div>,
              <div className="text-sm text-muted-foreground leading-relaxed">{tool2.short_description || tool2.description}
              </div>)}

            {renderComparisonRow('Category', category?.name, category?.name)}

            {renderComparisonRow('Published Date',
              tool1.published_at ? formatDate(tool1.published_at) : 'N/A',
              tool2.published_at ? formatDate(tool2.published_at) : 'N/A'
            )}

            <div className="grid grid-cols-3 gap-4 py-4 border-b border-border px-4">
              <div className="font-medium text-muted-foreground text-sm">Features</div>
              <div>{renderFeaturesList(tool1.features)}</div>
              <div>{renderFeaturesList(tool2.features)}</div>
            </div>

            <div className="grid grid-cols-3 gap-4 py-4 border-b border-border px-4">
              <div className="font-medium text-muted-foreground text-sm">Pricing Plans</div>
              <div>{renderPricingList(tool1.pricing)}</div>
              <div>{renderPricingList(tool2.pricing)}</div>
            </div>

            <div className="grid grid-cols-3 gap-4 py-4 px-4">
              <div className="font-medium text-muted-foreground text-sm">Website</div>
              <div>
                {tool1.url ? (
                  <a
                    href={tool1.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline text-sm"
                  >
                    Visit Website →
                  </a>
                ) : 'N/A'}
              </div>
              <div>
                {tool2.url ? (
                  <a
                    href={tool2.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline text-sm"
                  >
                    Visit Website →
                  </a>
                ) : 'N/A'}
              </div>
            </div>
          </div>
        </div>

        {/* Back to individual pages */}
        <div className="mt-8 text-center">
          <div className="space-x-4">
            <Link
              href={`/ai/${tool1.slug || tool1.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
              className="inline-flex items-center px-4 py-2 border border-border text-sm font-medium rounded-md shadow-sm text-foreground bg-card hover:bg-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              View {tool1.name} Details
            </Link>
            <Link
              href={`/ai/${tool2.slug || tool2.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
              className="inline-flex items-center px-4 py-2 border border-border text-sm font-medium rounded-md shadow-sm text-foreground bg-card hover:bg-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              View {tool2.name} Details
            </Link>
          </div>
        </div>
      </div>

      {/* Explore More Section */}
      <div className="mt-12 border-t border-border pt-8 pb-4">
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-foreground mb-2">Explore More</h3>
          <p className="text-muted-foreground">Discover more AI tools and categories</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
          {category && (
            <Link
              href={`/category/${category.slug}`}
              className="flex flex-col items-center justify-center p-6 bg-card hover:bg-accent border border-border rounded-xl transition-all group"
            >
              <span className="text-lg font-semibold text-foreground group-hover:text-primary mb-1">
                More {category.name} Tools
              </span>
              <span className="text-sm text-muted-foreground">
                Browse all tools in this category
              </span>
            </Link>
          )}

          <Link
            href="/"
            className="flex flex-col items-center justify-center p-6 bg-card hover:bg-accent border border-border rounded-xl transition-all group"
          >
            <span className="text-lg font-semibold text-foreground group-hover:text-primary mb-1">
              Discover AI Tools
            </span>
            <span className="text-sm text-muted-foreground">
              Go back to homepage
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}
