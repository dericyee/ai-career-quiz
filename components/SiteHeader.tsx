"use client";

import Link from "next/link";
import SigmaLogo from "./SigmaLogo";
import { ExternalLink } from "lucide-react";

interface SiteHeaderProps {
  showRetake?: boolean;
  showQuizMeta?: boolean;
}

export default function SiteHeader({ showRetake, showQuizMeta }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-100 bg-white/85 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 py-3.5 flex items-center justify-between">
        <Link href="/" className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity">
          <SigmaLogo href="" variant="compact" />
        </Link>

        <div className="flex items-center gap-4">
          {showQuizMeta && (
            <span className="text-xs text-slate-400 font-medium hidden sm:inline">
              Free · 2 min
            </span>
          )}
          {showRetake && (
            <Link
              href="/quiz"
              className="text-xs sm:text-sm text-slate-600 hover:text-slate-900 font-medium transition-colors"
            >
              Retake quiz
            </Link>
          )}
          <a
            href="https://sigmaschool.co"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-1 text-xs text-slate-500 hover:text-indigo-600 font-medium transition-colors"
          >
            sigmaschool.co
            <ExternalLink size={11} />
          </a>
        </div>
      </div>
    </header>
  );
}
