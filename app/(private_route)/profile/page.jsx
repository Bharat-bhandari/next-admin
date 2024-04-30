import Profile from "@/components/ProfilePage/Profile";
import React from "react";
import Link from "next/link";

const ProfilePage = () => {
  return (
    <div>
      {/* <EmailVerificationBanner verified={profile.verified} id={profile.id} /> */}
      <div className="flex py-4 space-y-4 mx-[8%] mt-10">
        <div className="p-4 space-y-4 border-r border-gray-700">
          <Profile />
        </div>

        <div className="flex-1 p-4">
          <div className="flex items-center justify-between">
            <h1 className="mb-4 text-2xl font-semibold uppercase opacity-70">
              Your recent orders
            </h1>
            <Link href="/profile/orders" className="uppercase hover:underline">
              See all orders
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
