import { NextRequest, NextResponse } from "next/server";
import { isSupabaseConfigured } from "@/lib/supabase";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const {
    name,
    email,
    whatsapp,
    current_role,
    result_path,
    builder_score,
    automation_score,
    data_score,
    creative_score,
    growth_score,
    answers,
  } = body;

  if (!name || !email) {
    return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
  }

  // Demo mode — no Supabase configured
  if (!isSupabaseConfigured) {
    console.log("[Demo mode] Lead would have been saved:", { name, email, result_path });
    return NextResponse.json({ success: true, demo: true });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  // Prefer service role key for server-side inserts; fall back to anon key
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  const supabase = createClient(supabaseUrl, supabaseKey);

  const { error } = await supabase.from("leads").insert([
    {
      name,
      email,
      whatsapp: whatsapp || null,
      current_role: current_role || null,
      result_path,
      builder_score,
      automation_score,
      data_score,
      creative_score,
      growth_score,
      answers: answers ?? null,
      source: "career_quiz",
    },
  ]);

  if (error) {
    console.error("Supabase insert error:", error);
    return NextResponse.json({ error: "Failed to save lead." }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
