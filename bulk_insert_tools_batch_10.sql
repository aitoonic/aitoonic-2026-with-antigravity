-- Migration to add Batch 10 of AI tools (Tools 1-9) - EXACT CONTENT
-- Covers tools: AI Finder, WritePanda, Octopus.do, Bank Statement Convert, Neighborbrite, NoteGPT, YouMind, SDXLTurbo.ai, Question AI

-- ==========================================
-- 1. AI Finder (Category: AI Assistant Tools)
-- ==========================================
WITH aifinder_category AS (
  SELECT id FROM categories WHERE name ILIKE 'AI Assistant Tools' LIMIT 1
)
INSERT INTO tools (
  id, name, slug, description, url, image_url, image_alt, pricing, features, category_id, published_at, created_at, updated_at, seo_title, seo_description, how_to_use, rating, featured
)
SELECT
  uuid_generate_v4(),
  'AI Finder',
  'ai-finder',
  'AI Finder is an AI-powered file management agent for macOS that helps you find files using natural-language queries. You can search by content, keywords, tags, or modification time—without needing to remember file names or locations.
It also allows you to chat with PDF documents and summarize academic papers, articles, or reports. File analysis is performed locally on your device and works only within a defined workspace.',
  'https://aifinderapp.com/',
  NULL,
  'AI Finder - AI File Search',
  '[
    {"plan": "See Website", "price": "Free/Check Website", "features": ["Pricing information not provided in source"]}
  ]'::jsonb,
  '[
    {"title": "Find Any Files", "description": "Search by filename, content, tag, or time."},
    {"title": "Chat With PDF", "description": "Ask your PDF documents and gain insights."},
    {"title": "Summarize PDF", "description": "Extract key points from academic or research papers."},
    {"title": "Duplicate Search", "description": "Locate duplicate files or folders."},
    {"title": "Semantic Search", "description": "Use natural language to search across the workspace."}
  ]'::jsonb,
  aifinder_category.id, NOW(), NOW(), NOW(),
  'AI Finder – AI File Search for macOS',
  'AI Finder helps you find files and chat with PDFs on macOS using natural language. Local file analysis powered by GPT.',
  'Create a workspace with the files or folders you want to search. Use natural language to describe the file you''re looking for, such as "find duplicate files" or "files modified last week." You can also interact directly with PDFs by chatting or summarizing.',
  4.7, true
FROM aifinder_category
WHERE EXISTS (SELECT 1 FROM aifinder_category)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  url = EXCLUDED.url,
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
-- 2. WritePanda (Category: AI Video Editors)
-- ==========================================
WITH writepanda_category AS (
  SELECT id FROM categories WHERE name ILIKE 'AI Video Editors' LIMIT 1
)
INSERT INTO tools (
  id, name, slug, description, url, image_url, image_alt, pricing, features, category_id, published_at, created_at, updated_at, seo_title, seo_description, how_to_use, rating, featured
)
SELECT
  uuid_generate_v4(),
  'WritePanda',
  'writepanda',
  'WritePanda is an AI video editor and Creator Studio for YouTube content creation, publishing, and automation.
WritePanda lets you record, edit, generate scripts, create thumbnails, and publish directly to YouTube. Use AI to remove filler words, trim silence, add captions, enhance audio, and generate content like titles, descriptions, tags, thumbnails, and Shorts. Record in your browser or upload videos. Export as Shorts or long-form, and manage your YouTube channel from one place.',
  'https://www.writepanda.ai/',
  NULL,
  'WritePanda - AI Video Editor',
  '[
    {"plan": "Creator", "price": "$19/month", "features": ["60 minutes", "5 Shorts", "1080p export", "captions", "basic thumbnails", "YouTube publish"]},
    {"plan": "Professional", "price": "$49/month", "features": ["300 minutes", "unlimited Shorts", "AI thumbnails", "bulk edits", "4K export", "60fps", "analytics", "A/B testing", "silence removal"]},
    {"plan": "Business", "price": "$99/month", "features": ["Unlimited content", "3 users", "brand kit", "templates", "API access", "white-label exports", "custom AI", "account manager"]}
  ]'::jsonb,
  '[
    {"title": "AI Script Generator", "description": "Generate video scripts from ideas or refine existing ones."},
    {"title": "Smart Video Editor", "description": "Trim, cut, caption, remove silences with AI help."},
    {"title": "YouTube Optimization", "description": "AI creates titles, descriptions, tags, and thumbnails."},
    {"title": "Multi-Format Export", "description": "Create Shorts, long-form, and clips from one video."},
    {"title": "Direct YouTube Publish", "description": "Connect your channel and publish content directly."}
  ]'::jsonb,
  writepanda_category.id, NOW(), NOW(), NOW(),
  'WritePanda AI Video Editor for YouTube',
  'Use WritePanda to edit videos, generate scripts, thumbnails, and publish directly to YouTube with AI.',
  'Upload or record your video in-browser. Let AI edit by trimming silence, removing filler words, and adding captions. Use AI to generate scripts, titles, descriptions, tags, and thumbnails. Export as Shorts or full videos. Publish directly to YouTube.',
  4.6, true
