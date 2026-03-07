"use client";

import { useEffect, useRef } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface AgencyCardProps {
  name: string;
  slug: string;
  description: string;
  category: string;
  backgroundImage: string;
  verified?: boolean;
}

function AgencyCard({
  name,
  slug,
  description,
  category,
  backgroundImage,
  verified,
}: AgencyCardProps) {
  return (
    <Link
      href={`/agencies/${slug}`}
      className="flex-none w-[280px] sm:w-80 group cursor-pointer p-3 sm:p-4 rounded-2xl"
    >
      <div className="relative h-44 sm:h-52 rounded-xl sm:rounded-2xl overflow-hidden mb-3 sm:mb-5 border border-white/[0.06] light:border-black/[0.08] group-hover:border-white/[0.12] light:group-hover:border-black/[0.15] transition-all duration-300">
        <div
          className="absolute inset-0 bg-cover bg-center transform group-hover:scale-105 transition-transform duration-700"
          style={{ backgroundImage: `url('${backgroundImage}')` }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-4 left-4">
          <span className="bg-black/50 backdrop-blur-md text-white/80 text-[10px] font-medium uppercase tracking-[0.15em] px-3 py-1 rounded-full border border-white/[0.08]">
            {category}
          </span>
        </div>
      </div>
      <div>
        <div className="flex justify-between items-center mb-1">
          <p className="text-white light:text-gray-900 text-lg sm:text-xl font-bold group-hover:text-primary transition-colors duration-300">
            {name}
          </p>
          {verified && (
            <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-primary">
              Verified
            </span>
          )}
        </div>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>
    </Link>
  );
}

export function FeaturedAgencies() {
  const agencies = useQuery(api.agencies.listAgencies, { limit: 3 });
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  const defaultCoverImage =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCwwO9fglbToOHpbxSK0hM5XwwYE4qgYbPsIPkzUxlj3U9n4skPxoaNunMI-z0EL0LiRc1MAgZU2_B3G5Zgwd09MTtKUIBLGnk-ZfuC2ah_13m0wFT1iR1xGDKKWJQAxHYzLGxGb0xrNz73znHJ6rNeHXkRzFIbNxsNbVXM67eP9rTvXjcps9UJ1P7IwA8EADFp9iYsaF_T2qTSCP_9yve1UT2H_YwQOHPt8a1oRPY2k9fnJ3cYxLT-HTkZF2sqy5JeSvDLxXSBbo-o";

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 80%" },
      }
    );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full max-w-6xl py-16 sm:py-20 overflow-hidden"
    >
      <div
        ref={headingRef}
        className="w-full mx-auto px-4 mb-8 sm:mb-12 flex items-end justify-between opacity-0"
      >
        <div className="flex flex-col gap-2">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-gray-500">
            [Agencies]
          </p>
          <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Featured Agencies
          </h3>
        </div>
        <Link
          href="/agencies"
          className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
        >
          View all →
        </Link>
      </div>

      <div className="flex overflow-x-auto no-scrollbar pb-8 sm:pb-12 px-2 sm:px-4 md:px-0 space-x-4 sm:space-x-6 md:ml-[max(2rem,calc((100vw-1280px)/2))]">
        {agencies === undefined ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex-none w-80 animate-pulse">
              <div className="h-52 rounded-2xl bg-white/[0.04] mb-5" />
              <div className="h-6 w-3/4 bg-white/[0.04] rounded mb-2" />
              <div className="h-4 w-1/2 bg-white/[0.04] rounded" />
            </div>
          ))
        ) : agencies.length === 0 ? (
          <p className="text-gray-400 px-4">No agencies available yet.</p>
        ) : (
          agencies.map((agency) => (
            <AgencyCard
              key={agency._id}
              name={agency.name}
              slug={agency.slug}
              description={agency.description}
              category={agency.category}
              backgroundImage={agency.coverImage || defaultCoverImage}
              verified={agency.verified}
            />
          ))
        )}
      </div>
    </section>
  );
}
