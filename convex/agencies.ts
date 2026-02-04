import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Helper to generate URL-friendly slug
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Create a new agency after payment is confirmed
export const createAgency = mutation({
  args: {
    // Profile
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    website: v.optional(v.string()),
    description: v.string(),
    longDescription: v.string(),
    logo: v.optional(v.string()),
    coverImage: v.optional(v.string()),
    location: v.string(),
    founded: v.string(),
    teamSize: v.string(),
    category: v.string(),
    industries: v.array(v.string()),

    // Portfolio
    specialties: v.array(v.string()),
    services: v.array(v.string()),
    caseStudies: v.array(
      v.object({
        title: v.string(),
        description: v.string(),
        result: v.string(),
        image: v.optional(v.string()),
        link: v.optional(v.string()),
      })
    ),
    portfolioImages: v.optional(v.array(v.string())),
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

    // Pricing
    minBudget: v.string(),
    maxBudget: v.optional(v.string()),
    pricingModel: v.string(),
    hourlyRate: v.optional(v.string()),
    retainerRange: v.optional(v.string()),
    projectRange: v.optional(v.string()),
    customPricing: v.optional(v.string()),

    // Payment info
    listingFeeAmount: v.number(),
    listingFeeCurrency: v.string(),
    paymentId: v.string(),
    paymentMethod: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const baseSlug = generateSlug(args.name);

    // Check if slug exists and make it unique
    let slug = baseSlug;
    let counter = 1;
    while (true) {
      const existing = await ctx.db
        .query("agencies")
        .withIndex("by_slug", (q) => q.eq("slug", slug))
        .first();
      if (!existing) break;
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    // Check if email already has a listing
    const existingEmail = await ctx.db
      .query("agencies")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (existingEmail) {
      throw new Error("An agency with this email already exists");
    }

    const agencyId = await ctx.db.insert("agencies", {
      ...args,
      slug,
      paymentStatus: "completed",
      paymentDate: now,
      status: "pending_review",
      verified: false,
      featured: false,
      rating: undefined,
      reviewCount: undefined,
      createdAt: now,
      updatedAt: now,
    });

    return { agencyId, slug };
  },
});

// Get agency by slug (for public profile)
export const getAgencyBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const agency = await ctx.db
      .query("agencies")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();

    if (!agency || agency.status === "suspended") {
      return null;
    }

    return agency;
  },
});

// Get agency by ID
export const getAgencyById = query({
  args: { id: v.id("agencies") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// List approved agencies with filters
export const listAgencies = query({
  args: {
    category: v.optional(v.string()),
    search: v.optional(v.string()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    let agencies;

    if (args.search) {
      agencies = await ctx.db
        .query("agencies")
        .withSearchIndex("search_agencies", (q) => {
          let search = q.search("name", args.search!);
          search = search.eq("status", "approved");
          if (args.category && args.category !== "All") {
            search = search.eq("category", args.category);
          }
          return search;
        })
        .take(args.limit ?? 50);
    } else if (args.category && args.category !== "All") {
      agencies = await ctx.db
        .query("agencies")
        .withIndex("by_category", (q) => q.eq("category", args.category!))
        .filter((q) => q.eq(q.field("status"), "approved"))
        .take(args.limit ?? 50);
    } else {
      agencies = await ctx.db
        .query("agencies")
        .withIndex("by_status", (q) => q.eq("status", "approved"))
        .take(args.limit ?? 50);
    }

    return agencies;
  },
});

// Check if email already has an agency
export const checkEmailExists = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("agencies")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();
    return !!existing;
  },
});

// Update agency (for admin or agency owner)
export const updateAgency = mutation({
  args: {
    id: v.id("agencies"),
    updates: v.object({
      name: v.optional(v.string()),
      description: v.optional(v.string()),
      longDescription: v.optional(v.string()),
      logo: v.optional(v.string()),
      coverImage: v.optional(v.string()),
      website: v.optional(v.string()),
      phone: v.optional(v.string()),
      location: v.optional(v.string()),
      teamSize: v.optional(v.string()),
      category: v.optional(v.string()),
      industries: v.optional(v.array(v.string())),
      specialties: v.optional(v.array(v.string())),
      services: v.optional(v.array(v.string())),
      minBudget: v.optional(v.string()),
      maxBudget: v.optional(v.string()),
      pricingModel: v.optional(v.string()),
    }),
  },
  handler: async (ctx, args) => {
    const agency = await ctx.db.get(args.id);
    if (!agency) {
      throw new Error("Agency not found");
    }

    await ctx.db.patch(args.id, {
      ...args.updates,
      updatedAt: Date.now(),
    });

    return { success: true };
  },
});

// Admin: Update agency status
export const updateAgencyStatus = mutation({
  args: {
    id: v.id("agencies"),
    status: v.string(),
    verified: v.optional(v.boolean()),
    featured: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const agency = await ctx.db.get(args.id);
    if (!agency) {
      throw new Error("Agency not found");
    }

    await ctx.db.patch(args.id, {
      status: args.status,
      verified: args.verified ?? agency.verified,
      featured: args.featured ?? agency.featured,
      updatedAt: Date.now(),
    });

    return { success: true };
  },
});

// Get featured agencies for homepage
export const getFeaturedAgencies = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const agencies = await ctx.db
      .query("agencies")
      .withIndex("by_status", (q) => q.eq("status", "approved"))
      .filter((q) => q.eq(q.field("featured"), true))
      .take(args.limit ?? 10);

    return agencies;
  },
});
