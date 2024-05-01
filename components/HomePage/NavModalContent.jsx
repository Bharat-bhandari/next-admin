"use client";

import { DialogClose } from "@radix-ui/react-dialog";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavModalContent = () => {
  const pathname = usePathname();

  return (
    <div className="grid grid-cols-3 mt-20">
      <div className="flex flex-col gap-8">
        <DialogClose asChild>
          <Link
            href={"/"}
            className={`link ${
              pathname === "/"
                ? "opacity-40 text-5xl text-white"
                : "text-5xl text-white"
            }`}
          >
            HOME
          </Link>
        </DialogClose>

        <DialogClose asChild>
          <Link
            href={"/shop"}
            className={`link ${
              pathname === "/shop"
                ? "opacity-40 text-5xl text-white"
                : "text-5xl text-white"
            }`}
          >
            SHOP
          </Link>
        </DialogClose>

        <DialogClose asChild>
          <Link
            href={"/"}
            className={`link ${
              pathname === "/about-us"
                ? "opacity-40 text-5xl text-white"
                : "text-5xl text-white"
            }`}
          >
            ABOUT US
          </Link>
        </DialogClose>
        <DialogClose asChild>
          <Link
            href={"/contact-us"}
            className={`link ${
              pathname === "/contact-us"
                ? "opacity-40 text-5xl text-white"
                : "text-5xl text-white"
            }`}
          >
            CONTACT US
          </Link>
        </DialogClose>
      </div>
      <div className="relative flex items-center justify-center">
        <div
          className="absolute left-0 h-full border-l-[0.5px] border-gray-100 border-opacity-10"
          style={{ height: "75%" }}
        ></div>
        Hello
      </div>
      <div className="relative flex items-center justify-center">
        <div
          className="absolute left-0 h-full border-l-[0.5px] border-gray-100 border-opacity-10"
          style={{ height: "75%" }}
        ></div>
        Hello
      </div>
    </div>
  );
};

export default NavModalContent;
