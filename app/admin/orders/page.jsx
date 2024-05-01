import OrderCard from "@/components/AdminPage/OrderCard";
import connectDB from "@/config/database";
import OrderModel from "@/models/orderModel";
import React from "react";

const fetchOrders = async () => {
  await connectDB();

  const orders = await OrderModel.find().sort("-createdAt").limit(5).populate({
    path: "userId",
    select: "username email image",
  });

  const result = orders.map((order) => {
    return {
      id: order._id.toString(),
      deliveryStatus: order.deliveryStatus,
      subTotal: order.totalAmount,
      customer: {
        id: order.userId ? order.userId._id.toString() : null,
        name: order.userId ? order.userId.username : null,
        email: order.userId ? order.userId.email : null,
        address: order.shippingDetails ? order.shippingDetails.address : null,
        avatar: order.userId ? order.userId.image : null,
      },
      products: order.orderItems,
    };
  });

  return JSON.stringify(result);
};

const OrderPage = async () => {
  const result = await fetchOrders();

  const orders = JSON.parse(result);

  return (
    <div>
      {orders.map((order) => {
        return <OrderCard order={order} key={order.id} disableUpdate={false} />;
      })}
    </div>
  );
};

export default OrderPage;
