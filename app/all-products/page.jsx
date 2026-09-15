'use client'

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";

const AllProducts = () => {
const router = useRouter();
    const {
        products,
        categories,
        fetchProductData
    } = useAppContext();

    const searchParams = useSearchParams();

    const [selectedCategory, setSelectedCategory] = useState("");
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("newest");

    useEffect(() => {
        const categoryFromUrl = searchParams.get("category");

        setSelectedCategory(categoryFromUrl || "");
    }, [searchParams]);

    useEffect(() => {
        const timer = setTimeout(() => {

            fetchProductData({
                category: selectedCategory,
                search,
                sort
            });

        }, 300);

        return () => clearTimeout(timer);

    }, [selectedCategory, search, sort]);

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);

        if (category) {
            router.push(`/all-products?category=${encodeURIComponent(category)}`);
        } else {
        router.push("/all-products");
        }
    };

    const clearFilters = () => {
        setSelectedCategory("");
        setSearch("");
        setSort("newest");
        router.push("/all-products");
    };

    const hasFilters =
        selectedCategory ||
        search ||
        sort !== "newest";

    return (
        <>
            <Navbar />

            <main className="px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-32">

                {/* Shop Header */}

                <section className="pt-14 md:pt-20 pb-10 md:pb-12">

                    <div className="max-w-3xl">

                        <p className="text-xs md:text-sm tracking-[0.25em] uppercase text-[#8A5A32] font-medium">
                            THE MITHILA COLLECTION
                        </p>

                        <h1 className="mt-3 font-serif text-4xl md:text-5xl lg:text-6xl leading-tight text-[#2F241D]">
                            Shop Thekua
                        </h1>

                        <p className="mt-4 max-w-2xl text-sm md:text-base leading-7 text-[#66574D]">
                            Explore traditional favourites, premium flavours,
                            special variants, and thoughtfully curated
                            collections inspired by Mithila.
                        </p>

                    </div>

                </section>


                {/* Category Navigation */}

                <section className="border-y border-[#E9DFD0] py-5">

                    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">

                        <button
                            onClick={() => handleCategoryChange("")}
                            className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                                selectedCategory === ""
                                    ? "bg-[#6B3F24] text-white"
                                    : "border border-[#D8CABC] bg-white text-[#6B3F24] hover:bg-[#F4EFE6]"
                            }`}
                        >
                            All Thekua
                        </button>

                        {categories.map((category) => (

                            <button
                                key={category._id}
                                onClick={() => handleCategoryChange(category.name)}
                                className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                                    selectedCategory === category.name
                                        ? "bg-[#6B3F24] text-white"
                                        : "border border-[#D8CABC] bg-white text-[#6B3F24] hover:bg-[#F4EFE6]"
                                }`}
                            >
                                {category.name}
                            </button>

                        ))}

                    </div>

                </section>


                {/* Search & Sort */}

                <section className="py-6">

                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                        {/* Search */}

                        <div className="relative w-full lg:max-w-md">

                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search Thekua..."
                                className="w-full rounded-full border border-[#D8CABC] bg-white px-5 py-3 pr-12 text-sm text-[#2F241D] outline-none transition focus:border-[#8A5A32] focus:ring-1 focus:ring-[#8A5A32]/20"
                            />

                            {search && (
                                <button
                                    onClick={() => setSearch("")}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-lg text-[#8A7A6D] hover:text-[#2F241D]"
                                    aria-label="Clear search"
                                >
                                    ×
                                </button>
                            )}

                        </div>


                        {/* Sort */}

                        <div className="flex items-center justify-between sm:justify-end gap-3">

                            <span className="text-sm text-[#66574D]">
                                Sort by
                            </span>

                            <select
                                value={sort}
                                onChange={(e) => setSort(e.target.value)}
                                className="rounded-full border border-[#D8CABC] bg-white px-5 py-3 text-sm text-[#2F241D] outline-none transition focus:border-[#8A5A32]"
                            >
                                <option value="newest">
                                    Newest
                                </option>

                                <option value="price-low">
                                    Price: Low to High
                                </option>

                                <option value="price-high">
                                    Price: High to Low
                                </option>

                                <option value="rating">
                                    Rating
                                </option>

                                <option value="oldest">
                                    Oldest
                                </option>
                            </select>

                        </div>

                    </div>

                </section>


                {/* Products */}

                <section className="pb-16 md:pb-20">

                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-7">

                        <div>

                            <p className="text-xs uppercase tracking-[0.18em] text-[#8A5A32] font-medium">
                                {selectedCategory
                                    ? "COLLECTION"
                                    : "THE MITHILA COLLECTION"}
                            </p>

                            <h2 className="mt-2 font-serif text-2xl md:text-3xl text-[#2F241D]">
                                {selectedCategory || "All Thekua"}
                            </h2>

                            <p className="mt-1 text-sm text-[#66574D]">
                                {products.length}{" "}
                                {products.length === 1
                                    ? "product"
                                    : "products"}{" "}
                                found
                            </p>

                        </div>


                        {hasFilters && (
                            <button
                                onClick={clearFilters}
                                className="self-start sm:self-auto rounded-full border border-[#D8CABC] px-5 py-2.5 text-sm font-medium text-[#6B3F24] transition hover:bg-[#F4EFE6]"
                            >
                                Clear Filters
                            </button>
                        )}

                    </div>


                    {/* Active Filters */}

                    {(selectedCategory || search) && (

                        <div className="flex flex-wrap items-center gap-2 mb-7">

                            <span className="text-xs uppercase tracking-wider text-[#8A7A6D]">
                                Active:
                            </span>

                            {selectedCategory && (
                                <button
                                    onClick={() => {
                                        setSelectedCategory("");
                                        router.push("/all-products");
                                    }}
                                    className="inline-flex items-center gap-2 rounded-full bg-[#F4EFE6] px-4 py-2 text-xs font-medium text-[#6B3F24]"
                                >
                                    {selectedCategory}
                                    <span>×</span>
                                </button>
                            )}

                            {search && (
                                <button
                                    onClick={() => setSearch("")}
                                    className="inline-flex items-center gap-2 rounded-full bg-[#F4EFE6] px-4 py-2 text-xs font-medium text-[#6B3F24]"
                                >
                                    Search: {search}
                                    <span>×</span>
                                </button>
                            )}

                        </div>

                    )}


                    {/* Product Grid */}

                    {products.length > 0 ? (

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 md:gap-6">

                            {products.map((product) => (

                                <ProductCard
                                    key={product._id}
                                    product={product}
                                />

                            ))}

                        </div>

                    ) : (

                        <div className="flex flex-col items-center justify-center min-h-[320px] rounded-2xl bg-[#F4EFE6] px-6 text-center">

                            <p className="font-serif text-2xl md:text-3xl text-[#2F241D]">
                                No Thekua found
                            </p>

                            <p className="mt-3 max-w-md text-sm leading-6 text-[#66574D]">
                                We couldn't find any products matching your
                                current search or category. Try another
                                option from our collection.
                            </p>

                            <button
                                onClick={clearFilters}
                                className="mt-6 rounded-full bg-[#6B3F24] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#2F241D]"
                            >
                                View All Thekua
                            </button>

                        </div>

                    )}

                </section>

            </main>

            <Footer />
        </>
    );
};

export default AllProducts;