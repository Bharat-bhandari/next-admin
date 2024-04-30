"use client";

import React, { useState } from "react";
import { Button, Input } from "@material-tailwind/react";
import ProfileAvatarInput from "./ProfileAvatarInput";
import profile from "@/assets/images/Profile/profile.png";
import Image from "next/image";

const ProfileForm = ({ name, avatar, email }) => {
  const [avatarFile, setAvatarFile] = useState();
  const [userName, setUserName] = useState(name);

  const avatarSource = avatarFile ? URL.createObjectURL(avatarFile) : avatar;
  const showSubmitButton = avatarSource !== avatar || userName !== name;

  return (
    <form>
      <Image
        className="mb-6 w-36 h-36 "
        // onChange={setAvatarFile}
        // nameInitial={name[0]}
        src={profile}
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
    </form>
  );
};

export default ProfileForm;
