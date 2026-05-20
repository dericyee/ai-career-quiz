"use client";

import { cn } from "@/lib/utils";
import { PathKey } from "@/lib/quiz";

const PATH_STYLES: Record<PathKey, { bg: string; text: string; border: string }> = {
  builder: {
    bg: "bg-indigo-50",
    text: "text-indigo-700",
    border: "border-indigo-200",
  },
  automation: {
    bg: "bg-sky-50",
    text: "text-sky-700",
    border: "border-sky-200",
  },
  data: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-200",
  },
  creative: {
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
  },
  growth: {
    bg: "bg-pink-50",
    text: "text-pink-700",
    border: "border-pink-200",
  },
};

interface PathBadgeProps {
  pathKey: PathKey;
  label: string;
  className?: string;
}

export default function PathBadge({ pathKey, label, className }: PathBadgeProps) {
  const style = PATH_STYLES[pathKey];
  return (
    <span
      className={cn(
        "inline-block px-3 py-1 rounded-full text-xs font-semibold border",
        style.bg,
        style.text,
        style.border,
        className
      )}
    >
      {label}
    </span>
  );
}
