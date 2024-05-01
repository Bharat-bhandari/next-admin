import React from "react";
import Image from "next/image";
import dateFormat from "dateformat";
// import ReviewStars from "./ReviewStars"; // Assuming ReviewStars is a separate component

function ReviewsList({ reviews }) {
  return (
    <div className="space-y-4">
      {reviews &&
        reviews.map((review) => {
          return (
            <div className="space-y-2" key={review.id}>
              <div className="flex items-center space-x-2">
                <Image
                  width={40}
                  height={40}
                  className="object-fill rounded-full"
                  src={review.userInfo.avatar || "/avatar.png"}
                  alt={review.userInfo.name}
                />
                <div>
                  <p className="font-semibold">{review.userInfo.name}</p>
                  <p className="text-xs">
                    {dateFormat(review.date, "dd mmm  yyyy")}
                  </p>
                </div>
              </div>
              {/* <div>
                <ReviewStars rating={review.rating} />
                <p>{review.comment}</p>
              </div> */}
            </div>
          );
        })}
    </div>
  );
}

export default ReviewsList;
