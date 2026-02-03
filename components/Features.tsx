import Link from "next/link";

export function Features() {
  return (
    <section className="w-full py-20 max-w-6xl">
      <div className="flex flex-col gap-12">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 px-2">
          <div className="flex flex-col gap-4 max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
              Why{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary-accent drop-shadow-[0_0_15px_rgba(189,0,255,0.4)]">
                Bridgemark?
              </span>
            </h2>
            <p className="text-gray-400 text-lg">
              We bridge the gap between ambition and execution with a futuristic
              approach to agency matching.
            </p>
          </div>
          <Link
            className="text-primary font-bold hover:text-white transition-colors flex items-center gap-2 group"
            href="#learn-more"
          >
            Learn More
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="16"
              viewBox="0 -960 960 960"
              width="16"
              fill="currentColor"
              className="group-hover:translate-x-1 transition-transform"
            >
              <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* AI-Powered Matching - Large Card */}
          <div className="col-span-1 md:col-span-7 glass-card rounded-3xl p-10 relative overflow-hidden group transition-all duration-500">
            <div className="absolute -right-16 -top-16 w-56 h-56 bg-secondary-accent/20 rounded-full blur-[80px] group-hover:bg-secondary-accent/30 transition-all duration-500" />
            <div className="relative z-10 flex flex-col h-full justify-between gap-10">
              <div className="size-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 text-primary shadow-[0_0_20px_rgba(0,0,0,0.5)] group-hover:border-primary/50 group-hover:scale-110 transition-all duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="30"
                  viewBox="0 -960 960 960"
                  width="30"
                  fill="currentColor"
                >
                  <path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h120v-80q0-83 58.5-141.5T560-920q83 0 141.5 58.5T760-720v80h120q33 0 56.5 23.5T960-560v400q0 33-23.5 56.5T880-80H240Zm0-80h640v-400H240v400Zm320-120q33 0 56.5-23.5T640-360q0-33-23.5-56.5T560-440q-33 0-56.5 23.5T480-360q0 33 23.5 56.5T560-280ZM360-640h400v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z" />
                </svg>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                  AI-Powered Matching
                </h3>
                <p className="text-gray-400 leading-relaxed text-lg">
                  Our proprietary neural network analyzes millions of data points
                  to find the perfect agency fit for your unique needs in
                  seconds, not weeks.
                </p>
              </div>
            </div>
          </div>

          {/* Smart Contracts */}
          <div className="col-span-1 md:col-span-5 glass-card rounded-3xl p-10 relative overflow-hidden group transition-all duration-500">
            <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-primary/20 rounded-full blur-[60px] group-hover:bg-primary/30 transition-all duration-500" />
            <div className="relative z-10 flex flex-col h-full justify-between gap-10">
              <div className="size-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 text-secondary-accent shadow-[0_0_20px_rgba(0,0,0,0.5)] group-hover:border-secondary-accent/50 group-hover:scale-110 transition-all duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="30"
                  viewBox="0 -960 960 960"
                  width="30"
                  fill="currentColor"
                >
                  <path d="m438-338 226-226-57-57-169 169-84-84-57 57 141 141Zm42 258q-139-35-229.5-159.5T160-516v-244l320-120 320 120v244q0 152-90.5 276.5T480-80Z" />
                </svg>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-white mb-3 group-hover:text-secondary-accent transition-colors">
                  Smart Contracts (soon)
                </h3>
                <p className="text-gray-400 leading-relaxed text-lg">
                  Secure and transparent agreements powered by blockchain
                  technology.
                </p>
              </div>
            </div>
          </div>

         
          <div className="col-span-1 md:col-span-4 glass-card rounded-3xl p-10 relative overflow-hidden group transition-all duration-500">
            <div className="relative z-10 flex flex-col gap-6">
              <div className="size-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 text-primary group-hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 -960 960 960"
                  width="24"
                  fill="currentColor"
                >
                  <path d="m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                </svg>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-white mb-2">
                  Verified Quality
                </h3>
                <p className="text-gray-400 text-lg leading-relaxed">
                  Every agency is rigorously vetted to ensure premium delivery
                  standards.
                </p>
              </div>
            </div>
          </div>

          {/* Global Network */}
          <div className="col-span-1 md:col-span-8 glass-card rounded-3xl p-10 relative overflow-hidden group transition-all duration-500 flex flex-col md:flex-row items-center gap-10">
            <div className="relative z-10 flex-1">
              <div className="size-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 text-white mb-6 group-hover:bg-white/10 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="30"
                  viewBox="0 -960 960 960"
                  width="30"
                  fill="currentColor"
                >
                  <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-7-.5-14.5T799-507q-5 29-27 48t-52 19h-80q-33 0-56.5-23.5T560-520v-40H400v-80q0-33 23.5-56.5T480-720h40q0-23 12.5-40.5T563-789q-20-5-41-8t-42-3q-134 0-227 93t-93 227h200q66 0 113 47t47 113v40H400v110q20 5 39.5 7.5T480-160Z" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-white mb-3">
                Global Network
              </h3>
              <p className="text-gray-400 leading-relaxed text-lg">
                Access a decentralized network of specialists from over 40
                countries, collaborating seamlessly through our platform.
              </p>
            </div>
            <div className="flex-1 w-full h-40 rounded-xl bg-black/50 border border-white/10 overflow-hidden relative shadow-inner">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-60 mix-blend-lighten"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDk38v0HPrUv9OKRwPHkBCaZmHwDMGTEfGsxqOePuzVOGV_lKt2Fu1tWBL8GPmtu4GIXsWRC9RK6F9vwUr8rQXTGIgk-03Q1OyuK9uKoSFYp9kU19VbcbByNi5uD-tGmrRRwApBs8NlTOwEr3FlfylKrfnabAoopbhUtmjEYoWGOdxOItmFwGaTL_YDr-kknhcpiVvjlGGblQxt1Bx-_LKUixe1pr1KW8wqjKVDsQwmtK70jVAY3O1gLx2fzuPccLEGvH40CPGkaZ3x')",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
