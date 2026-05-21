/**
 * 30-day blueprint per archetype.
 * Concrete, week-by-week. The kind of thing people will actually print
 * and tape to their wall.
 */
import { PathKey } from "./quiz";

export interface BlueprintWeek {
  week: number;
  focus: string;
  tagline: string;
  tasks: string[];
}

export const BLUEPRINTS: Record<PathKey, BlueprintWeek[]> = {
  builder: [
    {
      week: 1,
      focus: "Foundations",
      tagline: "Set the stage so you can ship fast later.",
      tasks: [
        "Install Cursor or VS Code. Sign up for Vercel, GitHub, and Anthropic/OpenAI.",
        "Complete one MDN HTML/CSS/JS sprint (~6 hours total).",
        "Build a one-page personal site. Deploy it. Share the URL with one friend.",
      ],
    },
    {
      week: 2,
      focus: "Your first real app",
      tagline: "From tutorial to a thing you actually built.",
      tasks: [
        "Pick ONE problem you have. Sketch the smallest app that solves it.",
        "Build it with Next.js. Use Claude or GPT for one feature.",
        "Deploy to Vercel. Test it on your phone. Fix what breaks.",
      ],
    },
    {
      week: 3,
      focus: "Make it real",
      tagline: "Get 5 humans to use what you built.",
      tasks: [
        "Share the app in 3 communities you're in (Reddit, Discord, group chats).",
        "Talk to at least 5 users. Take notes on what they say.",
        "Ship one improvement based on the feedback. Repeat.",
      ],
    },
    {
      week: 4,
      focus: "Make it visible",
      tagline: "Turn the project into proof.",
      tasks: [
        "Write a short build log (a Twitter thread, LinkedIn post, or blog).",
        "Record a 60-second demo video. Pin it to your profile.",
        "Apply for 5 entry-level engineering roles using this as your portfolio.",
      ],
    },
  ],
  automation: [
    {
      week: 1,
      focus: "Map a workflow",
      tagline: "You can't automate what you can't see.",
      tasks: [
        "Pick one workflow at work that you hate. Document it step-by-step.",
        "Measure: how long does it take per week? What does it cost?",
        "Sign up for Make.com (or n8n) and Zapier. Open both, click around.",
      ],
    },
    {
      week: 2,
      focus: "Your first automation",
      tagline: "Replace one boring task this week.",
      tasks: [
        "Build a Make.com scenario that automates 1 step of your workflow.",
        "Add an AI step — let Claude/GPT classify, summarise, or draft.",
        "Run it for a few days. Log time saved.",
      ],
    },
    {
      week: 3,
      focus: "Connect more dots",
      tagline: "Move from single task to system.",
      tasks: [
        "Chain 3+ tools together (Slack → AI → Notion → Email, etc.).",
        "Add error handling. Make the system bulletproof.",
        "Demo it to one colleague or your boss. Show the time saved.",
      ],
    },
    {
      week: 4,
      focus: "Sell it",
      tagline: "Automations are only valuable if someone pays for them.",
      tasks: [
        "Document your automation: screenshots, the time it saves, what tools it uses.",
        "Offer it as a service to 3 small businesses (or internally for a promotion).",
        "List yourself on a marketplace like upwork or contra under 'AI automation'.",
      ],
    },
  ],
  data: [
    {
      week: 1,
      focus: "Spreadsheet mastery",
      tagline: "Most data people skip this and regret it.",
      tasks: [
        "Watch one Ben Collins tutorial on advanced spreadsheet techniques.",
        "Find a free public dataset on Kaggle that interests you.",
        "Build one pivot table and one chart that surprises you.",
      ],
    },
    {
      week: 2,
      focus: "Learn SQL",
      tagline: "The one language every data person eventually needs.",
      tasks: [
        "Complete the Mode SQL Tutorial (it's free, ~6 hours).",
        "Practice on a public dataset using a free DB tool like DB Browser for SQLite.",
        "Write 3 queries that answer real business questions.",
      ],
    },
    {
      week: 3,
      focus: "Build a dashboard",
      tagline: "From numbers to a story.",
      tasks: [
        "Use Looker Studio (free) or Tableau Public to build one dashboard.",
        "Include 3 actionable insights — not just charts.",
        "Share it publicly. Get feedback from a working analyst.",
      ],
    },
    {
      week: 4,
      focus: "AI-assisted analysis",
      tagline: "Where modern data work is going.",
      tasks: [
        "Use Claude or GPT to clean a messy dataset for you.",
        "Have AI suggest 5 angles for analysis you hadn't considered.",
        "Write a one-page memo with your top 3 findings. Add it to your portfolio.",
      ],
    },
  ],
  creative: [
    {
      week: 1,
      focus: "Find your taste",
      tagline: "Taste is the moat. Refine it deliberately.",
      tasks: [
        "Make a swipe file: 30 pieces of content/design you wish you'd made.",
        "Write one sentence under each: why does this work?",
        "Pick 3 creators in your niche to study deeply this month.",
      ],
    },
    {
      week: 2,
      focus: "Your first AI-assisted creative project",
      tagline: "Stop just consuming tools. Use them.",
      tasks: [
        "Pick a real product or idea. Brief yourself on it.",
        "Use Midjourney/Sora/Runway + Claude/GPT to make 5 pieces of content.",
        "Ship one publicly. Don't apologise for using AI.",
      ],
    },
    {
      week: 3,
      focus: "A 7-day campaign",
      tagline: "Volume teaches you what static work can't.",
      tasks: [
        "Plan a 7-day content series for one product/idea.",
        "Publish daily. Use AI to maintain quality at speed.",
        "Track which posts perform. Why?",
      ],
    },
    {
      week: 4,
      focus: "Make a portfolio",
      tagline: "If clients can't see it, it doesn't exist.",
      tasks: [
        "Build a one-page portfolio (Framer, Webflow, or a Notion page).",
        "Include your best 5 pieces with a short story behind each.",
        "Reach out to 5 creators or small brands offering to do one piece for free.",
      ],
    },
  ],
  growth: [
    {
      week: 1,
      focus: "Pick a real product",
      tagline: "Growth without a product is theory.",
      tasks: [
        "Choose a product you'd love to grow (yours, a friend's, or a fake one).",
        "Write a one-page positioning doc: who, problem, why now, why us.",
        "Find 10 places (subreddits, forums, Slack groups) where your customer hangs out.",
      ],
    },
    {
      week: 2,
      focus: "Your first funnel",
      tagline: "Landing page → lead → follow-up.",
      tasks: [
        "Build a landing page in Framer or with Vercel/Next.js (yes, you can).",
        "Connect it to a lead form (Tally is free).",
        "Write a 3-email follow-up sequence using Claude/GPT.",
      ],
    },
    {
      week: 3,
      focus: "Run a real campaign",
      tagline: "Spend $50 like it's $5,000.",
      tasks: [
        "Set up Google Analytics or Plausible. Track everything.",
        "Spend $50 on one channel (Meta ads, Reddit ads, LinkedIn outreach).",
        "Track conversions. Write a 1-page learning memo.",
      ],
    },
    {
      week: 4,
      focus: "Package and pitch",
      tagline: "Turn what you learned into proof.",
      tasks: [
        "Document the campaign: positioning, funnel, ad creative, results.",
        "Post it as a case study on LinkedIn.",
        "Pitch yourself to 5 founders as a 'growth audit + first experiment' service.",
      ],
    },
  ],
};
