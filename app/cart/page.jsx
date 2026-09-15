'use client'

import React from "react"
import axios from "axios";
import { assets } from "@/assets/assets";
import OrderSummary from "@/components/OrderSummary";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";

const Cart = () => {

    const {
    products,
    router,
    cartItems,
    addToCart,
    updateCartQuantity,
    getCartCount,
    currency,
    setCartItems,
    getToken,
    user
} = useAppContext();

    const cartProducts = Object.keys(cartItems)
        .map((itemId) => products.find((product) => product._id === itemId))
        .filter((product, index) => product && cartItems[product._id] > 0);


    const clearCart = async () => {
    try {
        setCartItems({});

        if (user) {
            const token = await getToken();

            await axios.post(
                "/api/cart/update",
                { cartData: {} },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
        }
    } catch (error) {
        console.error("Clear cart error:", error);
    }
};


    return (
        <>
            <Navbar />

            <main className="min-h-screen bg-white">
                <div className="px-5 sm:px-8 md:px-12 lg:px-20 xl:px-28 2xl:px-36 pt-12 md:pt-16 pb-20">

                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-[#E9DFD0] pb-7">
                        <div>
                            <p className="text-xs uppercase tracking-[0.2em] text-[#8A5A32] mb-2">
                                Your Selection
                            </p>

                            <h1 className="text-3xl md:text-4xl font-medium text-[#2F241D]">
                                Your Cart
                            </h1>

                            <p className="text-sm text-[#66574D] mt-2">
                                Review your Thekua before placing your order.
                            </p>
                        </div>

                        <p className="text-sm text-[#66574D]">
                            {getCartCount()} {getCartCount() === 1 ? "item" : "items"}
                        </p>
                    </div>

                    {cartProducts.length === 0 ? (

                        /* Empty Cart */
                        <div className="flex flex-col items-center justify-center text-center py-24 md:py-32">

                            <div className="w-20 h-20 rounded-full bg-[#F4EFE6] flex items-center justify-center mb-6">
                                <span className="text-3xl text-[#6B3F24]">✦</span>
                            </div>

                            <h2 className="text-2xl md:text-3xl font-medium text-[#2F241D]">
                                Your cart is empty
                            </h2>

                            <p className="max-w-md text-sm leading-6 text-[#66574D] mt-3">
                                Your next taste of Mithila is waiting. Explore our
                                handcrafted Thekua collection and find something you love.
                            </p>

                            <button
                                onClick={() => {
                                    router.push("/all-products");
                                    scrollTo(0, 0);
                                }}
                                className="mt-7 rounded-full bg-[#6B3F24] px-7 py-3 text-sm font-medium text-white transition hover:bg-[#2F241D]"
                            >
                                Explore Thekua
                            </button>

                        </div>

                    ) : (

                        /* Cart Content */
                        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 lg:gap-14 pt-8">

                            {/* Cart Items */}
                            <div>

                                <div className="hidden md:grid grid-cols-[1fr_120px_130px_120px] gap-5 px-2 pb-4 border-b border-[#E9DFD0] text-[11px] uppercase tracking-wider text-[#8A7A6D]">
                                    <span>Product</span>
                                    <span>Price</span>
                                    <span>Quantity</span>
                                    <span>Subtotal</span>
                                </div>

                                <div>
                                    {cartProducts.map((product) => {

                                        const quantity = cartItems[product._id];
                                        const subtotal = product.offerPrice * quantity;

                                        return (
                                            <div
                                                key={product._id}
                                                className="grid grid-cols-1 md:grid-cols-[1fr_120px_130px_120px] gap-5 md:gap-5 items-center py-6 border-b border-[#E9DFD0]"
                                            >

                                                {/* Product */}
                                                <div className="flex items-center gap-4">

                                                    <div
                                                        onClick={() => {
                                                            router.push(`/product/${product._id}`);
                                                            scrollTo(0, 0);
                                                        }}
                                                        className="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0 overflow-hidden rounded-xl bg-[#F4EFE6] cursor-pointer"
                                                    >
                                                        <Image
                                                            src={product.images?.[0]}
                                                            alt={product.name}
                                                            fill
                                                            className="object-cover transition duration-500 hover:scale-105"
                                                        />
                                                    </div>

                                                    <div className="min-w-0">
                                                        <button
                                                            onClick={() => {
                                                                router.push(`/product/${product._id}`);
                                                                scrollTo(0, 0);
                                                            }}
                                                            className="text-left text-base font-medium text-[#2F241D] hover:text-[#6B3F24] transition"
                                                        >
                                                            {product.name}
                                                        </button>

                                                        {product.packSize && (
                                                            <p className="text-xs text-[#8A7A6D] mt-1">
                                                                Pack Size: {product.packSize}
                                                            </p>
                                                        )}

                                                        {product.category && (
                                                            <p className="text-xs text-[#8A7A6D] mt-1">
                                                                {product.category}
                                                            </p>
                                                        )}

                                                        <button
                                                            onClick={() => updateCartQuantity(product._id, 0)}
                                                            className="text-xs text-[#8A5A32] mt-3 hover:text-[#2F241D] transition"
                                                        >
                                                            Remove
                                                        </button>
                                                    </div>

                                                </div>

                                                {/* Price */}
                                                <div className="flex items-center justify-between md:block">
                                                    <span className="md:hidden text-xs uppercase tracking-wider text-[#8A7A6D]">
                                                        Price
                                                    </span>

                                                    <span className="text-sm text-[#66574D]">
                                                        {currency}{product.offerPrice}
                                                    </span>
                                                </div>

                                                {/* Quantity */}
                                                <div className="flex items-center justify-between md:block">

                                                    <span className="md:hidden text-xs uppercase tracking-wider text-[#8A7A6D]">
                                                        Quantity
                                                    </span>

                                                    <div className="flex items-center w-fit border border-[#DCCFC0] rounded-full overflow-hidden">

                                                        <button
                                                            onClick={() =>
                                                                updateCartQuantity(
                                                                    product._id,
                                                                    quantity - 1
                                                                )
                                                            }
                                                            className="w-9 h-9 flex items-center justify-center hover:bg-[#F4EFE6] transition"
                                                            aria-label="Decrease quantity"
                                                        >
                                                            <Image
                                                                src={assets.decrease_arrow}
                                                                alt=""
                                                                width={14}
                                                                height={14}
                                                            />
                                                        </button>

                                                        <input
                                                            type="number"
                                                            min="1"
                                                            value={quantity}
                                                            onChange={(e) => {
                                                                const value = Number(e.target.value);

                                                                if (value >= 1) {
                                                                    updateCartQuantity(
                                                                        product._id,
                                                                        value
                                                                    );
                                                                }
                                                            }}
                                                            className="w-10 h-9 text-center text-sm text-[#2F241D] bg-transparent outline-none"
                                                        />

                                                        <button
                                                            onClick={() =>
                                                                addToCart(product._id)
                                                            }
                                                            className="w-9 h-9 flex items-center justify-center hover:bg-[#F4EFE6] transition"
                                                            aria-label="Increase quantity"
                                                        >
                                                            <Image
                                                                src={assets.increase_arrow}
                                                                alt=""
                                                                width={14}
                                                                height={14}
                                                            />
                                                        </button>

                                                    </div>
                                                </div>

                                                {/* Subtotal */}
                                                <div className="flex items-center justify-between md:block">

                                                    <span className="md:hidden text-xs uppercase tracking-wider text-[#8A7A6D]">
                                                        Subtotal
                                                    </span>

                                                    <span className="text-sm font-medium text-[#6B3F24]">
                                                        {currency}{subtotal.toFixed(2)}
                                                    </span>

                                                </div>

                                            </div>
                                        );
                                    })}
                                </div>

                                <button
                                  onClick={clearCart}
                                  className="text-xs text-red-600 hover:text-red-800 transition"
                                >
                                    Clear Cart
                                </button>

                                {/* Continue Shopping */}
                                <button
                                    onClick={() => {
                                        router.push("/all-products");
                                        scrollTo(0, 0);
                                    }}
                                    className="group flex items-center gap-2 mt-7 text-sm font-medium text-[#6B3F24]"
                                >
                                    <Image
                                        className="rotate-180 transition duration-300 group-hover:-translate-x-1"
                                        src={assets.arrow_right_icon_colored}
                                        alt=""
                                        width={18}
                                        height={18}
                                    />

                                    Continue Shopping
                                </button>

                            </div>

                            {/* Order Summary */}
                            <div>
                                <OrderSummary />
                            </div>

                        </div>
                    )}

                </div>
            </main>

            <Footer />
        </>
    );
};

export default Cart;