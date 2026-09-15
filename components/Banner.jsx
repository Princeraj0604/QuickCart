"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { assets } from "@/assets/assets";

const Banner = () => {
  const router = useRouter();

  return (
    <section className="relative flex flex-col md:flex-row items-center justify-between bg-[#F4EFE6] my-16 rounded-2xl overflow-hidden min-h-[320px]">

      {/* Left Decorative Content */}
      <div className="relative z-10 w-full md:w-1/3 flex justify-center md:justify-start md:pl-10 lg:pl-16 pt-8 md:pt-0">
        <div className="flex h-40 w-40 md:h-48 md:w-48 lg:h-56 lg:w-56 items-center justify-center rounded-full bg-[#E9DFD0]">
          <div className="text-center px-6">
            <p className="text-xs tracking-[0.2em] uppercase text-[#8A5A32]">
              From Mithila
            </p>

            <p className="mt-2 font-serif text-2xl md:text-3xl text-[#6B3F24]">
              Made with
              <br />
              Tradition
            </p>
          </div>
        </div>
      </div>

      {/* Center Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-8 md:py-0 md:w-1/3">

        <span className="text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-[#8A5A32]">
          A Taste of Mithila
        </span>

        <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-[#2F241D] mt-3 leading-tight">
          Traditional Thekua,
          <br />
          Crafted for Today
        </h2>

        <p className="max-w-[380px] mt-4 text-sm md:text-base text-[#66574D] leading-6">
          Discover the timeless taste of Mithila through traditional Thekua,
          thoughtfully made for everyday moments and celebrations.
        </p>

        <button
          onClick={() => router.push("/all-products")}
          className="group mt-6 flex items-center justify-center gap-2 px-7 py-3 bg-[#6B3F24] hover:bg-[#8A5A32] text-white text-sm font-medium rounded-full transition-all duration-300 shadow-sm"
        >
          Explore Thekua

          <Image
            className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300"
            src={assets.arrow_icon_white}
            alt=""
            width={14}
            height={14}
          />
        </button>
      </div>

      {/* Right Decorative Content */}
      <div className="relative z-10 w-full md:w-1/3 flex justify-center md:justify-end md:pr-6 lg:pr-12 pb-8 md:pb-0">
        <div className="relative flex h-48 w-48 md:h-56 md:w-56 lg:h-64 lg:w-64 items-center justify-center rounded-full bg-[#E9DFD0]">

          <div className="text-center px-6">
            <p className="font-serif text-3xl md:text-4xl text-[#6B3F24]">
              Thekua
            </p>

            <p className="mt-2 text-xs md:text-sm text-[#66574D]">
              A timeless taste
              <br />
              from Mithila
            </p>
          </div>

        </div>
      </div>

      {/* Decorative Background Circles */}
      <div className="absolute -right-24 -top-24 w-72 h-72 rounded-full bg-white/50" />
      <div className="absolute -left-20 -bottom-28 w-64 h-64 rounded-full bg-white/40" />

    </section>
  );
};

export default Banner;