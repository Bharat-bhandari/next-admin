"use client";

import React from "react";
import ProductForm from "./ProductForm";
import {
  removeAndUpdateProductImage,
  removeImageFromCloud,
} from "@/config/action";
import { updateProductInfoSchema } from "@/utils/validationSchema";
import { ValidationError } from "yup";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";

const UpdateProduct = ({ product }) => {
  const router = useRouter();

  const initialValue = {
    ...product,
    thumbnail: product.thumbnail.url,
    images: product.images?.map(({ url }) => url),
    mrp: product.price.mrp,
    salePrice: product.price.salePrice,
    bulletPoints: product.bulletPoints || [],
  };

  const handleImageRemove = (source) => {
    const splittedData = source.split("/");

    const lastItem = splittedData[splittedData.length - 1];
    const SecondLastItem = splittedData[splittedData.length - 2];

    const publicId = SecondLastItem + "/" + lastItem.split(".")[0];

    // console.log(publicId);

    removeAndUpdateProductImage(product.id, publicId);
  };

  const handleOnSubmit = async (values) => {
    try {
      await updateProductInfoSchema.validate(values, { abortEarly: false });

      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("mrp", values.mrp);
      formData.append("salePrice", values.salePrice);
      formData.append("quantity", values.quantity);
      // Append bullet points
      values.bulletPoints.forEach((bulletPoint, index) => {
        formData.append(`bulletPoints[${index}]`, bulletPoint);
      });
      // Append images
      values.images.forEach((image, index) => {
        formData.append(`images[${index}]`, image);
      });

      if (values.thumbnail) {
        // await removeImageFromCloud(product.thumbnail.id);
        formData.append("thumbnail", values.thumbnail);
      }

      // console.log(formData);

      const res = await axios.put(`/api/products/${values.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 200) {
        router.push("/admin/products");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      if (error instanceof ValidationError) {
        error.inner.map((err) => {
          toast.error(err.message);
        });
      }
    }
  };

  return (
    <ProductForm
      onImageRemove={handleImageRemove}
      initialValue={initialValue}
      onSubmit={handleOnSubmit}
    />
  );
};

export default UpdateProduct;
