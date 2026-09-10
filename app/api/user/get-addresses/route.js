import connectDB from "@/config/db"
import Address from "@/models/Address"
import { NextResponse } from "next/server"
import { getAuth } from "@clerk/nextjs/server"


export async function GET(request) {
    try{
        const { userId } = getAuth(request)
        await connectDB()
        const addresses = await Address.find({ userId }).sort({ date: -1 })

        return NextResponse.json({success: true, addresses}, {status: 200})
    }
    catch(error){
        return NextResponse.json({success: false, message: "Internal Server Error"}, {status: 500})
    }
}