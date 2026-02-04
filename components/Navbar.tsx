"use client";

import Link from "next/link";
import { useState } from "react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-4 sm:top-6 left-0 right-0 z-50 flex justify-center px-3 sm:px-4 w-full pointer-events-none animate-fade-in-down">
      <div className="pointer-events-auto bg-black/70 backdrop-blur-xl border border-white/10 rounded-full pl-4 sm:pl-6 pr-2 py-2 sm:py-2.5 flex items-center gap-4 sm:gap-8 shadow-[0_0_40px_rgba(0,0,0,0.8)] max-w-4xl mx-auto transition-all duration-300 hover:border-white/20 hover:shadow-[0_0_50px_rgba(0,240,255,0.1)]">
        <Link
          className="flex items-center gap-2 sm:gap-2.5 text-white hover:opacity-80 transition-opacity group"
          href="/"
        >
          <div className="size-6 sm:size-7 text-primary group-hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.8)] group-hover:scale-110 transition-all duration-300">
            <svg
              fill="none"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                d="M24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4ZM24 40C32.8366 40 40 32.8366 40 24C40 15.1634 32.8366 8 24 8C15.1634 8 8 15.1634 8 24C8 32.8366 15.1634 40 24 40Z"
                fill="currentColor"
                fillOpacity="0.3"
                fillRule="evenodd"
              />
              <path d="M24 12L14 36H34L24 12Z" fill="currentColor" />
            </svg>
          </div>
          <h2 className="text-white text-lg sm:text-xl font-black tracking-tight">
            Bridgemark
          </h2>
        </Link>

        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          <Link
            className="text-gray-300 hover:text-white hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.5)] text-sm font-semibold transition-all relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full"
            href="/agencies"
          >
            Agencies
          </Link>
          <Link
            className="text-gray-300 hover:text-white hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.5)] text-sm font-semibold transition-all relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full"
            href="/agency-application"
          >
            List Your Agency
          </Link>
          <Link
            className="text-gray-300 hover:text-white hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.5)] text-sm font-semibold transition-all relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full"
            href="/about"
          >
            About
          </Link>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/get-matched"
            className="hidden sm:flex cursor-pointer items-center justify-center overflow-hidden rounded-full h-9 sm:h-10 px-4 sm:px-6 bg-white text-black hover:bg-primary hover:scale-105 transition-all duration-300 text-xs sm:text-sm font-bold leading-normal tracking-wide shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:shadow-[0_0_20px_rgba(0,240,255,0.6)]"
          >
            <span className="truncate">Find Agency</span>
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto md:hidden absolute top-full mt-2 left-3 right-3 bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-[0_0_40px_rgba(0,0,0,0.8)]">
          <div className="flex flex-col gap-2">
            <Link
              href="/agencies"
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-300 hover:text-white px-4 py-3 rounded-xl hover:bg-white/10 text-sm font-semibold transition-all"
            >
              Agencies
            </Link>
            <Link
              href="/agency-application"
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-300 hover:text-white px-4 py-3 rounded-xl hover:bg-white/10 text-sm font-semibold transition-all"
            >
              List Your Agency
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-300 hover:text-white px-4 py-3 rounded-xl hover:bg-white/10 text-sm font-semibold transition-all"
            >
              About
            </Link>
            <div className="border-t border-white/10 my-2" />
            <Link
              href="/get-matched"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center rounded-xl h-11 bg-white text-black hover:bg-primary transition-all text-sm font-bold"
            >
              Find Agency
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
