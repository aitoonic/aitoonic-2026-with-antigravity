-- Migration to add Batch 4 of 10 new AI tools with EXACT user content
-- Format: image_url is NULL, ON CONFLICT DO UPDATE (except image_url) to fix data but preserve uploads.

-- ==========================================
-- 1. Limbiks (Category: AI Educational Tools)
-- ==========================================
WITH limbiks_category AS (
  SELECT id FROM categories WHERE name ILIKE 'AI Educational Tools' OR name ILIKE 'AI Educational%' LIMIT 1
)
INSERT INTO tools (
  id, name, slug, description, url, image_url, image_alt, pricing, features, category_id, published_at, created_at, updated_at, seo_title, seo_description, how_to_use, rating, featured
)
SELECT
  uuid_generate_v4(),
  'Limbiks',
  'limbiks',
  'Limbiks is an AI flashcard generator that creates decks from PDFs, presentations, notes, images, YouTube and Wikipedia with study tools, spaced repetition and sync to Anki. It also supports YouTube video and Wikipedia article imports. Users can preview generated flashcards, study with flashcard and multiple choice question tools and download cards for Anki, Quizlet, Tinycards and Cram. Limbiks supports 21 languages and offers AI practice tests, AI study guides, AI image occlusion, spaced repetition and sync to Anki with AnkiConnect.',
  'https://www.limbiks.com/',
  NULL, -- Image set to NULL
  'Limbiks AI Flashcard Generator with PDF to Anki Sync',
  '[
    {"plan": "Free Plan", "price": "$0/month", "features": ["10 uploads/mo", "5 pages/upload", "flashcards study tool", "spaced repetition", "sync to Anki", "100 multiple choice questions/mo", "10 practice tests/mo", "25 AI image occlusions/mo"]},
    {"plan": "Pro Plan", "price": "$5/month", "features": ["100 uploads/mo", "200 pages/upload", "learning objectives", "custom instructions", "unlimited multiple choice questions", "AI generated study guides"]}
  ]'::jsonb,
  '[
    {"title": "PDF to Flashcards", "description": "Upload any PDF file."},
    {"title": "AI Practice Tests", "description": "Generate exams with score reports."},
    {"title": "AI Study Guides", "description": "Create personalized study guides."},
    {"title": "AI Image Occlusion", "description": "Extract images and build occlusion flashcards."},
    {"title": "Spaced Repetition", "description": "Memorize using spaced repetition tool."}
  ]'::jsonb,
  limbiks_category.id, NOW(), NOW(), NOW(),
  'Limbiks AI Flashcard Generator with PDF to Anki Sync',
  'Create flashcards from PDFs, docs, images, YouTube or Wikipedia with Limbiks. Study with spaced repetition, AI practice tests and Anki sync.',
  'Upload a PDF, PPTX, DOCX, image, YouTube link or Wikipedia article, select pages or slides if needed, generate flashcards, study in flashcard or multiple choice mode, download or sync to Anki.',
  4.7, true
FROM limbiks_category
WHERE EXISTS (SELECT 1 FROM limbiks_category)
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
-- 2. StableDiffusionWeb (Category: AI Image Generators)
-- ==========================================
WITH stablediffusion_category AS (
  SELECT id FROM categories WHERE name ILIKE 'AI Image Generators' OR name ILIKE 'AI Image Generator%' LIMIT 1
)
INSERT INTO tools (
  id, name, slug, description, url, image_url, image_alt, pricing, features, category_id, published_at, created_at, updated_at, seo_title, seo_description, how_to_use, rating, featured
)
SELECT
  uuid_generate_v4(),
  'StableDiffusionWeb',
  'stablediffusionweb',
  'StableDiffusionWeb.com is a free and paid Stable Diffusion Online platform using Stable Diffusion XL and SDXL Turbo for fast, high quality AI image generation, prompt search, and creative tools. Users can generate images from text prompts, search more than 9 million Stable Diffusion prompts on Prompt Database, and access Face Swap Online, Image Upscaler, Background Remover, AI Voice Cloning, and AI 3D Model Generator. SDXL Turbo uses Adversarial Diffusion Distillation to synthesize images in a single step and generate real time text to image outputs.',
  'https://stablediffusionweb.com/',
  NULL, -- Image set to NULL
  'StableDiffusionWeb Free and Pro Stable Diffusion XL Online',
  '[
    {"plan": "Free", "price": "$0/month", "features": ["10 image generations/day", "2 images one time", "no ads", "no watermark", "commercial license", "upscale image", "images are private"]},
    {"plan": "Pro", "price": "$10/month", "features": ["2000 fast image generation/mo", "4 images one time", "no ads", "no watermark", "commercial license", "upscale image", "images are private"]},
    {"plan": "Max", "price": "$20/month", "features": ["4000 fast image generation/mo", "4 images one time", "no ads", "no watermark", "commercial license", "upscale image", "images are private"]}
  ]'::jsonb,
  '[
    {"title": "Prompt Database", "description": "Search more than 9 million prompts."},
    {"title": "SDXL Turbo", "description": "Single step generation with ADD."},
    {"title": "Image Editing", "description": "Background remover included."},
    {"title": "Extra Tools", "description": "Face Swap, upscaler, AI 3D model."}
  ]'::jsonb,
  stablediffusion_category.id, NOW(), NOW(), NOW(),
  'StableDiffusionWeb Free and Pro Stable Diffusion XL Online',
  'Create AI images with StableDiffusionWeb.com using Stable Diffusion XL and SDXL Turbo. Free and paid plans, prompt search, and creative tools.',
  'Sign up or log in, choose Stable Diffusion XL or SDXL Turbo, enter a descriptive prompt or search Prompt Database, set style and other parameters, click Generate, then download or edit with tools like background removal.',
  4.5, true
