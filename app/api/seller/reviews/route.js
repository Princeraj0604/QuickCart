import connectDB from "@/config/db";
import authSeller from "@/lib/authSeller";
import Review from "@/models/Review";
import Product from "@/models/Product";
import User from "@/models/User";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        const { userId } = getAuth(request);

        const isSeller = await authSeller(userId);

        if (!isSeller) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Not authorized"
                },
                { status: 401 }
            );
        }

        await connectDB();

        const reviews = await Review.find({})
            .populate("productId", "name images category packSize")
            .sort({ createdAt: -1 })
            .lean();

        const userIds = reviews.map((review) => review.userId);

        const users = await User.find({
            _id: {
                $in: userIds
            }
        })
            .select("_id name email imageUrl")
            .lean();

        const userMap = new Map();

        users.forEach((user) => {
            userMap.set(user._id, user);
        });

        const formattedReviews = reviews.map((review) => {
            const user = userMap.get(review.userId);

            return {
                _id: review._id,
                rating: review.rating,
                comment: review.comment,
                userId: review.userId,
                userName: review.userName,
                userEmail: user?.email || "",
                userImage: user?.imageUrl || "",
                product: review.productId
                    ? {
                        _id: review.productId._id,
                        name: review.productId.name,
                        images: review.productId.images,
                        category: review.productId.category,
                        packSize: review.productId.packSize
                    }
                    : null,
                createdAt: review.createdAt,
                updatedAt: review.updatedAt
            };
        });

        const averageRating =
            formattedReviews.length > 0
                ? (
                    formattedReviews.reduce(
                        (total, review) => total + review.rating,
                        0
                    ) / formattedReviews.length
                ).toFixed(1)
                : "0.0";

        return NextResponse.json({
            success: true,
            reviews: formattedReviews,
            totalReviews: formattedReviews.length,
            averageRating: Number(averageRating)
        });

    } catch (error) {
        console.error("SELLER REVIEWS ERROR:", error);

        return NextResponse.json(
            {
                success: false,
                message: error.message
            },
            { status: 500 }
        );
    }
}