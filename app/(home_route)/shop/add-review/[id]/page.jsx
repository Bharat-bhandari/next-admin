import ReviewForm from "@/components/Review/ReviewForm";
import connectDB from "@/config/database";
import ProductModel from "@/models/ProductModel";
import ReviewModel from "@/models/ReviewModel";
import { getUserSession } from "@/utils/getUserSession";
import { Types } from "mongoose";
import Image from "next/image";
import React from "react";

const fetchReview = async (productId) => {
  const session = await getUserSession();
  if (!session?.username) {
    return null;
  }

  await connectDB();
  const review = await ReviewModel.findOne({
    userId: session._id,
    product: productId,
  }).populate({
    path: "product",
    model: ProductModel,
    select: "title thumbnail.url",
  });

  console.log(review);

  if (review) {
    return {
      id: review._id.toString(),
      rating: review.rating,
      comment: review.comment,
      product: {
        title: review.product.title,
        thumbnail: review.product.thumbnail.url,
      },
    };
  }
};

const Review = async ({ params }) => {
  const productId = params.id;

  const review = await fetchReview(productId);

  const initialValue = review
    ? { comment: review.comment || "", rating: review.rating }
    : undefined;

  return (
    <div className="px-[10%] py-4 space-y-4">
      <div className="flex items-center space-x-4">
        <Image
          src={review?.product.thumbnail}
          alt={review?.product.title}
          width={100}
          height={100}
          className="rounded"
        />
        <h3 className="font-semibold">{review?.product.title}</h3>
      </div>

      <ReviewForm productId={productId} initialValue={initialValue} />
    </div>
  );
};

export default Review;
