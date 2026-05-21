"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const PROOF_CARDS = [
  {
    stat: "$133,080",
    label: "Median annual wage for software developers in the U.S.",
    source: "U.S. Bureau of Labor Statistics · May 2024",
    href: "https://www.bls.gov/ooh/computer-and-information-technology/software-developers.htm",
    accent: "text-indigo-300",
  },
  {
    stat: "+15%",
    label:
      "Projected job growth for software developers, QA analysts & testers from 2024 to 2034.",
    source: "U.S. Bureau of Labor Statistics",
    href: "https://www.bls.gov/ooh/computer-and-information-technology/software-developers.htm",
    accent: "text-emerald-300",
  },
  {
    stat: "Rising",
    label:
      "a16z argues software development jobs have been rising again since early 2025.",
    source: "a16z · 2026",
    href: "https://a16z.com",
    accent: "text-violet-300",
  },
  {
    stat: "No CS",
    label:
      "Many people have broken into tech without CS degrees by building proof of skill.",
    source: "NoCSDegree.com",
    href: "https://www.nocsdegree.com",
    accent: "text-sky-300",
  },
];

interface ProofSectionProps {
  variant?: "section" | "embedded";
}

export default function ProofSection({ variant = "section" }: ProofSectionProps) {
  const isEmbedded = variant === "embedded";

  return (
    <section className={isEmbedded ? "" : "py-20"}>
      <div className={isEmbedded ? "" : "max-w-5xl mx-auto px-5"}>
        {!isEmbedded && (
          <div className="text-center mb-10">
            <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-zinc-500 mb-3">
              The data
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.025em] text-white mb-3">
              Why this isn&apos;t just opinion.
            </h2>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {PROOF_CARDS.map((card, i) => (
            <motion.a
              key={i}
              href={card.href}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              className="group relative block rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/20 p-5 transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <p className={`text-2xl font-semibold tracking-tight ${card.accent}`}>
                  {card.stat}
                </p>
                <ArrowUpRight
                  size={14}
                  className="text-zinc-600 group-hover:text-white transition-colors"
                />
              </div>
              <p className="text-[13px] text-zinc-300 leading-relaxed mb-3">
                {card.label}
              </p>
              <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                {card.source}
              </p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
