"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const JournalPage = () => {

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
        <>
            <Navbar />

            <main className="px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-32">

                <section className="pt-14 md:pt-20 pb-10 md:pb-14 text-center">

                    <p className="text-xs md:text-sm tracking-[0.25em] uppercase text-[#8A5A32] font-medium">
                        THE MITHILA JOURNAL
                    </p>

                    <h1 className="mt-3 font-serif text-4xl md:text-5xl lg:text-6xl text-[#2F241D]">
                        Stories from Mithila
                    </h1>

                    <p className="max-w-2xl mx-auto mt-5 text-sm md:text-base leading-7 text-[#66574D]">
                        Explore stories about Thekua, Mithila traditions,
                        thoughtful craftsmanship, and the moments that bring
                        people together around food.
                    </p>

                </section>

                <section className="pb-20 md:pb-24">

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">

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
                                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        />

                                    </div>

                                    <div className="p-6 md:p-7">

                                        <p className="text-xs tracking-[0.18em] uppercase text-[#8A5A32] font-medium">
                                            {post.category}
                                        </p>

                                        <h2 className="mt-3 font-serif text-2xl leading-tight text-[#2F241D]">
                                            {post.title}
                                        </h2>

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

                </section>

            </main>

            <Footer />
        </>
    );
};

export default JournalPage;