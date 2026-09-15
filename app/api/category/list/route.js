import Category from "@/models/Category";
import connectDB from "@/config/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDB();

        const categories = await Category.find({isActive:true}).sort({sortOrder:1});

        return NextResponse.json({
            success:true,
            categories
        });
    } catch (error) {
        return NextResponse.json(
            {success:false, message:error.message},
            {status:500}
        );
    }
}