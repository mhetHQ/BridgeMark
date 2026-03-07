"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const startupBullets = [
  "Access a pool of ruthlessly vetted Founding Partner agencies",
  "Verify on-chain ROI before signing a single contract",
  "Milestone escrows mean you only pay for delivered results",
  "Structured scopes protect your IP and timeline",
];

const agencyBullets = [
  "Smart-contract escrows eliminate payment risk entirely",
  "Work with founders who are serious and funded",
  "Clear deliverables prevent scope creep and disputes",
  "Founding Partner status signals elite credibility",
];

export function BothSides() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

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

    gsap.fromTo(
      leftRef.current,
      { opacity: 0, x: -60 },
      {
        opacity: 1,
        x: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 70%" },
      }
    );

    gsap.fromTo(
      rightRef.current,
      { opacity: 0, x: 60 },
      {
        opacity: 1,
        x: 0,
        duration: 0.9,
        ease: "power3.out",
        delay: 0.2,
        scrollTrigger: { trigger: section, start: "top 70%" },
      }
    );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full max-w-6xl px-4 py-20 sm:py-28">
      {/* Heading */}
      <div ref={headingRef} className="flex flex-col gap-3 mb-14 sm:mb-20 opacity-0">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-gray-500">
          [Built for Both]
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white light:text-gray-900">
          Built for Both Sides
        </h2>
        <p className="text-gray-400 text-base sm:text-lg max-w-xl mt-1">
          Whether you&apos;re building or executing — BridgeMark has your back.
        </p>
      </div>

      {/* Two columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Startups */}
        <div
          ref={leftRef}
          className="opacity-0 border border-white/[0.06] light:border-black/[0.08] rounded-2xl p-8 sm:p-10 flex flex-col gap-6 group hover:border-primary/20 transition-colors duration-500"
        >
          <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-primary">
            For Startups
          </span>
          <h3 className="text-white light:text-gray-900 text-2xl sm:text-3xl font-bold leading-snug">
            Ship with confidence
          </h3>
          <ul className="flex flex-col gap-4">
            {startupBullets.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <span className="mt-2 w-1 h-1 shrink-0 rounded-full bg-primary" />
                <span className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  {point}
                </span>
              </li>
            ))}
          </ul>
          <Link
            href="/agencies"
            className="self-start text-sm font-semibold text-white light:text-gray-900 hover:text-primary transition-colors mt-auto pt-4 border-t border-white/[0.06] light:border-black/[0.08] w-full"
          >
            Find an Agency →
          </Link>
        </div>

        {/* Agencies */}
        <div
          ref={rightRef}
          className="opacity-0 border border-white/[0.06] light:border-black/[0.08] rounded-2xl p-8 sm:p-10 flex flex-col gap-6 group hover:border-secondary-accent/20 transition-colors duration-500"
        >
          <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-secondary-accent">
            For Agencies
          </span>
          <h3 className="text-white light:text-gray-900 text-2xl sm:text-3xl font-bold leading-snug">
            Get paid, guaranteed
          </h3>
          <ul className="flex flex-col gap-4">
            {agencyBullets.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <span className="mt-2 w-1 h-1 shrink-0 rounded-full bg-secondary-accent" />
                <span className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  {point}
                </span>
              </li>
            ))}
          </ul>
          <Link
            href="/agency-application"
            className="self-start text-sm font-semibold text-white light:text-gray-900 hover:text-secondary-accent transition-colors mt-auto pt-4 border-t border-white/[0.06] light:border-black/[0.08] w-full"
          >
            Apply as Partner →
          </Link>
        </div>
      </div>
    </section>
  );
}
