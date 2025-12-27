-- Migration to add Batch 2 of 10 new AI tools with EXACT user content
-- Format: image_url is NULL, ON CONFLICT DO UPDATE (except image_url) to fix data but preserve uploads.

-- ==========================================
-- 1. Airscale (Category: AI Lead Generation Tools)
-- ==========================================
WITH airscale_category AS (
  SELECT id FROM categories WHERE name ILIKE 'AI Lead Generation Tools' OR name ILIKE 'AI Lead Generation%' LIMIT 1
)
INSERT INTO tools (
  id, name, slug, description, url, image_url, image_alt, pricing, features, category_id, published_at, created_at, updated_at, seo_title, seo_description, how_to_use, rating, featured
)
SELECT
  uuid_generate_v4(),
  'Airscale',
  'airscale',
  'Airscale helps go-to-market teams up level their data enrichment and automate personalized outreach. Build your outbound lists and aggregate the best data about your leads to create outbound campaigns that work. Identify your TAM with real time and intent-based leads sourcing, then enrich for unmatched data coverage and accuracy.',
  'https://airscale.io/',
  NULL, -- Image set to NULL
  'Airscale data enrichment and TAM sourcing',
  '[
    {"plan": "Starter", "price": "$49/month", "features": ["4000 credits per month", "credit cost $0.01225"]},
    {"plan": "Scale", "price": "$99/month", "features": ["12000 credits per month", "credit cost $0.00825"]},
    {"plan": "Growth", "price": "$189/month", "features": ["25000 credits per month", "credit cost $0.0075"]},
    {"plan": "Flexible credit-based system", "price": "Included", "features": ["source and enrich your leads", "Credits never expire and are reported to the next month if unused", "Unlimited users", "credits roll over", "waterfall enrichments", "access to 30+ data providers", "export to CRMs", "export to email sequencers", "access to Airsearch", "API access", "HTTP API enrichments", "use your own API keys"]}
  ]'::jsonb,
  '[
    {"title": "TAM sourcing", "description": "Real time and intent-based data sourcing."},
    {"title": "Waterfall enrichment", "description": "Find phone numbers and emails with providers."},
    {"title": "30+ data providers", "description": "Access 450+ data points."},
    {"title": "CRM and sequencers", "description": "Hubspot, Smartlead, Lemlist, Instantly."},
    {"title": "Airsearch", "description": "Capture data from any webpage."}
  ]'::jsonb,
  airscale_category.id, NOW(), NOW(), NOW(),
  'Airscale data enrichment and TAM sourcing',
  'Build lists of leads, enrich with 30+ providers, and sync to your CRM.',
  'Build lists of leads and accounts using built-in scrapers and premium integrations. Use advanced filtering. Extract Sales Navigator search results, scrape Google maps, import leads from Apollo, import from a CSV file, or find people. Run waterfall enrichment to find phone numbers and emails. Use Airsearch to capture valuable data from any webpage. Sync to your CRM or sequencers in 1 click.',
  4.8, true
FROM airscale_category
WHERE EXISTS (SELECT 1 FROM airscale_category)
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
-- 2. GoGlobal.World (Category: AI Startup and Investor Tools - NEW)
-- ==========================================
-- Create category if not exists
INSERT INTO categories (id, name, slug, description, created_at, updated_at, seo_title, seo_description)
VALUES (
  uuid_generate_v4(),
  'AI Startup and Investor Tools',
  'ai-startup-and-investor-tools',
  'AI Startup & Investor Matchmaking Tools connect founders, investors, VCs, and LPs using intelligent filtering, automated deal flow, and data-driven matching.',
  NOW(), NOW(),
  'AI Startup and Investor Tools',
  'AI Startup & Investor Matchmaking Tools connect founders, investors, VCs, and LPs using intelligent filtering, automated deal flow, and data-driven matching.'
)
ON CONFLICT (slug) DO NOTHING;

