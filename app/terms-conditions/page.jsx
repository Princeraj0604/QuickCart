"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const TermsConditions = () => {
    return (
        <>
            <Navbar />

            <main className="min-h-screen bg-white">

                {/* Hero */}
                <section className="border-b border-[#E9DFD0] bg-[#F4EFE6]">
                    <div className="mx-auto max-w-6xl px-6 py-20 text-center md:px-10 md:py-24">

                        <p className="text-xs font-medium uppercase tracking-[0.35em] text-[#8A5A32]">
                            Legal & Information
                        </p>

                        <h1 className="mt-4 font-sans text-5xl font-semibold leading-tight tracking-tight text-[#2F241D] md:text-6xl">
                            Terms & Conditions
                        </h1>

                        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[#66574D] md:text-lg">
                            Please read these terms carefully before using the
                            MITHILA website, placing an order, or using our
                            services.
                        </p>

                    </div>
                </section>

                {/* Terms Content */}
                <section className="mx-auto max-w-4xl px-6 py-16 md:px-10 md:py-20">

                    <div className="space-y-10">

                        {/* Introduction */}
                        <div>
                            <h2 className="font-sans text-3xl font-medium tracking-tight text-[#2F241D]">
                                1. Introduction
                            </h2>

                            <p className="mt-4 text-sm leading-7 text-[#66574D]">
                                These Terms & Conditions describe the general
                                terms that apply when you access or use the
                                MITHILA website and its services. By using the
                                website, you agree to follow these terms.
                            </p>
                        </div>

                        {/* Website Usage */}
                        <div>
                            <h2 className="font-sans text-3xl font-medium tracking-tight text-[#2F241D]">
                                2. Use of the Website
                            </h2>

                            <p className="mt-4 text-sm leading-7 text-[#66574D]">
                                You agree to use the website only for lawful
                                purposes and in a way that does not interfere
                                with the operation, security, or availability
                                of the website.
                            </p>
                        </div>

                        {/* Account */}
                        <div>
                            <h2 className="font-sans text-3xl font-medium tracking-tight text-[#2F241D]">
                                3. Account
                            </h2>

                            <p className="mt-4 text-sm leading-7 text-[#66574D]">
                                Certain features may require you to create or
                                use an account. You are responsible for
                                providing accurate information and for
                                maintaining the security of your account
                                credentials.
                            </p>
                        </div>

                        {/* Products */}
                        <div>
                            <h2 className="font-sans text-3xl font-medium tracking-tight text-[#2F241D]">
                                4. Products and Product Information
                            </h2>

                            <p className="mt-4 text-sm leading-7 text-[#66574D]">
                                We make reasonable efforts to present product
                                names, descriptions, images, prices, pack
                                sizes, and other product information accurately.
                                Product availability and displayed information
                                may change from time to time.
                            </p>
                        </div>

                        {/* Pricing */}
                        <div>
                            <h2 className="font-sans text-3xl font-medium tracking-tight text-[#2F241D]">
                                5. Pricing and Offers
                            </h2>

                            <p className="mt-4 text-sm leading-7 text-[#66574D]">
                                Product prices and offers displayed on the
                                website may change without prior notice.
                                Applicable prices are shown during the ordering
                                process.
                            </p>
                        </div>

                        {/* Orders */}
                        <div>
                            <h2 className="font-sans text-3xl font-medium tracking-tight text-[#2F241D]">
                                6. Orders
                            </h2>

                            <p className="mt-4 text-sm leading-7 text-[#66574D]">
                                When you place an order through the website,
                                you are providing a request to purchase the
                                selected products. Order information may be
                                stored and used for processing, fulfilment,
                                customer support, and order management.
                            </p>
                        </div>

                        {/* Cancellation */}
                        <div>
                            <h2 className="font-sans text-3xl font-medium tracking-tight text-[#2F241D]">
                                7. Order Cancellation
                            </h2>

                            <p className="mt-4 text-sm leading-7 text-[#66574D]">
                                Cancellation requests may depend on the current
                                status of an order. If you need to cancel an
                                order, please contact us as soon as possible
                                through the Contact Us page.
                            </p>
                        </div>

                        {/* Delivery */}
                        <div>
                            <h2 className="font-sans text-3xl font-medium tracking-tight text-[#2F241D]">
                                8. Shipping and Delivery
                            </h2>

                            <p className="mt-4 text-sm leading-7 text-[#66574D]">
                                Delivery information, available options, and
                                applicable timelines may vary depending on the
                                order and delivery location. Please refer to
                                the Shipping & Delivery page for additional
                                information.
                            </p>
                        </div>

                        {/* Returns */}
                        <div>
                            <h2 className="font-sans text-3xl font-medium tracking-tight text-[#2F241D]">
                                9. Returns and Refunds
                            </h2>

                            <p className="mt-4 text-sm leading-7 text-[#66574D]">
                                Return or refund eligibility may depend on the
                                product, order status, and applicable store
                                policies. For assistance with a specific
                                order, please contact our customer support
                                team.
                            </p>
                        </div>

                        {/* Reviews */}
                        <div>
                            <h2 className="font-sans text-3xl font-medium tracking-tight text-[#2F241D]">
                                10. Reviews and Customer Content
                            </h2>

                            <p className="mt-4 text-sm leading-7 text-[#66574D]">
                                If the website allows customers to submit
                                reviews or other content, users should provide
                                genuine and appropriate information. Content
                                should not contain unlawful, abusive,
                                misleading, or harmful material.
                            </p>
                        </div>

                        {/* Intellectual Property */}
                        <div>
                            <h2 className="font-sans text-3xl font-medium tracking-tight text-[#2F241D]">
                                11. Intellectual Property
                            </h2>

                            <p className="mt-4 text-sm leading-7 text-[#66574D]">
                                Website content, including branding, text,
                                graphics, images, design elements, and other
                                materials, may be protected by applicable
                                intellectual property laws. Such content should
                                not be copied, reproduced, or used without
                                appropriate permission.
                            </p>
                        </div>

                        {/* Third Party Services */}
                        <div>
                            <h2 className="font-sans text-3xl font-medium tracking-tight text-[#2F241D]">
                                12. Third-Party Services
                            </h2>

                            <p className="mt-4 text-sm leading-7 text-[#66574D]">
                                The website may rely on third-party services
                                for features such as authentication, hosting,
                                image storage, database services, or other
                                functionality. Use of such services may also be
                                subject to their respective terms and
                                policies.
                            </p>
                        </div>

                        {/* Availability */}
                        <div>
                            <h2 className="font-sans text-3xl font-medium tracking-tight text-[#2F241D]">
                                13. Website Availability
                            </h2>

                            <p className="mt-4 text-sm leading-7 text-[#66574D]">
                                We aim to keep the website available and
                                functional, but uninterrupted availability
                                cannot always be guaranteed. Website features
                                may occasionally be changed, updated, or
                                temporarily unavailable.
                            </p>
                        </div>

                        {/* Limitation */}
                        <div>
                            <h2 className="font-sans text-3xl font-medium tracking-tight text-[#2F241D]">
                                14. Limitation of Responsibility
                            </h2>

                            <p className="mt-4 text-sm leading-7 text-[#66574D]">
                                We take reasonable steps to maintain the website
                                and provide accurate information. However,
                                website content and services are provided
                                subject to availability and applicable laws.
                            </p>
                        </div>

                        {/* Changes */}
                        <div>
                            <h2 className="font-sans text-3xl font-medium tracking-tight text-[#2F241D]">
                                15. Changes to These Terms
                            </h2>

                            <p className="mt-4 text-sm leading-7 text-[#66574D]">
                                These Terms & Conditions may be updated when
                                necessary. Updated terms will be published on
                                this page, and continued use of the website
                                after an update may be subject to the revised
                                terms.
                            </p>
                        </div>

                        {/* Contact */}
                        <div>
                            <h2 className="font-sans text-3xl font-medium tracking-tight text-[#2F241D]">
                                16. Contact Us
                            </h2>

                            <p className="mt-4 text-sm leading-7 text-[#66574D]">
                                If you have questions about these Terms &
                                Conditions, please contact us through our{" "}
                                <Link
                                    href="/contact"
                                    className="font-medium text-[#6B3F24] hover:underline"
                                >
                                    Contact Us
                                </Link>{" "}
                                page.
                            </p>
                        </div>

                    </div>

                </section>

                {/* CTA */}
                <section className="border-t border-[#E9DFD0] bg-[#2F241D]">
                    <div className="mx-auto max-w-4xl px-6 py-16 text-center md:px-10">

                        <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#D8CABB]">
                            MITHILA
                        </p>

                        <h2 className="mt-3 font-sans text-3xl font-semibold tracking-tight text-white md:text-4xl">
                            Have questions about these terms?
                        </h2>

                        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#D8CABB]">
                            If you need clarification about our website,
                            products, orders, or services, please get in touch
                            with us.
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

export default TermsConditions;