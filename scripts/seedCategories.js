import "dotenv/config";
import mongoose from "mongoose";
import Category from "../models/Category.js";
import connectDB from "../config/db.js";

const categories = [
    {
        name:"Classic Thekua",
        slug:"classic-thekua",
        description:"Traditional Thekua made with timeless Mithila recipes.",
        sortOrder:1
    },
    {
        name:"Premium Thekua",
        slug:"premium-thekua",
        description:"Special Thekua crafted with premium ingredients and flavours.",
        sortOrder:2
    },
    {
        name:"Special Variants",
        slug:"special-variants",
        description:"Unique Thekua flavours created for different tastes and occasions.",
        sortOrder:3
    },
    {
        name:"Dietary & Alternative",
        slug:"dietary-alternative",
        description:"Alternative Thekua options made for different preferences.",
        sortOrder:4
    },
    {
        name:"Gifting",
        slug:"gifting",
        description:"Thoughtfully curated Thekua boxes for celebrations and gifting.",
        sortOrder:5
    },
    {
        name:"Combos",
        slug:"combos",
        description:"Curated combinations of Thekua for sharing and celebrations.",
        sortOrder:6
    },
    {
        name:"B2B & Bulk",
        slug:"b2b-bulk",
        description:"Thekua options for bulk orders, events, and business requirements.",
        sortOrder:7
    }
];

const seedCategories = async () => {
    try {
        await connectDB();

        await Category.deleteMany({});

        await Category.insertMany(categories);

        console.log("Categories seeded successfully");

        await mongoose.connection.close();
    } catch (error) {
        console.error("Category seeding failed:", error);
        process.exit(1);
    }
};

seedCategories();