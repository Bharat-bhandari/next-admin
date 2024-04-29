"use client";
import React from "react";
import { TbPhoto } from "react-icons/tb";
import { IoImagesOutline } from "react-icons/io5";

import ImageInput from "./ImageInput";
import { GoTrash } from "react-icons/go";

import SelectedImageThumb from "./SelectedImageThumb";

export default function ImageSelector({
  id,
  images,
  onChange,
  onRemove,
  multiple,
}) {
  const icon = multiple ? (
    <div className="relative">
      <IoImagesOutline className="w-8 h-8 bg-white" />
      <IoImagesOutline className="absolute w-8 h-8 -top-2 -right-2 -z-10" />
    </div>
  ) : (
    <TbPhoto className="w-8 h-8" />
  );

  return (
    <div className="flex items-center space-x-4">
      {images &&
        images.map((img, index) => (
          <div key={index} className="relative">
            <SelectedImageThumb src={img} />
            {multiple && (
              <div
                onClick={() => onRemove && onRemove(index)}
                className="absolute inset-0 flex items-center justify-center text-white bg-black bg-opacity-50 rounded cursor-pointer"
              >
                <GoTrash className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

      <ImageInput id={id} onChange={onChange} multiple={multiple}>
        {icon}
      </ImageInput>
    </div>
  );
}