WITH goglobal_category AS (
  SELECT id FROM categories WHERE slug = 'ai-startup-and-investor-tools' LIMIT 1
)
INSERT INTO tools (
  id, name, slug, description, url, image_url, image_alt, pricing, features, category_id, published_at, created_at, updated_at, seo_title, seo_description, how_to_use, rating, featured
)
SELECT
  uuid_generate_v4(),
  'GoGlobal.World',
  'goglobal-world',
  'GoGlobal.World is a SaaS platform for investors and startups with AI matchmaking. It connects verified investors, LPs, and startups in one place, offering deal flow tools and standardized profiles to simplify outreach and communication.
The platform helps investors receive relevant startup profiles with automatic filtering based on personal criteria. Startups can showcase their ventures in a unified one-pager format, share profiles, and access a global network. All chats, updates, and deals are organized in one dashboard with Kanban funnel and analytics (in development). The platform supports CRM for fundraising, built-in messenger, verified access, and startup services including incorporation, tax, payroll, and legal.',
  'https://goglobal.world',
  NULL, -- Image set to NULL
  'GoGlobal.World – AI Matchmaking for Investors and Startups',
  '[
    {"plan": "SCOUT", "price": "Free", "features": ["Personal link", "limited connects", "limited matchmaking", "follow startups", "updates"]},
    {"plan": "Investor", "price": "$249/month", "features": ["Unlimited connects", "full directory", "verified badge", "newsletter feature", "investor network access", "discount on services"]},
    {"plan": "Premium", "price": "Contact us", "features": ["Personal manager", "handpicked matches", "individual profile setup", "screened deals"]}
  ]'::jsonb,
  '[
    {"title": "AI Matchmaking", "description": "Receive startups via personal criteria."},
    {"title": "CRM Dashboard", "description": "Track chats and deal flow."},
    {"title": "Verified Access", "description": "Match with verified investors and startups."},
    {"title": "Standard Profiles", "description": "One-pager format for visibility."},
    {"title": "Built-in Messenger", "description": "Chat with matches inside platform."}
  ]'::jsonb,
  goglobal_category.id, NOW(), NOW(), NOW(),
  'GoGlobal.World – AI Matchmaking for Investors and Startups',
  'SaaS platform for AI matchmaking, startup deal flow, verified investors, and CRM fundraising tools. Join GoGlobal.World today.',
  'Join the platform and create your investor or startup profile. Set filters to receive relevant matches. Use the dashboard to redirect all inbound startups, track deal flow, and manage communication. Share your profile via a personal link, follow updates, join investor chats, and use CRM features to build your network.',
  4.7, true
FROM goglobal_category
WHERE EXISTS (SELECT 1 FROM goglobal_category)
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
-- 3. Fantasy.ai (Category: AI girlfriend tools)
-- ==========================================
WITH fantasy_category AS (
  SELECT id FROM categories WHERE name ILIKE 'AI girlfriend tools' OR name ILIKE 'AI Girlfriend%' LIMIT 1
)
INSERT INTO tools (
  id, name, slug, description, url, image_url, image_alt, pricing, features, category_id, published_at, created_at, updated_at, seo_title, seo_description, how_to_use, rating, featured
)
SELECT
  uuid_generate_v4(),
  'Fantasy.ai',
  'fantasy-ai',
  'Fantasy.ai is a customizable AI girlfriend and NSFW image generator platform offering voice, video, and photo chats. Users create hyper-personalized virtual companions using Fantasy Shaper.
