-- Migration to add Batch 3 of 10 new AI tools with EXACT user content
-- Format: image_url is NULL, ON CONFLICT DO UPDATE (except image_url) to fix data but preserve uploads.

-- ==========================================
-- 1. BaddieFinder (Category: AI Dating Assistant tools)
-- ==========================================
WITH baddie_category AS (
  SELECT id FROM categories WHERE name ILIKE 'AI Dating Assistant tools' OR name ILIKE 'AI Dating Assistant%' LIMIT 1
)
INSERT INTO tools (
  id, name, slug, description, url, image_url, image_alt, pricing, features, category_id, published_at, created_at, updated_at, seo_title, seo_description, how_to_use, rating, featured
)
SELECT
  uuid_generate_v4(),
  'BaddieFinder',
  'baddiefinder',
  'BaddieFinder is an AI dating app that auto-swipes on Tinder and Bumble using a pre-trained photo analyzer. The tool uses your cookies to access location and preferences, then runs an AI model that evaluates profile photos and swipes right or left automatically. Unlike Rizz GPT, it doesn''t generate lines—it swipes for you every morning.',
  'https://baddiefinder.com/',
  NULL, -- Image set to NULL
  'BaddieFinder AI Swipe App for Tinder & Bumble',
  '[
    {"plan": "Monthly", "price": "$7.99/month", "features": ["500+ daily swipes", "Tinder", "Bumble", "chat support"]}
  ]'::jsonb,
  '[
    {"title": "AI photo analyzer", "description": "Swipes based on visual preference."},
    {"title": "Tinder and Bumble", "description": "Supports both platforms."},
    {"title": "Daily auto runs", "description": "Swipes happen automatically in the morning."},
    {"title": "Cookie-based logic", "description": "Uses stored location and filters."},
    {"title": "Swipe automation", "description": "Avoids over-swiping detection."}
  ]'::jsonb,
  baddie_category.id, NOW(), NOW(), NOW(),
  'BaddieFinder AI Swipe App for Tinder & Bumble',
  'Automate Tinder and Bumble swipes using BaddieFinder’s AI photo analyzer and cookie-based filters.',
  'Copy your cookie string from Tinder or Bumble. Paste it into BaddieFinder. Your saved filters and location are already in the cookie. The AI runs daily, analyzing photos and auto-swiping based on set sensitivity. You can check the results later each day.',
  4.8, true
FROM baddie_category
WHERE EXISTS (SELECT 1 FROM baddie_category)
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
-- 2. Aimlabs (Category: AI Games Tools)
-- ==========================================
WITH aimlabs_category AS (
  SELECT id FROM categories WHERE name ILIKE 'AI Games Tools' OR name ILIKE 'AI Games%' LIMIT 1
)
INSERT INTO tools (
  id, name, slug, description, url, image_url, image_alt, pricing, features, category_id, published_at, created_at, updated_at, seo_title, seo_description, how_to_use, rating, featured
)
SELECT
  uuid_generate_v4(),
  'Aimlabs',
  'aimlabs',
  'Aimlabs is an AI aim trainer that improves FPS skills using adaptive tasks, analytics, and game-based routines. The platform includes 50K+ tasks, Sensitivity Finder 2.0, AI aim coach, and training centers for games like Valorant. Developed by State Space Labs, it is trusted by over 40 million players and officially partners with Valorant and Rainbow Six Siege. Available on Steam, Epic Store, and Xbox Series X|S.',
  'https://aimlabs.com/',
  NULL, -- Image set to NULL
  'Aimlabs AI Aim Trainer for FPS Games',
  '[
    {"plan": "Free Plan", "price": "$0", "features": ["Access base aim training", "game profiles"]},
    {"plan": "1 Month", "price": "$10/month", "features": ["Sensitivity Finder", "AI coach", "Academy", "Valorant maps", "50% shop discount"]},
    {"plan": "3 Months", "price": "$9/month", "features": ["Same features", "billed every 3 months"]},
    {"plan": "6 Months", "price": "$7/month", "features": ["Full access", "billed every 6 months"]}
  ]'::jsonb,
  '[
    {"title": "AI aim coach", "description": "Detects weaknesses and offers guidance."},
    {"title": "Sensitivity Finder 2.0", "description": "Matches in-game aim sensitivity."},
    {"title": "Valorant Training Center", "description": "Practice on 1:1 game maps."},
    {"title": "Adaptive Tasks", "description": "Exercises tailored to your skill level."},
    {"title": "Aimlabs Academy", "description": "Video courses from aim experts and pros."}
  ]'::jsonb,
  aimlabs_category.id, NOW(), NOW(), NOW(),
  'Aimlabs AI Aim Trainer for FPS Games',
  'Improve aim with Aimlabs AI coach, Valorant maps, adaptive tasks, and pro video training.',
  'Download from Steam, Epic, or Xbox Store. Log in. Choose your FPS game profile. Use Sensitivity Finder 2.0 to match your game sensitivity. Start training with curated exercises like flicking, tracking, and switching. Use AI aim coach to identify weaknesses. Follow daily missions or structured lessons in the Academy. Track your aim rank and progress.',
  4.7, true
