import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "What Career Path Should You Consider in the AI Era? | Free Quiz",
  description:
    "Find out whether you're best suited for building software, automating workflows, working with data, creating with AI, or growing digital businesses. Free 2-minute career quiz.",
  openGraph: {
    title: "What Career Path Should You Consider in the AI Era?",
    description:
      "Discover your best-fit AI-era skill path. Takes 2 minutes. No degree or coding experience needed.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white font-sans">{children}</body>
    </html>
  );
}
