"use client";

import React, { useEffect, useState } from "react";
import { useAppContext } from "@/context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";
import Image from "next/image";

const Seller = () => {
    const { getToken } = useAppContext();

    const [categories, setCategories] = useState([]);
    const [images, setImages] = useState([null, null, null, null]);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        shortDescription: "",
        description: "",
        category: "",
        subcategory: "",
        price: "",
        offerPrice: "",
        packSize: "",
        shelfLife: "",
        storageInstructions: "",
        ingredients: "",
        allergens: "",
        tags: "",
        featured: false,
        bestSeller: false,
        newArrival: true,
        isActive: true,
    });

    const fetchCategories = async () => {
        try {
            const { data } = await axios.get("/api/category/list");

            if (data.success) {
                setCategories(data.categories);

                if (data.categories.length > 0) {
                    setFormData((prev) => ({
                        ...prev,
                        category: prev.category || data.categories[0].name,
                    }));
                }
            }
        } catch (error) {
            toast.error("Failed to load categories");
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleImageChange = (index, file) => {
        setImages((prev) => {
            const updatedImages = [...prev];
            updatedImages[index] = file;
            return updatedImages;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const token = await getToken();

            if (!token) {
                toast.error("Please login first");
                return;
            }

            const selectedImages = images.filter(Boolean);

            if (selectedImages.length === 0) {
                toast.error("Please select at least one product image");
                return;
            }

            if (Number(formData.offerPrice) > Number(formData.price)) {
                toast.error("Offer price cannot be greater than price");
                return;
            }

            const data = new FormData();

            data.append("name", formData.name);
            data.append("shortDescription", formData.shortDescription);
            data.append("description", formData.description);
            data.append("category", formData.category);
            data.append("subcategory", formData.subcategory);
            data.append("price", formData.price);
            data.append("offerPrice", formData.offerPrice);
            data.append("packSize", formData.packSize);
            data.append("shelfLife", formData.shelfLife);
            data.append("storageInstructions", formData.storageInstructions);
            data.append("featured", String(formData.featured));
            data.append("bestSeller", String(formData.bestSeller));
            data.append("newArrival", String(formData.newArrival));
            data.append("isActive", String(formData.isActive));

            formData.ingredients
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean)
                .forEach((item) => data.append("ingredients", item));

            formData.allergens
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean)
                .forEach((item) => data.append("allergens", item));

            formData.tags
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean)
                .forEach((item) => data.append("tags", item));

            selectedImages.forEach((image) => {
                data.append("images", image);
            });

            const response = await axios.post("/api/product/add", data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.data.success) {
                toast.success("Product added successfully");

                setFormData({
                    name: "",
                     shortDescription: "",
                    description: "",
                    category: categories[0]?.name || "",
                    subcategory: "",
                    price: "",
                    offerPrice: "",
                    packSize: "",
                    shelfLife: "",
                    storageInstructions: "",
                    ingredients: "",
                    allergens: "",
                    tags: "",
                    featured: false,
                    bestSeller: false,
                    newArrival: true,
                    isActive: true,
                });

                setImages([null, null, null, null]);
            } else {
                toast.error(response.data.message || "Failed to add product");
            }
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex-1 min-h-screen bg-[#F8F5EF] px-4 sm:px-6 lg:px-10 py-8">
            <div className="max-w-5xl mx-auto">
                <div className="mb-8">
                    <p className="text-xs tracking-[0.25em] uppercase text-[#8A5A32] font-medium">
                        MITHILA SELLER PANEL
                    </p>

                    <h1 className="mt-2 font-serif text-3xl md:text-4xl text-[#2F241D]">
                        Add Thekua Product
                    </h1>

                    <p className="mt-2 text-sm text-[#66574D]">
                        Add product details, images, pricing, ingredients, and
                        collection information.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">

                    <div className="bg-white rounded-2xl p-5 md:p-7 shadow-sm">
                        <h2 className="text-lg font-semibold text-[#2F241D]">
                            Product Images
                        </h2>

                        <p className="mt-1 text-sm text-[#66574D]">
                            Upload up to 4 product images.
                        </p>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-5">
                            {images.map((image, index) => (
                                <label
                                    key={index}
                                    className="relative aspect-square rounded-xl border-2 border-dashed border-[#D8CABB] bg-[#F8F5EF] cursor-pointer overflow-hidden flex items-center justify-center hover:border-[#8A5A32] transition"
                                >
                                    {image ? (
                                        <Image
                                            src={URL.createObjectURL(image)}
                                            alt={`Product ${index + 1}`}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="text-center px-3">
                                            <p className="text-2xl text-[#8A5A32]">
                                                +
                                            </p>
                                            <p className="text-xs text-[#66574D]">
                                                Image {index + 1}
                                            </p>
                                        </div>
                                    )}

                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) =>
                                            handleImageChange(
                                                index,
                                                e.target.files?.[0]
                                            )
                                        }
                                    />
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-5 md:p-7 shadow-sm">
                        <h2 className="text-lg font-semibold text-[#2F241D]">
                            Basic Information
                        </h2>

                        <div className="grid md:grid-cols-2 gap-5 mt-5">
                            <div className="md:col-span-2">
                                <label className="text-sm font-medium text-[#2F241D]">
                                    Product Name
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Classic Gur Thekua"
                                    required
                                    className="mt-2 w-full rounded-xl border border-[#D8CABB] px-4 py-3 text-sm outline-none focus:border-[#8A5A32]"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="text-sm font-medium text-[#2F241D]">
                                    Short Description
                                </label>

                                <input
                                    type="text"
                                    name="shortDescription"
                                    value={formData.shortDescription}
                                    onChange={handleChange}
                                    placeholder="Traditional jaggery Thekua with a crisp, rich texture."
                                    required
                                    className="mt-2 w-full rounded-xl border border-[#D8CABB] px-4 py-3 text-sm outline-none focus:border-[#8A5A32]"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="text-sm font-medium text-[#2F241D]">
                                    Full Description
                                </label>

                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Write a detailed description of the product..."
                                    rows={5}
                                    required
                                   className="mt-2 w-full rounded-xl border border-[#D8CABB] px-4 py-3 text-sm outline-none resize-none focus:border-[#8A5A32]"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-[#2F241D]">
                                    Category
                                </label>

                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    required
                                    className="mt-2 w-full rounded-xl border border-[#D8CABB] bg-white px-4 py-3 text-sm outline-none focus:border-[#8A5A32]"
                                >
                                    {categories.map((category) => (
                                        <option
                                            key={category._id}
                                            value={category.name}
                                        >
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-[#2F241D]">
                                    Subcategory
                                </label>

                                <input
                                    type="text"
                                    name="subcategory"
                                    value={formData.subcategory}
                                    onChange={handleChange}
                                    placeholder="Jaggery Thekua"
                                    className="mt-2 w-full rounded-xl border border-[#D8CABB] px-4 py-3 text-sm outline-none focus:border-[#8A5A32]"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-5 md:p-7 shadow-sm">
                        <h2 className="text-lg font-semibold text-[#2F241D]">
                            Pricing & Pack
                        </h2>

                        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5 mt-5">
                            <div>
                                <label className="text-sm font-medium text-[#2F241D]">
                                    Price
                                </label>

                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    placeholder="399"
                                    min="0"
                                    required
                                    className="mt-2 w-full rounded-xl border border-[#D8CABB] px-4 py-3 text-sm outline-none focus:border-[#8A5A32]"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-[#2F241D]">
                                    Offer Price
                                </label>

                                <input
                                    type="number"
                                    name="offerPrice"
                                    value={formData.offerPrice}
                                    onChange={handleChange}
                                    placeholder="349"
                                    min="0"
                                    required
                                    className="mt-2 w-full rounded-xl border border-[#D8CABB] px-4 py-3 text-sm outline-none focus:border-[#8A5A32]"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-[#2F241D]">
                                    Pack Size
                                </label>

                                <input
                                    type="text"
                                    name="packSize"
                                    value={formData.packSize}
                                    onChange={handleChange}
                                    placeholder="500g"
                                    className="mt-2 w-full rounded-xl border border-[#D8CABB] px-4 py-3 text-sm outline-none focus:border-[#8A5A32]"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-[#2F241D]">
                                    Shelf Life
                                </label>

                                <input
                                    type="text"
                                    name="shelfLife"
                                    value={formData.shelfLife}
                                    onChange={handleChange}
                                    placeholder="30 days"
                                    className="mt-2 w-full rounded-xl border border-[#D8CABB] px-4 py-3 text-sm outline-none focus:border-[#8A5A32]"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-5 md:p-7 shadow-sm">
                        <h2 className="text-lg font-semibold text-[#2F241D]">
                            Product Details
                        </h2>

                        <div className="grid md:grid-cols-2 gap-5 mt-5">
                            <div>
                                <label className="text-sm font-medium text-[#2F241D]">
                                    Ingredients
                                </label>

                                <input
                                    type="text"
                                    name="ingredients"
                                    value={formData.ingredients}
                                    onChange={handleChange}
                                    placeholder="Wheat Flour, Jaggery, Ghee, Fennel"
                                    className="mt-2 w-full rounded-xl border border-[#D8CABB] px-4 py-3 text-sm outline-none focus:border-[#8A5A32]"
                                />

                                <p className="mt-1 text-xs text-[#8A7B70]">
                                    Separate ingredients with commas.
                                </p>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-[#2F241D]">
                                    Allergens
                                </label>

                                <input
                                    type="text"
                                    name="allergens"
                                    value={formData.allergens}
                                    onChange={handleChange}
                                    placeholder="Wheat, Milk"
                                    className="mt-2 w-full rounded-xl border border-[#D8CABB] px-4 py-3 text-sm outline-none focus:border-[#8A5A32]"
                                />

                                <p className="mt-1 text-xs text-[#8A7B70]">
                                    Separate allergens with commas.
                                </p>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-[#2F241D]">
                                    Tags
                                </label>

                                <input
                                    type="text"
                                    name="tags"
                                    value={formData.tags}
                                    onChange={handleChange}
                                    placeholder="traditional, jaggery, mithila"
                                    className="mt-2 w-full rounded-xl border border-[#D8CABB] px-4 py-3 text-sm outline-none focus:border-[#8A5A32]"
                                />

                                <p className="mt-1 text-xs text-[#8A7B70]">
                                    Separate tags with commas.
                                </p>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-[#2F241D]">
                                    Storage Instructions
                                </label>

                                <input
                                    type="text"
                                    name="storageInstructions"
                                    value={formData.storageInstructions}
                                    onChange={handleChange}
                                    placeholder="Store in a cool and dry place."
                                    className="mt-2 w-full rounded-xl border border-[#D8CABB] px-4 py-3 text-sm outline-none focus:border-[#8A5A32]"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-5 md:p-7 shadow-sm">
                        <h2 className="text-lg font-semibold text-[#2F241D]">
                            Product Status
                        </h2>

                        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mt-5">
                            <label className="flex items-center gap-3 rounded-xl border border-[#E9DFD0] px-4 py-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="featured"
                                    checked={formData.featured}
                                    onChange={handleChange}
                                    className="h-4 w-4 accent-[#6B3F24]"
                                />
                                <span className="text-sm text-[#2F241D]">
                                    Featured
                                </span>
                            </label>

                            <label className="flex items-center gap-3 rounded-xl border border-[#E9DFD0] px-4 py-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="bestSeller"
                                    checked={formData.bestSeller}
                                    onChange={handleChange}
                                    className="h-4 w-4 accent-[#6B3F24]"
                                />
                                <span className="text-sm text-[#2F241D]">
                                    Best Seller
                                </span>
                            </label>

                            <label className="flex items-center gap-3 rounded-xl border border-[#E9DFD0] px-4 py-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="newArrival"
                                    checked={formData.newArrival}
                                    onChange={handleChange}
                                    className="h-4 w-4 accent-[#6B3F24]"
                                />
                                <span className="text-sm text-[#2F241D]">
                                    New Arrival
                                </span>
                            </label>

                            <label className="flex items-center gap-3 rounded-xl border border-[#E9DFD0] px-4 py-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="isActive"
                                    checked={formData.isActive}
                                    onChange={handleChange}
                                    className="h-4 w-4 accent-[#6B3F24]"
                                />
                                <span className="text-sm text-[#2F241D]">
                                    Active
                                </span>
                            </label>
                        </div>
                    </div>

                    <div className="flex justify-end pb-10">
                        <button
                            type="submit"
                            disabled={loading}
                            className="rounded-full bg-[#6B3F24] px-8 py-3.5 text-sm font-medium text-white transition hover:bg-[#8A5A32] disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {loading ? "Adding Product..." : "Add Thekua Product"}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default Seller;