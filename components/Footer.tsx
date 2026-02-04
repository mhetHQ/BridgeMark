import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t border-white/5 bg-black py-8 sm:py-12 relative z-10 animate-fade-in-up">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6">
        <div className="flex items-center gap-2 group">
          <div className="size-6 text-white opacity-50 group-hover:opacity-80 group-hover:text-primary transition-all duration-300">
            <svg
              fill="none"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                d="M24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4ZM24 40C32.8366 40 40 32.8366 40 24C40 15.1634 32.8366 8 24 8C15.1634 8 8 15.1634 8 24C8 32.8366 15.1634 40 24 40Z"
                fill="currentColor"
                fillOpacity="0.5"
                fillRule="evenodd"
              />
              <path d="M24 14L16 34H32L24 14Z" fill="currentColor" />
            </svg>
          </div>
          <p className="text-gray-600 text-sm group-hover:text-gray-500 transition-colors">
            © {new Date().getFullYear()} Bridgemark. All rights reserved.
          </p>
        </div>
        <div className="flex gap-4 sm:gap-6 md:gap-8">
          <Link
            className="text-gray-600 hover:text-primary transition-all text-sm font-medium relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-primary after:transition-all hover:after:w-full"
            href="/terms"
          >
            Terms
          </Link>
          <Link
            className="text-gray-600 hover:text-primary transition-all text-sm font-medium relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-primary after:transition-all hover:after:w-full"
            href="/privacy"
          >
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
}
