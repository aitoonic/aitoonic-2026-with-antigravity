import { NextResponse } from 'next/server'
import { createOrderAction } from '@/lib/server/actions/payment'

export async function POST(req: Request) {
    try {
        const body = await req.json()

        // Delegate to Server Action
        try {
            const order = await createOrderAction(body)
            return NextResponse.json(order)
        } catch (err: any) {
            if (err.message === 'Unauthorized') {
                return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
            }
            console.error('Order creation domain error:', err)
            return NextResponse.json({ error: 'Error creating order' }, { status: 500 })
        }
    } catch (error) {
        console.error('Error creating Razorpay order:', error)
        return NextResponse.json({ error: 'Error creating order' }, { status: 500 })
    }
}
