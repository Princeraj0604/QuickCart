'use client';

import React, { useEffect, useState } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Loading from "@/components/Loading";
import axios from "axios";
import toast from "react-hot-toast";

const MyOrders = () => {

    const { currency, getToken, user, router } = useAppContext();

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        try {
            const token = await getToken();

            const { data } = await axios.get("/api/order/list", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (data.success) {
                setOrders([...data.orders].reverse());
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
        if (user) {
            fetchOrders();
        } else {
            setLoading(false);
        }
    }, [user]);

    const formatAmount = (amount) => {
        return Number(amount || 0).toLocaleString("en-IN", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
    };

    return (
        <>
            <Navbar />

            <main className="min-h-screen bg-white">
                <div className="px-5 sm:px-8 md:px-12 lg:px-20 xl:px-28 2xl:px-36 pt-12 md:pt-16 pb-20">

                    {/* Page Header */}
                    <div className="border-b border-[#E9DFD0] pb-7">
                        <p className="text-xs uppercase tracking-[0.2em] text-[#8A5A32] mb-2">
                            Your Account
                        </p>

                        <h1 className="text-3xl md:text-4xl font-medium text-[#2F241D]">
                            My Orders
                        </h1>

                        <p className="text-sm leading-6 text-[#66574D] mt-2 max-w-xl">
                            View your recent purchases and keep track of your
                            Thekua orders from Mithila.
                        </p>
                    </div>

                    {/* Loading */}
                    {loading && (
                        <div className="py-20">
                            <Loading />
                        </div>
                    )}

                    {/* Not Logged In */}
                    {!loading && !user && (
                        <div className="flex flex-col items-center justify-center text-center py-24 md:py-32">

                            <div className="w-20 h-20 rounded-full bg-[#F4EFE6] flex items-center justify-center mb-6">
                                <span className="text-2xl text-[#6B3F24]">
                                    ✦
                                </span>
                            </div>

                            <h2 className="text-2xl md:text-3xl font-medium text-[#2F241D]">
                                Sign in to view your orders
                            </h2>

                            <p className="max-w-md text-sm leading-6 text-[#66574D] mt-3">
                                Your order history will appear here after you
                                sign in to your Mithila account.
                            </p>
                        </div>
                    )}

                    {/* Empty Orders */}
                    {!loading && user && orders.length === 0 && (
                        <div className="flex flex-col items-center justify-center text-center py-24 md:py-32">

                            <div className="w-20 h-20 rounded-full bg-[#F4EFE6] flex items-center justify-center mb-6">
                                <Image
                                    src={assets.box_icon}
                                    alt="Orders"
                                    width={32}
                                    height={32}
                                />
                            </div>

                            <h2 className="text-2xl md:text-3xl font-medium text-[#2F241D]">
                                No orders yet
                            </h2>

                            <p className="max-w-md text-sm leading-6 text-[#66574D] mt-3">
                                Your first taste of Mithila is waiting.
                                Explore our Thekua collection and place your
                                first order.
                            </p>

                            <button
                                onClick={() => {
                                    router.push("/all-products");
                                    scrollTo(0, 0);
                                }}
                                className="mt-7 rounded-full bg-[#6B3F24] px-7 py-3 text-sm font-medium text-white transition hover:bg-[#2F241D]"
                            >
                                Explore Thekua
                            </button>
                        </div>
                    )}

                    {/* Orders */}
                    {!loading && user && orders.length > 0 && (
                        <div className="pt-8 space-y-6">

                            {orders.map((order, index) => (

                                <div
                                    key={order._id || index}
                                    className="rounded-2xl border border-[#E9DFD0] bg-white overflow-hidden"
                                >

                                    {/* Order Header */}
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-5 sm:px-7 py-5 bg-[#FAF7F2] border-b border-[#E9DFD0]">

                                        <div>
                                            <p className="text-[10px] uppercase tracking-[0.18em] text-[#8A7A6D]">
                                                Order Date
                                            </p>

                                            <p className="text-sm font-medium text-[#2F241D] mt-1">
                                                {formatDate(order.date)}
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-3">

                                            <span className="inline-flex items-center gap-2 rounded-full bg-[#F0E7DB] px-3 py-1.5 text-[11px] font-medium text-[#6B3F24]">
                                                <span className="w-1.5 h-1.5 rounded-full bg-[#8A5A32]" />
                                                {order.status || "Order Placed"}
                                            </span>

                                            <span className="text-xs text-[#8A7A6D]">
                                                Order #{String(order._id || "").slice(-8)}
                                            </span>

                                        </div>

                                    </div>

                                    {/* Order Body */}
                                    <div className="px-5 sm:px-7 py-6">

                                        <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-8">

                                            {/* Products */}
                                            <div>

                                                <div className="flex items-center justify-between mb-5">

                                                    <h2 className="text-sm font-medium text-[#2F241D]">
                                                        Order Items
                                                    </h2>

                                                    <span className="text-xs text-[#8A7A6D]">
                                                        {order.items.length}{" "}
                                                        {order.items.length === 1 ? "item" : "items"}
                                                    </span>

                                                </div>

                                                <div className="space-y-4">

                                                    {order.items.map((item, itemIndex) => (

                                                        <div
                                                            key={item._id || itemIndex}
                                                            className="flex items-center gap-4"
                                                        >

                                                            <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-xl overflow-hidden bg-[#F4EFE6]">

                                                                {item.productId?.images?.[0] ? (
                                                                    <Image
                                                                        src={item.productId.images[0]}
                                                                        alt={item.productId.name || "Product"}
                                                                        fill
                                                                        className="object-cover"
                                                                    />
                                                                ) : (
                                                                    <div className="w-full h-full flex items-center justify-center">
                                                                        <Image
                                                                            src={assets.box_icon}
                                                                            alt=""
                                                                            width={26}
                                                                            height={26}
                                                                        />
                                                                    </div>
                                                                )}

                                                            </div>

                                                            <div className="min-w-0 flex-1">

                                                                <p className="text-sm font-medium text-[#2F241D]">
                                                                    {item.productId?.name || "Product unavailable"}
                                                                </p>

                                                                <p className="text-xs text-[#8A7A6D] mt-1">
                                                                    Quantity: {item.quantity}
                                                                </p>

                                                                {item.productId?.packSize && (
                                                                    <p className="text-xs text-[#8A7A6D] mt-1">
                                                                        {item.productId.packSize}
                                                                    </p>
                                                                )}

                                                            </div>

                                                            {item.productId?.offerPrice && (
                                                                <p className="text-sm font-medium text-[#6B3F24]">
                                                                    {currency}
                                                                    {formatAmount(
                                                                        item.productId.offerPrice * item.quantity
                                                                    )}
                                                                </p>
                                                            )}

                                                        </div>

                                                    ))}

                                                </div>

                                            </div>

                                            {/* Order Summary */}
                                            <div className="lg:border-l lg:border-[#E9DFD0] lg:pl-8">

                                                <h2 className="text-sm font-medium text-[#2F241D] mb-5">
                                                    Order Summary
                                                </h2>

                                                <div className="space-y-3 text-sm">

                                                    <div className="flex justify-between gap-4">
                                                        <span className="text-[#8A7A6D]">
                                                            Items
                                                        </span>

                                                        <span className="text-[#66574D]">
                                                            {order.items.reduce(
                                                                (total, item) => total + item.quantity,
                                                                0
                                                            )}
                                                        </span>
                                                    </div>

                                                    <div className="flex justify-between gap-4">
                                                        <span className="text-[#8A7A6D]">
                                                            Payment
                                                        </span>

                                                        <span className="text-[#66574D]">
                                                            Cash on Delivery
                                                        </span>
                                                    </div>

                                                    <div className="flex justify-between gap-4">
                                                        <span className="text-[#8A7A6D]">
                                                            Status
                                                        </span>

                                                        <span className="text-[#66574D]">
                                                            {order.status || "Order Placed"}
                                                        </span>
                                                    </div>

                                                    <div className="border-t border-[#E9DFD0] pt-4 mt-4 flex justify-between gap-4">

                                                        <span className="font-medium text-[#2F241D]">
                                                            Total
                                                        </span>

                                                        <span className="text-lg font-semibold text-[#6B3F24]">
                                                            {currency}
                                                            {formatAmount(order.amount)}
                                                        </span>

                                                    </div>

                                                </div>

                                            </div>

                                        </div>

                                        {/* Delivery Address */}
                                        <div className="mt-8 pt-6 border-t border-[#E9DFD0]">

                                            <h2 className="text-sm font-medium text-[#2F241D] mb-4">
                                                Delivery Address
                                            </h2>

                                            <div className="rounded-xl bg-[#FAF7F2] px-5 py-4">

                                                <p className="text-sm font-medium text-[#2F241D]">
                                                    {order.address?.fullName || "Customer"}
                                                </p>

                                                <p className="text-xs leading-5 text-[#66574D] mt-1">
                                                    {order.address?.area || ""}
                                                    {order.address?.city
                                                        ? `, ${order.address.city}`
                                                        : ""}
                                                    {order.address?.state
                                                        ? `, ${order.address.state}`
                                                        : ""}
                                                </p>

                                                <p className="text-xs text-[#66574D] mt-1">
                                                    {order.address?.phoneNumber || ""}
                                                </p>

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
        </>
    );
};

export default MyOrders;