// This file now acts as a facade for Server Actions.
// This allows Client Components to import from here without breaking the "no server import" rule 
// (because this file imports from a 'use server' file, which is allowed).

export {
  getCategories,
  getCategoryBySlug,
  getCategoryById,
  getTools,
  getToolBySlug,
  getToolsByCategory,
  getToolsByCategorySlug,
  getFeaturedTools,
  getRecentTools,
  getTodaysTools,
  getPopularTools,
  searchTools,
  getSimilarTools,
  getToolsForComparison,
  getToolsWithCategories,
  getCategoriesWithToolCount,
  getToolsCount,
  getComparisonsByCategory
} from '@/lib/server/actions/data'
