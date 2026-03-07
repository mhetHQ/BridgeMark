"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AgencyProfilePage() {
  const params = useParams();
  const slug = params.id as string;
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const agency = useQuery(api.agencies.getAgencyBySlug, { slug });

  useEffect(() => {
    if (!heroRef.current || !agency) return;
    const els = heroRef.current.querySelectorAll("[data-reveal]");
    gsap.fromTo(
      els,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power3.out" }
    );
  }, [agency]);

  useEffect(() => {
    if (!contentRef.current || !agency) return;
    const sections = contentRef.current.querySelectorAll("[data-section]");
    sections.forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 85%" },
        }
      );
    });
  }, [agency]);

  // Loading state
  if (agency === undefined) {
    return (
      <div className="w-full min-h-screen bg-[var(--color-background-dark)] light:bg-[var(--color-background-light)] text-white light:text-gray-900 overflow-x-hidden">
        <div className="noise-overlay" />
        <Navbar />
        <main className="relative z-10 flex flex-col items-center w-full pt-36 pb-20 px-6 md:px-10">
          <div className="w-full max-w-5xl">
            <div className="animate-pulse">
              <div className="h-64 md:h-80 bg-white/[0.03] mb-8" />
              <div className="h-8 bg-white/[0.03] w-1/3 mb-4" />
              <div className="h-5 bg-white/[0.03] w-2/3 mb-8" />
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-3">
                  <div className="h-4 bg-white/[0.03] w-full" />
                  <div className="h-4 bg-white/[0.03] w-full" />
                  <div className="h-4 bg-white/[0.03] w-3/4" />
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
      <div className="w-full min-h-screen bg-[var(--color-background-dark)] light:bg-[var(--color-background-light)] text-white light:text-gray-900 overflow-x-hidden">
        <div className="noise-overlay" />
        <Navbar />
        <main className="relative z-10 flex flex-col items-center justify-center w-full min-h-[60vh] pt-36 pb-20 px-6 md:px-10">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Agency Not Found</h1>
            <p className="text-gray-500 mb-8">The agency you&apos;re looking for doesn&apos;t exist or has been removed.</p>
            <Link
              href="/agencies"
              className="rounded-full px-6 py-2.5 bg-white text-black text-sm font-semibold hover:bg-gray-200 transition-colors"
            >
              Browse Agencies
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const backgroundImage = agency.coverImage || "/placeholder-agency.jpg";

  return (
    <div className="w-full min-h-screen bg-[var(--color-background-dark)] light:bg-[var(--color-background-light)] text-white light:text-gray-900 overflow-x-hidden">
      <div className="noise-overlay" />
      <Navbar />

      <main className="relative z-10 flex flex-col items-center w-full pt-36 pb-20 px-6 md:px-10">
        {/* Breadcrumb */}
        <div className="w-full max-w-5xl mb-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/agencies" className="hover:text-white transition-colors">
              Agencies
            </Link>
            <span>/</span>
            <span className="text-white light:text-gray-900">{agency.name}</span>
          </nav>
        </div>

        {/* Hero Banner */}
        <section ref={heroRef} className="w-full max-w-5xl mb-12">
          <div className="relative h-64 md:h-80 overflow-hidden mb-8">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${backgroundImage}')` }}
            />
            <div className="absolute inset-0 bg-linear-to-t from-[var(--color-background-dark)] light:from-[var(--color-background-light)] via-black/50 to-transparent" />
            <div className="absolute bottom-6 left-6 flex flex-wrap items-center gap-3">
              <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-gray-300 bg-black/60 backdrop-blur-sm px-3 py-1.5 border border-white/[0.08]">
                {agency.category}
              </span>
              {agency.verified && (
                <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-primary bg-black/60 backdrop-blur-sm px-3 py-1.5 border border-white/[0.08]">
                  Verified
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-10">
            {/* Main Content */}
            <div ref={contentRef} className="flex-1">
              <div data-reveal className="mb-8 opacity-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h1 className="text-3xl md:text-5xl font-bold mb-3">{agency.name}</h1>
                    <p className="text-lg text-gray-500">{agency.description}</p>
                  </div>
                  {agency.rating && (
                    <div className="text-right shrink-0">
                      <p className="text-2xl font-bold text-white">{agency.rating}</p>
                      <p className="text-xs text-gray-500">{agency.reviewCount} reviews</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Stats */}
              <div data-section className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.06] light:bg-black/[0.08] mb-12 opacity-0">
                {[
                  { label: "Location", value: agency.location },
                  { label: "Founded", value: agency.founded },
                  { label: "Team Size", value: agency.teamSize },
                  { label: "Min Budget", value: agency.minBudget },
                ].map((stat) => (
                  <div key={stat.label} className="bg-[var(--color-background-dark)] light:bg-[var(--color-background-light)] p-5">
                    <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-gray-600 mb-1">{stat.label}</p>
                    <p className="text-white font-semibold text-sm">{stat.value}</p>
                  </div>
                ))}
              </div>

              {/* About */}
              <div data-section className="mb-12 opacity-0">
                <p className="text-xs font-medium tracking-[0.3em] uppercase text-gray-500 mb-4">[About]</p>
                <p className="text-gray-400 leading-relaxed">{agency.longDescription}</p>
              </div>

              {/* Specialties */}
              <div data-section className="mb-12 opacity-0">
                <p className="text-xs font-medium tracking-[0.3em] uppercase text-gray-500 mb-4">[Specialties]</p>
                <div className="flex flex-wrap gap-2">
                  {agency.specialties.map((specialty: string) => (
                    <span
                      key={specialty}
                      className="px-3 py-1.5 text-sm text-gray-300 light:text-gray-700 border border-white/[0.06] light:border-black/[0.08] hover:border-white/[0.15] light:hover:border-black/[0.15] transition-colors"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              {/* Services */}
              <div data-section className="mb-12 opacity-0">
                <p className="text-xs font-medium tracking-[0.3em] uppercase text-gray-500 mb-4">[Services]</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/[0.06] light:bg-black/[0.08]">
                  {agency.services.map((service: string) => (
                    <div
                      key={service}
                      className="flex items-center gap-3 p-4 bg-[var(--color-background-dark)] light:bg-[var(--color-background-light)]"
                    >
                      <span className="w-1 h-1 bg-primary rounded-full" />
                      <span className="text-white text-sm">{service}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Industries */}
              <div data-section className="mb-12 opacity-0">
                <p className="text-xs font-medium tracking-[0.3em] uppercase text-gray-500 mb-4">[Industries]</p>
                <div className="flex flex-wrap gap-2">
                  {agency.industries.map((industry: string) => (
                    <span
                      key={industry}
                      className="px-3 py-1.5 text-sm text-gray-400 border border-white/[0.06] light:border-black/[0.08]"
                    >
                      {industry}
                    </span>
                  ))}
                </div>
              </div>

              {/* Case Studies */}
              {agency.caseStudies.length > 0 && (
                <div data-section className="mb-12 opacity-0">
                  <p className="text-xs font-medium tracking-[0.3em] uppercase text-gray-500 mb-6">[Case Studies]</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/[0.06] light:bg-black/[0.08]">
                    {agency.caseStudies.map((caseStudy: { title: string; description: string; result: string; image?: string; link?: string }) => (
                      <div
                        key={caseStudy.title}
                        className="bg-[var(--color-background-dark)] light:bg-[var(--color-background-light)] group cursor-pointer"
                      >
                        <div className="relative h-44 overflow-hidden">
                          <div
                            className="absolute inset-0 bg-cover bg-center transform group-hover:scale-105 transition-transform duration-500"
                            style={{ backgroundImage: `url('${caseStudy.image || "/placeholder-case-study.jpg"}')` }}
                          />
                          <div className="absolute inset-0 bg-linear-to-t from-[var(--color-background-dark)] to-transparent" />
                        </div>
                        <div className="p-5">
                          <h3 className="text-sm font-semibold mb-1">{caseStudy.title}</h3>
                          <p className="text-xs text-primary">{caseStudy.result}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Testimonials */}
              {agency.testimonials && agency.testimonials.length > 0 && (
                <div data-section className="mb-12 opacity-0">
                  <p className="text-xs font-medium tracking-[0.3em] uppercase text-gray-500 mb-6">[Testimonials]</p>
                  <div className="border border-white/[0.06] light:border-black/[0.08] p-8">
                    <p className="text-xl text-white light:text-gray-900 leading-relaxed mb-6">
                      &ldquo;{agency.testimonials[0].quote}&rdquo;
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 border border-white/[0.1] light:border-black/[0.1] flex items-center justify-center text-xs font-semibold text-gray-400">
                        {agency.testimonials[0].author.charAt(0)}
                      </div>
                      <div>
                        <p className="text-white text-sm font-medium">{agency.testimonials[0].author}</p>
                        <p className="text-gray-500 text-xs">{agency.testimonials[0].company}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:w-72">
              <div className="border border-white/[0.06] light:border-black/[0.08] p-6 sticky top-32">
                <p className="text-xs font-medium tracking-[0.2em] uppercase text-gray-500 mb-6">Get in Touch</p>

                <div className="space-y-3 mb-6">
                  <Link
                    href={`mailto:${agency.email}?subject=Inquiry%20about%20your%20services`}
                    className="w-full flex items-center justify-center rounded-full px-6 py-3 bg-white text-black text-sm font-semibold hover:bg-gray-200 transition-colors"
                  >
                    Request Quote &rarr;
                  </Link>

                  {agency.website && (
                    <a
                      href={agency.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center rounded-full px-6 py-3 border border-white/[0.06] light:border-black/[0.1] text-white light:text-gray-900 text-sm font-medium hover:border-white/[0.15] light:hover:border-black/[0.2] transition-colors"
                    >
                      Visit Website &nearr;
                    </a>
                  )}
                </div>

                <div className="border-t border-white/[0.06] light:border-black/[0.08] pt-6">
                  <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-gray-600 mb-4">Quick Info</p>
                  <div className="space-y-3 text-sm text-gray-400">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Location</span>
                      <span>{agency.location}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Team</span>
                      <span>{agency.teamSize}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Founded</span>
                      <span>{agency.founded}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Budget</span>
                      <span>From {agency.minBudget}</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-white/[0.06] light:border-black/[0.08] pt-4 mt-6">
                  <p className="text-[10px] text-gray-600 text-center">
                    Protected by BridgeMark
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Back link */}
        <section className="w-full max-w-5xl mt-4">
          <Link
            href="/agencies"
            className="text-sm text-gray-500 hover:text-white light:hover:text-gray-900 transition-colors"
          >
            &larr; Back to all agencies
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}