FROM writepanda_category
WHERE EXISTS (SELECT 1 FROM writepanda_category)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  url = EXCLUDED.url,
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
-- 3. Octopus.do (Category: AI Flowchart Tools)
-- ==========================================
WITH octopus_category AS (
  SELECT id FROM categories WHERE name ILIKE 'AI Flowchart Tools' LIMIT 1
)
INSERT INTO tools (
  id, name, slug, description, url, image_url, image_alt, pricing, features, category_id, published_at, created_at, updated_at, seo_title, seo_description, how_to_use, rating, featured
)
SELECT
  uuid_generate_v4(),
  'Octopus.do',
  'octopus-do',
  'Octopus.do is a visual sitemap builder with AI content blocks, XML export, SEO tools, and team sharing.
Octopus.do helps you plan website structure visually, create content with a built-in editor or AI assistant, and export to platforms like Figma, WordPress, PNG, PDF, CSV, and sitemap.xml. Start from a URL crawl, template, prompt, or from scratch. Add and format content blocks, manage SEO tags, and publish as a live, minimalist site. Use it solo or collaborate with your team in real time.',
  'https://octopus.do/',
  NULL,
  'Octopus.do - Visual Sitemap Builder',
  '[
    {"plan": "Free", "price": "$0/month", "features": ["1 user", "1 project", "unlimited editors"]},
    {"plan": "Pro", "price": "$16/month", "features": ["1 user", "8 projects", "branding", "Figma sync", "SEO tools", "export", "versioning"]},
    {"plan": "Team", "price": "$24/seat/month", "features": ["Unlimited projects", "team roles", "folders", "full Pro features", "access control"]}
  ]'::jsonb,
  '[
    {"title": "AI Sitemap Generator", "description": "Create project from a prompt or crawl existing website structure."},
    {"title": "AI Content Creation", "description": "Draft, format, translate, and edit text using AI assistant."},
    {"title": "Export Options", "description": "Export to Figma, WordPress, PNG, PDF, CSV, or sitemap.xml."},
    {"title": "SEO Tags Editor", "description": "Generate and edit meta tags for pages to improve visibility."},
    {"title": "Collaboration Tools", "description": "Invite others to view, comment, or edit with access control."}
  ]'::jsonb,
  octopus_category.id, NOW(), NOW(), NOW(),
  'Octopus.do Visual Sitemap Builder with AI Content',
  'Use Octopus.do to build sitemaps, generate website content, and export to Figma, WordPress, or sitemap.xml',
  'Start by crawling a website, choosing a template, or generating with AI. Add pages and blocks. Use the text editor or AI assistant to draft and format content. Customize theme and SEO settings. Share via link or export to Figma, WordPress, or download as PDF, PNG, XML, or CSV.',
  4.7, true
FROM octopus_category
WHERE EXISTS (SELECT 1 FROM octopus_category)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  url = EXCLUDED.url,
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
-- 4. Bank Statement Convert (Category: AI Bank Tools - NEW)
-- ==========================================
-- Create category if not exists
INSERT INTO categories (id, name, slug, description, created_at, updated_at, seo_title, seo_description)
VALUES (
  uuid_generate_v4(),
  'AI Bank Tools',
  'ai-bank-tools',
  'AI Bank Tools for fraud detection, credit scoring, risk analysis, customer insights, compliance automation, and intelligent banking operations using machine learning.',
  NOW(), NOW(),
  'AI Bank Tools',
  'AI Bank Tools for fraud detection, credit scoring, risk analysis, customer insights, compliance automation, and intelligent banking operations using machine learning.'
)
ON CONFLICT (slug) DO NOTHING;

