import Link from "next/link";

export function Navbar() {
  return (
    <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 w-full pointer-events-none">
      <div className="pointer-events-auto bg-black/70 backdrop-blur-xl border border-white/10 rounded-full pl-6 pr-2 py-2.5 flex items-center gap-8 shadow-[0_0_40px_rgba(0,0,0,0.8)] max-w-4xl mx-auto transition-all duration-300 hover:border-white/20">
        <Link
          className="flex items-center gap-2.5 text-white hover:opacity-80 transition-opacity group"
          href="/"
        >
          <div className="size-7 text-primary group-hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.8)] transition-all duration-300">
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
          <h2 className="text-white text-xl font-black tracking-tight">
            bridgemark
          </h2>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link
            className="text-gray-300 hover:text-white hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.5)] text-sm font-semibold transition-all"
            href="#agencies"
          >
            Agencies
          </Link>
          <Link
            className="text-gray-300 hover:text-white hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.5)] text-sm font-semibold transition-all"
            href="#marketplace"
          >
            Marketplace
          </Link>
          <Link
            className="text-gray-300 hover:text-white hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.5)] text-sm font-semibold transition-all"
            href="/about"
          >
            About
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/get-matched"
            className="flex cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-6 bg-white text-black hover:bg-primary transition-colors duration-300 text-sm font-bold leading-normal tracking-wide shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:shadow-[0_0_20px_rgba(0,240,255,0.6)]"
          >
            <span className="truncate">Find Agency</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
