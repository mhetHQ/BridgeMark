import { z } from "zod";

// Step 1: Agency Details Schema
export const agencyDetailsSchema = z.object({
  name: z
    .string()
    .min(2, "Agency name must be at least 2 characters")
    .max(100, "Agency name must be less than 100 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  website: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(150, "Description must be less than 150 characters"),
  longDescription: z
    .string()
    .min(50, "About section must be at least 50 characters")
    .max(2000, "About section must be less than 2000 characters"),
  logo: z.string().optional(),
  coverImage: z.string().optional(),
  location: z.string().min(2, "Please select a location"),
  founded: z.string().min(4, "Please enter a valid year"),
  teamSize: z.string().min(1, "Please select team size"),
  category: z.string().min(1, "Please select a primary category"),
  industries: z
    .array(z.string())
    .min(1, "Please select at least one industry")
    .max(6, "Maximum 6 industries allowed"),
});

// Step 2: Portfolio & Services Schema
export const portfolioSchema = z.object({
  specialties: z
    .array(z.string())
    .min(1, "Please add at least one specialty")
    .max(8, "Maximum 8 specialties allowed"),
  services: z
    .array(z.string())
    .min(1, "Please add at least one service")
    .max(10, "Maximum 10 services allowed"),
  caseStudies: z
    .array(
      z.object({
        title: z.string().min(3, "Title must be at least 3 characters"),
        description: z.string().min(10, "Description must be at least 10 characters"),
        result: z.string().min(5, "Result must be at least 5 characters"),
        image: z.string().optional(),
        link: z.string().url().optional().or(z.literal("")),
      })
    )
    .min(0)
    .max(6, "Maximum 6 case studies allowed"),
  portfolioImages: z.array(z.string()).optional(),
  testimonials: z
    .array(
      z.object({
        quote: z.string().min(20, "Quote must be at least 20 characters"),
        author: z.string().min(2, "Author name is required"),
        company: z.string().min(2, "Company name is required"),
        image: z.string().optional(),
      })
    )
    .optional(),
});

// Step 3: Pricing Schema
export const pricingSchema = z.object({
  minBudget: z.string().min(1, "Please select minimum budget"),
  maxBudget: z.string().optional(),
  pricingModel: z.string().min(1, "Please select a pricing model"),
  hourlyRate: z.string().optional(),
  retainerRange: z.string().optional(),
  projectRange: z.string().optional(),
  customPricing: z.string().max(500, "Custom pricing notes must be less than 500 characters").optional(),
});

// Step 4: Payment Schema
export const paymentSchema = z.object({
  listingFeeAmount: z.number().positive("Invalid amount"),
  listingFeeCurrency: z.string().min(1, "Currency is required"),
  paymentId: z.string().min(1, "Payment ID is required"),
  paymentMethod: z.string().optional(),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
});

// Combined schema for full application
export const agencyApplicationSchema = agencyDetailsSchema
  .merge(portfolioSchema)
  .merge(pricingSchema)
  .merge(paymentSchema.omit({ agreeToTerms: true }));

// Types
export type AgencyDetailsData = z.infer<typeof agencyDetailsSchema>;
export type PortfolioData = z.infer<typeof portfolioSchema>;
export type PricingData = z.infer<typeof pricingSchema>;
export type PaymentData = z.infer<typeof paymentSchema>;
export type AgencyApplicationData = z.infer<typeof agencyApplicationSchema>;

// Form default values
export const defaultAgencyDetails: AgencyDetailsData = {
  name: "",
  email: "",
  phone: "",
  website: "",
  description: "",
  longDescription: "",
  logo: "",
  coverImage: "",
  location: "",
  founded: "",
  teamSize: "",
  category: "",
  industries: [],
};

export const defaultPortfolio: PortfolioData = {
  specialties: [],
  services: [],
  caseStudies: [],
  portfolioImages: [],
  testimonials: [],
};

export const defaultPricing: PricingData = {
  minBudget: "",
  maxBudget: "",
  pricingModel: "",
  hourlyRate: "",
  retainerRange: "",
  projectRange: "",
  customPricing: "",
};

export const defaultPayment: PaymentData = {
  listingFeeAmount: 0,
  listingFeeCurrency: "USD",
  paymentId: "",
  paymentMethod: "",
  agreeToTerms: false,
};

// Options for form selects
export const categoryOptions = [
  "Web3",
  "Growth",
  "Transformation",
  "AR/VR",
  "Branding",
  "SEO",
  "Social Media",
  "Content",
  "Performance",
  "Design",
  "Development",
  "Strategy",
];

export const industryOptions = [
  "Blockchain",
  "DeFi",
  "NFTs",
  "Gaming",
  "SaaS",
  "E-commerce",
  "Fintech",
  "Healthcare",
  "Enterprise",
  "Retail",
  "Financial Services",
  "Manufacturing",
  "Technology",
  "Consumer Goods",
  "Professional Services",
  "Hospitality",
  "Fashion",
  "Entertainment",
  "Real Estate",
  "Automotive",
  "Education",
  "Legal",
  "B2B",
  "D2C",
  "App Marketing",
  "Telecommunications",
];

export const locationOptions = [
  "New York, USA",
  "Los Angeles, USA",
  "San Francisco, USA",
  "Chicago, USA",
  "Miami, USA",
  "London, UK",
  "Manchester, UK",
  "Berlin, Germany",
  "Munich, Germany",
  "Paris, France",
  "Amsterdam, Netherlands",
  "Singapore",
  "Hong Kong",
  "Tokyo, Japan",
  "Sydney, Australia",
  "Melbourne, Australia",
  "Toronto, Canada",
  "Vancouver, Canada",
  "Dubai, UAE",
  "Lagos, Nigeria",
  "Nairobi, Kenya",
  "Cape Town, South Africa",
  "Mumbai, India",
  "Bangalore, India",
  "São Paulo, Brazil",
  "Mexico City, Mexico",
  "Other",
];

export const teamSizeOptions = [
  "1-5",
  "6-10",
  "11-25",
  "25-50",
  "50-100",
  "100-200",
  "200-500",
  "500+",
];

export const budgetOptions = [
  "$1,000",
  "$2,500",
  "$5,000",
  "$10,000",
  "$15,000",
  "$20,000",
  "$25,000",
  "$30,000",
  "$40,000",
  "$50,000",
  "$75,000",
  "$100,000",
  "$150,000",
  "$200,000",
  "$250,000+",
];

export const pricingModelOptions = [
  { value: "project", label: "Project-Based" },
  { value: "retainer", label: "Monthly Retainer" },
  { value: "hourly", label: "Hourly Rate" },
  { value: "performance", label: "Performance-Based" },
  { value: "hybrid", label: "Hybrid Model" },
];

// Listing fee configuration
export const LISTING_FEE = {
  amount: 20,
  currency: "USDC",
  description: "Annual listing fee for agency directory (paid in crypto via Solana)",
};
