import authSeller from "@/lib/authSeller"
import Product from "@/models/Product"
import connectDB from "@/config/db"
import { NextResponse } from "next/server"
import { getAuth } from "@clerk/nextjs/server"

export async function GET(request) {
    try{

        const { userId } = getAuth(request)
        const isSeller = await authSeller(userId)
        if(!isSeller) {
            return NextResponse.json({success: false, message: "Unauthorized"}, {status: 401})
        }

        await connectDB()
        const products = await Product.find({ userId }).sort({ date: -1 })
        return NextResponse.json({success: true, products}, {status: 200})

    }
    catch(error){
        return NextResponse.json({success: false, message: "Internal Server Error"}, {status: 500})
    }
}