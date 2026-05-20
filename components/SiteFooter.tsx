import { ExternalLink } from "lucide-react";
import SigmaLogo from "./SigmaLogo";

export default function SiteFooter() {
  return (
    <footer className="bg-slate-950 text-slate-300 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
          <div>
            <SigmaLogo
              href="https://sigmaschool.co"
              variant="compact"
              className="[&_img]:brightness-0 [&_img]:invert"
            />
            <p className="text-xs text-slate-500 mt-2 max-w-md">
              Modern AI software engineering bootcamp · From beginner to
              job-ready in 3 months.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs">
            <a
              href="https://sigmaschool.co"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-slate-300 hover:text-white transition-colors"
            >
              sigmaschool.co
              <ExternalLink size={11} />
            </a>
            <a href="/quiz" className="text-slate-400 hover:text-white transition-colors">
              Take the quiz
            </a>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-[11px] text-slate-500">
            © {new Date().getFullYear()} Sigma School · AI-era career compass
          </p>
          <p className="text-[10px] text-slate-600 max-w-2xl text-right">
            Sources: U.S. Bureau of Labor Statistics · a16z · Stack Overflow
            Developer Survey 2025 · NoCSDegree.com
          </p>
        </div>
      </div>
    </footer>
  );
}
