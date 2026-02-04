import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Agency applications/listings
  agencies: defineTable({
    // Profile Information (Step 1)
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    website: v.optional(v.string()),
    description: v.string(), // Short tagline
    longDescription: v.string(), // Detailed about
    logo: v.optional(v.string()), // UploadThing URL
    coverImage: v.optional(v.string()), // UploadThing URL
    location: v.string(),
    founded: v.string(),
    teamSize: v.string(),
    category: v.string(), // Primary category
    industries: v.array(v.string()),

    // Portfolio & Services (Step 2)
    specialties: v.array(v.string()),
    services: v.array(v.string()),
    caseStudies: v.array(
      v.object({
        title: v.string(),
        description: v.string(),
        result: v.string(),
        image: v.optional(v.string()), // UploadThing URL
        link: v.optional(v.string()),
      })
    ),
    portfolioImages: v.optional(v.array(v.string())), // UploadThing URLs
    testimonials: v.optional(
      v.array(
        v.object({
          quote: v.string(),
          author: v.string(),
          company: v.string(),
          image: v.optional(v.string()),
        })
      )
    ),

    // Pricing (Step 3)
    minBudget: v.string(),
    maxBudget: v.optional(v.string()),
    pricingModel: v.string(), // "project", "retainer", "hourly", "performance"
    hourlyRate: v.optional(v.string()),
    retainerRange: v.optional(v.string()),
    projectRange: v.optional(v.string()),
    customPricing: v.optional(v.string()),

    // Payment & Status (Step 4)
    listingFeeAmount: v.number(),
    listingFeeCurrency: v.string(),
    paymentId: v.string(), // Payment provider transaction ID
    paymentStatus: v.string(), // "pending", "completed", "failed"
    paymentMethod: v.optional(v.string()),
    paymentDate: v.optional(v.number()), // Unix timestamp

    // System fields
    status: v.string(), // "pending_review", "approved", "rejected", "suspended"
    verified: v.boolean(),
    featured: v.boolean(),
    rating: v.optional(v.number()),
    reviewCount: v.optional(v.number()),
    slug: v.string(), // URL-friendly ID
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_email", ["email"])
    .index("by_slug", ["slug"])
    .index("by_status", ["status"])
    .index("by_category", ["category"])
    .index("by_payment_status", ["paymentStatus"])
    .searchIndex("search_agencies", {
      searchField: "name",
      filterFields: ["status", "category", "verified"],
    }),

  // Agency reviews
  reviews: defineTable({
    agencyId: v.id("agencies"),
    reviewerName: v.string(),
    reviewerEmail: v.string(),
    reviewerCompany: v.optional(v.string()),
    rating: v.number(), // 1-5
    title: v.string(),
    content: v.string(),
    projectType: v.optional(v.string()),
    projectBudget: v.optional(v.string()),
    verified: v.boolean(),
    createdAt: v.number(),
  })
    .index("by_agency", ["agencyId"])
    .index("by_rating", ["rating"]),

  // Listing fee payments log
  payments: defineTable({
    agencyId: v.optional(v.id("agencies")), // Optional until agency is created
    email: v.string(),
    amount: v.number(),
    currency: v.string(),
    paymentProvider: v.string(), // "stripe", "paystack", "flutterwave", etc.
    paymentId: v.string(), // External payment ID
    status: v.string(), // "pending", "completed", "failed", "refunded"
    metadata: v.optional(v.string()), // JSON string for additional data
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_email", ["email"])
    .index("by_payment_id", ["paymentId"])
    .index("by_status", ["status"]),
});
