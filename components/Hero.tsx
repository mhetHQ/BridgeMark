"use client";

import dynamic from "next/dynamic";

const FloatingLines = dynamic(() => import("@/components/ui/FloatingLines"), {
  ssr: false,
});

export function Hero() {
  return (
    <section className="w-full flex flex-col items-center justify-center text-center py-10 md:py-24 relative min-h-[90vh] bg-secondary-accent/5">
      <div className="absolute inset-0 z-[-1] overflow-hidden">
        <FloatingLines
          enabledWaves={["top", "middle", "bottom"]}
          lineCount={5}
          lineDistance={5}
          bendRadius={5}
          bendStrength={-0.5}
          interactive={true}
          parallax={true}
          linesGradient={["#00F0FF", "#00C8FF", "#8B00FF", "#BD00FF"]}
        />
        {/* Smooth blending gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-background-dark via-transparent to-transparent opacity-60" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background-dark to-transparent" />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background-dark to-transparent" />
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background-dark to-transparent" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background-dark to-transparent" />
      </div>

      <div className="max-w-5xl flex flex-col gap-6 sm:gap-8 items-center px-4">
        <div className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-2 shadow-[0_0_20px_rgba(0,0,0,0.5)] animate-fade-in-down">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(0,240,255,1)]" />
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase text-gray-300">
            Web3 Ready Marketplace
          </span>
        </div>

        <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-[1.1] tracking-[-0.03em] drop-shadow-2xl animate-fade-in-up px-2">
          The curated marketplace for marketing agencies
        </h1>

        <p className="text-gray-400 text-base sm:text-lg md:text-xl font-normal leading-relaxed max-w-2xl mx-auto animate-fade-in-up animation-delay-200 px-2">
          Connect with top-tier talent vetted by industry leaders. Experience
          the future of agency partnerships with smart contracts and AI
          matching.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 mt-6 sm:mt-10 w-full justify-center animate-fade-in-up animation-delay-400 px-2">
          <button className="group flex w-full sm:w-auto sm:min-w-[200px] cursor-pointer items-center justify-center rounded-full h-12 sm:h-14 px-6 sm:px-8 bg-white backdrop-blur-3xl hover:bg-right transition-all duration-500 text-black text-base sm:text-lg font-bold">
            <span className="relative z-10 flex items-center gap-2">
              Get Matched
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20"
                viewBox="0 -960 960 960"
                width="20"
                fill="currentColor"
                className="group-hover:translate-x-1 transition-transform"
              >
                <path d="m422-232 207-248H469l29-227-185 267h139l-30 208Z" />
              </svg>
            </span>
          </button>

          <button className="flex w-full sm:w-auto sm:min-w-[200px] cursor-pointer items-center justify-center rounded-full h-12 sm:h-14 px-6 sm:px-8 bg-black/40 hover:bg-white/10 border border-white/20 text-white text-base sm:text-lg font-medium backdrop-blur-md transition-all hover:border-primary/50 hover:shadow-[0_0_20px_rgba(0,240,255,0.15)] hover:-translate-y-1">
            <span>View Agencies</span>
          </button>
        </div>
      </div>
    </section>
  );
}
