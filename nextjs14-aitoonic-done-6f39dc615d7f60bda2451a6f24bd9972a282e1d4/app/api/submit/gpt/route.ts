import { NextRequest, NextResponse } from 'next/server';
import { validateCSRFToken } from '@/lib/csrf';

// Ensure Node.js runtime (Nodemailer is not compatible with Edge runtime)
export const runtime = 'nodejs';

/**
 * API route handler for GPT submissions
 * Includes CSRF validation for security
 */
export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    const { toolName, toolUrl, description, email, csrf_token } = body;
    
    // Validate CSRF token
    if (!validateCSRFToken(request, csrf_token)) {
      return NextResponse.json(
        { error: 'Invalid CSRF token' },
        { status: 403 }
      );
    }
    
    // Validate required fields
    if (!toolName || !toolUrl || !description || !email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }
    
    // Validate URL format
    try {
      new URL(toolUrl);
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid URL format' },
        { status: 400 }
      );
    }
    
    // Return success response
    return NextResponse.json(
      { success: true, message: 'GPT submitted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('GPT submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}