FROM aimlabs_category
WHERE EXISTS (SELECT 1 FROM aimlabs_category)
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
-- 3. Missive (Category: AI Team Workspace Tools)
-- ==========================================
WITH missive_category AS (
  SELECT id FROM categories WHERE name ILIKE 'AI Team Workspace Tools' OR name ILIKE 'AI Team Workspace%' LIMIT 1
)
INSERT INTO tools (
  id, name, slug, description, url, image_url, image_alt, pricing, features, category_id, published_at, created_at, updated_at, seo_title, seo_description, how_to_use, rating, featured
)
SELECT
  uuid_generate_v4(),
  'Missive',
  'missive',
  'Missive is a collaborative email platform with team inboxes, internal threads, tasks, chatrooms, and a unified inbox. It supports email, SMS, and social accounts in shared team spaces, with rules, automations, and integrations with over 25 apps, including Google Workspace, Office 365, Gmail, and Outlook.com. Designed for collaboration and flexibility.',
  'https://missiveapp.com/',
  NULL, -- Image set to NULL
  'Missive team inbox and email collaboration',
  '[
    {"plan": "Starter", "price": "$18/user/month", "features": ["Email, SMS, social accounts", "team spaces and inboxes", "conversations and tasks", "SOC 2 Type II compliance"]},
    {"plan": "Productive", "price": "$30/user/month", "features": ["Everything in Starter", "integrations with external tools", "rules and automations", "basic analytics and reporting", "API access"]},
    {"plan": "Business", "price": "$45/user/month", "features": ["Everything in Productive", "SAML and SSO", "IP restriction", "advanced analytics and reporting", "personalized team onboarding"]}
  ]'::jsonb,
  '[
    {"title": "Team inboxes", "description": "Multiple people in one inbox."},
    {"title": "Tasks in inbox", "description": "Turn emails into tasks."},
    {"title": "Rules and automations", "description": "Automate repetitive work."},
    {"title": "Unified inbox", "description": "All channels in a single inbox."},
    {"title": "Integrations", "description": "Over 25 apps and CRMs."}
  ]'::jsonb,
  missive_category.id, NOW(), NOW(), NOW(),
  'Missive team inbox and email collaboration',
  'Team inbox, tasks, rules, automations, and a unified inbox with Google Workspace and Office 365.',
  'Connect email, SMS, and social accounts. Create team spaces and shared inboxes. Assign and watch conversations, collaborate in internal threads, use rules and automations, and manage tasks inside your inbox.',
  4.7, true
FROM missive_category
WHERE EXISTS (SELECT 1 FROM missive_category)
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
-- 4. Doodle Morph AI (Category: AI Image Generators)
-- ==========================================
WITH doodle_category AS (
  SELECT id FROM categories WHERE name ILIKE 'AI Image Generators' OR name ILIKE 'AI Image Generator%' LIMIT 1
)
INSERT INTO tools (
  id, name, slug, description, url, image_url, image_alt, pricing, features, category_id, published_at, created_at, updated_at, seo_title, seo_description, how_to_use, rating, featured
)
SELECT
  uuid_generate_v4(),
  'Doodle Morph AI',
  'doodle-morph-ai',
  'Doodle Morph AI is an iPhone app that uses scribble diffusion to turn simple doodles into photo-realistic AI art instantly. It’s a real-time AI drawing app that transforms your hand-drawn sketches into stunning visuals, no skill needed.
