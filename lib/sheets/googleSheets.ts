/**
 * Google Sheets Integration Module
 * 
 * Handles authentication and data operations with Google Sheets API.
 * Uses Service Account authentication for serverless compatibility.
 * 
 * Required environment variables:
 * - GOOGLE_CLIENT_EMAIL: Service account email
 * - GOOGLE_PRIVATE_KEY: Service account private key (with newlines preserved)
 * - GOOGLE_SHEET_ID: Target spreadsheet ID
 */

import { google, sheets_v4 } from "googleapis";
import type { FormSubmissionRecord } from "@/lib/validators/formSchema";

/**
 * Configuration validation.
 * Fail fast if required environment variables are missing.
 */
function getConfig() {
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY;
  const sheetId = process.env.GOOGLE_SHEET_ID;

  if (!clientEmail) {
    throw new Error("Missing GOOGLE_CLIENT_EMAIL environment variable");
  }
  if (!privateKey) {
    throw new Error("Missing GOOGLE_PRIVATE_KEY environment variable");
  }
  if (!sheetId) {
    throw new Error("Missing GOOGLE_SHEET_ID environment variable");
  }

  return {
    clientEmail,
    // Handle escaped newlines from environment variables
    // Some hosting platforms escape \n as \\n
    privateKey: privateKey.replace(/\\n/g, "\n"),
    sheetId,
  };
}

/**
 * Creates an authenticated Google Sheets API client.
 * 
 * Design decision: Create a new client per request rather than caching.
 * This is safer for serverless environments where cached connections
 * may become stale or cause memory leaks across invocations.
 */
async function getGoogleSheetsClient(): Promise<sheets_v4.Sheets> {
  const config = getConfig();

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: config.clientEmail,
      private_key: config.privateKey,
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const authClient = await auth.getClient();
  
  return google.sheets({ 
    version: "v4", 
    auth: authClient as Parameters<typeof google.sheets>[0]["auth"],
  });
}

/**
 * Appends a form submission to the Google Sheet.
 * 
 * Sheet structure (append-only):
 * | Timestamp | Name | Email | Budget | Industry | Services | Timeline | Details |
 * 
 * @param submission - Validated form submission with timestamp
 * @throws Error if the append operation fails
 */
export async function appendToSheet(
  submission: FormSubmissionRecord
): Promise<void> {
  const config = getConfig();
  const sheets = await getGoogleSheetsClient();

  // Prepare row data in the expected column order
  // Services array is joined with commas for readability in sheets
  const rowData = [
    submission.createdAt,
    submission.name,
    submission.email,
    submission.budget,
    submission.industry,
    submission.services.join(", "),
    submission.timeline,
    submission.details || "",
  ];

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: config.sheetId,
      // "Sheet1!A:H" targets columns A through H on the first sheet
      // Adjust if your sheet has a different name
      range: "Sheet1!A:H",
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values: [rowData],
      },
    });
  } catch (error) {
    // Log the full error server-side for debugging
    console.error("[GoogleSheets] Failed to append row:", error);
    
    // Re-throw with a generic message to avoid leaking internals
    throw new Error("Failed to save form submission to database");
  }
}

/**
 * Initializes the sheet with headers if it's empty.
 * Call this once during setup, not on every submission.
 * 
 * @returns true if headers were added, false if sheet already has data
 */
export async function initializeSheetHeaders(): Promise<boolean> {
  const config = getConfig();
  const sheets = await getGoogleSheetsClient();

  try {
    // Check if the sheet already has data
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: config.sheetId,
      range: "Sheet1!A1:H1",
    });

    // If there's existing data, don't overwrite
    if (response.data.values && response.data.values.length > 0) {
      return false;
    }

    // Add headers
    await sheets.spreadsheets.values.update({
      spreadsheetId: config.sheetId,
      range: "Sheet1!A1:H1",
      valueInputOption: "RAW",
      requestBody: {
        values: [["Timestamp", "Name", "Email", "Budget", "Industry", "Services", "Timeline", "Details"]],
      },
    });

    return true;
  } catch (error) {
    console.error("[GoogleSheets] Failed to initialize headers:", error);
    throw new Error("Failed to initialize spreadsheet");
  }
}
