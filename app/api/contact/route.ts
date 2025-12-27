import { NextRequest, NextResponse } from 'next/server';
import { validateCSRFToken } from '@/lib/server/security/csrf';
import { submitContactFormAction } from '@/lib/server/actions/contact';

export const runtime = 'nodejs';

/**
 * API route handler for contact form submissions
 * Delegates logic to Server Action
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message, csrf_token } = body;

    // Validate CSRF at the edge
    if (!validateCSRFToken(request, csrf_token)) {
      return NextResponse.json(
        { error: 'Invalid CSRF token' },
        { status: 403 }
      );
    }

    try {
      await submitContactFormAction({ name, email, message });
      return NextResponse.json(
        { success: true, message: 'Contact form submitted successfully' },
        { status: 200 }
      );
    } catch (err: any) {
      return NextResponse.json(
        { error: err.message || 'Submission failed' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Contact form submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}