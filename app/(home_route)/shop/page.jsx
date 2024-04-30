import React from "react";
import Header from "@/components/ShopPage/Header";
import Products from "@/components/ShopPage/products";
import connectDB from "@/config/database";
import ProductModel from "@/models/ProductModel";

const fetchLatestProducts = async () => {
  await connectDB();

  const products = await ProductModel.find().sort("-createdAt").limit(20);

  const productList = products.map((product) => {
    return {
      id: product._id.toString(),
      title: product.title,
      description: product.description,
      thumbnail: product.thumbnail.url,
      price: product.price,
      sale: product.sale,
      rating: product.rating,
    };
  });

  return JSON.stringify(productList);
};

const ShopPage = async () => {
  const latestProducts = await fetchLatestProducts();

  const parsedProducts = JSON.parse(latestProducts);

  return (
    <>
      <div className=" px-[8%]">
        <Header />
        <div className="mt-20 sm:grid sm:grid-cols-12">
          <div className="col-span-12 mb-32">
            <Products products={parsedProducts} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopPage;
