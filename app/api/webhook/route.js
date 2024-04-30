import OrderModel from "@/models/orderModel";
import { getCartItems } from "@/utils/cartHelper";
import { TbEyePlus } from "react-icons/tb";
import Stripe from "stripe";

const stripeSecret = process.env.STRIPE_SECRET_KEY;
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

const stripe = new Stripe(stripeSecret, {
  apiVersion: "2023-10-16 ",
});

export const POST = async (req) => {
  const data = await req.text();

  const signature = req.headers.get("stripe-signature");

  let event;

  try {
    event = await stripe.webhooks.constructEvent(
      data,
      signature,
      webhookSecret
    );
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: error }), {
      status: 400,
    });
  }

  console.log("Event Type = ", event.type);

  if (event.type === "checkout.session.completed") {
    const stripeSession = event.data.object;

    const customer = await stripe.customers.retrieve(stripeSession.customer);

    const { cartId, userId, type } = customer.metadata;

    // create new order

    if (type === "checkout") {
      const cartItems = await getCartItems(userId, cartId);

      await OrderModel.create({
        userId,
        stripeCustomerId: stripeSession.customer,
        paymentIntent: stripeSession.payment_intent,
        totalAmount: stripeSession.amount_subtotal / 100,
        shippingDetails: {
          address: stripeSession.customer_details.address,
          email: stripeSession.customer_details.email,
          name: stripeSession.customer_details.name,
        },
        paymentStatus: stripeSession.payment_status,
        deliveryStatus: "ordered",
        orderItems: cartItems.products,
      });
    }

    // recount the stock
  }

  return new Response(JSON.stringify({}), {
    status: 200,
  });
};
