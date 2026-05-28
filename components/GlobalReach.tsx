"use client";

import { motion } from "framer-motion";

const CITIES = [
  "🇲🇾 Kuala Lumpur",
  "🇮🇩 Jakarta",
  "🇵🇭 Manila",
  "🇸🇬 Singapore",
  "🇮🇳 Mumbai",
  "🇳🇬 Lagos",
  "🇻🇳 Ho Chi Minh",
  "🇪🇬 Cairo",
  "🇧🇩 Dhaka",
  "🇰🇪 Nairobi",
  "🇹🇭 Bangkok",
  "🇵🇰 Karachi",
  "🇧🇷 São Paulo",
  "🇿🇦 Johannesburg",
];

const PERSONAS = [
  { who: "The fresh grad", feel: "who feels behind already" },
  { who: "The 9-to-5er", feel: "quietly eyeing the exit" },
  { who: "The degree-holder", feel: "doing unrelated work" },
  { who: "The career-switcher", feel: "starting over at 30, 40, 50" },
  { who: "The retail & F&B worker", feel: "who knows they're capable of more" },
  { who: "The creative", feel: "who wants real leverage" },
];

export default function GlobalReach() {
  return (
    <section className="relative py-24 border-t border-white/5 overflow-hidden">
      <div className="max-w-5xl mx-auto px-5">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-zinc-500 mb-4">
            No degree gate · No borders
          </p>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-[-0.03em] text-white leading-[1.05]">
            Wherever you&apos;re starting from,
            <br />
            <span className="text-zinc-500">you&apos;re not starting alone.</span>
          </h2>
        </motion.div>

        {/* Scrolling city marquee */}
        <div className="relative mb-14 overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]">
          <motion.div
            className="flex gap-3 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          >
            {[...CITIES, ...CITIES].map((c, i) => (
              <span
                key={i}
                className="flex-shrink-0 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] text-[13px] text-zinc-300 whitespace-nowrap"
              >
                {c}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Personas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {PERSONAS.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 3) * 0.06, duration: 0.4 }}
              className="rounded-xl border border-white/10 bg-white/[0.02] px-5 py-4"
            >
              <p className="text-[15px] font-semibold text-white">{p.who}</p>
              <p className="text-[13px] text-zinc-500 mt-0.5">{p.feel}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-[14px] text-zinc-400 mt-12 max-w-lg mx-auto"
        >
          Whichever one is you — the quiz meets you exactly there, and points to
          what&apos;s next.
        </motion.p>
      </div>
    </section>
  );
}
