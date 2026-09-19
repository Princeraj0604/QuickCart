"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ReturnsRefunds = () => {
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
                            Returns & Refunds
                        </h1>

                        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[#66574D] md:text-lg">
                            Information about returns, refunds, damaged
                            products, and order-related assistance.
                        </p>

                    </div>
                </section>

                {/* Main Content */}
                <section className="mx-auto max-w-4xl px-6 py-16 md:px-10 md:py-20">

                    <div className="space-y-10">

                        {/* Return Policy */}
                        <div>
                            <h2 className="font-serif text-3xl text-[#2F241D]">
                                Return Policy
                            </h2>

                            <p className="mt-4 text-sm leading-7 text-[#66574D]">
                                Returns may be accepted depending on the
                                condition of the product, order status, and
                                reason for the return. Please contact our team
                                as soon as possible if you need assistance
                                with a return request.
                            </p>
                        </div>

                        {/* Damaged Product */}
                        <div>
                            <h2 className="font-serif text-3xl text-[#2F241D]">
                                Damaged or Incorrect Product
                            </h2>

                            <p className="mt-4 text-sm leading-7 text-[#66574D]">
                                If your order arrives damaged, incorrect, or
                                incomplete, please contact us with your order
                                details. Our team will review the issue and
                                guide you through the next steps.
                            </p>
                        </div>

                        {/* Refund Eligibility */}
                        <div>
                            <h2 className="font-serif text-3xl text-[#2F241D]">
                                Refund Eligibility
                            </h2>

                            <p className="mt-4 text-sm leading-7 text-[#66574D]">
                                Refund eligibility depends on the specific
                                situation and the applicable order policy.
                                Once a refund request is reviewed and
                                approved, the refund process will be started
                                according to the applicable payment method.
                            </p>
                        </div>

                        {/* Refund Processing */}
                        <div>
                            <h2 className="font-serif text-3xl text-[#2F241D]">
                                Refund Processing
                            </h2>

                            <p className="mt-4 text-sm leading-7 text-[#66574D]">
                                After an approved refund, the time required
                                for the amount to appear in your account can
                                depend on the payment method and financial
                                institution.
                            </p>
                        </div>

                        {/* Cancellation */}
                        <div>
                            <h2 className="font-serif text-3xl text-[#2F241D]">
                                Order Cancellation
                            </h2>

                            <p className="mt-4 text-sm leading-7 text-[#66574D]">
                                If you want to cancel an order, please contact
                                us as soon as possible. Cancellation may
                                depend on whether the order has already been
                                processed or dispatched.
                            </p>
                        </div>

                        {/* Exchange */}
                        <div>
                            <h2 className="font-serif text-3xl text-[#2F241D]">
                                Exchanges
                            </h2>

                            <p className="mt-4 text-sm leading-7 text-[#66574D]">
                                Product exchanges may depend on the product
                                condition and the reason for the request.
                                Please contact our customer support team for
                                assistance.
                            </p>
                        </div>

                        {/* Contact */}
                        <div>
                            <h2 className="font-serif text-3xl text-[#2F241D]">
                                Need Help With a Return?
                            </h2>

                            <p className="mt-4 text-sm leading-7 text-[#66574D]">
                                Please keep your order details available when
                                contacting us. This helps our team understand
                                your request and provide the appropriate
                                assistance.
                            </p>
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
                            Need assistance with your order?
                        </h2>

                        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#D8CABB]">
                            Contact our team with your order details and we
                            will help you with your request.
                        </p>

                        <a
                            href="/contact"
                            className="mt-7 inline-flex rounded-full bg-white px-7 py-3 text-sm font-medium text-[#6B3F24] transition hover:bg-[#F4EFE6]"
                        >
                            Contact Us
                        </a>

                    </div>
                </section>

            </main>

            <Footer />
        </>
    );
};

export default ReturnsRefunds;