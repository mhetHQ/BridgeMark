/**
 * Form Submission API Route
 * 
 * POST /api/form/submit
 * 
 * Handles contact form submissions with validation, persistence, and notifications.
 * This is a thin route handler - all business logic is delegated to the form service.
 * 
 * Security considerations:
 * - All input is validated server-side
 * - No sensitive data is returned to the client
 * - Errors are logged server-side only
 */

import { NextRequest, NextResponse } from "next/server";
import { processFormSubmission } from "@/lib/services/formService";

/**
 * API Response Types
 * Consistent shape for all responses from this endpoint.
 */
interface SuccessResponse {
  success: true;
}

interface ErrorResponse {
  success: false;
  error: string;
}

type ApiResponse = SuccessResponse | ErrorResponse;

/**
 * POST /api/form/submit
 * 
 * Accepts JSON body with form fields:
 * - name: string (required)
 * - email: string (required, valid email)
 * - message: string (required)
 * 
 * Returns:
 * - 200: { success: true }
 * - 400: { success: false, error: "validation error" }
 * - 500: { success: false, error: "server error" }
 */
export async function POST(
  request: NextRequest
): Promise<NextResponse<ApiResponse>> {
  try {
    // Parse JSON body
    // Note: We don't catch JSON parse errors separately because
    // invalid JSON should result in a 400 error anyway
    let body: unknown;
    
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON in request body" },
        { status: 400 }
      );
    }

    // Process the submission through the service layer
    const result = await processFormSubmission(body);

    if (result.success) {
      return NextResponse.json(
        { success: true },
        { status: 200 }
      );
    }

    // Validation or business logic error
    return NextResponse.json(
      { success: false, error: result.error },
      { status: 400 }
    );

  } catch (error) {
    // Unexpected error - log full details server-side
    console.error("[API] Unhandled error in form submission:", error);

    // Return generic error to client (don't leak implementation details)
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}

/**
 * Handle unsupported HTTP methods.
 * Returns 405 Method Not Allowed for non-POST requests.
 */
export async function GET(): Promise<NextResponse<ErrorResponse>> {
  return NextResponse.json(
    { success: false, error: "Method not allowed. Use POST." },
    { status: 405 }
  );
}

export async function PUT(): Promise<NextResponse<ErrorResponse>> {
  return NextResponse.json(
    { success: false, error: "Method not allowed. Use POST." },
    { status: 405 }
  );
}

export async function DELETE(): Promise<NextResponse<ErrorResponse>> {
  return NextResponse.json(
    { success: false, error: "Method not allowed. Use POST." },
    { status: 405 }
  );
}

export async function PATCH(): Promise<NextResponse<ErrorResponse>> {
  return NextResponse.json(
    { success: false, error: "Method not allowed. Use POST." },
    { status: 405 }
  );
}