Design companions by choosing ethnicity, age, clothing, personality, and more. Chat, call, or receive AI-generated NSFW photos and videos. Choose from verified model profiles based on real people or design unique characters from scratch.',
  'https://fantasy.ai/',
  NULL, -- Image set to NULL
  'Fantasy.ai AI Girlfriend and NSFW Companion Generator',
  '[
    {"plan": "Free Mode", "price": "$0/month", "features": ["Ad-supported", "message for 0.1 tokens", "limited image generation"]},
    {"plan": "Monthly Plan", "price": "$12.99/month", "features": ["200 tokens/month", "voice", "video", "premium features"]},
    {"plan": "3-Month Plan", "price": "$9.99/month", "features": ["Billed $29.97 every 3 months", "faster responses"]},
    {"plan": "Annual Plan", "price": "$5.83/month", "features": ["Billed $69.96/year", "full access"]},
    {"plan": "Payment", "price": "Included", "features": ["Supports Google Pay", "Apple Pay", "cryptocurrency via CoinGate", "Initial payment charged", "rebills monthly unless canceled"]}
  ]'::jsonb,
  '[
    {"title": "Fantasy Shaper", "description": "Visual and personality customization."},
    {"title": "Verified Models", "description": "AI clones of real models."},
    {"title": "NSFW Content Generator", "description": "Create or request explicit media."},
    {"title": "Voice and Calls", "description": "Choose voice and make phone calls."},
    {"title": "Token System", "description": "Unlocks additional content and interactions."}
  ]'::jsonb,
  fantasy_category.id, NOW(), NOW(), NOW(),
  'Fantasy.ai AI Girlfriend and NSFW Companion Generator',
  'Create your fantasy AI girlfriend with NSFW photo, video, voice, and chat. Verified models. Customize appearance, behavior and unlock premium content.',
  'Sign up for free. Open Fantasy Builder. Select image type (Realistic or Anime), then customize voice, ethnicity, hair color, age, body, outfit, and personality. Click "Create." Chat begins instantly. Request images or videos during chat, or call directly. Buy tokens to unlock locked content.',
  4.6, true
FROM fantasy_category
WHERE EXISTS (SELECT 1 FROM fantasy_category)
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
-- 4. Visuali.io (Category: AI Image Generators)
-- ==========================================
WITH visuali_category AS (
  SELECT id FROM categories WHERE name ILIKE 'AI Image Generators' OR name ILIKE 'AI Image Generator%' LIMIT 1
)
INSERT INTO tools (
  id, name, slug, description, url, image_url, image_alt, pricing, features, category_id, published_at, created_at, updated_at, seo_title, seo_description, how_to_use, rating, featured
)
SELECT
  uuid_generate_v4(),
  'Visuali.io',
  'visuali-io',
  'Visuali.io is an AI image generation and editing platform using Stable Diffusion XL, Flux Schnell, and Flux Dev. Generate images, edit with natural-language, fill, outpaint, and evolve. Use an infinite canvas, save projects organized into layers, and work on mobile, tablet, and laptop.',
  'https://visuali.io/',
  NULL, -- Image set to NULL
  'Visuali.io AI Image Generation and Editing',
  '[
    {"plan": "Limited Free Trial", "price": "3 days free then $10/month", "features": ["3 days free"]},
    {"plan": "Subscription", "price": "$10/month", "features": ["1000 tokens monthly", "generate 1000 images"]}
  ]'::jsonb,
  '[
    {"title": "AI image generation", "description": "Text prompts to images."},
    {"title": "AI inpainting", "description": "Remove, add, replace elements."},
    {"title": "AI outpainting", "description": "1024x1024 high-resolution expansion."},
    {"title": "Sketch to image", "description": "Draw or sketch to photos."},
    {"title": "Infinite canvas", "description": "Smooth zooming and panning."}
  ]'::jsonb,
  visuali_category.id, NOW(), NOW(), NOW(),
  'Visuali.io AI Image Generation and Editing',
  'Generate, edit, inpaint, outpaint, and evolve images with Visuali.io using Stable Diffusion XL, Flux Schnell, and Flux Dev.',
  'Sign up, open the Visuali AI editor, select a model, enter a prompt or upload an image, choose Edit, Fill, or Evolve, expand on the infinite canvas with smooth zooming and panning, then save your project.',
  4.7, true