Built for all users, kids to creators it combines a user-friendly interface with cutting-edge AI to deliver hyper-detailed visuals using only your iPhone. Whether it’s a fantasy castle, pet dragon, or a child’s messy drawing, Doodle Morph AI brings it to life.',
  'https://doodlemorphai.com/',
  NULL, -- Image set to NULL
  'Doodle Morph AI – Doodle to Image iPhone App',
  '[
    {"plan": "One-Time Access", "price": "$29", "features": ["Lifetime access", "full image generation", "features on iPhone"]}
  ]'::jsonb,
  '[
    {"title": "Scribble Diffusion", "description": "Turns sketches into visuals."},
    {"title": "Prompt Input", "description": "Text guides image generation."},
    {"title": "Instant Preview", "description": "See results in seconds."},
    {"title": "One-Tap Sharing", "description": "Export directly from app."},
    {"title": "Offline Use", "description": "Create without internet."}
  ]'::jsonb,
  doodle_category.id, NOW(), NOW(), NOW(),
  'Doodle Morph AI – Doodle to Image iPhone App',
  'Turn sketches into photo-realistic art with Doodle Morph AI. Available on iPhone App Store.',
  'Open the app on your iPhone. Draw or upload a sketch. Type a short prompt (what your doodle is). Tap “GO.” In seconds, your doodle morphs into stunning AI art.',
  4.6, true
FROM doodle_category
WHERE EXISTS (SELECT 1 FROM doodle_category)
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
-- 5. groas.ai (Category: AI Marketing Tools)
-- ==========================================
WITH groas_category AS (
  SELECT id FROM categories WHERE name ILIKE 'AI Marketing Tools' OR name ILIKE 'AI Marketing%' LIMIT 1
)
INSERT INTO tools (
  id, name, slug, description, url, image_url, image_alt, pricing, features, category_id, published_at, created_at, updated_at, seo_title, seo_description, how_to_use, rating, featured
)
SELECT
  uuid_generate_v4(),
  'groas',
  'groas',
  'groas is an AI ad optimization tool for Google Search Ads. It uses a network of AI agents to automatically generate high-converting ad copy and landing pages, optimize bids, remove budget-draining keywords, and discover new funnel opportunities in real time. It is not a plugin or agency replacement but a 24/7 self-optimizing campaign engine trained on $500B+ in ad spend.',
  'https://groas.ai/',
  NULL, -- Image set to NULL
  'groas: AI Google Ads Optimization & Search Funnel Automation',
  '[
    {"plan": "Keyword Kicker", "price": "$79/month", "features": ["Up to $2k groas ad spend"]},
    {"plan": "Bid Blaster", "price": "$149/month", "features": ["Up to $5k groas ad spend"]},
    {"plan": "Click Crusader", "price": "$299/month", "features": ["Up to $10k groas ad spend"]},
    {"plan": "Conversion Master", "price": "$499/month", "features": ["Up to $20k groas ad spend"]},
    {"plan": "Enterprise", "price": "Custom", "features": ["For $20k+/mo spend", "account manager", "onboarding"]}
  ]'::jsonb,
  '[
    {"title": "Conversion Copy Agents", "description": "Trained on $500B+ search spend."},
    {"title": "Self-Optimising Engine", "description": "Continuous updates without human input."},
    {"title": "Keyword CPC Analysis", "description": "Uncover cheaper high-quality traffic."},
    {"title": "Negative Keyword Blocking", "description": "Eliminates wasteful search terms."},
    {"title": "New Funnel Suggestions", "description": "Predictive keyword and funnel discovery."}
  ]'::jsonb,
  groas_category.id, NOW(), NOW(), NOW(),
  'groas: AI Google Ads Optimization & Search Funnel Automation',
  'groas uses AI agents to auto-optimize Google Ads, generate landing pages, and cut wasted CPC in real time.',
  'Sign up and connect your Google Ads account. groas begins optimizing immediately: it analyzes current performance, shifts budget to winning keywords, blocks irrelevant terms, refreshes creatives, and generates new funnel suggestions. Changes are applied live. Monitor results and pause anytime.',
  4.8, true
FROM groas_category
WHERE EXISTS (SELECT 1 FROM groas_category)
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
-- 6. Limitless AI (Category: AI Transcription Tools)
-- ==========================================
WITH limitless_category AS (
  SELECT id FROM categories WHERE name ILIKE 'AI Transcription Tools' OR name ILIKE 'AI Transcription%' LIMIT 1
)
INSERT INTO tools (
  id, name, slug, description, url, image_url, image_alt, pricing, features, category_id, published_at, created_at, updated_at, seo_title, seo_description, how_to_use, rating, featured
)
SELECT
  uuid_generate_v4(),
  'Limitless AI',
  'limitless-ai',
  'Limitless AI is a HIPAA-compliant wearable voice recorder and transcription device powered by personalized AI. It captures what you say, hear, and see to help you organize tasks, retrieve moments, and reflect on conversations.
