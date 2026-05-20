"use client";

import { motion } from "framer-motion";
import { PathKey, ResultPath } from "@/lib/quiz";
import { Code2, Zap, BarChart3, Palette, TrendingUp } from "lucide-react";

const PATH_ICONS: Record<PathKey, React.ElementType> = {
  builder: Code2,
  automation: Zap,
  data: BarChart3,
  creative: Palette,
  growth: TrendingUp,
};

const PATH_GRADIENTS: Record<PathKey, string> = {
  builder: "from-indigo-500 via-violet-500 to-purple-600",
  automation: "from-sky-500 via-cyan-500 to-blue-600",
  data: "from-emerald-500 via-teal-500 to-cyan-600",
  creative: "from-amber-400 via-orange-500 to-rose-500",
  growth: "from-pink-500 via-rose-500 to-red-500",
};

const PATH_PARTICLE_COLORS: Record<PathKey, string[]> = {
  builder: ["bg-indigo-400", "bg-violet-400", "bg-purple-400"],
  automation: ["bg-sky-400", "bg-cyan-400", "bg-blue-400"],
  data: ["bg-emerald-400", "bg-teal-400", "bg-cyan-400"],
  creative: ["bg-amber-400", "bg-orange-400", "bg-rose-400"],
  growth: ["bg-pink-400", "bg-rose-400", "bg-red-400"],
};

interface ResultHeroProps {
  result: ResultPath;
}

export default function ResultHero({ result }: ResultHeroProps) {
  const Icon = PATH_ICONS[result.key];
  const gradient = PATH_GRADIENTS[result.key];
  const colors = PATH_PARTICLE_COLORS[result.key];

  return (
    <div className="relative text-center mb-10 overflow-hidden py-6">
      {/* Confetti-like particles */}
      {[...Array(18)].map((_, i) => {
        const color = colors[i % colors.length];
        const left = `${(i * 7 + (i % 3) * 13) % 100}%`;
        const delay = i * 0.06;
        const size = i % 3 === 0 ? "w-2 h-2" : "w-1.5 h-1.5";
        return (
          <motion.span
            key={i}
            className={`absolute ${color} ${size} rounded-full`}
            style={{ left, top: "20%" }}
            initial={{ opacity: 0, y: -10, scale: 0 }}
            animate={{
              opacity: [0, 1, 1, 0],
              y: [0, 80 + (i % 5) * 20, 140 + (i % 4) * 30],
              x: [(i % 2 ? 1 : -1) * (10 + (i % 5) * 4)],
              scale: [0, 1, 1, 0.5],
              rotate: [0, 180 + i * 12],
            }}
            transition={{
              duration: 1.6 + (i % 4) * 0.2,
              delay,
              ease: "easeOut",
            }}
          />
        );
      })}

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3"
      >
        Your result
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
        className="relative inline-block mb-5"
      >
        <div
          className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${gradient} flex items-center justify-center mx-auto shadow-2xl shadow-slate-300/50`}
        >
          <Icon size={42} className="text-white" strokeWidth={2} />
        </div>
        {/* Glow */}
        <div
          className={`absolute inset-0 -z-10 bg-gradient-to-br ${gradient} rounded-3xl blur-2xl opacity-50 scale-110`}
        />
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className={`text-xs font-bold uppercase tracking-widest bg-gradient-to-r ${gradient} bg-clip-text text-transparent mb-2`}
      >
        {result.subtitle}
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight"
      >
        {result.title}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-base text-slate-600 max-w-lg mx-auto leading-relaxed"
      >
        {result.badge}
      </motion.p>
    </div>
  );
}
