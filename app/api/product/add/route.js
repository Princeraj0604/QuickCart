import { v2 as cloudinary } from "cloudinary";
import { getAuth } from "@clerk/nextjs/server";
import authSeller from "@/lib/authSeller";
import Product from "@/models/Product";
import connectDB from "@/config/db";
import { NextResponse } from "next/server";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const slugify = (value) => {
    return value
        .toString()
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
};

const getArrayValue = (formData, key) => {
    return formData
        .getAll(key)
        .map((item) => item.toString().trim())
        .filter(Boolean);
};

export async function POST(request) {
    try {
        const { userId } = getAuth(request);

        const isSeller = await authSeller(userId);

        if (!isSeller) {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            );
        }

        const formData = await request.formData();

        const name = formData.get("name")?.toString().trim();
        const shortDescription = formData.get("shortDescription")?.toString().trim();
        const description = formData.get("description")?.toString().trim();
        const category = formData.get("category")?.toString().trim();
        const subcategory = formData.get("subcategory")?.toString().trim() || "";
        const price = Number(formData.get("price"));
        const offerPrice = Number(formData.get("offerPrice"));
        const packSize = formData.get("packSize")?.toString().trim() || "";
        const shelfLife = formData.get("shelfLife")?.toString().trim() || "";
        const storageInstructions = formData.get("storageInstructions")?.toString().trim() || "";
        const ingredients = getArrayValue(formData, "ingredients");
        const allergens = getArrayValue(formData, "allergens");
        const tags = getArrayValue(formData, "tags");
        const featured = formData.get("featured") === "true";
        const bestSeller = formData.get("bestSeller") === "true";
        const newArrival = formData.get("newArrival") !== "false";
        const isActive = formData.get("isActive") !== "false";
        const files = formData.getAll("images");

        if (!name || !shortDescription || !description || !category) {
            return NextResponse.json(
                { success: false, message: "Required product fields are missing" },
                { status: 400 }
            );
        }

        if (!Number.isFinite(price) || !Number.isFinite(offerPrice)) {
            return NextResponse.json(
                { success: false, message: "Invalid price values" },
                { status: 400 }
            );
        }

        if (price < 0 || offerPrice < 0) {
            return NextResponse.json(
                { success: false, message: "Price cannot be negative" },
                { status: 400 }
            );
        }

        if (offerPrice > price) {
            return NextResponse.json(
                { success: false, message: "Offer price cannot be greater than price" },
                { status: 400 }
            );
        }

        if (!files || files.length === 0) {
            return NextResponse.json(
                { success: false, message: "No images provided" },
                { status: 400 }
            );
        }

        const result = await Promise.all(
            files.map(async (file) => {
                const arrayBuffer = await file.arrayBuffer();
                const buffer = Buffer.from(arrayBuffer);

                return new Promise((resolve, reject) => {
                    const stream = cloudinary.uploader.upload_stream(
                        { resource_type: "auto" },
                        (error, result) => {
                            if (error) {
                                reject(error);
                            } else {
                                resolve(result);
                            }
                        }
                    );

                    stream.end(buffer);
                });
            })
        );

        const images = result.map((result) => result.secure_url);

        await connectDB();

        let slug = slugify(`${name}-${packSize || "product"}`);
        const existingProduct = await Product.findOne({ slug });

        if (existingProduct) {
            slug = `${slug}-${Date.now()}`;
        }

        const newProduct = await Product.create({
            userId,
            name,
            slug,
            shortDescription,
            description,
            category,
            subcategory,
            price,
            offerPrice,
            images,
            ingredients,
            allergens,
            packSize,
            shelfLife,
            storageInstructions,
            rating: 0,
            reviewCount: 0,
            tags,
            featured,
            bestSeller,
            newArrival,
            isActive,
            date: Date.now(),
        });

        return NextResponse.json({
            success: true,
            message: "Product added successfully",
            newProduct,
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}