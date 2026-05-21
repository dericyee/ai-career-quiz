"use client";

import { motion } from "framer-motion";
import { PathKey } from "@/lib/quiz";
import {
  Code2,
  Zap,
  BarChart3,
  Palette,
  TrendingUp,
} from "lucide-react";

const PATH_META: Record<
  PathKey,
  {
    Icon: React.ElementType;
    name: string;
    callsign: string;
    rarity: string;
    motto: string;
    /** CSS gradient string */
    gradient: string;
    /** Hex */
    accent: string;
    /** rgba shadow */
    glow: string;
    /** UPPERCASE serial label */
    serial: string;
  }
> = {
  builder: {
    Icon: Code2,
    name: "The Builder",
    callsign: "BLDR-01",
    rarity: "Rare",
    motto: "I create what doesn't exist yet.",
    gradient:
      "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #d946ef 100%)",
    accent: "#a5b4fc",
    glow: "rgba(139, 92, 246, 0.5)",
    serial: "TYPE / BUILDER",
  },
  automation: {
    Icon: Zap,
    name: "The Automator",
    callsign: "ATMR-02",
    rarity: "Rare",
    motto: "I make systems do the boring work.",
    gradient:
      "linear-gradient(135deg, #0ea5e9 0%, #06b6d4 50%, #2563eb 100%)",
    accent: "#7dd3fc",
    glow: "rgba(14, 165, 233, 0.5)",
    serial: "TYPE / AUTOMATOR",
  },
  data: {
    Icon: BarChart3,
    name: "The Analyst",
    callsign: "ANLT-03",
    rarity: "Uncommon",
    motto: "I find the signal in the noise.",
    gradient:
      "linear-gradient(135deg, #10b981 0%, #14b8a6 50%, #06b6d4 100%)",
    accent: "#6ee7b7",
    glow: "rgba(16, 185, 129, 0.5)",
    serial: "TYPE / ANALYST",
  },
  creative: {
    Icon: Palette,
    name: "The Creator",
    callsign: "CRTV-04",
    rarity: "Uncommon",
    motto: "I make ideas feel like something.",
    gradient:
      "linear-gradient(135deg, #f59e0b 0%, #f97316 50%, #ef4444 100%)",
    accent: "#fcd34d",
    glow: "rgba(245, 158, 11, 0.5)",
    serial: "TYPE / CREATOR",
  },
  growth: {
    Icon: TrendingUp,
    name: "The Grower",
    callsign: "GRWR-05",
    rarity: "Uncommon",
    motto: "I turn attention into momentum.",
    gradient:
      "linear-gradient(135deg, #ec4899 0%, #f43f5e 50%, #f97316 100%)",
    accent: "#f9a8d4",
    glow: "rgba(236, 72, 153, 0.5)",
    serial: "TYPE / GROWER",
  },
};

interface IdentityCardProps {
  pathKey: PathKey;
  /** Top-line score (0-100). When null, shows "—" */
  score?: number | null;
  /** Show the score panel at all */
  showStats?: boolean;
  scores?: Record<PathKey, number>;
  /** Floating hover effect */
  interactive?: boolean;
  /** Reveal-on-mount animation */
  reveal?: boolean;
  /** Smaller variant for landing-page teaser */
  size?: "lg" | "md";
}

