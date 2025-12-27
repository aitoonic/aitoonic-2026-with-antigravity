'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Check, Loader2 } from 'lucide-react'

// Plan Types
type Plan = {
    id: string
    name: string
    price: number
    description: string
    features: string[]
    recommended?: boolean
    color: string
}

const PLANS: Plan[] = [
    {
        id: 'basic',
        name: 'Basic',
        price: 49,
        description: 'Perfect for getting started.',
        features: [
            'Standard Listing',
            'Searchable',
            '1 Tool Submission',
            'Basic Support'
        ],
        color: 'bg-blue-500' // Fallback accent
    },
    {
        id: 'pro',
        name: 'Pro',
        price: 99,
        description: 'Stand out from the crowd.',
        features: [
            'Priority Indexing',
            'Verified Badge',
            'Rich Analytics',
            '1 Tool + 1 Update Credit',
            'Priority Support'
        ],
        recommended: true,
        color: 'bg-indigo-500'
    },
    {
        id: 'featured',
        name: 'Featured',
        price: 199,
        description: 'Maximum visibility & traffic.',
        features: [
            'Homepage Feature (7 Days)',
            'Top of Category',
            'Social Media Shoutout',
            'Verified Badge',
            'Direct Newsletter Entry'
        ],
        color: 'bg-amber-500'
    }
]

interface PricingCardsProps {
    onSelectPlan?: (planId: string) => void
}

declare global {
    interface Window {
        Razorpay: any
    }
}

export default function PricingCards({ onSelectPlan }: PricingCardsProps) {
    const router = useRouter()
    const [loadingPlan, setLoadingPlan] = useState<string | null>(null)

    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script')
            script.src = 'https://checkout.razorpay.com/v1/checkout.js'
            script.onload = () => resolve(true)
            script.onerror = () => resolve(false)
            document.body.appendChild(script)
        })
    }

    const handleBuyPlan = async (plan: Plan) => {
        try {
            setLoadingPlan(plan.id)

            const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID
            if (!keyId) {
                alert('Razorpay Key ID is missing. Please check configuration.')
                console.error('NEXT_PUBLIC_RAZORPAY_KEY_ID is not defined')
                return
            }

            const res = await loadRazorpayScript()
            if (!res) {
                alert('Razorpay SDK failed to load. Are you online?')
                return
            }

            // 1. Create Order
            const orderRes = await fetch('/api/payment/create-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ planId: plan.id, amount: plan.price })
            })

            if (!orderRes.ok) {
                const errData = await orderRes.json().catch(() => ({}))
                console.error('Order creation failed:', errData)
                if (orderRes.status === 401) {
                    router.push('/login')
                    return
                }
                throw new Error(errData.error || 'Failed to create order')
            }

            const orderData = await orderRes.json()

            // 2. Open Razorpay
            const options = {
                key: keyId,
                amount: orderData.amount,
                currency: orderData.currency,
                name: 'Aitoonic',
                description: `Purchase ${plan.name} Plan`,
                order_id: orderData.id,
                config: {
                    display: {
                        hide: [
                            { method: 'card' },
                            { method: 'netbanking' },
                            { method: 'wallet' },
                            { method: 'emi' },
                            { method: 'paylater' }
                        ],
                        preferences: {
                            show_default_blocks: true
                        }
                    }
                },
                handler: async function (response: any) {
                    // 3. Verify Payment
                    try {
                        const verifyRes = await fetch('/api/payment/verify', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                                planId: plan.id,
                                amount: plan.price
                            })
                        })

                        if (verifyRes.ok) {
                            alert('Payment Successful! You can now submit your tool.')
                            router.refresh()
                        } else {
                            const verifyData = await verifyRes.json()
                            alert(`Payment verification failed: ${verifyData.error || 'Unknown error'}`)
                        }
                    } catch (err) {
                        console.error(err)
                        alert('Payment verification failed (Network).')
                    }
                },
                prefill: {
                    name: '',
                    email: '',
                    contact: ''
                },
                theme: {
                    color: '#3399cc'
                }
            }

            const paymentObject = new window.Razorpay(options)
            paymentObject.open()

        } catch (error: any) {
            console.error('Payment Error:', error)
            alert(`Something went wrong: ${error.message || 'Unknown error'}`)
        } finally {
            setLoadingPlan(null)
        }
    }

    return (
        <div className="w-full py-6">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70 mb-4">
                    Simple, Transparent Pricing
                </h2>
                <p className="text-muted-foreground max-w-lg mx-auto">
                    One-time payment for lifetime value. Choose the plan that fits your growth stage.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
                {PLANS.map((plan) => (
                    <div
                        key={plan.id}
                        className={`relative group rounded-3xl border p-8 flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${plan.recommended
                            ? 'bg-gradient-to-b from-primary/5 via-card to-card border-primary/50 shadow-xl shadow-primary/10'
                            : 'bg-card border-border/50 hover:border-border/80'
                            }`}
                    >
                        {plan.recommended && (
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                <span className="bg-primary text-primary-foreground text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg shadow-primary/25">
                                    Recommended
                                </span>
                            </div>
                        )}

                        <div className="mb-6">
                            <h3 className="text-xl font-bold text-foreground mb-2">{plan.name}</h3>
                            <div className="flex items-baseline gap-1">
                                <span className="text-4xl font-extrabold text-foreground">₹{plan.price}</span>
                                <span className="text-muted-foreground text-sm font-medium">/ lifetime</span>
                            </div>
                            <p className="text-muted-foreground text-sm mt-3">{plan.description}</p>
                        </div>

                        <div className="flex-grow space-y-4 mb-8">
                            {plan.features.map((feature, i) => (
                                <div key={i} className="flex items-center text-sm text-foreground/80">
                                    <div className={`p-1 rounded-full mr-3 ${plan.recommended ? 'bg-primary/20 text-primary' : 'bg-secondary text-foreground'}`}>
                                        <Check className="w-3.5 h-3.5" strokeWidth={3} />
                                    </div>
                                    {feature}
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={() => handleBuyPlan(plan)}
                            disabled={!!loadingPlan}
                            className={`w-full py-3.5 rounded-xl text-sm font-bold transition-all duration-200 active:scale-[0.98] flex items-center justify-center ${plan.recommended
                                ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25'
                                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                                }`}
                        >
                            {loadingPlan === plan.id ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                `Get Started with ${plan.name}`
                            )}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}
