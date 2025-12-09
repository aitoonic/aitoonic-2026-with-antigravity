-- Function to generate a slug from the name
CREATE OR REPLACE FUNCTION public.generate_slug()
RETURNS TRIGGER AS $$
BEGIN
  -- Only generate slug if it's null or empty
  IF NEW.slug IS NULL OR NEW.slug = '' THEN
    -- Convert name to lowercase, replace non-alphanumeric chars with hyphens, remove leading/trailing hyphens
    NEW.slug := lower(regexp_replace(trim(NEW.name), '[^a-zA-Z0-9]+', '-', 'g'));
    
    -- Remove trailing hyphens if any (e.g. "Tool Name!" -> "tool-name-")
    NEW.slug := regexp_replace(NEW.slug, '-+$', '');
    
    -- Remove leading hyphens if any
    NEW.slug := regexp_replace(NEW.slug, '^-+', '');
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to run before insert on categories table
DROP TRIGGER IF EXISTS trigger_auto_slug_categories ON public.categories;
CREATE TRIGGER trigger_auto_slug_categories
BEFORE INSERT ON public.categories
FOR EACH ROW
EXECUTE FUNCTION public.generate_slug();
