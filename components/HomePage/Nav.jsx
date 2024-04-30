import React from "react";
import NavUi from "./NavUi";
import { useSession } from "next-auth/react";
import Cart from "@/models/CartModel";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { Types } from "mongoose";

const getCartCount = async () => {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) return 0;

    const userId = session.user.id;

    const cart = await Cart.aggregate([
      { $match: { userId: new Types.ObjectId(userId) } },
      { $unwind: "$items" },
      {
        $group: {
          _id: "$_id",
          totalQuantity: { $sum: "$items.quantity" },
        },
      },
    ]);

    if (cart.length) {
      return cart[0].totalQuantity;
    } else {
      return 0;
    }
  } catch (error) {
    console.log("Error while fetching cart items count", error);
    return 0;
  }
};

const Nav = ({ cartItemsCount }) => {
  return (
    <>
      <NavUi cartItemsCount={cartItemsCount} />
    </>
  );
};

export async function getStaticProps() {
  // Fetch cart count during build
  const cartItemsCount = await getCartCount();
  return {
    props: {
      cartItemsCount,
    },
  };
}

export default Nav;
