"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  BookOpen,
  Lightbulb,
  AlertTriangle,
  Rocket,
  ArrowRight,
  CheckCircle2,
  Share2,
  Link2,
} from "lucide-react";
import {
  PathKey,
  ResultPath,
  Scores,
  getSortedPaths,
  RESULT_PATHS,
} from "@/lib/quiz";
import LeadCaptureForm from "./LeadCaptureForm";
import IdentityCard from "./IdentityCard";
import ProofSection from "./ProofSection";
import SigmaCTA from "./SigmaCTA";

const PATH_LABELS: Record<PathKey, string> = {
  builder: "Builder",
  automation: "Automator",
  data: "Analyst",
  creative: "Creator",
  growth: "Grower",
};

interface ResultCardProps {
  result: ResultPath;
  scores: Scores;
  answers: number[];
}

export default function ResultCard({ result, scores, answers }: ResultCardProps) {
  const sorted = getSortedPaths(scores);
  const topMatch = sorted[0]?.pct ?? 0;
  const secondaryResult = RESULT_PATHS[result.secondaryCTAPath];

  // Normalize all 5 scores to 0-100 for the card stats panel
  const normalized: Record<PathKey, number> = {
    builder: sorted.find((s) => s.key === "builder")?.pct ?? 0,
    automation: sorted.find((s) => s.key === "automation")?.pct ?? 0,
    data: sorted.find((s) => s.key === "data")?.pct ?? 0,
    creative: sorted.find((s) => s.key === "creative")?.pct ?? 0,
    growth: sorted.find((s) => s.key === "growth")?.pct ?? 0,
  };

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(url);
    }
  };

  return (
    <div className="relative">
      {/* CINEMATIC CARD REVEAL */}
      <section className="relative pt-12 pb-24 overflow-hidden">
        {/* Spotlight glow behind card */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 50% 40% at 50% 35%, rgba(99,102,241,0.18), transparent 60%)",
          }}
        />

        <div className="relative max-w-4xl mx-auto px-5">
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center text-[11px] font-mono uppercase tracking-[0.18em] text-zinc-500 mb-3"
          >
            Card #{Math.abs(answers.reduce((a, b) => a + b, 7)) % 9000 + 1000} ·
            Issued today
          </motion.p>

          {/* Top-line statement */}
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-center text-4xl sm:text-6xl font-semibold tracking-[-0.03em] text-white leading-[1.02] mb-10"
          >
            You&apos;re{" "}
            <span className="text-zinc-500">{result.title.includes("Software") ? "a" : result.title.includes("Automation") ? "an" : result.title.includes("Data") ? "an" : result.title.includes("Creative") ? "a" : "a"}</span>{" "}
            <span className="text-white">{PATH_LABELS[result.key]}</span>.
          </motion.h1>

          {/* The card */}
          <div className="flex justify-center mb-10">
            <IdentityCard
              pathKey={result.key}
              showStats
              scores={normalized}
              reveal
              interactive
              size="lg"
            />
          </div>

          {/* Match score chip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-[12px] text-zinc-300 font-mono tabular-nums">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              {topMatch}% match · top of 5 archetypes
            </div>
          </motion.div>

          {/* Share actions */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="flex items-center justify-center gap-3"
          >
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] text-zinc-200 text-[13px] font-medium transition-colors"
            >
              <Link2 size={13} />
              Copy link
            </button>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                `I'm ${PATH_LABELS[result.key]}. What career are you actually built for?`
              )}&url=${encodeURIComponent(
                typeof window !== "undefined" ? window.location.href : ""
              )}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] text-zinc-200 text-[13px] font-medium transition-colors"
            >
              <Share2 size={13} />
              Share on X
            </a>
            <Link
              href="/quiz"
              className="text-zinc-500 hover:text-white text-[13px] font-medium transition-colors px-2"
            >
              ↻ Retake
            </Link>
          </motion.div>
        </div>
      </section>

      {/* PERSONALIZED CONTENT */}
      <section className="relative border-t border-white/5 py-20">
        <div className="max-w-3xl mx-auto px-5 space-y-6">
          {/* Why this fits */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-zinc-500 mb-3">
              01 · Why this fits you
            </p>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-[-0.02em] text-white mb-5 leading-snug">
              {result.title}, decoded.
            </h2>
            <p className="text-[15px] text-zinc-300 leading-relaxed mb-4">
              {result.personalitySummary}
            </p>
            <p className="text-[15px] text-zinc-400 leading-relaxed">
              {result.whyItFits}
            </p>
          </motion.div>

          {/* Why now */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-16"
          >
            <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-zinc-500 mb-3 flex items-center gap-2">
              <Rocket size={11} className="text-zinc-500" /> 02 · Why now
            </p>
            <p className="text-[15px] text-zinc-300 leading-relaxed">
              {result.whyNow}
            </p>
          </motion.div>

          {/* Belief breaker / bridge */}
          {(result.beliefBreaker || result.bridgeToSoftware) && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mt-16"
            >
              <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-zinc-500 mb-3 flex items-center gap-2">
                <Lightbulb size={11} className="text-zinc-500" /> 03 ·{" "}
                {result.beliefBreaker
                  ? "The degree question"
                  : "Bridge to tech"}
              </p>
              <p className="text-[15px] text-zinc-300 leading-relaxed">
                {result.beliefBreaker || result.bridgeToSoftware}
              </p>
            </motion.div>
          )}

          {/* What to learn first */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-16"
          >
            <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-zinc-500 mb-5 flex items-center gap-2">
              <BookOpen size={11} className="text-zinc-500" /> 04 · What to learn first
            </p>
            <ul className="space-y-2.5">
              {result.whatToLearnFirst.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -6 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                  className="flex items-start gap-3 text-[15px] text-zinc-300 leading-relaxed"
                >
                  <CheckCircle2
                    size={15}
                    className="text-emerald-400 mt-1 flex-shrink-0"
                    strokeWidth={2}
                  />
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Beginner project — featured */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-16"
          >
            <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-zinc-500 mb-5">
              05 · Your first move
            </p>
            <div
              className="relative rounded-2xl p-7 overflow-hidden border border-white/10"
              style={{
                background:
                  "linear-gradient(135deg, rgba(99,102,241,0.10) 0%, rgba(139,92,246,0.04) 100%)",
              }}
            >
              <p className="text-2xl sm:text-3xl font-semibold text-white tracking-[-0.02em] leading-snug">
                {result.beginnerProject}
              </p>
            </div>
          </motion.div>

          {/* What to avoid */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-16"
          >
            <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-zinc-500 mb-3 flex items-center gap-2">
              <AlertTriangle size={11} className="text-amber-400" /> 06 · What to avoid
            </p>
            <p className="text-[15px] text-zinc-300 leading-relaxed">
              {result.whatToAvoid}
            </p>
          </motion.div>

          {/* Lead capture */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-16"
          >
            <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-zinc-500 mb-5">
              07 · Get your roadmap
            </p>
            <LeadCaptureForm
              resultPath={result.key}
              scores={scores}
              answers={answers}
            />
          </motion.div>

          {/* Proof */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-16"
          >
            <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-zinc-500 mb-5">
              08 · The data behind this
            </p>
            <ProofSection variant="embedded" />
            <p className="text-[11px] text-zinc-600 mt-4 text-center font-mono uppercase tracking-wider">
              Tap any source to verify.
            </p>
          </motion.div>

          {/* Sigma CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-20"
          >
            <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-zinc-500 mb-5">
              09 · Want to actually go build this?
            </p>
            <SigmaCTA />
          </motion.div>

          {/* Related path */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-20"
          >
            <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-zinc-500 mb-5">
              10 · Also worth exploring
            </p>
            <div className="flex items-start gap-5 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
              <div className="flex-shrink-0">
                <IdentityCard
                  pathKey={result.secondaryCTAPath}
                  interactive={false}
                  size="md"
                />
              </div>
              <div className="pt-2">
                <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-zinc-500 mb-1">
                  Second match
                </p>
                <p className="text-lg font-semibold text-white tracking-tight mb-1">
                  {secondaryResult.title}
                </p>
                <p className="text-[13px] text-zinc-400 leading-relaxed mb-3">
                  {secondaryResult.badge}
                </p>
                <Link
                  href="/quiz"
                  className="inline-flex items-center gap-1.5 text-[13px] font-medium text-white hover:text-zinc-300 transition-colors"
                >
                  Retake the quiz
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
