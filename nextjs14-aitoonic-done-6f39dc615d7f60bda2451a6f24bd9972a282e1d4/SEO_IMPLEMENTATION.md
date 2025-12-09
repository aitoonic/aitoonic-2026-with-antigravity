# Aitoonic SEO Implementation Guide

This document outlines the SEO enhancements implemented in the Aitoonic website.

## Key SEO Features

### 1. Canonical URLs

Canonical URLs have been implemented for all pages to prevent duplicate content issues. The implementation uses Next.js's built-in metadata system and includes:

- A utility function `getCanonicalUrl()` in `/lib/seo/canonical.ts`
- Integration in all page components via the `alternates.canonical` metadata property
- Dynamically generated for all routes, including dynamic routes

### 2. Robots Meta Tags and robots.txt

- Default robots configuration in `/lib/seo/canonical.ts` sets indexing and following preferences
- `robots.txt` file in the public directory configured to allow all crawlers
- The robots.txt file references the sitemap.xml file

### 3. JSON-LD Structured Data

Structured data has been implemented for different page types:

- **Tool Pages**: Uses `SoftwareApplication` schema type with details about the tool
- **Category Pages**: Uses `CollectionPage` schema type
- **Homepage**: Uses `WebSite` schema type with search action
- **About Page**: Uses `AboutPage` schema type
- **Breadcrumbs**: Implemented on detail pages for improved navigation in search results

Implementation is in `/lib/seo/structured-data.ts` and integrated via the `schema` metadata property.

### 4. Dynamic Sitemap Generation

A dynamic sitemap.xml is generated during the build process:

- Script at `/scripts/generate-sitemap.js` pulls data from Supabase
- Includes all static and dynamic routes with appropriate priorities
- Updates automatically when new tools or categories are added
- Integrated into the build process via package.json script

## Automation

The SEO features are designed to be fully automated:

1. When new content is added to the database (tools, categories):
   - The sitemap.xml is regenerated during the next build
   - JSON-LD structured data will be generated for the new content
   - Canonical URLs are dynamically generated for all new routes

2. The process requires no manual intervention once set up.

## Implementation Details

### Key Files

- `/lib/seo/canonical.ts`: Canonical URL and robots configuration
- `/lib/seo/structured-data.ts`: JSON-LD structured data generation
- `/lib/seo/sitemap.ts`: TypeScript utilities for sitemap generation
- `/scripts/generate-sitemap.js`: Node.js script for generating sitemap.xml
- `/public/robots.txt`: Static robots.txt file
- `/public/sitemap.xml`: Initial sitemap (replaced during build)

### Integration with Next.js

The implementation leverages Next.js 14's App Router and Metadata API for SEO features:

- Server Components are used where possible for improved SEO
- `generateMetadata` functions in page components add metadata to each route
- Dynamic routes use parameters to generate appropriate metadata

## Maintenance and Updates

The system is designed to be low-maintenance. To update:

1. **Add new tools/categories**: Simply add them to the database; the sitemap and structured data will update automatically on the next build.
2. **Change SEO settings**: Modify the utility functions in the `/lib/seo` directory.
3. **Update the robots policy**: Edit both `robots.txt` and the robots configuration in `/lib/seo/canonical.ts`.

## Testing

Verify SEO implementation using tools like:
- Google Search Console
- Structured Data Testing Tool
- Lighthouse SEO audit
