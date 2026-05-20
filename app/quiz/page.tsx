"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import QuizCard from "@/components/QuizCard";
import SiteHeader from "@/components/SiteHeader";
import { QUESTIONS, calculateScores } from "@/lib/quiz";

export default function QuizPage() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(QUESTIONS.length).fill(null)
  );

  const selectedAnswer = answers[currentQuestion];
  const isLast = currentQuestion === QUESTIONS.length - 1;

  function handleSelect(index: number) {
    const updated = [...answers];
    updated[currentQuestion] = index;
    setAnswers(updated);
  }

  function handleNext() {
    if (selectedAnswer === null) return;

    if (isLast) {
      const answerIndexes = answers.map((a) => (a !== null ? [a] : []));
      const scores = calculateScores(answerIndexes);

      const params = new URLSearchParams({
        builder: String(scores.builder),
        automation: String(scores.automation),
        data: String(scores.data),
        creative: String(scores.creative),
        growth: String(scores.growth),
        answers: answers.join(","),
      });

      router.push(`/result?${params.toString()}`);
    } else {
      setCurrentQuestion((q) => q + 1);
    }
  }

  function handleBack() {
    if (currentQuestion > 0) {
      setCurrentQuestion((q) => q - 1);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 flex flex-col relative overflow-hidden">
      {/* Soft decorative gradient blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 right-0 w-96 h-96 bg-indigo-100/40 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet-100/40 rounded-full blur-3xl" />
      </div>

      <SiteHeader showQuizMeta />

      <div className="flex-1 flex items-start justify-center pt-10 pb-20 relative">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full"
        >
          <QuizCard
            questionIndex={currentQuestion}
            selectedAnswer={selectedAnswer}
            onSelect={handleSelect}
            onNext={handleNext}
            onBack={handleBack}
            isLast={isLast}
          />
        </motion.div>
      </div>
    </div>
  );
}
