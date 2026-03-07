"use client";

import Link from "next/link";
import { useEffect, useState, useMemo } from "react";

interface ConfettiPiece {
  id: number;
  left: number;
  delay: number;
  duration: number;
  color: string;
  shape: "rect" | "circle" | "triangle";
  size: number;
  rotation: number;
}

interface SuccessStepProps {
  slug: string;
}

const CONFETTI_COLORS = [
  "#00F0FF", // primary cyan
  "#BD00FF", // secondary purple
  "#FFD700", // gold
  "#FF6B6B", // coral
  "#4ADE80", // green
  "#F472B6", // pink
];

export function SuccessStep({ slug }: SuccessStepProps) {
  const [showConfetti, setShowConfetti] = useState(true);

  const confettiPieces = useMemo<ConfettiPiece[]>(() => {
    return [...Array(50)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 2 + Math.random() * 3,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      shape: (["rect", "circle", "triangle"] as const)[Math.floor(Math.random() * 3)],
      size: 8 + Math.random() * 12,
      rotation: Math.random() * 360,
    }));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 6000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="border border-white/[0.06] p-8 md:p-12 text-center max-w-2xl mx-auto relative overflow-hidden">
      <div className="relative z-10">
        <div className="w-20 h-20 mx-auto mb-8 border border-white/[0.1] flex items-center justify-center">
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

        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Application{" "}
          <span className="text-gradient">
            Submitted!
          </span>
        </h2>

        <p className="text-gray-500 text-lg mb-8 max-w-md mx-auto">
          Thank you for applying to join our curated network. Your listing is now under review.
        </p>

        {/* What's Next */}
        <div className="border border-white/[0.06] p-6 mb-8 text-left">
          <h3 className="text-lg font-semibold mb-4 text-center">What happens next?</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 border border-white/[0.1] flex items-center justify-center flex-shrink-0">
                <span className="text-gray-400 font-semibold text-xs">01</span>
              </div>
              <div>
                <p className="text-white font-medium">Review Process</p>
                <p className="text-gray-500 text-sm">
                  Our team will review your application within 2-3 business days.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 border border-white/[0.1] flex items-center justify-center flex-shrink-0">
                <span className="text-gray-400 font-semibold text-xs">02</span>
              </div>
              <div>
                <p className="text-white font-medium">Email Confirmation</p>
                <p className="text-gray-500 text-sm">
                  You&apos;ll receive an email once your listing is approved and live.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 border border-white/[0.1] flex items-center justify-center flex-shrink-0">
                <span className="text-gray-400 font-semibold text-xs">03</span>
              </div>
              <div>
                <p className="text-white font-medium">Start Receiving Leads</p>
                <p className="text-gray-500 text-sm">
                  Once approved, your profile will be visible to businesses looking for agencies.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Preview Link */}
        <div className="space-y-4">
          <p className="text-gray-500 text-sm">Your profile will be available at:</p>
          <div className="bg-white/[0.03] border border-white/[0.06] px-4 py-3 inline-block">
            <code className="text-primary text-sm">
              bridgemark.tech/agencies/{slug}
            </code>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link
            href="/"
            className="px-6 py-2.5 text-white text-sm font-medium border border-white/[0.06] hover:border-white/[0.15] transition-colors"
          >
            Back to Home
          </Link>
          <Link
            href="/agencies"
            className="rounded-full px-6 py-3 bg-white text-black font-semibold hover:bg-gray-200 transition-all "
          >
            Browse Agencies
          </Link>
        </div>
      </div>

      {/* Confetti celebration effect */}
      {showConfetti && (
        <>
          <style jsx>{`
            @keyframes confetti-fall {
              0% {
                transform: translateY(-100%) rotate(0deg);
                opacity: 1;
              }
              100% {
                transform: translateY(800%) rotate(720deg);
                opacity: 0;
              }
            }
            .confetti-piece {
              animation: confetti-fall linear forwards;
            }
          `}</style>
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {confettiPieces.map((piece) => (
              <div
                key={piece.id}
                className="confetti-piece absolute -top-4"
                style={{
                  left: `${piece.left}%`,
                  animationDelay: `${piece.delay}s`,
                  animationDuration: `${piece.duration}s`,
                }}
              >
                {piece.shape === "rect" && (
                  <div
                    style={{
                      width: piece.size,
                      height: piece.size * 0.6,
                      backgroundColor: piece.color,
                      transform: `rotate(${piece.rotation}deg)`,
                      borderRadius: 2,
                    }}
                  />
                )}
                {piece.shape === "circle" && (
                  <div
                    style={{
                      width: piece.size,
                      height: piece.size,
                      backgroundColor: piece.color,
                      borderRadius: "50%",
                    }}
                  />
                )}
                {piece.shape === "triangle" && (
                  <div
                    style={{
                      width: 0,
                      height: 0,
                      borderLeft: `${piece.size / 2}px solid transparent`,
                      borderRight: `${piece.size / 2}px solid transparent`,
                      borderBottom: `${piece.size}px solid ${piece.color}`,
                      transform: `rotate(${piece.rotation}deg)`,
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}