The Pendant is a lightweight, durable, Bluetooth-enabled, USB-C wearable. It records audio from meetings, personal reflections, or everyday interactions. It includes a magnetic clasp, app syncing, moment bookmarking, and supports weatherproof use. With the latest AI models, you can ask your personalized assistant anything through the app.',
  'https://www.limitless.ai/',
  NULL, -- Image set to NULL
  'Limitless AI Wearable Transcription & Voice Recorder Tool',
  '[
    {"plan": "Pendant + Unlimited", "price": "$399", "features": ["Bundle with unlimited hours included"]},
    {"plan": "Pendant", "price": "$199", "features": ["One-time device purchase"]},
    {"plan": "Free", "price": "$0/month", "features": ["20 hours per month"]},
    {"plan": "Pro", "price": "$29/month", "features": ["100 hours per month"]},
    {"plan": "Unlimited", "price": "$49/month", "features": ["Unlimited transcription hours"]}
  ]'::jsonb,
  '[
    {"title": "Wearable AI Recorder", "description": "Lightweight aluminum, weatherproof design."},
    {"title": "HIPAA-Compliant Privacy", "description": "Medical-grade protection for personal data."},
    {"title": "Unlimited Transcription Plan", "description": "No transcription limits with plan."},
    {"title": "Bluetooth and USB-C", "description": "Wireless use and fast charging."},
    {"title": "AI Assistant Access", "description": "Ask questions using saved conversations."}
  ]'::jsonb,
  limitless_category.id, NOW(), NOW(), NOW(),
  'Limitless AI Wearable Transcription & Voice Recorder Tool',
  'Limitless Pendant records and transcribes voice. HIPAA-compliant, Bluetooth AI assistant.',
  'Wear the Pendant using its magnetic clasp. Speak normally. Tap to bookmark a moment. Open the app to view or retrieve conversations. Ask your AI assistant to generate tasks or answer questions. Transcription is counted only during active speech.',
  4.7, true
FROM limitless_category
WHERE EXISTS (SELECT 1 FROM limitless_category)
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
-- 7. Wayin.ai (Category: Long to Short Videos AI)
-- ==========================================
WITH wayin_category AS (
  SELECT id FROM categories WHERE name ILIKE 'Long to Short Videos AI' OR name ILIKE 'Long to Short Videos%' LIMIT 1
)
INSERT INTO tools (
  id, name, slug, description, url, image_url, image_alt, pricing, features, category_id, published_at, created_at, updated_at, seo_title, seo_description, how_to_use, rating, featured
)
SELECT
  uuid_generate_v4(),
  'Wayin.ai',
  'wayin-ai',
  'Wayin.ai is an AI video summarizer and viral clip generator. It finds moments, generates animated captions, and translates subtitles into 100+ languages.
WayinVideo helps you turn long videos into short, shareable content. Upload or paste a link from YouTube or similar. The AI detects viral moments, creates subtitles, and adds animation. It supports multiple aspect ratios for TikTok, YouTube Shorts, and Instagram Reels. A Chrome Extension also lets you summarize and chat with YouTube videos.',
  'https://wayin.ai/',
  NULL, -- Image set to NULL
  'Wayin.ai AI Video Summarizer & Subtitle Tool',
  '[
    {"plan": "Free", "price": "$0/month", "features": ["60 minutes", "10 moments", "3-day storage"]},
    {"plan": "Standard", "price": "$13.99/month", "features": ["600 minutes", "100 moments", "10GB/video"]},
    {"plan": "Pro", "price": "$26.99/month", "features": ["1500 minutes", "250 moments", "30GB/video"]},
    {"plan": "Pro+", "price": "$139.99/month", "features": ["6500 minutes", "1500 moments", "30GB/video"]},
    {"plan": "Enterprise", "price": "Custom", "features": ["API", "storage", "fonts", "integrations"]}
  ]'::jsonb,
  '[
    {"title": "One-Click Viral Clips", "description": "Detects engaging moments instantly."},
    {"title": "Animated Captions", "description": "Add motion captions in a few clicks."},
    {"title": "Subtitle Translator", "description": "Supports 100+ languages for captions."},
    {"title": "Aspect Ratio Reframe", "description": "Auto-fits for Shorts, TikTok, Reels."},
    {"title": "Chrome Extension", "description": "Summarize and chat with YouTube videos."}
  ]'::jsonb,
  wayin_category.id, NOW(), NOW(), NOW(),
  'Wayin.ai AI Video Summarizer & Subtitle Tool',
  'Auto-clip videos, add animated captions, and translate subtitles with WayinVideo.',
  'Paste a video link or upload a file. Click “Find Moments” to locate clips. Use “Animated Captions in 100+ Languages” to generate subtitles. Choose the language. Share your video with captions. Chrome users can summarize and chat with YouTube videos instantly.',
  4.6, true
