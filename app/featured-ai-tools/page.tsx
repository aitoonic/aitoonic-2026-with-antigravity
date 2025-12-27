import Link from 'next/link'
import { CheckCircle, Rocket, TrendingUp, Search, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import PricingCards from '@/components/profile/pricing-cards'

export const metadata = {
    title: 'Get Featured on Aitoonic | Boost Traffic & SEO for AI Tools',
    description: 'Skip the queue. Get your AI tool featured on the Aitoonic homepage. Drive instant traffic, get a high-authority DoFollow backlink, and reach 50k+ users.',
}

export default function FeaturedToolsPage() {
    return (
        <div className="min-h-screen bg-background">

            {/* HERO */}
            <section className="py-20 text-center container mx-auto px-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-sm font-medium rounded-full bg-primary/10 text-primary border border-primary/20">
                    <TrendingUp className="w-4 h-4" />
                    <span>High Velocity Launch</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-black mb-6">
                    The "Unfair Advantage" for <br />
                    <span className="text-primary">AI Tool Launches</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
                    Skip the noise. Guarantee your spot in front of 50,000+ investors, founders, and early adopters.
                </p>
                <div className="flex justify-center">
                    <Button asChild size="lg" className="h-14 px-8 text-lg">
                        <Link href="#pricing">Secure Your Featured Spot</Link>
                    </Button>
                </div>
            </section>

            {/* PROBLEM / SOLUTION */}
            <section className="py-16 bg-secondary/20 border-y border-border">
                <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold mb-4">90% of AI Tools Die in Obscurity</h2>
                        <p className="text-lg text-muted-foreground mb-6">
                            You built a great product. But if it's buried on page 56 of a directory, it doesn't matter. "Hope" is not a marketing strategy.
                        </p>
                        <div className="bg-background p-6 rounded-xl border border-border shadow-sm">
                            <h3 className="font-bold mb-2 text-primary">The Featured Solution</h3>
                            <p className="text-muted-foreground">
                                Aitoonic Featured listings aren't just "ads". They are editorial endorsements. We place you where users actually look—sticky spots, newsletters, and curated collections.
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-6 bg-background rounded-xl border border-border text-center">
                            <div className="font-black text-4xl mb-2 text-foreground">400+</div>
                            <div className="text-sm text-muted-foreground">Avg. Weekly Clicks</div>
                        </div>
                        <div className="p-6 bg-background rounded-xl border border-border text-center">
                            <div className="font-black text-4xl mb-2 text-foreground">Top 3</div>
                            <div className="text-sm text-muted-foreground">Google Rankings</div>
                        </div>
                        <div className="p-6 bg-background rounded-xl border border-border text-center col-span-2">
                            <div className="font-black text-4xl mb-2 text-foreground">50,000+</div>
                            <div className="text-sm text-muted-foreground">Monthly Active Founders</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* DELIVERABLES */}
            <section className="py-24 container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold mb-4">The Complete Launch Stack</h2>
                    <p className="text-muted-foreground">Everything you need to spike your traffic and domain authority.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-colors">
                        <Rocket className="w-10 h-10 text-primary mb-4" />
                        <h3 className="font-bold text-xl mb-2">Homepage Spot</h3>
                        <p className="text-sm text-muted-foreground">
                            You sit at the very top of our highest-traffic page for 7 days. This generates immediate, high-intent traffic.
                        </p>
                    </div>
                    <div className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-colors">
                        <Search className="w-10 h-10 text-blue-500 mb-4" />
                        <h3 className="font-bold text-xl mb-2">DoFollow Backlink</h3>
                        <p className="text-sm text-muted-foreground">
                            The "Secret Weapon" for SEO. A link from our high-authority domain tells Google your site is trustworthy.
                        </p>
                    </div>
                    <div className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-colors">
                        <CheckCircle className="w-10 h-10 text-green-500 mb-4" />
                        <h3 className="font-bold text-xl mb-2">Verified Badge</h3>
                        <p className="text-sm text-muted-foreground">
                            Stand out in search results with the blue checkmark. Users trust verified tools 3x more than unverified ones.
                        </p>
                    </div>
                    <div className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-colors">
                        <Mail className="w-10 h-10 text-purple-500 mb-4" />
                        <h3 className="font-bold text-xl mb-2">Newsletter Blast</h3>
                        <p className="text-sm text-muted-foreground">
                            We include your tool in our "New & Notable" email blast to 5,000+ active subscribers. (Open rate: 42%).
                        </p>
                    </div>
                </div>
            </section>

            {/* ROI MATH */}
            <section className="py-24 bg-card/50">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="bg-background border border-border rounded-2xl p-8 md:p-12 text-center">
                        <h2 className="text-2xl font-bold mb-8">Is It Worth It? Let's Do The Math.</h2>
                        <div className="grid md:grid-cols-3 gap-8 text-left">
                            <div>
                                <div className="font-semibold text-sm text-muted-foreground mb-1">Google Ads</div>
                                <div className="text-red-500 font-bold text-lg">₹150 - ₹800</div>
                                <div className="text-xs text-muted-foreground">Cost Per Click (CPC)</div>
                            </div>
                            <div>
                                <div className="font-semibold text-sm text-muted-foreground mb-1">PR Agency</div>
                                <div className="text-red-500 font-bold text-lg">₹80,000+</div>
                                <div className="text-xs text-muted-foreground">Monthly Retainer</div>
                            </div>
                            <div className="bg-primary/5 -m-2 p-2 rounded-lg border border-primary/20">
                                <div className="font-semibold text-sm text-primary mb-1">Aitoonic</div>
                                <div className="text-green-600 font-bold text-lg">~₹10 - ₹50</div>
                                <div className="text-xs text-muted-foreground">Effective CPC + SEO Value</div>
                            </div>
                        </div>
                        <p className="mt-8 text-sm text-muted-foreground">
                            With Aitoonic, you get high-intent traffic for a fraction of the cost, PLUS a permanent SEO asset that lasts forever.
                        </p>
                    </div>
                </div>
            </section>

            {/* PRICING */}
            <div id="pricing" className="py-24 container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
                    <p className="text-muted-foreground">One-time payment. Lifetime value.</p>
                </div>
                <PricingCards />
            </div>

        </div>
    )
}
