"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function PageLoader() {
  const loaderRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const wipeRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(() => {
    try { return !!sessionStorage.getItem("bm_loaded"); } catch { return false; }
  });

  useEffect(() => {
    const loader = loaderRef.current;
    const counter = counterRef.current;
    const bar = barRef.current;
    const logo = logoRef.current;
    const wipe = wipeRef.current;
    if (!loader || !counter || !bar || !logo || !wipe) return;

    // Lock scroll during loading
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        try { sessionStorage.setItem("bm_loaded", "1"); } catch {}
        document.body.style.overflow = "";
        setDone(true);
      },
    });

    // Counter from 0 to 100
    const obj = { val: 0 };
    tl.to(obj, {
      val: 100,
      duration: 2.2,
      ease: "power2.inOut",
      onUpdate: () => {
        const v = Math.round(obj.val);
        counter.textContent = `${v}`;
        bar.style.width = `${v}%`;
      },
    });

    // Pause at 100 briefly
    tl.to({}, { duration: 0.3 });

    // Fade out counter and bar
    tl.to([counter, bar.parentElement], {
      opacity: 0,
      y: -20,
      duration: 0.4,
      ease: "power3.in",
    });

    // Logo pulse then scale up
    tl.to(
      logo,
      {
        scale: 1.1,
        duration: 0.2,
        ease: "power2.in",
      },
      "-=0.2"
    );

    tl.to(logo, {
      scale: 40,
      opacity: 0,
      duration: 0.8,
      ease: "power3.in",
    });

    // Wipe the entire loader away
    tl.to(
      wipe,
      {
        scaleY: 0,
        duration: 0.6,
        ease: "power4.inOut",
        transformOrigin: "top center",
      },
      "-=0.4"
    );

    // Final fade
    tl.to(loader, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.out",
    });

    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
  }, []);

  if (done) return null;

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[9998] flex items-center justify-center"
      style={{ background: "#050505" }}
    >
      {/* Background wipe layer */}
      <div
        ref={wipeRef}
        className="absolute inset-0"
        style={{ background: "#050505" }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-10">
        {/* Logo mark */}
        <div ref={logoRef} className="flex flex-col items-center gap-3">
          <span className="text-xl sm:text-2xl font-black tracking-[-0.04em] text-white">
            BRIDGEMARK
          </span>
          <span className="text-[10px] font-medium tracking-[0.3em] uppercase text-gray-600">
            Agency Marketplace
          </span>
        </div>

        {/* Counter */}
        <div className="flex flex-col items-center gap-4">
          <span
            ref={counterRef}
            className="text-5xl sm:text-7xl font-black tracking-[-0.04em] text-white tabular-nums"
          >
            0
          </span>

          {/* Progress bar */}
          <div className="w-48 sm:w-64 h-px bg-white/[0.08] overflow-hidden">
            <div
              ref={barRef}
              className="h-full bg-white"
              style={{ width: "0%" }}
            />
          </div>
        </div>
      </div>

      {/* Subtle corner accents */}
      <div className="absolute top-6 left-6 text-[10px] font-medium tracking-[0.2em] uppercase text-gray-700">
        Loading
      </div>
      <div className="absolute bottom-6 right-6 text-[10px] font-medium tracking-[0.2em] uppercase text-gray-700">
        EST. 2024
      </div>
    </div>
  );
}
