"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: "How are agencies vetted?",
    answer:
      "Our vetting process includes deep technical audits, background checks on key stakeholders, and a review of past project milestones and delivery success rates.",
  },
  {
    question: "Is there a fee to use the platform?",
    answer:
      "BridgeMark is free to browse. A small success fee is charged only when a partnership is successfully matched and contracts are executed — no upfront costs.",
  },
  {
    question: "How does the escrow system work?",
    answer:
      "Funds are locked in a ZendFi smart contract at the start of the engagement. Payments are released in milestones only when both parties confirm deliverables have been met, ensuring accountability on both sides.",
  },
  {
    question: "What types of projects are supported?",
    answer:
      "BridgeMark supports the full spectrum of Web3 projects — from DeFi protocol development and NFT platforms to marketing campaigns, community growth, and Layer 1/2 architecture.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
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
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          delay: i * 0.1,
          scrollTrigger: { trigger: section, start: "top 70%" },
        }
      );
    });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full max-w-6xl px-4 py-20 sm:py-28">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        {/* Left heading */}
        <div ref={headingRef} className="lg:col-span-4 flex flex-col gap-3 opacity-0">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-gray-500">
            [FAQ]
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-white light:text-gray-900 tracking-tight">
            Common Questions
          </h2>
          <p className="text-gray-400 text-sm sm:text-base mt-1">
            Everything you need to know before getting started.
          </p>
        </div>

        {/* Right accordion */}
        <div className="lg:col-span-8 flex flex-col">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;

            return (
              <div
                key={faq.question}
                ref={(el) => { itemRefs.current[i] = el; }}
                className="opacity-0 border-b border-white/[0.06] light:border-black/[0.08] last:border-b-0"
              >
                <button
                  className="flex w-full items-center justify-between text-left gap-4 py-6 group"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                >
                  <span className="text-white light:text-gray-900 font-semibold text-sm sm:text-base group-hover:text-primary transition-colors duration-300">
                    {faq.question}
                  </span>
                  <span
                    className={`shrink-0 text-gray-400 text-xl transition-transform duration-300 ${
                      isOpen ? "rotate-45" : "rotate-0"
                    }`}
                  >
                    +
                  </span>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isOpen ? "max-h-48 opacity-100 pb-6" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
