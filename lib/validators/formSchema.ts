/**
 * Form Validation Schema
 * 
 * Uses Zod for runtime type validation and sanitization.
 * This schema is the single source of truth for form field requirements.
 */

import { z } from "zod";

/**
 * Valid budget ranges for agency matching.
 */
export const budgetOptions = [
  "micro (< $5k)",      // < $5k
  "small ($5k - $10k)",      // $5k - $10k
  "medium ($10k - $25k)",     // $10k - $25k
  "large ($25k - $50k)",      // $25k - $50k
  "enterprise ($50k +)", // $50k+
] as const;

/**
 * Valid timeline options for project start.
 */
export const timelineOptions = [
  "asap",
  "1month",
  "3months",
  "flexible",
] as const;

/**
 * Valid service types offered.
 */
export const serviceOptions = [
  "branding",
  "seo",
  "paid_ads",
  "content",
  "web3",
  "design",
] as const;

export type BudgetOption = typeof budgetOptions[number];
export type TimelineOption = typeof timelineOptions[number];
export type ServiceOption = typeof serviceOptions[number];

/**
 * Schema for agency matching form submissions.
 * 
 * Design decisions:
 * - trim() on strings to sanitize whitespace
 * - min(1) ensures non-empty after trimming
 * - email() provides RFC 5322 validation
 * - max lengths prevent abuse and match typical DB constraints
 * - services array must have at least one selection
 */
export const formSubmissionSchema = z.object({
  // Contact Information
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters"),
  
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please provide a valid email address")
    .max(255, "Email must be less than 255 characters"),
  
  // Project Requirements
  budget: z
    .enum(budgetOptions, { message: "Please select a budget range" }),
  
  industry: z
    .string()
    .trim()
    .min(1, "Industry is required")
    .max(100, "Industry must be less than 100 characters"),
  
  services: z
    .array(z.enum(serviceOptions))
    .min(1, "Please select at least one service"),
  
  timeline: z
    .enum(timelineOptions, { message: "Please select a timeline" }),
  
  details: z
    .string()
    .trim()
    .max(5000, "Details must be less than 5000 characters")
    .optional()
    .default(""),
});

/**
 * TypeScript type inferred from the schema.
 * Use this for type-safe form data handling throughout the application.
 */
export type FormSubmission = z.infer<typeof formSubmissionSchema>;

/**
 * Extended type that includes server-generated fields.
 * This represents the complete record as stored in Google Sheets.
 */
export interface FormSubmissionRecord extends FormSubmission {
  createdAt: string; // ISO 8601 timestamp
}

/**
 * Validates and sanitizes form input data.
 * 
 * @param data - Raw form data from the client
 * @returns Parsed and validated form data, or throws ZodError
 */
export function validateFormSubmission(data: unknown): FormSubmission {
  return formSubmissionSchema.parse(data);
}

/**
 * Safe validation that returns a result object instead of throwing.
 * Useful for graceful error handling in API routes.
 * 
 * @param data - Raw form data from the client
 * @returns Object with success flag and either data or error
 */
export function safeValidateFormSubmission(data: unknown): 
  | { success: true; data: FormSubmission }
  | { success: false; error: string } {
  const result = formSubmissionSchema.safeParse(data);
  
  if (result.success) {
    return { success: true, data: result.data };
  }
  
  // Extract the first validation error for a user-friendly message
  const issues = result.error.issues;
  const firstIssue = issues[0];
  const errorMessage = firstIssue 
    ? `${firstIssue.path.join(".")}: ${firstIssue.message}`
    : "Invalid form data";
  
  return { success: false, error: errorMessage };
}
