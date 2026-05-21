"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ProgressBar from "./ProgressBar";
import AnswerOption from "./AnswerOption";
import { QUESTIONS } from "@/lib/quiz";

interface QuizCardProps {
  questionIndex: number;
  selectedAnswer: number | null;
  onSelect: (index: number) => void;
  onNext: () => void;
  onBack: () => void;
  isLast: boolean;
}

export default function QuizCard({
  questionIndex,
  selectedAnswer,
  onSelect,
  onNext,
  onBack,
  isLast,
}: QuizCardProps) {
  const question = QUESTIONS[questionIndex];
  const total = QUESTIONS.length;

  return (
    <div className="w-full max-w-2xl mx-auto px-5">
      <ProgressBar current={questionIndex + 1} total={total} />

      <AnimatePresence mode="wait">
        <motion.div
          key={questionIndex}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8"
        >
          <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-zinc-500 mb-3 tabular-nums">
            Question {String(questionIndex + 1).padStart(2, "0")}
          </p>
          <h2 className="text-2xl sm:text-3xl font-semibold text-white leading-[1.15] tracking-[-0.02em] mb-8">
            {question.question}
          </h2>

          <div className="flex flex-col gap-2.5">
            {question.answers.map((answer, i) => (
              <AnswerOption
                key={i}
                label={answer.label}
                index={i}
                selected={selectedAnswer === i}
                onSelect={onSelect}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center justify-between mt-10 gap-3">
        <button
          onClick={onBack}
          disabled={questionIndex === 0}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-zinc-400 text-[13px] font-medium transition-all hover:text-white hover:bg-white/[0.04] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent"
        >
          <ArrowLeft size={14} />
          Back
        </button>

        <div className="hidden sm:flex items-center gap-2 text-[10px] font-mono text-zinc-600 uppercase tracking-wider">
          <span>Press</span>
          <kbd className="px-1.5 py-0.5 rounded border border-white/10 bg-white/[0.04] text-zinc-400">
            1
          </kbd>
          <span>–</span>
          <kbd className="px-1.5 py-0.5 rounded border border-white/10 bg-white/[0.04] text-zinc-400">
            5
          </kbd>
          <span>to choose</span>
          <span className="mx-1">·</span>
          <kbd className="px-1.5 py-0.5 rounded border border-white/10 bg-white/[0.04] text-zinc-400">
            ↵
          </kbd>
          <span>to continue</span>
        </div>

        <button
          onClick={onNext}
          disabled={selectedAnswer === null}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white text-black font-semibold text-[13px] transition-all hover:bg-zinc-100 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          {isLast ? "Reveal my card" : "Continue"}
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}
