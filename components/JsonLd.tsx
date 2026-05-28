import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/seo";

/**
 * Structured data for rich results. Mirrors the conventions in
 * sigmaschool-web: Organization + WebApplication + AggregateRating + FAQ.
 */
export default function JsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://sigmaschool.co/#organization",
        name: "Sigmaschool",
        url: "https://sigmaschool.co",
        description:
          "Sigmaschool trains AI-native software developers in 90 days. Remote-first, mentor-reviewed, project-based.",
        sameAs: ["https://sigmaschool.co"],
      },
      {
        "@type": "WebApplication",
        "@id": `${SITE_URL}/#quiz`,
        name: SITE_NAME,
        url: SITE_URL,
        description: SITE_DESCRIPTION,
        applicationCategory: "EducationalApplication",
        operatingSystem: "Web",
        isAccessibleForFree: true,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        publisher: { "@id": "https://sigmaschool.co/#organization" },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "148",
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "What does the AI career quiz tell me?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "It reveals your AI-era career archetype (Builder, Automator, Analyst, Creator, or Grower), a personalised income projection based on your current salary, a 30-day starter plan, and the skills to learn first.",
            },
          },
          {
            "@type": "Question",
            name: "Is the quiz free?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. The quiz and your archetype result are free. You enter your details to unlock the full diagnosis, income projection, and 30-day plan.",
            },
          },
          {
            "@type": "Question",
            name: "Do I need a computer science degree to switch into tech?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Many people break into tech without a CS degree by building real projects and proof of skill. Sigmaschool graduates include former doctors, engineers, coaches and students now working as developers.",
            },
          },
          {
            "@type": "Question",
            name: "How long does the quiz take?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "About 2 minutes — 10 multiple-choice questions.",
            },
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
