'use client'

import { useState, useEffect } from 'react'
import { Tool, Category } from '@/lib/types'
import {
  getCategories,
  getTools,
  getToolsByCategory,
  getToolsByCategorySlug,
  getFeaturedTools,
  getRecentTools,
  getTodaysTools,
  getPopularTools,
  searchTools,
  getCategoriesWithToolCount
} from '@/lib/api'

interface UseDataResult<T> {
  data: T | null
  loading: boolean
  error: string | null
  refetch: () => void
}

export function useCategories(enabled: boolean = true): UseDataResult<Category[]> {
  const [data, setData] = useState<Category[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)

      // Add timeout race
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Request timed out')), 8000)
      )

      const result = await Promise.race([
        getCategories(),
        timeoutPromise
      ]) as Category[]

      setData(result)
    } catch (err) {
      console.error('useCategories error:', err)
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (enabled) fetchData()
  }, [enabled])

  return { data, loading, error, refetch: fetchData }
}

export function useCategoriesWithCount(): UseDataResult<(Category & { tools_count: number })[]> {
  const [data, setData] = useState<(Category & { tools_count: number })[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      const result = await getCategoriesWithToolCount()
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return { data, loading, error, refetch: fetchData }
}

export function useTools(limit?: number): UseDataResult<Tool[]> {
  const [data, setData] = useState<Tool[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      const result = await getTools(limit)
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [limit])

  return { data, loading, error, refetch: fetchData }
}

export function useToolsByCategory(categoryId: string, limit?: number): UseDataResult<Tool[]> {
  const [data, setData] = useState<Tool[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      const result = await getToolsByCategory(categoryId, limit)
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (categoryId) {
      fetchData()
    }
  }, [categoryId, limit])

  return { data, loading, error, refetch: fetchData }
}

export function useToolsByCategorySlug(categorySlug: string, limit?: number): UseDataResult<Tool[]> {
  const [data, setData] = useState<Tool[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      const result = await getToolsByCategorySlug(categorySlug, limit)
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (categorySlug) {
      fetchData()
    }
  }, [categorySlug, limit])

  return { data, loading, error, refetch: fetchData }
}

export function useFeaturedTools(limit: number = 8): UseDataResult<Tool[]> {
  const [data, setData] = useState<Tool[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      const result = await getFeaturedTools(limit)
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [limit])

  return { data, loading, error, refetch: fetchData }
}

export function useFilteredTools(filterType: 'today' | 'new' | 'popular'): UseDataResult<Tool[]> {
  const [data, setData] = useState<Tool[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      let result: Tool[]

      switch (filterType) {
        case 'today':
          result = await getTodaysTools()
          break
        case 'new':
          result = await getRecentTools(7, 50)
          break
        case 'popular':
          result = await getPopularTools(50)
          break
        default:
          result = []
      }

      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [filterType])

  return { data, loading, error, refetch: fetchData }
}

export function useSearch() {
  const [data, setData] = useState<Tool[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const search = async (query: string, categoryId?: string) => {
    if (!query.trim()) {
      setData([])
      return
    }

    try {
      setLoading(true)
      setError(null)
      const result = await searchTools(query, categoryId)
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setData([])
    } finally {
      setLoading(false)
    }
  }

  const clear = () => {
    setData([])
    setError(null)
  }

  return { data, loading, error, search, clear }
}
