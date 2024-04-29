import UpdateProduct from "@/components/AdminPage/UpdateProduct";
import connectDB from "@/config/database";
import ProductModel from "@/models/ProductModel";
import { isValidObjectId } from "mongoose";
import { redirect } from "next/navigation";
import React from "react";

const fetchProductInfo = async (productId) => {
  if (!isValidObjectId(productId)) return redirect("/404");

  await connectDB();

  const product = await ProductModel.findById(productId);
  if (!product) return redirect("/404");

  const finalProduct = {
    id: product._id.toString(),
    title: product.title,
    thumbnail: product.thumbnail,
    description: product.description,
    price: {
      mrp: product.price.base,
      salePrice: product.price.discounted,
    },
    quantity: product.quantity,
    bulletPoints: product.bulletPoints,
    images: product.images?.map(({ id, url }) => ({ url, id })),
  };

  return JSON.stringify(finalProduct);
};

const UpdatePage = async (props) => {
  const { productId } = props.params;

  const product = await fetchProductInfo(productId);

  return <UpdateProduct product={JSON.parse(product)} />;
};

export default UpdatePage;
