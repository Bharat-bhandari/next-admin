"use client";

import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useSession, signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { useTransition } from "react";

const ProductCard = ({ product }) => {
  const { data: session } = useSession();
  const [isPending, startTransition] = useTransition();

  const addToCart = async () => {
    if (!session) {
      await signIn();
    }
    try {
      const response = await axios.post("/api/cartProduct/cart", {
        productId: product.id,
        quantity: 1,
      });

      const { error } = await response.json();

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
    <div className="mb-4 group">
      <Link href={`/shop/${product.title}/${product.id}`}>
        <div className="overflow-hidden rounded-lg h-[20vh]">
          <Image
            src={product.thumbnail}
            alt="Chocolate balls"
            width={300} // Adjust width as needed
            height={200} // Adjust height as needed
            className="w-full h-auto overflow-hidden transition duration-500 transform hover:scale-110"
          />
        </div>
        <div className="mt-2 text-lg text-center">{product.title}</div>
        <div className="flex justify-center">
          <div className="w-10 h-[1px] bg-black  mb-4"></div>
        </div>
      </Link>
      <div className="flex justify-center h-6">
        <button
          onClick={() => {
            startTransition(async () => await addToCart());
          }}
          className="hidden text-lg text-center transition duration-500 opacity-0 cursor-pointer group-hover:scale-105 group-hover:block group-hover:opacity-100"
          disabled={isPending}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
