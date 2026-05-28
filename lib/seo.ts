/**
 * Central SEO config. Override the canonical host with NEXT_PUBLIC_SITE_URL
 * (e.g. https://sigmaschool.co/quiz) when this lands inside sigmaschool-web.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://ai-career-quiz-mu.vercel.app";

export const SITE_NAME = "Sigmaschool Career Compass";

export const SITE_TITLE =
  "AI Career Quiz — What career are you actually built for? | Sigmaschool";

export const SITE_DESCRIPTION =
  "A free 2-minute quiz that reveals your AI-era career archetype, a personalised income projection, and a 30-day plan. Built by Sigmaschool — the AI-native software engineering bootcamp.";

export const SITE_KEYWORDS = [
  "AI career quiz",
  "career path quiz",
  "what career should I do",
  "AI-native software developer",
  "career change to tech",
  "tech career quiz",
  "software developer salary",
  "coding bootcamp Malaysia",
  "career switch no degree",
  "AI era careers",
  "Sigmaschool",
];
