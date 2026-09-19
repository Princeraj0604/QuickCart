"use client";

import React from "react";
import { useRouter } from "next/navigation";

const Footer = () => {
  const router = useRouter();

  return (
    <footer className="bg-[#3B2A20] text-[#F4EFE6]">
      <div className="grid grid-cols-1 gap-10 px-6 py-14 md:grid-cols-2 md:px-16 lg:grid-cols-4 lg:px-32">
        {/* Brand */}
        <div className="lg:pr-8">
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

          <p className="mt-5 text-xs uppercase tracking-[0.2em] text-[#BFAE9F]">
            A Taste of Mithila, Crafted for Today
          </p>
        </div>

        {/* Explore */}
        <div>
          <h2 className="mb-5 font-medium text-white">Explore</h2>

          <ul className="space-y-3 text-sm text-[#D8CABB]">
            <li>
              <button
                onClick={() => router.push("/")}
                className="transition hover:text-white"
              >
                Home
              </button>
            </li>

            <li>
              <button
                onClick={() => router.push("/all-products")}
                className="transition hover:text-white"
              >
                Shop Thekua
              </button>
            </li>

            <li>
              <button
                onClick={() => router.push("/collections")}
                className="transition hover:text-white"
              >
                Collections
              </button>
            </li>

            <li>
              <button
                onClick={() => router.push("/#our-story")}
                className="transition hover:text-white"
              >
                Our Story
              </button>
            </li>

            <li>
              <button
                onClick={() => router.push("/#gifting")}
                className="transition hover:text-white"
              >
                Gifting
              </button>
            </li>

            <li>
              <button
                onClick={() => router.push("/#b2b")}
                className="transition hover:text-white"
              >
                B2B
              </button>
            </li>

            <li>
              <button
                onClick={() => router.push("/#journal")}
                className="transition hover:text-white"
              >
                Journal
              </button>
            </li>
          </ul>
        </div>

        {/* Customer Care */}
        <div>
          <h2 className="mb-5 font-medium text-white">Customer Care</h2>

          <ul className="space-y-3 text-sm text-[#D8CABB]">
            <li>
              <button
                onClick={() => router.push("/contact")}
                className="transition hover:text-white"
              >
                Contact Us
              </button>
            </li>

            <li>
              <button
                onClick={() => router.push("/faq")}
                className="transition hover:text-white"
              >
                FAQ
              </button>
            </li>

            <li>
              <button
                onClick={() => router.push("/shipping-delivery")}
                className="transition hover:text-white"
              >
                Shipping & Delivery
              </button>
            </li>

            <li>
              <button
                onClick={() => router.push("/returns-refunds")}
                className="transition hover:text-white"
              >
                Returns & Refunds
              </button>
            </li>

            <li>
              <button
                onClick={() => router.push("/order-support")}
                className="transition hover:text-white"
              >
                Order Support
              </button>
            </li>
          </ul>
        </div>

        {/* Get in Touch */}
        <div>
          <h2 className="mb-5 font-medium text-white">Get in Touch</h2>

          <div className="space-y-4 text-sm text-[#D8CABB]">
            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-[#A99483]">
                Phone
              </p>

              <a
                href="tel:+916205270749"
                className="mt-1 inline-block transition hover:text-white"
              >
                +91 6205270749
              </a>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-[#A99483]">
                Email
              </p>

              <a
                href="mailto:princeraj12450@gmail.com"
                className="mt-1 inline-block transition hover:text-white"
              >
                princeraj12450@gmail.com
              </a>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-[#A99483]">
                Based in
              </p>

              <p className="mt-1">Mithila, India</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-[#6B5040] px-6 py-5">
        <div className="flex flex-col items-center justify-between gap-2 text-center md:flex-row md:text-left">
          <p className="text-xs text-[#CDBBAA] md:text-sm">
            © 2026 Mithila. All rights reserved.
          </p>

          <p className="text-xs text-[#A99483]">
            Traditional taste. Thoughtfully crafted.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
