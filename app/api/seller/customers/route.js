import connectDB from "@/config/db";
import authSeller from "@/lib/authSeller";
import Order from "@/models/Order";
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

        const customerStats = await Order.aggregate([
            {
                $group: {
                    _id: "$userId",
                    totalOrders: {
                        $sum: 1
                    },
                    totalSpent: {
                        $sum: "$amount"
                    },
                    lastOrderDate: {
                        $max: "$date"
                    }
                }
            },
            {
                $sort: {
                    lastOrderDate: -1
                }
            }
        ]);

        const userIds = customerStats.map((customer) => customer._id);

        if (userIds.length === 0) {
            return NextResponse.json({
                success: true,
                customers: [],
                totalCustomers: 0
            });
        }

        const users = await User.find({
            _id: {
                $in: userIds
            }
        }).lean();

        const statsMap = new Map();

        customerStats.forEach((customer) => {
            statsMap.set(customer._id, customer);
        });

        const customers = users
            .map((user) => {
                const stats = statsMap.get(user._id);

                if (!stats) return null;

                return {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    imageUrl: user.imageUrl,
                    totalOrders: stats.totalOrders,
                    totalSpent: stats.totalSpent,
                    lastOrderDate: stats.lastOrderDate
                };
            })
            .filter(Boolean)
            .sort(
                (a, b) =>
                    new Date(b.lastOrderDate) -
                    new Date(a.lastOrderDate)
            );

        return NextResponse.json({
            success: true,
            customers,
            totalCustomers: customers.length
        });

    } catch (error) {
        console.error("SELLER CUSTOMERS ERROR:", error);

        return NextResponse.json(
            {
                success: false,
                message: error.message
            },
            { status: 500 }
        );
    }
}