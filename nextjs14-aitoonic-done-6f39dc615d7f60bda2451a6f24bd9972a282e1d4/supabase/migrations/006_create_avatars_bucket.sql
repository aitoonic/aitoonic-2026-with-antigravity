-- Create a new storage bucket for avatars
INSERT INTO storage.buckets (id, name, public) 
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- RLS is already enabled on storage.objects, so we skip the ALTER TABLE command to avoid permission errors.

-- Drop existing policies to avoid conflicts
-- Note: You might need to be a superuser or the table owner to drop policies. 
-- If these fail, you can manually delete them in the dashboard or ignore if they don't exist.
DO $$ 
BEGIN
    DROP POLICY IF EXISTS "Avatar images are publicly accessible" ON storage.objects;
    DROP POLICY IF EXISTS "Users can upload their own avatar" ON storage.objects;
    DROP POLICY IF EXISTS "Users can update their own avatar" ON storage.objects;
    DROP POLICY IF EXISTS "Users can delete their own avatar" ON storage.objects;
EXCEPTION
    WHEN OTHERS THEN
        NULL; -- Ignore errors if we can't drop (policies might not exist or permission denied)
END $$;

-- Set up security policies for the avatars bucket
-- We use a DO block or just create them. If they fail due to existing, we dropped them above.
-- If permissions allow creating but not dropping, we might need to be careful.
-- Assuming standard Supabase setup where you CAN create policies.

CREATE POLICY "Avatar images are publicly accessible" 
ON storage.objects FOR SELECT 
USING ( bucket_id = 'avatars' );

CREATE POLICY "Users can upload their own avatar" 
ON storage.objects FOR INSERT 
WITH CHECK (
    bucket_id = 'avatars' 
    AND auth.uid()::text = (storage.foldername(name))[1]
    AND (LOWER(storage.extension(name)) IN ('png', 'jpg', 'jpeg', 'webp', 'gif'))
);

CREATE POLICY "Users can update their own avatar" 
ON storage.objects FOR UPDATE
USING (
    bucket_id = 'avatars' 
    AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete their own avatar" 
ON storage.objects FOR DELETE
USING (
    bucket_id = 'avatars' 
    AND auth.uid()::text = (storage.foldername(name))[1]
);
