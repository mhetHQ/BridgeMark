"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface SuccessStepProps {
  slug: string;
}

export function SuccessStep({ slug }: SuccessStepProps) {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="glass-card rounded-3xl p-8 md:p-12 text-center max-w-2xl mx-auto relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -right-20 -top-20 w-60 h-60 bg-secondary-accent/30 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute -left-20 -bottom-20 w-60 h-60 bg-primary/30 rounded-full blur-[80px] pointer-events-none" />

      {/* Success Icon */}
      <div className="relative z-10">
        <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-primary to-secondary-accent flex items-center justify-center shadow-[0_0_40px_rgba(0,240,255,0.4)]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-12 h-12 text-black"
          >
            <path
              fillRule="evenodd"
              d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        <h2 className="text-3xl md:text-4xl font-black mb-4">
          Application{" "}
          <span className="bg-gradient-to-r from-primary to-secondary-accent bg-clip-text text-transparent">
            Submitted!
          </span>
        </h2>

        <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
          Thank you for applying to join our curated network. Your listing is now under review.
        </p>

        {/* What's Next */}
        <div className="bg-white/5 rounded-2xl p-6 mb-8 text-left">
          <h3 className="text-lg font-semibold mb-4 text-center">What happens next?</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <span className="text-primary font-bold text-sm">1</span>
              </div>
              <div>
                <p className="text-white font-medium">Review Process</p>
                <p className="text-gray-400 text-sm">
                  Our team will review your application within 2-3 business days.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <span className="text-primary font-bold text-sm">2</span>
              </div>
              <div>
                <p className="text-white font-medium">Email Confirmation</p>
                <p className="text-gray-400 text-sm">
                  You&apos;ll receive an email once your listing is approved and live.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <span className="text-primary font-bold text-sm">3</span>
              </div>
              <div>
                <p className="text-white font-medium">Start Receiving Leads</p>
                <p className="text-gray-400 text-sm">
                  Once approved, your profile will be visible to businesses looking for agencies.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Preview Link */}
        <div className="space-y-4">
          <p className="text-gray-500 text-sm">Your profile will be available at:</p>
          <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 inline-block">
            <code className="text-primary text-sm">
              bridgemark.com/agencies/{slug}
            </code>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link
            href="/"
            className="px-6 py-3 bg-white/5 text-white font-semibold rounded-xl hover:bg-white/10 transition-all border border-white/10"
          >
            Back to Home
          </Link>
          <Link
            href="/agencies"
            className="px-6 py-3 bg-primary text-black font-bold rounded-xl hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(0,240,255,0.3)]"
          >
            Browse Agencies
          </Link>
        </div>
      </div>

      {/* Simple confetti effect */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full animate-bounce"
              style={{
                backgroundColor: i % 2 === 0 ? "#00F0FF" : "#BD00FF",
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random()}s`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
