'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Tool, Category } from '@/lib/types'
import { getTools, getCategories } from '@/lib/api'
import LoadingSpinner from '@/components/LoadingSpinner'

export default function ComparePageClient() {
  const [tools, setTools] = useState<Tool[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [selectedComparisonTool, setSelectedComparisonTool] = useState<Tool | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const router = useRouter()

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        const [toolsData, categoriesData] = await Promise.all([
          getTools(),
          getCategories()
        ])
        setTools(toolsData)
        setCategories(categoriesData)
      } catch (err) {
        setError('Failed to load data. Please try again later.')
        console.error('Error loading compare data:', err)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  // Handle tool selection
  const handleToolSelect = (tool: Tool) => {
    setSelectedTool(tool)
    setSelectedCategory(tool.category_id)
    setSelectedComparisonTool(null) // Reset the second selection
  }

  // Handle comparison tool selection
  const handleComparisonToolSelect = (tool: Tool) => {
    setSelectedComparisonTool(tool)
  }

  // Handle category filter change
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId)
    setSelectedTool(null)
    setSelectedComparisonTool(null)
  }

  // Handle the comparison action
  const handleCompare = () => {
    if (selectedTool && selectedComparisonTool) {
      const tool1Slug = selectedTool.slug || selectedTool.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
      const tool2Slug = selectedComparisonTool.slug || selectedComparisonTool.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
      router.push(`/compare/${tool1Slug}-vs-${tool2Slug}`)
    }
  }

  // Filter tools based on selected category
  const filteredTools = selectedCategory 
    ? tools.filter(tool => tool.category_id === selectedCategory) 
    : tools

  // Tools available for comparison (same category as selected tool, excluding the selected tool)
  const comparisonTools = selectedTool 
    ? filteredTools.filter(tool => tool.id !== selectedTool.id)
    : []

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">Compare AI Tools</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Select a tool to begin comparison. Once selected, you'll see other tools from the same category to compare it with.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <LoadingSpinner />
            <p className="mt-4 text-muted-foreground">Loading AI tools...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-12">
            <div className="bg-destructive/10 border-l-4 border-destructive p-4 rounded mb-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-destructive" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              </div>
            </div>
            <Link href="/" className="text-primary hover:brightness-110">← Back to Home</Link>
          </div>
        )}

        {/* Main Content */}
        {!loading && !error && (
          <div className="bg-card rounded-lg shadow-sm border border-border overflow-hidden">
            {/* Category Filter */}
            <div className="p-6 border-b border-border bg-secondary/30">
              <label htmlFor="category" className="block text-sm font-medium text-foreground mb-2">Filter by Category</label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="block w-full max-w-lg rounded-md border border-border bg-card text-foreground shadow-sm focus:border-ring focus:ring-ring"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>

            <div className="p-6">
              {/* Selection UI */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* First Tool Selection */}
                <div>
                  <h2 className="text-lg font-medium text-foreground mb-4">Select First Tool</h2>
                  
                  {/* Selected Tool Display */}
                  {selectedTool && (
                    <div className="mb-4 p-4 bg-primary/10 border border-primary/20 rounded-lg motion-safe:animate-in motion-safe:fade-in-50 motion-safe:zoom-in-95 motion-safe:duration-300">
                      <div className="flex items-center">
                        {selectedTool.image_url && (
                          <Image
                            src={selectedTool.image_url}
                            alt={selectedTool.name}
                            width={48}
                            height={48}
                            className="rounded-md mr-4"
                          />
                        )}
                        <div>
                          <h3 className="font-medium text-foreground">{selectedTool.name}</h3>
                          <p className="text-sm text-muted-foreground">{selectedTool.short_description}</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Tool Selection List */}
                  <div className="border border-border rounded-lg overflow-hidden">
                    <div className="divide-y divide-border max-h-96 overflow-y-auto">
                      {filteredTools.length === 0 ? (
                        <div className="p-4 text-center text-muted-foreground">No tools found</div>
                      ) : (
                        filteredTools.map((tool) => (
                          <button
                            key={tool.id}
                            onClick={() => handleToolSelect(tool)}
                            className={`w-full text-left px-4 py-3 hover:bg-secondary flex items-center motion-safe:transition motion-safe:duration-300 hover:-translate-y-0.5 ${selectedTool?.id === tool.id ? 'bg-primary/10' : ''}`}
                          >
                            {tool.image_url && (
                              <Image
                                src={tool.image_url}
                                alt={tool.name}
                                width={40}
                                height={40}
                                className="rounded-md mr-3 motion-safe:transition-transform group-hover:scale-105"
                              />
                            )}
                            <div>
                              <div className="font-medium text-foreground">{tool.name}</div>
                              <div className="text-sm text-muted-foreground truncate max-w-xs">{tool.short_description}</div>
                            </div>
                          </button>
                        ))
                      )}
                    </div>
                  </div>
                </div>

                {/* Second Tool Selection - Only visible if first tool is selected */}
                {selectedTool && (
                  <div>
                    <h2 className="text-lg font-medium text-foreground mb-4">Select Tool to Compare With</h2>
                    
                    {/* Selected Comparison Tool Display */}
                    {selectedComparisonTool && (
                      <div className="mb-4 p-4 bg-primary/10 border border-primary/20 rounded-lg motion-safe:animate-in motion-safe:fade-in-50 motion-safe:zoom-in-95 motion-safe:duration-300">
                        <div className="flex items-center">
                          {selectedComparisonTool.image_url && (
                            <Image
                              src={selectedComparisonTool.image_url}
                              alt={selectedComparisonTool.name}
                              width={48}
                              height={48}
                              className="rounded-md mr-4"
                            />
                          )}
                          <div>
                            <h3 className="font-medium text-foreground">{selectedComparisonTool.name}</h3>
                            <p className="text-sm text-muted-foreground">{selectedComparisonTool.short_description}</p>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Comparison Tool Selection List */}
                    <div className="border border-border rounded-lg overflow-hidden">
                      <div className="divide-y divide-border max-h-96 overflow-y-auto">
                        {comparisonTools.length === 0 ? (
                          <div className="p-4 text-center text-muted-foreground">
                            No other tools found in this category for comparison
                          </div>
                        ) : (
                          comparisonTools.map((tool) => (
                            <button
                              key={tool.id}
                              onClick={() => handleComparisonToolSelect(tool)}
                              className={`w-full text-left px-4 py-3 hover:bg-secondary flex items-center motion-safe:transition motion-safe:duration-300 hover:-translate-y-0.5 ${selectedComparisonTool?.id === tool.id ? 'bg-primary/10' : ''}`}
                            >
                              {tool.image_url && (
                                <Image
                                  src={tool.image_url}
                                  alt={tool.name}
                                  width={40}
                                  height={40}
                                  className="rounded-md mr-3 motion-safe:transition-transform group-hover:scale-105"
                                />
                              )}
                              <div>
                                <div className="font-medium text-foreground">{tool.name}</div>
                                <div className="text-sm text-muted-foreground truncate max-w-xs">{tool.short_description}</div>
                              </div>
                            </button>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Compare Button - Only enabled if both tools are selected */}
              {selectedTool && selectedComparisonTool && (
                <div className="mt-8 text-center">
                  <button
                    onClick={handleCompare}
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm bg-primary text-primary-foreground hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    Compare {selectedTool.name} with {selectedComparisonTool.name}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
