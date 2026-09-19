import React from "react";
import Link from "next/link";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { usePathname } from "next/navigation";

const SideBar = () => {
  const pathname = usePathname();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/seller",
      icon: assets.dashboard_icon || assets.product_list_icon,
    },
    {
      name: "Add Product",
      path: "/seller/add-product",
      icon: assets.add_icon,
    },
    {
      name: "Product List",
      path: "/seller/product-list",
      icon: assets.product_list_icon,
    },
    {
      name: "Categories",
      path: "/seller/categories",
      icon: assets.product_list_icon,
    },
    {
      name: "Orders",
      path: "/seller/orders",
      icon: assets.order_icon,
    },
    {
      name: "Customers",
      path: "/seller/customers",
      icon: assets.user_icon || assets.profile_icon || assets.product_list_icon,
    },
    {
      name: "Reviews",
      path: "/seller/reviews",
      icon: assets.review_icon || assets.product_list_icon,
    },
    {
      name: "Contact Messages",
      path: "/seller/contact-messages",
      icon: assets.product_list_icon,
    },
  ];
  return (
    <div className="md:w-64 w-16 border-r border-[#E9DFD0] min-h-screen bg-white text-sm flex flex-col py-4">
      {menuItems.map((item) => {
        const isActive = pathname === item.path;

        return (
          <Link href={item.path} key={item.name}>
            <div
              className={`flex items-center py-3.5 px-4 gap-3 transition ${
                isActive
                  ? "bg-[#F4EFE6] border-r-4 border-[#6B3F24] text-[#6B3F24]"
                  : "text-[#66574D] hover:bg-[#F8F5EF]"
              }`}
            >
              <Image
                src={item.icon}
                alt={`${item.name} icon`}
                width={24}
                height={24}
                className="w-6 h-6"
              />

              <p className="md:block hidden font-medium">{item.name}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default SideBar;
