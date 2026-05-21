import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Career Compass — find what you're actually built for",
  description:
    "A 2-minute quiz that gives you a direction, not random advice. Earn your Career Identity Card.",
  openGraph: {
    title: "Career Compass — find what you're actually built for",
    description:
      "A 2-minute quiz. One direction. Earn your Career Identity Card.",
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
      <body className="min-h-full flex flex-col bg-[var(--bg)] text-[var(--fg)] font-sans">
        {children}
      </body>
    </html>
  );
}
