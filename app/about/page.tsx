import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const stats = [
  { value: "2026", label: "Founded" },
  { value: "40+", label: "Projected Countries" },
  { value: "500+", label: "Target Agencies" },
  { value: "$50M+", label: "Aim Projects Facilitated" },
];

const values = [
  {
    title: "Vetted Excellence",
    description:
      "We don't just list agencies; we curate talent through rigorous proof-of-work validation and peer reviews. Only the top 1% make it through.",
  },
  {
    title: "Trustless Security",
    description:
      "Smart contract escrows ensure that funds are only released when milestones are met, protecting both parties without intermediaries.",
  },
  {
    title: "Radical Transparency",
    description:
      "Communication, timelines, and deliverables are immutable and visible to all stakeholders throughout the entire engagement journey.",
  },
];

const team = [
  {
    name: "mhet",
    role: "CEO & Co-Founder",
    bio: "",
    image: "/Mhet_Pic.jpeg",
    twitter: "https://x.com/mhetHQ",
  },
  {
    name: "Deedaro",
    role: "CTO & Co-Founder",
    bio: "",
    image: "/Deedaro_pic.png",
    twitter: "https://x.com/deedaro_xp",
  },
];

const milestones = [
  {
    year: "2026 Q1",
    title: "The Beginning",
    description: "Founded with a vision to revolutionize agency partnerships",
  },
  {
    year: "2026 Q1",
    title: "Platform Launch",
    description: "Launching with 50 vetted agencies across countries",
  },
  {
    year: "2026 Q2",
    title: "Web3 Integration",
    description: "Introduced smart contracts and blockchain verification",
  },
  {
    year: "2026 Q3",
    title: "Global Expansion",
    description: "Reaching 500+ agencies in 40+ countries",
  },
];

