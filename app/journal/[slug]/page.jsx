"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const journalPosts = {
    "story-behind-thekua": {
        category: "THE MITHILA TABLE",
        title: "The Story Behind Thekua: A Taste of Mithila",
        image: "/images/thekua/hero-classic.png",
        intro:
            "Thekua is more than a traditional sweet snack. For generations, it has been part of the food culture, celebrations, and everyday memories of Mithila.",
        sections: [
            {
                heading: "A Tradition Rooted in Mithila",
                paragraphs: [
                    "Thekua holds a special place in the culinary traditions of Bihar and the Mithila region. Its simple ingredients and distinctive shape make it instantly recognisable, while its connection with family traditions gives it a deeper meaning.",
                    "Traditionally prepared with flour, jaggery or sugar, and ghee, Thekua reflects the beauty of simple Indian cooking. Different homes and families have their own ways of preparing it, creating small variations in flavour and texture."
                ]
            },
            {
                heading: "The Familiar Flavours of Home",
                paragraphs: [
                    "The warmth of jaggery, the richness of ghee, and the texture of carefully prepared flour come together to create the characteristic taste of Thekua.",
                    "For many people, that taste is closely connected with memories of home, festivals, family gatherings, and special occasions. It is a food that can feel both traditional and deeply personal."
                ]
            },
            {
                heading: "More Than a Festive Favourite",
                paragraphs: [
                    "Although Thekua is strongly associated with Chhath and other festive traditions, its place extends beyond celebrations. It can be enjoyed with tea, shared with guests, or packed as a thoughtful food gift.",
                    "This versatility is one of the reasons Thekua continues to remain relevant. A traditional recipe can naturally become part of modern everyday moments without losing its cultural character."
                ]
            },
            {
                heading: "Keeping the Tradition Moving Forward",
                paragraphs: [
                    "At Mithila, we see tradition as something that can evolve while still respecting where it came from. The goal is not to change the identity of Thekua, but to present its familiar character in a way that feels natural for today's customers.",
                    "From classic flavours to carefully selected variations, every collection is inspired by the food traditions and everyday stories associated with Mithila."
                ]
            }
        ]
    },

    "making-of-thekua": {
        category: "CRAFT & TRADITION",
        title: "From Flour to Thekua: The Making of a Tradition",
        image: "/images/thekua/hero-premium.png",
        intro:
            "Behind every Thekua is a simple process built around familiar ingredients, careful preparation, and a tradition that has been passed from one generation to another.",
        sections: [
            {
                heading: "Simple Ingredients, Distinctive Character",
                paragraphs: [
                    "Traditional Thekua is made using ingredients that are familiar across Indian kitchens. Flour forms the base, while jaggery or sugar provides sweetness and ghee adds richness to the preparation.",
                    "Depending on the recipe, ingredients such as coconut, cardamom, fennel, sesame, or dry fruits can be added to create different flavour profiles."
                ]
            },
            {
                heading: "Preparing the Dough",
                paragraphs: [
                    "The preparation begins by combining the ingredients carefully to create a dough with the right consistency. The balance of ingredients plays an important role in the final texture of the Thekua.",
                    "A well-prepared dough allows the pieces to hold their shape while developing the characteristic texture associated with traditional Thekua."
                ]
            },
            {
                heading: "The Signature Shape",
                paragraphs: [
                    "One of the most recognisable parts of Thekua is its patterned surface. Traditionally, wooden moulds or simple shaping tools are used to create these distinctive designs.",
                    "The patterns are more than decoration. They are part of the visual identity of Thekua and connect the finished food with traditional preparation methods."
                ]
            },
            {
                heading: "From Tradition to the Modern Table",
                paragraphs: [
                    "While the basic character of Thekua remains rooted in tradition, today's kitchens allow room for thoughtful variations. Different flavours, ingredients, and pack formats can introduce Thekua to new audiences.",
                    "The result is a food that respects its traditional roots while fitting naturally into contemporary tea-time, gifting, and celebration moments."
                ]
            }
        ]
    },

    "thekua-for-every-moment": {
        category: "MITHILA MOMENTS",
        title: "Thekua for Every Moment: Tea-Time to Celebrations",
        image: "/images/thekua/hero-gifting.png",
        intro:
            "Some foods are made for a particular occasion. Thekua is different. Its familiar taste and easy-to-share format make it naturally suited to everyday moments as well as celebrations.",
        sections: [
            {
                heading: "A Simple Tea-Time Companion",
                paragraphs: [
                    "A cup of tea and something traditionally sweet is a combination that never really goes out of style. Thekua fits naturally into this simple daily ritual.",
                    "Its texture and familiar sweetness make it an easy choice when you want to add something special to an ordinary afternoon or evening."
                ]
            },
            {
                heading: "Sharing With Family",
                paragraphs: [
                    "Food often becomes more meaningful when it is shared. A box of Thekua can become part of family conversations, visits from relatives, or relaxed evenings at home.",
                    "Its shareable nature makes it especially suitable for keeping on the table when friends and family come together."
                ]
            },
            {
                heading: "Festivals and Celebrations",
                paragraphs: [
                    "Thekua has a strong connection with festive traditions, particularly in Bihar and Mithila. During celebrations, familiar foods often become a way of reconnecting with culture and family.",
                    "Whether served at home or given to someone as a gift, Thekua carries the feeling of tradition while remaining easy to enjoy."
                ]
            },
            {
                heading: "A Thoughtful Gift From Mithila",
                paragraphs: [
                    "Traditional food can make a meaningful gift because it carries a story along with its flavour. Carefully presented Thekua can be shared with friends, relatives, colleagues, and guests.",
                    "Our gifting collections are designed around this idea: bringing a taste inspired by Mithila to moments where people come together."
                ]
            },
            {
                heading: "Made for Today's Moments",
                paragraphs: [
                    "Tradition does not have to stay in the past. Thekua can be enjoyed during a quiet tea break, taken to a family gathering, or presented as a thoughtful gift.",
                    "That is what makes it special: one traditional food can become part of many different moments while still carrying the character of Mithila."
                ]
            }
        ]
    }
};

