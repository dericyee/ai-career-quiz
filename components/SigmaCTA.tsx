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
    <div className="relative">
      <div className="relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-2xl overflow-hidden relative"
        >
          {/* Decorative grid */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          {/* Glow accent */}
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-indigo-500 rounded-full blur-3xl opacity-30" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-violet-500 rounded-full blur-3xl opacity-25" />

          <div className="relative grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="mb-5">
                <SigmaLogo href="" variant="compact" className="[&_img]:brightness-0 [&_img]:invert" />
              </div>
              <p className="text-xs font-semibold uppercase tracking-widest text-indigo-300 mb-3">
                Who built this quiz
              </p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 leading-tight">
                From beginner to job-ready software developer in{" "}
                <span className="bg-gradient-to-r from-indigo-300 to-pink-300 bg-clip-text text-transparent">
                  3 months
                </span>
                .
              </h2>
              <p className="text-indigo-100 text-base mb-6 leading-relaxed">
                Sigma School is a modern AI software engineering bootcamp built
                for people who didn&apos;t take the traditional CS route — and want
                proof, not just certificates.
              </p>

              <ul className="space-y-2.5 mb-7">
                {POINTS.map((p, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.08 }}
                    className="flex items-start gap-2.5 text-sm text-indigo-100"
                  >
                    <CheckCircle2
                      size={16}
                      className="text-emerald-400 flex-shrink-0 mt-0.5"
                    />
                    {p}
                  </motion.li>
                ))}
              </ul>

              <a
                href="https://sigmaschool.co"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-900 font-bold text-sm rounded-xl hover:scale-[1.03] transition-all shadow-lg"
              >
                Explore Sigma School
                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </div>

            {/* Stats panel */}
            <div className="grid grid-cols-1 gap-3">
              {STATS.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center flex-shrink-0">
                    <stat.icon size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-extrabold text-white leading-tight">
                      {stat.label}
                    </p>
                    <p className="text-xs text-indigo-200 mt-0.5">{stat.sub}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
