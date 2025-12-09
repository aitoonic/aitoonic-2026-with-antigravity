import { Category } from '@/lib/types'
import { generateCategoryContent } from './gemini'

// Clear cache when content needs to be regenerated
let contentCache: Record<string, any> = {}

export function clearContentCache() {
  contentCache = {}
}

export async function generateCategoryIntro(categoryName: string): Promise<string> {
  if (!contentCache[categoryName]) {
    contentCache[categoryName] = await generateCategoryContent(categoryName)
  }
  return contentCache[categoryName].intro
}

export async function generateCoreFeatures(categoryName: string): Promise<Array<{ title: string; description: string }>> {
  if (!contentCache[categoryName]) {
    contentCache[categoryName] = await generateCategoryContent(categoryName)
  }
  return contentCache[categoryName].coreFeatures
}

export async function generateCategoryQuestions(categoryName: string): Promise<Array<{ q: string; a: string }>> {
  if (!contentCache[categoryName]) {
    contentCache[categoryName] = await generateCategoryContent(categoryName)
  }
  return contentCache[categoryName].questions
}

export async function generateCategoryFaq(categoryName: string): Promise<Array<{ q: string; a: string }>> {
  if (!contentCache[categoryName]) {
    contentCache[categoryName] = await generateCategoryContent(categoryName)
  }
  return contentCache[categoryName].faq
}

export function selectSimilarCategories(current: Category, all: Category[], limit = 12): Category[] {
  const others = all.filter(c => c.id !== current.id)
  // naive similarity: prioritize same first word or overlapping tokens
  const tokens = current.name.toLowerCase().split(/\s|-/).filter(Boolean)
  const scored = others.map(c => {
    const ct = c.name.toLowerCase().split(/\s|-/).filter(Boolean)
    const score = ct.reduce((s, t) => (tokens.includes(t) ? s + 1 : s), 0)
    return { c, score }
  })
  scored.sort((a, b) => b.score - a.score)
  return scored.slice(0, limit).map(s => s.c)
}


