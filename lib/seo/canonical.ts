/**
 * SEO utility functions for generating canonical URLs and managing robots meta tags
 */
import type { Metadata } from 'next';

// Base URL of the website - change this to the production URL
const BASE_URL = 'https://aitoonic.com';

/**
 * Generate a canonical URL for a given path
 * @param path - The path segment of the URL (without leading slash)
 * @returns The full canonical URL
 */
export function getCanonicalUrl(path?: string): string {
  if (!path) {
    return BASE_URL;
  }
  
  // Ensure path starts with a slash but doesn't end with one 
  // (Next.js config has trailingSlash: true which will add it at build time)
  const cleanPath = path.startsWith('/') 
    ? path.slice(1) 
    : path;
    
  return `${BASE_URL}/${cleanPath}`;
}

/**
 * Default robots configuration for most pages
 */
export const defaultRobots: Metadata['robots'] = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
  },
};

/**
 * "noindex" robots configuration for pages that shouldn't be indexed
 */
export const noindexRobots: Metadata['robots'] = {
  index: false,
  follow: true,
  googleBot: {
    index: false,
    follow: true,
  },
};
