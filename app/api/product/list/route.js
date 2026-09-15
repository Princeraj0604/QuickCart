import Product from "@/models/Product";
import connectDB from "@/config/db";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        await connectDB();

        const { searchParams } = new URL(request.url);

        const category = searchParams.get("category");
        const subcategory = searchParams.get("subcategory");
        const search = searchParams.get("search");
        const sort = searchParams.get("sort");
        const featured = searchParams.get("featured");
        const bestSeller = searchParams.get("bestSeller");
        const newArrival = searchParams.get("newArrival");

        const filter = {isActive:true};

        if (category) {
            filter.category = category;
        }

        if (subcategory) {
            filter.subcategory = subcategory;
        }

        if (search) {
            filter.$or = [
                {name:{$regex:search, $options:"i"}},
                {shortDescription:{$regex:search, $options:"i"}},
                {description:{$regex:search, $options:"i"}},
                {tags:{$regex:search, $options:"i"}}
            ];
        }

        if (featured === "true") {
            filter.featured = true;
        }

        if (bestSeller === "true") {
            filter.bestSeller = true;
        }

        if (newArrival === "true") {
            filter.newArrival = true;
        }

        let sortOption = {date:-1};

        if (sort === "price-low") {
            sortOption = {offerPrice:1};
        }

        if (sort === "price-high") {
            sortOption = {offerPrice:-1};
        }

        if (sort === "rating") {
            sortOption = {rating:-1};
        }

        if (sort === "newest") {
            sortOption = {date:-1};
        }

        if (sort === "oldest") {
            sortOption = {date:1};
        }

        const products = await Product.find(filter).sort(sortOption);

        return NextResponse.json({
            success:true,
            products
        });
    } catch (error) {
        return NextResponse.json(
            {success:false, message:error.message},
            {status:500}
        );
    }
}