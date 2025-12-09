const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Use environment variables for Supabase credentials
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: Supabase credentials are missing. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your environment variables.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkData() {
  try {
    console.log('=== CHECKING PRICING DATA ===');
    
    // Get tools with pricing data
    const { data: tools, error } = await supabase
      .from('tools')
      .select('id, name, pricing, price')
      .not('pricing', 'is', null)
      .limit(5);
    
    if (error) {
      console.error('Error fetching tools:', error);
    } else {
      console.log(`Found ${tools.length} tools with pricing data:`);
      tools.forEach((tool, i) => {
        console.log(`\nTool ${i+1}: ${tool.name}`);
        console.log('- pricing array:', JSON.stringify(tool.pricing, null, 2));
        console.log('- standalone price field:', tool.price);
      });
    }
    
    console.log('\n=== CHECKING CATEGORIES ===');
    
    // Check category data
    const { data: categories, error: catError } = await supabase
      .from('categories')
      .select('id, name, slug')
      .limit(3);
    
    if (catError) {
      console.error('Error fetching categories:', catError);
    } else {
      console.log(`Found ${categories.length} categories:`);
      categories.forEach(cat => {
        console.log(`- ${cat.name} (slug: ${cat.slug}, id: ${cat.id})`);
      });
    }
    
    console.log('\n=== CHECKING SIMILAR TOOLS TEST ===');
    
    // Test similar tools query
    const testCategoryId = categories && categories[0] ? categories[0].id : null;
    if (testCategoryId) {
      const { data: similarTools, error: simError } = await supabase
        .from('tools')
        .select('id, name, category_id')
        .eq('category_id', testCategoryId)
        .limit(3);
      
      if (simError) {
        console.error('Error fetching similar tools:', simError);
      } else {
        console.log(`Found ${similarTools.length} tools in category ${testCategoryId}:`);
        similarTools.forEach(t => {
          console.log(`- ${t.name}`);
        });
      }
    }
    
  } catch (err) {
    console.error('Script error:', err);
  }
}

checkData();
