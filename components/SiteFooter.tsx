import Link from "next/link";
import SigmaLogo from "./SigmaLogo";

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/5 py-10 px-5 bg-[var(--bg)]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <SigmaLogo
            href="https://sigmaschool.co"
            variant="compact-light"
          />
          <p className="text-[11px] text-zinc-500 mt-3 max-w-md">
            Modern AI software engineering bootcamp. Beginner to job-ready
            in 3 months. Job or 100% refund.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] text-zinc-500">
          <Link href="/quiz" className="hover:text-white transition-colors">
            Take the quiz
          </Link>
          <a
            href="https://sigmaschool.co"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors"
          >
            sigmaschool.co ↗
          </a>
          <span className="text-zinc-700">
            © {new Date().getFullYear()} Sigma School
          </span>
        </div>
      </div>
    </footer>
  );
}
