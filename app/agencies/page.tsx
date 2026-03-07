"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Doc } from "@/convex/_generated/dataModel";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const categories = [
  "All",
  "Marketing",
  "Development",
  "Design",
  "Content",
  "SEO",
  "Social Media",
  "Branding",
  "Video Production",
  "PR & Communications",
];

const locations = [
  "All Locations",
  "New York, USA",
  "Los Angeles, USA",
  "London, UK",
  "San Francisco, USA",
  "Austin, USA",
  "Remote",
];

type Agency = Doc<"agencies">;

function AgencyCard({ agency, index }: { agency: Agency; index: number }) {
  const cardRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: index * 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: cardRef.current, start: "top 90%" },
      }
    );
  }, [index]);

  const backgroundImage = agency.coverImage || "/placeholder-agency.jpg";

  return (
    <Link
      ref={cardRef}
      href={`/agencies/${agency.slug}`}
      className="block group cursor-pointer opacity-0"
    >
      <div className="relative h-48 overflow-hidden mb-4 border border-white/[0.06] light:border-black/[0.08] group-hover:border-white/[0.15] light:group-hover:border-black/[0.2] transition-all duration-500">
        <div
          className="absolute inset-0 bg-cover bg-center transform group-hover:scale-105 transition-transform duration-700"
          style={{ backgroundImage: `url('${backgroundImage}')` }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/30 to-transparent" />
        <div className="absolute bottom-3 left-3">
          <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-gray-300 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/[0.08]">
            {agency.category}
          </span>
        </div>
        {agency.rating && (
          <div className="absolute bottom-3 right-3 text-xs text-gray-300 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full border border-white/[0.08]">
            {agency.rating.toFixed(1)}
          </div>
        )}
      </div>
      <div>
        <div className="flex justify-between items-center mb-1">
          <p className="text-white light:text-gray-900 text-lg font-semibold group-hover:text-primary transition-colors duration-300">
            {agency.name}
          </p>
          {agency.verified && (
            <span className="text-[10px] font-medium tracking-wider uppercase text-primary">
              Verified
            </span>
          )}
        </div>
        <p className="text-gray-500 text-sm mb-3 line-clamp-2 leading-relaxed">
          {agency.description}
        </p>
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <span>{agency.location}</span>
          <span className="w-px h-3 bg-white/[0.08]" />
          <span>{agency.teamSize}</span>
          <span className="w-px h-3 bg-white/[0.08]" />
          <span>{agency.minBudget}+</span>
        </div>
      </div>
    </Link>
  );
}

function SearchInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="relative flex-1 min-w-[200px]">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">&#x2315;</span>
      <input
        type="text"
        placeholder="Search agencies, services, specialties..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-full bg-white/[0.03] light:bg-black/[0.04] border border-white/[0.06] light:border-black/[0.08] px-10 py-3 text-white light:text-gray-900 placeholder:text-gray-600 focus:outline-none focus:border-white/[0.15] light:focus:border-black/[0.2] transition-colors text-sm"
      />
    </div>
  );
}

function FilterDropdown({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="relative min-w-[160px]">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none rounded-full bg-white/[0.03] light:bg-black/[0.04] border border-white/[0.06] light:border-black/[0.08] px-4 py-3 text-white light:text-gray-900 text-sm focus:outline-none focus:border-white/[0.15] light:focus:border-black/[0.2] transition-colors cursor-pointer"
      >
        {options.map((option) => (
          <option key={option} value={option} className="bg-[#0a0a0a] text-white">
            {option}
          </option>
        ))}
      </select>
      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none text-xs">&#9662;</span>
    </div>
  );
}

