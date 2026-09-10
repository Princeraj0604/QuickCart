import authSeller from "@/lib/authSeller"
import Product from "@/models/Product"
import connectDB from "@/config/db"
import { NextResponse } from "next/server"

export async function GET(request) {
    try{

        
        await connectDB()
        const products = await Product.find({}).sort({ date: -1 })
        return NextResponse.json({success: true, products}, {status: 200})

    }
    catch(error){
        return NextResponse.json({success: false, message: "Internal Server Error"}, {status: 500})
    }
}