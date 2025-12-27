import { NextResponse } from 'next/server'

export function applySecurityHeaders(headers: Headers) {
    // Prevent MIME type sniffing
    headers.set('X-Content-Type-Options', 'nosniff')

    // Clickjacking protection (allow only from same origin if needed, or deny)
    headers.set('X-Frame-Options', 'SAMEORIGIN')

    // XSS Protection (older browsers, but still good practice)
    headers.set('X-XSS-Protection', '1; mode=block')

    // Referrer Policy
    headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')

    // Strict Transport Security (HSTS) - 1 year
    headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload')

    return headers
}

export function checkBot(userAgent: string | null) {
    if (!userAgent) return false

    const botPatterns = [
        'headlesschrome',
        'curl',
        'wget',
        'python-requests',
        'scrapy',
        'bot',
        'crawler',
        'spider'
    ]

    const lowerUA = userAgent.toLowerCase()
    // Very basic check - specialized bots will bypass this. 
    // Good bots (Googlebot) have 'bot' in name but we want to allow them for SEO?
    // User asked for "Bot Mitigation".
    // We should be careful NOT to block Googlebot/Bingbot for SEO.

    // Allow known good bots
    if (lowerUA.includes('googlebot') || lowerUA.includes('bingbot') || lowerUA.includes('duckduckbot')) {
        return false
    }

    // Block suspicious widespread scrapers
    if (lowerUA.includes('python-requests') || lowerUA.includes('axios') || lowerUA.includes('curl')) {
        return true
    }

    return false
}
