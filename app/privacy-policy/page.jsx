"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
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

            <h1 className="mt-4 font-sans font-semibold text-5xl leading-tight tracking-tight text-[#2F241D] md:text-6xl">
              {" "}
              Privacy Policy
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[#66574D] md:text-lg">
              This page explains how MITHILA may collect, use, and protect
              information when you use our website and services.
            </p>
          </div>
        </section>

        {/* Policy Content */}
        <section className="mx-auto max-w-4xl px-6 py-16 md:px-10 md:py-20">
          <div className="space-y-10">
            {/* Introduction */}
            <div>
              <h2 className="font-sans font-medium text-3xl tracking-tight text-[#2F241D]">
                1. Introduction
              </h2>

              <p className="mt-4 text-sm leading-7 text-[#66574D]">
                MITHILA respects your privacy and is committed to handling your
                information responsibly. This Privacy Policy describes the types
                of information that may be collected when you use our website,
                place an order, create an account, or contact us.
              </p>
            </div>

            {/* Information Collected */}
            <div>
              <h2 className="font-serif text-3xl text-[#2F241D]">
                2. Information We Collect
              </h2>

              <p className="mt-4 text-sm leading-7 text-[#66574D]">
                Depending on how you use the website, we may collect information
                such as your name, email address, phone number, delivery
                address, order information, and messages submitted through our
                contact form.
              </p>

              <p className="mt-4 text-sm leading-7 text-[#66574D]">
                Some information may also be provided when you create or manage
                your account, place an order, or communicate with our customer
                support team.
              </p>
            </div>

            {/* Account */}
            <div>
              <h2 className="font-serif text-3xl text-[#2F241D]">
                3. Account Information
              </h2>

              <p className="mt-4 text-sm leading-7 text-[#66574D]">
                If you create an account, information associated with your
                account may be used to provide account-related features such as
                viewing your orders, managing your profile, and accessing
                available account services.
              </p>
            </div>

            {/* Orders */}
            <div>
              <h2 className="font-serif text-3xl text-[#2F241D]">
                4. Orders and Transactions
              </h2>

              <p className="mt-4 text-sm leading-7 text-[#66574D]">
                Information related to your orders may be stored so that we can
                process orders, maintain order records, provide order support,
                and show relevant information in your account.
              </p>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="font-serif text-3xl text-[#2F241D]">
                5. Contact Information
              </h2>

              <p className="mt-4 text-sm leading-7 text-[#66574D]">
                When you submit a message through our Contact Us form, the
                information you provide may be stored so that our team can
                review and respond to your enquiry.
              </p>
            </div>

            {/* Use */}
            <div>
              <h2 className="font-serif text-3xl text-[#2F241D]">
                6. How We Use Information
              </h2>

              <p className="mt-4 text-sm leading-7 text-[#66574D]">
                Information may be used to operate and improve the website,
                process and manage orders, provide customer support, maintain
                account services, respond to enquiries, and improve the overall
                shopping experience.
              </p>
            </div>

            {/* Third Party */}
            <div>
              <h2 className="font-serif text-3xl text-[#2F241D]">
                7. Third-Party Services
              </h2>

              <p className="mt-4 text-sm leading-7 text-[#66574D]">
                The website may use third-party services to provide features
                such as authentication, hosting, image storage, database
                services, payment processing, analytics, or other website
                functionality. Such services may process information according
                to their own applicable policies.
              </p>
            </div>

            {/* Security */}
            <div>
              <h2 className="font-serif text-3xl text-[#2F241D]">
                8. Data Security
              </h2>

              <p className="mt-4 text-sm leading-7 text-[#66574D]">
                We take reasonable steps to protect information handled through
                the website. However, no internet-based system or method of
                electronic storage can be guaranteed to be completely secure.
              </p>
            </div>

            {/* Cookies */}
            <div>
              <h2 className="font-serif text-3xl text-[#2F241D]">
                9. Cookies and Website Usage
              </h2>

              <p className="mt-4 text-sm leading-7 text-[#66574D]">
                The website and its supporting services may use cookies, browser
                storage, or similar technologies where required for
                functionality, authentication, preferences, or website
                operation.
              </p>
            </div>

            {/* User Choices */}
            <div>
              <h2 className="font-serif text-3xl text-[#2F241D]">
                10. Your Information
              </h2>

              <p className="mt-4 text-sm leading-7 text-[#66574D]">
                If you have questions about information associated with your
                account or an enquiry you have submitted, you can contact us
                through the Contact Us page.
              </p>
            </div>

            {/* Policy Updates */}
            <div>
              <h2 className="font-serif text-3xl text-[#2F241D]">
                11. Policy Updates
              </h2>

              <p className="mt-4 text-sm leading-7 text-[#66574D]">
                This Privacy Policy may be updated from time to time as the
                website, services, or business practices change. Any updated
                version will be published on this page.
              </p>
            </div>

            {/* Contact */}
            <div>
              <h2 className="font-serif text-3xl text-[#2F241D]">
                12. Contact Us
              </h2>

              <p className="mt-4 text-sm leading-7 text-[#66574D]">
                If you have questions about this Privacy Policy or how
                information is handled, please contact us through our{" "}
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

            <h2 className="mt-3 font-serif text-3xl text-white md:text-4xl">
              Have questions about your privacy?
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#D8CABB]">
              If you have any questions about information handled through our
              website, please get in touch with us.
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

export default PrivacyPolicy;
