"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const FeaturedProduct = () => {

    const journalPosts = [
        {
            id: 1,
            category: "THE MITHILA TABLE",
            title: "The Story Behind Thekua: A Taste of Mithila",
            description:
                "Discover the cultural roots of Thekua and how this traditional favourite continues to find its place on modern tables.",
            image: "/images/thekua/hero-classic.png",
            slug: "story-behind-thekua",
        },
        {
            id: 2,
            category: "CRAFT & TRADITION",
            title: "From Flour to Thekua: The Making of a Tradition",
            description:
                "Take a closer look at the ingredients, shaping, and traditional character that make Thekua so distinctive.",
            image: "/images/thekua/hero-premium.png",
            slug: "making-of-thekua",
        },
        {
            id: 3,
            category: "MITHILA MOMENTS",
            title: "Thekua for Every Moment: Tea-Time to Celebrations",
            description:
                "From everyday chai-time to festive gatherings, explore the many moments where Thekua brings people together.",
            image: "/images/thekua/hero-gifting.png",
            slug: "thekua-for-every-moment",
        },
    ];

    return (
        <section
            id="journal"
            className="w-full py-16 md:py-20"
        >

            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">

                <div>

                    <p className="text-xs md:text-sm tracking-[0.25em] uppercase text-[#8A5A32] font-medium">
                        THE MITHILA JOURNAL
                    </p>

                    <h2 className="mt-2 font-serif text-3xl md:text-4xl lg:text-5xl text-[#2F241D]">
                        Stories from Mithila
                    </h2>

                    <p className="mt-3 max-w-xl text-sm md:text-base leading-7 text-[#66574D]">
                        Stories, traditions, and thoughtful ideas inspired by
                        the flavours and culture of Mithila.
                    </p>

                </div>

                <Link
                    href="/journal"
                    className="hidden md:inline-flex items-center justify-center rounded-full border border-[#6B3F24] px-6 py-2.5 text-sm font-medium text-[#6B3F24] transition hover:bg-[#6B3F24] hover:text-white"
                >
                    View Journal
                </Link>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">

                {journalPosts.map((post) => (

                    <article
                        key={post.id}
                        className="group overflow-hidden rounded-2xl border border-[#E9DFD0] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                    >

                        <Link href={`/journal/${post.slug}`}>

                            <div className="relative aspect-[4/3] overflow-hidden bg-[#F4EFE6]">

                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    fill
                                    className="object-cover transition duration-500 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                />

                            </div>

                            <div className="p-6">

                                <p className="text-xs tracking-[0.18em] uppercase text-[#8A5A32] font-medium">
                                    {post.category}
                                </p>

                                <h3 className="mt-3 font-serif text-2xl leading-tight text-[#2F241D]">
                                    {post.title}
                                </h3>

                                <p className="mt-3 text-sm leading-6 text-[#66574D]">
                                    {post.description}
                                </p>

                                <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#6B3F24]">
                                    Read Story
                                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                                        →
                                    </span>
                                </div>

                            </div>

                        </Link>

                    </article>

                ))}

            </div>

            <Link
                href="/journal"
                className="md:hidden mt-8 inline-flex w-full items-center justify-center rounded-full border border-[#6B3F24] px-8 py-3 text-sm font-medium text-[#6B3F24] transition hover:bg-[#6B3F24] hover:text-white"
            >
                View Journal
            </Link>

        </section>
    );
};

export default FeaturedProduct;