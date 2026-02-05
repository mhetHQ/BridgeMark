import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const stats = [
  { value: "2026", label: "Founded" },
  { value: "40+", label: "Projected Countries" },
  { value: "500+", label: " Target Agencies" },
  { value: "$50M+", label: "Aim Projects Facilitated" },
];

const values = [
  {
    title: "Transparency",
    description: "Every interaction, every contract, every review is verifiable on-chain. No hidden fees, no surprises.",
    icon: "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z",
  },
  {
    title: "Quality First",
    description: "We rigorously vet every agency. Only the top 1% make it through our multi-stage verification process.",
    icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z",
  },
  {
    title: "Innovation",
    description: "From AI-powered matching to smart contracts, we're building the future of agency partnerships.",
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
  },
  {
    title: "Community",
    description: "We're more than a marketplace. We're a global network of creators, strategists, and visionaries.",
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
  },
];

const team = [
  {
    name: "mhet",
    role: "CEO & Co-Founder",
    bio: "",
    image: "/Mhet_Pic.jpeg",
  },
  {
    name: "Deedaro",
    role: "CTO & Co-Founder",
    // bio: "Ex-Google engineer. Blockchain enthusiast and AI researcher.",
    image: "/Deedaro_pic.png",
  },
  // {
  //   name: "Marcus Johnson",
  //   role: "Head of Partnerships",
  //   bio: "Built agency networks at two Fortune 500 companies.",
  //   image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
  // },
  // {
  //   name: "Elena Rodriguez",
  //   role: "Head of Product",
  //   bio: "Product leader with experience at Stripe and Figma.",
  //   image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
  // },
];

const milestones = [
  { year: "2026 Q1", title: "The Beginning", description: "Founded with a vision to revolutionize agency partnerships" },
  // { year: "2026 Q2", title: "Seed Funding", description: "Raised $5M to build our AI matching technology" },
  { year: "2026 Q1", title: "Platform Launch", description: "Launching with 50 vetted agencies across countries" },
  { year: "2026 Q2", title: "Web3 Integration", description: "Introduced smart contracts and blockchain verification" },
  { year: "2026 Q3", title: "Global Expansion", description: "Reaching 500+ agencies in 40+ countries" },
];

