import connectDB from "@/config/db";
import Review from "@/models/Review";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        await connectDB();

        const { searchParams } = new URL(request.url);
        const productId = searchParams.get("productId");

        if (!productId) {
            return NextResponse.json(
                { success: false, message: "Product ID is required" },
                { status: 400 }
            );
        }

        const reviews = await Review.find({ productId })
            .sort({ createdAt: -1 });

        return NextResponse.json({
            success: true,
            reviews
        });

    } catch (error) {
        console.error("REVIEW LIST ERROR:", error);

        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}