"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const foundingPartners = [
  { name: "Mhet Labs", tag: "Software Specialists", initials: "ML" },
  { name: "ZendFi", tag: "Smart Contracts", initials: "ZF" },
  { name: "Protocol Design", tag: "L1/L2 Architects", initials: "PD" },
  { name: "Shield Web3", tag: "Security Auditing", initials: "SW" },
];

export function FoundingPartners() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 80%" },
      }
    );

    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      gsap.fromTo(
        card,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: i * 0.12,
          scrollTrigger: { trigger: section, start: "top 70%" },
        }
      );
    });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full max-w-6xl px-4 py-20 sm:py-28">
      <div ref={headingRef} className="flex flex-col gap-3 mb-14 sm:mb-20 opacity-0">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-gray-500">
          [Partners]
        </p>
        <h2 className="text-3xl sm:text-4xl font-black text-white light:text-gray-900 tracking-tight">
          Founding Partners
        </h2>
        <p className="text-gray-400 text-sm sm:text-base max-w-md mt-1">
          World-class studios setting the standard for Web3 excellence.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.06] light:bg-black/[0.08] rounded-2xl overflow-hidden">
        {foundingPartners.map((partner, i) => (
          <div
            key={partner.name}
            ref={(el) => { cardRefs.current[i] = el; }}
            className="opacity-0 bg-[var(--color-background-dark)] light:bg-[var(--color-background-light)] p-7 sm:p-8 flex flex-col items-center text-center gap-4 group hover:bg-white/[0.02] light:hover:bg-black/[0.02] transition-colors duration-500"
          >
            <div className="size-14 sm:size-16 rounded-full border border-white/[0.08] light:border-black/[0.1] flex items-center justify-center text-white light:text-gray-900 text-lg sm:text-xl font-bold tracking-tight group-hover:border-primary/30 group-hover:text-primary transition-all duration-300">
              {partner.initials}
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <h4 className="text-white light:text-gray-900 font-bold text-sm sm:text-base">
                {partner.name}
              </h4>
              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-gray-500">
                {partner.tag}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
