"use client";

import React from "react";
import { useAppContext } from "@/context/AppContext";

const CategoryShowcase = () => {
    const {
        categories,
        router
    } = useAppContext();

    const handleCategoryClick = (category) => {
        router.push(
            `/all-products?category=${encodeURIComponent(category.name)}`
        );
    };

    return (
        <section className="w-full py-16 md:py-20">

            <div className="text-center max-w-2xl mx-auto">

                <p className="text-xs md:text-sm tracking-[0.25em] uppercase text-[#8A5A32] font-medium">
                    EXPLORE THE COLLECTION
                </p>

                <h2 className="mt-3 font-serif text-3xl md:text-4xl lg:text-5xl text-[#2F241D]">
                    Find Your Favourite Thekua
                </h2>

                <p className="mt-4 text-sm md:text-base leading-7 text-[#66574D]">
                    From timeless classics to thoughtfully curated gifting
                    collections, discover Thekua for every taste and occasion.
                </p>

            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 mt-10">

                {categories.map((category) => (
                    <button
                        key={category._id}
                        onClick={() => handleCategoryClick(category)}
                        className="group text-left rounded-2xl border border-[#E9DFD0] bg-[#F4EFE6] p-6 md:p-7 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-md"
                    >

                        <div className="flex items-start justify-between gap-4">

                            <div>
                                <p className="text-xs uppercase tracking-[0.18em] text-[#8A5A32]">
                                    Collection
                                </p>

                                <h3 className="mt-3 font-serif text-xl md:text-2xl text-[#2F241D]">
                                    {category.name}
                                </h3>
                            </div>

                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#D8CABC] text-[#6B3F24] transition-transform duration-300 group-hover:translate-x-1">
                                →
                            </span>

                        </div>

                        <p className="mt-4 text-sm leading-6 text-[#66574D] line-clamp-2">
                            {category.description}
                        </p>

                        <p className="mt-5 text-xs font-medium uppercase tracking-wider text-[#6B3F24]">
                            Explore Collection
                        </p>

                    </button>
                ))}

            </div>

        </section>
    );
};

export default CategoryShowcase;