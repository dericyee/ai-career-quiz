// ============================================================
// QUIZ DATA — edit questions, answers, scoring, and results here
// ============================================================

export type PathKey = "builder" | "automation" | "data" | "creative" | "growth";

export interface Answer {
  label: string;
  scores: Partial<Record<PathKey, number>>;
}

export interface Question {
  id: number;
  question: string;
  answers: Answer[];
}

export interface ResultPath {
  key: PathKey;
  title: string;
  subtitle: string;
  badge: string;
  color: string;
  gradient: string;
  icon: string;
  personalitySummary: string;
  whyItFits: string;
  whyNow: string;
  beliefBreaker?: string;
  bridgeToSoftware?: string;
  whatToLearnFirst: string[];
  beginnerProject: string;
  whatToAvoid: string;
  primaryCTA: string;
  secondaryCTA: string;
  secondaryCTAPath: PathKey;
}

export const QUESTIONS: Question[] = [
  {
    id: 1,
    question: "What kind of work sounds most exciting to you?",
    answers: [
      {
        label: "Building apps, websites, tools, or AI products",
        scores: { builder: 4 },
      },
      {
        label: "Automating boring work and connecting systems",
        scores: { automation: 4, builder: 1 },
      },
      {
        label: "Finding insights from numbers, reports, or data",
        scores: { data: 4, automation: 1 },
      },
      {
        label: "Creating content, visuals, or campaigns with AI",
        scores: { creative: 3, growth: 1 },
      },
      {
        label: "Growing a business, getting customers, or selling ideas",
        scores: { growth: 3, automation: 1 },
      },
    ],
  },
  {
    id: 2,
    question:
      "If you had 6 months to learn one valuable skill, what would you want it to do for you?",
    answers: [
      {
        label: "Help me build real digital products",
        scores: { builder: 4 },
      },
      {
        label: "Help me earn more and access tech opportunities",
        scores: { builder: 3, automation: 2 },
      },
      {
        label: "Help me become harder to replace at work",
        scores: { automation: 3, builder: 2 },
      },
      {
        label: "Help me work remotely or more flexibly",
        scores: { builder: 3, growth: 1 },
      },
      {
        label: "Help me improve my current career without fully switching",
        scores: { automation: 2, data: 2, growth: 1 },
      },
    ],
  },
  {
    id: 3,
    question: "Which statement feels most true about you?",
    answers: [
      {
        label: "I want to create things, not just use tools",
        scores: { builder: 4 },
      },
      {
        label: "I like making processes faster and less manual",
        scores: { automation: 4 },
      },
      {
        label: "I like making decisions based on evidence",
        scores: { data: 4 },
      },
      {
        label: "I like making ideas look and sound better",
        scores: { creative: 4 },
      },
      {
        label: "I like influencing people and outcomes",
        scores: { growth: 4 },
      },
    ],
  },
  {
    id: 4,
    question: "What is your current background closest to?",
    answers: [
      {
        label: "Student or fresh grad still figuring things out",
        scores: { builder: 2, automation: 1, data: 1 },
      },
      {
        label: "Admin, operations, coordination, or customer support",
        scores: { automation: 3, builder: 2 },
      },
      {
        label: "Reports, numbers, Excel, finance, or analysis",
        scores: { data: 4, automation: 1 },
      },
      {
        label: "Marketing, content, design, or social media",
        scores: { creative: 3, growth: 2, builder: 1 },
      },
      {
        label: "Retail, F&B, sales, or a non-office role — want a better path",
        scores: { builder: 3, growth: 2 },
      },
    ],
  },
  {
    id: 5,
    question: "What worries you most about the future?",
    answers: [
      {
        label: "My job may become less valuable because of AI",
        scores: { automation: 3, builder: 2 },
      },
      {
        label: "My salary is not growing fast enough",
        scores: { builder: 3, growth: 2 },
      },
      {
        label: "I don't have a degree or the 'right' background",
        scores: { builder: 3, automation: 1 },
      },
      {
        label: "I don't know what skill is actually worth learning",
        scores: { builder: 2, automation: 2, data: 1 },
      },
      {
        label: "I feel like I'm falling behind people around me",
        scores: { builder: 2, growth: 1, automation: 1 },
      },
    ],
  },
  {
    id: 6,
    question: "Which beginner project sounds most interesting to you?",
    answers: [
      {
        label: "Build a simple AI-powered web app",
        scores: { builder: 5 },
      },
      {
        label: "Automate a repetitive workflow at work",
        scores: { automation: 4, builder: 1 },
      },
      {
        label: "Create a dashboard that explains a business problem",
        scores: { data: 4 },
      },
      {
        label: "Create a 7-day content campaign using AI tools",
        scores: { creative: 4 },
      },
      {
        label: "Build a landing page and lead generation funnel",
        scores: { growth: 3, builder: 2 },
      },
    ],
  },
  {
    id: 7,
    question: "What would make you most proud 6 months from now?",
    answers: [
      {
        label: "I built my first real app or website",
        scores: { builder: 5 },
      },
      {
        label: "I automated something useful for myself or a company",
        scores: { automation: 4, builder: 1 },
      },
      {
        label: "I can analyse data and explain insights clearly",
        scores: { data: 4 },
      },
      {
        label: "I created a strong portfolio of content or designs",
        scores: { creative: 4 },
      },
      {
        label: "I can sell, market, or grow something measurable",
        scores: { growth: 4 },
      },
    ],
  },
  {
    id: 8,
    question: "What kind of career benefit attracts you most?",
    answers: [
      {
        label: "High-income skill potential",
        scores: { builder: 3, data: 1, growth: 1 },
      },
      {
        label: "Remote and flexible work potential",
        scores: { builder: 3, creative: 1, growth: 1 },
      },
      {
        label: "Skills that are useful across many industries",
        scores: { builder: 3, automation: 2 },
      },
      {
        label: "Ability to create my own tools or products",
        scores: { builder: 5 },
      },
      {
        label: "Ability to improve my current role quickly",
        scores: { automation: 3, data: 1 },
      },
    ],
  },
  {
    id: 9,
    question: "How do you feel about coding?",
    answers: [
      {
        label: "Curious but intimidated — I haven't really started",
        scores: { builder: 3 },
      },
      {
        label: "I tried before but got stuck — want to try again",
        scores: { builder: 4 },
      },
      {
        label: "I think AI might make it easier to learn now",
        scores: { builder: 4 },
      },
      {
        label: "I prefer no-code and AI tools, not actual coding",
        scores: { automation: 3, data: 1 },
      },
      {
        label: "I prefer creative or people-focused work",
        scores: { creative: 2, growth: 2, builder: 1 },
      },
    ],
  },
  {
    id: 10,
    question: "Which future sounds most appealing to you?",
    answers: [
      {
        label: "I can build apps, websites, and AI tools from scratch",
        scores: { builder: 5 },
      },
      {
        label: "I can automate work and design smarter systems",
        scores: { automation: 4, builder: 1 },
      },
      {
        label: "I can use data and AI to make better decisions",
        scores: { data: 4 },
      },
      {
        label: "I can create compelling content and campaigns with AI",
        scores: { creative: 4 },
      },
      {
        label: "I can grow businesses and products using AI and digital skills",
        scores: { growth: 4, automation: 1 },
      },
    ],
  },
];