FROM stablediffusion_category
WHERE EXISTS (SELECT 1 FROM stablediffusion_category)
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
-- 3. StockmusicGPT (Category: AI Music Generators)
-- ==========================================
WITH stockmusic_category AS (
  SELECT id FROM categories WHERE name ILIKE 'AI Music Generators' OR name ILIKE 'AI Music Generator%' LIMIT 1
)
INSERT INTO tools (
  id, name, slug, description, url, image_url, image_alt, pricing, features, category_id, published_at, created_at, updated_at, seo_title, seo_description, how_to_use, rating, featured
)
SELECT
  uuid_generate_v4(),
  'StockmusicGPT',
  'stockmusicgpt',
  'StockmusicGPT is an AI music generator that creates royalty-free stock music, sound effects, and song covers. It’s designed for content creators, offering an easy way to generate personalized AI music. It supports text-to-music, image-to-music, and audio-to-music conversion.',
  'https://stockmusicgpt.com/',
  NULL, -- Image set to NULL
  'StockmusicGPT AI Music Generator for Royalty-Free Music',
  '[
    {"plan": "Lite", "price": "$3.50/month", "features": ["6,000 Song Credits/mo", "100 Tracks Cloud Storage", "10 Custom Presets"]},
    {"plan": "Basic", "price": "$14.00/month", "features": ["15,000 Song Credits/mo", "500 Tracks Cloud Storage", "50 Custom Presets"]},
    {"plan": "Standard", "price": "$28.00/month", "features": ["30,000 Song Credits/mo", "5,000 Tracks Cloud Storage", "500 Custom Presets"]},
    {"plan": "Pro", "price": "$70.00/month", "features": ["90,000 Song Credits/mo", "Unlimited Tracks Cloud Storage", "Unlimited Custom Presets"]}
  ]'::jsonb,
  '[
    {"title": "Text to Music", "description": "Create music from text input."},
    {"title": "Image to Music", "description": "Generate music based on an image."},
    {"title": "Audio to Music", "description": "Turn your audio files into AI-generated music."},
    {"title": "Vocal Removal", "description": "Strip vocals from any audio track."},
    {"title": "Music Loop", "description": "Create loops from AI-generated music."}
  ]'::jsonb,
  stockmusic_category.id, NOW(), NOW(), NOW(),
  'StockmusicGPT AI Music Generator for Royalty-Free Music',
  'StockmusicGPT generates royalty-free AI music, sound effects, and song covers. Create music from text, images, and audio files with ease.',
  'Sign up for a free account. Navigate to the "Generate" page. Select your preferred genre and other options. Let StockmusicGPT’s AI compose the music. Once complete, find and download your music from the dashboard.',
  4.6, true
