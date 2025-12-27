/**
 * Example JSON-LD structured data
 */

// Homepage JSON-LD
const homepageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Aitoonic",
  "description": "Discover the Best AI Tools and Platforms",
  "url": "https://aitoonic.com/",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://aitoonic.com/?search={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  },
  "specialty": "Directory of 200 AI tools across 10 categories"
};

console.log('Homepage JSON-LD:');
console.log(JSON.stringify(homepageJsonLd, null, 2));

// Tool JSON-LD
const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "ChatGPT",
  "description": "Advanced AI language model for natural conversations",
  "applicationCategory": "Conversational AI",
  "offers": {
    "@type": "Offer",
    "price": "Free",
    "priceCurrency": "USD"
  },
  "screenshot": "https://example.com/chatgpt.jpg",
  "operatingSystem": "Web-based",
  "url": "https://aitoonic.com/ai/chatgpt/"
};

console.log('\nTool JSON-LD:');
console.log(JSON.stringify(toolJsonLd, null, 2));

// Category JSON-LD
const categoryJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Conversational AI Tools",
  "description": "Collection of 25 Conversational AI Tools",
  "url": "https://aitoonic.com/category/conversational-ai/",
  "numberOfItems": 25
};

console.log('\nCategory JSON-LD:');
console.log(JSON.stringify(categoryJsonLd, null, 2));

// Breadcrumb JSON-LD
const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://aitoonic.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Conversational AI",
      "item": "https://aitoonic.com/category/conversational-ai/"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "ChatGPT",
      "item": "https://aitoonic.com/ai/chatgpt/"
    }
  ]
};

console.log('\nBreadcrumb JSON-LD:');
console.log(JSON.stringify(breadcrumbJsonLd, null, 2));
