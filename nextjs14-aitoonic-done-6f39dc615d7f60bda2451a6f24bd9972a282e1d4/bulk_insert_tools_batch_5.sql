-- Migration to add Batch 5 of 10 new AI tools with EXACT user content
-- Format: image_url is NULL, ON CONFLICT DO UPDATE (except image_url) to fix data but preserve uploads.

-- ==========================================
-- 1. Outline Ninja (Category: AI Infographic Generator Tools - NEW)
-- ==========================================
-- Create category if not exists
INSERT INTO categories (id, name, slug, description, created_at, updated_at, seo_title, seo_description)
VALUES (
  uuid_generate_v4(),
  'AI Infographic Generator Tools',
  'ai-infographic-generator-tools',
  'AI Infographic Generator Tools for building data visuals, charts, and branded layouts instantly using automated design engines and smart content extraction.',
  NOW(), NOW(),
  'AI Infographic Generator Tools',
  'AI Infographic Generator Tools for building data visuals, charts, and branded layouts instantly using automated design engines and smart content extraction.'
)
ON CONFLICT (slug) DO NOTHING;

WITH outline_category AS (
  SELECT id FROM categories WHERE slug = 'ai-infographic-generator-tools' LIMIT 1
)
INSERT INTO tools (
  id, name, slug, description, url, image_url, image_alt, pricing, features, category_id, published_at, created_at, updated_at, seo_title, seo_description, how_to_use, rating, featured
)
SELECT
  uuid_generate_v4(),
  'Outline Ninja',
  'outline-ninja',
  'Outline Ninja is an AI-powered infographic generator and topic research tool designed for bloggers, SEO agencies, and content marketers. It allows you to quickly turn articles or keywords into customized, branded infographics and generates detailed article outlines to speed up content creation.',
  'https://outline.ninja/',
  NULL, -- Image set to NULL
  'Outline Ninja – AI Infographic Generator & Topic Research Tool',
  '[
    {"plan": "Starter", "price": "$5/month", "features": ["15 credits/month", "all features except API access", "tech support", "no watermark"]},
    {"plan": "Pro", "price": "$30/month", "features": ["Unlimited credits", "all features including API access", "email support", "no watermark"]},
    {"plan": "$1 Trial", "price": "$1", "features": ["3 credits for 3 days", "then $5/month"]}
  ]'::jsonb,
  '[
    {"title": "AI Infographic Generator", "description": "Convert articles or keywords into visually engaging infographics with automatic design and branding."},
    {"title": "Topic Research Tool", "description": "Discover related keywords, questions, and entities for better content structure and SEO optimization."},
    {"title": "HowTo Schema Generator", "description": "Automatically generate structured HowTo schema for better Google search visibility."},
    {"title": "Missing Topics & Entities Analyzer", "description": "Ensure your content covers all essential aspects and ranks higher on Google SERPs."}
  ]'::jsonb,
  outline_category.id, NOW(), NOW(), NOW(),
  'Outline Ninja – AI Infographic Generator & Topic Research Tool',
  'Use Outline Ninja to turn articles into AI-powered infographics and generate comprehensive article outlines. Try our infographic maker and research tools for SEO success.',
  'Sign up with your email, enter your keyword or article, choose a template, customize colors and fonts, upload your logo, and generate your infographic. With a few clicks, you can download your infographic or create a custom outline for your article.',
  4.5, true
FROM outline_category
WHERE EXISTS (SELECT 1 FROM outline_category)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  url = EXCLUDED.url,
  -- image_url PRESERVED
  image_alt = EXCLUDED.image_alt,
  pricing = EXCLUDED.pricing,
  features = EXCLUDED.features,
  category_id = EXCLUDED.category_id,
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  how_to_use = EXCLUDED.how_to_use,
  rating = EXCLUDED.rating,
  featured = EXCLUDED.featured,
  updated_at = NOW();


