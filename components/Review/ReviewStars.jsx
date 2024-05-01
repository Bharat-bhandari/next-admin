import React from "react";
import { Rating } from "@material-tailwind/react";
import { FaStar as RatedIcon, FaRegStar as UnratedIcon } from "react-icons/fa";

function ReviewStars({ rating }) {
  return (
    <Rating
      ratedIcon={<RatedIcon className="w-4 h-4" />}
      unratedIcon={<UnratedIcon className="w-4 h-4" />}
      value={rating}
      readonly
    />
  );
}

export default ReviewStars;
