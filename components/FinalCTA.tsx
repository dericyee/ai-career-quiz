"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CalendarClock } from "lucide-react";
import { SIGMA_MEET_URL } from "@/lib/seo";

export default function FinalCTA() {
  return (
    <section className="relative py-24 bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 overflow-hidden">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <motion.div
          className="absolute top-10 left-10 w-72 h-72 rounded-full bg-pink-400 blur-3xl"
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-72 h-72 rounded-full bg-indigo-300 blur-3xl"
          animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative max-w-2xl mx-auto px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-5xl font-extrabold text-white mb-5 leading-[1.1] tracking-tight"
        >
          Two minutes.
          <br />
          One clear direction.
        </motion.h2>
        <p className="text-indigo-100 mb-8 text-lg">
          You&apos;ll know more about yourself than 10 self-help articles
          could&apos;ve told you.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/quiz"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-700 font-bold text-base rounded-2xl shadow-xl hover:shadow-2xl hover:scale-[1.03] transition-all duration-200 w-full sm:w-auto justify-center"
          >
            Take the quiz
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
          <a
            href={SIGMA_MEET_URL}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 px-7 py-4 border border-white/30 text-white font-semibold text-base rounded-2xl hover:bg-white/10 transition-all duration-200 w-full sm:w-auto justify-center"
          >
            <CalendarClock size={17} />
            Book a discovery call
          </a>
        </div>
        <p className="text-indigo-200 text-xs mt-5">
          No sign-up required to see your result.
        </p>
      </div>
    </section>
  );
}
