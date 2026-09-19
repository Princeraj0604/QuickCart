"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ShippingDelivery = () => {
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
                            Shipping & Delivery
                        </h1>

                        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[#66574D] md:text-lg">
                            Everything you need to know about how your MITHILA
                            Thekua order is packed, shipped, and delivered.
                        </p>

                    </div>
                </section>

                {/* Content */}
                <section className="mx-auto max-w-4xl px-6 py-16 md:px-10 md:py-20">

                    <div className="space-y-10">

                        {/* Order Processing */}
                        <div>
                            <h2 className="font-serif text-3xl text-[#2F241D]">
                                Order Processing
                            </h2>

                            <p className="mt-4 text-sm leading-7 text-[#66574D]">
                                Once your order is successfully placed, we
                                begin preparing it for dispatch. Orders are
                                carefully packed before being handed over to
                                the delivery partner.
                            </p>
                        </div>

                        {/* Delivery Time */}
                        <div>
                            <h2 className="font-serif text-3xl text-[#2F241D]">
                                Delivery Time
                            </h2>

                            <p className="mt-4 text-sm leading-7 text-[#66574D]">
                                Delivery time can vary depending on your
                                location, product availability, and the
                                delivery partner. The estimated delivery
                                information shown during checkout should be
                                considered the primary reference for your
                                order.
                            </p>
                        </div>

                        {/* Shipping Charges */}
                        <div>
                            <h2 className="font-serif text-3xl text-[#2F241D]">
                                Shipping Charges
                            </h2>

                            <p className="mt-4 text-sm leading-7 text-[#66574D]">
                                Applicable shipping charges, if any, will be
                                displayed during the checkout process before
                                you place your order.
                            </p>
                        </div>

                        {/* Order Tracking */}
                        <div>
                            <h2 className="font-serif text-3xl text-[#2F241D]">
                                Order Tracking
                            </h2>

                            <p className="mt-4 text-sm leading-7 text-[#66574D]">
                                Once your order has been dispatched, tracking
                                information may be made available through the
                                order details or delivery partner. You can
                                also check your order status from the{" "}
                                <span className="font-medium text-[#6B3F24]">
                                    My Orders
                                </span>{" "}
                                section of your account.
                            </p>
                        </div>

                        {/* Delivery Address */}
                        <div>
                            <h2 className="font-serif text-3xl text-[#2F241D]">
                                Delivery Address
                            </h2>

                            <p className="mt-4 text-sm leading-7 text-[#66574D]">
                                Please make sure that your delivery address,
                                phone number, and other required details are
                                correct before placing your order. Incorrect
                                or incomplete information may affect delivery.
                            </p>
                        </div>

                        {/* Delayed Orders */}
                        <div>
                            <h2 className="font-serif text-3xl text-[#2F241D]">
                                Delayed Delivery
                            </h2>

                            <p className="mt-4 text-sm leading-7 text-[#66574D]">
                                Delivery may occasionally take longer because
                                of weather conditions, transportation issues,
                                high order volumes, or other circumstances
                                outside our control.
                            </p>
                        </div>

                        {/* Damaged Package */}
                        <div>
                            <h2 className="font-serif text-3xl text-[#2F241D]">
                                Damaged or Incorrect Delivery
                            </h2>

                            <p className="mt-4 text-sm leading-7 text-[#66574D]">
                                If you receive a damaged, incorrect, or
                                incomplete order, please contact us as soon as
                                possible through our Contact Us page with your
                                order details so that our team can assist you.
                            </p>
                        </div>

                    </div>

                </section>

                {/* Contact CTA */}
                <section className="border-t border-[#E9DFD0] bg-[#2F241D]">
                    <div className="mx-auto max-w-4xl px-6 py-16 text-center md:px-10">

                        <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#D8CABB]">
                            Need Help?
                        </p>

                        <h2 className="mt-3 font-serif text-3xl text-white md:text-4xl">
                            Have a question about your delivery?
                        </h2>

                        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#D8CABB]">
                            If you need help with your order or delivery,
                            contact our team and we will be happy to assist
                            you.
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

export default ShippingDelivery;


