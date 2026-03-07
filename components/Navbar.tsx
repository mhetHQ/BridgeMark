"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-4 sm:top-6 left-0 right-0 z-50 flex justify-center px-3 sm:px-4 w-full pointer-events-none">
      <div className="pointer-events-auto bg-black/60 light:bg-white/85 backdrop-blur-xl border border-white/[0.06] light:border-black/[0.08] rounded-full pl-4 sm:pl-6 pr-2 py-2 sm:py-2.5 flex items-center gap-4 sm:gap-8 max-w-4xl mx-auto transition-colors duration-300 hover:border-white/[0.1] light:hover:border-black/[0.15]">
        <Link
          className="flex items-center gap-2 sm:gap-2.5 text-white light:text-gray-900 hover:opacity-80 transition-opacity"
          href="/"
        >
          <Image
            src="/bridgemark_logo.png"
            alt="Bridgemark logo"
            width={140}
            height={32}
            className="h-6 sm:h-7 w-auto"
            priority
          />
          BridgeMark
        </Link>

        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          <Link
            className="text-gray-500 hover:text-white light:hover:text-gray-900 text-sm font-medium transition-colors"
            href="/about"
          >
            About
          </Link>
          <Link
            className="text-gray-500 hover:text-white light:hover:text-gray-900 text-sm font-medium transition-colors"
            href="/agencies"
          >
            Agencies
          </Link>
          <Link
            className="text-gray-500 hover:text-white light:hover:text-gray-900 text-sm font-medium transition-colors"
            href="/agency-application"
          >
            List Your Agency
          </Link>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 pr-1">
          <Link
            href="/get-matched"
            className="hidden sm:flex items-center justify-center rounded-full h-9 sm:h-10 px-4 sm:px-6 bg-white light:bg-gray-900 text-black light:text-white text-xs sm:text-sm font-semibold hover:scale-[1.03] transition-transform duration-300"
          >
            Find Agency
          </Link>

          <ThemeToggle />

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-full bg-white/[0.06] light:bg-black/[0.06] text-white light:text-gray-900 hover:bg-white/[0.1] light:hover:bg-black/[0.1] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto md:hidden absolute top-full mt-2 left-3 right-3 bg-black/90 light:bg-white/95 backdrop-blur-xl border border-white/[0.06] light:border-black/[0.08] rounded-2xl p-4">
          <div className="flex flex-col gap-1">
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-400 light:text-gray-600 hover:text-white light:hover:text-gray-900 px-4 py-3 rounded-full hover:bg-white/[0.04] light:hover:bg-black/[0.04] text-sm font-medium transition-all"
            >
              About
            </Link>
            <Link
              href="/agencies"
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-400 light:text-gray-600 hover:text-white light:hover:text-gray-900 px-4 py-3 rounded-full hover:bg-white/[0.04] light:hover:bg-black/[0.04] text-sm font-medium transition-all"
            >
              Agencies
            </Link>
            <Link
              href="/agency-application"
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-400 light:text-gray-600 hover:text-white light:hover:text-gray-900 px-4 py-3 rounded-full hover:bg-white/[0.04] light:hover:bg-black/[0.04] text-sm font-medium transition-all"
            >
              List Your Agency
            </Link>
            <div className="border-t border-white/[0.06] light:border-black/[0.08] my-2" />
            <Link
              href="/get-matched"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center rounded-full h-11 bg-white light:bg-gray-900 text-black light:text-white text-sm font-semibold"
            >
              Find Agency
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
