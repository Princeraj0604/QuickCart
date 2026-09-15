"use client";

import React from "react";
import { useRouter } from "next/navigation";

const Footer = () => {
  const router = useRouter();

  return (
    <footer className="bg-[#3B2A20] text-[#F4EFE6]">

      <div className="flex flex-col md:flex-row items-start justify-between px-6 md:px-16 lg:px-32 gap-10 py-14">

        {/* Brand */}
        <div className="w-full md:w-2/5">
          <button
            onClick={() => router.push("/")}
            className="font-serif text-3xl tracking-wide text-[#F4EFE6]"
          >
            MITHILA
          </button>

          <p className="mt-5 max-w-md text-sm leading-7 text-[#D8CABB]">
            Mithila brings the timeless taste of traditional Thekua to modern
            tables, celebrations, and gifting moments.
          </p>
        </div>

        {/* Explore */}
        <div className="w-full md:w-1/5">
          <h2 className="font-medium text-white mb-5">
            Explore
          </h2>

          <ul className="text-sm space-y-3 text-[#D8CABB]">
            <li>
              <button
                onClick={() => router.push("/")}
                className="hover:text-white transition"
              >
                Home
              </button>
            </li>

            <li>
              <button
                onClick={() => router.push("/all-products")}
                className="hover:text-white transition"
              >
                Shop Thekua
              </button>
            </li>

            <li>
              <button
                onClick={() => router.push("/")}
                className="hover:text-white transition"
              >
                Collections
              </button>
            </li>

            <li>
              <button
                onClick={() => router.push("/")}
                className="hover:text-white transition"
              >
                Our Story
              </button>
            </li>
          </ul>
        </div>

        {/* Customer Care */}
        <div className="w-full md:w-1/5">
          <h2 className="font-medium text-white mb-5">
            Customer Care
          </h2>

          <ul className="text-sm space-y-3 text-[#D8CABB]">
            <li>
              <button className="hover:text-white transition">
                Contact Us
              </button>
            </li>

            <li>
              <button className="hover:text-white transition">
                FAQ
              </button>
            </li>

            <li>
              <button className="hover:text-white transition">
                B2B Enquiries
              </button>
            </li>

            <li>
              <button className="hover:text-white transition">
                Gifting
              </button>
            </li>
          </ul>
        </div>

        {/* Get in Touch */}
        <div className="w-full md:w-1/5">
          <h2 className="font-medium text-white mb-5">
            Get in Touch
          </h2>

          <div className="text-sm space-y-3 text-[#D8CABB]">
            <p>+91 90000 00000</p>
            <p>hello@mithila.example</p>
            <p>India</p>
          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-[#6B5040] py-5 px-6">
        <p className="text-center text-xs md:text-sm text-[#CDBBAA]">
          © 2026 Mithila. All rights reserved.
        </p>
      </div>

    </footer>
  );
};

export default Footer;