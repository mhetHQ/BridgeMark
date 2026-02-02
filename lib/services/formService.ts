/**
 * Form Submission Service
 * 
 * Orchestrates the complete form submission workflow:
 * 1. Validate input data
 * 2. Persist to Google Sheets (fail fast if this fails)
 * 3. Send notification emails (non-blocking on failure)
 * 
 * Design principle: Sheets write is critical; email failures are logged but don't fail the request.
 */

import { 
  safeValidateFormSubmission, 
  type FormSubmission,
  type FormSubmissionRecord 
} from "@/lib/validators/formSchema";
import { appendToSheet } from "@/lib/sheets/googleSheets";
import { sendAdminNotification, sendUserConfirmation } from "@/lib/email/mailer";

/**
 * Result type for form submission operations.
 * Provides a consistent shape for success and failure cases.
 */
export type FormSubmissionResult = 
  | { success: true }
  | { success: false; error: string };

/**
 * Processes a complete form submission.
 * 
 * Workflow:
 * 1. Validate and sanitize input
 * 2. Add server-generated timestamp
 * 3. Persist to Google Sheets (critical - fails the entire request if this fails)
 * 4. Send emails (best-effort - failures are logged but don't fail the request)
 * 
 * @param rawData - Unvalidated form data from the client
 * @returns Result object indicating success or failure with error message
 */
export async function processFormSubmission(
  rawData: unknown
): Promise<FormSubmissionResult> {
  // Step 1: Validate input
  const validationResult = safeValidateFormSubmission(rawData);
  
  if (!validationResult.success) {
    return { 
      success: false, 
      error: validationResult.error 
    };
  }

  const formData: FormSubmission = validationResult.data;

  // Step 2: Create complete record with server timestamp
  const submissionRecord: FormSubmissionRecord = {
    ...formData,
    createdAt: new Date().toISOString(),
  };

  // Step 3: Persist to Google Sheets (CRITICAL)
  // This is the primary data store - if this fails, we fail the entire request
  try {
    await appendToSheet(submissionRecord);
  } catch (error) {
    console.error("[FormService] Critical: Failed to save to sheets:", error);
    return {
      success: false,
      error: "Failed to save your submission. Please try again later.",
    };
  }

  // Step 4: Send emails (BEST-EFFORT)
  // Email failures should not fail the overall submission since data is already persisted
  await sendEmailsAsync(submissionRecord);

  return { success: true };
}

/**
 * Sends notification emails asynchronously.
 * 
 * Design decision: We don't await these in the main flow because:
 * 1. The submission is already persisted (the critical part)
 * 2. Email delivery can be slow and unreliable
 * 3. Users shouldn't wait for email infrastructure
 * 
 * Failures are logged but don't affect the response to the user.
 * In production, you might want to add these to a retry queue.
 */
async function sendEmailsAsync(submission: FormSubmissionRecord): Promise<void> {
  // Send both emails concurrently for efficiency
  const emailPromises = [
    sendAdminNotification(submission).catch((error) => {
      console.error("[FormService] Admin notification failed:", error);
      // Don't re-throw - this is best-effort
    }),
    sendUserConfirmation(submission).catch((error) => {
      console.error("[FormService] User confirmation failed:", error);
      // Don't re-throw - this is best-effort
    }),
  ];

  // Wait for both to complete (or fail gracefully)
  await Promise.allSettled(emailPromises);
}

/**
 * Validates form data without processing.
 * Useful for pre-submission validation in the UI.
 * 
 * @param rawData - Form data to validate
 * @returns Validation result with sanitized data or error
 */
export function validateOnly(
  rawData: unknown
): { valid: true; data: FormSubmission } | { valid: false; error: string } {
  const result = safeValidateFormSubmission(rawData);
  
  if (result.success) {
    return { valid: true, data: result.data };
  }
  
  return { valid: false, error: result.error };
}
