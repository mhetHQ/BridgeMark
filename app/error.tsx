"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="dark w-full min-h-screen bg-black text-white overflow-x-hidden flex flex-col items-center justify-center px-4">
      <div className="fixed inset-0 pointer-events-none z-0 dot-grid opacity-20" />
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-red-500/10 blur-[120px] pointer-events-none z-0" />
      
      <div className="relative z-10 text-center max-w-xl">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-500/20 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Something went wrong
        </h2>
        <p className="text-gray-400 text-lg mb-8">
          We apologize for the inconvenience. Please try again or contact support if the problem persists.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center rounded-full h-12 px-8 bg-white text-black hover:bg-primary transition-all text-sm font-bold"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full h-12 px-8 bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all text-sm font-bold"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
