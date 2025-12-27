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
  initialRating?: number | null
  reviewCount?: number
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

export default function ToolDetailClient({ tool, category, similarTools, sanitizedHowToUse, initialRating, reviewCount = 0 }: ToolDetailClientProps) {
  const [embedTheme, setEmbedTheme] = useState<'white' | 'black'>('white')
  const [showCompareOptions, setShowCompareOptions] = useState(false)
  const [showAuthPopup, setShowAuthPopup] = useState(false)

  const [showCopyToast, setShowCopyToast] = useState(false)
  const [showShareToast, setShowShareToast] = useState(false)
  const router = useRouter()

  const [ratingStats, setRatingStats] = useState({
    average: initialRating || null,
    total: reviewCount || 0
  })

  // Fetch fresh stats on mount to ensure real-time accuracy
  useEffect(() => {
    let active = true
    const fetchFreshStats = async () => {
      try {
        const { getToolReviews } = await import('@/actions/review-actions')
        const { stats } = await getToolReviews(tool.id)
        if (active) {
          setRatingStats({
            average: stats.total > 0 ? stats.average : null,
            total: stats.total
          })
        }
      } catch (err) {
        console.error('Failed to fetch realtime stats', err)
      }
    }
    fetchFreshStats()
    return () => { active = false }
  }, [tool.id])

  // Use fresh client state if available, otherwise fallback to props/tool.rating
  // Ideally, if we have 0 reviews in fresh state, we should show 0 stars, not fallback to potential fake rating.
  // But if fetch fails or is pending, we might want fallback? 
  // Given we just cleaned up the DB, tool.rating should be accurate (NULL or real).
  // If tool.rating is stale 4.7, and we have 0 real reviews, we want 0.
  // getToolReviews returns total=0 for no reviews.
  const displayRating = ratingStats.total > 0 ? ratingStats.average : (ratingStats.total === 0 ? null : tool.rating)
  const displayCount = ratingStats.total

  // Section refs for scroll-to-section behavior
  const overviewRef = useRef<HTMLDivElement | null>(null)
  const featuresRef = useRef<HTMLDivElement | null>(null)
  const pricingRef = useRef<HTMLDivElement | null>(null)
  const embedRef = useRef<HTMLDivElement | null>(null)
  const similarToolsRef = useRef<HTMLDivElement | null>(null)

  const scrollTo = (ref: React.RefObject<HTMLDivElement> | string) => {
    if (typeof ref === 'string') {
      const el = document.getElementById(ref)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      return
    }
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
      similar: similarToolsRef,
    }
    if (hash && hash === 'reviews') {
      setTimeout(() => scrollTo('reviews'), 50)
    } else if (hash && map[hash]) {
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
            {/* Title row */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">{tool.name}</h1>
                {tool.featured && (
                  <span className="bg-amber-500/10 text-amber-500 border border-amber-500/20 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                    Featured
                  </span>
                )}
              </div>

              {/* Rating on top right for desktop? Or keeping close to title? Let's keep it clean. */}
            </div>

            {/* Image + Summary/CTAs */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Image (≈50% on large screens) */}
              <div className="lg:col-span-6">
                {tool.image_url && (
                  <div className="relative group rounded-xl overflow-hidden border border-border/50 bg-card shadow-lg hover:shadow-xl transition-all duration-500">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    {tool.url ? (
                      <a href={tool.url} target="_blank" rel="noopener nofollow noreferrer" aria-label={`Open ${tool.name} website`}>
                        <Image
                          src={tool.image_url}
                          alt={tool.image_alt || tool.name}
                          width={800}
                          height={450}
                          className="w-full h-auto object-cover aspect-video transform group-hover:scale-105 transition-transform duration-700 ease-out"
                          sizes="(min-width: 1024px) 50vw, 100vw"
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
                        className="w-full h-auto object-cover aspect-video"
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        priority
                        fetchPriority="high"
                      />
                    )}
                  </div>
                )}
              </div>

              {/* Summary + CTAs */}
              <div className="lg:col-span-6 flex flex-col h-full justify-between gap-6">
                <div className="space-y-6">
                  {/* Rating Badge Row */}
                  {displayRating ? (
                    <div className="flex items-center gap-3">
                      <div className="flex items-center bg-card/50 border border-border/60 rounded-lg px-3 py-1.5 backdrop-blur-sm">
                        <div className="flex text-amber-400 mr-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                              key={star}
                              className={`w-4 h-4 ${star <= Math.round(displayRating) ? 'fill-current' : 'text-muted/20'}`}
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="font-bold text-foreground">{displayRating}</span>
                        <span className="text-muted-foreground ml-1.5 text-sm border-l border-border/50 pl-1.5">{displayCount} {displayCount === 1 ? 'review' : 'reviews'}</span>
                      </div>

                      {/* Optional: Add a "Verified" badge or similar trust signal here if available */}
                    </div>
                  ) : (
                    // If no rating, show a "New" or "Be the first to review" prompt?
                    <div className="flex items-center gap-2">
                      <span className="bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-xs font-semibold px-2.5 py-1 rounded-full">New Tool</span>
                    </div>
                  )}

                  {/* Description */}
                  <div className="space-y-4">
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {tool.short_description || tool.description}
                    </p>

                    {/* Tags/Categories could go here */}
                  </div>
                </div>

                {/* Main Actions Area - Designed for Conversion */}
                <div className="mt-2 p-5 rounded-xl bg-card border border-border/50 shadow-sm space-y-4">

                  {/* Primary CTA */}
                  {tool.url && (
                    <a
                      href={tool.url}
                      target="_blank"
                      rel="noopener nofollow noreferrer"
                      className="group relative w-full flex items-center justify-center gap-3 px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground text-lg font-bold rounded-lg shadow-lg shadow-primary/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-primary/30 active:scale-[0.98]"
                    >
                      Visit {tool.name}
                      <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>

                      {/* Shine effect */}
                      <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-10" />
                    </a>
                  )}

                  {/* Secondary Actions Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {/* Compare */}
                    {comparableTools.length > 0 && (
                      <div className="relative col-span-1">
                        <button
                          onClick={() => setShowCompareOptions(!showCompareOptions)}
                          className={`w-full h-full min-h-[60px] flex flex-col items-center justify-center gap-1.5 p-2 rounded-xl border border-border/60 bg-card/50 hover:bg-primary/5 hover:border-primary/30 active:scale-[0.98] transition-all duration-200 text-sm font-medium ${showCompareOptions ? 'border-primary/50 bg-primary/5 text-primary' : 'text-muted-foreground hover:text-primary'}`}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                          <span>Compare</span>
                        </button>
                        {/* Compare Dropdown */}
                        {showCompareOptions && (
                          <div className="absolute top-full left-0 mt-2 w-64 bg-card rounded-xl shadow-xl shadow-black/20 z-20 border border-border overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                            <div className="px-3 py-2 border-b border-border/50 bg-muted/30">
                              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Compare with</p>
                            </div>
                            <div className="py-1 max-h-48 overflow-y-auto">
                              {comparableTools.slice(0, 6).map((compareTool) => {
                                const ctSlug = compareTool.slug || compareTool.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
                                const tSlug = tool.slug || tool.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
                                return (
                                  <Link key={compareTool.id} href={`/compare/${tSlug}-vs-${ctSlug}`} className="block px-4 py-2.5 text-sm hover:bg-primary/10 hover:text-primary truncate text-foreground transition-colors">
                                    {compareTool.name}
                                  </Link>
                                )
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Save */}
                    <div className="col-span-1">
                      <SaveButton
                        toolId={tool.id}
                        onAuthRequired={() => setShowAuthPopup(true)}
                        className="w-full h-full min-h-[60px] flex flex-col items-center justify-center gap-1.5 rounded-xl border border-border/60 bg-card/50 hover:bg-primary/5 hover:border-primary/30 active:scale-[0.98] transition-all duration-200 text-sm font-medium text-muted-foreground hover:text-primary !rounded-xl !p-0"
                        showLabel={true}
                      />
                    </div>

                    {/* Vote/Rank Up */}
                    <div className="col-span-1">
                      <VoteButton
                        toolId={tool.id}
                        onAuthRequired={() => setShowAuthPopup(true)}
                        className="w-full h-full min-h-[60px] flex flex-col items-center justify-center gap-1.5 rounded-xl border border-border/60 bg-card/50 hover:bg-primary/5 hover:border-primary/30 active:scale-[0.98] transition-all duration-200 text-sm font-medium text-muted-foreground hover:text-primary !rounded-xl !px-0"
                        showLabel={true}
                      />
                    </div>

                    {/* Share */}
                    <div className="col-span-1">
                      <button
                        onClick={() => {
                          const url = typeof window !== 'undefined' ? window.location.href : `https://aitoonic.com/ai/${tool.slug}`;
                          if (navigator.share) {
                            navigator.share({
                              title: tool.name,
                              text: `Check out ${tool.name} on Aitoonic!`,
                              url: url
                            }).catch(console.error);
                          } else {
                            navigator.clipboard.writeText(url);
                            setShowShareToast(true);
                            setTimeout(() => setShowShareToast(false), 3000);
                          }
                        }}
                        className="w-full h-full min-h-[60px] flex flex-col items-center justify-center gap-1.5 rounded-xl border border-border/60 bg-card/50 hover:bg-primary/5 hover:border-primary/30 active:scale-[0.98] transition-all duration-200 text-sm font-medium text-muted-foreground hover:text-primary"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                        </svg>
                        <span>Share</span>
                      </button>
                    </div>

                  </div>
                </div>

              </div>
            </div>

            {/* Main Content Grid with Sticky Nav */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                {/* Left Sidebar - Sticky Navigation */}
                <div className="hidden lg:block lg:col-span-3">
                  <div className="sticky top-24 space-y-2 p-4 bg-card/30 backdrop-blur-md rounded-xl border border-border/50">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-3">On this page</p>
                    <nav className="flex flex-col gap-1">
                      <button onClick={() => scrollTo(overviewRef)} className="text-left px-3 py-2 text-sm font-medium rounded-lg hover:bg-white/5 text-foreground/80 hover:text-primary transition-colors">Overview</button>
                      {tool.features && tool.features.length > 0 && (
                        <button onClick={() => scrollTo(featuresRef)} className="text-left px-3 py-2 text-sm font-medium rounded-lg hover:bg-white/5 text-foreground/80 hover:text-primary transition-colors">Features</button>
                      )}
                      {tool.pricing && tool.pricing.length > 0 && tool.pricing[0].plan && (
                        <button onClick={() => scrollTo(pricingRef)} className="text-left px-3 py-2 text-sm font-medium rounded-lg hover:bg-white/5 text-foreground/80 hover:text-primary transition-colors">Pricing</button>
                      )}
                      <button onClick={() => scrollTo(embedRef)} className="text-left px-3 py-2 text-sm font-medium rounded-lg hover:bg-white/5 text-foreground/80 hover:text-primary transition-colors">Embed</button>
                      {(similarTools && similarTools.length > 0) && (
                        <button onClick={() => scrollTo(similarToolsRef)} className="text-left px-3 py-2 text-sm font-medium rounded-lg hover:bg-white/5 text-foreground/80 hover:text-primary transition-colors">Similar Tools</button>
                      )}
                      <button onClick={() => scrollTo('reviews')} className="text-left px-3 py-2 text-sm font-medium rounded-lg hover:bg-white/5 text-foreground/80 hover:text-primary transition-colors">Reviews & Ratings</button>
                    </nav>
                  </div>
                </div>

                {/* Right Content Area */}
                <div className="lg:col-span-9 space-y-16">

                  {/* Overview Section */}
                  <div id="overview" ref={overviewRef} className="scroll-mt-24">
                    <div className="prose prose-invert prose-lg max-w-none">
                      <h2 className="text-3xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                        What is {tool.name}?
                      </h2>
                      <div className="bg-card/30 backdrop-blur-sm p-6 rounded-2xl border border-border/50 shadow-sm leading-relaxed text-muted-foreground/90">
                        <p>{tool.description}</p>
                      </div>

                      {/* How to Use */}
                      {tool.how_to_use && (
                        <div className="mt-8">
                          <h3 className="text-2xl font-bold text-foreground mb-4">How to use</h3>
                          <div
                            className="prose prose-sm prose-invert max-w-none text-muted-foreground leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: sanitizedHowToUse ?? sanitizeHtml(tool.how_to_use) }}
                          />
                        </div>
                      )}
                    </div>

                    {/* Use Cases Grid */}
                    {tool.useCases && tool.useCases.length > 0 && (
                      <div className="mt-10">
                        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                          <span className="w-1 h-6 bg-accent rounded-full"></span> Use Cases
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {tool.useCases.map((useCase, index) => (
                            <div key={index} className="group bg-card hover:bg-card/80 p-5 rounded-xl border border-border/50 hover:border-primary/20 transition-all duration-300">
                              <h4 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{useCase.title}</h4>
                              <p className="text-muted-foreground text-sm leading-relaxed">{useCase.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Features Grid - Clean & Organized */}
                  {tool.features && tool.features.length > 0 && (
                    <div id="features" ref={featuresRef} className="scroll-mt-24 pt-8 border-t border-border/30">
                      <h2 className="text-3xl font-bold tracking-tight mb-8">Key Features</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {tool.features.map((feature, index) => {
                          // Clean emoji from title if user pasted them
                          const cleanTitle = feature.title.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1F018}-\u{1F0F5}\u{1F200}-\u{1F270}\u{2600}-\u{26FF}\u{2300}-\u{23FF}]/gu, '').trim()

                          return (
                            <div
                              key={index}
                              className="bg-card p-6 rounded-2xl border border-border/50 hover:border-primary/40 transition-all duration-300 group flex flex-col gap-3"
                            >

                              <div>
                                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{cleanTitle || feature.title}</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  {/* Pricing Cards - Premium Look */}
                  {tool.pricing && tool.pricing.length > 0 && tool.pricing[0].plan && (
                    <div id="pricing" ref={pricingRef} className="scroll-mt-24 pt-8 border-t border-border/30">
                      <h2 className="text-3xl font-bold tracking-tight mb-8">Pricing Plans</h2>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {tool.pricing.filter(p => p.plan).map((plan, index) => {
                          const isPopular = index === 1; // Arbitrary logic for demo visual
                          return (
                            <div key={index} className={`relative flex flex-col p-6 rounded-2xl border ${isPopular ? 'bg-primary/5 border-primary shadow-lg shadow-primary/10' : 'bg-card border-border/50'}`}>
                              {isPopular && (
                                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                  Most Popular
                                </span>
                              )}
                              <h3 className="text-xl font-bold text-foreground mb-1">{plan.plan}</h3>
                              <div className="text-3xl font-extrabold text-foreground mb-6">
                                {plan.price && !['0', '$0', '$0.00'].includes(plan.price) ? plan.price : 'Free'}
                              </div>

                              {/* Separator */}
                              <div className="h-px w-full bg-border/50 mb-6"></div>

                              <ul className="space-y-3 mb-8 flex-1">
                                {plan.features?.map((feat, i) => (
                                  <li key={i} className="flex items-start text-sm text-muted-foreground">
                                    <svg className="w-5 h-5 text-green-500 mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    {feat}
                                  </li>
                                ))}
                              </ul>

                              <a href={tool.url} target="_blank" rel="nofollow noreferrer" className={`w-full py-2.5 rounded-lg text-sm font-bold text-center transition-colors ${isPopular ? 'bg-primary text-white hover:bg-primary/90' : 'bg-secondary text-foreground hover:bg-secondary/80'}`}>
                                Get Started
                              </a>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  {/* Embed Section - Subtle */}
                  <div id="embed" ref={embedRef} className="scroll-mt-24 pt-8 border-t border-border/30">
                    <LazySection>
                      <div className="bg-card/20 border border-border/40 rounded-xl p-6 flex flex-col md:flex-row gap-8 items-center justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground mb-2">Embed Badge</h3>
                          <p className="text-sm text-muted-foreground mb-4">Show off your listing with our official badge.</p>
                          <div className="flex gap-2 mb-3">
                            <button onClick={() => setEmbedTheme('white')} className={`px-3 py-1 text-xs rounded-full border ${embedTheme === 'white' ? 'bg-white text-black border-white' : 'border-border text-muted-foreground'}`}>Light</button>
                            <button onClick={() => setEmbedTheme('black')} className={`px-3 py-1 text-xs rounded-full border ${embedTheme === 'black' ? 'bg-black text-white border-black' : 'border-border text-muted-foreground'}`}>Dark</button>
                          </div>
                          <div className="relative group">
                            <div className="bg-background/50 p-4 rounded-lg text-xs text-muted-foreground border border-border/30 font-mono break-all whitespace-pre-wrap select-all">
                              {`<a href="https://aitoonic.com/ai/${tool.slug || tool.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}/?ref=embed" target="_blank"><img src="${embedTheme === 'white' ? 'https://i.ibb.co/ycLB5CbV/Aitoonic-FEATURED-White.webp' : 'https://i.ibb.co/LXcdwtmc/Aitoonic-FEATURED-Dark.webp'}" alt="${tool.name} Featured on Aitoonic" width="250" height="60" /></a>`}
                            </div>
                            <button
                              className="absolute top-2 right-2 text-xs bg-primary text-primary-foreground px-3 py-1.5 rounded-md hover:bg-primary/90 transition-colors shadow-sm font-medium z-10"
                              onClick={() => {
                                navigator.clipboard.writeText(`<a href="https://aitoonic.com/ai/${tool.slug || tool.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}/?ref=embed" target="_blank"><img src="${embedTheme === 'white' ? 'https://i.ibb.co/ycLB5CbV/Aitoonic-FEATURED-White.webp' : 'https://i.ibb.co/LXcdwtmc/Aitoonic-FEATURED-Dark.webp'}" alt="${tool.name} Featured on Aitoonic" width="250" height="60" /></a>`)
                                setShowCopyToast(true)
                                setTimeout(() => setShowCopyToast(false), 3000)
                              }}
                            >
                              Copy
                            </button>
                          </div>
                        </div>
                        <div className="shrink-0">
                          <img
                            src={embedTheme === 'white' ? 'https://i.ibb.co/ycLB5CbV/Aitoonic-FEATURED-White.webp' : 'https://i.ibb.co/LXcdwtmc/Aitoonic-FEATURED-Dark.webp'}
                            alt="Badge Preview"
                            className="h-12 w-auto object-contain"
                          />
                        </div>
                      </div>
                    </LazySection>
                  </div>
                </div>
              </div>
            </div>

            {/* Similar Tools Section */}
            {similarTools && similarTools.length > 0 && (
              <LazySection rootMargin="300px 0px" minHeight="200px">
                <div ref={similarToolsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-border scroll-mt-24">
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
      {showCopyToast && (
        <div className="fixed bottom-4 right-4 z-50 bg-foreground text-background px-4 py-2.5 rounded-lg shadow-lg flex items-center gap-3 animate-in slide-in-from-bottom-5 fade-in duration-300">
          <div className="bg-green-500 rounded-full p-1">
            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <span className="text-sm font-semibold">Embed code copied!</span>
        </div>
      )}
      {showShareToast && (
        <div className="fixed bottom-4 right-4 z-50 bg-foreground text-background px-4 py-2.5 rounded-lg shadow-lg flex items-center gap-3 animate-in slide-in-from-bottom-5 fade-in duration-300">
          <div className="bg-blue-500 rounded-full p-1">
            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <span className="text-sm font-semibold">Link copied to clipboard!</span>
        </div>
      )}
    </div>
  )
}
