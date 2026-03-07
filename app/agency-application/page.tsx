"use client";

import { useState, Suspense, useRef, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ApplicationProvider, useApplication, ApplicationStep } from "@/lib/context/ApplicationContext";
import { AgencyDetailsStep } from "@/components/agency-application/AgencyDetailsStep";
import { PortfolioStep } from "@/components/agency-application/PortfolioStep";
import { PricingStep } from "@/components/agency-application/PricingStep";
import { PaymentStep } from "@/components/agency-application/PaymentStep";
import { SuccessStep } from "@/components/agency-application/SuccessStep";
import gsap from "gsap";

const steps = [
  { id: 1 as ApplicationStep, title: "Agency Details", shortTitle: "Details" },
  { id: 2 as ApplicationStep, title: "Portfolio & Services", shortTitle: "Portfolio" },
  { id: 3 as ApplicationStep, title: "Pricing", shortTitle: "Pricing" },
  { id: 4 as ApplicationStep, title: "Payment", shortTitle: "Payment" },
];

function StepIndicator() {
  const { currentStep, setCurrentStep, isStepComplete } = useApplication();

  return (
    <div className="w-full max-w-3xl mx-auto mb-14">
      <div className="flex items-center justify-between relative">
        {/* Progress line background */}
        <div className="absolute top-4 left-0 right-0 h-px bg-white/[0.06]" />

        {/* Progress line filled */}
        <div
          className="absolute top-4 left-0 h-px bg-white transition-all duration-500"
          style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        />

        {steps.map((step) => {
          const isActive = currentStep === step.id;
          const isCompleted = currentStep > step.id || isStepComplete(step.id);
          const canClick = step.id <= currentStep || isStepComplete(step.id - 1 as ApplicationStep);

          return (
            <button
              key={step.id}
              onClick={() => canClick && setCurrentStep(step.id)}
              disabled={!canClick}
              className={`relative z-10 flex flex-col items-center gap-2.5 transition-all ${
                canClick ? "cursor-pointer" : "cursor-not-allowed"
              }`}
            >
              <div
                className={`w-8 h-8 flex items-center rounded-full justify-center text-xs font-semibold transition-all duration-300 border ${
                  isActive
                    ? "bg-white text-black border-white"
                    : isCompleted
                    ? "bg-white text-black border-white"
                    : "bg-[var(--color-background-dark)] text-gray-600 border-white/[0.1]"
                }`}
              >
                {isCompleted && !isActive ? (
                  <span>&#10003;</span>
                ) : (
                  `0${step.id}`
                )}
              </div>
              <span
                className={`text-[10px] font-medium tracking-[0.15em] uppercase hidden md:block ${
                  isActive ? "text-white" : isCompleted ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {step.shortTitle}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ApplicationContent() {
  const { currentStep } = useApplication();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedSlug, setSubmittedSlug] = useState<string | null>(null);

  if (isSubmitted && submittedSlug) {
    return <SuccessStep slug={submittedSlug} />;
  }

  return (
    <>
      <StepIndicator />

      <div className="w-full max-w-4xl mx-auto">
        {currentStep === 1 && <AgencyDetailsStep />}
        {currentStep === 2 && <PortfolioStep />}
        {currentStep === 3 && <PricingStep />}
        {currentStep === 4 && (
          <Suspense fallback={
            <div className="border border-white/[0.06] p-8 md:p-10 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-white/10 border-t-white rounded-full animate-spin" />
            </div>
          }>
            <PaymentStep
              onSuccess={(slug) => {
                setSubmittedSlug(slug);
                setIsSubmitted(true);
              }}
            />
          </Suspense>
        )}
      </div>
    </>
  );
}

export default function AgencyApplicationPage() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;
    const els = heroRef.current.querySelectorAll("[data-hero]");
    gsap.fromTo(
      els,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power3.out" }
    );
  }, []);

  return (
    <ApplicationProvider>
      <div className="w-full bg-[var(--color-background-dark)] light:bg-[var(--color-background-light)] text-white light:text-gray-900 overflow-x-hidden">
        <div className="noise-overlay" />
        <Navbar />

        <main className="relative z-10 flex flex-col items-center w-full pt-36 pb-20 px-6 md:px-10">
          {/* Hero Section */}
          <section ref={heroRef} className="w-full max-w-4xl text-center mb-14">
            <p data-hero className="text-xs font-medium tracking-[0.3em] uppercase text-gray-500 mb-6 opacity-0">
              [Application]
            </p>

            <h1 data-hero className="text-4xl md:text-6xl font-bold leading-[1.1] tracking-tight mb-6 opacity-0">
              Join our<br />
              <span className="text-primary">curated network</span>
            </h1>

            <p data-hero className="text-gray-500 text-lg md:text-xl max-w-xl mx-auto leading-relaxed opacity-0">
              We&apos;re building the future of agency procurement. Apply to join an exclusive
              ecosystem of top-tier digital partners.
            </p>
          </section>

          <ApplicationContent />
        </main>

        <Footer />
      </div>
    </ApplicationProvider>
  );
}