-- ==========================================
-- 2. Sketch Logo AI (Category: AI Logo Generator)
-- ==========================================
WITH sketch_category AS (
  SELECT id FROM categories WHERE name ILIKE 'AI Logo Generator' OR name ILIKE 'AI Logo Generators%' LIMIT 1
)
INSERT INTO tools (
  id, name, slug, description, url, image_url, image_alt, pricing, features, category_id, published_at, created_at, updated_at, seo_title, seo_description, how_to_use, rating, featured
)
SELECT
  uuid_generate_v4(),
  'Sketch Logo AI',
  'sketch-logo-ai',
  'Sketch Logo AI is an AI Logo Maker and AI Tattoo Generator that turns sketches, images, and prompts into designs. It supports Sketch to Logo, 2D to 3D, Logo to Logo, Image to Art, Sketch to Tattoo, Tattoo Variants. Download in PNG and SVG.
You get 4300+ Fonts, 30.000+ Icon options, 15 preset styles, 2D/3D Generations, Private Generations, Commercial License, High-Definition SVG Designs.',
  'https://www.sketchlogo.ai/',
  NULL, -- Image set to NULL
  'Sketch Logo AI - AI Logo Maker and Tattoo Generator',
  '[
    {"plan": "Pro Monthly", "price": "$19/month", "features": ["Unlimited Usage", "15 preset styles", "2D/3D Generations", "4300+ Fonts", "PNG/SVG Output", "Tutorials for best results", "500+ Color options", "30.000+ Icon options", "Private Generations", "Commercial License", "Monthly License"]},
    {"plan": "Pro Yearly", "price": "$199/year", "features": ["Unlimited Usage", "15 preset styles", "2D/3D Generations", "4300+ Fonts", "PNG/SVG Output", "Tutorials for best results", "500+ Color options", "30.000+ Icon options", "Private Generations", "Commercial License", "Feature Requests", "Yearly License"]}
  ]'::jsonb,
  '[
    {"title": "Sketch to Logo", "description": "Sketch, generate and fascinate it."},
    {"title": "2D to 3D", "description": "Generate any 2D logo or image into 3D illustration."},
    {"title": "Logo to Logo", "description": "Redesign and generate any logo."},
    {"title": "Image to Art", "description": "Turn any image into an art piece."},
    {"title": "Tattoo Variants", "description": "Redesign and re-generate any tattoo."}
  ]'::jsonb,
  sketch_category.id, NOW(), NOW(), NOW(),
  'Sketch Logo AI - AI Logo Maker and Tattoo Generator',
  'Create logos and tattoos with Sketch Logo AI. Sketch to Logo, 2D to 3D, Logo to Logo, Image to Art. Download PNG or SVG.',
  'Type prompts and optionally sketch what is on your mind and start generating your professional logo or design. Choose logo style, colors, fonts, icons inside Sketch Logo AI. Generate and download in PNG and SVG.',
  4.7, true
FROM sketch_category
WHERE EXISTS (SELECT 1 FROM sketch_category)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  url = EXCLUDED.url,
  -- image_url PRESERVED
  image_alt = EXCLUDED.image_alt,
  pricing = EXCLUDED.pricing,
  features = EXCLUDED.features,
  category_id = EXCLUDED.category_id,
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  how_to_use = EXCLUDED.how_to_use,
  rating = EXCLUDED.rating,
  featured = EXCLUDED.featured,
  updated_at = NOW();


