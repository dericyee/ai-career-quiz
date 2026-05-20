"use client";

import { motion } from "framer-motion";
import { TrendingUp, Users, DollarSign, Briefcase, ExternalLink } from "lucide-react";

const PROOF_CARDS = [
  {
    icon: DollarSign,
    stat: "$133,080",
    label: "Median annual wage for software developers in the U.S.",
    source: "U.S. Bureau of Labor Statistics, May 2024",
    href: "https://www.bls.gov/ooh/computer-and-information-technology/software-developers.htm",
    color: "text-indigo-600",
    bg: "bg-indigo-50",
  },
  {
    icon: TrendingUp,
    stat: "+15%",
    label:
      "Projected job growth for software developers, QA analysts & testers from 2024 to 2034 — much faster than average.",
    source: "U.S. Bureau of Labor Statistics",
    href: "https://www.bls.gov/ooh/computer-and-information-technology/software-developers.htm",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    icon: Briefcase,
    stat: "Rising again",
    label:
      'a16z argues in "The AI Job Apocalypse Is a Complete Fantasy" that software development jobs have been rising again since early 2025.',
    source: "a16z, 2026",
    href: "https://a16z.com",
    color: "text-violet-600",
    bg: "bg-violet-50",
  },
  {
    icon: Users,
    stat: "No CS degree",
    label:
      "Many people have broken into tech without CS degrees by building real projects and creating proof of skill.",
    source: "NoCSDegree.com",
    href: "https://www.nocsdegree.com",
    color: "text-sky-600",
    bg: "bg-sky-50",
  },
];

interface ProofSectionProps {
  variant?: "section" | "embedded";
}

export default function ProofSection({ variant = "section" }: ProofSectionProps) {
  const isEmbedded = variant === "embedded";

  return (
    <section className={isEmbedded ? "" : "py-20 bg-slate-50"}>
      <div className={isEmbedded ? "" : "max-w-5xl mx-auto px-4"}>
        {!isEmbedded && (
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-500 mb-3">
              The data behind your result
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              The career rules are changing.
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Software, AI, automation, and digital products are moving into
              every industry. That doesn&apos;t mean everyone needs to be a
              coder — but more people benefit from understanding how to build,
              automate, and work with AI.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {PROOF_CARDS.map((card, i) => (
            <motion.a
              key={i}
              href={card.href}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              whileHover={{ y: -3 }}
              className="group bg-white rounded-2xl p-5 border border-slate-200 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-100/40 transition-all block"
            >
              <div className="flex items-start justify-between mb-3">
                <div
                  className={`w-10 h-10 rounded-xl ${card.bg} flex items-center justify-center`}
                >
                  <card.icon size={18} className={card.color} />
                </div>
                <ExternalLink
                  size={14}
                  className="text-slate-300 group-hover:text-indigo-500 transition-colors"
                />
              </div>
              <p className={`text-xl font-bold mb-2 ${card.color}`}>
                {card.stat}
              </p>
              <p className="text-sm text-slate-700 leading-relaxed mb-3">
                {card.label}
              </p>
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">
                {card.source} ↗
              </p>
            </motion.a>
          ))}
        </div>

        {!isEmbedded && (
          <p className="text-center text-xs text-slate-400 mt-6">
            Click any source to verify. We link directly to the original
            publishers.
          </p>
        )}
      </div>
    </section>
  );
}
