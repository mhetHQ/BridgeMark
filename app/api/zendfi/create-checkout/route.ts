import { NextResponse } from "next/server";
import { zendfi } from "@zendfi/sdk";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function POST(req: Request) {
  try {
    // Check if API key is configured (SDK auto-loads from ZENDFI_API_KEY env var)
    if (!process.env.ZENDFI_API_KEY) {
      console.error("ZENDFI_API_KEY is not configured");
      return NextResponse.json(
        { error: "Payment service not configured" },
        { status: 500 }
      );
    }

    const body = await req.json();
    const { email, agencyName } = body;

    if (!email || !agencyName) {
      return NextResponse.json(
        { error: "Email and agency name are required" },
        { status: 400 }
      );
    }

    // Create payment using ZendFi SDK
    // Amount is in base units (USDC has 6 decimals, so 20 USDC = 20_000_000 micro-units)
    // But ZendFi SDK expects human-readable amounts, so we pass 20 as a string
    const payment = await zendfi.createPayment({
      amount: 2, // 20 USDC listing fee (string to avoid floating point issues)
      currency: "USD",
      token: "USDC",
      description: `BridgeMark Agency Listing Fee - ${agencyName}`,
      metadata: {
        email,
        agencyName,
        type: "agency_listing_fee",
      },
    });

    console.log("ZendFi payment created:", payment.id, "Status:", payment.status);

    // Store payment record in Convex for tracking
    await convex.mutation(api.payments.createPayment, {
      email,
      amount: 2,
      currency: "USDC",
      paymentProvider: "zendfi",
      paymentId: payment.id,
      metadata: JSON.stringify({ agencyName, type: "agency_listing_fee" }),
    });

    return NextResponse.json({
      paymentId: payment.id,
      paymentUrl: payment.payment_url,
      status: payment.status,
    });
  } catch (error) {
    console.error("ZendFi payment creation error:", error);
    return NextResponse.json(
      { error: "Failed to create payment" },
      { status: 500 }
    );
  }
}
