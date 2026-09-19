import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import Contact from "@/models/Contact";
import { auth } from "@clerk/nextjs/server";
import authSeller from "@/lib/authSeller";

export async function GET() {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Unauthorized",
                },
                { status: 401 }
            );
        }

        const isSeller = await authSeller(userId);

        if (!isSeller) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Access denied",
                },
                { status: 403 }
            );
        }

        await connectDB();

        const messages = await Contact.find({})
            .sort({ createdAt: -1 })
            .lean();

        return NextResponse.json({
            success: true,
            messages,
        });
    } catch (error) {
        console.error("Contact Messages API Error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to fetch contact messages.",
            },
            { status: 500 }
        );
    }
}