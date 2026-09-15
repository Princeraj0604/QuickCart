"use client";

import React from "react";
import ProductCard from "./ProductCard";
import { useAppContext } from "@/context/AppContext";

const BestSellers = () => {
    const {
        products,
        router
    } = useAppContext();

    const bestSellers = products
        .filter((product) => product.bestSeller)
        .slice(0, 5);

    return (
        <section className="w-full py-16 md:py-20">

            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">

                <div>
                    <p className="text-xs md:text-sm tracking-[0.25em] uppercase text-[#8A5A32] font-medium">
                        LOVED BY OUR CUSTOMERS
                    </p>

                    <h2 className="mt-2 font-serif text-3xl md:text-4xl lg:text-5xl text-[#2F241D]">
                        Best Sellers
                    </h2>

                    <p className="mt-3 max-w-xl text-sm md:text-base leading-7 text-[#66574D]">
                        Explore the Thekua favourites that bring the traditional
                        taste of Mithila to everyday moments and celebrations.
                    </p>
                </div>

                <button
                    onClick={() => router.push("/all-products")}
                    className="hidden md:inline-flex items-center justify-center rounded-full border border-[#6B3F24] px-6 py-2.5 text-sm font-medium text-[#6B3F24] transition hover:bg-[#6B3F24] hover:text-white"
                >
                    Explore All
                </button>

            </div>

            {bestSellers.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 md:gap-6 mt-8">

                    {bestSellers.map((product) => (
                        <ProductCard
                            key={product._id}
                            product={product}
                        />
                    ))}

                </div>
            ) : (
                <div className="mt-8 rounded-2xl bg-[#F4EFE6] px-6 py-12 text-center">

                    <p className="font-serif text-2xl text-[#2F241D]">
                        Our favourites are coming soon
                    </p>

                    <p className="mt-2 text-sm text-[#66574D]">
                        Explore the complete collection to discover your
                        favourite Thekua.
                    </p>

                </div>
            )}

            <button
                onClick={() => router.push("/all-products")}
                className="md:hidden mt-8 inline-flex w-full items-center justify-center rounded-full border border-[#6B3F24] px-8 py-3 text-sm font-medium text-[#6B3F24] transition hover:bg-[#6B3F24] hover:text-white"
            >
                Explore All
            </button>

        </section>
    );
};

export default BestSellers;