-- ==========================================
-- 3. Hocoos (Category: AI Website Builders)
-- ==========================================
WITH hocoos_category AS (
  SELECT id FROM categories WHERE name ILIKE 'AI Website Builders' OR name ILIKE 'AI Website Builder%' LIMIT 1
)
INSERT INTO tools (
  id, name, slug, description, url, image_url, image_alt, pricing, features, category_id, published_at, created_at, updated_at, seo_title, seo_description, how_to_use, rating, featured
)
SELECT
  uuid_generate_v4(),
  'Hocoos',
  'hocoos',
  'Hocoos is an AI website builder that creates professional websites, blogs, portfolios, booking sites, and online stores with no coding or design skills required. It offers AI content co-writing, mobile optimization, SEO tools, and integrations with Google Search Console, Google Analytics, and ad platforms.',
  'https://hocoos.com/',
  NULL, -- Image set to NULL
  'Hocoos – AI Website Builder for Small Business Growth',
  '[
    {"plan": "Free Forever", "price": "$0/two weeks", "features": ["Build and launch", "AI design", "click-and-edit", "mobile optimized", "marketing integrations", "accept payments", "connect domain"]},
    {"plan": "Premium Monthly", "price": "$15/month", "features": ["All Free features", "1 free custom domain", "remove branding", "send email campaigns", "embed widgets", "customize forms", "unlimited integrations", "higher storage"]},
    {"plan": "Premium Yearly", "price": "$150/year", "features": ["All Premium Monthly features", "free domain for 1 year", "free professional mailbox"]},
    {"plan": "Professional Mailbox", "price": "$2.5/month", "features": ["Email hosting through Hocoos"]}
  ]'::jsonb,
  '[
    {"title": "AI-Powered Design", "description": "Creates a unique website tailored to your brand and goals."},
    {"title": "Click-and-Edit Editor", "description": "Instantly change any element with AI suggestions."},
    {"title": "Advanced SEO Control", "description": "Customize URLs, page structure, and meta descriptions."},
    {"title": "Integrated Booking", "description": "Manage appointments, staff, and schedules online."},
    {"title": "E-commerce Ready", "description": "Add products, accept payments, and track sales in one place."}
  ]'::jsonb,
  hocoos_category.id, NOW(), NOW(), NOW(),
  'Hocoos – AI Website Builder for Small Business Growth',
  'Build and launch websites, stores, blogs, and booking sites with Hocoos AI. Includes SEO tools, marketing integrations, and click-and-edit customization.',
  'Enter your email, describe your business and goals, then choose from three AI-generated website options. Use the click-and-edit editor to customize text, images, and layouts. Connect your domain, add marketing integrations, and launch.',
  4.6, true
FROM hocoos_category
WHERE EXISTS (SELECT 1 FROM hocoos_category)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  url = EXCLUDED.url,
  -- image_url PRESERVED
  image_alt = EXCLUDED.image_alt,
  pricing = EXCLUDED.pricing,
  features = EXCLUDED.features,
  category_id = EXCLUDED.category_id,
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  how_to_use = EXCLUDED.how_to_use,
  rating = EXCLUDED.rating,
  featured = EXCLUDED.featured,
  updated_at = NOW();


-- ==========================================
-- 4. ThetaWave AI (Category: AI Note Taker Tools)
-- ==========================================
WITH thetawave_category AS (
  SELECT id FROM categories WHERE name ILIKE 'AI Note Taker Tools' OR name ILIKE 'AI Note Taking%' LIMIT 1
)
INSERT INTO tools (
  id, name, slug, description, url, image_url, image_alt, pricing, features, category_id, published_at, created_at, updated_at, seo_title, seo_description, how_to_use, rating, featured
)
SELECT
  uuid_generate_v4(),
  'ThetaWave AI',
  'thetawave-ai',
  'ThetaWave AI is an AI note-taking app. It turns lectures, PDFs, and YouTube into structured notes, mindmaps, quizzes, flashcards, and podcasts.
Real time transcripts create organized notes while you listen. Upload PDF, Word, or text and convert into clear, summarized notes. Choose the level of detail that fits you. Generate quizzes, flashcards, and mindmaps. Chat with an AI that understands your course materials. Export in Pro to PDF, Docx, Mindmap, and Markdown. Models include GPT-4.1, Claude 3.7 Sonnet, and DeepSeek R1. App Store and Google Play available. Knowledge Hub shows notes from NYU, MIT, Stanford, and UC Berkeley.',
  'https://thetawave.ai/',
  NULL, -- Image set to NULL
  'ThetaWave AI Note Taking and Study Assistant',
  '[
    {"plan": "Free", "price": "$0.00 / day", "features": ["3 Notes / day", "1 / note", "Recording 15 min", "File Size 3MB / Source", "Note Quality Basic", "Chat Model Basic", "Limited support"]},
    {"plan": "Pro", "price": "$0.33 / day", "features": ["Unlimited notes and sources", "Recording Unlimited", "Export All common formats PDF/Docx/Mindmap/Markdown", "Note Quality Premium", "Chat Model Most Advanced", "Priority support"]},
    {"plan": "Annually", "price": "$2.84/day", "features": ["89% OFF $ 0.33 /day"]},
    {"plan": "Quarterly", "price": "$2.84/day", "features": ["81% OFF $ 0.53 /day"]},
    {"plan": "Weekly", "price": "$2.84 /day", "features": []}
  ]'::jsonb,
  '[
    {"title": "Real time transcripts", "description": "Lecture to organized notes."},
    {"title": "Document to notes", "description": "PDF Word text to summaries."},
    {"title": "Flashcards and quizzes", "description": "From your generated notes."},
    {"title": "Mindmaps generator", "description": "Visualize relationships easily."},
    {"title": "Interactive chatbot", "description": "Clarifies complex concepts."}
  ]'::jsonb,
  thetawave_category.id, NOW(), NOW(), NOW(),
  'ThetaWave AI Note Taking and Study Assistant',
  'Lectures, PDFs, and YouTube to notes, flashcards, quizzes, mindmaps, and real time transcripts. Models GPT-4.1, Claude 3.7 Sonnet, DeepSeek R1. App Store and Google Play. Ask ChatGPT',
  'Sign up. Record during lecture or add a YouTube URL or upload PDF, DOC, or TXT. Pick summary depth. Generate structured notes. Turn notes into flashcards, quizzes, or a mindmap. Open the interactive chatbot to clarify complex concepts. Export with Pro. Study on mobile and web with automatic syncing.',
  4.7, true
