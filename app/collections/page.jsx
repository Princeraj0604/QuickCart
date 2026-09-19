"use client";

import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";

const collectionContent = {
    "Classic Thekua": {
        label: "Traditional Favourites",
        description:
            "Timeless Thekua flavours rooted in the traditional taste of Mithila.",
        fallbackImage: "/images/thekua/hero-classic.png",
    },

    "Premium Thekua": {
        label: "Crafted with Care",
        description:
            "Rich and refined Thekua varieties created for special moments and gifting.",
        fallbackImage: "/images/thekua/hero-premium.png",
    },

    "Special Variants": {
        label: "Distinctive Flavours",
        description:
            "Unique Thekua combinations for those who love something different.",
        fallbackImage: "/images/thekua/hero-classic.png",
    },

    "Dietary & Alternative": {
        label: "Thoughtfully Made",
        description:
            "Alternative Thekua choices made for different preferences and occasions.",
        fallbackImage: "/images/thekua/hero-premium.png",
    },

    "Gifting": {
        label: "Made to Share",
        description:
            "Curated Thekua selections designed for thoughtful gifting and celebrations.",
        fallbackImage: "/images/thekua/hero-gifting.png",
    },

    "Combos": {
        label: "More to Enjoy",
        description:
            "Curated combinations made for families, gatherings and everyday sharing.",
        fallbackImage: "/images/thekua/hero-gifting.png",
    },

    "B2B & Bulk": {
        label: "For Businesses",
        description:
            "Bulk Thekua selections for offices, events, celebrations and business gifting.",
        fallbackImage: "/images/thekua/hero-gifting.png",
    },
};

const CollectionsPage = () => {
    const { categories, products } = useAppContext();

    const activeCategories = categories
        .filter((category) => category.isActive)
        .sort((a, b) => a.sortOrder - b.sortOrder);

    return (
        <>
            <Navbar />

            <main className="min-h-screen bg-white">

                {/* Hero */}
                <section className="border-b border-[#E9DFD0] bg-[#F4EFE6]">
                    <div className="mx-auto max-w-7xl px-6 py-20 md:px-12 lg:px-16 lg:py-28">
                        <div className="max-w-3xl">
                            <p className="mb-4 text-xs font-medium uppercase tracking-[0.35em] text-[#8A5A32]">
                                The Mithila Collection
                            </p>

                            <h1 className="font-serif text-5xl leading-tight text-[#2F241D] md:text-6xl lg:text-7xl">
                                Collections
                            </h1>

                            <p className="mt-6 max-w-2xl text-base leading-7 text-[#66574D] md:text-lg">
                                Explore thoughtfully curated collections of
                                traditional and contemporary Thekua, created
                                for everyday moments, celebrations and gifting.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Collections */}
                <section className="mx-auto max-w-7xl px-6 py-16 md:px-12 lg:px-16 lg:py-20">
                    <div className="mb-10">
                        <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#8A5A32]">
                            Explore by Collection
                        </p>

                        <h2 className="mt-3 font-serif text-3xl text-[#2F241D] md:text-4xl">
                            Find the right Thekua for every occasion
                        </h2>
                    </div>

                    {activeCategories.length === 0 ? (
                        <div className="rounded-2xl border border-[#E9DFD0] bg-[#F4EFE6] px-6 py-16 text-center">
                            <p className="text-[#66574D]">
                                Collections are being prepared. Please check
                                back soon.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {activeCategories.map((category) => {
                                const content =
                                    collectionContent[category.name] || {
                                        label: "Mithila Collection",
                                        description:
                                            category.description ||
                                            "Explore our carefully selected Thekua collection.",
                                        fallbackImage:
                                            "/images/thekua/hero-classic.png",
                                    };

                                const categoryProduct = products.find(
                                    (product) =>
                                        product.category === category.name &&
                                        product.isActive !== false &&
                                        product.images?.length > 0
                                );

                                const image =
                                    category.image ||
                                    categoryProduct?.images?.[0] ||
                                    content.fallbackImage;

                                return (
                                    <Link
                                        key={category._id}
                                        href={`/all-products?category=${encodeURIComponent(
                                            category.name
                                        )}`}
                                        className="group overflow-hidden rounded-2xl border border-[#E9DFD0] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                                    >
                                        <div className="relative aspect-[4/3] overflow-hidden bg-[#F4EFE6]">
                                            <Image
                                                src={image}
                                                alt={category.name}
                                                fill
                                                className="object-cover transition duration-500 group-hover:scale-105"
                                            />

                                            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />

                                            <div className="absolute bottom-5 left-5 right-5">
                                                <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/85">
                                                    {content.label}
                                                </p>

                                                <h3 className="mt-1 font-serif text-2xl text-white">
                                                    {category.name}
                                                </h3>
                                            </div>
                                        </div>

                                        <div className="p-6">
                                            <p className="text-sm leading-6 text-[#66574D]">
                                                {content.description}
                                            </p>

                                            <div className="mt-5 flex items-center justify-between">
                                                <span className="text-sm font-medium text-[#6B3F24]">
                                                    Explore Collection
                                                </span>

                                                <span className="text-lg text-[#6B3F24] transition-transform duration-300 group-hover:translate-x-1">
                                                    →
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    )}
                </section>

                {/* Bottom CTA */}
                <section className="border-t border-[#E9DFD0] bg-[#2F241D]">
                    <div className="mx-auto max-w-7xl px-6 py-16 text-center md:px-12 lg:px-16">
                        <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#DCCFC0]">
                            The Full Selection
                        </p>

                        <h2 className="mt-3 font-serif text-3xl text-white md:text-4xl">
                            Discover all our Thekua
                        </h2>

                        <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#DCCFC0]">
                            From traditional favourites to premium gifting
                            options, explore the complete MITHILA selection.
                        </p>

                        <Link
                            href="/all-products"
                            className="mt-7 inline-flex rounded-full bg-white px-7 py-3 text-sm font-medium text-[#6B3F24] transition hover:bg-[#F4EFE6]"
                        >
                            Shop All Thekua
                        </Link>
                    </div>
                </section>

            </main>

            <Footer />
        </>
    );
};

export default CollectionsPage;