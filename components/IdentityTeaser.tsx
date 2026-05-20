"use client";

import { motion } from "framer-motion";
import {
  Compass,
  HeartHandshake,
  Target,
  Sparkles,
} from "lucide-react";

const ITEMS = [
  {
    icon: Compass,
    title: "Feeling stuck?",
    body: "You know you want something different — you just don't know what direction to go in.",
    color: "bg-indigo-50 text-indigo-600",
  },
  {
    icon: HeartHandshake,
    title: "Tired of generic advice?",
    body: "Most career advice is written for someone else's life. This one is built for yours.",
    color: "bg-pink-50 text-pink-600",
  },
  {
    icon: Sparkles,
    title: "Curious about AI?",
    body: "AI is reshaping work. We'll show you where you fit — not which trend to chase.",
    color: "bg-amber-50 text-amber-600",
  },
  {
    icon: Target,
    title: "Want clarity?",
    body: "By the end, you'll have one specific path, one project, and one first step.",
    color: "bg-emerald-50 text-emerald-600",
  },
];

export default function IdentityTeaser() {
  return (
    <section className="py-20 bg-white relative">
      <div className="max-w-5xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 max-w-2xl mx-auto"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-indigo-500 mb-3">
            Made for one kind of person
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">
            Someone at a crossroads.
          </h2>
          <p className="text-slate-600 text-base">
            You don&apos;t need another listicle. You need a clearer picture of
            yourself.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {ITEMS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              whileHover={{ y: -4 }}
              className="group bg-white border border-slate-200 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-100/40 rounded-2xl p-6 transition-all"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-11 h-11 rounded-xl ${item.color} flex items-center justify-center flex-shrink-0`}
                >
                  <item.icon size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.body}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
