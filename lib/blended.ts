/**
 * Blended profile insights — what your TOP archetype + SECONDARY archetype
 * combination says about you. This is the most personalised gated content
 * because it's specific to YOUR exact result, not generic per-archetype.
 */
import { PathKey } from "./quiz";

interface Blend {
  label: string;
  rarity: string; // playful "rarity" like a card game
  insight: string;
  implication: string;
}

const BLENDS: Record<PathKey, Partial<Record<PathKey, Blend>>> = {
  builder: {
    automation: {
      label: "Builder · Automator",
      rarity: "Top 8%",
      insight:
        "You don't just make things — you make systems that make things. Most Builders stop at the app; you reach for the meta-layer.",
      implication:
        "Lean into developer tools, AI agents, internal platforms, and infrastructure. You'd thrive at a dev-tooling startup or as a founder of one.",
    },
    data: {
      label: "Builder · Analyst",
      rarity: "Top 12%",
      insight:
        "You build with evidence. You'd rather ship 10 small experiments and read the metrics than ship one big bet on a hunch.",
      implication:
        "Product engineering at a data-heavy startup is your zone. Founding engineers at fintech, growth tooling, and analytics products often have this shape.",
    },
    creative: {
      label: "Builder · Creator",
      rarity: "Top 10%",
      insight:
        "You ship things that LOOK good. Code is the medium; taste is the differentiator. Most engineers settle for 'works' — you can't.",
      implication:
        "Most likely to start your own product. Indie SaaS, design-led developer tools, and AI consumer apps fit you. Don't waste this combination at a job that ignores craft.",
    },
    growth: {
      label: "Builder · Grower",
      rarity: "Top 6%",
      insight:
        "You build AND market what you build. The full-stack indie maker profile — extremely rare and unfairly leveraged in the AI era.",
      implication:
        "You don't need a team to launch. Skip job hunting; build a tiny product, ship it weekly, and use your growth instincts to find users.",
    },
  },
  automation: {
    builder: {
      label: "Automator · Builder",
      rarity: "Top 9%",
      insight:
        "Systems thinker who can also code. You see the gears between the tools that most people miss entirely.",
      implication:
        "Internal tooling, integration engineering, AI agents, and ops automation are gold mines for you. Companies pay heavily for this skill set right now.",
    },
    data: {
      label: "Automator · Analyst",
      rarity: "Top 14%",
      insight:
        "You think in pipelines and probabilities. The world feels broken to you because most data work is still manual.",
      implication:
        "Data engineering, ETL, observability, and AI-assisted reporting are natural fits. The salary ceiling in this lane has been climbing fast.",
    },
    creative: {
      label: "Automator · Creator",
      rarity: "Top 16%",
      insight:
        "Process-driven creativity. You like systems that produce surprising output — not just efficiency for efficiency's sake.",
      implication:
        "Content automation, marketing ops, AI-assisted creative pipelines. You make creative teams 10× more productive without becoming the bottleneck yourself.",
    },
    growth: {
      label: "Automator · Grower",
      rarity: "Top 11%",
      insight:
        "Growth engineering. You scale acquisition with code, not with hiring.",
      implication:
        "Lifecycle automation, sales engineering, growth-eng roles at startups. You're the person who turns a marketing team's ideas into compounding systems.",
    },
  },
  data: {
    builder: {
      label: "Analyst · Builder",
      rarity: "Top 13%",
      insight:
        "You're the rare analyst who can ship the dashboard yourself instead of waiting for someone else to build it. That cuts your iteration speed in half.",
      implication:
        "Analytics engineering, embedded analyst-on-product-teams roles, and founding analyst seats fit you. You can grow into a data-savvy product engineer over time.",
    },
    automation: {
      label: "Analyst · Automator",
      rarity: "Top 12%",
      insight:
        "You hate doing the same analysis twice. Most analysts tolerate it; you turn every recurring task into a self-running system.",
      implication:
        "Analytics engineering and AI-assisted analyst roles are your home. You'll have the cleanest dashboards and the most free time on your team.",
    },
    creative: {
      label: "Analyst · Creator",
      rarity: "Top 17%",
      insight:
        "You don't just find insights — you tell stories with them. Most analyst output is forgettable. Yours isn't.",
      implication:
        "Data storytelling, business intelligence, and analyst-relations roles at modern data companies fit you. The market for narrative analysts is bigger than people realise.",
    },
    growth: {
      label: "Analyst · Grower",
      rarity: "Top 15%",
      insight:
        "Numbers in service of momentum. You can run a growth experiment and explain it to a CEO in the same sentence.",
      implication:
        "Growth analyst, marketing science, attribution-heavy roles. The kind of person every founder secretly wants on their team.",
    },
  },
  creative: {
    builder: {
      label: "Creator · Builder",
      rarity: "Top 15%",
      insight:
        "You finish things. Most creatives have a graveyard of unshipped projects; you ship and refine. That ability is rarer than talent.",
      implication:
        "Indie product design, design-engineering, and creative tech roles. Strong fit for studios making AI-powered consumer experiences.",
    },
    automation: {
      label: "Creator · Automator",
      rarity: "Top 18%",
      insight:
        "You like creative work but resent the boring parts. You'll automate yourself into more interesting projects.",
      implication:
        "Marketing operations, content systems, and creative AI workflows. Agencies that figure this out will pay a premium for your shape.",
    },
    data: {
      label: "Creator · Analyst",
      rarity: "Top 19%",
      insight:
        "Taste backed by evidence. You won't ship a campaign without checking what actually worked — and you won't be paralysed by data either.",
      implication:
        "Performance creative, growth marketing, content strategy backed by analytics. The combo most agencies wish they could clone.",
    },
    growth: {
      label: "Creator · Grower",
      rarity: "Top 10%",
      insight:
        "You make things people share. That's the rarest skill in the AI era — everyone can produce content; almost no one produces shareable content.",
      implication:
        "Brand-led growth, creator marketing, content-as-product. Founders specifically hunt for this profile when they're ready to scale.",
    },
  },
  growth: {
    builder: {
      label: "Grower · Builder",
      rarity: "Top 8%",
      insight:
        "You can ship a landing page, hook up the analytics, and run the ad — without anyone else's help. Compound leverage.",
      implication:
        "Solo founder, head-of-growth, or growth engineer at an early-stage startup. You don't need permission to test ideas.",
    },
    automation: {
      label: "Grower · Automator",
      rarity: "Top 12%",
      insight:
        "You scale by building leverage, not by hiring. The combination that turns small teams into giant outputs.",
      implication:
        "Lifecycle marketing, sales operations, RevOps. The person founders trust to design the growth engine itself.",
    },
    data: {
      label: "Grower · Analyst",
      rarity: "Top 14%",
      insight:
        "You don't trust intuition without numbers — but you also know the numbers don't tell the whole story. You sit at the intersection.",
      implication:
        "Growth marketing, performance marketing, head-of-growth roles. The most credible growth folks at series-A startups usually fit this shape.",
    },
    creative: {
      label: "Grower · Creator",
      rarity: "Top 17%",
      insight:
        "You don't just market — you craft moments people remember. Most growth folks are tactical; you're narrative-led.",
      implication:
        "Brand marketing, creator economy roles, founder-led marketing. The shape most likely to build a personal brand alongside a career.",
    },
  },
};

/**
 * Returns the blended profile for the top + second-highest archetype combo.
 * If we don't have copy for the exact combo, falls back to a generic.
 */
export function getBlendedProfile(
  top: PathKey,
  second: PathKey
): Blend {
  return (
    BLENDS[top]?.[second] || {
      label: "Hybrid profile",
      rarity: "Rare",
      insight:
        "Your top two archetypes form an unusual combination. People with your shape usually carve their own role rather than fitting into a standard job title.",
      implication:
        "Don't force yourself into a single ladder. Look for hybrid roles or build your own.",
    }
  );
}