FROM thetawave_category
WHERE EXISTS (SELECT 1 FROM thetawave_category)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  url = EXCLUDED.url,
  -- image_url PRESERVED
  image_alt = EXCLUDED.image_alt,
  pricing = EXCLUDED.pricing,
  features = EXCLUDED.features,
  category_id = EXCLUDED.category_id,
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  how_to_use = EXCLUDED.how_to_use,
  rating = EXCLUDED.rating,
  featured = EXCLUDED.featured,
  updated_at = NOW();


-- ==========================================
-- 5. MapsGPT (Category: AI Mapping Tools - NEW)
-- ==========================================
-- Create category if not exists
INSERT INTO categories (id, name, slug, description, created_at, updated_at, seo_title, seo_description)
VALUES (
  uuid_generate_v4(),
  'AI Mapping Tools',
  'ai-mapping-tools',
  'AI Mapping Tools for automated map creation, geospatial insights, route planning, clustering, and location intelligence powered by smart data-driven engines.',
  NOW(), NOW(),
  'AI Mapping Tools',
  'AI Mapping Tools for automated map creation, geospatial insights, route planning, clustering, and location intelligence powered by smart data-driven engines.'
)
ON CONFLICT (slug) DO NOTHING;

WITH maps_category AS (
  SELECT id FROM categories WHERE slug = 'ai-mapping-tools' LIMIT 1
)
INSERT INTO tools (
  id, name, slug, description, url, image_url, image_alt, pricing, features, category_id, published_at, created_at, updated_at, seo_title, seo_description, how_to_use, rating, featured
)
SELECT
  uuid_generate_v4(),
  'MapsGPT',
  'mapsgpt',
  'MapsGPT is an AI geospatial tool powered by Proxi. It turns your prompt into a custom digital map. Includes Image-to-Map, Spreadsheet-to-Map, and URL-to-Map.
MapsGPT offers Places Near an Area, Text to Map, History Explorer, Vibe Search, Freeform Prompt, Trip Planning, Find me. Image-to-Map turns PNGs, JPGs, and PDFs into interactive digital maps. Spreadsheet-to-Map instantly convert your spreadsheet into a map. URL-to-Map transform blogs, travel sites, and more into maps with Proxi''s Chrome Extension.',
  'https://www.mapsgpt.com/',
  NULL, -- Image set to NULL
  'MapsGPT Interactive Map Maker',
  '[
    {"plan": "Annual", "price": "$24/month", "features": ["Proxi Pro features discounted for an entire year"]},
    {"plan": "3 Months", "price": "$33/month", "features": ["Proxi Pro features bundled for seasonal users"]},
    {"plan": "Monthly", "price": "$49/month", "features": ["Proxi Pro features paid for monthly"]},
    {"plan": "Enterprise", "price": "Custom", "features": ["Custom integrations with your databases or monthly views of 1M plus"]}
  ]'::jsonb,
  '[
    {"title": "Image-to-Map AI", "description": "Turn PNGs, JPGs, PDFs into interactive maps."},
    {"title": "Spreadsheet-to-Map", "description": "Instantly convert your spreadsheet into a map."},
    {"title": "URL-to-Map", "description": "Transform blogs, travel sites, into maps."},
    {"title": "Map My Blog", "description": "AI-powered Mapping Software Chrome Extension."},
    {"title": "Map analytics", "description": "Clicks, views, interactions, leads export."}
  ]'::jsonb,
  maps_category.id, NOW(), NOW(), NOW(),
  'MapsGPT Interactive Map Maker',
  'AI mapping software to convert images, spreadsheets, and blogs into interactive maps. Powered by Proxi.',
  'Enter these places like kid-friendly activities, cocktail bars, first date ideas. Type this area like a neighborhood, city, or country. Add your email and we’ll send you an editable copy of your map. Then copy map link, make edits and add more points to this map, or try again. This map is curated out of aggregated data, however, we can not guarantee it is completely accurate or is up to date.',
  4.6, true
