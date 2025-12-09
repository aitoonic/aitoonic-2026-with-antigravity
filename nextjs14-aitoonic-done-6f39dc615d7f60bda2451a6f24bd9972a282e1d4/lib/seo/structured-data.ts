/**
 * JSON-LD Structured Data Generation
 */
import { Tool, Category } from '@/lib/types';

/**
 * Generate software application structured data for a tool
 */
export function generateToolJsonLd(tool: Tool, categoryName?: string): Record<string, any> {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    description: tool.description,
    applicationCategory: categoryName || 'AI Tool',
    offers: tool.pricing ? {
      '@type': 'Offer',
      price: tool.pricing[0]?.price || 'Free',
      priceCurrency: 'USD'
    } : undefined,
    screenshot: tool.image_url ? tool.image_url : undefined,
    operatingSystem: 'Web-based',
    url: `https://aitoonic.com/ai/${tool.slug}/`,
  };
}

/**
 * Generate structured data for a category page
 */
export function generateCategoryJsonLd(category: Category, toolsCount: number): Record<string, any> {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${category.name} AI Tools`,
    description: category.description || `Collection of ${toolsCount} ${category.name} AI Tools`,
    url: `https://aitoonic.com/category/${category.slug}/`,
    numberOfItems: toolsCount,
  };
}

/**
 * Generate structured data for the homepage
 */
export function generateHomePageJsonLd(categoriesCount: number, toolsCount: number): Record<string, any> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Aitoonic',
    description: 'Discover the Best AI Tools and Platforms',
    url: 'https://aitoonic.com/',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://aitoonic.com/?search={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    },
    specialty: `Directory of ${toolsCount} AI tools across ${categoriesCount} categories`
  };
}

/**
 * Generate structured data for the About page
 */
export function generateAboutPageJsonLd(): Record<string, any> {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About Aitoonic',
    description: 'Learn more about Aitoonic, the AI tools directory',
    url: 'https://aitoonic.com/about/',
    mainContentOfPage: {
      '@type': 'WebPageElement',
      about: 'Aitoonic is a comprehensive directory of AI tools and platforms.'
    }
  };
}

/**
 * Generate breadcrumb structured data
 */
export function generateBreadcrumbJsonLd(items: Array<{name: string, url: string}>): Record<string, any> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}

/**
 * Generate structured data for a comparison page between two tools
 */
export function generateCompareJsonLd(toolA: Tool, toolB: Tool): Record<string, any> {
  const toSoftwareApplication = (tool: Tool) => ({
    '@type': 'SoftwareApplication',
    name: tool.name,
    description: tool.description,
    operatingSystem: 'Web-based',
    url: `https://aitoonic.com/ai/${tool.slug}/`,
    offers: tool.pricing ? {
      '@type': 'Offer',
      price: tool.pricing[0]?.price || 'Free',
      priceCurrency: 'USD'
    } : undefined,
    screenshot: tool.image_url || undefined
  });

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `${toolA.name} vs ${toolB.name} - AI Tool Comparison`,
    description: `Side-by-side comparison of ${toolA.name} and ${toolB.name} including features and pricing.`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: [toSoftwareApplication(toolA), toSoftwareApplication(toolB)]
    }
  };
}

/**
 * Generate FAQ structured data
 */
export function generateFAQJsonLd(faqs: Array<{question: string, answer: string}>): Record<string, any> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}