FROM visuali_category
WHERE EXISTS (SELECT 1 FROM visuali_category)
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
-- 5. ColorMagic (Category: AI Design Tools)
-- ==========================================
WITH color_category AS (
  SELECT id FROM categories WHERE name ILIKE 'AI Design Tools' OR name ILIKE 'AI Design%' LIMIT 1
)
INSERT INTO tools (
  id, name, slug, description, url, image_url, image_alt, pricing, features, category_id, published_at, created_at, updated_at, seo_title, seo_description, how_to_use, rating, featured
)
SELECT
  uuid_generate_v4(),
  'ColorMagic',
  'colormagic',
  'ColorMagic is a free AI color palette generator that helps you build color schemes using a name, keyword, image, or hex code. It includes tools like random color generator, contrast checker, and CSS gradient builder.
Upload images or paste image URLs to generate palettes. Use keywords like "Ghibli" or "Luxury" for themes. Extract HEX and RGB values, check accessibility with WCAG contrast, and download palettes as PNG.',
  'https://colormagic.app/',
  NULL, -- Image set to NULL
  'ColorMagic AI Color Palette Generator from Text or Image',
  '[
    {"plan": "Free Forever", "price": "Free", "features": ["100 percent free", "unlimited palette generation", "tool access"]}
  ]'::jsonb,
  '[
    {"title": "From Text or HEX", "description": "Use any word or color code."},
    {"title": "From Image", "description": "Upload image or use direct link."},
    {"title": "Color Mixer", "description": "Blend two colors by ratio."},
    {"title": "Contrast Checker", "description": "Verify text/background contrast."},
    {"title": "Gradient Generator", "description": "Copy CSS gradient codes."}
  ]'::jsonb,
  color_category.id, NOW(), NOW(), NOW(),
  'ColorMagic AI Color Palette Generator from Text or Image',
  'Free AI color palette generator from image, text, and HEX. Includes mixer, contrast checker, CSS gradients. Inspired by Disney, Studio Ghibli, and more.',
  'Go to ColorMagic. Enter a name, keyword, text, or hex code. Click Generate Color Palette. Upload an image to create a palette from photo. Use color mixer to blend hues. Check contrast ratio with WCAG guidelines. Copy CSS or download your palette.',
  4.8, true
FROM color_category
WHERE EXISTS (SELECT 1 FROM color_category)
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
-- 6. FinanceGPT (Category: AI Finance Tools for Analysis & Forecasting - NEW)
-- ==========================================
-- Create category if not exists
INSERT INTO categories (id, name, slug, description, created_at, updated_at, seo_title, seo_description)
VALUES (
  uuid_generate_v4(),
  'AI Finance Tools for Analysis & Forecasting',
  'ai-finance-tools-for-analysis-forecasting',
  'Explore AI Finance Tools for financial analysis, forecasting, valuation, risk modeling, and data insights using advanced quantitative and generative AI models.',
  NOW(), NOW(),
  'AI Finance Tools for Analysis & Forecasting',
  'Explore AI Finance Tools for financial analysis, forecasting, valuation, risk modeling, and data insights using advanced quantitative and generative AI models.'
)
ON CONFLICT (slug) DO NOTHING;

