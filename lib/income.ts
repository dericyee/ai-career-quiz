/**
 * Income trajectory — personalised from the user's *actual* current salary.
 *
 * Model (honest framing):
 *  - "Current role" line: grows slowly. Routine roles see ~3% nominal raises,
 *    and AI pressure is flattening many of them further. We cap 5-yr growth
 *    around +10%.
 *  - "AI-native path" line: STARTS at the same salary, then climbs along the
 *    real shape of early-career tech-salary progression (steep in years 1–3,
 *    then compounding). Multipliers are grounded in observed software-engineer
 *    salary-by-experience curves (levels.fyi-style data, Stack Overflow
 *    Developer Survey, BLS occupational wages).
 *
 * Everything is a MULTIPLIER of the user's own number, so it's currency- and
 * period-agnostic. We display both MYR and USD.
 *
 * This shows the *shape* of the opportunity for someone who successfully
 * transitions and builds proof — not a guarantee.
 */
import { PathKey } from "./quiz";

export type Currency = "MYR" | "USD";

/** Approximate FX. Update as needed; could be env-driven later. */
export const MYR_PER_USD = 4.7;

export const POINTS = ["Now", "Year 1", "Year 2", "Year 3", "Year 5"];

/** Shared slow-growth baseline for staying in the current role. */
export const CURRENT_ROLE_MULTIPLIER = [1.0, 1.03, 1.05, 1.07, 1.1];

/**
 * AI-native progression multipliers per archetype. All start at 1.0 (same as
 * the user's current salary today) and climb. Builder (pure software) is the
 * steepest; the others trail slightly.
 */
export const AI_NATIVE_MULTIPLIER: Record<PathKey, number[]> = {
  builder: [1.0, 1.25, 1.6, 2.0, 2.6],
  automation: [1.0, 1.2, 1.5, 1.85, 2.4],
  data: [1.0, 1.2, 1.5, 1.85, 2.4],
  creative: [1.0, 1.15, 1.4, 1.65, 2.1],
  growth: [1.0, 1.18, 1.45, 1.75, 2.25],
};

/** Per-archetype reference anchor (real, sourced). */
export const TRAJECTORY_ANCHOR: Record<
  PathKey,
  { label: string; source: string }
> = {
  builder: {
    label: "Software developers: a US median of $133,080 and salaries that climb steeply with experience",
    source: "U.S. BLS, May 2024",
  },
  automation: {
    label: "The computer & IT group earns a US median of $105,990 — automation/integration skills sit right inside it",
    source: "U.S. BLS, May 2024",
  },
  data: {
    label: "The computer & IT group earns a US median of $105,990 — data + SQL skills compound toward it fast",
    source: "U.S. BLS, May 2024",
  },
  creative: {
    label: "Creatives who add building skills out-earn pure content roles as they take on product work",
    source: "Industry trend",
  },
  growth: {
    label: "Growth roles that pair AI, data and code scale into the highest-paid marketing seats",
    source: "Industry trend",
  },
};

export interface TrajectorySeries {
  points: string[];
  /** In the user's chosen currency. */
  currentRole: number[];
  aiNative: number[];
  currency: Currency;
  /** Same series converted to the *other* currency for dual display. */
  altCurrency: Currency;
  currentRoleAlt: number[];
  aiNativeAlt: number[];
  fiveYearGap: number;
  fiveYearGapAlt: number;
}

function convert(amount: number, from: Currency, to: Currency): number {
  if (from === to) return amount;
  return from === "MYR" ? amount / MYR_PER_USD : amount * MYR_PER_USD;
}

/**
 * Build the personalised series from the user's salary + currency.
 * `salary` is whatever period the user entered (we treat it opaquely).
 */
export function buildTrajectory(
  pathKey: PathKey,
  salary: number,
  currency: Currency
): TrajectorySeries {
  const aiMult = AI_NATIVE_MULTIPLIER[pathKey];
  const currentRole = CURRENT_ROLE_MULTIPLIER.map((m) => Math.round(salary * m));
  const aiNative = aiMult.map((m) => Math.round(salary * m));

  const altCurrency: Currency = currency === "MYR" ? "USD" : "MYR";
  const currentRoleAlt = currentRole.map((v) =>
    Math.round(convert(v, currency, altCurrency))
  );
  const aiNativeAlt = aiNative.map((v) =>
    Math.round(convert(v, currency, altCurrency))
  );

  const fiveYearGap = aiNative[aiNative.length - 1] - currentRole[currentRole.length - 1];
  const fiveYearGapAlt =
    aiNativeAlt[aiNativeAlt.length - 1] - currentRoleAlt[currentRoleAlt.length - 1];

  return {
    points: POINTS,
    currentRole,
    aiNative,
    currency,
    altCurrency,
    currentRoleAlt,
    aiNativeAlt,
    fiveYearGap,
    fiveYearGapAlt,
  };
}

/** Format an amount with a currency symbol, compacting thousands. */
export function formatMoney(amount: number, currency: Currency): string {
  const symbol = currency === "MYR" ? "RM" : "$";
  if (amount >= 10000) {
    return `${symbol}${(amount / 1000).toFixed(amount % 1000 === 0 ? 0 : 1)}k`;
  }
  return `${symbol}${amount.toLocaleString("en-US")}`;
}
