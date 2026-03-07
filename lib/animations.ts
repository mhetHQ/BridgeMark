"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Hook: reveal elements on scroll with staggered fade+slide
 * Attach ref to a parent container — all children with [data-animate] get animated
 */
export function useScrollReveal(options?: {
  y?: number;
  duration?: number;
  stagger?: number;
  start?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const els = ref.current.querySelectorAll("[data-animate]");
    if (!els.length) return;

    gsap.set(els, { opacity: 0, y: options?.y ?? 60 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ref.current,
        start: options?.start ?? "top 85%",
        once: true,
      },
    });

    tl.to(els, {
      opacity: 1,
      y: 0,
      duration: options?.duration ?? 0.8,
      stagger: options?.stagger ?? 0.12,
      ease: "power3.out",
    });

    return () => {
      tl.kill();
    };
  }, [options?.y, options?.duration, options?.stagger, options?.start]);

  return ref;
}

/**
 * Hook: split text into chars/words and animate them in
 */
export function useTextReveal() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const text = el.textContent || "";
    
    // Split into words
    const words = text.split(" ");
    el.innerHTML = words
      .map(
        (word) =>
          `<span class="inline-block overflow-hidden"><span class="inline-block translate-y-full">${word}</span></span>`
      )
      .join(
        `<span class="inline-block overflow-hidden"><span class="inline-block translate-y-full">&nbsp;</span></span>`
      );

    const spans = el.querySelectorAll(
      "span > span"
    ) as NodeListOf<HTMLSpanElement>;

    gsap.to(spans, {
      y: 0,
      duration: 0.7,
      stagger: 0.03,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        once: true,
      },
    });
  }, []);

  return ref;
}

/**
 * Hook: parallax element on scroll
 */
export function useParallax(speed: number = 0.3) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    gsap.to(ref.current, {
      y: () => speed * 100,
      ease: "none",
      scrollTrigger: {
        trigger: ref.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }, [speed]);

  return ref;
}

/**
 * Hook: horizontal scroll section pinned in place
 */
export function useHorizontalScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !trackRef.current) return;

    const track = trackRef.current;
    const scrollWidth = track.scrollWidth - window.innerWidth;

    const tween = gsap.to(track, {
      x: -scrollWidth,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: () => `+=${scrollWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    return () => {
      tween.kill();
    };
  }, []);

  return { containerRef, trackRef };
}

/**
 * Hook: magnetic hover effect for buttons/elements
 */
export function useMagnetic(strength: number = 0.3) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(el, {
        x: x * strength,
        y: y * strength,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.5)" });
    };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);

    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, [strength]);

  return ref;
}

/**
 * Hook: count-up animation for numbers
 */
export function useCountUp(
  target: number,
  options?: { duration?: number; suffix?: string; prefix?: string }
) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    const obj = { val: 0 };
    gsap.to(obj, {
      val: target,
      duration: options?.duration ?? 2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        once: true,
      },
      onUpdate: () => {
        el.textContent = `${options?.prefix ?? ""}${Math.round(obj.val)}${options?.suffix ?? ""}`;
      },
    });
  }, [target, options?.duration, options?.suffix, options?.prefix]);

  return ref;
}