export default function AboutPage() {
  return (
    <div className="w-full bg-[var(--color-background-dark)] light:bg-[var(--color-background-light)] text-white light:text-gray-900 overflow-x-hidden">
      <div className="noise-overlay" />
      <div className="fixed inset-0 pointer-events-none z-0 dot-grid opacity-15" />

      <Navbar />

      <main className="relative z-10 flex flex-col items-center w-full pt-36 pb-20 px-4">
        {/* Hero */}
        <section className="w-full max-w-5xl mb-24">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-gray-500 mb-6">
            [About]
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-[-0.03em] mb-6 max-w-4xl">
            Professionalizing the{" "}
            <span className="text-primary">Wild West of Web3</span>
          </h1>
          <p className="text-gray-500 text-lg md:text-xl max-w-2xl leading-relaxed">
            Replacing vibe-based agreements with professional structure and
            reliable delivery for the next generation of the internet
          </p>
        </section>

        {/* Stats */}
        <section className="w-full max-w-5xl mb-24">
          <div className="flex flex-col sm:flex-row items-stretch justify-between gap-8 sm:gap-0 py-12 border-y border-white/[0.06] light:border-black/[0.08]">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`flex-1 flex flex-col items-center text-center gap-2 ${
                  i < stats.length - 1
                    ? "sm:border-r sm:border-white/[0.06] light:sm:border-black/[0.08]"
                    : ""
                }`}
              >
                <span className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white light:text-gray-900">
                  {stat.value}
                </span>
                <span className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] text-gray-600">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Bridging the Gap */}
        <section className="w-full max-w-5xl mb-24">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-gray-500 mb-4">
            [The Problem]
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-white light:text-gray-900 mb-12 tracking-tight">
            Bridging the Gap
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="border border-white/[0.06] light:border-black/[0.08] rounded-2xl p-8 sm:p-10 flex flex-col gap-4">
              <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-red-400">
                Before
              </span>
              <h4 className="font-bold text-white light:text-gray-900 text-xl">The Scrappy Past</h4>
              <p className="text-gray-500 text-sm leading-relaxed">
                Unreliable collaborations, vague scopes, and &quot;vibe-based&quot;
                trust that leads to friction, delays, and lost capital.
              </p>
            </div>
            <div className="border border-white/[0.06] light:border-black/[0.08] rounded-2xl p-8 sm:p-10 flex flex-col gap-4">
              <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-green-400">
                After
              </span>
              <h4 className="font-bold text-white light:text-gray-900 text-xl">
                The BridgeMark Future
              </h4>
              <p className="text-gray-500 text-sm leading-relaxed">
                Structured workflows, escrow-backed security, and professional
                agency standards built directly on-chain.
              </p>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="w-full max-w-5xl mb-24">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-gray-500 mb-4">
            [Mission]
          </p>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-black mb-6 tracking-tight">
                Our Mission
              </h2>
              <p className="text-gray-500 text-base sm:text-lg leading-relaxed mb-4">
                To democratize access to world-class marketing talent by creating
                the most transparent, efficient, and trustworthy marketplace in
                the industry.
              </p>
              <p className="text-gray-500 text-base sm:text-lg leading-relaxed">
                We leverage AI to match businesses with their perfect agency
                partners, and blockchain technology to ensure every agreement is
                secure, transparent, and fair.
              </p>
            </div>
            <div className="border border-white/[0.06] light:border-black/[0.08] rounded-2xl aspect-square flex items-center justify-center">
              <span className="text-6xl sm:text-7xl font-black text-white/[0.04] light:text-black/[0.06] select-none">
                BM
              </span>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="w-full max-w-5xl mb-24">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-gray-500 mb-4">
            [Values]
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-white light:text-gray-900 mb-12 tracking-tight">
            Core Values
          </h2>

          <div className="grid md:grid-cols-3 gap-px bg-white/[0.06] light:bg-black/[0.08] rounded-2xl overflow-hidden">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-[var(--color-background-dark)] light:bg-[var(--color-background-light)] p-7 sm:p-8 flex flex-col gap-4 group hover:bg-white/[0.02] light:hover:bg-black/[0.02] transition-colors duration-500"
              >
                <h3 className="text-lg font-bold text-white light:text-gray-900 group-hover:text-primary transition-colors duration-300">
                  {value.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section className="w-full max-w-5xl mb-24">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-gray-500 mb-4">
            [Roadmap]
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-white light:text-gray-900 mb-12 tracking-tight">
            Our Journey
          </h2>

          <div className="flex flex-col gap-0">
            {milestones.map((milestone) => (
              <div
                key={milestone.title}
                className="grid grid-cols-[100px_1fr] sm:grid-cols-[140px_1fr] gap-6 py-6 border-b border-white/[0.06] light:border-black/[0.08] last:border-b-0 group"
              >
                <span className="text-sm font-medium text-gray-600 pt-0.5">
                  {milestone.year}
                </span>
                <div>
                  <h3 className="text-white light:text-gray-900 font-bold text-base sm:text-lg group-hover:text-primary transition-colors duration-300">
                    {milestone.title}
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Philosophy Quote */}
        <section className="w-full max-w-4xl mb-24">
          <div className="border-y border-white/[0.06] light:border-black/[0.08] py-16 sm:py-20 text-center">
            <blockquote className="text-2xl sm:text-3xl md:text-4xl font-black text-white light:text-gray-900 leading-tight max-w-3xl mx-auto mb-6">
              &quot;Innovation shouldn&apos;t depend on memory, it deserves
              structure.&quot;
            </blockquote>
            <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-gray-600">
              — BridgeMark Philosophy
            </p>
          </div>
        </section>

        {/* Team */}
        <section className="w-full max-w-5xl mb-24">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-gray-500 mb-4">
            [Team]
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-white light:text-gray-900 mb-12 tracking-tight">
            Meet the Team
          </h2>

          <div className="flex flex-wrap gap-6">
            {team.map((member) => (
              <a
                key={member.name}
                href={member.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-72 border border-white/[0.06] light:border-black/[0.08] rounded-2xl overflow-hidden group hover:border-white/[0.12] light:hover:border-black/[0.15] transition-colors duration-500"
              >
                <div className="aspect-square overflow-hidden relative">
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-8 h-8 fill-white"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </div>
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-white light:text-gray-900 font-bold text-lg group-hover:text-primary transition-colors duration-300">
                    {member.name}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">{member.role}</p>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="w-full max-w-4xl">
          <div className="border border-white/[0.06] light:border-black/[0.08] rounded-2xl p-12 sm:p-16 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 tracking-tight">
              Ready to professionalize?
            </h2>
            <p className="text-gray-500 text-base sm:text-lg mb-8 max-w-xl mx-auto">
              Whether you are an agency seeking structure or a brand seeking
              excellence, BridgeMark is your on-chain home.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/get-matched"
                className="group flex items-center justify-center rounded-full h-12 sm:h-13 px-8 bg-white text-black text-sm sm:text-base font-semibold hover:scale-[1.03] transition-transform duration-300"
              >
                Get Matched Now
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/"
                className="flex items-center justify-center rounded-full h-12 sm:h-13 px-8 border border-white/10 light:border-black/15 text-white light:text-gray-900 text-sm sm:text-base font-medium hover:border-white/25 light:hover:border-black/25 transition-colors duration-300"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
