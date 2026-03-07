"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  { id: "branding", label: "Branding" },
  { id: "seo", label: "SEO" },
  { id: "paid_ads", label: "Paid Ads" },
  { id: "content", label: "Content" },
  { id: "web3", label: "Web3 / Crypto" },
  { id: "design", label: "UI/UX Design" },
];

const timelines = [
  { id: "asap", label: "ASAP" },
  { id: "1month", label: "1 Month" },
  { id: "3months", label: "1-3 Months" },
  { id: "flexible", label: "Flexible" },
];

const budgets = [
  { value: "micro (< $5k)", label: "< $5k" },
  { value: "small ($5k - $10k)", label: "$5k - $10k" },
  { value: "medium ($10k - $25k)", label: "$10k - $25k" },
  { value: "large ($25k - $50k)", label: "$25k - $50k" },
  { value: "enterprise ($50k +)", label: "$50k +" },
];

type FormStatus = "idle" | "loading" | "success" | "error";

export default function GetMatchedPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [budget, setBudget] = useState("");
  const [industry, setIndustry] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedTimeline, setSelectedTimeline] = useState("");
  const [details, setDetails] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const heroRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const toggleService = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance
      if (heroRef.current) {
        const els = heroRef.current.querySelectorAll("[data-reveal]");
        gsap.fromTo(
          els,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: "power3.out", delay: 0.2 }
        );
      }

      // Form entrance
      if (formRef.current) {
        gsap.fromTo(
          formRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: formRef.current, start: "top 85%" },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/form/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          budget,
          industry,
          services: selectedServices,
          timeline: selectedTimeline,
          details,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("success");
      setName("");
      setEmail("");
      setBudget("");
      setIndustry("");
      setSelectedServices([]);
      setSelectedTimeline("");
      setDetails("");
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Failed to submit form");
    }
  };

  return (
    <div className="w-full bg-[var(--color-background-dark)] light:bg-[var(--color-background-light)] text-white light:text-gray-900 overflow-x-hidden flex flex-col min-h-screen">
      <div className="noise-overlay" />
      <Navbar />

      <main className="relative z-10 flex-1 flex flex-col items-center justify-start pt-36 pb-20 px-4 md:px-10">
        <div className="w-full max-w-[720px] flex flex-col items-center">
          {/* Hero */}
          <div ref={heroRef} className="text-center mb-16 w-full">
            <p data-reveal className="text-xs font-medium tracking-[0.3em] uppercase text-gray-500 mb-6 opacity-0">
              [Get Matched]
            </p>
            <h1 data-reveal className="text-4xl md:text-6xl font-black leading-[1.05] tracking-tight mb-6 opacity-0">
              Tell us what<br />
              <span className="text-gradient">you need.</span>
            </h1>
            <p data-reveal className="text-gray-500 text-lg md:text-xl max-w-lg mx-auto leading-relaxed opacity-0">
              Connect with premium agencies tailored to your requirements
              in under 24 hours.
            </p>
          </div>

          {/* Form Card */}
          <div
            ref={formRef}
            className="w-full border border-white/[0.06] light:border-black/[0.08] p-6 md:p-10 opacity-0"
          >
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-16 h-16 border border-white/[0.1] flex items-center justify-center mb-6">
                  <span className="text-primary text-2xl">&#10003;</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">We&apos;re on it</h3>
                <p className="text-gray-500 max-w-md mb-8">
                  Your request has been submitted. Check your inbox for
                  confirmation. We&apos;ll match you within 24 hours.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="text-sm font-semibold text-white hover:text-primary transition-colors"
                >
                  Submit another request &rarr;
                </button>
              </div>
            ) : (
              <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
                {/* Error */}
                {status === "error" && (
                  <div className="border border-red-500/30 bg-red-500/5 px-5 py-4 text-red-400 text-sm">
                    <span className="font-semibold">Error:</span> {errorMessage}
                  </div>
                )}

                {/* Name & Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-gray-500 text-[10px] font-semibold uppercase tracking-[0.2em]" htmlFor="name">
                      Your Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      className="w-full rounded-full bg-white/[0.03] light:bg-black/[0.04] border border-white/[0.06] light:border-black/[0.1] px-5 py-3.5 text-white light:text-gray-900 text-sm placeholder:text-gray-600 focus:outline-none focus:border-white/[0.2] light:focus:border-black/[0.3] transition-colors"
                      id="name"
                      placeholder="John Doe"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-gray-500 text-[10px] font-semibold uppercase tracking-[0.2em]" htmlFor="email">
                      Email <span className="text-red-400">*</span>
                    </label>
                    <input
                      className="w-full rounded-full bg-white/[0.03] light:bg-black/[0.04] border border-white/[0.06] light:border-black/[0.1] px-5 py-3.5 text-white light:text-gray-900 text-sm placeholder:text-gray-600 focus:outline-none focus:border-white/[0.2] light:focus:border-black/[0.3] transition-colors"
                      id="email"
                      placeholder="john@company.com"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                {/* Budget & Industry */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-gray-500 text-[10px] font-semibold uppercase tracking-[0.2em]" htmlFor="budget">
                      Budget <span className="text-red-400">*</span>
                    </label>
                    <select
                      className="w-full appearance-none rounded-full bg-white/[0.03] light:bg-black/[0.04] border border-white/[0.06] light:border-black/[0.1] px-5 py-3.5 text-white light:text-gray-900 text-sm focus:outline-none focus:border-white/[0.2] light:focus:border-black/[0.3] transition-colors cursor-pointer"
                      id="budget"
                      required
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                    >
                      <option value="" disabled className="bg-[#0a0a0a] text-gray-400">
                        Select a range
                      </option>
                      {budgets.map((b) => (
                        <option key={b.value} value={b.value} className="bg-[#0a0a0a] text-white">
                          {b.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-gray-500 text-[10px] font-semibold uppercase tracking-[0.2em]" htmlFor="industry">
                      Industry <span className="text-red-400">*</span>
                    </label>
                    <input
                      className="w-full rounded-full bg-white/[0.03] light:bg-black/[0.04] border border-white/[0.06] light:border-black/[0.1] px-5 py-3.5 text-white light:text-gray-900 text-sm placeholder:text-gray-600 focus:outline-none focus:border-white/[0.2] light:focus:border-black/[0.3] transition-colors"
                      id="industry"
                      placeholder="e.g. Fintech, E-commerce"
                      type="text"
                      required
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                    />
                  </div>
                </div>

                {/* Services */}
                <div className="flex flex-col gap-3">
                  <label className="text-gray-500 text-[10px] font-semibold uppercase tracking-[0.2em] flex items-center gap-2">
                    Services <span className="text-red-400">*</span>
                    <span className="text-gray-600 font-normal normal-case text-xs">(Select all that apply)</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {services.map((service) => (
                      <button
                        key={service.id}
                        type="button"
                        onClick={() => toggleService(service.id)}
                        className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 ${
                          selectedServices.includes(service.id)
                            ? "border-white light:border-gray-900 bg-white light:bg-gray-900 text-black light:text-white"
                            : "border-white/[0.06] light:border-black/[0.1] text-gray-500 hover:border-white/[0.15] light:hover:border-black/[0.2] hover:text-white light:hover:text-gray-900"
                        }`}
                      >
                        {service.label}
                      </button>
                    ))}
                  </div>
                  {selectedServices.length === 0 && (
                    <p className="text-red-400/60 text-xs">Select at least one service</p>
                  )}
                </div>

                {/* Timeline */}
                <div className="flex flex-col gap-3">
                  <label className="text-gray-500 text-[10px] font-semibold uppercase tracking-[0.2em]">
                    Timeline <span className="text-red-400">*</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {timelines.map((timeline) => (
                      <button
                        key={timeline.id}
                        type="button"
                        onClick={() => setSelectedTimeline(timeline.id)}
                        className={`rounded-full border py-2.5 px-3 text-sm font-medium transition-all duration-300 ${
                          selectedTimeline === timeline.id
                            ? "border-white light:border-gray-900 bg-white light:bg-gray-900 text-black light:text-white"
                            : "border-white/[0.06] light:border-black/[0.1] text-gray-500 hover:border-white/[0.15] light:hover:border-black/[0.2] hover:text-white light:hover:text-gray-900"
                        }`}
                      >
                        {timeline.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Details */}
                <div className="flex flex-col gap-2">
                  <label className="text-gray-500 text-[10px] font-semibold uppercase tracking-[0.2em]" htmlFor="details">
                    Project Details
                  </label>
                  <textarea
                    className="w-full rounded-2xl bg-white/[0.03] light:bg-black/[0.04] border border-white/[0.06] light:border-black/[0.1] px-5 py-3.5 text-white light:text-gray-900 text-sm placeholder:text-gray-600 focus:outline-none focus:border-white/[0.2] light:focus:border-black/[0.3] transition-colors resize-none"
                    id="details"
                    placeholder="Describe your goals, target audience, and requirements..."
                    rows={3}
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                  />
                </div>

                {/* Divider */}
                <div className="h-px w-full bg-white/[0.06] light:bg-black/[0.08]" />

                {/* Submit */}
                <button
                  className="w-full rounded-full h-14 bg-white text-black text-sm font-semibold hover:bg-gray-200 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                  type="submit"
                  disabled={status === "loading" || selectedServices.length === 0 || !selectedTimeline}
                >
                  {status === "loading" ? "Finding agencies..." : "Find my agencies"}
                </button>
              </form>
            )}
          </div>

          {/* Trust Row */}
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-gray-600">
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em]">Verified Partners</span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em]">Secure Escrow</span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em]">24h Matching</span>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
