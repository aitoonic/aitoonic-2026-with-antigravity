/**
 * Sitemap generator functions
 * These functions generate a sitemap XML based on the content from the database
 */
import { getTools, getCategories } from '@/lib/api';

interface SitemapEntry {
  url: string;
  lastModified?: string;
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

/**
 * Get all dynamic URLs for the sitemap
 */
export async function getDynamicSitemapEntries(): Promise<SitemapEntry[]> {
  try {
    // Get all tools and categories from the database
    const [tools, categories] = await Promise.all([
      getTools(),
      getCategories()
    ]);

    const entries: SitemapEntry[] = [];

    // Add tool entries
    tools.forEach(tool => {
      if (tool.slug) {
        entries.push({
          url: `/ai/${tool.slug}/`,
          lastModified: tool.updated_at || tool.published_at || new Date().toISOString(),
          changeFrequency: 'weekly',
          priority: 0.8
        });
      }
    });

    // Add category entries
    categories.forEach(category => {
      if (category.slug) {
        entries.push({
          url: `/category/${category.slug}/`,
          lastModified: category.updated_at || new Date().toISOString(),
          changeFrequency: 'weekly',
          priority: 0.7
        });
      }
    });

    return entries;
  } catch (error) {
    console.error('Error generating dynamic sitemap entries:', error);
    return [];
  }
}

/**
 * Get static page entries for the sitemap
 */
export function getStaticSitemapEntries(): SitemapEntry[] {
  return [
    {
      url: '/',
      changeFrequency: 'daily',
      priority: 1.0
    },
    {
      url: '/about/',
      changeFrequency: 'monthly',
      priority: 0.5
    },
    {
      url: '/categories/',
      changeFrequency: 'weekly',
      priority: 0.7
    },
    {
      url: '/ai-agent/',
      changeFrequency: 'monthly',
      priority: 0.6
    },
    {
      url: '/compare/',
      changeFrequency: 'monthly',
      priority: 0.6
    },
    {
      url: '/privacy/',
      changeFrequency: 'yearly',
      priority: 0.3
    },
    {
      url: '/terms/',
      changeFrequency: 'yearly',
      priority: 0.3
    }
  ];
}

/**
 * Generate sitemap XML content
 */
export async function generateSitemapXml(): Promise<string> {
  try {
    const [dynamicEntries, staticEntries] = await Promise.all([
      getDynamicSitemapEntries(),
      Promise.resolve(getStaticSitemapEntries())
    ]);

    const allEntries = [...staticEntries, ...dynamicEntries];

    // XML header
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    // Add entries
    allEntries.forEach(entry => {
      xml += '  <url>\n';
      xml += `    <loc>https://aitoonic.com${entry.url}</loc>\n`;

      if (entry.lastModified) {
        xml += `    <lastmod>${entry.lastModified.split('T')[0]}</lastmod>\n`;
      }

      if (entry.changeFrequency) {
        xml += `    <changefreq>${entry.changeFrequency}</changefreq>\n`;
      }

      if (entry.priority !== undefined) {
        xml += `    <priority>${entry.priority.toFixed(1)}</priority>\n`;
      }

      xml += '  </url>\n';
    });

    // Close XML
    xml += '</urlset>';

    return xml;
  } catch (error) {
    console.error('Error generating sitemap XML:', error);
    throw error;
  }
}


/**
 * Split sitemap generators
 */
export async function generateToolsSitemapXml(): Promise<string> {
  const tools = await getTools()
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
  // homepage & listing pages can be in index; here only tool detail pages
  tools.forEach(tool => {
    if (!tool.slug) return
    xml += '  <url>\n'
    xml += `    <loc>https://aitoonic.com/ai/${tool.slug}/</loc>\n`
    if (tool.updated_at || tool.published_at) {
      const lm = (tool.updated_at || tool.published_at) as string
      xml += `    <lastmod>${lm.split('T')[0]}</lastmod>\n`
    }
    xml += '    <changefreq>weekly</changefreq>\n'
    xml += '    <priority>0.8</priority>\n'
    xml += '  </url>\n'
  })
  xml += '</urlset>'
  return xml
}

export async function generateCategoriesSitemapXml(): Promise<string> {
  const categories = await getCategories()
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
  xml += '  <url>\n'
  xml += '    <loc>https://aitoonic.com/categories/</loc>\n'
  xml += '    <changefreq>weekly</changefreq>\n'
  xml += '    <priority>0.7</priority>\n'
  xml += '  </url>\n'
  categories.forEach(cat => {
    if (!cat.slug) return
    xml += '  <url>\n'
    xml += `    <loc>https://aitoonic.com/category/${cat.slug}/</loc>\n`
    if (cat.updated_at) {
      xml += `    <lastmod>${(cat.updated_at as string).split('T')[0]}</lastmod>\n`
    }
    xml += '    <changefreq>weekly</changefreq>\n'
    xml += '    <priority>0.7</priority>\n'
    xml += '  </url>\n'
  })
  xml += '</urlset>'
  return xml
}

export async function generateAgentsSitemapXml(): Promise<string> {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
  xml += '  <url>\n'
  xml += '    <loc>https://aitoonic.com/ai-agent/</loc>\n'
  xml += '    <changefreq>monthly</changefreq>\n'
  xml += '    <priority>0.6</priority>\n'
  xml += '  </url>\n'
  xml += '</urlset>'
  return xml
}

export async function generateCompareSitemapXml(): Promise<string> {
  const tools = await getTools()
  // group tools by category
  const byCat = tools.reduce<Record<string, typeof tools>>((acc, t) => {
    const key = t.category_id || 'uncategorized'
    if (!acc[key]) acc[key] = []
    acc[key].push(t)
    return acc
  }, {})

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
  Object.values(byCat).forEach(toolList => {
    // generate all unique pairs within same category
    for (let i = 0; i < toolList.length; i++) {
      for (let j = i + 1; j < toolList.length; j++) {
        const a = toolList[i]
        const b = toolList[j]
        const aSlug = a.slug || a.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
        const bSlug = b.slug || b.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
        const pairs = [`${aSlug}-vs-${bSlug}`, `${bSlug}-vs-${aSlug}`]
        pairs.forEach(seg => {
          xml += '  <url>\n'
          xml += `    <loc>https://aitoonic.com/compare/${seg}/</loc>\n`
          const lm = (a.updated_at || b.updated_at || a.published_at || b.published_at) as string | undefined
          if (lm) xml += `    <lastmod>${lm.split('T')[0]}</lastmod>\n`
          xml += '    <changefreq>monthly</changefreq>\n'
          xml += '    <priority>0.6</priority>\n'
          xml += '  </url>\n'
        })
      }
    }
  })
  xml += '</urlset>'
  return xml
}



export function generateSitemapIndexXml(): string {
  const urls = [
    'https://aitoonic.com/sitemap-tools.xml',
    'https://aitoonic.com/sitemap-categories.xml',
    'https://aitoonic.com/sitemap-agents.xml',
    'https://aitoonic.com/sitemap-compare.xml',

  ]
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
  xml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
  urls.forEach(u => {
    xml += '  <sitemap>\n'
    xml += `    <loc>${u}</loc>\n`
    xml += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`
    xml += '  </sitemap>\n'
  })
  xml += '</sitemapindex>'
  return xml
}
