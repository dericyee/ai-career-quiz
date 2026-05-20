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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-white relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-indigo-100/50 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-20 w-96 h-96 bg-violet-100/40 rounded-full blur-3xl" />
      </div>

      <SiteHeader showRetake />

      <div className="pt-10 pb-10">
        <ResultCard result={result} scores={scores} answers={answers} />
      </div>

      <SiteFooter />
    </div>
  );
}

export default function ResultPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-500 rounded-full animate-spin" />
        </div>
      }
    >
      <ResultContent />
    </Suspense>
  );
}