WITH bank_category AS (
  SELECT id FROM categories WHERE slug = 'ai-bank-tools' LIMIT 1
)
INSERT INTO tools (
  id, name, slug, description, url, image_url, image_alt, pricing, features, category_id, published_at, created_at, updated_at, seo_title, seo_description, how_to_use, rating, featured
)
SELECT
  uuid_generate_v4(),
  'Bank Statement Convert',
  'bank-statement-convert',
  'Bank Statement Convert transforms PDF bank statements into Excel or CSV formats instantly. Powered by Llama 3, it processes data locally for security and privacy.
Used by over 2,500 financial professionals, it eliminates manual data entry by recognizing transactions, dates, and amounts. Ideal for accountants and financial teams, it supports multiple bank formats, advanced categorization, and one-click export. Files are encrypted, processed securely, and deleted immediately after conversion. The system is SOC 2 Type II, GDPR, and CCPA compliant.',
  'https://bankstatementconverter.com/',
  NULL,
  'Bank Statement Convert - PDF to Excel',
  '[
    {"plan": "Starter Monthly", "price": "25.99 USD", "features": ["2000 credits", "500 pages", "Excel export", "14-day refund", "24/7 email support"]},
    {"plan": "Professional Monthly", "price": "69.99 USD", "features": ["7000 credits", "1750 pages", "Excel export", "18-day refund", "24/7 email and chat support"]},
    {"plan": "Advanced Yearly", "price": "210 USD", "features": ["30000 credits", "7500 pages", "Excel export", "property data insights", "120-day refund", "24/7 email support"]}
  ]'::jsonb,
  '[
    {"title": "AI-powered conversion", "description": "Uses Llama model to analyze and format data."},
    {"title": "Transaction categorization", "description": "Automatically classifies financial activity."},
    {"title": "Batch processing", "description": "Converts multiple documents simultaneously."},
    {"title": "Custom Excel formatting", "description": "Supports export template customization."},
    {"title": "Secure data processing", "description": "Uses encryption, auto file deletion, and compliance."}
  ]'::jsonb,
  bank_category.id, NOW(), NOW(), NOW(),
  'Bank Statement Convert PDF to Excel Tool',
  'Convert PDF bank statements to Excel or CSV with Llama 3 AI. Secure, fast, with SOC 2 Type II certified processing.',
  'Upload your PDF to bankstatementconvert.com, let the AI engine process it, and download your Excel or CSV file. The process takes seconds and requires no manual formatting.',
  4.5, true
FROM bank_category
WHERE EXISTS (SELECT 1 FROM bank_category)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  url = EXCLUDED.url,
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
-- 5. Neighborbrite (Category: AI Garden Design Tools - NEW)
-- ==========================================
-- Create category if not exists
INSERT INTO categories (id, name, slug, description, created_at, updated_at, seo_title, seo_description)
VALUES (
  uuid_generate_v4(),
  'AI Garden Design Tools',
  'ai-garden-design-tools',
  'AI Garden Design Tools for landscape planning, plant selection, layout visualization, irrigation mapping, and outdoor space optimization using intelligent design systems.',
  NOW(), NOW(),
  'AI Garden Design Tools',
  'AI Garden Design Tools for landscape planning, plant selection, layout visualization, irrigation mapping, and outdoor space optimization using intelligent design systems.'
)
ON CONFLICT (slug) DO NOTHING;

WITH neighborbrite_category AS (
  SELECT id FROM categories WHERE slug = 'ai-garden-design-tools' LIMIT 1
)
INSERT INTO tools (
  id, name, slug, description, url, image_url, image_alt, pricing, features, category_id, published_at, created_at, updated_at, seo_title, seo_description, how_to_use, rating, featured
)
SELECT
  uuid_generate_v4(),
  'Neighborbrite',
  'neighborbrite',
  'Neighborbrite is an AI-powered garden design tool that helps you transform your outdoor space. Upload a photo of your yard, choose a garden style, and generate design ideas. You can customize your plan or upgrade to a Pro Design package for a detailed layout and plant list.
