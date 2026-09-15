"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-hot-toast";
import Loading from "@/components/Loading";

const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const [totalReviews, setTotalReviews] = useState(0);
    const [averageRating, setAverageRating] = useState(0);
    const [loading, setLoading] = useState(true);

    const fetchReviews = async () => {
        try {
            const { data } = await axios.get("/api/seller/reviews");

            if (data.success) {
                setReviews(data.reviews);
                setTotalReviews(data.totalReviews);
                setAverageRating(data.averageRating);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    const formatDate = (date) => {
        if (!date) return "—";

        return new Date(date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
    };

    const renderStars = (rating) => {
        return (
            <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <span
                        key={star}
                        className={
                            star <= rating
                                ? "text-[#8A5A32]"
                                : "text-[#D8CEC2]"
                        }
                    >
                        ★
                    </span>
                ))}
            </div>
        );
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="flex-1 min-h-screen bg-[#FAF8F4] p-4 md:p-8">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

                <div>
                    <p className="text-sm text-[#8A5A32] font-medium mb-1">
                        MITHILA
                    </p>

                    <h1 className="text-2xl md:text-3xl font-medium text-[#2F241D]">
                        Reviews
                    </h1>

                    <p className="text-sm text-[#66574D] mt-1">
                        Manage customer feedback and product ratings.
                    </p>
                </div>

                <Link
                    href="/seller"
                    className="w-fit px-5 py-2.5 bg-[#6B3F24] text-white text-sm rounded-md hover:bg-[#56301C] transition"
                >
                    Back to Dashboard
                </Link>

            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">

                <div className="bg-white border border-[#E9DFD0] rounded-xl p-5">
                    <p className="text-sm text-[#66574D] mb-2">
                        Total Reviews
                    </p>

                    <h2 className="text-3xl font-medium text-[#2F241D]">
                        {totalReviews}
                    </h2>
                </div>

                <div className="bg-white border border-[#E9DFD0] rounded-xl p-5">
                    <p className="text-sm text-[#66574D] mb-2">
                        Average Rating
                    </p>

                    <div className="flex items-center gap-3">
                        <h2 className="text-3xl font-medium text-[#2F241D]">
                            {Number(averageRating).toFixed(1)}
                        </h2>

                        {renderStars(Math.round(averageRating))}
                    </div>
                </div>

            </div>

            {/* Empty State */}
            {reviews.length === 0 ? (
                <div className="bg-white border border-[#E9DFD0] rounded-xl py-20 text-center">

                    <h2 className="text-xl font-medium text-[#2F241D]">
                        No Reviews Yet
                    </h2>

                    <p className="text-sm text-[#66574D] mt-2">
                        Customer reviews will appear here after they submit
                        feedback.
                    </p>

                </div>
            ) : (
                <>
                    {/* Desktop */}
                    <div className="hidden lg:block bg-white border border-[#E9DFD0] rounded-xl overflow-hidden">

                        <div className="px-6 py-5 border-b border-[#E9DFD0]">
                            <h2 className="text-lg font-medium text-[#2F241D]">
                                Customer Feedback
                            </h2>
                        </div>

                        <div className="overflow-x-auto">

                            <table className="w-full text-sm">

                                <thead>
                                    <tr className="bg-[#F8F5EF] text-[#66574D]">

                                        <th className="text-left font-medium px-6 py-4">
                                            Customer
                                        </th>

                                        <th className="text-left font-medium px-6 py-4">
                                            Product
                                        </th>

                                        <th className="text-left font-medium px-6 py-4">
                                            Rating
                                        </th>

                                        <th className="text-left font-medium px-6 py-4">
                                            Review
                                        </th>

                                        <th className="text-left font-medium px-6 py-4">
                                            Date
                                        </th>

                                    </tr>
                                </thead>

                                <tbody>

                                    {reviews.map((review) => (

                                        <tr
                                            key={review._id}
                                            className="border-t border-[#E9DFD0] hover:bg-[#FCFAF7] transition"
                                        >

                                            {/* Customer */}
                                            <td className="px-6 py-5">

                                                <div className="flex items-center gap-3">

                                                    {review.userImage ? (
                                                        <Image
                                                            src={review.userImage}
                                                            alt={review.userName}
                                                            width={42}
                                                            height={42}
                                                            className="w-10 h-10 rounded-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-10 h-10 rounded-full bg-[#E9DFD0] flex items-center justify-center text-[#6B3F24] font-medium">
                                                            {review.userName
                                                                ?.charAt(0)
                                                                ?.toUpperCase() || "C"}
                                                        </div>
                                                    )}

                                                    <div className="max-w-[180px]">

                                                        <p className="font-medium text-[#2F241D] truncate">
                                                            {review.userName}
                                                        </p>

                                                        {review.userEmail && (
                                                            <p className="text-xs text-[#8A5A32] truncate">
                                                                {review.userEmail}
                                                            </p>
                                                        )}

                                                    </div>

                                                </div>

                                            </td>

                                            {/* Product */}
                                            <td className="px-6 py-5">

                                                {review.product ? (
                                                    <div className="flex items-center gap-3">

                                                        {review.product.images?.[0] ? (
                                                            <Image
                                                                src={review.product.images[0]}
                                                                alt={review.product.name}
                                                                width={48}
                                                                height={48}
                                                                className="w-12 h-12 rounded-lg object-cover border border-[#E9DFD0]"
                                                            />
                                                        ) : (
                                                            <div className="w-12 h-12 rounded-lg bg-[#F4EFE6]" />
                                                        )}

                                                        <div className="max-w-[180px]">

                                                            <p className="font-medium text-[#2F241D]">
                                                                {review.product.name}
                                                            </p>

                                                            <p className="text-xs text-[#66574D] mt-1">
                                                                {review.product.packSize ||
                                                                    review.product.category}
                                                            </p>

                                                        </div>

                                                    </div>
                                                ) : (
                                                    <span className="text-[#66574D]">
                                                        Product unavailable
                                                    </span>
                                                )}

                                            </td>

                                            {/* Rating */}
                                            <td className="px-6 py-5">
                                                {renderStars(review.rating)}

                                                <p className="text-xs text-[#66574D] mt-1">
                                                    {review.rating}/5
                                                </p>
                                            </td>

                                            {/* Review */}
                                            <td className="px-6 py-5 max-w-[320px]">
                                                <p className="text-[#66574D] leading-6">
                                                    {review.comment}
                                                </p>
                                            </td>

                                            {/* Date */}
                                            <td className="px-6 py-5 text-[#66574D] whitespace-nowrap">
                                                {formatDate(review.createdAt)}
                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        </div>

                    </div>

                    {/* Mobile / Tablet */}
                    <div className="lg:hidden space-y-4">

                        {reviews.map((review) => (

                            <div
                                key={review._id}
                                className="bg-white border border-[#E9DFD0] rounded-xl p-5"
                            >

                                {/* Customer */}
                                <div className="flex items-center gap-3">

                                    {review.userImage ? (
                                        <Image
                                            src={review.userImage}
                                            alt={review.userName}
                                            width={48}
                                            height={48}
                                            className="w-12 h-12 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-12 h-12 rounded-full bg-[#E9DFD0] flex items-center justify-center text-[#6B3F24] font-medium">
                                            {review.userName
                                                ?.charAt(0)
                                                ?.toUpperCase() || "C"}
                                        </div>
                                    )}

                                    <div className="min-w-0">

                                        <h2 className="font-medium text-[#2F241D] truncate">
                                            {review.userName}
                                        </h2>

                                        {review.userEmail && (
                                            <p className="text-xs text-[#66574D] truncate">
                                                {review.userEmail}
                                            </p>
                                        )}

                                    </div>

                                </div>

                                {/* Product */}
                                {review.product && (
                                    <div className="flex items-center gap-3 mt-5 p-3 bg-[#F8F5EF] rounded-lg">

                                        {review.product.images?.[0] ? (
                                            <Image
                                                src={review.product.images[0]}
                                                alt={review.product.name}
                                                width={56}
                                                height={56}
                                                className="w-14 h-14 rounded-lg object-cover"
                                            />
                                        ) : (
                                            <div className="w-14 h-14 rounded-lg bg-[#E9DFD0]" />
                                        )}

                                        <div className="min-w-0">

                                            <p className="font-medium text-[#2F241D] truncate">
                                                {review.product.name}
                                            </p>

                                            <p className="text-xs text-[#66574D] mt-1">
                                                {review.product.packSize ||
                                                    review.product.category}
                                            </p>

                                        </div>

                                    </div>
                                )}

                                {/* Rating */}
                                <div className="mt-5 flex items-center justify-between">

                                    <div>
                                        {renderStars(review.rating)}

                                        <p className="text-xs text-[#66574D] mt-1">
                                            {review.rating}/5
                                        </p>
                                    </div>

                                    <p className="text-xs text-[#66574D]">
                                        {formatDate(review.createdAt)}
                                    </p>

                                </div>

                                {/* Comment */}
                                <div className="mt-4 pt-4 border-t border-[#E9DFD0]">

                                    <p className="text-sm text-[#66574D] leading-6">
                                        {review.comment}
                                    </p>

                                </div>

                            </div>

                        ))}

                    </div>
                </>
            )}

        </div>
    );
};

export default Reviews;