"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";

interface AgencyCardProps {
  name: string;
  slug: string;
  description: string;
  category: string;
  categoryColor: "primary" | "secondary-accent";
  backgroundImage: string;
  verified?: boolean;
}

function AgencyCard({
  name,
  slug,
  description,
  category,
  categoryColor,
  backgroundImage,
  verified,
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
    <Link href={`/agencies/${slug}`} className="flex-none w-[280px] sm:w-80 group cursor-pointer hover-lift p-3 sm:p-4 rounded-2xl">
      <div
        className={`relative h-44 sm:h-52 rounded-xl sm:rounded-2xl overflow-hidden mb-3 sm:mb-5 border border-white/10 ${hoverBorderClass} ${hoverShadowClass} transition-all duration-300`}
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
          <p className={`text-white dark:text-white light:text-gray-900 text-lg sm:text-xl font-bold ${hoverTextClass} transition-colors`}>
            {name}
          </p>
          {verified && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20"
              viewBox="0 -960 960 960"
              width="20"
              fill="currentColor"
              className={`${verifiedIconColor} text-sm ${shadowClass} rounded-full group-hover:scale-110 transition-transform`}
            >
              <path d="m438-338 226-226-57-57-169 169-84-84-57 57 141 141Zm42 258q-139-35-229.5-159.5T160-516v-244l320-120 320 120v244q0 152-90.5 276.5T480-80Z" />
            </svg>
          )}
        </div>
        <p className="text-gray-500 dark:text-gray-500 light:text-gray-600 text-sm">{description}</p>
      </div>
    </Link>
  );
}

export function FeaturedAgencies() {
  const agencies = useQuery(api.agencies.listAgencies, { limit: 3 });

  // Default placeholder image for agencies without a cover image
  const defaultCoverImage =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCwwO9fglbToOHpbxSK0hM5XwwYE4qgYbPsIPkzUxlj3U9n4skPxoaNunMI-z0EL0LiRc1MAgZU2_B3G5Zgwd09MTtKUIBLGnk-ZfuC2ah_13m0wFT1iR1xGDKKWJQAxHYzLGxGb0xrNz73znHJ6rNeHXkRzFIbNxsNbVXM67eP9rTvXjcps9UJ1P7IwA8EADFp9iYsaF_T2qTSCP_9yve1UT2H_YwQOHPt8a1oRPY2k9fnJ3cYxLT-HTkZF2sqy5JeSvDLxXSBbo-o";

  // Determine category color based on index for visual variety
  const getCategoryColor = (index: number): "primary" | "secondary-accent" => {
    return index % 2 === 0 ? "primary" : "secondary-accent";
  };

  return (
    <section className="w-full max-w-6xl py-10 sm:py-12 md:py-16 overflow-hidden">
      <div className="w-full mx-auto px-4 mb-6 sm:mb-8 md:mb-10 flex items-center justify-between animate-fade-in-up">
        <h3 className="text-2xl sm:text-3xl font-bold text-white dark:text-white light:text-gray-900">Featured Agencies</h3>
        <div className="flex gap-2">
          <button className="w-10 h-10 rounded-full border border-white/10 dark:border-white/10 light:border-black/10 flex items-center justify-center text-white dark:text-white light:text-gray-900 hover:bg-white/10 dark:hover:bg-white/10 light:hover:bg-black/10 hover:border-primary/50 hover:scale-110 transition-all">
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
          <button className="w-10 h-10 rounded-full border border-white/10 dark:border-white/10 light:border-black/10 flex items-center justify-center text-white dark:text-white light:text-gray-900 hover:bg-white/10 dark:hover:bg-white/10 light:hover:bg-black/10 hover:border-primary/50 hover:scale-110 transition-all">
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

      <div className="flex overflow-x-auto no-scrollbar pb-8 sm:pb-12 px-2 sm:px-4 md:px-0 space-x-4 sm:space-x-6 md:ml-[max(2rem,calc((100vw-1280px)/2))] animate-fade-in-up animation-delay-200">
        {agencies === undefined ? (
          // Loading skeleton
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex-none w-80 animate-pulse">
              <div className="h-52 rounded-2xl bg-white/10 dark:bg-white/10 light:bg-black/10 mb-5" />
              <div className="h-6 w-3/4 bg-white/10 dark:bg-white/10 light:bg-black/10 rounded mb-2" />
              <div className="h-4 w-1/2 bg-white/10 dark:bg-white/10 light:bg-black/10 rounded" />
            </div>
          ))
        ) : agencies.length === 0 ? (
          <p className="text-gray-500">No agencies available yet.</p>
        ) : (
          agencies.map((agency, index) => (
            <AgencyCard
              key={agency._id}
              name={agency.name}
              slug={agency.slug}
              description={agency.description}
              category={agency.category}
              categoryColor={getCategoryColor(index)}
              backgroundImage={agency.coverImage || defaultCoverImage}
              verified={agency.verified}
            />
          ))
        )}
      </div>
    </section>
  );
}
