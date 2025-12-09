import Link from 'next/link'
import { Category } from '@/lib/types'

interface CategoryCardProps {
  category: Category & { tools_count?: number }
  showToolsCount?: boolean
}

export default function CategoryCard({ category, showToolsCount = true }: CategoryCardProps) {
  return (
    <Link href={`/category/${category.slug}`}>
      <div className="group relative overflow-hidden bg-card rounded-lg border border-border p-6 hover:shadow-md transition-all duration-300 h-full text-foreground ring-1 ring-transparent hover:ring-primary/40">
        {/* Category logo (favicon for all) */}
        <div className="mb-4">
          <img
            src="https://i.ibb.co/KjStWPgL/aitoonic-fevicon-2.webp"
            alt={`${category.name} icon`}
            width={48}
            height={48}
            className="w-12 h-12 rounded-lg object-contain ring-1 ring-border bg-secondary blink-slow"
            onError={(e) => {
              try {
                // @ts-ignore
                e.currentTarget.src = 'https://i.ibb.co/KjStWPgL/aitoonic-fevicon-2.webp'
              } catch {}
            }}
          />
        </div>
        
        {/* Category name */}
        <h3 className="text-lg font-semibold mb-2">
          {category.name}
        </h3>
        
        {/* Description */}
        {category.description && (
          <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
            {category.description}
          </p>
        )}
        
        {/* Tools count */}
        {showToolsCount && category.tools_count !== undefined && (
          <div className="flex items-center justify-between mt-auto">
            <span className="text-sm text-muted-foreground">
              {category.tools_count} {category.tools_count === 1 ? 'tool' : 'tools'}
            </span>
            <svg 
              className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 5l7 7-7 7" 
              />
            </svg>
          </div>
        )}
        
        {/* shiny sheen */}
        <div aria-hidden className="pointer-events-none absolute -inset-24 translate-x-[-60%] -translate-y-1/2 rotate-12 opacity-0 group-hover:opacity-20 motion-safe:transition motion-safe:duration-500 bg-gradient-to-r from-white/10 via-white/40 to-white/10 blur-2xl" />
      </div>
    </Link>
  )
}
