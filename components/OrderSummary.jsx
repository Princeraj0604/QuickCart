'use client'

import { useAppContext } from "@/context/AppContext";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const OrderSummary = () => {

    const {
        currency,
        router,
        getCartCount,
        getCartAmount,
        getToken,
        user,
        cartItems,
        setCartItems
    } = useAppContext();

    const [selectedAddress, setSelectedAddress] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [userAddresses, setUserAddresses] = useState([]);

    const fetchUserAddresses = async () => {
        try {
            const token = await getToken();

            const { data } = await axios.get(
                "/api/user/get-addresses",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (data.success) {
                setUserAddresses(data.addresses);

                if (data.addresses.length > 0) {
                    setSelectedAddress(data.addresses[0]);
                }
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleAddressSelect = (address) => {
        setSelectedAddress(address);
        setIsDropdownOpen(false);
    };

    const createOrder = async () => {
        try {
            if (!selectedAddress) {
                return toast.error("Please select an address");
            }

            let cartItemsArray = Object.keys(cartItems).map((key) => ({
                product: key,
                quantity: cartItems[key]
            }));

            cartItemsArray = cartItemsArray.filter(
                (item) => item.quantity > 0
            );

            if (cartItemsArray.length === 0) {
                return toast.error("Cart is empty");
            }

            const token = await getToken();

            const { data } = await axios.post(
                "/api/order/create",
                {
                    address: selectedAddress._id,
                    items: cartItemsArray
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (data.success) {
                toast.success(data.message);
                setCartItems({});
                router.push("/order-placed");
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        if (user) {
            fetchUserAddresses();
        }
    }, [user]);

    const cartAmount = getCartAmount();
    const tax = Math.floor(cartAmount * 0.02);
    const total = cartAmount + tax;

    return (
        <div className="w-full lg:w-[360px] shrink-0">

            <div className="rounded-2xl border border-[#E9DFD0] bg-[#FDFBF8] p-5 sm:p-6">

                {/* Heading */}
                <div className="mb-6">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#8A5A32] mb-2">
                        Checkout
                    </p>

                    <h2 className="text-xl md:text-2xl font-medium text-[#2F241D]">
                        Order Summary
                    </h2>
                </div>

                {/* Address */}
                <div className="mb-6">

                    <div className="flex items-center justify-between mb-2">
                        <label className="text-xs font-medium uppercase tracking-wider text-[#66574D]">
                            Delivery Address
                        </label>

                        {userAddresses.length > 0 && (
                            <span className="text-[10px] text-[#8A7A6D]">
                                {userAddresses.length} saved
                            </span>
                        )}
                    </div>

                    <div className="relative">

                        <button
                            type="button"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="w-full min-h-[52px] rounded-xl border border-[#DCCFC0] bg-white px-4 py-3 text-left text-sm text-[#2F241D] transition hover:border-[#8A5A32] focus:outline-none"
                        >
                            <div className="flex items-center justify-between gap-3">

                                <span className="leading-5">
                                    {selectedAddress
                                        ? `${selectedAddress.fullName}, ${selectedAddress.area}, ${selectedAddress.city}, ${selectedAddress.state}`
                                        : "Select a delivery address"
                                    }
                                </span>

                                <svg
                                    className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
                                        isDropdownOpen
                                            ? "rotate-180"
                                            : ""
                                    }`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1.8"
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>

                            </div>
                        </button>

                        {isDropdownOpen && (
                            <div className="absolute left-0 right-0 top-full mt-2 z-30 rounded-xl border border-[#E9DFD0] bg-white shadow-xl overflow-hidden">

                                {userAddresses.length > 0 ? (
                                    <div className="max-h-56 overflow-y-auto">

                                        {userAddresses.map((address, index) => (
                                            <button
                                                key={address._id || index}
                                                type="button"
                                                onClick={() =>
                                                    handleAddressSelect(address)
                                                }
                                                className="w-full border-b border-[#F1EBE3] px-4 py-3 text-left text-sm text-[#2F241D] transition hover:bg-[#F4EFE6]"
                                            >
                                                <p className="font-medium">
                                                    {address.fullName}
                                                </p>

                                                <p className="mt-1 text-xs leading-5 text-[#66574D]">
                                                    {address.area}, {address.city},{" "}
                                                    {address.state}
                                                </p>
                                            </button>
                                        ))}

                                    </div>
                                ) : (
                                    <p className="px-4 py-4 text-sm text-[#66574D]">
                                        No saved address found.
                                    </p>
                                )}

                                <button
                                    type="button"
                                    onClick={() => router.push("/add-address")}
                                    className="w-full border-t border-[#E9DFD0] px-4 py-3 text-left text-sm font-medium text-[#6B3F24] hover:bg-[#F4EFE6] transition"
                                >
                                    + Add New Address
                                </button>

                            </div>
                        )}

                    </div>

                    {!selectedAddress && (
                        <button
                            onClick={() => router.push("/add-address")}
                            className="mt-3 text-xs font-medium text-[#8A5A32] hover:text-[#2F241D] transition"
                        >
                            Add a delivery address
                        </button>
                    )}

                </div>

                {/* Promo Code */}
                <div className="mb-6">

                    <label className="text-xs font-medium uppercase tracking-wider text-[#66574D] block mb-2">
                        Promo Code
                    </label>

                    <div className="flex gap-2">

                        <input
                            type="text"
                            placeholder="Enter code"
                            className="min-w-0 flex-1 rounded-xl border border-[#DCCFC0] bg-white px-4 py-3 text-sm text-[#2F241D] outline-none placeholder:text-[#A99B8D] focus:border-[#8A5A32]"
                        />

                        <button
                            type="button"
                            className="rounded-xl border border-[#6B3F24] px-4 py-3 text-xs font-medium text-[#6B3F24] transition hover:bg-[#6B3F24] hover:text-white"
                        >
                            Apply
                        </button>

                    </div>

                </div>

                <div className="border-t border-[#E9DFD0] pt-5">

                    {/* Price Details */}
                    <div className="space-y-4">

                        <div className="flex justify-between gap-4 text-sm">
                            <p className="text-[#66574D]">
                                Items ({getCartCount()})
                            </p>

                            <p className="font-medium text-[#2F241D]">
                                {currency}{cartAmount.toFixed(2)}
                            </p>
                        </div>

                        <div className="flex justify-between gap-4 text-sm">
                            <p className="text-[#66574D]">
                                Shipping
                            </p>

                            <p className="font-medium text-[#6B3F24]">
                                Free
                            </p>
                        </div>

                        <div className="flex justify-between gap-4 text-sm">
                            <p className="text-[#66574D]">
                                Tax
                            </p>

                            <p className="font-medium text-[#2F241D]">
                                {currency}{tax.toFixed(2)}
                            </p>
                        </div>

                    </div>

                    {/* Total */}
                    <div className="flex items-center justify-between gap-4 border-t border-[#E9DFD0] mt-5 pt-5">

                        <div>
                            <p className="text-base font-medium text-[#2F241D]">
                                Total
                            </p>

                            <p className="text-[11px] text-[#8A7A6D] mt-1">
                                Inclusive of applicable tax
                            </p>
                        </div>

                        <p className="text-xl font-semibold text-[#6B3F24]">
                            {currency}{total.toFixed(2)}
                        </p>

                    </div>

                </div>

                {/* Place Order */}
                <button
                    onClick={createOrder}
                    className="w-full rounded-full bg-[#6B3F24] text-white py-3.5 mt-6 text-sm font-medium transition duration-300 hover:bg-[#2F241D] hover:shadow-lg"
                >
                    Place Order
                </button>

                <p className="text-center text-[10px] leading-5 text-[#8A7A6D] mt-3">
                    By placing your order, you agree to our order and delivery
                    terms.
                </p>

            </div>

        </div>
    );
};

export default OrderSummary;