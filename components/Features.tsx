"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    tag: "Matching",
    title: "AI-Powered Matching",
    sub: "(soon)",
    description:
      "Our proprietary neural network analyzes millions of data points to find the perfect agency fit for your unique needs in seconds, not weeks.",
  },
  {
    tag: "Contracts",
    title: "Smart Contracts",
    sub: "(soon)",
    description:
      "Secure and transparent agreements powered by blockchain technology.",
  },
  {
    tag: "Quality",
    title: "Verified Quality",
    sub: "",
    description:
      "Every agency is rigorously vetted to ensure premium delivery standards.",
  },
  {
    tag: "Network",
    title: "Global Network",
    sub: "",
    description:
      "Access a decentralized network of specialists from over 40 countries, collaborating seamlessly through our platform.",
  },
];

export function Features() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

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

    itemRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.fromTo(
        el,
        { opacity: 0, y: 60, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: "power3.out",
          delay: i * 0.12,
          scrollTrigger: { trigger: section, start: "top 65%" },
        }
      );
    });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-20 sm:py-28 max-w-6xl px-4">
      {/* Heading */}
      <div ref={headingRef} className="flex flex-col gap-3 mb-14 sm:mb-20 opacity-0">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-gray-500">
          [Why BridgeMark]
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white light:text-gray-900 tracking-tight">
          Why Bridgemark?
        </h2>
        <p className="text-gray-400 text-base sm:text-lg max-w-xl mt-1">
          We bridge the gap between ambition and execution with a futuristic
          approach to agency matching.
        </p>
      </div>

      {/* Asymmetric bento grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Large card */}
        <div
          ref={(el) => { itemRefs.current[0] = el; }}
          className="opacity-0 col-span-1 md:col-span-7 border border-white/[0.06] light:border-black/[0.08] rounded-2xl p-8 sm:p-10 flex flex-col justify-between gap-8 group hover:border-white/[0.12] light:hover:border-black/[0.15] transition-colors duration-500 min-h-[240px]"
        >
          <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-primary/60">
            {features[0].tag}
          </p>
          <div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white light:text-gray-900 mb-3 group-hover:text-primary transition-colors duration-300">
              {features[0].title}{" "}
              {features[0].sub && (
                <span className="text-gray-400 text-lg font-normal">{features[0].sub}</span>
              )}
            </h3>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-lg">
              {features[0].description}
            </p>
          </div>
        </div>

        {/* Medium card */}
        <div
          ref={(el) => { itemRefs.current[1] = el; }}
          className="opacity-0 col-span-1 md:col-span-5 border border-white/[0.06] light:border-black/[0.08] rounded-2xl p-8 sm:p-10 flex flex-col justify-between gap-8 group hover:border-white/[0.12] light:hover:border-black/[0.15] transition-colors duration-500 min-h-[240px]"
        >
          <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-secondary-accent/60">
            {features[1].tag}
          </p>
          <div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white light:text-gray-900 mb-3 group-hover:text-secondary-accent transition-colors duration-300">
              {features[1].title}{" "}
              {features[1].sub && (
                <span className="text-gray-400 text-lg font-normal">{features[1].sub}</span>
              )}
            </h3>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              {features[1].description}
            </p>
          </div>
        </div>

        {/* Small card */}
        <div
          ref={(el) => { itemRefs.current[2] = el; }}
          className="opacity-0 col-span-1 md:col-span-4 border border-white/[0.06] light:border-black/[0.08] rounded-2xl p-8 sm:p-10 flex flex-col justify-between gap-8 group hover:border-white/[0.12] light:hover:border-black/[0.15] transition-colors duration-500 min-h-[200px]"
        >
          <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-primary/60">
            {features[2].tag}
          </p>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white light:text-gray-900 mb-2">
              {features[2].title}
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              {features[2].description}
            </p>
          </div>
        </div>

        {/* Wide card */}
        <div
          ref={(el) => { itemRefs.current[3] = el; }}
          className="opacity-0 col-span-1 md:col-span-8 border border-white/[0.06] light:border-black/[0.08] rounded-2xl p-8 sm:p-10 flex flex-col justify-between gap-8 group hover:border-white/[0.12] light:hover:border-black/[0.15] transition-colors duration-500 min-h-[200px]"
        >
          <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-secondary-accent/60">
            {features[3].tag}
          </p>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white light:text-gray-900 mb-2">
              {features[3].title}
            </h3>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-lg">
              {features[3].description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
