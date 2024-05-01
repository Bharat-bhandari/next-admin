"use client";

import React from "react";
import Image from "next/image";
import dateFormat from "dateformat";
import { Chip } from "@material-tailwind/react";
import { formatPrice } from "@/utils/helpers";

const OrderListPublic = ({ orders }) => {
  return (
    <div>
      {orders.map((order) => {
        return (
          <div key={order.id} className="py-4 mb-6 space-y-3">
            <div className="flex items-center justify-between p-2 text-white rounded-md bg-black2">
              <p>ORDERED ON {dateFormat(order.date, "ddd mmm dd yyyy")}</p>
              <p className="inline-block">TOTAL : {formatPrice(order.total)}</p>

              <div className="px-2 py-[0.18rem] rounded-sm font-medium text-black capitalize bg-white">
                {order.paymentStatus}
              </div>
            </div>

            {order.products.map((p) => {
              return (
                <div key={p.id} className="flex space-x-2">
                  <Image
                    src={p.thumbnail}
                    width={50}
                    height={50}
                    alt={p.title}
                  />
                  <div>
                    <p>{p.title}</p>
                    <div className="flex space-x-2 text-sm">
                      <p>Qty. {p.qty}</p>
                      <p>X</p>
                      <p>Price. {formatPrice(p.price)}</p>
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="p-2 text-right bg-gray-100 border-t border-b">
              <p>
                Order Status:{" "}
                <span className="font-semibold uppercase">
                  {order.deliveryStatus}
                </span>
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderListPublic;
