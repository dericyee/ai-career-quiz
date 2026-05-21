"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnswerOptionProps {
  label: string;
  index: number;
  selected: boolean;
  onSelect: (index: number) => void;
}

const KEYS = ["1", "2", "3", "4", "5"];

export default function AnswerOption({
  label,
  index,
  selected,
  onSelect,
}: AnswerOptionProps) {
  return (
    <motion.button
      onClick={() => onSelect(index)}
      whileTap={{ scale: 0.99 }}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.25,
        delay: index * 0.04,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(
        "group w-full text-left px-4 py-4 rounded-xl border transition-all duration-200 flex items-center gap-4",
        selected
          ? "border-white/40 bg-white/[0.06]"
          : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
      )}
    >
      {/* Number key */}
      <span
        className={cn(
          "flex-shrink-0 w-7 h-7 rounded-md border flex items-center justify-center text-[11px] font-mono font-bold transition-all duration-200 tabular-nums",
          selected
            ? "border-white/50 bg-white text-black"
            : "border-white/15 bg-white/[0.04] text-zinc-500 group-hover:text-zinc-300 group-hover:border-white/25"
        )}
      >
        {KEYS[index]}
      </span>

      <span
        className={cn(
          "text-[15px] font-medium leading-snug flex-1 transition-colors duration-200",
          selected ? "text-white" : "text-zinc-300 group-hover:text-zinc-100"
        )}
      >
        {label}
      </span>

      {/* Selected check dot */}
      <span
        className={cn(
          "flex-shrink-0 w-2 h-2 rounded-full transition-all duration-200",
          selected ? "bg-white opacity-100" : "bg-white/0 opacity-0"
        )}
      />
    </motion.button>
  );
}
