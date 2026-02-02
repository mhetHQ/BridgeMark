"use client";

import Link from "next/link";
import { useState } from "react";

const services = [
  { id: "branding", label: "Branding", icon: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" },
  { id: "seo", label: "SEO", icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" },
  { id: "paid_ads", label: "Paid Ads", icon: "M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" },
  { id: "content", label: "Content", icon: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" },
  { id: "web3", label: "Web3 / Crypto", icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" },
  { id: "design", label: "UI/UX Design", icon: "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" },
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

  const toggleService = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

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
      // Reset form
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
    <div className="dark w-full min-h-screen bg-black text-white overflow-x-hidden flex flex-col">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 dot-grid opacity-20" />
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-secondary-accent/20 rounded-full blur-[120px] opacity-60" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[700px] h-[700px] bg-primary/20 rounded-full blur-[120px] opacity-60" />
        <div className="absolute top-[40%] left-[20%] w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] opacity-40" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 w-full pointer-events-none">
        <div className="pointer-events-auto bg-black/70 backdrop-blur-xl border border-white/10 rounded-full pl-6 pr-2 py-2.5 flex items-center gap-8 shadow-[0_0_40px_rgba(0,0,0,0.8)] max-w-4xl mx-auto transition-all duration-300 hover:border-white/20">
          <Link
            className="flex items-center gap-2.5 text-white hover:opacity-80 transition-opacity group"
            href="/"
          >
            <div className="size-7 text-primary group-hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.8)] transition-all duration-300">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path
                  clipRule="evenodd"
                  d="M24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4ZM24 40C32.8366 40 40 32.8366 40 24C40 15.1634 32.8366 8 24 8C15.1634 8 8 15.1634 8 24C8 32.8366 15.1634 40 24 40Z"
                  fill="currentColor"
                  fillOpacity="0.3"
                  fillRule="evenodd"
                />
                <path d="M24 12L14 36H34L24 12Z" fill="currentColor" />
              </svg>
            </div>
            <h2 className="text-white text-xl font-black tracking-tight">bridgemark</h2>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link
              className="text-gray-300 hover:text-white hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.5)] text-sm font-semibold transition-all"
              href="/#agencies"
            >
              Agencies
            </Link>
            <Link
              className="text-gray-300 hover:text-white hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.5)] text-sm font-semibold transition-all"
              href="/#marketplace"
            >
              Marketplace
            </Link>
            <Link
              className="text-gray-300 hover:text-white hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.5)] text-sm font-semibold transition-all"
              href="/#about"
            >
              About
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <button className="flex cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-6 bg-white text-black hover:bg-primary transition-colors duration-300 text-sm font-bold leading-normal tracking-wide shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:shadow-[0_0_20px_rgba(0,240,255,0.6)]">
              <span className="truncate">Find Agency</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-start pt-32 pb-20 px-4 md:px-10 lg:px-20">
        <div className="w-full max-w-[800px] flex flex-col items-center">
          {/* Header */}
          <div className="text-center mb-12 relative w-full">
            <div className="absolute -top-10 left-[10%] md:left-[20%] animate-bounce z-10 hidden sm:block" style={{ animationDuration: "3s" }}>
              <div className="flex items-center gap-x-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 px-4 py-1.5 -rotate-3 hover:rotate-0 transition-transform cursor-default">
                <span className="text-xs">⚡</span>
                <p className="text-gray-300 text-xs font-semibold uppercase tracking-wide">Fast Matching</p>
              </div>
            </div>
            <div className="absolute -top-4 right-[5%] md:right-[15%] animate-bounce z-10 hidden sm:block" style={{ animationDuration: "4s" }}>
              <div className="flex items-center gap-x-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 px-4 py-1.5 rotate-6 hover:rotate-0 transition-transform cursor-default">
                <span className="text-xs">✨</span>
                <p className="text-gray-300 text-xs font-semibold uppercase tracking-wide">Top 1% Talent</p>
              </div>
            </div>

            <h1 className="text-white tracking-tighter text-5xl md:text-7xl font-black leading-[0.95] mb-6">
              Tell us what<br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-secondary-accent via-[#D946EF] to-primary">
                you need.
              </span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl font-normal max-w-lg mx-auto leading-relaxed">
              Connect with premium marketing agencies tailored to your unique requirements in under 24 hours.
            </p>
          </div>

          {/* Form Card */}
          <div className="w-full glass-card rounded-[2rem] p-6 md:p-10 relative overflow-hidden group transition-all duration-500">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-secondary-accent/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-secondary-accent/20 transition-all duration-700" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-primary/20 transition-all duration-700" />

            {status === "success" ? (
              /* Success State */
              <div className="relative z-10 flex flex-col items-center justify-center py-12 text-center">
                <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-6 ring-2 ring-primary/50">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">We&apos;re on it! 🚀</h3>
                <p className="text-gray-400 max-w-md mb-6">
                  Your request has been submitted successfully. Check your inbox for a confirmation email.
                  We&apos;ll match you with top agencies within 24 hours.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="text-primary hover:text-white transition-colors text-sm font-semibold"
                >
                  Submit another request →
                </button>
              </div>
            ) : (
              /* Form */
              <form className="flex flex-col gap-8 relative z-10" onSubmit={handleSubmit}>
                {/* Error Message */}
                {status === "error" && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-5 py-4 text-red-400 text-sm">
                    <span className="font-semibold">Error:</span> {errorMessage}
                  </div>
                )}

                {/* Name and Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-gray-300 text-xs font-bold uppercase tracking-widest pl-1" htmlFor="name">
                      Your Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      className="w-full rounded-2xl bg-white/5 border border-white/10 px-5 py-4 text-white text-base font-medium placeholder:text-gray-500 hover:border-white/20 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                      id="name"
                      placeholder="John Doe"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-gray-300 text-xs font-bold uppercase tracking-widest pl-1" htmlFor="email">
                      Email Address <span className="text-red-400">*</span>
                    </label>
                    <input
                      className="w-full rounded-2xl bg-white/5 border border-white/10 px-5 py-4 text-white text-base font-medium placeholder:text-gray-500 hover:border-white/20 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                      id="email"
                      placeholder="john@company.com"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                {/* Budget and Industry */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-gray-300 text-xs font-bold uppercase tracking-widest pl-1" htmlFor="budget">
                      Estimated Budget <span className="text-red-400">*</span>
                    </label>
                    <select
                      className="w-full appearance-none rounded-2xl bg-white/5 border border-white/10 px-5 py-4 text-white text-base font-medium hover:border-white/20 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all cursor-pointer"
                      id="budget"
                      required
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                    >
                      <option value="" disabled className="bg-black text-gray-400">
                        Select a range
                      </option>
                      {budgets.map((b) => (
                        <option key={b.value} value={b.value} className="bg-black text-white">
                          {b.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-gray-300 text-xs font-bold uppercase tracking-widest pl-1" htmlFor="industry">
                      Industry <span className="text-red-400">*</span>
                    </label>
                    <input
                      className="w-full rounded-2xl bg-white/5 border border-white/10 px-5 py-4 text-white text-base font-medium placeholder:text-gray-500 hover:border-white/20 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                      id="industry"
                      placeholder="e.g. Fintech, E-commerce"
                      type="text"
                      required
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                    />
                  </div>
                </div>

                {/* Service Type */}
                <div className="flex flex-col gap-3">
                  <label className="text-gray-300 text-xs font-bold uppercase tracking-widest pl-1 flex items-center gap-2">
                    Service Type <span className="text-red-400">*</span>
                    <span className="text-gray-500 font-normal normal-case">(Select all that apply)</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {services.map((service) => (
                      <button
                        key={service.id}
                        type="button"
                        onClick={() => toggleService(service.id)}
                        className={`flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition-all ${
                          selectedServices.includes(service.id)
                            ? "border-primary bg-primary/20 text-primary shadow-[0_0_15px_rgba(0,240,255,0.2)]"
                            : "border-white/10 bg-white/5 text-gray-400 hover:border-white/20 hover:bg-white/10"
                        }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d={service.icon} />
                        </svg>
                        {service.label}
                      </button>
                    ))}
                  </div>
                  {selectedServices.length === 0 && (
                    <p className="text-red-400/70 text-xs pl-1">Please select at least one service</p>
                  )}
                </div>

                {/* Timeline */}
                <div className="flex flex-col gap-2">
                  <label className="text-gray-300 text-xs font-bold uppercase tracking-widest pl-1">
                    Timeline <span className="text-red-400">*</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {timelines.map((timeline) => (
                      <button
                        key={timeline.id}
                        type="button"
                        onClick={() => setSelectedTimeline(timeline.id)}
                        className={`rounded-2xl border py-3 px-2 text-sm font-medium transition-all ${
                          selectedTimeline === timeline.id
                            ? "border-primary bg-primary/10 text-primary ring-1 ring-primary"
                            : "border-white/10 bg-white/5 text-gray-400 hover:border-white/20 hover:bg-white/10"
                        }`}
                      >
                        {timeline.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Project Details */}
                <div className="flex flex-col gap-2">
                  <label className="text-gray-300 text-xs font-bold uppercase tracking-widest pl-1" htmlFor="details">
                    Project Details
                  </label>
                  <textarea
                    className="w-full rounded-2xl bg-white/5 border border-white/10 px-5 py-4 text-white text-base font-medium placeholder:text-gray-500 hover:border-white/20 focus:border-primary focus:ring-1 focus:ring-primary outline-none resize-none transition-all"
                    id="details"
                    placeholder="Describe your goals, target audience, and any specific requirements..."
                    rows={3}
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                  />
                </div>

                {/* Divider */}
                <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent my-1" />

                {/* Submit Button */}
                <button
                  className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-secondary-accent to-primary p-[1px] shadow-[0_0_25px_rgba(0,240,255,0.3)] hover:shadow-[0_0_40px_rgba(189,0,255,0.4)] transition-all active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
                  type="submit"
                  disabled={status === "loading" || selectedServices.length === 0 || !selectedTimeline}
                >
                  <div className="relative bg-black/80 rounded-2xl px-8 py-5 flex items-center justify-center gap-3 group-hover:bg-black/60 transition-all h-full">
                    <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
                    {status === "loading" ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span className="text-lg font-bold text-white tracking-wide">Finding agencies...</span>
                      </>
                    ) : (
                      <>
                        <span className="text-lg font-bold text-white tracking-wide">Find my agencies</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-primary group-hover:translate-x-1 group-hover:scale-110 transition-transform"
                          fill="currentColor"
                          viewBox="0 -960 960 960"
                        >
                          <path d="m422-232 207-248H469l29-227-185 267h139l-30 208Z" />
                        </svg>
                      </>
                    )}
                  </div>
                </button>
              </form>
            )}
          </div>

          {/* Trust Badges */}
          <div className="mt-10 flex flex-wrap justify-center gap-8 opacity-70">
            <div className="flex items-center gap-2 group cursor-default">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 group-hover:text-primary transition-colors" fill="currentColor" viewBox="0 -960 960 960">
                <path d="m438-338 226-226-57-57-169 169-84-84-57 57 141 141Zm42 258q-139-35-229.5-159.5T160-516v-244l320-120 320 120v244q0 152-90.5 276.5T480-80Z" />
              </svg>
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Verified Partners</span>
            </div>
            <div className="flex items-center gap-2 group cursor-default">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 group-hover:text-primary transition-colors" fill="currentColor" viewBox="0 -960 960 960">
                <path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm240-200q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80Z" />
              </svg>
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Secure Escrow</span>
            </div>
            <div className="flex items-center gap-2 group cursor-default">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 group-hover:text-primary transition-colors" fill="currentColor" viewBox="0 -960 960 960">
                <path d="m422-232 207-248H469l29-227-185 267h139l-30 208Z" />
              </svg>
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">24h Matching</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full border-t border-white/5 bg-black py-12">
        <div className="max-w-7xl mx-auto px-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="size-6 text-white opacity-50">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path
                  clipRule="evenodd"
                  d="M24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4ZM24 40C32.8366 40 40 32.8366 40 24C40 15.1634 32.8366 8 24 8C15.1634 8 8 15.1634 8 24C8 32.8366 15.1634 40 24 40Z"
                  fill="currentColor"
                  fillOpacity="0.5"
                  fillRule="evenodd"
                />
                <path d="M24 14L16 34H32L24 14Z" fill="currentColor" />
              </svg>
            </div>
            <p className="text-gray-600 text-sm">© 2024 Bridgemark. All rights reserved.</p>
          </div>
          <div className="flex gap-8">
            <Link className="text-gray-600 hover:text-primary transition-colors text-sm font-medium" href="#terms">
              Terms
            </Link>
            <Link className="text-gray-600 hover:text-primary transition-colors text-sm font-medium" href="#privacy">
              Privacy
            </Link>
            <Link className="text-gray-600 hover:text-primary transition-colors text-sm font-medium" href="#cookies">
              Cookies
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
