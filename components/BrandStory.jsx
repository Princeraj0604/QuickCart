"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const BrandStory = () => {
    return (
        <section
            id="our-story"
            className="w-full py-16 md:py-24"
        >

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

                {/* Image */}

                <div className="relative min-h-[420px] md:min-h-[520px] overflow-hidden rounded-2xl md:rounded-3xl bg-[#F4EFE6]">

                    <Image
                        src="/images/thekua/hero-classic.png"
                        alt="Traditional Thekua inspired by Mithila"
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                    />

                </div>

                {/* Content */}

                <div className="max-w-xl">

                    <p className="text-xs md:text-sm tracking-[0.25em] uppercase text-[#8A5A32] font-medium">
                        OUR STORY
                    </p>

                    <h2 className="mt-3 font-serif text-3xl md:text-4xl lg:text-5xl leading-tight text-[#2F241D]">
                        A Taste of Mithila, Crafted for Today.
                    </h2>

                    <p className="mt-6 text-sm md:text-base leading-8 text-[#66574D]">
                        Mithila is inspired by the timeless food traditions of
                        the Mithila region and the simple joy of sharing
                        something made with care.
                    </p>

                    <p className="mt-4 text-sm md:text-base leading-8 text-[#66574D]">
                        At the heart of our collection is Thekua — a traditional
                        favourite known for its distinctive character, familiar
                        ingredients, and connection with celebrations and
                        everyday moments.
                    </p>

                    <p className="mt-4 text-sm md:text-base leading-8 text-[#66574D]">
                        We bring these familiar flavours into thoughtfully
                        presented collections designed for modern homes,
                        gatherings, tea-time, and gifting.
                    </p>

                    <Link
                        href="/journal/story-behind-thekua"
                        className="inline-flex items-center gap-2 mt-7 rounded-full bg-[#6B3F24] px-7 py-3.5 text-sm font-medium text-white transition duration-300 hover:bg-[#2F241D]"
                    >
                        Discover Our Story
                        <span>→</span>
                    </Link>

                </div>

            </div>

        </section>
    );
};

export default BrandStory;