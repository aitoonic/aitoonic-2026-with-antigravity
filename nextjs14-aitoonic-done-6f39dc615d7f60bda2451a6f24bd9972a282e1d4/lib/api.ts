import { supabase } from '@/lib/supabase'
import { Tool, Category, ToolWithCategory } from '@/lib/types'

// Categories Cache with TypeScript type
let categoriesCache: {
  timestamp: number;
  data: Category[];
} | null = null;

const CACHE_TTL = 5 * 60 * 1000; // 5 minutes cache TTL

// Simple caches
const toolBySlugCache = new Map<string, { timestamp: number; data: Tool | null }>()
const similarToolsCache = new Map<string, { timestamp: number; data: Tool[] }>()

function isFresh(ts: number) {
  return Date.now() - ts < CACHE_TTL
}

// Categories API
export async function getCategories(): Promise<Category[]> {
  try {
    const now = Date.now();

    // Return cached data if it exists and is still valid
    if (categoriesCache && (now - categoriesCache.timestamp < CACHE_TTL)) {
      console.log('Returning categories from cache');
      return categoriesCache.data;
    }

    console.log('Fetching categories from Supabase...');

    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    if (!data || data.length === 0) {
      console.warn('No categories found in the database');
      return [];
    }

    console.log(`Successfully fetched ${data.length} categories`);

    // Update cache
    categoriesCache = {
      timestamp: now,
      data: data
    };

    return data;
  } catch (error) {
    console.error('Error in getCategories:', error);
    return [];
  }
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('slug', slug)
      .maybeSingle()

    if (error) {
      console.error('Error fetching category by slug:', slug, error)
      return null
    }

    console.log(`getCategoryBySlug: Found category for slug '${slug}':`, data?.name || 'null')
    return data
  } catch (err) {
    console.error('getCategoryBySlug exception:', err)
    return null
  }
}

export async function getCategoryById(id: string): Promise<Category | null> {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('id', id)
      .maybeSingle()

    if (error) {
      console.error('Error fetching category by id:', id, error)
      return null
    }

    return data
  } catch (err) {
    console.error('getCategoryById exception:', err)
    return null
  }
}

// Tools API
export async function getTools(limit?: number): Promise<Tool[]> {
  try {
    let query = supabase
      .from('tools')
      .select('*')
      .order('published_at', { ascending: false })

    if (limit) {
      query = query.limit(limit)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching tools:', error)
      return []
    }

    return data || []
  } catch (err) {
    console.error('Exception in getTools:', err)
    return []
  }
}

export async function getToolBySlug(slug: string): Promise<Tool | null> {
  try {
    const cached = toolBySlugCache.get(slug)
    if (cached && isFresh(cached.timestamp)) return cached.data

    const { data, error } = await supabase
      .from('tools')
      .select('*')
      .eq('slug', slug)
      .maybeSingle()

    if (error) {
      console.error('Error fetching tool by slug:', slug, error)
      return null
    }

    toolBySlugCache.set(slug, { timestamp: Date.now(), data })
    return data
  } catch (err) {
    console.error('Exception in getToolBySlug:', slug, err)
    return null
  }
}

export async function getToolsByCategory(categoryId: string, limit?: number): Promise<Tool[]> {
  try {
    let query = supabase
      .from('tools')
      .select('*')
      .eq('category_id', categoryId)
      .order('published_at', { ascending: false })

    if (limit) {
      query = query.limit(limit)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching tools by category:', categoryId, error)
      return []
    }

    return data || []
  } catch (err) {
    console.error('Exception in getToolsByCategory:', categoryId, err)
    return []
  }
}

export async function getToolsByCategorySlug(categorySlug: string, limit?: number): Promise<Tool[]> {
  // First get the category
  const category = await getCategoryBySlug(categorySlug)
  if (!category) {
    return []
  }

  return getToolsByCategory(category.id, limit)
}

export async function getFeaturedTools(limit: number = 8): Promise<Tool[]> {
  const { data, error } = await supabase
    .from('tools')
    .select('*')
    .eq('featured', true)
    .order('published_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching featured tools:', error)
    throw new Error('Failed to fetch featured tools')
  }

  return data || []
}