export default function IdentityCard({
  pathKey,
  score = null,
  showStats = false,
  scores,
  interactive = true,
  reveal = false,
  size = "lg",
}: IdentityCardProps) {
  const meta = PATH_META[pathKey];
  const Icon = meta.Icon;

  const dims =
    size === "lg"
      ? { w: "w-full max-w-[360px]", aspect: "aspect-[5/7]" }
      : { w: "w-full max-w-[280px]", aspect: "aspect-[5/7]" };

  const card = (
    <div
      className={`relative ${dims.w} ${dims.aspect} rounded-[28px] overflow-hidden`}
      style={{
        background: meta.gradient,
        boxShadow: `0 30px 80px -20px ${meta.glow}, 0 0 0 1px rgba(255,255,255,0.06) inset`,
      }}
    >
      {/* Inner texture overlays */}
      <div
        className="absolute inset-0 mix-blend-overlay opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.6) 0%, transparent 45%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 1px, transparent 8px)",
        }}
      />
      {/* Border ring */}
      <div className="absolute inset-2 rounded-[22px] border border-white/15 pointer-events-none" />

      {/* Content */}
      <div className="relative h-full flex flex-col p-6 sm:p-7">
        {/* Top row: serial + rarity */}
        <div className="flex items-start justify-between text-[10px] font-bold tracking-[0.18em] text-white/70">
          <span>{meta.serial}</span>
          <span className="px-2 py-0.5 rounded-full bg-white/15 backdrop-blur-md">
            {meta.rarity.toUpperCase()}
          </span>
        </div>

        {/* Icon block */}
        <div className="flex-1 flex items-center justify-center my-3">
          <div className="relative">
            <div
              className="absolute inset-0 rounded-full blur-2xl card-shimmer"
              style={{ background: "rgba(255,255,255,0.4)" }}
            />
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-black/15 backdrop-blur-md border border-white/25 flex items-center justify-center">
              <Icon
                size={size === "lg" ? 56 : 44}
                strokeWidth={1.5}
                className="text-white"
              />
            </div>
          </div>
        </div>

        {/* Name + motto */}
        <div className="text-center mb-4">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-none">
            {meta.name}
          </h3>
          <p className="text-[12px] text-white/80 italic mt-2">
            &ldquo;{meta.motto}&rdquo;
          </p>
        </div>

        {/* Stats / score */}
        {showStats && scores ? (
          <div className="space-y-1.5">
            {(Object.entries(scores) as [PathKey, number][]).map(
              ([key, val]) => {
                const isMain = key === pathKey;
                const pct = Math.max(0, Math.min(100, val));
                return (
                  <div key={key}>
                    <div className="flex justify-between text-[10px] font-bold tracking-wider text-white/80 mb-0.5">
                      <span className={isMain ? "text-white" : ""}>
                        {key.toUpperCase()}
                      </span>
                      <span className="tabular-nums">{pct}</span>
                    </div>
                    <div className="h-1 rounded-full bg-black/25 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{
                          duration: 0.9,
                          ease: [0.22, 1, 0.36, 1],
                          delay: 0.4,
                        }}
                        className="h-full bg-white"
                      />
                    </div>
                  </div>
                );
              }
            )}
          </div>
        ) : (
          <div className="flex items-end justify-between border-t border-white/20 pt-3">
            <div className="text-[10px] font-bold tracking-[0.18em] text-white/70">
              ID · {meta.callsign}
            </div>
            <div className="text-[10px] font-bold tracking-[0.18em] text-white/70 tabular-nums">
              {score !== null ? `MATCH ${score}` : "MATCH —"}
            </div>
          </div>
        )}
      </div>

      {/* Top-left corner mark */}
      <div className="absolute top-3 left-3 w-2.5 h-2.5 rounded-full bg-white/40" />
      <div className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-white/40" />
      <div className="absolute bottom-3 left-3 w-2.5 h-2.5 rounded-full bg-white/40" />
      <div className="absolute bottom-3 right-3 w-2.5 h-2.5 rounded-full bg-white/40" />
    </div>
  );

  if (!interactive && !reveal) return card;

  return (
    <motion.div
      initial={reveal ? { opacity: 0, y: 40, rotateY: -15, scale: 0.9 } : false}
      animate={reveal ? { opacity: 1, y: 0, rotateY: 0, scale: 1 } : undefined}
      transition={{
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={interactive ? { y: -6, rotateY: -3, rotateX: 3 } : undefined}
      style={{ transformStyle: "preserve-3d", perspective: 1200 }}
      className="will-change-transform"
    >
      {card}
    </motion.div>
  );
}
