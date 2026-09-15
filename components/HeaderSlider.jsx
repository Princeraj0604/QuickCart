"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const HeaderSlider = () => {
  const sliderData = [
    {
      id: 1,
      eyebrow: "THE MITHILA COLLECTION",
      title: "The Taste of Mithila, in Every Bite.",
      description:
        "Traditional Thekua crafted with timeless recipes, the warmth of jaggery, and the unmistakable character of Mithila.",
      buttonText: "Shop Thekua",
      imgSrc: "/images/thekua/hero-classic.png",
    },
    {
      id: 2,
      eyebrow: "CRAFTED WITH TRADITION",
      title: "A Timeless Tradition, Made for Today.",
      description:
        "Discover thoughtfully crafted Thekua inspired by the flavours, stories, and traditions passed down through Mithila.",
      buttonText: "Explore Collection",
      imgSrc: "/images/thekua/hero-premium.png",
    },
    {
      id: 3,
      eyebrow: "MADE TO SHARE",
      title: "A Little Taste of Mithila, Made to Share.",
      description:
        "From quiet tea-time moments to celebrations with loved ones, bring the warmth of Mithila to every table.",
      buttonText: "Shop Thekua",
      imgSrc: "/images/thekua/hero-gifting.png",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section className="w-full mt-5 md:mt-7">

      <div className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-[#F4EFE6]">

        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${currentSlide * 100}%)`,
          }}
        >

          {sliderData.map((slide) => (
            <div
              key={slide.id}
              className="min-w-full grid grid-cols-1 md:grid-cols-2 items-center min-h-[620px] md:min-h-[560px] lg:min-h-[620px]"
            >

              <div className="order-2 md:order-1 px-6 py-12 sm:px-10 md:px-12 lg:px-16 xl:px-20">

                <p className="text-xs md:text-sm tracking-[0.28em] uppercase text-[#8A5A32] font-medium">
                  {slide.eyebrow}
                </p>

                <h1 className="mt-4 max-w-xl font-serif text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.08] text-[#2F241D]">
                  {slide.title}
                </h1>

                <p className="max-w-lg mt-6 text-sm md:text-base lg:text-lg leading-7 md:leading-8 text-[#66574D]">
                  {slide.description}
                </p>

                <div className="flex items-center gap-4 mt-8">

                  <Link
                    href="/all-products"
                    className="inline-flex items-center justify-center rounded-full bg-[#6B3F24] px-7 md:px-8 py-3.5 text-sm font-medium text-white transition duration-300 hover:bg-[#2F241D]"
                  >
                    {slide.buttonText}
                  </Link>

                  <Link
                    href="/all-products"
                    className="hidden sm:inline-flex items-center justify-center rounded-full border border-[#6B3F24] px-7 md:px-8 py-3.5 text-sm font-medium text-[#6B3F24] transition duration-300 hover:bg-white"
                  >
                    View Collection
                  </Link>

                </div>

                <div className="flex items-center gap-6 mt-10">

                  <div>
                    <p className="text-xs uppercase tracking-wider text-[#8A5A32]">
                      Inspired by
                    </p>
                    <p className="mt-1 text-sm font-medium text-[#2F241D]">
                      Mithila Tradition
                    </p>
                  </div>

                  <div className="h-8 w-px bg-[#CDBEAE]" />

                  <div>
                    <p className="text-xs uppercase tracking-wider text-[#8A5A32]">
                      Crafted for
                    </p>
                    <p className="mt-1 text-sm font-medium text-[#2F241D]">
                      Everyday Moments
                    </p>
                  </div>

                </div>

              </div>

              <div className="order-1 md:order-2 relative w-full h-[320px] sm:h-[380px] md:h-[560px] lg:h-[620px] overflow-hidden">

                <Image
                  src={slide.imgSrc}
                  alt={slide.title}
                  fill
                  priority={slide.id === 1}
                  className="object-contain p-4 sm:p-6 md:p-8 lg:p-10"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />

              </div>

            </div>
          ))}

        </div>

        <div className="absolute bottom-6 left-6 sm:left-10 md:left-12 lg:left-16 flex items-center gap-2">

          {sliderData.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => handleSlideChange(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? "w-9 bg-[#6B3F24]"
                  : "w-2 bg-[#6B3F24]/30 hover:bg-[#6B3F24]/60"
              }`}
            />
          ))}

        </div>

        <div className="absolute bottom-5 right-6 sm:right-10 md:right-12 lg:right-16 hidden sm:block">

          <span className="text-xs tracking-[0.2em] text-[#8A5A32]">
            0{currentSlide + 1} / 0{sliderData.length}
          </span>

        </div>

      </div>

    </section>
  );
};

export default HeaderSlider;