import connectDB from "@/config/db"
import Address from "@/models/Address"
import { NextResponse } from "next/server"
import { getAuth } from "@clerk/nextjs/server"

export async function POST(request) {
    try{
        const { userId } = getAuth(request)
        const { address } = await request.json()

        await connectDB()
        const newAddress = await Address.create({ ...address, userId })

        return NextResponse.json({success: true, message: "Address added successfully", newAddress}, {status: 200})
    }
    catch(error){
        return NextResponse.json({success: false, message: "Internal Server Error"}, {status: 500})
    }
}