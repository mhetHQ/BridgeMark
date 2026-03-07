"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useApplication } from "@/lib/context/ApplicationContext";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { LISTING_FEE } from "@/lib/validators/agencySchema";

interface PaymentStepProps {
  onSuccess: (slug: string) => void;
}

export function PaymentStep({ onSuccess }: PaymentStepProps) {
  const searchParams = useSearchParams();
  const { updatePayment, setCurrentStep, getFullApplicationData } = useApplication();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isWaitingForPayment, setIsWaitingForPayment] = useState(false);
  const [isCreatingAgency, setIsCreatingAgency] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [paymentId, setPaymentId] = useState<string | null>(null);

  const popupRef = useRef<Window | null>(null);
  const hasCreatedAgency = useRef(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const createAgency = useMutation(api.agencies.createAgency);
  const applicationData = getFullApplicationData();

  // Recover pending payment on mount (in case of page refresh)
  useEffect(() => {
    const storedPaymentId = sessionStorage.getItem("bridgemark_pending_payment_id");
    if (storedPaymentId && !paymentId) {
      setPaymentId(storedPaymentId);
      setIsWaitingForPayment(true);
    }
  }, []);

  // Real-time subscription to payment status from Convex
  // This will automatically update when webhook updates the payment
  const paymentRecord = useQuery(
    api.payments.getPaymentByPaymentId,
    paymentId ? { paymentId } : "skip"
  );

  // Watch for payment confirmation via Convex real-time subscription
  useEffect(() => {
    if (paymentRecord?.status === "completed" && !hasCreatedAgency.current && paymentId) {
      hasCreatedAgency.current = true;
      // Clear stored payment ID on success
      sessionStorage.removeItem("bridgemark_pending_payment_id");
      createAgencyAfterPayment(paymentId);
    } else if (paymentRecord?.status === "failed" || paymentRecord?.status === "expired") {
      setIsWaitingForPayment(false);
      sessionStorage.removeItem("bridgemark_pending_payment_id");
      setError(`Payment ${paymentRecord.status}. Please try again.`);
    }
  }, [paymentRecord?.status, paymentId]);

  // Create agency after payment confirmation
  const createAgencyAfterPayment = useCallback(async (confirmedPaymentId: string) => {
    setIsCreatingAgency(true);
    setIsWaitingForPayment(false);
    setError(null);

    // Close popup if open
    if (popupRef.current && !popupRef.current.closed) {
      popupRef.current.close();
    }

    try {
      // Update payment info in form state
      updatePayment({
        listingFeeAmount: LISTING_FEE.amount,
        listingFeeCurrency: LISTING_FEE.currency,
        paymentId: confirmedPaymentId,
        paymentMethod: "crypto_USDC",
        agreeToTerms: true,
      });

      // Create the agency in database
      const result = await createAgency({
        // Profile
        name: applicationData.agencyDetails.name,
        email: applicationData.agencyDetails.email,
        phone: applicationData.agencyDetails.phone || undefined,
        website: applicationData.agencyDetails.website || undefined,
        description: applicationData.agencyDetails.description,
        longDescription: applicationData.agencyDetails.longDescription,
        logo: applicationData.agencyDetails.logo || undefined,
        coverImage: applicationData.agencyDetails.coverImage || undefined,
        location: applicationData.agencyDetails.location,
        founded: applicationData.agencyDetails.founded,
        teamSize: applicationData.agencyDetails.teamSize,
        category: applicationData.agencyDetails.category,
        industries: applicationData.agencyDetails.industries,

        // Portfolio
        specialties: applicationData.portfolio.specialties,
        services: applicationData.portfolio.services,
        caseStudies: applicationData.portfolio.caseStudies.map((cs) => ({
          title: cs.title,
          description: cs.description,
          result: cs.result,
          image: cs.image || undefined,
          link: cs.link || undefined,
        })),
        portfolioImages: applicationData.portfolio.portfolioImages || undefined,
        testimonials:
          applicationData.portfolio.testimonials?.map((t) => ({
            quote: t.quote,
            author: t.author,
            company: t.company,
            image: t.image || undefined,
          })) || undefined,

        // Pricing
        minBudget: applicationData.pricing.minBudget,
        maxBudget: applicationData.pricing.maxBudget || undefined,
        pricingModel: applicationData.pricing.pricingModel,
        hourlyRate: applicationData.pricing.hourlyRate || undefined,
        retainerRange: applicationData.pricing.retainerRange || undefined,
        projectRange: applicationData.pricing.projectRange || undefined,
        customPricing: applicationData.pricing.customPricing || undefined,

        // Payment
        listingFeeAmount: LISTING_FEE.amount,
        listingFeeCurrency: LISTING_FEE.currency,
        paymentId: confirmedPaymentId,
        paymentMethod: "crypto_USDC",
      });

      // Send welcome email
      try {
        await fetch("/api/agencies/welcome", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: applicationData.agencyDetails.email,
            name: applicationData.agencyDetails.name,
          }),
        });
      } catch (emailErr) {
        console.error("Failed to send welcome email:", emailErr);
        // Do not block the agency registration success if email fails
      }

      // Success! Navigate to success page
      onSuccess(result.slug);
    } catch (err) {
      console.error("Agency creation error:", err);
      setError(
        `Payment successful but failed to create listing. Please contact support with payment ID: ${confirmedPaymentId}`
      );
      setIsCreatingAgency(false);
      hasCreatedAgency.current = false;
    }
  }, [applicationData, createAgency, updatePayment, onSuccess]);

  // Handle return from ZendFi payment (URL params) - fallback for popup blocked
  const handlePaymentReturn = useCallback(async () => {
    const paymentStatus = searchParams.get("payment");
    const returnedPaymentId = searchParams.get("paymentId");

    if (paymentStatus === "success" && returnedPaymentId && !hasCreatedAgency.current) {
      setPaymentId(returnedPaymentId);
      setIsWaitingForPayment(true);
    } else if (paymentStatus === "cancelled" || paymentStatus === "failed") {
      setError("Payment was cancelled or failed. Please try again.");
    }
  }, [searchParams]);

  useEffect(() => {
    handlePaymentReturn();
  }, [handlePaymentReturn]);

  const handleBack = () => {
    setCurrentStep(3);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Cancel payment and close tab
  const cancelPayment = () => {
    if (popupRef.current && !popupRef.current.closed) {
      popupRef.current.close();
    }
    sessionStorage.removeItem("bridgemark_pending_payment_id");
    setIsWaitingForPayment(false);
    setPaymentId(null);
    setIsProcessing(false);
    hasCreatedAgency.current = false;
  };

  // Manually verify payment with ZendFi API (fallback when webhook doesn't work)
  const verifyPayment = async () => {
    if (!paymentId) return;

    setIsVerifying(true);
    setError(null);

    try {
      const response = await fetch(`/api/zendfi/check-status?paymentId=${paymentId}&verify=true`);
      const data = await response.json();

      // Normalize status to lowercase for comparison
      const status = data.status?.toLowerCase();

      if (status === "confirmed") {
        // Payment verified! Create agency immediately
        if (!hasCreatedAgency.current && paymentId) {
          hasCreatedAgency.current = true;
          createAgencyAfterPayment(paymentId);
        }
      } else if (status === "pending" || status === "processing") {
        setError(`Payment is still ${data.status}. Please complete the payment and try again.`);
      } else {
        setError(`Payment status: ${data.status}. Please try again or contact support.`);
      }
    } catch (err) {
      console.error("Payment verification error:", err);
      setError("Failed to verify payment. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  // Initiate payment - open new tab and wait for confirmation
  const initiatePayment = async () => {
    if (!agreedToTerms) {
      setError("Please agree to the terms and conditions");
      return;
    }

    setIsProcessing(true);
    setError(null);
    hasCreatedAgency.current = false;

    try {
      const response = await fetch("/api/zendfi/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: applicationData.agencyDetails.email,
          agencyName: applicationData.agencyDetails.name,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to initialize payment");
      }

      const { paymentId: newPaymentId, paymentUrl } = await response.json();
      setPaymentId(newPaymentId);

      // Store payment ID in sessionStorage for recovery
      sessionStorage.setItem("bridgemark_pending_payment_id", newPaymentId);

      // Open ZendFi checkout in a new tab (more reliable than popup)
      // Using window.open with '_blank' opens a new tab
      const checkoutTab = window.open(paymentUrl, "_blank");

      if (checkoutTab) {
        popupRef.current = checkoutTab;
      }

      // Start waiting for payment confirmation (via Convex real-time subscription)
      // The main tab stays open with all form data preserved
      setIsWaitingForPayment(true);
      setIsProcessing(false);
    } catch (err) {
      console.error("Payment initialization error:", err);
      setError(err instanceof Error ? err.message : "Failed to initialize payment. Please try again.");
      setIsProcessing(false);
    }
  };

  // Show loading state if processing payment return
  if (isCreatingAgency) {
    return (
      <div className="border border-white/[0.06] p-8 md:p-10">
        <div className="flex flex-col items-center justify-center py-16 space-y-6">
          <div className="w-16 h-16 bg-green-500/20  flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-8 h-8 text-green-500"
            >
              <path
                fillRule="evenodd"
                d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="text-center">
            <p className="text-xl font-semibold text-white mb-2">Payment Successful!</p>
            <p className="text-gray-400">Creating your agency listing...</p>
          </div>
          <div className="w-10 h-10 border-4 border-primary/30 border-t-primary  animate-spin" />
        </div>
      </div>
    );
  }

  // Show polling state when waiting for payment
  if (isWaitingForPayment && paymentId) {
    return (
      <div className="border border-white/[0.06] p-8 md:p-10">
        <div className="flex flex-col items-center justify-center py-16 space-y-6">
          <div className="w-16 h-16 bg-primary/20  flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-primary">
              <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="text-center">
            <p className="text-xl font-semibold text-white mb-2">Payment Tab Open</p>
            <p className="text-gray-400 mb-2">
              {paymentRecord?.status === "pending"
                ? "Complete the payment in the new tab. This page will update automatically."
                : `Status: ${paymentRecord?.status || "pending"}...`}
            </p>
            <p className="text-sm text-gray-500">Payment ID: {paymentId}</p>
          </div>
          <div className="w-10 h-10 border-4 border-primary/30 border-t-primary  animate-spin" />

          <div className="flex flex-col gap-3 items-center mt-4">
            {/* Verify Payment Button - Fallback when webhook doesn't work */}
            <button
              onClick={verifyPayment}
              disabled={isVerifying}
              className="rounded-full px-6 py-2 bg-primary hover:bg-primary/80 disabled:bg-primary/50 text-white font-semibold transition-colors"
            >
              {isVerifying ? "Verifying..." : "I've Completed Payment - Verify Now"}
            </button>

            {error && (
              <p className="text-red-400 text-sm text-center">{error}</p>
            )}

            <p className="text-sm text-gray-400">
              Payment opens in a new tab. After completing payment, click verify above.
            </p>
            <button
              onClick={cancelPayment}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Cancel and try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-white/[0.06] p-8 md:p-10">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Payment</h2>
        <p className="text-gray-400">
          Complete your listing fee payment in USDC to publish your agency profile.
        </p>
      </div>

      <div className="space-y-8">
        {/* Application Summary */}
        <div className="p-6 bg-white/[0.03]  border border-white/[0.06]">
          <h3 className="text-lg font-semibold mb-4">Application Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-400">Agency Name</span>
              <p className="text-white font-semibold">{applicationData.agencyDetails.name}</p>
            </div>
            <div>
              <span className="text-gray-400">Email</span>
              <p className="text-white font-semibold">{applicationData.agencyDetails.email}</p>
            </div>
            <div>
              <span className="text-gray-400">Category</span>
              <p className="text-primary font-semibold">{applicationData.agencyDetails.category}</p>
            </div>
            <div>
              <span className="text-gray-400">Location</span>
              <p className="text-white font-semibold">{applicationData.agencyDetails.location}</p>
            </div>
            <div>
              <span className="text-gray-400">Team Size</span>
              <p className="text-white font-semibold">{applicationData.agencyDetails.teamSize}</p>
            </div>
            <div>
              <span className="text-gray-400">Min Budget</span>
              <p className="text-white font-semibold">{applicationData.pricing.minBudget}</p>
            </div>
          </div>
        </div>

        {/* Listing Fee */}
        <div className="p-6 bg-white/[0.02]  border border-white/[0.06]">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold">Annual Listing Fee</h3>
              <p className="text-gray-400 text-sm">One-time payment for 12 months of listing</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-black text-white">
                {LISTING_FEE.amount} <span className="text-primary">{LISTING_FEE.currency}</span>
              </p>
              <p className="text-gray-400 text-sm">Paid in crypto via Solana</p>
            </div>
          </div>

          <div className="space-y-2 pt-4 border-t border-white/[0.06]">
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-primary">
                <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
              </svg>
              Featured placement in agency directory
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-primary">
                <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
              </svg>
              Verified agency badge
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-primary">
                <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
              </svg>
              Access to client matching
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-primary">
                <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
              </svg>
              Analytics dashboard
            </div>
          </div>
        </div>

        {/* Terms Agreement */}
        <div className="space-y-4">
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={agreedToTerms}
              onChange={(e) => {
                setAgreedToTerms(e.target.checked);
                if (error && e.target.checked) setError(null);
              }}
              className="mt-1 w-5 h-5 rounded border-white/20 bg-white/[0.03] text-primary focus:ring-primary/50 cursor-pointer"
            />
            <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
              I agree to the{" "}
              <a href="/terms" className="text-primary hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </a>
              . I understand that my listing will be reviewed before being published, and the
              listing fee is non-refundable.
            </span>
          </label>
        </div>

        {/* Payment Info */}
        <div className="p-4 bg-white/[0.03]  border border-white/[0.06]">
          <div className="flex items-start gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-primary shrink-0 mt-0.5">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
            <div>
              <p className="text-sm text-gray-300">
                <strong className="text-white">Pay with Crypto:</strong> You&apos;ll be redirected to ZendFi&apos;s secure checkout to complete payment with USDC on Solana. After payment, you&apos;ll return here automatically.
              </p>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/30 ">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between pt-6 border-t border-white/[0.06]">
          <button
            type="button"
            onClick={handleBack}
            disabled={isProcessing}
            className="flex items-center gap-2 rounded-full px-6 py-3 bg-white/[0.03] text-white font-semibold  hover:bg-white/[0.06] transition-all border border-white/[0.06] disabled:opacity-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M11.03 3.97a.75.75 0 010 1.06l-6.22 6.22H21a.75.75 0 010 1.5H4.81l6.22 6.22a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z" clipRule="evenodd" />
            </svg>
            Back
          </button>

          <button
            type="button"
            onClick={initiatePayment}
            disabled={isProcessing || !agreedToTerms}
            className="flex items-center gap-2 rounded-full px-8 py-4 bg-white text-black font-semibold hover:bg-gray-200 transition-all  disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? (
              <>
                <svg className="animate-spin w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Redirecting to Payment...
              </>
            ) : (
              <>
                Pay {LISTING_FEE.amount} {LISTING_FEE.currency}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z" clipRule="evenodd" />
                </svg>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}




