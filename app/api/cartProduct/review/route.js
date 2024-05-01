import connectDB from "@/config/database";
import ReviewModel from "@/models/ReviewModel";
import { getUserSession } from "@/utils/getUserSession";
import { Types, isValidObjectId } from "mongoose";

export const POST = async (request) => {
  const session = await getUserSession();

  if (!session?.username) {
    return new Response(JSON.stringify({ error: "unauthorized request!" }), {
      status: 401,
    });
  }

  const { productId, comment, rating } = await request.json();
  const body = await request.json;

  // console.log("body", body);

  // console.log("Rating:", rating, "Comment:", comment, "productId:", productId);

  // const newProductId = new Types.ObjectId(productId);

  if (!isValidObjectId(productId)) {
    return new Response(JSON.stringify({ error: "Invalid product id !" }), {
      status: 401,
    });
  }

  if (rating <= 0 || rating > 5) {
    return new Response(JSON.stringify({ error: "Invalid rating" }), {
      status: 401,
    });
  }

  const userId = session._id;

  const data = {
    userId,
    rating,
    comment,
    product: productId,
  };

  await connectDB();
  await ReviewModel.findOneAndUpdate({ userId, product: productId }, data, {
    upsert: true,
  });

  return new Response(JSON.stringify({ success: true }), {
    status: 201,
  });
};
