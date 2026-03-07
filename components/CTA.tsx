"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 60, scale: 0.97 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 75%" },
      }
    );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full max-w-6xl px-4 py-20 sm:py-28">
      <div
        ref={contentRef}
        className="opacity-0 border border-white/[0.06] light:border-black/[0.08] rounded-2xl p-12 sm:p-16 lg:p-20 flex flex-col items-center text-center gap-8"
      >
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white light:text-gray-900 leading-[1.1] tracking-tight max-w-3xl">
          Ready to build something professional?
        </h2>
        <p className="text-gray-400 text-base sm:text-lg max-w-xl leading-relaxed">
          Stop relying on vibes. Get matched with a vetted agency that
          guarantees milestones and respects your timeline.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4 w-full max-w-sm sm:max-w-none">
          <Link
            href="/get-matched"
            className="group flex w-full sm:w-auto items-center justify-center rounded-full h-12 sm:h-13 px-8 sm:px-10 bg-white text-black text-sm sm:text-base font-semibold hover:scale-[1.03] transition-transform duration-300"
          >
            Find Agency
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
            href="/agency-application"
            className="flex w-full sm:w-auto items-center justify-center rounded-full h-12 sm:h-13 px-8 sm:px-10 border border-white/10 text-white text-sm sm:text-base font-medium hover:border-white/25 transition-colors duration-300"
          >
            Become a Partner
          </Link>
        </div>
      </div>
    </section>
  );
}
