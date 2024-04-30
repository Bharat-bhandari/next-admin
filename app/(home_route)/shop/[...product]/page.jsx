import ProductView from "@/components/ShopPage/ProductView";
import connectDB from "@/config/database";
import ProductModel from "@/models/ProductModel";
import { isValidObjectId } from "mongoose";
import { redirect } from "next/navigation";
import React from "react";

const fetchProduct = async (productId) => {
  if (!isValidObjectId(productId)) return redirect("/404");

  await connectDB();

  const product = await ProductModel.findById(productId);

  if (!product) return redirect("/404");

  return JSON.stringify({
    id: (product._id && product._id.toString()) || "",
    title: product.title,
    description: product.description,
    thumbnail: product.thumbnail.url,
    images: product.images?.map(({ url }) => url),
    bulletPoints: product.bulletPoints,
    price: product.price,
    sale: product.sale,
    rating: product.rating,
  });
};

const Product = async ({ params }) => {
  const { product } = params;

  const productId = product[1];

  const productInfo = JSON.parse(await fetchProduct(productId));

  let productImages = [productInfo.thumbnail];

  if (productInfo.images) {
    productImages = productImages.concat(productInfo.images);
  }

  return (
    <div className="px-[20%] pt-12">
      <ProductView
        title={productInfo.title}
        description={productInfo.description}
        price={productInfo.price}
        sale={productInfo.sale}
        points={productInfo.bulletPoints}
        images={productImages}
      />
    </div>
  );
};

export default Product;
