"use client";

import React from "react";
import BuyingOptions from "./BuyingOptions";
import { formatPrice } from "@/utils/helpers";
import ProductImageGallery from "./ProductImageGallery";

export default function ProductView({
  description,
  images,
  title,
  points,
  price,
  sale,
}) {
  return (
    <div className="flex flex-col gap-2 lg:flex-row md:gap-12">
      <div className="self-center flex-1 lg:self-start">
        {/* Product Image Slider */}
        <ProductImageGallery images={images} />
      </div>

      <div className="flex-1 space-y-2 md:space-y-4">
        <h1 className="text-xl font-semibold md:text-3xl">{title}</h1>
        <p>{description}</p>

        <div className="pl-4 space-y-2">
          {points &&
            points.map((point, index) => {
              return <li key={index}>{point}</li>;
            })}
        </div>

        <div className="flex items-center mb-2 space-x-2 font-serif">
          <p className="text-xl line-through">{formatPrice(price.base)}</p>
          <p className="text-xl font-semibold">
            {formatPrice(price.discounted)}
          </p>
          <p className="font-bold uppercase whitespace-nowrap select-none bg-red-500 text-white py-1.5 px-3 text-xs rounded-lg">
            {`${sale}% off`}
          </p>
        </div>

        <div className="flex py-4 pb-40">
          <BuyingOptions />
        </div>
      </div>
    </div>
  );
}
