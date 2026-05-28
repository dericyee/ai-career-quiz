"use client";

import { motion } from "framer-motion";
import { PathKey } from "@/lib/quiz";
import { TRAJECTORIES, formatUSD, fiveYearGap } from "@/lib/income";

const ACCENT: Record<PathKey, string> = {
  builder: "#a5b4fc",
  automation: "#7dd3fc",
  data: "#6ee7b7",
  creative: "#fcd34d",
  growth: "#f9a8d4",
};

interface IncomeProjectionProps {
  pathKey: PathKey;
}

// Chart geometry
const W = 720;
const H = 360;
const PAD = { top: 32, right: 24, bottom: 40, left: 52 };
const plotW = W - PAD.left - PAD.right;
const plotH = H - PAD.top - PAD.bottom;

export default function IncomeProjection({ pathKey }: IncomeProjectionProps) {
  const t = TRAJECTORIES[pathKey];
  const accent = ACCENT[pathKey];

  const maxVal = Math.max(...t.pathway, ...t.baseline) * 1.08;
  const minVal = 30000;

  const x = (i: number) =>
    PAD.left + (i / (t.points.length - 1)) * plotW;
  const y = (v: number) =>
    PAD.top + (1 - (v - minVal) / (maxVal - minVal)) * plotH;

  const toPath = (vals: number[]) =>
    vals.map((v, i) => `${i === 0 ? "M" : "L"} ${x(i)} ${y(v)}`).join(" ");

  // Area between pathway and baseline (the "opportunity gap")
  const gapArea =
    t.pathway.map((v, i) => `${i === 0 ? "M" : "L"} ${x(i)} ${y(v)}`).join(" ") +
    " " +
    t.baseline
      .map((v, i) => `L ${x(t.baseline.length - 1 - i)} ${y(t.baseline[t.baseline.length - 1 - i])}`)
      .join(" ") +
    " Z";

  const gap = fiveYearGap(t);

  // Y gridlines
  const gridVals = [40000, 70000, 100000, 130000, 160000].filter(
    (v) => v <= maxVal && v >= minVal
  );

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6 overflow-hidden">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-3 mb-5">
        <div>
          <h3 className="text-xl font-semibold text-white tracking-[-0.02em]">
            Where this path leads
          </h3>
          <p className="text-[13px] text-zinc-500 mt-1">
            Two trajectories from the same starting line.
          </p>
        </div>
        <div className="text-right">
          <p
            className="text-2xl font-semibold tabular-nums"
            style={{ color: accent }}
          >
            +{formatUSD(gap)}
          </p>
          <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">
            5-year gap
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="relative w-full">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full h-auto"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id={`grad-${pathKey}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={accent} stopOpacity="0.28" />
              <stop offset="100%" stopColor={accent} stopOpacity="0.02" />
            </linearGradient>
          </defs>

          {/* Y gridlines + labels */}
          {gridVals.map((v) => (
            <g key={v}>
              <line
                x1={PAD.left}
                y1={y(v)}
                x2={W - PAD.right}
                y2={y(v)}
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="1"
              />
              <text
                x={PAD.left - 10}
                y={y(v) + 3}
                textAnchor="end"
                fill="rgba(255,255,255,0.35)"
                fontSize="11"
                fontFamily="monospace"
              >
                {formatUSD(v)}
              </text>
            </g>
          ))}

          {/* X labels */}
          {t.points.map((p, i) => (
            <text
              key={p}
              x={x(i)}
              y={H - PAD.bottom + 22}
              textAnchor="middle"
              fill="rgba(255,255,255,0.4)"
              fontSize="11"
              fontFamily="monospace"
            >
              {p}
            </text>
          ))}

          {/* Opportunity gap area */}
          <motion.path
            d={gapArea}
            fill={`url(#grad-${pathKey})`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          />

          {/* Baseline line */}
          <motion.path
            d={toPath(t.baseline)}
            fill="none"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="2"
            strokeDasharray="5 5"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />

          {/* Pathway line */}
          <motion.path
            d={toPath(t.pathway)}
            fill="none"
            stroke={accent}
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeInOut", delay: 0.2 }}
          />

          {/* Pathway dots */}
          {t.pathway.map((v, i) => (
            <motion.circle
              key={i}
              cx={x(i)}
              cy={y(v)}
              r="4"
              fill={accent}
              stroke="#08080b"
              strokeWidth="2"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + i * 0.18 }}
            />
          ))}

          {/* Endpoint value labels */}
          <motion.text
            x={x(t.pathway.length - 1)}
            y={y(t.pathway[t.pathway.length - 1]) - 12}
            textAnchor="end"
            fill={accent}
            fontSize="14"
            fontWeight="700"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.4 }}
          >
            {formatUSD(t.pathway[t.pathway.length - 1])}
          </motion.text>
          <motion.text
            x={x(t.baseline.length - 1)}
            y={y(t.baseline[t.baseline.length - 1]) + 18}
            textAnchor="end"
            fill="rgba(255,255,255,0.4)"
            fontSize="12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.4 }}
          >
            {formatUSD(t.baseline[t.baseline.length - 1])}
          </motion.text>
        </svg>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-4 text-[12px]">
        <div className="flex items-center gap-2">
          <span
            className="w-4 h-[3px] rounded-full"
            style={{ background: accent }}
          />
          <span className="text-zinc-300">Your {pathKey} path</span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="w-4 h-[2px] rounded-full"
            style={{
              background:
                "repeating-linear-gradient(90deg, rgba(255,255,255,0.4) 0 3px, transparent 3px 6px)",
            }}
          />
          <span className="text-zinc-500">If you don&apos;t build new skills</span>
        </div>
      </div>

      {/* Anchor + disclaimer */}
      <div className="mt-4 pt-4 border-t border-white/5">
        <p className="text-[12px] text-zinc-400">
          <span className="text-zinc-300 font-medium">Reference:</span>{" "}
          {t.anchor.label}{" "}
          <span className="text-zinc-600">· {t.anchor.source}</span>
        </p>
        <p className="text-[11px] text-zinc-600 mt-1.5 leading-relaxed">
          Illustrative trajectory anchored to U.S. data. Your local figures will
          differ — the point is the <span className="italic">shape</span> of the
          opportunity, not a guaranteed salary. Real outcomes depend on the proof
          you build.
        </p>
      </div>
    </div>
  );
}
