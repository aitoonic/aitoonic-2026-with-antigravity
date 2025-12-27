'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Tool, Category } from '@/lib/types'
import { getTools, getCategories } from '@/lib/api'
import Image from 'next/image'

interface CompareButtonProps {
  className?: string
  variant?: 'header' | 'footer'
}

export default function CompareButton({ className = '', variant = 'header' }: CompareButtonProps) {
  const [showCompareModal, setShowCompareModal] = useState(false)
  const [tools, setTools] = useState<Tool[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedTool1, setSelectedTool1] = useState<Tool | null>(null)
  const [selectedTool2, setSelectedTool2] = useState<Tool | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const router = useRouter()
  const pathname = usePathname()

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
        
        // Auto-select first tool based on current page
        const currentPageMatch = pathname.match(/\/ai\/([^/]+)/)
        if (currentPageMatch) {
          const currentToolSlug = currentPageMatch[1]
          const currentTool = toolsData.find(tool => {
            const toolSlug = tool.slug || tool.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
            return toolSlug === currentToolSlug
          })
          
          if (currentTool) {
            setSelectedTool1(currentTool)
            setSelectedCategory(currentTool.category_id)
          }
        }
        
        // If no current tool, select first available tool
        if (!selectedTool1 && toolsData.length > 0) {
          setSelectedTool1(toolsData[0])
          setSelectedCategory(toolsData[0].category_id)
        }
      } catch (err) {
        setError('Failed to load data')
        console.error('Error loading compare data:', err)
      } finally {
        setLoading(false)
      }
    }

    if (showCompareModal && tools.length === 0) {
      loadData()
    }
  }, [showCompareModal, pathname, selectedTool1])

  // Filter tools by selected category
  const filteredTools = tools.filter(tool => tool.category_id === selectedCategory)
  const availableToolsForSecondSelection = filteredTools.filter(tool => tool.id !== selectedTool1?.id)

  const handleCompare = () => {
    if (selectedTool1 && selectedTool2) {
      const tool1Slug = selectedTool1.slug || selectedTool1.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
      const tool2Slug = selectedTool2.slug || selectedTool2.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
      router.push(`/compare/${tool1Slug}-vs-${tool2Slug}`)
      setShowCompareModal(false)
    }
  }

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId)
    const categoryTools = tools.filter(tool => tool.category_id === categoryId)
    if (categoryTools.length > 0) {
      setSelectedTool1(categoryTools[0])
      setSelectedTool2(null)
    }
  }

  const buttonClasses = variant === 'header' 
    ? 'text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors'
    : 'text-gray-300 hover:text-white transition-colors'

  return (
    <>
      <button
        onClick={() => setShowCompareModal(true)}
        className={`${buttonClasses} ${className}`}
      >
        Compare Tools
      </button>

      {/* Compare Modal */}
      {showCompareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Compare AI Tools</h2>
                <button
                  onClick={() => setShowCompareModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {loading && (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-2 text-gray-600">Loading tools...</p>
                </div>
              )}

              {error && (
                <div className="text-center py-8">
                  <p className="text-red-600">{error}</p>
                </div>
              )}

              {!loading && !error && (
                <>
                  {/* Category Selection */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Category
                    </label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => handleCategoryChange(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Choose a category...</option>
                      {categories.map((category) => {
                        const categoryToolCount = tools.filter(tool => tool.category_id === category.id).length
                        return (
                          <option key={category.id} value={category.id}>
                            {category.name} ({categoryToolCount} tools)
                          </option>
                        )
                      })}
                    </select>
                  </div>

                  {selectedCategory && filteredTools.length > 1 && (
                    <>
                      {/* Tool Selection */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        {/* Tool 1 Selection */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            First Tool
                          </label>
                          <div className="border border-gray-300 rounded-md p-3">
                            {selectedTool1 ? (
                              <div className="flex items-center space-x-3">
                                {selectedTool1.image_url && (
                                  <Image
                                    src={selectedTool1.image_url}
                                    alt={selectedTool1.name}
                                    width={40}
                                    height={40}
                                    className="rounded"
                                  />
                                )}
                                <div>
                                  <p className="font-medium text-gray-900">{selectedTool1.name}</p>
                                  <p className="text-sm text-gray-600">{selectedTool1.short_description}</p>
                                </div>
                              </div>
                            ) : (
                              <p className="text-gray-500">Select a tool</p>
                            )}
                          </div>
                          <div className="mt-2 max-h-32 overflow-y-auto border border-gray-200 rounded-md">
                            {filteredTools.map((tool) => (
                              <button
                                key={tool.id}
                                onClick={() => {
                                  setSelectedTool1(tool)
                                  if (selectedTool2?.id === tool.id) {
                                    setSelectedTool2(null)
                                  }
                                }}
                                className={`w-full p-2 text-left hover:bg-blue-50 flex items-center space-x-2 ${
                                  selectedTool1?.id === tool.id ? 'bg-blue-100' : ''
                                }`}
                              >
                                {tool.image_url && (
                                  <Image
                                    src={tool.image_url}
                                    alt={tool.name}
                                    width={24}
                                    height={24}
                                    className="rounded"
                                  />
                                )}
                                <span className="text-sm">{tool.name}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Tool 2 Selection */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Second Tool
                          </label>
                          <div className="border border-gray-300 rounded-md p-3">
                            {selectedTool2 ? (
                              <div className="flex items-center space-x-3">
                                {selectedTool2.image_url && (
                                  <Image
                                    src={selectedTool2.image_url}
                                    alt={selectedTool2.name}
                                    width={40}
                                    height={40}
                                    className="rounded"
                                  />
                                )}
                                <div>
                                  <p className="font-medium text-gray-900">{selectedTool2.name}</p>
                                  <p className="text-sm text-gray-600">{selectedTool2.short_description}</p>
                                </div>
                              </div>
                            ) : (
                              <p className="text-gray-500">Select a second tool</p>
                            )}
                          </div>
                          <div className="mt-2 max-h-32 overflow-y-auto border border-gray-200 rounded-md">
                            {availableToolsForSecondSelection.map((tool) => (
                              <button
                                key={tool.id}
                                onClick={() => setSelectedTool2(tool)}
                                className={`w-full p-2 text-left hover:bg-blue-50 flex items-center space-x-2 ${
                                  selectedTool2?.id === tool.id ? 'bg-blue-100' : ''
                                }`}
                              >
                                {tool.image_url && (
                                  <Image
                                    src={tool.image_url}
                                    alt={tool.name}
                                    width={24}
                                    height={24}
                                    className="rounded"
                                  />
                                )}
                                <span className="text-sm">{tool.name}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Compare Button */}
                      <div className="flex justify-end space-x-3">
                        <button
                          onClick={() => setShowCompareModal(false)}
                          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleCompare}
                          disabled={!selectedTool1 || !selectedTool2}
                          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Compare Tools
                        </button>
                      </div>
                    </>
                  )}

                  {selectedCategory && filteredTools.length <= 1 && (
                    <div className="text-center py-8">
                      <p className="text-gray-600">This category needs at least 2 tools for comparison.</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