FROM stockmusic_category
WHERE EXISTS (SELECT 1 FROM stockmusic_category)
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
-- 4. ROAST Dating (Category: AI Dating Assistant tools)
-- ==========================================
WITH roast_category AS (
  SELECT id FROM categories WHERE name ILIKE 'AI Dating Assistant tools' OR name ILIKE 'AI Dating Assistant%' LIMIT 1
)
INSERT INTO tools (
  id, name, slug, description, url, image_url, image_alt, pricing, features, category_id, published_at, created_at, updated_at, seo_title, seo_description, how_to_use, rating, featured
)
SELECT
  uuid_generate_v4(),
  'ROAST Dating',
  'roast-dating',
  'ROAST Dating gives data-driven feedback and clear advice to improve your dating profile and get more dates. It also creates AI-generated dating pictures using DALL·E 2 and Stable Diffusion to capture your best self. Join 256,862+ happy users. ROAST analyzes your profile based on 10,000+ profiles reviewed.',
  'https://roast.dating/',
  NULL, -- Image set to NULL
  'ROAST – AI Dating Profile Review and Photos',
  '[
    {"plan": "500 Coins", "price": "$9.99", "features": ["Use for reviews or AI photos"]},
    {"plan": "2,000 Coins", "price": "$34.99", "features": ["Medium package for more usage"]},
    {"plan": "10,000 Coins", "price": "$99.99", "features": ["Large package for maximum usage"]}
  ]'::jsonb,
  '[
    {"title": "AI Profile Review", "description": "Data-driven insights and expert advice."},
    {"title": "AI Dating Photos", "description": "Authentic images from your selfies."},
    {"title": "Bio Review", "description": "Improve bio basics and structure."},
    {"title": "Algorithm Tips", "description": "Boost your ELO and use dating app data."},
    {"title": "Live Roasting", "description": "Learn from real life examples."}
  ]'::jsonb,
  roast_category.id, NOW(), NOW(), NOW(),
  'ROAST – AI Dating Profile Review and Photos',
  'Improve your dating profile with ROAST. Get AI reviews, photo generation, and expert tips to boost matches.',
  'Share your Tinder profile or upload up to 20 pictures. ROAST analyzes your profile based on 10,000+ profiles reviewed, then provides an action plan. Apply the tips, update your dating apps, and start matching. For AI photos, upload selfies, the AI learns your facial features, and generates 10+ images for dating and social media.',
  4.7, true
FROM roast_category
WHERE EXISTS (SELECT 1 FROM roast_category)
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
-- 5. IDM VTON (Category: AI Ecommerce Tools)
-- ==========================================
WITH idm_category AS (
  SELECT id FROM categories WHERE name ILIKE 'AI Ecommerce Tools' OR name ILIKE 'AI Ecommerce%' LIMIT 1
)
INSERT INTO tools (
  id, name, slug, description, url, image_url, image_alt, pricing, features, category_id, published_at, created_at, updated_at, seo_title, seo_description, how_to_use, rating, featured
)
SELECT
  uuid_generate_v4(),
  'IDM VTON',
  'idm-vton',
  'IDM VTON utilizes an innovative two-stream conditional diffusion model and sophisticated attention modules. It handles a wide variety of garments and adapts to different body types, creating highly realistic and consistent garment images with precise and authentic adaptation for an inclusive virtual try-on experience.',
  'https://idm-vton.github.io/',
  NULL, -- Image set to NULL
  'IDM VTON - Your Gateway to the Future of Fashion',
  '[
    {"plan": "Free", "price": "$0", "features": ["Virtual try-on experience", "4 models", "Full body"]},
    {"plan": "Basic", "price": "$19.9 /month", "features": ["150 credits monthly", "Face Swap", "High Quality", "Upload your own model", "Replaceable background"]},
    {"plan": "Pro", "price": "$29.9 /month", "features": ["350 credits monthly", "Pro features", "Priority support", "Advanced customization"]},
    {"plan": "Ultra", "price": "$69.9 /month", "features": ["1000 credits monthly", "Ultra features", "Priority support", "Advanced customization"]}
  ]'::jsonb,
  '[
    {"title": "Two-stream diffusion model", "description": "highly realistic and authentic try-ons."},
    {"title": "Sophisticated attention modules", "description": "precise and authentic adaptation."},
    {"title": "Inclusivity and versatility", "description": "diverse body types and clothing styles."},
    {"title": "Ease of use", "description": "simple and intuitive interface."},
    {"title": "Access anywhere, anytime", "description": "multiple devices, whenever and wherever."}
  ]'::jsonb,
  idm_category.id, NOW(), NOW(), NOW(),
  'IDM VTON - Your Gateway to the Future of Fashion',
  'Discover a new dimension in fashion with IDM VTON. Try on outfits virtually with incredible realism and detail. Two-stream conditional diffusion model and attention modules.',
  'Select from a vast collection of clothing styles, upload a photo of yourself or choose a model, adjust the fitting settings, and experience the magic as IDM VTON transforms the selected garment onto your photo. Play around with different garments and styles. IDM VTON is compatible across multiple devices, enabling access anytime and anywhere.',
  4.6, true
