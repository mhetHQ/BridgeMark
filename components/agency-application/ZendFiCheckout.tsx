"use client";

import { useEffect, useRef, useCallback } from "react";
import { ZendFiEmbeddedCheckout } from "@zendfi/sdk";

interface ZendFiCheckoutProps {
  linkCode: string;
  onSuccess: (payment: {
    paymentId: string;
    transactionSignature: string;
    amount: number;
    token: string;
  }) => void;
  onError: (error: { message: string }) => void;
  onStatusChange?: (status: "pending" | "processing" | "confirmed" | "failed") => void;
}

export function ZendFiCheckout({
  linkCode,
  onSuccess,
  onError,
}: ZendFiCheckoutProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const checkoutRef = useRef<any>(null);
  const hasInitialized = useRef(false);

  const initCheckout = useCallback(async () => {
    if (!containerRef.current || !linkCode || hasInitialized.current) return;

    hasInitialized.current = true;

    try {
      // Force SDK to use production API by setting window variable before initialization
      if (typeof window !== "undefined") {
        (window as any).__ZENDFI_API_URL__ = "https://api.zendfi.tech";
      }

      const checkout = new ZendFiEmbeddedCheckout({
        linkCode,
        containerId: "zendfi-checkout-container",
        mode: "live", // Always use live mode to connect to api.zendfi.tech

        onSuccess: (payment) => {
          onSuccess({
            paymentId: payment.paymentId,
            transactionSignature: payment.transactionSignature,
            amount: payment.amount,
            token: payment.token,
          });
        },

        onError: (error) => {
          onError({ message: error.message || "Payment failed" });
        },

        // Custom theme to match BridgeMark's design
        theme: {
          primaryColor: "#00F0FF", // BridgeMark primary cyan
          backgroundColor: "#0a0a0a", // Dark background
          textColor: "#ffffff",
          borderRadius: "16px",
          fontFamily: "var(--font-space-grotesk), sans-serif",
          buttonStyle: "solid",
        },

        paymentMethods: {
          qrCode: true,
          walletConnect: true,
        },
      });

      await checkout.mount();
      checkoutRef.current = checkout;
    } catch (err) {
      console.error("Failed to initialize ZendFi checkout:", err);
      hasInitialized.current = false;
      onError({ message: "Failed to load payment form" });
    }
  }, [linkCode, onSuccess, onError]);

  useEffect(() => {
    initCheckout();

    return () => {
      // Cleanup on unmount
      if (checkoutRef.current) {
        checkoutRef.current.destroy?.();
        checkoutRef.current = null;
      }
      hasInitialized.current = false;
    };
  }, [initCheckout]);

  return (
    <div
      id="zendfi-checkout-container"
      ref={containerRef}
      className="min-h-100 rounded-2xl overflow-hidden"
    />
  );
}
