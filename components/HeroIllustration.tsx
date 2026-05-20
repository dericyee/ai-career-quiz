"use client";

import { motion } from "framer-motion";

/**
 * Hero illustration — stylized "career compass" with floating cards
 * representing the 5 paths orbiting a central AI/brain core.
 */
export default function HeroIllustration() {
  return (
    <div className="relative w-full max-w-md mx-auto aspect-square">
      <svg viewBox="0 0 400 400" className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id="coreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
          <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#a5b4fc" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#c4b5fd" stopOpacity="0.2" />
          </linearGradient>
          <filter id="softGlow">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>

        {/* Outer orbit rings */}
        <motion.circle
          cx="200"
          cy="200"
          r="170"
          fill="none"
          stroke="url(#ringGrad)"
          strokeWidth="1.5"
          strokeDasharray="4 8"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "200px 200px" }}
        />
        <motion.circle
          cx="200"
          cy="200"
          r="130"
          fill="none"
          stroke="url(#ringGrad)"
          strokeWidth="1.5"
          strokeDasharray="2 6"
          initial={{ rotate: 360 }}
          animate={{ rotate: 0 }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "200px 200px" }}
        />

        {/* Glow halo */}
        <circle
          cx="200"
          cy="200"
          r="55"
          fill="url(#coreGrad)"
          opacity="0.4"
          filter="url(#softGlow)"
        />

        {/* Central core */}
        <motion.g
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "200px 200px" }}
        >
          <circle cx="200" cy="200" r="48" fill="url(#coreGrad)" />
          <text
            x="200"
            y="212"
            textAnchor="middle"
            fill="white"
            fontFamily="system-ui, sans-serif"
            fontWeight="800"
            fontSize="32"
          >
            AI
          </text>
        </motion.g>
      </svg>

      {/* Orbiting path badges */}
      {[
        {
          label: "Build",
          color: "from-indigo-500 to-violet-500",
          textColor: "text-white",
          x: "10%",
          y: "20%",
          delay: 0,
        },
        {
          label: "Automate",
          color: "from-sky-500 to-cyan-500",
          textColor: "text-white",
          x: "78%",
          y: "12%",
          delay: 0.5,
        },
        {
          label: "Analyse",
          color: "from-emerald-500 to-teal-500",
          textColor: "text-white",
          x: "85%",
          y: "70%",
          delay: 1,
        },
        {
          label: "Create",
          color: "from-amber-400 to-orange-500",
          textColor: "text-white",
          x: "8%",
          y: "75%",
          delay: 1.5,
        },
        {
          label: "Grow",
          color: "from-pink-500 to-rose-500",
          textColor: "text-white",
          x: "45%",
          y: "92%",
          delay: 2,
        },
      ].map((badge, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: badge.x, top: badge.y, transform: "translate(-50%, -50%)" }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
          transition={{
            opacity: { duration: 0.5, delay: badge.delay },
            scale: { duration: 0.5, delay: badge.delay },
            y: { duration: 3 + i * 0.3, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <div
            className={`bg-gradient-to-br ${badge.color} ${badge.textColor} px-3 py-1.5 rounded-xl text-xs font-bold shadow-lg shadow-slate-300/40 whitespace-nowrap`}
          >
            {badge.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
