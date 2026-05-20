"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import AnimatedBackground from "./AnimatedBackground";
import FloatingIcons from "./FloatingIcons";
import HeroIllustration from "./HeroIllustration";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white pt-10 pb-16 sm:pt-16 sm:pb-24">
      <AnimatedBackground />
      <FloatingIcons />

      <div className="relative w-full max-w-6xl mx-auto px-4 grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        {/* Left: copy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center lg:text-left order-2 lg:order-1"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-50 to-violet-50 border border-indigo-200/70 rounded-full px-4 py-1.5 mb-6 shadow-sm"
          >
            <Sparkles size={13} className="text-indigo-500" />
            <span className="text-xs font-semibold text-indigo-700 tracking-wide">
              The 2-minute career compass
            </span>
          </motion.div>

          <h1 className="text-[2.5rem] sm:text-5xl lg:text-[3.75rem] font-extrabold text-slate-900 leading-[1.02] tracking-tight mb-5">
            What career are you{" "}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-indigo-500 via-violet-500 to-pink-500 bg-clip-text text-transparent">
                actually
              </span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="absolute -bottom-1 left-0 right-0 h-2 bg-gradient-to-r from-indigo-200 to-violet-200 origin-left -z-0 rounded-full"
              />
            </span>{" "}
            built for?
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 mb-7 leading-relaxed">
            Answer 10 questions. Get a clear, personal direction
            — not more random advice from the internet.
          </p>

          <div className="flex flex-col sm:flex-row items-center lg:items-start gap-3">
            <Link
              href="/quiz"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-bold text-base rounded-2xl shadow-xl shadow-indigo-300/40 hover:shadow-indigo-400/50 hover:scale-[1.03] transition-all duration-200 w-full sm:w-auto justify-center"
            >
              Take the quiz
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>

          <p className="text-xs text-slate-400 mt-4 font-medium">
            Free · No sign-up to see your result · ~2 minutes
          </p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2 text-xs text-slate-500"
          >
            {[
              { dot: "bg-emerald-400", label: "10 questions" },
              { dot: "bg-indigo-400", label: "5 paths" },
              { dot: "bg-violet-400", label: "Personalised" },
              { dot: "bg-pink-400", label: "100% free" },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                {s.label}
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right: illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="order-1 lg:order-2"
        >
          <HeroIllustration />
        </motion.div>
      </div>
    </section>
  );
}
