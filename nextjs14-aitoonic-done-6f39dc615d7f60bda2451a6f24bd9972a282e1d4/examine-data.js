const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://opmsmqtxqrivlyigpudk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9wbXNtcXR4cXJpdmx5aWdwdWRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1OTUzOTQsImV4cCI6MjA1OTE3MTM5NH0.H-tPEzI6f_4hhptimscHWbfw4sqeGuLe09zfEyEHlHA';
const supabase = createClient(supabaseUrl, supabaseKey);

async function examineData() {
  try {
    console.log('Fetching sample tools...');
    
    // Get a few tools to examine structure
    const { data: tools, error } = await supabase
      .from('tools')
      .select('*')
      .limit(3);
    
    if (error) {
      console.error('Error fetching tools:', error);
      return;
    }
    
    console.log('Number of tools fetched:', tools.length);
    console.log('\n=== SAMPLE TOOL DATA ===');
    console.log(JSON.stringify(tools[0], null, 2));
    
    console.log('\n=== COLUMNS AVAILABLE ===');
    console.log(Object.keys(tools[0]));
    
    // Check if there's pricing data specifically
    console.log('\n=== PRICING DATA CHECK ===');
    tools.forEach((tool, index) => {
      console.log(`Tool ${index + 1} (${tool.name}):`);
      console.log('- price field:', tool.price);
      console.log('- pricing field:', tool.pricing);
      console.log('---');
    });
    
    // Get categories to understand structure
    const { data: categories, error: catError } = await supabase
      .from('categories')
      .select('*')
      .limit(2);
    
    if (catError) {
      console.error('Error fetching categories:', catError);
    } else {
      console.log('\n=== SAMPLE CATEGORY DATA ===');
      console.log(JSON.stringify(categories[0], null, 2));
    }
    
  } catch (err) {
    console.error('Script error:', err);
  }
}

examineData();
