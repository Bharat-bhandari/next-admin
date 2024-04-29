"use client";

import React, { useRef } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import spoon from "@/assets/images/HomePage/spoon.webp";
import Image from "next/image";

const Collection = () => {
  return (
    <section className="flex flex-col justify-between ">
      <div className="flex flex-col items-center">
        <div>
          <p className="mb-16 text-xl cursor-pointer md:text-2xl mt-60 text1">
            Boutique Blended Loose Tea
          </p>
        </div>
        <div>
          <div className="md:mb-12 text-center  text-[10vw] md:text-[8vw]">
            INDULGE IN
          </div>
          <div className="text-center text-9xl text-[10vw] md:text-[8vw]">
            THE LUXURY
          </div>
        </div>

        <div className="hidden md:block">
          <p className="text-[#757575] mb-1 mt-12 text-[14px] text-center">
            Bold, vibrant flavors, expertly blended with luxurious tea leaves to
          </p>
          <p className="text-[#757575] mb-12 mt-0 text-[14px] text-center">
            bring you an unparalleled experience.
          </p>
        </div>
        <div className="flex justify-center md:hidden">
          <p className="text-[#757575] mb-12 mt-4  text-[14px] w-[70%] text-center">
            Bold, vibrant flavors, expertly blended with luxurious tea leaves to
            bring you an unparalleled experience.
          </p>
        </div>
        <div>
          <a
            href=""
            className="p-4 text-sm duration-300 text-white no-underline hover:text-[#131313] transition border border-solid rounded-full hover:bg-white button"
          >
            VIEW OUR COLLECTION
          </a>
        </div>
      </div>

      <div className="flex justify-center md:w-[60%] mt-20 mx-auto overflow-hidden">
        <Image
          src={spoon}
          alt="spoon"
          className="object-cover w-[80%] spoon1"
        />
      </div>
    </section>
  );
};

export default Collection;
