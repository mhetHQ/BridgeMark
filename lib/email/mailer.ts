/**
 * Email Service Module
 * 
 * Handles transactional email sending via Resend.
 * Provides typed functions for admin notifications and user confirmations.
 * 
 * Required environment variables:
 * - EMAIL_API_KEY: Resend API key
 * - ADMIN_EMAIL: Email address for admin notifications
 * - FROM_EMAIL: Verified sender email (e.g., noreply@yourdomain.com)
 */

import { Resend } from "resend";
import type { FormSubmissionRecord } from "@/lib/validators/formSchema";

/**
 * Configuration validation.
 * Fail fast if required environment variables are missing.
 */
function getConfig() {
  const apiKey = process.env.EMAIL_API_KEY;
  const adminEmail = process.env.ADMIN_EMAIL;
  const fromEmail = process.env.FROM_EMAIL;

  if (!apiKey) {
    throw new Error("Missing EMAIL_API_KEY environment variable");
  }
  if (!adminEmail) {
    throw new Error("Missing ADMIN_EMAIL environment variable");
  }
  if (!fromEmail) {
    throw new Error("Missing FROM_EMAIL environment variable");
  }

  return { apiKey, adminEmail, fromEmail };
}

/**
 * Creates a Resend client instance.
 * 
 * Design decision: Create per-request to ensure fresh config
 * and avoid potential issues with serverless cold starts.
 */
function getResendClient(): Resend {
  const config = getConfig();
  return new Resend(config.apiKey);
}

/**
 * Sends a notification email to the admin with form submission details.
 * 
 * @param submission - The complete form submission record
 * @throws Error if email sending fails
 */
