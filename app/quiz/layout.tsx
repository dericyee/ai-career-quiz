import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Take the AI Career Quiz",
  description:
    "10 quick questions to reveal your AI-era career archetype, a personalised income projection, and a 30-day starter plan.",
  alternates: { canonical: `${SITE_URL}/quiz` },
};

export default function QuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
