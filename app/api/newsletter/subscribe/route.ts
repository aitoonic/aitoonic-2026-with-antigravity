import { NextRequest, NextResponse } from 'next/server';
import { validateCSRFToken } from '@/lib/server/security/csrf';
import { subscribeNewsletterAction } from '@/lib/server/actions/newsletter';

/**
 * API route handler for newsletter subscriptions
 * Delegates logic to Server Action
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, csrf_token } = body;

    // Validate CSRF at the edge
    if (!validateCSRFToken(request, csrf_token)) {
      return NextResponse.json(
        { error: 'Invalid CSRF token' },
        { status: 403 }
      );
    }

    try {
      await subscribeNewsletterAction(email);
      return NextResponse.json(
        { success: true, message: 'Successfully subscribed to newsletter' },
        { status: 200 }
      );
    } catch (err: any) {
      return NextResponse.json(
        { error: err.message || 'Subscription failed' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}