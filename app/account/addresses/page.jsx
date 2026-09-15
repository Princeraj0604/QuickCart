"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import toast from "react-hot-toast";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Loading from "@/components/Loading";

const AddressesPage = () => {
    const router = useRouter();
    const { isSignedIn, getToken } = useAuth();

    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchAddresses = async () => {
        try {
            const token = await getToken();

            const { data } = await axios.get(
                "/api/user/get-addresses",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (data.success) {
                setAddresses(data.addresses || []);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(
                error.response?.data?.message || error.message
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isSignedIn) {
            fetchAddresses();
        } else {
            setLoading(false);
        }
    }, [isSignedIn]);

    return (
        <>
            <Navbar />

            <main className="min-h-screen bg-white px-6 md:px-16 lg:px-24 xl:px-32 py-10 md:py-14">
                <div className="max-w-6xl mx-auto">

                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">
                        <div>
                            <p className="text-xs uppercase tracking-[0.2em] text-[#8A5A32]">
                                Customer Account
                            </p>

                            <h1 className="mt-2 text-3xl md:text-4xl font-serif font-medium text-[#2F241D]">
                                Saved Addresses
                            </h1>

                            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#66574D]">
                                Manage your delivery addresses for a faster
                                checkout experience.
                            </p>
                        </div>

                        <button
                            onClick={() => router.push("/add-address")}
                            className="rounded-full bg-[#6B3F24] px-6 py-3 text-xs font-medium text-white transition hover:bg-[#2F241D]"
                        >
                            Add New Address
                        </button>
                    </div>

                    <button
                        onClick={() => router.push("/account")}
                        className="mt-6 text-xs font-medium text-[#6B3F24] hover:text-[#2F241D]"
                    >
                        ← Back to My Account
                    </button>

                    <div className="mt-10">

                        {!isSignedIn ? (
                            <div className="rounded-2xl border border-[#E9DFD0] bg-[#F4EFE6] p-10 text-center">
                                <h2 className="text-xl font-medium text-[#2F241D]">
                                    Sign in to manage your addresses
                                </h2>

                                <p className="mt-2 text-sm text-[#66574D]">
                                    Your saved delivery addresses will appear
                                    here after signing in.
                                </p>
                            </div>
                        ) : loading ? (
                            <Loading />
                        ) : addresses.length === 0 ? (
                            <div className="rounded-2xl border border-[#E9DFD0] bg-[#F4EFE6] p-10 text-center">
                                <h2 className="text-xl font-medium text-[#2F241D]">
                                    No saved addresses
                                </h2>

                                <p className="mt-2 text-sm text-[#66574D]">
                                    Add your first delivery address to continue.
                                </p>

                                <button
                                    onClick={() => router.push("/add-address")}
                                    className="mt-6 rounded-full bg-[#6B3F24] px-6 py-3 text-xs font-medium text-white hover:bg-[#2F241D]"
                                >
                                    Add Your First Address
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {addresses.map((address) => (
                                    <div
                                        key={address._id}
                                        className="rounded-2xl border border-[#E9DFD0] bg-white p-6 hover:border-[#CDBBA8] hover:shadow-md transition"
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div>
                                                <h2 className="text-lg font-medium text-[#2F241D]">
                                                    {address.fullName}
                                                </h2>

                                                <p className="mt-1 text-xs text-[#8A7A6D]">
                                                    {address.phoneNumber}
                                                </p>
                                            </div>

                                            <span className="rounded-full bg-[#F4EFE6] px-3 py-1 text-[10px] uppercase tracking-wider text-[#6B3F24]">
                                                Delivery
                                            </span>
                                        </div>

                                        <div className="mt-5 pt-5 border-t border-[#E9DFD0] text-sm leading-6 text-[#66574D]">
                                            <p>{address.area}</p>

                                            <p>
                                                {address.city}, {address.state}
                                            </p>

                                            <p>
                                                {address.zipCode}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
};

export default AddressesPage;