WITH finance_category AS (
  SELECT id FROM categories WHERE slug = 'ai-finance-tools-for-analysis-forecasting' LIMIT 1
)
INSERT INTO tools (
  id, name, slug, description, url, image_url, image_alt, pricing, features, category_id, published_at, created_at, updated_at, seo_title, seo_description, how_to_use, rating, featured
)
SELECT
  uuid_generate_v4(),
  'FinanceGPT',
  'financegpt',
  'FinanceGPT is a suite of AI financial tools that combine generative AI, Large Quantitative Models (LQMs), and quantitative language models to turn complex financial data into actionable insights. Developed by FinanceGPT Labs, it supports financial analysis, forecasting, investment strategy, and risk assessment for frontier markets. Models include FinanceGPT-SSA, FinanceGPT-MENA/FinanceGPT-Shariah, and FinanceGPT-APAC, each tailored to regional financial landscapes.',
  'https://financegpt.uk/',
  NULL, -- Image set to NULL
  'FinanceGPT: LQMs + Quantitative Language Models for Finance',
  '[
    {"plan": "Pricing", "price": "No public pricing listed", "features": []}
  ]'::jsonb,
  '[
    {"title": "Large Quantitative Models", "description": "VAE-GAN and deep neural networks for forecasting."},
    {"title": "Quantitative language models", "description": "Regional models for SSA, MENA/Shariah, APAC."},
    {"title": "Generative tools", "description": "10+ AI tools for analysis and strategy."},
    {"title": "Risk management", "description": "Simulate market scenarios for planning."},
    {"title": "Data visualization", "description": "Turn data into charts and narratives."}
  ]'::jsonb,
  finance_category.id, NOW(), NOW(), NOW(),
  'FinanceGPT: LQMs + Quantitative Language Models for Finance',
  'FinanceGPT combines generative AI, Large Quantitative Models, and quantitative language models for financial analysis, forecasting, risk assessment, and regional insights.',
  'Create an account on FinanceGPT. Upload or input financial statements, market conditions, and regions of interest. Select analysis tools such as balance sheet review, cash flow analysis, or valuation. The platform generates AI-driven reports, forecasts, and strategies ready to share. Use specialized regional models for localized insights.',
  4.7, true
FROM finance_category
WHERE EXISTS (SELECT 1 FROM finance_category)
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
-- 7. IconAI (Category: AI SVG Generators)
-- ==========================================
WITH icon_category AS (
  SELECT id FROM categories WHERE name ILIKE 'AI SVG Generators' OR name ILIKE 'AI SVG%' LIMIT 1
)
INSERT INTO tools (
  id, name, slug, description, url, image_url, image_alt, pricing, features, category_id, published_at, created_at, updated_at, seo_title, seo_description, how_to_use, rating, featured
)
SELECT
  uuid_generate_v4(),
  'IconAI',
  'iconai',
  'IconAI creates AI generated icons in seconds. It offers an Icon Generator, SVG Generator, Background Remover, and an AI Chat Assistant. Use an optimized AI pipeline, prompt builder, custom presets, and prompts. Generate amazing, high-quality SVG art and logos. Match your brand’s style.',
  'https://iconai.co/',
  NULL, -- Image set to NULL
  'IconAI AI generated icons and SVG Generator',
  '[
    {"plan": "Starter Tier", "price": "$5 one-time", "features": ["50 credits", "try out AI icon generation"]},
    {"plan": "Pro Tier", "price": "$18 one-time", "features": ["200 credits", "for small businesses and creators"]},
    {"plan": "Business Tier", "price": "$48 one-time", "features": ["600 credits", "priority generation and advanced features"]},
    {"plan": "Enterprise Tier", "price": "$105 one-time", "features": ["1500 credits", "dedicated support"]},
    {"plan": "No subscriptions", "price": "Credits", "features": ["just credits"]}
  ]'::jsonb,
  '[
    {"title": "Icon Generator", "description": "Generate icons in seconds with an optimized AI pipeline."},
    {"title": "SVG Generator", "description": "Generate SVG icons in seconds and logos."},
    {"title": "Background Remover", "description": "Remove backgrounds from icons or images."},
    {"title": "AI Chat Assistant", "description": "Ask anything and get instant answers."}
  ]'::jsonb,
  icon_category.id, NOW(), NOW(), NOW(),
  'IconAI AI generated icons and SVG Generator',
  'Create AI generated icons, SVG art, logos, background removal, and instant answers with IconAI.',
  'Select a tier. Use the Icon Generator or SVG Generator with the prompt builder, custom presets, and prompts. Remove backgrounds from your icons or personal images. Ask anything about the platform and get instant answers.',
  4.6, true
