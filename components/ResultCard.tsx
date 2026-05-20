"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Code2,
  Zap,
  BarChart3,
  Palette,
  TrendingUp,
  BookOpen,
  Lightbulb,
  AlertTriangle,
  Rocket,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import {
  PathKey,
  ResultPath,
  Scores,
  getSortedPaths,
  RESULT_PATHS,
} from "@/lib/quiz";
import LeadCaptureForm from "./LeadCaptureForm";
import ResultHero from "./ResultHero";
import ProofSection from "./ProofSection";
import SigmaCTA from "./SigmaCTA";
import { cn } from "@/lib/utils";

const PATH_ICONS: Record<PathKey, React.ElementType> = {
  builder: Code2,
  automation: Zap,
  data: BarChart3,
  creative: Palette,
  growth: TrendingUp,
};

const PATH_LABELS: Record<PathKey, string> = {
  builder: "AI Software Builder",
  automation: "Automation & AI Systems",
  data: "Data & AI Analyst",
  creative: "Creative AI Producer",
  growth: "Digital Growth Strategist",
};

const PATH_GRADIENTS: Record<PathKey, string> = {
  builder: "from-indigo-500 to-violet-600",
  automation: "from-sky-500 to-cyan-600",
  data: "from-emerald-500 to-teal-600",
  creative: "from-amber-500 to-orange-500",
  growth: "from-pink-500 to-rose-600",
};

const PATH_BAR_COLORS: Record<PathKey, string> = {
  builder: "from-indigo-400 to-violet-500",
  automation: "from-sky-400 to-cyan-500",
  data: "from-emerald-400 to-teal-500",
  creative: "from-amber-400 to-orange-500",
  growth: "from-pink-400 to-rose-500",
};

interface ResultCardProps {
  result: ResultPath;
  scores: Scores;
  answers: number[];
}

