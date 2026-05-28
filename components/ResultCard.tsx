"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  Sparkles,
  CalendarDays,
  Check,
  TrendingUp,
  Hourglass,
} from "lucide-react";
import {
  PathKey,
  ResultPath,
  Scores,
  getSortedPaths,
  RESULT_PATHS,
} from "@/lib/quiz";
import { getBlendedProfile } from "@/lib/blended";
import { BLUEPRINTS } from "@/lib/blueprint";
import { TRAJECTORIES, formatUSD, fiveYearGap } from "@/lib/income";
import IdentityCard from "./IdentityCard";
import UnlockGate from "./UnlockGate";
import ProofSection from "./ProofSection";
import SigmaCTA from "./SigmaCTA";
import IncomeProjection from "./IncomeProjection";

const PATH_LABELS: Record<PathKey, string> = {
  builder: "Builder",
  automation: "Automator",
  data: "Analyst",
  creative: "Creator",
  growth: "Grower",
};

const ARTICLE: Record<PathKey, string> = {
  builder: "a",
  automation: "an",
  data: "an",
  creative: "a",
  growth: "a",
};

interface ResultCardProps {
  result: ResultPath;
  scores: Scores;
  answers: number[];
}

export default function ResultCard({ result, scores, answers }: ResultCardProps) {
  const sorted = getSortedPaths(scores);
  const topMatch = sorted[0]?.pct ?? 0;
  const secondPath = sorted[1]?.key ?? result.secondaryCTAPath;
  const blend = getBlendedProfile(result.key, secondPath);
  const blueprint = BLUEPRINTS[result.key];
  const secondaryResult = RESULT_PATHS[result.secondaryCTAPath];
  const trajectory = TRAJECTORIES[result.key];
  const yearGap = fiveYearGap(trajectory);
  // The "cost of waiting" — roughly the first-year delta you forgo by
  // staying on the flat path for one more year.
  const waitingCost = trajectory.pathway[1] - trajectory.baseline[1];

  const normalized: Record<PathKey, number> = {
    builder: sorted.find((s) => s.key === "builder")?.pct ?? 0,
    automation: sorted.find((s) => s.key === "automation")?.pct ?? 0,
    data: sorted.find((s) => s.key === "data")?.pct ?? 0,
    creative: sorted.find((s) => s.key === "creative")?.pct ?? 0,
    growth: sorted.find((s) => s.key === "growth")?.pct ?? 0,
  };

  // Unlock state — persisted in localStorage per archetype
  const [unlocked, setUnlocked] = useState<boolean | null>(null);
  const [firstName, setFirstName] = useState<string>("");
  const [shareUrl, setShareUrl] = useState<string>("");

  useEffect(() => {
    try {
      const key = `cc-unlocked-${result.key}`;
      setUnlocked(localStorage.getItem(key) === "1");
      setFirstName(localStorage.getItem("cc-name") || "");
    } catch {
      setUnlocked(false);
    }
    if (typeof window !== "undefined") {
      setShareUrl(window.location.href);
    }
  }, [result.key]);

  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // ignore
    }
  };

  return (
    <div className="relative">
      {/* ==================================================== */}
      {/*  FREE SECTION — visible to everyone                  */}
      {/* ==================================================== */}
      <section className="relative pt-12 pb-16 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 50% 40% at 50% 35%, rgba(99,102,241,0.18), transparent 60%)",
          }}
        />

        <div className="relative max-w-4xl mx-auto px-5">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center text-[11px] font-mono uppercase tracking-[0.18em] text-zinc-500 mb-3"
          >
            Card #{(Math.abs(answers.reduce((a, b) => a + b, 7)) % 9000) + 1000}{" "}
            · Issued today
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-center text-4xl sm:text-6xl font-semibold tracking-[-0.03em] text-white leading-[1.02] mb-10"
          >
            You&apos;re <span className="text-zinc-500">{ARTICLE[result.key]}</span>{" "}
            <span className="text-white">{PATH_LABELS[result.key]}</span>.
          </motion.h1>

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

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8"
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
            className="flex items-center justify-center gap-3 mb-12"
          >
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] text-zinc-200 text-[13px] font-medium transition-colors"
            >
              {copied ? (
                <>
                  <Check size={13} className="text-emerald-300" />
                  Copied
                </>
              ) : (
                <>
                  <Link2 size={13} />
                  Copy link
                </>
              )}
            </button>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                `I'm ${ARTICLE[result.key]} ${PATH_LABELS[result.key]}. What career are you actually built for?`
              )}${shareUrl ? `&url=${encodeURIComponent(shareUrl)}` : ""}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] text-zinc-200 text-[13px] font-medium transition-colors"
            >
              <Share2 size={13} />
              Share
            </a>
            <Link
              href="/quiz"
              className="text-zinc-500 hover:text-white text-[13px] font-medium transition-colors px-2"
            >
              ↻ Retake
            </Link>
          </motion.div>

          {/* TEASER paragraph — first sentences only, with fade */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="relative max-w-2xl mx-auto"
          >
            <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-zinc-500 mb-3">
              A glimpse
            </p>
            <p className="text-[17px] sm:text-[19px] text-zinc-300 leading-relaxed">
              {result.personalitySummary.split(".")[0]}.
            </p>
            <p className="text-[17px] sm:text-[19px] text-zinc-400 leading-relaxed mt-2 relative">
              {result.personalitySummary.split(".").slice(1).join(".").trim() ||
                result.whyItFits.split(".")[0] + "."}
              <span
                className="absolute inset-x-0 -bottom-2 h-20 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 0%, var(--bg) 80%)",
                }}
              />
            </p>
          </motion.div>
        </div>
      </section>

      {/* ==================================================== */}
      {/*  THE GATE                                            */}
      {/* ==================================================== */}
      {unlocked === false && (
        <section className="relative pb-24 px-5">
          <div className="max-w-4xl mx-auto">
            <UnlockGate
              resultPath={result.key}
              scores={scores}
              answers={answers}
              onUnlocked={() => setUnlocked(true)}
            />
          </div>
        </section>
      )}

      {/* ==================================================== */}
      {/*  UNLOCKED SECTION                                    */}
      {/* ==================================================== */}
      <AnimatePresence>
        {unlocked && (
          <motion.section
            key="unlocked"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative border-t border-white/5 py-20"
          >
            <div className="max-w-3xl mx-auto px-5 space-y-16">
              {/* Personal welcome */}
              {firstName && (
                <div className="text-center -mt-8 mb-2">
                  <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-emerald-400/80 mb-2">
                    ✓ Unlocked for {firstName}
                  </p>
                </div>
              )}

              {/* 01 — Why this fits (full) */}
              <div>
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
              </div>

              {/* 02 — Blended profile */}
              <div>
                <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-zinc-500 mb-3 flex items-center gap-2">
                  <Sparkles size={11} className="text-indigo-300" />
                  02 · The nuance — your blended profile
                </p>
                <div
                  className="rounded-2xl border border-white/10 p-7 overflow-hidden relative"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(99,102,241,0.10) 0%, rgba(236,72,153,0.06) 100%)",
                  }}
                >
                  <div className="flex items-baseline gap-3 flex-wrap mb-3">
                    <h3 className="text-2xl font-semibold text-white tracking-[-0.02em]">
                      {blend.label}
                    </h3>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-300 px-2 py-0.5 rounded-full border border-indigo-300/30 bg-indigo-300/10">
                      {blend.rarity}
                    </span>
                  </div>
                  <p className="text-[15px] text-zinc-200 leading-relaxed mb-3">
                    {blend.insight}
                  </p>
                  <p className="text-[14px] text-zinc-400 leading-relaxed">
                    <span className="text-zinc-500 uppercase tracking-wider text-[10px] font-mono mr-2">
                      What to do:
                    </span>
                    {blend.implication}
                  </p>
                </div>
              </div>

              {/* 03 — Where this path leads (income trajectory) — the peak */}
              <div>
                <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-zinc-500 mb-5 flex items-center gap-2">
                  <TrendingUp size={11} className="text-emerald-400" />
                  03 · Where this path could lead
                </p>
                <IncomeProjection pathKey={result.key} />
              </div>

              {/* 04 — The cost of waiting (urgency beat) */}
              <div>
                <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-zinc-500 mb-4 flex items-center gap-2">
                  <Hourglass size={11} className="text-amber-400" />
                  04 · The cost of waiting
                </p>
                <div className="rounded-2xl border border-amber-400/15 bg-amber-400/[0.04] p-7">
                  <p className="text-2xl sm:text-[28px] font-semibold text-white tracking-[-0.02em] leading-snug mb-3">
                    Every year you stay on the flat line, you leave roughly{" "}
                    <span className="text-amber-300">
                      {formatUSD(waitingCost)}
                    </span>{" "}
                    of potential on the table.
                  </p>
                  <p className="text-[14px] text-zinc-400 leading-relaxed">
                    Over five years that compounds to a{" "}
                    <span className="text-white font-medium">
                      {formatUSD(yearGap)}
                    </span>{" "}
                    gap. The curve doesn&apos;t reward waiting — it rewards
                    starting and building proof early. The best time to begin was
                    a year ago. The second best is today.
                  </p>
                </div>
              </div>

              {/* 05 — Why now */}
              <div>
                <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-zinc-500 mb-3 flex items-center gap-2">
                  <Rocket size={11} className="text-zinc-500" /> 05 · Why now
                </p>
                <p className="text-[15px] text-zinc-300 leading-relaxed">
                  {result.whyNow}
                </p>
              </div>

              {/* 06 — Belief breaker / bridge */}
              {(result.beliefBreaker || result.bridgeToSoftware) && (
                <div>
                  <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-zinc-500 mb-3 flex items-center gap-2">
                    <Lightbulb size={11} className="text-zinc-500" /> 06 ·{" "}
                    {result.beliefBreaker
                      ? "The degree question"
                      : "Bridge to tech"}
                  </p>
                  <p className="text-[15px] text-zinc-300 leading-relaxed">
                    {result.beliefBreaker || result.bridgeToSoftware}
                  </p>
                </div>
              )}

              {/* 07 — What to learn first */}
              <div>
                <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-zinc-500 mb-5 flex items-center gap-2">
                  <BookOpen size={11} className="text-zinc-500" /> 07 · Skills to learn first
                </p>
                <ul className="space-y-2.5">
                  {result.whatToLearnFirst.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-[15px] text-zinc-300 leading-relaxed"
                    >
                      <CheckCircle2
                        size={15}
                        className="text-emerald-400 mt-1 flex-shrink-0"
                        strokeWidth={2}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* 08 — 30-day blueprint */}
              <div>
                <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-zinc-500 mb-5 flex items-center gap-2">
                  <CalendarDays size={11} className="text-zinc-500" />
                  08 · Your 30-day blueprint
                </p>
                <div className="space-y-3">
                  {blueprint.map((week, i) => (
                    <motion.div
                      key={week.week}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06 }}
                      className="rounded-2xl border border-white/10 bg-white/[0.02] p-6"
                    >
                      <div className="flex items-baseline gap-3 mb-2">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-300">
                          Week {week.week}
                        </span>
                        <h4 className="text-lg font-semibold text-white tracking-tight">
                          {week.focus}
                        </h4>
                      </div>
                      <p className="text-[13px] text-zinc-500 mb-4 italic">
                        {week.tagline}
                      </p>
                      <ul className="space-y-2">
                        {week.tasks.map((task, j) => (
                          <li
                            key={j}
                            className="flex items-start gap-3 text-[14px] text-zinc-300 leading-relaxed"
                          >
                            <span className="mt-1.5 w-1 h-1 rounded-full bg-zinc-600 flex-shrink-0" />
                            {task}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* 09 — First project featured */}
              <div>
                <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-zinc-500 mb-5">
                  09 · Your first project
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
              </div>

              {/* 10 — What to avoid */}
              <div>
                <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-zinc-500 mb-3 flex items-center gap-2">
                  <AlertTriangle size={11} className="text-amber-400" /> 10 · Your blind spots
                </p>
                <p className="text-[15px] text-zinc-300 leading-relaxed">
                  {result.whatToAvoid}
                </p>
              </div>

              {/* 11 — Proof */}
              <div>
                <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-zinc-500 mb-5">
                  11 · The data behind your match
                </p>
                <ProofSection variant="embedded" />
                <p className="text-[11px] text-zinc-600 mt-4 text-center font-mono uppercase tracking-wider">
                  Tap any source to verify.
                </p>
              </div>

              {/* 12 — Sigma CTA */}
              <div>
                <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-zinc-500 mb-5">
                  12 · Ready to actually go build this?
                </p>
                <SigmaCTA />
              </div>

              {/* 13 — Related path */}
              <div>
                <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-zinc-500 mb-5">
                  13 · Also worth exploring
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
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
