import ProductCard from "./ProductCard";

const Products = ({ products }) => {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Products;
