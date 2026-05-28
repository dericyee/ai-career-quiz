import type { NextConfig } from "next";

/**
 * basePath makes every page, /_next asset, and /api route live under
 * /ai-career-quiz — so the parent zone (sigmaschool-web) can proxy the whole
 * app at sigmaschool.co/ai-career-quiz with a single `/ai-career-quiz/:path*`
 * rewrite. Subfolder (not subdomain) consolidates SEO equity onto the main
 * domain.
 */
const nextConfig: NextConfig = {
  basePath: "/ai-career-quiz",
};

export default nextConfig;
