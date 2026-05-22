import { NextRequest, NextResponse } from "next/server";
import { saveLeadToAirtable, LeadPayload } from "@/lib/airtable";

export async function POST(req: NextRequest) {
  let body: Partial<LeadPayload>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { name, email } = body;

  if (!name?.trim() || !email?.trim()) {
    return NextResponse.json(
      { error: "Name and email are required." },
      { status: 400 }
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  try {
    const result = await saveLeadToAirtable({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      whatsapp: body.whatsapp ?? null,
      country_code: body.country_code ?? null,
      country_iso: body.country_iso ?? null,
      current_role: body.current_role ?? null,
      result_path: body.result_path ?? "unknown",
      builder_score: body.builder_score ?? 0,
      automation_score: body.automation_score ?? 0,
      data_score: body.data_score ?? 0,
      creative_score: body.creative_score ?? 0,
      growth_score: body.growth_score ?? 0,
      answers: body.answers ?? null,
    });

    return NextResponse.json({ success: true, demo: result.demo === true });
  } catch (err) {
    // Surface the underlying error so you can diagnose configuration issues
    // (the token is never included in the thrown message).
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Lead save error:", message);
    return NextResponse.json(
      {
        error: "Failed to save lead.",
        // In production we still expose this — it never contains the token and
        // makes debugging Airtable schema mismatches much easier.
        detail: message,
      },
      { status: 500 }
    );
  }
}
