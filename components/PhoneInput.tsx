"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search } from "lucide-react";
import { COUNTRIES, Country } from "@/lib/countries";
import { cn } from "@/lib/utils";

interface PhoneInputProps {
  country: Country;
  onCountryChange: (c: Country) => void;
  number: string;
  onNumberChange: (n: string) => void;
  placeholder?: string;
  required?: boolean;
}

export default function PhoneInput({
  country,
  onCountryChange,
  number,
  onNumberChange,
  placeholder = "Phone number",
  required = false,
}: PhoneInputProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Reset + focus search when the dropdown opens.
  useEffect(() => {
    if (open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setQuery("");
      setTimeout(() => searchRef.current?.focus(), 50);
    }
  }, [open]);

  const filtered = query.trim()
    ? COUNTRIES.filter((c) => {
        const q = query.toLowerCase().trim();
        return (
          c.name.toLowerCase().includes(q) ||
          c.dial.includes(q) ||
          c.iso.toLowerCase().includes(q)
        );
      })
    : COUNTRIES;

  return (
    <div ref={ref} className="relative">
      <div className="flex items-stretch rounded-lg border border-white/10 bg-white/[0.03] focus-within:border-white/30 transition-colors overflow-hidden">
        {/* Country trigger */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-1.5 pl-3 pr-2 text-[14px] text-white hover:bg-white/[0.04] transition-colors border-r border-white/10"
          aria-label="Select country code"
        >
          <span className="text-[16px] leading-none" aria-hidden>
            {country.flag}
          </span>
          <span className="font-mono tabular-nums text-zinc-300 text-[13px]">
            {country.dial}
          </span>
          <ChevronDown
            size={13}
            className={cn(
              "text-zinc-500 transition-transform",
              open && "rotate-180"
            )}
          />
        </button>

        {/* Number input */}
        <input
          type="tel"
          inputMode="numeric"
          value={number}
          onChange={(e) => onNumberChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          className="flex-1 px-3 py-3 bg-transparent text-[14px] text-white placeholder:text-zinc-500 focus:outline-none"
        />
      </div>

      {/* Popover */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.12 }}
            className="absolute z-50 mt-2 left-0 right-0 sm:right-auto sm:w-80 rounded-xl border border-white/10 bg-[#0e0e12] shadow-2xl overflow-hidden"
            style={{
              boxShadow:
                "0 24px 60px -12px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)",
            }}
          >
            {/* Search */}
            <div className="flex items-center gap-2 px-3 py-2.5 border-b border-white/5">
              <Search size={13} className="text-zinc-500 flex-shrink-0" />
              <input
                ref={searchRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search country or code"
                className="flex-1 bg-transparent text-[13px] text-white placeholder:text-zinc-600 focus:outline-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="text-[11px] text-zinc-500 hover:text-zinc-300"
                >
                  Clear
                </button>
              )}
            </div>

            {/* List */}
            <ul className="max-h-72 overflow-y-auto py-1">
              {filtered.length === 0 ? (
                <li className="px-3 py-4 text-[13px] text-zinc-500 text-center">
                  No match
                </li>
              ) : (
                filtered.map((c) => {
                  const selected = c.iso === country.iso;
                  return (
                    <li key={c.iso}>
                      <button
                        type="button"
                        onClick={() => {
                          onCountryChange(c);
                          setOpen(false);
                        }}
                        className={cn(
                          "w-full flex items-center gap-3 px-3 py-2 text-left text-[13px] transition-colors",
                          selected
                            ? "bg-white/[0.06] text-white"
                            : "text-zinc-300 hover:bg-white/[0.04] hover:text-white"
                        )}
                      >
                        <span className="text-[15px] leading-none" aria-hidden>
                          {c.flag}
                        </span>
                        <span className="flex-1 truncate">{c.name}</span>
                        <span className="text-zinc-500 font-mono tabular-nums text-[12px]">
                          {c.dial}
                        </span>
                      </button>
                    </li>
                  );
                })
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
