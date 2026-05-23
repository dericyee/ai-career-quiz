/**
 * Airtable adapter — POSTs new quiz leads to your Airtable base.
 *
 * Required env vars:
 *   AIRTABLE_TOKEN                 — Personal Access Token
 *   AIRTABLE_BASE_ID               — starts with "app..."
 *   AIRTABLE_TABLE_NAME            — defaults to "AI Career Quiz"
 *   AIRTABLE_FREEBIES_TABLE_NAME   — defaults to "Freebies Signups"
 *
 * The same lead is written to BOTH tables in parallel:
 *  - Primary table: full quiz data (scores, archetype, answers, etc.)
 *  - Freebies table: just the contact fields (first/last name, email,
 *    phone) plus source = "ai-career-quiz".
 *
 * If env vars are missing, this runs in demo mode (logs to console).
 */

export interface LeadPayload {
  name: string;
  email: string;
  whatsapp?: string | null; // combined phone, e.g. "+60 12-345 6789"
  country_code?: string | null;
  country_iso?: string | null;
  current_role?: string | null;
  result_path: string;
  builder_score: number;
  automation_score: number;
  data_score: number;
  creative_score: number;
  growth_score: number;
  answers?: number[] | null;
}

const TOKEN = process.env.AIRTABLE_TOKEN;
const BASE_ID = process.env.AIRTABLE_BASE_ID;
const TABLE_NAME = process.env.AIRTABLE_TABLE_NAME || "AI Career Quiz";
const FREEBIES_TABLE_NAME =
  process.env.AIRTABLE_FREEBIES_TABLE_NAME || "Freebies Signups";

export const isAirtableConfigured = Boolean(TOKEN && BASE_ID);

/** Split "John Smith Jr" → { first: "John", last: "Smith Jr" }. */
function splitName(full: string): { first: string; last: string } {
  const trimmed = full.trim().replace(/\s+/g, " ");
  if (!trimmed) return { first: "", last: "" };
  const idx = trimmed.indexOf(" ");
  if (idx === -1) return { first: trimmed, last: "" };
  return {
    first: trimmed.slice(0, idx),
    last: trimmed.slice(idx + 1),
  };
}

async function airtablePost(table: string, fields: Record<string, unknown>) {
  const url = `https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(table)}`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fields, typecast: true }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Airtable ${table} ${res.status}: ${text.slice(0, 300)}`);
  }
  return res.json();
}

/**
 * Saves the lead to both the main quiz table and the Freebies Signup table.
 * The primary save throws on failure (so the caller can return 500).
 * The freebies save is best-effort — logged but never blocks.
 */
export async function saveLeadToAirtable(lead: LeadPayload) {
  if (!isAirtableConfigured) {
    console.log("[Airtable demo mode] Lead would be saved:", {
      name: lead.name,
      email: lead.email,
      result: lead.result_path,
    });
    return { demo: true };
  }

  const { first, last } = splitName(lead.name);

  // Primary: full quiz record
  const primaryFields = {
    Name: lead.name,
    Email: lead.email,
    Phone: lead.whatsapp || "", // combined: "+60 12-345 6789"
    Role: lead.current_role || "",
    Result: lead.result_path,
    "Builder Score": lead.builder_score,
    "Automation Score": lead.automation_score,
    "Data Score": lead.data_score,
    "Creative Score": lead.creative_score,
    "Growth Score": lead.growth_score,
    Answers: lead.answers ? JSON.stringify(lead.answers) : "",
    Source: "career_quiz",
  };

  // Secondary: contact-only record for the Freebies Signup CRM
  const freebiesFields = {
    "First Name": first,
    "Last Name": last,
    Email: lead.email,
    Phone: lead.whatsapp || "",
    Source: "ai-career-quiz",
  };

  // Fire both in parallel. Primary throws on failure; freebies is best-effort.
  const [primaryResult, freebiesResult] = await Promise.allSettled([
    airtablePost(TABLE_NAME, primaryFields),
    airtablePost(FREEBIES_TABLE_NAME, freebiesFields),
  ]);

  if (primaryResult.status === "rejected") {
    throw primaryResult.reason;
  }

  if (freebiesResult.status === "rejected") {
    // Don't block the user submission on the secondary save — just log.
    console.error("[Airtable] Freebies Signup save failed:", freebiesResult.reason);
  }

  return primaryResult.value;
}
