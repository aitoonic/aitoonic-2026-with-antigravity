-- Add submission tracking to users
ALTER TABLE "public"."users" 
ADD COLUMN IF NOT EXISTS "submission_credits" integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS "billing_plan" text;

-- Create payments table
CREATE TABLE IF NOT EXISTS "public"."payments" (
    "id" uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    "user_id" uuid REFERENCES "public"."users"("id") ON DELETE CASCADE NOT NULL,
    "amount" integer NOT NULL,
    "currency" text NOT NULL,
    "status" text NOT NULL,
    "razorpay_order_id" text,
    "razorpay_payment_id" text,
    "razorpay_signature" text,
    "plan_type" text NOT NULL,
    "created_at" timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on payments
ALTER TABLE "public"."payments" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own payments" 
ON "public"."payments" FOR SELECT 
USING (auth.uid() = user_id);

-- Update tools table for submission flow
ALTER TABLE "public"."tools" 
ADD COLUMN IF NOT EXISTS "submitter_id" uuid REFERENCES "public"."users"("id"),
ADD COLUMN IF NOT EXISTS "submission_status" text DEFAULT 'approved', -- Defaulting old tools to approved
ADD COLUMN IF NOT EXISTS "tool_type" text DEFAULT 'ai_tool',
ADD COLUMN IF NOT EXISTS "gpt_metadata" jsonb;

-- Policy: Users can insert tools if they have credits (checked in application logic/trigger)
-- Ideally we check credits in a BEFORE INSERT trigger or application layer.
-- For now, application layer is safer for 'credits' deduction to be atomic with insert.

-- Allow users to view their own tools
create policy "Users can view own tools"
  on public.tools for select
  using ( submitter_id = auth.uid() OR submission_status = 'approved' );

-- RPC Function to safely increment credits (Security Definer)
CREATE OR REPLACE FUNCTION public.increment_submission_credits(row_id uuid, amount int)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.users
  SET submission_credits = submission_credits + amount,
      billing_plan = COALESCE(billing_plan, 'paid') -- simplified
  WHERE id = row_id;
END;
$$;

-- Trigger to protect submission_credits from direct update by user
CREATE OR REPLACE FUNCTION public.protect_submission_credits()
RETURNS TRIGGER AS $$
BEGIN
  IF current_user = 'authenticated' OR current_user = 'anon' THEN
    IF NEW.submission_credits IS DISTINCT FROM OLD.submission_credits THEN
       RAISE EXCEPTION 'Cannot directly update submission_credits. Use the payment flow.';
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER protect_credits_update
  BEFORE UPDATE ON public.users
  FOR EACH ROW
  EXECUTE FUNCTION public.protect_submission_credits();
