export function Hero() {
  return (
    <section className="w-full flex flex-col items-center justify-center text-center py-10 md:py-24 relative">
      <div className="absolute inset-0 z-[-1] opacity-50 flex items-center justify-center overflow-hidden mix-blend-screen">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBu5bf8d-eQ2SX5V963AQE4rnS-yIgdE8HNx4r3BTdvuf-h6ZVN6u8yvgr10zhccNPt-NBUJlNl4I5H5uui9WAXUWZKO7O78EcLWo6VU0ahGKY-Glhuw5QZ3gyi6yD_l9AbQ2DGf-IGJ-lh9GDOrX4bo2dzn9KJDXNHpVQF8Xy5bOvOCf4Rh2dTgHxUzJXaCRt1N_3dNVQ_2QaXzVDg9gh8hVh2qclbHiJWsqU4jIQPETxeB2_lEvQtx2qexPIPaSjhRKcCwhx-GiR0')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background-dark via-transparent to-background-dark" />
        <div className="absolute inset-0 bg-gradient-to-r from-background-dark via-transparent to-background-dark" />
      </div>

      <div className="max-w-5xl flex flex-col gap-8 items-center animate-fade-in-up">
        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-2 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(0,240,255,1)]" />
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-300">
            Web3 Ready Marketplace
          </span>
        </div>

        <h1 className="text-white text-5xl md:text-7xl lg:text-8xl font-black leading-[1.1] tracking-[-0.03em] drop-shadow-2xl">
          The curated marketplace for
          <span className="bg-gradient-to-r from-secondary-accent via-[#D946EF] to-primary bg-clip-text text-transparent block mt-2 pb-4 drop-shadow-[0_0_30px_rgba(189,0,255,0.3)]">
            marketing agencies
          </span>
        </h1>

        <p className="text-gray-400 text-lg md:text-xl font-normal leading-relaxed max-w-2xl mx-auto">
          Connect with top-tier talent vetted by industry leaders. Experience
          the future of agency partnerships with smart contracts and AI
          matching.
        </p>

        <div className="flex flex-col sm:flex-row gap-5 mt-10 w-full justify-center">
          <button className="group flex min-w-[200px] cursor-pointer items-center justify-center rounded-full h-14 px-8 bg-gradient-to-r from-secondary-accent to-primary bg-[length:200%_auto] hover:bg-right transition-all duration-500 text-black text-lg font-bold shadow-[0_0_25px_rgba(0,240,255,0.4)] hover:shadow-[0_0_40px_rgba(189,0,255,0.6)] hover:-translate-y-1 relative overflow-hidden">
            <span className="relative z-10 flex items-center gap-2">
              Get Matched
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20"
                viewBox="0 -960 960 960"
                width="20"
                fill="currentColor"
              >
                <path d="m422-232 207-248H469l29-227-185 267h139l-30 208Z" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-white/20 group-hover:opacity-0 transition-opacity duration-300" />
          </button>

          <button className="flex min-w-[200px] cursor-pointer items-center justify-center rounded-full h-14 px-8 bg-black/40 hover:bg-white/10 border border-white/20 text-white text-lg font-medium backdrop-blur-md transition-all hover:border-primary/50 hover:shadow-[0_0_20px_rgba(0,240,255,0.15)]">
            <span>View Agencies</span>
          </button>
        </div>
      </div>
    </section>
  );
}
