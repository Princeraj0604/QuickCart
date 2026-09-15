import connectDB from "@/config/db";
import authSeller from "@/lib/authSeller";
import Product from "@/models/Product";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PUT(request) {
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

        const {
            id,
            name,
            shortDescription,
            description,
            category,
            subcategory,
            price,
            offerPrice,
            packSize,
            shelfLife,
            storageInstructions,
            ingredients,
            allergens,
            tags,
            featured,
            bestSeller,
            newArrival,
            isActive
        } = await request.json();

        if (!id) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Product ID is required"
                },
                { status: 400 }
            );
        }

        if (
            !name ||
            !shortDescription ||
            !description ||
            !category ||
            price === undefined ||
            offerPrice === undefined
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Required product details are missing"
                },
                { status: 400 }
            );
        }

        const product = await Product.findOne({
            _id: id,
            userId
        });

        if (!product) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Product not found"
                },
                { status: 404 }
            );
        }

        product.name = name.trim();
        product.shortDescription = shortDescription.trim();
        product.description = description.trim();
        product.category = category.trim();
        product.subcategory = subcategory?.trim() || "";
        product.price = Number(price);
        product.offerPrice = Number(offerPrice);
        product.packSize = packSize?.trim() || "";
        product.shelfLife = shelfLife?.trim() || "";
        product.storageInstructions =
            storageInstructions?.trim() || "";

        product.ingredients = Array.isArray(ingredients)
            ? ingredients
            : [];

        product.allergens = Array.isArray(allergens)
            ? allergens
            : [];

        product.tags = Array.isArray(tags)
            ? tags
            : [];

        product.featured = featured === true;
        product.bestSeller = bestSeller === true;
        product.newArrival = newArrival === true;
        product.isActive = isActive !== false;

        await product.save();

        return NextResponse.json({
            success: true,
            message: "Product updated successfully",
            product
        });
    } catch (error) {
        console.error("SELLER PRODUCT UPDATE ERROR:", error);

        return NextResponse.json(
            {
                success: false,
                message: error.message
            },
            { status: 500 }
        );
    }
}


export async function PATCH(request) {
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

        const { id, isActive } = await request.json();

        if (!id) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Product ID is required"
                },
                { status: 400 }
            );
        }

        const product = await Product.findOneAndUpdate(
            {
                _id: id,
                userId
            },
            {
                isActive: isActive === true
            },
            {
                new: true
            }
        );

        if (!product) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Product not found"
                },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: product.isActive
                ? "Product activated successfully"
                : "Product deactivated successfully",
            product
        });
    } catch (error) {
        console.error("SELLER PRODUCT STATUS ERROR:", error);

        return NextResponse.json(
            {
                success: false,
                message: error.message
            },
            { status: 500 }
        );
    }
}


export async function DELETE(request) {
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

        const { id } = await request.json();

        if (!id) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Product ID is required"
                },
                { status: 400 }
            );
        }

        const product = await Product.findOneAndDelete({
            _id: id,
            userId
        });

        if (!product) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Product not found"
                },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: "Product deleted successfully"
        });
    } catch (error) {
        console.error("SELLER PRODUCT DELETE ERROR:", error);

        return NextResponse.json(
            {
                success: false,
                message: error.message
            },
            { status: 500 }
        );
    }
}