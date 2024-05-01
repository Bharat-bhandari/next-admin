import ProductModel from "@/models/ProductModel";
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
    const productId = data.productId;

    if (!isValidObjectId(productId))
      return new Response("Invalid Product Id", { status: 401 });

    // fetching product details

    const product = await ProductModel.findById(productId);

    if (!product) return new Response("Product not found", { status: 404 });

    const line_items = {
      price_data: {
        currency: "INR",
        unit_amount: product.price.discounted * 100,
        product_data: {
          name: product.title,
          images: [product.thumbnail.url],
        },
      },
      quantity: 1,
    };
    const customer = await stripe.customers.create({
      metadata: {
        userId: session._id.toString(),
        type: "instant-checkout",
        product: JSON.stringify({
          id: productId,
          title: product.title,
          price: product.price.discounted,
          totalPrice: product.price.discounted,
          thumbnail: product.thumbnail.url,
          qty: 1,
        }),
      },
    });

    // we need to generate payment link and send to our frontend app

    const params = {
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [line_items],
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
