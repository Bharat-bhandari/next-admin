"use client";
import { HiPencil } from "react-icons/hi2";
import { FiPlus } from "react-icons/fi";
import {
  Typography,
  CardBody,
  CardFooter,
  Avatar,
  Button,
} from "@material-tailwind/react";
import truncate from "truncate";
import { useRouter } from "next/navigation";
import Link from "next/link";
import SearchForm from "./SearchForm";

const formatPrice = (amount) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
  });

  return formatter.format(amount);
};

const TABLE_HEAD = [
  "Product",
  "MRP",
  "Sale Price",
  "Quantity",
  // "Category",
  "Edit",
];

export default function ProductTable(props) {
  const router = useRouter();
  const {
    products = [],
    currentPageNo,
    hasMore,
    showPageNavigator = true,
  } = props;

  const handleOnPrevPress = () => {
    const prevPage = currentPageNo - 1;
    if (prevPage > 0) router.push(`/products?page=${prevPage}`);
  };

  const handleOnNextPress = () => {
    const nextPage = currentPageNo + 1;
    router.push(`/products?page=${nextPage}`);
  };

  return (
    <div className="py-5">
      <div className="flex flex-col justify-between gap-8 mb-4 md:flex-row md:items-center">
        <div>
          <Typography variant="h4" color="blue-gray">
            Products
          </Typography>
        </div>
        <div className="flex w-full gap-2 shrink-0 md:w-max">
          <SearchForm />
          <Link
            href="/admin/products/create"
            className="select-none font-bold text-center uppercase transition-all text-xs py-2 px-4 rounded-lg bg-blue-500 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none flex items-center gap-3"
          >
            <div className="flex items-center">
              <FiPlus strokeWidth={2} className="w-5 h-5 opacity-70" />
              <span className="w-20 text-sm">Add New</span>
            </div>
          </Link>
        </div>
      </div>
      <CardBody className="px-0">
        <table className="w-full text-left table-auto min-w-max">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="p-4 bg-gray-50 border-y border-blue-gray-100"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="text-base font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.map((item, index) => {
              const { id, thumbnail, title, price, quantity, category } = item;
              const isLast = index === products.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={id}>
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      <Avatar
                        src={thumbnail}
                        alt={title}
                        size="md"
                        variant="rounded"
                      />
                      <Link href={`/${title}/${id}`}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold"
                        >
                          {truncate(title, 30)}
                        </Typography>
                      </Link>
                    </div>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {formatPrice(price.mrp)}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {formatPrice(price.salePrice)}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <div className="w-max">
                      <Typography variant="small" color="blue-gray">
                        {quantity}
                      </Typography>
                    </div>
                  </td>
                  {/* <td className={classes}>
                    <div className="w-max">
                      <Typography variant="small" color="blue-gray">
                        {category}
                      </Typography>
                    </div>
                  </td> */}
                  <td className={classes}>
                    <Link href={`/admin/products/update/${id}`}>
                      <HiPencil className="w-4 h-4" />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardBody>
      {showPageNavigator ? (
        <CardFooter className="flex items-center justify-center p-4 border-t border-blue-gray-50">
          <div className="flex items-center gap-2">
            <Button
              disabled={currentPageNo === 1}
              onClick={handleOnPrevPress}
              variant="text"
            >
              Previous
            </Button>
            <Button
              disabled={!hasMore}
              onClick={handleOnNextPress}
              variant="text"
            >
              Next
            </Button>
          </div>
        </CardFooter>
      ) : null}
    </div>
  );
}
