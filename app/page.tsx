import Hero from "@/components/Hero";
import IdentityTeaser from "@/components/IdentityTeaser";
import PathPreview from "@/components/PathPreview";
import FinalCTA from "@/components/FinalCTA";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <IdentityTeaser />
        <PathPreview />
        <FinalCTA />
        <SiteFooter />
      </main>
    </>
  );
}