export default function AgenciesPage() {
  const heroRef = useRef<HTMLElement>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");

  const agencies = useQuery(api.agencies.listAgencies, {
    category: selectedCategory !== "All" ? selectedCategory : undefined,
    search: searchQuery || undefined,
  });

  const filteredAgencies = useMemo(() => {
    if (!agencies) return [];
    if (selectedLocation === "All Locations") return agencies;
    return agencies.filter((agency) => agency.location === selectedLocation);
  }, [agencies, selectedLocation]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedLocation("All Locations");
  };

  const hasActiveFilters =
    searchQuery !== "" ||
    selectedCategory !== "All" ||
    selectedLocation !== "All Locations";

  const isLoading = agencies === undefined;

  useEffect(() => {
    if (!heroRef.current) return;
    const els = heroRef.current.querySelectorAll("[data-hero]");
    gsap.fromTo(
      els,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power3.out" }
    );
  }, []);

  return (
    <div className="w-full bg-[var(--color-background-dark)] light:bg-[var(--color-background-light)] text-white light:text-gray-900 overflow-x-hidden">
      <div className="noise-overlay" />
      <Navbar />

      <main className="relative z-10 flex flex-col items-center w-full">
        {/* Hero */}
        <section ref={heroRef} className="w-full max-w-7xl pt-36 pb-16 px-6 md:px-10">
          <p data-hero className="text-xs font-medium tracking-[0.3em] uppercase text-gray-500 mb-6 opacity-0">
            [Directory]
          </p>
          <h1 data-hero className="text-4xl md:text-6xl font-bold leading-[1.1] tracking-tight mb-6 opacity-0">
            Find your perfect<br />
            <span className="text-purple-500">agency partner.</span>
          </h1>
          <p data-hero className="text-gray-500 text-lg md:text-xl max-w-xl leading-relaxed opacity-0">
            Browse our curated directory of top-tier agencies, verified and rated
            by real clients.
          </p>
        </section>

        {/* Search & Filters */}
        <section className="w-full max-w-7xl px-6 md:px-10 mb-8">
            <div className="border rounded-lg border-white/[0.06] light:border-black/[0.08] p-5">
            <div className="flex flex-col lg:flex-row gap-3">
              <SearchInput value={searchQuery} onChange={setSearchQuery} />
              <div className="flex flex-col sm:flex-row gap-3">
                <FilterDropdown
                  options={categories}
                  value={selectedCategory}
                  onChange={setSelectedCategory}
                />
                <FilterDropdown
                  options={locations}
                  value={selectedLocation}
                  onChange={setSelectedLocation}
                />
              </div>
            </div>

            {hasActiveFilters && (
                <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/[0.06] light:border-black/[0.08]">
                <span className="text-sm text-gray-500">
                  {isLoading ? "Loading..." : `${filteredAgencies.length} agencies found`}
                </span>
                <button
                  onClick={clearFilters}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Category Pills */}
        <section className="w-full max-w-7xl px-6 md:px-10 mb-12">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-300 border ${
                  selectedCategory === category
                    ? "bg-white light:bg-gray-900 text-black light:text-white border-white light:border-gray-900"
                    : "bg-transparent text-gray-500 border-white/[0.06] light:border-black/[0.1] hover:text-white light:hover:text-gray-900 hover:border-white/[0.15] light:hover:border-black/[0.2]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* Agency Grid */}
        <section className="w-full max-w-7xl px-6 md:px-10 pb-20">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-48 bg-white/[0.03] mb-4" />
                  <div className="h-5 bg-white/[0.03] w-3/4 mb-2" />
                  <div className="h-4 bg-white/[0.03] w-full mb-2" />
                  <div className="h-3 bg-white/[0.03] w-1/2" />
                </div>
              ))}
            </div>
          ) : filteredAgencies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredAgencies.map((agency, i) => (
                <AgencyCard key={agency._id} agency={agency} index={i} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <h3 className="text-xl font-semibold text-white light:text-gray-900 mb-2">
                No agencies found
              </h3>
              <p className="text-gray-500 mb-8">
                Try adjusting your search or filters.
              </p>
              <button
                onClick={clearFilters}
                className="rounded-full px-6 py-2.5 bg-white text-black text-sm font-semibold hover:bg-gray-200 transition-colors"
              >
                Clear all filters
              </button>
            </div>
          )}
        </section>

        <div className="section-line w-full max-w-7xl mx-auto" />

        {/* CTA */}
        <section className="w-full max-w-3xl px-6 md:px-10 py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Can&apos;t find the right fit?
          </h2>
          <p className="text-gray-500 text-lg mb-10 max-w-xl mx-auto">
            Let our matching system find the perfect agency for your
            specific needs. It only takes 2 minutes.
          </p>
          <Link
            href="/get-matched"
            className="inline-block rounded-full px-8 py-3 bg-white text-black text-sm font-semibold hover:bg-gray-200 transition-colors"
          >
            Get Matched Now &rarr;
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}
