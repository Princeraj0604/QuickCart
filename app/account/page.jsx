"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { assets } from "@/assets/assets";

const AccountPage = () => {
    const router = useRouter();
    const { user, isLoaded } = useUser();

    if (!isLoaded) {
        return (
            <>
                <Navbar />
                <main className="min-h-[60vh] flex items-center justify-center">
                    <p className="text-sm text-[#66574D]">
                        Loading account...
                    </p>
                </main>
                <Footer />
            </>
        );
    }

    if (!user) {
        return (
            <>
                <Navbar />

                <main className="min-h-[60vh] flex items-center justify-center px-6">
                    <div className="text-center max-w-md">
                        <h1 className="text-2xl md:text-3xl font-serif text-[#2F241D]">
                            My Account
                        </h1>

                        <p className="mt-3 text-sm leading-6 text-[#66574D]">
                            Please sign in to view your account information,
                            orders, and saved addresses.
                        </p>
                    </div>
                </main>

                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />

            <main className="min-h-screen bg-white px-6 md:px-16 lg:px-24 xl:px-32 py-10 md:py-14">

                {/* Page Header */}
                <div className="max-w-6xl mx-auto">
                    <p className="text-xs uppercase tracking-[0.2em] text-[#8A5A32]">
                        Customer Account
                    </p>

                    <h1 className="mt-2 text-3xl md:text-4xl font-serif font-medium text-[#2F241D]">
                        My Account
                    </h1>

                    <p className="mt-3 max-w-2xl text-sm leading-6 text-[#66574D]">
                        Manage your account information, orders, and saved
                        delivery addresses in one place.
                    </p>
                </div>

                {/* Account Content */}
                <div className="max-w-6xl mx-auto mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Account Information */}
                    <div className="lg:col-span-1 rounded-2xl border border-[#E9DFD0] bg-[#F4EFE6] p-6">
                        <div className="flex items-center gap-4">

                            {user.imageUrl ? (
                                <img
                                src={user.imageUrl}
                                alt={user.fullName || "Account"}
                                className="w-14 h-14 rounded-full object-cover"/>
                            )  : (
                                <div className="w-14 h-14 rounded-full bg-[#6B3F24] text-white flex items-center justify-center text-lg font-medium">
                                    {user.firstName?.charAt(0) || "U"}
                                </div>
                            )}

                            <div className="min-w-0">
                                <h2 className="text-lg font-medium text-[#2F241D] truncate">
                                    {user.fullName || "Customer"}
                                </h2>

                                <p className="mt-1 text-xs text-[#66574D] truncate">
                                    {user.primaryEmailAddress?.emailAddress}
                                </p>
                            </div>

                        </div>

                        <div className="mt-6 pt-5 border-t border-[#DCCFC0]">
                            <p className="text-xs uppercase tracking-wider text-[#8A5A32]">
                             Account Information
                            </p>

                            <div className="mt-4 space-y-4 text-sm">
                            <div>
                                <p className="text-xs text-[#8A7A6D]">
                                Name
                                </p>

                                <p className="mt-1 font-medium text-[#2F241D]">
                                    {user.fullName || "Not available"}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-[#8A7A6D]">
                                    Email
                                </p>

                                <p className="mt-1 font-medium text-[#2F241D] break-all">
                                    {user.primaryEmailAddress?.emailAddress || "Not available"}
                                </p>
                            </div>
                        </div>

                            <button
                                onClick={() => router.push("/account/profile")}
                                className="mt-6 w-full rounded-full border border-[#6B3F24] px-5 py-2.5 text-xs font-medium text-[#6B3F24] transition hover:bg-[#6B3F24] hover:text-white"
                            >
                            Manage Profile
                            </button>
                        </div>
                    </div>

                    {/* Account Options */}
                    <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">

                        {/* My Orders */}
                        <button
                            onClick={() => router.push("/my-orders")}
                            className="group text-left rounded-2xl border border-[#E9DFD0] bg-white p-6 transition duration-300 hover:border-[#CDBBA8] hover:shadow-md"
                        >
                            <div className="flex items-center justify-between">

                                <div className="w-12 h-12 rounded-full bg-[#F4EFE6] flex items-center justify-center">
                                    <Image
                                        src={assets.box_icon}
                                        alt="Orders"
                                        width={24}
                                        height={24}
                                    />
                                </div>

                                <span className="text-[#8A5A32] transition-transform duration-300 group-hover:translate-x-1">
                                    →
                                </span>

                            </div>

                            <h2 className="mt-6 text-xl font-medium text-[#2F241D]">
                                My Orders
                            </h2>

                            <p className="mt-2 text-sm leading-6 text-[#66574D]">
                                View your recent orders, order details,
                                delivery information, and order status.
                            </p>

                            <p className="mt-5 text-xs font-medium uppercase tracking-wider text-[#6B3F24]">
                                View Orders
                            </p>
                        </button>

                        {/* Saved Addresses */}
                        <button
                            onClick={() => router.push("/account/addresses")}
                            className="group text-left rounded-2xl border border-[#E9DFD0] bg-white p-6 transition duration-300 hover:border-[#CDBBA8] hover:shadow-md"
                        >
                            <div className="flex items-center justify-between">

                                <div className="w-12 h-12 rounded-full bg-[#F4EFE6] flex items-center justify-center text-[#6B3F24] text-xl">
                                    +
                                </div>

                                <span className="text-[#8A5A32] transition-transform duration-300 group-hover:translate-x-1">
                                    →
                                </span>

                            </div>

                            <h2 className="mt-6 text-xl font-medium text-[#2F241D]">
                                Saved Addresses
                            </h2>

                            <p className="mt-2 text-sm leading-6 text-[#66574D]">
                                Manage your saved delivery addresses for
                                faster and easier checkout.
                            </p>

                            <p className="mt-5 text-xs font-medium uppercase tracking-wider text-[#6B3F24]">
                                Manage Addresses
                            </p>
                        </button>

                    </div>
                </div>

                {/* Quick Navigation */}
                <div className="max-w-6xl mx-auto mt-8 rounded-2xl border border-[#E9DFD0] bg-[#F4EFE6] px-6 py-5">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                        <div>
                            <p className="text-sm font-medium text-[#2F241D]">
                                Looking for something?
                            </p>

                            <p className="mt-1 text-xs text-[#66574D]">
                                Continue shopping or explore the latest Thekua collection.
                            </p>
                        </div>

                        <button
                            onClick={() => router.push("/all-products")}
                            className="shrink-0 rounded-full bg-[#6B3F24] px-6 py-2.5 text-xs font-medium text-white transition hover:bg-[#2F241D]"
                        >
                            Shop Thekua
                        </button>

                    </div>
                </div>

            </main>

            <Footer />
        </>
    );
};

export default AccountPage;