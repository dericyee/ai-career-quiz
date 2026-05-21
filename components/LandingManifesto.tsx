"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const LINES = [
  {
    head: "01",
    bold: "Most career advice is written for someone else.",
    sub: "Generic listicles, vague frameworks, and “follow your passion.” None of it knows who you are.",
  },
  {
    head: "02",
    bold: "AI is shifting work faster than tradition can catch up.",
    sub: "Old job titles don’t map to the new shape of valuable work. New archetypes do.",
  },
  {
    head: "03",
    bold: "You don’t need more advice. You need a direction.",
    sub: "One archetype that fits you. One project to start. One next step. The end.",
  },
];

export default function LandingManifesto() {
  return (
    <section className="relative py-28 border-t border-white/5 overflow-hidden">
      {/* Subtle dot grid */}
      <div className="absolute inset-0 bg-dotgrid opacity-50 pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(99,102,241,0.10), transparent 70%)",
        }}
      />

      <div className="relative max-w-3xl mx-auto px-5">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <div className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.18em] text-zinc-500 uppercase mb-5">
            <span className="w-1 h-1 rounded-full bg-zinc-500" />
            The premise
          </div>
          <h2 className="text-4xl sm:text-5xl font-semibold tracking-[-0.03em] leading-[1.05] text-white">
            We built this because{" "}
            <span className="text-zinc-500">
              the old career playbook is broken.
            </span>
          </h2>
        </motion.div>

        <div className="space-y-10">
          {LINES.map((l, i) => (
            <motion.div
              key={l.head}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="grid grid-cols-[auto_1fr] gap-6 sm:gap-10 items-start"
            >
              <div className="text-[11px] font-mono tracking-wider text-zinc-600 pt-2 tabular-nums">
                {l.head}
              </div>
              <div className="border-t border-white/5 pt-5">
                <p className="text-xl sm:text-2xl font-semibold text-white tracking-tight leading-snug mb-2">
                  {l.bold}
                </p>
                <p className="text-[15px] text-zinc-400 leading-relaxed max-w-prose">
                  {l.sub}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* End CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-20 text-center"
        >
          <Link
            href="/quiz"
            className="group inline-flex items-center gap-2 px-6 py-3.5 bg-white text-black font-semibold text-[15px] rounded-xl hover:bg-zinc-100 transition-colors"
            style={{
              boxShadow: "0 10px 30px -10px rgba(255,255,255,0.18)",
            }}
          >
            Find your archetype
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>
          <p className="text-[11px] text-zinc-600 mt-4 tracking-wider uppercase font-medium">
            2 minutes. No sign-up to see your result.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