FROM maps_category
WHERE EXISTS (SELECT 1 FROM maps_category)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  url = EXCLUDED.url,
  -- image_url PRESERVED
  image_alt = EXCLUDED.image_alt,
  pricing = EXCLUDED.pricing,
  features = EXCLUDED.features,
  category_id = EXCLUDED.category_id,
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  how_to_use = EXCLUDED.how_to_use,
  rating = EXCLUDED.rating,
  featured = EXCLUDED.featured,
  updated_at = NOW();


-- ==========================================
-- 6. Humanic AI (Category: AI Email Tools)
-- ==========================================
WITH humanic_category AS (
  SELECT id FROM categories WHERE name ILIKE 'AI Email Tools' OR name ILIKE 'AI Email%' LIMIT 1
)
INSERT INTO tools (
  id, name, slug, description, url, image_url, image_alt, pricing, features, category_id, published_at, created_at, updated_at, seo_title, seo_description, how_to_use, rating, featured
)
SELECT
  uuid_generate_v4(),
  'Humanic AI',
  'humanic-ai',
  'Humanic AI is an AI email marketing platform for lifecycle campaigns. It uses AI agents to build email sequences, single sends, and newsletters for micro-cohorts. Humanic offers AI powered segmentation, domain burn protection, analytics, and email deliverability optimization. Marketing teams can create onboarding, activation, retention, and promotional campaigns with a single prompt.',
  'https://humanic.ai/',
  NULL, -- Image set to NULL
  'Humanic AI Email Marketing Platform',
  '[
    {"plan": "Starter", "price": "$95/month", "features": ["Up to 25K MAU", "unlimited sends a month", "3 pre configured AI agents", "AI powered segmentation", "2 custom domains", "domain burn protection", "detailed email and sequence level analytics"]},
    {"plan": "Growth", "price": "$495/month", "features": ["Up to 50K MAU", "brand compliant creative assistance", "configurable AI agents", "migration and onboarding support", "send time optimization", "5 custom domains", "identify key features correlated to goals", "remove Humanic logo from footer", "timezone based scheduling", "export campaign data via API"]},
    {"plan": "Scale", "price": "Custom pricing", "features": ["100K+ MAU", "AI regeneration of existing campaigns", "priority technical support", "brand compliance", "A/B testing", "open rate optimization via MailModo", "unlimited custom domains", "advanced integrations", "unlimited creative assistance", "unlimited AI agents", "dedicated IP pool", "instrumentation audit (CDP)", "access to segmentation API"]}
  ]'::jsonb,
  '[
    {"title": "AI campaign builder", "description": "Create campaigns with one prompt."},
    {"title": "AI powered segmentation", "description": "Segment users into cohorts."},
    {"title": "Domain burn protection", "description": "Protects domain reputation."},
    {"title": "Single send emails", "description": "Send one time emails."},
    {"title": "Analytics", "description": "Email and sequence level analytics."}
  ]'::jsonb,
  humanic_category.id, NOW(), NOW(), NOW(),
  'Humanic AI Email Marketing Platform',
  'AI agents for lifecycle email campaigns, segmentation, single sends, and domain burn protection. Plans for 25K to 100K+ MAU.',
  'Sign in. Click Campaign icon or Humanic logo to open the Home Screen. Select New Campaign. Choose campaign type and click Submit. Add emails to each sequence manually or with AI content agents. Use Send Test Email before activation. For one time messages, create a Single Send, select recipients, choose AI or manual content, edit in the email editor, then send.',
  4.7, true
