'use client'

import { useState, useEffect, useRef } from 'react'
import SearchBar from '@/components/SearchBar'
import FilterTabs from '@/components/FilterTabs'
import ToolCard from '@/components/ToolCard'
import CategoryCard from '@/components/CategoryCard'
import LoadingSpinner from '@/components/LoadingSpinner'
import ErrorMessage from '@/components/ErrorMessage'
import { useCategories, useFilteredTools, useSearch } from '@/hooks/useData'
import { getToolsByCategory } from '@/lib/api'
import { Tool } from '@/lib/types'

// Lazy mount a section when it enters the viewport (once)
function LazySection({ children, rootMargin = '200px 0px', minHeight = '1px' }: { children: React.ReactNode, rootMargin?: string, minHeight?: string }) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!ref.current || visible) return
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          setVisible(true)
        }
      })
    }, { root: null, rootMargin, threshold: 0.01 })
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [visible, rootMargin])

  return (
    <div ref={ref} style={{ minHeight }}>
      {visible ? children : null}
    </div>
  )
}

export default function HomeClient({ showHero = true }: { showHero?: boolean } = {}) {
  const [activeFilter, setActiveFilter] = useState<'today' | 'new' | 'popular'>('new')
  const [isSearching, setIsSearching] = useState(false)
  const [categoryTools, setCategoryTools] = useState<{ [key: string]: Tool[] }>({})
  const [loadingCategories, setLoadingCategories] = useState<string[]>([])

  // Data hooks with error boundaries
  const {
    data: categories = [],
    loading: categoriesLoading,
    error: categoriesError,
    refetch: refetchCategories
  } = useCategories()

  const {
    data: tools = [],
    loading: toolsLoading,
    error: toolsError
  } = useFilteredTools('new')

  const {
    data: results = [],
    loading: searchLoading,
    error: searchError,
    search
  } = useSearch()

  // Handle search
  const handleSearch = (query: string) => {
    setIsSearching(!!query)
    search(query)
  }

  // Track loading state with ref to prevent race conditions/infinite loops
  const loadingRefs = useRef(new Set<string>())

  // Load tools by category
  useEffect(() => {
    if (categories && categories.length > 0) {
      // Select top categories (e.g., first 4)
      const topCategories = categories.slice(0, 4)

      topCategories.forEach(async (category) => {
        // Check both state and ref to ensure we don't double-fetch
        if (category.id && !categoryTools[category.id] && !loadingRefs.current.has(category.id)) {
          try {
            loadingRefs.current.add(category.id)
            setLoadingCategories(prev => [...prev, category.id])

            const categoryToolsData = await getToolsByCategory(category.id, 8)

            setCategoryTools(prev => ({
              ...prev,
              [category.id]: categoryToolsData
            }))
          } catch (error) {
            console.error(`Error loading tools for category ${category.name}:`, error)
          } finally {
            loadingRefs.current.delete(category.id)
            setLoadingCategories(prev => prev.filter(id => id !== category.id))
          }
        }
      })
    }
  }, [categories]) // Remove categoryTools from dependencies to prevent infinite loop

  // Handle retry for failed category fetch
  const handleRetry = () => {
    refetchCategories()
  }

  // Show loading state
  if (categoriesLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  // Show error state
  if (categoriesError) {
    return (
      <div className="text-center py-12">
        <ErrorMessage
          message="Failed to load categories. Please try again."
          onRetry={handleRetry}
        />
      </div>
    )
  }

  // Show empty state if no categories
  if (!categories || categories.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No categories found.</p>
      </div>
    )
  }

  return (
    <div className="bg-background">
      <div className="container py-12">
        {/* Hero Section (optional) */}
        {showHero && (
          <section className="text-center mb-16">
            <h1 className="text-4xl font-extrabold text-foreground sm:text-5xl sm:tracking-tight lg:text-6xl mb-6">
              Discover the Best AI Tools
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-muted-foreground">
              Find the perfect AI solution for your needs from our curated collection
            </p>
            {/* Search Bar */}
            <div className="mt-8 max-w-2xl mx-auto">
              <SearchBar onSearch={handleSearch} />
            </div>
          </section>
        )}
        {!showHero && (
          <section className="text-center mb-10">
            <div className="max-w-2xl mx-auto">
              {/* Top search (no hero text) */}
              <SearchBar onSearch={handleSearch} showCategoryFilter={false} />
            </div>
          </section>
        )}
        {isSearching ? (
          /* Search Results */
          <section className="mb-16">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-foreground">Search Results</h2>
              <button
                onClick={() => setIsSearching(false)}
                className="text-primary hover:text-primary/90 text-sm font-medium"
              >
                Clear Search
              </button>
            </div>

            <LazySection rootMargin="150px 0px" minHeight="200px">
              {searchLoading ? (
                <div className="text-center py-12">
                  <LoadingSpinner />
                </div>
              ) : results.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {results.map((tool) => (
                    <ToolCard key={tool.id} tool={tool} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No results found. Try different keywords.</p>
                </div>
              )}
            </LazySection>
          </section>
        ) : (
          <>
            {/* Categories Section */}
            <section className="mb-16">
              <h2 className="text-2xl font-bold text-foreground mb-6">Browse by Category</h2>

              <LazySection rootMargin="200px 0px" minHeight="240px">
                {categoriesLoading ? (
                  <div className="text-center py-12">
                    <LoadingSpinner />
                  </div>
                ) : categories && categories.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {categories.map((category) => (
                      <CategoryCard key={category.id} category={category as any} showToolsCount={false} />
                    ))}
                  </div>
                ) : (
                  <ErrorMessage message="Unable to load categories" />
                )}
              </LazySection>
            </section>

            {/* Featured Tools Section */}
            <section className="mb-16">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-foreground">Featured Tools</h2>
                <FilterTabs
                  activeFilter={activeFilter}
                  onFilterChange={setActiveFilter}
                />
              </div>

              <LazySection rootMargin="200px 0px" minHeight="240px">
                {toolsLoading ? (
                  <div className="text-center py-12">
                    <LoadingSpinner />
                  </div>
                ) : tools && tools.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {tools.slice(0, 8).map((tool) => (
                      <ToolCard key={tool.id} tool={tool} />
                    ))}
                  </div>
                ) : (
                  <ErrorMessage message="Unable to load tools" />
                )}
              </LazySection>
            </section>

            {/* Category Sections */}
            {categories && categories.length > 0 && (
              <section>
                {categories.slice(0, 4).map((category) => {
                  const isLoading = loadingCategories.includes(category.id)
                  const tools = categoryTools[category.id] || []

                  return (
                    <div key={category.id} className="mb-16">
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-foreground">{category.name}</h2>
                        <a
                          href={`/category/${category.slug}`}
                          className="text-primary hover:text-primary/90 text-sm font-medium flex items-center"
                        >
                          View all
                          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </a>
                      </div>

                      <LazySection rootMargin="250px 0px" minHeight="200px">
                        {isLoading ? (
                          <LoadingSpinner size="sm" />
                        ) : (
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {tools.slice(0, 8).map((tool) => (
                              <ToolCard key={tool.id} tool={tool} />
                            ))}
                          </div>
                        )}
                      </LazySection>
                    </div>
                  )
                })}
              </section>
            )}
          </>
        )}
      </div>
    </div>
  )
}
