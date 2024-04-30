"use client";

import React, { useEffect, useState, useTransition } from "react";
import { Button } from "@material-tailwind/react";
import CartCountUpdater from "./CartCountUpdater";
import { useParams } from "next/navigation";
import axios from "axios";
import { useSession, signIn } from "next-auth/react";
import { toast } from "react-toastify";

export default function BuyingOptions() {
  const [quantity, setQuantity] = useState(1);
  const [isPending, startTransition] = useTransition();

  const { product } = useParams();

  const { data: session } = useSession();
  // console.log("session", session);

  const productId = product[1];

  const handleIncrement = () => {
    setQuantity((prevCount) => prevCount + 1);
  };

  const handleDecrement = () => {
    if (quantity === 0) return;
    setQuantity((prevCount) => prevCount - 1);
  };

  const addToCart = async () => {
    if (!productId) return;

    if (!session) {
      await signIn();
    }
    try {
      const response = await axios.post("/api/cartProduct/cart", {
        productId,
        quantity,
      });

      const { error } = response.data;
      if (!response.ok && error) {
        toast.error(error);
      }

      // router.refresh();
    } catch (error) {
      console.error("Error:", error);
      // Handle error here if needed
    }
  };

  return (
    <div className="flex items-center space-x-2 font-serif">
      <CartCountUpdater
        onDecrement={handleDecrement}
        onIncrement={handleIncrement}
        value={quantity}
      />

      {/* <div className="flex gap-4 w-max">
        <button
          className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
          data-ripple-light="true"
        >
          <span class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            <i className="fas fa-heart" aria-hidden="true"></i>
          </span>
        </button>
      </div> */}

      <Button
        onClick={() => {
          startTransition(async () => await addToCart());
        }}
        variant="text"
        disabled={isPending}
        className="bg-gray-200"
      >
        Add to Cart
      </Button>
      <Button color="amber" className="text-white rounded-full bg-black2">
        Buy Now
      </Button>
    </div>
  );
}
