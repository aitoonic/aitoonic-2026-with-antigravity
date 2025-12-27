import Link from 'next/link'
import { MessageSquare, BarChart, Search, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import GptSubmissionForm from '@/components/submit/gpt-submission-form' // Assuming this exists or using placeholder

export const metadata = {
  title: 'Submit Custom GPT | Promote Your OpenAI Assistant - Aitoonic',
  description: 'The official GPT store is crowded. Get your Custom GPT listed on Aitoonic for better discovery, Google SEO, and usage analytics.',
}

export default function SubmitGptPage() {
  return (
    <div className="min-h-screen bg-background">

      {/* HERO */}
      <section className="py-20 bg-background border-b border-border">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-sm font-medium rounded-full bg-green-500/10 text-green-600 border border-green-500/20">
            <MessageSquare className="w-4 h-4" />
            <span>Dedicated GPT Directory</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black mb-6">
            Don't Let Your GPT <br />
            <span className="text-muted-foreground">Die in the Store</span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            The official GPT store ranks by "chat count", making it impossible for new creators to be seen. Aitoonic gives you a searchable, SEO-optimized home on the open web.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 grid lg:grid-cols-[1fr_400px] gap-12">

        <div className="space-y-12">

          {/* BENEFITS */}
          <section className="grid md:grid-cols-2 gap-6">
            <div className="bg-card border border-border p-6 rounded-xl">
              <Search className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-bold text-lg mb-2">Google SEO</h3>
              <p className="text-sm text-muted-foreground">We index your instructions and capabilities so users searching for "Finance Helper GPT" find YOU on Google, not just inside ChatGPT.</p>
            </div>
            <div className="bg-card border border-border p-6 rounded-xl">
              <BarChart className="w-8 h-8 text-blue-500 mb-4" />
              <h3 className="font-bold text-lg mb-2">Click Tracking</h3>
              <p className="text-sm text-muted-foreground">See how many people are actually clicking "Start Chat". OpenAI doesn't show you this funnel data.</p>
            </div>
          </section>

          {/* FORM */}
          <section id="submit-form">
            <div className="flex items-center gap-2 mb-6">
              <div className="h-8 w-1 bg-primary rounded-full" />
              <h2 className="text-2xl font-bold">Submit Your GPT</h2>
            </div>
            <GptSubmissionForm />
          </section>

        </div>

        {/* SIDEBAR */}
        <div className="space-y-8">
          <div className="bg-secondary/20 p-6 rounded-xl border border-border">
            <h3 className="font-bold mb-4">Why Submit?</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2">
                <Check className="w-4 h-4 text-green-500 shrink-0" />
                Permanent URL (aitoonic.com/gpt/you)
              </li>
              <li className="flex gap-2">
                <Check className="w-4 h-4 text-green-500 shrink-0" />
                Get User Reviews
              </li>
              <li className="flex gap-2">
                <Check className="w-4 h-4 text-green-500 shrink-0" />
                Feature "Star Ratings" social proof
              </li>
            </ul>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-4">Looking to launch a full AI Tool instead?</p>
            <Button asChild variant="outline" className="w-full">
              <Link href="/submit-ai-tool">Submit Software</Link>
            </Button>
          </div>
        </div>

      </div>
    </div>
  )
}

function Check({ className }: { className?: string }) {
  return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
}
