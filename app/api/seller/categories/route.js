import connectDB from "@/config/db";
import authSeller from "@/lib/authSeller";
import Category from "@/models/Category";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request) {
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

        const categories = await Category.find({})
            .sort({ sortOrder: 1, createdAt: -1 })
            .lean();

        return NextResponse.json({
            success: true,
            categories,
            totalCategories: categories.length
        });

    } catch (error) {
        console.error("SELLER CATEGORIES GET ERROR:", error);

        return NextResponse.json(
            {
                success: false,
                message: error.message
            },
            { status: 500 }
        );
    }
}


export async function POST(request) {
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
            name,
            slug,
            description,
            image,
            sortOrder,
            isActive
        } = await request.json();

        if (!name || !slug) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Category name and slug are required"
                },
                { status: 400 }
            );
        }

        const existingCategory = await Category.findOne({
            $or: [
                { name: name.trim() },
                { slug: slug.trim().toLowerCase() }
            ]
        });

        if (existingCategory) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Category name or slug already exists"
                },
                { status: 400 }
            );
        }

        const category = await Category.create({
            name: name.trim(),
            slug: slug.trim().toLowerCase(),
            description: description?.trim() || "",
            image: image?.trim() || "",
            sortOrder: Number(sortOrder) || 0,
            isActive: isActive !== false
        });

        return NextResponse.json({
            success: true,
            message: "Category created successfully",
            category
        });

    } catch (error) {
        console.error("SELLER CATEGORY CREATE ERROR:", error);

        return NextResponse.json(
            {
                success: false,
                message: error.message
            },
            { status: 500 }
        );
    }
}


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
            slug,
            description,
            image,
            sortOrder,
            isActive
        } = await request.json();

        if (!id) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Category ID is required"
                },
                { status: 400 }
            );
        }

        if (!name || !slug) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Category name and slug are required"
                },
                { status: 400 }
            );
        }

        const existingCategory = await Category.findOne({
            $or: [
                { name: name.trim() },
                { slug: slug.trim().toLowerCase() }
            ],
            _id: { $ne: id }
        });

        if (existingCategory) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Another category already uses this name or slug"
                },
                { status: 400 }
            );
        }

        const category = await Category.findByIdAndUpdate(
            id,
            {
                name: name.trim(),
                slug: slug.trim().toLowerCase(),
                description: description?.trim() || "",
                image: image?.trim() || "",
                sortOrder: Number(sortOrder) || 0,
                isActive: isActive !== false
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!category) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Category not found"
                },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: "Category updated successfully",
            category
        });

    } catch (error) {
        console.error("SELLER CATEGORY UPDATE ERROR:", error);

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
                    message: "Category ID is required"
                },
                { status: 400 }
            );
        }

        const category = await Category.findByIdAndDelete(id);

        if (!category) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Category not found"
                },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: "Category deleted successfully"
        });

    } catch (error) {
        console.error("SELLER CATEGORY DELETE ERROR:", error);

        return NextResponse.json(
            {
                success: false,
                message: error.message
            },
            { status: 500 }
        );
    }
}