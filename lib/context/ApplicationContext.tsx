"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import {
  AgencyDetailsData,
  PortfolioData,
  PricingData,
  PaymentData,
  defaultAgencyDetails,
  defaultPortfolio,
  defaultPricing,
  defaultPayment,
  agencyDetailsSchema,
  portfolioSchema,
  pricingSchema,
  paymentSchema,
} from "@/lib/validators/agencySchema";

export type ApplicationStep = 1 | 2 | 3 | 4;

interface ApplicationFormData {
  agencyDetails: AgencyDetailsData;
  portfolio: PortfolioData;
  pricing: PricingData;
  payment: PaymentData;
}

interface ApplicationContextType {
  currentStep: ApplicationStep;
  setCurrentStep: (step: ApplicationStep) => void;
  formData: ApplicationFormData;
  updateAgencyDetails: (data: Partial<AgencyDetailsData>) => void;
  updatePortfolio: (data: Partial<PortfolioData>) => void;
  updatePricing: (data: Partial<PricingData>) => void;
  updatePayment: (data: Partial<PaymentData>) => void;
  validateStep: (step: ApplicationStep) => { valid: boolean; errors: Record<string, string> };
  canProceed: (step: ApplicationStep) => boolean;
  isStepComplete: (step: ApplicationStep) => boolean;
  resetForm: () => void;
  getFullApplicationData: () => ApplicationFormData;
}

const ApplicationContext = createContext<ApplicationContextType | undefined>(undefined);

export function ApplicationProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState<ApplicationStep>(1);
  const [formData, setFormData] = useState<ApplicationFormData>({
    agencyDetails: defaultAgencyDetails,
    portfolio: defaultPortfolio,
    pricing: defaultPricing,
    payment: defaultPayment,
  });

  const updateAgencyDetails = useCallback((data: Partial<AgencyDetailsData>) => {
    setFormData((prev) => ({
      ...prev,
      agencyDetails: { ...prev.agencyDetails, ...data },
    }));
  }, []);

  const updatePortfolio = useCallback((data: Partial<PortfolioData>) => {
    setFormData((prev) => ({
      ...prev,
      portfolio: { ...prev.portfolio, ...data },
    }));
  }, []);

  const updatePricing = useCallback((data: Partial<PricingData>) => {
    setFormData((prev) => ({
      ...prev,
      pricing: { ...prev.pricing, ...data },
    }));
  }, []);

  const updatePayment = useCallback((data: Partial<PaymentData>) => {
    setFormData((prev) => ({
      ...prev,
      payment: { ...prev.payment, ...data },
    }));
  }, []);

  const validateStep = useCallback(
    (step: ApplicationStep): { valid: boolean; errors: Record<string, string> } => {
      const errors: Record<string, string> = {};
      let result;

      switch (step) {
        case 1:
          result = agencyDetailsSchema.safeParse(formData.agencyDetails);
          break;
        case 2:
          result = portfolioSchema.safeParse(formData.portfolio);
          break;
        case 3:
          result = pricingSchema.safeParse(formData.pricing);
          break;
        case 4:
          result = paymentSchema.safeParse(formData.payment);
          break;
        default:
          return { valid: false, errors: { general: "Invalid step" } };
      }

      if (!result.success) {
        result.error.issues.forEach((issue) => {
          const path = issue.path.join(".");
          errors[path] = issue.message;
        });
        return { valid: false, errors };
      }

      return { valid: true, errors };
    },
    [formData]
  );

  const canProceed = useCallback(
    (step: ApplicationStep): boolean => {
      const { valid } = validateStep(step);
      return valid;
    },
    [validateStep]
  );

  const isStepComplete = useCallback(
    (step: ApplicationStep): boolean => {
      // Basic check if required fields are filled
      switch (step) {
        case 1:
          return !!(
            formData.agencyDetails.name &&
            formData.agencyDetails.email &&
            formData.agencyDetails.description &&
            formData.agencyDetails.longDescription &&
            formData.agencyDetails.location &&
            formData.agencyDetails.category
          );
        case 2:
          return !!(
            formData.portfolio.specialties.length > 0 &&
            formData.portfolio.services.length > 0
          );
        case 3:
          return !!(formData.pricing.minBudget && formData.pricing.pricingModel);
        case 4:
          return !!(formData.payment.paymentId && formData.payment.agreeToTerms);
        default:
          return false;
      }
    },
    [formData]
  );

  const resetForm = useCallback(() => {
    setFormData({
      agencyDetails: defaultAgencyDetails,
      portfolio: defaultPortfolio,
      pricing: defaultPricing,
      payment: defaultPayment,
    });
    setCurrentStep(1);
  }, []);

  const getFullApplicationData = useCallback(() => {
    return formData;
  }, [formData]);

  return (
    <ApplicationContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        formData,
        updateAgencyDetails,
        updatePortfolio,
        updatePricing,
        updatePayment,
        validateStep,
        canProceed,
        isStepComplete,
        resetForm,
        getFullApplicationData,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
}

export function useApplication() {
  const context = useContext(ApplicationContext);
  if (context === undefined) {
    throw new Error("useApplication must be used within an ApplicationProvider");
  }
  return context;
}