FROM wayin_category
WHERE EXISTS (SELECT 1 FROM wayin_category)
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
-- 8. Decoratly (Category: AI Interior Design Tools)
-- ==========================================
WITH decoratly_category AS (
  SELECT id FROM categories WHERE name ILIKE 'AI Interior Design Tools' OR name ILIKE 'AI Interior Design%' LIMIT 1
)
INSERT INTO tools (
  id, name, slug, description, url, image_url, image_alt, pricing, features, category_id, published_at, created_at, updated_at, seo_title, seo_description, how_to_use, rating, featured
)
SELECT
  uuid_generate_v4(),
  'Decoratly',
  'decoratly',
  'Decoratly is an AI interior design platform that transforms any room photo into professional designs in 30 seconds. It uses computer vision AI, design intelligence AI, rendering AI, and creative generation AI with 53+ professional design styles. Upload a photo, choose a style or write a custom prompt, and see photo-realistic results for living rooms, bedrooms, kitchens, bathrooms, home offices, and more. The platform’s AI is trained on over 2.5 million professional interior design projects. It supports Makeover Mode and Enhance Mode.',
  'https://www.decoratly.com/',
  NULL, -- Image set to NULL
  'Decoratly – AI Room Design',
  '[
    {"plan": "Free Trial", "price": "$0", "features": ["2 room transformations", "53+ styles", "high-resolution downloads", "both modes", "no credit card"]},
    {"plan": "Unlimited Access", "price": "$4.99/day or $8.99/week or $16.99/month", "features": ["Unlimited transformations", "all 53+ styles", "4K downloads", "custom prompts", "priority processing", "Style Builder", "expert support", "saved design history"]}
  ]'::jsonb,
  '[
    {"title": "53+ Design Styles", "description": "Professional interior design styles."},
    {"title": "Style Builder", "description": "Customize colors, flooring, furniture, lighting."},
    {"title": "Photorealistic Output", "description": "Realistic proportions and lighting physics."},
    {"title": "Enhance Mode", "description": "Works with existing furniture and budget limits."},
    {"title": "Instant Variations", "description": "Multiple results in about 30 seconds."}
  ]'::jsonb,
  decoratly_category.id, NOW(), NOW(), NOW(),
  'Decoratly – AI Room Design',
  'Upload a room photo and get 53+ professional, photorealistic designs in 30 seconds with Decoratly AI.',
  'Upload a photo of your room. Choose from design styles or write a custom description. The AI analyzes your space and generates results in seconds. View multiple variations. Download high-resolution designs.',
  4.8, true
FROM decoratly_category
WHERE EXISTS (SELECT 1 FROM decoratly_category)
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
-- 9. VideoTap (Category: Long to Short Videos AI)
-- ==========================================
WITH videotap_category AS (
  SELECT id FROM categories WHERE name ILIKE 'Long to Short Videos AI' OR name ILIKE 'Long to Short Videos%' LIMIT 1
)
INSERT INTO tools (
  id, name, slug, description, url, image_url, image_alt, pricing, features, category_id, published_at, created_at, updated_at, seo_title, seo_description, how_to_use, rating, featured
)
SELECT
  uuid_generate_v4(),
  'VideoTap',
  'videotap',
  'VideoTap is an AI video repurposing platform that turns full-length videos into social clips, SEO blog posts, multilingual subtitles, YouTube chapters, and transcripts.
