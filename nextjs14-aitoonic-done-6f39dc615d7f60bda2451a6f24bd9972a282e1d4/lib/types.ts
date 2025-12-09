export interface Tool {
  id: string
  slug?: string
  name: string
  description: string
  url?: string
  category_id: string
  created_at?: string
  updated_at?: string
  published_at?: string
  features?: Array<{
    title: string
    description: string
  }>
  useCases?: Array<{
    title: string
    description: string
  }>
  pricing?: Array<{
    plan: string
    price: string
    features: string[]
  }>
  image_url?: string
  image_alt?: string
  seo_title?: string
  seo_description?: string
  rating?: number
  featured?: boolean
  how_to_use?: string
  content_type?: string
  short_description?: string
}

export interface Category {
  id: string
  slug: string
  name: string
  description?: string
  created_at?: string
  updated_at?: string
  seo_title?: string
  seo_description?: string
  icon?: string
  image_url?: string
  tools_count?: number
}

export interface ToolWithCategory extends Tool {
  category?: Category
}

export interface SearchFilters {
  query?: string
  category?: string
  pricing?: string
  sortBy?: 'name' | 'created_at' | 'views' | 'rating'
  sortOrder?: 'asc' | 'desc'
}
