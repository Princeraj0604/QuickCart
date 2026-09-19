"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import toast from "react-hot-toast";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name.trim()) {
            toast.error("Please enter your name.");
            return;
        }

        if (!formData.email.trim()) {
            toast.error("Please enter your email.");
            return;
        }

        if (!formData.message.trim()) {
            toast.error("Please enter your message.");
            return;
        }

        try {
            setLoading(true);

            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.success) {
                toast.success("Your message has been sent successfully.");

                setFormData({
                    name: "",
                    email: "",
                    message: "",
                });
            } else {
                toast.error(data.message || "Unable to send your message.");
            }
        } catch (error) {
            console.error("Contact form error:", error);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
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
                            Contact Us
                        </h1>

                        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[#66574D] md:text-lg">
                            Have a question about our Thekua, your order,
                            gifting, or anything else? We would love to hear
                            from you.
                        </p>

                    </div>
                </section>

                {/* Contact Content */}
                <section className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-20">

                    <div className="grid grid-cols-1 gap-12 md:grid-cols-2">

                        {/* Contact Information */}
                        <div>

                            <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#8A5A32]">
                                Get In Touch
                            </p>

                            <h2 className="mt-3 font-serif text-3xl text-[#2F241D] md:text-4xl">
                                We are here to help
                            </h2>

                            <p className="mt-5 max-w-xl text-sm leading-7 text-[#66574D]">
                                Whether you have a question about a product,
                                need help with an order, or want to discuss
                                gifting and bulk requirements, feel free to
                                reach out to us.
                            </p>

                            <div className="mt-10 space-y-7">

                                {/* Email */}
                                <div>
                                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#8A5A32]">
                                        Email
                                    </p>

                                    <a
                                        href="mailto:princeraj12450@gmail.com"
                                        className="mt-2 inline-block text-sm text-[#2F241D] transition hover:text-[#6B3F24]"
                                    >
                                        princeraj12450@gmail.com
                                    </a>
                                </div>

                                {/* Phone */}
                                <div>
                                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#8A5A32]">
                                        Phone
                                    </p>

                                    <a
                                        href="tel:+916205270749"
                                        className="mt-2 inline-block text-sm text-[#2F241D] transition hover:text-[#6B3F24]"
                                    >
                                        +91 6205270749
                                    </a>
                                </div>

                                {/* Working Hours */}
                                <div>
                                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#8A5A32]">
                                        Support
                                    </p>

                                    <p className="mt-2 text-sm leading-6 text-[#66574D]">
                                        For product, order, gifting, and other
                                        enquiries, please use the contact form
                                        or reach us through the contact details
                                        above.
                                    </p>
                                </div>

                            </div>

                            {/* Helpful Links */}
                            <div className="mt-10 border-t border-[#E9DFD0] pt-8">

                                <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#8A5A32]">
                                    Helpful Information
                                </p>

                                <div className="mt-4 flex flex-wrap gap-3">

                                    <Link
                                        href="/faq"
                                        className="rounded-full border border-[#DCCFC0] px-5 py-2.5 text-sm text-[#6B3F24] transition hover:bg-[#F4EFE6]"
                                    >
                                        FAQ
                                    </Link>

                                    <Link
                                        href="/shipping-delivery"
                                        className="rounded-full border border-[#DCCFC0] px-5 py-2.5 text-sm text-[#6B3F24] transition hover:bg-[#F4EFE6]"
                                    >
                                        Shipping & Delivery
                                    </Link>

                                    <Link
                                        href="/order-support"
                                        className="rounded-full border border-[#DCCFC0] px-5 py-2.5 text-sm text-[#6B3F24] transition hover:bg-[#F4EFE6]"
                                    >
                                        Order Support
                                    </Link>

                                </div>

                            </div>

                        </div>

                        {/* Contact Form */}
                        <div className="rounded-2xl border border-[#E9DFD0] bg-[#FAF8F4] p-6 md:p-8">

                            <div className="mb-7">

                                <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#8A5A32]">
                                    Send a Message
                                </p>

                                <h2 className="mt-2 font-serif text-3xl text-[#2F241D]">
                                    How can we help?
                                </h2>

                            </div>

                            <form
                                onSubmit={handleSubmit}
                                className="space-y-5"
                            >

                                {/* Name */}
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="mb-2 block text-sm font-medium text-[#2F241D]"
                                    >
                                        Name
                                    </label>

                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Enter your name"
                                        className="w-full rounded-xl border border-[#DCCFC0] bg-white px-4 py-3 text-sm text-[#2F241D] outline-none transition placeholder:text-[#A99483] focus:border-[#8A5A32]"
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="mb-2 block text-sm font-medium text-[#2F241D]"
                                    >
                                        Email
                                    </label>

                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Enter your email"
                                        className="w-full rounded-xl border border-[#DCCFC0] bg-white px-4 py-3 text-sm text-[#2F241D] outline-none transition placeholder:text-[#A99483] focus:border-[#8A5A32]"
                                    />
                                </div>

                                {/* Message */}
                                <div>
                                    <label
                                        htmlFor="message"
                                        className="mb-2 block text-sm font-medium text-[#2F241D]"
                                    >
                                        Message
                                    </label>

                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Write your message..."
                                        rows={6}
                                        className="w-full resize-none rounded-xl border border-[#DCCFC0] bg-white px-4 py-3 text-sm leading-6 text-[#2F241D] outline-none transition placeholder:text-[#A99483] focus:border-[#8A5A32]"
                                    />
                                </div>

                                {/* Submit */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full rounded-full bg-[#6B3F24] px-6 py-3.5 text-sm font-medium text-white transition hover:bg-[#543019] disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {loading
                                        ? "Sending..."
                                        : "Send Message"}
                                </button>

                            </form>

                        </div>

                    </div>

                </section>

                {/* Bottom CTA */}
                <section className="border-t border-[#E9DFD0] bg-[#2F241D]">
                    <div className="mx-auto max-w-4xl px-6 py-16 text-center md:px-10">

                        <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#D8CABB]">
                            MITHILA
                        </p>

                        <h2 className="mt-3 font-serif text-3xl text-white md:text-4xl">
                            Crafted with tradition, shared with care
                        </h2>

                        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#D8CABB]">
                            Explore our Thekua collections or learn more about
                            gifting and bulk orders.
                        </p>

                        <Link
                            href="/collections"
                            className="mt-7 inline-flex rounded-full bg-white px-7 py-3 text-sm font-medium text-[#6B3F24] transition hover:bg-[#F4EFE6]"
                        >
                            Explore Collections
                        </Link>

                    </div>
                </section>

            </main>

            <Footer />
        </>
    );
};

export default Contact;