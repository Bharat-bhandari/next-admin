const { Schema, model, Types, models } = require("mongoose");

const orderSchema = new Schema(
  {
    userId: { type: Types.ObjectId, ref: "User", required: true },
    stripeCustomerId: { type: String, required: true },
    paymentIntent: { type: String, required: true },
    totalAmount: { type: Number, required: true },
    shippingDetails: {
      address: {
        city: { type: String, required: true },
        country: { type: String, required: true },
        line1: { type: String, required: true },
        line2: { type: String, default: null },
        postal_code: { type: String, required: true },
        state: { type: String, required: true },
      },
      email: { type: String, required: true },
      name: { type: String, required: true },
    },
    paymentStatus: { type: String, required: true },
    deliveryStatus: {
      type: String,
      enum: ["delivered", "ordered", "shipped"],
      default: "ordered",
    },
    orderItems: [
      {
        id: { type: String, required: true },
        title: { type: String, required: true },
        thumbnail: { type: String, required: true },
        totalPrice: { type: Number, required: true },
        price: { type: Number, required: true },
        qty: { type: Number, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const OrderModel = models.Order || model("Order", orderSchema);

export default OrderModel;
