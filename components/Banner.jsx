"use client";

import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

const Banner = () => {
  return (
    <div className="relative flex flex-col md:flex-row items-center justify-between bg-[#E6E9F2] my-16 rounded-2xl overflow-hidden min-h-[320px]">

      {/* Left Product Image */}
      <div className="relative z-10 w-full md:w-1/3 flex justify-center md:justify-start md:pl-10 lg:pl-16 pt-8 md:pt-0">
        <Image
          className="w-44 md:w-52 lg:w-60 object-contain"
          src={assets.jbl_soundbox_image}
          alt="JBL Soundbox"
        />
      </div>

      {/* Center Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-8 md:py-0 md:w-1/3">

        <span className="text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">
          Premium Gaming
        </span>

        <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-900 mt-3 leading-tight">
          Level Up Your
          <br />
          Gaming Experience
        </h2>

        <p className="max-w-[360px] mt-4 text-sm md:text-base text-gray-700/70 leading-6">
          From immersive sound to precise controls—everything you need to
          enhance your gaming experience.
        </p>

        <button className="group mt-6 flex items-center justify-center gap-2 px-7 py-3 bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium rounded-lg transition-all duration-300 shadow-sm">
          Explore Now

          <Image
            className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300"
            src={assets.arrow_icon_white}
            alt="Arrow"
          />
        </button>
      </div>

      {/* Right Controller Image */}
      <div className="relative z-10 w-full md:w-1/3 flex justify-center md:justify-end md:pr-6 lg:pr-12">
        <Image
          className="hidden md:block w-64 lg:w-80 object-contain"
          src={assets.md_controller_image}
          alt="Gaming Controller"
        />

        <Image
          className="md:hidden w-64 object-contain pb-6"
          src={assets.sm_controller_image}
          alt="Gaming Controller"
        />
      </div>

      {/* Decorative Background Circle */}
      <div className="absolute -right-24 -top-24 w-72 h-72 rounded-full bg-white/40" />
      <div className="absolute -left-20 -bottom-28 w-64 h-64 rounded-full bg-white/30" />

    </div>
  );
};

export default Banner;