FROM idm_category
WHERE EXISTS (SELECT 1 FROM idm_category)
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
-- 6. AI Face Swap Online Free (Category: Face Swap & DeepFake Tools)
-- ==========================================
WITH faceswap_category AS (
  SELECT id FROM categories WHERE name ILIKE 'Face Swap & DeepFake Tools' OR name ILIKE 'Face Swap%' LIMIT 1
)
INSERT INTO tools (
  id, name, slug, description, url, image_url, image_alt, pricing, features, category_id, published_at, created_at, updated_at, seo_title, seo_description, how_to_use, rating, featured
)
SELECT
  uuid_generate_v4(),
  'AI Face Swap Online Free (face-swap.io)',
  'face-swap-io',
  'AI Face Swap Online Free. Dive into the joy of AI face swapping with a quick photo upload. It’s absolutely free to use. Sign in with Basedlabs Google. Drop Image Here or Click to Upload for source_file and target_file. Do face enhancement Face Enhancer Clear Submit output or create a custom AI Girlfriend.',
  'https://face-swap.io/',
  NULL, -- Image set to NULL
  'face-swap.io AI Face Swap Online Free',
  '[
    {"plan": "Basic", "price": "Free", "features": ["Face swap", "Basic features"]},
    {"plan": "Premium", "price": "Paid", "features": ["Advanced editing capabilities"]}
  ]'::jsonb,
  '[
    {"title": "Instant AI Face Swaps", "description": "Makes it easy to swap faces seamlessly."},
    {"title": "Seamless results", "description": "No editing traces."},
    {"title": "Quick Meme Creation", "description": "Upload a photo and create funny memes."},
    {"title": "Become Anyone", "description": "From a favourite celebrity to a pet or friend."},
    {"title": "AI Character Generator", "description": "Turn your new face into a shareable clip using this TikTok video generator tool."}
  ]'::jsonb,
  faceswap_category.id, NOW(), NOW(), NOW(),
  'face-swap.io AI Face Swap Online Free',
  'Swap faces online free. Upload your photo and choose the face you want to swap with. Quick, seamless results with no editing traces.',
  'Sign in with Basedlabs Google. Click on the Swap Face Instantly button, you’ll be prompted to sign in using Google, courtesy of Basedlabs. In the Base Image area, upload your original photo. In the Target Image section, provide the photo that contains the face you want to use for the transformation. Simply click Swap Face Instantly and let the AI work its magic. Your new image will be ready in just a few seconds.',
  4.5, true
FROM faceswap_category
WHERE EXISTS (SELECT 1 FROM faceswap_category)
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
-- 7. Parmonic (Category: Long to Short Videos AI)
-- ==========================================
WITH parmonic_category AS (
  SELECT id FROM categories WHERE name ILIKE 'Long to Short Videos AI' OR name ILIKE 'Long to Short Videos%' LIMIT 1
)
INSERT INTO tools (
  id, name, slug, description, url, image_url, image_alt, pricing, features, category_id, published_at, created_at, updated_at, seo_title, seo_description, how_to_use, rating, featured
)
SELECT
  uuid_generate_v4(),
  'Parmonic',
  'parmonic',
  'Parmonic is a video-to-content platform for marketing and training teams that produce webinars, interviews, trainings and demos. It uses patented Moments AI to extract key moments, create derivative content, and turn recordings into blogs, articles, summaries, quotes, highlight reels, audiograms and more. The platform includes video hosting, security for sensitive content, gating for lead collection, integrations and advanced editing.',
  'https://www.parmonic.com/',
  NULL, -- Image set to NULL
  'Parmonic AI video to content platform Moments AI',
  '[
    {"plan": "Basic", "price": "$399/mo (billed annually)", "features": ["Up to 4 users", "process 4 videos per user per month", "unlimited outputs", "basic integrations"]},
    {"plan": "Pro", "price": "$799/mo (billed annually)", "features": ["Up to 9 users", "process unlimited videos", "unlimited outputs", "standard integrations"]},
    {"plan": "Advanced", "price": "Custom", "features": ["Up to 25 users", "process unlimited videos", "unlimited outputs", "standard integrations"]},
    {"plan": "Enterprise", "price": "Custom", "features": ["25+ users", "process unlimited videos", "unlimited outputs", "custom integrations"]}
  ]'::jsonb,
  '[
    {"title": "Moments AI", "description": "Forms the brain of the engine."},
    {"title": "Transcript-based editor", "description": "Shorten videos using transcript-highlighter."},
    {"title": "Multi-format output", "description": "MP4, Word, GIFs, webpages."},
    {"title": "Subtitles and translations", "description": "Multiple languages with editing."},
    {"title": "Integrations", "description": "Hubspot, Marketo, Pardot, Eloqua, Salesloft, Outreach."}
  ]'::jsonb,
  parmonic_category.id, NOW(), NOW(), NOW(),
  'Parmonic AI video to content platform Moments AI',
  'Parmonic Moments AI edits videos, creates derivative content and multi format outputs for marketing, training and sales teams.',
  'Upload or import a video file or pull recordings from platforms like Zoom and On24. Parmonic AI finds key moments and creates content for website, social, email and sales team. Review and edit with the transcript highlighter or prompts. Add subtitles, enable subtitle translations, remove filler words, add music and branding elements. Export MP4, Word, GIFs or embed code. Create webpages, galleries or micro-galleries and integrate with Hubspot, Marketo, Salesloft and Outreach.',
  4.7, true
