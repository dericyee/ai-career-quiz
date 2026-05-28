/**
 * Income trajectory data per archetype.
 *
 * IMPORTANT — honesty:
 * These are *illustrative* trajectories anchored to U.S. Bureau of Labor
 * Statistics reference points (May 2024). They are NOT guarantees and NOT
 * localised. The point is the SHAPE of the opportunity (a compounding,
 * leveraged path vs. a flat one), not a promise of a specific salary.
 *
 * Anchors used:
 *  - All-occupations median wage: $49,500  → the "stay put" ceiling
 *  - Software developers median:  $133,080 → Builder reference
 *  - Computer & IT group median:  $105,990 → Data/Automation reference
 */
import { PathKey } from "./quiz";

export interface Trajectory {
  /** X-axis labels */
  points: string[];
  /** "If you don't build new skills" — shared, slow-growth baseline (USD) */
  baseline: number[];
  /** This archetype's leveraged path (USD) */
  pathway: number[];
  /** Milestone labels aligned to each point on the pathway line */
  milestones: string[];
  /** Headline reference figure + its source */
  anchor: { label: string; source: string };
}

const POINTS = ["Now", "Year 1", "Year 2", "Year 3", "Year 5"];

// Shared baseline — drifts slowly toward the all-occupations median ($49,500).
const BASELINE = [38000, 41000, 44000, 46500, 49500];

export const TRAJECTORIES: Record<PathKey, Trajectory> = {
  builder: {
    points: POINTS,
    baseline: BASELINE,
    pathway: [38000, 72000, 98000, 122000, 155000],
    milestones: [
      "Learning + first projects",
      "First junior / freelance role",
      "Shipping real products",
      "Mid-level developer",
      "Senior / specialist",
    ],
    anchor: {
      label: "US software developer median: $133,080",
      source: "BLS, May 2024",
    },
  },
  automation: {
    points: POINTS,
    baseline: BASELINE,
    pathway: [38000, 60000, 82000, 105000, 138000],
    milestones: [
      "Mapping + first automations",
      "Automation / ops role",
      "Owning systems",
      "Senior automation engineer",
      "Platform / integration lead",
    ],
    anchor: {
      label: "US computer & IT group median: $105,990",
      source: "BLS, May 2024",
    },
  },
  data: {
    points: POINTS,
    baseline: BASELINE,
    pathway: [38000, 62000, 84000, 108000, 142000],
    milestones: [
      "SQL + first dashboards",
      "Junior analyst role",
      "Owning reporting + insight",
      "Senior / analytics engineer",
      "Lead analyst / data eng",
    ],
    anchor: {
      label: "US computer & IT group median: $105,990",
      source: "BLS, May 2024",
    },
  },
  creative: {
    points: POINTS,
    baseline: BASELINE,
    pathway: [38000, 52000, 70000, 88000, 118000],
    milestones: [
      "Portfolio + first clients",
      "Junior creative / freelance",
      "Consistent paid work",
      "Senior creative / lead",
      "Studio owner / director",
    ],
    anchor: {
      label: "Top creatives who add tech skills compound fastest",
      source: "Industry trend",
    },
  },
  growth: {
    points: POINTS,
    baseline: BASELINE,
    pathway: [38000, 56000, 78000, 102000, 140000],
    milestones: [
      "First campaigns + funnels",
      "Junior growth / marketing role",
      "Owning a growth channel",
      "Senior growth / head of growth",
      "Growth lead / founder",
    ],
    anchor: {
      label: "Growth roles pairing AI + data scale fastest",
      source: "Industry trend",
    },
  },
};

/** Format a USD number as a compact label, e.g. 122000 → "$122k". */
export function formatUSD(n: number): string {
  if (n >= 1000) return `$${Math.round(n / 1000)}k`;
  return `$${n}`;
}

/** The 5-year gap between the pathway and the baseline. */
export function fiveYearGap(t: Trajectory): number {
  return t.pathway[t.pathway.length - 1] - t.baseline[t.baseline.length - 1];
}
