"use client";

import React from "react";
import { UserProfile } from "@clerk/nextjs";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ProfilePage = () => {
    return (
        <>
            <Navbar />

            <main className="min-h-screen bg-white px-6 md:px-16 lg:px-24 xl:px-32 py-10 md:py-14">
                <div className="max-w-6xl mx-auto">

                    <div className="mb-8">
                        <p className="text-xs uppercase tracking-[0.2em] text-[#8A5A32]">
                            Customer Account
                        </p>

                        <h1 className="mt-2 text-3xl md:text-4xl font-serif font-medium text-[#2F241D]">
                            Manage Profile
                        </h1>

                        <p className="mt-3 text-sm leading-6 text-[#66574D]">
                            Manage your personal information and account settings.
                        </p>
                    </div>

                    <div className="flex justify-center">
                        <UserProfile />
                    </div>

                </div>
            </main>

            <Footer />
        </>
    );
};

export default ProfilePage;