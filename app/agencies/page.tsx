"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Doc } from "@/convex/_generated/dataModel";

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

function AgencyCard({ agency }: { agency: Agency }) {
  // Alternate colors based on category
  const primaryCategories = ["Marketing", "Development", "SEO", "Video Production"];
  const isCategoryPrimary = primaryCategories.includes(agency.category);
  
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
  const verifiedIconColor = isCategoryPrimary
    ? "text-primary"
    : "text-secondary-accent";
  const shadowClass = isCategoryPrimary
    ? "shadow-[0_0_10px_rgba(0,240,255,0.5)]"
    : "shadow-[0_0_10px_rgba(189,0,255,0.5)]";

  // Use coverImage or fallback to a placeholder
  const backgroundImage = agency.coverImage || "/placeholder-agency.jpg";

  return (
    <Link href={`/agencies/${agency.slug}`} className="block group cursor-pointer">
      <div
        className={`relative h-52 rounded-2xl overflow-hidden mb-5 border border-white/10 ${hoverBorderClass} ${hoverShadowClass} transition-all duration-300`}
      >
        <div
          className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-700"
          style={{ backgroundImage: `url('${backgroundImage}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
        <div className="absolute bottom-4 left-4 flex gap-2">
          <span
            className={`bg-black/60 backdrop-blur-md ${badgeClass} text-xs font-bold px-3 py-1 rounded-full border`}
          >
            {agency.category}
          </span>
        </div>
        {agency.rating && (
          <div className="absolute bottom-4 right-4 flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-1 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4 text-yellow-400"
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-white text-xs font-semibold">{agency.rating.toFixed(1)}</span>
          </div>
        )}
      </div>
      <div>
        <div className="flex justify-between items-center mb-1">
          <p
            className={`text-white text-xl font-bold ${hoverTextClass} transition-colors`}
          >
            {agency.name}
          </p>
          {agency.verified && (
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
          )}
        </div>
        <p className="text-gray-500 text-sm mb-2 line-clamp-2">{agency.description}</p>
        <div className="flex items-center gap-4 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-3.5 h-3.5"
            >
              <path
                fillRule="evenodd"
                d="m11.54 22.351.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                clipRule="evenodd"
              />
            </svg>
            {agency.location}
          </span>
          <span className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-3.5 h-3.5"
            >
              <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z" />
            </svg>
            {agency.teamSize}
          </span>
          <span className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-3.5 h-3.5"
            >
              <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
              <path
                fillRule="evenodd"
                d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z"
                clipRule="evenodd"
              />
              <path d="M2.25 18a.75.75 0 000 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 00-.75-.75H2.25z" />
            </svg>
            {agency.minBudget}+
          </span>
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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
      >
        <path
          fillRule="evenodd"
          d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
          clipRule="evenodd"
        />
      </svg>
      <input
        type="text"
        placeholder="Search agencies, services, specialties..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder:text-gray-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
      />
    </div>
  );
}

function FilterDropdown({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="relative min-w-[160px]">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all cursor-pointer"
      >
        {options.map((option) => (
          <option key={option} value={option} className="bg-black text-white">
            {option}
          </option>
        ))}
      </select>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
      >
        <path
          fillRule="evenodd"
          d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
}

export default function AgenciesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");

  // Fetch agencies from Convex with real-time updates
  const agencies = useQuery(api.agencies.listAgencies, {
    category: selectedCategory !== "All" ? selectedCategory : undefined,
    search: searchQuery || undefined,
  });

  // Client-side location filtering (since Convex doesn't have location index)
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

  return (
    <div className="dark w-full min-h-screen bg-black text-white overflow-x-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0 dot-grid opacity-20" />
      <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,240,255,0.05)_0%,rgba(0,0,0,0)_60%)]" />
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-secondary-accent/15 blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[120px] pointer-events-none z-0" />

      <Navbar />

      <main className="relative z-10 flex flex-col items-center w-full pt-32 pb-20 px-4 md:px-10">
        {/* Hero Section */}
        <section className="w-full max-w-7xl text-center mb-12">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(0,240,255,1)]" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-300">
              Agency Directory
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black leading-[1.1] tracking-[-0.03em] mb-6">
            Find your perfect
            <span className="bg-gradient-to-r from-primary via-[#4DFFFF] to-secondary-accent bg-clip-text text-transparent block mt-2">
              agency partner
            </span>
          </h1>

          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
            Browse our curated directory of top-tier agencies, verified and rated
            by real clients. Filter by specialty, location, or budget to find your
            match.
          </p>
        </section>

        {/* Search & Filters */}
        <section className="w-full max-w-7xl mb-12">
          <div className="glass-card rounded-2xl p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <SearchInput value={searchQuery} onChange={setSearchQuery} />
              <div className="flex flex-col sm:flex-row gap-4">
                <FilterDropdown
                  label="Category"
                  options={categories}
                  value={selectedCategory}
                  onChange={setSelectedCategory}
                />
                <FilterDropdown
                  label="Location"
                  options={locations}
                  value={selectedLocation}
                  onChange={setSelectedLocation}
                />
              </div>
            </div>

            {hasActiveFilters && (
              <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/10">
                <span className="text-sm text-gray-400">
                  {isLoading ? "Loading..." : `${filteredAgencies.length} agencies found`}
                </span>
                <button
                  onClick={clearFilters}
                  className="text-sm text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Category Pills */}
        <section className="w-full max-w-7xl mb-10">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  selectedCategory === category
                    ? "bg-primary text-black shadow-[0_0_15px_rgba(0,240,255,0.5)]"
                    : "bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10 hover:border-primary/30"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* Agency Grid */}
        <section className="w-full max-w-7xl">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-52 rounded-2xl bg-white/5 mb-5" />
                  <div className="h-6 bg-white/5 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-white/5 rounded w-full mb-2" />
                  <div className="h-4 bg-white/5 rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : filteredAgencies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredAgencies.map((agency) => (
                <AgencyCard key={agency._id} agency={agency} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-10 h-10 text-gray-500"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                No agencies found
              </h3>
              <p className="text-gray-400 mb-6">
                Try adjusting your search or filters to find what you&apos;re looking
                for.
              </p>
              <button
                onClick={clearFilters}
                className="px-6 py-3 bg-primary text-black font-bold rounded-full hover:bg-primary/90 transition-colors"
              >
                Clear all filters
              </button>
            </div>
          )}
        </section>

        {/* CTA Section */}
        <section className="w-full max-w-4xl mt-24">
          <div className="glass-card rounded-3xl p-10 md:p-14 text-center relative overflow-hidden">
            {/* <div className="absolute -right-20 -top-20 w-60 h-60 bg-secondary-accent/30 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute -left-20 -bottom-20 w-60 h-60 bg-primary/30 rounded-full blur-[80px] pointer-events-none" /> */}

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-black mb-4">
                Can&apos;t find the right fit?
              </h2>
              <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
                Let our AI-powered matching system find the perfect agency for your
                specific needs. It only takes 2 minutes.
              </p>
              <Link
                href="/get-matched"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-primary transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(0,240,255,0.5)]"
              >
                Get Matched Now
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
