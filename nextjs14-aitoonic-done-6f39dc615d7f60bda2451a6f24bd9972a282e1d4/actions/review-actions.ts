'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export type ReviewWithUser = {
    id: string
    rating: number
    comment: string | null
    created_at: string
    user_id: string
    user: {
        full_name: string | null
        avatar_url: string | null
    } | null
}

export type ReviewStats = {
    average: number
    total: number
    counts: { [key: number]: number }
}

export async function submitReview(toolId: string, rating: number, comment: string, path: string) {
    const supabase = createClient()

    // 1. Auth check
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        return { error: 'You must be logged in to review.' }
    }

    // 2. Validation
    if (rating < 1 || rating > 5) {
        return { error: 'Rating must be between 1 and 5.' }
    }

    if (comment && comment.length > 1000) {
        return { error: 'Comment must be less than 1000 characters.' }
    }

    // Check for links in comment
    const linkRegex = /(https?:\/\/[^\s]+)|(www\.[^\s]+)|(\.com|\.org|\.net|\.io)/i
    if (comment && linkRegex.test(comment)) {
        return { error: 'Links are not allowed in reviews.' }
    }

    // 3. Upsert review
    const { error } = await supabase
        .from('reviews')
        .upsert({
            user_id: user.id,
            tool_id: toolId,
            rating,
            comment: comment.trim(),
            updated_at: new Date().toISOString()
        }, {
            onConflict: 'user_id, tool_id'
        })

    // 4. Recalculate and update tool rating cache
    const { data: toolReviews, error: statsError } = await supabase
        .from('reviews')
        .select('rating')
        .eq('tool_id', toolId)

    if (!statsError && toolReviews) {
        const total = toolReviews.length
        const sum = toolReviews.reduce((a, b: any) => a + b.rating, 0)
        const newAverage = total > 0 ? Number((sum / total).toFixed(1)) : null

        // Update the tool's cached rating
        await supabase
            .from('tools')
            .update({ rating: newAverage })
            .eq('id', toolId)
    }

    if (error) {
        console.error('Error submitting review:', error)
        return { error: 'Failed to submit review. Please try again.' }
    }

    // Revalidate the specific page where the review was submitted
    if (path) {
        revalidatePath(path)
        // Also revalidate the home page or listing pages if possible, 
        // but explicit paths are safer. Use a tag if we had one.
        revalidatePath('/')
    }

    return { success: true }
}

export async function getToolReviews(toolId: string): Promise<{ reviews: ReviewWithUser[], stats: ReviewStats }> {
    const supabase = createClient()

    // We explicitly select profiles referenced by user_id
    const { data: reviewsData, error } = await supabase
        .from('reviews')
        .select(`
      id,
      rating,
      comment,
      created_at,
      user_id,
      profiles:user_id (
        full_name,
        avatar_url
      )
    `)
        .eq('tool_id', toolId)
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching reviews:', error)
        return {
            reviews: [],
            stats: { average: 0, total: 0, counts: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 } }
        }
    }

    // Map the data
    const reviews = (reviewsData || []).map((r: any) => ({
        id: r.id,
        rating: r.rating,
        comment: r.comment,
        created_at: r.created_at,
        user_id: r.user_id,
        user: r.profiles
    }))

    const total = reviews.length
    const sum = reviews.reduce((acc: number, r: any) => acc + r.rating, 0)
    const average = total > 0 ? Number((sum / total).toFixed(1)) : 0

    const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 } as any
    reviews.forEach((r: any) => {
        if (counts[r.rating] !== undefined) counts[r.rating]++
    })

    return {
        reviews,
        stats: { average, total, counts }
    }
}

export async function getUserReviews(userId: string) {
    const supabase = createClient()

    const { data, error } = await supabase
        .from('reviews')
        .select(`
      id,
      rating,
      comment,
      created_at,
      tool_id,
      tools:tool_id (
        id,
        name,
        slug,
        short_description,
        image_url,
        image_alt
      )
    `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching user reviews:', error)
        return []
    }

    return data.map((r: any) => ({
        ...r,
        tool: r.tools
    }))
}

export async function getUserReviewForTool(toolId: string) {
    const supabase = createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return null

    const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('user_id', user.id)
        .eq('tool_id', toolId)
        .single()

    if (error) return null
    return data
}
