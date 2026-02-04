import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="dark w-full min-h-screen bg-black text-white overflow-x-hidden flex flex-col">
      <div className="fixed inset-0 pointer-events-none z-0 dot-grid opacity-20" />
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-secondary-accent/10 blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[120px] pointer-events-none z-0" />

      <Navbar />

      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 md:px-10">
        <div className="text-center max-w-xl">
          <h1 className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary-accent mb-4">
            404
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full h-12 px-8 bg-white text-black hover:bg-primary transition-all text-sm font-bold"
            >
              Go Home
            </Link>
            <Link
              href="/agencies"
              className="inline-flex items-center justify-center rounded-full h-12 px-8 bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all text-sm font-bold"
            >
              Browse Agencies
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
