"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock,
  Loader2,
  Send,
  Sparkles,
  Brain,
  CalendarDays,
  Target,
  AlertTriangle,
  BarChart3,
  Image as ImageIcon,
} from "lucide-react";
import { PathKey, Scores } from "@/lib/quiz";
import { DEFAULT_COUNTRY, Country } from "@/lib/countries";
import PhoneInput from "./PhoneInput";

const UNLOCKS = [
  {
    icon: Brain,
    title: "Your full archetype diagnosis",
    sub: "Why you scored the way you did — and what it really means.",
  },
  {
    icon: Sparkles,
    title: "Your blended profile",
    sub: "What your top + secondary archetype combo says about you. (Rare combos.)",
  },
  {
    icon: CalendarDays,
    title: "Your personalised 30-day blueprint",
    sub: "Week-by-week plan. The thing you'll actually print and follow.",
  },
  {
    icon: Target,
    title: "Your first project, designed for you",
    sub: "A specific, shippable starter project for your archetype.",
  },
  {
    icon: AlertTriangle,
    title: "Your blind spots",
    sub: "The traps your archetype falls into. Avoid them early.",
  },
  {
    icon: BarChart3,
    title: "The data behind your match",
    sub: "Salary, demand, and growth data — all clickable sources.",
  },
  {
    icon: ImageIcon,
    title: "Your HD shareable card",
    sub: "A clean, screenshot-ready version. Designed to be shared.",
  },
];

interface UnlockGateProps {
  resultPath: PathKey;
  scores: Scores;
  answers: number[];
  onUnlocked: () => void;
}

export default function UnlockGate({
  resultPath,
  scores,
  answers,
  onUnlocked,
}: UnlockGateProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState<Country>(DEFAULT_COUNTRY);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [currentRole, setCurrentRole] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setStatus("loading");
    setErrorMsg("");

    // Combine country code + number into a single E.164-style string,
    // e.g. "+60 12-345 6789"
    const trimmedNumber = phoneNumber.trim();
    const combinedPhone = trimmedNumber
      ? `${country.dial} ${trimmedNumber}`
      : null;

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          whatsapp: combinedPhone,
          country_code: trimmedNumber ? country.dial : null,
          country_iso: trimmedNumber ? country.iso : null,
          current_role: currentRole.trim() || null,
          result_path: resultPath,
          builder_score: scores.builder,
          automation_score: scores.automation,
          data_score: scores.data,
          creative_score: scores.creative,
          growth_score: scores.growth,
          answers,
        }),
      });

      const body = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(body.detail || body.error || "Something went wrong.");
      }

      // Persist unlock state so refresh keeps content visible
      try {
        const key = `cc-unlocked-${resultPath}`;
        localStorage.setItem(key, "1");
        localStorage.setItem(`cc-name`, name.trim().split(" ")[0]);
      } catch {
        // localStorage may be unavailable in some browsers/privacy modes
      }

      setStatus("success");
      // Give them a beat to see the success state, then reveal
      setTimeout(() => onUnlocked(), 700);
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error ? err.message : "Something went wrong."
      );
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative max-w-2xl mx-auto"
    >
      {/* Lock icon floating above */}
      <motion.div
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 14,
          delay: 0.15,
        }}
        className="flex justify-center mb-6"
      >
        <div className="relative">
          <div className="absolute inset-0 rounded-2xl bg-indigo-500/30 blur-xl" />
          <div className="relative w-14 h-14 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-md flex items-center justify-center">
            <Lock size={22} className="text-white/90" />
          </div>
        </div>
      </motion.div>

      {/* Headline */}
      <div className="text-center mb-10">
        <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-zinc-500 mb-3">
          7 more things wait for you
        </p>
        <h2 className="text-3xl sm:text-5xl font-semibold tracking-[-0.025em] text-white leading-[1.05] mb-4">
          Unlock your{" "}
          <span className="bg-gradient-to-r from-indigo-300 via-violet-300 to-pink-300 bg-clip-text text-transparent">
            full diagnosis.
          </span>
        </h2>
        <p className="text-[15px] text-zinc-400 max-w-md mx-auto">
          The card is the surface. Your real result — and the plan to act on it
          — is below.
        </p>
      </div>

      {/* Unlock list + Form card */}
      <div
        className="rounded-3xl border border-white/10 overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(99,102,241,0.06) 0%, rgba(15,15,20,0.95) 70%)",
        }}
      >
        {/* Unlock checklist */}
        <div className="p-6 sm:p-8 border-b border-white/5">
          <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-zinc-500 mb-5">
            What you&apos;ll unlock
          </p>
          <ul className="space-y-3">
            {UNLOCKS.map((u, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 * i, duration: 0.3 }}
                className="flex items-start gap-4"
              >
                <div className="w-9 h-9 rounded-lg border border-white/10 bg-white/[0.03] flex items-center justify-center flex-shrink-0">
                  <u.icon size={15} className="text-indigo-300" />
                </div>
                <div className="flex-1 min-w-0 pt-1">
                  <p className="text-[14px] font-semibold text-white tracking-tight leading-tight">
                    {u.title}
                  </p>
                  <p className="text-[12px] text-zinc-500 leading-snug mt-0.5">
                    {u.sub}
                  </p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Form */}
        <div className="p-6 sm:p-8">
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-3"
              >
                <div className="w-12 h-12 mx-auto rounded-full bg-emerald-400/15 border border-emerald-400/30 flex items-center justify-center mb-3">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    className="text-emerald-300"
                  >
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="text-white font-semibold tracking-tight text-lg">
                  Unlocked.
                </p>
                <p className="text-zinc-500 text-[13px] mt-1">
                  Revealing your full diagnosis...
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="space-y-3"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="First name"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/[0.03] text-[14px] text-white placeholder:text-zinc-500 focus:outline-none focus:border-white/30 transition-colors"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/[0.03] text-[14px] text-white placeholder:text-zinc-500 focus:outline-none focus:border-white/30 transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <PhoneInput
                    country={country}
                    onCountryChange={setCountry}
                    number={phoneNumber}
                    onNumberChange={setPhoneNumber}
                    placeholder="Phone (optional)"
                  />
                  <input
                    type="text"
                    value={currentRole}
                    onChange={(e) => setCurrentRole(e.target.value)}
                    placeholder="Current role (optional)"
                    className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/[0.03] text-[14px] text-white placeholder:text-zinc-500 focus:outline-none focus:border-white/30 transition-colors"
                  />
                </div>

                {status === "error" && (
                  <p className="text-[13px] text-red-400 leading-snug">
                    {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading" || !name || !email}
                  className="group w-full flex items-center justify-center gap-2 py-3.5 rounded-lg bg-white text-black font-semibold text-[14px] transition-all hover:bg-zinc-100 disabled:opacity-40 disabled:cursor-not-allowed mt-1"
                  style={{
                    boxShadow: "0 10px 30px -10px rgba(255,255,255,0.25)",
                  }}
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 size={15} className="animate-spin" />
                      Unlocking...
                    </>
                  ) : (
                    <>
                      <Send size={14} />
                      Unlock my full diagnosis
                    </>
                  )}
                </button>

                <p className="text-[11px] text-zinc-600 text-center mt-2">
                  Free. No spam. Your card stays yours.
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
