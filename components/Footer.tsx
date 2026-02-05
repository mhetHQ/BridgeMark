import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t border-white/5 dark:border-white/5 light:border-black/5 bg-black dark:bg-black light:bg-white py-8 sm:py-12 relative z-10 animate-fade-in-up">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6">
        <div className="flex items-center gap-2 group">
            <Image
              src="/bridgemark_logo.png"
              alt="Bridgemark logo"
              width={140}
              height={32}
              className="h-6 sm:h-7 w-auto dark:invert-0 light:invert"
              priority
            />
          
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