In about 20 minutes, it generates clips for Instagram Reels, YouTube Shorts, LinkedIn, podcast shownotes, SEO blog posts, email blurbs, translated subtitles, and transcripts. Designed for content teams, YouTubers, podcasters, and marketing teams, it replaces manual editing, transcription, and writing with AI-powered automation.',
  'https://videotap.com/',
  NULL, -- Image set to NULL
  'Video Tap – AI Video Repurposing Tool',
  '[
    {"plan": "Creator", "price": "$25/month", "features": ["100 mins", "45-min video limit", "1080p", "1 user"]},
    {"plan": "Crew", "price": "$80/month", "features": ["400 mins", "2-hour videos", "1080p", "3 users"]},
    {"plan": "Studio", "price": "$150/month", "features": ["1000 mins", "2-hour videos", "4K", "10 users"]},
    {"plan": "All plans include", "price": "Included", "features": ["unlimited clips", "blog posts", "podcast shownotes", "chapters", "social posts", "subtitles", "translations", "transcripts"]}
  ]'::jsonb,
  '[
    {"title": "AI-Powered Clipping", "description": "Generates highlights for social sharing."},
    {"title": "SEO Blog Posts", "description": "Writes search-optimized blog articles."},
    {"title": "Multilingual Subtitles", "description": "Supports 10+ languages."},
    {"title": "Chapters and Shownotes", "description": "Creates tags, chapters, and podcast notes."},
    {"title": "Social Content", "description": "Generates posts for Twitter, LinkedIn, Instagram."}
  ]'::jsonb,
  videotap_category.id, NOW(), NOW(), NOW(),
  'Video Tap – AI Video Repurposing Tool',
  'Turn videos into clips, blogs, subtitles, and transcripts with Video Tap AI.',
  'Add your video. The AI analyzes it and generates blog posts, clips, subtitles, and summaries. Review and export to social media or your site.',
  4.7, true
FROM videotap_category
WHERE EXISTS (SELECT 1 FROM videotap_category)
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
-- 10. NinjaChat (Category: AI Assistant Tools)
-- ==========================================
WITH ninjachat_category AS (
  SELECT id FROM categories WHERE name ILIKE 'AI Assistant Tools' OR name ILIKE 'AI Assistant%' LIMIT 1
)
INSERT INTO tools (
  id, name, slug, description, url, image_url, image_alt, pricing, features, category_id, published_at, created_at, updated_at, seo_title, seo_description, how_to_use, rating, featured
)
SELECT
  uuid_generate_v4(),
  'NinjaChat',
  'ninjachat',
  'NinjaChat is an all-in-one AI assistant to search the web, analyze data, generate content, and get instant answers. It includes Chat, AI Playground, Images, Music, Video, Tools, Mindmaps, Flashcards, PDF Chat, and a Writing Library. Models listed include Gemini 2.0 Flash, ChatGPT-4o, ChatGPT-4.1, 01, Claude 4 Sonnet, Claude 3.7 Sonnet, 00 Llama 4 Scout, 00 Llama 4 Maverick, Deepseek v3, Perplexity Al, M Mistral Large, Gemini 1.5 Pro, Kimi K2 Instruct.',
  'https://www.ninjachat.ai/',
  NULL, -- Image set to NULL
  'ninjachat.ai All-in-One AI Assistant',
  '[
    {"plan": "Starter", "price": "₹924/month", "features": ["1,000 AI messages", "30 images", "5 HD videos", "all premium models"]},
    {"plan": "Pro", "price": "₹2016/month", "features": ["4,000 AI messages", "100 images", "15 HD videos", "all premium models"]},
    {"plan": "Expert", "price": "₹3024/month", "features": ["8,000 AI messages", "300 images", "30 HD videos", "all premium models"]},
    {"plan": "Enterprise", "price": "₹8,316/month", "features": ["Team dashboard", "centralized billing", "priority support", "dedicated account manager"]}
  ]'::jsonb,
  '[
    {"title": "Web tool", "description": "Explore the internet."},
    {"title": "YouTube tool", "description": "Summarize YouTube videos."},
    {"title": "Finance tool", "description": "View stocks and cryptocurrencies."},
    {"title": "Mind maps", "description": "Smart Visual Mind Maps."},
    {"title": "Writing Library", "description": "Professional Writing Templates."}
  ]'::jsonb,
  ninjachat_category.id, NOW(), NOW(), NOW(),
  'ninjachat.ai All-in-One AI Assistant',
  'Search the web, analyze data, generate content, and get instant answers. Chat, Images, Music, Video, Tools, Mindmaps, Flashcards, PDF Chat, AI Playground.',
  'Start a conversation to see your chat history here. Ask anything. Type @ to see commands. Web: Explore the internet. Chatting: Regular chatting with AI. Finance: View stocks and cryptocurrencies. YouTube: Summarize YouTube videos. Use AI Playground, Mindmaps, Flashcards, PDF Chat, and Writing Library from the dashboard.',
  4.8, true
FROM ninjachat_category
WHERE EXISTS (SELECT 1 FROM ninjachat_category)
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
