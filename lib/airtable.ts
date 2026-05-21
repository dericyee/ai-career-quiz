/**
 * Airtable adapter — POSTs new quiz leads to your Airtable base.
 *
 * Required env vars:
 *   AIRTABLE_TOKEN          — Personal Access Token (https://airtable.com/create/tokens)
 *   AIRTABLE_BASE_ID        — starts with "app..."
 *   AIRTABLE_TABLE_NAME     — defaults to "Leads"
 *
 * If env vars are missing, this runs in demo mode (logs to console).
 */

export interface LeadPayload {
  name: string;
  email: string;
  whatsapp?: string | null;
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

export const isAirtableConfigured = Boolean(TOKEN && BASE_ID);

export async function saveLeadToAirtable(lead: LeadPayload) {
  if (!isAirtableConfigured) {
    console.log("[Airtable demo mode] Lead would be saved:", {
      name: lead.name,
      email: lead.email,
      result: lead.result_path,
    });
    return { demo: true };
  }

  const url = `https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(TABLE_NAME)}`;

  // Field names must match the columns in your Airtable base.
  // See DEPLOY.md for the exact schema to create.
  const body = {
    fields: {
      Name: lead.name,
      Email: lead.email,
      Phone: lead.whatsapp || "",
      Role: lead.current_role || "",
      Result: lead.result_path,
      "Builder Score": lead.builder_score,
      "Automation Score": lead.automation_score,
      "Data Score": lead.data_score,
      "Creative Score": lead.creative_score,
      "Growth Score": lead.growth_score,
      Answers: lead.answers ? JSON.stringify(lead.answers) : "",
      Source: "career_quiz",
    },
    typecast: true, // lets Airtable coerce types (e.g., create new select options)
  };

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Airtable ${res.status}: ${text.slice(0, 300)}`);
  }

  return res.json();
}
