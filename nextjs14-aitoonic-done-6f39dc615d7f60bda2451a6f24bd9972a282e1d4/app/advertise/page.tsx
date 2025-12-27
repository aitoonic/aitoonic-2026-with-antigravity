import Link from 'next/link'
import { Download, Mail, PieChart, Users, Globe, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata = {
    title: 'Advertise on Aitoonic | Reach 50k+ AI Developers & Founders',
    description: 'Promote your AI product to early adopters, investors, and power users. Newsletter sponsorships, category takeovers, and display ads available.',
}

export default function AdvertisePage() {
    return (
        <div className="min-h-screen bg-background">

            {/* HERO */}
            <section className="py-24 text-center container mx-auto px-4">
                <h1 className="text-4xl md:text-6xl font-black mb-6">
                    Reach 50,000+ <br />
                    <span className="text-primary">AI Enthusiasts & Builders</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
                    The most effective way to promote your AI product to early adopters, investors, and power users.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" className="h-14 px-8 text-lg">
                        <Download className="mr-2 h-5 w-5" /> Download Media Kit
                    </Button>
                    <Button asChild variant="outline" size="lg" className="h-14 px-8 text-lg">
                        <Link href="mailto:ads@aitoonic.com">Contact Sales</Link>
                    </Button>
                </div>
            </section>

            {/* AUDIENCE DATA */}
            <section className="py-24 bg-secondary/20 border-y border-border">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">Who Reads Aitoonic?</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Our audience is high-value. We are not a general interest tech blog; we are a directory for people actively looking for tools to build with or buy.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-5xl mx-auto mb-12">
                        <div className="p-8 rounded-2xl bg-background border border-border shadow-sm">
                            <div className="text-5xl font-black text-primary mb-2">45%</div>
                            <div className="text-lg font-bold mb-2">Developers & Engineers</div>
                            <p className="text-sm text-muted-foreground">Looking for APIs, cloud credits, and dev tools</p>
                        </div>
                        <div className="p-8 rounded-2xl bg-background border border-border shadow-sm">
                            <div className="text-5xl font-black text-blue-500 mb-2">30%</div>
                            <div className="text-lg font-bold mb-2">Founders & CEOs</div>
                            <p className="text-sm text-muted-foreground">Looking for B2B solutions, hiring, and growth tools</p>
                        </div>
                        <div className="p-8 rounded-2xl bg-background border border-border shadow-sm">
                            <div className="text-5xl font-black text-purple-500 mb-2">25%</div>
                            <div className="text-lg font-bold mb-2">Creative Pros</div>
                            <p className="text-sm text-muted-foreground">Designers and marketers looking for generation tools</p>
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2 bg-background px-4 py-2 rounded-full border border-border">
                            <Globe className="w-4 h-4 text-primary" />
                            <strong>US (40%)</strong>
                        </div>
                        <div className="flex items-center gap-2 bg-background px-4 py-2 rounded-full border border-border">
                            <Globe className="w-4 h-4 text-primary" />
                            <strong>UK/EU (30%)</strong>
                        </div>
                        <div className="flex items-center gap-2 bg-background px-4 py-2 rounded-full border border-border">
                            <Globe className="w-4 h-4 text-primary" />
                            <strong>India (15%)</strong>
                        </div>
                    </div>
                </div>
            </section>

            {/* AD FORMATS */}
            <section className="py-24 container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold mb-4">High-Impact Placements</h2>
                    <p className="text-muted-foreground">Native ad formats that respect the user experience.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-card border border-border rounded-xl overflow-hidden">
                        <div className="h-40 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
                            <Mail className="w-12 h-12 text-indigo-500" />
                        </div>
                        <div className="p-8">
                            <h3 className="text-xl font-bold mb-2">Newsletter Sponsorship</h3>
                            <p className="text-sm text-muted-foreground mb-4">Top placement in our "New & Notable" weekly email sent to 5,000+ active subscribers.</p>
                            <ul className="text-sm space-y-2">
                                <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" /> Logo + 150 words copy</li>
                                <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" /> High Open Rate (42%)</li>
                            </ul>
                        </div>
                    </div>
                    <div className="bg-card border border-border rounded-xl overflow-hidden">
                        <div className="h-40 bg-gradient-to-br from-pink-500/20 to-rose-500/20 flex items-center justify-center">
                            <PieChart className="w-12 h-12 text-pink-500" />
                        </div>
                        <div className="p-8">
                            <h3 className="text-xl font-bold mb-2">Category Takeover</h3>
                            <p className="text-sm text-muted-foreground mb-4">Own an entire vertical. Your banner appears on the header of specific category pages (e.g., "Image Gen").</p>
                            <ul className="text-sm space-y-2">
                                <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" /> Used by Industry Leaders</li>
                                <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" /> 100% Share of Voice</li>
                            </ul>
                        </div>
                    </div>
                    <div className="bg-card border border-border rounded-xl overflow-hidden">
                        <div className="h-40 bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center">
                            <Users className="w-12 h-12 text-amber-500" />
                        </div>
                        <div className="p-8">
                            <h3 className="text-xl font-bold mb-2">Homepage Feature</h3>
                            <p className="text-sm text-muted-foreground mb-4">Native card placement in our "Featured" section on the homepage.</p>
                            <ul className="text-sm space-y-2">
                                <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" /> ~15k impressions / week</li>
                                <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" /> Native Look & Feel</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* BRAND SAFETY */}
            <section className="py-24 bg-card/30">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <ShieldCheck className="w-16 h-16 text-green-500 mx-auto mb-6" />
                    <h2 className="text-3xl font-bold mb-6">Safe Environment for Premium Brands</h2>
                    <p className="text-lg text-muted-foreground mb-8">
                        We rigorously vet our advertisers just like we vet our tools. We DO NOT accept Gambling, Adult, Crypto Schemes, or Affiliate Farms.
                        Your ad will appear alongside verified, high-quality AI software.
                    </p>
                    <Button asChild size="lg" className="h-12 px-8">
                        <Link href="mailto:ads@aitoonic.com">Partner With Us</Link>
                    </Button>
                </div>
            </section>

        </div>
    )
}
