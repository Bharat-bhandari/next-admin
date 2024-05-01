import ReviewsList from "@/components/Review/ReviewList";
import ProductView from "@/components/ShopPage/ProductView";
import connectDB from "@/config/database";
import ProductModel from "@/models/ProductModel";
import ReviewModel from "@/models/ReviewModel";
import { isValidObjectId } from "mongoose";
import Link from "next/link";
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

const fetchProductReviews = async (productId) => {
  await connectDB();

  const reviews = await ReviewModel.find({ product: productId }).populate({
    path: "userId",
    select: "name avatar.url",
  });

  const result = reviews.map((r) => ({
    id: r._id.toString(),
    rating: r.rating,
    comment: r.comment,
    date: r.createdAt,
    userInfo: {
      id: r.userId._id.toString(),
      name: r.userId.name,
      avatar: r.userId.avatar?.url,
    },
  }));

  return JSON.stringify(result);
};

const Product = async ({ params }) => {
  const { product } = params;

  const productId = product[1];

  const productInfo = JSON.parse(await fetchProduct(productId));

  let productImages = [productInfo.thumbnail];

  if (productInfo.images) {
    productImages = productImages.concat(productInfo.images);
  }

  const reviews = await fetchProductReviews(productId);

  console.log(reviews);

  return (
    <div className="px-[15%] pt-12 ">
      <ProductView
        title={productInfo.title}
        description={productInfo.description}
        price={productInfo.price}
        sale={productInfo.sale}
        points={productInfo.bulletPoints}
        images={productImages}
      />

      <div className="py-4">
        <div className="flex items-center justify-between">
          <h1 className="mb-2 text-2xl font-semibold">Reviews</h1>
          <Link href={`/shop/add-review/${productInfo.id}`}>Add Review</Link>
        </div>

        <ReviewsList reviews={JSON.parse(reviews)} />
      </div>
    </div>
  );
};

export default Product;
