import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

interface CategoryContent {
  intro: string;
  coreFeatures: Array<{ title: string; description: string }>;
  questions: Array<{ q: string; a: string }>;
  faq: Array<{ q: string; a: string }>;
}

function fallbackContent(categoryName: string): CategoryContent {
  const title = categoryName.replace(/-/g, ' ');
  return {
    intro: `${title} tools help you get practical work done faster. Explore core capabilities, common questions, and best practices to choose the right ${title} solution.`,
    coreFeatures: [
      { title: `Key Capability 1`, description: `Foundational functionality commonly expected from ${title} tools.` },
      { title: `Key Capability 2`, description: `Performance, reliability, and ease-of-use considerations.` },
      { title: `Integration`, description: `How ${title} tools connect with your existing stack and workflows.` },
      { title: `Security & Privacy`, description: `Data handling, permissions, and compliance aspects.` },
      { title: `Value`, description: `Pricing models and how to evaluate ROI for ${title}.` }
    ],
    questions: [
      { q: `What is ${title}?`, a: `${title} refers to a category of AI tools designed to solve a specific set of tasks with automation and intelligence.` },
      { q: `Who should use ${title}?`, a: `Teams and individuals who need to streamline tasks and improve outcomes across workflows.` },
      { q: `How do I choose a ${title} tool?`, a: `Start with your use-case, feature fit, integrations, and total cost of ownership.` },
      { q: `Is there a free option for ${title}?`, a: `Many tools offer trials or free tiers—compare limits, features, and support.` }
    ],
    faq: [
      { q: `Are ${title} tools safe?`, a: `Choose reputable vendors, review permissions, and follow your org's security policies.` },
      { q: `Do I need coding skills?`, a: `Most tools offer no-code or low-code experiences; advanced users can leverage APIs.` },
      { q: `Can I integrate ${title} with my stack?`, a: `Yes—look for native integrations or open APIs.` },
      { q: `What about data privacy?`, a: `Review data retention, encryption, and region controls before adoption.` },
      { q: `How quickly can I get value?`, a: `Most teams see quick wins with a focused pilot and clear success metrics.` }
    ]
  };
}

export async function generateCategoryContent(categoryName: string): Promise<CategoryContent> {
  // Fast fallback when API key is not configured
  if (!process.env.GEMINI_API_KEY) {
    return fallbackContent(categoryName);
  }

  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const prompt = `Generate unique and detailed content about ${categoryName} technology. Include:
  1. A comprehensive introduction explaining what ${categoryName} is and its significance (2-3 paragraphs)
  2. 5 core features with unique descriptions specific to ${categoryName}
  3. 4-5 detailed questions and answers about ${categoryName}, focusing on its practical applications
  4. 5 frequently asked questions with answers specific to ${categoryName}

  Format the response in JSON with the following structure:
  {
    "intro": "introduction text",
    "coreFeatures": [{"title": "feature name", "description": "feature description"}],
    "questions": [{"q": "question", "a": "answer"}],
    "faq": [{"q": "question", "a": "answer"}]
  }

  Make sure all content is unique and specifically tailored to ${categoryName}, avoiding generic AI descriptions.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return JSON.parse(text) as CategoryContent;
  } catch (error) {
    console.error('Error generating content with Gemini:', error);
    // Fall back to deterministic content on failure as well
    return fallbackContent(categoryName);
  }
}