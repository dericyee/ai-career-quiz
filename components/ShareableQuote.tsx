"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export default function ShareableQuote() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Rich gradient backdrop — designed to look good in a screenshot */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 50% 50%, rgba(99,102,241,0.18), transparent 70%), radial-gradient(ellipse 60% 50% at 80% 20%, rgba(236,72,153,0.12), transparent 60%), radial-gradient(ellipse 60% 50% at 20% 90%, rgba(56,189,248,0.10), transparent 60%)",
        }}
      />
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />

      <div className="relative max-w-3xl mx-auto px-5 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex w-12 h-12 rounded-2xl border border-white/10 bg-white/[0.04] items-center justify-center mb-8"
        >
          <Quote size={20} className="text-indigo-300" />
        </motion.div>

        <motion.blockquote
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-5xl font-semibold tracking-[-0.03em] leading-[1.1] text-white"
        >
          In the AI era, the riskiest move
          <br className="hidden sm:block" /> isn&apos;t being replaced.
          <span className="block mt-3 bg-gradient-to-r from-indigo-300 via-violet-300 to-pink-300 bg-clip-text text-transparent">
            It&apos;s spending another year not knowing what you&apos;re built
            for.
          </span>
        </motion.blockquote>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 text-[12px] font-mono uppercase tracking-[0.18em] text-zinc-500"
        >
          Sigmaschool · Career Compass
        </motion.p>
      </div>
    </section>
  );
}
