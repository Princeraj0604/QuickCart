"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const OrderSupport = () => {
    return (
        <>
            <Navbar />

            <main className="min-h-screen bg-white">

                {/* Hero */}
                <section className="border-b border-[#E9DFD0] bg-[#F4EFE6]">
                    <div className="mx-auto max-w-6xl px-6 py-20 text-center md:px-10 md:py-24">

                        <p className="text-xs font-medium uppercase tracking-[0.35em] text-[#8A5A32]">
                            Customer Care
                        </p>

                        <h1 className="mt-4 font-serif text-5xl leading-tight text-[#2F241D] md:text-6xl">
                            Order Support
                        </h1>

                        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[#66574D] md:text-lg">
                            Need help with an order? Find useful information
                            about order status, delivery, cancellation, and
                            other order-related questions.
                        </p>

                    </div>
                </section>

                {/* Main Content */}
                <section className="mx-auto max-w-4xl px-6 py-16 md:px-10 md:py-20">

                    <div className="space-y-10">

                        {/* Check Order */}
                        <div>
                            <h2 className="font-serif text-3xl text-[#2F241D]">
                                How Can I Check My Order?
                            </h2>

                            <p className="mt-4 text-sm leading-7 text-[#66574D]">
                                You can view your orders and check their
                                current status from the{" "}
                                <Link
                                    href="/my-orders"
                                    className="font-medium text-[#6B3F24] hover:underline"
                                >
                                    My Orders
                                </Link>{" "}
                                section of your account.
                            </p>
                        </div>

                        {/* Order Status */}
                        <div>
                            <h2 className="font-serif text-3xl text-[#2F241D]">
                                What Does My Order Status Mean?
                            </h2>

                            <p className="mt-4 text-sm leading-7 text-[#66574D]">
                                Your order status helps you understand the
                                current stage of your order. Depending on the
                                order, the status may change as it moves
                                through processing, dispatch, delivery, and
                                completion.
                            </p>
                        </div>

                        {/* Cancellation */}
                        <div>
                            <h2 className="font-serif text-3xl text-[#2F241D]">
                                Can I Cancel My Order?
                            </h2>

                            <p className="mt-4 text-sm leading-7 text-[#66574D]">
                                If you want to cancel an order, please contact
                                us as soon as possible. Cancellation may depend
                                on whether your order has already been
                                processed or dispatched.
                            </p>
                        </div>

                        {/* Delivery Delay */}
                        <div>
                            <h2 className="font-serif text-3xl text-[#2F241D]">
                                My Order Is Delayed
                            </h2>

                            <p className="mt-4 text-sm leading-7 text-[#66574D]">
                                Delivery times can sometimes be affected by
                                transportation issues, weather conditions,
                                high order volumes, or other circumstances.
                                Please check your order status first. If you
                                need further assistance, contact our team.
                            </p>
                        </div>

                        {/* Wrong Product */}
                        <div>
                            <h2 className="font-serif text-3xl text-[#2F241D]">
                                I Received the Wrong Product
                            </h2>

                            <p className="mt-4 text-sm leading-7 text-[#66574D]">
                                If the product you received does not match your
                                order, please contact us with your order
                                details. Our team will review the issue and
                                guide you through the next steps.
                            </p>
                        </div>

                        {/* Damaged Product */}
                        <div>
                            <h2 className="font-serif text-3xl text-[#2F241D]">
                                My Order Arrived Damaged
                            </h2>

                            <p className="mt-4 text-sm leading-7 text-[#66574D]">
                                If your package or product arrives damaged,
                                please contact us as soon as possible and
                                provide your order details so that our team can
                                assist you.
                            </p>
                        </div>

                        {/* Missing Item */}
                        <div>
                            <h2 className="font-serif text-3xl text-[#2F241D]">
                                An Item Is Missing From My Order
                            </h2>

                            <p className="mt-4 text-sm leading-7 text-[#66574D]">
                                If your order is incomplete or an expected
                                item is missing, please contact us with the
                                relevant order information. We will review the
                                order and help resolve the issue.
                            </p>
                        </div>

                        {/* Need Help */}
                        <div>
                            <h2 className="font-serif text-3xl text-[#2F241D]">
                                What Information Should I Provide?
                            </h2>

                            <p className="mt-4 text-sm leading-7 text-[#66574D]">
                                When contacting us about an order, please
                                provide your order details and clearly explain
                                the issue. This helps our team understand your
                                request and provide appropriate assistance.
                            </p>
                        </div>

                    </div>

                </section>

                {/* Quick Links */}
                <section className="border-t border-[#E9DFD0] bg-[#F4EFE6]">
                    <div className="mx-auto max-w-4xl px-6 py-14 md:px-10">

                        <div className="text-center">
                            <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#8A5A32]">
                                Helpful Links
                            </p>

                            <h2 className="mt-3 font-serif text-3xl text-[#2F241D] md:text-4xl">
                                Manage your order
                            </h2>
                        </div>

                        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">

                            <Link
                                href="/my-orders"
                                className="rounded-2xl border border-[#DCCFC0] bg-white p-6 text-center transition hover:-translate-y-1 hover:shadow-md"
                            >
                                <h3 className="font-serif text-xl text-[#2F241D]">
                                    My Orders
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-[#66574D]">
                                    View your orders and order status.
                                </p>
                            </Link>

                            <Link
                                href="/contact"
                                className="rounded-2xl border border-[#DCCFC0] bg-white p-6 text-center transition hover:-translate-y-1 hover:shadow-md"
                            >
                                <h3 className="font-serif text-xl text-[#2F241D]">
                                    Contact Us
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-[#66574D]">
                                    Contact our team for order assistance.
                                </p>
                            </Link>

                        </div>

                    </div>
                </section>

                {/* Contact CTA */}
                <section className="border-t border-[#E9DFD0] bg-[#2F241D]">
                    <div className="mx-auto max-w-4xl px-6 py-16 text-center md:px-10">

                        <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#D8CABB]">
                            Customer Support
                        </p>

                        <h2 className="mt-3 font-serif text-3xl text-white md:text-4xl">
                            Need help with your order?
                        </h2>

                        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#D8CABB]">
                            Tell us about your issue and our team will help
                            you with your order.
                        </p>

                        <Link
                            href="/contact"
                            className="mt-7 inline-flex rounded-full bg-white px-7 py-3 text-sm font-medium text-[#6B3F24] transition hover:bg-[#F4EFE6]"
                        >
                            Contact Us
                        </Link>

                    </div>
                </section>

            </main>

            <Footer />
        </>
    );
};

export default OrderSupport;