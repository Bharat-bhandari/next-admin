"use client";

import React, { useState, useEffect } from "react";
import { Button, Rating } from "@material-tailwind/react";
import { FaStar as RatedIcon } from "react-icons/fa6";
import { FaRegStar as UnratedIcon } from "react-icons/fa6";
import { toast } from "react-toastify";
import axios from "axios";

export default function ReviewForm({ productId, initialValue }) {
  const [isPending, setIsPending] = useState(false);
  const [review, setReview] = useState({
    rating: 0,
    comment: "",
  });

  const submitReview = async (e) => {
    e.preventDefault();

    const { comment, rating } = review;

    if (!rating) {
      return toast.error("Rating is missing!");
    }

    setIsPending(true);

    const requestData = {
      productId: productId,
      rating: rating,
      comment: comment,
    };

    try {
      const res = await axios.post("/api/cartProduct/review", requestData);

      setIsPending(false);

      // Handle success response
    } catch (error) {
      setIsPending(false);
      toast.error(error);
    }
  };

  useEffect(() => {
    if (initialValue) setReview({ ...initialValue });
  }, [initialValue]);

  return (
    <form onSubmit={submitReview} className="space-y-2">
      <div>
        <h3 className="mb-1 text-lg font-semibold">Overall Rating</h3>
        <Rating
          ratedIcon={
            <RatedIcon className="inline-block w-8 h-8 text-[#FFDF00]" />
          }
          unratedIcon={
            <UnratedIcon className="inline-block w-8 h-8 text-[#FFDF00]" />
          }
          value={initialValue?.rating || review.rating}
          onChange={(rating) => setReview({ ...review, rating })}
        />
      </div>

      <div>
        <h3 className="mb-1 text-lg font-semibold">Write a written review</h3>
        <textarea
          placeholder="Write what you like or dislike about the product."
          className="w-full p-2 transition border rounded resize-none border-blue-gray-500 outline-blue-400"
          rows={4}
          value={review.comment}
          onChange={({ target }) =>
            setReview({ ...review, comment: target.value })
          }
        />
      </div>
      <div className="text-right">
        {/* <Button disabled={isPending} type="submit">
          Submit
        </Button> */}

        <button
          disabled={isPending}
          className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-black1 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
          type="submit"
        >
          Button
        </button>
      </div>
    </form>
  );
}
