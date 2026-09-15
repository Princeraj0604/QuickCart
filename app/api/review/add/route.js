import connectDB from "@/config/db";
import Review from "@/models/Review";
import Product from "@/models/Product";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        await connectDB();

        const { userId } = getAuth(request);
        const { productId, rating, comment } = await request.json();

        if (!userId) {
            return NextResponse.json(
                { success: false, message: "Please sign in to review" },
                { status: 401 }
            );
        }

        if (!productId || !rating || !comment?.trim()) {
            return NextResponse.json(
                { success: false, message: "Please provide rating and comment" },
                { status: 400 }
            );
        }

        if (rating < 1 || rating > 5) {
            return NextResponse.json(
                { success: false, message: "Rating must be between 1 and 5" },
                { status: 400 }
            );
        }

        const product = await Product.findById(productId);

        if (!product) {
            return NextResponse.json(
                { success: false, message: "Product not found" },
                { status: 404 }
            );
        }

        const existingReview = await Review.findOne({
            productId,
            userId
        });

        if (existingReview) {
            return NextResponse.json(
                {
                    success: false,
                    message: "You have already reviewed this product"
                },
                { status: 400 }
            );
        }

        const userName = request.headers.get("x-user-name") || "Customer";

        await Review.create({
            productId,
            userId,
            userName,
            rating,
            comment: comment.trim()
        });

        const reviews = await Review.find({ productId });

        const totalRating = reviews.reduce(
            (total, review) => total + review.rating,
            0
        );

        const averageRating =
            reviews.length > 0
                ? Number((totalRating / reviews.length).toFixed(1))
                : 0;

        product.rating = averageRating;
        product.reviewCount = reviews.length;

        await product.save();

        return NextResponse.json({
            success: true,
            message: "Review added successfully"
        });

    } catch (error) {
        console.error("REVIEW ADD ERROR:", error);

        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}