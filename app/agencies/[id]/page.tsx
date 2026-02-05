"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function AgencyProfilePage() {
  const params = useParams();
  const slug = params.id as string;
  
  const agency = useQuery(api.agencies.getAgencyBySlug, { slug });

  // Loading state
  if (agency === undefined) {
    return (
      <div className="w-full min-h-screen bg-black dark:bg-black light:bg-background-light text-white dark:text-white light:text-gray-900 overflow-x-hidden">
        <div className="fixed inset-0 pointer-events-none z-0 dot-grid opacity-20" />
        <Navbar />
        <main className="relative z-10 flex flex-col items-center w-full pt-32 pb-20 px-4 md:px-10">
          <div className="w-full max-w-6xl">
            <div className="animate-pulse">
              <div className="h-72 md:h-96 rounded-3xl bg-white/5 dark:bg-white/5 light:bg-black/5 mb-8" />
              <div className="h-10 bg-white/5 dark:bg-white/5 light:bg-black/5 rounded w-1/3 mb-4" />
              <div className="h-6 bg-white/5 dark:bg-white/5 light:bg-black/5 rounded w-2/3 mb-8" />
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-4">
                  <div className="h-4 bg-white/5 dark:bg-white/5 light:bg-black/5 rounded w-full" />
                  <div className="h-4 bg-white/5 dark:bg-white/5 light:bg-black/5 rounded w-full" />
                  <div className="h-4 bg-white/5 dark:bg-white/5 light:bg-black/5 rounded w-3/4" />
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Not found state
  if (agency === null) {
    return (
      <div className="w-full min-h-screen bg-black dark:bg-black light:bg-background-light text-white dark:text-white light:text-gray-900 overflow-x-hidden">
        <div className="fixed inset-0 pointer-events-none z-0 dot-grid opacity-20" />
        <Navbar />
        <main className="relative z-10 flex flex-col items-center justify-center w-full min-h-[60vh] pt-32 pb-20 px-4 md:px-10">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Agency Not Found</h1>
            <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 mb-8">The agency you&apos;re looking for doesn&apos;t exist or has been removed.</p>
            <Link href="/agencies" className="px-6 py-3 bg-primary text-black font-bold rounded-full hover:bg-primary/90 transition-colors">
              Browse Agencies
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Determine accent colors based on category
  const primaryCategories = ["Marketing", "Development", "SEO", "Video Production"];
  const isCategoryPrimary = primaryCategories.includes(agency.category);
  const accentColorClass = isCategoryPrimary ? "text-primary" : "text-secondary-accent";
  const accentBorderClass = isCategoryPrimary ? "border-primary/30" : "border-secondary-accent/30";
  const accentBgClass = isCategoryPrimary ? "bg-primary" : "bg-secondary-accent";
  const accentShadow = isCategoryPrimary
    ? "shadow-[0_0_20px_rgba(0,240,255,0.5)]"
    : "shadow-[0_0_20px_rgba(189,0,255,0.5)]";
  const glowClass = isCategoryPrimary
    ? "bg-primary/20"
    : "bg-secondary-accent/20";

  // Use coverImage or fallback
  const backgroundImage = agency.coverImage || "/placeholder-agency.jpg";

  return (
    <div className="w-full min-h-screen bg-black dark:bg-black light:bg-background-light text-white dark:text-white light:text-gray-900 overflow-x-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0 dot-grid opacity-20" />
      <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,240,255,0.05)_0%,rgba(0,0,0,0)_60%)]" />
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-secondary-accent/15 dark:bg-secondary-accent/15 light:bg-secondary-accent/10 blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[120px] pointer-events-none z-0" />

      <Navbar />

      <main className="relative z-10 flex flex-col items-center w-full pt-32 pb-20 px-4 md:px-10">
        {/* Breadcrumb */}
        <div className="w-full max-w-6xl mb-8">
          <nav className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-400 light:text-gray-500">
            <Link href="/agencies" className="hover:text-white dark:hover:text-white light:hover:text-gray-900 transition-colors">
              Agencies
            </Link>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path
                fillRule="evenodd"
                d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-white dark:text-white light:text-gray-900">{agency.name}</span>
          </nav>
        </div>

        {/* Hero Section */}
        <section className="w-full max-w-6xl mb-12">
          <div className="relative h-72 md:h-96 rounded-3xl overflow-hidden mb-8">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${backgroundImage}')` }}
            />
            <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex flex-wrap gap-3 mb-4">
                <span
                  className={`px-4 py-1.5 rounded-full text-sm font-bold ${accentBgClass} text-black`}
                >
                  {agency.category}
                </span>
                {agency.verified && (
                  <span className="px-4 py-1.5 rounded-full text-sm font-bold bg-white/10 backdrop-blur-md text-white border border-white/20 flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="16"
                      viewBox="0 -960 960 960"
                      width="16"
                      fill="currentColor"
                      className={accentColorClass}
                    >
                      <path d="m438-338 226-226-57-57-169 169-84-84-57 57 141 141Zm42 258q-139-35-229.5-159.5T160-516v-244l320-120 320 120v244q0 152-90.5 276.5T480-80Z" />
                    </svg>
                    Verified
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-4xl md:text-5xl font-black mb-2">{agency.name}</h1>
                  <p className="text-xl text-gray-400 dark:text-gray-400 light:text-gray-600">{agency.description}</p>
                </div>
                <div className="flex items-center gap-2 bg-white/5 dark:bg-white/5 light:bg-black/5 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 dark:border-white/10 light:border-black/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 text-yellow-400"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-white dark:text-white light:text-gray-900 font-bold text-lg">{agency.rating}</span>
                  <span className="text-gray-400 dark:text-gray-400 light:text-gray-500 text-sm">({agency.reviewCount} reviews)</span>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                <div className="glass-card rounded-md p-4">
                  <p className="text-gray-400 dark:text-gray-400 light:text-gray-500 text-xs uppercase tracking-wider mb-1">Location</p>
                  <p className="text-white dark:text-white light:text-gray-900 font-semibold">{agency.location}</p>
                </div>
                <div className="glass-card rounded-md p-4">
                  <p className="text-gray-400 dark:text-gray-400 light:text-gray-500 text-xs uppercase tracking-wider mb-1">Founded</p>
                  <p className="text-white dark:text-white light:text-gray-900 font-semibold">{agency.founded}</p>
                </div>
                <div className="glass-card rounded-md p-4">
                  <p className="text-gray-400 dark:text-gray-400 light:text-gray-500 text-xs uppercase tracking-wider mb-1">Team Size</p>
                  <p className="text-white dark:text-white light:text-gray-900 font-semibold">{agency.teamSize}</p>
                </div>
                <div className="glass-card rounded-md p-4">
                  <p className="text-gray-400 dark:text-gray-400 light:text-gray-500 text-xs uppercase tracking-wider mb-1">Min Budget</p>
                  <p className={`font-semibold ${accentColorClass}`}>{agency.minBudget}</p>
                </div>
              </div>

              {/* About */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold mb-4">About</h2>
                <p className="text-gray-300 dark:text-gray-300 light:text-gray-600 leading-relaxed">{agency.longDescription}</p>
              </div>

              {/* Specialties */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold mb-4">Specialties</h2>
                <div className="flex flex-wrap gap-2">
                  {agency.specialties.map((specialty: string) => (
                    <span
                      key={specialty}
                      className={`px-4 py-2 rounded-full text-sm font-medium bg-white/5 border ${accentBorderClass} ${accentColorClass}`}
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              {/* Services */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold mb-4">Services</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {agency.services.map((service: string) => (
                    <div
                      key={service}
                      className="flex items-center gap-3 p-4 glass-card rounded-xl"
                    >
                      <div className={`w-2 h-2 rounded-full ${accentBgClass}`} />
                      <span className="text-white dark:text-white light:text-gray-900">{service}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Industries */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold mb-4">Industries</h2>
                <div className="flex flex-wrap gap-2">
                  {agency.industries.map((industry: string) => (
                    <span
                      key={industry}
                      className="px-4 py-2 rounded-full text-sm font-medium bg-white/5 dark:bg-white/5 light:bg-black/5 border border-white/10 dark:border-white/10 light:border-black/10 text-gray-300 dark:text-gray-300 light:text-gray-600"
                    >
                      {industry}
                    </span>
                  ))}
                </div>
              </div>

              {/* Case Studies */}
              {agency.caseStudies.length > 0 && (
                <div className="mb-10">
                  <h2 className="text-2xl font-bold mb-6">Case Studies</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {agency.caseStudies.map((caseStudy: { title: string; description: string; result: string; image?: string; link?: string }) => (
                      <div
                        key={caseStudy.title}
                        className="glass-card rounded-2xl overflow-hidden group cursor-pointer"
                      >
                        <div className="relative h-48 overflow-hidden">
                          <div
                            className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-500"
                            style={{ backgroundImage: `url('${caseStudy.image || "/placeholder-case-study.jpg"}')` }}
                          />
                          <div className="absolute inset-0 bg-linear-to-t from-black to-transparent" />
                        </div>
                        <div className="p-5">
                          <h3 className="text-lg font-bold mb-2">{caseStudy.title}</h3>
                          <p className={`text-sm font-semibold ${accentColorClass}`}>
                            {caseStudy.result}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Testimonials */}
              {agency.testimonials && agency.testimonials.length > 0 && (
                <div className="mb-10">
                  <h2 className="text-2xl font-bold mb-6">What Clients Say</h2>
                  <div className={`glass-card rounded-2xl p-8 relative overflow-hidden border ${accentBorderClass}`}>
                    {/* <div className={`absolute -right-10 -top-10 w-40 h-40 ${glowClass} rounded-full blur-[60px] pointer-events-none`} /> */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className={`w-12 h-12 ${accentColorClass} opacity-30 mb-4`}
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <blockquote className="text-xl text-white dark:text-white light:text-gray-900 leading-relaxed mb-6 relative z-10">
                      &ldquo;{agency.testimonials[0].quote}&rdquo;
                    </blockquote>
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full ${accentBgClass} flex items-center justify-center text-black font-bold`}>
                        {agency.testimonials[0].author.charAt(0)}
                      </div>
                      <div>
                        <p className="text-white dark:text-white light:text-gray-900 font-semibold">{agency.testimonials[0].author}</p>
                        <p className="text-gray-400 dark:text-gray-400 light:text-gray-500 text-sm">{agency.testimonials[0].company}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:w-80">
              <div className="glass-card rounded-2xl p-6 sticky top-32">
                <h3 className="text-lg font-bold mb-6">Get in Touch</h3>

                <div className="space-y-4 mb-6">
                  <Link
                    href={`mailto:${agency.email}?subject=Inquiry%20about%20your%20services`}
                    className={`w-full flex items-center justify-center gap-2 px-6 py-4 ${accentBgClass} text-black font-bold rounded-xl hover:opacity-90 transition-all ${accentShadow}`}
                  >
                    Request Quote
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

                  {agency.website && (
                    <a
                      href={agency.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-white/5 dark:bg-white/5 light:bg-black/5 border border-white/10 dark:border-white/10 light:border-black/10 text-white dark:text-white light:text-gray-900 font-bold rounded-xl hover:bg-white/10 dark:hover:bg-white/10 light:hover:bg-black/10 hover:border-white/20 dark:hover:border-white/20 light:hover:border-black/20 transition-all"
                    >
                      Visit Website
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          fillRule="evenodd"
                          d="M15.75 2.25H21a.75.75 0 01.75.75v5.25a.75.75 0 01-1.5 0V4.81l-8.97 8.97a.75.75 0 11-1.06-1.06l8.97-8.97h-3.44a.75.75 0 010-1.5zm-10.5 4.5a1.5 1.5 0 00-1.5 1.5v10.5a1.5 1.5 0 001.5 1.5h10.5a1.5 1.5 0 001.5-1.5V10.5a.75.75 0 011.5 0v8.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V8.25a3 3 0 013-3h8.25a.75.75 0 010 1.5H5.25z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  )}
                </div>

                <div className="border-t border-white/10 dark:border-white/10 light:border-black/10 pt-6">
                  <h4 className="text-sm font-semibold text-gray-400 dark:text-gray-400 light:text-gray-500 uppercase tracking-wider mb-4">
                    Quick Info
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className={`w-5 h-5 ${accentColorClass}`}
                      >
                        <path
                          fillRule="evenodd"
                          d="m11.54 22.351.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-300 dark:text-gray-300 light:text-gray-600">{agency.location}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className={`w-5 h-5 ${accentColorClass}`}
                      >
                        <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z" />
                      </svg>
                      <span className="text-gray-300 dark:text-gray-300 light:text-gray-600">{agency.teamSize} employees</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className={`w-5 h-5 ${accentColorClass}`}
                      >
                        <path
                          fillRule="evenodd"
                          d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-300 dark:text-gray-300 light:text-gray-600">Founded {agency.founded}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className={`w-5 h-5 ${accentColorClass}`}
                      >
                        <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
                        <path
                          fillRule="evenodd"
                          d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z"
                          clipRule="evenodd"
                        />
                        <path d="M2.25 18a.75.75 0 000 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 00-.75-.75H2.25z" />
                      </svg>
                      <span className="text-gray-300 dark:text-gray-300 light:text-gray-600">From {agency.minBudget}</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-white/10 dark:border-white/10 light:border-black/10 pt-6 mt-6">
                  <p className="text-xs text-gray-500 text-center">
                    Protected by Bridgemark&apos;s secure messaging and smart contracts
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Back to Agencies */}
        <section className="w-full max-w-6xl mt-12">
          <Link
            href="/agencies"
            className="inline-flex items-center gap-2 text-gray-400 dark:text-gray-400 light:text-gray-500 hover:text-white dark:hover:text-white light:hover:text-gray-900 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M11.03 3.97a.75.75 0 010 1.06l-6.22 6.22H21a.75.75 0 010 1.5H4.81l6.22 6.22a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z"
                clipRule="evenodd"
              />
            </svg>
            Back to all agencies
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}