export default function AboutPage() {
  return (
    <div className="w-full bg-black dark:bg-black light:bg-background-light text-white dark:text-white light:text-gray-900 overflow-x-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0 dot-grid opacity-20" />
      <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(circle_at_50%_50%,rgba(189,0,255,0.08)_0%,rgba(0,0,0,0)_60%)] light:hidden" />
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-secondary-accent/20 dark:bg-secondary-accent/20 light:hidden light:bg-secondary-accent/10 blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[120px] pointer-events-none z-0 light:hidden" />

      <Navbar />

      <main className="relative z-10 flex flex-col items-center w-full pt-32 pb-20 px-4 md:px-10">
        {/* Hero Section */}
        <section className="w-full max-w-6xl text-center mb-20">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/5 dark:bg-white/5 light:bg-black/5 border border-white/10 dark:border-white/10 light:border-black/10 backdrop-blur-md mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(0,240,255,1)]" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-300 dark:text-gray-300 light:text-gray-600">Our Story</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black leading-[1.1] tracking-[-0.03em] mb-6">
            Building the future of
            <span className="light:bg-primary dark:bg-secondary-accent bg-clip-text text-transparent block mt-2">
              agency partnerships
            </span>
          </h1>

          <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            We started Bridgemark with a simple belief: finding the right marketing agency shouldn&apos;t feel like a gamble. 
            It should be transparent, efficient, and powered by technology that actually works for you.
          </p>
        </section>

        {/* Stats Section */}
        <section className="w-full max-w-6xl mb-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="group relative rounded-2xl p-[1px] bg-gradient-to-b from-white/10 dark:from-white/10 light:from-black/10 to-transparent hover:from-primary/50 hover:to-secondary-accent/50 transition-all duration-500"
              >
                <div className="relative flex flex-col items-center gap-2 h-full rounded-2xl bg-black/80 dark:bg-black/80 light:bg-white/80 backdrop-blur-xl p-8 border border-white/5 dark:border-white/5 light:border-black/5 group-hover:border-transparent transition-all text-center">
                  <p className="text-4xl md:text-5xl font-black text-white dark:text-white light:text-gray-900">{stat.value}</p>
                  <p className="text-gray-400 dark:text-gray-400 light:text-gray-500 text-sm font-medium uppercase tracking-wider">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Mission Section */}
        <section className="w-full max-w-6xl mb-24">
          <div className="glass-card rounded-3xl p-10 md:p-16 relative overflow-hidden">
            {/* <div className="absolute -right-20 -top-20 w-72 h-72 bg-secondary-accent/20 rounded-full blur-[100px] pointer-events-none" /> */}
            {/* <div className="absolute -left-20 -bottom-20 w-72 h-72 bg-primary/20 rounded-full blur-[100px] pointer-events-none" /> */}

            <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-black mb-6">
                  Our <span className="text-transparent bg-clip-text bg-secondary-accent">Mission</span>
                </h2>
                <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 text-lg leading-relaxed mb-6">
                  To democratize access to world-class marketing talent by creating the most transparent, 
                  efficient, and trustworthy marketplace in the industry.
                </p>
                <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 text-lg leading-relaxed">
                  We leverage AI to match businesses with their perfect agency partners, and blockchain 
                  technology to ensure every agreement is secure, transparent, and fair.
                </p>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-secondary-accent/20 to-primary/20 p-8 border border-white/10 dark:border-white/10 light:border-black/10">
                  <div className="w-full h-full rounded-xl bg-black/50 dark:bg-black/50 light:bg-gray-100 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-32 h-32 text-primary/50"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="w-full max-w-6xl mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black mb-4">
              What We <span className="text-transparent bg-clip-text bg-primary">Stand For</span>
            </h2>
            <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 text-lg max-w-2xl mx-auto">
              Our core values guide everything we do, from how we build our platform to how we treat our community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="glass-card rounded-2xl p-8 group transition-all duration-500 hover:border-primary/40"
              >
                <div className="size-12 rounded-xl bg-white/5 dark:bg-white/5 light:bg-black/5 flex items-center justify-center border border-white/10 dark:border-white/10 light:border-black/10 text-primary mb-6 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d={value.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white dark:text-white light:text-gray-900 mb-3 group-hover:text-primary transition-colors">
                  {value.title}
                </h3>
                <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Timeline Section */}
        <section className="w-full max-w-4xl mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black mb-4">
              Our <span className="text-transparent bg-clip-text bg-secondary-accent">Journey</span>
            </h2>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary-accent to-primary/20" />

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={milestone.year}
                  className={`relative flex items-center gap-8 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-8 md:left-1/2 w-4 h-4 -ml-2 rounded-full bg-primary shadow-[0_0_15px_rgba(0,240,255,0.5)] z-10" />

                  {/* Content */}
                  <div className={`ml-20 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"}`}>
                    <div className="glass-card rounded-2xl p-6 inline-block">
                      <span className="text-primary font-bold text-lg">{milestone.year}</span>
                      <h3 className="text-white dark:text-white light:text-gray-900 font-bold text-xl mt-1">{milestone.title}</h3>
                      <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 mt-2">{milestone.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="w-full max-w-6xl mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black mb-4">
              Meet the <span className="text-transparent bg-clip-text bg-primary">Team</span>
            </h2>
            <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 text-lg max-w-2xl mx-auto">
              A diverse group of innovators, marketers, and technologists united by a shared vision.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <div
                key={member.name}
                className="group relative rounded-2xl p-[1px] bg-gradient-to-b from-white/10 dark:from-white/10 light:from-black/10 to-transparent hover:from-primary/50 hover:to-secondary-accent/50 transition-all duration-500"
              >
                <div className="relative flex flex-col h-full rounded-2xl bg-black/80 dark:bg-black/80 light:bg-white/80 backdrop-blur-xl overflow-hidden border border-white/5 dark:border-white/5 light:border-black/5 group-hover:border-transparent transition-all">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-white dark:text-white light:text-gray-900 font-bold text-lg group-hover:text-primary transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-primary/80 text-sm font-medium mb-2">{member.role}</p>
                    <p className="text-gray-500 text-sm">{member.bio}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full max-w-4xl">
          <div className="glass-card rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-secondary-accent/10 via-transparent to-primary/10" />

            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-black mb-6">
                Ready to find your perfect agency?
              </h2>
              <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 text-lg mb-8 max-w-xl mx-auto">
                Join thousands of businesses who would find their ideal marketing partners through Bridgemark.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/get-matched"
                  className="group flex items-center justify-center rounded-full h-14 px-8 hover:border-secondary-accent border border-white/20 dark:border-white/20 light:border-black/20 text-white dark:text-white light:text-gray-900 hover:bg-right transition-all duration-500 text-lg font-bold"
                >
                  Get Matched Now
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-2"
                    fill="currentColor"
                    viewBox="0 -960 960 960"
                  >
                    <path d="m422-232 207-248H469l29-227-185 267h139l-30 208Z" />
                  </svg>
                </Link>
                <Link
                  href="/"
                  className="flex items-center justify-center rounded-full h-14 px-8 bg-black/40 dark:bg-black/40 light:bg-white/80 hover:bg-white/10 dark:hover:bg-white/10 light:hover:bg-black/10 border border-white/20 dark:border-white/20 light:border-black/20 text-white dark:text-white light:text-gray-900 text-lg font-medium backdrop-blur-md transition-all hover:border-primary/50"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
