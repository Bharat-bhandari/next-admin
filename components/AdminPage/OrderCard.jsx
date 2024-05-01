"use client";

import React, { useTransition } from "react";
import { Avatar } from "@material-tailwind/react";
import profile from "@/assets/images/Profile/profile.png";

import Image from "next/image";
import { formatPrice } from "@/utils/helpers";
import axios from "axios";
import { useRouter } from "next/navigation";

const ORDER_STATUS = ["delivered", "ordered", "shipped"];

const formatAddress = ({ line1, line2, city, country, state, postal_code }) => {
  return (
    <div>
      <p className="font-semibold">
        Line 1: <span className="font-normal">{line1}</span>
      </p>
      {line2 ? (
        <p className="font-semibold">
          Line 2: <span className="font-normal">{line2}</span>
        </p>
      ) : null}
      <div className="flex items-center space-x-2">
        <p className="font-semibold">
          State: <span className="font-normal">{state}</span>
        </p>
        <p className="font-semibold">
          City: <span className="font-normal">{city}</span>
        </p>
        <p className="font-semibold">
          Pcode: <span className="font-normal">{postal_code}</span>
        </p>
        <p className="font-semibold">{country}</p>
      </div>
    </div>
  );
};

export default function OrderCard({ order, disableUpdate = true }) {
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  return (
    <div className="p-2 my-6 space-y-4 border border-blue-400 border-dashed rounded shadow-md">
      <div className="flex justify-between">
        <div className="flex space-x-2">
          <Avatar src={order.customer.avatar || profile} />

          <div>
            <p className="font-semibold">{order.customer.name}</p>
            <p className="text-sm">{order.customer.email}</p>
          </div>
        </div>

        <div>
          <p className="font-semibold">Sub-Total</p>
          <p className="text-sm font-semibold">{formatPrice(order.subTotal)}</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold">Address</p>
          <div className="text-sm">{formatAddress(order.customer.address)}</div>
        </div>
        <div>
          <div className="relative h-10 w-72 min-w-[200px]">
            <select
              disabled={disableUpdate || isPending}
              value={order.deliveryStatus}
              className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              onChange={(e) => {
                startTransition(async () => {
                  await axios.post("/api/order/update-status", {
                    orderId: order.id,
                    deliveryStatus: e.target.value,
                  });

                  router.refresh();
                });
              }}
            >
              {ORDER_STATUS.map((op) => (
                <option value={op} key={op}>
                  {op}
                </option>
              ))}
            </select>
            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Delivery Status
            </label>
          </div>
        </div>
      </div>

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Product</th>
            <th className="px-4 py-2 text-left">Total</th>
          </tr>
        </thead>
        <tbody>
          {order.products.map((product, index) => (
            <tr
              key={product.id}
              style={
                index < order.products.length - 1
                  ? { borderBottom: "1px solid gray" }
                  : undefined
              }
            >
              <td className="px-4 py-2">
                <div className="flex space-x-2">
                  <Image
                    src={product.thumbnail}
                    width={50}
                    height={50}
                    alt={product.title}
                  />
                  <div>
                    <p className="font-semibold">{product.title}</p>
                    <p className="text-sm">
                      Price: {formatPrice(product.price)}
                    </p>
                    <p className="text-sm">Qty: {product.qty}</p>
                  </div>
                </div>
              </td>

              <td className="px-4 py-2">{formatPrice(product.totalPrice)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
