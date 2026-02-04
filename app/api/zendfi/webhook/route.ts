import { NextResponse } from "next/server";
import crypto from "crypto";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

// Verify ZendFi webhook signature using HMAC-SHA256
function verifyWebhookSignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  if (!signature || !secret) return false;
  
  try {
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(payload)
      .digest("hex");
    
    // Use timing-safe comparison to prevent timing attacks
    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    );
  } catch {
    return false;
  }
}

// Webhook endpoint for ZendFi payment notifications
export async function POST(req: Request) {
  try {
    const webhookSecret = process.env.ZENDFI_WEBHOOK_SECRET;
    
    if (!webhookSecret) {
      console.error("ZENDFI_WEBHOOK_SECRET is not configured");
      return NextResponse.json(
        { error: "Webhook secret not configured" },
        { status: 500 }
      );
    }

    // Get raw body for signature verification
    const rawBody = await req.text();
    
    // Get signature from headers
    const signature = req.headers.get("x-zendfi-signature");
    const eventType = req.headers.get("x-zendfi-event");
    const deliveryId = req.headers.get("x-zendfi-delivery");
    const attemptNumber = req.headers.get("x-zendfi-attempt");

    console.log(`ZendFi webhook received: ${eventType}, delivery: ${deliveryId}, attempt: ${attemptNumber}`);

    // CRITICAL: Verify webhook signature
    if (!signature || !verifyWebhookSignature(rawBody, signature, webhookSecret)) {
      console.error("Invalid webhook signature - rejecting request");
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 401 }
      );
    }

    // Parse the verified payload
    const body = JSON.parse(rawBody);
    const { event, payment } = body;

    console.log(`Processing verified webhook: ${event} for payment ${payment?.id}`);

    // Handle different webhook events
    switch (event) {
      case "PaymentConfirmed":
        // Payment successful - update status in Convex
        await convex.mutation(api.payments.updatePaymentStatus, {
          paymentId: payment.id,
          status: "completed",
        });
        console.log(`Payment ${payment.id} marked as completed`);
        break;

      case "PaymentFailed":
        await convex.mutation(api.payments.updatePaymentStatus, {
          paymentId: payment.id,
          status: "failed",
        });
        console.log(`Payment ${payment.id} marked as failed`);
        break;

      case "PaymentExpired":
        await convex.mutation(api.payments.updatePaymentStatus, {
          paymentId: payment.id,
          status: "expired",
        });
        console.log(`Payment ${payment.id} marked as expired`);
        break;

      case "PaymentCreated":
        // Payment created - already tracked when we create the payment
        console.log(`Payment ${payment.id} created event received`);
        break;

      default:
        console.log(`Unhandled webhook event: ${event}`);
    }

    // Always respond 200 to acknowledge receipt
    return NextResponse.json({ received: true, event, deliveryId });
  } catch (error) {
    console.error("Webhook processing error:", error);
    // Return 200 anyway to prevent retries for parsing errors
    // (ZendFi will retry on non-2xx responses)
    return NextResponse.json(
      { error: "Processing error", received: true },
      { status: 200 }
    );
  }
}

// GET handler for manual testing / health check
export async function GET() {
  return NextResponse.json({
    status: "ok",
    message: "ZendFi webhook endpoint is active",
    timestamp: new Date().toISOString(),
  });
}
