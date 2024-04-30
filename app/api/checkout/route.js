import { getCartItems } from "@/utils/cartHelper";
import { getUserSession } from "@/utils/getUserSession";
import { isValidObjectId } from "mongoose";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16 ",
});

export const POST = async (req) => {
  try {
    const session = await getUserSession();

    console.log("sesssion =", session);

    if (!session) return new Response("Unauthorized request", { status: 401 });

    const data = await req.json();

    // console.log(data);
    const cartId = data.cartId;

    if (!isValidObjectId(cartId))
      return new Response("Invalid Cart Id", { status: 401 });

    // fetching cart details

    const cartItems = await getCartItems(session._id.toString(), cartId);

    if (!cartItems) return new Response("Cart not found", { status: 404 });

    const line_items = cartItems.products.map((product) => {
      return {
        price_data: {
          currency: "INR",
          unit_amount: product.price * 100,
          product_data: {
            name: product.title,
            images: [product.thumbnail],
          },
        },
        quantity: product.qty,
      };
    });

    const customer = await stripe.customers.create({
      metadata: {
        userId: session._id.toString(),
        cartId: cartId,
        type: "checkout",
      },
    });

    // we need to generate payment link and send to our frontend app

    const params = {
      mode: "payment",
      payment_method_types: ["card"],
      line_items,
      success_url: process.env.PAYMENT_SUCCESS_URL,
      cancel_url: process.env.PAYMENT_CANCEL_URL,
      shipping_address_collection: { allowed_countries: ["IN"] },
      customer: customer.id,
    };

    const checkoutSession = await stripe.checkout.sessions.create(params);

    return new Response(JSON.stringify({ url: checkoutSession.url }), {
      status: 200,
    });
  } catch (error) {
    console.log("Error in stripe", error);
    return new Response(
      JSON.stringify({ error: "Something went wrong, could not checkout" }),
      {
        status: 500,
      }
    );
  }
};
