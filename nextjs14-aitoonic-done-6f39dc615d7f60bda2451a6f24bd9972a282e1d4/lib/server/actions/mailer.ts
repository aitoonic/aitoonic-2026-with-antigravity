// Mailing disabled: provide a no-op to keep callers safe during build/runtime.
export async function sendMail(_args: { subject: string; text: string; html?: string }) {
  // Intentionally no-op. Return a marker for logs if needed.
  return { skipped: true }
}
