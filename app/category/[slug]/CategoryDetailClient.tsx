'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import ToolCard from '@/components/ToolCard'
import LoadingSpinner from '@/components/LoadingSpinner'
import SearchBar from '@/components/SearchBar'
import { Category, Tool } from '@/lib/types'
import { generateCategoryIntro, generateCoreFeatures, generateCategoryQuestions, generateCategoryFaq, clearContentCache } from '@/lib/category-content'
import { getCategories } from '@/lib/api'
import { searchTools } from '@/lib/api'

interface CategoryDetailClientProps {
  category: Category
  initialTools: Tool[]
  slug: string
}

export default function CategoryDetailClient({ 
  category, 
  initialTools, 
  slug 
}: CategoryDetailClientProps) {
  const [tools, setTools] = useState<Tool[]>(initialTools)
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<Tool[]>([])
  const [loading, setLoading] = useState(false)
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'name'>('newest')
  const [similarCategories, setSimilarCategories] = useState<Category[]>([])
  const [page, setPage] = useState(1)
  const [categoryContent, setCategoryContent] = useState<{
    intro: string;
    coreFeatures: Array<{ title: string; description: string }>;
    questions: Array<{ q: string; a: string }>;
    faq: Array<{ q: string; a: string }>;
  } | null>(null)
  const [contentLoading, setContentLoading] = useState(true)
  const pageSize = 24

  useEffect(() => {
    // Clear cache when category changes to ensure fresh content
    clearContentCache()
    
    const loadCategoryContent = async () => {
      setContentLoading(true)
      try {
        const intro = await generateCategoryIntro(category.name)
        const features = await generateCoreFeatures(category.name)
        const questions = await generateCategoryQuestions(category.name)
        const faq = await generateCategoryFaq(category.name)

        setCategoryContent({
          intro,
          coreFeatures: features,
          questions,
          faq
        })
      } catch (error) {
        console.error('Error loading category content:', error)
      } finally {
        setContentLoading(false)
      }
    }

    loadCategoryContent()
  }, [category.name])

  const handleSearch = async (query: string) => {
    if (query.trim()) {
      setIsSearching(true)
      setLoading(true)
      try {
        const results = await searchTools(query, category.id)
        setSearchResults(results)
      } catch (error) {
        console.error('Search error:', error)
        setSearchResults([])
      } finally {
        setLoading(false)
      }
    } else {
      setIsSearching(false)
      setSearchResults([])
    }
  }

  const sortedTools = (isSearching ? searchResults : tools).sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.published_at || '').getTime() - new Date(a.published_at || '').getTime()
      case 'oldest':
        return new Date(a.published_at || '').getTime() - new Date(b.published_at || '').getTime()
      case 'name':
        return a.name.localeCompare(b.name)
      default:
        return 0
    }
  })
  const pagedTools = sortedTools.slice((page - 1) * pageSize, page * pageSize)
  const totalPages = Math.max(1, Math.ceil(sortedTools.length / pageSize))

  useEffect(() => {
    // fetch categories for similar section client-side (lightweight)
    ;(async () => {
      try {
        const all = await getCategories()
        // simple selection: same first token or just first 12 others
        const currentFirst = category.name.split(' ')[0].toLowerCase()
        const ranked = all
          .filter(c => c.id !== category.id)
          .map(c => ({ c, score: c.name.toLowerCase().includes(currentFirst) ? 1 : 0 }))
          .sort((a, b) => b.score - a.score)
          .slice(0, 12)
          .map(x => x.c)
        setSimilarCategories(ranked)
      } catch (e) {
        // ignore
      }
    })()
  }, [category.id, category.name])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
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
              <li>
                <Link href="/categories" className="hover:text-foreground">
                  Categories
                </Link>
              </li>
              <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <li className="text-foreground font-medium">
                {category.name}
              </li>
            </ol>
          </nav>
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-6 lg:mb-0">
              <h1 className="text-4xl font-bold text-foreground mb-4">
                {category.name} AI Tools
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl">
                {category.description}
              </p>
              <div className="mt-4 flex items-center text-sm text-muted-foreground gap-4">
                <div>
                  <span className="font-medium text-primary">{tools.length}</span>
                  <span className="ml-1">tools available</span>
                </div>
                {category.updated_at && (
                  <div>
                    <span className="font-medium">Updated:</span>
                    <span className="ml-1">{new Date(category.updated_at).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
            </div>
            
            {category.image_url && (
              <div className="flex-shrink-0">
                <img
                  src={category.image_url}
                  alt={category.name}
                  className="w-32 h-32 object-cover rounded-lg"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex-1 max-w-2xl">
              <SearchBar 
                onSearch={handleSearch}
                placeholder={`Search in ${category.name}...`}
                showCategoryFilter={false}
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium text-foreground">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest' | 'name')}
                className="text-sm border border-border rounded-md px-3 py-2 bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="name">Name (A-Z)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <LoadingSpinner text={isSearching ? "Searching..." : "Loading tools..."} />
        ) : sortedTools.length > 0 ? (
          <>
            {/* Results count */}
            <div className="mb-6">
              <p className="text-sm text-muted-foreground">
                {isSearching ? (
                  <>Showing {sortedTools.length} search result{sortedTools.length === 1 ? '' : 's'}</>
                ) : (
                  <>Showing all {sortedTools.length} tool{sortedTools.length === 1 ? '' : 's'}</>
                )}
                {isSearching && (
                  <button
                    onClick={() => {
                      setIsSearching(false)
                      setSearchResults([])
                    }}
                    className="ml-4 text-primary hover:brightness-110 text-sm font-medium"
                  >
                    Clear search
                  </button>
                )}
              </p>
            </div>
            
            {/* Tools Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {pagedTools.map((tool) => (
                <div
                  key={tool.id}
                  className="motion-safe:animate-in motion-safe:fade-in-50 motion-safe:zoom-in-95 motion-safe:duration-300 motion-safe:ease-out"
                >
                  <ToolCard tool={tool} />
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-2">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className={`px-3 py-2 rounded border ${page === 1 ? 'text-muted-foreground/50 border-border' : 'text-foreground border-border hover:bg-secondary'}`}
                >
                  Prev
                </button>
                <span className="text-sm text-muted-foreground">Page {page} of {totalPages}</span>
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className={`px-3 py-2 rounded border ${page === totalPages ? 'text-muted-foreground/50 border-border' : 'text-foreground border-border hover:bg-secondary'}`}
                >
                  Next
                </button>
              </div>
            )}

            {/* Category Content */}
            {contentLoading ? (
              <div className="mt-12">
                <LoadingSpinner text="Loading category content..." />
              </div>
            ) : categoryContent ? (
              <>
                <section className="mt-12 mb-10">
                  <h2 className="text-2xl font-bold text-foreground mb-4">What is {category.name}?</h2>
                  <p className="text-muted-foreground leading-relaxed">{categoryContent.intro}</p>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-foreground mb-4">{category.name} Core Features</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {categoryContent.coreFeatures.map((f, idx) => (
                      <div key={idx} className="bg-card p-6 rounded-lg border border-border">
                        <h3 className="text-lg font-semibold text-foreground mb-2">{f.title}</h3>
                        <p className="text-muted-foreground">{f.description}</p>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-foreground mb-4">Common Questions About {category.name}</h2>
                  <div className="space-y-6">
                    {categoryContent.questions.map((q, idx) => (
                      <div key={idx} className="bg-card p-6 rounded-lg border border-border">
                        <h3 className="text-lg font-semibold text-foreground mb-2">{q.q}</h3>
                        <p className="text-muted-foreground">{q.a}</p>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
                  <div className="space-y-6">
                    {categoryContent.faq.map((f, idx) => (
                      <div key={idx} className="bg-card p-6 rounded-lg border border-border">
                        <h3 className="text-lg font-semibold text-foreground mb-2">{f.q}</h3>
                        <p className="text-muted-foreground">{f.a}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </>
            ) : null}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              {isSearching ? 'No tools found matching your search.' : 'No tools available in this category yet.'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
