"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";
import { assets } from "@/assets/assets";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { toast } from "react-hot-toast";

const WishlistPage = () => {
    const { currency, router, addToCart } = useAppContext();
    const { userId, isLoaded } = useAuth();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchWishlist = async () => {
        try {
            setLoading(true);

            const { data } = await axios.get("/api/wishlist/list");

            if (data.success) {
                setProducts(data.products);
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
        if (isLoaded) {
            if (userId) {
                fetchWishlist();
            } else {
                setLoading(false);
            }
        }
    }, [isLoaded, userId]);

    const handleRemove = async (productId) => {
        try {
            const { data } = await axios.post("/api/wishlist/remove", {
                productId
            });

            if (data.success) {
                setProducts((prev) =>
                    prev.filter((product) => product._id !== productId)
                );

                toast.success("Removed from wishlist");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(
                error.response?.data?.message || error.message
            );
        }
    };

    const handleAddToCart = async (productId) => {
        await addToCart(productId);
    };

    const handleProductClick = (productId) => {
        router.push("/product/" + productId);
        scrollTo(0, 0);
    };

    if (!isLoaded || loading) {
        return (
            <>
                <Navbar />

                <main className="min-h-screen bg-white px-6 md:px-16 lg:px-24 xl:px-32 py-16">
                    <div className="max-w-7xl mx-auto">
                        <div className="h-4 w-24 rounded bg-[#F4EFE6] animate-pulse" />

                        <div className="mt-4 h-10 w-64 rounded bg-[#F4EFE6] animate-pulse" />

                        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
                            {Array.from({ length: 4 }).map((_, index) => (
                                <div key={index}>
                                    <div className="aspect-square rounded-2xl bg-[#F4EFE6] animate-pulse" />
                                    <div className="mt-4 h-5 w-40 rounded bg-[#F4EFE6] animate-pulse" />
                                    <div className="mt-2 h-4 w-28 rounded bg-[#F4EFE6] animate-pulse" />
                                </div>
                            ))}
                        </div>
                    </div>
                </main>

                <Footer />
            </>
        );
    }

    if (!userId) {
        return (
            <>
                <Navbar />

                <main className="min-h-screen bg-white px-6 md:px-16 lg:px-24 xl:px-32 py-16">
                    <div className="max-w-3xl mx-auto text-center py-20">
                        <p className="text-xs uppercase tracking-[0.2em] text-[#8A5A32]">
                            Customer Account
                        </p>

                        <h1 className="mt-3 text-3xl md:text-4xl font-serif font-medium text-[#2F241D]">
                            Your Wishlist
                        </h1>

                        <p className="mt-4 text-sm leading-6 text-[#66574D]">
                            Sign in to save your favourite Thekua and
                            access your wishlist anytime.
                        </p>

                        <button
                            onClick={() => router.push("/sign-in")}
                            className="mt-8 rounded-full bg-[#6B3F24] px-7 py-3 text-sm font-medium text-white transition hover:bg-[#2F241D]"
                        >
                            Sign In
                        </button>
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
                <div className="max-w-7xl mx-auto">

                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
                        <div>
                            <p className="text-xs uppercase tracking-[0.2em] text-[#8A5A32]">
                                Saved Favourites
                            </p>

                            <h1 className="mt-2 text-3xl md:text-4xl font-serif font-medium text-[#2F241D]">
                                Your Wishlist
                            </h1>

                            <p className="mt-3 text-sm leading-6 text-[#66574D] max-w-xl">
                                Keep the Thekua you love close and come
                                back whenever you are ready.
                            </p>
                        </div>

                        <button
                            onClick={() => router.push("/all-products")}
                            className="self-start md:self-auto rounded-full border border-[#6B3F24] px-5 py-2.5 text-xs font-medium text-[#6B3F24] transition hover:bg-[#6B3F24] hover:text-white"
                        >
                            Continue Shopping
                        </button>
                    </div>

                    {products.length === 0 ? (
                        <div className="mt-14 rounded-3xl border border-[#E9DFD0] bg-[#F4EFE6]/50 px-6 py-20 text-center">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#E9DFD0]">
                                <Image
                                    src="/images/thekua/hero-classic.png"
                                    alt="Thekua"
                                    width={48}
                                    height={48}
                                    className="h-10 w-10 rounded-full object-cover"
                                />
                            </div>

                            <h2 className="mt-6 text-xl font-medium text-[#2F241D]">
                                Your wishlist is empty
                            </h2>

                            <p className="mt-2 text-sm text-[#66574D]">
                                Save your favourite Thekua here for
                                later.
                            </p>

                            <button
                                onClick={() => router.push("/all-products")}
                                className="mt-7 rounded-full bg-[#6B3F24] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#2F241D]"
                            >
                                Explore Thekua
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="mt-10 flex items-center justify-between border-b border-[#E9DFD0] pb-4">
                                <p className="text-sm text-[#66574D]">
                                    {products.length}{" "}
                                    {products.length === 1
                                        ? "item"
                                        : "items"}{" "}
                                    saved
                                </p>
                            </div>

                            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
                                {products.map((product) => {
                                    const rating =
                                        product.rating > 0
                                            ? product.rating
                                            : 4.5;

                                    const discount =
                                        product.price >
                                        product.offerPrice
                                            ? Math.round(
                                                  ((product.price -
                                                      product.offerPrice) /
                                                      product.price) *
                                                      100
                                              )
                                            : 0;

                                    return (
                                        <div
                                            key={product._id}
                                            className="group"
                                        >
                                            <div
                                                onClick={() =>
                                                    handleProductClick(
                                                        product._id
                                                    )
                                                }
                                                className="relative aspect-square cursor-pointer overflow-hidden rounded-2xl bg-[#F4EFE6]"
                                            >
                                                <Image
                                                    src={
                                                        product.images?.[0]
                                                    }
                                                    alt={product.name}
                                                    width={800}
                                                    height={800}
                                                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                                                />

                                                {product.bestSeller && (
                                                    <span className="absolute left-3 top-3 rounded-full bg-[#6B3F24] px-3 py-1.5 text-[10px] font-medium uppercase tracking-wider text-white">
                                                        Best Seller
                                                    </span>
                                                )}

                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleRemove(
                                                            product._id
                                                        );
                                                    }}
                                                    className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-[#6B3F24] shadow-sm transition hover:scale-105"
                                                    aria-label="Remove from wishlist"
                                                >
                                                    <span className="text-lg leading-none">
                                                        ×
                                                    </span>
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleAddToCart(
                                                            product._id
                                                        );
                                                    }}
                                                    className="absolute bottom-3 left-3 right-3 translate-y-2 rounded-full bg-[#6B3F24] px-4 py-3 text-xs font-medium text-white opacity-0 shadow-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-[#2F241D]"
                                                >
                                                    Add to Cart
                                                </button>
                                            </div>

                                            <div className="pt-4">
                                                <p className="truncate text-base font-medium text-[#2F241D]">
                                                    {product.name}
                                                </p>

                                                <p className="mt-1 line-clamp-2 min-h-[40px] text-xs leading-5 text-[#66574D]">
                                                    {product.shortDescription ||
                                                        product.description}
                                                </p>

                                                <div className="mt-2 flex items-center gap-2">
                                                    <span className="text-xs font-medium text-[#2F241D]">
                                                        {rating.toFixed(1)}
                                                    </span>

                                                    <div className="flex items-center gap-0.5">
                                                        {Array.from({
                                                            length: 5
                                                        }).map(
                                                            (_, index) => (
                                                                <Image
                                                                    key={
                                                                        index
                                                                    }
                                                                    src={
                                                                        index <
                                                                        Math.floor(
                                                                            rating
                                                                        )
                                                                            ? assets.star_icon
                                                                            : assets.star_dull_icon
                                                                    }
                                                                    alt=""
                                                                    width={
                                                                        12
                                                                    }
                                                                    height={
                                                                        12
                                                                    }
                                                                />
                                                            )
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="mt-3 flex items-center gap-2 flex-wrap">
                                                    <span className="text-base font-semibold text-[#6B3F24]">
                                                        {currency}
                                                        {
                                                            product.offerPrice
                                                        }
                                                    </span>

                                                    {product.price >
                                                        product.offerPrice && (
                                                        <>
                                                            <span className="text-xs text-[#8A7A6D] line-through">
                                                                {currency}
                                                                {
                                                                    product.price
                                                                }
                                                            </span>

                                                            <span className="text-[10px] font-medium text-[#8A5A32]">
                                                                {
                                                                    discount
                                                                }
                                                                % OFF
                                                            </span>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </>
                    )}
                </div>
            </main>

            <Footer />
        </>
    );
};

export default WishlistPage;