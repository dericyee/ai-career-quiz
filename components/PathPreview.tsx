"use client";

import { motion } from "framer-motion";
import { Code2, Zap, BarChart3, Palette, TrendingUp } from "lucide-react";

const PATHS = [
  {
    icon: Code2,
    label: "The Builder",
    desc: "Creates apps, tools, and AI products",
    gradient: "from-indigo-500 to-violet-600",
    glow: "shadow-indigo-200/50",
  },
  {
    icon: Zap,
    label: "The Automator",
    desc: "Connects systems and removes busywork",
    gradient: "from-sky-500 to-cyan-600",
    glow: "shadow-sky-200/50",
  },
  {
    icon: BarChart3,
    label: "The Analyst",
    desc: "Turns data into decisions",
    gradient: "from-emerald-500 to-teal-600",
    glow: "shadow-emerald-200/50",
  },
  {
    icon: Palette,
    label: "The Creator",
    desc: "Makes content and design with AI",
    gradient: "from-amber-400 to-orange-500",
    glow: "shadow-amber-200/50",
  },
  {
    icon: TrendingUp,
    label: "The Grower",
    desc: "Builds audiences and revenue",
    gradient: "from-pink-500 to-rose-600",
    glow: "shadow-pink-200/50",
  },
];

export default function PathPreview() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
      {/* Decorative blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-50/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-indigo-500 mb-3">
            5 possible directions
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">
            Which one are you?
          </h2>
          <p className="text-slate-600 max-w-xl mx-auto">
            The quiz reads between the lines of your answers to find your
            strongest match.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
          {PATHS.map((path, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col items-center text-center transition-shadow hover:shadow-xl hover:shadow-slate-200/60"
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${path.gradient} flex items-center justify-center mb-3 shadow-lg ${path.glow}`}
              >
                <path.icon size={22} className="text-white" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1">
                {path.label}
              </h3>
              <p className="text-xs text-slate-500 leading-snug">{path.desc}</p>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-xs text-slate-400 mt-8">
          You&apos;ll get a full breakdown — strengths, project ideas, and next
          steps — at the end.
        </p>
      </div>
    </section>
  );
}
