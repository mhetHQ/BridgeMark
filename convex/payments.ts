import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Record a payment attempt
export const createPayment = mutation({
  args: {
    email: v.string(),
    amount: v.number(),
    currency: v.string(),
    paymentProvider: v.string(),
    paymentId: v.string(),
    metadata: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();

    const paymentRecordId = await ctx.db.insert("payments", {
      email: args.email,
      amount: args.amount,
      currency: args.currency,
      paymentProvider: args.paymentProvider,
      paymentId: args.paymentId,
      status: "pending",
      metadata: args.metadata,
      agencyId: undefined,
      createdAt: now,
      updatedAt: now,
    });

    return { paymentRecordId };
  },
});

// Update payment status (called after payment verification)
export const updatePaymentStatus = mutation({
  args: {
    paymentId: v.string(),
    status: v.string(),
    agencyId: v.optional(v.id("agencies")),
  },
  handler: async (ctx, args) => {
    const payment = await ctx.db
      .query("payments")
      .withIndex("by_payment_id", (q) => q.eq("paymentId", args.paymentId))
      .first();

    if (!payment) {
      throw new Error("Payment record not found");
    }

    await ctx.db.patch(payment._id, {
      status: args.status,
      agencyId: args.agencyId,
      updatedAt: Date.now(),
    });

    return { success: true };
  },
});

// Get payment by external payment ID
export const getPaymentByPaymentId = query({
  args: { paymentId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("payments")
      .withIndex("by_payment_id", (q) => q.eq("paymentId", args.paymentId))
      .first();
  },
});

// Get payments by email
export const getPaymentsByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("payments")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .collect();
  },
});

// Verify payment is completed (for checking before creating agency)
export const verifyPaymentCompleted = query({
  args: { paymentId: v.string() },
  handler: async (ctx, args) => {
    const payment = await ctx.db
      .query("payments")
      .withIndex("by_payment_id", (q) => q.eq("paymentId", args.paymentId))
      .first();

    return payment?.status === "completed";
  },
});
