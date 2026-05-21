"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
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

  const handleSelect = useCallback(
    (index: number) => {
      setAnswers((prev) => {
        const next = [...prev];
        next[currentQuestion] = index;
        return next;
      });
    },
    [currentQuestion]
  );

  const handleNext = useCallback(() => {
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
  }, [answers, isLast, router, selectedAnswer]);

  const handleBack = useCallback(() => {
    setCurrentQuestion((q) => Math.max(0, q - 1));
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Don't intercept while typing in a form field
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }

      if (e.key >= "1" && e.key <= "5") {
        const idx = parseInt(e.key, 10) - 1;
        if (idx < QUESTIONS[currentQuestion].answers.length) {
          handleSelect(idx);
        }
      } else if (e.key === "Enter") {
        if (selectedAnswer !== null) handleNext();
      } else if (e.key === "ArrowLeft" || e.key === "Backspace") {
        handleBack();
      } else if (e.key === "ArrowRight") {
        if (selectedAnswer !== null) handleNext();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [currentQuestion, handleSelect, handleNext, handleBack, selectedAnswer]);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(99,102,241,0.10), transparent 60%)",
        }}
      />

      <SiteHeader showQuizMeta />

      <div className="flex-1 flex items-center justify-center py-16 relative">
        <QuizCard
          questionIndex={currentQuestion}
          selectedAnswer={selectedAnswer}
          onSelect={handleSelect}
          onNext={handleNext}
          onBack={handleBack}
          isLast={isLast}
        />
      </div>
    </div>
  );
}
