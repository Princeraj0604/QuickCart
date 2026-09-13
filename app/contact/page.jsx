"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
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

    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill all fields.");
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
        toast.success(data.message);

        setFormData({
          name: "",
          email: "",
          message: "",
        });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
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
        <section className="bg-[#E6E9F2] py-16 md:py-20">
          <div className="max-w-6xl mx-auto px-5 text-center">
            <p className="text-orange-600 font-medium mb-3">
              Get In Touch
            </p>

            <h1 className="text-3xl md:text-5xl font-semibold text-gray-800">
              We'd Love to Hear From You
            </h1>

            <p className="max-w-2xl mx-auto mt-5 text-gray-500 leading-7">
              Have a question, suggestion, or need help with your order?
              Our team is here to help.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="max-w-6xl mx-auto px-5 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

            {/* Contact Info */}
            <div>
              <p className="text-orange-600 font-medium mb-2">
                Contact QuickCart
              </p>

              <h2 className="text-3xl font-semibold text-gray-800 mb-5">
                Let's Start a Conversation
              </h2>

              <p className="text-gray-500 leading-7 mb-8">
                Whether you have a question about our products, your
                order, or anything else, feel free to reach out. We're
                always happy to help.
              </p>

              <div className="space-y-5">

                <div>
                  <h3 className="font-semibold text-gray-800">
                    Email
                  </h3>

                  <p className="text-gray-500 mt-1">
                    support@princeraj.com
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800">
                    Phone
                  </h3>

                  <p className="text-gray-500 mt-1">
                    +91 6205270749
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800">
                    Working Hours
                  </h3>

                  <p className="text-gray-500 mt-1">
                    Monday - Saturday, 9:00 AM - 6:00 PM
                  </p>
                </div>

              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-50 rounded-2xl p-6 md:p-8">

              <form onSubmit={handleSubmit} className="space-y-5">

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full h-12 px-4 border border-gray-300 rounded-md outline-none focus:border-orange-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full h-12 px-4 border border-gray-300 rounded-md outline-none focus:border-orange-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>

                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    placeholder="Write your message..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-md outline-none resize-none focus:border-orange-600"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 text-white rounded-full font-medium transition"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>

              </form>

            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Contact;