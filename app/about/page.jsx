import React from "react";
import Image from "next/image";
import { assets } from "@/assets/assets";
import Navbar from "@/components/Navbar";

const About = () => {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-[#E6E9F2] py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-5 text-center">
            <p className="text-orange-600 font-medium mb-3">
              About QuickCart
            </p>

            <h1 className="text-3xl md:text-5xl font-semibold text-gray-800">
              Shopping Made Simple, Fast & Enjoyable
            </h1>

            <p className="max-w-2xl mx-auto mt-5 text-gray-500 leading-7">
              QuickCart is your trusted online shopping destination,
              bringing quality products, great value, and everyday
              convenience all in one place.
            </p>
          </div>
        </section>

        {/* About Content */}
        <section className="max-w-6xl mx-auto px-5 py-16 md:py-20">
          <div className="flex flex-col md:flex-row items-center gap-12">
            
            {/* Logo */}
            <div className="w-full md:w-1/3 flex justify-center">
              <Image
                src={assets.logo}
                alt="QuickCart Logo"
                width={220}
                height={100}
                className="w-40 md:w-52 h-auto"
              />
            </div>

            {/* Text */}
            <div className="w-full md:w-2/3">
              <p className="text-orange-600 font-medium mb-2">
                Who We Are
              </p>

              <h2 className="text-2xl md:text-4xl font-semibold text-gray-800 mb-5">
                Your Everyday Shopping Partner
              </h2>

              <p className="text-gray-500 leading-7 mb-4">
                At QuickCart, we believe online shopping should be
                effortless, reliable, and enjoyable. We bring a wide
                selection of products together so you can find what you
                need without the hassle.
              </p>

              <p className="text-gray-500 leading-7">
                From the latest electronics and gadgets to fashion,
                lifestyle products, and everyday essentials, our goal is
                to make every shopping experience smooth from discovery
                to delivery.
              </p>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="bg-gray-50 py-16">
          <div className="max-w-6xl mx-auto px-5">
            <h2 className="text-2xl md:text-3xl font-semibold text-center text-gray-800 mb-10">
              Why Choose QuickCart?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-7 text-center shadow-sm">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Quality Products
                </h3>
                <p className="text-gray-500 leading-6">
                  We focus on bringing reliable and quality products to
                  your doorstep.
                </p>
              </div>

              <div className="bg-white rounded-xl p-7 text-center shadow-sm">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Great Value
                </h3>
                <p className="text-gray-500 leading-6">
                  Discover products at competitive prices without
                  compromising on quality.
                </p>
              </div>

              <div className="bg-white rounded-xl p-7 text-center shadow-sm">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Easy Shopping
                </h3>
                <p className="text-gray-500 leading-6">
                  A simple and convenient shopping experience designed
                  around you.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default About;