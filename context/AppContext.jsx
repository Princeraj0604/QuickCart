'use client'

import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import { toast } from "react-hot-toast";
import axios from "axios";

export const AppContext = createContext();

export const useAppContext = () => {
    return useContext(AppContext);
};

export const AppContextProvider = (props) => {

    const currency = process.env.NEXT_PUBLIC_CURRENCY;
    const router = useRouter();

    const { user } = useUser();
    const { getToken } = useAuth();

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [userData, setUserData] = useState(false);
    const [isSeller, setIsSeller] = useState(false);
    const [cartItems, setCartItems] = useState({});

    const fetchProductData = async (filters = {}) => {
        try {
            const params = new URLSearchParams();

            if (filters.category) {
                params.set("category", filters.category);
            }

            if (filters.subcategory) {
                params.set("subcategory", filters.subcategory);
            }

            if (filters.search) {
                params.set("search", filters.search);
            }

            if (filters.sort) {
                params.set("sort", filters.sort);
            }

            if (filters.featured) {
                params.set("featured", "true");
            }

            if (filters.bestSeller) {
                params.set("bestSeller", "true");
            }

            if (filters.newArrival) {
                params.set("newArrival", "true");
            }

            const query = params.toString();

            const { data } = await axios.get(
                query ? `/api/product/list?${query}` : "/api/product/list"
            );

            if (data.success) {
                setProducts(data.products);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const fetchCategories = async () => {
        try {
            const { data } = await axios.get("/api/category/list");

            if (data.success) {
                setCategories(data.categories);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const fetchUserData = async () => {
        try {
            if (user?.publicMetadata?.role === "seller") {
                setIsSeller(true);
            } else {
                setIsSeller(false);
            }

            const token = await getToken();

            const { data } = await axios.get("/api/user/data", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (data.success) {
                setUserData(data.user);
                setCartItems(data.user.cartItems);
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            toast.error(error.message);
        }
    };

    const addToCart = async (itemId) => {

        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            cartData[itemId] += 1;
        } else {
            cartData[itemId] = 1;
        }

        setCartItems(cartData);

        if (user) {
            try {
                const token = await getToken();

                await axios.post(
                    "/api/cart/update",
                    { cartData },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                toast.success("Item added to cart");

            } catch (error) {
                toast.error(error.message);
            }
        }
    };

    const updateCartQuantity = async (itemId, quantity) => {

        let cartData = structuredClone(cartItems);

        if (quantity === 0) {
            delete cartData[itemId];
        } else {
            cartData[itemId] = quantity;
        }

        setCartItems(cartData);

        if (user) {
            try {
                const token = await getToken();

                await axios.post(
                    "/api/cart/update",
                    { cartData },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                toast.success("Cart updated successfully");

            } catch (error) {
                toast.error(error.message);
            }
        }
    };

    const getCartCount = () => {
        let totalCount = 0;

        for (const items in cartItems) {
            if (cartItems[items] > 0) {
                totalCount += cartItems[items];
            }
        }

        return totalCount;
    };

    const getCartAmount = () => {
        let totalAmount = 0;

        for (const items in cartItems) {
            let itemInfo = products.find(
                (product) => product._id === items
            );

            if (itemInfo && cartItems[items] > 0) {
                totalAmount +=
                    itemInfo.offerPrice * cartItems[items];
            }
        }

        return Math.floor(totalAmount * 100) / 100;
    };

    useEffect(() => {
        fetchProductData();
        fetchCategories();
    }, []);

    useEffect(() => {
        if (user) {
            fetchUserData();
        } else {
            setUserData(false);
            setIsSeller(false);
            setCartItems({});
        }
    }, [user]);

    const value = {
        user,
        getToken,
        currency,
        router,

        isSeller,
        setIsSeller,

        userData,
        fetchUserData,

        products,
        fetchProductData,

        categories,
        fetchCategories,

        cartItems,
        setCartItems,

        addToCart,
        updateCartQuantity,

        getCartCount,
        getCartAmount
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};