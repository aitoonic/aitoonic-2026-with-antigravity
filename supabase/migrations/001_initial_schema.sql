-- Create a table for public profiles
create table if not exists profiles (
  id uuid references auth.users on delete cascade not null primary key,
  updated_at timestamp with time zone,
  full_name text,
  email text,
  phone_number text,
  avatar_url text, -- To be used when we implement avatar upload or from OAuth
  
  constraint username_length check (char_length(full_name) >= 3)
);

-- Set up Row Level Security (RLS)
-- See https://supabase.com/docs/guides/auth/row-level-security for more details.
alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can insert their own profile." on profiles
  for insert with check ((select auth.uid()) = id);

create policy "Users can update own profile." on profiles
  for update using ((select auth.uid()) = id);

-- This triggers a function every time a new user signs up in auth.users
-- It creates a corresponding profile in the profiles table
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, email, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.email, new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to call the function on signup
create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Create a table for saved tools (bookmarks)
create table if not exists saved_tools (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  tool_id uuid not null, -- Assuming 'tools' table exists and tool_id relates to it. If 'tools' is simpler, adjust accordingly.
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  -- Prevent saving the same tool twice by same user
  unique(user_id, tool_id)
);

alter table saved_tools enable row level security;

create policy "Users can view their own saved tools." on saved_tools
  for select using ((select auth.uid()) = user_id);

create policy "Users can create their own saved tools." on saved_tools
  for insert with check ((select auth.uid()) = user_id);

create policy "Users can delete their own saved tools." on saved_tools
  for delete using ((select auth.uid()) = user_id);

-- Set up Storage for Avatars (Optional, can be added later)
-- insert into storage.buckets (id, name)
-- values ('avatars', 'avatars');
-- create policy "Avatar images are publicly accessible." on storage.objects
--   for select using (bucket_id = 'avatars');
-- create policy "Anyone can upload an avatar." on storage.objects
--   for insert with check (bucket_id = 'avatars');
