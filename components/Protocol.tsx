"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    title: "Vetting",
    description:
      "Rigorous auditing of technical stack, past delivery performance, and financial stability.",
  },
  {
    number: "02",
    title: "Matching",
    description:
      "Algorithmic pairing based on your specific project requirements and agency specialization.",
  },
  {
    number: "03",
    title: "Escrow Setup",
    description:
      "On-chain milestone deployment via ZendFi ensures capital is only released upon delivery.",
  },
  {
    number: "04",
    title: "Delivery",
    description:
      "Transparent project management with verified deliverables and final fund release.",
  },
];

export function Protocol() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
    // Heading
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

    // Cards — staggered
    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      gsap.fromTo(
        card,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: i * 0.15,
          scrollTrigger: { trigger: section, start: "top 70%" },
        }
      );
    });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full py-20 sm:py-28 max-w-6xl px-4 relative"
    >
      {/* Heading */}
      <div ref={headingRef} className="flex flex-col gap-3 mb-14 sm:mb-20 opacity-0">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-gray-500">
          [Process]
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white light:text-gray-900 tracking-tight leading-[1.1]">
          The BridgeMark Protocol
        </h2>
        <p className="text-gray-400 text-base sm:text-lg max-w-xl mt-1">
          A standardized framework for high-stakes Web3 collaborations.
        </p>
      </div>

      {/* Steps */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.06] light:bg-black/[0.08] rounded-2xl overflow-hidden">
        {steps.map((step, i) => (
          <div
            key={step.number}
            ref={(el) => { cardsRef.current[i] = el; }}
            className="opacity-0 bg-[var(--color-background-dark)] light:bg-[var(--color-background-light)] p-7 sm:p-8 flex flex-col gap-5 group hover:bg-white/[0.02] light:hover:bg-black/[0.02] transition-colors duration-500"
          >
            <span className="text-4xl sm:text-5xl font-black text-white/[0.06] light:text-black/[0.06] leading-none select-none">
              {step.number}
            </span>
            <h3 className="text-white light:text-gray-900 text-lg sm:text-xl font-bold group-hover:text-primary transition-colors duration-300">
              {step.title}
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