FROM humanic_category
WHERE EXISTS (SELECT 1 FROM humanic_category)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  url = EXCLUDED.url,
  -- image_url PRESERVED
  image_alt = EXCLUDED.image_alt,
  pricing = EXCLUDED.pricing,
  features = EXCLUDED.features,
  category_id = EXCLUDED.category_id,
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  how_to_use = EXCLUDED.how_to_use,
  rating = EXCLUDED.rating,
  featured = EXCLUDED.featured,
  updated_at = NOW();


-- ==========================================
-- 7. Search YT (Category: AI YouTube Search Tools - NEW)
-- ==========================================
-- Create category if not exists
INSERT INTO categories (id, name, slug, description, created_at, updated_at, seo_title, seo_description)
VALUES (
  uuid_generate_v4(),
  'AI YouTube Search Tools',
  'ai-youtube-search-tools',
  'AI YouTube Search Tools for advanced video discovery, content analysis, keyword insights, transcript parsing, and channel intelligence with smart ranking engines.',
  NOW(), NOW(),
  'AI YouTube Search Tools',
  'AI YouTube Search Tools for advanced video discovery, content analysis, keyword insights, transcript parsing, and channel intelligence with smart ranking engines.'
)
ON CONFLICT (slug) DO NOTHING;

WITH searchyt_category AS (
  SELECT id FROM categories WHERE slug = 'ai-youtube-search-tools' LIMIT 1
)
INSERT INTO tools (
  id, name, slug, description, url, image_url, image_alt, pricing, features, category_id, published_at, created_at, updated_at, seo_title, seo_description, how_to_use, rating, featured
)
SELECT
  uuid_generate_v4(),
  'Search YT',
  'search-yt',
  'Search YT is a Chrome extension for YouTube that lets you search video content, ask questions, and jump to exact timestamps. Works directly inside YouTube’s interface for a smooth viewing experience.',
  'https://chromewebstore.google.com/detail/yt-search/bgkbkfmmlgccfinmnaddobkbkjfdjnip',
  NULL, -- Image set to NULL
  'Search YT – YouTube Video Search Extension',
  '[
    {"plan": "Free", "price": "Free", "features": ["Search any YouTube video", "get exact timestamps"]}
  ]'::jsonb,
  '[
    {"title": "Smart Search", "description": "Ask questions and get precise answers."},
    {"title": "Time-Stamped Results", "description": "Jump directly to the relevant moment."},
    {"title": "Seamless Experience", "description": "Works inside YouTube’s interface."}
  ]'::jsonb,
  searchyt_category.id, NOW(), NOW(), NOW(),
  'Search YT – YouTube Video Search Extension',
  'Chrome extension to search YouTube videos, get instant answers, and jump to exact timestamps.',
  'Play a YouTube video. Open the extension. Type your question or search term. Get instant answers with time-stamped results. Click the timestamp to jump to the exact moment in the video.',
  4.5, true
FROM searchyt_category
WHERE EXISTS (SELECT 1 FROM searchyt_category)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  url = EXCLUDED.url,
  -- image_url PRESERVED
  image_alt = EXCLUDED.image_alt,
  pricing = EXCLUDED.pricing,
  features = EXCLUDED.features,
  category_id = EXCLUDED.category_id,
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  how_to_use = EXCLUDED.how_to_use,
  rating = EXCLUDED.rating,
  featured = EXCLUDED.featured,
  updated_at = NOW();


-- ==========================================
-- 8. HiveSpark (Category: AI Startups Tools - NEW)
-- ==========================================
-- Create category if not exists
INSERT INTO categories (id, name, slug, description, created_at, updated_at, seo_title, seo_description)
VALUES (
  uuid_generate_v4(),
  'AI Startups Tools',
  'ai-startups-tools',
  'AI Startups Tools for workflow automation, product research, market analysis, funding insights, prototype building, and growth intelligence for emerging ventures.',
  NOW(), NOW(),
  'AI Startups Tools',
  'AI Startups Tools for workflow automation, product research, market analysis, funding insights, prototype building, and growth intelligence for emerging ventures.'
)
ON CONFLICT (slug) DO NOTHING;

