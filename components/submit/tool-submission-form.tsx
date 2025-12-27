'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, Plus, Trash2 } from 'lucide-react'

// Mock Categories for now (should come from DB)
const CATEGORIES = [
    { id: 'marketing', name: 'Marketing' },
    { id: 'productivity', name: 'Productivity' },
    { id: 'coding', name: 'Coding' },
    { id: 'design', name: 'Design' },
    { id: 'writing', name: 'Writing' },
]

import { createSubmission } from '@/actions/submission-actions'

export default function ToolSubmissionForm() {
    const router = useRouter()
    const [submitting, setSubmitting] = useState(false)
    const [features, setFeatures] = useState(['', '', ''])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSubmitting(true)

        try {
            const formData = new FormData(e.currentTarget)
            // Add extra fields if needed or specific formatting
            // formData.append('features', JSON.stringify(features)) // If we handled features

            await createSubmission(formData, 'tool') // This will redirect on success
        } catch (err: any) {
            alert(err.message || 'Something went wrong')
            setSubmitting(false)
        }
    }

    const updateFeature = (index: number, value: string) => {
        const newFeatures = [...features]
        newFeatures[index] = value
        setFeatures(newFeatures)
    }

    const addFeature = () => setFeatures([...features, ''])
    const removeFeature = (index: number) => setFeatures(features.filter((_, i) => i !== index))

    return (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl mx-auto py-8">
            <div className="space-y-4">
                <h1 className="text-3xl font-bold">Submit New AI Tool</h1>
                <p className="text-muted-foreground">Fill in the details to list your AI tool securely.</p>
            </div>

            {/* Basic Info */}
            <div className="space-y-4 bg-card p-6 rounded-xl border">
                <h3 className="text-lg font-semibold mb-4">Basic Information</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Tool Name *</label>
                        <input name="name" required className="w-full p-2.5 rounded-lg border bg-background" placeholder="e.g. Magic Writer" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Website URL *</label>
                        <input name="url" required type="url" className="w-full p-2.5 rounded-lg border bg-background" placeholder="https://..." />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Short Description (SEO Meta) *</label>
                    <textarea name="short_description" required className="w-full p-2.5 rounded-lg border bg-background h-24" placeholder="Brief summary of what your tool does..." />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Founder Name</label>
                    <input name="founder_name" className="w-full p-2.5 rounded-lg border bg-background" placeholder="Who built this?" />
                </div>
            </div>

            {/* Detailed Info */}
            <div className="space-y-4 bg-card p-6 rounded-xl border">
                <h3 className="text-lg font-semibold mb-4">Detailed Information</h3>

                <div className="space-y-2">
                    <label className="text-sm font-medium">How it Works (Full Description) *</label>
                    <textarea name="description" required className="w-full p-2.5 rounded-lg border bg-background h-32" placeholder="Explain the key functionality..." />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Category *</label>
                    <select name="category_id" className="w-full p-2.5 rounded-lg border bg-background">
                        <option value="">Select a Category</option>
                        {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                </div>
            </div>

            {/* Features */}
            <div className="space-y-4 bg-card p-6 rounded-xl border">
                <h3 className="text-lg font-semibold mb-2">Key Features</h3>
                <p className="text-xs text-muted-foreground mb-4">List up to 5 key features.</p>

                {features.map((feature, i) => (
                    <div key={i} className="flex gap-2">
                        <input
                            value={feature}
                            onChange={(e) => updateFeature(i, e.target.value)}
                            className="flex-1 p-2.5 rounded-lg border bg-background"
                            placeholder={`Feature ${i + 1}`}
                            required
                        />
                        {features.length > 1 && (
                            <button type="button" onClick={() => removeFeature(i)} className="p-2.5 text-red-500 hover:bg-red-50 rounded-lg">
                                <Trash2 className="w-5 h-5" />
                            </button>
                        )}
                    </div>
                ))}

                {features.length < 5 && (
                    <button type="button" onClick={addFeature} className="flex items-center text-sm font-medium text-primary hover:underline">
                        <Plus className="w-4 h-4 mr-1" /> Add Feature
                    </button>
                )}
            </div>

            {/* Assets */}
            <div className="space-y-4 bg-card p-6 rounded-xl border">
                <h3 className="text-lg font-semibold mb-4">Visual Assets</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Logo URL</label>
                        <input className="w-full p-2.5 rounded-lg border bg-background" placeholder="https://.../logo.png" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Cover Image URL</label>
                        <input className="w-full p-2.5 rounded-lg border bg-background" placeholder="https://.../cover.png" />
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-4 pt-4">
                <button type="button" onClick={() => router.back()} className="px-6 py-2.5 font-medium hover:bg-muted rounded-lg transition-colors">
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={submitting}
                    className="px-8 py-2.5 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition-all flex items-center justify-center min-w-[160px]"
                >
                    {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Publish Tool'}
                </button>
            </div>
        </form>
    )
}
