import { NextRequest, NextResponse } from "next/server";
import { sendAgencyWelcome } from "@/lib/email/mailer";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, name } = body;

        if (!email || !name) {
            return NextResponse.json(
                { success: false, error: "Missing email or name" },
                { status: 400 }
            );
        }

        await sendAgencyWelcome(email, name);

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error("[API] Error sending agency welcome email:", error);
        return NextResponse.json(
            { success: false, error: "Failed to send welcome email" },
            { status: 500 }
        );
    }
}
