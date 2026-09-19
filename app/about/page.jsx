"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-white">

        {/* Hero Section */}
        <section className="border-b border-[#E9DFD0] bg-[#F4EFE6]">
          <div className="mx-auto max-w-7xl px-6 py-20 text-center md:px-12 md:py-24 lg:px-16">

            <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#8A5A32]">
              About MITHILA
            </p>

            <h1 className="mx-auto mt-4 max-w-4xl font-serif text-4xl leading-tight text-[#2F241D] md:text-5xl lg:text-6xl">
              A Taste of Mithila, Crafted for Today
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[#66574D] md:text-lg">
              MITHILA brings the timeless taste of traditional Thekua to
              modern tables, celebrations, gifting moments, and everyday
              occasions.
            </p>

          </div>
        </section>

        {/* About Content */}
        <section className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-20 lg:px-16">

          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">

            {/* Brand Block */}
            <div className="flex justify-center">

              <div className="flex aspect-square w-full max-w-md items-center justify-center rounded-3xl bg-[#F4EFE6] border border-[#E9DFD0]">

                <div className="text-center">

                  <p className="font-serif text-5xl tracking-wide text-[#2F241D] md:text-6xl">
                    MITHILA
                  </p>

                  <div className="mx-auto mt-4 h-px w-20 bg-[#8A5A32]" />

                  <p className="mt-4 text-xs uppercase tracking-[0.3em] text-[#8A5A32]">
                    Traditional Thekua
                  </p>

                </div>

              </div>

            </div>

            {/* Text */}
            <div>

              <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#8A5A32]">
                Who We Are
              </p>

              <h2 className="mt-3 font-serif text-3xl leading-tight text-[#2F241D] md:text-4xl">
                Rooted in tradition, created for today
              </h2>

              <p className="mt-6 text-sm leading-7 text-[#66574D]">
                MITHILA is built around the timeless tradition of Thekua,
                a beloved sweet and snack from the Mithila region. Our
                approach brings this familiar taste into a modern
                ecommerce experience designed for everyday enjoyment,
                celebrations, and thoughtful gifting.
              </p>

              <p className="mt-4 text-sm leading-7 text-[#66574D]">
                From traditional favourites to carefully selected flavours
                and gifting options, MITHILA brings together a collection
                that celebrates the character of Thekua while keeping the
                shopping experience simple, clear, and contemporary.
              </p>

              <Link
                href="/all-products"
                className="mt-7 inline-flex rounded-full bg-[#6B3F24] px-7 py-3 text-sm font-medium text-white transition hover:bg-[#57321D]"
              >
                Explore Thekua
              </Link>

            </div>

          </div>

        </section>

        {/* Our Approach */}
        <section className="border-y border-[#E9DFD0] bg-[#FAF8F4] py-16 md:py-20">

          <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">

            <div className="mb-10 text-center">

              <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#8A5A32]">
                Our Approach
              </p>

              <h2 className="mt-3 font-serif text-3xl text-[#2F241D] md:text-4xl">
                What MITHILA stands for
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-[#66574D]">
                We focus on keeping the experience simple while respecting
                the traditional character of Thekua.
              </p>

            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

              {/* Tradition */}
              <div className="rounded-2xl border border-[#E9DFD0] bg-white p-7 text-center">

                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#F4EFE6] text-[#6B3F24]">
                  <span className="font-serif text-xl">
                    01
                  </span>
                </div>

                <h3 className="mt-5 font-serif text-2xl text-[#2F241D]">
                  Tradition
                </h3>

                <p className="mt-3 text-sm leading-6 text-[#66574D]">
                  Celebrating the familiar flavours, character, and cultural
                  roots of Mithila Thekua.
                </p>

              </div>

              {/* Craft */}
              <div className="rounded-2xl border border-[#E9DFD0] bg-white p-7 text-center">

                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#F4EFE6] text-[#6B3F24]">
                  <span className="font-serif text-xl">
                    02
                  </span>
                </div>

                <h3 className="mt-5 font-serif text-2xl text-[#2F241D]">
                  Thoughtful Craft
                </h3>

                <p className="mt-3 text-sm leading-6 text-[#66574D]">
                  Bringing together carefully presented Thekua selections
                  for different tastes, occasions, and moments.
                </p>

              </div>

              {/* Modern Experience */}
              <div className="rounded-2xl border border-[#E9DFD0] bg-white p-7 text-center">

                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#F4EFE6] text-[#6B3F24]">
                  <span className="font-serif text-xl">
                    03
                  </span>
                </div>

                <h3 className="mt-5 font-serif text-2xl text-[#2F241D]">
                  Modern Experience
                </h3>

                <p className="mt-3 text-sm leading-6 text-[#66574D]">
                  Making it easy to discover, shop, gift, and enjoy
                  traditional Thekua online.
                </p>

              </div>

            </div>

          </div>

        </section>

        {/* Collection Section */}
        <section className="mx-auto max-w-7xl px-6 py-16 text-center md:px-12 md:py-20 lg:px-16">

          <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#8A5A32]">
            Discover MITHILA
          </p>

          <h2 className="mt-3 font-serif text-3xl text-[#2F241D] md:text-4xl">
            Explore our collections
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-[#66574D]">
            Discover traditional favourites, premium selections, special
            variants, gifting options, and curated combinations.
          </p>

          <Link
            href="/collections"
            className="mt-7 inline-flex rounded-full border border-[#6B3F24] px-7 py-3 text-sm font-medium text-[#6B3F24] transition hover:bg-[#F4EFE6]"
          >
            View Collections
          </Link>

        </section>

      </main>

      <Footer />
    </>
  );
};

export default About;