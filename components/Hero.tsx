"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import KineticWord from "./KineticWord";
import IdentityCard from "./IdentityCard";
import { PathKey } from "@/lib/quiz";
import { useEffect, useState } from "react";

const PATH_CYCLE: PathKey[] = [
  "builder",
  "automation",
  "data",
  "creative",
  "growth",
];

export default function Hero() {
  const [cardIdx, setCardIdx] = useState(0);

  // Keep card in sync with KineticWord cycle
  useEffect(() => {
    const id = setInterval(
      () => setCardIdx((v) => (v + 1) % PATH_CYCLE.length),
      1800
    );
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-grid opacity-60 pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(99,102,241,0.18), transparent 60%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 80% 80%, rgba(236,72,153,0.10), transparent 60%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-5 pt-16 pb-24 sm:pt-24 sm:pb-32 grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-20 items-center">
        {/* Left: kinetic copy */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 text-center lg:text-left order-2 lg:order-1"
        >
          {/* Eyebrow / system tag */}
          <div className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.18em] text-zinc-500 uppercase mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Career Compass · v1.0
          </div>

          {/* The big statement */}
          <h1 className="text-[2.8rem] sm:text-6xl lg:text-[4.5rem] font-semibold tracking-[-0.03em] leading-[0.98] mb-7">
            <span className="text-white">You&apos;re not lost.</span>
            <br />
            <span className="text-zinc-500">You&apos;re&nbsp;</span>
            <KineticWord />
          </h1>

          <p className="text-base sm:text-lg text-zinc-400 max-w-md mx-auto lg:mx-0 leading-relaxed mb-9">
            A 2-minute quiz. One real direction. Plus a card you&apos;ll
            actually want to keep.
          </p>

          <div className="flex flex-col sm:flex-row items-center lg:items-start gap-3">
            <Link
              href="/quiz"
              className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-black font-semibold text-[15px] rounded-xl hover:bg-zinc-100 transition-colors w-full sm:w-auto"
              style={{
                boxShadow: "0 10px 30px -10px rgba(255,255,255,0.25)",
              }}
            >
              Get your card
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
            <span className="text-[12px] text-zinc-500 tabular-nums">
              ~2 min · 10 questions · no sign-up
            </span>
          </div>

          {/* Bottom meta */}
          <div className="mt-12 flex items-center gap-6 text-[11px] text-zinc-600 font-medium tracking-wider uppercase">
            <span>5 archetypes</span>
            <span className="w-px h-3 bg-zinc-800" />
            <span>Personalised</span>
            <span className="w-px h-3 bg-zinc-800" />
            <span>Shareable</span>
          </div>
        </motion.div>

        {/* Right: card stack with floating preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="order-1 lg:order-2 flex justify-center relative"
          style={{ perspective: 1400 }}
        >
          {/* Stacked decoy cards behind */}
          <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
            <motion.div
              className="absolute"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              style={{
                transform: "translateX(-60px) rotateZ(-8deg) scale(0.88)",
                filter: "blur(1px)",
                opacity: 0.4,
              }}
            >
              <IdentityCard
                pathKey={PATH_CYCLE[(cardIdx + 4) % 5]}
                interactive={false}
                size="md"
              />
            </motion.div>
            <motion.div
              className="absolute"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              style={{
                transform: "translateX(60px) rotateZ(8deg) scale(0.88)",
                filter: "blur(1px)",
                opacity: 0.4,
              }}
            >
              <IdentityCard
                pathKey={PATH_CYCLE[(cardIdx + 1) % 5]}
                interactive={false}
                size="md"
              />
            </motion.div>
          </div>

          {/* Center card */}
          <motion.div
            key={cardIdx}
            initial={{ opacity: 0, rotateY: -25, scale: 0.92 }}
            animate={{ opacity: 1, rotateY: 0, scale: 1 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10"
            style={{ transformStyle: "preserve-3d" }}
          >
            <IdentityCard
              pathKey={PATH_CYCLE[cardIdx]}
              interactive
              size="lg"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
