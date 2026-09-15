"use client";

import React from "react";
import Link from "next/link";

const B2BSection = () => {
    return (
        <section
            id="b2b"
            className="w-full py-16 md:py-24"
        >
            <div className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-[#2F241D]">

                <div className="px-6 py-12 sm:px-10 md:px-14 lg:px-20 xl:px-24">

                    <div className="max-w-3xl">

                        <p className="text-xs md:text-sm tracking-[0.25em] uppercase text-[#D8BFA5] font-medium">
                            FOR BUSINESS & BULK ORDERS
                        </p>

                        <h2 className="mt-3 font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight text-white">
                            Traditional Flavours, Made for Bigger Moments.
                        </h2>

                        <p className="mt-5 max-w-2xl text-sm md:text-base leading-8 text-[#E9DFD0]">
                            Looking for Thekua for corporate gifting, weddings,
                            celebrations, events, retail, or other bulk
                            requirements? We would love to help you create a
                            collection that fits your occasion.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">

                            <div className="rounded-xl border border-white/10 bg-white/5 px-5 py-5">

                                <p className="font-serif text-xl text-white">
                                    Corporate
                                </p>

                                <p className="mt-2 text-sm leading-6 text-[#D8CABC]">
                                    Thoughtful gifting options for teams,
                                    clients, and business occasions.
                                </p>

                            </div>

                            <div className="rounded-xl border border-white/10 bg-white/5 px-5 py-5">

                                <p className="font-serif text-xl text-white">
                                    Celebrations
                                </p>

                                <p className="mt-2 text-sm leading-6 text-[#D8CABC]">
                                    Curated Thekua collections for weddings,
                                    festivals, and special gatherings.
                                </p>

                            </div>

                            <div className="rounded-xl border border-white/10 bg-white/5 px-5 py-5">

                                <p className="font-serif text-xl text-white">
                                    Bulk Orders
                                </p>

                                <p className="mt-2 text-sm leading-6 text-[#D8CABC]">
                                    Flexible options for larger requirements
                                    and planned orders.
                                </p>

                            </div>

                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 mt-8">

                            <Link
                                href="/all-products?category=B2B%20%26%20Bulk"
                                className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 text-sm font-medium text-[#6B3F24] transition duration-300 hover:bg-[#F4EFE6]"
                            >
                                Explore Bulk Collection
                                <span className="ml-2">→</span>
                            </Link>

                            <Link
                                href="/b2b"
                                className="inline-flex items-center justify-center rounded-full border border-white/30 px-7 py-3.5 text-sm font-medium text-white transition duration-300 hover:bg-white/10"
                            >
                            Make an Enquiry
                            </Link>

                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
};

export default B2BSection;