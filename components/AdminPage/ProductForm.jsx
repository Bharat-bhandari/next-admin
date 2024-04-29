"use client";
import {
  Button,
  Input,
  Option,
  Select,
  Textarea,
} from "@material-tailwind/react";
import React, { useEffect, useState, useTransition, useCallback } from "react";

import { FiPlus } from "react-icons/fi";
import { GoTrash } from "react-icons/go";
// import categories from "@/app/utils/categories";
import ImageSelector from "./ImageSelector";

const defaultValue = {
  title: "",
  description: "",
  bulletPoints: [""],
  mrp: 0,
  salePrice: 0,
  // category: "",
  quantity: 0,
};

export default function ProductForm(props) {
  const { onSubmit, onImageRemove, initialValue } = props;
  const [isPending, startTransition] = useTransition();
  const [images, setImages] = useState([]);
  const [thumbnail, setThumbnail] = useState();
  const [isForUpdate, setIsForUpdate] = useState(false);
  const [productInfo, setProductInfo] = useState({ ...defaultValue });
  const [thumbnailSource, setThumbnailSource] = useState();
  const [productImagesSource, setProductImagesSource] = useState();

  const fields = productInfo.bulletPoints;

  const addMoreBulletPoints = () => {
    setProductInfo({
      ...productInfo,
      bulletPoints: [...productInfo.bulletPoints, ""],
    });
  };

  const removeBulletPoint = (indexToRemove) => {
    const points = [...productInfo.bulletPoints];
    const filteredPoints = points.filter((_, index) => index !== indexToRemove);
    setProductInfo({
      ...productInfo,
      bulletPoints: [...filteredPoints],
    });
  };

  const updateBulletPointValue = (value, index) => {
    const oldValues = [...fields];
    oldValues[index] = value;

    setProductInfo({ ...productInfo, bulletPoints: [...oldValues] });
  };

  // const removeImage = useCallback(
  //   (index) => {
  //     const newImages = images.filter((_, idx) => idx !== index);
  //     setImages([...newImages]);
  //   },
  //   [images]
  // );

  const removeImage = async (index) => {
    if (!productImagesSource) return;

    // if image is from cloud we want to remove it from cloud.

    const imageToRemove = productImagesSource[index];
    const cloudSourceUrl = "https://res.cloudinary.com";

    if (imageToRemove.startsWith(cloudSourceUrl)) {
      onImageRemove && onImageRemove(imageToRemove);
    } else {
      // if this image is from local state we want to update local state
      const fileIndexDifference = productImagesSource.length - images.length;
      const indexToRemove = index - fileIndexDifference;

      const newImageFiles = images.filter((_, i) => {
        if (i !== indexToRemove) return true;
      });
      setImages([...newImageFiles]);
    }

    // also we want to update UI
    const newImagesSource = productImagesSource.filter((_, i) => {
      if (i !== index) return true;
    });

    setProductImagesSource([...newImagesSource]);
  };

  const getBtnTitle = () => {
    if (isForUpdate) return isPending ? "Updating..." : "Update";
    return isPending ? "Creating..." : "Create";
  };

  useEffect(() => {
    if (initialValue) {
      setProductInfo({ ...initialValue });
      setThumbnailSource([initialValue.thumbnail]);
      setProductImagesSource(initialValue.images);
      setIsForUpdate(true);
    }
  }, [initialValue]);

  const onImagesChange = useCallback(
    ({ target }) => {
      const files = target.files;
      if (files) {
        const newImages = Array.from(files);
        const oldImages = productImagesSource || [];
        setImages([...images, ...newImages]);
        setProductImagesSource([
          ...oldImages,
          ...newImages.map((file) => URL.createObjectURL(file)),
        ]);
      }
    },
    [images, productImagesSource]
  );

  const onThumbnailChange = useCallback(({ target }) => {
    const files = target.files;
    if (files) {
      const file = files[0];
      setThumbnail(file);
      setThumbnailSource([URL.createObjectURL(file)]);
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    startTransition(async () => {
      await onSubmit({ ...productInfo, images, thumbnail });
    });
  };

  return (
    <div className="max-w-3xl p-4 mx-auto">
      <h1 className="mb-2 text-xl">Add new product</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <h3>Poster</h3>
          <ImageSelector
            id="thumb"
            images={thumbnailSource}
            onChange={onThumbnailChange}
          />

          <h3>Images</h3>
          <ImageSelector
            multiple
            id="images"
            images={productImagesSource}
            onRemove={removeImage}
            onChange={onImagesChange}
          />
        </div>

        <Input
          label="Title"
          value={productInfo.title}
          onChange={(event) =>
            setProductInfo({ ...productInfo, title: event.target.value })
          }
        />

        {/* <div className="w-72">
          <div className="relative w-full min-w-[200px] h-10">
            <input
              className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
              placeholder=" "
            />
            <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
              Username
            </label>
          </div>
        </div> */}
        <div className="w-full">
          <div className="relative w-full min-w-[200px]">
            <textarea
              className="peer h-full min-h-[150px] w-full resize-none rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
              placeholder=" "
              value={productInfo.description}
              onChange={(event) =>
                setProductInfo({
                  ...productInfo,
                  description: event.target.value,
                })
              }
            ></textarea>
            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Description
            </label>
          </div>
        </div>

        {/* <Textarea
          className="h-36"
          label="Description"
          value={productInfo.description}
          onChange={(event) =>
            setProductInfo({ ...productInfo, description: event.target.value })
          }
        /> */}

        {/* <Select
          onChange={(category) => {
            if (category) setProductInfo({ ...productInfo, category });
          }}
          value={productInfo.category}
          label="Select Category"
        >
          {categories.map((c) => (
            <Option value={c} key={c}>
              {c}
            </Option>
          ))}
        </Select> */}

        <div className="flex space-x-4">
          <div className="flex-1 space-y-4">
            <h3>Price</h3>

            <Input
              value={productInfo.mrp}
              label="MRP"
              onChange={(event) => {
                const mrp = +event.target.value;
                setProductInfo({ ...productInfo, mrp });
              }}
              className="mb-4"
            />
            <Input
              value={productInfo.salePrice}
              label="Sale Price"
              onChange={(event) => {
                const salePrice = +event.target.value;
                setProductInfo({ ...productInfo, salePrice });
              }}
              className="mb-4"
            />
          </div>

          <div className="flex-1 space-y-4">
            <h3>Stock</h3>

            <Input
              value={productInfo.quantity}
              label="Qty"
              onChange={(event) => {
                const quantity = +event.target.value;
                if (!isNaN(quantity))
                  setProductInfo({ ...productInfo, quantity });
              }}
              className="mb-4"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3>Bullet points</h3>
          {fields.map((field, index) => (
            <div key={index} className="flex items-center">
              <Input
                type="text"
                value={field}
                label={`Bullet point ${index + 1}`}
                onChange={(event) =>
                  updateBulletPointValue(event.target.value, index)
                }
                className="mb-4"
              />
              {fields.length > 1 ? (
                <button
                  onClick={() => removeBulletPoint(index)}
                  type="button"
                  className="ml-2"
                >
                  <GoTrash className="w-5 h-5" />
                </button>
              ) : null}
            </div>
          ))}

          <button
            disabled={isPending}
            type="button"
            onClick={addMoreBulletPoints}
            className="flex items-center ml-auto space-x-1 text-gray-800"
          >
            <FiPlus className="w-4 h-4" />
            <span>Add more</span>
          </button>
        </div>

        <Button disabled={isPending} type="submit" className="bg-blue-500">
          {getBtnTitle()}
        </Button>
      </form>
    </div>
  );
}
