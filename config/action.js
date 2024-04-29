"use server";

import cloudinary from "./config";
import connectDB from "./database";
import ProductModel from "@/models/ProductModel";

export const removeImageFromCloud = async (publicId) => {
  await cloudinary.uploader.destroy(publicId);
};

export const removeAndUpdateProductImage = async (id, publicId) => {
  try {
    const { result } = await cloudinary.uploader.destroy(publicId);

    if (result === "ok") {
      await connectDB();

      await ProductModel.findByIdAndUpdate(id, {
        $pull: { images: { id: publicId } },
      });
    }
  } catch (error) {
    console.log("Error while removing image from cloud: ", error.message);
    throw error;
  }
};
