import Link from "next/link";
import React from "react";
import { BsCart3 } from "react-icons/bs";

const CartIcon = ({ cartItemsCount }) => {
  return (
    <Link
      className="relative flex items-center justify-center p-2 bg-white rounded-full w-7 h-7 lg:w-8 lg:h-8"
      href="/cart"
    >
      <BsCart3 className="w-5 h-5 text-black" />
      <div className="absolute bg-gray-700 text-white lg:text-xs text-[9px] -top-2 -right-1 w-4 h-4 lg:w-6 lg:h-6 font-sans flex items-center justify-center rounded-full">
        {cartItemsCount}
      </div>
    </Link>
  );
};

export default CartIcon;