export async function sendAdminNotification(
  submission: FormSubmissionRecord
): Promise<void> {
  const config = getConfig();
  const resend = getResendClient();

  // Format budget for display
  const budgetLabels: Record<string, string> = {
    micro: "< $5k",
    small: "$5k - $10k",
    medium: "$10k - $25k",
    large: "$25k - $50k",
    enterprise: "$50k+",
  };

  // Format timeline for display
  const timelineLabels: Record<string, string> = {
    asap: "ASAP",
    "1month": "1 Month",
    "3months": "1-3 Months",
    flexible: "Flexible",
  };

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #1a1a2e; border-bottom: 2px solid #00F0FF; padding-bottom: 10px;">
        🎯 New Agency Matching Request
      </h2>
      
      <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
        <tr>
          <td style="padding: 12px; background-color: #f8f9fa; font-weight: bold; width: 140px;">
            Submitted At
          </td>
          <td style="padding: 12px; background-color: #f8f9fa;">
            ${new Date(submission.createdAt).toLocaleString("en-US", {
    dateStyle: "full",
    timeStyle: "long",
  })}
          </td>
        </tr>
        <tr>
          <td style="padding: 12px; font-weight: bold;">Name</td>
          <td style="padding: 12px;">${escapeHtml(submission.name)}</td>
        </tr>
        <tr>
          <td style="padding: 12px; background-color: #f8f9fa; font-weight: bold;">
            Email
          </td>
          <td style="padding: 12px; background-color: #f8f9fa;">
            <a href="mailto:${escapeHtml(submission.email)}" style="color: #00d1c8;">
              ${escapeHtml(submission.email)}
            </a>
          </td>
        </tr>
        <tr>
          <td style="padding: 12px; font-weight: bold;">Budget</td>
          <td style="padding: 12px;">
            <span style="background-color: #00F0FF; color: #000; padding: 4px 12px; border-radius: 20px; font-weight: bold;">
              ${budgetLabels[submission.budget] || submission.budget}
            </span>
          </td>
        </tr>
        <tr>
          <td style="padding: 12px; background-color: #f8f9fa; font-weight: bold;">
            Industry
          </td>
          <td style="padding: 12px; background-color: #f8f9fa;">
            ${escapeHtml(submission.industry)}
          </td>
        </tr>
        <tr>
          <td style="padding: 12px; font-weight: bold;">Services</td>
          <td style="padding: 12px;">
            ${submission.services
      .map(
        (s) =>
          `<span style="display: inline-block; background-color: #BD00FF; color: #fff; padding: 4px 10px; border-radius: 15px; margin: 2px; font-size: 12px;">${escapeHtml(s)}</span>`
      )
      .join(" ")}
          </td>
        </tr>
        <tr>
          <td style="padding: 12px; background-color: #f8f9fa; font-weight: bold;">
            Timeline
          </td>
          <td style="padding: 12px; background-color: #f8f9fa;">
            ${timelineLabels[submission.timeline] || submission.timeline}
          </td>
        </tr>
        ${submission.details ? `
        <tr>
          <td style="padding: 12px; font-weight: bold; vertical-align: top;">
            Project Details
          </td>
          <td style="padding: 12px;">
            <div style="white-space: pre-wrap; background-color: #f8f9fa; padding: 15px; border-radius: 8px;">
${escapeHtml(submission.details)}
            </div>
          </td>
        </tr>
        ` : ""}
      </table>
      
      <p style="margin-top: 30px; color: #666; font-size: 12px;">
        This notification was sent from the Bridgemark agency matching form.
      </p>
    </div>
  `;

  try {
    const { error } = await resend.emails.send({
      from: config.fromEmail,
      to: config.adminEmail,
      subject: `🎯 New Matching Request: ${submission.name} (${budgetLabels[submission.budget] || submission.budget})`,
      html: htmlContent,
      // Plain text fallback for email clients that don't support HTML
      text: `
New Agency Matching Request

Submitted At: ${submission.createdAt}
Name: ${submission.name}
Email: ${submission.email}
Budget: ${budgetLabels[submission.budget] || submission.budget}
Industry: ${submission.industry}
Services: ${submission.services.join(", ")}
Timeline: ${timelineLabels[submission.timeline] || submission.timeline}

Project Details:
${submission.details || "No additional details provided"}
      `.trim(),
    });

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error("[Mailer] Failed to send admin notification:", error);
    throw new Error("Failed to send admin notification email");
  }
}

/**
 * Sends a confirmation email to the user acknowledging their submission.
 * 
 * @param submission - The complete form submission record
 * @throws Error if email sending fails
 */
export async function sendUserConfirmation(
  submission: FormSubmissionRecord
): Promise<void> {
  const config = getConfig();
  const resend = getResendClient();

  // Format budget for display
  const budgetLabels: Record<string, string> = {
    micro: "< $5k",
    small: "$5k - $10k",
    medium: "$10k - $25k",
    large: "$25k - $50k",
    enterprise: "$50k+",
  };

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="text-align: center; padding: 30px 0; background: linear-gradient(135deg, #BD00FF 0%, #00F0FF 100%); border-radius: 12px 12px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 28px;">Bridgemark</h1>
      </div>
      
      <div style="padding: 40px 30px; background-color: #ffffff;">
        <h2 style="color: #1a1a2e; margin-top: 0;">
          We're on it, ${escapeHtml(submission.name)}! 🚀
        </h2>
        
        <p style="color: #444; line-height: 1.6; font-size: 16px;">
          Thanks for submitting your agency matching request! Our AI is already analyzing your 
          requirements to find the perfect agency partners for you.
        </p>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 25px 0;">
          <p style="margin: 0 0 15px 0; color: #666; font-size: 14px; font-weight: bold;">
            📋 Your Request Summary:
          </p>
          <table style="width: 100%; font-size: 14px;">
            <tr>
              <td style="padding: 6px 0; color: #888;">Budget:</td>
              <td style="padding: 6px 0; color: #333; font-weight: 500;">${budgetLabels[submission.budget] || submission.budget}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #888;">Industry:</td>
              <td style="padding: 6px 0; color: #333; font-weight: 500;">${escapeHtml(submission.industry)}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #888;">Services:</td>
              <td style="padding: 6px 0; color: #333; font-weight: 500;">${submission.services.map(s => s.charAt(0).toUpperCase() + s.slice(1).replace("_", " ")).join(", ")}</td>
            </tr>
          </table>
        </div>
        
        <div style="background: linear-gradient(135deg, rgba(189,0,255,0.1) 0%, rgba(0,240,255,0.1) 100%); padding: 20px; border-radius: 8px; border-left: 4px solid #00F0FF;">
          <p style="margin: 0; color: #333; font-size: 15px;">
            <strong>⏱️ What happens next?</strong><br/>
            <span style="color: #666;">Our team will review your requirements and match you with 2-3 top agencies within 24 hours. You'll receive personalized recommendations directly to your inbox.</span>
          </p>
        </div>
        
        <div style="text-align: center; margin-top: 30px;">
          <a href="https://bridgemark.com" 
             style="display: inline-block; background: linear-gradient(90deg, #BD00FF 0%, #00F0FF 100%); 
                    color: #000; padding: 14px 32px; text-decoration: none; border-radius: 50px; 
                    font-weight: bold; font-size: 16px;">
            Explore More Agencies
          </a>
        </div>
      </div>
      
      <div style="padding: 20px 30px; background-color: #1a1a2e; border-radius: 0 0 12px 12px; text-align: center;">
        <p style="color: #888; font-size: 12px; margin: 0;">
          © ${new Date().getFullYear()} Bridgemark. All rights reserved.
        </p>
        <p style="color: #666; font-size: 11px; margin: 10px 0 0 0;">
          You received this email because you submitted a matching request on our website.
        </p>
      </div>
    </div>
  `;

  try {
    const { error } = await resend.emails.send({
      from: config.fromEmail,
      to: submission.email,
      subject: "🎯 We're finding your perfect agencies - Bridgemark",
      html: htmlContent,
      text: `
Hi ${submission.name},

We're on it! 🚀

Thanks for submitting your agency matching request! Our AI is already analyzing your requirements to find the perfect agency partners for you.

Your Request Summary:
- Budget: ${budgetLabels[submission.budget] || submission.budget}
- Industry: ${submission.industry}
- Services: ${submission.services.join(", ")}

What happens next?
Our team will review your requirements and match you with 2-3 top agencies within 24 hours. You'll receive personalized recommendations directly to your inbox.

Visit us at https://bridgemark.com

Best regards,
The Bridgemark Team
      `.trim(),
    });

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error("[Mailer] Failed to send user confirmation:", error);
    throw new Error("Failed to send confirmation email");
  }
}

