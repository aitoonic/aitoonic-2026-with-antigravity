'use server'

import {
    getCategoriesQuery,
    getCategoryBySlugQuery,
    getCategoryByIdQuery,
    getToolsQuery,
    getToolBySlugQuery,
    getToolsByCategoryQuery,
    getToolsByCategorySlugQuery,
    getFeaturedToolsQuery,
    getRecentToolsQuery,
    getTodaysToolsQuery,
    getPopularToolsQuery,
    searchToolsQuery,
    getSimilarToolsQuery,
    getToolsForComparisonQuery,
    getToolsWithCategoriesQuery,
    getCategoriesWithToolCountQuery,
    getToolsCountQuery,
    getComparisonsByCategoryQuery
} from '../db/queries'

export async function getCategories() {
    return getCategoriesQuery()
}

export async function getCategoryBySlug(slug: string) {
    return getCategoryBySlugQuery(slug)
}

export async function getCategoryById(id: string) {
    return getCategoryByIdQuery(id)
}

export async function getTools(limit?: number) {
    return getToolsQuery(limit)
}

export async function getToolBySlug(slug: string) {
    return getToolBySlugQuery(slug)
}

export async function getToolsByCategory(categoryId: string, limit?: number) {
    return getToolsByCategoryQuery(categoryId, limit)
}

export async function getToolsByCategorySlug(categorySlug: string, limit?: number) {
    return getToolsByCategorySlugQuery(categorySlug, limit)
}

export async function getFeaturedTools(limit: number = 8) {
    return getFeaturedToolsQuery(limit)
}

export async function getRecentTools(days: number = 7, limit: number = 10) {
    return getRecentToolsQuery(days, limit)
}

export async function getTodaysTools() {
    return getTodaysToolsQuery()
}

export async function getPopularTools(limit: number = 50) {
    return getPopularToolsQuery(limit)
}

export async function searchTools(query: string, categoryId?: string) {
    return searchToolsQuery(query, categoryId)
}

export async function getSimilarTools(categoryId: string, excludeToolId: string, limit: number = 6) {
    return getSimilarToolsQuery(categoryId, excludeToolId, limit)
}

export async function getToolsForComparison(tool1Slug: string, tool2Slug: string) {
    return getToolsForComparisonQuery(tool1Slug, tool2Slug)
}

export async function getToolsWithCategories() {
    return getToolsWithCategoriesQuery()
}

export async function getCategoriesWithToolCount() {
    return getCategoriesWithToolCountQuery()
}

export async function getToolsCount() {
    return getToolsCountQuery()
}

export async function getComparisonsByCategory(categoryId: string) {
    return getComparisonsByCategoryQuery(categoryId)
}
