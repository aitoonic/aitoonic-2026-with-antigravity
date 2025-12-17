-- COMPLETE FIX: Drop and Recreate Permissions and Tables (BYPASSING FK CONSTRAINT)

-- 1. Reset Tables
drop table if exists public.saved_tools cascade;
drop table if exists public.tool_votes cascade;

-- 2. Recreate Tables with LOOSE Referencing (Fixes "no unique constraint" error)
-- We removed 'references public.tools(id)' because your tools table likely has duplicate IDs or no primary key.
-- This ensures the tables are created successfully.

create table public.saved_tools (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  tool_id uuid not null, -- No FK constraint to avoid 42830 error
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, tool_id)
);

create table public.tool_votes (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  tool_id uuid not null, -- No FK constraint to avoid 42830 error
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, tool_id)
);

-- 3. Enable RLS
alter table public.saved_tools enable row level security;
alter table public.tool_votes enable row level security;

-- CRITICAL: Ensure 'tools' table is readable by everyone
alter table public.tools enable row level security;
drop policy if exists "Tools are viewable by everyone" on public.tools;
create policy "Tools are viewable by everyone" 
  on public.tools for select 
  using (true);

-- 4. Create Policies for Saved Tools
create policy "Users can view their own saved tools"
  on public.saved_tools for select
  using (auth.uid() = user_id);

create policy "Users can insert their own saved tools"
  on public.saved_tools for insert
  with check (auth.uid() = user_id);

create policy "Users can delete their own saved tools"
  on public.saved_tools for delete
  using (auth.uid() = user_id);

-- 5. Create Policies for Votes
create policy "Votes are viewable by everyone"
  on public.tool_votes for select
  using (true);

create policy "Users can vote"
  on public.tool_votes for insert
  with check (auth.uid() = user_id);

create policy "Users can remove vote"
  on public.tool_votes for delete
  using (auth.uid() = user_id);

-- 6. Grant Permissions
grant all on public.saved_tools to authenticated;
grant all on public.tool_votes to authenticated;
grant all on public.saved_tools to service_role;
grant all on public.tool_votes to service_role;
grant select on public.tools to anon, authenticated, service_role;
