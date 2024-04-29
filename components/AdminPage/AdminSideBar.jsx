import Link from "next/link";
import React, { ReactNode } from "react";

import { PiSquaresFour } from "react-icons/pi";
import { IoCartOutline } from "react-icons/io5";
import { HiOutlineSparkles } from "react-icons/hi2";
import { MdCurrencyRupee } from "react-icons/md";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { IoIosArrowRoundBack } from "react-icons/io";

const AdminSidebar = ({ children }) => {
  return (
    <div className="flex">
      <div className="sticky top-0 flex flex-col justify-between h-screen p-10 w-72 bg-black1">
        <ul className="space-y-4 text-white">
          <li>
            <Link
              className="text-xl font-semibold text-white"
              href="/admin/dashboard"
            >
              Ecommerce
            </Link>
          </li>
          <li>
            <Link
              className="flex items-center space-x-1"
              href="/admin/dashboard"
            >
              <PiSquaresFour className="w-5 h-5" />
              <span className="text-lg">Dashboard</span>
            </Link>
            <hr className="w-full " />
          </li>
          <li>
            <Link
              className="flex items-center space-x-1"
              href="/admin/products"
            >
              <IoCartOutline className="w-5 h-5" />
              <span className="text-lg">Products</span>
            </Link>
            <hr className="w-full " />
          </li>
          {/* <li>
            <Link
              className="flex items-center space-x-1"
              href="/admin/products/featured/add"
            >
              <HiOutlineSparkles className="w-5 h-5" />
               <span className="text-lg">Featured</span>
            </Link>
            <hr className="w-full " />
          </li> */}
          <li>
            <Link className="flex items-center space-x-1" href="/admin/sales">
              <MdCurrencyRupee className="w-5 h-5" />
              <span className="text-lg">Sales</span>
            </Link>
            <hr className="w-full " />
          </li>
          <li>
            <Link className="flex items-center space-x-1" href="/admin/orders">
              <HiOutlineShoppingBag className="w-5 h-5" />
              <span className="text-lg">Orders</span>
            </Link>
            <hr className="w-full " />
          </li>
        </ul>

        <Link href="/">
          <div className="flex items-center justify-center w-full text-white cursor-pointer hover:scale-105 hover:border-white">
            <IoIosArrowRoundBack className="size-7" />
            Go To Home
          </div>
        </Link>

        {/* <div>
          <SignOutButton>
            <div className="text-white cursor-pointer">Logout</div>
          </SignOutButton>
        </div> */}
      </div>
      <div className="flex-1 max-w-screen-xl p-4 mx-auto overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default AdminSidebar;
