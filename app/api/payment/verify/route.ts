import { NextResponse } from 'next/server'
import { verifyPaymentAction } from '@/lib/server/actions/payment'

export async function POST(req: Request) {
    try {
        const body = await req.json()

        try {
            const result = await verifyPaymentAction(body)
            return NextResponse.json(result)
        } catch (err: any) {
            if (err.message === 'Unauthorized') {
                return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
            }
            if (err.message === 'Invalid signature') {
                return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
            }
            console.error('Payment verification domain error:', err)
            return NextResponse.json({ error: err.message || 'Verification failed' }, { status: 500 })
        }
    } catch (error) {
        console.error('Error verifying payment:', error)
        return NextResponse.json({ error: 'Verification failed' }, { status: 500 })
    }
}
