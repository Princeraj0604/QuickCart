"use client";

import Navbar from "@/components/seller/Navbar";
import Sidebar from "@/components/seller/Sidebar";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Loading from "@/components/Loading";

const Layout = ({ children }) => {
    const router = useRouter();
    const [checking, setChecking] = useState(true);
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        const checkSellerAccess = async () => {
            try {
                const { data } = await axios.get("/api/seller/auth");

                if (data.success && data.isSeller) {
                    setAuthorized(true);
                } else {
                    router.replace("/");
                }
            } catch (error) {
                router.replace("/");
            } finally {
                setChecking(false);
            }
        };

        checkSellerAccess();
    }, [router]);

    if (checking) {
        return (
            <div className="min-h-screen">
                <Navbar />

                <div className="flex w-full">
                    <Sidebar />

                    <div className="flex-1 flex justify-center items-center min-h-[calc(100vh-64px)]">
                        <Loading />
                    </div>
                </div>
            </div>
        );
    }

    if (!authorized) {
        return null;
    }

    return (
        <div>
            <Navbar />

            <div className="flex w-full">
                <Sidebar />

                <main className="flex-1">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;