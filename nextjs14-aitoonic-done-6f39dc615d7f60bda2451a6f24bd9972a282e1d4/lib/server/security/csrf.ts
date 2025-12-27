/**
 * CSRF Protection Utility
 * 
 * This module provides utilities for implementing Cross-Site Request Forgery (CSRF) protection
 * in Next.js applications using the double submit cookie pattern.
 */

import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

/**
 * Generates a secure random token for CSRF protection
 * @returns A secure random token string
 */
export function generateCSRFToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

/**
 * SAFE for Server Component render: returns an existing CSRF token from cookies if present,
 * otherwise returns a freshly generated token WITHOUT setting any cookies.
 * If you need to set the cookie, do it inside a Route Handler or Server Action.
 */
export function getCSRFTokenForRender(): string {
  const existing = cookies().get('csrf_token')?.value;
  return existing || generateCSRFToken();
}

/**
 * Sets a CSRF token cookie. Only call this INSIDE a Route Handler or Server Action.
 * @deprecated Use getCSRFTokenForRender instead for Server Components.
 */
export function setCSRFToken(): string {
  const token = generateCSRFToken();
  cookies().set({
    name: 'csrf_token',
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 // 1 hour expiry
  });
  return token;
}

/**
 * Validates a CSRF token from a request against the stored cookie
 * @param request The Next.js request object
 * @param formToken The token submitted with the form
 * @returns Boolean indicating if the token is valid
 */
export function validateCSRFToken(request: NextRequest, formToken: string): boolean {
  const cookieToken = request.cookies.get('csrf_token')?.value;
  
  if (!cookieToken || !formToken) {
    return false;
  }
  
  // Use constant-time comparison to prevent timing attacks
  return crypto.timingSafeEqual(
    Buffer.from(cookieToken),
    Buffer.from(formToken)
  );
}

/**
 * Middleware to validate CSRF tokens on POST requests
 * @param request The Next.js request object
 * @returns NextResponse or null if validation passes
 */
export async function csrfMiddleware(request: NextRequest): Promise<NextResponse | null> {
  // Only check POST, PUT, DELETE, PATCH requests
  if (!['POST', 'PUT', 'DELETE', 'PATCH'].includes(request.method)) {
    return null; // Continue with the request
  }
  
  try {
    const formData = await request.formData();
    const formToken = formData.get('csrf_token') as string;
    
    if (!validateCSRFToken(request, formToken)) {
      return NextResponse.json(
        { error: 'Invalid CSRF token' },
        { status: 403 }
      );
    }
    
    return null; // Continue with the request
  } catch (error) {
    console.error('CSRF validation error:', error);
    return NextResponse.json(
      { error: 'CSRF validation failed' },
      { status: 403 }
    );
  }
}