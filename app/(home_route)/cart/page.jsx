import CartItems from "@/components/CartPage/CartItems";
import connectDB from "@/config/database";
import Cart from "@/models/CartModel";
import { authOptions } from "@/utils/authOptions";
import { Types } from "mongoose";
import { getServerSession } from "next-auth";
import React from "react";

const fetchCartProducts = async () => {
  const session = await getServerSession(authOptions);

  console.log("getServerSession=", session);

  if (!session?.user) {
    return null;
  }
  await connectDB();

  const [cartItems] = await Cart.aggregate([
    { $match: { userId: new Types.ObjectId(session.user.id) } },
    { $unwind: "$items" },
    {
      $lookup: {
        from: "products",
        foreignField: "_id",
        localField: "items.productId",
        as: "product",
      },
    },
    {
      $project: {
        _id: 0,
        id: { $toString: "$_id" },
        totalQty: { $sum: "$items.quantity" },
        products: {
          id: { $toString: { $arrayElemAt: ["$product._id", 0] } },
          thumbnail: { $arrayElemAt: ["$product.thumbnail.url", 0] },
          title: { $arrayElemAt: ["$product.title", 0] },
          price: { $arrayElemAt: ["$product.price.discounted", 0] },
          qty: "$items.quantity",
          totalPrice: {
            $multiply: [
              { $toInt: "$items.quantity" },
              { $arrayElemAt: ["$product.price.discounted", 0] },
            ],
          },
        },
      },
    },
    {
      $group: {
        _id: null,
        id: { $first: "$id" },
        totalQty: { $sum: "$totalQty" },
        totalPrice: { $sum: "$products.totalPrice" },
        products: { $push: "$products" },
      },
    },
    {
      $project: {
        _id: 0,
        id: 1,
        totalQty: 1,
        totalPrice: 1,
        products: 1,
      },
    },
  ]);

  return cartItems;
};

const CartPage = async () => {
  const cart = await fetchCartProducts();

  if (!cart)
    return (
      <div className="py-4 text-black bg-white px-[10%] pt-12">
        <div className="mb-4">
          <h1 className="text-2xl font-semibold">Your Cart Details</h1>
          <hr />
        </div>
        <h1 className="py-10 text-2xl font-semibold text-center opacity-40">
          Your cart is empty!
        </h1>
      </div>
    );

  return (
    <div className="text-black bg-white px-[10%] pt-12">
      <CartItems {...cart} />
    </div>
  );
};

export default CartPage;
