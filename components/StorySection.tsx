"use client";

import { motion } from "framer-motion";

const LINES: { text: string; tone: "dim" | "bright" | "accent" }[] = [
  { text: "You were told to “follow your passion.”", tone: "dim" },
  {
    text: "Nobody tells you what to do when you have no idea what your passion even is.",
    tone: "bright",
  },
  {
    text: "So you scroll. You compare. You collect browser tabs of careers you’ll never start.",
    tone: "dim",
  },
  {
    text: "Meanwhile AI keeps rewriting the rules — and “just get a degree” quietly stopped being the answer.",
    tone: "dim",
  },
  {
    text: "Here’s the part no one says out loud:",
    tone: "dim",
  },
  {
    text: "You’re not behind. You’re just uncalibrated.",
    tone: "accent",
  },
  {
    text: "You’ve never actually been shown what you’re built for. Let’s fix that.",
    tone: "bright",
  },
];

export default function StorySection() {
  return (
    <section className="relative py-28 border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 bg-dotgrid opacity-40 pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 50% 40%, rgba(99,102,241,0.08), transparent 70%)",
        }}
      />

      <div className="relative max-w-2xl mx-auto px-5">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-[11px] font-mono uppercase tracking-[0.2em] text-zinc-500 mb-10 flex items-center gap-2"
        >
          <span className="w-1 h-1 rounded-full bg-zinc-500" />
          Real talk
        </motion.div>

        <div className="space-y-6">
          {LINES.map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
              className={
                line.tone === "accent"
                  ? "text-3xl sm:text-4xl font-semibold tracking-[-0.02em] leading-tight bg-gradient-to-r from-indigo-300 via-violet-300 to-pink-300 bg-clip-text text-transparent"
                  : line.tone === "bright"
                    ? "text-xl sm:text-2xl font-medium text-white leading-snug"
                    : "text-lg sm:text-xl text-zinc-500 leading-relaxed"
              }
            >
              {line.text}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
}
