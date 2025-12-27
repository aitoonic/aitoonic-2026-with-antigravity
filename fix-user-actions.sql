-- Fix for Saved Tools and Votes (RLS and Table Structure)

-- 1. Ensure saved_tools table exists and is correct
create table if not exists public.saved_tools (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null, -- Changed to reference auth.users directly to be safer if profiles is missing
  tool_id uuid references public.tools(id) on delete cascade not null, -- Add reference to tools if possible, or just uuid
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, tool_id)
);

-- 2. Ensure tool_votes table exists and is correct
create table if not exists public.tool_votes (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  tool_id uuid references public.tools(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, tool_id)
);

-- 3. Enable RLS
alter table public.saved_tools enable row level security;
alter table public.tool_votes enable row level security;

-- 4. Drop existing policies to avoid conflicts (and ensure we have clean slate)
drop policy if exists "Users can view their own saved tools." on public.saved_tools;
drop policy if exists "Users can create their own saved tools." on public.saved_tools;
drop policy if exists "Users can delete their own saved tools." on public.saved_tools;
drop policy if exists "Users can view all votes." on public.tool_votes;
drop policy if exists "Users can vote for tools." on public.tool_votes;
drop policy if exists "Users can remove their vote." on public.tool_votes;

-- 5. Re-create Policies (Robust)

-- Saved Tools Policies
create policy "Users can view their own saved tools"
  on public.saved_tools for select
  using (auth.uid() = user_id);

create policy "Users can insert their own saved tools"
  on public.saved_tools for insert
  with check (auth.uid() = user_id);

create policy "Users can delete their own saved tools"
  on public.saved_tools for delete
  using (auth.uid() = user_id);

-- Tool Votes Policies
create policy "Votes are viewable by everyone"
  on public.tool_votes for select
  using (true);

create policy "Users can vote"
  on public.tool_votes for insert
  with check (auth.uid() = user_id);

create policy "Users can remove vote"
  on public.tool_votes for delete
  using (auth.uid() = user_id);

-- 6. Grant permissions (just in case)
grant all on public.saved_tools to authenticated;
grant all on public.tool_votes to authenticated;
grant all on public.saved_tools to service_role;
grant all on public.tool_votes to service_role;
