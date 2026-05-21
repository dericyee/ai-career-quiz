"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const pct = (current / total) * 100;

  return (
    <div className="w-full">
      <div className="flex items-center gap-3">
        <div className="flex-1 h-[3px] bg-white/[0.06] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-white rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
        <span className="text-[11px] font-mono text-zinc-500 tabular-nums tracking-wider">
          {String(current).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}
