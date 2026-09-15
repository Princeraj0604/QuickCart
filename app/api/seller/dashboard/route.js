import connectDB from "@/config/db";
import authSeller from "@/lib/authSeller";
import Product from "@/models/Product";
import Order from "@/models/Order";
import User from "@/models/User";
import Review from "@/models/Review";
import Address from "@/models/Address";
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

        const products = await Product.find({
            userId
        })
            .sort({ date: -1 })
            .limit(5);

        const orders = await Order.find({})
            .populate("address")
            .populate("items.productId")
            .sort({ date: -1 })
            .limit(5);

        const totalProducts = await Product.countDocuments({
            userId
        });

        const totalOrders = await Order.countDocuments({});

        const totalCustomers = await User.countDocuments({});

        const revenueResult = await Order.aggregate([
            {
                $group: {
                    _id: null,
                    total: {
                        $sum: "$amount"
                    }
                }
            }
        ]);

        const totalRevenue =
            revenueResult.length > 0
                ? revenueResult[0].total
                : 0;

        const totalReviews = await Review.countDocuments({});

        const orderStatus = await Order.aggregate([
            {
                $group: {
                    _id: "$status",
                    count: {
                        $sum: 1
                    }
                }
            }
        ]);

        return NextResponse.json({
            success: true,

            stats: {
                totalProducts,
                totalOrders,
                totalCustomers,
                totalRevenue,
                totalReviews
            },

            products,

            recentOrders: orders,

            orderStatus
        });

    } catch (error) {
        console.error("SELLER DASHBOARD ERROR:", error);

        return NextResponse.json(
            {
                success: false,
                message: error.message
            },
            { status: 500 }
        );
    }
}