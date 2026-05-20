"use client";

import { motion } from "framer-motion";

/**
 * Animated gradient mesh background with floating shapes.
 * Sits absolutely behind hero content.
 */
export default function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      {/* Soft gradient mesh blobs */}
      <motion.div
        className="absolute -top-32 -right-20 w-[480px] h-[480px] rounded-full bg-gradient-to-br from-indigo-200 to-violet-200 blur-3xl opacity-60"
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -20, 10, 0],
          scale: [1, 1.05, 0.95, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-32 -left-32 w-[420px] h-[420px] rounded-full bg-gradient-to-br from-pink-200 to-amber-100 blur-3xl opacity-50"
        animate={{
          x: [0, -20, 30, 0],
          y: [0, 30, -15, 0],
          scale: [1, 0.95, 1.05, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-40 right-1/4 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-emerald-100 to-sky-200 blur-3xl opacity-40"
        animate={{
          x: [0, 25, -25, 0],
          y: [0, -15, 15, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #1e293b 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />
    </div>
  );
}