Neighborbrite has over 350K users across 170+ countries and has generated more than 4 million designs. Use AI-enhanced concepts, realistic mockups, and 2D yard plans to design smarter and build faster.',
  'https://neighborbrite.com/',
  NULL,
  'Neighborbrite - AI Garden Design',
  '[
    {"plan": "One Area Plan", "price": "$287", "features": ["Includes front or backyard", "1:1 consultation", "2D layout", "plant list", "mockup", "2 free revisions"]},
    {"plan": "Full Yard Plan", "price": "$387", "features": ["Includes both front and backyard", "1:1 consultation", "all features listed above", "2 free revisions"]},
    {"plan": "Guarantee", "price": "Included", "features": ["All plans delivered in 1 week", "30-day money-back guarantee"]}
  ]'::jsonb,
  '[
    {"title": "AI-Enhanced Concepts", "description": "Use visual mockups to explore design possibilities."},
    {"title": "2D Yard Plan", "description": "Scaled layout with plant placement, ready for installation."},
    {"title": "Photo-Realistic Mockup", "description": "Shows how your finished yard will look."},
    {"title": "Plant and Material List", "description": "Tailored list based on your location and design."},
    {"title": "Live Design Call", "description": "30-minute consultation to discuss goals, space, and HOA needs."}
  ]'::jsonb,
  neighborbrite_category.id, NOW(), NOW(), NOW(),
  'Neighborbrite AI Yard and Garden Design Tool',
  'Neighborbrite lets you design your yard with AI, using photo uploads, 2D plans, and pro mockups. Pro design packages available with live consultation.',
  'Upload a photo of your yard. Select a garden style that matches your vision. See your design and get inspiration. Upgrade for customization and pro-level plans.',
  4.7, true
FROM neighborbrite_category
WHERE EXISTS (SELECT 1 FROM neighborbrite_category)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  url = EXCLUDED.url,
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
-- 6. NoteGPT (Category: AI Note Taker Tools)
-- ==========================================
WITH notegpt_category AS (
  SELECT id FROM categories WHERE name ILIKE 'AI Note Taker Tools' LIMIT 1
)
INSERT INTO tools (
  id, name, slug, description, url, image_url, image_alt, pricing, features, category_id, published_at, created_at, updated_at, seo_title, seo_description, how_to_use, rating, featured
)
SELECT
  uuid_generate_v4(),
  'NoteGPT',
  'notegpt',
  'NoteGPT is an AI learning assistant that helps you summarize YouTube videos, PDFs, articles, lectures, audios, PPTs, and images. It also creates notes, mind maps, and presentations using tools like ChatPDF and GPT-based models.
NoteGPT supports learners by generating summaries, flashcards, writing help, presentations, diagrams, and more. It works across videos, web pages, audio, and documents with support from DeepSeek, GPT, and Claude.',
  'https://notegpt.io/',
  NULL,
  'NoteGPT - AI Summarizer & Note Taker',
  '[
    {"plan": "Free Plan", "price": "$0/month", "features": ["15 quotas per month", "No credit card needed"]},
    {"plan": "Pro", "price": "$9.99/month or $19.99/month", "features": ["1000 quotas", "Access YouTube, Podcast, PDF, Audio, Video, Image, Webpage, Presentation, Word, Book, Text and more", "Batch summarize 5 videos", "Subscribe to 2 YouTube channels", "Limited AI tools"]},
    {"plan": "Pro+", "price": "$19/month or $44.99/month", "features": ["4000 quotas", "Batch summarize 10 videos", "Subscribe to 5 YouTube channels", "Convert and translate PDFs, videos, audio", "Limited AI tools"]},
    {"plan": "Unlimited", "price": "$29/month or $69.99/month", "features": ["Unlimited quotas", "Batch summarize 20 videos", "Subscribe to 10 YouTube channels", "Access all tools including diagram, flashcard, and full AI features"]}
  ]'::jsonb,
  '[
    {"title": "YouTube Summarizer", "description": "Batch summarize videos, get transcripts and AI-powered insights."},
    {"title": "AI Flashcard Maker", "description": "Generate flashcards from YouTube, documents, and audio."},
    {"title": "AI Presentation Maker", "description": "Create slides using notes, PDFs, or videos."},
    {"title": "ChatPDF", "description": "Summarize, chat, and translate PDFs with layout preserved."},
    {"title": "AI Homework Helper", "description": "Solve subject-wise problems with explanations and video support."}
  ]'::jsonb,
  notegpt_category.id, NOW(), NOW(), NOW(),
  'NoteGPT – AI Learning Assistant and Summarizer',
  'Use NoteGPT to summarize videos, PDFs, and content. Create flashcards, presentations, and solve homework with DeepSeek, GPT, and Claude.',
  'Log in to the NoteGPT website. Choose a summarizer or generator. Upload your file or paste a link. You can also use the Chrome extension to summarize YouTube, Udemy, Coursera, Vimeo, and Google content directly on the page.',
  4.7, true
