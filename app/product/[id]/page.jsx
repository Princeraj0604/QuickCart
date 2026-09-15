"use client";

import React, { useEffect, useState } from "react";
import { assets } from "@/assets/assets";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { toast } from "react-hot-toast";
import Loading from "@/components/Loading";
import { useAppContext } from "@/context/AppContext";

const Product = () => {
  const { id } = useParams();

  const { products, router, addToCart, currency } = useAppContext();

  const { user } = useUser();

  const [mainImage, setMainImage] = useState(null);
  const [productData, setProductData] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [reviewLoading, setReviewLoading] = useState(true);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);

  const fetchReviews = async () => {
    if (!id) return;

    try {
      setReviewLoading(true);

      const { data } = await axios.get(`/api/review/list?productId=${id}`);

      if (data.success) {
        setReviews(data.reviews);
      }
    } catch (error) {
      console.error("REVIEW FETCH ERROR:", error);
    } finally {
      setReviewLoading(false);
    }
  };

  useEffect(() => {
    const product = products.find((product) => product._id === id);
    setProductData(product);
  }, [id, products]);

  useEffect(() => {
    fetchReviews();
  }, [id]);

  useEffect(() => {
    setMainImage(null);
    setQuantity(1);
  }, [id]);

  if (!productData) {
    return <Loading />;
  }

  const rating = productData.rating > 0 ? productData.rating : 4.5;
  const reviewCount = productData.reviewCount || 0;

  const discount =
    productData.price > productData.offerPrice
      ? Math.round(
          ((productData.price - productData.offerPrice) / productData.price) *
            100,
        )
      : 0;

  const savings =
    productData.price > productData.offerPrice
      ? productData.price - productData.offerPrice
      : 0;

  const handleAddToCart = async () => {
    for (let i = 0; i < quantity; i++) {
      await addToCart(productData._id);
    }
  };

  const handleBuyNow = async () => {
    for (let i = 0; i < quantity; i++) {
      await addToCart(productData._id);
    }

    router.push("/cart");
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please sign in to write a review");
      return;
    }

    if (!reviewComment.trim()) {
      toast.error("Please write a review");
      return;
    }

    try {
      setSubmittingReview(true);

      const { data } = await axios.post(
        "/api/review/add",
        {
          productId: productData._id,
          rating: reviewRating,
          comment: reviewComment.trim(),
        },
        {
          headers: {
            "x-user-name": user.fullName || user.firstName || "Customer",
          },
        },
      );

      if (data.success) {
        toast.success("Review added successfully");

        setReviewComment("");
        setReviewRating(5);

        await fetchReviews();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setSubmittingReview(false);
    }
  };

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  return (
    <>
      <Navbar />

      <main className="px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-32 pt-8 md:pt-12">
        {/* Product Section */}

        <section>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Product Images */}

            <div>
              <div className="relative w-full aspect-square overflow-hidden rounded-3xl bg-[#F4EFE6]">
                {discount > 0 && (
                  <span className="absolute top-4 left-4 z-10 rounded-full bg-[#6B3F24] px-4 py-2 text-xs font-medium text-white">
                    {discount}% OFF
                  </span>
                )}

                {productData.bestSeller && (
                  <span className="absolute top-4 right-4 z-10 rounded-full bg-white/95 px-4 py-2 text-xs font-medium uppercase tracking-wider text-[#6B3F24] shadow-sm">
                    Best Seller
                  </span>
                )}

                <Image
                  src={mainImage || productData.images?.[0]}
                  alt={productData.name}
                  fill
                  className="object-cover transition duration-500"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>

              {/* Thumbnails */}

              {productData.images?.length > 1 && (
                <div className="grid grid-cols-4 gap-3 mt-4">
                  {productData.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setMainImage(image)}
                      className={`relative aspect-square overflow-hidden rounded-xl bg-[#F4EFE6] border-2 transition duration-300 ${
                        (mainImage || productData.images?.[0]) === image
                          ? "border-[#6B3F24]"
                          : "border-transparent hover:border-[#D8CABC]"
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${productData.name} ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="120px"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Information */}

            <div className="flex flex-col">
              <p className="text-xs md:text-sm tracking-[0.25em] uppercase text-[#8A5A32] font-medium">
                MITHILA THEKUA
              </p>

              <h1 className="mt-3 font-serif text-3xl md:text-4xl lg:text-5xl leading-tight text-[#2F241D]">
                {productData.name}
              </h1>

              <p className="mt-3 text-sm text-[#8A7A6D]">
                {productData.category}
                {productData.subcategory ? ` · ${productData.subcategory}` : ""}
              </p>

              {/* Rating */}

              <div className="flex items-center gap-3 mt-5">
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
                      width={15}
                      height={15}
                    />
                  ))}
                </div>

                <span className="text-sm text-[#66574D]">
                  {rating.toFixed(1)}
                  {reviewCount > 0
                    ? ` (${reviewCount} reviews)`
                    : " (New product)"}
                </span>
              </div>

              {/* Short Description */}

              <p className="mt-5 text-sm md:text-base leading-7 text-[#66574D]">
                {productData.shortDescription || productData.description}
              </p>

              {/* Price */}

              <div className="flex flex-wrap items-end gap-3 mt-7">
                <span className="text-3xl md:text-4xl font-semibold text-[#6B3F24]">
                  {currency}
                  {productData.offerPrice}
                </span>

                {productData.price > productData.offerPrice && (
                  <span className="text-lg text-[#8A7A70] line-through mb-1">
                    {currency}
                    {productData.price}
                  </span>
                )}

                {discount > 0 && (
                  <span className="mb-1 rounded-full bg-[#F4EFE6] px-3 py-1 text-xs font-medium text-[#8A5A32]">
                    {discount}% OFF
                  </span>
                )}
              </div>

              {savings > 0 && (
                <p className="mt-2 text-sm font-medium text-[#8A5A32]">
                  You save {currency}
                  {savings}
                </p>
              )}

              <div className="h-px bg-[#E9DFD0] my-7" />

              {/* Product Information */}

              <div className="grid grid-cols-2 gap-x-6 gap-y-5">
                <div>
                  <p className="text-xs uppercase tracking-wider text-[#8A7A70]">
                    Category
                  </p>

                  <p className="mt-1 text-sm font-medium text-[#2F241D]">
                    {productData.category}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wider text-[#8A7A70]">
                    Pack Size
                  </p>

                  <p className="mt-1 text-sm font-medium text-[#2F241D]">
                    {productData.packSize || "Standard Pack"}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wider text-[#8A7A70]">
                    Shelf Life
                  </p>

                  <p className="mt-1 text-sm font-medium text-[#2F241D]">
                    {productData.shelfLife || "As mentioned on pack"}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wider text-[#8A7A70]">
                    Availability
                  </p>

                  <p className="mt-1 text-sm font-medium text-[#2F241D]">
                    Available
                  </p>
                </div>
              </div>

              {/* Quantity */}

              <div className="mt-8">
                <p className="text-sm font-medium text-[#2F241D]">Quantity</p>

                <div className="inline-flex items-center mt-3 rounded-full border border-[#D8CABC] overflow-hidden">
                  <button
                    onClick={decreaseQuantity}
                    className="flex h-11 w-11 items-center justify-center text-lg text-[#6B3F24] transition hover:bg-[#F4EFE6]"
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>

                  <span className="flex h-11 min-w-12 items-center justify-center border-x border-[#D8CABC] text-sm font-medium text-[#2F241D]">
                    {quantity}
                  </span>

                  <button
                    onClick={increaseQuantity}
                    className="flex h-11 w-11 items-center justify-center text-lg text-[#6B3F24] transition hover:bg-[#F4EFE6]"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}

              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <button
                  onClick={handleAddToCart}
                  className="w-full rounded-full border border-[#6B3F24] py-3.5 text-sm font-medium text-[#6B3F24] transition duration-300 hover:bg-[#F4EFE6]"
                >
                  Add to Cart
                </button>

                <button
                  onClick={handleBuyNow}
                  className="w-full rounded-full bg-[#6B3F24] py-3.5 text-sm font-medium text-white transition duration-300 hover:bg-[#2F241D]"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Product Story */}

        <section className="mt-16 md:mt-20 border-t border-[#E9DFD0] pt-10">
          <div className="max-w-4xl">
            <p className="text-xs tracking-[0.25em] uppercase text-[#8A5A32] font-medium">
              FROM THE MITHILA KITCHEN
            </p>

            <h2 className="mt-2 font-serif text-3xl md:text-4xl text-[#2F241D]">
              About This Thekua
            </h2>

            <p className="mt-5 text-sm md:text-base leading-8 text-[#66574D]">
              {productData.description}
            </p>
          </div>

          {/* Product Details */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            <div className="rounded-2xl bg-[#F4EFE6] p-6">
              <h3 className="font-medium text-[#2F241D]">Ingredients</h3>

              <p className="mt-3 text-sm leading-6 text-[#66574D]">
                {productData.ingredients?.length
                  ? productData.ingredients.join(", ")
                  : "Ingredients information will be provided with the product."}
              </p>
            </div>

            <div className="rounded-2xl bg-[#F4EFE6] p-6">
              <h3 className="font-medium text-[#2F241D]">Allergens</h3>

              <p className="mt-3 text-sm leading-6 text-[#66574D]">
                {productData.allergens?.length
                  ? productData.allergens.join(", ")
                  : "Please check the product packaging for allergen information."}
              </p>
            </div>

            <div className="rounded-2xl bg-[#F4EFE6] p-6">
              <h3 className="font-medium text-[#2F241D]">Storage</h3>

              <p className="mt-3 text-sm leading-6 text-[#66574D]">
                {productData.storageInstructions ||
                  "Store in a cool and dry place and keep the pack sealed after opening."}
              </p>
            </div>
          </div>
        </section>

        {/* Reviews */}
        {/* Reviews */}

        <section className="border-t border-[#E9DFD0] pt-12 md:pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
            {/* Review Summary */}

            <div>
              <p className="text-xs tracking-[0.25em] uppercase text-[#8A5A32] font-medium">
                CUSTOMER REVIEWS
              </p>

              <h2 className="mt-2 font-serif text-3xl md:text-4xl text-[#2F241D]">
                What Customers Say
              </h2>

              <div className="flex items-center gap-3 mt-6">
                <span className="text-4xl font-semibold text-[#2F241D]">
                  {productData.rating > 0
                    ? productData.rating.toFixed(1)
                    : "0.0"}
                </span>

                <div>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Image
                        key={index}
                        src={
                          productData.rating > 0 &&
                          index < Math.floor(productData.rating)
                            ? assets.star_icon
                            : assets.star_dull_icon
                        }
                        alt=""
                        width={16}
                        height={16}
                      />
                    ))}
                  </div>

                  <p className="mt-1 text-xs text-[#8A7A6D]">
                    {reviews.length} review{reviews.length !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>
            </div>

            {/* Review Form */}

            <div className="lg:col-span-2">
              <div className="rounded-2xl border border-[#E9DFD0] bg-[#F4EFE6] p-6 md:p-8">
                <h3 className="text-xl font-medium text-[#2F241D]">
                  Write a Review
                </h3>

                <p className="mt-2 text-sm text-[#66574D]">
                  Share your experience with this Thekua.
                </p>

                {!user ? (
                  <button
                    type="button"
                    onClick={() => router.push("/sign-in")}
                    className="mt-6 rounded-full bg-[#6B3F24] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#2F241D]"
                  >
                    Sign In to Review
                  </button>
                ) : (
                  <form onSubmit={handleSubmitReview} className="mt-6">
                    <p className="text-sm font-medium text-[#2F241D]">
                      Your Rating
                    </p>

                    <div className="flex items-center gap-2 mt-3">
                      {Array.from({ length: 5 }).map((_, index) => {
                        const starNumber = index + 1;

                        return (
                          <button
                            key={starNumber}
                            type="button"
                            onClick={() => setReviewRating(starNumber)}
                            className="transition hover:scale-110"
                            aria-label={`Rate ${starNumber} stars`}
                          >
                            <Image
                              src={
                                starNumber <= reviewRating
                                  ? assets.star_icon
                                  : assets.star_dull_icon
                              }
                              alt=""
                              width={22}
                              height={22}
                            />
                          </button>
                        );
                      })}
                    </div>

                    <textarea
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      placeholder="Write your review..."
                      maxLength={500}
                      rows={5}
                      className="mt-5 w-full resize-none rounded-xl border border-[#D8CABC] bg-white px-4 py-3 text-sm text-[#2F241D] outline-none transition focus:border-[#6B3F24]"
                    />

                    <div className="flex items-center justify-between gap-4 mt-3">
                      <span className="text-xs text-[#8A7A6D]">
                        {reviewComment.length}/500
                      </span>

                      <button
                        type="submit"
                        disabled={submittingReview}
                        className="rounded-full bg-[#6B3F24] px-7 py-3 text-sm font-medium text-white transition hover:bg-[#2F241D] disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {submittingReview ? "Submitting..." : "Submit Review"}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Review List */}

          <div className="mt-12 md:mt-16">
            <h3 className="text-xl font-medium text-[#2F241D]">
              Customer Reviews
            </h3>

            {reviewLoading ? (
              <div className="mt-6 space-y-4">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="h-28 animate-pulse rounded-2xl bg-[#F4EFE6]"
                  />
                ))}
              </div>
            ) : reviews.length === 0 ? (
              <div className="mt-6 rounded-2xl bg-[#F4EFE6] p-8 text-center">
                <p className="text-sm font-medium text-[#2F241D]">
                  No reviews yet
                </p>

                <p className="mt-2 text-sm text-[#66574D]">
                  Be the first to share your experience.
                </p>
              </div>
            ) : (
              <div className="mt-6 space-y-4">
                {reviews.map((review) => (
                  <div
                    key={review._id}
                    className="rounded-2xl border border-[#E9DFD0] bg-white p-5 md:p-6"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div>
                        <p className="text-sm font-medium text-[#2F241D]">
                          {review.userName}
                        </p>

                        <div className="flex items-center gap-0.5 mt-2">
                          {Array.from({ length: 5 }).map((_, index) => (
                            <Image
                              key={index}
                              src={
                                index < review.rating
                                  ? assets.star_icon
                                  : assets.star_dull_icon
                              }
                              alt=""
                              width={13}
                              height={13}
                            />
                          ))}
                        </div>
                      </div>

                      <span className="text-xs text-[#8A7A6D]">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <p className="mt-4 text-sm leading-7 text-[#66574D]">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Related Products */}

        <section className="py-16 md:py-20">
          <div className="text-center">
            <p className="text-xs tracking-[0.25em] uppercase text-[#8A5A32] font-medium">
              YOU MAY ALSO LIKE
            </p>

            <h2 className="mt-2 font-serif text-3xl md:text-4xl text-[#2F241D]">
              Explore More Thekua
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 md:gap-6 mt-10">
            {products
              .filter((product) => product._id !== productData._id)
              .slice(0, 5)
              .map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>

          {products.length > 1 && (
            <div className="flex justify-center mt-10">
              <button
                onClick={() => router.push("/all-products")}
                className="rounded-full border border-[#6B3F24] px-7 py-3 text-sm font-medium text-[#6B3F24] transition hover:bg-[#6B3F24] hover:text-white"
              >
                Explore All Thekua
              </button>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Product;