FROM parmonic_category
WHERE EXISTS (SELECT 1 FROM parmonic_category)
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
-- 8. GoInsight.AI (Category: AI Agent Frameworks)
-- ==========================================
WITH goinsight_category AS (
  SELECT id FROM categories WHERE name ILIKE 'AI Agent Frameworks' OR name ILIKE 'AI Agent Framework%' LIMIT 1
)
INSERT INTO tools (
  id, name, slug, description, url, image_url, image_alt, pricing, features, category_id, published_at, created_at, updated_at, seo_title, seo_description, how_to_use, rating, featured
)
SELECT
  uuid_generate_v4(),
  'GoInsight.AI',
  'goinsight-ai',
  'GoInsight.AI is an enterprise-grade AI workflow engine and multi-agent automation system for secure, scalable, and auditable AI deployment. It integrates Human-in-the-Loop (HITL), Retrieval-Augmented Generation (RAG), and Large Language Models (LLMs) to automate workflows, build AI agents, and manage enterprise knowledge with compliance control. GoInsight.AI unifies AI model orchestration, security governance, and knowledge base integration in a single platform.',
  'https://www.goinsight.ai/',
  NULL, -- Image set to NULL
  'GoInsight.AI – Enterprise AI Workflow and Multi-Agent Automation',
  '[
    {"plan": "Enterprise", "price": "Contact Sales", "features": ["Enterprise pricing with security", "compliance", "workflow automation features"]}
  ]'::jsonb,
  '[
    {"title": "Visual Workflow Builder", "description": "Low-code drag-and-drop AI process design."},
    {"title": "Multi-Agent System", "description": "Coordinate AI agents collaboratively."},
    {"title": "Human-in-the-Loop", "description": "Pause workflows for human review."},
    {"title": "RAG Integration", "description": "Connect AI with enterprise knowledge bases."},
    {"title": "Security and Compliance", "description": "Role-based access, encryption, and audit."}
  ]'::jsonb,
  goinsight_category.id, NOW(), NOW(), NOW(),
  'GoInsight.AI – Enterprise AI Workflow and Multi-Agent Automation',
  'GoInsight.AI offers secure AI workflow automation, multi-agent systems, HITL, and RAG for enterprise compliance and productivity.',
  'Sign in to GoInsight.AI. Access Insight Chat for AI conversations, use Quick Bot to deploy a bot from your knowledge base, or build workflows in InsightFlow using drag-and-drop nodes, LLM integration, and API connections. Publish and manage workflows with audit trails, role-based permissions, and governance.',
  4.8, true