function ScoreBar({
  label,
  pct,
  pathKey,
  isTop,
  delay,
}: {
  label: string;
  pct: number;
  pathKey: PathKey;
  isTop: boolean;
  delay: number;
}) {
  return (
    <div>
      <div className="flex justify-between items-center mb-1.5">
        <span
          className={cn(
            "text-sm font-medium",
            isTop ? "text-slate-900 font-semibold" : "text-slate-500"
          )}
        >
          {label}
          {isTop && (
            <span className="ml-2 text-[10px] font-bold uppercase tracking-wide bg-indigo-100 text-indigo-600 px-1.5 py-0.5 rounded-full">
              Your match
            </span>
          )}
        </span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.6 }}
          className={cn(
            "text-sm font-bold tabular-nums",
            isTop ? "text-slate-900" : "text-slate-400"
          )}
        >
          {pct}%
        </motion.span>
      </div>
      <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${PATH_BAR_COLORS[pathKey]}`}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.9, ease: "easeOut", delay }}
        />
      </div>
    </div>
  );
}

export default function ResultCard({ result, scores, answers }: ResultCardProps) {
  const sorted = getSortedPaths(scores);
  const top3 = sorted.slice(0, 3);
  const secondaryResult = RESULT_PATHS[result.secondaryCTAPath];
  const SecondaryIcon = PATH_ICONS[result.secondaryCTAPath];

  return (
    <div className="max-w-3xl mx-auto px-4 pb-20">
      <ResultHero result={result} />

      {/* Score breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="bg-white rounded-2xl border border-slate-200 shadow-lg shadow-slate-100/60 p-6 mb-8"
      >
        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-5">
          Your personalised score breakdown
        </h3>
        <div className="space-y-4">
          {top3.map((item, i) => (
            <ScoreBar
              key={item.key}
              label={PATH_LABELS[item.key]}
              pct={item.pct}
              pathKey={item.key}
              isTop={i === 0}
              delay={0.7 + i * 0.15}
            />
          ))}
        </div>
      </motion.div>

      {/* Main content cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="space-y-6"
      >
        {/* Personality summary */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-3">
            Why this path fits you
          </h2>
          <p className="text-sm text-slate-700 leading-relaxed mb-4">
            {result.personalitySummary}
          </p>
          <p className="text-sm text-slate-700 leading-relaxed">
            {result.whyItFits}
          </p>
        </div>

        {/* Why now */}
        <div className="bg-gradient-to-br from-slate-50 to-indigo-50/40 rounded-2xl border border-slate-100 p-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center">
              <Rocket size={16} className="text-indigo-600" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">Why now</h2>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">
            {result.whyNow}
          </p>
        </div>

        {/* Belief breaker or bridge */}
        {(result.beliefBreaker || result.bridgeToSoftware) && (
          <div className="bg-gradient-to-br from-indigo-50 to-violet-50 rounded-2xl border border-indigo-100 p-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm">
                <Lightbulb size={16} className="text-indigo-600" />
              </div>
              <h2 className="text-lg font-bold text-slate-900">
                {result.beliefBreaker ? "The degree question" : "Bridge to tech"}
              </h2>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">
              {result.beliefBreaker || result.bridgeToSoftware}
            </p>
          </div>
        )}

        {/* What to learn first */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
              <BookOpen size={16} className="text-emerald-600" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">
              What to learn first
            </h2>
          </div>
          <ul className="space-y-2.5">
            {result.whatToLearnFirst.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-start gap-3"
              >
                <CheckCircle2
                  size={16}
                  className="text-emerald-500 mt-0.5 flex-shrink-0"
                />
                <span className="text-sm text-slate-700">{item}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Beginner project */}
        <div
          className={`relative overflow-hidden bg-gradient-to-br ${PATH_GRADIENTS[result.key]} rounded-2xl p-6 text-white shadow-xl shadow-indigo-200/40`}
        >
          {/* Decorative shapes */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />

          <div className="relative">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Code2 size={16} className="text-white" />
              </div>
              <h2 className="text-lg font-bold">Your beginner project</h2>
            </div>
            <p className="text-sm text-white/95 leading-relaxed">
              {result.beginnerProject}
            </p>
          </div>
        </div>

        {/* What to avoid */}
        <div className="bg-amber-50 rounded-2xl border border-amber-100 p-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
              <AlertTriangle size={16} className="text-amber-600" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">What to avoid</h2>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">
            {result.whatToAvoid}
          </p>
        </div>

        {/* Primary CTA */}
        <a
          href="https://sigmaschool.co"
          target="_blank"
          rel="noreferrer"
          className={`group w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-gradient-to-r ${PATH_GRADIENTS[result.key]} text-white font-bold shadow-xl shadow-indigo-200/40 hover:shadow-indigo-300/50 hover:scale-[1.01] transition-all text-sm`}
        >
          {result.primaryCTA}
          <ArrowRight
            size={16}
            className="transition-transform group-hover:translate-x-1"
          />
        </a>

        {/* Lead capture */}
        <LeadCaptureForm
          resultPath={result.key}
          scores={scores}
          answers={answers}
        />

        {/* Proof / data backing the advice — clickable sources */}
        <div className="bg-slate-50 rounded-2xl border border-slate-100 p-6 sm:p-7">
          <div className="text-center mb-6">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-500 mb-2">
              The data behind this
            </p>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Why this advice isn&apos;t just our opinion
            </h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              Tap any source to verify — every link goes to the original
              publisher.
            </p>
          </div>
          <ProofSection variant="embedded" />
          <p className="text-center text-[11px] text-slate-400 mt-5">
            Sources: U.S. Bureau of Labor Statistics · a16z · Stack Overflow
            2025 · NoCSDegree
          </p>
        </div>

        {/* Sigma School pitch — only after they've seen the value */}
        <SigmaCTA />

        {/* Related path */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4">
            Also worth exploring
          </h3>
          <div className="flex items-start gap-4">
            <div
              className={`w-12 h-12 rounded-xl bg-gradient-to-br ${PATH_GRADIENTS[result.secondaryCTAPath]} flex items-center justify-center flex-shrink-0 shadow-md`}
            >
              <SecondaryIcon size={22} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-slate-900 text-sm mb-1">
                {secondaryResult.title}
              </p>
              <p className="text-xs text-slate-500 leading-snug">
                {secondaryResult.badge}
              </p>
            </div>
          </div>
          <Link
            href="/quiz"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            Retake the quiz
            <ExternalLink size={13} />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
