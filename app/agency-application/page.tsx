"use client";

import { useState, Suspense } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ApplicationProvider, useApplication, ApplicationStep } from "@/lib/context/ApplicationContext";
import { AgencyDetailsStep } from "@/components/agency-application/AgencyDetailsStep";
import { PortfolioStep } from "@/components/agency-application/PortfolioStep";
import { PricingStep } from "@/components/agency-application/PricingStep";
import { PaymentStep } from "@/components/agency-application/PaymentStep";
import { SuccessStep } from "@/components/agency-application/SuccessStep";

const steps = [
  { id: 1 as ApplicationStep, title: "Agency Details", shortTitle: "Details" },
  { id: 2 as ApplicationStep, title: "Portfolio & Services", shortTitle: "Portfolio" },
  { id: 3 as ApplicationStep, title: "Pricing", shortTitle: "Pricing" },
  { id: 4 as ApplicationStep, title: "Payment", shortTitle: "Payment" },
];

function StepIndicator() {
  const { currentStep, setCurrentStep, isStepComplete } = useApplication();

  return (
    <div className="w-full max-w-3xl mx-auto mb-12">
      <div className="flex items-center justify-between relative">
        {/* Progress line background */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-white/10" />
        
        {/* Progress line filled */}
        <div
          className="absolute top-5 left-0 h-0.5 bg-gradient-to-r from-primary to-secondary-accent transition-all duration-500"
          style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        />

        {steps.map((step, index) => {
          const isActive = currentStep === step.id;
          const isCompleted = currentStep > step.id || isStepComplete(step.id);
          const canClick = step.id <= currentStep || isStepComplete(step.id - 1 as ApplicationStep);

          return (
            <button
              key={step.id}
              onClick={() => canClick && setCurrentStep(step.id)}
              disabled={!canClick}
              className={`relative z-10 flex flex-col items-center gap-2 transition-all ${
                canClick ? "cursor-pointer" : "cursor-not-allowed"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                  isActive
                    ? "bg-primary text-black shadow-[0_0_20px_rgba(0,240,255,0.5)]"
                    : isCompleted
                    ? "bg-primary text-black"
                    : "bg-white/70 text-gray-100 border border-white/20"
                }`}
              >
                {isCompleted && !isActive ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  `0${step.id}`
                )}
              </div>
              <span
                className={`text-xs font-semibold uppercase tracking-wider hidden md:block ${
                  isActive ? "text-primary" : isCompleted ? "text-white dark:text-white light:text-gray-900" : "text-gray-500"
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
            <div className="glass-card rounded-3xl p-8 md:p-10 flex items-center justify-center">
              <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
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
  return (
    <ApplicationProvider>
      <div className="w-full bg-black dark:bg-black light:bg-background-light text-white dark:text-white light:text-gray-900 overflow-x-hidden">
        {/* Background Effects */}
        <div className="fixed inset-0 pointer-events-none z-0 dot-grid opacity-20" />
        <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(circle_at_30%_20%,rgba(189,0,255,0.08)_0%,rgba(0,0,0,0)_50%)] light:hidden" />
        <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(circle_at_70%_80%,rgba(0,240,255,0.05)_0%,rgba(0,0,0,0)_50%)] light:hidden" />
        <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-secondary-accent/15 dark:bg-secondary-accent/15 light:hidden light:bg-secondary-accent/10 blur-[120px] pointer-events-none z-0" />
        <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[120px] pointer-events-none z-0 light:hidden" />

        <Navbar />

        <main className="relative z-10 flex flex-col items-center w-full pt-32 pb-20 px-4 md:px-10">
          {/* Hero Section */}
          <section className="w-full max-w-4xl text-center mb-12">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/5 dark:bg-white/5 light:bg-black/5 border border-white/10 dark:border-white/10 light:border-black/10 backdrop-blur-md mb-6">
              <span className="w-2 h-2 rounded-full bg-secondary-accent animate-pulse shadow-[0_0_8px_rgba(189,0,255,1)]" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-300 dark:text-gray-300 light:text-gray-600">
                Agency Application
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black leading-[1.1] tracking-[-0.03em] mb-6">
              Join our
              <span className="bg-secondary-accent bg-clip-text text-transparent block mt-2">
                curated network
              </span>
            </h1>

            <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              We&apos;re building the future of agency procurement. Apply to join an exclusive 
              ecosystem of top-tier Web3 and digital partners.
            </p>
          </section>

          <ApplicationContent />
        </main>

        <Footer />
      </div>
    </ApplicationProvider>
  );
}
