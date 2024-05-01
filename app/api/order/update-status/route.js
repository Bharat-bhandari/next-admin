import connectDB from "@/config/database";
import OrderModel from "@/models/orderModel";
import { getUserSession } from "@/utils/getUserSession";
import { isValidObjectId } from "mongoose";

const validStatus = ["delivered", "ordered", "shipped"];

export const POST = async (req) => {
  const session = await getUserSession();

  if (session?.role !== "admin")
    return new Response("Unauthorized request", { status: 401 });

  const { orderId, deliveryStatus } = await req.json();

  if (!isValidObjectId(orderId) || !validStatus.includes(deliveryStatus))
    return new Response("Invalid data", { status: 401 });

  await connectDB();

  await OrderModel.findByIdAndUpdate(orderId, { deliveryStatus });

  return new Response("Success", { status: 200 });
};
