import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t border-white/[0.06] light:border-black/[0.08] bg-[var(--color-background-dark)] light:bg-[var(--color-background-light)] py-8 sm:py-12 relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6">
        <div className="flex items-center gap-3">
          <Image
            src="/bridgemark_logo.png"
            alt="Bridgemark logo"
            width={140}
            height={32}
            className="h-5 sm:h-6 w-auto"
            priority
          />
          <span className="text-gray-600 text-sm">
            © {new Date().getFullYear()} Bridgemark
          </span>
        </div>
        <div className="flex gap-6 sm:gap-8">
          <Link
            className="text-gray-600 hover:text-white light:hover:text-gray-900 transition-colors text-sm font-medium"
            href="/terms"
          >
            Terms
          </Link>
          <Link
            className="text-gray-600 hover:text-white light:hover:text-gray-900 transition-colors text-sm font-medium"
            href="/privacy"
          >
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
}
