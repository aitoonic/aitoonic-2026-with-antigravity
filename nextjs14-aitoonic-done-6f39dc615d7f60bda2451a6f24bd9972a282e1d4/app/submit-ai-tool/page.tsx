import Link from 'next/link'
import { AlertCircle, Check, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import ToolSubmissionForm from '@/components/submit/tool-submission-form' // Reusing existing form, will need to be wrapped to force "Free" mode or just use regular form and rely on pricing page flow if credits logic is handled there. 
// Ideally we should pass a prop to ToolSubmissionForm to hide pricing? Or just use it as is for now.
// For "Free Only", we might need a specific form that sets a "plan: free" flag.
// The current `ToolSubmissionForm` likely uses `PricingCards`.
// I will wrap it in a container that emphasizes the "Standard" nature.

export const metadata = {
    title: 'Submit AI Tool for Free | Editorial Review Process - Aitoonic',
    description: 'Submit your AI startup to Aitoonic\'s directory for free. Strict editorial guidelines apply. We review for functionality, utility, and safety. 14-day review time.',
}

export default function SubmitFreeToolPage() {
    return (
        <div className="min-h-screen bg-background pb-20">
            <div className="bg-secondary/30 border-b border-border py-12 mb-12">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-3xl font-bold mb-3">Submit Your AI Tool (Standard)</h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                        Join the directory efficiently. No cost. High standards.
                    </p>
                    <div className="inline-flex items-center gap-2 text-sm text-amber-600 bg-amber-50 dark:bg-amber-900/20 px-4 py-2 rounded-full border border-amber-200 dark:border-amber-800">
                        <AlertCircle className="w-4 h-4" />
                        <span>Current Review Queue: 10-14 Days</span>
                        <Link href="/featured-ai-tools" className="font-bold hover:underline ml-1">Skip Queue &rarr;</Link>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 grid lg:grid-cols-[1fr_400px] gap-12">

                {/* LEFT: Guidelines & Content */}
                <div className="space-y-12">

                    <section>
                        <h2 className="text-2xl font-bold mb-6">Get Your Foot in the Door</h2>
                        <p className="text-muted-foreground mb-6">
                            Building an AI startup is hard. Use Aitoonic to get that initial validation and SEO footprint entirely for free.
                            A Standard Listing includes:
                        </p>
                        <ul className="space-y-3 mb-8">
                            <li className="flex gap-3">
                                <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 flex items-center justify-center shrink-0"><Check className="w-3 h-3" /></div>
                                <div>
                                    <div className="font-semibold">Permanent Profile Page</div>
                                    <div className="text-sm text-muted-foreground">Your own detailed page with tailored screenshots, feature lists, and pricing models.</div>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 flex items-center justify-center shrink-0"><Check className="w-3 h-3" /></div>
                                <div>
                                    <div className="font-semibold">Search Indexing</div>
                                    <div className="text-sm text-muted-foreground">Immediate inclusion in our internal search engine and category pages.</div>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 flex items-center justify-center shrink-0"><Check className="w-3 h-3" /></div>
                                <div>
                                    <div className="font-semibold">Review Capability</div>
                                    <div className="text-sm text-muted-foreground">Users can leave verified reviews on your profile to build social proof.</div>
                                </div>
                            </li>
                        </ul>

                        <Alert>
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>What You DO NOT Get (vs Featured)</AlertTitle>
                            <AlertDescription>
                                Standard listings do not include Homepage visibility, DoFollow backlinks (initially), Newsletter mentions, or social media promotion.
                            </AlertDescription>
                        </Alert>
                    </section>

                    <section className="bg-card border border-border rounded-xl p-8">
                        <h2 className="text-2xl font-bold mb-6">Editorial Guidelines</h2>
                        <p className="text-muted-foreground mb-6">We reject ~30% of free submissions. To ensure you pass:</p>

                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="shrink-0 mt-1"><X className="w-5 h-5 text-red-500" /></div>
                                <div>
                                    <h3 className="font-bold text-foreground">No "Waitlists" or "Coming Soon"</h3>
                                    <p className="text-sm text-muted-foreground">Your tool must be live and usable right now. We do not list landing pages that only collect emails.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="shrink-0 mt-1"><X className="w-5 h-5 text-red-500" /></div>
                                <div>
                                    <h3 className="font-bold text-foreground">No Low-Effort Wrappers</h3>
                                    <p className="text-sm text-muted-foreground">If your tool is just a generic interface for OpenAI with no unique value prop or specialized prompting, it will be rejected.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="shrink-0 mt-1"><Check className="w-5 h-5 text-green-500" /></div>
                                <div>
                                    <h3 className="font-bold text-foreground">Professional Presence Required</h3>
                                    <p className="text-sm text-muted-foreground">Must have a privacy policy, no broken links, and functional signup flow.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <div id="form">
                        <h2 className="text-2xl font-bold mb-6">Submission Details</h2>
                        {/* Embedding the submission form. 
                             In a real scenario, we might want to pass a prop `mode="free"` to hide the credit check or pricing cards if they are tightly coupled.
                             For now, we reuse the component. */}
                        <ToolSubmissionForm />
                    </div>

                </div>

                {/* RIGHT: Upsell Sidebar */}
                <div className="lg:sticky lg:top-24 h-fit space-y-8">
                    <div className="bg-card border-l-4 border-l-primary shadow-sm p-6 rounded-r-xl">
                        <h3 className="font-bold text-lg mb-2">Want Faster Results?</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            Skip the 14-day queue and get on the homepage immediately.
                        </p>
                        <Button asChild className="w-full">
                            <Link href="/featured-ai-tools">Get Featured Instead</Link>
                        </Button>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-bold text-sm uppercase text-muted-foreground">Frequently Asked Questions</h3>
                        <div className="space-y-4">
                            <div>
                                <h4 className="font-semibold text-sm">Can I upgrade later?</h4>
                                <p className="text-xs text-muted-foreground mt-1">Yes, you can upgrade to a Featured listing at any time from your dashboard.</p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-sm">Why is review time so long?</h4>
                                <p className="text-xs text-muted-foreground mt-1">We manually test every tool to ensure safety. Paid submissions support this work and get priority.</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
