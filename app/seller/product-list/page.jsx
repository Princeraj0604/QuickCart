"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import Footer from "@/components/seller/Footer";
import Loading from "@/components/Loading";
import axios from "axios";
import { toast } from "react-hot-toast";

const ProductList = () => {
  const { router, getToken, user, currency } = useAppContext();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState("");

  const fetchSellerProduct = async () => {
    try {
      setLoading(true);

      const token = await getToken();

      const { data } = await axios.get("/api/product/seller-list", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        setProducts(data.products);
      } else {
        toast.error(data.message || "Failed to load products");
      }
    } catch (error) {
      console.error("PRODUCT LIST ERROR:", error);

      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to load products",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (product) => {
    try {
      setActionLoading(product._id);

      const token = await getToken();

      const { data } = await axios.patch(
        "/api/product/seller-manage",
        {
          id: product._id,
          isActive: !product.isActive,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (data.success) {
        toast.success(data.message);
        fetchSellerProduct();
      } else {
        toast.error(data.message || "Failed to update status");
      }
    } catch (error) {
      console.error("PRODUCT STATUS ERROR:", error);

      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to update product status",
      );
    } finally {
      setActionLoading("");
    }
  };

  const handleDeleteProduct = async (product) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${product.name}"?`,
    );

    if (!confirmed) return;

    try {
      setActionLoading(product._id);

      const token = await getToken();

      const { data } = await axios.delete("/api/product/seller-manage", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          id: product._id,
        },
      });

      if (data.success) {
        toast.success("Product deleted successfully");
        fetchSellerProduct();
      } else {
        toast.error(data.message || "Failed to delete product");
      }
    } catch (error) {
      console.error("PRODUCT DELETE ERROR:", error);

      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to delete product",
      );
    } finally {
      setActionLoading("");
    }
  };

  useEffect(() => {
    if (user) {
      fetchSellerProduct();
    }
  }, [user]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex-1 min-h-screen bg-[#F8F5EF] flex flex-col justify-between">
      <main className="w-full px-4 sm:px-6 lg:px-10 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-[#8A5A32] font-medium">
                MITHILA SELLER PANEL
              </p>

              <h1 className="mt-2 text-3xl md:text-4xl font-serif text-[#2F241D]">
                Product List
              </h1>

              <p className="mt-2 text-sm text-[#66574D]">
                Manage and review your Thekua products.
              </p>
            </div>

            <button
              onClick={() => router.push("/seller/add-product")}
              className="w-fit rounded-full bg-[#6B3F24] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#2F241D]"
            >
              + Add Product
            </button>
          </div>

          {/* Product Count */}

          <div className="mb-5">
            <p className="text-sm text-[#66574D]">
              <span className="font-semibold text-[#2F241D]">
                {products.length}
              </span>{" "}
              {products.length === 1 ? "product" : "products"} in your store
            </p>
          </div>

          {/* Empty State */}

          {products.length === 0 ? (
            <div className="bg-white rounded-2xl border border-[#E9DFD0] px-6 py-16 text-center">
              <div className="mx-auto w-16 h-16 rounded-full bg-[#F4EFE6] flex items-center justify-center text-[#6B3F24] text-xl">
                P
              </div>

              <h2 className="mt-5 text-xl font-medium text-[#2F241D]">
                No products yet
              </h2>

              <p className="mt-2 text-sm text-[#66574D] max-w-md mx-auto">
                Start building your Mithila collection by adding your first
                Thekua product.
              </p>

              <button
                onClick={() => router.push("/seller/add-product")}
                className="mt-6 rounded-full bg-[#6B3F24] px-6 py-3 text-sm font-medium text-white hover:bg-[#2F241D] transition"
              >
                Add Your First Product
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-[#E9DFD0] overflow-hidden">
              {/* Desktop Table */}

              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#F8F5EF] border-b border-[#E9DFD0]">
                    <tr className="text-left">
                      <th className="px-6 py-4 text-xs uppercase tracking-wider font-medium text-[#66574D]">
                        Product
                      </th>

                      <th className="px-4 py-4 text-xs uppercase tracking-wider font-medium text-[#66574D]">
                        Category
                      </th>

                      <th className="px-4 py-4 text-xs uppercase tracking-wider font-medium text-[#66574D]">
                        Pack
                      </th>

                      <th className="px-4 py-4 text-xs uppercase tracking-wider font-medium text-[#66574D]">
                        Price
                      </th>

                      <th className="px-4 py-4 text-xs uppercase tracking-wider font-medium text-[#66574D]">
                        Status
                      </th>

                      <th className="px-6 py-4 text-xs uppercase tracking-wider font-medium text-[#66574D] text-right">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {products.map((product) => {
                      const discount =
                        product.price > product.offerPrice
                          ? Math.round(
                              ((product.price - product.offerPrice) /
                                product.price) *
                                100,
                            )
                          : 0;

                      return (
                        <tr
                          key={product._id}
                          className="border-b border-[#E9DFD0] last:border-b-0 hover:bg-[#FCFAF7] transition"
                        >
                          {/* Product */}

                          <td className="px-6 py-4">
                            <div className="flex items-center gap-4 min-w-[280px]">
                              <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#F4EFE6] shrink-0">
                                <Image
                                  src={product.images?.[0]}
                                  alt={product.name}
                                  width={100}
                                  height={100}
                                  className="w-full h-full object-cover"
                                />
                              </div>

                              <div className="min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <p className="font-medium text-[#2F241D] truncate max-w-[220px]">
                                    {product.name}
                                  </p>

                                  {product.bestSeller && (
                                    <span className="rounded-full bg-[#6B3F24] px-2 py-1 text-[9px] uppercase tracking-wider text-white">
                                      Best Seller
                                    </span>
                                  )}

                                  {product.newArrival && (
                                    <span className="rounded-full bg-[#F4EFE6] px-2 py-1 text-[9px] uppercase tracking-wider text-[#6B3F24]">
                                      New
                                    </span>
                                  )}
                                </div>

                                <p className="mt-1 text-xs text-[#8A7A6D]">
                                  {product.shortDescription ||
                                    product.description}
                                </p>
                              </div>
                            </div>
                          </td>

                          {/* Category */}

                          <td className="px-4 py-4">
                            <span className="text-sm text-[#66574D]">
                              {product.category}
                            </span>
                          </td>

                          {/* Pack */}

                          <td className="px-4 py-4">
                            <span className="text-sm text-[#66574D]">
                              {product.packSize || "-"}
                            </span>
                          </td>

                          {/* Price */}

                          <td className="px-4 py-4">
                            <div>
                              <p className="font-semibold text-[#6B3F24]">
                                {currency}
                                {product.offerPrice}
                              </p>

                              {product.price > product.offerPrice && (
                                <div className="flex items-center gap-2 mt-1">
                                  <p className="text-xs text-[#8A7A6D] line-through">
                                    {currency}
                                    {product.price}
                                  </p>

                                  <span className="text-[10px] font-medium text-[#8A5A32]">
                                    {discount}% OFF
                                  </span>
                                </div>
                              )}
                            </div>
                          </td>

                          {/* Status */}

                          <td className="px-4 py-4">
                            <div className="flex flex-col gap-2">
                              <span
                                className={`w-fit rounded-full px-2.5 py-1 text-[10px] font-medium ${
                                  product.isActive
                                    ? "bg-green-50 text-green-700"
                                    : "bg-red-50 text-red-700"
                                }`}
                              >
                                {product.isActive ? "Active" : "Inactive"}
                              </span>
                            </div>
                          </td>

                          {/* Action */}

                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() =>
                                  router.push(
                                    `/seller/edit-product/${product._id}`,
                                  )
                                }
                                disabled={actionLoading === product._id}
                                className="rounded-full border border-[#6B3F24] px-4 py-2 text-xs font-medium text-[#6B3F24] hover:bg-[#6B3F24] hover:text-white transition disabled:opacity-50"
                              >
                                Edit
                              </button>

                              <button
                                onClick={() => handleToggleStatus(product)}
                                disabled={actionLoading === product._id}
                                className={`rounded-full px-4 py-2 text-xs font-medium transition disabled:opacity-50 ${
                                  product.isActive
                                    ? "border border-[#8A5A32] text-[#8A5A32] hover:bg-[#F4EFE6]"
                                    : "bg-green-700 text-white hover:bg-green-800"
                                }`}
                              >
                                {product.isActive ? "Deactivate" : "Activate"}
                              </button>

                              <button
                                onClick={() => handleDeleteProduct(product)}
                                disabled={actionLoading === product._id}
                                className="rounded-full border border-red-200 px-4 py-2 text-xs font-medium text-red-600 hover:bg-red-50 transition disabled:opacity-50"
                              >
                                Delete
                              </button>

                              <button
                                onClick={() =>
                                  router.push(`/product/${product._id}`)
                                }
                                disabled={actionLoading === product._id}
                                className="rounded-full border border-[#E9DFD0] px-4 py-2 text-xs font-medium text-[#66574D] hover:bg-[#F4EFE6] transition disabled:opacity-50"
                              >
                                View
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}

              <div className="md:hidden divide-y divide-[#E9DFD0]">
                {products.map((product) => {
                  const discount =
                    product.price > product.offerPrice
                      ? Math.round(
                          ((product.price - product.offerPrice) /
                            product.price) *
                            100,
                        )
                      : 0;

                  return (
                    <div key={product._id} className="p-4">
                      <div className="flex gap-4">
                        <div className="w-20 h-20 rounded-xl overflow-hidden bg-[#F4EFE6] shrink-0">
                          <Image
                            src={product.images?.[0]}
                            alt={product.name}
                            width={120}
                            height={120}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-sm font-medium text-[#2F241D]">
                              {product.name}
                            </p>

                            <span
                              className={`shrink-0 rounded-full px-2 py-1 text-[9px] ${
                                product.isActive
                                  ? "bg-green-50 text-green-700"
                                  : "bg-red-50 text-red-700"
                              }`}
                            >
                              {product.isActive ? "Active" : "Inactive"}
                            </span>
                          </div>

                          <p className="mt-1 text-xs text-[#8A7A6D]">
                            {product.category}
                          </p>

                          <p className="mt-1 text-xs text-[#8A7A6D]">
                            {product.packSize || "Pack size not set"}
                          </p>

                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-sm font-semibold text-[#6B3F24]">
                              {currency}
                              {product.offerPrice}
                            </span>

                            {product.price > product.offerPrice && (
                              <span className="text-xs text-[#8A7A6D] line-through">
                                {currency}
                                {product.price}
                              </span>
                            )}
                          </div>

                          {discount > 0 && (
                            <span className="inline-block mt-1 text-[10px] text-[#8A5A32]">
                              {discount}% OFF
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-3 mt-4">
                        <div className="flex gap-2">
                          {product.bestSeller && (
                            <span className="rounded-full bg-[#6B3F24] px-2.5 py-1 text-[9px] uppercase tracking-wider text-white">
                              Best Seller
                            </span>
                          )}

                          {product.newArrival && (
                            <span className="rounded-full bg-[#F4EFE6] px-2.5 py-1 text-[9px] uppercase tracking-wider text-[#6B3F24]">
                              New
                            </span>
                          )}
                        </div>

                        <div className="grid grid-cols-2 gap-2 mt-4">
                          <button
                            onClick={() =>
                              router.push(`/seller/edit-product/${product._id}`)
                            }
                            disabled={actionLoading === product._id}
                            className="w-full rounded-full border border-[#6B3F24] px-3 py-2 text-xs font-medium text-[#6B3F24] transition disabled:opacity-50"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => handleToggleStatus(product)}
                            disabled={actionLoading === product._id}
                            className={`w-full rounded-full px-3 py-2 text-xs font-medium transition disabled:opacity-50 ${
                              product.isActive
                                ? "border border-[#8A5A32] text-[#8A5A32]"
                                : "bg-green-700 text-white"
                            }`}
                          >
                            {product.isActive ? "Deactivate" : "Activate"}
                          </button>

                          <button
                            onClick={() => handleDeleteProduct(product)}
                            disabled={actionLoading === product._id}
                            className="w-full rounded-full border border-red-200 px-3 py-2 text-xs font-medium text-red-600 transition disabled:opacity-50"
                          >
                            Delete
                          </button>

                          <button
                            onClick={() =>
                              router.push(`/product/${product._id}`)
                            }
                            disabled={actionLoading === product._id}
                            className="w-full rounded-full border border-[#E9DFD0] px-3 py-2 text-xs font-medium text-[#66574D] transition disabled:opacity-50"
                          >
                            View
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductList;
