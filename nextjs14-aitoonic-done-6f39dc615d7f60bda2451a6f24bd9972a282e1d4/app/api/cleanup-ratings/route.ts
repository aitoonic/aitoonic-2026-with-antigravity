
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { supabaseUrl, supabaseKey } from '@/lib/supabase'

const supabase = createClient(supabaseUrl, supabaseKey)

export async function GET() {
    try {
        const { data: tools, error: toolsError } = await supabase.from('tools').select('id, name')

        if (toolsError) {
            return NextResponse.json({ error: toolsError.message }, { status: 500 })
        }

        let updatedCount = 0
        let errors = []

        for (const tool of tools) {
            const { data: reviews, error: reviewsError } = await supabase
                .from('reviews')
                .select('rating')
                .eq('tool_id', tool.id)

            let newRating = null
            if (reviews && reviews.length > 0) {
                const sum = reviews.reduce((a, b: any) => a + b.rating, 0)
                newRating = Number((sum / reviews.length).toFixed(1))
            }

            const { error: updateError } = await supabase
                .from('tools')
                .update({ rating: newRating })
                .eq('id', tool.id)

            if (updateError) {
                errors.push(`Failed to update ${tool.name}: ${updateError.message}`)
            } else {
                updatedCount++
            }
        }

        return NextResponse.json({
            success: true,
            message: `Processed ${tools.length} tools. Updated ${updatedCount}.`,
            errors: errors.length > 0 ? errors : undefined
        })

    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}
