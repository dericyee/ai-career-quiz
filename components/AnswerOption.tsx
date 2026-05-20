"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface AnswerOptionProps {
  label: string;
  index: number;
  selected: boolean;
  onSelect: (index: number) => void;
}

const LETTERS = ["A", "B", "C", "D", "E"];

export default function AnswerOption({
  label,
  index,
  selected,
  onSelect,
}: AnswerOptionProps) {
  return (
    <motion.button
      onClick={() => onSelect(index)}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: index * 0.06 }}
      className={cn(
        "w-full text-left px-4 py-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-3 group",
        selected
          ? "border-indigo-500 bg-indigo-50 shadow-md shadow-indigo-100"
          : "border-slate-200 bg-white hover:border-indigo-300 hover:bg-indigo-50/40 hover:shadow-sm"
      )}
    >
      <span
        className={cn(
          "flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold transition-all duration-200",
          selected
            ? "bg-indigo-500 text-white"
            : "bg-slate-100 text-slate-500 group-hover:bg-indigo-100 group-hover:text-indigo-600"
        )}
      >
        {selected ? <Check size={14} strokeWidth={3} /> : LETTERS[index]}
      </span>
      <span
        className={cn(
          "text-sm font-medium leading-snug transition-colors duration-200",
          selected ? "text-indigo-900" : "text-slate-700"
        )}
      >
        {label}
      </span>
    </motion.button>
  );
}