WITH hivespark_category AS (
  SELECT id FROM categories WHERE slug = 'ai-startups-tools' LIMIT 1
)
INSERT INTO tools (
  id, name, slug, description, url, image_url, image_alt, pricing, features, category_id, published_at, created_at, updated_at, seo_title, seo_description, how_to_use, rating, featured
)
SELECT
  uuid_generate_v4(),
  'HiveSpark',
  'hivespark',
  'HiveSpark is an AI copilot for startups that handles tasks from pitch deck to market research. It offers more than 100 specialized content task templates for business plans, competitor analyses, funding strategy, and GTM strategy, tailored to support startups at every stage.',
  'https://hivespark.io/',
  NULL, -- Image set to NULL
  'HiveSpark AI Copilot for Startups',
  '[
    {"plan": "Beta Free", "price": "Free", "features": ["Access to HiveSpark AI copilot features"]}
  ]'::jsonb,
  '[
    {"title": "Startup Templates", "description": "More than 100 task templates for startups."},
    {"title": "Market Research", "description": "Competitor analysis, industry analysis, evaluating TAM or SAM."},
    {"title": "Business Strategy", "description": "Business model creation, cost projection, revenue projection, executive summary, business plans."},
    {"title": "Startup Fundraising", "description": "Pitch decks, financial valuation, fundraising planning, cap tables."},
    {"title": "GTM Strategy", "description": "Product growth, go to market, customer persona, marketing funnels."}
  ]'::jsonb,
  hivespark_category.id, NOW(), NOW(), NOW(),
  'HiveSpark AI Copilot for Startups',
  'AI copilot for startups with 100 plus templates for market research, business strategy, fundraising, and GTM strategy. In beta and free to use.',
  'Select a task template from the library of 100 plus templates. Input your startup information such as topic or specific details. Generate unique content in under 30 seconds, up to 600 words each time, ready for you to review, edit, and use.',
  4.7, true
FROM hivespark_category
WHERE EXISTS (SELECT 1 FROM hivespark_category)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  url = EXCLUDED.url,
  -- image_url PRESERVED
  image_alt = EXCLUDED.image_alt,
  pricing = EXCLUDED.pricing,
  features = EXCLUDED.features,
  category_id = EXCLUDED.category_id,
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  how_to_use = EXCLUDED.how_to_use,
  rating = EXCLUDED.rating,
  featured = EXCLUDED.featured,
  updated_at = NOW();


-- ==========================================
-- 9. Waifu Labs (Category: AI Anime Art Generator)
-- ==========================================
WITH waifu_category AS (
  SELECT id FROM categories WHERE name ILIKE 'AI Anime Art Generator' OR name ILIKE 'AI Anime Art%' LIMIT 1
)
INSERT INTO tools (
  id, name, slug, description, url, image_url, image_alt, pricing, features, category_id, published_at, created_at, updated_at, seo_title, seo_description, how_to_use, rating, featured
)
SELECT
  uuid_generate_v4(),
  'Waifu Labs',
  'waifu-labs',
  'Waifu Labs is an AI anime portrait generator by Sizigi Studios that creates custom waifu and husbando characters in four guided steps. Built on a Generative Adversarial Network (GAN), it learns to draw through practice and generates unique portraits for free. Characters can be imported directly into the Arrowmancer game.',
  'https://waifulabs.com/',
  NULL, -- Image set to NULL
  'Waifu Labs - AI Anime Portrait Generator',
  '[
    {"plan": "Free", "price": "Free", "features": ["Use online for creating and downloading portraits"]},
    {"plan": "Arrowmancer", "price": "Free to download", "features": ["iOS and Android", "optional in-app purchases"]}
  ]'::jsonb,
  '[
    {"title": "Custom Portraits", "description": "AI-generated waifus and husbandos."},
    {"title": "Step-by-Step Creation", "description": "Four-stage guided customization."},
    {"title": "Arrowmancer Import", "description": "Use characters in the mobile RPG."},
    {"title": "Backgrounds", "description": "Add scenes to portraits."},
    {"title": "GAN Technology", "description": "Machine learning-based illustration."}
  ]'::jsonb,
  waifu_category.id, NOW(), NOW(), NOW(),
  'Waifu Labs - AI Anime Portrait Generator',
  'Create AI-generated waifus and husbandos in 4 steps with Waifu Labs. Import your characters into the Arrowmancer game. Free to use.',
  'Choose your initial portrait from 12 options. Adjust the color palette, refine details, and select a final pose. Name your character and save the image. You can later import it into Arrowmancer or use it anywhere you like.',
  4.5, true
