import Hero from "@/components/Hero";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import StorySection from "@/components/StorySection";
import ShareableQuote from "@/components/ShareableQuote";
import GlobalReach from "@/components/GlobalReach";
import FinalCTA from "@/components/FinalCTA";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <StorySection />
        <ShareableQuote />
        <GlobalReach />
        <FinalCTA />
        <SiteFooter />
      </main>
    </>
  );
}
