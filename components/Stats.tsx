"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 5, suffix: "+", label: "Vetted Agencies" },
  { value: 10, suffix: "+", label: "Projects Delivered" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
];

export function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
    // Animate the entire section in
    gsap.fromTo(
      section,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
        },
      }
    );

    // Animate each counter
    stats.forEach((stat, i) => {
      const el = counterRefs.current[i];
      if (!el) return;

      gsap.fromTo(
        { val: 0 },
        { val: stat.value },
        {
          val: stat.value,
          duration: 2.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
          },
          delay: i * 0.25,
          onUpdate: function () {
            const current = Math.round(this.targets()[0].val);
            el.textContent = `${current}${stat.suffix}`;
          },
        }
      );
    });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full max-w-6xl px-4 py-16 sm:py-20 opacity-0"
    >
      <div className="flex flex-col sm:flex-row items-stretch justify-between gap-8 sm:gap-0">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={`flex-1 flex flex-col items-center text-center gap-2 ${
              i < stats.length - 1
                ? "sm:border-r sm:border-white/[0.06] light:sm:border-black/[0.08]"
                : ""
            }`}
          >
            <span
              ref={(el) => { counterRefs.current[i] = el; }}
              className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white light:text-gray-900"
            >
              0{stat.suffix}
            </span>
            <span className="text-xs sm:text-sm font-medium uppercase tracking-[0.2em] text-gray-400">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
