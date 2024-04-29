import React from "react";

import image from "@/assets/images/HomePage/main.webp";
import "@/assets/styles/globals.css";

const Hero = () => {
  return (
    <>
      <div className="h-screen">
        <div
          style={{
            // use the src property of the image object
            backgroundImage: `url(${image.src})`,
            // other styles
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            width: "100%",
            height: "95vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="mb-[50%] sm:mb-[10%]">
            <div className="mb-0 pb-0 text-center text-[8.5vw] lg:text-[8vw] lg:leading-[14vh]">
              YOUR SEVEN STAR
            </div>
            <div className="mt-0 pt-0 text-center text-[8.5vw] lg:text-[8vw] lg:leading-[14vh]">
              CONCIERGE TEA CO.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
