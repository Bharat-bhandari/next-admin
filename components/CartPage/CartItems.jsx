"use client";

import React, { useState } from "react";
import CartCountUpdater from "../ShopPage/CartCountUpdater";
import Image from "next/image";
import { HiMiniXMark } from "react-icons/hi2";

import { Button } from "@material-tailwind/react";
import { formatPrice } from "@/utils/helpers";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";

const CartItems = ({ products = [], totalQty, totalPrice, id }) => {
  const [busy, setBusy] = useState(false);
  const router = useRouter();

  // console.log(products);

  const handleCheckout = async () => {
    try {
      setBusy(true);
      const res = await axios.post("/api/checkout", {
        cartId: id,
      });

      const { error, url } = res.data;

      console.log("err", error);
      console.log("url", url);

      if (error) {
        toast.error(error);
      } else {
        // open the checkout url

        window.location.href = url;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setBusy(false);
    }
  };

  const updateCart = async (productId, quantity) => {
    try {
      setBusy(true);
      const response = await axios.post("/api/cartProduct/cart", {
        productId,
        quantity,
      });

      router.refresh();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setBusy(false);
    }
  };

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
                <CartCountUpdater
                  onDecrement={() => updateCart(product.id, -1)}
                  onIncrement={() => updateCart(product.id, 1)}
                  value={product.qty}
                  disabled={busy}
                />
              </td>
              <td className="py-4 text-right">
                <button
                  disabled={busy}
                  onClick={() => updateCart(product.id, -product.qty)}
                  className="text-red-500"
                  style={{ opacity: busy ? "0.5" : "1" }}
                >
                  <HiMiniXMark className="w-6 h-6" />
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
            <p className="text-2xl font-semibold">{formatPrice(totalPrice)}</p>
            <p className="text-sm text-right">{totalQty} items</p>
          </div>
        </div>
        <Button
          className="bg-green-500 shadow-none hover:shadow-none focus:shadow-none focus:scale-105 active:scale-100"
          color="green"
          disabled={busy}
          onClick={handleCheckout}
        >
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default CartItems;