export const RESULT_PATHS: Record<PathKey, ResultPath> = {
  builder: {
    key: "builder",
    title: "AI Software Builder",
    subtitle: "Your best-fit path",
    badge: "Build apps, websites, tools, and AI-powered products",
    color: "#6366f1",
    gradient: "from-indigo-500 to-violet-600",
    icon: "Code2",
    personalitySummary:
      "You're drawn to creating things people can actually use. You may not know how to code yet — but your answers suggest you'd benefit from learning how software works and how to build with AI. Builders have an advantage: they don't just use tools, they make them.",
    whyItFits:
      "Software development is no longer just about memorising syntax or writing code from scratch. In the AI era, the strongest builders know how to understand problems, use AI tools, debug, design logic, and ship real products. The skill set has expanded — but so has the opportunity.",
    whyNow:
      "Software is still expanding into every industry. The U.S. Bureau of Labor Statistics projects software developer, QA analyst, and tester employment to grow 15% from 2024 to 2034. Software developers also had a median annual wage of $133,080 in May 2024. Despite fears that AI would kill coding, a16z argued in 2026 that software development jobs have been rising again since early 2025, both in count and as a share of the overall job market.",
    beliefBreaker:
      "You don't need a computer science degree to start. But you do need proof of skill. Sites like NoCSDegree have documented stories of people breaking into tech without CS degrees. The pattern is consistent: they learned fundamentals, built real projects, and created proof. AI makes the learning curve shorter — but not effort-free. Employers still care whether you can actually build, explain, debug, and ship.",
    whatToLearnFirst: [
      "Web fundamentals (HTML, CSS, how browsers work)",
      "JavaScript or TypeScript",
      "How web apps and APIs work",
      "AI-assisted coding workflows (Cursor, GitHub Copilot)",
      "Debugging and reading error messages",
      "Building and deploying small projects",
    ],
    beginnerProject:
      "Build a simple AI-powered web app that solves one clear problem for one specific type of user. Keep it small. Make it real. Deploy it publicly.",
    whatToAvoid:
      "Don't collect random certificates before building anything. Don't rely only on AI prompts without understanding the code underneath. Don't stay stuck in tutorial mode — build something broken and fix it.",
    primaryCTA: "Get the AI Software Builder Roadmap",
    secondaryCTA: "Explore the Automation Path",
    secondaryCTAPath: "automation",
  },
  automation: {
    key: "automation",
    title: "Automation & AI Systems",
    subtitle: "Your best-fit path",
    badge: "Make work faster, smarter, and less manual using AI",
    color: "#0ea5e9",
    gradient: "from-sky-500 to-cyan-600",
    icon: "Zap",
    personalitySummary:
      "You probably notice broken systems and repetitive tasks faster than most people. You may enjoy making workflows smoother, connecting tools together, and eliminating manual work. That instinct is valuable — and increasingly in demand.",
    whyItFits:
      "AI is moving into repetitive work fast. That's a threat to people who only perform tasks — but a real opportunity for people who can improve systems. Automation is one of the most practical bridges into tech because it starts from real workplace problems that companies are already paying to solve.",
    whyNow:
      "Businesses increasingly want people who can use AI tools, automate workflows, and turn messy processes into scalable systems. This is connected to the broader trend driving demand for software, cloud, and AI talent globally. You don't need to wait for a job listing — this skill set is immediately useful in almost any company.",
    bridgeToSoftware:
      "This path can start with no-code tools — but the deeper leverage comes when you understand APIs, databases, scripts, and software logic. That's why many automation specialists eventually benefit from learning software development fundamentals. The two paths reinforce each other.",
    whatToLearnFirst: [
      "Workflow mapping and process analysis",
      "Zapier, Make (Integromat), or n8n",
      "API basics — what they are and how to connect them",
      "AI workflow tools (ChatGPT, Claude, AI agents)",
      "Databases at a beginner level (Airtable, Google Sheets, SQL basics)",
      "Basic JavaScript or Python for custom logic",
    ],
    beginnerProject:
      "Automate a repetitive task — lead tracking, customer follow-ups, internal reporting, or meeting reminders. Measure the time saved. Document the system you built.",
    whatToAvoid:
      "Don't just connect tools randomly for the sake of it. Start with a genuinely painful workflow, automate it, and measure the real impact. The value is in the outcome, not the complexity.",
    primaryCTA: "Get the Automation to Tech Roadmap",
    secondaryCTA: "Explore the AI Software Builder Path",
    secondaryCTAPath: "builder",
  },
  data: {
    key: "data",
    title: "Data & AI Analyst",
    subtitle: "Your best-fit path",
    badge: "Turn information into better decisions using AI",
    color: "#10b981",
    gradient: "from-emerald-500 to-teal-600",
    icon: "BarChart3",
    personalitySummary:
      "You likely enjoy clarity, patterns, numbers, and evidence. You may be the type of person who wants decisions to be based on reality, not guesswork. That analytical instinct is useful in almost every industry — and it's increasingly powered by AI.",
    whyItFits:
      "Data skills matter because every business needs better decisions. AI can speed up the analysis — but people who understand the business question, can clean messy data, and can explain insights clearly are still highly valuable. The tool changed. The thinking didn't.",
    whyNow:
      "The world is producing more data, more software, and more AI-enabled workflows every year. People who can combine data, AI, and technical thinking will have stronger career leverage than those who only prepare manual reports in Excel. The BLS reports the broader computer and IT occupation group had a median annual wage of $105,990 in May 2024 — more than double the all-occupations median.",
    bridgeToSoftware:
      "Data is also a strong on-ramp into tech. Once you learn SQL, dashboards, Python, and AI-assisted analysis, it becomes much easier to move toward backend development, automation engineering, or AI product-building. Many successful software engineers and data engineers started here.",
    whatToLearnFirst: [
      "Advanced spreadsheet skills (pivot tables, VLOOKUP, data cleaning)",
      "SQL — the language every data person needs",
      "Dashboard tools (Tableau, Looker Studio, Power BI)",
      "Python basics for data work (pandas, matplotlib)",
      "AI-assisted analysis workflows",
      "Data storytelling — how to explain what the numbers mean",
    ],
    beginnerProject:
      "Take a messy public dataset and build a simple dashboard with 3 clear business insights. Write a short explanation of what a decision-maker should do based on your findings.",
    whatToAvoid:
      "Don't only learn tools. Learn how to ask better business questions first. A beautiful dashboard answering the wrong question has no value. The skill is in the question, not just the chart.",
    primaryCTA: "Get the Data to Tech Roadmap",
    secondaryCTA: "Explore the AI Software Builder Path",
    secondaryCTAPath: "builder",
  },
  creative: {
    key: "creative",
    title: "Creative AI Producer",
    subtitle: "Your best-fit path",
    badge: "Create content, design, and experiences powered by AI",
    color: "#f59e0b",
    gradient: "from-amber-500 to-orange-500",
    icon: "Palette",
    personalitySummary:
      "You likely care about how ideas look, sound, and feel. You may enjoy content, visuals, storytelling, marketing, or making ideas more attractive and shareable. In the AI era, creative people who know how to work with AI tools have enormous reach.",
    whyItFits:
      "AI makes creative production faster — but it also makes average content easier to copy. The people who stand out will be those with genuine taste, consistent strategy, and the ability to direct AI tools well. Creativity combined with judgment is still hard to automate.",
    whyNow:
      "The internet rewards people who can create, test, and ship quickly. AI speeds up the creative work dramatically — but the people with the most leverage are those who can also build the digital surfaces their creative work lives on: landing pages, apps, tools, and campaigns.",
    bridgeToSoftware:
      "Creative AI becomes much more powerful when combined with technical skills. A creative person who can also build landing pages, simple web tools, and AI-powered experiences has far more leverage than someone who only produces content. The best creative professionals in 2026 are increasingly also builders.",
    whatToLearnFirst: [
      "Content strategy and brand voice",
      "Copywriting fundamentals",
      "Basic design principles (Figma, Canva at an advanced level)",
      "AI image, video, and content tools (Midjourney, Runway, Claude)",
      "Landing page basics (no-code builders, basic HTML)",
      "Portfolio building and personal brand",
    ],
    beginnerProject:
      "Design a 7-day content campaign for a real product or idea. Then build a simple landing page for it. Publish both. Get real feedback.",
    whatToAvoid:
      "Don't rely on AI output without taste and judgment. AI can produce more content — but it can't replace creative strategy. Volume without quality destroys trust. Curate aggressively.",
    primaryCTA: "Get the AI-Era Creative Roadmap",
    secondaryCTA: "Explore the AI Software Builder Path",
    secondaryCTAPath: "builder",
  },
  growth: {
    key: "growth",
    title: "Digital Growth Strategist",
    subtitle: "Your best-fit path",
    badge: "Grow businesses using marketing, sales, and AI tools",
    color: "#ec4899",
    gradient: "from-pink-500 to-rose-600",
    icon: "TrendingUp",
    personalitySummary:
      "You're likely more people-oriented than tool-oriented. You may enjoy communication, persuasion, business strategy, customer research, and making things measurably grow. In the AI era, those instincts are still rare and valuable — especially when paired with digital skills.",
    whyItFits:
      "AI can help with research, writing, outreach, and CRM workflows. But growth still needs judgment, trust, clear positioning, and genuine understanding of what people want. The skill is in the thinking — AI just makes execution faster.",
    whyNow:
      "Every company wants growth — but the best growth professionals increasingly use AI, automation, data, and software tools to move dramatically faster than those who don't. The Stack Overflow 2025 Developer Survey found nearly one-third of tech workers work remotely, with the US reporting 45% remote. Growth roles in tech often follow a similar pattern.",
    bridgeToSoftware:
      "Growth becomes far more powerful when paired with technical skills. If you can build landing pages, simple automation, analytics dashboards, or AI-powered funnels, you become more than a marketer. You become someone who can build entire growth systems — and that is a rare and valuable combination.",
    whatToLearnFirst: [
      "Sales and persuasion fundamentals",
      "Marketing strategy and positioning",
      "Customer research methods",
      "Landing page design and copywriting",
      "Analytics (Google Analytics, Meta Ads dashboard, attribution basics)",
      "AI-assisted outreach and CRM workflows",
    ],
    beginnerProject:
      "Create a simple lead generation campaign: a landing page, a follow-up email sequence, and basic tracking. Run it for a real product or cause. Measure every step.",
    whatToAvoid:
      "Don't only consume business content. Build campaigns and measure real outcomes. The difference between a growth strategist and someone who reads about growth is proof of what they've shipped and measured.",
    primaryCTA: "Get the Digital Growth Roadmap",
    secondaryCTA: "Explore the AI Software Builder Path",
    secondaryCTAPath: "builder",
  },
};

