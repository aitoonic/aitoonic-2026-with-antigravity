import { createClient } from '@/utils/supabase/server'
import { Tool, Category, ToolWithCategory } from '@/lib/types'

// Categories Cache with TypeScript type
// Note: In serverless, this cache is per-instance. 
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
export async function getCategoriesQuery(): Promise<Category[]> {
    try {
        const now = Date.now();

        // Return cached data if it exists and is still valid
        if (categoriesCache && (now - categoriesCache.timestamp < CACHE_TTL)) {
            console.log('Returning categories from cache');
            return categoriesCache.data;
        }

        // console.log('Fetching categories from Supabase (Server)...');
        const supabase = createClient();
        const { data, error } = await supabase
            .from('categories')
            .select('id, name, slug, description, icon, image_url')
            .order('name', { ascending: true });

        if (error) {
            console.error('Supabase error:', error);
            throw error;
        }

        if (!data || data.length === 0) {
            console.warn('No categories found in the database');
            return [];
        }

        // console.log(`Successfully fetched ${data.length} categories`);

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

export async function getCategoryBySlugQuery(slug: string): Promise<Category | null> {
    try {
        const supabase = createClient();
        const { data, error } = await supabase
            .from('categories')
            .select('*')
            .eq('slug', slug)
            .maybeSingle()

        if (error) {
            console.error('Error fetching category by slug:', slug, error)
            return null
        }

        return data
    } catch (err) {
        console.error('getCategoryBySlug exception:', err)
        return null
    }
}

export async function getCategoryByIdQuery(id: string): Promise<Category | null> {
    try {
        const supabase = createClient();
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
export async function getToolsQuery(limit?: number): Promise<Tool[]> {
    try {
        const supabase = createClient();
        let query = supabase
            .from('tools')
            .select('id, name, slug, short_description, image_url, pricing, website_url, category_id, featured, rating, published_at')
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

export async function getToolBySlugQuery(slug: string): Promise<Tool | null> {
    try {
        const cached = toolBySlugCache.get(slug)
        if (cached && isFresh(cached.timestamp)) return cached.data

        const supabase = createClient();
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

export async function getToolsByCategoryQuery(categoryId: string, limit?: number): Promise<Tool[]> {
    try {
        const supabase = createClient();
        let query = supabase
            .from('tools')
            .select('id, name, slug, short_description, image_url, pricing, website_url, category_id, featured, rating, published_at')
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

export async function getToolsByCategorySlugQuery(categorySlug: string, limit?: number): Promise<Tool[]> {
    // First get the category
    const category = await getCategoryBySlugQuery(categorySlug)
    if (!category) {
        return []
    }

    return getToolsByCategoryQuery(category.id, limit)
}

export async function getFeaturedToolsQuery(limit: number = 8): Promise<Tool[]> {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('tools')
        .select('id, name, slug, short_description, image_url, pricing, website_url, category_id, featured, rating, published_at')
        .eq('featured', true)
        .order('published_at', { ascending: false })
        .limit(limit)

    if (error) {
        console.error('Error fetching featured tools:', error)
        throw new Error('Failed to fetch featured tools')
    }

    return data || []
}

export async function getRecentToolsQuery(days: number = 7, limit: number = 10): Promise<Tool[]> {
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - days)
    const cutoffISO = cutoffDate.toISOString()

    const supabase = createClient();
    const { data, error } = await supabase
        .from('tools')
        .select('id, name, slug, short_description, image_url, pricing, website_url, category_id, featured, rating, published_at')
        .gte('published_at', cutoffISO)
        .order('published_at', { ascending: false })
        .limit(limit)

    if (error) {
        console.error('Error fetching recent tools:', error)
        throw new Error('Failed to fetch recent tools')
    }

    return data || []
}

export async function getTodaysToolsQuery(): Promise<Tool[]> {
    const today = new Date()
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    const todayEnd = new Date(todayStart.getTime() + 24 * 60 * 60 * 1000 - 1)

    const supabase = createClient();
    const { data, error } = await supabase
        .from('tools')
        .select('id, name, slug, short_description, image_url, pricing, website_url, category_id, featured, rating, published_at')
        .gte('published_at', todayStart.toISOString())
        .lte('published_at', todayEnd.toISOString())
        .order('published_at', { ascending: false })

    if (error) {
        console.error('Error fetching today\'s tools:', error)
        throw new Error('Failed to fetch today\'s tools')
    }

    return data || []
}

export async function getPopularToolsQuery(limit: number = 50): Promise<Tool[]> {
    // Get tools from last 7 days and order by rating if available, otherwise by created date
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    const supabase = createClient();
    const { data, error } = await supabase
        .from('tools')
        .select('id, name, slug, short_description, image_url, pricing, website_url, category_id, featured, rating, published_at')
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

export async function searchToolsQuery(query: string, categoryId?: string): Promise<Tool[]> {
    const supabase = createClient();
    let queryBuilder = supabase
        .from('tools')
        .select('id, name, slug, short_description, image_url, pricing, website_url, category_id, featured, rating, published_at')

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

export async function getSimilarToolsQuery(categoryId: string, excludeToolId: string, limit: number = 6): Promise<Tool[]> {
    try {
        const key = `${categoryId}:${excludeToolId}:${limit}`
        const cached = similarToolsCache.get(key)
        if (cached && isFresh(cached.timestamp)) return cached.data

        const supabase = createClient();
        const { data, error } = await supabase
            .from('tools')
            .select('id, name, slug, short_description, image_url, pricing, website_url, category_id, featured, rating, published_at')
            .eq('category_id', categoryId)
            .neq('id', excludeToolId)
            .order('published_at', { ascending: false })
            .limit(limit)

        if (error) {
            console.error('Error fetching similar tools:', error)
            return []
        }

        // console.log(`getSimilarTools: Found ${data?.length || 0} similar tools for category ${categoryId}`)
        const result = data || []
        similarToolsCache.set(key, { timestamp: Date.now(), data: result })
        return result
    } catch (err) {
        console.error('getSimilarTools exception:', err)
        return []
    }
}

export async function getToolsForComparisonQuery(tool1Slug: string, tool2Slug: string): Promise<{ tool1: Tool | null, tool2: Tool | null }> {
    // console.log('getToolsForComparison called with:', { tool1Slug, tool2Slug })

    // First try exact slug match
    const [tool1Result, tool2Result] = await Promise.all([
        getToolBySlugQuery(tool1Slug),
        getToolBySlugQuery(tool2Slug)
    ])

    let tool1 = tool1Result
    let tool2 = tool2Result

    if (!tool1 || !tool2) {
        // console.log('Some tools not found by direct slug, trying generated slug approach...')
        const allTools = await getToolsQuery()

        if (!tool1) {
            tool1 = allTools.find(tool => {
                const generatedSlug = tool.slug || tool.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
                return generatedSlug === tool1Slug
            }) || null
        }

        if (!tool2) {
            tool2 = allTools.find(tool => {
                const generatedSlug = tool.slug || tool.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
                return generatedSlug === tool2Slug
            }) || null
        }
    }

    return {
        tool1,
        tool2
    }
}

export async function getToolsWithCategoriesQuery(): Promise<ToolWithCategory[]> {
    const tools = await getToolsQuery()
    const categories = await getCategoriesQuery()

    const categoriesMap = new Map(categories.map(cat => [cat.id, cat]))

    return tools.map(tool => ({
        ...tool,
        category: categoriesMap.get(tool.category_id)
    }))
}

export async function getCategoriesWithToolCountQuery(): Promise<(Category & { tools_count: number })[]> {
    const categories = await getCategoriesQuery()

    const categoriesWithCount = await Promise.all(
        categories.map(async (category) => {
            // Potentially inefficient - N+1 query.
            // Optimization: GroupBy in SQL. But keeping existing logic logic for now.
            const supabase = createClient();
            const { count } = await supabase
                .from('tools')
                .select('*', { count: 'exact', head: true })
                .eq('category_id', category.id);

            return {
                ...category,
                tools_count: count || 0
            }
        })
    )

    return categoriesWithCount
}

export async function getToolsCountQuery(): Promise<number> {
    try {
        const supabase = createClient();
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

export async function getComparisonsByCategoryQuery(categoryId: string): Promise<{ slug: string, title: string, tool1: Tool, tool2: Tool }[]> {
    try {
        const tools = await getToolsByCategoryQuery(categoryId)

        if (tools.length < 2) {
            return []
        }

        const comparisons: { slug: string, title: string, tool1: Tool, tool2: Tool }[] = []

        for (let i = 0; i < tools.length; i++) {
            for (let j = i + 1; j < tools.length; j++) {
                const tool1 = tools[i]
                const tool2 = tools[j]

                const tool1Slug = tool1.slug || tool1.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
                const tool2Slug = tool2.slug || tool2.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')

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
