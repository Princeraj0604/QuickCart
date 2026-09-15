import React from "react";
import Image from "next/image";
import { assets } from "@/assets/assets";

const Footer = () => {
    return (
        <footer className="w-full border-t border-[#E9DFD0] bg-white">
            <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-32 py-7">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">

                    {/* Logo */}
                    <div className="flex items-center justify-center md:justify-start md:w-1/3">
                        <Image
                            src={assets.logo}
                            alt="MITHILA"
                            width={150}
                            height={45}
                            className="w-32 h-auto"
                        />
                    </div>

                    {/* Copyright */}
                    <div className="flex items-center justify-center md:w-1/3">
                        <p className="text-sm md:text-base text-[#8A7A6D] text-center whitespace-nowrap">
                            Copyright 2026 © MITHILA. All Rights Reserved.
                        </p>
                    </div>

                    {/* Social Icons */}
                    <div className="flex items-center justify-center md:justify-end gap-5 md:w-1/3">

                        <a
                            href="#"
                            aria-label="Facebook"
                            className="opacity-70 hover:opacity-100 transition duration-300"
                        >
                            <Image
                                src={assets.facebook_icon}
                                alt="Facebook"
                                width={22}
                                height={22}
                                className="w-[22px] h-[22px]"
                            />
                        </a>

                        <a
                            href="#"
                            aria-label="Twitter"
                            className="opacity-70 hover:opacity-100 transition duration-300"
                        >
                            <Image
                                src={assets.twitter_icon}
                                alt="Twitter"
                                width={22}
                                height={22}
                                className="w-[22px] h-[22px]"
                            />
                        </a>

                        <a
                            href="#"
                            aria-label="Instagram"
                            className="opacity-70 hover:opacity-100 transition duration-300"
                        >
                            <Image
                                src={assets.instagram_icon}
                                alt="Instagram"
                                width={22}
                                height={22}
                                className="w-[22px] h-[22px]"
                            />
                        </a>

                    </div>

                </div>
            </div>
        </footer>
    );
};

export default Footer;