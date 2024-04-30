import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ product }) => {
  return (
    <div className="mb-4 group">
      <Link href={`/shop/${product.title}/${product.id}`}>
        <div className="overflow-hidden rounded-lg h-[20vh]">
          <Image
            src={product.thumbnail}
            alt="Chocolate balls"
            width={300} // Adjust width as needed
            height={200} // Adjust height as needed
            className="w-full h-auto overflow-hidden transition duration-500 transform hover:scale-110"
          />
        </div>
        <div className="mt-2 text-lg text-center">{product.title}</div>
        <div className="flex justify-center">
          <div className="w-10 h-[1px] bg-black  mb-4"></div>
        </div>
      </Link>
      <div className="h-6">
        <div className="hidden text-lg text-center transition duration-500 opacity-0 cursor-pointer group-hover:scale-105 group-hover:block group-hover:opacity-100">
          Add to Cart
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
