'use client'

import { useState, useRef } from 'react'
import { useCategories } from '@/hooks/useData'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'

interface SearchBarProps {
  onSearch: (query: string, categoryId?: string) => void
  placeholder?: string
  showCategoryFilter?: boolean
}

export default function SearchBar({ 
  onSearch, 
  placeholder = "Search AI tools...", 
  showCategoryFilter = true 
}: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [enableAutocomplete, setEnableAutocomplete] = useState(false)
  const inputRef = useRef<HTMLInputElement | null>(null)

  // Defer categories fetch by gating the hook behind the prop
  const { data: categories } = useCategories(showCategoryFilter)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(query, selectedCategory || undefined)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    if (!enableAutocomplete && value.length === 1) setEnableAutocomplete(true)
    // Real-time search as user types
    if (value.length >= 2 || value.length === 0) {
      onSearch(value, selectedCategory || undefined)
    }
  }

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const categoryId = e.target.value
    setSelectedCategory(categoryId)
    onSearch(query, categoryId || undefined)
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg 
              className="h-5 w-5 text-muted-foreground" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
              />
            </svg>
          </div>
          <Input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder={placeholder}
            className="pl-10"
            aria-label="Search AI tools"
          />
          {enableAutocomplete && query.length > 0 && (
            <div className="absolute z-10 mt-1 w-full bg-card border border-border rounded-md shadow-sm overflow-hidden">
              <Button
                type="button"
                className="w-full text-left px-3 py-2 text-sm hover:bg-secondary text-foreground"
                onClick={() => { onSearch(query, selectedCategory || undefined) }}
                aria-label={`Search for ${query}`}
              >
                Search “{query}”
              </Button>
            </div>
          )}
        </div>
        
        {showCategoryFilter && categories && categories.length > 0 && (
          <div className="sm:w-48">
            <Select
              value={selectedCategory}
              onChange={handleCategoryChange}
              aria-label="Filter by category"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Select>
          </div>
        )}
        
        <Button type="submit" className="px-6">
          Search
        </Button>
      </form>
    </div>
  )
}
