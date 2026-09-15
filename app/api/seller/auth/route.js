import { getAuth } from "@clerk/nextjs/server";
import authSeller from "@/lib/authSeller";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        const { userId } = getAuth(request);

        if (!userId) {
            return NextResponse.json(
                {success:false, message:"Unauthorized"},
                {status:401}
            );
        }

        const isSeller = await authSeller(userId);

        if (!isSeller) {
            return NextResponse.json(
                {success:false, message:"Access denied"},
                {status:403}
            );
        }

        return NextResponse.json({
            success:true,
            isSeller:true
        });
    } catch (error) {
        return NextResponse.json(
            {success:false, message:error.message},
            {status:500}
        );
    }
}