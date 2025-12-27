import Link from 'next/link'
import { ArrowLeft, Megaphone, Video, Trophy, Target, ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata = {
    title: 'AI Tool Launch Agency | Full-Service Promotion Campaign - Aitoonic',
    description: 'A coordinated multi-channel launch campaign for serious AI startups. Homepage takeover, dedicated editorial, and video reviews.',
}

export default function LaunchServicePage() {
    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                <Link href="/submit-ai" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Hub
                </Link>

                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <span className="bg-red-500/10 text-red-500 px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full mb-4 inline-block">
                            Only 2 Slots Available in {new Date().toLocaleString('default', { month: 'long' })}
                        </span>
                        <h1 className="text-4xl md:text-6xl font-black mb-6">The "All-Hands-On-Deck"<br />Launch Campaign</h1>
                        <p className="text-xl text-muted-foreground">
                            For founders who can't afford a "quiet" launch. We execute a coordinated multi-channel blitz for your AI tool.
                        </p>
                    </div>

                    {/* The Deliverables Grid */}
                    <div className="grid md:grid-cols-2 gap-8 mb-20">
                        <div className="bg-card border border-border rounded-2xl p-8">
                            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6">
                                <Trophy className="w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Homepage Takeover</h3>
                            <p className="text-muted-foreground">
                                You don't just get a spot; you get the **Hero Banner**. The very first thing 50,000 visitors see. This creates immediate brand dominance.
                            </p>
                        </div>
                        <div className="bg-card border border-border rounded-2xl p-8">
                            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500 mb-6">
                                <Megaphone className="w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Dedicated Editorial</h3>
                            <p className="text-muted-foreground">
                                Our editorial team writes a 1,000-word deep-dive review of your tool. Effectively a "Sponsored Post" that ranks on Google for keywords like "[Your Tool] Review".
                            </p>
                        </div>
                        <div className="bg-card border border-border rounded-2xl p-8">
                            <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-500 mb-6">
                                <Video className="w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Video Walkthrough</h3>
                            <p className="text-muted-foreground">
                                We record a 60-second vertical video (TikTok/Shorts style) showing off your best features in action. Embedded on your profile and shared on our socials.
                            </p>
                        </div>
                        <div className="bg-card border border-border rounded-2xl p-8">
                            <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center text-green-500 mb-6">
                                <Target className="w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Competitor Interception</h3>
                            <p className="text-muted-foreground">
                                We place your tool as a "Recommended Alternative" on the profiles of your top 3 competitors. This captures high-intent traffic comparing solutions.
                            </p>
                        </div>
                    </div>

                    {/* Qualification */}
                    <div className="bg-secondary/20 rounded-3xl p-10 mb-16">
                        <h2 className="text-2xl font-bold mb-8 text-center">Who Is This For?</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="font-bold text-green-600 mb-4">Perfect Matches</h3>
                                <ul className="space-y-3">
                                    <li className="flex items-center gap-2 text-sm"><CheckCircle className="w-4 h-4" /> VC-backed startups needing growth metrics</li>
                                    <li className="flex items-center gap-2 text-sm"><CheckCircle className="w-4 h-4" /> Bootstrapped founders with validated product</li>
                                    <li className="flex items-center gap-2 text-sm"><CheckCircle className="w-4 h-4" /> Tools pivoting to V2.0</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-bold text-red-500 mb-4">Not A Good Fit</h3>
                                <ul className="space-y-3">
                                    <li className="flex items-center gap-2 text-sm text-muted-foreground"><XCircle className="w-4 h-4" /> Alpha/Beta products (Too early)</li>
                                    <li className="flex items-center gap-2 text-sm text-muted-foreground"><XCircle className="w-4 h-4" /> "Get Rich Quick" schemes</li>
                                    <li className="flex items-center gap-2 text-sm text-muted-foreground"><XCircle className="w-4 h-4" /> Waitlist-only pages</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="text-center">
                        <h2 className="text-3xl font-bold mb-6">Let's Blow This Up</h2>
                        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                            Because of the manual work involved, we can only handle 2 launches per week. Please apply to see if your date is available.
                        </p>
                        <Button asChild size="lg" className="h-14 px-8 text-lg">
                            <Link href="mailto:partnerships@aitoonic.com?subject=Launch%20Service%20Application">
                                Apply for Launch Slot <ArrowUpRight className="ml-2 w-5 h-5" />
                            </Link>
                        </Button>
                    </div>

                </div>
            </div>
        </div>
    )
}

function CheckCircle({ className }: { className?: string }) {
    return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
}
function XCircle({ className }: { className?: string }) {
    return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
}
