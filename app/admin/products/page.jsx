import ProductTable from "@/components/AdminPage/ProductTable";
import connectDB from "@/config/database";
import ProductModel from "@/models/ProductModel";
import { redirect } from "next/navigation";
import React from "react";

const fetchProducts = async (pageNo, perPage) => {
  const skipCount = (pageNo - 1) * perPage;

  await connectDB();

  const products = await ProductModel.find()
    .sort("-createdAt")
    .skip(skipCount)
    .limit(perPage);

  return products.map((product) => {
    return {
      id: product._id.toString(),
      title: product.title,
      thumbnail: product.thumbnail.url,
      description: product.description,
      price: {
        mrp: product.price.base,
        salePrice: product.price.discounted,
      },
      quantity: product.quantity,
    };
  });
};

const PRODUCTS_PER_PAGE = 10;

const Products = async ({ searchParams }) => {
  const { page = "1" } = searchParams;

  if (isNaN(+page)) {
    return redirect("/404");
  }

  const products = await fetchProducts(+page, PRODUCTS_PER_PAGE);

  let hasMore = true;

  if (products.length < PRODUCTS_PER_PAGE) {
    hasMore = false;
  } else {
    hasMore = true;
  }

  return (
    <div>
      <ProductTable
        products={products}
        currentPageNo={+page}
        hasMore={hasMore}
      />
    </div>
  );
};

export default Products;
