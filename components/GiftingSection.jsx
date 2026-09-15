"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const GiftingSection = () => {
    return (
        <section
            id="gifting"
            className="w-full py-16 md:py-24"
        >
            <div className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-[#F4EFE6]">

                <div className="grid grid-cols-1 lg:grid-cols-2 items-center">

                    {/* Content */}

                    <div className="order-2 lg:order-1 px-6 py-12 sm:px-10 md:px-14 lg:px-16 xl:px-20">

                        <p className="text-xs md:text-sm tracking-[0.25em] uppercase text-[#8A5A32] font-medium">
                            THOUGHTFUL GIFTING
                        </p>

                        <h2 className="mt-3 font-serif text-3xl md:text-4xl lg:text-5xl leading-tight text-[#2F241D]">
                            Share a Little Taste of Mithila.
                        </h2>

                        <p className="mt-5 max-w-xl text-sm md:text-base leading-8 text-[#66574D]">
                            Thoughtfully curated Thekua collections made for
                            celebrations, family gatherings, festive moments,
                            and meaningful gifts.
                        </p>

                        <p className="mt-4 max-w-xl text-sm md:text-base leading-8 text-[#66574D]">
                            Choose from carefully selected boxes and collections
                            designed to make sharing a traditional taste feel
                            special.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3 mt-7">

                            <Link
                                href="/all-products?category=Gifting"
                                className="inline-flex items-center justify-center rounded-full bg-[#6B3F24] px-7 py-3.5 text-sm font-medium text-white transition duration-300 hover:bg-[#2F241D]"
                            >
                                Explore Gifting
                                <span className="ml-2">→</span>
                            </Link>

                            <Link
                                href="/all-products?category=Combos"
                                className="inline-flex items-center justify-center rounded-full border border-[#6B3F24] px-7 py-3.5 text-sm font-medium text-[#6B3F24] transition duration-300 hover:bg-white"
                            >
                                View Combos
                            </Link>

                        </div>

                    </div>

                    {/* Image */}

                    <div className="order-1 lg:order-2 relative h-[320px] sm:h-[400px] md:h-[480px] lg:h-[560px]">

                        <Image
                            src="/images/thekua/hero-gifting.png"
                            alt="Mithila Thekua gifting collection"
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                        />

                    </div>

                </div>

            </div>
        </section>
    );
};

export default GiftingSection;