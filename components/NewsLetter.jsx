"use client";

import React, { useState } from "react";
import { toast } from "react-hot-toast";

const NewsLetter = () => {

    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email.trim()) {
            toast.error("Please enter your email address");
            return;
        }

        if (!email.includes("@")) {
            toast.error("Please enter a valid email address");
            return;
        }

        toast.success("Thank you for joining the Mithila Journal");

        setEmail("");
    };

    return (
        <section className="w-full py-16 md:py-24">

            <div className="rounded-2xl md:rounded-3xl bg-[#F4EFE6] px-6 py-12 sm:px-10 md:px-16 lg:px-20">

                <div className="max-w-3xl mx-auto text-center">

                    <p className="text-xs md:text-sm tracking-[0.25em] uppercase text-[#8A5A32] font-medium">
                        STAY CONNECTED
                    </p>

                    <h2 className="mt-3 font-serif text-3xl md:text-4xl lg:text-5xl text-[#2F241D]">
                        A Little Mithila, In Your Inbox.
                    </h2>

                    <p className="mt-4 max-w-2xl mx-auto text-sm md:text-base leading-7 text-[#66574D]">
                        Join the Mithila Journal for new collection updates,
                        stories, gifting ideas, and occasional inspiration
                        from the world of traditional flavours.
                    </p>

                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto mt-8"
                    >

                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email address"
                            className="flex-1 h-12 rounded-full border border-[#D8CABC] bg-white px-5 text-sm text-[#2F241D] outline-none placeholder:text-[#8A7A6D] focus:border-[#8A5A32]"
                        />

                        <button
                            type="submit"
                            className="h-12 rounded-full bg-[#6B3F24] px-7 text-sm font-medium text-white transition duration-300 hover:bg-[#2F241D]"
                        >
                            Subscribe
                        </button>

                    </form>

                    <p className="mt-4 text-xs text-[#8A7A6D]">
                        No unnecessary emails. Just thoughtful updates from Mithila.
                    </p>

                </div>

            </div>

        </section>
    );
};

export default NewsLetter;