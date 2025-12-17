-- Create a table for tool votes (rank up)
create table if not exists tool_votes (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  tool_id uuid not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  -- Prevent multiple votes for the same tool by the same user
  unique(user_id, tool_id)
);

alter table tool_votes enable row level security;

create policy "Users can view all votes." on tool_votes
  for select using (true);

create policy "Users can vote for tools." on tool_votes
  for insert with check ((select auth.uid()) = user_id);

create policy "Users can remove their vote." on tool_votes
  for delete using ((select auth.uid()) = user_id);
