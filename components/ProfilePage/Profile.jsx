"use client";

import React, { useState } from "react";
import { Button, Input } from "@material-tailwind/react";
import ProfileAvatarInput from "./ProfileAvatarInput";
import profile from "@/assets/images/Profile/profile.png";
import Image from "next/image";
import { useSession } from "next-auth/react";

const ProfileForm = ({}) => {
  const { data: session } = useSession();

  const name = session?.user?.name;
  const email = session?.user?.email;
  const avatar = session?.user?.image;

  // const [avatarFile, setAvatarFile] = useState();
  // const [userName, setUserName] = useState(name);

  // const avatarSource = avatarFile ? URL.createObjectURL(avatarFile) : avatar;
  // const showSubmitButton = avatarSource !== avatar || userName !== name;

  return (
    <>
      <Image
        className="mb-6 rounded-full w-36 h-36"
        src={avatar || profile}
        src={avatar}
        width={200}
        height={200}
        alt="User"
      />
      <div className="text-sm">Name: {name}</div>
      <div className="text-sm">Email: {email}</div>
      {/* <Input
        onChange={({ target }) => setUserName(target.value)}
        label="Name"
        value={userName}
        className="font-semibold"
      />
      {showSubmitButton ? (
        <Button
          type="submit"
          className="w-full shadow-none hover:shadow-none hover:scale-[0.98]"
          color="blue"
        >
          Submit
        </Button>
      ) : null} */}
    </>
  );
};

export default ProfileForm;
