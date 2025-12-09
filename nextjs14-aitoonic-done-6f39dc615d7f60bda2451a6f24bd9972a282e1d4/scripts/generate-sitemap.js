/**
 * This script generates a sitemap.xml file based on the dynamic data from the database
 * It should be run as part of the build process
 */
const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if (!supabaseUrl || !supabaseKey) {
  console.warn('Sitemap: missing Supabase envs; generating sitemap with only static routes.');
}
const supabase = (supabaseUrl && supabaseKey) ? createClient(supabaseUrl, supabaseKey) : null;

// Base URL of the website
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://aitoonic.com';

// Function to get all tools from the database
async function getTools() {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('tools')
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    console.error('Error fetching tools:', error);
    return [];
  }

  return data || [];
}

// Function to get all categories from the database
async function getCategories() {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }

  return data || [];
}

// Generate sitemap XML
async function generateSitemap() {
  try {
    console.log('Generating sitemap.xml...');
    
    // Get all tools and categories
    const [tools, categories] = await Promise.all([getTools(), getCategories()]);
    
    // Static pages
    const staticPages = [
      { url: '/', priority: 1.0, changeFreq: 'daily' },
      { url: '/categories/', priority: 0.7, changeFreq: 'weekly' },
      { url: '/about/', priority: 0.5, changeFreq: 'monthly' },
      { url: '/ai-agent/', priority: 0.6, changeFreq: 'monthly' },
      { url: '/compare/', priority: 0.6, changeFreq: 'monthly' },
      { url: '/privacy/', priority: 0.3, changeFreq: 'yearly' },
      { url: '/terms/', priority: 0.3, changeFreq: 'yearly' },
    ];
    
    // Dynamic pages for tools
    const toolPages = tools.map(tool => ({
      url: `/ai/${tool.slug}/`,
      priority: 0.8,
      changeFreq: 'weekly',
      lastmod: tool.updated_at || tool.published_at || new Date().toISOString().split('T')[0]
    }));
    
    // Dynamic pages for categories
    const categoryPages = categories.map(category => ({
      url: `/category/${category.slug}/`,
      priority: 0.7,
      changeFreq: 'weekly',
      lastmod: category.updated_at || new Date().toISOString().split('T')[0]
    }));
    
    // Combine all pages
    const allPages = [...staticPages, ...toolPages, ...categoryPages];
    
    // Generate XML
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    
    allPages.forEach(page => {
      xml += '  <url>\n';
      xml += `    <loc>${BASE_URL}${page.url}</loc>\n`;
      
      if (page.lastmod) {
        xml += `    <lastmod>${page.lastmod.split('T')[0]}</lastmod>\n`;
      }
      
      if (page.changeFreq) {
        xml += `    <changefreq>${page.changeFreq}</changefreq>\n`;
      }
      
      if (page.priority !== undefined) {
        xml += `    <priority>${page.priority.toFixed(1)}</priority>\n`;
      }
      
      xml += '  </url>\n';
    });
    
    xml += '</urlset>';
    
    // Write to file
    const publicDir = path.join(process.cwd(), 'public');
    
    // Write to public directory for development
    fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xml);
    console.log('Sitemap generated in public directory');
    
    // On Vercel (serverless) we only need public/sitemap.xml for static serving
    
    return { success: true, count: allPages.length };
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return { success: false, error: error.message };
  }
}

// Execute the function
generateSitemap()
  .then(result => {
    if (result.success) {
      console.log(`Sitemap generation completed with ${result.count} URLs`);
      process.exit(0);
    } else {
      console.error('Sitemap generation failed:', result.error);
      process.exit(1);
    }
  })
  .catch(error => {
    console.error('Unhandled error during sitemap generation:', error);
    process.exit(1);
  });
