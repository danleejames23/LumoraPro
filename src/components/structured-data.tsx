const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Lumora Pro",
  "description": "Professional web development services with fixed pricing. Websites, web apps, e-commerce, and AI solutions.",
  "url": "https://lumorapro.netlify.app",
  "telephone": "+447359792577",
  "email": "hello@lumora.dev",
  "priceRange": "££",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "GB"
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    "opens": "00:00",
    "closes": "23:59"
  },
  "serviceType": [
    "Web Development",
    "Website Design",
    "Web Application Development",
    "E-commerce Development",
    "AI Integration",
    "Mobile App Development"
  ]
}

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Lumora Pro",
  "url": "https://lumorapro.netlify.app",
  "description": "Professional web development services with fixed pricing",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://lumorapro.netlify.app/services?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}

export function LocalBusinessSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
    />
  )
}

export function WebsiteSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
    />
  )
}

export function ServicesSchema() {
  const services = [
    {
      name: "Landing Page",
      description: "High-converting single-page websites",
      price: "149",
      priceCurrency: "GBP"
    },
    {
      name: "Business Website",
      description: "Professional multi-page websites",
      price: "349",
      priceCurrency: "GBP"
    },
    {
      name: "E-Commerce Store",
      description: "Complete online stores with payment processing",
      price: "549",
      priceCurrency: "GBP"
    },
    {
      name: "Custom Web App",
      description: "Tailored web applications",
      price: "999",
      priceCurrency: "GBP"
    },
    {
      name: "AI Chatbot",
      description: "Intelligent chatbot for customer support",
      price: "299",
      priceCurrency: "GBP"
    }
  ]

  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Web Development Services",
    "description": "Professional web development services with fixed pricing",
    "numberOfItems": services.length,
    "itemListElement": services.map((service, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Service",
        "name": service.name,
        "description": service.description,
        "provider": {
          "@type": "ProfessionalService",
          "name": "Lumora Pro"
        },
        "offers": {
          "@type": "Offer",
          "price": service.price,
          "priceCurrency": service.priceCurrency
        }
      }
    }))
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function FAQSchema() {
  const faqs = [
    {
      question: "How much does a website cost?",
      answer: "Our websites start from £149 for landing pages, £349 for business websites, and £549 for e-commerce stores. All prices are fixed with no hidden costs."
    },
    {
      question: "How long does it take to build a website?",
      answer: "Most projects are completed within 1-14 days depending on complexity. Landing pages take 1-2 days, business websites 3-5 days, and larger projects 7-14 days."
    },
    {
      question: "Do you offer ongoing support?",
      answer: "Yes, all projects include 30 days of free support. We also offer monthly maintenance packages starting from £79/month."
    },
    {
      question: "What technologies do you use?",
      answer: "We specialize in React, Next.js, Node.js, and modern web technologies. We also integrate AI solutions using GPT, Claude, and custom models."
    }
  ]

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