FROM icon_category
WHERE EXISTS (SELECT 1 FROM icon_category)
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
-- 8. VBA Code Generator (Category: AI Code Assistants Tools)
-- ==========================================
WITH code_category AS (
  SELECT id FROM categories WHERE name ILIKE 'AI Code Assistants Tools' OR name ILIKE 'AI Code Assistant%' OR name ILIKE 'AI Coding%' LIMIT 1
)
INSERT INTO tools (
  id, name, slug, description, url, image_url, image_alt, pricing, features, category_id, published_at, created_at, updated_at, seo_title, seo_description, how_to_use, rating, featured
)
SELECT
  uuid_generate_v4(),
  'VBA Code Generator',
  'vba-code-generator',
  'VBA Code Generator is an AI-powered tool that generates VBA code from simple text instructions. It helps automate Excel and Access tasks instantly.
The tool supports code generation for a wide range of VBA applications. Users input requirements in plain text, and the AI provides usable VBA code. It''s designed for both beginners and experienced users. No programming skills are required. The interface is called VBA Playground. You can try it free with no credit card.',
  'https://app.formulabot.com/ai-vba-code-generator',
  NULL, -- Image set to NULL
  'VBA Code Generator | AI Tool for Excel VBA Code',
  '[
    {"plan": "Free", "price": "$0/month", "features": ["5 VBA code generations", "email support"]},
    {"plan": "Pro Monthly", "price": "$4.99/month", "features": ["Full access", "unlimited generations", "early access to features", "priority support"]}
  ]'::jsonb,
  '[
    {"title": "Instant Code Generation", "description": "Input and get code fast."},
    {"title": "Easy to Use", "description": "For all skill levels."},
    {"title": "Versatile Applications", "description": "Excel and Access tasks."},
    {"title": "Time-Saving", "description": "Reduces manual coding."}
  ]'::jsonb,
  code_category.id, NOW(), NOW(), NOW(),
  'VBA Code Generator | AI Tool for Excel VBA Code',
  'Generate Excel and Access VBA code using AI. Try VBA Code Generator for free. No programming needed.',
  'Sign up free → Open VBA Playground → Type your Excel or Access task → Click Generate → Get your code → Copy and use as needed.',
  4.5, true
FROM code_category
WHERE EXISTS (SELECT 1 FROM code_category)
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
-- 9. AYCD.io (Category: AI Browser Automation Tools & Extensions)
-- ==========================================
WITH browser_category AS (
  SELECT id FROM categories WHERE name ILIKE 'AI Browser Automation Tools & Extensions' OR name ILIKE 'AI Browser Automation%' LIMIT 1
)
INSERT INTO tools (
  id, name, slug, description, url, image_url, image_alt, pricing, features, category_id, published_at, created_at, updated_at, seo_title, seo_description, how_to_use, rating, featured
)
SELECT
  uuid_generate_v4(),
  'AYCD.io',
  'aycd-io',
  'AYCD.io is a multi-module automation platform for account farming, email scraping, SEO traffic simulation, and spoofed browsing. Its humanizer system automates Gmail tools, spoofed sessions, and profile creation at scale for stealth operations.
AYCD Toolbox grants access to core modules like OneClick, Inbox, TabSentry, Profile Builder, Location Spoof, and Server Generator. These tools enable automated Gmail management (forwarding, password resets), inbox data scraping, browser spoofing, profile generation, proxy testing, and global SEO campaigns. Each action is handled in unique virtualized browser sessions.',
  'https://aycd.io/',
  NULL, -- Image set to NULL
  'AYCD Toolbox - Gmail Tools & Profile Builder Suite',
  '[
    {"plan": "Resell Pass", "price": "$30/month", "features": ["Core resell tools access"]},
    {"plan": "Queue Pass", "price": "$35/month", "features": ["Queue farming and browser tools"]},
    {"plan": "Traffic Pass", "price": "$49/month", "features": ["SEO and traffic generator access"]},
    {"plan": "Ultimate Pass", "price": "$65/month", "features": ["Full access: OneClick, Inbox, Spoof, Traffic and more"]}
  ]'::jsonb,
  '[
    {"title": "Email Tools", "description": "Gmail forward, inbox scrape, auto-unsubscribe."},
    {"title": "Profile Builder", "description": "Generate cards, jig data, export profiles."},
    {"title": "Location Spoof", "description": "Simulate GPS across iOS devices."},
    {"title": "Browser Farming", "description": "Unlimited spoofed Chrome sessions."},
    {"title": "Proxy Tester", "description": "Filter thousands for speed and anonymity."}
  ]'::jsonb,
  browser_category.id, NOW(), NOW(), NOW(),
  'AYCD Toolbox - Gmail Tools & Profile Builder Suite',
  'Use AYCD.io to manage Gmail, spoof browsers, scrape inboxes, and generate profiles. Tools: OneClick, Inbox, TabSentry, Spoof and more.',
  'Download AYCD Toolbox from your account dashboard. Log in. Access modules like OneClick to add Gmail accounts or solvers. Assign proxies, configure farming schedules, and run automated sessions. Use Inbox to scrape emails. TabSentry to create browser tabs. Location Spoof to simulate GPS on iOS. Auto backups and restore included in Toolbox settings.',
  4.7, true
