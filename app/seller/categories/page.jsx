"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-hot-toast";
import Loading from "@/components/Loading";

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showForm, setShowForm] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [saving, setSaving] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        description: "",
        image: "",
        sortOrder: 0,
        isActive: true
    });

    const fetchCategories = async () => {
        try {
            const { data } = await axios.get("/api/seller/categories");

            if (data.success) {
                setCategories(data.categories);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const resetForm = () => {
        setFormData({
            name: "",
            slug: "",
            description: "",
            image: "",
            sortOrder: 0,
            isActive: true
        });

        setEditingCategory(null);
        setShowForm(false);
    };

    const openAddForm = () => {
        setEditingCategory(null);

        setFormData({
            name: "",
            slug: "",
            description: "",
            image: "",
            sortOrder: categories.length,
            isActive: true
        });

        setShowForm(true);
    };

    const openEditForm = (category) => {
        setEditingCategory(category);

        setFormData({
            name: category.name || "",
            slug: category.slug || "",
            description: category.description || "",
            image: category.image || "",
            sortOrder: category.sortOrder || 0,
            isActive: category.isActive !== false
        });

        setShowForm(true);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((previous) => ({
            ...previous,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const generateSlug = () => {
        const slug = formData.name
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "");

        setFormData((previous) => ({
            ...previous,
            slug
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name.trim()) {
            toast.error("Category name is required");
            return;
        }

        if (!formData.slug.trim()) {
            toast.error("Category slug is required");
            return;
        }

        try {
            setSaving(true);

            if (editingCategory) {
                const { data } = await axios.put(
                    "/api/seller/categories",
                    {
                        id: editingCategory._id,
                        ...formData
                    }
                );

                if (data.success) {
                    toast.success("Category updated successfully");

                    setCategories((previous) =>
                        previous.map((category) =>
                            category._id === editingCategory._id
                                ? data.category
                                : category
                        )
                    );

                    resetForm();
                } else {
                    toast.error(data.message);
                }
            } else {
                const { data } = await axios.post(
                    "/api/seller/categories",
                    formData
                );

                if (data.success) {
                    toast.success("Category created successfully");

                    setCategories((previous) => [
                        ...previous,
                        data.category
                    ]);

                    resetForm();
                } else {
                    toast.error(data.message);
                }
            }
        } catch (error) {
            toast.error(
                error.response?.data?.message || error.message
            );
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this category?"
        );

        if (!confirmed) return;

        try {
            const { data } = await axios.delete(
                "/api/seller/categories",
                {
                    data: { id }
                }
            );

            if (data.success) {
                toast.success("Category deleted successfully");

                setCategories((previous) =>
                    previous.filter(
                        (category) => category._id !== id
                    )
                );
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(
                error.response?.data?.message || error.message
            );
        }
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="flex-1 min-h-screen bg-[#FAF8F4] p-4 md:p-8">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

                <div>
                    <p className="text-sm text-[#8A5A32] font-medium mb-1">
                        MITHILA
                    </p>

                    <h1 className="text-2xl md:text-3xl font-medium text-[#2F241D]">
                        Categories
                    </h1>

                    <p className="text-sm text-[#66574D] mt-1">
                        Manage product categories for your store.
                    </p>
                </div>

                <div className="flex items-center gap-3">

                    <Link
                        href="/seller"
                        className="px-4 py-2.5 border border-[#D8CEC2] text-[#6B3F24] text-sm rounded-md hover:bg-[#F4EFE6] transition"
                    >
                        Dashboard
                    </Link>

                    <button
                        onClick={openAddForm}
                        className="px-5 py-2.5 bg-[#6B3F24] text-white text-sm rounded-md hover:bg-[#56301C] transition"
                    >
                        + Add Category
                    </button>

                </div>

            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">

                <div className="bg-white border border-[#E9DFD0] rounded-xl p-5">
                    <p className="text-sm text-[#66574D]">
                        Total Categories
                    </p>

                    <p className="text-3xl font-medium text-[#2F241D] mt-2">
                        {categories.length}
                    </p>
                </div>

                <div className="bg-white border border-[#E9DFD0] rounded-xl p-5">
                    <p className="text-sm text-[#66574D]">
                        Active Categories
                    </p>

                    <p className="text-3xl font-medium text-[#2F241D] mt-2">
                        {
                            categories.filter(
                                (category) => category.isActive
                            ).length
                        }
                    </p>
                </div>

                <div className="bg-white border border-[#E9DFD0] rounded-xl p-5">
                    <p className="text-sm text-[#66574D]">
                        Inactive Categories
                    </p>

                    <p className="text-3xl font-medium text-[#2F241D] mt-2">
                        {
                            categories.filter(
                                (category) => !category.isActive
                            ).length
                        }
                    </p>
                </div>

            </div>

            {/* Add / Edit Form */}
            {showForm && (
                <div className="bg-white border border-[#E9DFD0] rounded-xl p-5 md:p-6 mb-6">

                    <div className="flex items-center justify-between mb-6">

                        <div>
                            <h2 className="text-lg font-medium text-[#2F241D]">
                                {editingCategory
                                    ? "Edit Category"
                                    : "Add New Category"}
                            </h2>

                            <p className="text-sm text-[#66574D] mt-1">
                                {editingCategory
                                    ? "Update category information."
                                    : "Create a new product category."}
                            </p>
                        </div>

                        <button
                            onClick={resetForm}
                            className="text-sm text-[#66574D] hover:text-[#2F241D]"
                        >
                            Cancel
                        </button>

                    </div>

                    <form onSubmit={handleSubmit}>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                            {/* Name */}
                            <div>
                                <label className="block text-sm font-medium text-[#2F241D] mb-2">
                                    Category Name
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Example: Premium Thekua"
                                    className="w-full border border-[#D8CEC2] rounded-lg px-4 py-3 text-sm outline-none focus:border-[#8A5A32]"
                                />
                            </div>

                            {/* Slug */}
                            <div>
                                <label className="block text-sm font-medium text-[#2F241D] mb-2">
                                    Slug
                                </label>

                                <div className="flex gap-2">

                                    <input
                                        type="text"
                                        name="slug"
                                        value={formData.slug}
                                        onChange={handleChange}
                                        placeholder="premium-thekua"
                                        className="flex-1 border border-[#D8CEC2] rounded-lg px-4 py-3 text-sm outline-none focus:border-[#8A5A32]"
                                    />

                                    <button
                                        type="button"
                                        onClick={generateSlug}
                                        className="px-4 border border-[#D8CEC2] rounded-lg text-sm text-[#6B3F24] hover:bg-[#F4EFE6]"
                                    >
                                        Generate
                                    </button>

                                </div>
                            </div>

                            {/* Description */}
                            <div className="md:col-span-2">

                                <label className="block text-sm font-medium text-[#2F241D] mb-2">
                                    Description
                                </label>

                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows={4}
                                    placeholder="Write a short description for this category..."
                                    className="w-full border border-[#D8CEC2] rounded-lg px-4 py-3 text-sm outline-none resize-none focus:border-[#8A5A32]"
                                />

                            </div>

                            {/* Image */}
                            <div>
                                <label className="block text-sm font-medium text-[#2F241D] mb-2">
                                    Category Image URL
                                </label>

                                <input
                                    type="text"
                                    name="image"
                                    value={formData.image}
                                    onChange={handleChange}
                                    placeholder="https://..."
                                    className="w-full border border-[#D8CEC2] rounded-lg px-4 py-3 text-sm outline-none focus:border-[#8A5A32]"
                                />
                            </div>

                            {/* Sort Order */}
                            <div>
                                <label className="block text-sm font-medium text-[#2F241D] mb-2">
                                    Sort Order
                                </label>

                                <input
                                    type="number"
                                    name="sortOrder"
                                    value={formData.sortOrder}
                                    onChange={handleChange}
                                    min="0"
                                    className="w-full border border-[#D8CEC2] rounded-lg px-4 py-3 text-sm outline-none focus:border-[#8A5A32]"
                                />
                            </div>

                        </div>

                        {/* Active */}
                        <label className="flex items-center gap-3 mt-5 cursor-pointer">

                            <input
                                type="checkbox"
                                name="isActive"
                                checked={formData.isActive}
                                onChange={handleChange}
                                className="w-4 h-4 accent-[#6B3F24]"
                            />

                            <span className="text-sm text-[#2F241D]">
                                Category is active
                            </span>

                        </label>

                        {/* Actions */}
                        <div className="flex items-center gap-3 mt-6">

                            <button
                                type="submit"
                                disabled={saving}
                                className="px-6 py-3 bg-[#6B3F24] text-white text-sm rounded-lg hover:bg-[#56301C] transition disabled:opacity-60"
                            >
                                {saving
                                    ? "Saving..."
                                    : editingCategory
                                        ? "Update Category"
                                        : "Create Category"}
                            </button>

                            <button
                                type="button"
                                onClick={resetForm}
                                className="px-6 py-3 border border-[#D8CEC2] text-[#66574D] text-sm rounded-lg hover:bg-[#F8F5EF]"
                            >
                                Cancel
                            </button>

                        </div>

                    </form>

                </div>
            )}

            {/* Categories */}
            {categories.length === 0 ? (
                <div className="bg-white border border-[#E9DFD0] rounded-xl py-20 text-center">

                    <h2 className="text-xl font-medium text-[#2F241D]">
                        No Categories Found
                    </h2>

                    <p className="text-sm text-[#66574D] mt-2">
                        Create your first category to organize your products.
                    </p>

                    <button
                        onClick={openAddForm}
                        className="mt-5 px-5 py-2.5 bg-[#6B3F24] text-white text-sm rounded-md"
                    >
                        + Add Category
                    </button>

                </div>
            ) : (
                <div className="bg-white border border-[#E9DFD0] rounded-xl overflow-hidden">

                    <div className="px-5 md:px-6 py-5 border-b border-[#E9DFD0]">

                        <h2 className="text-lg font-medium text-[#2F241D]">
                            Category List
                        </h2>

                        <p className="text-sm text-[#66574D] mt-1">
                            {categories.length} categories available
                        </p>

                    </div>

                    {/* Desktop */}
                    <div className="hidden lg:block overflow-x-auto">

                        <table className="w-full text-sm">

                            <thead>
                                <tr className="bg-[#F8F5EF] text-[#66574D]">

                                    <th className="text-left font-medium px-6 py-4">
                                        Category
                                    </th>

                                    <th className="text-left font-medium px-6 py-4">
                                        Slug
                                    </th>

                                    <th className="text-left font-medium px-6 py-4">
                                        Sort Order
                                    </th>

                                    <th className="text-left font-medium px-6 py-4">
                                        Status
                                    </th>

                                    <th className="text-left font-medium px-6 py-4">
                                        Actions
                                    </th>

                                </tr>
                            </thead>

                            <tbody>

                                {categories.map((category) => (

                                    <tr
                                        key={category._id}
                                        className="border-t border-[#E9DFD0] hover:bg-[#FCFAF7] transition"
                                    >

                                        <td className="px-6 py-4">

                                            <div className="flex items-center gap-3">

                                                {category.image ? (
                                                    <Image
                                                        src={category.image}
                                                        alt={category.name}
                                                        width={48}
                                                        height={48}
                                                        className="w-12 h-12 rounded-lg object-cover border border-[#E9DFD0]"
                                                    />
                                                ) : (
                                                    <div className="w-12 h-12 rounded-lg bg-[#F4EFE6] flex items-center justify-center text-[#8A5A32]">
                                                        M
                                                    </div>
                                                )}

                                                <div className="max-w-[260px]">

                                                    <p className="font-medium text-[#2F241D]">
                                                        {category.name}
                                                    </p>

                                                    <p className="text-xs text-[#66574D] mt-1 line-clamp-2">
                                                        {category.description ||
                                                            "No description"}
                                                    </p>

                                                </div>

                                            </div>

                                        </td>

                                        <td className="px-6 py-4 text-[#66574D]">
                                            {category.slug}
                                        </td>

                                        <td className="px-6 py-4 text-[#66574D]">
                                            {category.sortOrder}
                                        </td>

                                        <td className="px-6 py-4">

                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                    category.isActive
                                                        ? "bg-[#EAF3EA] text-[#3F6B43]"
                                                        : "bg-[#F3EAEA] text-[#8A4A4A]"
                                                }`}
                                            >
                                                {category.isActive
                                                    ? "Active"
                                                    : "Inactive"}
                                            </span>

                                        </td>

                                        <td className="px-6 py-4">

                                            <div className="flex items-center gap-2">

                                                <button
                                                    onClick={() =>
                                                        openEditForm(category)
                                                    }
                                                    className="px-3 py-2 border border-[#D8CEC2] rounded-md text-[#6B3F24] hover:bg-[#F4EFE6]"
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        handleDelete(category._id)
                                                    }
                                                    className="px-3 py-2 border border-[#E4CACA] rounded-md text-[#9A4C4C] hover:bg-[#F8EEEE]"
                                                >
                                                    Delete
                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                    {/* Mobile / Tablet */}
                    <div className="lg:hidden p-4 space-y-4">

                        {categories.map((category) => (

                            <div
                                key={category._id}
                                className="border border-[#E9DFD0] rounded-xl p-4"
                            >

                                <div className="flex items-start gap-3">

                                    {category.image ? (
                                        <Image
                                            src={category.image}
                                            alt={category.name}
                                            width={56}
                                            height={56}
                                            className="w-14 h-14 rounded-lg object-cover border border-[#E9DFD0]"
                                        />
                                    ) : (
                                        <div className="w-14 h-14 rounded-lg bg-[#F4EFE6] flex items-center justify-center text-[#8A5A32]">
                                            M
                                        </div>
                                    )}

                                    <div className="flex-1 min-w-0">

                                        <div className="flex items-start justify-between gap-3">

                                            <h3 className="font-medium text-[#2F241D]">
                                                {category.name}
                                            </h3>

                                            <span
                                                className={`shrink-0 px-2.5 py-1 rounded-full text-xs font-medium ${
                                                    category.isActive
                                                        ? "bg-[#EAF3EA] text-[#3F6B43]"
                                                        : "bg-[#F3EAEA] text-[#8A4A4A]"
                                                }`}
                                            >
                                                {category.isActive
                                                    ? "Active"
                                                    : "Inactive"}
                                            </span>

                                        </div>

                                        <p className="text-xs text-[#66574D] mt-1">
                                            {category.slug}
                                        </p>

                                    </div>

                                </div>

                                <p className="text-sm text-[#66574D] leading-6 mt-4">
                                    {category.description ||
                                        "No description available."}
                                </p>

                                <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#E9DFD0]">

                                    <p className="text-xs text-[#66574D]">
                                        Sort Order:{" "}
                                        <span className="font-medium text-[#2F241D]">
                                            {category.sortOrder}
                                        </span>
                                    </p>

                                    <div className="flex gap-2">

                                        <button
                                            onClick={() =>
                                                openEditForm(category)
                                            }
                                            className="px-3 py-2 border border-[#D8CEC2] rounded-md text-xs text-[#6B3F24]"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() =>
                                                handleDelete(category._id)
                                            }
                                            className="px-3 py-2 border border-[#E4CACA] rounded-md text-xs text-[#9A4C4C]"
                                        >
                                            Delete
                                        </button>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                </div>
            )}

        </div>
    );
};

export default Categories;