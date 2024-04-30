"use client";

import React, { useState } from "react";
import CartCountUpdater from "../ShopPage/CartCountUpdater";
import Image from "next/image";
import { FaXmark } from "react-icons/fa6";

import { Button } from "@material-tailwind/react";
import { formatPrice } from "@/utils/helpers";

const CartItems = ({ products = [], totalQty, cartTotal }) => {
  const [busy, setBusy] = useState(false);

  return (
    <div>
      <table className="min-w-full divide-y divide-gray-200">
        <tbody className="bg-white divide-y divide-gray-200">
          {products.map((product) => (
            <tr key={product.id}>
              <td className="py-4">
                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  height={40}
                  width={40}
                />
              </td>
              <td className="py-4">{product.title}</td>
              <td className="py-4 font-semibold">
                {formatPrice(product.totalPrice)}
              </td>
              <td className="py-4">
                <CartCountUpdater value={product.qty} disabled={busy} />
              </td>
              <td className="py-4 text-right">
                <button
                  disabled={busy}
                  className="text-red-500"
                  style={{ opacity: busy ? "0.5" : "1" }}
                >
                  <FaXmark className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex flex-col items-end justify-end space-y-4">
        <div className="flex justify-end space-x-4 text-blue-gray-800">
          <p className="text-2xl font-semibold">Total</p>
          <div>
            <p className="text-2xl font-semibold">{formatPrice(cartTotal)}</p>
            <p className="text-sm text-right">{totalQty} items</p>
          </div>
        </div>
        <Button
          className="bg-green-500 shadow-none hover:shadow-none focus:shadow-none focus:scale-105 active:scale-100"
          color="green"
          disabled={busy}
        >
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default CartItems;
