"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { assets } from "@/assets/assets";

const blogs = [
  {
    id: 1,
    image: assets.girl_with_headphone_image,
    title: "How to Choose the Right Headphones",
    description:
      "Discover the important features to consider when choosing headphones for music, work, gaming, and everyday use.",
    fullDescription:
      "Choosing the right headphones depends on your daily needs, comfort, sound quality, battery life, and connectivity. In this guide, we explain the key things you should consider before buying headphones. From wireless connectivity and battery performance to audio quality and comfort, understanding these features can help you make a better decision.",
  },
  {
    id: 2,
    image: assets.girl_with_earphone_image,
    title: "Wireless Earbuds: What You Should Know",
    description:
      "Learn about the most important features of modern wireless earbuds and how they can improve your everyday listening experience.",
    fullDescription:
      "Wireless earbuds have become an important part of everyday life. They are compact, easy to carry, and provide a convenient listening experience. Before choosing a pair, you should consider sound quality, battery life, charging speed, comfort, Bluetooth connectivity, and microphone quality. This article explains these features in simple terms.",
  },
  {
    id: 3,
    image: assets.boy_with_laptop_image,
    title: "How to Choose a Laptop for Your Needs",
    description:
      "From students to professionals and gamers, learn what specifications matter when choosing your next laptop.",
    fullDescription:
      "Choosing a laptop can be difficult because there are many specifications to compare. Processor performance, RAM, storage, display quality, battery life, and portability all play an important role. Students may prefer a lightweight laptop with good battery life, while professionals and gamers may need more powerful hardware. This guide will help you understand the major specifications before making a decision.",
  },
];

const FeaturedProduct = () => {
  const router = useRouter();

  const handleLearnMore = (blog) => {
    const blogData = encodeURIComponent(JSON.stringify(blog));

    router.push(`/shop?blog=${blogData}`);
  };

  return (
    <div className="mt-14">
      <div className="flex flex-col items-center">
        <p className="text-3xl font-medium">Latest From Our Blog</p>

        <div className="w-28 h-0.5 bg-orange-600 mt-2"></div>

        <p className="text-gray-500 text-center max-w-2xl mt-4">
          Discover useful guides, product insights, and helpful tips from our
          company.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-14 mt-12 md:px-14 px-4">
        {blogs.map((blog) => (
          <div key={blog.id} className="relative group overflow-hidden">
            <Image
              src={blog.image}
              alt={blog.title}
              className="group-hover:brightness-75 transition duration-300 w-full h-auto object-cover"
            />

            <div className="group-hover:-translate-y-4 transition duration-300 absolute bottom-8 left-8 text-white space-y-2">
              <p className="font-medium text-xl lg:text-2xl">
                {blog.title}
              </p>

              <p className="text-sm lg:text-base leading-5 max-w-72">
                {blog.description}
              </p>

              <button
                onClick={() => handleLearnMore(blog)}
                className="flex items-center gap-1.5 bg-orange-600 px-4 py-2 rounded hover:bg-orange-700 transition"
              >
                Learn More

                <Image
                  className="h-3 w-3"
                  src={assets.redirect_icon}
                  alt="Redirect Icon"
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProduct;

