import React from "react";
import Image from "next/image";
import { assets } from "@/assets/assets";

const NewsLetter = () => {
  return (
    <section className="w-full py-14 md:py-20">
      <div className="max-w-6xl mx-auto px-5">
        <div className="bg-[#E6E9F2] rounded-2xl px-6 py-10 md:px-14 md:py-14">
          
          <div className="flex flex-col md:flex-row items-center gap-10">
            
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center justify-center">
              <Image
                src={assets.logo}
                alt="QuickCart Logo"
                width={180}
                height={60}
                className="w-36 md:w-44 h-auto"
              />
            </div>

            {/* About Content */}
            <div className="text-center md:text-left">
              <p className="text-orange-600 font-medium mb-2">
                More Than Just Shopping
              </p>

              <h2 className="text-2xl md:text-4xl font-semibold text-[#25324B] mb-4">
                Your Everyday Shopping, Made Simple.
              </h2>

              <p className="text-gray-500/90 text-sm md:text-base leading-7 max-w-3xl">
                At QuickCart, we believe shopping should be simple, fast, and
                enjoyable. From everyday essentials to the latest gadgets,
                fashion, and lifestyle products, we bring everything you need
                together in one convenient place.
              </p>

              <p className="text-gray-500/90 text-sm md:text-base leading-7 max-w-3xl mt-3">
                Our goal is to make online shopping effortless by offering
                quality products, great value, and a smooth experience from
                discovery to delivery.
              </p>

              {/* Small highlights */}
              <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-6">
                <span className="px-4 py-2 bg-white rounded-full text-sm text-[#25324B]">
                  Quality Products
                </span>

                <span className="px-4 py-2 bg-white rounded-full text-sm text-[#25324B]">
                  Great Prices
                </span>

                <span className="px-4 py-2 bg-white rounded-full text-sm text-[#25324B]">
                  Easy Shopping
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsLetter;