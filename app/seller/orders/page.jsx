"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { assets } from "@/assets/assets";
import { useAppContext } from "@/context/AppContext";
import Footer from "@/components/seller/Footer";
import Loading from "@/components/Loading";
import axios from "axios";
import toast from "react-hot-toast";

const Orders = () => {
    const { currency, getToken, user } = useAppContext();

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchSellerOrders = async () => {
        try {
            setLoading(true);

            const token = await getToken();

            const { data } = await axios.get(
                "/api/order/seller-orders",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (data.success) {
                setOrders(data.orders || []);
            } else {
                toast.error(data.message || "Failed to load orders");
            }
        } catch (error) {
            console.error("SELLER ORDERS ERROR:", error);

            toast.error(
                error.response?.data?.message ||
                error.message ||
                "Failed to load orders"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            fetchSellerOrders();
        }
    }, [user]);

    if (loading) {
        return <Loading />;
    }

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
                                Orders
                            </h1>

                            <p className="mt-2 text-sm text-[#66574D]">
                                View and monitor customer orders.
                            </p>
                        </div>

                        <div className="rounded-full bg-white border border-[#E9DFD0] px-4 py-2">
                            <span className="text-xs text-[#8A7A6D]">
                                Total Orders{" "}
                            </span>

                            <span className="text-sm font-semibold text-[#6B3F24]">
                                {orders.length}
                            </span>
                        </div>

                    </div>


                    {/* Empty State */}

                    {orders.length === 0 ? (

                        <div className="bg-white rounded-2xl border border-[#E9DFD0] px-6 py-16 text-center">

                            <div className="mx-auto w-16 h-16 rounded-full bg-[#F4EFE6] flex items-center justify-center">
                                <Image
                                    src={assets.box_icon}
                                    alt="Orders"
                                    width={30}
                                    height={30}
                                />
                            </div>

                            <h2 className="mt-5 text-xl font-medium text-[#2F241D]">
                                No orders yet
                            </h2>

                            <p className="mt-2 text-sm text-[#66574D]">
                                Customer orders will appear here once they
                                place an order.
                            </p>

                        </div>

                    ) : (

                        <div className="space-y-5">

                            {orders.map((order) => (

                                <div
                                    key={order._id}
                                    className="bg-white rounded-2xl border border-[#E9DFD0] overflow-hidden"
                                >

                                    {/* Order Header */}

                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-5 md:px-6 py-4 border-b border-[#E9DFD0] bg-[#FCFAF7]">

                                        <div>

                                            <p className="text-xs uppercase tracking-wider text-[#8A7A6D]">
                                                Order ID
                                            </p>

                                            <p className="mt-1 text-sm font-medium text-[#2F241D] break-all">
                                                #{order._id}
                                            </p>

                                        </div>


                                        <div className="flex items-center gap-4">

                                            <div className="text-left sm:text-right">

                                                <p className="text-xs text-[#8A7A6D]">
                                                    Order Date
                                                </p>

                                                <p className="mt-1 text-sm text-[#2F241D]">
                                                    {new Date(
                                                        order.date
                                                    ).toLocaleDateString()}
                                                </p>

                                            </div>


                                            <span className="rounded-full bg-[#F4EFE6] px-3 py-1.5 text-[10px] font-medium text-[#6B3F24]">
                                                {order.status || "Order Placed"}
                                            </span>

                                        </div>

                                    </div>


                                    {/* Order Body */}

                                    <div className="p-5 md:p-6">

                                        <div className="grid grid-cols-1 xl:grid-cols-[1.5fr_1fr_180px] gap-6">


                                            {/* Products */}

                                            <div>

                                                <p className="text-xs uppercase tracking-wider font-medium text-[#8A7A6D] mb-4">
                                                    Ordered Products
                                                </p>

                                                <div className="space-y-4">

                                                    {order.items?.map(
                                                        (item, index) => (

                                                            <div
                                                                key={`${order._id}-${index}`}
                                                                className="flex items-center gap-4"
                                                            >

                                                                <div className="w-14 h-14 rounded-xl overflow-hidden bg-[#F4EFE6] shrink-0">

                                                                    {item.productId?.images?.[0] ? (

                                                                        <Image
                                                                            src={
                                                                                item
                                                                                    .productId
                                                                                    .images[0]
                                                                            }
                                                                            alt={
                                                                                item
                                                                                    .productId
                                                                                    .name ||
                                                                                "Product"
                                                                            }
                                                                            width={
                                                                                80
                                                                            }
                                                                            height={
                                                                                80
                                                                            }
                                                                            className="w-full h-full object-cover"
                                                                        />

                                                                    ) : (

                                                                        <div className="w-full h-full flex items-center justify-center">

                                                                            <Image
                                                                                src={
                                                                                    assets.box_icon
                                                                                }
                                                                                alt="Product"
                                                                                width={
                                                                                    24
                                                                                }
                                                                                height={
                                                                                    24
                                                                                }
                                                                            />

                                                                        </div>

                                                                    )}

                                                                </div>


                                                                <div className="min-w-0">

                                                                    <p className="text-sm font-medium text-[#2F241D]">
                                                                        {item.productId
                                                                            ?.name ||
                                                                            "Product unavailable"}
                                                                    </p>

                                                                    <p className="mt-1 text-xs text-[#8A7A6D]">
                                                                        Quantity:{" "}
                                                                        {
                                                                            item.quantity
                                                                        }
                                                                    </p>

                                                                    {item.productId
                                                                        ?.packSize && (

                                                                        <p className="mt-1 text-xs text-[#8A7A6D]">
                                                                            Pack:{" "}
                                                                            {
                                                                                item
                                                                                    .productId
                                                                                    .packSize
                                                                            }
                                                                        </p>

                                                                    )}

                                                                </div>

                                                            </div>

                                                        )
                                                    )}

                                                </div>

                                            </div>


                                            {/* Customer / Address */}

                                            <div>

                                                <p className="text-xs uppercase tracking-wider font-medium text-[#8A7A6D] mb-4">
                                                    Delivery Details
                                                </p>

                                                {order.address ? (

                                                    <div className="text-sm text-[#66574D] leading-6">

                                                        <p className="font-medium text-[#2F241D]">
                                                            {
                                                                order.address
                                                                    .fullName
                                                            }
                                                        </p>

                                                        <p>
                                                            {
                                                                order.address
                                                                    .area
                                                            }
                                                        </p>

                                                        <p>
                                                            {
                                                                order.address
                                                                    .city
                                                            }
                                                            ,{" "}
                                                            {
                                                                order.address
                                                                    .state
                                                            }
                                                        </p>

                                                        <p>
                                                            {
                                                                order.address
                                                                    .phoneNumber
                                                            }
                                                        </p>

                                                    </div>

                                                ) : (

                                                    <p className="text-sm text-[#8A7A6D]">
                                                        Address unavailable
                                                    </p>

                                                )}

                                            </div>


                                            {/* Amount / Payment */}

                                            <div className="xl:text-right">

                                                <p className="text-xs uppercase tracking-wider font-medium text-[#8A7A6D]">
                                                    Order Total
                                                </p>

                                                <p className="mt-2 text-2xl font-semibold text-[#6B3F24]">
                                                    {currency}
                                                    {order.amount}
                                                </p>

                                                <div className="mt-4 space-y-1">

                                                    <p className="text-xs text-[#66574D]">
                                                        Payment: COD
                                                    </p>

                                                    <p className="text-xs text-[#8A7A6D]">
                                                        Payment: Pending
                                                    </p>

                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}

                </div>

            </main>

            <Footer />

        </div>
    );
};

export default Orders;