import connectDB from "@/config/db";
import User from "@/models/User";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        await connectDB();

        const { userId } = getAuth(request);
        const { productId } = await request.json();

        if (!userId || !productId) {
            return NextResponse.json(
                { success: false, message: "Invalid data" },
                { status: 400 }
            );
        }

        const user = await User.findById(userId);

        if (!user) {
            return NextResponse.json(
                { success: false, message: "User not found" },
                { status: 404 }
            );
        }

        if (!user.wishlist.includes(productId)) {
            user.wishlist.push(productId);
            await user.save();
        }

        return NextResponse.json({
            success: true,
            message: "Added to wishlist"
        });

    } catch (error) {
        console.error("WISHLIST ADD ERROR:", error);

        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}