export const PATH_ORDER: PathKey[] = [
  "builder",
  "automation",
  "data",
  "growth",
  "creative",
];

export type Scores = Record<PathKey, number>;

export function calculateScores(answers: number[][]): Scores {
  const scores: Scores = {
    builder: 0,
    automation: 0,
    data: 0,
    creative: 0,
    growth: 0,
  };

  answers.forEach((selectedIndexes, questionIndex) => {
    const question = QUESTIONS[questionIndex];
    selectedIndexes.forEach((answerIndex) => {
      const answer = question.answers[answerIndex];
      Object.entries(answer.scores).forEach(([key, value]) => {
        scores[key as PathKey] += value;
      });
    });
  });

  return scores;
}

export function getMaxPossibleScore(): Scores {
  const max: Scores = { builder: 0, automation: 0, data: 0, creative: 0, growth: 0 };
  QUESTIONS.forEach((q) => {
    const pathMaxes: Scores = { builder: 0, automation: 0, data: 0, creative: 0, growth: 0 };
    q.answers.forEach((a) => {
      Object.entries(a.scores).forEach(([key, val]) => {
        if (val > pathMaxes[key as PathKey]) {
          pathMaxes[key as PathKey] = val;
        }
      });
    });
    Object.keys(max).forEach((k) => {
      max[k as PathKey] += pathMaxes[k as PathKey];
    });
  });
  return max;
}

export function getTopPath(scores: Scores): PathKey {
  let topKey: PathKey = "builder";
  let topScore = -1;

  PATH_ORDER.forEach((key) => {
    if (scores[key] > topScore) {
      topScore = scores[key];
      topKey = key;
    }
  });

  return topKey;
}

export function getScorePercentages(scores: Scores): Record<PathKey, number> {
  const max = getMaxPossibleScore();
  const percentages: Record<PathKey, number> = {} as Record<PathKey, number>;

  (Object.keys(scores) as PathKey[]).forEach((key) => {
    percentages[key] = max[key] > 0 ? Math.round((scores[key] / max[key]) * 100) : 0;
  });

  return percentages;
}

export function getSortedPaths(scores: Scores): { key: PathKey; score: number; pct: number }[] {
  const pcts = getScorePercentages(scores);
  return PATH_ORDER.map((key) => ({
    key,
    score: scores[key],
    pct: pcts[key],
  })).sort((a, b) => b.pct - a.pct);
}
