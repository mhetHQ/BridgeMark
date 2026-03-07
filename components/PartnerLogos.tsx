const partners = [
  "Binance Labs",
  "Polygon Ventures",
  "ConsenSys",
  "a16z Crypto",
  "Animoca Brands",
];

export function PartnerLogos() {
  // Duplicate the list to create a seamless loop
  const doubled = [...partners, ...partners];

  return (
    <section className="w-full max-w-6xl px-0 py-12 sm:py-16 overflow-hidden">
      <p className="text-center text-[10px] font-medium uppercase tracking-[0.25em] text-gray-600 mb-8">
        Trusted by industry leaders
      </p>
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-linear-to-r from-[var(--color-background-dark)] light:from-[var(--color-background-light)] to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-linear-to-l from-[var(--color-background-dark)] light:from-[var(--color-background-light)] to-transparent pointer-events-none" />

        {/* Marquee track */}
        <div className="flex animate-marquee whitespace-nowrap">
          {doubled.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="mx-8 sm:mx-12 text-gray-600 font-bold tracking-tight text-lg sm:text-xl select-none"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
