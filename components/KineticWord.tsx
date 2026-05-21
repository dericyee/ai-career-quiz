"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WORDS = [
  { text: "a Builder.", color: "#a5b4fc", glow: "rgba(165,180,252,0.45)" },
  { text: "an Automator.", color: "#7dd3fc", glow: "rgba(125,211,252,0.45)" },
  { text: "an Analyst.", color: "#6ee7b7", glow: "rgba(110,231,183,0.45)" },
  { text: "a Creator.", color: "#fcd34d", glow: "rgba(252,211,77,0.45)" },
  { text: "a Grower.", color: "#f9a8d4", glow: "rgba(249,168,212,0.45)" },
];

interface KineticWordProps {
  intervalMs?: number;
}

export default function KineticWord({ intervalMs = 1800 }: KineticWordProps) {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % WORDS.length), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);

  const current = WORDS[i];

  return (
    <span className="relative inline-block align-baseline">
      <AnimatePresence mode="wait">
        <motion.span
          key={current.text}
          initial={{ y: "0.6em", opacity: 0, filter: "blur(8px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-0.6em", opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block"
          style={{
            color: current.color,
            textShadow: `0 0 60px ${current.glow}`,
          }}
        >
          {current.text}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
