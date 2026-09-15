'use client'

import React from "react";
import HeaderSlider from "@/components/HeaderSlider";
import CategoryShowcase from "@/components/CategoryShowcase";
import HomeProducts from "@/components/HomeProducts";
import BestSellers from "@/components/BestSellers";
import Banner from "@/components/Banner";
import NewsLetter from "@/components/NewsLetter";
import FeaturedProduct from "@/components/FeaturedProduct";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BrandStory from "@/components/BrandStory";
import GiftingSection from "@/components/GiftingSection";
import B2BSection from "@/components/B2BSection";

const Home = () => {
    return (
        <>
            <Navbar />

            <div className="px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-32">

                <HeaderSlider />

                <CategoryShowcase />

                <HomeProducts />

                <BestSellers />

                <FeaturedProduct />

                <BrandStory />

                <GiftingSection />

                <B2BSection />
                
                <Banner />

                <NewsLetter />

            </div>

            <Footer />
        </>
    );
};

export default Home;