const JournalArticle = () => {

    const params = useParams();
    const post = journalPosts[params.slug];

    if (!post) {
        return (
            <>
                <Navbar />

                <main className="min-h-[60vh] flex items-center justify-center px-6">
                    <div className="text-center">

                        <p className="text-xs tracking-[0.25em] uppercase text-[#8A5A32] font-medium">
                            MITHILA JOURNAL
                        </p>

                        <h1 className="mt-3 font-serif text-4xl text-[#2F241D]">
                            Story Not Found
                        </h1>

                        <p className="mt-3 text-sm text-[#66574D]">
                            The journal story you are looking for is not available.
                        </p>

                        <Link
                            href="/journal"
                            className="inline-flex mt-6 rounded-full bg-[#6B3F24] px-7 py-3 text-sm font-medium text-white transition hover:bg-[#2F241D]"
                        >
                            Back to Journal
                        </Link>

                    </div>
                </main>

                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />

            <main>

                <section className="px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-32 pt-10 md:pt-14">

                    <div className="max-w-4xl mx-auto">

                        <Link
                            href="/journal"
                            className="inline-flex items-center gap-2 text-sm font-medium text-[#6B3F24] hover:text-[#2F241D] transition"
                        >
                            ← Back to Journal
                        </Link>

                        <div className="mt-8">

                            <p className="text-xs md:text-sm tracking-[0.25em] uppercase text-[#8A5A32] font-medium">
                                {post.category}
                            </p>

                            <h1 className="mt-4 font-serif text-4xl sm:text-5xl md:text-6xl leading-tight text-[#2F241D]">
                                {post.title}
                            </h1>

                        </div>

                        <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-2xl md:rounded-3xl bg-[#F4EFE6]">

                            <Image
                                src={post.image}
                                alt={post.title}
                                fill
                                priority
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 900px"
                            />

                        </div>

                    </div>

                </section>

                <article className="px-6 sm:px-10 md:px-16 lg:px-24 py-12 md:py-16">

                    <div className="max-w-3xl mx-auto">

                        <p className="font-serif text-xl md:text-2xl leading-9 text-[#2F241D]">
                            {post.intro}
                        </p>

                        <div className="mt-10 md:mt-12 space-y-10">

                            {post.sections.map((section, index) => (

                                <section key={index}>

                                    <h2 className="font-serif text-2xl md:text-3xl text-[#2F241D]">
                                        {section.heading}
                                    </h2>

                                    <div className="mt-4 space-y-4">

                                        {section.paragraphs.map((paragraph, paragraphIndex) => (

                                            <p
                                                key={paragraphIndex}
                                                className="text-sm md:text-base leading-8 text-[#66574D]"
                                            >
                                                {paragraph}
                                            </p>

                                        ))}

                                    </div>

                                </section>

                            ))}

                        </div>

                        <div className="mt-14 pt-8 border-t border-[#E9DFD0]">

                            <Link
                                href="/all-products"
                                className="inline-flex items-center justify-center rounded-full bg-[#6B3F24] px-7 py-3.5 text-sm font-medium text-white transition hover:bg-[#2F241D]"
                            >
                                Explore Thekua Collection
                            </Link>

                        </div>

                    </div>

                </article>

            </main>

            <Footer />
        </>
    );
};

export default JournalArticle;