export async function getRecentTools(days: number = 7, limit: number = 10): Promise<Tool[]> {
  const cutoffDate = new Date()
  cutoffDate.setDate(cutoffDate.getDate() - days)
  const cutoffISO = cutoffDate.toISOString()

  const { data, error } = await supabase
    .from('tools')
    .select('*')
    .gte('published_at', cutoffISO)
    .order('published_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching recent tools:', error)
    throw new Error('Failed to fetch recent tools')
  }

  return data || []
}

export async function getTodaysTools(): Promise<Tool[]> {
  const today = new Date()
  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate())
  const todayEnd = new Date(todayStart.getTime() + 24 * 60 * 60 * 1000 - 1)

  const { data, error } = await supabase
    .from('tools')
    .select('*')
    .gte('published_at', todayStart.toISOString())
    .lte('published_at', todayEnd.toISOString())
    .order('published_at', { ascending: false })

  if (error) {
    console.error('Error fetching today\'s tools:', error)
    throw new Error('Failed to fetch today\'s tools')
  }

  return data || []
}

export async function getPopularTools(limit: number = 50): Promise<Tool[]> {
  // Get tools from last 7 days and order by rating if available, otherwise by created date
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

  const { data, error } = await supabase
    .from('tools')
    .select('*')
    .gte('published_at', sevenDaysAgo.toISOString())
    .order('rating', { ascending: false, nullsFirst: false })
    .order('published_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching popular tools:', error)
    throw new Error('Failed to fetch popular tools')
  }

  return data || []
}

export async function searchTools(query: string, categoryId?: string): Promise<Tool[]> {
  let queryBuilder = supabase
    .from('tools')
    .select('*')

  if (categoryId) {
    queryBuilder = queryBuilder.eq('category_id', categoryId)
  }

  if (query) {
    queryBuilder = queryBuilder.or(`name.ilike.%${query}%,description.ilike.%${query}%,seo_title.ilike.%${query}%`)
  }

  const { data, error } = await queryBuilder
    .order('published_at', { ascending: false })

  if (error) {
    console.error('Error searching tools:', error)
    throw new Error('Failed to search tools')
  }

  return data || []
}

export async function getSimilarTools(categoryId: string, excludeToolId: string, limit: number = 6): Promise<Tool[]> {
  try {
    const key = `${categoryId}:${excludeToolId}:${limit}`
    const cached = similarToolsCache.get(key)
    if (cached && isFresh(cached.timestamp)) return cached.data

    const { data, error } = await supabase
      .from('tools')
      .select('*')
      .eq('category_id', categoryId)
      .neq('id', excludeToolId)
      .order('published_at', { ascending: false })
      .limit(limit)

    if (error) {
      console.error('Error fetching similar tools:', error)
      return []
    }

    console.log(`getSimilarTools: Found ${data?.length || 0} similar tools for category ${categoryId}`)
    const result = data || []
    similarToolsCache.set(key, { timestamp: Date.now(), data: result })
    return result
  } catch (err) {
    console.error('getSimilarTools exception:', err)
    return []
  }
}

export async function getToolsForComparison(tool1Slug: string, tool2Slug: string): Promise<{ tool1: Tool | null, tool2: Tool | null }> {
  console.log('getToolsForComparison called with:', { tool1Slug, tool2Slug })

  // First try exact slug match
  const [tool1Result, tool2Result] = await Promise.all([
    getToolBySlug(tool1Slug),
    getToolBySlug(tool2Slug)
  ])

  console.log('Direct slug lookup results:', {
    tool1Found: tool1Result?.name,
    tool2Found: tool2Result?.name
  })

  // If direct slug lookup fails, try finding by generated slug
  let tool1 = tool1Result
  let tool2 = tool2Result

  if (!tool1 || !tool2) {
    console.log('Some tools not found by direct slug, trying generated slug approach...')

    // Get all tools and try to match by generated slug
    const allTools = await getTools()

    if (!tool1) {
      tool1 = allTools.find(tool => {
        const generatedSlug = tool.slug || tool.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
        return generatedSlug === tool1Slug
      }) || null
      console.log('Tool1 found by generated slug:', tool1?.name)
    }

    if (!tool2) {
      tool2 = allTools.find(tool => {
        const generatedSlug = tool.slug || tool.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
        return generatedSlug === tool2Slug
      }) || null
      console.log('Tool2 found by generated slug:', tool2?.name)
    }
  }

  console.log('Final tools found:', { tool1: tool1?.name, tool2: tool2?.name })

  return {
    tool1,
    tool2
  }
}

