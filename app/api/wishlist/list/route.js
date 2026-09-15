import connectDB from "@/config/db";
import User from "@/models/User";
import Product from "@/models/Product";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        await connectDB();

        const { userId } = getAuth(request);

        if (!userId) {
            return NextResponse.json(
                { success: false, message: "Please sign in" },
                { status: 401 }
            );
        }

        const user = await User.findById(userId);

        if (!user) {
            return NextResponse.json(
                { success: false, message: "User not found" },
                { status: 404 }
            );
        }

        const products = await Product.find({
            _id: { $in: user.wishlist },
            isActive: true
        });

        return NextResponse.json({
            success: true,
            products
        });

    } catch (error) {
        console.error("WISHLIST LIST ERROR:", error);

        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}