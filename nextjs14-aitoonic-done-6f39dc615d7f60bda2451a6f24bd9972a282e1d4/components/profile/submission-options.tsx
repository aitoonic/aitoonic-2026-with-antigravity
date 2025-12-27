'use client'

import React from 'react'
import Link from 'next/link'
import { Bot, Zap } from 'lucide-react'

export default function SubmissionOptions({ credits }: { credits: number }) {
    // if (credits <= 0) return null // Removed to always show options

    return (
        <div className="w-full bg-gradient-to-br from-primary/5 via-card to-card border border-primary/20 rounded-2xl p-8 mb-10 relative overflow-hidden">
            {credits > 0 && (
                <div className="absolute top-0 right-0 p-3 bg-primary/10 rounded-bl-2xl border-b border-l border-primary/10">
                    <span className="text-sm font-semibold text-primary">
                        {credits} Submission Credit{credits > 1 ? 's' : ''} Available
                    </span>
                </div>
            )}

            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">Ready to Publish?</h2>
                <p className="text-muted-foreground">Select the type of AI resource you want to submit.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                {/* Submit AI Tool */}
                <Link
                    href="/submit/tool"
                    className="group relative bg-card hover:bg-card/80 border p-6 rounded-xl flex flex-col items-center text-center transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
                >
                    <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <Zap className="w-8 h-8 text-blue-500" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">Submit AI Tool</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                        For web apps, mobile apps, software, and platforms.
                    </p>
                    <span className="mt-auto inline-flex items-center text-sm font-semibold text-blue-500 group-hover:translate-x-1 transition-transform">
                        Start Submission &rarr;
                    </span>
                </Link>

                {/* Submit GPT */}
                <Link
                    href="/submit/gpt"
                    className="group relative bg-card hover:bg-card/80 border p-6 rounded-xl flex flex-col items-center text-center transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
                >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <Bot className="w-8 h-8 text-emerald-500" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">Submit Custom GPT</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                        For specialized ChatGPT assistants and agents.
                    </p>
                    <span className="mt-auto inline-flex items-center text-sm font-semibold text-emerald-500 group-hover:translate-x-1 transition-transform">
                        Start Submission &rarr;
                    </span>
                </Link>
            </div>
        </div>
    )
}
