'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Tool, Category } from '@/lib/types'
import ToolCard from '@/components/ToolCard'
import { sanitizeHtml } from '@/lib/sanitize'
import VoteButton from '@/components/VoteButton'
import SaveButton from '@/components/SaveButton'
import AuthPopup from '@/components/AuthPopup'

interface ToolDetailClientProps {
  tool: Tool
  category: Category | null
  similarTools: Tool[]
  sanitizedHowToUse?: string
}

// Lazy mount a section once it enters the viewport
function LazySection({ children, rootMargin = '250px 0px', minHeight = '1px' }: { children: React.ReactNode, rootMargin?: string, minHeight?: string }) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!ref.current || visible) return
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) setVisible(true)
      })
    }, { root: null, rootMargin, threshold: 0.01 })
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [visible, rootMargin])

  return <div ref={ref} style={{ minHeight }}>{visible ? children : null}</div>
}

export default function ToolDetailClient({ tool, category, similarTools, sanitizedHowToUse }: ToolDetailClientProps) {
  const [embedTheme, setEmbedTheme] = useState<'white' | 'black'>('white')
  const [showCompareOptions, setShowCompareOptions] = useState(false)
  const [showAuthPopup, setShowAuthPopup] = useState(false)
  const router = useRouter()

  // Section refs for scroll-to-section behavior
  const overviewRef = useRef<HTMLDivElement | null>(null)
  const featuresRef = useRef<HTMLDivElement | null>(null)
  const pricingRef = useRef<HTMLDivElement | null>(null)
  const embedRef = useRef<HTMLDivElement | null>(null)

  const scrollTo = (ref: React.RefObject<HTMLDivElement>) => {
    if (!ref.current) return
    ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  // Handle deep links like #pricing, #embed
  useEffect(() => {
    if (typeof window === 'undefined') return
    const hash = window.location.hash.replace('#', '')
    const map: Record<string, React.RefObject<HTMLDivElement>> = {
      overview: overviewRef,
      features: featuresRef,
      pricing: pricingRef,
      embed: embedRef,
    }
    if (hash && map[hash]) {
      // Timeout to ensure layout is painted
      setTimeout(() => scrollTo(map[hash]), 50)
    }
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const handleCompareWith = (compareToolSlug: string) => {
    const tool1Slug = tool.slug || tool.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    const tool2Slug = compareToolSlug
    router.push(`/compare/${tool1Slug}-vs-${tool2Slug}`)
  }

  // Filter similar tools for comparison (same category, different tool)
  const comparableTools = similarTools && similarTools.length > 0 ? similarTools.filter(t => t.category_id === tool.category_id) : []

  // Only show the first sentence as the intro in the header
  const rawIntro = tool.short_description || tool.description || ''
  const firstSentence = rawIntro.split(/(?<=\.)\s/)[0] || rawIntro

  return (
    <div className="bg-background">
      {/* Header */}
      <div className="bg-card/60 backdrop-blur border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <nav className="mb-4" aria-label="Breadcrumb">
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
              <li className="text-foreground font-medium truncate">
                {tool.name}
              </li>
            </ol>
          </nav>

          {/* Tool Header (optimized above-the-fold) */}
          <div className="flex flex-col gap-6">
            {/* Title row */}
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-foreground">{tool.name}</h1>
              {tool.featured && (
                <span className="bg-yellow-200/20 text-yellow-400 text-sm font-medium px-3 py-1 rounded-full">Featured</span>
              )}
            </div>

            {/* Image + Summary/CTAs */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Image (≈40% on large screens) */}
              <div className="lg:col-span-5">
                {tool.image_url && (
                  <div className="w-full overflow-hidden rounded-2xl border border-border/60 bg-card">
                    {tool.url ? (
                      <a href={tool.url} target="_blank" rel="noopener nofollow noreferrer" aria-label={`Open ${tool.name} website`}>
                        <Image
                          src={tool.image_url}
                          alt={tool.image_alt || tool.name}
                          width={800}
                          height={450}
                          className="w-full h-auto object-contain max-h-[320px]"
                          sizes="(min-width: 1024px) 40vw, 100vw"
                          priority
                          fetchPriority="high"
                        />
                      </a>
                    ) : (
                      <Image
                        src={tool.image_url}
                        alt={tool.image_alt || tool.name}
                        width={800}
                        height={450}
                        className="w-full h-auto object-contain max-h-[320px]"
                        sizes="(min-width: 1024px) 40vw, 100vw"
                        priority
                        fetchPriority="high"
                      />
                    )}
                  </div>
                )}
              </div>

              {/* Summary + CTAs */}
              <div className="lg:col-span-7">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex-1">
                    {tool.rating && (
                      <div className="flex items-center mb-3">
                        <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="ml-1 text-sm text-muted-foreground">{tool.rating}</span>
                      </div>
                    )}

                    {/* Short summary */}
                    {tool.short_description && (
                      <p className="text-base text-muted-foreground mb-4">{tool.short_description}</p>
                    )}

                    {tool.how_to_use && (
                      <div className="prose prose-invert max-w-none">
                        {/* how_to_use or intro snippets can appear here later if needed */}
                      </div>
                    )}
                  </div>

                  {/* Visit/Compare Buttons */}
                  <div className="mt-4 sm:mt-0 sm:ml-6 flex flex-col sm:flex-row gap-3">
                    {tool.url && (
                      <a
                        href={tool.url}
                        target="_blank"
                        rel="noopener nofollow noreferrer"
                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                      >
                        Visit Website
                        <svg className="ml-2 -mr-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}

                    {/* Compare Button */}
                    {comparableTools.length > 0 && (
                      <div className="relative">
                        <button
                          onClick={() => setShowCompareOptions(!showCompareOptions)}
                          className="inline-flex items-center px-6 py-3 border border-border text-base font-medium rounded-md shadow-sm text-foreground bg-card hover:bg-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                        >
                          Compare
                          <svg className="ml-2 -mr-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                        </button>

                        {/* Compare Dropdown */}
                        {showCompareOptions && (
                          <div className="absolute right-0 mt-2 w-80 bg-popover rounded-md shadow-lg z-10 border border-border">
                            <div className="py-2">
                              <div className="px-4 py-2 text-sm font-medium text-foreground border-b border-border">
                                Compare with:
                              </div>
                              <div className="max-h-60 overflow-y-auto">
                                {comparableTools.slice(0, 6).map((compareTool) => {
                                  const compareToolSlug = compareTool.slug || compareTool.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
                                  const tool1Slug = tool.slug || tool.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
                                  return (
                                    <Link
                                      key={compareTool.id}
                                      href={`/compare/${tool1Slug}-vs-${compareToolSlug}`}
                                      onClick={() => setShowCompareOptions(false)}
                                      className="w-full px-4 py-3 text-left hover:bg-accent flex items-center space-x-3 block"
                                    >
                                      <Image
                                        src={compareTool.image_url || 'https://i.ibb.co/KjStWPgL/aitoonic-fevicon-2.webp'}
                                        alt={compareTool.name}
                                        width={32}
                                        height={32}
                                        className="rounded object-contain"
                                        onError={(e) => {
                                          try {
                                            // @ts-ignore
                                            e.currentTarget.src = 'https://i.ibb.co/KjStWPgL/aitoonic-fevicon-2.webp'
                                            // @ts-ignore
                                            e.currentTarget.classList.add('blink-slow')
                                          } catch { }
                                        }}
                                      />
                                      <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-foreground truncate">
                                          {compareTool.name}
                                        </p>
                                        <p className="text-xs text-muted-foreground truncate">
                                          {compareTool.short_description || compareTool.description}
                                        </p>
                                      </div>
                                    </Link>
                                  )
                                })}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Save Button */}
                    <div className="inline-flex">
                      <SaveButton
                        toolId={tool.id}
                        onAuthRequired={() => setShowAuthPopup(true)}
                        className="w-12 h-12 border border-border bg-card hover:bg-accent rounded-md !rounded-md"
                      />
                    </div>

                    {/* Rank Up Button */}
                    <div className="inline-flex">
                      <VoteButton
                        toolId={tool.id}
                        onAuthRequired={() => setShowAuthPopup(true)}
                        className="h-12 border border-border bg-card hover:bg-accent rounded-md px-4"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {/* Section nav (scrolls, not tabs) */}
              <div className="border-b border-border mb-8">
                <nav className="-mb-px flex flex-wrap gap-6" aria-label="Sections">
                  <button onClick={() => scrollTo(overviewRef)} className="py-2 text-sm font-medium text-muted-foreground hover:text-foreground">Product Information</button>
                  {tool.features && tool.features.length > 0 && (
                    <button onClick={() => scrollTo(featuresRef)} className="py-2 text-sm font-medium text-muted-foreground hover:text-foreground">Features</button>
                  )}
                  {tool.pricing && tool.pricing.length > 0 && tool.pricing[0].plan && (
                    <button onClick={() => scrollTo(pricingRef)} className="py-2 text-sm font-medium text-muted-foreground hover:text-foreground">Pricing</button>
                  )}
                  <button onClick={() => scrollTo(embedRef)} className="py-2 text-sm font-medium text-muted-foreground hover:text-foreground">Embed</button>
                </nav>
              </div>

              {/* Sections (always visible) */}
              <div className="max-w-4xl">
                <div id="overview" ref={overviewRef} className="space-y-8 scroll-mt-24">
                  {/* Description */}
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-4">What is {tool.name}?</h2>
                    <div className="prose prose-invert max-w-none">
                      <p className="text-muted-foreground leading-relaxed">
                        {tool.description}
                      </p>
                    </div>
                  </div>

                  {/* How to Use */}
                  {tool.how_to_use && (
                    <div>
                      <h2 className="text-2xl font-bold text-foreground mb-4">How to use {tool.name}</h2>
                      <div
                        className="prose prose-invert max-w-none prose-p:text-muted-foreground prose-strong:font-normal prose-strong:text-muted-foreground"
                        dangerouslySetInnerHTML={{ __html: sanitizedHowToUse ?? sanitizeHtml(tool.how_to_use) }}
                      />
                    </div>
                  )}

                  {/* Use Cases */}
                  {tool.useCases && tool.useCases.length > 0 && (
                    <div>
                      <h2 className="text-2xl font-bold text-foreground mb-4">Use Cases</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {tool.useCases.map((useCase, index) => (
                          <div key={index} className="bg-card p-4 rounded-lg border border-border">
                            <h3 className="font-medium text-foreground mb-2">{useCase.title}</h3>
                            <p className="text-muted-foreground text-sm">{useCase.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {tool.features && tool.features.length > 0 && (
                  <div id="features" ref={featuresRef} className="scroll-mt-24 pt-10 mt-10 border-t border-border/60">
                    <h2 className="text-2xl font-bold text-foreground mb-6">{tool.name} features</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {tool.features.map((feature, index) => (
                        <div key={index} className="bg-card p-6 rounded-lg border border-border">
                          <h3 className="text-lg font-semibold text-foreground mb-3">
                            {feature.title}
                          </h3>
                          <p className="text-muted-foreground">{feature.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {tool.pricing && tool.pricing.length > 0 && tool.pricing[0].plan && (
                  <div id="pricing" ref={pricingRef} className="scroll-mt-24 pt-10 mt-10 border-t border-border/60">
                    <h2 className="text-2xl font-bold text-foreground mb-6">{tool.name} pricing</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {tool.pricing
                        .filter(plan => plan.plan && plan.price)
                        .map((plan, index) => (
                          <div key={index} className="bg-card p-6 rounded-lg border border-border relative">
                            <div className="mb-4">
                              <h3 className="text-xl font-semibold text-foreground mb-2">
                                {plan.plan}
                              </h3>
                              <div className="text-3xl font-bold text-foreground">
                                {plan.price && plan.price !== '0' && plan.price !== '$0' && plan.price !== '$0.00' ? (
                                  <span>{plan.price}</span>
                                ) : (
                                  'Free'
                                )}
                              </div>
                            </div>

                            {plan.features && plan.features.length > 0 && (
                              <ul className="space-y-2 mb-6">
                                {plan.features.map((feature, featureIndex) => (
                                  <li key={featureIndex} className="flex items-start">
                                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="text-muted-foreground text-sm">{feature}</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                <div id="embed" ref={embedRef} className="scroll-mt-24 pt-10 mt-10 border-t border-border/60">
                  <LazySection rootMargin="300px 0px" minHeight="120px">
                    <h2 className="text-2xl font-bold text-foreground mb-6">Embed “Featured on Aitoonic”</h2>
                    <p className="text-muted-foreground mb-4">Paste this code on your website to display our badge. Choose one style.</p>
                    <div className="flex items-center gap-4 mb-4">
                      <label className="inline-flex items-center gap-2 text-sm">
                        <input type="radio" name="embedTheme" checked={embedTheme === 'white'} onChange={() => setEmbedTheme('white')} /> White
                      </label>
                      <label className="inline-flex items-center gap-2 text-sm">
                        <input type="radio" name="embedTheme" checked={embedTheme === 'black'} onChange={() => setEmbedTheme('black')} /> Black
                      </label>
                    </div>
                    <div className="bg-card p-4 rounded border border-border">
                      <img
                        src={embedTheme === 'white' ? 'https://i.ibb.co/ycLB5CbV/Aitoonic-FEATURED-White.webp' : 'https://i.ibb.co/LXcdwtmc/Aitoonic-FEATURED-Dark.webp'}
                        alt="Featured on Aitoonic"
                        width={250}
                        height={60}
                        className="mb-3"
                      />
                      <textarea
                        readOnly
                        className="w-full h-28 text-xs bg-muted border border-border rounded p-2 text-foreground"
                        value={`<a href=\"https://aitoonic.com/ai/${tool.slug || tool.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}/?ref=embed\" target=\"_blank\" style=\"cursor: pointer;\"><img src=\"${embedTheme === 'white' ? 'https://i.ibb.co/ycLB5CbV/Aitoonic-FEATURED-White.webp' : 'https://i.ibb.co/LXcdwtmc/Aitoonic-FEATURED-Dark.webp'}\" width=\"250\" height=\"60\" alt=\"${tool.name}: ${(tool.short_description || tool.description || '').split('. ')[0].replace(/"/g, '&quot;')}\"></a>`}
                      />
                      <button
                        className="mt-2 px-3 py-2 text-sm rounded border border-border hover:bg-accent"
                        onClick={() => navigator.clipboard.writeText(`<a href=\"https://aitoonic.com/ai/${tool.slug || tool.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}/?ref=embed\" target=\"_blank\" style=\"cursor: pointer;\"><img src=\"${embedTheme === 'white' ? 'https://i.ibb.co/ycLB5CbV/Aitoonic-FEATURED-White.webp' : 'https://i.ibb.co/LXcdwtmc/Aitoonic-FEATURED-Dark.webp'}\" width=\"250\" height=\"60\" alt=\"${tool.name}: ${(tool.short_description || tool.description || '').split('. ')[0].replace(/"/g, '&quot;')}\"></a>`)}
                      >
                        Copy code
                      </button>
                    </div>
                  </LazySection>
                </div>
              </div>
            </div>

            {/* Similar Tools Section */}
            {similarTools && similarTools.length > 0 && (
              <LazySection rootMargin="300px 0px" minHeight="200px">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-border">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-foreground mb-2">{tool.name} Similar Tools</h2>
                    <p className="text-muted-foreground">Other AI tools in the same category</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {similarTools.slice(0, 6).map((similarTool) => (
                      <ToolCard
                        key={similarTool.id}
                        tool={similarTool}
                        showCategory={false}
                      />
                    ))}
                  </div>

                  {category && similarTools.length > 6 && (
                    <div className="mt-8 text-center">
                      <Link
                        href={`/category/${category.slug}`}
                        className="inline-flex items-center px-6 py-3 border border-border text-base font-medium rounded-md shadow-sm text-foreground bg-card hover:bg-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                      >
                        View All {category.name} Tools
                        <svg className="ml-2 -mr-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  )}
                </div>
              </LazySection>
            )}

            {/* Fallback Similar Tools Section - when API fails but category exists */}
            {(!similarTools || similarTools.length === 0) && category && (
              <LazySection rootMargin="300px 0px" minHeight="160px">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-border">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-foreground mb-2">{tool.name} Similar Tools</h2>
                    <p className="text-muted-foreground">Explore other AI tools in the {category.name} category</p>
                  </div>

                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">Unable to load similar tools at the moment.</p>
                    <Link
                      href={`/category/${category.slug}`}
                      className="inline-flex items-center px-6 py-3 border border-border text-base font-medium rounded-md shadow-sm text-foreground bg-card hover:bg-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                      Browse All {category.name} Tools
                      <svg className="ml-2 -mr-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </LazySection>
            )}
          </div>
        </div>
      </div>
      <AuthPopup
        isOpen={showAuthPopup}
        onClose={() => setShowAuthPopup(false)}
        message="Sign up or log in to save tools and vote."
      />
    </div>
  )
}