FROM notegpt_category
WHERE EXISTS (SELECT 1 FROM notegpt_category)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  url = EXCLUDED.url,
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
-- 7. YouMind (Category: AI Team Workspace Tools)
-- ==========================================
WITH youmind_category AS (
  SELECT id FROM categories WHERE name ILIKE 'AI Team Workspace Tools' LIMIT 1
)
INSERT INTO tools (
  id, name, slug, description, url, image_url, image_alt, pricing, features, category_id, published_at, created_at, updated_at, seo_title, seo_description, how_to_use, rating, featured
)
SELECT
  uuid_generate_v4(),
  'YouMind',
  'youmind',
  'YouMind is a reimagined AI writing tool that helps you capture ideas, gather materials, write drafts, and turn them into articles, podcasts, videos, and more using top models like OpenAI, Anthropic, Google, and DeepSeek.
You can save YouTube, podcasts, articles, and webpages using the browser extension. Upload PDFs, m4a files, and documents into one board. Use the New Board feature to outline a topic, auto-search relevant materials, summarize, generate images, and adjust structure. Boards organize projects clearly for writing, bio research, travel planning, SVG diagrams, and personal knowledge management.',
  'https://youmind.com/',
  NULL,
  'YouMind - AI Writing & PKM',
  '[
    {"plan": "YouMind", "price": "$20/month", "features": ["7-day free trial", "full access to all features", "unlimited AI and material use", "one transparent price", "privacy guaranteed", "no data used for AI training"]}
  ]'::jsonb,
  '[
    {"title": "New Board", "description": "Outline topic, auto-search, summarize, create images, structure content."},
    {"title": "Creative Boards", "description": "Save and organize podcasts, YouTube, PDFs, webpages, audio, images."},
    {"title": "AI Assistant", "description": "Ask questions with top models like OpenAI, Anthropic, Google, DeepSeek."},
    {"title": "SVG Images", "description": "Generate SWOT diagrams and charts with editable SVG tools."},
    {"title": "Audio Output", "description": "Turn Snips into audio, insert into Thoughts, or download for use."}
  ]'::jsonb,
  youmind_category.id, NOW(), NOW(), NOW(),
  'YouMind AI Writing with Creative Boards',
  'YouMind is an AI writing and PKM tool powered by OpenAI and others. Save files, create SVGs, summarize, and write content in one board.',
  'Start free with a 7-day trial. Create a New Board, describe your topic, save files with the extension or upload them manually. Use AI to summarize, ask questions, create images or SVGs, write blogs, scripts, or tweets, then export or share your work.',
  4.8, true
FROM youmind_category
WHERE EXISTS (SELECT 1 FROM youmind_category)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  url = EXCLUDED.url,
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
-- 8. SDXLTurbo.ai (Category: AI Image Generators)
-- ==========================================
WITH sdxl_category AS (
  SELECT id FROM categories WHERE name ILIKE 'AI Image Generators' LIMIT 1
)
INSERT INTO tools (
  id, name, slug, description, url, image_url, image_alt, pricing, features, category_id, published_at, created_at, updated_at, seo_title, seo_description, how_to_use, rating, featured
)
SELECT
  uuid_generate_v4(),
  'SDXLTurbo.ai',
  'sdxlturbo-ai',
  'SDXLTurbo.ai is a free AI image generator that uses Stable Diffusion 3 with Adversarial Diffusion Distillation (ADD) to create high-quality images from text in real time.
