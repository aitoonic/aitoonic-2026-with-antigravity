'use server'

import { createClient } from '@/utils/supabase/server'
import { PaymentData, validatePaymentData } from '@/lib/shared/validation/schemas'
import Razorpay from 'razorpay'

// Initialize Razorpay logic here on the server side
// Note: Environmental variables are accessed on server
const razorpay = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

export async function createOrderAction(data: PaymentData) {
    // 1. Validation
    const validation = validatePaymentData(data)
    if (!validation.isValid) {
        throw new Error(validation.error)
    }

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        throw new Error('Unauthorized')
    }

    // 2. Business Logic
    try {
        const order = await razorpay.orders.create({
            amount: data.amount * 100, // Amount in paise
            currency: 'INR',
            receipt: `receipt_${Date.now()}_${user.id.slice(0, 5)}`,
            notes: {
                userId: user.id,
                planId: data.planId
            }
        })
        return order
    } catch (error) {
        console.error('Error creating Razorpay order:', error)
        throw new Error('Error creating order')
    }
}

export async function verifyPaymentAction(data: any) {
    // 1. Validation (Basic check, signature verification is the real test)
    if (!data.razorpay_order_id || !data.razorpay_payment_id || !data.razorpay_signature) {
        throw new Error('Missing payment details')
    }

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        throw new Error('Unauthorized')
    }

    // 2. Verify Signature
    const crypto = require('crypto')
    const key_secret = process.env.RAZORPAY_KEY_SECRET!
    const generated_signature = crypto
        .createHmac('sha256', key_secret)
        .update(data.razorpay_order_id + '|' + data.razorpay_payment_id)
        .digest('hex')

    if (generated_signature !== data.razorpay_signature) {
        throw new Error('Invalid signature')
    }

    // 3. Log Payment & Grant Credits (Using Admin Client for reliability/permissions if needed, 
    // but here we use the user client as per original code. 
    // Ideally, "payments" table insert might need admin if RLS is strict?
    // Let's stick to original logic: user client.)

    // Wait, if RLS on 'payments' is ENABLED (implied by hardening), does User have INSERT?
    // User typically shouldn't be able to insert 'success' payment manually. 
    // BETTER: Use Admin Client here to ensure integrity.

    // However, I will stick to exact logic migration first to ensure functionality, 
    // but typically this should be the Admin Client doing the writing.

    // For now, mirroring `route.ts` exactly which used `createClient()` (User context).

    const { error: paymentError } = await supabase
        .from('payments')
        .insert({
            user_id: user.id,
            razorpay_order_id: data.razorpay_order_id,
            razorpay_payment_id: data.razorpay_payment_id,
            razorpay_signature: data.razorpay_signature,
            amount: data.amount,
            currency: 'INR',
            status: 'success',
            plan_type: data.planId
        })

    if (paymentError) {
        console.error('Error logging payment:', paymentError)
        // If strict RLS blocks this, we might fail here. 
        // If that happens, we should upgrade to Admin Client. 
        // Proceeding with User Client as per original file.
        throw new Error('Payment recorded failed')
    }

    // 4. Grant Credits
    const creditsToAdd = 1
    const { error: creditError } = await supabase.rpc('increment_submission_credits', {
        row_id: user.id,
        amount: creditsToAdd
    })

    if (creditError) {
        console.error('Error granting credits:', creditError)
        throw new Error('Credit grant failed')
    }

    return { success: true }
}