FROM goinsight_category
WHERE EXISTS (SELECT 1 FROM goinsight_category)
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
-- 9. Friends & Fables (Category: AI Games Tools)
-- ==========================================
WITH fables_category AS (
  SELECT id FROM categories WHERE name ILIKE 'AI Games Tools' OR name ILIKE 'AI Games%' LIMIT 1
)
INSERT INTO tools (
  id, name, slug, description, url, image_url, image_alt, pricing, features, category_id, published_at, created_at, updated_at, seo_title, seo_description, how_to_use, rating, featured
)
SELECT
  uuid_generate_v4(),
  'Friends & Fables',
  'friends-and-fables',
  'Friends & Fables is a generative tabletop roleplaying game inspired by DnD 5e. It lets you build worlds with custom NPCs, monsters, items, and spells, and play solo or with friends through campaigns run by Franz, an AI game master. It tracks stats, notes, items, quests, locations, and rules.',
  'https://fables.gg/',
  NULL, -- Image set to NULL
  'Friends & Fables AI game master for DnD 5e',
  '[
    {"plan": "Free Plan", "price": "$0/month", "features": ["25 turns/day", "12 world slots", "2 player campaigns", "long-term memories"]},
    {"plan": "Starter Plan", "price": "$14.95/month", "features": ["Unlimited turns", "24 world slots", "4 player campaigns", "text to speech"]},
    {"plan": "Pro Plan", "price": "$19.95/month", "features": ["Unlimited turns", "48 world slots", "5 player campaigns", "70 short-term memories", "text to speech"]},
    {"plan": "Premium Plan", "price": "$34.95/month", "features": ["Unlimited turns", "unlimited world slots", "6 player campaigns", "100 short-term memories", "text to speech"]}
  ]'::jsonb,
  '[
    {"title": "Long Term Memory", "description": "Franz remembers things."},
    {"title": "Automatic Tracking", "description": "Inventory, locations, HP."},
    {"title": "DnD 5e rules", "description": "Franz can handle rules and mechanics."},
    {"title": "Multiplayer parties", "description": "Up to 6 party members."},
    {"title": "World building tools", "description": "Character sheets, spells, monsters, locations."}
  ]'::jsonb,
  fables_category.id, NOW(), NOW(), NOW(),
  'Friends & Fables AI game master for DnD 5e',
  'Generative tabletop roleplaying with Franz. World building tools, character sheets, spells, monsters, locations.',
  'Sign up and get started for free. Build worlds with world building tools. Start a 5e campaign with Franz. Take turns. Franz tracks inventory, locations, HP, skillchecks, spells, NPCs, items, quests, and more. Use Character Sheet Generator, Spell Generator, Monster Generator, Item Generator, and Location Generator. Multiplayer up to 6 party members.',
  4.7, true
FROM fables_category
WHERE EXISTS (SELECT 1 FROM fables_category)
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
-- 10. AcademicGPT (Category: AI essay writer tools)
-- ==========================================
WITH academic_category AS (
  SELECT id FROM categories WHERE name ILIKE 'AI essay writer tools' OR name ILIKE 'AI essay writer%' LIMIT 1
)
INSERT INTO tools (
  id, name, slug, description, url, image_url, image_alt, pricing, features, category_id, published_at, created_at, updated_at, seo_title, seo_description, how_to_use, rating, featured
)
SELECT
  uuid_generate_v4(),
  'AcademicGPT',
  'academicgpt',
  'AcademicGPT is an AI academic writing tool that generates research paper sections including abstract, conclusion, summary, future work section, ethical considerations section, presentation outline, and LaTeX template. Users can drop a research paper or click to select, then choose the section type to write.',
  'https://academicgpt.net/',
  NULL, -- Image set to NULL
  'AcademicGPT AI Academic Writing Tool',
  '[
    {"plan": "Free Plan", "price": "$0/month", "features": ["100 credits when signup"]},
    {"plan": "Upgrade Plan", "price": "$10/month", "features": ["1000 credits/month"]},
    {"plan": "Upgrade Plan", "price": "$20/month", "features": ["No usage limit"]}
  ]'::jsonb,
  '[
    {"title": "Multi-section writing", "description": "Abstract, conclusion, summary, future work, ethical considerations, presentation outline."},
    {"title": "LaTeX template", "description": "Academic-ready format."}
  ]'::jsonb,
  academic_category.id, NOW(), NOW(), NOW(),
  'AcademicGPT AI Academic Writing Tool',
  'AcademicGPT writes abstracts, conclusions, summaries, future work, ethics, outlines, and LaTeX templates.',
  'Sign up and get 100 free credits. Drop or select your research paper. Select a section type such as abstract, conclusion, summary, future work section, ethical considerations section, presentation outline, or LaTeX template. Click to write and get the section.',
  4.6, true
FROM academic_category
WHERE EXISTS (SELECT 1 FROM academic_category)
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
