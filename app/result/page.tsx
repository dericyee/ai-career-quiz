"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ResultCard from "@/components/ResultCard";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { Scores, PathKey, getTopPath, RESULT_PATHS } from "@/lib/quiz";

function ResultContent() {
  const params = useSearchParams();

  const scores: Scores = {
    builder: parseInt(params.get("builder") ?? "0"),
    automation: parseInt(params.get("automation") ?? "0"),
    data: parseInt(params.get("data") ?? "0"),
    creative: parseInt(params.get("creative") ?? "0"),
    growth: parseInt(params.get("growth") ?? "0"),
  };

  const answersRaw = params.get("answers") ?? "";
  const answers = answersRaw
    .split(",")
    .map((a) => parseInt(a))
    .filter((a) => !isNaN(a));

  const topPath: PathKey = getTopPath(scores);
  const result = RESULT_PATHS[topPath];

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Ambient grid */}
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />

      <SiteHeader showRetake />

      <main className="relative flex-1">
        <ResultCard result={result} scores={scores} answers={answers} />
      </main>

      <SiteFooter />
    </div>
  );
}

export default function ResultPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-7 h-7 border-2 border-white/10 border-t-white/70 rounded-full animate-spin" />
        </div>
      }
    >
      <ResultContent />
    </Suspense>
  );
}
