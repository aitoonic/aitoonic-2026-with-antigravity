
// Basic Stateless Rate Limiter using Cookies (Token Bucket)
// Note: This is not as robust as Redis but works in Edge environments without external dependencies.
// It relies on the client cooperating by sending cookies back. If a bot disables cookies, this check might be bypassed,
// BUT standard API clients and browsers will respect it. For critical APIs, consider Redis/Upstash.

import { NextRequest, NextResponse } from 'next/server'

interface RateLimitConfig {
    uniqueTokenPerInterval: number
    interval: number
}

export function rateLimit(request: NextRequest, config: RateLimitConfig = { uniqueTokenPerInterval: 500, interval: 60000 }) {
    const ip = request.ip ?? '127.0.0.1'
    const tokenCount = config.uniqueTokenPerInterval
    const interval = config.interval
    const cookieName = 'rate-limit-token'

    // Checking cookie for existing bucket state
    const cookie = request.cookies.get(cookieName)
    const now = Date.now()

    let remaining = tokenCount
    let reset = now + interval

    if (cookie) {
        try {
            const state = JSON.parse(atob(cookie.value))
            if (state.reset > now) {
                remaining = state.remaining - 1
                reset = state.reset
            }
        } catch (e) {
            // invalid cookie, reset
        }
    }

    const isRateLimited = remaining < 0

    const responseHeaders = new Headers()
    const newState = { remaining: Math.max(0, remaining), reset }

    // In a real middleware, we can't easily SET cookies on the "request" object passed down, 
    // but we return the state so the middleware can set it on the response.

    return {
        isRateLimited,
        remaining,
        reset,
        headers: {
            'X-RateLimit-Limit': tokenCount.toString(),
            'X-RateLimit-Remaining': Math.max(0, remaining).toString(),
            'X-RateLimit-Reset': reset.toString()
        },
        cookie: {
            name: cookieName,
            value: btoa(JSON.stringify(newState)),
            options: {
                path: '/',
                maxAge: interval / 1000,
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production'
            }
        }
    }
}
