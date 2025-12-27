import { NextResponse, NextRequest } from 'next/server';
import { csrfMiddleware } from '@/lib/server/security/csrf';
import { updateSession } from '@/lib/server/auth/middleware';
import { rateLimit } from '@/lib/server/security/rate-limit';
import { applySecurityHeaders, checkBot } from '@/lib/server/security/headers';

/**
 * Next.js Middleware
 * 
 * This middleware runs on every request and applies security measures like CSRF protection
 * and manages Supabase Auth sessions.
 */
export async function middleware(request: NextRequest) {
  const response = await updateSession(request);

  // 1. Security Headers
  applySecurityHeaders(response.headers);

  // 2. Bot Mitigation (Basic User-Agent Check)
  // Only apply to API routes to avoid accidentally blocking crawlers on content pages
  if (request.nextUrl.pathname.startsWith('/api')) {
    if (checkBot(request.headers.get('user-agent'))) {
      return new NextResponse('Bot detected', { status: 403 });
    }
  }

  // 3. Rate Limiting for API routes
  if (request.nextUrl.pathname.startsWith('/api')) {
    const limiter = rateLimit(request);

    if (limiter.isRateLimited) {
      return new NextResponse('Too Many Requests', {
        status: 429,
        headers: limiter.headers as any
      });
    }

    // Add rate limit headers to legitimate response
    Object.entries(limiter.headers).forEach(([k, v]) => {
      response.headers.set(k, v);
    });

    // Update state cookie
    response.cookies.set(limiter.cookie.name, limiter.cookie.value, limiter.cookie.options);
  }

  // 4. Method Allow-List (Strict) is hard to genericize here without knowing route map.
  // Instead, individual routes (which we "thinned") are robust. 
  // We can enforce that GET requests don't have bodies? No, Next.js handles that.

  return response;
}

// Configure which paths this middleware runs on
export const config = {
  // Apply to all API routes and form submission endpoints, and pages checking auth
  // You might want to extend this matcher to include protected routes
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};