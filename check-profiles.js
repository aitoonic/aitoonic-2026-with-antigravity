const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://opmsmqtxqrivlyigpudk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9wbXNtcXR4cXJpdmx5aWdwdWRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1OTUzOTQsImV4cCI6MjA1OTE3MTM5NH0.H-tPEzI6f_4hhptimscHWbfw4sqeGuLe09zfEyEHlHA';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkProfiles() {
    console.log('Checking profiles table...');
    const { data, error } = await supabase.from('profiles').select('id').limit(1);

    if (error) {
        console.error('Error accessing profiles table:', error.message);
        if (error.code === '42P01') {
            console.log('CONCLUSION: The profiles table DOES NOT exist. You must run the SQL migration.');
        }
    } else {
        console.log('Success: profiles table exists.');
    }
}

checkProfiles();