export async function getToolsWithCategories(): Promise<ToolWithCategory[]> {
  const tools = await getTools()
  const categories = await getCategories()

  const categoriesMap = new Map(categories.map(cat => [cat.id, cat]))

  return tools.map(tool => ({
    ...tool,
    category: categoriesMap.get(tool.category_id)
  }))
}

export async function getCategoriesWithToolCount(): Promise<(Category & { tools_count: number })[]> {
  const categories = await getCategories()

  const categoriesWithCount = await Promise.all(
    categories.map(async (category) => {
      const tools = await getToolsByCategory(category.id)
      return {
        ...category,
        tools_count: tools.length
      }
    })
  )

  return categoriesWithCount
}

export async function getToolsCount(): Promise<number> {
  try {
    const { count, error } = await supabase
      .from('tools')
      .select('*', { count: 'exact', head: true })

    if (error) {
      console.error('Error counting tools:', error)
      return 0
    }

    return count || 0
  } catch (err) {
    console.error('Exception in getToolsCount:', err)
    return 0
  }
}

export async function getComparisonsByCategory(categoryId: string): Promise<{ slug: string, title: string, tool1: Tool, tool2: Tool }[]> {
  try {
    const tools = await getToolsByCategory(categoryId)

    if (tools.length < 2) {
      return []
    }

    const comparisons: { slug: string, title: string, tool1: Tool, tool2: Tool }[] = []

    // Generate unique pairs
    for (let i = 0; i < tools.length; i++) {
      for (let j = i + 1; j < tools.length; j++) {
        const tool1 = tools[i]
        const tool2 = tools[j]

        const tool1Slug = tool1.slug || tool1.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
        const tool2Slug = tool2.slug || tool2.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')

        // Create both directions for better discovery? 
        // The user said "list all other compare pages". 
        // Usually A vs B and B vs A are the same page or redirect.
        // The sitemap generator creates both: `${aSlug}-vs-${bSlug}` and `${bSlug}-vs-${aSlug}`
        // But let's stick to one unique pair per combination to avoid clutter, or maybe both if that's the pattern.
        // The sitemap generator does:
        // const pairs = [`${aSlug}-vs-${bSlug}`, `${bSlug}-vs-${aSlug}`]
        // So both exist.
        // However, listing BOTH A vs B and B vs A in the "Similar Comparisons" list might be redundant if they show the same content.
        // But if they are distinct pages (or even if they are the same), usually you just want one link per pair in a "See also" section.
        // Let's generate just one canonical pair for the list to keep it clean, or maybe both if the user wants "perfect silo structure".
        // The user said: "If the current page is a comparison like X vs Y... display a list of all the other compare pages from the Image category."
        // If I have tools A, B, C.
        // Comparisons: A vs B, A vs C, B vs C.
        // If I am on A vs B.
        // I should see: A vs C, B vs C. (And maybe C vs A, C vs B?)
        // Let's stick to generating one pair (i vs j) to avoid duplicates like "A vs C" and "C vs A" appearing together, which looks messy.

        const comparisonSlug = `${tool1Slug}-vs-${tool2Slug}`

        comparisons.push({
          slug: comparisonSlug,
          title: `${tool1.name} vs ${tool2.name}`,
          tool1,
          tool2
        })
      }
    }

    return comparisons
  } catch (error) {
    console.error('Error fetching comparisons by category:', error)
    return []
  }
}
