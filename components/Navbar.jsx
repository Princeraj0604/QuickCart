"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Show, useClerk, UserButton } from "@clerk/nextjs";
import { useAppContext } from "@/context/AppContext";
import { assets } from "@/assets/assets";

const Navbar = () => {
  const { isSeller, router, getCartCount } = useAppContext();
  const { openSignIn } = useClerk();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="relative flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-[#E9DFD0] bg-white">
      <Link href="/" onClick={closeMenu}>
        <div className="text-2xl md:text-3xl font-serif font-semibold tracking-wide text-[#2F241D]">
          MITHILA
        </div>
      </Link>

      <div className="hidden md:flex items-center gap-7 text-sm text-[#66574D]">
        <Link href="/" className="hover:text-[#6B3F24] transition">
          Home
        </Link>

        <Link href="/all-products" className="hover:text-[#6B3F24] transition">
          Shop Thekua
        </Link>

        <Link href="/collections" className="hover:text-[#6B3F24] transition">
          Collections
        </Link>

        <Link href="/#our-story" className="hover:text-[#6B3F24] transition">
          Our Story
        </Link>

        <Link href="/#gifting" className="hover:text-[#6B3F24] transition">
          Gifting
        </Link>

        <Link href="/#b2b" className="hover:text-[#6B3F24] transition">
          B2B
        </Link>

        <Link href="/#journal" className="hover:text-[#6B3F24] transition">
          Journal
        </Link>
      </div>

      <div className="flex items-center gap-4 md:gap-5">
        {/* Cart */}
        <button
          onClick={() => router.push("/cart")}
          className="relative"
          aria-label="Shopping Cart"
        >
          <Image src={assets.cart_icon} alt="Cart" width={22} height={22} />

          {getCartCount() > 0 && (
            <span className="absolute -top-2 -right-2 w-4 h-4 bg-[#6B3F24] text-white text-[10px] rounded-full flex items-center justify-center">
              {getCartCount()}
            </span>
          )}
        </button>

        {/* Desktop Authentication */}
        <div className="hidden md:flex items-center gap-3">
          <Show when="signed-out">
            <button
              onClick={() => openSignIn()}
              className="rounded-full border border-[#DCCFC0] px-5 py-2 text-sm font-medium text-[#6B3F24] transition hover:bg-[#F4EFE6]"
            >
              Sign In
            </button>
          </Show>

          <Show when="signed-in">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push("/account")}
                className="text-sm text-[#66574D] hover:text-[#6B3F24] transition"
              >
                My Account
              </button>

              <button
                onClick={() => router.push("/my-orders")}
                className="text-sm text-[#66574D] hover:text-[#6B3F24] transition"
              >
                My Orders
              </button>

              <button
                onClick={() => router.push("/account/wishlist")}
                className="text-sm text-[#66574D] hover:text-[#6B3F24] transition"
              >
                Wishlist
              </button>

              <UserButton />
            </div>
          </Show>
        </div>

        {/* Seller Dashboard */}
        {isSeller && (
          <button
            onClick={() => router.push("/seller")}
            className="hidden lg:block border border-[#DCCFC0] px-4 py-2 rounded-full text-sm text-[#6B3F24] hover:bg-[#F4EFE6] transition"
          >
            Seller Dashboard
          </button>
        )}

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-xl text-[#2F241D]"
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? "×" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-b border-[#E9DFD0] md:hidden z-50 shadow-sm">
          <div className="flex flex-col px-6 py-6 gap-5 text-sm text-[#66574D]">
            <Link
              href="/"
              onClick={closeMenu}
              className="hover:text-[#6B3F24] transition"
            >
              Home
            </Link>

            <Link
              href="/all-products"
              onClick={closeMenu}
              className="hover:text-[#6B3F24] transition"
            >
              Shop Thekua
            </Link>

            <Link
              href="/collections"
              onClick={closeMenu}
              className="hover:text-[#6B3F24] transition"
            >
              Collections
            </Link>

            <Link
              href="/#our-story"
              onClick={closeMenu}
              className="hover:text-[#6B3F24] transition"
            >
              Our Story
            </Link>

            <Link
              href="/#gifting"
              onClick={closeMenu}
              className="hover:text-[#6B3F24] transition"
            >
              Gifting
            </Link>

            <Link
              href="/#b2b"
              onClick={closeMenu}
              className="hover:text-[#6B3F24] transition"
            >
              B2B
            </Link>

            <Link
              href="/#journal"
              onClick={closeMenu}
              className="hover:text-[#6B3F24] transition"
            >
              Journal
            </Link>

            <div className="h-px bg-[#E9DFD0]" />

            <Link
              href="/cart"
              onClick={closeMenu}
              className="hover:text-[#6B3F24] transition"
            >
              Cart
            </Link>

            <Show when="signed-out">
              <button
                onClick={() => {
                  closeMenu();
                  openSignIn();
                }}
                className="text-left hover:text-[#6B3F24] transition"
              >
                Sign In
              </button>
            </Show>

            <Show when="signed-in">
              <Link
                href="/account"
                onClick={closeMenu}
                className="hover:text-[#6B3F24] transition"
              >
                My Account
              </Link>

              <Link
                href="/my-orders"
                onClick={closeMenu}
                className="hover:text-[#6B3F24] transition"
              >
                My Orders
              </Link>

              <Link
                href="/account/wishlist"
                onClick={closeMenu}
                className="hover:text-[#6B3F24] transition"
              >
                Wishlist
              </Link>
            </Show>

            {isSeller && (
              <Link
                href="/seller"
                onClick={closeMenu}
                className="hover:text-[#6B3F24] transition"
              >
                Seller Dashboard
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
