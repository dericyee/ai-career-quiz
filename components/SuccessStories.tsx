"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { GRADUATES } from "@/lib/graduates";

export default function SuccessStories() {
  return (
    <div>
      <p className="text-[13px] text-zinc-400 leading-relaxed mb-5 max-w-prose">
        This isn&apos;t theory. These are real Sigmaschool graduates who started
        exactly where you are — a different career, no CS degree — and made the
        switch.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {GRADUATES.map((g, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (i % 4) * 0.05, duration: 0.35 }}
            className="rounded-xl border border-white/10 bg-white/[0.02] p-4"
          >
            <div className="flex items-center gap-2 text-[13px] mb-1.5">
              <span className="text-zinc-500 line-through decoration-zinc-700">
                {g.before}
              </span>
              <ArrowRight size={12} className="text-zinc-600 flex-shrink-0" />
              <span className="text-white font-medium">{g.role}</span>
            </div>
            <p className="text-[12px] text-zinc-500">
              {g.name} · now at{" "}
              <span className="text-zinc-300">{g.company}</span>
            </p>
          </motion.div>
        ))}
      </div>

      <p className="text-[11px] text-zinc-600 mt-4">
        A sample of Sigmaschool graduates. Career switching is hard work — these
        people put in the reps and built real proof.
      </p>
    </div>
  );
}
