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
    <div className="w-full max-w-2xl mx-auto px-4">
      <ProgressBar current={questionIndex + 1} total={total} />

      <AnimatePresence mode="wait">
        <motion.div
          key={questionIndex}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className="mt-6"
        >
          <p className="text-[11px] font-semibold uppercase tracking-widest text-indigo-500 mb-3">
            Question {questionIndex + 1} of {total}
          </p>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug mb-6">
            {question.question}
          </h2>

          <div className="flex flex-col gap-3">
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

      <div className="flex items-center justify-between mt-8 gap-3">
        <button
          onClick={onBack}
          disabled={questionIndex === 0}
          className="flex items-center gap-2 px-4 py-3 rounded-xl border-2 border-slate-200 text-slate-600 font-medium text-sm transition-all hover:border-slate-300 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        <button
          onClick={onNext}
          disabled={selectedAnswer === null}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-semibold text-sm shadow-lg shadow-indigo-200 transition-all hover:shadow-indigo-300 hover:scale-[1.02] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:shadow-none"
        >
          {isLast ? "See My Result" : "Next"}
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