FROM waifu_category
WHERE EXISTS (SELECT 1 FROM waifu_category)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  url = EXCLUDED.url,
  -- image_url PRESERVED
  image_alt = EXCLUDED.image_alt,
  pricing = EXCLUDED.pricing,
  features = EXCLUDED.features,
  category_id = EXCLUDED.category_id,
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  how_to_use = EXCLUDED.how_to_use,
  rating = EXCLUDED.rating,
  featured = EXCLUDED.featured,
  updated_at = NOW();


-- ==========================================
-- 10. drawerrr.com (Category: AI Sustainability Tools - NEW)
-- ==========================================
-- Create category if not exists
INSERT INTO categories (id, name, slug, description, created_at, updated_at, seo_title, seo_description)
VALUES (
  uuid_generate_v4(),
  'AI Sustainability Tools',
  'ai-sustainability-tools',
  'AI Sustainability Tools for carbon tracking, energy optimization, ESG insights, lifecycle analysis, and environmental intelligence across operations and supply chains.',
  NOW(), NOW(),
  'AI Sustainability Tools',
  'AI Sustainability Tools for carbon tracking, energy optimization, ESG insights, lifecycle analysis, and environmental intelligence across operations and supply chains.'
)
ON CONFLICT (slug) DO NOTHING;

WITH drawerrr_category AS (
  SELECT id FROM categories WHERE slug = 'ai-sustainability-tools' LIMIT 1
)
INSERT INTO tools (
  id, name, slug, description, url, image_url, image_alt, pricing, features, category_id, published_at, created_at, updated_at, seo_title, seo_description, how_to_use, rating, featured
)
SELECT
  uuid_generate_v4(),
  'drawerrr.com',
  'drawerrr-com',
  'drawerrr.com connects engineers, designers, marketers, and sustainability experts to solve real-world challenges with AI. Topics include energy efficiency, circular economy, water conservation, green transportation, biodiversity protection, work and economic growth, social inequality, quality of education, health and wellness, sustainable cities and communities, poverty and hunger, peace, justice and institutions, anti-corruption, unethical sourcing, and privacy and AI safety. Challenges align with United Nations and US AID Sustainable Development Goals, focusing on economic opportunity, social justice, good governance, and equity.',
  'https://drawerrr.com/',
  NULL, -- Image set to NULL
  'drawerrr.com – Sustainable Challenges, Mentorship, Jury Panel',
  '[
    {"plan": "Free Access", "price": "$0/month", "features": ["Join challenges", "connect with mentors", "submit solutions", "access community chat"]},
    {"plan": "Mentorship Program", "price": "Guide and Empower", "features": ["Share expertise", "enhance portfolio", "connect", "develop leadership", "join elite circle"]},
    {"plan": "Jury Panel", "price": "Influence and Network", "features": ["Network with industry leaders", "discover talent", "gain access to talent pool", "follow trends", "evaluate solutions", "shape future of design"]}
  ]'::jsonb,
  '[
    {"title": "Expert Mentorship", "description": "Gain guidance from experienced industry professionals."},
    {"title": "Team Collaboration", "description": "Connect with like-minded peers on shared challenges."},
    {"title": "Jury Evaluation", "description": "Cases reviewed for innovation, quality, and impact."},
    {"title": "Global Access", "description": "Open to all countries and skill levels."}
  ]'::jsonb,
  drawerrr_category.id, NOW(), NOW(), NOW(),
  'drawerrr.com – Sustainable Challenges, Mentorship, Jury Panel',
  'Join sustainable development challenges, connect with mentors, and shape the future as part of the drawerrr.com jury panel.',
  'Create an account, choose a challenge you want to work on, follow guides, work solo or in a team, and submit your solution. Get feedback from sustainability experts and view results on the winners’ page each month.',
  4.7, true
FROM drawerrr_category
WHERE EXISTS (SELECT 1 FROM drawerrr_category)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  url = EXCLUDED.url,
  -- image_url PRESERVED
  image_alt = EXCLUDED.image_alt,
  pricing = EXCLUDED.pricing,
  features = EXCLUDED.features,
  category_id = EXCLUDED.category_id,
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  how_to_use = EXCLUDED.how_to_use,
  rating = EXCLUDED.rating,
  featured = EXCLUDED.featured,
  updated_at = NOW();
