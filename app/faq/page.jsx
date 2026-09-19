"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const faqData = [
    {
        question: "What is Thekua?",
        answer:
            "Thekua is a traditional Mithila and Bihar delicacy traditionally prepared with flour, jaggery or sugar, and ghee. It is known for its rich taste, crisp texture, and traditional preparation.",
    },
    {
        question: "What ingredients are used in MITHILA Thekua?",
        answer:
            "Our Thekua varieties are made using carefully selected ingredients. Depending on the product, ingredients may include wheat flour, jaggery, sugar, ghee, coconut, dry fruits, sesame, cardamom, millet, and other selected ingredients.",
    },
    {
        question: "How should I store Thekua?",
        answer:
            "Keep Thekua in a cool and dry place away from direct sunlight and moisture. After opening the package, keep it properly sealed to help maintain its taste and texture.",
    },
    {
        question: "What is the shelf life of Thekua?",
        answer:
            "Shelf life can vary depending on the product and pack. Please check the product details and packaging for the specific shelf-life information of the Thekua you purchase.",
    },
    {
        question: "What pack sizes are available?",
        answer:
            "Pack sizes vary by product. Depending on the selected Thekua, available options may include 250g, 400g, 500g, 750g, 1kg, and larger packs.",
    },
    {
        question: "Can I order Thekua as a gift?",
        answer:
            "Yes. MITHILA offers gifting-focused selections designed for celebrations, family occasions, festivals, and thoughtful gifting.",
    },
    {
        question: "Do you offer bulk or B2B orders?",
        answer:
            "Yes. We offer bulk and B2B options for offices, events, celebrations, business gifting, and other larger requirements. You can contact us through the B2B section or Contact Us page for enquiries.",
    },
    {
        question: "How can I contact MITHILA?",
        answer:
            "You can reach us through the Contact Us page. Submit your name, email address, and message, and your enquiry will be received by our team.",
    },
    {
        question: "How can I check my order?",
        answer:
            "After placing an order, you can check your order details and order status from the My Orders section of your account.",
    },
    {
        question: "Can I cancel or return my order?",
        answer:
            "Order cancellation and return eligibility can depend on the order status and applicable store policies. Please contact us through the Contact Us page for assistance with a specific order.",
    },
];

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const handleToggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

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
                            Frequently Asked Questions
                        </h1>

                        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[#66574D] md:text-lg">
                            Find answers to common questions about our Thekua,
                            products, orders, gifting, and customer support.
                        </p>

                    </div>
                </section>

                {/* FAQ */}
                <section className="mx-auto max-w-4xl px-6 py-16 md:px-10 md:py-20">

                    <div className="mb-10 text-center">

                        <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#8A5A32]">
                            Help & Information
                        </p>

                        <h2 className="mt-3 font-serif text-3xl text-[#2F241D] md:text-4xl">
                            How can we help?
                        </h2>

                    </div>

                    <div className="space-y-4">

                        {faqData.map((faq, index) => {
                            const isOpen = openIndex === index;

                            return (
                                <div
                                    key={faq.question}
                                    className="overflow-hidden rounded-2xl border border-[#E9DFD0] bg-white"
                                >

                                    <button
                                        type="button"
                                        onClick={() => handleToggle(index)}
                                        className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left transition hover:bg-[#F8F5EF] md:px-7"
                                    >

                                        <span className="font-medium text-[#2F241D]">
                                            {faq.question}
                                        </span>

                                        <span
                                            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#DCCFC0] text-lg text-[#6B3F24] transition-transform duration-300 ${
                                                isOpen ? "rotate-45" : ""
                                            }`}
                                        >
                                            +
                                        </span>

                                    </button>

                                    {isOpen && (
                                        <div className="border-t border-[#E9DFD0] px-6 py-5 md:px-7">
                                            <p className="text-sm leading-7 text-[#66574D]">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    )}

                                </div>
                            );
                        })}

                    </div>

                </section>

                {/* Contact CTA */}
                <section className="border-t border-[#E9DFD0] bg-[#2F241D]">

                    <div className="mx-auto max-w-4xl px-6 py-16 text-center md:px-10">

                        <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#D8CABB]">
                            Still Have Questions?
                        </p>

                        <h2 className="mt-3 font-serif text-3xl text-white md:text-4xl">
                            We're here to help
                        </h2>

                        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#D8CABB]">
                            If you could not find the answer you were looking
                            for, reach out to us and our team will be happy to
                            assist you.
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

export default FAQ;