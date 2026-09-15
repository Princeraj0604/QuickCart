"use client";

import React, { useEffect, useState } from "react";

import axios from "axios";
import Link from "next/link";
import { toast } from "react-hot-toast";
import Loading from "@/components/Loading";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCustomers = async () => {
    try {
      const { data } = await axios.get("/api/seller/customers");

      if (data.success) {
        setCustomers(data.customers);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatAmount = (amount) => {
    return `₹${Number(amount || 0).toLocaleString("en-IN")}`;
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex-1 min-h-screen bg-[#FAF8F4] p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <p className="text-sm text-[#8A5A32] font-medium mb-1">MITHILA</p>

          <h1 className="text-2xl md:text-3xl font-medium text-[#2F241D]">
            Customers
          </h1>

          <p className="text-sm text-[#66574D] mt-1">
            View customers and their order activity.
          </p>
        </div>

        <Link
          href="/seller"
          className="w-fit px-5 py-2.5 bg-[#6B3F24] text-white text-sm rounded-md hover:bg-[#56301C] transition"
        >
          Back to Dashboard
        </Link>
      </div>

      {/* Summary */}
      <div className="bg-white border border-[#E9DFD0] rounded-xl p-5 mb-6">
        <p className="text-sm text-[#66574D] mb-2">Total Customers</p>

        <h2 className="text-3xl font-medium text-[#2F241D]">
          {customers.length}
        </h2>
      </div>

      {/* Empty State */}
      {customers.length === 0 ? (
        <div className="bg-white border border-[#E9DFD0] rounded-xl py-20 text-center">
          <h2 className="text-xl font-medium text-[#2F241D]">
            No Customers Yet
          </h2>

          <p className="text-sm text-[#66574D] mt-2">
            Customers will appear here after they place an order.
          </p>
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden lg:block bg-white border border-[#E9DFD0] rounded-xl overflow-hidden">
            <div className="px-6 py-5 border-b border-[#E9DFD0]">
              <h2 className="text-lg font-medium text-[#2F241D]">
                Customer Overview
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#F8F5EF] text-[#66574D]">
                    <th className="text-left font-medium px-6 py-4">
                      Customer
                    </th>

                    <th className="text-left font-medium px-6 py-4">Email</th>

                    <th className="text-left font-medium px-6 py-4">Orders</th>

                    <th className="text-left font-medium px-6 py-4">
                      Total Spent
                    </th>

                    <th className="text-left font-medium px-6 py-4">
                      Last Order
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {customers.map((customer) => (
                    <tr
                      key={customer._id}
                      className="border-t border-[#E9DFD0] hover:bg-[#FCFAF7] transition"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={
                              customer.imageUrl ||
                              "/images/placeholder-user.png"
                            }
                            alt={customer.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />

                          <div>
                            <p className="font-medium text-[#2F241D]">
                              {customer.name}
                            </p>

                            <p className="text-xs text-[#8A5A32]">Customer</p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-[#66574D]">
                        {customer.email}
                      </td>

                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-[#F4EFE6] text-[#6B3F24] rounded-full text-xs font-medium">
                          {customer.totalOrders}
                        </span>
                      </td>

                      <td className="px-6 py-4 font-medium text-[#2F241D]">
                        {formatAmount(customer.totalSpent)}
                      </td>

                      <td className="px-6 py-4 text-[#66574D]">
                        {formatDate(customer.lastOrderDate)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile / Tablet Cards */}
          <div className="lg:hidden space-y-4">
            {customers.map((customer) => (
              <div
                key={customer._id}
                className="bg-white border border-[#E9DFD0] rounded-xl p-5"
              >
                <div className="flex items-center gap-3 mb-5">
                  <img
                    src={customer.imageUrl || "/images/placeholder-user.png"}
                    alt={customer.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />

                  <div>
                    <h2 className="font-medium text-[#2F241D]">
                      {customer.name}
                    </h2>

                    <p className="text-sm text-[#66574D] break-all">
                      {customer.email}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[#F8F5EF] rounded-lg p-3">
                    <p className="text-xs text-[#66574D]">Orders</p>

                    <p className="text-lg font-medium text-[#2F241D] mt-1">
                      {customer.totalOrders}
                    </p>
                  </div>

                  <div className="bg-[#F8F5EF] rounded-lg p-3">
                    <p className="text-xs text-[#66574D]">Total Spent</p>

                    <p className="text-lg font-medium text-[#2F241D] mt-1">
                      {formatAmount(customer.totalSpent)}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-[#E9DFD0]">
                  <p className="text-xs text-[#66574D]">Last Order</p>

                  <p className="text-sm font-medium text-[#2F241D] mt-1">
                    {formatDate(customer.lastOrderDate)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Customers;
