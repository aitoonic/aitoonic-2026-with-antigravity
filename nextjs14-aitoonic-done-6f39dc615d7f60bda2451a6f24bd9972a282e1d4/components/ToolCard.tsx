'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Tool } from '@/lib/types'
import { useState } from 'react'
import SaveButton from './SaveButton'
import AuthPopup from './AuthPopup'

interface ToolCardProps {
  tool: Tool
  showCategory?: boolean
  categoryName?: string
}

function normalizeFree(price?: string) {
  if (!price) return false
  const s = String(price).trim()
  return s === '0' || s === '$0' || s === '$0.00' || /(^|\b)free(\b|$)/i.test(s)
}

function pricingType(pricing?: Tool['pricing']): 'Free' | 'Freemium' | 'Paid' {
  if (!pricing || pricing.length === 0) return 'Free'
  const hasFree = pricing.some((p) => normalizeFree(p.price))
  const hasPaid = pricing.some((p) => p.price && !normalizeFree(p.price))
  if (hasFree && hasPaid) return 'Freemium'
  if (hasPaid) return 'Paid'
  return 'Free'
}

function firstPrices(pricing?: Tool['pricing'], max = 3): string[] {
  if (!pricing || pricing.length === 0) return []
  const vals = pricing
    .map((p) => (p.price || '').toString().trim())
    .filter(Boolean)
  const uniq: string[] = []
  for (const v of vals) {
    if (!uniq.includes(v)) uniq.push(v)
    if (uniq.length >= max) break
  }
  return uniq
}

export default function ToolCard({ tool, showCategory = false, categoryName }: ToolCardProps) {
  const [showAuthPopup, setShowAuthPopup] = useState(false)

  const toolSlug = tool.slug || tool.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')

  const type = pricingType(tool.pricing)
  const prices = firstPrices(tool.pricing, 3)

  const typeClasses =
    type === 'Free'
      ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
      : type === 'Freemium'
        ? 'bg-fuchsia-500/15 text-fuchsia-300 border-fuchsia-500/30'
        : 'bg-sky-500/15 text-sky-300 border-sky-500/30'

  return (
    <>
      <Link
        href={`/ai/${toolSlug}`}
        className="group block rounded-xl p-[1px] bg-gradient-to-br from-primary/25 via-primary/10 to-transparent hover:from-primary/45 hover:via-primary/20 hover:to-transparent transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/40 relative"
      >
        <div className="bg-card rounded-[inherit] shadow-sm border border-border/60 hover:border-primary/40 motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-out group-hover:shadow-lg group-hover:shadow-primary/10 h-full">
          <div className="p-4 flex items-start gap-4 h-full relative">

            {/* Absolute Save Button */}
            <div className="absolute top-2 right-2 z-10">
              <SaveButton
                toolId={tool.id}
                onAuthRequired={() => setShowAuthPopup(true)}
              />
            </div>

            {/* Logo 48x48 fixed */}
            <div className="flex-shrink-0 flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-md overflow-hidden bg-secondary grid place-items-center motion-safe:transition-transform motion-safe:duration-300 group-hover:scale-105">
                {tool.image_url ? (
                  <Image
                    src={tool.image_url}
                    alt={tool.image_alt || tool.name}
                    width={48}
                    height={48}
                    className="object-contain w-full h-full"
                    onError={(e) => {
                      try {
                        // @ts-ignore
                        e.currentTarget.src = 'https://i.ibb.co/KjStWPgL/aitoonic-fevicon-2.webp'
                        // @ts-ignore
                        e.currentTarget.classList.add('blink-slow')
                      } catch { }
                    }}
                    onLoad={(e) => {
                      try {
                        // @ts-ignore
                        e.currentTarget.classList.remove('blink-slow')
                      } catch { }
                    }}
                  />
                ) : (
                  <img
                    src="https://i.ibb.co/KjStWPgL/aitoonic-fevicon-2.webp"
                    alt={tool.name}
                    width={48}
                    height={48}
                    className="object-contain w-full h-full blink-slow"
                  />
                )}
              </div>

            </div>

            {/* Main content */}
            <div className="min-w-0 flex-1">
              {/* Pricing type badge */}
              <div className="mb-1">
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[11px] font-semibold tracking-wide uppercase ${typeClasses}`}>
                  {type}
                  {type === 'Freemium' && (
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M12 2l2.09 6.26L20 9.27l-5 3.64L16.18 20 12 16.9 7.82 20 9 12.91l-5-3.64 5.91-1.01L12 2z" />
                    </svg>
                  )}
                </span>
              </div>

              <div className="flex items-start justify-between gap-3 pr-8">
                <h3 className="text-base font-semibold text-foreground leading-6 truncate">
                  {tool.name}
                </h3>
              </div>

              {showCategory && categoryName && (
                <div className="mt-1">
                  <span className="inline-block bg-secondary text-secondary-foreground text-xs font-medium px-2 py-0.5 rounded-full">
                    {categoryName}
                  </span>
                </div>
              )}

              {/* One-line value prop */}
              <p className="mt-1 text-muted-foreground text-sm line-clamp-1">
                {tool.short_description || tool.description}
              </p>

              {/* Meta bar */}
              <div className="mt-3 flex items-center gap-2 text-xs flex-wrap">
                {/* Price pills (up to 3) */}
                {prices.length > 0 ? (
                  prices.map((p, i) => (
                    <span key={i} className="inline-flex items-center px-2 py-0.5 rounded-full border border-border text-foreground/80 bg-background/40">
                      {p}
                    </span>
                  ))
                ) : (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full border border-border text-foreground/80">Free</span>
                )}

                {tool.featured && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-accent/20 text-accent-foreground border border-accent/30">
                    Featured
                  </span>
                )}
                {tool.rating && (
                  <span className="inline-flex items-center gap-1 text-muted-foreground">
                    <svg className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {tool.rating}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </Link>

      <AuthPopup
        isOpen={showAuthPopup}
        onClose={() => setShowAuthPopup(false)}
        message="Sign up or log in to save tools and vote."
      />
    </>
  )
}
