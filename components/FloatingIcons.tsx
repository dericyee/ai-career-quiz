"use client";

import { motion } from "framer-motion";
import {
  Code2,
  Sparkles,
  Cpu,
  Zap,
  BarChart3,
  Brain,
  Rocket,
  Lightbulb,
} from "lucide-react";

interface FloatingIcon {
  Icon: React.ElementType;
  className: string;
  delay: number;
  size: number;
  duration: number;
}

const ICONS: FloatingIcon[] = [
  { Icon: Code2, className: "top-[12%] left-[8%] text-indigo-400", delay: 0, size: 28, duration: 6 },
  { Icon: Sparkles, className: "top-[18%] right-[10%] text-violet-400", delay: 1, size: 24, duration: 7 },
  { Icon: Cpu, className: "top-[55%] left-[5%] text-sky-400", delay: 2, size: 26, duration: 8 },
  { Icon: Zap, className: "bottom-[20%] right-[8%] text-amber-400", delay: 0.5, size: 28, duration: 6.5 },
  { Icon: BarChart3, className: "bottom-[15%] left-[12%] text-emerald-400", delay: 1.5, size: 24, duration: 7.5 },
  { Icon: Brain, className: "top-[40%] right-[6%] text-pink-400", delay: 2.5, size: 26, duration: 8.5 },
  { Icon: Rocket, className: "top-[8%] left-1/2 text-indigo-400", delay: 1.2, size: 22, duration: 7 },
  { Icon: Lightbulb, className: "bottom-[35%] right-1/4 text-amber-300", delay: 0.8, size: 22, duration: 6.8 },
];

export default function FloatingIcons() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {ICONS.map(({ Icon, className, delay, size, duration }, i) => (
        <motion.div
          key={i}
          className={`absolute ${className} opacity-40`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0.2, 0.5, 0.2],
            scale: [0.9, 1.1, 0.9],
            y: [0, -12, 0],
          }}
          transition={{
            duration,
            delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Icon size={size} strokeWidth={1.5} />
        </motion.div>
      ))}
    </div>
  );
}
