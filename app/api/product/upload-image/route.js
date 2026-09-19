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
        { status: 401 },
      );
    }

    const formData = await request.formData();
    const files = formData.getAll("images");
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];

    const maxFileSize = 5 * 1024 * 1024;

    for (const file of files) {
      if (!allowedTypes.includes(file.type)) {
        return NextResponse.json(
          {
            success: false,
            message: "Only JPG, PNG and WEBP images are allowed",
          },
          { status: 400 },
        );
      }

      if (file.size > maxFileSize) {
        return NextResponse.json(
          {
            success: false,
            message: "Each image must be smaller than 5MB",
          },
          { status: 400 },
        );
      }
    }

    if (!files || files.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "No images selected",
        },
        { status: 400 },
      );
    }

    if (files.length > 4) {
      return NextResponse.json(
        {
          success: false,
          message: "Maximum 4 images can be uploaded at once",
        },
        { status: 400 },
      );
    }

    const imageUrls = [];

    for (const file of files) {
      if (!file || typeof file.arrayBuffer !== "function") {
        continue;
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "mithila-thekua/products",
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          },
        );

        uploadStream.end(buffer);
      });

      imageUrls.push(result.secure_url);
    }

    return NextResponse.json({
      success: true,
      message: "Images uploaded successfully",
      images: imageUrls,
    });
  } catch (error) {
    console.error("PRODUCT IMAGE UPLOAD ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 },
    );
  }
}
