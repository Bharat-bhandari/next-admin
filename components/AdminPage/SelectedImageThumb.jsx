import Image from "next/image";

const SelectedImageThumb = ({ src }) => {
  if (!src) return null;

  return (
    <div className="relative w-20 h-20">
      <Image
        src={src}
        alt="product"
        fill
        className="object-fill rounded bg-blue-gray-200"
      />
    </div>
  );
};

export default SelectedImageThumb;
