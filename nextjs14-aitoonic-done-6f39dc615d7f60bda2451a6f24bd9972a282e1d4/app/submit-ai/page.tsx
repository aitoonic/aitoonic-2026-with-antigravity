import Link from 'next/link'
import { CheckCircle, ArrowRight, Shield, Rocket, BarChart3, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata = {
  title: 'Submit Your AI Tool | #1 Trusted AI Launch Platform - Aitoonic',
  description: 'Join 1,200+ founders using Aitoonic to launch their AI startups. Free and featured submission options available. We drive active users, not just clicks.',
}

export default function SubmitAiHubPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* HER0 SECTION */}
      <section className="relative overflow-hidden pt-20 pb-32">
        <div className="absolute inset-0 z-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

        <div className="container relative z-10 px-4 mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 text-sm font-medium rounded-full bg-primary/10 text-primary">
            <Rocket className="w-4 h-4" />
            <span>Launch Your Startup Today</span>
          </div>

          <h1 className="max-w-4xl mx-auto mb-6 text-5xl font-black tracking-tight md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
            Stop Building in Secret. <br />
            Launch to <span className="text-primary">50k+ Early Adopters</span>.
          </h1>

          <p className="max-w-2xl mx-auto mb-10 text-xl text-muted-foreground">
            Aitoonic is the strategic launchpad for serious AI founders. We don't just list your tool; we position it for growth, SEO authority, and user acquisition.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row justify-center items-center">
            <Button asChild size="lg" className="h-12 px-8 text-base">
              <Link href="/submit-ai-tool">Submit Your Tool</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 px-8 text-base">
              <Link href="/advertise">View Media Kit</Link>
            </Button>
          </div>

          <div className="mt-12 pt-8 border-t border-border/50 flex justify-center gap-8 grayscale opacity-50">
            {/* Placeholder logos - In real implementation, replace with actual SVG images */}
            <div className="text-sm font-semibold">Trusted by founders from</div>
            <div className="font-bold">Y Combinator</div>
            <div className="font-bold">Product Hunt</div>
            <div className="font-bold">Indie Hackers</div>
          </div>
        </div>
      </section>

      {/* AUTHORITY SECTION */}
      <section className="py-24 bg-card/50 border-y border-border">
        <div className="container px-4 mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Most Directories Are Just Link Farms. <br />We Are an Editorial Engine.</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              If you are reading this, you probably just spent months building a GPT wrapper, agent, or SaaS platform. You posted on Twitter, maybe got a few likes, and now... silence. You need traffic.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-background border border-border shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 mb-4">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Human Review</h3>
              <p className="text-sm text-muted-foreground">
                Every single submission is audited by a human editor. If a tool is broken, scammy, or effortless clone-ware, we reject it.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-background border border-border shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500 mb-4">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Semantic Categorization</h3>
              <p className="text-sm text-muted-foreground">
                We don't just dump you in "Productivity". We tag you by specific use-case so you rank for high-intent keywords.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-background border border-border shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500 mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Traffic Quality</h3>
              <p className="text-sm text-muted-foreground">
                Our audience isn't other bots. It's founders, investors, and productivity-obsessed power users looking for software to buy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FUNNEL SELECTION */}
      <section className="py-24" id="pricing">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Choose Your Launch Trajectory</h2>
            <p className="text-muted-foreground">We believe in transparency. Choose the path that fits your stage.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Option 1: Free */}
            <Card className="relative flex flex-col border-border">
              <CardHeader>
                <CardTitle className="text-2xl">Standard</CardTitle>
                <CardDescription>For Bootstrappers & MVP Validation</CardDescription>
                <div className="mt-4 text-3xl font-bold">₹0 <span className="text-sm font-normal text-muted-foreground">/ Forever</span></div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    Permanent Profile Page
                  </li>
                  <li className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    Searchable in Directory
                  </li>
                  <li className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    Collect User Reviews
                  </li>
                  <li className="flex items-start gap-2 text-sm text-muted-foreground/50">
                    <span className="w-4 h-4 border border-muted-foreground/30 rounded-full mt-0.5 shrink-0" />
                    7-14 Day Review Wait
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/submit-ai-tool">Submit Free</Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Option 2: Featured */}
            <Card className="relative flex flex-col border-primary shadow-2xl scale-105 z-10">
              <div className="absolute top-0 right-0 -mt-3 -mr-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                MOST POPULAR
              </div>
              <CardHeader>
                <CardTitle className="text-2xl text-primary">Featured Launch</CardTitle>
                <CardDescription>For Growth-Ready Startups</CardDescription>
                <div className="mt-4 text-3xl font-bold">₹100 <span className="text-sm font-normal text-muted-foreground">/ One-time</span></div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-sm font-medium">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span className="text-foreground">Review &lt; 24 Hours</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm font-medium">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span className="text-foreground">Homepage Sticky Spot</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm font-medium">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span className="text-foreground">Newsletter Feature (5k+ Subs)</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm font-medium">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span className="text-foreground">Permanent DoFollow Backlink</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full font-bold">
                  <Link href="/featured-ai-tools">Get Featured</Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Option 3: Corporate */}
            <Card className="relative flex flex-col border-none bg-secondary/20">
              <CardHeader>
                <CardTitle className="text-2xl">Corporate</CardTitle>
                <CardDescription>For Scale & Sponsorships</CardDescription>
                <div className="mt-4 text-3xl font-bold">Custom</div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    Category Takeover
                  </li>
                  <li className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    Newsletter Sponsorships
                  </li>
                  <li className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    Site-wide Banner Ads
                  </li>
                  <li className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    Custom Review Articles
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild variant="ghost" className="w-full hover:bg-background">
                  <Link href="/advertise">Partner With Us</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* SEO VALUE SECTION */}
      <section className="py-24 bg-card/50 border-y border-border">
        <div className="container px-4 mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">The Mathematics of Domain Authority</h2>
          <p className="text-lg text-muted-foreground mb-12">
            You might think "I'll just post on social media." That works for 24 hours. A listing on Aitoonic works forever.
            Google looks for "Entity Validation". When a high-authority, curated directory links to your domain with relevant anchor text, it signals to Google that you are a real software company.
          </p>
          <div className="grid sm:grid-cols-2 gap-8 text-left">
            <div className="bg-background p-6 rounded-xl border border-border">
              <div className="font-bold text-lg mb-2 flex items-center gap-2">
                <Rocket className="w-5 h-5 text-primary" /> Indexing Speed
              </div>
              <p className="text-sm text-muted-foreground">
                New sites can take weeks to index. Our "New Tools" page is crawled daily. Being listed here often gets your site indexed by Google within hours.
              </p>
            </div>
            <div className="bg-background p-6 rounded-xl border border-border">
              <div className="font-bold text-lg mb-2 flex items-center gap-2">
                <ArrowRight className="w-5 h-5 text-primary" /> Topical Authority
              </div>
              <p className="text-sm text-muted-foreground">
                We link to you from relevant category pages. This passes "link juice" specifically related to your niche (e.g., "Legal AI").
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS SECTION */}
      <section className="py-24 container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">What Happens After You Click Submit?</h2>
          <p className="text-muted-foreground">We value your time, so we want to be clear about our process.</p>
        </div>

        <div className="relative border-l-2 border-muted pl-8 ml-4 md:ml-0 space-y-12">
          <div className="relative">
            <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-primary border-4 border-background" />
            <h3 className="text-xl font-bold mb-2">1. Submission</h3>
            <p className="text-muted-foreground">You provide your URL, screenshots, and value prop. Our system checks for malware and domain health automatically.</p>
          </div>
          <div className="relative">
            <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-primary border-4 border-background" />
            <h3 className="text-xl font-bold mb-2">2. Editorial Review</h3>
            <p className="text-muted-foreground">An editor visits your site. They create an account. They test the core feature. If your tool is a "coming soon" page or broken, we reject it.</p>
          </div>
          <div className="relative">
            <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-primary border-4 border-background" />
            <h3 className="text-xl font-bold mb-2">3. Optimization</h3>
            <p className="text-muted-foreground">If accepted, we rewrite your headline for better click-through rates and tag you in the correct categories.</p>
          </div>
          <div className="relative">
            <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-green-500 border-4 border-background" />
            <h3 className="text-xl font-bold mb-2">4. Live</h3>
            <p className="text-muted-foreground">You receive an email confirming your listing is active. If you chose Featured, your homepage spot goes live immediately.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-primary text-primary-foreground text-center">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl md:text-5xl font-black mb-6">Join the Fastest Growing AI Ecosystem</h2>
          <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto">
            Don't let your tool die in obscurity. Put it in front of the users who are looking for it right now.
          </p>
          <Button asChild size="lg" variant="secondary" className="h-14 px-10 text-lg font-bold">
            <Link href="/submit-ai-tool">Start Your Submission</Link>
          </Button>
          <p className="mt-6 text-sm opacity-70">No credit card required for standard listing.</p>
        </div>
      </section>

    </div>
  )
}
