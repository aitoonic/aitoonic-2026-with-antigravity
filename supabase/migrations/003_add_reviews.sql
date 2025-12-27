-- Use a transaction to ensure all-or-nothing execution
BEGIN;

-----------------------------------------------------------------------------
-- 1. FIX TOOLS TABLE (Ensure it has a Primary Key)
-----------------------------------------------------------------------------

-- Remove duplicate rows from tools (if any), keeping the one with the highest ctid (effectively the latest one physically)
DELETE FROM tools a USING tools b WHERE a.id = b.id AND a.ctid < b.ctid;

-- Make sure id cannot be null
ALTER TABLE tools ALTER COLUMN id SET NOT NULL;

-- Drop existing constraint if it exists (to avoid error if we try to add it again)
ALTER TABLE tools DROP CONSTRAINT IF EXISTS tools_pkey;

-- Add Primary Key constraint
ALTER TABLE tools ADD CONSTRAINT tools_pkey PRIMARY KEY (id);


-----------------------------------------------------------------------------
-- 2. CREATE REVIEWS TABLE
-----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS reviews (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  -- Referencing profiles (which cascades from auth.users)
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  -- Foreign Key to tools
  tool_id uuid NOT NULL REFERENCES tools(id) ON DELETE CASCADE,
  
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  
  -- Validation: One review per tool per user
  CONSTRAINT reviews_user_tool_unique UNIQUE (user_id, tool_id)
);


-----------------------------------------------------------------------------
-- 3. ENABLE RLS & POLICIES
-----------------------------------------------------------------------------

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Clean up old policies if they exist (to allow re-running this part safeish)
DROP POLICY IF EXISTS "Reviews are viewable by everyone." ON reviews;
DROP POLICY IF EXISTS "Users can insert their own reviews." ON reviews;
DROP POLICY IF EXISTS "Users can update their own reviews." ON reviews;
DROP POLICY IF EXISTS "Users can delete their own reviews." ON reviews;

-- Re-create policies
CREATE POLICY "Reviews are viewable by everyone." ON reviews
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own reviews." ON reviews
  FOR INSERT WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "Users can update their own reviews." ON reviews
  FOR UPDATE USING ((select auth.uid()) = user_id);

CREATE POLICY "Users can delete their own reviews." ON reviews
  FOR DELETE USING ((select auth.uid()) = user_id);

COMMIT;
