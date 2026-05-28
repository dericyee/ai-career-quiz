"use client";

import Link from "next/link";
import SigmaLogo from "./SigmaLogo";

const SIGMASCHOOL_URL = "https://sigmaschool.co";

interface SiteHeaderProps {
  showRetake?: boolean;
  showQuizMeta?: boolean;
}

export default function SiteHeader({ showRetake, showQuizMeta }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-white/5 bg-[var(--bg)]/80 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-5 py-3.5 flex items-center justify-between">
        <a
          href={SIGMASCHOOL_URL}
          target="_blank"
          rel="noreferrer"
          aria-label="Sigmaschool"
          className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <SigmaLogo href="" variant="compact-light" />
        </a>

        <div className="flex items-center gap-5 text-[12px]">
          {showQuizMeta && (
            <span className="text-zinc-500 font-medium hidden sm:inline tabular-nums">
              ESC to exit
            </span>
          )}
          {showRetake && (
            <Link
              href="/quiz"
              className="text-zinc-400 hover:text-white font-medium transition-colors"
            >
              ↻ Retake
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
