"use client";

import React, { Suspense } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";

const ShopContent = () => {
  const searchParams = useSearchParams();

  const blogParam = searchParams.get("blog");

  if (!blogParam) {
    return (
      <>
        <Navbar />

        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-semibold text-gray-700">
              Blog Not Found
            </h1>

            <p className="text-gray-500 mt-2">
              Please select an article from our latest blogs.
            </p>
          </div>
        </div>
      </>
    );
  }

  let blog;

  try {
    blog = JSON.parse(decodeURIComponent(blogParam));
  } catch (error) {
    return (
      <>
        <Navbar />

        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-semibold text-gray-700">
              Something went wrong
            </h1>

            <p className="text-gray-500 mt-2">
              Unable to load this article.
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50 px-4 py-12 md:px-10 lg:px-32">
        <article className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm overflow-hidden">

          {/* Blog Image */}
          <div className="w-full">
            <Image
              src={blog.image}
              alt={blog.title}
              width={1280}
              height={720}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Blog Content */}
          <div className="px-6 py-8 md:px-12 md:py-12">

            <p className="text-sm text-orange-600 font-medium uppercase tracking-wide">
              Latest From Our Blog
            </p>

            <h1 className="text-3xl md:text-5xl font-semibold text-gray-800 mt-3">
              {blog.title}
            </h1>

            <div className="w-20 h-0.5 bg-orange-600 mt-5 mb-8"></div>

            <p className="text-lg text-gray-600 leading-8">
              {blog.description}
            </p>

            <div className="mt-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                About This Article
              </h2>

              <p className="text-gray-600 leading-8 text-base md:text-lg">
                {blog.fullDescription}
              </p>
            </div>

          </div>
        </article>
      </main>
    </>
  );
};

const Shop = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-gray-500">Loading...</p>
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
};

export default Shop;