"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import Loading from "@/components/Loading";
import Footer from "@/components/seller/Footer";
import axios from "axios";
import { toast } from "react-hot-toast";

const SellerDashboard = () => {
    const { currency, getToken, user, router } = useAppContext();

    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchDashboard = async () => {
        try {
            setLoading(true);

            const token = await getToken();

            const { data } = await axios.get(
                "/api/seller/dashboard",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (data.success) {
                setDashboard(data);
            } else {
                toast.error(data.message || "Failed to load dashboard");
            }
        } catch (error) {
            console.error("DASHBOARD ERROR:", error);

            toast.error(
                error.response?.data?.message ||
                "Failed to load dashboard"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            fetchDashboard();
        }
    }, [user]);

    if (loading) {
        return <Loading />;
    }

    if (!dashboard) {
        return null;
    }

    const {
        totalProducts,
        totalOrders,
        totalCustomers,
        totalRevenue,
        totalReviews
    } = dashboard.stats;

    const recentOrders = dashboard.recentOrders || [];
    const products = dashboard.products || [];

    return (
        <div className="flex-1 min-h-screen bg-[#F8F5EF] flex flex-col justify-between">

            <main className="w-full px-4 sm:px-6 lg:px-10 py-8">

                <div className="max-w-7xl mx-auto">

                    {/* Header */}

                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">

                        <div>
                            <p className="text-xs uppercase tracking-[0.25em] text-[#8A5A32] font-medium">
                                MITHILA SELLER PANEL
                            </p>

                            <h1 className="mt-2 text-3xl md:text-4xl font-serif text-[#2F241D]">
                                Dashboard
                            </h1>

                            <p className="mt-2 text-sm text-[#66574D]">
                                Manage your Thekua store and monitor your
                                business activity.
                            </p>
                        </div>

                        <button
                            onClick={() => router.push("/seller/add-product")}
                            className="w-fit rounded-full bg-[#6B3F24] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#2F241D]"
                        >
                            + Add Product
                        </button>

                    </div>


                    {/* Stats */}

                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">

                        <div className="bg-white rounded-2xl border border-[#E9DFD0] p-5">

                            <p className="text-xs uppercase tracking-wider text-[#8A7A6D]">
                                Total Products
                            </p>

                            <div className="flex items-end justify-between mt-4">

                                <h2 className="text-3xl font-semibold text-[#2F241D]">
                                    {totalProducts}
                                </h2>

                                <div className="w-10 h-10 rounded-full bg-[#F4EFE6] flex items-center justify-center text-[#6B3F24]">
                                    P
                                </div>

                            </div>

                            <button
                                onClick={() =>
                                    router.push("/seller/product-list")
                                }
                                className="mt-4 text-xs font-medium text-[#6B3F24] hover:underline"
                            >
                                View products →
                            </button>

                        </div>


                        <div className="bg-white rounded-2xl border border-[#E9DFD0] p-5">

                            <p className="text-xs uppercase tracking-wider text-[#8A7A6D]">
                                Total Orders
                            </p>

                            <div className="flex items-end justify-between mt-4">

                                <h2 className="text-3xl font-semibold text-[#2F241D]">
                                    {totalOrders}
                                </h2>

                                <div className="w-10 h-10 rounded-full bg-[#F4EFE6] flex items-center justify-center text-[#6B3F24]">
                                    O
                                </div>

                            </div>

                            <button
                                onClick={() =>
                                    router.push("/seller/orders")
                                }
                                className="mt-4 text-xs font-medium text-[#6B3F24] hover:underline"
                            >
                                View orders →
                            </button>

                        </div>


                        <div className="bg-white rounded-2xl border border-[#E9DFD0] p-5">

                            <p className="text-xs uppercase tracking-wider text-[#8A7A6D]">
                                Customers
                            </p>

                            <div className="flex items-end justify-between mt-4">

                                <h2 className="text-3xl font-semibold text-[#2F241D]">
                                    {totalCustomers}
                                </h2>

                                <div className="w-10 h-10 rounded-full bg-[#F4EFE6] flex items-center justify-center text-[#6B3F24]">
                                    C
                                </div>

                            </div>

                            <p className="mt-4 text-xs text-[#8A7A6D]">
                                Registered customers
                            </p>

                        </div>


                        <div className="bg-white rounded-2xl border border-[#E9DFD0] p-5">

                            <p className="text-xs uppercase tracking-wider text-[#8A7A6D]">
                                Total Revenue
                            </p>

                            <div className="flex items-end justify-between mt-4">

                                <h2 className="text-3xl font-semibold text-[#6B3F24]">
                                   {currency}{Number(totalRevenue).toFixed(2)}
                                </h2>

                                <div className="w-10 h-10 rounded-full bg-[#F4EFE6] flex items-center justify-center text-[#6B3F24]">
                                    ₹
                                </div>

                            </div>

                            <p className="mt-4 text-xs text-[#8A7A6D]">
                                Based on placed orders
                            </p>

                        </div>

                    </div>


                    {/* Secondary Stats */}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">

                        <div className="bg-white rounded-2xl border border-[#E9DFD0] p-5">

                            <p className="text-xs uppercase tracking-wider text-[#8A7A6D]">
                                Customer Reviews
                            </p>

                            <div className="flex items-center gap-3 mt-4">

                                <span className="text-3xl font-semibold text-[#2F241D]">
                                    {totalReviews}
                                </span>

                                <span className="text-sm text-[#66574D]">
                                    reviews received
                                </span>

                            </div>

                        </div>


                        <div className="bg-white rounded-2xl border border-[#E9DFD0] p-5">

                            <p className="text-xs uppercase tracking-wider text-[#8A7A6D]">
                                Store Status
                            </p>

                            <div className="flex items-center gap-3 mt-4">

                                <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>

                                <span className="text-sm font-medium text-[#2F241D]">
                                    Store Active
                                </span>

                            </div>

                            <p className="mt-2 text-xs text-[#8A7A32]">
                                Your products are currently available.
                            </p>

                        </div>

                    </div>


                    {/* Main Dashboard Grid */}

                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">


                        {/* Recent Orders */}

                        <div className="bg-white rounded-2xl border border-[#E9DFD0] overflow-hidden">

                            <div className="flex items-center justify-between px-5 py-5 border-b border-[#E9DFD0]">

                                <div>
                                    <h2 className="text-lg font-medium text-[#2F241D]">
                                        Recent Orders
                                    </h2>

                                    <p className="text-xs text-[#8A7A6D] mt-1">
                                        Latest customer orders
                                    </p>
                                </div>

                                <button
                                    onClick={() =>
                                        router.push("/seller/orders")
                                    }
                                    className="text-xs font-medium text-[#6B3F24] hover:underline"
                                >
                                    View All
                                </button>

                            </div>


                            {recentOrders.length === 0 ? (

                                <div className="px-5 py-12 text-center">

                                    <p className="text-sm text-[#66574D]">
                                        No orders found.
                                    </p>

                                </div>

                            ) : (

                                <div className="divide-y divide-[#E9DFD0]">

                                    {recentOrders.map((order) => (

                                        <div
                                            key={order._id}
                                            className="px-5 py-4"
                                        >

                                            <div className="flex items-start justify-between gap-4">

                                                <div className="min-w-0">

                                                    <p className="text-sm font-medium text-[#2F241D] truncate">

                                                        {order.items
                                                            ?.map((item) =>
                                                                item.productId
                                                                    ? `${item.productId.name} × ${item.quantity}`
                                                                    : `Product unavailable × ${item.quantity}`
                                                            )
                                                            .join(", ")}

                                                    </p>

                                                    <p className="mt-1 text-xs text-[#8A7A6D]">
                                                        {order.address?.fullName ||
                                                            "Customer"}
                                                    </p>

                                                    <p className="mt-1 text-xs text-[#8A7A6D]">
                                                        {new Date(
                                                            order.date
                                                        ).toLocaleDateString()}
                                                    </p>

                                                </div>


                                                <div className="text-right shrink-0">

                                                    <p className="text-sm font-semibold text-[#6B3F24]">
                                                        {currency}
                                                        {order.amount}
                                                    </p>

                                                    <span className="inline-block mt-2 rounded-full bg-[#F4EFE6] px-2.5 py-1 text-[10px] text-[#6B3F24]">
                                                        {order.status}
                                                    </span>

                                                </div>

                                            </div>

                                        </div>

                                    ))}

                                </div>

                            )}

                        </div>


                        {/* Products */}

                        <div className="bg-white rounded-2xl border border-[#E9DFD0] overflow-hidden">

                            <div className="flex items-center justify-between px-5 py-5 border-b border-[#E9DFD0]">

                                <div>
                                    <h2 className="text-lg font-medium text-[#2F241D]">
                                        Product Overview
                                    </h2>

                                    <p className="text-xs text-[#8A7A6D] mt-1">
                                        Recently added products
                                    </p>
                                </div>

                                <button
                                    onClick={() =>
                                        router.push("/seller/product-list")
                                    }
                                    className="text-xs font-medium text-[#6B3F24] hover:underline"
                                >
                                    View All
                                </button>

                            </div>


                            {products.length === 0 ? (

                                <div className="px-5 py-12 text-center">

                                    <p className="text-sm text-[#66574D]">
                                        No products found.
                                    </p>

                                </div>

                            ) : (

                                <div className="divide-y divide-[#E9DFD0]">

                                    {products.map((product) => (

                                        <div
                                            key={product._id}
                                            className="flex items-center gap-4 px-5 py-4"
                                        >

                                            <div className="w-14 h-14 rounded-xl overflow-hidden bg-[#F4EFE6] shrink-0">

                                                <Image
                                                    src={product.images?.[0]}
                                                    alt={product.name}
                                                    width={100}
                                                    height={100}
                                                    className="w-full h-full object-cover"
                                                />

                                            </div>


                                            <div className="min-w-0 flex-1">

                                                <p className="text-sm font-medium text-[#2F241D] truncate">
                                                    {product.name}
                                                </p>

                                                <p className="text-xs text-[#8A7A6D] mt-1">
                                                    {product.category}
                                                    {product.packSize
                                                        ? ` · ${product.packSize}`
                                                        : ""}
                                                </p>

                                            </div>


                                            <div className="text-right">

                                                <p className="text-sm font-semibold text-[#6B3F24]">
                                                    {currency}
                                                    {product.offerPrice}
                                                </p>

                                                {product.price >
                                                    product.offerPrice && (

                                                    <p className="text-[10px] text-[#8A7A6D] line-through">
                                                        {currency}
                                                        {product.price}
                                                    </p>

                                                )}

                                            </div>

                                        </div>

                                    ))}

                                </div>

                            )}

                        </div>

                    </div>

                </div>

            </main>

            <Footer />

        </div>
    );
};

export default SellerDashboard;