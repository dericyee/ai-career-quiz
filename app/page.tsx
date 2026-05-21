import Hero from "@/components/Hero";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import LandingManifesto from "@/components/LandingManifesto";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <LandingManifesto />
        <SiteFooter />
      </main>
    </>
  );
}
