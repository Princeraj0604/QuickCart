"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const ContactMessages = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchMessages = async () => {
        try {
            setLoading(true);

            const { data } = await axios.get("/api/seller/contact-messages");

            if (data.success) {
                setMessages(data.messages);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Fetch Contact Messages Error:", error);
            toast.error("Failed to load contact messages.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    return (
        <div className="min-h-screen bg-[#FAF8F4] px-6 py-8 md:px-10">

            {/* Header */}
            <div className="mb-8">
                <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#8A5A32]">
                    Customer Care
                </p>

                <h1 className="mt-2 font-serif text-3xl text-[#2F241D] md:text-4xl">
                    Contact Messages
                </h1>

                <p className="mt-2 text-sm text-[#66574D]">
                    View messages submitted by customers through the Contact Us page.
                </p>
            </div>

            {/* Content */}
            {loading ? (
                <div className="rounded-2xl border border-[#E9DFD0] bg-white p-10 text-center">
                    <p className="text-sm text-[#66574D]">
                        Loading messages...
                    </p>
                </div>
            ) : messages.length === 0 ? (
                <div className="rounded-2xl border border-[#E9DFD0] bg-white p-10 text-center">
                    <h2 className="font-serif text-2xl text-[#2F241D]">
                        No Messages Yet
                    </h2>

                    <p className="mt-2 text-sm text-[#66574D]">
                        Customer messages will appear here when someone contacts you.
                    </p>
                </div>
            ) : (
                <div className="overflow-hidden rounded-2xl border border-[#E9DFD0] bg-white">

                    {/* Desktop Table */}
                    <div className="hidden overflow-x-auto md:block">
                        <table className="w-full text-left">

                            <thead className="border-b border-[#E9DFD0] bg-[#F4EFE6]">
                                <tr>
                                    <th className="px-5 py-4 text-sm font-medium text-[#2F241D]">
                                        Name
                                    </th>

                                    <th className="px-5 py-4 text-sm font-medium text-[#2F241D]">
                                        Email
                                    </th>

                                    <th className="px-5 py-4 text-sm font-medium text-[#2F241D]">
                                        Message
                                    </th>

                                    <th className="px-5 py-4 text-sm font-medium text-[#2F241D]">
                                        Date
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {messages.map((contact) => (
                                    <tr
                                        key={contact._id}
                                        className="border-b border-[#E9DFD0] last:border-b-0"
                                    >
                                        <td className="px-5 py-5 text-sm font-medium text-[#2F241D]">
                                            {contact.name}
                                        </td>

                                        <td className="px-5 py-5 text-sm">
                                            <a
                                                href={`mailto:${contact.email}`}
                                                className="text-[#6B3F24] hover:underline"
                                            >
                                                {contact.email}
                                            </a>
                                        </td>

                                        <td className="max-w-md px-5 py-5 text-sm leading-6 text-[#66574D]">
                                            {contact.message}
                                        </td>

                                        <td className="px-5 py-5 text-sm text-[#66574D]">
                                            {new Date(contact.createdAt).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>

                    {/* Mobile Cards */}
                    <div className="space-y-4 p-4 md:hidden">
                        {messages.map((contact) => (
                            <div
                                key={contact._id}
                                className="rounded-xl border border-[#E9DFD0] p-5"
                            >
                                <div>
                                    <p className="text-xs uppercase tracking-[0.15em] text-[#8A5A32]">
                                        Name
                                    </p>

                                    <p className="mt-1 font-medium text-[#2F241D]">
                                        {contact.name}
                                    </p>
                                </div>

                                <div className="mt-4">
                                    <p className="text-xs uppercase tracking-[0.15em] text-[#8A5A32]">
                                        Email
                                    </p>

                                    <a
                                        href={`mailto:${contact.email}`}
                                        className="mt-1 inline-block text-sm text-[#6B3F24]"
                                    >
                                        {contact.email}
                                    </a>
                                </div>

                                <div className="mt-4">
                                    <p className="text-xs uppercase tracking-[0.15em] text-[#8A5A32]">
                                        Message
                                    </p>

                                    <p className="mt-1 text-sm leading-6 text-[#66574D]">
                                        {contact.message}
                                    </p>
                                </div>

                                <div className="mt-4">
                                    <p className="text-xs uppercase tracking-[0.15em] text-[#8A5A32]">
                                        Date
                                    </p>

                                    <p className="mt-1 text-sm text-[#66574D]">
                                        {new Date(contact.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            )}
        </div>
    );
};

export default ContactMessages;