FROM browser_category
WHERE EXISTS (SELECT 1 FROM browser_category)
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
-- 10. HiChat Assistant (Category: AI Customer Support Tools)
-- ==========================================
WITH support_category AS (
  SELECT id FROM categories WHERE name ILIKE 'AI Customer Support Tools' OR name ILIKE 'AI Customer Support%' LIMIT 1
)
INSERT INTO tools (
  id, name, slug, description, url, image_url, image_alt, pricing, features, category_id, published_at, created_at, updated_at, seo_title, seo_description, how_to_use, rating, featured
)
SELECT
  uuid_generate_v4(),
  'HiChat Assistant',
  'hichat-assistant',
  'HiChat Assistant is an AI virtual employee that manages sales and customer service. It connects to WhatsApp, your website, Instagram, and CRMs to automate customer interactions, qualify leads, and follow up 24/7.
Unlike common chatbots, HiChat Assistant understands context, accesses your systems, and improves with every conversation. It solves problems, not just answers. It frees your team by handling routine tasks and helps grow your business with smart, proactive responses.',
  'https://hichat.com.ar/',
  NULL, -- Image set to NULL
  'Hi Chat Assistant – AI Virtual Employee for Businesses',
  '[
    {"plan": "Starter", "price": "$190/month", "features": ["1,000 conversations", "1 WhatsApp", "1 web bubble", "up to 10 products", "2 weeks support"]},
    {"plan": "Enterprise", "price": "$550/month", "features": ["6,500 conversations", "logo and name customization", "webhook", "100 products", "4 weeks support"]},
    {"plan": "Custom", "price": "Let''s talk", "features": ["Custom AI neuron", "any system integration", "unlimited products", "full management and support"]},
    {"plan": "Extras", "price": "Add-ons", "features": ["Extra chat: $0.30", "Additional WhatsApp: $50/month"]}
  ]'::jsonb,
  '[
    {"title": "Real Understanding", "description": "Reads context and intent like a human."},
    {"title": "CRM Integration", "description": "Works with HubSpot, Zapier, or custom API."},
    {"title": "Sales Automation", "description": "Qualifies leads and follows up."},
    {"title": "Multi-Platform", "description": "Integrates with WhatsApp, web, Instagram."},
    {"title": "Escalation System", "description": "Transfers complex queries to human agents."}
  ]'::jsonb,
  support_category.id, NOW(), NOW(), NOW(),
  'Hi Chat Assistant – AI Virtual Employee for Businesses',
  'AI virtual employee for sales and customer service. Integrates with WhatsApp, CRM, and web. Try Hi Chat Assistant with a free trial.',
  'Schedule a meeting to explain your goals. The assistant is trained and connected to your systems like WhatsApp or CRM. After setup, it starts handling chats, resolving issues, or transferring to human agents if needed.',
  4.7, true
FROM support_category
WHERE EXISTS (SELECT 1 FROM support_category)
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
