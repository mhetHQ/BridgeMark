interface AgencyCardProps {
  name: string;
  description: string;
  category: string;
  categoryColor: "primary" | "secondary-accent";
  backgroundImage: string;
}

function AgencyCard({
  name,
  description,
  category,
  categoryColor,
  backgroundImage,
}: AgencyCardProps) {
  const isCategoryPrimary = categoryColor === "primary";
  const hoverBorderClass = isCategoryPrimary
    ? "group-hover:border-primary/50"
    : "group-hover:border-secondary-accent/50";
  const hoverShadowClass = isCategoryPrimary
    ? "group-hover:shadow-[0_0_30px_rgba(0,240,255,0.2)]"
    : "group-hover:shadow-[0_0_30px_rgba(189,0,255,0.2)]";
  const hoverTextClass = isCategoryPrimary
    ? "group-hover:text-primary"
    : "group-hover:text-secondary-accent";
  const badgeClass = isCategoryPrimary
    ? "text-primary border-primary/20"
    : "text-secondary-accent border-secondary-accent/20";
  const verifiedIconColor = isCategoryPrimary ? "text-primary" : "text-secondary-accent";
  const shadowClass = isCategoryPrimary
    ? "shadow-[0_0_10px_rgba(0,240,255,0.5)]"
    : "shadow-[0_0_10px_rgba(189,0,255,0.5)]";

  return (
    <div className="flex-none w-80 group cursor-pointer">
      <div
        className={`relative h-52 rounded-2xl overflow-hidden mb-5 border border-white/10 ${hoverBorderClass} ${hoverShadowClass} transition-all duration-300`}
      >
        <div
          className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-700"
          style={{ backgroundImage: `url('${backgroundImage}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
        <div className="absolute bottom-4 left-4">
          <span
            className={`bg-black/60 backdrop-blur-md ${badgeClass} text-xs font-bold px-3 py-1 rounded-full border`}
          >
            {category}
          </span>
        </div>
      </div>
      <div>
        <div className="flex justify-between items-center mb-1">
          <p className={`text-white text-xl font-bold ${hoverTextClass} transition-colors`}>
            {name}
          </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20"
            viewBox="0 -960 960 960"
            width="20"
            fill="currentColor"
            className={`${verifiedIconColor} text-sm ${shadowClass} rounded-full`}
          >
            <path d="m438-338 226-226-57-57-169 169-84-84-57 57 141 141Zm42 258q-139-35-229.5-159.5T160-516v-244l320-120 320 120v244q0 152-90.5 276.5T480-80Z" />
          </svg>
        </div>
        <p className="text-gray-500 text-sm">{description}</p>
      </div>
    </div>
  );
}

export function FeaturedAgencies() {
  const agencies = [
    {
      name: "Neon Strategies",
      description: "Specializing in Web3 Marketing",
      category: "Web3",
      categoryColor: "primary" as const,
      backgroundImage:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCwwO9fglbToOHpbxSK0hM5XwwYE4qgYbPsIPkzUxlj3U9n4skPxoaNunMI-z0EL0LiRc1MAgZU2_B3G5Zgwd09MTtKUIBLGnk-ZfuC2ah_13m0wFT1iR1xGDKKWJQAxHYzLGxGb0xrNz73znHJ6rNeHXkRzFIbNxsNbVXM67eP9rTvXjcps9UJ1P7IwA8EADFp9iYsaF_T2qTSCP_9yve1UT2H_YwQOHPt8a1oRPY2k9fnJ3cYxLT-HTkZF2sqy5JeSvDLxXSBbo-o",
    },
    {
      name: "Cyber Growth",
      description: "Growth Hacking Experts",
      category: "Growth",
      categoryColor: "secondary-accent" as const,
      backgroundImage:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDmoXqIP0NID10s0TDfd6HLNr9YSOQRh7QilYVIFNDmU49f_3LmffaJU5nIxI_J2lEXolNGLGr7_Iup9sc8-FcpSliuoRH85YdVuM6-aagyh9JemLwHPVnbC3ixzfpEMZSdu4aj80OC3_UXw9d2ngQnoeON6tJaVgezWdsZ-I4vi5No1IezyBb9fkpgqVMnDIDGLrRn7nvKkvuzPyKGYtYs5FfSQZ4tzadXiV2cKW8kPWrrF48A3-rXMF9ZaWi1Djg0aUecp3UdW2uG",
    },
    {
      name: "Future Media",
      description: "Digital Transformation Leaders",
      category: "Transformation",
      categoryColor: "primary" as const,
      backgroundImage:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDAZ6HPuPPYUxL8Zx88B1eGaDIFHTK2MBodTYh9Qd_ZzPSOnUWazqoqj1YICDPP_WtufrR1cbbUovEUW8ak7a2KjJiQkpOlQoLZGiPIpqCip9Q5R1Ho_sEQTjZhvsdGn-NTd8-wSE-la14DMAaR2k5KrsFzjb55oKV58tVUJ4BM7WttlmTAPOhog8VlBUOU9YGW15CMAEbH-qaJ5gIEsg64BzrT0LzPmgMeHdGMmvabb0sNfUwEYFsK5l0Rs1NUO06YHW7GXjBQQqv4",
    },
    {
      name: "Vortex Creative",
      description: "AR/VR Experiences",
      category: "AR/VR",
      categoryColor: "secondary-accent" as const,
      backgroundImage:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuC9ytegb53-kFx9CZdfK2n-MuzWCggOvg6CTC6YIGsDhy1ZVTIZNZpXRePkQ6oQGzJhqCUqtAGboP-Zi806PyihMhJTk5AFOoM4TpzCVRDNaS2tJKZJ_yYKFD9Buo1iOhY3Va66mQaNmNGuUtkNkMdT9yOVp2ERtDMRPtpiVfu1Wv6Hl9ph5sMJ87J6vUXbNJWZg_hc71o_Gqsi34RxJEXA0L3XX7SaK1t8gfrpqzZF2Qb3nT5LPOCxC6Qwc5w5vbvXneOVQhOg-Xtr",
    },
  ];

  return (
    <section className="w-full py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-10 flex items-center justify-between">
        <h3 className="text-3xl font-bold text-white">Featured Agencies</h3>
        <div className="flex gap-2">
          <button className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:border-primary/50 transition-all">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20"
              viewBox="0 -960 960 960"
              width="20"
              fill="currentColor"
            >
              <path d="M640-280H280v-60h360v60Zm0-170H280v-60h360v60Z" />
            </svg>
          </button>
          <button className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:border-primary/50 transition-all">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20"
              viewBox="0 -960 960 960"
              width="20"
              fill="currentColor"
            >
              <path d="M320-280v-60h360v60H320Zm0-170v-60h360v60H320Z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex overflow-x-auto no-scrollbar pb-12 px-4 md:px-0 space-x-6 md:ml-[max(2rem,calc((100vw-1280px)/2))]">
        {agencies.map((agency) => (
          <AgencyCard key={agency.name} {...agency} />
        ))}
      </div>
    </section>
  );
}