SDXL Turbo generates 512x512 images in a single denoising step. Powered by Stability AI, it supports fast image creation with prompt input, image upscaling, watermark removal, and private outputs. The model is accessible directly in-browser and requires no setup. It also supports Flux.1, another advanced model developed by Black Forest Labs, available in pro, dev, and schnell variants.',
  'https://sdxlturbo.ai/',
  NULL,
  'SDXLTurbo.ai - Real-Time AI Image Generator',
  '[
    {"plan": "Free Plan", "price": "0/month", "features": ["10 daily generations for 7 days", "1 daily advanced edit", "generate 2 images", "1 running job", "commercial license", "private images"]},
    {"plan": "ProPro", "price": "10/month", "features": ["1000 fast generations", "unlimited normal", "30 advanced edits daily", "4 images", "2 jobs", "private images"]},
    {"plan": "MaxMax", "price": "20/month", "features": ["3000 fast generations", "unlimited normal", "120 advanced edits daily", "4 images", "5 jobs", "private images"]}
  ]'::jsonb,
  '[
    {"title": "Single-Step Generation", "description": "Uses ADD for real-time 512x512 image creation."},
    {"title": "Private Images", "description": "Generated images are only visible to you."},
    {"title": "Fast Output", "description": "Works in under 207ms on A100 GPU."},
    {"title": "AI Toolkit", "description": "Includes background remover, upscaler, watermark remover, face swap."},
    {"title": "Flux.1 Access", "description": "Try pro, dev, and schnell models through sdxlturbo.ai."}
  ]'::jsonb,
  sdxl_category.id, NOW(), NOW(), NOW(),
  'SDXLTurbo.ai Real-Time AI Image Generator',
  'Generate AI images free with SDXLTurbo.ai using Stable Diffusion 3 and ADD. No watermark. Private use. Includes upscaling and advanced editing.',
  'Go to sdxlturbo.ai, enter your text prompt, click Generate. The system outputs two images at once. Users can also access Advanced Edit options like Magic Erase, Upscale, or apply the AI Toolkit.',
  4.5, true
FROM sdxl_category
WHERE EXISTS (SELECT 1 FROM sdxl_category)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  url = EXCLUDED.url,
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
-- 9. Question AI (Category: AI Educational Tools)
-- ==========================================
WITH questionai2_category AS (
  SELECT id FROM categories WHERE name ILIKE 'AI Educational Tools' LIMIT 1
)
INSERT INTO tools (
  id, name, slug, description, url, image_url, image_alt, pricing, features, category_id, published_at, created_at, updated_at, seo_title, seo_description, how_to_use, rating, featured
)
SELECT
  uuid_generate_v4(),
  'Question AI',
  'question-ai',
  'Question AI is an AI homework solver that solves any questions in seconds. It provides step-by-step solutions across Math, Chemistry, Biology, Physics, Literature, and History.
Question AI supports typed, image, or document input and delivers detailed answers to help students understand and solve academic questions. With 98% accuracy and 24/7 access, it supports learning in over 100 languages.',
  'https://questionai.ai/',
  NULL,
  'Question AI - Homework Solver',
  '[
    {"plan": "Free Trial", "price": "$0", "features": ["Try the tool with limited question solving and image uploads"]},
    {"plan": "Monthly Subscription", "price": "$9.90/month", "features": ["Solve up to 30 homework questions", "upload 30 images", "early feature access", "prompt customer service"]},
    {"plan": "Yearly Subscription", "price": "$4.90/month", "features": ["Unlimited problem solving and unlimited image uploads"]}
  ]'::jsonb,
  '[
    {"title": "Unmatched Accuracy", "description": "Delivers 98% accurate results using powerful AI models."},
    {"title": "Detailed Solutions", "description": "Gives step-by-step answers to improve understanding."},
    {"title": "Flexible Input Options", "description": "Type, paste, or upload images and documents."},
    {"title": "24/7 Accessibility", "description": "Use it anytime for instant academic support."},
    {"title": "Multilingual Support", "description": "Supports 100+ languages including English, French, and German."}
  ]'::jsonb,
  questionai2_category.id, NOW(), NOW(), NOW(),
  'Question AI – AI Homework Solver with Step-by-Step Answers',
  'Question AI is an AI homework solver that solves any questions in seconds. It provides step-by-step solutions across Math, Chemistry, Biology, Physics, Literature, and History.',
  'Type your question or upload a document or image. The tool quickly analyzes it and generates a step-by-step answer in seconds. Works anytime with no limits.',
  4.6, true
FROM questionai2_category
WHERE EXISTS (SELECT 1 FROM questionai2_category)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  url = EXCLUDED.url,
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
