import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import authSeller from "@/lib/authSeller";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
    try {
        const { userId } = getAuth(request);

        const isSeller = await authSeller(userId);

        if (!isSeller) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Not authorized",
                },
                { status: 401 }
            );
        }

        const { imageUrl } = await request.json();

        if (!imageUrl) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Image URL is required",
                },
                { status: 400 }
            );
        }

        const uploadMarker = "/upload/";
        const markerIndex = imageUrl.indexOf(uploadMarker);

        if (markerIndex === -1) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid Cloudinary image URL",
                },
                { status: 400 }
            );
        }

        let publicIdWithExtension = imageUrl.substring(
            markerIndex + uploadMarker.length
        );

        publicIdWithExtension = publicIdWithExtension
            .replace(/^v\d+\//, "");

        const publicId = publicIdWithExtension.replace(/\.[^/.]+$/, "");

        const result = await cloudinary.uploader.destroy(publicId);

        if (result.result !== "ok" && result.result !== "not found") {
            return NextResponse.json(
                {
                    success: false,
                    message: "Failed to delete image from Cloudinary",
                },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            message: "Image deleted from Cloudinary",
            result: result.result,
        });
    } catch (error) {
        console.error("CLOUDINARY IMAGE DELETE ERROR:", error);

        return NextResponse.json(
            {
                success: false,
                message: error.message,
            },
            { status: 500 }
        );
    }
}