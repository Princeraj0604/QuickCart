"use client";

import React, { useEffect, useState } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { toast } from "react-hot-toast";

const ProductCard = ({ product }) => {
  const { currency, router, addToCart } = useAppContext();
  const { userId } = useAuth();

  const [isWishlisted, setIsWishlisted] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  const rating = product.rating > 0 ? product.rating : 4.5;

  const discount =
    product.price > product.offerPrice
      ? Math.round(
          ((product.price - product.offerPrice) / product.price) * 100
        )
      : 0;

  useEffect(() => {
    const checkWishlist = async () => {
      if (!userId) {
        setIsWishlisted(false);
        return;
      }

      try {
        const { data } = await axios.get("/api/wishlist/list");

        if (data.success) {
          const exists = data.products.some(
            (item) => item._id === product._id
          );

          setIsWishlisted(exists);
        }
      } catch (error) {
        console.error("Wishlist check error:", error);
      }
    };

    checkWishlist();
  }, [userId, product._id]);

  const handleProductClick = () => {
    router.push("/product/" + product._id);
    scrollTo(0, 0);
  };

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    await addToCart(product._id);
  };

  const handleWishlist = async (e) => {
  e.preventDefault();
  e.stopPropagation();

  if (!userId) {
    toast.error("Please sign in to use wishlist");
    return;
  }

  if (wishlistLoading) return;

  try {
    setWishlistLoading(true);

    const endpoint = isWishlisted
      ? "/api/wishlist/remove"
      : "/api/wishlist/add";

    const { data } = await axios.post(endpoint, {
      productId: product._id
    });

    if (data.success) {
      setIsWishlisted((prev) => !prev);

      toast.success(
        isWishlisted
          ? "Removed from wishlist"
          : "Added to wishlist"
      );
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.error("WISHLIST ERROR:", error);

    toast.error(
      error.response?.data?.message ||
      "Unable to update wishlist"
    );
  } finally {
    setWishlistLoading(false);
  }
};

  return (
    <div className="group w-full">
      <div
        onClick={handleProductClick}
        className="relative w-full cursor-pointer overflow-hidden rounded-2xl bg-[#F4EFE6]"
      >
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.images?.[0]}
            alt={product.name}
            width={800}
            height={800}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.bestSeller && (
              <span className="rounded-full bg-[#6B3F24] px-3 py-1.5 text-[10px] font-medium uppercase tracking-wider text-white">
                Best Seller
              </span>
            )}

            {product.newArrival && (
              <span className="rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-medium uppercase tracking-wider text-[#6B3F24] shadow-sm">
                New
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={handleWishlist}
            disabled={wishlistLoading}
            className={`absolute top-3 right-3 flex h-10 w-10 items-center justify-center rounded-full shadow-sm transition duration-300 hover:scale-105 ${
              isWishlisted
                ? "bg-[#6B3F24]"
                : "bg-white/95"
            }`}
            aria-label={
            isWishlisted
              ? "Remove from wishlist"
              : "Add to wishlist"
            }
          >
            <Image
              src={assets.heart_icon}
              alt="Wishlist"
              width={17}
              height={17}
              className={isWishlisted ? "brightness-0 invert" : ""}
            />
          </button>

          <button
            onClick={handleAddToCart}
            className="absolute bottom-3 left-3 right-3 translate-y-2 rounded-full bg-[#6B3F24] px-4 py-3 text-xs font-medium text-white opacity-0 shadow-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-[#2F241D]"
          >
            Add to Cart
          </button>
        </div>
      </div>

      <div className="pt-4">
        <p className="text-base font-medium text-[#2F241D] truncate">
          {product.name}
        </p>

        <p className="mt-1 text-xs leading-5 text-[#66574D] line-clamp-2 min-h-[40px]">
          {product.shortDescription || product.description}
        </p>

        <div className="flex items-center gap-2 mt-2">
          <span className="text-xs font-medium text-[#2F241D]">
            {rating.toFixed(1)}
          </span>

          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, index) => (
              <Image
                key={index}
                src={
                  index < Math.floor(rating)
                    ? assets.star_icon
                    : assets.star_dull_icon
                }
                alt=""
                width={12}
                height={12}
              />
            ))}
          </div>

          {product.reviewCount > 0 && (
            <span className="text-[11px] text-[#8A7A6D]">
              ({product.reviewCount})
            </span>
          )}
        </div>

        <div className="flex items-end justify-between gap-3 mt-3">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-base font-semibold text-[#6B3F24]">
              {currency}
              {product.offerPrice}
            </p>

            {product.price > product.offerPrice && (
              <>
                <p className="text-xs text-[#8A7A6D] line-through">
                  {currency}
                  {product.price}
                </p>

                <span className="text-[10px] font-medium text-[#8A5A32]">
                  {discount}% OFF
                </span>
              </>
            )}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleProductClick();
            }}
            className="hidden sm:inline-flex shrink-0 items-center rounded-full border border-[#6B3F24] px-4 py-1.5 text-xs font-medium text-[#6B3F24] transition duration-300 hover:bg-[#6B3F24] hover:text-white"
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;