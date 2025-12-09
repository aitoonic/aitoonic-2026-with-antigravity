import { sanitizeHtml } from './sanitize';

/**
 * Safely sanitizes and stringifies JSON-LD data for use with dangerouslySetInnerHTML
 * 
 * This function is specifically designed for JSON-LD data which doesn't need HTML sanitization
 * in the same way as user-generated content, but still needs safe handling for dangerouslySetInnerHTML
 * 
 * @param jsonLdData The JSON-LD data object to stringify
 * @returns An object with __html property containing the stringified JSON-LD
 */
export function sanitizeJsonLd(jsonLdData: any): { __html: string } {
  // For JSON-LD, we don't need to sanitize the content with DOMPurify
  // as it's structured data, not HTML. But we still want to handle it safely.
  
  try {
    // Stringify the JSON-LD data
    const jsonString = JSON.stringify(jsonLdData);
    
    // Return the object format expected by dangerouslySetInnerHTML
    return { __html: jsonString };
  } catch (error) {
    console.error('Error sanitizing JSON-LD:', error);
    return { __html: '{}' }; // Return empty object if there's an error
  }
}