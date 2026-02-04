import { NextResponse } from "next/server";
import { zendfi } from "@zendfi/sdk";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const paymentId = url.searchParams.get("paymentId");
    const verify = url.searchParams.get("verify") === "true";

    if (!paymentId) {
      return NextResponse.json(
        { error: "Payment ID is required" },
        { status: 400 }
      );
    }

    // Get payment status directly from ZendFi API
    const payment = await zendfi.getPayment(paymentId);
    
    // Normalize status for comparison (ZendFi returns PascalCase)
    const normalizedStatus = String(payment.status).toLowerCase();

    // If verify=true and payment is confirmed, update Convex
    // This is secure because we're verifying directly with ZendFi's API
    if (verify && normalizedStatus === "confirmed") {
      try {
        await convex.mutation(api.payments.updatePaymentStatus, {
          paymentId: payment.id,
          status: "completed",
        });
        console.log(`Payment ${paymentId} verified and updated in Convex`);
      } catch (convexError) {
        console.error("Failed to update Convex:", convexError);
        // Still return success since payment is confirmed
      }
    } else if (verify && (normalizedStatus === "failed" || normalizedStatus === "expired")) {
      try {
        await convex.mutation(api.payments.updatePaymentStatus, {
          paymentId: payment.id,
          status: normalizedStatus,
        });
      } catch (convexError) {
        console.error("Failed to update Convex:", convexError);
      }
    }

    return NextResponse.json({
      paymentId: payment.id,
      status: payment.status,
      transactionSignature: payment.transaction_signature || null,
      confirmedAt: payment.confirmed_at || null,
    });
  } catch (error) {
    console.error("ZendFi status check error:", error);
    return NextResponse.json(
      { error: "Failed to check payment status" },
      { status: 500 }
    );
  }
}
