import { NextRequest, NextResponse } from 'next/server';
import { validateCSRFToken } from '@/lib/server/security/csrf';
import { submitToolAction } from '@/lib/server/actions/submit';

// Ensure Node.js runtime
export const runtime = 'nodejs';

/**
 * API route handler for GPT submissions
 * Delegates logic to Server Action
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { csrf_token } = body;

    // Validate CSRF at the edge (Controller level)
    if (!validateCSRFToken(request, csrf_token)) {
      return NextResponse.json(
        { error: 'Invalid CSRF token' },
        { status: 403 }
      );
    }

    try {
      await submitToolAction(body);
      return NextResponse.json(
        { success: true, message: 'GPT submitted successfully' },
        { status: 200 }
      );
    } catch (err: any) {
      return NextResponse.json(
        { error: err.message || 'Submission failed' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('GPT submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}