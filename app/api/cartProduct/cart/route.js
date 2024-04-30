import connectDB from "@/config/database";
import Cart from "@/models/CartModel";
import { getUserSession } from "@/utils/getUserSession";
import mongoose, { isValidObjectId } from "mongoose";

export const POST = async (request) => {
  try {
    const session = await getUserSession();
    // console.log("hekk", session);

    const user = { ...session, _id: session._id.toString() };

    if (!session)
      return new Response(JSON.stringify({ error: "unauthorized request!" }), {
        status: 401,
      });

    const { productId, quantity } = await request.json();

    if (!isValidObjectId(productId) || isNaN(quantity))
      return new Response(JSON.stringify({ error: "Invalid request!" }), {
        status: 401,
      });

    await connectDB();

    const cart = await Cart.findOne({ userId: user._id });

    if (!cart) {
      // creating new cart if there is no old cart
      await Cart.create({
        userId: user._id,
        items: [{ productId, quantity }],
      });

      return new Response(JSON.stringify({ message: "Success" }), {
        status: 200,
      });
    }

    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId
    );

    if (existingItem) {
      // update quantity if item already exists
      existingItem.quantity += quantity;

      if (existingItem.quantity <= 0) {
        // Remove item (product) if quantity becomes zero

        cart.items = cart.items.filter(
          (item) => item.productId.toString() !== productId
        );
      }
    } else {
      // add new item if it doesn't exists

      //   const productIdObject = new mongoose.Types.ObjectId(productId);
      cart.items.push({ productId, quantity });
    }

    await cart.save();

    return new Response(JSON.stringify({ message: "Success" }), {
      status: 200,
    });
  } catch (error) {
    console.error(error); // Log errors
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
};
