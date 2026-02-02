import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { Features } from "@/components/Features";
import { FeaturedAgencies } from "@/components/featured-agencies";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="dark w-full min-h-screen bg-black text-white overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none z-0 dot-grid opacity-20" />
      <div className="fixed inset-0 pointer-events-none z-0 bg-mesh-pattern" />
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-secondary-accent/20 blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[120px] pointer-events-none z-0" />

      <Navbar />

      <main className="relative z-10 flex flex-col items-center w-full min-h-screen pt-32 pb-20 px-4 md:px-10 max-w-[1440px] mx-auto">
        <Hero />
        <Stats />
        <Features />
        <FeaturedAgencies />
      </main>

      <Footer />
    </div>
  );
}
