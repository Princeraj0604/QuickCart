import React from "react";
import { useAppContext } from "@/context/AppContext";

const Navbar = () => {
  const { router } = useAppContext();

  return (
    <div className="flex items-center px-4 md:px-8 py-3 justify-between border-b border-[#E9DFD0] bg-white">
      
      <button
        onClick={() => router.push("/")}
        className="font-serif text-2xl md:text-3xl font-semibold tracking-wide text-[#2F241D]"
      >
        MITHILA
      </button>

      <button className="bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm">
        Logout
      </button>

    </div>
  );
};

export default Navbar;