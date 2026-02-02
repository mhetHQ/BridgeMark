import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t border-white/5 bg-black py-12 relative z-10">
      <div className="max-w-7xl mx-auto px-10 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="size-6 text-white opacity-50">
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
          <p className="text-gray-600 text-sm">
            © 2024 Bridgemark. All rights reserved.
          </p>
        </div>
        <div className="flex gap-8">
          <Link
            className="text-gray-600 hover:text-primary transition-colors text-sm font-medium"
            href="#terms"
          >
            Terms
          </Link>
          <Link
            className="text-gray-600 hover:text-primary transition-colors text-sm font-medium"
            href="#privacy"
          >
            Privacy
          </Link>
          <Link
            className="text-gray-600 hover:text-primary transition-colors text-sm font-medium"
            href="#cookies"
          >
            Cookies
          </Link>
        </div>
      </div>
    </footer>
  );
}
