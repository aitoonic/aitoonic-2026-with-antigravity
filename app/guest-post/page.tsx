import Link from 'next/link'
import { PenTool, Check, X, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata = {
    title: 'Write for Us | AI Guest Post Guidelines - Aitoonic',
    description: 'Share your expertise with 50,000+ AI enthusiasts and earn a high-authority backlink. Strict editorial standards apply.',
}

export default function GuestPostPage() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <div className="container mx-auto px-4 py-20 max-w-4xl">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-6">
                        <PenTool className="w-8 h-8" />
                    </div>
                    <h1 className="text-4xl font-bold mb-4">Write for Aitoonic (Guest Post Program)</h1>
                    <p className="text-xl text-muted-foreground">Share your expertise with 50,000+ AI enthusiasts. Earn a high-authority backlink.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 mb-16 border-b border-border pb-16">
                    <div>
                        <h2 className="text-2xl font-bold mb-4">We Don't Want Fluff.</h2>
                        <p className="text-muted-foreground mb-6">
                            We accept guest posts, but our acceptance rate is low (&lt;10%). To get published, you must bring <strong>value</strong>.
                        </p>
                        <h3 className="font-bold mb-2">What We Reject Immediately:</h3>
                        <ul className="space-y-2 mb-6 text-sm text-muted-foreground">
                            <li className="flex gap-2"><X className="w-4 h-4 text-red-500 mt-0.5" /> Generic "5 Ways AI Changed Marketing" articles.</li>
                            <li className="flex gap-2"><X className="w-4 h-4 text-red-500 mt-0.5" /> ChatGPT-generated copy-paste text.</li>
                            <li className="flex gap-2"><X className="w-4 h-4 text-red-500 mt-0.5" /> Promotional articles disguised as advice.</li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold mb-4">What We Love</h2>
                        <ul className="space-y-4">
                            <li className="bg-card border border-border p-4 rounded-xl">
                                <div className="font-bold text-primary mb-1">Case Studies</div>
                                <div className="text-sm text-muted-foreground">"How we scaled to $5k MRR using [Tool]"</div>
                            </li>
                            <li className="bg-card border border-border p-4 rounded-xl">
                                <div className="font-bold text-primary mb-1">Technical Deep Dives</div>
                                <div className="text-sm text-muted-foreground">"Comparing LLM latency: Llama 3 vs GPT-4o"</div>
                            </li>
                            <li className="bg-card border border-border p-4 rounded-xl">
                                <div className="font-bold text-primary mb-1">Data Reports</div>
                                <div className="text-sm text-muted-foreground">"We analyzed 1,000 AI tools and found..."</div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="bg-secondary/20 rounded-2xl p-8 mb-16 text-center">
                    <h2 className="text-2xl font-bold mb-6">The Exchange (What You Get)</h2>
                    <div className="grid md:grid-cols-3 gap-6 text-left">
                        <div>
                            <h4 className="font-bold mb-2">Domain Authority</h4>
                            <p className="text-sm text-muted-foreground">Get a permanent DoFollow link to your site or Twitter profile.</p>
                        </div>
                        <div>
                            <h4 className="font-bold mb-2">Traffic</h4>
                            <p className="text-sm text-muted-foreground">Good articles get featured in our newsletter (5k+ subs).</p>
                        </div>
                        <div>
                            <h4 className="font-bold mb-2">Author Profile</h4>
                            <p className="text-sm text-muted-foreground">Build your personal brand as an AI thought leader.</p>
                        </div>
                    </div>
                </div>

                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-6">Ready to Write?</h2>
                    <p className="text-muted-foreground mb-8">
                        Pitch us your topic first. Do not send the full draft yet.
                    </p>
                    <Button asChild size="lg">
                        <Link href="mailto:editor@aitoonic.com?subject=Guest%20Post%20Pitch">
                            Pitch Your Topic <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                    </Button>
                </div>

            </div>
        </div>
    )
}
