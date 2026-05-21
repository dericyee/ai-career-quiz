"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Award, Clock, Users } from "lucide-react";
import SigmaLogo from "./SigmaLogo";

const POINTS = [
  "Beginner-friendly: no degree, no prior coding required",
  "AI-native curriculum — build with the tools shaping the industry",
  "Project-based learning — graduate with real proof of skill",
  "Job-focused: 100% refund if you don't get a job",
];

const STATS = [
  { icon: Clock, label: "3 months", sub: "to job-ready" },
  { icon: Users, label: "Beginner", sub: "friendly path" },
  { icon: Award, label: "100% refund", sub: "if no job" },
];

export default function SigmaCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative rounded-3xl overflow-hidden border border-white/10"
      style={{
        background:
          "linear-gradient(180deg, #0e0e12 0%, #15151b 100%)",
      }}
    >
      {/* Decorative top gradient */}
      <div
        className="absolute inset-x-0 top-0 h-64 opacity-60 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(99,102,241,0.30), transparent 70%)",
        }}
      />
      {/* Decorative grid */}
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />

      <div className="relative p-7 sm:p-10">
        <div className="mb-6">
          <SigmaLogo href="" variant="compact-light" />
        </div>

        <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-zinc-500 mb-3">
          Built by
        </p>
        <h3 className="text-3xl sm:text-4xl font-semibold text-white tracking-[-0.025em] leading-[1.05] mb-5">
          Beginner to job-ready
          <br />
          <span className="text-zinc-500">software developer</span> in 3 months.
        </h3>
        <p className="text-[15px] text-zinc-400 leading-relaxed max-w-prose mb-7">
          Sigma School is a modern AI software engineering bootcamp built for
          people who didn&apos;t take the traditional CS route — and want proof,
          not just certificates.
        </p>

        <ul className="space-y-2.5 mb-8">
          {POINTS.map((p, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -6 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.06 }}
              className="flex items-start gap-3 text-[14px] text-zinc-300 leading-relaxed"
            >
              <CheckCircle2
                size={15}
                className="text-emerald-400 flex-shrink-0 mt-1"
                strokeWidth={2}
              />
              {p}
            </motion.li>
          ))}
        </ul>

        {/* Stats strip */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.06 }}
              className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 flex items-center gap-3"
            >
              <div className="w-9 h-9 rounded-lg bg-white/[0.06] flex items-center justify-center flex-shrink-0">
                <stat.icon size={16} className="text-zinc-300" />
              </div>
              <div className="min-w-0">
                <p className="text-[15px] font-semibold text-white leading-tight truncate">
                  {stat.label}
                </p>
                <p className="text-[10px] text-zinc-500 mt-0.5">{stat.sub}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <a
          href="https://sigmaschool.co"
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-2 px-5 py-3 bg-white text-black font-semibold text-[14px] rounded-lg hover:bg-zinc-100 transition-colors"
        >
          Explore Sigma School
          <ArrowUpRight
            size={15}
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </a>
      </div>
    </motion.div>
  );
}