/**
 * Escapes HTML special characters to prevent XSS in email content.
 * Essential for user-provided content displayed in HTML emails.
 */
function escapeHtml(text: string): string {
  const htmlEscapes: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };

  return text.replace(/[&<>"']/g, (char) => htmlEscapes[char] || char);
}

/**
 * Sends a welcome email to the agency upon successful registration.
 * 
 * @param email - The agency's email address
 * @param name - The agency's name
 * @throws Error if email sending fails
 */
export async function sendAgencyWelcome(
  email: string,
  name: string
): Promise<void> {
  const config = getConfig();
  const resend = getResendClient();

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="text-align: center; padding: 30px 0; background: linear-gradient(135deg, #BD00FF 0%, #00F0FF 100%); border-radius: 12px 12px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 28px;">Bridgemark</h1>
      </div>
      
      <div style="padding: 40px 30px; background-color: #ffffff;">
        <h2 style="color: #1a1a2e; margin-top: 0;">
          Welcome to Bridgemark, ${escapeHtml(name)}! 🎉
        </h2>
        
        <p style="color: #444; line-height: 1.6; font-size: 16px;">
          Thanks for completing your registration and joining our curated network of top-tier agencies.
          Your application is currently under review by our team.
        </p>
        
        <div style="background: linear-gradient(135deg, rgba(189,0,255,0.1) 0%, rgba(0,240,255,0.1) 100%); padding: 20px; border-radius: 8px; border-left: 4px solid #00F0FF; margin: 25px 0;">
          <p style="margin: 0; color: #333; font-size: 15px;">
            <strong>⏱️ What's next?</strong><br/>
            <span style="color: #666;">Our team will review your profile within 1-2 business days. Once approved, your agency will be listed in our directory and eligible for client matches.</span>
          </p>
        </div>
        
        <div style="text-align: center; margin-top: 30px;">
          <a href="https://bridgemark.com" 
             style="display: inline-block; background: linear-gradient(90deg, #BD00FF 0%, #00F0FF 100%); 
                    color: #000; padding: 14px 32px; text-decoration: none; border-radius: 50px; 
                    font-weight: bold; font-size: 16px;">
            Visit Bridgemark
          </a>
        </div>
      </div>
      
      <div style="padding: 20px 30px; background-color: #1a1a2e; border-radius: 0 0 12px 12px; text-align: center;">
        <p style="color: #888; font-size: 12px; margin: 0;">
          © ${new Date().getFullYear()} Bridgemark. All rights reserved.
        </p>
      </div>
    </div>
  `;

  try {
    const { error } = await resend.emails.send({
      from: config.fromEmail,
      to: email,
      subject: "Welcome to Bridgemark! Application Received 🎉",
      html: htmlContent,
      text: `
Hi ${name},

Welcome to Bridgemark! 

Thanks for completing your registration and joining our curated network of top-tier agencies.
Your application is currently under review by our team.

What's next?
Our team will review your profile within 1-2 business days. Once approved, your agency will be listed in our directory and eligible for client matches.

Thank you,
The Bridgemark Team
      `.trim(),
    });

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error("[Mailer] Failed to send agency welcome:", error);
    throw new Error("Failed to send welcome email");
  }
}

