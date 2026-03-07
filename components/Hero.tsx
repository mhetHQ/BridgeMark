"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const FloatingLines = dynamic(() => import("@/components/ui/FloatingLines"), {
  ssr: false,
});

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    tl.fromTo(
      badgeRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
    )
      .fromTo(
        headingRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" },
        "-=0.3"
      )
      .fromTo(
        subRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
        "-=0.5"
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        "-=0.3"
      );

    return () => { tl.kill(); };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full flex flex-col items-center justify-center text-center relative min-h-screen"
    >
      {/* Floating Lines Background */}
      <div className="absolute inset-0 z-0 opacity-[0.38]">
        <FloatingLines
          linesGradient={["#00F0FF", "#BD00FF", "#00F0FF"]}
          enabledWaves={["top", "middle", "bottom"]}
          lineCount={[8, 10, 6]}
          lineDistance={[4, 5, 6]}
          animationSpeed={0.8}
          interactive={true}
          bendRadius={5.0}
          bendStrength={-0.5}
          parallax={true}
          parallaxStrength={0.2}
        />
      </div>

      {/* Subtle radial fade at edges */}
      <div className="absolute inset-0 z-[1] pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_30%,var(--color-background-dark)_80%)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 z-[1] pointer-events-none bg-linear-to-t from-[var(--color-background-dark)] light:from-[var(--color-background-light)] to-transparent" />

      {/* Content */}
      <div className="max-w-5xl flex flex-col gap-6 sm:gap-8 items-center px-4 z-[2]">
        <div
          ref={badgeRef}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.08] light:border-black/[0.1] backdrop-blur-md opacity-0"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
          <span className="text-[10px] sm:text-xs font-medium tracking-[0.2em] uppercase text-gray-400">
            Web3 Agency Marketplace
          </span>
        </div>

        <h1
          ref={headingRef}
          className="text-white light:text-gray-900 text-3xl sm:text-4xl md:text-5xl lg:text-[4.2rem] font-black leading-[1.05] tracking-[-0.03em] opacity-0 max-w-4xl"
        >
          The curated marketplace
          <br className="hidden sm:block" />
          for{" "}
          <span className="text-secondary">development</span>
          {" "}agencies
        </h1>

        <p
          ref={subRef}
          className="text-gray-400 text-base sm:text-lg md:text-xl font-normal leading-relaxed max-w-xl mx-auto opacity-0"
        >
          Replacing vibes with structure. Vetted excellence, clear scopes,
          milestone-based collaboration.
        </p>

        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row gap-4 mt-8 sm:mt-12 w-full justify-center opacity-0"
        >
          <Link
            href="/get-matched"
            className="group flex w-full sm:w-auto items-center justify-center rounded-full h-12 sm:h-13 px-7 sm:px-9 bg-white text-black text-sm sm:text-base font-semibold hover:scale-[1.03] transition-transform duration-300"
          >
            Get Matched
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ml-2 group-hover:translate-x-1 transition-transform"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>

          <Link
            href="/agencies"
            className="flex w-full sm:w-auto items-center justify-center rounded-full h-12 sm:h-13 px-7 sm:px-9 border border-white/10 light:border-black/15 text-white light:text-gray-900 text-sm sm:text-base font-medium hover:border-white/25 light:hover:border-black/25 transition-colors duration-300"
          >
            View Agencies
          </Link>
        </div>
      </div>
    </section>
  );
}