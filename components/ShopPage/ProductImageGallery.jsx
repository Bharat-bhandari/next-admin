import Image from "next/image";
import React, { useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const settings = {
  dots: false,
  lazyLoad: "anticipated",
  infinite: true,
  speed: 100,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  autoplay: false,
  className: "w-[500px]",
};

export default function ProductImageGallery(props) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { images } = props;
  const slider = useRef(null);

  return (
    <div>
      {images.length === 1 ? (
        <div className="">
          <Image src={images[0]} alt="img" width={500} height={500} />
        </div>
      ) : (
        <Slider
          {...settings}
          afterChange={(currentSlide) => {
            setCurrentSlide(currentSlide);
          }}
          ref={slider}
        >
          {images.map((img, index) => {
            return (
              <div key={index} className="flex items-center justify-center ">
                <Image src={img} alt="img" width={500} height={500} />
              </div>
            );
          })}
        </Slider>
      )}

      <div className="flex py-2 space-x-2">
        {images.map((img, index) => {
          return (
            <div
              onClick={() => slider.current?.slickGoTo(index)}
              className={index === currentSlide ? "ring ring-blue-500" : ""}
              key={index}
            >
              <Image
                className="object-contain"
                src={img}
                alt="img"
                width={500}
                height={500}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
