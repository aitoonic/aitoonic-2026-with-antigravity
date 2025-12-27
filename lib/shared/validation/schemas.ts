
export interface SubmissionData {
  toolName: string;
  toolUrl: string;
  description: string;
  email: string;
  csrf_token?: string;
}

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export function validateSubmissionData(data: Partial<SubmissionData>): ValidationResult {
  if (!data.toolName || !data.toolUrl || !data.description || !data.email) {
    return { isValid: false, error: 'Missing required fields' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    return { isValid: false, error: 'Invalid email format' };
  }

  try {
    new URL(data.toolUrl);
  } catch {
    return { isValid: false, error: 'Invalid URL format' };
  }

  // Length checks
  if (data.toolName.length > 100) return { isValid: false, error: 'Tool name too long' };
  if (data.description.length > 5000) return { isValid: false, error: 'Description too long' };

  return { isValid: true };
}

export interface PaymentData {
  planId: string;
  amount: number;
}

export function validatePaymentData(data: Partial<PaymentData>): ValidationResult {
  if (!data.planId || !data.amount) {
    return { isValid: false, error: 'Missing required fields' };
  }

  if (typeof data.amount !== 'number' || data.amount <= 0) {
    return { isValid: false, error: 'Invalid amount' };
  }

  return { isValid: true };
}

export interface PaymentVerificationData {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  planId: string;
  amount: number;
}

export function validatePaymentVerification(data: Partial<PaymentVerificationData>): ValidationResult {
  if (!data.razorpay_order_id || !data.razorpay_payment_id || !data.razorpay_signature || !data.planId || !data.amount) {
    return { isValid: false, error: 'Missing required payment details' };
  }
  return { isValid: true };
}
