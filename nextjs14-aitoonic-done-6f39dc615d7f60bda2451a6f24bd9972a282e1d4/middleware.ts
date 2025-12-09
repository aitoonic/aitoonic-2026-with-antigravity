import { NextResponse, NextRequest } from 'next/server';
import { csrfMiddleware } from './lib/csrf';

/**
 * Next.js Middleware
 * 
 * This middleware runs on every request and applies security measures like CSRF protection
 */
export async function middleware(request: NextRequest) {
  // Apply CSRF protection to form submissions
  const csrfResponse = await csrfMiddleware(request);
  if (csrfResponse) {
    return csrfResponse;
  }
  
  // Continue with the request
  return NextResponse.next();
}

// Configure which paths this middleware runs on
export const config = {
  // Apply to all API routes and form submission endpoints
  matcher: [
    '/api/:path*',
    '/submit-ai',
    '/submit-gpt',
    '/contact',
    '/ai-agent'
  ],
};