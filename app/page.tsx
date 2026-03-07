import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { Protocol } from "@/components/Protocol";
import { PartnerLogos } from "@/components/PartnerLogos";
import { Features } from "@/components/Features";
import { BothSides } from "@/components/BothSides";
import { FoundingPartners } from "@/components/FoundingPartners";
import { FeaturedAgencies } from "@/components/featured-agencies";
import { FAQ } from "@/components/FAQ";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { PageLoader } from "@/components/ui/PageLoader";

export default function Home() {
  return (
    <div className="w-full min-h-screen text-white light:text-gray-900 overflow-x-hidden bg-[var(--color-background-dark)] light:bg-[var(--color-background-light)]">
      <PageLoader />
      {/* Noise texture */}
      <div className="noise-overlay" />
      {/* Subtle dot grid */}
      <div className="fixed inset-0 pointer-events-none z-0 dot-grid opacity-15" />

      <Navbar />

      <main className="relative z-10 flex flex-col items-center w-full min-h-screen">
        <Hero />

        {/* Divider */}
        <div className="section-line w-full max-w-6xl" />

        <Stats />
        <Protocol />
        <PartnerLogos />
        <Features />
        <BothSides />
        <FoundingPartners />
        <FeaturedAgencies />
        <FAQ />
        <CTA />
      </main>

      <Footer />
    </div>
  );
}
