"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import Loading from "@/components/Loading";
import Footer from "@/components/seller/Footer";
import axios from "axios";
import { toast } from "react-hot-toast";

const EditProduct = () => {
    const params = useParams();
    const router = useRouter();
    const { getToken, user, currency, categories } = useAppContext();

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [product, setProduct] = useState(null);

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
        newArrival: false,
        isActive: true,
    });

    const fetchProduct = async () => {
        try {
            setLoading(true);

            const token = await getToken();

            const { data } = await axios.get(
                "/api/product/seller-list",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!data.success) {
                toast.error(data.message || "Failed to load products");
                return;
            }

            const foundProduct = data.products.find(
                (item) => item._id === params.id
            );

            if (!foundProduct) {
                toast.error("Product not found");
                router.replace("/seller/product-list");
                return;
            }

            setProduct(foundProduct);

            setFormData({
                name: foundProduct.name || "",
                shortDescription: foundProduct.shortDescription || "",
                description: foundProduct.description || "",
                category: foundProduct.category || "",
                subcategory: foundProduct.subcategory || "",
                price: foundProduct.price ?? "",
                offerPrice: foundProduct.offerPrice ?? "",
                packSize: foundProduct.packSize || "",
                shelfLife: foundProduct.shelfLife || "",
                storageInstructions:
                    foundProduct.storageInstructions || "",
                ingredients:
                    foundProduct.ingredients?.join(", ") || "",
                allergens:
                    foundProduct.allergens?.join(", ") || "",
                tags:
                    foundProduct.tags?.join(", ") || "",
                featured: foundProduct.featured === true,
                bestSeller: foundProduct.bestSeller === true,
                newArrival: foundProduct.newArrival === true,
                isActive: foundProduct.isActive !== false,
            });
        } catch (error) {
            console.error("EDIT PRODUCT FETCH ERROR:", error);

            toast.error(
                error.response?.data?.message ||
                error.message ||
                "Failed to load product"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user && params.id) {
            fetchProduct();
        }
    }, [user, params.id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((previous) => ({
            ...previous,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !formData.name.trim() ||
            !formData.shortDescription.trim() ||
            !formData.description.trim() ||
            !formData.category ||
            formData.price === "" ||
            formData.offerPrice === ""
        ) {
            toast.error("Please fill all required fields");
            return;
        }

        if (Number(formData.price) < 0 || Number(formData.offerPrice) < 0) {
            toast.error("Price cannot be negative");
            return;
        }

        if (Number(formData.offerPrice) > Number(formData.price)) {
            toast.error("Offer price cannot be greater than price");
            return;
        }

        try {
            setSaving(true);

            const token = await getToken();

            const payload = {
                id: product._id,
                name: formData.name,
                shortDescription: formData.shortDescription,
                description: formData.description,
                category: formData.category,
                subcategory: formData.subcategory,

                price: Number(formData.price),
                offerPrice: Number(formData.offerPrice),

                packSize: formData.packSize,
                shelfLife: formData.shelfLife,
                storageInstructions:
                    formData.storageInstructions,

                ingredients: formData.ingredients
                    .split(",")
                    .map((item) => item.trim())
                    .filter(Boolean),

                allergens: formData.allergens
                    .split(",")
                    .map((item) => item.trim())
                    .filter(Boolean),

                tags: formData.tags
                    .split(",")
                    .map((item) => item.trim())
                    .filter(Boolean),

                featured: formData.featured,
                bestSeller: formData.bestSeller,
                newArrival: formData.newArrival,
                isActive: formData.isActive,
            };

            const { data } = await axios.put(
                "/api/product/seller-manage",
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (data.success) {
                toast.success("Product updated successfully");

                setTimeout(() => {
                    router.push("/seller/product-list");
                }, 700);
            } else {
                toast.error(
                    data.message || "Failed to update product"
                );
            }
        } catch (error) {
            console.error("EDIT PRODUCT ERROR:", error);

            toast.error(
                error.response?.data?.message ||
                error.message ||
                "Failed to update product"
            );
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <Loading />;
    }

    if (!product) {
        return null;
    }

    return (
        <div className="flex-1 min-h-screen bg-[#F8F5EF] flex flex-col justify-between">
            <main className="w-full px-4 sm:px-6 lg:px-10 py-8">
                <div className="max-w-5xl mx-auto">

                    <div className="mb-8">
                        <p className="text-xs uppercase tracking-[0.25em] text-[#8A5A32] font-medium">
                            MITHILA SELLER PANEL
                        </p>

                        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                            <div>
                                <h1 className="mt-2 text-3xl md:text-4xl font-serif text-[#2F241D]">
                                    Edit Product
                                </h1>

                                <p className="mt-2 text-sm text-[#66574D]">
                                    Update your Thekua product details.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    router.push("/seller/product-list")
                                }
                                className="w-fit rounded-full border border-[#6B3F24] px-5 py-2.5 text-sm font-medium text-[#6B3F24] hover:bg-[#6B3F24] hover:text-white transition"
                            >
                                Back to Products
                            </button>
                        </div>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="bg-white rounded-2xl border border-[#E9DFD0] p-5 sm:p-7"
                    >

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-[#2F241D] mb-2">
                                    Product Name *
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full rounded-xl border border-[#E9DFD0] px-4 py-3 text-sm outline-none focus:border-[#6B3F24]"
                                    placeholder="Classic Gur Thekua"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-[#2F241D] mb-2">
                                    Short Description *
                                </label>

                                <input
                                    type="text"
                                    name="shortDescription"
                                    value={formData.shortDescription}
                                    onChange={handleChange}
                                    className="w-full rounded-xl border border-[#E9DFD0] px-4 py-3 text-sm outline-none focus:border-[#6B3F24]"
                                    placeholder="A traditional Mithila-style Thekua..."
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-[#2F241D] mb-2">
                                    Full Description *
                                </label>

                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows={5}
                                    className="w-full rounded-xl border border-[#E9DFD0] px-4 py-3 text-sm outline-none resize-none focus:border-[#6B3F24]"
                                    placeholder="Describe the product in detail..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#2F241D] mb-2">
                                    Category *
                                </label>

                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full rounded-xl border border-[#E9DFD0] px-4 py-3 text-sm outline-none bg-white focus:border-[#6B3F24]"
                                >
                                    <option value="">
                                        Select Category
                                    </option>

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
                                <label className="block text-sm font-medium text-[#2F241D] mb-2">
                                    Subcategory
                                </label>

                                <input
                                    type="text"
                                    name="subcategory"
                                    value={formData.subcategory}
                                    onChange={handleChange}
                                    className="w-full rounded-xl border border-[#E9DFD0] px-4 py-3 text-sm outline-none focus:border-[#6B3F24]"
                                    placeholder="Jaggery Thekua"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#2F241D] mb-2">
                                    Price *
                                </label>

                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    min="0"
                                    className="w-full rounded-xl border border-[#E9DFD0] px-4 py-3 text-sm outline-none focus:border-[#6B3F24]"
                                    placeholder="299"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#2F241D] mb-2">
                                    Offer Price *
                                </label>

                                <input
                                    type="number"
                                    name="offerPrice"
                                    value={formData.offerPrice}
                                    onChange={handleChange}
                                    min="0"
                                    className="w-full rounded-xl border border-[#E9DFD0] px-4 py-3 text-sm outline-none focus:border-[#6B3F24]"
                                    placeholder="249"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#2F241D] mb-2">
                                    Pack Size
                                </label>

                                <input
                                    type="text"
                                    name="packSize"
                                    value={formData.packSize}
                                    onChange={handleChange}
                                    className="w-full rounded-xl border border-[#E9DFD0] px-4 py-3 text-sm outline-none focus:border-[#6B3F24]"
                                    placeholder="400g"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#2F241D] mb-2">
                                    Shelf Life
                                </label>

                                <input
                                    type="text"
                                    name="shelfLife"
                                    value={formData.shelfLife}
                                    onChange={handleChange}
                                    className="w-full rounded-xl border border-[#E9DFD0] px-4 py-3 text-sm outline-none focus:border-[#6B3F24]"
                                    placeholder="30 days"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-[#2F241D] mb-2">
                                    Storage Instructions
                                </label>

                                <textarea
                                    name="storageInstructions"
                                    value={formData.storageInstructions}
                                    onChange={handleChange}
                                    rows={3}
                                    className="w-full rounded-xl border border-[#E9DFD0] px-4 py-3 text-sm outline-none resize-none focus:border-[#6B3F24]"
                                    placeholder="Store in a cool and dry place..."
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-[#2F241D] mb-2">
                                    Ingredients
                                </label>

                                <input
                                    type="text"
                                    name="ingredients"
                                    value={formData.ingredients}
                                    onChange={handleChange}
                                    className="w-full rounded-xl border border-[#E9DFD0] px-4 py-3 text-sm outline-none focus:border-[#6B3F24]"
                                    placeholder="Wheat Flour, Jaggery, Ghee, Fennel"
                                />

                                <p className="mt-1 text-xs text-[#8A7A6D]">
                                    Separate ingredients with commas.
                                </p>
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-[#2F241D] mb-2">
                                    Allergens
                                </label>

                                <input
                                    type="text"
                                    name="allergens"
                                    value={formData.allergens}
                                    onChange={handleChange}
                                    className="w-full rounded-xl border border-[#E9DFD0] px-4 py-3 text-sm outline-none focus:border-[#6B3F24]"
                                    placeholder="Wheat, Milk"
                                />

                                <p className="mt-1 text-xs text-[#8A7A6D]">
                                    Separate allergens with commas.
                                </p>
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-[#2F241D] mb-2">
                                    Tags
                                </label>

                                <input
                                    type="text"
                                    name="tags"
                                    value={formData.tags}
                                    onChange={handleChange}
                                    className="w-full rounded-xl border border-[#E9DFD0] px-4 py-3 text-sm outline-none focus:border-[#6B3F24]"
                                    placeholder="traditional, mithila, jaggery, festive"
                                />

                                <p className="mt-1 text-xs text-[#8A7A6D]">
                                    Separate tags with commas.
                                </p>
                            </div>

                        </div>

                        <div className="mt-8 border-t border-[#E9DFD0] pt-6">

                            <p className="text-sm font-medium text-[#2F241D] mb-4">
                                Product Settings
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">

                                <label className="flex items-center gap-3 rounded-xl border border-[#E9DFD0] px-4 py-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="featured"
                                        checked={formData.featured}
                                        onChange={handleChange}
                                        className="accent-[#6B3F24]"
                                    />

                                    <span className="text-sm text-[#66574D]">
                                        Featured
                                    </span>
                                </label>

                                <label className="flex items-center gap-3 rounded-xl border border-[#E9DFD0] px-4 py-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="bestSeller"
                                        checked={formData.bestSeller}
                                        onChange={handleChange}
                                        className="accent-[#6B3F24]"
                                    />

                                    <span className="text-sm text-[#66574D]">
                                        Best Seller
                                    </span>
                                </label>

                                <label className="flex items-center gap-3 rounded-xl border border-[#E9DFD0] px-4 py-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="newArrival"
                                        checked={formData.newArrival}
                                        onChange={handleChange}
                                        className="accent-[#6B3F24]"
                                    />

                                    <span className="text-sm text-[#66574D]">
                                        New Arrival
                                    </span>
                                </label>

                                <label className="flex items-center gap-3 rounded-xl border border-[#E9DFD0] px-4 py-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="isActive"
                                        checked={formData.isActive}
                                        onChange={handleChange}
                                        className="accent-[#6B3F24]"
                                    />

                                    <span className="text-sm text-[#66574D]">
                                        Active Product
                                    </span>
                                </label>

                            </div>
                        </div>

                        <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:justify-end">

                            <button
                                type="button"
                                onClick={() =>
                                    router.push("/seller/product-list")
                                }
                                className="rounded-full border border-[#6B3F24] px-6 py-3 text-sm font-medium text-[#6B3F24] hover:bg-[#F4EFE6] transition"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                disabled={saving}
                                className="rounded-full bg-[#6B3F24] px-7 py-3 text-sm font-medium text-white hover:bg-[#2F241D] transition disabled:opacity-60"
                            >
                                {saving
                                    ? "Saving Changes..."
                                    : "Save Changes"}
                            </button>

                        </div>

                    </form>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default EditProduct;