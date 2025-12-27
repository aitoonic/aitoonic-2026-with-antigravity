'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, Plus, Trash2 } from 'lucide-react'

import { createSubmission } from '@/actions/submission-actions'

export default function GptSubmissionForm() {
    const router = useRouter()
    const [submitting, setSubmitting] = useState(false)
    const [prompts, setPrompts] = useState(['', '', ''])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSubmitting(true)

        try {
            const formData = new FormData(e.currentTarget)
            formData.append('prompts', JSON.stringify(prompts)) // Pass prompts as JSON

            await createSubmission(formData, 'gpt')
        } catch (err: any) {
            alert(err.message || 'Something went wrong')
            setSubmitting(false)
        }
    }

    const updatePrompt = (index: number, value: string) => {
        const newPrompts = [...prompts]
        newPrompts[index] = value
        setPrompts(newPrompts)
    }

    const addPrompt = () => setPrompts([...prompts, ''])
    const removePrompt = (index: number) => setPrompts(prompts.filter((_, i) => i !== index))

    return (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl mx-auto py-8">
            <div className="space-y-4">
                <h1 className="text-3xl font-bold">Submit Custom GPT</h1>
                <p className="text-muted-foreground">List your ChatGPT agent on our platform.</p>
            </div>

            <div className="space-y-4 bg-card p-6 rounded-xl border">
                <h3 className="text-lg font-semibold mb-4">GPT Details</h3>

                <div className="space-y-2">
                    <label className="text-sm font-medium">GPT Name *</label>
                    <input name="name" required className="w-full p-2.5 rounded-lg border bg-background" placeholder="e.g. Data Analyzer Pro" />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">ChatGPT Store Link *</label>
                    <input name="gpt_link" required type="url" className="w-full p-2.5 rounded-lg border bg-background" placeholder="https://chat.openai.com/g/..." />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Use Case / Description *</label>
                    <textarea name="prompt_description" required className="w-full p-2.5 rounded-lg border bg-background h-24" placeholder="What does this GPT do best?" />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Limitations</label>
                    <textarea name="limitations" className="w-full p-2.5 rounded-lg border bg-background h-20" placeholder="Any specific requirements? (e.g. Requires Plus)" />
                </div>
            </div>

            <div className="space-y-4 bg-card p-6 rounded-xl border">
                <h3 className="text-lg font-semibold mb-2">Example Prompts</h3>
                <p className="text-xs text-muted-foreground mb-4">Show users how to interact with your GPT.</p>

                {prompts.map((prompt, i) => (
                    <div key={i} className="flex gap-2">
                        <input
                            value={prompt}
                            onChange={(e) => updatePrompt(i, e.target.value)}
                            className="flex-1 p-2.5 rounded-lg border bg-background"
                            placeholder={`Example Prompt ${i + 1}`}
                            required
                        />
                        {prompts.length > 1 && (
                            <button type="button" onClick={() => removePrompt(i)} className="p-2.5 text-red-500 hover:bg-red-50 rounded-lg">
                                <Trash2 className="w-5 h-5" />
                            </button>
                        )}
                    </div>
                ))}

                {prompts.length < 5 && (
                    <button type="button" onClick={addPrompt} className="flex items-center text-sm font-medium text-emerald-500 hover:underline">
                        <Plus className="w-4 h-4 mr-1" /> Add Prompt
                    </button>
                )}
            </div>

            <div className="flex justify-end gap-4 pt-4">
                <button type="button" onClick={() => router.back()} className="px-6 py-2.5 font-medium hover:bg-muted rounded-lg transition-colors">
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={submitting}
                    className="px-8 py-2.5 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 transition-all flex items-center justify-center min-w-[160px]"
                >
                    {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Publish GPT'}
                </button>
            </div>
        </form>
    )
}
