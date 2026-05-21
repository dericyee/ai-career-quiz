"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, Loader2 } from "lucide-react";
import { PathKey, Scores } from "@/lib/quiz";

interface LeadCaptureFormProps {
  resultPath: PathKey;
  scores: Scores;
  answers: number[];
}

export default function LeadCaptureForm({
  resultPath,
  scores,
  answers,
}: LeadCaptureFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [currentRole, setCurrentRole] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          whatsapp: whatsapp.trim() || null,
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

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Something went wrong.");
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    }
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-7">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-6"
          >
            <div className="w-12 h-12 rounded-full border border-emerald-400/30 bg-emerald-400/10 flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={22} className="text-emerald-400" />
            </div>
            <h3 className="text-xl font-semibold text-white tracking-tight mb-2">
              You&apos;re in.
            </h3>
            <p className="text-[14px] text-zinc-400">
              Bookmark this page — your card lives here.
            </p>
          </motion.div>
        ) : (
          <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <h3 className="text-xl font-semibold text-white tracking-tight mb-2">
              Get the full roadmap.
            </h3>
            <p className="text-[13px] text-zinc-400 mb-6">
              We&apos;ll send the skills, projects, and next steps for your archetype.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
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
                <input
                  type="tel"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="WhatsApp (optional)"
                  className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/[0.03] text-[14px] text-white placeholder:text-zinc-500 focus:outline-none focus:border-white/30 transition-colors"
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
                <p className="text-[13px] text-red-400">{errorMsg}</p>
              )}

              <button
                type="submit"
                disabled={status === "loading" || !name || !email}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-white text-black font-semibold text-[14px] transition-all hover:bg-zinc-100 disabled:opacity-40 disabled:cursor-not-allowed mt-1"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 size={15} className="animate-spin" />
                    Saving…
                  </>
                ) : (
                  <>
                    <Send size={14} />
                    Send my roadmap
                  </>
                )}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
