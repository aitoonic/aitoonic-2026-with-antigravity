'use client'

import { useMemo, useState } from 'react'
import CategoryCard from '@/components/CategoryCard'
import type { Category } from '@/lib/types'

interface CategoriesClientProps {
  initialCategories: (Category & { tools_count: number })[]
}

export default function CategoriesClient({ initialCategories }: CategoriesClientProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const categories = initialCategories

  const filteredCategories = useMemo(() => (
    (categories || []).filter(category =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description?.toLowerCase().includes(searchQuery.toLowerCase())
    )
  ), [categories, searchQuery])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card/60 backdrop-blur border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              AI Tool Categories
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Explore our comprehensive collection of AI tools organized by category. 
              Find the perfect solution for your specific needs.
            </p>
            
            {/* Search */}
            <div className="max-w-md mx-auto">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search categories..."
                  className="block w-full pl-10 pr-3 py-2 border border-border rounded-md leading-5 bg-card placeholder-muted-foreground focus:outline-none focus:placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-primary text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredCategories.length > 0 ? (
          <>
            {/* Stats */}
            <div className="mb-8">
              <div className="text-center text-sm text-muted-foreground">
                {searchQuery ? (
                  <>
                    Found {filteredCategories.length} categor{filteredCategories.length === 1 ? 'y' : 'ies'} matching "{searchQuery}"
                  </>
                ) : (
                  <>
                    Showing {filteredCategories.length} categor{filteredCategories.length === 1 ? 'y' : 'ies'} with {filteredCategories.reduce((sum, cat) => sum + (cat.tools_count || 0), 0)} total tools
                  </>
                )}
              </div>
            </div>
            
            {/* Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCategories
                .sort((a, b) => (b.tools_count || 0) - (a.tools_count || 0))
                .map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">
              {searchQuery ? 'No categories found' : 'No categories available'}
            </h3>
            <p className="text-muted-foreground">
              {searchQuery ? 'Try adjusting your search terms.' : 'Categories will appear here once they are added.'}
            </p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="mt-4 text-primary hover:underline text-sm font-medium"
              >
                Clear search
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
