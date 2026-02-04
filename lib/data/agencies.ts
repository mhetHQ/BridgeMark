export interface Agency {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  category: string;
  categoryColor: "primary" | "secondary-accent";
  backgroundImage: string;
  logo?: string;
  verified: boolean;
  rating: number;
  reviewCount: number;
  location: string;
  founded: string;
  teamSize: string;
  specialties: string[];
  services: string[];
  caseStudies: {
    title: string;
    result: string;
    image: string;
  }[];
  testimonial?: {
    quote: string;
    author: string;
    company: string;
  };
  website?: string;
  minBudget: string;
  industries: string[];
}

export const categories = [
  "All",
  "Web3",
  "Growth",
  "Transformation",
  "AR/VR",
  "Branding",
  "SEO",
  "Social Media",
  "Content",
  "Performance",
];

export const locations = [
  "All Locations",
  "New York, USA",
  "London, UK",
  "Berlin, Germany",
  "Singapore",
  "Tokyo, Japan",
  "Sydney, Australia",
  "Toronto, Canada",
  "Dubai, UAE",
];

export const agencies: Agency[] = [
  {
    id: "neon-strategies",
    name: "Neon Strategies",
    description: "Specializing in Web3 Marketing",
    longDescription: "Neon Strategies is a cutting-edge Web3 marketing agency that helps blockchain projects, DAOs, and NFT collections build authentic communities and drive meaningful engagement. Our team of crypto-native marketers understands the unique challenges and opportunities in the decentralized space.",
    category: "Web3",
    categoryColor: "primary",
    backgroundImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuCwwO9fglbToOHpbxSK0hM5XwwYE4qgYbPsIPkzUxlj3U9n4skPxoaNunMI-z0EL0LiRc1MAgZU2_B3G5Zgwd09MTtKUIBLGnk-ZfuC2ah_13m0wFT1iR1xGDKKWJQAxHYzLGxGb0xrNz73znHJ6rNeHXkRzFIbNxsNbVXM67eP9rTvXjcps9UJ1P7IwA8EADFp9iYsaF_T2qTSCP_9yve1UT2H_YwQOHPt8a1oRPY2k9fnJ3cYxLT-HTkZF2sqy5JeSvDLxXSBbo-o",
    verified: true,
    rating: 4.9,
    reviewCount: 127,
    location: "New York, USA",
    founded: "2021",
    teamSize: "25-50",
    specialties: ["DeFi Marketing", "NFT Launches", "DAO Growth", "Token Economics"],
    services: ["Community Building", "Influencer Partnerships", "Content Strategy", "PR & Communications"],
    caseStudies: [
      { title: "MetaVerse DAO Launch", result: "500K+ community members in 3 months", image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800" },
      { title: "NFT Collection Sellout", result: "$12M in primary sales", image: "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=800" },
    ],
    testimonial: {
      quote: "Neon Strategies helped us go from 0 to 500K community members. Their Web3 expertise is unmatched.",
      author: "Alex Chen",
      company: "MetaVerse DAO",
    },
    website: "https://neonstrategies.io",
    minBudget: "$25,000",
    industries: ["Blockchain", "DeFi", "NFTs", "Gaming"],
  },
  {
    id: "cyber-growth",
    name: "Cyber Growth",
    description: "Growth Hacking Experts",
    longDescription: "Cyber Growth is a data-driven growth agency that combines cutting-edge technology with proven marketing strategies. We specialize in helping startups and scale-ups achieve exponential growth through innovative acquisition channels and retention strategies.",
    category: "Growth",
    categoryColor: "secondary-accent",
    backgroundImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuDmoXqIP0NID10s0TDfd6HLNr9YSOQRh7QilYVIFNDmU49f_3LmffaJU5nIxI_J2lEXolNGLGr7_Iup9sc8-FcpSliuoRH85YdVuM6-aagyh9JemLwHPVnbC3ixzfpEMZSdu4aj80OC3_UXw9d2ngQnoeON6tJaVgezWdsZ-I4vi5No1IezyBb9fkpgqVMnDIDGLrRn7nvKkvuzPyKGYtYs5FfSQZ4tzadXiV2cKW8kPWrrF48A3-rXMF9ZaWi1Djg0aUecp3UdW2uG",
    verified: true,
    rating: 4.8,
    reviewCount: 89,
    location: "London, UK",
    founded: "2019",
    teamSize: "50-100",
    specialties: ["Product-Led Growth", "Viral Loops", "A/B Testing", "Funnel Optimization"],
    services: ["Growth Strategy", "User Acquisition", "Conversion Optimization", "Analytics & Attribution"],
    caseStudies: [
      { title: "SaaS Platform Scale", result: "10x MRR in 12 months", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800" },
      { title: "E-commerce Growth", result: "300% increase in conversions", image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800" },
    ],
    testimonial: {
      quote: "The team at Cyber Growth transformed our acquisition strategy completely. Best decision we made.",
      author: "Sarah Miller",
      company: "TechScale Inc",
    },
    website: "https://cybergrowth.co",
    minBudget: "$15,000",
    industries: ["SaaS", "E-commerce", "Fintech", "Healthcare"],
  },
  {
    id: "future-media",
    name: "Future Media",
    description: "Digital Transformation Leaders",
    longDescription: "Future Media is a full-service digital transformation agency that helps enterprises modernize their marketing stack and customer experience. We bridge the gap between traditional marketing and cutting-edge digital strategies.",
    category: "Transformation",
    categoryColor: "primary",
    backgroundImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuDAZ6HPuPPYUxL8Zx88B1eGaDIFHTK2MBodTYh9Qd_ZzPSOnUWazqoqj1YICDPP_WtufrR1cbbUovEUW8ak7a2KjJiQkpOlQoLZGiPIpqCip9Q5R1Ho_sEQTjZhvsdGn-NTd8-wSE-la14DMAaR2k5KrsFzjb55oKV58tVUJ4BM7WttlmTAPOhog8VlBUOU9YGW15CMAEbH-qaJ5gIEsg64BzrT0LzPmgMeHdGMmvabb0sNfUwEYFsK5l0Rs1NUO06YHW7GXjBQQqv4",
    verified: true,
    rating: 4.7,
    reviewCount: 156,
    location: "Berlin, Germany",
    founded: "2017",
    teamSize: "100-200",
    specialties: ["MarTech Integration", "Customer Data Platforms", "Omnichannel Strategy", "AI/ML Solutions"],
    services: ["Digital Strategy", "Technology Consulting", "Implementation", "Training & Support"],
    caseStudies: [
      { title: "Enterprise CDP Implementation", result: "40% increase in customer LTV", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800" },
      { title: "Omnichannel Transformation", result: "Unified 12 channels in 6 months", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800" },
    ],
    testimonial: {
      quote: "Future Media helped us modernize our entire marketing infrastructure. The ROI has been incredible.",
      author: "Michael Weber",
      company: "Global Retail Corp",
    },
    website: "https://futuremedia.de",
    minBudget: "$50,000",
    industries: ["Enterprise", "Retail", "Financial Services", "Manufacturing"],
  },
  {
    id: "vortex-creative",
    name: "Vortex Creative",
    description: "AR/VR Experiences",
    longDescription: "Vortex Creative is a pioneering immersive technology agency that creates stunning AR and VR experiences for brands. From virtual showrooms to augmented reality campaigns, we push the boundaries of what's possible in experiential marketing.",
    category: "AR/VR",
    categoryColor: "secondary-accent",
    backgroundImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuC9ytegb53-kFx9CZdfK2n-MuzWCggOvg6CTC6YIGsDhy1ZVTIZNZpXRePkQ6oQGzJhqCUqtAGboP-Zi806PyihMhJTk5AFOoM4TpzCVRDNaS2tJKZJ_yYKFD9Buo1iOhY3Va66mQaNmNGuUtkNkMdT9yOVp2ERtDMRPtpiVfu1Wv6Hl9ph5sMJ87J6vUXbNJWZg_hc71o_Gqsi34RxJEXA0L3XX7SaK1t8gfrpqzZF2Qb3nT5LPOCxC6Qwc5w5vbvXneOVQhOg-Xtr",
    verified: true,
    rating: 4.9,
    reviewCount: 64,
    location: "Tokyo, Japan",
    founded: "2020",
    teamSize: "25-50",
    specialties: ["Virtual Reality", "Augmented Reality", "3D Design", "Spatial Computing"],
    services: ["VR Experiences", "AR Campaigns", "Virtual Events", "Metaverse Strategy"],
    caseStudies: [
      { title: "Virtual Fashion Show", result: "2M+ virtual attendees", image: "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=800" },
      { title: "AR Product Try-On", result: "85% reduction in returns", image: "https://images.unsplash.com/photo-1626379953822-baec19c3accd?w=800" },
    ],
    testimonial: {
      quote: "Vortex brought our brand into the metaverse in a way we never imagined possible.",
      author: "Yuki Tanaka",
      company: "Luxe Fashion",
    },
    website: "https://vortexcreative.jp",
    minBudget: "$30,000",
    industries: ["Fashion", "Entertainment", "Real Estate", "Automotive"],
  },
  {
    id: "pulse-branding",
    name: "Pulse Branding",
    description: "Strategic Brand Development",
    longDescription: "Pulse Branding is a creative powerhouse that helps companies define and express their unique identity. From startups finding their voice to enterprises refreshing their image, we create brands that resonate and endure.",
    category: "Branding",
    categoryColor: "primary",
    backgroundImage: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800",
    verified: true,
    rating: 4.8,
    reviewCount: 203,
    location: "Sydney, Australia",
    founded: "2015",
    teamSize: "50-100",
    specialties: ["Brand Strategy", "Visual Identity", "Brand Architecture", "Naming"],
    services: ["Brand Audit", "Identity Design", "Brand Guidelines", "Rebranding"],
    caseStudies: [
      { title: "Tech Startup Rebrand", result: "150% increase in brand awareness", image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800" },
      { title: "Corporate Identity Overhaul", result: "Won 3 design awards", image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800" },
    ],
    testimonial: {
      quote: "Pulse didn't just design our logo—they helped us discover who we really are as a company.",
      author: "Emma Thompson",
      company: "Innovate Labs",
    },
    website: "https://pulsebranding.au",
    minBudget: "$20,000",
    industries: ["Technology", "Consumer Goods", "Professional Services", "Hospitality"],
  },
  {
    id: "apex-seo",
    name: "Apex SEO",
    description: "Search Engine Dominance",
    longDescription: "Apex SEO is a technical SEO agency that combines deep search engine expertise with content strategy to help brands dominate organic search results. Our data-driven approach delivers sustainable, long-term growth.",
    category: "SEO",
    categoryColor: "secondary-accent",
    backgroundImage: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800",
    verified: true,
    rating: 4.7,
    reviewCount: 178,
    location: "Toronto, Canada",
    founded: "2016",
    teamSize: "25-50",
    specialties: ["Technical SEO", "Content Strategy", "Link Building", "Local SEO"],
    services: ["SEO Audit", "Keyword Research", "Content Optimization", "Link Acquisition"],
    caseStudies: [
      { title: "E-commerce SEO Campaign", result: "450% organic traffic increase", image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800" },
      { title: "B2B Lead Generation", result: "First page rankings for 200+ keywords", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800" },
    ],
    testimonial: {
      quote: "Apex SEO transformed our organic presence. We're now ranking for terms we never thought possible.",
      author: "David Kim",
      company: "ShopMax",
    },
    website: "https://apexseo.ca",
    minBudget: "$10,000",
    industries: ["E-commerce", "B2B", "Healthcare", "Legal"],
  },
  {
    id: "viral-social",
    name: "Viral Social",
    description: "Social Media Mastery",
    longDescription: "Viral Social is a social-first agency that helps brands create content that spreads. From TikTok to LinkedIn, we understand the nuances of each platform and create strategies that drive engagement and build communities.",
    category: "Social Media",
    categoryColor: "primary",
    backgroundImage: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800",
    verified: true,
    rating: 4.6,
    reviewCount: 145,
    location: "Singapore",
    founded: "2018",
    teamSize: "50-100",
    specialties: ["TikTok Marketing", "Influencer Relations", "Community Management", "Social Commerce"],
    services: ["Social Strategy", "Content Creation", "Influencer Campaigns", "Paid Social"],
    caseStudies: [
      { title: "TikTok Brand Launch", result: "10M views in first month", image: "https://images.unsplash.com/photo-1596558450268-9c27524ba856?w=800" },
      { title: "Influencer Campaign", result: "500% ROI on influencer spend", image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800" },
    ],
    testimonial: {
      quote: "Viral Social made us relevant on TikTok when we had no idea where to start.",
      author: "Lisa Wong",
      company: "Beauty Collective",
    },
    website: "https://viralsocial.sg",
    minBudget: "$12,000",
    industries: ["Beauty", "Fashion", "Food & Beverage", "Entertainment"],
  },
  {
    id: "narrative-content",
    name: "Narrative Content",
    description: "Storytelling That Converts",
    longDescription: "Narrative Content is a content marketing agency that believes great stories drive great results. We help brands find their narrative voice and create content ecosystems that educate, engage, and convert.",
    category: "Content",
    categoryColor: "secondary-accent",
    backgroundImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800",
    verified: true,
    rating: 4.8,
    reviewCount: 112,
    location: "Dubai, UAE",
    founded: "2019",
    teamSize: "25-50",
    specialties: ["Content Strategy", "Thought Leadership", "Video Content", "Podcast Production"],
    services: ["Content Audit", "Editorial Planning", "Content Production", "Distribution Strategy"],
    caseStudies: [
      { title: "Thought Leadership Program", result: "50+ media mentions", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800" },
      { title: "Content Hub Launch", result: "300% increase in time on site", image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800" },
    ],
    testimonial: {
      quote: "Narrative helped us become the voice of authority in our industry.",
      author: "Ahmed Hassan",
      company: "FinServe Global",
    },
    website: "https://narrativecontent.ae",
    minBudget: "$15,000",
    industries: ["Finance", "Technology", "Professional Services", "Education"],
  },
  {
    id: "performance-labs",
    name: "Performance Labs",
    description: "Data-Driven Advertising",
    longDescription: "Performance Labs is a performance marketing agency obsessed with ROI. We combine advanced analytics, creative testing, and media buying expertise to deliver measurable results across all paid channels.",
    category: "Performance",
    categoryColor: "primary",
    backgroundImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
    verified: true,
    rating: 4.9,
    reviewCount: 198,
    location: "New York, USA",
    founded: "2017",
    teamSize: "100-200",
    specialties: ["Paid Search", "Programmatic", "Paid Social", "Attribution Modeling"],
    services: ["Media Planning", "Campaign Management", "Creative Testing", "Analytics & Reporting"],
    caseStudies: [
      { title: "D2C Brand Scale", result: "$50M in attributed revenue", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800" },
      { title: "Lead Gen Optimization", result: "65% reduction in CPL", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800" },
    ],
    testimonial: {
      quote: "Performance Labs doesn't just run ads—they engineer growth systems.",
      author: "Jennifer Brooks",
      company: "D2C Brands Co",
    },
    website: "https://performancelabs.io",
    minBudget: "$25,000",
    industries: ["D2C", "E-commerce", "Lead Generation", "App Marketing"],
  },
  {
    id: "quantum-digital",
    name: "Quantum Digital",
    description: "Next-Gen Digital Experiences",
    longDescription: "Quantum Digital is a forward-thinking agency that specializes in creating innovative digital experiences at the intersection of technology and creativity. We help brands stay ahead of the curve.",
    category: "Transformation",
    categoryColor: "secondary-accent",
    backgroundImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800",
    verified: true,
    rating: 4.7,
    reviewCount: 87,
    location: "London, UK",
    founded: "2020",
    teamSize: "25-50",
    specialties: ["AI Integration", "Automation", "UX Innovation", "Emerging Tech"],
    services: ["Digital Strategy", "AI Solutions", "Platform Development", "Innovation Consulting"],
    caseStudies: [
      { title: "AI Chatbot Implementation", result: "70% reduction in support tickets", image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800" },
      { title: "Customer Journey Automation", result: "45% increase in engagement", image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800" },
    ],
    testimonial: {
      quote: "Quantum helped us implement AI in ways that actually improved our customer experience.",
      author: "James Wilson",
      company: "ServicePro",
    },
    website: "https://quantumdigital.uk",
    minBudget: "$35,000",
    industries: ["Technology", "Financial Services", "Healthcare", "Telecommunications"],
  },
];

export function getAgencyById(id: string): Agency | undefined {
  return agencies.find((agency) => agency.id === id);
}

export function filterAgencies(
  searchQuery: string,
  category: string,
  location: string
): Agency[] {
  return agencies.filter((agency) => {
    const matchesSearch =
      searchQuery === "" ||
      agency.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agency.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agency.specialties.some((s) =>
        s.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesCategory =
      category === "All" || agency.category === category;

    const matchesLocation =
      location === "All Locations" || agency.location === location;

    return matchesSearch && matchesCategory && matchesLocation;
  });
}
