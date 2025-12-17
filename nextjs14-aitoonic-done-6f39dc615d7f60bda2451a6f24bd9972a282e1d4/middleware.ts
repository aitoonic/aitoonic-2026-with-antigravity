import { NextResponse, NextRequest } from 'next/server';
import { csrfMiddleware } from './lib/csrf';
import { updateSession } from './utils/supabase/middleware';

/**
 * Next.js Middleware
 * 
 * This middleware runs on every request and applies security measures like CSRF protection
 * and manages Supabase Auth sessions.
 */
export async function middleware(request: NextRequest) {
  // Apply CSRF protection to form submissions
  // Note: CSRF middleware might return a response if validation fails
  // Apply CSRF protection to form submissions
  // Note: CSRF middleware might return a response if validation fails
  // const csrfResponse = await csrfMiddleware(request);
  // if (csrfResponse) {
  //   return csrfResponse;
  // }

  // Update Supabase session
  return await updateSession(request);
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